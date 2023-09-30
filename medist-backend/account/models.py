from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


#  Custom User Manager
class UserManager(BaseUserManager):
    def create_user(
        self,
        email,
        username,
        Country=None,
        street_address=None,
        City=None,
        state=None,
        postalcode=None,
        phoneNumber=None,
        password=None,
        password2=None,
    ):
        # Creates and saves a User with the given email, username, tc and password.
        if not email:
            raise ValueError("User must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            Country=Country,
            street_address=street_address,
            City=City,
            state=state,
            postalcode=postalcode,
            phoneNumber=phoneNumber,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        email,
        username,
        Country,
        street_address,
        City,
        state,
        postalcode,
        phoneNumber,
        password=None,
    ):
        """
        Creates and saves a superuser with the given email, username, tc and password.
        """
        user = self.create_user(
            email,
            password=password,
            username=username,
            Country=Country,
            street_address=street_address,
            City=City,
            state=state,
            postalcode=postalcode,
            phoneNumber=phoneNumber,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


#  Custom User Model
# gender_choices = ("male", "male", "female", "other", "other")
class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="Email", max_length=200, unique=True)
    username = models.CharField(max_length=200)
    # age = models.IntegerField()
    # gender = models.CharField(max_length=20, choices=gender_choices)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    Country = models.CharField(max_length=50, null=True)
    street_address = models.CharField(max_length=100, null=True)
    City = models.CharField(max_length=50, null=True)
    state = models.CharField(max_length=50, null=True)
    postalcode = models.IntegerField(null=True)
    phoneNumber = models.IntegerField(null=True)
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username",
    ]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
