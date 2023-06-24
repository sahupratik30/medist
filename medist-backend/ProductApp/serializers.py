from rest_framework import serializers
from .models import ProductDetails, AddtoCart, PaymentCart, ViewOrder
from account.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetails
        fields = [
            "id",
            "pname",
            "manufacturer",
            "mrp_price",
            "list_price",
            "category",
            "discount",
            "description",
            "speciality",
            "image",
        ]


class AddtoCartSerializer(serializers.ModelSerializer):
    image = serializers.URLField()

    class Meta:
        model = AddtoCart
        fields = [
            "id",
            "cart",
            "user",
            "name",
            "manufacturer",
            "quantity",
            "price",
            "mrp",
            "totalPrice",
            "image",
        ]

    def get_cart(self, obj):
        return obj.cart.user.email


class PaymentCartSerializer(serializers.ModelSerializer):
    items = AddtoCartSerializer(many=True, required=False)

    class Meta:
        model = PaymentCart
        fields = ["id", "user", "items", "totalQuantity", "totalAmount"]


class ViewOrderSerializer(serializers.ModelSerializer):
    items = serializers.ListField(child=serializers.DictField())

    class Meta:
        model = ViewOrder
        fields = ["items", "totalQuantity", "totalAmount"]
