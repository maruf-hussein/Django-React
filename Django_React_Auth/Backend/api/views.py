import json
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import User
from .serializers import MyTokenObtainPairSerializer, UserSerializer
import requests
from rest_framework_simplejwt.views import TokenObtainPairView


@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):

    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(email=email).exists():
        return Response(
            {"detail": "A user with the same email already exists."},
            status=status.HTTP_409_CONFLICT,
        )

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.create(serializer.validated_data)
        url = "http://127.0.0.1:8000/api/token/"

        data = {"email": email, "password": password}
        response = requests.post(url, data)

        if response.headers["Content-Type"] == "application/json":
            tokens = response.json()

            return Response(
                {"detail": "Sign Up was successful", "tokens": tokens},
                status=status.HTTP_201_CREATED,
            )
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- simple_jwt token view ---
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# --- simple_jwt token view ---


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def signout_view(request):
    logout(request)
    return Response({"detail": "Sign-Out was successful"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@ensure_csrf_cookie
# @csrf_exempt
@permission_classes([IsAuthenticated])
def current_user_view(request):
    print("Request/Headers =============== : ", request.headers)
    headers = request.headers
    body = request.body
    print("Request/Body =============== : ", request.body)
    name = request.user.name
    email = request.user.email
    id = request.user.id

    return Response(
        {"id": id, "name": name, "email": email},
        # {"request/headers": headers, "request/body": body},
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def test_todos_view(request):
    res = requests.get("https://jsonplaceholder.typicode.com/posts")
    res = res.json()
    return Response(res, status=status.HTTP_200_OK)


@api_view(["GET"])
def all_users_view(request):
    users = User.objects.all()
    serialize = UserSerializer(instance=users, many=True)
    return Response(
        {"total_users": users.count(), "user": serialize.data},
        status=status.HTTP_200_OK,
    )


# --- Account deletion views ---


@permission_classes([IsAuthenticated])
@api_view(["GET", "PUT", "PATCH", "DELETE"])
@ensure_csrf_cookie
def user_detail_view(request, id):
    try:
        user_account = User.objects.get(id=id)

        if request.method == "GET":
            serialize = UserSerializer(user_account)

            if serialize.data:
                return Response(serialize.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    serialize.errors,
                    status.HTTP_400_BAD_REQUEST,
                )

        elif request.method == "PUT":
            data = request.data
            print("request.data ====================== :", data)

            user_account = User.objects.get(id=id)
            print("user_account ====================== :", user_account)
            serialize = UserSerializer(user_account, data=data)

            if serialize.is_valid():
                serialize.save()
                return Response(
                    {"detail": "Account updation was successful"},
                    status.HTTP_202_ACCEPTED,
                )
            else:
                return Response(
                    serialize.errors,
                    status.HTTP_400_BAD_REQUEST,
                )

        elif request.method == "PATCH":
            data = request.data
            print("data ====================== :", data)

            user_account = User.objects.get(id=id)
            print("user_account ====================== :", user_account)
            serialize = UserSerializer(user_account, data=data)

            if serialize.is_valid():
                serialize.save()
                return Response(
                    {"detail": "Account updation was successful"},
                    status.HTTP_202_ACCEPTED,
                )
            else:
                return Response(
                    serialize.errors,
                    status.HTTP_400_BAD_REQUEST,
                )

        elif request.method == "DELETE":
            print("user_account ====================== :", user_account)

            if user_account:
                user_account.delete()
                return Response(
                    {"detail": "Account deletion was successful"},
                    status.HTTP_202_ACCEPTED,
                )
            else:
                return Response(
                    serialize.errors,
                    status.HTTP_400_BAD_REQUEST,
                )

    except User.DoesNotExist:
        return Response(
            {"detail": f"Account does not exists with the given ID"},
            status.HTTP_404_NOT_FOUND,
        )
    except Exception as error:
        return Response(
            # {"detail": "Internal server error, please try again later"},
            error,
            # print("Error ================================= : ", error),
            status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def delete_all_users_view(request):
    try:
        users = User.objects.all().exclude(is_superuser=True)

        if users:
            users.delete()

            return Response(
                {"detail": "All users were deleted except ( Admin )"},
                status=status.HTTP_202_ACCEPTED,
            )
        else:
            return Response(
                {"detail": "There are no users to delete"},
                status=status.HTTP_404_NOT_FOUND,
            )
    except Exception:
        return Response(
            {"detail": "Something went wrong, please try again!"},
            status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
