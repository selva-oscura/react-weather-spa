import React from 'react';

const Settings = ({settings, updateSetting}) => (
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
				checked={settings.tempFormat==="C"}
				onChange={updateSetting}
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
				checked={settings.tempFormat==="F"}
				onChange={updateSetting}
			/>
			Fahrenheit
		</label>
	</div>
);

export default Settings;
