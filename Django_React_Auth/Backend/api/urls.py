from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # authentication
    # --- simple_jwt signin ---
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # --- simple_jwt signin ---
    path("signup/", signup_view, name="signup_view"),
    path("signout/", signout_view, name="signout_view"),
    # --- usual ---
    path("current_user/", current_user_view, name="current_user_view"),
    path("test_todos/", test_todos_view, name="test_todos_view"),
    path("all_users/", all_users_view, name="all_users_view"),
    path("user_detail/<id>/", user_detail_view, name="user_detail_view"),
    path("delete_all_users/", delete_all_users_view, name="delete_all_users_view"),
]
