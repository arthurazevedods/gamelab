from rest_framework import viewsets
from accounts.permissions import IsMentorOrAdminOrReadOnly

from .models import Badge, UserBadge, XPTransaction
from .serializers import BadgeSerializer, UserBadgeSerializer, XPTransactionSerializer


class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]


class UserBadgeViewSet(viewsets.ModelViewSet):
    queryset = UserBadge.objects.all()
    serializer_class = UserBadgeSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]


class XPTransactionViewSet(viewsets.ModelViewSet):
    queryset = XPTransaction.objects.all()
    serializer_class = XPTransactionSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]
