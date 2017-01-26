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
			{currLocation.data.map((snapshot, i) => <Snapshot key={i} snapshot={snapshot} tempFormat={settings.tempFormat}/>)}
		</div>
	)	

};

export default Detail;
