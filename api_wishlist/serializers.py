from django.contrib.auth import get_user_model
from rest_framework import serializers
from . import models
from django.contrib.auth.models import User


class WishlistSerializer(serializers.ModelSerializer):
    ## Show the username who follows rather then the ID

    class Meta:
        model = models.Wishlist
        fields = ["id", "title", "is_private", "user", "followed_by"]



class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Wish
        fields = "__all__"





## FOLLOW --> FOLLOW 