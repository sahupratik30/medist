# Generated by Django 4.1.2 on 2023-06-04 05:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0009_alter_user_state'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='tc',
        ),
    ]