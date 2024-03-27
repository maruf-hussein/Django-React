from django.contrib import admin
from django.urls import include, path
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api import urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh_token"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(urls)),
]