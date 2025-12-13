from django.contrib import admin
from .models import Guild, ClassRole, Membership, UserClass

admin.site.register(Guild)
admin.site.register(ClassRole)
admin.site.register(Membership)
admin.site.register(UserClass)
