import React from 'react';
import Blank from './Blank';
import Detail from './Detail';
import Errors from './Errors';
import Favorites from './Favorites';
import Loading from './Loading';
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
		case "loading":
			page = (
				<Loading 
					currLocation={currLocation}
				/>
			);
			break;
		case "favorites":
			page = (
				<Favorites 
					favedLocations={favedLocations}
					tempFormat={settings.tempFormat}
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
		case "blank":
			page = (
				<Blank />
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
