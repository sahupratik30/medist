from django.shortcuts import render
from .serializers import ProductSerializer, PaymentCartSerializer, AddtoCartSerialier
from .models import ProductDetails, PaymentCart, AddtoCart
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView

# Create your views here.


class ProductDetailsView(viewsets.ModelViewSet):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductSerializer


class PaymentCartView(viewsets.ModelViewSet):
    queryset = PaymentCart.objects.all()
    serializer_class = PaymentCartSerializer


class AddtoCartView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = AddtoCart.objects.all()
    serializer_class = AddtoCartSerialier
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["users", "id"]


class AddtoCartApiView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = self.request.user
        queryset = AddtoCart.objects.filter(users=user)
        serializer = AddtoCartSerialier(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = AddtoCartSerialier(data=request.data)
        if serializer.is_valid():
            serializer.save()
            queryset = AddtoCart.objects.filter(users=request.user)
            serialized_data = AddtoCartSerialier(queryset, many=True).data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        id = pk
        if id is not None:
            addtocart = AddtoCart.objects.get(id=id)
            serializer = AddtoCartSerialier(addtocart)
            return Response([serializer.data], status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        id = pk
        addtocart = AddtoCart.objects.get(id=id)
        serializer = AddtoCartSerialier(addtocart, data=request.data)
        if serializer.is_valid():
            serializer.save()
            queryset = AddtoCart.objects.filter(users=request.user)
            serializer = AddtoCartSerialier(queryset, many=True).data
            return Response(serializer, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        id = pk
        addtocart = AddtoCart.objects.get(id=id)
        serializer = AddtoCartSerialier(addtocart, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            queryset = AddtoCart.objects.filter(users=request.user)
            serializer = AddtoCartSerialier(queryset, many=True).data
            return Response(serializer, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        id = pk
        addtocart = AddtoCart.objects.get(id=id)
        addtocart.delete()
        addtocart = AddtoCart.objects.filter(users=request.user)
        serializer = AddtoCartSerialier(addtocart, many=True).data
        return Response(serializer, status=status.HTTP_204_NO_CONTENT)
