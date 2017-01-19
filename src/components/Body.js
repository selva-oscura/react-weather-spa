import React from 'react';
import '../styles/Body.css';

const Body = ({currPage}) => {
	let page;
	switch(currPage){
		case "splash":
			page = (
				<h3>splash</h3>
			); 
			break;
		case "detail":
			page = (
				<h3>detail</h3>
			);
			break;
		case "favorites":
			page = (
				<h3>favorites</h3>
			); 
			break;
		case "settings":
			page = (
				<h3>settings</h3>
			); 
			break;
		default:
			page = (
				<h3>default</h3>
			);
			break;
	}
	return (
		<section className="Body">
			{page}
		</section>
	)
};

export default Body;
