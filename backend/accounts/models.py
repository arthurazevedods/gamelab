from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    ROLE_CHOICES = [
        ('ADMIN', 'Admin'),
        ('MENTOR', 'Mentor'),
        ('MEMBRO', 'Membro'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    avatar_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.user.username
