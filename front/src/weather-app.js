import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/weather', 
            {
                params: { city: city || 'Coimbatore' },
            });
            setWeather(response.data);
            setError(''); // Clear previous errors
        } catch (err) {
            setError('City not found');
            setWeather(null); // Clear previous weather data
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div>
                    <h2>{weather.city}</h2>
                    <p>{weather.status}</p>
                    <p>Temperature: {weather.temperature} °F</p>
                    <p>Feels like: {weather.feels_like} °F</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
