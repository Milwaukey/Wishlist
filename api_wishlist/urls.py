from . import views
from django.urls import path, include
from . import api


urlpatterns = [
     path('allwishlists/', api.FindUsersSearchWishlists.as_view()),
     # path('allwishlists/<int:pk>/', api.allwishlistsDetail.as_view()),
     path('wishlists/', api.Wishlist.as_view()), 
     path('wishlists/<int:pk>/', api.WishlistDetail.as_view()),
     path('wishlists/<int:pk>/wishes/', api.Wish.as_view()),
     path('wishes/<int:pk>/', api.WishDetail.as_view(), name="wish-detail"),
     path('users/', api.AllUsers.as_view(), name="all-users"),
     # path('wishes/', api.Wish.as_view()), # ----> hvordan filtrer jeg at jeg kun vil se ønsker fra en specific ønskeliste

     path('reservedWishes/', api.ReservedWish.as_view()),
     path('reservedWishes/<int:pk>/', api.ReservedWishDetail.as_view()),

     # path('wishes/<int:pk>', api.WishDetail.as_view()),

]

