import React from 'react';
import Detail from './Detail';
import Favorites from './Favorites';
import Settings from './Settings';
import Splash from './Splash';
import '../styles/Body.css';

const Body = ({currPage}) => {
	let page;
	switch(currPage){
		case "splash":
			page = (
				<Splash />
			);
			break;
		case "detail":
			page = (
				<Detail />
			);
			break;
		case "favorites":
			page = (
				<Favorites />
			);
			break;
		case "settings":
			page = (
				<Settings />
			);
			break;
		default:
			page = (
				<Splash />
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
