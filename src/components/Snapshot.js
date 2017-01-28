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
		color = 285;
	}else if(temp>50){
		color=345;
	}else{
		color = (Math.floor(temp * -3.75 + 532))%360;
	}
	console.log("temp", temp, 'color', color, 'wind direction', snapshot.wind.deg)
	let barStyle = {
		height: (Math.round(snapshot.main.temp)-tempRange.min)*60/(tempRange.max-tempRange.min),
		backgroundColor: `hsl(${color}, 100%, 40%)`,
		verticalAlign: 'bottom',
		border: `1px solid hsl(${color}, 100%, 30%)`,
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

	// convert wind direction in degrees to rotated arrow
	const windDirection = {
		transform: `rotate(${snapshot.wind.deg}deg)`
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
					<i className="fa fa-long-arrow-up" style={windDirection}></i>
				</p>
			</div>
		</div>
	);
}

export default Snapshot;
					// { windDirection(snapshot.wind.deg) }
