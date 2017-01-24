import React from 'react';
import icons from '../resources/icons.js';
import '../styles/Detail.css';

const Detail = ({currLocation, settings, addToFavorites, favedLocations}) => {
	let localAddress=icons[`icon${currLocation.apiResponse.weather[0].icon}`];
	let alreadyFaved;
	if(favedLocations.length>0){
		favedLocations.forEach((fave) => {
			if(fave.id===currLocation.apiResponse.id){
				alreadyFaved = "favorited";
			}
		});
	}
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
	return (
		<div
			className="Detail"
		>
			<div className="summary">
				<div className="summary-image">
					<img src={localAddress} alt={currLocation.apiResponse.weather[0].description}/> 
				</div>
				<div className="summary-text">
					<h2>{currLocation.apiResponse.name}</h2>
				</div>
				<div className="favorite-option">
					<p
						className={alreadyFaved}
						onClick={addToFavorites}
					>
						<span className="glyphicon glyphicon-heart"></span>
					</p>
				</div>
			</div>
			<p>Current Conditions: {currLocation.apiResponse.weather[0].description}</p>
			<p>
				Temperature: {Math.round(currLocation.apiResponse.main.temp)}
				{settings.tempFormat==="metric" ? "C" : "F"}
			</p>
			<p>
				Precipitation (last 3 hours): { currLocation.apiResponse.rain ? currLocation.apiResponse.rain["3h"] : 0}
				{settings.tempFormat==="metric" ? "mm" : "in" }
			</p>
			<p>
				Snow (last 3 hours): { currLocation.apiResponse.snow ? currLocation.apiResponse.snow["3h"] : 0}
				{settings.tempFormat==="metric" ? "cm" : "in" }
			</p>
			<p>
				Humidity: {currLocation.apiResponse.main.humidity}%
			</p>
			<p>Cloud cover: {currLocation.apiResponse.clouds.all}%</p>
			<p>
				Wind speed: {currLocation.apiResponse.wind.speed} {settings.tempFormat==="metric" ? " m/sec " : " miles/hour " }<br />
				Wind direction: {windDirection}
			</p>
		</div>
	)
};

export default Detail;
