from django.contrib.auth.models import User
from django.db import models


class Wishlist(models.Model):
    user            = models.ForeignKey(User, on_delete=models.CASCADE)
    title           = models.CharField(max_length=50)
    is_private      = models.BooleanField(default=False)
    followed_by     = models.ManyToManyField(User, related_name='follwed_by', blank=True)
    
    def __str__(self):
        return f"{self.user.id} - {self.title}"



class Wish(models.Model):
    user            = models.ForeignKey(User, on_delete=models.CASCADE)
    wishlist_id     = models.ForeignKey(Wishlist, on_delete=models.CASCADE) ## Kan man filtrer på at man kun må redigere ønkser, hvis ønskeliste man ejer. Så man ikke behøver  at have user foreignkey i wish table
    title           = models.CharField(max_length=100)
    description     = models.CharField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.wishlist_id.pk} - {self.title} - {self.pk}"



class ReservedWish(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    wish = models.ForeignKey(Wish, on_delete=models.CASCADE)


    def __str__(self):
        return f"Reserved by user: {self.user.pk} - Wish ID: {self.wish.pk}"


### FOLLOWERS
### RESERVED WISHES

