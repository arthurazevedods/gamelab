from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class Guild(models.Model):
    name = models.CharField(max_length=80, unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=20, blank=True)  # ex: "#7C3AED"
    icon = models.CharField(max_length=50, blank=True)   # ex: "sparkles"

    def __str__(self) -> str:
        return self.name


class ClassRole(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Mago, Bardo, etc.
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class Membership(models.Model):
    ROLE_CHOICES = [
        ("LIDER", "Líder"),
        ("MEMBRO", "Membro"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="memberships")
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE, related_name="memberships")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="MEMBRO")
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "guild")

    def __str__(self) -> str:
        return f"{self.user} -> {self.guild}"


class UserClass(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_classes")
    class_role = models.ForeignKey(ClassRole, on_delete=models.CASCADE, related_name="user_classes")
    level = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("user", "class_role")

    def __str__(self) -> str:
        return f"{self.user} -> {self.class_role} (lvl {self.level})"
