import React from 'react';
import backgrounds from '../resources/backgrounds.js';

const Background = ({}) => (
	<div className="Background">
		<img src={backgrounds['background01p']} alt="some weather" />  
	</div>
);

export default Background;
