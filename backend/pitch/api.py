from .models import Pitch
from rest_framework import viewsets, permissions
from .serializers import PitchSerializer

class PitchViewSet(viewsets.ModelViewSet):
    queryset = Pitch.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PitchSerializer