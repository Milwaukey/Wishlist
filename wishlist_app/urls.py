from django.urls import path, include
from . import views

app_name = 'wishlist_app'

urlpatterns = [
    path('', views.index, name="index"),
    path('signup/', views.signup, name="signup"),
    path('login/', views.login, name="login"),

    path('profile/', views.profile, name="profile"),
    path('profile/<int:pk>/', views.profileSearch, name="profileSearch"),
    path('profile/<int:pk>/wishlist/<int:id>/', views.wishlist, name="wishlist"),

    path('mywishlist/', views.mywishlist, name="mywishlist"),
    path('mywishlist/<int:id>/', views.mywishlistdetail, name="mywishlistdetail"),
    path('password-reset/', views.passwordReset, name="password-reset"),
    path('confirm-password-reset/', views.request_password_reset, name="confirm-password-reset"),
    path('search/', views.search, name="search"),



    path('delete-account/', views.deleteAccount, name="delete-account")
]
