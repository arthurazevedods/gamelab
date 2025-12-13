from rest_framework import viewsets
from accounts.permissions import IsMentorOrAdminOrReadOnly

from .models import Guild, ClassRole, Membership, UserClass
from .serializers import GuildSerializer, ClassRoleSerializer, MembershipSerializer, UserClassSerializer

class GuildViewSet(viewsets.ModelViewSet):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]

class ClassRoleViewSet(viewsets.ModelViewSet):
    queryset = ClassRole.objects.all()
    serializer_class = ClassRoleSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]

class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]

class UserClassViewSet(viewsets.ModelViewSet):
    queryset = UserClass.objects.all()
    serializer_class = UserClassSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]
