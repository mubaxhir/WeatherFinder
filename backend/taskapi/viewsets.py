from rest_framework import viewsets
from . import models
from . import serializers
from django.db.models import Q

class CitiesViewset(viewsets.ModelViewSet):
    queryset = models.Cities.objects.all()
    serializer_class = serializers.CitiesSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        search_text = self.request.query_params.get('search')
        if search_text:
            queryset = queryset.filter( Q(name_en__icontains=search_text) | Q(name_ar__icontains=search_text))
        return queryset[:6]