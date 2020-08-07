from django.core.exceptions import PermissionDenied
from django.conf import settings
from django.shortcuts import redirect, reverse



class LoginRequiredMiddleware:

   def __init__(self, get_response):
      self.get_response = get_response
      # One-time configuration and initialization.

   def __call__(self, request):
      # Code to be executed for each request before - the view (and later middleware) are called:

      path = request.path_info.lstrip('/')

      if not request.user.is_authenticated:
         if not path in settings.LOGIN_NOT_REQUIRED:
            return redirect('wishlist_app:login')

            
      response = self.get_response(request)

      # Code to be executed for each request/response after - the view is called:

      return response


 