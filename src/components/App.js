import React from 'react';
import Header from './Header';
import Body from './Body';
import apiCalls from  '../resources/apiCalls.js';
import '../styles/App.css';

const App = React.createClass({
	getInitialState(){
		return {
			currPage: "splash",
			currLocation: {},
			favedLocations: {},
			searchInput: {
				city: "",
				country: "US",
			},
			settings:{
				tempFormat: "metric",
			},
			errors: [],
			response: ""
		}
	},
	handleNav(e){
		this.setState({currPage:e.target.id});
	},
	updateSetting(e){
		let settings=this.state.settings;
		settings[e.target.name]=e.target.value;
		this.setState({settings});
	},
	updateLocation(e){
		let searchInput = this.state.searchInput;
		searchInput[e.target.id]=e.target.value;
		this.setState({searchInput});
	},
	submitLocation(e){
		e.preventDefault();
		let {errors, currPage, searchInput, settings} = this.state;
		if(searchInput.city.length>0){
			errors = [];
			let currLocation = {
				city: searchInput.city,
				country: searchInput.country,
				utcOffset: undefined,
				zoneName: undefined,
			}
			searchInput.id ? currLocation.id = searchInput.id : currLocation.id=null;
			currPage="loading";
			let lastUpdated = Date.now();
			this.setState({errors, currLocation, currPage});
			let city = this.purgeOfSpacesAndCommas(currLocation.city);
			apiCalls.singleForecastWeatherAPI(city, currLocation.country, currLocation.id, settings.tempFormat)
				.then((apiResponse, error) => {
					currLocation.id = apiResponse.data.city.id;
					currLocation.coord = apiResponse.data.city.coord;
					currLocation.data = apiResponse.data.list;
					currLocation.status=apiResponse.status;
					currLocation.lastUpdated = lastUpdated;
					if(apiResponse.status===200){ 
						currPage="detail"; 
						errors=[];
					}else{
						errors=["Error?", apiResponse.status, apiResponse.statusText];
					}
					apiCalls.latLonOffsetFromUTCAPI(apiResponse.data.city.coord.lat, apiResponse.data.city.coord.lon)
						.then((apiResponse, error) => {
							currLocation.utcOffset = apiResponse.data.gmtOffset;
							currLocation.zoneName = apiResponse.data.zoneName;
							this.setState({currLocation, errors, currPage});
						}).catch((error) => {
							console.log('error from timeZoneDB', error)
							errors=[`Error: ${error.status}, ${error.message}`];
							currPage = "blank"
							this.setState({errors, currPage});
						});
				}).catch((error) => {
					console.log('error in catch for submitLocation', error);
					console.log('error.response.status', error.response.status)
					console.log('error.response.statusText', error.response.statusText)
					errors = [`Error: ${error.response.status} ${error.response.statusText}`];
					currPage = "blank"
					this.setState({errors, currPage});
				});
		}else{
			errors = ["Please enter a city (and state/province if needed)."];
			this.setState({errors});
		}
	},
	purgeOfSpacesAndCommas(str){
		let response = [];
		str.split("").forEach((char, i) => {
			let charcode = char.charCodeAt(0);
			if((charcode>=65&&charcode<=90)
				|| (charcode>=97&&charcode<=122)){
				response.push(char);
			}
			else if(char===" "){
				response.push("+");
			}else if(char===","){
				response.push("%2C");
			}
		});
		return response.join("");
	},
	addToFavorites(){
		let location = this.state.currLocation;
		let id = location.id;
		let {favedLocations, errors} = this.state;
		if(location.id){
			favedLocations[id] = {
				city: 		location.city,
				country: 	location.country,
				coord: {
					lon: location.coord.lon,
					lat: location.coord.lat,
				},
				zoneName: 		location.zoneName,
				lastUpdated: 	location.lastUpdated,
				data: 				location.data,
			}
			this.setState({favedLocations: favedLocations, errors: []});
		}else{
			this.setState({errors:[`Unable to access openWeather data, id:${location.id}, city: ${location.city}, coord lon (${location.coord.lon}), lat(${location.coord.lat})`]});
			return;
		}
		this.setState({favedLocations: favedLocations, errors: []});
	},
  render() {
    return (
      <div className="App">
        <Header 
        	handleNav={this.handleNav}
        	currPage={this.state.currPage}
        	defaultValue={this.state.searchInput.country}
        	submitLocation={this.submitLocation}
        	updateLocation={this.updateLocation}
        />
        <Body 
        	currPage={this.state.currPage}
        	errors={this.state.errors}
        	currLocation={this.state.currLocation}
        	response={this.state.response}
        	settings={this.state.settings}
        	updateSetting={this.updateSetting}
        	addToFavorites={this.addToFavorites}
        	favedLocations={this.state.favedLocations}
        />
      </div>
    );
  }
});

export default App;
