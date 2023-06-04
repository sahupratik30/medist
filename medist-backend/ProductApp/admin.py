from django.contrib import admin
from ProductApp.models import ProductDetails

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


admin.site.register(ProductDetails, ProductAdmin)
