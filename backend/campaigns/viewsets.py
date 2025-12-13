from rest_framework import viewsets
from accounts.permissions import IsMentorOrAdminOrReadOnly
from .models import Campaign, Quest
from .serializers import CampaignSerializer, QuestSerializer

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]

class QuestViewSet(viewsets.ModelViewSet):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]
