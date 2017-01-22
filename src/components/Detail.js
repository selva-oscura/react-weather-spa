import React from 'react';

const Detail = ({currLocation}) => (
	<div
		className="Detail"
	>
		<h2>Detail</h2>
		<p>Checking weather conditions for {currLocation.city[0].toUpperCase() + currLocation.city.slice(1).toLowerCase()}, {currLocation.country}.</p>
	</div>
);

export default Detail;
