from django.db import models
import requests

# Create your models here.

class UserCoordinates(models.Model):
    username = models.CharField(max_length=255)
    longitude = models.CharField(max_length=50)
    latitude = models.CharField(max_length=50)
    
    def __str__(self):
        return self.username
    
    def get_weather_data(self):
        url = f"https://api.meteomatics.com/todayT00:00:00ZP0D:PT1H/weather_symbol_24h:idx,t_max_2m_24h:C,t_min_2m_24h:C/{self.longitude},{self.latitude}/json"
        payload={}
        headers = {
        'Authorization': 'Basic cG9zdG1hbl9jb21tdW5pdHk6Uk1OUE1kMndEcUJK'
        }

        response = requests.request("GET", url, headers=headers, data=payload)
        response = response.json()
        return dict({
            'max_temp':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "t_max_2m_24h:C" ][0],
            'min_temp':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "t_min_2m_24h:C" ][0],
            'icon':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "weather_symbol_24h:idx" ][0],
        })
        
        
    def get_detail_weather_data(self):
        weather_url = f"https://api.meteomatics.com/todayT00:00:00ZP1D:PT1H/t_2m:C,precip_1h:mm,wind_speed_10m:ms,wind_dir_10m:d,weather_symbol_1h:idx/{self.latitude},{self.longitude}/json"
        payload={}
        headers = {
        'Authorization': 'Basic bm9uZV9iYWJhcjowVHBPdEQ4VHk3'
        }

        response = requests.request("GET", weather_url, headers=headers, data=payload)
        response = response.json()
        
        for x in response['data']:
            if x['parameter'] ==  "t_2m:C" : 
                x_axis = [y['date'] for y in x['coordinates'][0]['dates']]
                temp = [y['value'] for y in x['coordinates'][0]['dates']]
            elif x['parameter'] ==  "precip_1h:mm" : 
                precip = [y['value'] for y in x['coordinates'][0]['dates']]
            elif x['parameter'] ==  "wind_speed_10m:ms": 
                wind_speed = [y['value'] for y in x['coordinates'][0]['dates']]
            elif x['parameter'] ==  "wind_dir_10m:d": 
                wind_dir = [y['value'] for y in x['coordinates'][0]['dates']]
            elif x['parameter'] ==  "weather_symbol_1h:idx": 
                weather = [y['value'] for y in x['coordinates'][0]['dates']]
                
        respones = {
            'x_axis': x_axis,
            'temp': temp,
            'precip': precip,
            'wind_speed': wind_speed,
            'wind_dir': wind_dir,
            'weather': weather
        }
        
        return respones


    class Meta:
        db_table = "user_coordinates"


class Cities(models.Model):
    city_id = models.IntegerField()
    region_id = models.IntegerField()
    name_ar = models.CharField(max_length=50)
    name_en = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)
    latitude = models.CharField(max_length=50)

    class Meta:
        db_table = "cities"
        
    def get_weather_data(self):
        url = f"https://api.meteomatics.com/todayT00:00:00ZP0D:PT1H/t_2m:C,precip_1h:mm,wind_speed_10m:ms,wind_dir_10m:d,weather_symbol_24h:idx,t_max_2m_24h:C,t_min_2m_24h:C/{self.longitude},{self.latitude}/json"
        payload={}
        headers = {
        'Authorization': 'Basic cG9zdG1hbl9jb21tdW5pdHk6Uk1OUE1kMndEcUJK'
        }

        response = requests.request("GET", url, headers=headers, data=payload)
        response = response.json()
        return dict({
            'temprature':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "t_2m:C" ][0],
            'precip':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "precip_1h:mm" ][0],
            'wind_speed':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "wind_speed_10m:ms" ][0],
            'wind_direction':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "wind_dir_10m:d" ][0],
            'max_temp':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "t_max_2m_24h:C" ][0],
            'min_temp':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "t_min_2m_24h:C" ][0],
            'weather_icon':[x['coordinates'][0]['dates'][0]['value'] for x in response['data'] if x['parameter'] ==  "weather_symbol_24h:idx" ][0],
        })
        
        
    def get_detail_weather_data(self):
        weather_url = f"https://api.meteomatics.com/todayT00:00:00ZP1D:PT1H/t_2m:C,precip_1h:mm,wind_speed_10m:ms,wind_dir_10m:d,weather_symbol_1h:idx/{self.latitude},{self.longitude}/json"
        payload={}
        headers = {
        'Authorization': 'Basic bm9uZV9iYWJhcjowVHBPdEQ4VHk3'
        }

        response = requests.request("GET", weather_url, headers=headers, data=payload)
        response = response.json()
        
        for x in response['data']:
            if x['parameter'] ==  "t_2m:C" : 
                x_axis = [y['date'] for y in x['coordinates'][0]['dates']]
                temp = [y['value'] for y in x['coordinates'][0]['dates']]
            elif x['parameter'] ==  "precip_1h:mm" : 
                precip = [y['value'] for y in x['coordinates'][0]['dates']]
            elif x['parameter'] ==  "wind_speed_10m:ms": 
                wind_speed = [y['value'] for y in x['coordinates'][0]['dates']]
            elif x['parameter'] ==  "wind_dir_10m:d": 
                wind_dir = [y['value'] for y in x['coordinates'][0]['dates']]
            elif x['parameter'] ==  "weather_symbol_1h:idx": 
                weather = [y['value'] for y in x['coordinates'][0]['dates']]
                
        respones = {
            'x_axis': x_axis,
            'temp': temp,
            'precip': precip,
            'wind_speed': wind_speed,
            'wind_dir': wind_dir,
            'weather': weather
        }
        
        return respones