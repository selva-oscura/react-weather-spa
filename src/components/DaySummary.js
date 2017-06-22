import React from 'react';
import '../styles/DaySummary.css';

const DaySummary = ({dayData, fourDayRange}) => {

	return (
		<div className='DaySummary'>
			<h2>Day Data</h2>
			{dayData.map((d, i)=>(<p key={i}>{ d }</p>))}
			{fourDayRange[0]} - {fourDayRange[1]}
		</div>
	)
}

export default DaySummary;