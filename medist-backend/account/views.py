from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import User
from ProductApp.models import PaymentCart
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserChangePasswordSerializer,
    SendPasswordResetEmailSerializer,
    UserPasswordResetSerializer,
)
from ProductApp.serializers import AddtoCartSerializer, PaymentCartSerializer
from ProductApp.models import AddtoCart
from django.core import serializers
from django.contrib.auth import authenticate
from account.customerror import CustomRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

# from django.db import IntegrityError
import json
from rest_framework.authtoken.models import Token


# Create your views here.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class UserRegistration(APIView):
    def post(self, request, *arg, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response(
                {"token": token, "msg": "Registered successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response({"msg": "False"}, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    def post(self, request, *args, **kwargs):
        data = {}
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get("email")
            password = serializer.data.get("password")
            user = authenticate(email=email, password=password)
            Data = User.objects.get(email=email)
            # current user cartdata
            if user is not None:
                token = get_tokens_for_user(user)
                data["id"] = Data.id
                data["username"] = Data.username
                data["email"] = Data.email
                data["Country"] = Data.Country
                data["street_address"] = Data.street_address
                data["City"] = Data.City
                data["state"] = Data.state
                data["postalcode"] = Data.postalcode
                data["phoneNumber"] = Data.phoneNumber
                try:
                    cart = PaymentCart.objects.get(user=Data)
                    # cart_data = AddtoCart.objects.filter(cart=cart)
                    # cart_serializer_data = AddtoCartSerializer(cart_data, many=True).data
                    cartdata = AddtoCart.objects.filter(user__email=email)
                    serializerdata = AddtoCartSerializer(cartdata, many=True).data
                    # carts = {"items": serializerdata}
                    totalQuantity = cart.totalQuantity
                    totalAmount = cart.totalAmount
                except PaymentCart.DoesNotExist:
                    totalQuantity = 0
                    totalAmount = 0
                    serializerdata = []
                return Response(
                    {
                        "data": data,
                        "cart": {
                            "items": serializerdata,
                            "totalQuantity": totalQuantity,
                            "totalAmount": totalAmount,
                        },
                        # "totalQuantity": totalQuantity,
                        # "totalAmount": totalAmount,
                        "error": "false",
                        "token": token,
                        "msg": "Login successful",
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "true", "msg": "Invalid Credentials"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print(request.user)
        print(type(request.user))
        data = User.objects.filter(email=request.user)
        serializer = UserProfileSerializer(data, many=True)
        # if serializer.is_valid():
        return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None, *args, **kwargs):
        data = {}
        id = id
        user = User.objects.get(id=id)
        print("user", user)
        serializer = UserProfileSerializer(user, request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            """
            data["id"] = request.data.get("id")
            data["username"] = request.data.get("username")
            data["email"] = request.data.get("email")
            data["Country"] = request.data.get("Country")
            data["street_address"] = request.data.get("street_address")
            data["City"] = request.data.get("City")
            data["state"] = request.data.get("state")
            data["postalcode"] = request.data.get("postalcode")
            """
            print(request.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id=None, format=None):
        id = id
        data = {}
        user = User.objects.get(id=id)
        print("user", user)
        serializer = UserProfileSerializer(user, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None, format=None):
        id = id
        user = User.objects.get(id=id).delete()
        return Response({"msg": "data deleted "}, status=status.HTTP_204_NO_CONTENT)


class UserChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={"user": request.user}
        )
        if serializer.is_valid(raise_exception=True):
            return Response(
                {"msg": "password changed successfully"}, status=status.HTTP_200_OK
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetEmail(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(
                {"msg": "Password Reset link send. Please check your Email"},
                status=status.HTTP_200_OK,
            )


class UserPasswordReset(APIView):
    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(
            data=request.data, context={"uid": uid, "token": token}
        )
        serializer.is_valid(raise_exception=True)
        return Response(
            {"msg": "Password Reset Successfully"}, status=status.HTTP_200_OK
        )
