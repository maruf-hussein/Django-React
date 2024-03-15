from django.urls import path
from .views import *

urlpatterns = [
	# authentication
	path( "signup/", signup_view, name="signup_view" ),
	path( "signin/", signin_view, name="signin_view" ),
	path( "signout/", signout_view, name="signout_view" ),

	# usual
	path( "current_user/", current_user_view, name="current_user_view" ),
	path( "test_todos/", test_todos_view, name="test_todos_view" ),
	path( "all_users/", all_users_view, name="all_users_view" )
	]
