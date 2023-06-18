from django.db import models
from account.models import User

# Create your models here.


class ProductDetails(models.Model):
    pname = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    mrp_price = models.DecimalField(max_digits=7, decimal_places=2)
    list_price = models.DecimalField(max_digits=7, decimal_places=2)
    category = models.CharField(max_length=70)
    discount = models.IntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to="images/")
    speciality = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.pname


class PaymentCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="carts")
    totalQuantity = models.IntegerField(null=True, blank=True)
    totalAmount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.user.email


class AddtoCart(models.Model):
    id = models.AutoField(primary_key=True)
    carts = models.ForeignKey(
        PaymentCart, on_delete=models.CASCADE, related_name="items"
    )
    users = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=300)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    mrp = models.DecimalField(max_digits=7, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(upload_to="cartImage/", null=True)

    def __str__(self):
        return str(self.carts.user.id)
