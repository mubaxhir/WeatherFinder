from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    longitude = models.CharField(max_length=50)
    latitude = models.CharField(max_length=50)

    def __str__(self):
        return self.username

    class Meta:
        db_table = "users"