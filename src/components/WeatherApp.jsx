import React, { useState } from 'react';
import '../index.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const apiKey = "ae1763e85fdfb4cc8d781401207b5dc5";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const checkWeather = async () => {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (response.status === 404) {
                setError("Invalid city name");
                setWeatherData(null);
            } else {
                const data = await response.json();
                setWeatherData(data);
                setError('');
            }
        } catch (err) {
            setError("An error occurred while fetching the weather data.");
            setWeatherData(null);
        }
    };

    return (
        <div className="card">
            <div className="search">
                <input
                    type="text"
                    placeholder="Enter City Name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={checkWeather}>
                    <img src="/images/search.png" alt="Search" />
                </button>
            </div>
            {error && <div className="error">{error}</div>}
            {weatherData && (
                <div className="weather">
 <img
    src={`/images/${weatherData.weather[0].main.toLowerCase()}.png`}
    alt="Weather Icon"
    className="weather-icon"
    onError={(e) => {
        console.error(`Failed to load image: ${e.target.src}`);
        e.target.src = '/images/default.png'; // Fallback image
    }}
/>             <h1 className="temp">{Math.round(weatherData.main.temp)}°c</h1>    
                    <h2 className="city">{weatherData.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="/helper/humidity.png" alt="Humidity" />
                                 <div>
                                <p className="humidity">{weatherData.main.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="/helper/wind.png" alt="Wind" />
                            <div>
                                <p className="wind">{weatherData.wind.speed} km/h</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;