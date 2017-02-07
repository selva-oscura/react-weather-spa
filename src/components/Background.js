import React from 'react';
import '../styles/Background.css';
import backgrounds from '../resources/backgrounds.js';

const Background = ({aspectRatio, currSeason}) => (
	<div className="Background">
		<img src={backgrounds[`background${currSeason}${aspectRatio}`]} alt="some weather" />  
	</div>
);

export default Background;
