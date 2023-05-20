from django.urls import path
from account import views

urlpatterns = [
    path("register/", views.UserRegistration.as_view(), name="register"),
    path("login/", views.UserLogin.as_view(), name="login"),
    path("profile/", views.UserProfile.as_view(), name="profile"),
    path("changepassword/", views.UserChangePassword.as_view(), name="changepassword"),
    path(
        "resetpasswordemail/",
        views.PasswordResetEmail.as_view(),
        name="resetpasswordemail",
    ),
    path("resetpassword/", views.UserPasswordReset.as_view(), name="resetpassword"),
]
