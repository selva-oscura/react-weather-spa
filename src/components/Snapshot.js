import React from 'react';
import icons from '../resources/icons.js';

const Snapshot = ({ snapshot, tempFormat }) => {
	const localAddress = (iconCode) => ( icons[`icon${iconCode}`] );
	return(
		<div
			className="Snapshot"
		>
			<p>
				<img src={localAddress(snapshot.weather[0].icon)} alt={snapshot.weather[0].description}/>  
				at {snapshot.dt_txt}, the temperature is {Math.round(snapshot.main.temp)}{tempFormat==="metric" ? "C" : "F"}
			</p>
		</div>
	);
}

export default Snapshot;
