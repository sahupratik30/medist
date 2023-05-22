from django.db import models

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

    class Meta:
        db_table = "pname"
