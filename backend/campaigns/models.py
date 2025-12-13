from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class Campaign(models.Model):
    STATUS_CHOICES = [
        ("PLANNED", "Planned"),
        ("ACTIVE", "Active"),
        ("CLOSED", "Closed"),
    ]

    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="PLANNED")
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="campaigns_created")

    def __str__(self) -> str:
        return self.name


class Quest(models.Model):
    SCOPE_CHOICES = [
        ("GLOBAL", "Global"),
        ("GUILD", "Guild"),
        ("CLASS", "Class"),
    ]

    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name="quests")
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)

    scope = models.CharField(max_length=10, choices=SCOPE_CHOICES, default="GLOBAL")
    # ref_id é o “alvo” do escopo (guild_id ou class_role_id). Por enquanto numérico simples.
    ref_id = models.PositiveIntegerField(null=True, blank=True)

    order = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.campaign.name} / {self.name}"
