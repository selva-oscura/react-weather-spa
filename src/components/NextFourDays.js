import React from 'react';
import DaySummary from './DaySummary';
import '../styles/NextFourDays.css';

const NextFourDays = ({fourDayData, fourDayRange}) => {

	return (
		<div className='NextFourDays'>
			<h2>Next Four Days</h2>
			{fourDayData.map((dayData, i)=>(
				<DaySummary 
					key={i}
					dayData={dayData}
					fourDayRange={fourDayRange}
				/>
			))}
		</div>
	)
}

export default NextFourDays;