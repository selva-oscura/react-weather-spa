import React from 'react';

const Loading = ({currLocation}) => (
	<div 
		className="Loading"
	>
		<p>Loading data for {currLocation.city}, {currLocation.country}</p>
	</div>
);

export default Loading;