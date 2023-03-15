from rest_framework import routers
from .api import PitchViewSet

router = routers.DefaultRouter()

router.register('api/pitch', PitchViewSet, 'pitch')

urlpatterns = router.urls