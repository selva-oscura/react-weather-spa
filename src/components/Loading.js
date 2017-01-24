import React from 'react';


const Loading = ({currLocation}) => (
	<div 
		className="Loading"
	>
		<p><i className="fa fa-spinner fa-spin"></i> Loading data for {currLocation.city}, {currLocation.country}</p>
	</div>
);

export default Loading;