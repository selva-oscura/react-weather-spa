import React from 'react';
import '../styles/Favorites.css';
import icons from '../resources/icons.js';
import moment from 'moment-timezone';

const Favorites = ({favedLocations, tempFormat}) => (
	<div
		className="Favorites"
	>
		<h2>Favorites</h2>
		{Object.keys(favedLocations).map((key)=>(<Favorite key={key} locationId={key} favedLocation={favedLocations[key]} tempFormat={tempFormat} />))}
	</div>
);

const Favorite = ({locationId, favedLocation, tempFormat}) => {

		// path to url for icon
	const localAddress = (iconCode) => ( icons[`icon${iconCode}`] );

	// calculate min/max temperatures for each day
	let days = [], 
		hi = -Infinity, 
		lo = Infinity, 
		lastIndex = favedLocation.data.length-1, 
		dayName = moment.utc(favedLocation.data[0].dt*1000).tz(favedLocation.zoneName).format("ddd"),
		dayOffset = moment.utc(favedLocation.data[0].dt*1000).tz(favedLocation.zoneName).format("DDDD");
	favedLocation.data.forEach((timestamp, i) => {
		let dayNumber = moment.utc(timestamp.dt*1000).tz(favedLocation.zoneName).format("DDDD");
		console.log('dayNumber', dayNumber, 'dayOffset', dayOffset);
		if(dayOffset !== dayNumber){
			console.log('should be pushing')
			days.push({dayName: dayName, hi: hi, lo: lo});
			dayName = moment.utc(timestamp.dt*1000).tz(favedLocation.zoneName).format("ddd")
			hi = -Infinity
			lo = Infinity;
			dayOffset = dayNumber;
		}
		hi = Math.max(Math.round(timestamp.main.temp), hi);
		lo = Math.min(Math.round(timestamp.main.temp), lo);
		if(i === lastIndex && moment.utc(timestamp.dt*1000).tz(favedLocation.zoneName).format("HH")>20){
			days.push({dayName: dayName, hi: hi, lo: lo});
		}
	});
	days.forEach((day)=>{console.log(JSON.stringify([].concat(day)))})
	days.shift();
	days.forEach((day)=>{console.log(JSON.stringify([].concat(day)))})
	return(
		<div className="Favorite">
			<div className="city-info">
				<h3 className="city-name">
					{favedLocation.city.toUpperCase()}, {favedLocation.country}
				</h3>
				<p className="city-details">
					(id: {locationId})<br />
					lat: {favedLocation.coord.lat}<br />
					lon: {favedLocation.coord.lon}
				</p>
			</div>
			<div className="weather-info">
				<div className="current-temperature">
					<h3>{Math.round(favedLocation.data[0].main.temp)}&deg;{tempFormat==="metric" ? "C" : "F"}</h3>
					<img src={localAddress(favedLocation.data[0].weather[0].icon)} alt={favedLocation.data[0].weather[0].description}/>  
				</div>
				{days.map((day, i) => 
					(
						<DayForecast 
							key={i} 
							day={day} 
							dayCount={days.length} 
							tempFormat={tempFormat}
						/>
					)
				)}
			</div>
		</div>
	)
};

const DayForecast = ({day, dayCount, tempFormat}) => {
	let DayForeCastStyle = {
		width: `${Math.floor(100/(dayCount+1))}%`
	}
	return (
		<div 
			className="DayForecast" 
			style={DayForeCastStyle}
		>
			<p>{day.dayName}</p>
			<p>{day.hi}&deg;{tempFormat==="metric" ? "C" : "F"}</p>
			<p>{day.lo}&deg;{tempFormat==="metric" ? "C" : "F"}</p>
		</div>
	)
}

export default Favorites;
