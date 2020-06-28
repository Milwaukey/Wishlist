from django.shortcuts import render, reverse
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.http import HttpResponseRedirect

# TO SEND EMAIL WITH PASSWORD RESET
from django.contrib.auth.models import User
from . models import PasswordResetRequest
import django_rq
from . messaging import email_message
from api_wishlist.models import Wishlist, Wish, ReservedWish

from django.db import connection




def index(request):
    return render(request, 'wishlist_app/index.html')

def signup(request):
    return render(request, 'wishlist_app/signup.html')

def login(request):

    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('wishlist_app:profile'))

    return render(request, 'wishlist_app/login.html')

def passwordReset(request):
    if request.method == 'POST':
        print('PASSWORD RESET')

        post_user = request.POST['username']
        user = None

        if post_user:
            try:
                user = User.objects.get(username=post_user)
            except:
                print(f"INVALID PASSWORD REQUEST: {post_user}")
        else:
            post_user = request.POST['email']
            try:
                user = User.objects.get(email=post_user)
            except:
                print(f"INVALID PASSWORD REQUEST: {post_user}")

        if user:
            prr = PasswordResetRequest()
            prr.user = user
            prr.save()
            # print(prr)
            django_rq.enqueue(email_message, {
               'token': prr.token,
               'username':prr.user.username,
               'email': prr.user.email,
            })
            return HttpResponseRedirect(reverse('wishlist_app:login'))

    return render(request, 'wishlist_app/password-reset.html')


def request_password_reset(request):

    if request.method == 'POST':
        token = request.POST['token']
        # username = request.POST['username']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password == confirm_password:
            try:
                prr = PasswordResetRequest.objects.get(token=token)
                # prr.save() Saves and automaticllya updates the updated_timestamp, so we kjnow the token has been used
                prr.save()
            except:
                print('INVALID PASSWORD ATTEMPTED')
                return render(request, 'wishlist_app/confirm-password-reset.html')

            user = prr.user
            user.set_password(password)
            user.save()
            return HttpResponseRedirect(reverse('wishlist_app:login'))
        
        else:
            return render(request, 'wishlist_app/confirm-password-reset.html')

    return render(request, 'wishlist_app/confirm-password-reset.html')

def search(request):
    return render(request, 'wishlist_app/search.html')

def profile(request):
    context = {}
    myReservedWishes = []

    ReservedWishes = ReservedWish.objects.filter(user=request.user.pk)
    wishes = Wish.objects.filter()

    if len(ReservedWishes) > 0:
        for wish in wishes:
            for rWish in ReservedWishes:
                if wish.pk == rWish.wish.pk:
                    case = {"wishID": wish.pk, "wishlistID": wish.wishlist_id.id, "title": wish.title, "description": wish.description, "userID":wish.user.pk }
                    myReservedWishes.append(case)
        
        context = {
            "myReservedWishes": myReservedWishes
        }
    else:
        context = {
            'error': 'You have not reserved any wishes yet!'
        }

    return render(request, 'wishlist_app/profile.html', context)


def profileSearch(request, pk):
    userSearched = User.objects.filter(pk = pk)
    current_user = request.user

    if current_user.pk == pk :
        print(current_user.pk)
        print(pk)
        print('LOGGED IN USER CANNOT SEARCH ON HIMSELF')
        return HttpResponseRedirect(reverse('wishlist_app:profile'))
    else:
        context = {
            "user": userSearched
        }
        return render(request, 'wishlist_app/profileSearch.html', context)

    return render(request, 'wishlist_app/profileSearch.html')


def mywishlist(request):
    return render(request, 'wishlist_app/mywishlist.html')

def mywishlistdetail(request, id):
    return render(request, 'wishlist_app/mywishlistdetail.html')


def wishlist(request, pk, id):
    wishes = Wish.objects.filter(wishlist_id=id).exists()

    if request.user.pk == pk :
        print(request.user.pk)
        print(pk)
        print('LOGGED IN USER CANNOT SEARCH ON HIMSELF')
        return HttpResponseRedirect(reverse('wishlist_app:profile'))
    else:
        if wishes:
            wishes = Wish.objects.filter(wishlist_id=id)
            reversedWish = ReservedWish.objects.filter()
            

            print(reversedWish)
            print('Wishlist exists')
            context = {
                "wishes" : wishes,
                "userID" : request.user.pk,
                "reservedWishes": reversedWish
            }
            return render(request, 'wishlist_app/wishlist.html', context)
        else:   
            print('Wishlist DOESNT exists')
            return HttpResponseRedirect(reverse('wishlist_app:search'))

    return render(request, 'wishlist_app/wishlist.html')



def deleteAccount(request):
    context = {}

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user:
            user.delete()
            return HttpResponseRedirect(reverse('wishlist_app:index'))
        else:
            context = {
                'error':'Could not delete account, try again!'
            }
            print('Could not delete account!')

    return render(request, 'wishlist_app/delete-account.html', context)



#DASHBOARD - 1. OVERVIEW OF WISHLISTS I FOLLOW, 2. SEARCH FOR USERS, 3. RETURN SEARCHED USERS WISHLISTS (WHO HAS PUBLIC WISHLISTS)

#PROFILE PAGE - 1. OVERVIEW OF YOUR OWN WISHLISTS, 2. PROFILE INFORMATION (POSSIBLITY TO UPDATE YOUR PROFILE INFORMATION)

#WISHLIST SINGLE PAGE - 1. SHOW ALL WISHES BELONGING TO SPECIFIC WISHLIST, 2. UPDATE WISHLIST INFO, 3. UPDATE EACH WISH INFO




##### -------------------- EXTRA ---------------------------

# FOLLOW A PUBLIC WISHLIST 
# RESERVE WISH ON FOLLOWED WISHLIST (ONLY POSSIBLITY TO FOR ONE USER TO RESERVE A WISH )
# LET THE USER SEND OUT A EMAIL TO WISHLIST FOLLOWERS WITH "I HAVE UPDATED MY WISHLIST GO CHECK IT OUT!"








# @login_required(login_url='/signup/', redirect_field_name=None)