from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models
from django.contrib.auth.models import User

class UsersSerializer(serializers.ModelSerializer):

    class Meta: 
        model = User
        fields = ["id", "username", "first_name", "last_name"]


class AllWishlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Wishlist
        fields = ["id", "title", "is_private", "user", "followed_by"]


# class AllWishlistDetailSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = models.Wishlist
#         fields = ["followed_by"]

       

class WishlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Wishlist
        fields = ["id", "title", "is_private", "user", "followed_by"]



class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Wish
        fields = "__all__"


class ReservedWishSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ReservedWish
        fields = "__all__"




## FOLLOW --> FOLLOW 