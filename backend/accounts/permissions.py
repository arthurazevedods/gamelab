from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsMentorOrAdminOrReadOnly(BasePermission):
    """
    Leitura: qualquer autenticado.
    Escrita: somente ADMIN/MENTOR.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return request.user and request.user.is_authenticated
        if not (request.user and request.user.is_authenticated):
            return False
        profile = getattr(request.user, "profile", None)
        if not profile:
            return False
        return profile.role in ("ADMIN", "MENTOR")
