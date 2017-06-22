import React from 'react';
import Snapshot from './Snapshot';
import NextFourDays from './NextFourDays';
import icons from '../resources/icons.js';
import moment from 'moment-timezone';
import '../styles/Detail.css';

const Detail = ({currLocation, settings, addToFavorites, favedLocations}) => {
	const alreadyFaved = favedLocations[currLocation.id] ? "favorited" : null;

	// create temperature range for week
	let tempRange = {
		min: Infinity, 
		max: -Infinity
	};
	const snapShotCount = currLocation.data.length;

	currLocation.data.forEach((snapshot) => {
		tempRange.min = Math.min(tempRange.min, snapshot.main.temp);
		tempRange.max = Math.max(tempRange.max, snapshot.main.temp);
	});
	tempRange.min = Math.floor(tempRange.min/5-1)*5;
	tempRange.max = Math.ceil(tempRange.max/5+1)*5;

	console.log("currLocation", currLocation, "\nsettings", settings, "\navedLocations", favedLocations);
	let fourDayData = [];
	let day, dayData, dayTempRange, count;
	let fourDayRange = [Infinity, -Infinity]
	let allTemps = [];
	currLocation.data.forEach((snapshot, i) => {
		const datetime = moment.utc(snapshot.dt*1000).tz(currLocation.zoneName);
		console.log('datetime', datetime)
		console.log('how many days?', datetime.format("DDDD"))
		allTemps.push(snapshot.main.temp);
		if(!day){
			count = 0;
			day = datetime.format("DDDD");
			dayTempRange = {
				min: Infinity,
				max: -Infinity,
			}
			day = datetime.format("DDDD");
		}else if(day !== datetime.format("DDDD")){
			dayData = [
				Math.round(dayTempRange.min), 
				Math.round(dayTempRange.max), 
				count
			];
			fourDayData.push(dayData);
			dayTempRange = {
				min: Infinity,
				max: -Infinity,
			}
			count = 0;
			day = datetime.format("DDDD");
		}
		dayTempRange.min = Math.min(dayTempRange.min, snapshot.main.temp);
		dayTempRange.max = Math.max(dayTempRange.max, snapshot.main.temp);
		fourDayRange[0] = Math.min(fourDayRange[0], snapshot.main.temp);
		fourDayRange[1] = Math.max(fourDayRange[1], snapshot.main.temp);

		count++;
		if(i === currLocation.data-1){
			dayData = [
				Math.round(dayTempRange.min), 
				Math.round(dayTempRange.max), 
				count
			];
			fourDayData.push(dayData);
		}
	});
	fourDayRange[0] = Math.floor(fourDayRange[0]/5-1)*5;
	fourDayRange[1] = Math.ceil(fourDayRange[1]/5+1)*5;
	console.log('dayData');
	fourDayData.forEach((day) => console.log(day))
	console.log("fourDayRange", fourDayRange)
	console.log('all temp data', allTemps.sort(function(a,b){return a-b}))
	


	return (
		<div className="Detail">
			<div className="summary">
				<div className="summary-text">
					<h2>Weather Forecast for {currLocation.city.toUpperCase()}, {currLocation.country} (city id: {currLocation.id})</h2>
				</div>
				<div className="favorite-option">
					<p
						className={alreadyFaved}
						onClick={addToFavorites}
					>
						<i className="fa fa-heart"></i>
					</p>
				</div>
			</div>
			<h2 className="summary-text">Next 24 Hours</h2>
			<div className="time-series">
				<div className="caption" style={{width: '15%'}}>
					<div className="text">
						<p>
							Day<br />
							Time
						</p>
					</div>
					<div className="temp-barchart-holder"></div>
					<div className="temp">
						<p>
							Temp (&deg;{ settings.tempFormat==="metric" ? "C" : "F" })
						</p>
					</div>
					<div className="weather-icon-holder">
						<img src={icons['icon01d']} alt="blank space placeholder" className='invisible' />
					</div>
					<div className="text">
						<p>
							Rain<br />
							({ settings.tempFormat==="metric" ? "mm" : "in" })
						</p>
					</div>
					<div className="text">
						<p>
							Snow<br />
							({ settings.tempFormat==="metric" ? "cm" : "in" })
					</p>
					</div>
					<div className="text">
						<p>
							Humidity<br />
							(%)
						</p>
					</div>
					<div className="text">
						<p>
							Cloud Cover<br />
							(%)
						</p>
					</div>
					<div className="text">
						<p>
							Wind Speed<br />
							({ settings.tempFormat==="metric" ? " m/sec " : " miles/hour " })
						</p>
					</div>
					<div className="text">
						<p>
							Wind Direction
						</p>
					</div>
				</div>
				{currLocation.data.slice(0,8).map((snapshot, i) => (
						<Snapshot 
							key={i} 
							snapshot={snapshot} 
							tempFormat={settings.tempFormat} 
							zoneName={currLocation.zoneName} 
							tempRange={tempRange} 
							snapShotCount={8}
						/>
					)
				)}
				<div className="clear"></div>
			</div>
			<NextFourDays 
				fourDayData={fourDayData}
				fourDayRange={fourDayRange}
			/>
		</div>
	)	

};

export default Detail;
