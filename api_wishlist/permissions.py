from rest_framework import permissions
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # The owner is always allowed edit
        return obj.user == request.user



class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS