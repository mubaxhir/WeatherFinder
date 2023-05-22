from django.contrib import admin

from taskapi.models import Cities, UserCoordinates

# Register your models here.
admin.site.register(UserCoordinates)
admin.site.register(Cities)