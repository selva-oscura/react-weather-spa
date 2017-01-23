import React from 'react';
import Header from './Header';
import Body from './Body';
import '../styles/App.css';

const App = React.createClass({
	getInitialState(){
		return {
			currPage: "splash",
			currLocation: {},
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
			let currLocation={};
			currLocation = {
				city: searchInput.city,
				country: searchInput.country,
			}
			if(searchInput.id){
				currLocation.id = searchInput.id;
			}
			currPage="detail";
			errors = [];
			this.setState({errors, currPage, currLocation});
			this.queryWeatherAPI();
		}else{
			errors = ["Please enter a city (and state/province if needed)."];
			this.setState({errors});
		}
	},
	queryWeatherAPI(){
		let {city, country, id} = this.state.currLocation;
		console.log(`single location query for ${city}, ${country} to go here`);
		console.log(id, "check");
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
