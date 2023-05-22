from django.urls import path, include

from taskapi.viewsets import CitiesViewset
from .views import UserCoordinatesView, WeatherAPI, get_city_weather_data, get_city_weather_hourly_data

urlpatterns = [
    path('user_coordinates/', UserCoordinatesView.as_view(), name='user-coordinates'),
    path('weather/', WeatherAPI.as_view(), name='weather'),    
    path('user_coordinates/<str:coordinate_id>/', UserCoordinatesView.as_view(), name='user-coordinates'),
    path('city-chart/<str:city_id>/', get_city_weather_hourly_data, name='user-coordinates'),
    path('weather/<str:coordinate_id>/', WeatherAPI.as_view(), name='weather'),
    path('cities/', CitiesViewset.as_view({'get': 'list'})),
    path('cities/weather/<int:city_id>/', get_city_weather_data, name="city_weather"),
]
