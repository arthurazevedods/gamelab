from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class Badge(models.Model):
    CATEGORY_CHOICES = [
        ("UI", "UI"),
        ("CODIGO", "Código"),
        ("ARTE", "Arte"),
        ("PESQUISA", "Pesquisa"),
        ("COLAB", "Colaboração"),
    ]

    name = models.CharField(max_length=80, unique=True)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self) -> str:
        return self.name


class UserBadge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="badges")
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE, related_name="awards")
    awarded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="badges_awarded")
    awarded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "badge")


class XPTransaction(models.Model):
    SOURCE_CHOICES = [
        ("TASK_APPROVED", "Task Approved"),
        ("BONUS", "Bonus"),
        ("PENALTY", "Penalty"),
        ("MANUAL", "Manual"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="xp_transactions")
    amount = models.IntegerField()
    source_type = models.CharField(max_length=20, choices=SOURCE_CHOICES, default="MANUAL")
    source_id = models.PositiveIntegerField(null=True, blank=True)

    note = models.CharField(max_length=200, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="xp_created")
    created_at = models.DateTimeField(auto_now_add=True)
