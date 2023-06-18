from rest_framework import serializers
from .models import ProductDetails, AddtoCart, PaymentCart


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


class AddtoCartSerialier(serializers.ModelSerializer):
    class Meta:
        model = AddtoCart
        fields = [
            "id",
            "carts",
            "users",
            "name",
            "manufacturer",
            "quantity",
            "price",
            "mrp",
            "totalPrice",
            "image",
        ]

    def get_cart(self, obj):
        return obj.carts.user.email


class PaymentCartSerializer(serializers.ModelSerializer):
    items = AddtoCartSerialier(many=True)

    class Meta:
        model = PaymentCart
        fields = ["items", "totalQuantity", "totalAmount"]
