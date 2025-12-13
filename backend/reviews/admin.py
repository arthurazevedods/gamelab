from django.contrib import admin
from .models import TaskTemplate, Task, TaskAssignment, TaskChecklistItem

admin.site.register(TaskTemplate)
admin.site.register(Task)
admin.site.register(TaskAssignment)
admin.site.register(TaskChecklistItem)
