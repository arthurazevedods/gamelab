from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class ActivityLog(models.Model):
    action = models.CharField(max_length=50)  # created_task, moved_column, reviewed, xp_awarded, etc.
    actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="activity_logs")
    entity_type = models.CharField(max_length=50)  # Task, Submission, Review...
    entity_id = models.PositiveIntegerField()
    payload = models.JSONField(default=dict, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.action} {self.entity_type}:{self.entity_id}"
