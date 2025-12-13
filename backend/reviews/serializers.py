from rest_framework import serializers
from .models import Submission, Rubric, RubricCriterion, Review

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = "__all__"

class RubricCriterionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RubricCriterion
        fields = "__all__"

class RubricSerializer(serializers.ModelSerializer):
    criteria = RubricCriterionSerializer(many=True, read_only=True)

    class Meta:
        model = Rubric
        fields = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
class SubmissionReviewActionSerializer(serializers.Serializer):
    rubric_id = serializers.IntegerField(required=False)
    scores = serializers.DictField(
        child=serializers.IntegerField(min_value=0),
        required=False
    )
    feedback = serializers.CharField(required=False, allow_blank=True)
    xp_awarded = serializers.IntegerField(min_value=0, required=False, default=0)
    approve = serializers.BooleanField(required=False, default=True)