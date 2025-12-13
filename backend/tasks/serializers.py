from rest_framework import serializers
from .models import TaskTemplate, Task, TaskAssignment, TaskChecklistItem

class TaskTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskTemplate
        fields = "__all__"

class TaskChecklistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskChecklistItem
        fields = "__all__"

class TaskAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignment
        fields = "__all__"

class TaskSerializer(serializers.ModelSerializer):
    checklist_items = TaskChecklistItemSerializer(many=True, read_only=True)
    assignments = TaskAssignmentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = "__all__"

class TaskMoveSerializer(serializers.Serializer):
    column_id = serializers.IntegerField()


class TaskSubmitSerializer(serializers.Serializer):
    text = serializers.CharField(required=False, allow_blank=True)
    links = serializers.ListField(
        child=serializers.URLField(),
        required=False
    )

