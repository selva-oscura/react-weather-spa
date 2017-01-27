import React from 'react';
import Snapshot from './Snapshot';
import '../styles/Detail.css';

const Detail = ({currLocation, settings, addToFavorites, favedLocations}) => {
	const alreadyFaved = favedLocations[currLocation.id] ? "favorited" : null;

	// create temperature range for week
	let tempRange = {
		min: Infinity, 
		max: -Infinity
	};
	currLocation.data.forEach((snapshot) => {
		tempRange.min = Math.min(tempRange.min, snapshot.main.temp);
		tempRange.max = Math.max(tempRange.max, snapshot.main.temp);
	});
	tempRange.min = Math.floor(tempRange.min/5)*5;
	tempRange.max = Math.ceil(tempRange.max/5)*5;

	console.log("currLocation", currLocation, "\nsettings", settings, "\navedLocations", favedLocations);
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
			<div className="time-series">
				<div className="caption">
					<div className="temp-barchart-holder"></div>
					<div className="text">
						<p>						
							Temp<br />
							(&deg;{ settings.tempFormat==="metric" ? "C" : "F" })
						</p>
					</div>
					<div className="text">
						<p>
							Day<br />
							Time
						</p>
					</div>
					<div className="text">&nbsp;</div>
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
			</div>
			{currLocation.data.map((snapshot, i) => <Snapshot key={i} snapshot={snapshot} tempFormat={settings.tempFormat} tempRange={tempRange} />)}
		</div>
	)	

};

export default Detail;
