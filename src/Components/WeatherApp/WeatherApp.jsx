import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloudy_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import wind_icon from '../Assets/wind.png';
import snow_icon from '../Assets/snow.png';

const WeatherApp = () => {
	const [weatherData, setWeatherData] = useState({
		humidity: '76',
		windSpeed: '1.54',
		temperature: '24',
		location: 'London',
	});

	const [weatherIcon, setWeatherIcon] = useState(cloudy_icon);

	let weather_api_key = process.env.REACT_APP_API_KEY;

	const search = async () => {
		let url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.location}&units=Metric&appid=${weather_api_key}`;
		console.log(url);

		try {
			let res = await fetch(url);

			if (res.ok) {
				let data = await res.json();

				// Update state with fetched data
				setWeatherData({
					humidity: Math.round(data.main.humidity),
					windSpeed: data.wind.speed,
					temperature: Math.round(data.main.temp),
					location: data.name,
				});

				if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
					setWeatherIcon(clear_icon);
				} else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
					setWeatherIcon(cloudy_icon);
				} else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
					setWeatherIcon(cloudy_icon);
				} else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
					setWeatherIcon(cloudy_icon);
				} else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
					setWeatherIcon(snow_icon);
				} else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
					setWeatherIcon(drizzle_icon);
				} else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
					setWeatherIcon(rain_icon);
				} else if (data.weather[0].icon === '11d' || data.weather[0].icon === '11n') {
					setWeatherIcon(drizzle_icon);
				} else {
					setWeatherIcon(clear_icon);
				}
			} else {
				alert('City not found');
			}
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
	};

	return (
		<div className="container">
			<div className="top-bar">
				<input
					type="text"
					className="cityinput"
					placeholder="Search"
					value={weatherData.location}
					onChange={(e) => {
						setWeatherData({
							...weatherData,
							location: e.target.value,
						});
					}}
				/>
				<div className="search-icon" onClick={search}>
					<img src={search_icon} alt="" />
				</div>
			</div>
			<div className="weather-image">
				<img src={weatherIcon} alt="" />
			</div>
			<div className="weather-temp">{`${weatherData.temperature}°c`}</div>
			<div className="weather-location">{weatherData.location}</div>
			<div className="data-container">
				<div className="element">
					<img src={humidity_icon} alt="" className="icon" />
					<div className="data">
						<div className="humidity-percentage">{`${weatherData.humidity}%`}</div>
						<div className="text">Humidity</div>
					</div>
				</div>
				<div className="element">
					<img src={wind_icon} alt="" className="icon" />
					<div className="data">
						<div className="wind-speed">{`${weatherData.windSpeed} km/h`}</div>
						<div className="text">Wind Speed</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WeatherApp;
