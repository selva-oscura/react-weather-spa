import React from 'react';
import '../styles/Snapshot.css';
import icons from '../resources/icons.js';

const Snapshot = ({ snapshot, tempFormat, tempRange }) => {
	// path to url for icon
	const localAddress = (iconCode) => ( icons[`icon${iconCode}`] );
	// formatting for temperature bar style
	let temp = snapshot.main.temp;
	if(tempFormat==="imperial"){
		temp = (temp-32)/1.8;
	}
	let color;
	if(temp<-30){
		color = 330;
	}else if(temp>50){
		color=345;
	}else{
		color = (Math.floor(temp * -4.3125 + 560))%360;
	}
	console.log("temp", temp, 'color', color)
	let barStyle = {
		height: (Math.round(snapshot.main.temp)-tempRange.min)*60/(tempRange.max-tempRange.min),
		backgroundColor: `hsla(${color}, 100%, 40%, .8)`,
		verticalAlign: 'bottom',
	}

	// convert js timestamp to day of week
	const dayOfWeek = (timestamp) => {
		let dayNum = new Date(snapshot.dt*1000).getDay();
		if(dayNum===0){
			return "Sun";
		}
		if(dayNum===1){
			return "Mon";
		}
		if(dayNum===2){
			return "Tues";
		}
		if(dayNum===3){
			return "Wed";
		}
		if(dayNum===4){
			return "Thurs";
		}
		if(dayNum===5){
			return "Fri";	
		}
		return "Sat";
	}

	// convert wind direction in degrees to wind direction text
	const windDirection = (deg) => {
		if(deg>348.75 || deg<11.25){
			return "N";
		}else if(deg<33.75){
			return "NNE";
		}else if(deg<56.25){
			return "NE";
		}else if(deg<78.75){
			return "ENE";
		}else if(deg<101.25){
			return "E";
		}else if(deg<123.75){
			return "ESE";
		}else if(deg<146.25){
			return "SE";
		}else if(deg<168.75){
			return "SSE";
		}else if(deg<191.25){
			return "S";
		}else if(deg<213.75){
			return "SSW";
		}else if(deg<236.25){
			return "SW";
		}else if(deg<258.75){
			return "WSW";
		}else if(deg<281.25){
			return "W";
		}else if(deg<303.75){
			return "WNW";
		}else if(deg<326.25){
			return "NW";
		}else if(deg<348.75){
			return "NNW";
		}else{
			return"oops.... a mistake with "+deg+" degrees";
		}
	}

	return(
		<div
			className="Snapshot"
		>
			<div className="temp-barchart-holder">
				<div
					className="temp-barchart"
					style={barStyle}
				>
				</div>
			</div>
			<div className="text">
				<p>{ Math.round(snapshot.main.temp) }</p>
			</div>
			<div className="text">
				<p>
					{ new Date(snapshot.dt*1000).getHours() }<br />
					{ new Date(snapshot.dt*1000).getHours()>11 && new Date(snapshot.dt*1000).getHours()<15 ? dayOfWeek(snapshot.dt) : null }
				</p>
			</div>
			<div className="text">
				<img src={localAddress(snapshot.weather[0].icon)} alt={snapshot.weather[0].description}/>  
			</div>
			<div className="text">
				<p>
					{ snapshot.rain && Object.keys(snapshot.rain).indexOf("3h")>=0 ? Math.round(snapshot.rain["3h"]) : 0}
				</p>
			</div>
			<div className="text">
				<p>
					{ snapshot.snow && Object.keys(snapshot.snow).indexOf("3h")>=0 ? Math.round(snapshot.snow["3h"]) : 0}
				</p>
			</div>
			<div className="text">
				<p>
					{ snapshot.main.humidity }
				</p>
			</div>
			<div className="text">
				<p>
					{ snapshot.clouds.all}
				</p>
			</div>
			<div className="text">
				<p>
					{ Math.round(snapshot.wind.speed) }
				</p>
			</div>
			<div className="text">
				<p>
					{ windDirection(snapshot.wind.deg) }
				</p>
			</div>
		</div>
	);
}

export default Snapshot;
