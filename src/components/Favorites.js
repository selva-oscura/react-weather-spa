import React from 'react';

const Favorites = ({favedLocations}) => (
	<div
		className="Favorites"
	>
		<h2>Favorites</h2>
		{Object.keys(favedLocations).map((key)=>(<Favorite key={key} locationId={key} favedLocation={favedLocations[key]} />))}
	</div>
);

const Favorite = ({locationId, favedLocation}) => (
	<p>{favedLocation.name} ({locationId}) -- lon: {favedLocation.coord.lon}, lat: {favedLocation.coord.lat}
	</p>
);

export default Favorites;
