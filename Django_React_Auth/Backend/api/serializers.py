from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(name=validated_data["name"], email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["name"] = user.name
        token["email"] = user.email
        token["is_superuser"] = user.is_superuser
        token["is_staff"] = user.is_staff

        return token
