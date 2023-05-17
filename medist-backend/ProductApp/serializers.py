from rest_framework import serializers
from .models import ProductDetails


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = ['id', 'pname', 'manufacturer', 'mrp_price', 'list_price',
                  'category', 'discount', 'description', 'speciality', 'image']
