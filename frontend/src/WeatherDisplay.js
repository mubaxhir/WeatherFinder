import React, { Component } from "react";
import { WiDaySunny, WiDayCloudyGusts, WiDayCloudy, WiDayFog, WiDayRain, WiDayRainMix, WiDayShowers, WiDaySnow, WiDaySprinkle, WiDayStormShowers, WiDayThunderstorm, WiNightClear, WiNightCloudy, WiNightCloudyGusts, WiNightFog, WiNightRain, WiNightRainMix, WiNightShowers, WiNightSnow, WiNightSprinkle, WiNightStormShowers, WiNightThunderstorm } from 'react-icons/wi';


class WeatherDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city,
      weatherIsHidden: props.weatherIsHidden,
      weatherData: props.weatherData,
    };
  }

  

  render() {
    const { city, weatherIsHidden, weatherData } = this.state;

    const getWeatherIcon = (symbolNumber) => {
        const isDaytime = symbolNumber >= 0 && symbolNumber <= 16;
        let iconComponent = null;
    
        if (isDaytime) {
            switch (symbolNumber) {
                case 1:
                    iconComponent = <WiDaySunny />;
                    break;
                case 2:
                    iconComponent = <WiDayCloudy />;
                    break;
                case 3:
                    iconComponent = <WiDayCloudyGusts />;
                    break;
                case 4:
                    iconComponent = <WiDayCloudy />;
                    break;
                case 5:
                    iconComponent = <WiDayRain />;
                    break;
                case 6:
                    iconComponent = <WiDayRainMix />;
                    break;
                case 7:
                    iconComponent = <WiDaySnow />;
                    break;
                case 8:
                    iconComponent = <WiDayShowers />;
                    break;
                case 9:
                    iconComponent = <WiDaySnow />;
                    break;
                case 10:
                    iconComponent = <WiDayRainMix />;
                    break;
                case 11:
                    iconComponent = <WiDayFog />;
                    break;
                case 12:
                    iconComponent = <WiDayFog />;
                    break;
                case 13:
                    iconComponent = <WiDayRain />;
                    break;
                case 14:
                    iconComponent = <WiDayThunderstorm />;
                    break;
                case 15:
                    iconComponent = <WiDaySprinkle />;
                    break;
                case 16:
                    iconComponent = <WiDayStormShowers />;
                    break;
                default:
                    iconComponent = null;
                    break;
            }
        } else {
            switch (symbolNumber) {
                case 101:
                    iconComponent = <WiNightClear />;
                    break;
                case 102:
                    iconComponent = <WiNightCloudy />;
                    break;
                case 103:
                    iconComponent = <WiNightCloudyGusts />;
                    break;
                case 104:
                    iconComponent = <WiNightCloudy />;
                    break;
                case 105:
                    iconComponent = <WiNightRain />;
                    break;
                case 106:
                    iconComponent = <WiNightRainMix />;
                    break;
                case 107:
                    iconComponent = <WiNightSnow />;
                    break;
                case 108:
                    iconComponent = <WiNightShowers />;
                    break;
                case 109:
                    iconComponent = <WiNightSnow />;
                    break;
                case 110:
                    iconComponent = <WiNightShowers />;
                    break;
                case 111:
                    iconComponent = <WiNightFog />;
                    break;
                case 112:
                    iconComponent = <WiNightFog />;
                    break;
                case 113:
                    iconComponent = <WiNightRain />;
                    break;
                case 114:
                    iconComponent = <WiNightThunderstorm />;
                    break;
                case 115:
                    iconComponent = <WiNightSprinkle />;
                    break;
                case 116:
                    iconComponent = <WiNightStormShowers />;
                    break;
                default:
                    iconComponent = null;
                    break;
            }
        }
    
        return iconComponent;
    };

    if (weatherIsHidden) {
      return null;
    }

    return (
      <div>
        <h1>Weather for {city}</h1>
        <h2>Maximum Temperature: {weatherData.max_temp}</h2>
        <h2>Minimum Temperature: {weatherData.min_temp}</h2>
        <h2>Weather : {getWeatherIcon(weatherData.weather_icon)}</h2>
        <h2>Precipitation: {weatherData.precip}</h2>
        <h2>Temperature: {weatherData.temp}</h2>
        <h2>Wind Speed: {weatherData.wind_speed}</h2>
        <h2>Wind Direction: {weatherData.wind_direction}</h2>
      </div>
    );
  }
}

export default WeatherDisplay;