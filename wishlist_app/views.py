from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required


def index(request):
    return render(request, 'wishlist_app/index.html')

def signup(request):
    return render(request, 'wishlist_app/signup.html')

def login(request):
    return render(request, 'wishlist_app/login.html')

def passwordReset(request):
    return render(request, 'wishlist_app/password-reset.html')

@login_required(login_url='/login/', redirect_field_name=None)
def search(request):
    return render(request, 'wishlist_app/search.html')

@login_required(login_url='/login/', redirect_field_name=None)
def profile(request):
    return render(request, 'wishlist_app/profile.html')

# @login_required(login_url='/login/', redirect_field_name=None)
def mywishlist(request):
    return render(request, 'wishlist_app/mywishlist.html')

# @login_required(login_url='/login/', redirect_field_name=None)
def mywishlistdetail(request, id):
    return render(request, 'wishlist_app/mywishlistdetail.html')









#DASHBOARD - 1. OVERVIEW OF WISHLISTS I FOLLOW, 2. SEARCH FOR USERS, 3. RETURN SEARCHED USERS WISHLISTS (WHO HAS PUBLIC WISHLISTS)

#PROFILE PAGE - 1. OVERVIEW OF YOUR OWN WISHLISTS, 2. PROFILE INFORMATION (POSSIBLITY TO UPDATE YOUR PROFILE INFORMATION)

#WISHLIST SINGLE PAGE - 1. SHOW ALL WISHES BELONGING TO SPECIFIC WISHLIST, 2. UPDATE WISHLIST INFO, 3. UPDATE EACH WISH INFO




##### -------------------- EXTRA ---------------------------

# FOLLOW A PUBLIC WISHLIST 
# RESERVE WISH ON FOLLOWED WISHLIST (ONLY POSSIBLITY TO FOR ONE USER TO RESERVE A WISH )
# LET THE USER SEND OUT A EMAIL TO WISHLIST FOLLOWERS WITH "I HAVE UPDATED MY WISHLIST GO CHECK IT OUT!"








# @login_required(login_url='/signup/', redirect_field_name=None)