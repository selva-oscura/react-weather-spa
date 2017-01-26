import React from 'react';
import Snapshot from './Snapshot';
import '../styles/Detail.css';

const Detail = ({currLocation, settings, addToFavorites, favedLocations}) => {
	const alreadyFaved = favedLocations[currLocation.id] ? "favorited" : null;
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
					<div className="text">
						Temp<br />
						(&deg;{ settings.tempFormat==="metric" ? "C" : "F" })
					</div>
					<div className="temp-barchart">temp bar chart</div>
					<div className="text">
						Day<br />
						Time
					</div>
					<div className="text">&nbsp;</div>
					<div className="text">
						Rain<br />
						(in { settings.tempFormat==="metric" ? "mm" : "in" })
					</div>
					<div className="text">
						Snow<br />
						(in { settings.tempFormat==="metric" ? "cm" : "in" })
					</div>
					<div className="text">
						Humidity<br />
						(in %)
					</div>
					<div className="text">
						Cloud Cover<br />
						(in %)
					</div>
					<div className="text">
						Wind Speed<br />
						(in { settings.tempFormat==="metric" ? " m/sec " : " miles/hour " })
					</div>
					<div className="text">Wind Direction</div>
				</div>
			</div>
			{currLocation.data.map((snapshot, i) => <Snapshot key={i} snapshot={snapshot} tempFormat={settings.tempFormat}/>)}
		</div>
	)	

};

export default Detail;
