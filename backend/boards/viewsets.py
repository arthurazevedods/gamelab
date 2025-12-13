from rest_framework import viewsets
from accounts.permissions import IsMentorOrAdminOrReadOnly
from .models import Board, Column
from .serializers import BoardSerializer, ColumnSerializer

class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]

class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    permission_classes = [IsMentorOrAdminOrReadOnly]
