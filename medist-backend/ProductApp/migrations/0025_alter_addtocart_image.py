# Generated by Django 4.1.2 on 2023-06-18 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProductApp', '0024_alter_addtocart_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addtocart',
            name='image',
            field=models.URLField(null=True),
        ),
    ]
