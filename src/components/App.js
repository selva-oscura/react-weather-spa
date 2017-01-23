import React from 'react';
import axios from 'axios';
import Header from './Header';
import Body from './Body';
import '../styles/App.css';
import { openWeather } from '../resources/apis.json';
console.log('openWeather', openWeather)

const App = React.createClass({
	getInitialState(){
		return {
			currPage: "detail",
			currLocation: {
				city: "Washington, DC",
				country: "US",
				apiResponse: {
					"coord":{
						"lon":-77.03,
						"lat":38.89
					},
					"sys":{
						"message":0.1888,
						"country":"United States",
						"sunrise":1485174027,
						"sunset":1485209995
					},
					"weather":[
						{
							"id":500,
							"main":"Rain",
							"description":"light rain",
							"icon":"10n"
						}
					],
					"base":"stations",
					"main":{
						"temp":9.927,
						"temp_min":9.927,
						"temp_max":9.927,
						"pressure":1010.12,
						"sea_level":1016.62,
						"grnd_level":1010.12,
						"humidity":92
					},
					"wind":{
						"speed":2.97,
						"deg":40.5034
					},
					"clouds":{
						"all":92
					},
					"rain":{
						"3h":0.565
					},
					"dt":1485134447,
					"id":0,
					"name":"Washington",
					"cod":200
				}
			},
			favedLocations: [],
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
		let {errors, currPage, searchInput} = this.state;
		if(searchInput.city.length>0){
			errors = [];
			let currLocation={};
			currLocation = {
				city: searchInput.city,
				country: searchInput.country,
			}
			searchInput.id ? currLocation.id = searchInput.id : currLocation.id=null;
			currPage="detail";
			this.setState({errors, currLocation, currPage});
			this.queryWeatherAPI(currLocation);
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
	queryWeatherAPI(currLocation){
		let {city, country, id} = currLocation;
		let tempFormat = this.state.settings.tempFormat;
		let apiCall=`${openWeather.baseURL}weather/`;
		if(id){
			apiCall += `city?id=${id}`;
		}else{
			apiCall += `?q=${this.purgeOfSpacesAndCommas(city)},${country}`
		}
		apiCall += `&appid=${openWeather.apiKey}&units=${tempFormat}`;
		console.log('apiCall', apiCall);
	},
	queriesWeatherAPI(){
		console.log('multi-location query to go here');
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
        />
      </div>
    );
  }
});

export default App;
