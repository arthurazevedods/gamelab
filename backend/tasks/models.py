from django.conf import settings
from django.db import models

from boards.models import Board, Column
from campaigns.models import Campaign, Quest

User = settings.AUTH_USER_MODEL

class TaskTemplate(models.Model):
    CATEGORY_CHOICES = [
        ("UI", "UI"),
        ("CODIGO", "Código"),
        ("ARTE", "Arte"),
        ("PESQUISA", "Pesquisa"),
        ("GERAL", "Geral"),
    ]

    title = models.CharField(max_length=120)
    description_markdown = models.TextField(blank=True)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default="GERAL")
    default_xp = models.PositiveIntegerField(default=10)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="task_templates_created")
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.title


class Task(models.Model):
    KIND_CHOICES = [
        ("NORMAL", "Normal"),
        ("WEEKLY_MISSION", "Weekly Mission"),
    ]

    CATEGORY_CHOICES = TaskTemplate.CATEGORY_CHOICES
    PRIORITY_CHOICES = [
        ("LOW", "Low"),
        ("MEDIUM", "Medium"),
        ("HIGH", "High"),
    ]

    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="tasks")
    column = models.ForeignKey(Column, on_delete=models.PROTECT, related_name="tasks")

    campaign = models.ForeignKey(Campaign, on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks")
    quest = models.ForeignKey(Quest, on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks")

    template = models.ForeignKey(TaskTemplate, on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks")

    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)

    kind = models.CharField(max_length=20, choices=KIND_CHOICES, default="NORMAL")
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default="GERAL")
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default="MEDIUM")

    due_date = models.DateTimeField(null=True, blank=True)
    estimated_minutes = models.PositiveIntegerField(null=True, blank=True)

    xp_value_default = models.PositiveIntegerField(default=10)
    xp_awarded = models.PositiveIntegerField(null=True, blank=True)

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks_created")
    watchers = models.ManyToManyField(User, blank=True, related_name="tasks_watching")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title


class TaskAssignment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="assignments")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="task_assignments")
    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("task", "user")


class TaskChecklistItem(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="checklist_items")
    text = models.CharField(max_length=200)
    is_required = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    is_done = models.BooleanField(default=False)

    class Meta:
        ordering = ["order"]
