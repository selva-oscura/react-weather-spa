import React from 'react';
import icons from '../resources/icons.js';

const Detail = ({currLocation, settings}) => {
	let windDirection;
	let deg = currLocation.apiResponse.wind.deg;
	if(deg>348.75 || deg<11.25){
		windDirection = "N";
	}else if(deg<33.75){
		windDirection = "NNE";
	}else if(deg<56.25){
		windDirection = "NE";
	}else if(deg<78.75){
		windDirection = "ENE";
	}else if(deg<101.25){
		windDirection = "E";
	}else if(deg<123.75){
		windDirection = "ESE";
	}else if(deg<146.25){
		windDirection = "SE";
	}else if(deg<168.75){
		windDirection = "SSE";
	}else if(deg<191.25){
		windDirection = "S";
	}else if(deg<213.75){
		windDirection = "SSW";
	}else if(deg<236.25){
		windDirection = "SW";
	}else if(deg<258.75){
		windDirection = "WSW";
	}else if(deg<281.25){
		windDirection = "W";
	}else if(deg<303.75){
		windDirection = "WNW";
	}else if(deg<326.25){
		windDirection = "NW";
	}else if(deg<348.75){
		windDirection = "NNW";
	}else{
		windDirection="oops.... a mistake with "+deg+" degrees";
	}
	let loc = `icon${currLocation.apiResponse.weather[0].icon}`;
	let localAddress =icons[loc];
	return (
		<div
			className="Detail"
		>
			<h2>Detail</h2>
			<h2 className="summary"><img src={localAddress} alt={currLocation.apiResponse.weather[0].description}/> 
			{currLocation.city[0].toUpperCase() + currLocation.city.slice(1).toLowerCase()}, {currLocation.country}</h2>
			<p>Current Conditions: {currLocation.apiResponse.weather[0].description}</p>
			<p>
				Temperature: {Math.round(currLocation.apiResponse.main.temp)}
				{settings.tempFormat==="metric" ? "C" : "F"}
			</p>
			<p>
				Precipitation (last 3 hours): {currLocation.apiResponse.rain["3h"]}
				{settings.tempFormat==="metric" ? "mm" : "in" }
			</p>
			<p>
				Humidity: {currLocation.apiResponse.main.humidity}
			</p>
			<p>
				Wind speed: {currLocation.apiResponse.wind.speed}<br />
				Wind direction: 
				{settings.tempFormat==="metric" ? " km/hour " : " miles/hour " }
				{windDirection}
			</p>
		</div>
	)
};

export default Detail;
