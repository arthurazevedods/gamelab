from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.permissions import IsMentorOrAdminOrReadOnly
from audit.models import ActivityLog
from boards.models import Column
from reviews.models import Submission
from reviews.serializers import SubmissionSerializer

from .models import TaskTemplate, Task, TaskAssignment, TaskChecklistItem
from .serializers import (
    TaskTemplateSerializer, TaskSerializer, TaskAssignmentSerializer,
    TaskChecklistItemSerializer, TaskMoveSerializer, TaskSubmitSerializer
)


def _is_mentor_or_admin(user) -> bool:
    profile = getattr(user, "profile", None)
    return bool(profile and profile.role in ("ADMIN", "MENTOR"))


def _is_assigned_to_task(task: Task, user) -> bool:
    return task.assignments.filter(user=user).exists()


class TaskTemplateViewSet(viewsets.ModelViewSet):
    queryset = TaskTemplate.objects.all()
    serializer_class = TaskTemplateSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().select_related("board", "column", "campaign", "quest", "template")
    serializer_class = TaskSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def move(self, request, pk=None):
        """
        POST /api/tasks/{id}/move/
        Body: { "column_id": 123 }

        Regra:
        - Só MENTOR/ADMIN pode mover (por enquanto).
        - column precisa pertencer ao mesmo board da task.
        """
        task = self.get_object()

        if not _is_mentor_or_admin(request.user):
            return Response({"detail": "Apenas MENTOR/ADMIN pode mover tarefas."}, status=status.HTTP_403_FORBIDDEN)

        payload = TaskMoveSerializer(data=request.data)
        payload.is_valid(raise_exception=True)

        column_id = payload.validated_data["column_id"]

        try:
            new_col = Column.objects.get(id=column_id)
        except Column.DoesNotExist:
            return Response({"detail": "Coluna não encontrada."}, status=status.HTTP_400_BAD_REQUEST)

        if new_col.board_id != task.board_id:
            return Response({"detail": "A coluna deve pertencer ao mesmo board da tarefa."}, status=status.HTTP_400_BAD_REQUEST)

        old_col_id = task.column_id
        old_col_name = task.column.name if task.column_id else None

        task.column = new_col
        task.save(update_fields=["column", "updated_at"])

        ActivityLog.objects.create(
            action="moved_task",
            actor=request.user,
            entity_type="Task",
            entity_id=task.id,
            payload={
                "from_column_id": old_col_id,
                "from_column_name": old_col_name,
                "to_column_id": new_col.id,
                "to_column_name": new_col.name,
            },
        )

        return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def submit(self, request, pk=None):
        """
        POST /api/tasks/{id}/submit/
        Body: { "text": "...", "links": ["https://..."] }

        Regra:
        - MEMBRO pode submeter se estiver atribuído à tarefa.
        - MENTOR/ADMIN pode submeter (útil pra testes).
        - Cria Submission.
        - Se existir coluna "Em revisão" no board, move a task pra lá.
        - Registra ActivityLog.
        """
        task = self.get_object()

        user = request.user
        if not (_is_mentor_or_admin(user) or _is_assigned_to_task(task, user)):
            return Response(
                {"detail": "Você só pode submeter entrega se estiver atribuído à tarefa."},
                status=status.HTTP_403_FORBIDDEN,
            )

        payload = TaskSubmitSerializer(data=request.data)
        payload.is_valid(raise_exception=True)

        text = payload.validated_data.get("text", "")
        links = payload.validated_data.get("links", [])

        with transaction.atomic():
            submission = Submission.objects.create(
                task=task,
                user=user,
                text=text,
                links=links,
            )

            # tenta mover pra coluna "Em revisão" (case-insensitive)
            review_col = Column.objects.filter(board_id=task.board_id, name__iexact="Em revisão").first()
            if review_col and task.column_id != review_col.id:
                old_col_id = task.column_id
                old_col_name = task.column.name if task.column_id else None

                task.column = review_col
                task.save(update_fields=["column", "updated_at"])

                ActivityLog.objects.create(
                    action="moved_task",
                    actor=user,
                    entity_type="Task",
                    entity_id=task.id,
                    payload={
                        "from_column_id": old_col_id,
                        "from_column_name": old_col_name,
                        "to_column_id": review_col.id,
                        "to_column_name": review_col.name,
                        "reason": "submit",
                    },
                )

            ActivityLog.objects.create(
                action="submitted_task",
                actor=user,
                entity_type="Submission",
                entity_id=submission.id,
                payload={
                    "task_id": task.id,
                    "board_id": task.board_id,
                },
            )

        return Response(SubmissionSerializer(submission).data, status=status.HTTP_201_CREATED)


class TaskAssignmentViewSet(viewsets.ModelViewSet):
    queryset = TaskAssignment.objects.all()
    serializer_class = TaskAssignmentSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]


class TaskChecklistItemViewSet(viewsets.ModelViewSet):
    queryset = TaskChecklistItem.objects.all()
    serializer_class = TaskChecklistItemSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]
