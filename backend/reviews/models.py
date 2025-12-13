from django.conf import settings
from django.db import models

from tasks.models import Task

User = settings.AUTH_USER_MODEL

class Submission(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="submissions")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")

    text = models.TextField(blank=True)
    links = models.JSONField(default=list, blank=True)  # simples no início

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Submission {self.id} - {self.task.title}"


class Rubric(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="rubrics_created")

    def __str__(self) -> str:
        return self.name


class RubricCriterion(models.Model):
    rubric = models.ForeignKey(Rubric, on_delete=models.CASCADE, related_name="criteria")
    name = models.CharField(max_length=50)  # Clareza, Entrega, Colaboração, Qualidade
    max_score = models.PositiveIntegerField(default=10)
    weight = models.PositiveIntegerField(default=1)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]


class Review(models.Model):
    submission = models.OneToOneField(Submission, on_delete=models.CASCADE, related_name="review")
    reviewer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="reviews_made")

    rubric = models.ForeignKey(Rubric, on_delete=models.SET_NULL, null=True, blank=True)
    scores = models.JSONField(default=dict, blank=True)  # criterion_id -> score
    final_score = models.FloatField(default=0)

    feedback = models.TextField(blank=True)
    xp_awarded = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
