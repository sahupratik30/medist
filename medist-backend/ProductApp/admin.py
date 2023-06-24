from django.contrib import admin
from ProductApp.models import ProductDetails, AddtoCart, PaymentCart, ViewOrder

# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    list_display = [
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


class addtocartAdmin(admin.ModelAdmin):
    list_display = [
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


class paymentcartAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "totalQuantity", "totalAmount"]


class ViewOrderAdmin(admin.ModelAdmin):
    list_display = ["id", "totalQuantity", "totalAmount", "items", "created_at"]


admin.site.register(ViewOrder, ViewOrderAdmin)
admin.site.register(PaymentCart, paymentcartAdmin)
admin.site.register(AddtoCart, addtocartAdmin)
admin.site.register(ProductDetails, ProductAdmin)
