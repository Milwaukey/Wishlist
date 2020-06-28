from django.contrib import admin
from . import models


admin.site.register(models.Wishlist)
admin.site.register(models.Wish)
admin.site.register(models.ReservedWish)