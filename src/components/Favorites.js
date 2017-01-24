import React from 'react';

const Favorites = ({favedLocations}) => (
	<div
		className="Favorites"
	>
		<h2>Favorites</h2>
		{favedLocations.map((fave)=>(<Favorite favedLocation={fave} />))}
	</div>
);

const Favorite = ({favedLocation}) => (
	<p>{favedLocation.name} ({favedLocation.id}) -- lon: {favedLocation.coord.lon}, lat: {favedLocation.coord.lat}
	</p>
);

export default Favorites;
