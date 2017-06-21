import React from 'react';
import '../styles/Snapshot.css';
import icons from '../resources/icons.js';
import moment from 'moment-timezone';

const Snapshot = ({ snapshot, tempFormat, zoneName, tempRange, snapShotCount }) => {
	
	// number of data points varies
	// To maximise size of data points, width is calculated 
	// based upon the number of data points returned
	// (90% of area width available => 900/snapShotCount)
	let snapShotStyle={
		width: `${(Math.floor(800/snapShotCount))/10}%`
	}

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
		color = (Math.floor(temp * -3.8 + 530))%360;
	}
	let barStyle = {
		height: (Math.round(snapshot.main.temp)-tempRange.min)*120/(tempRange.max-tempRange.min),
		backgroundColor: `hsl(${color}, 100%, 50%)`,
		verticalAlign: 'bottom',
		border: `1px solid hsl(${color}, 100%, 40%)`,
	}

	// convert utc time to local time
	const datetime = moment.utc(snapshot.dt*1000).tz(zoneName);

	// day toggle to alternate colors to underscore change between days
	const dayToggle = Number(datetime.format("DDDD"))%2;
	let dayOfWeekColorBar;
	if(dayToggle){
		dayOfWeekColorBar = {
			borderBottom: `3px solid #01579b`,
		}
	}else{
		dayOfWeekColorBar = {
			borderBottom: `3px solid #29b6f6`,
		}
	}

	// hour information
	const hour = (Math.round((datetime.format("HH")) / 3) * 3) % 24;

	// convert wind direction in degrees to rotated arrow
	const windDirection = {
		transform: `rotate(${(snapshot.wind.deg+180)%360}deg)`
	}
	return(
		<div
			className="Snapshot"
			style={snapShotStyle}
		>
			<div 
				className="text" 
				style={dayOfWeekColorBar}
			>
					{ hour>8 && hour<12 ? datetime.format("ddd") : null }<br />
					{ hour }

				<p>
				</p>
			</div>
			<div className="temp-barchart-holder">
				<div
					className="temp-barchart"
					style={barStyle}
				>
				</div>
			</div>
			<div className="temp">
				<p>{ Math.round(snapshot.main.temp) }</p>
			</div>
			<div className="weather-icon-holder">
				<img src={localAddress(snapshot.weather[0].icon)} alt={snapshot.weather[0].description}/>  
			</div>
			<div className="text">
				<p>
					{ snapshot.rain && Object.keys(snapshot.rain).indexOf("3h")>=0 ? snapshot.rain["3h"].toFixed(1) : 0}
				</p>
			</div>
			<div className="text">
				<p>
					{ snapshot.snow && Object.keys(snapshot.snow).indexOf("3h")>=0 ? snapshot.snow["3h"].toFixed(1) : 0}
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
