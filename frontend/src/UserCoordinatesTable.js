import React, { useState, useEffect } from 'react';
import { WiDaySunny, WiDayCloudyGusts, WiDayCloudy, WiDayFog, WiDayRain, WiDayRainMix, WiDayShowers, WiDaySnow, WiDaySprinkle, WiDayStormShowers, WiDayThunderstorm, WiNightClear, WiNightCloudy, WiNightCloudyGusts, WiNightFog, WiNightRain, WiNightRainMix, WiNightShowers, WiNightSnow, WiNightSprinkle, WiNightStormShowers, WiNightThunderstorm } from 'react-icons/wi';
import './UserCoordinatesTable.css';
import {
    Link,
  } from "react-router-dom";

const PaginatedTablePage = () => {
    const [coordinates, setCoordinates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coordinatesPerPage] = useState(5);
    const [editingCoordinate, setEditingCoordinate] = useState(null);

    const api_url = "http://localhost:8000/api/user_coordinates/"


    useEffect(() => {
        // Fetch user coordinates from API
        fetch(api_url)
            .then((response) => response.json())
            .then((data) => setCoordinates(data))
            .catch((error) => setCoordinates([]));
    }, []);

    // Get current coordinates based on pagination
    const indexOfLastCoordinate = currentPage * coordinatesPerPage;
    const indexOfFirstCoordinate = indexOfLastCoordinate - coordinatesPerPage;
    const currentCoordinates = coordinates.slice(indexOfFirstCoordinate, indexOfLastCoordinate);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteCoordinate = (id) => {
        // Send DELETE request to API
        fetch(`http://localhost:8000/api/user_coordinates/${id}/`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                // Update the coordinates state after successful deletion
                setCoordinates(coordinates.filter((coordinate) => coordinate.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting coordinate:', error);
            });
    };

    const saveCoordinate = (coordinate) => {
        if (editingCoordinate) {
            // Send PUT request to update existing coordinate
            fetch(`http://localhost:8000/api/user_coordinates/${editingCoordinate.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coordinate),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Update the coordinates state after successful update
                    setCoordinates(
                        coordinates.map((c) => (c.id === data.id ? data : c))
                    );
                    setEditingCoordinate(null);
                })
                .catch((error) => {
                    console.error('Error updating coordinate:', error);
                });
        } else {
            // Send POST request to create a new coordinate
            fetch('http://localhost:8000/api/user_coordinates/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coordinate),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    // Update the coordinates state after successful creation
                    setCoordinates([...coordinates, data]);
                })
                .catch((error) => {
                    console.error('Error creating coordinate:', error);
                });
        }
    };

    const editCoordinate = (coordinate) => {
        setEditingCoordinate(coordinate);
    };

    const cancelEdit = () => {
        setEditingCoordinate(null);
    };

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
    const handleInputChange = (e) => {
        setEditingCoordinate({
          ...editingCoordinate,
          [e.target.name]: e.target.value,
        });
      };

    return (
        <div>
  <h1>User Coordinates</h1>
  <table className="coordinates-table">
    <thead>
      <tr>
        <th>Username</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Max Temperature</th>
        <th>Min Temperature</th>
        <th>Weather</th>
        <th>Action</th>

      </tr>
    </thead>
    <tbody>
      {currentCoordinates.map((coordinate) => (
        <tr key={coordinate.id}>              
              {editingCoordinate && editingCoordinate.id === coordinate.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="username"
                      value={editingCoordinate.username}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="latitude"
                      value={editingCoordinate.latitude}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="longitude"
                      value={editingCoordinate.longitude}
                      onChange={handleInputChange}
                    />
                  </td>
                </>
              ) : (
                <>
                <td>{coordinate.username}</td>
                <td>{coordinate.latitude}</td>
                <td>{coordinate.longitude}</td>
                </>
              )}
              <td>{coordinate.weather_data.max_temp}°C</td>
              <td>{coordinate.weather_data.min_temp}°C</td>
              <td>{getWeatherIcon(coordinate.weather_data.icon)}</td>
              <td>
                {editingCoordinate && editingCoordinate.id === coordinate.id ? (
                  <>
                    <button onClick={() => saveCoordinate(editingCoordinate)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => editCoordinate(coordinate)}>Edit</button>
                    <button onClick={() => deleteCoordinate(coordinate.id)}>Delete</button>
                    <Link to={`weather-chart?id=${coordinate.id}`}> <button>View</button> </Link>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
  </table>

  {/* Pagination */}
  <div className="pagination">
                {Array.from(Array(Math.ceil(coordinates.length / coordinatesPerPage)).keys()).map((pageNumber) => (
                    <button key={pageNumber} onClick={() => paginate(pageNumber + 1)}>
                        {pageNumber + 1}
                    </button>
                ))}
            </div>
</div>

    );
};

export default PaginatedTablePage;
