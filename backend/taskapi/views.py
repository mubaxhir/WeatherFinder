import json
from django.views.generic.base import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
from django.utils.decorators import method_decorator
from taskapi.models import Cities, UserCoordinates
from taskapi.serializers import CitySerializer, UserCoordinateSerializer, UserCoordinatesSerializer

@method_decorator(csrf_exempt, name='dispatch')
class UserCoordinatesView(View):
    def get(self, request, coordinate_id=None):
        if coordinate_id:
            user_coordinates = UserCoordinates.objects.get(id=coordinate_id)
            return JsonResponse(UserCoordinateSerializer(user_coordinates, many=False).data)
        else:
            # user_coordinates = UserCoordinates.objects.all()
            # return JsonResponse(UserCoordinatesSerializer(user_coordinates, many=True).data, safe=False)
            res = [{"id": 1, "weather_data": {"max_temp": 27.1, "min_temp": 10.1, "icon": 1}, "username": "test", "longitude": "28.65152001", "latitude": "35.38013"}, {"id": 2, "weather_data": {"max_temp": 27.1, "min_temp": 10.1, "icon": 1}, "username": "test2", "longitude": "28.65152001", "latitude": "35.38013"}, {"id": 3, "weather_data": {"max_temp": 38.2, "min_temp": 24.5, "icon": 1}, "username": "test3", "longitude": "21.42717994", "latitude": "39.84349001"}, {"id": 4, "weather_data": {"max_temp": 38.2, "min_temp": 24.5, "icon": 1}, "username": "test4", "longitude": "21.42717994", "latitude": "39.84349001"}, {"id": 5, "weather_data": {"max_temp": 38.2, "min_temp": 24.5, "icon": 1}, "username": "test5", "longitude": "21.42717994", "latitude": "39.84349001"}, {"id": 6, "weather_data": {"max_temp": 39.1, "min_temp": 26.1, "icon": 1}, "username": "test6", "longitude": "22.42717994", "latitude": "39.84349001"}, {"id": 7, "weather_data": {"max_temp": 37.1, "min_temp": 19.8, "icon": 1}, "username": "test7", "longitude": "22.42717994", "latitude": "40.84349001"}]
            return JsonResponse(res, safe=False)

    @csrf_exempt
    def post(self, request):
        data = json.loads(request.body)
        
        user_coordinates = UserCoordinates(
            username=data['username'],
            longitude=data['longitude'],
            latitude=data['latitude']
        )
        user_coordinates.save()
        return JsonResponse(UserCoordinatesSerializer(user_coordinates).data, safe=False)

    @csrf_exempt
    def put(self, request, coordinate_id):
        data = json.loads(request.body)
        print(data)
        try:
            user_coordinates = UserCoordinates.objects.get(id=coordinate_id)
            user_coordinates.username = data['username']
            user_coordinates.longitude = data['longitude']
            user_coordinates.latitude = data['latitude']
            user_coordinates.save()
            return JsonResponse({'success': True}, status=200)
        except UserCoordinates.DoesNotExist as e:
            return JsonResponse({'error': str(e)}, status=404)

    @csrf_exempt
    def delete(self, request, coordinate_id):
        try:
            user_coordinates = UserCoordinates.objects.get(id=coordinate_id)
            user_coordinates.delete()
            return JsonResponse({'success': True}, status=200)
        except UserCoordinates.DoesNotExist as e:
            return JsonResponse({'error': str(e)}, status=404)


def get_city_weather_data(request, city_id):
    data = Cities.objects.get(id=city_id).get_weather_data()
    return JsonResponse(data)

def get_city_weather_hourly_data(request, city_id):
    data = Cities.objects.get(id=city_id)
    return JsonResponse(CitySerializer(data, many=False).data)

@method_decorator(csrf_exempt, name='dispatch')
class WeatherAPI(View):

    def get(self, request, coordinate_id):
        if coordinate_id:
            user_coordinates = UserCoordinates.objects.get(id=coordinate_id)
            
            weather_url = f"https://api.meteomatics.com/todayT00:00:00ZP15D:PT1H/t_2m:C,precip_1h:mm,wind_speed_10m:ms,wind_dir_10m:d,weather_symbol_24h:idx,weather_symbol_24h:idx,t_max_2m_24h:C,t_min_2m_24h:C/{user_coordinates.latitude},{user_coordinates.longitude}/json"
            
            # get weather data from the weather api
            payload={}
            headers = {
            'Authorization': 'Basic cG9zdG1hbl9jb21tdW5pdHk6Uk1OUE1kMndEcUJK'
            }

            response = requests.request("GET", weather_url, headers=headers, data=payload)            
            return JsonResponse(response.json(), safe=False)
        
        
        # except Exception as e:
        #     return JsonResponse({'error': str(e)}, status=400)
