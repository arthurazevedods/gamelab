from django.db import models

class CalendarEvent(models.Model):
    TYPE_CHOICES = [
        ("DEADLINE", "Deadline"),
        ("MEETING", "Meeting"),
        ("MILESTONE", "Milestone"),
    ]

    title = models.CharField(max_length=160)
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()

    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default="MEETING")

    scope = models.CharField(max_length=10, default="GLOBAL")  # GLOBAL/GUILD/CLASS
    ref_id = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self) -> str:
        return self.title
