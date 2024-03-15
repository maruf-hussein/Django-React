from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
import requests


@api_view( [ "POST" ] )
@permission_classes( [ AllowAny ] )
def signup_view( request ):
	if request.method == "POST":
		serializer = UserSerializer( data=request.data )
		if serializer.is_valid():
			user = serializer.create( serializer.validated_data )

			login( request, user )

			return Response( { "details": "Sign-Up was successful" }, status=status.HTTP_201_CREATED )

		return Response( { "details": "A user with the same username or email already exists." },
		                 status=status.HTTP_409_CONFLICT )

	return Response( { "details": "Method not allowed*-." }, status=status.HTTP_405_METHOD_NOT_ALLOWED )


@api_view( [ "POST", ] )
@ensure_csrf_cookie
@permission_classes( [ AllowAny ] )
def signin_view( request ):
	if request.user.is_authenticated:
		print( "Authenticated=========================================================" )
		return Response( { "details": "Already signed-in!" }, status=status.HTTP_400_BAD_REQUEST )

	email = request.data.get( "email" )
	password = request.data.get( "password" )
	user = authenticate( request, email=email, password=password )

	if user is not None:
		login( request, user )
		return Response( { "details": "Sign-In was successful" }, status=status.HTTP_200_OK )

	return Response( { "details": "Invalid credentials, please try again!" }, status=status.HTTP_404_NOT_FOUND )


@api_view( [ "GET" ] )
def signout_view( request ):
	logout( request )
	return Response( { "details": "Sign-Out was successful" }, status=status.HTTP_200_OK )


@api_view( [ "GET" ] )
@ensure_csrf_cookie
# @csrf_exempt
@permission_classes( [ IsAuthenticated ] )
def current_user_view( request ):
	username = request.user.username
	email = request.user.email
	id = request.user.id
	print( "Data: ", { "id": id, "username": username, "email": email } )

	return Response( { "id": id, "username": username, "email": email }, status=status.HTTP_200_OK )


@api_view( [ "GET" ] )
def test_todos_view( request ):
	res = requests.get( "https://jsonplaceholder.typicode.com/posts" )
	res = res.json()
	return Response( res, status=status.HTTP_200_OK )


@api_view( [ "GET" ] )
def all_users_view( request ):
	users = User.objects.all()
	serialize = UserSerializer( instance=users, many=True )
	return Response( serialize.data, status=status.HTTP_200_OK )
