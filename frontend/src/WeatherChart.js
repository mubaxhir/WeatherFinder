import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiDayCloudyGusts, WiDayCloudy, WiDayFog, WiDayRain, WiDayRainMix, WiDayShowers, WiDaySnow, WiDaySprinkle, WiDayStormShowers, WiDayThunderstorm, WiNightClear, WiNightCloudy, WiNightCloudyGusts, WiNightFog, WiNightRain, WiNightRainMix, WiNightShowers, WiNightSnow, WiNightSprinkle, WiNightStormShowers, WiNightThunderstorm } from 'react-icons/wi';
import './WeatherChart.css'

const WeatherChart = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    console.log(id)

    const [data, setData] = useState({
        x_axis:[], wind_dir: [], wind_speed: [], temp:[], weather:[], precip: []
    });

    useEffect(() => {
        const weatherUrl = `http://localhost:8000/api/user_coordinates/${id}/`;
        const headers = {
            'Content-Type': 'application/json',
        };
        const payload = {};

        fetch(weatherUrl, {
            headers,
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setData(data.weather_data);
            });
    }, []);

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

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Weather Chart</h1>
            <table>
                <thead>
                    <tr>
                        <th>Parameters</th>
                        {data.x_axis.map((header) => (
                            <th >{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th>Temperature</th>
                        {data.temp.map((x) => (
                            <td >{x}</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Precipitation</th>
                        {data.precip.map((x) => (
                            <td >{x}</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Wind Speed</th>
                        {data.wind_speed.map((x) => (
                            <td >{x}</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Wind Direction</th>
                        {data.wind_dir.map((x) => (
                            <td >{x}</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Weather</th>
                        {data.weather.map((x) => (
                            <td >{getWeatherIcon(x)}</td>
                        ))}
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default WeatherChart;
