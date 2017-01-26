import React from 'react';
import '../styles/Snapshot.css';
import icons from '../resources/icons.js';

const Snapshot = ({ snapshot, tempFormat }) => {
	const localAddress = (iconCode) => ( icons[`icon${iconCode}`] );
	// const displayDay = (timestamp) => ()
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
			<div className="text">
				{ Math.round(snapshot.main.temp) }
			</div>
			<div className="temp-barchart">temp bar chart</div>
			<div className="text">
				{ new Date(snapshot.dt*1000).getHours() }<br />
				{ new Date(snapshot.dt*1000).getHours()>11 && new Date(snapshot.dt*1000).getHours()<15 ? dayOfWeek(snapshot.dt) : null }
			</div>
			<div className="text">
				<img src={localAddress(snapshot.weather[0].icon)} alt={snapshot.weather[0].description}/>  
			</div>
			<div className="text">
				{ snapshot.rain && Object.keys(snapshot.rain).indexOf("3h")>=0 ? Math.round(snapshot.rain["3h"]) : 0}
			</div>
			<div className="text">
				{ snapshot.snow && Object.keys(snapshot.snow).indexOf("3h")>=0 ? Math.round(snapshot.snow["3h"]) : 0}
			</div>
			<div className="text">
				{ snapshot.main.humidity }
			</div>
			<div className="text">{ snapshot.clouds.all}</div>
			<div className="text">
				{ Math.round(snapshot.wind.speed) }
			</div>
			<div className="text">
				{ windDirection(snapshot.wind.deg) }
			</div>
		</div>
	);
}

export default Snapshot;
