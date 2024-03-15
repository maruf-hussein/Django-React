from django.urls import path
from base.api.views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("", getRoutes),
    # JWT_AUTHENTICATION_VIEWS
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
