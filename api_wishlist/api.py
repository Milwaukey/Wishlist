from rest_framework import generics
from . import models
from . import serializers
from .permissions import IsOwnerOrReadOnly, ReadOnly
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser


class AllUsers(generics.ListCreateAPIView):
    permission_classes = [ReadOnly]
    queryset = User.objects.all() 
    serializer_class = serializers.UsersSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = User.objects.exclude(id=self.request.user.pk)
        searchFor =  self.request.GET.get('searchfor', None)

        if searchFor is not None:
            queryset = User.objects.exclude(id=self.request.user.pk).filter(username__contains=self.request.GET.get('searchfor'))

        return queryset



##### GIVER ALL ØNSKELISTE SOM DEN USER  DU ER  LOGGET IN SOM IKKE EJER OG IKKE ER PRIVAT
class FindUsersSearchWishlists(generics.ListCreateAPIView):
    queryset = models.Wishlist.objects.all() 
    serializer_class = serializers.AllWishlistSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = models.Wishlist.objects.filter(user=self.request.GET.get('id')).exclude(is_private=True)

        return queryset



# class allwishlistsDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = models.Wishlist.objects.all() 
#     serializer_class = serializers.AllWishlistDetailSerializer

#     def get_queryset(self, *args, **kwargs):
#         queryset = models.Wishlist.objects.filter().exclude(is_private=True)
        
#         return queryset



class Wishlist(generics.ListCreateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = models.Wishlist.objects.all() 
    serializer_class = serializers.WishlistSerializer

    def get_queryset(self):
        queryset = models.Wishlist.objects.filter(user=self.request.user)
        return queryset



class WishlistDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer









class Wish(generics.ListCreateAPIView):
    # permission_classes = [IsOwnerOrReadOnly] ############### THIS DOESN'T WORK
    queryset = models.Wish.objects.all() 
    serializer_class = serializers.WishSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        print(pk)
        queryset = models.Wish.objects.filter(wishlist_id=pk)
        return queryset
        

class WishDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = models.Wish.objects.all()
    serializer_class = serializers.WishSerializer





class ReservedWish(generics.ListCreateAPIView):
    queryset = models.ReservedWish.objects.all() 
    serializer_class = serializers.ReservedWishSerializer


class ReservedWishDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsOwnerOrReadOnly]
    queryset = models.ReservedWish.objects.all()
    serializer_class = serializers.ReservedWishSerializer

