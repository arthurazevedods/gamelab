from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.permissions import IsMentorOrAdminOrReadOnly
from audit.models import ActivityLog
from boards.models import Column
from gamification.models import XPTransaction
from tasks.models import Task

from .models import Submission, Rubric, RubricCriterion, Review
from .serializers import (
    SubmissionSerializer,
    RubricSerializer,
    RubricCriterionSerializer,
    ReviewSerializer,
    SubmissionReviewActionSerializer,
)


def _is_mentor_or_admin(user) -> bool:
    profile = getattr(user, "profile", None)
    return bool(profile and profile.role in ("ADMIN", "MENTOR"))


def _compute_weighted_score(rubric: Rubric, scores_dict: dict) -> float:
    """
    Calcula nota ponderada em escala 0..100, com base nos critérios da rubrica.
    - scores_dict: {criterion_id: score}
    """
    criteria = list(rubric.criteria.all())
    if not criteria:
        return 0.0

    total_weight = 0
    total_ratio = 0.0

    for c in criteria:
        w = max(int(c.weight), 0)
        if w == 0:
            continue
        total_weight += w

        raw = scores_dict.get(str(c.id), scores_dict.get(c.id, 0))
        try:
            raw = int(raw)
        except Exception:
            raw = 0

        raw = max(0, min(raw, int(c.max_score)))
        ratio = raw / float(c.max_score) if c.max_score else 0.0
        total_ratio += ratio * w

    if total_weight == 0:
        return 0.0

    # 0..100
    return round((total_ratio / total_weight) * 100.0, 2)


class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all().select_related("task", "user")
    serializer_class = SubmissionSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def review(self, request, pk=None):
        """
        POST /api/submissions/{id}/review/

        Body:
        {
          "rubric_id": 1,
          "scores": {"10": 8, "11": 7, "12": 9, "13": 6},
          "feedback": "Bom trabalho, ajustar X...",
          "xp_awarded": 30,
          "approve": true
        }

        Regras:
        - Apenas MENTOR/ADMIN pode revisar
        - Cria ou atualiza Review (one-to-one)
        - Cria XPTransaction (ledger) se xp_awarded > 0
        - Atualiza task.xp_awarded
        - Se approve=true, move task pra coluna "Concluído" se existir (case-insensitive)
        - Logs em ActivityLog
        """
        if not _is_mentor_or_admin(request.user):
            return Response({"detail": "Apenas MENTOR/ADMIN pode revisar entregas."}, status=status.HTTP_403_FORBIDDEN)

        submission = self.get_object()

        payload = SubmissionReviewActionSerializer(data=request.data)
        payload.is_valid(raise_exception=True)
        data = payload.validated_data

        rubric_id = data.get("rubric_id")
        scores = data.get("scores", {})
        feedback = data.get("feedback", "")
        xp_awarded = int(data.get("xp_awarded", 0) or 0)
        approve = bool(data.get("approve", True))

        rubric = None
        if rubric_id:
            rubric = Rubric.objects.filter(id=rubric_id).prefetch_related("criteria").first()
            if not rubric:
                return Response({"detail": "Rubrica não encontrada."}, status=status.HTTP_400_BAD_REQUEST)

        final_score = 0.0
        if rubric:
            final_score = _compute_weighted_score(rubric, scores)

        task: Task = submission.task
        board_id = task.board_id

        with transaction.atomic():
            # cria/atualiza review
            review_obj, created = Review.objects.get_or_create(
                submission=submission,
                defaults={
                    "reviewer": request.user,
                    "rubric": rubric,
                    "scores": scores,
                    "final_score": final_score,
                    "feedback": feedback,
                    "xp_awarded": xp_awarded,
                },
            )
            if not created:
                review_obj.reviewer = request.user
                review_obj.rubric = rubric
                review_obj.scores = scores
                review_obj.final_score = final_score
                review_obj.feedback = feedback
                review_obj.xp_awarded = xp_awarded
                review_obj.save()

            # ledger de XP (apenas se > 0)
            if xp_awarded > 0:
                XPTransaction.objects.create(
                    user=submission.user,
                    amount=xp_awarded,
                    source_type="TASK_APPROVED" if approve else "MANUAL",
                    source_id=task.id,
                    note=f"XP pela tarefa: {task.title}",
                    created_by=request.user,
                )

            # atualiza task.xp_awarded (sem mexer em xp_value_default)
            task.xp_awarded = xp_awarded
            task.save(update_fields=["xp_awarded", "updated_at"])

            # move para "Concluído" se aprovado
            moved = False
            if approve:
                done_col = Column.objects.filter(board_id=board_id, name__iexact="Concluído").first()
                if done_col and task.column_id != done_col.id:
                    old_col_id = task.column_id
                    old_col_name = task.column.name if task.column_id else None

                    task.column = done_col
                    task.save(update_fields=["column", "updated_at"])
                    moved = True

                    ActivityLog.objects.create(
                        action="moved_task",
                        actor=request.user,
                        entity_type="Task",
                        entity_id=task.id,
                        payload={
                            "from_column_id": old_col_id,
                            "from_column_name": old_col_name,
                            "to_column_id": done_col.id,
                            "to_column_name": done_col.name,
                            "reason": "approve_review",
                        },
                    )

            ActivityLog.objects.create(
                action="reviewed_submission",
                actor=request.user,
                entity_type="Review",
                entity_id=review_obj.id,
                payload={
                    "submission_id": submission.id,
                    "task_id": task.id,
                    "rubric_id": rubric.id if rubric else None,
                    "final_score": final_score,
                    "xp_awarded": xp_awarded,
                    "approve": approve,
                    "moved_to_done": moved,
                },
            )

        return Response(ReviewSerializer(review_obj).data, status=status.HTTP_200_OK)


class RubricViewSet(viewsets.ModelViewSet):
    queryset = Rubric.objects.all().prefetch_related("criteria")
    serializer_class = RubricSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]


class RubricCriterionViewSet(viewsets.ModelViewSet):
    queryset = RubricCriterion.objects.all()
    serializer_class = RubricCriterionSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]
