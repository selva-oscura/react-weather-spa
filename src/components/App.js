import React, { Component } from 'react';
import Header from './Header';
import Background from './Background';
import Body from './Body';
import apiCalls from  '../resources/apiCalls.js';
import '../styles/App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
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
			aspectRatio: "l",
			currSeason: "02",
			errors: [],
			response: "",			
		}
		this.handleNav = this.handleNav.bind(this);
		this.updateSetting = this.updateSetting.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
		this.submitLocation = this.submitLocation.bind(this);
		this.purgeOfSpacesAndCommas = this.purgeOfSpacesAndCommas.bind(this);
		this.addToFavorites = this.addToFavorites.bind(this);
		this.seeDetail = this.seeDetail.bind(this);
		this.calculateSeason = this.calculateSeason.bind(this);
		this.updateAspectRatio = this.updateAspectRatio.bind(this);
	}
	handleNav(e){
		let searchInput = {
			city: "",
			country: "US",
		}
		this.setState({currPage:e.target.id, searchInput:searchInput});
	}
	updateSetting(e){
		let settings=this.state.settings;
		settings[e.target.name]=e.target.value;
		this.setState({settings});
	}
	updateLocation(e){
		let searchInput = this.state.searchInput;
		searchInput[e.target.id]=e.target.value;
		this.setState({searchInput});
	}
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
			this.setState({errors, currLocation, currPage});
			let lastUpdated = Date.now();
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
						errors=["Error?", JSON.stringify(apiResponse.status), JSON.stringify(apiResponse.statusText)];
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
					errors = [`Error: ${error}`, 'Please check your internet connection.'];
					currPage = "blank"
					this.setState({errors, currPage});
				});
		}else{
			errors = ["Please enter a city (and state/province if needed)."];
			this.setState({errors});
		}
	}
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
	}
	addToFavorites(){
		let location = this.state.currLocation;
		let id = location.id;
		let {favedLocations, errors} = this.state;
		let lastUpdated = Date.now();
		if(location.id){
			favedLocations[id] = {
				id: 			location.id,
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
	}
	seeDetail(locationId){
		console.log('seeDetail clicked', this, locationId, this.state.favorites);
		let currPage = 'detail';
		let currLocation = this.state.favedLocations[locationId];
		console.log('about to be set to currLocation and detai', currLocation)
		this.setState({currPage: currPage, currLocation: currLocation});
		// 	let currLocation = {
		// 		city: searchInput.city,
		// 		country: searchInput.country,
		// 		utcOffset: undefined,
		// 		zoneName: undefined,
		// 	}
		// 	searchInput.id ? currLocation.id = searchInput.id : currLocation.id=null;
		// 	currPage="loading";
		// 	this.setState({errors, currLocation, currPage});
		// 	let city = this.purgeOfSpacesAndCommas(currLocation.city);
		// 	apiCalls.singleForecastWeatherAPI(city, currLocation.country, currLocation.id, settings.tempFormat)
		// 		.then((apiResponse, error) => {
		// 			currLocation.id = apiResponse.data.city.id;
		// 			currLocation.coord = apiResponse.data.city.coord;
		// 			currLocation.data = apiResponse.data.list;
		// 			currLocation.status=apiResponse.status;
		// 			currLocation.lastUpdated = apiResponse.data.dt*1000;
		// 			if(apiResponse.status===200){ 
		// 				currPage="detail"; 
		// 				errors=[];
		// 			}else{
		// 				errors=["Error?", apiResponse.status, apiResponse.statusText];
		// 			}
		// 			apiCalls.latLonOffsetFromUTCAPI(apiResponse.data.city.coord.lat, apiResponse.data.city.coord.lon)
		// 				.then((apiResponse, error) => {
		// 					currLocation.utcOffset = apiResponse.data.gmtOffset;
		// 					currLocation.zoneName = apiResponse.data.zoneName;
		// 					this.setState({currLocation, errors, currPage});
		// 				}).catch((error) => {
		// 					console.log('error from timeZoneDB', error)
		// 					errors=[`Error: ${error.status}, ${error.message}`];
		// 					currPage = "blank"
		// 					this.setState({errors, currPage});
		// 				});
		// 		}).catch((error) => {
		// 			console.log('error in catch for submitLocation', error);
		// 			console.log('error.response.status', error.response.status)
		// 			console.log('error.response.statusText', error.response.statusText)
		// 			errors = [`Error: ${error.response.status} ${error.response.statusText}`];
		// 			currPage = "blank"
		// 			this.setState({errors, currPage});
		// 		});
		// }else{
		// 	errors = ["Please enter a city (and state/province if needed)."];
		// 	this.setState({errors});
		// }
	}
	calculateSeason(){
		let d = new Date();
		let month = d.getMonth();
		if(month === 11 || month <3){
			return "04";
		}else if(month <6){
			return "01";
		}else if(month<9){
			return "02";
		}
		return "03";
	}
	updateAspectRatio(){
		var w=window,
			d=document,
			e=d.documentElement,
			g=d.getElementsByTagName('body')[0],
			x=w.innerWidth||e.clientWidth||g.clientWidth,
			y=w.innerHeight||e.clientHeight||g.clientHeight;
		if(x>y){
			this.setState({aspectRatio: 'l'})
		}else{
			this.setState({aspectRatio: 'p'})
		}
	}
	componentWillMount(){
		this.updateAspectRatio();
		let {currSeason} = this.state;
		currSeason = this.calculateSeason();
		this.setState({currSeason: currSeason});
		console.log("currSeason", currSeason);
	}
	componentDidMount() {
		window.addEventListener("resize", this.updateAspectRatio);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateAspectRatio);
	}
  render() {
    return (
      <div className="App">
      	<Background 
      		aspectRatio={this.state.aspectRatio}
      		currSeason={this.state.currSeason}
      	/>
				<Header
					handleNav={this.handleNav}
					currPage={this.state.currPage}
					defaultValue={this.state.searchInput}
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
        	seeDetail={this.seeDetail}
        />
      </div>
    );
  }
}

export default App;
