from rest_framework import serializers
from .models import Guild, ClassRole, Membership, UserClass

class GuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guild
        fields = "__all__"

class ClassRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRole
        fields = "__all__"

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = "__all__"

class UserClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserClass
        fields = "__all__"
