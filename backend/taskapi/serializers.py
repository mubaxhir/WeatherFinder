from rest_framework import serializers
from .models import Cities, UserCoordinates

class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cities
        fields = '__all__'
        
class UserCoordinateSerializer(serializers.ModelSerializer):
    weather_data = serializers.SerializerMethodField()
    
    class Meta:
        model = UserCoordinates
        fields = '__all__'
        
    def get_weather_data(self, obj):
        return obj.get_detail_weather_data()      
    
class CitySerializer(serializers.ModelSerializer):
    weather_data = serializers.SerializerMethodField()
    
    class Meta:
        model = Cities
        fields = '__all__'
        
    def get_weather_data(self, obj):
        return obj.get_detail_weather_data()      
        
class UserCoordinatesSerializer(serializers.ModelSerializer):
    weather_data = serializers.SerializerMethodField()
    
    class Meta:
        model = UserCoordinates
        fields = '__all__'
        
    def get_weather_data(self, obj):
        return obj.get_weather_data()        
        