from django.shortcuts import render
from .serializers import ProductSerializer
from .models import ProductDetails
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.


class ProductDetailsView(viewsets.ModelViewSet):
    queryset = ProductDetails.objects.all()
    serializer_class = ProductSerializer
