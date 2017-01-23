import React from 'react';

const Settings = ({settings, updateSetting}) => (
	<div
		className="Settings"
	>
		<h2>Settings</h2>
		<h3>Temperature Format</h3>
		<Setting 
			key="tempFormatMetric"
			id="celsius"
			name="tempFormat"
			value="metric"
			currSetting={settings.tempFormat}
			updateSetting={updateSetting}
		/>
		<Setting 
			key="tempFormatImperial"
			id="fahrenheit"
			name="tempFormat"
			value="imperial"
			currSetting={settings.tempFormat}
			updateSetting={updateSetting}
		/>
	</div>
);

const Setting = ({id, name, value, currSetting, updateSetting}) => {
	let className;
	if(value === currSetting){
		className="selected"
	}
	return(
		<label
			htmlFor={id}
			className={className}
		>
			<input 
				id={id}
				type="radio"
				name={name}
				value={value}
				checked={value===currSetting}
				onChange={updateSetting}
			/>
			{id.toUpperCase()}
		</label>
	)
}

export default Settings;
