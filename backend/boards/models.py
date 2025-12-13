from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class Board(models.Model):
    SCOPE_CHOICES = [
        ("GLOBAL", "Global"),
        ("GUILD", "Guild"),
        ("CLASS", "Class"),
        ("PERSONAL", "Personal"),
    ]

    name = models.CharField(max_length=120)
    scope = models.CharField(max_length=10, choices=SCOPE_CHOICES, default="GLOBAL")
    ref_id = models.PositiveIntegerField(null=True, blank=True)  # guild_id / class_role_id / user_id
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="boards_created")

    def __str__(self) -> str:
        return self.name


class Column(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="columns")
    name = models.CharField(max_length=60)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("board", "name")
        ordering = ["order"]

    def __str__(self) -> str:
        return f"{self.board.name} / {self.name}"
