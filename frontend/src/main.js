import React, { useState, useEffect } from "react";
import { WiDaySunny, WiDayCloudyGusts, WiDayCloudy, WiDayFog, WiDayRain, WiDayRainMix, WiDayShowers, WiDaySnow, WiDaySprinkle, WiDayStormShowers, WiDayThunderstorm, WiNightClear, WiNightCloudy, WiNightCloudyGusts, WiNightFog, WiNightRain, WiNightRainMix, WiNightShowers, WiNightSnow, WiNightSprinkle, WiNightStormShowers, WiNightThunderstorm } from 'react-icons/wi';
import axios from 'axios';
import "./cities.css"
import PaginatedTablePage from './UserCoordinatesTable'

import {
    Link,
  } from "react-router-dom";

const MainPage = () => {
    // input reference to access it through DOM API in React
    const inputRef = React.createRef();

    // initial state
    const [city, setCity] = useState({});
    const [weatherData, setWeatherData] = useState({});
    const [description, setDescription] = useState({});
    const [weatherIsHidden, setWeatherIsHidden] = useState(true);
    const [dropdownHidden, setDropdownHidden] = useState(true);


    const [cities, setCities] = useState([]);
    const [searchtxt, setSearchTxt] = useState('');

    const getWeatherIcon = (symbolNumber) => {
        console.log(symbolNumber)
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
                    iconComponent = <WiNightRainMix />;
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

            return iconComponent;
        };
    }

    const updateWeatherData = (id) => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/cities/weather/${id}`
        })
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            setWeatherIsHidden(false);


    }

    const handleChange = (event) => {
        const searchText = event.target.value;
        setSearchTxt(searchText);
        if (searchtxt == "") {
            setCities([]);
        } else {
            axios({
                method: 'get',
                url: 'http://localhost:8000/api/cities/?search=' + searchText,
            })
                .then((response) => {
                    setCities(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setDropdownHidden(false)

    };
    // render
    return (
        <div className="container background">
            <div className="header">
                <h3></h3>
                <h1 id="brand-name">Weather Data</h1>
                <p id="brand-description">search cities</p>
            </div>

            {/* Use ref to access DOM elements in React */}
            <div className='searchbox'>
                <input type="text" placeholder="Search city" value={searchtxt} onChange={handleChange} />
                { !dropdownHidden ? <ul>
                    {cities.map((city) => (
                        <li key={city.id} value={city.id} onClick={() => {
                            // This function will be called when the li element is clicked
                            // The key of the clicked element will be passed as an argument
                            setCity(city)
                            updateWeatherData(city.id)
                            console.log(city);
                            setDropdownHidden(true)
                        }}
                        >{city.name_en}</li>
                    ))}
                </ul>: null }
                
            </div>
            <br></br>

            {
                !weatherIsHidden ? <div>
                    <h1>Weather for {city.name_en}</h1>
                    <h2>Maximum Temperature: {weatherData.max_temp}</h2>
                    <h2>Minimum Temperature: {weatherData.min_temp}</h2>
                    <h2>Precipitation: {weatherData.precip}</h2>
                    <h2>Temperature: {weatherData.temprature}</h2>
                    <h2>Wind Speed: {weatherData.wind_speed}</h2>
                    <h2>Wind Direction: {weatherData.wind_direction}</h2>
                    <button><Link to={`/city-chart?id=${city.id}`}> open hourly weather data </Link>
                    </button> 
                </div> : null
            }

            <PaginatedTablePage />
        </div>
    );
};

export default MainPage;
