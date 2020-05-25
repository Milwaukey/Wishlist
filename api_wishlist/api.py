from rest_framework import generics
from . import models
from . import serializers
from .permissions import IsOwnerOrReadOnly

## CREATE READ ONLY VIEW FOR WISHLISTS that's PUBLIC



##### GIVER ALL ØNSKELISTE SOM DEN USER  DU ER  LOGGET IN SOM IKKE EJER OG IKKE ER PRIVAT
class AllWishlist(generics.ListCreateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = models.Wishlist.objects.all() 
    serializer_class = serializers.WishlistSerializer

    def get_queryset(self):
        queryset = models.Wishlist.objects.exclude(user=self.request.user).exclude(is_private=True)
        return queryset


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


