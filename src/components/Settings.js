import React from 'react';

const Settings = () => (
	<div
		className="Settings"
	>
		<h2>Settings</h2>
		<h3>Temperature Format</h3>
		<label
			htmlFor="celsius"
		>
			<input 
				id="celsius"
				type="radio"
				name="tempFormat"
				value="C"
			/>
			Celsius
		</label>
		<label
			htmlFor="fahrenheit"
		>
			<input 
				id="fahrenheit"
				type="radio"
				name="tempFormat"
				value="F"
			/>
			Fahrenheit
		</label>
	</div>
);

export default Settings;
