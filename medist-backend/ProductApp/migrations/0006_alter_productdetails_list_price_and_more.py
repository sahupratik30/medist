# Generated by Django 4.1.2 on 2023-01-03 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProductApp', '0005_alter_productdetails_list_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productdetails',
            name='list_price',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='productdetails',
            name='mrp_price',
            field=models.FloatField(),
        ),
    ]
