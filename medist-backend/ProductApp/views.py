from django.shortcuts import render
from .serializers import ProductSerializer, PaymentCartSerializer, AddtoCartSerializer
from .models import ProductDetails, PaymentCart, AddtoCart
from account.serializers import UserProfileSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from django.db.models import Sum
from rest_framework.decorators import action

# Create your views here.


class ProductDetailsView(viewsets.ModelViewSet):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductSerializer


"""
class AddtoCartView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = AddtoCart.objects.all()
    serializer_class = AddtoCartSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user", "id"]
"""


class PaymentCartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentCartSerializer

    def get_queryset(self):
        user = self.request.user
        return PaymentCart.objects.filter(user=user)

    def create(self, request):
        user = request.user
        payment_cart = PaymentCart.objects.create(user=user)
        serialized_data = PaymentCartSerializer(payment_cart).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, pk=None):
        user = request.user
        payment_cart = PaymentCart.objects.get(user=user)
        data = request.data

        if "totalQuantity" in data:
            payment_cart.totalQuantity = data["totalQuantity"]

        if "totalAmount" in data:
            payment_cart.totalAmount = data["totalAmount"]

        payment_cart.save()

        serialized_data = PaymentCartSerializer(payment_cart).data
        return Response(serialized_data, status=status.HTTP_200_OK)


class AddtoCartApiView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def Calculate_totalQuantity_totalAmount(self, cart):
        totalQuantity = 0
        totalAmount = 0

        items = AddtoCart.objects.filter(cart=cart)
        for item in items:
            totalQuantity += item.quantity
            totalAmount += item.totalPrice

        cart.totalQuantity = totalQuantity
        cart.totalAmount = totalAmount
        cart.save()

    def list(self, request):
        user = request.user
        queryset = AddtoCart.objects.filter(user=user)

        if queryset.exists():
            serializer = AddtoCartSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "No items in the cart."}, status=status.HTTP_204_NO_CONTENT
            )

    def create(self, request):
        serializer = AddtoCartSerializer(data=request.data)
        if serializer.is_valid():
            cart = PaymentCart.objects.get_or_create(user=request.user)
            quantity = serializer.validated_data["quantity"]
            price = serializer.validated_data["price"]
            totalPrice = quantity * price
            serializer.save(user=request.user, cart=cart[0], totalPrice=totalPrice)
            cart = PaymentCart.objects.get(user=request.user)
            self.Calculate_totalQuantity_totalAmount(cart)
            print(
                "totalAmount:", cart.totalAmount, "totalQuantity:", cart.totalQuantity
            )
            data = {}
            data["totalAmount"] = cart.totalAmount
            data["totalQuantity"] = cart.totalQuantity
            queryset = AddtoCart.objects.filter(user=request.user)
            serialized_data = AddtoCartSerializer(queryset, many=True).data
            cart = {
                "items": serialized_data,
                "totalAmount": cart.totalAmount,
                "totalQuantity": cart.totalQuantity,
            }
            return Response(
                cart,
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        id = pk
        if id is not None:
            addtocart = AddtoCart.objects.get(id=id)
            serializer = AddtoCartSerializer(addtocart)
            return Response([serializer.data], status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        id = pk
        addtocart = AddtoCart.objects.get(id=id)
        serializer = AddtoCartSerializer(addtocart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            queryset = AddtoCart.objects.filter(user=request.user)
            serializer = AddtoCartSerializer(queryset, many=True).data
            return Response(serializer, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        id = pk
        addtocart = AddtoCart.objects.get(id=id)
        serializer = AddtoCartSerializer(addtocart, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            queryset = AddtoCart.objects.filter(user=request.user)
            serializer = AddtoCartSerializer(queryset, many=True).data
            return Response(serializer, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        id = pk
        addtocart = AddtoCart.objects.get(id=id)
        addtocart.delete()
        addtocart = AddtoCart.objects.filter(user=request.user)
        serializer = AddtoCartSerializer(addtocart, many=True).data
        return Response(serializer, status=status.HTTP_204_NO_CONTENT)
