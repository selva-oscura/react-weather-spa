import React from 'react';
import Detail from './Detail';
import Errors from './Errors';
import Favorites from './Favorites';
import Response from './Response';
import Settings from './Settings';
import Splash from './Splash';
import '../styles/Body.css';

const Body = ({currPage, currLocation, errors, response, settings, updateSetting, addToFavorites, favedLocations}) => {
	let page;
	switch(currPage){
		case "splash":
			page = (
				<Splash />
			);
			break;
		case "detail":
			page = (
				<Detail 
					currLocation={currLocation}
					settings={settings}
					addToFavorites={addToFavorites}
					favedLocations={favedLocations}
				/>
			);
			break;
		case "favorites":
			page = (
				<Favorites 
					favedLocations={favedLocations}
				/>
			);
			break;
		case "settings":
			page = (
				<Settings 
					settings={settings}
					updateSetting={updateSetting}
				/>
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
			<Errors 
				errors={errors}
			/>
			<Response
				response={response}
			/>
			{page}
		</section>
	)
};

export default Body;
