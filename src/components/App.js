import React from 'react';
import Header from './Header';
import Body from './Body';
import '../styles/App.css';

const App = React.createClass({
	getInitialState(){
		return {
			currPage: "splash",
			currLocation: {
				city: "",
				country: "",
			},
			favedLocations: [],
			searchInput: {
				city: "",
				country: "US",
			},
			errors: [],
			response: ""
		}
	},
	handleNav(e){
		this.setState({currPage:e.target.id});
	},
	updateLocation(e){
		let searchInput = this.state.searchInput;
		searchInput[e.target.id]=e.target.value;
		this.setState({searchInput});
	},
	submitLocation(e){
		e.preventDefault();
		let {errors, response, searchInput} = this.state;
		if(searchInput.city.length>0){
			response = `Checking weather conditions for ${searchInput.city}, ${searchInput.country}.`;
			errors = [];
			this.queryWeatherAPI();
		}else{
			errors = ["Please enter a city (and state/province if needed)."];
			response = "";
		}
		this.setState({response, errors});
	},
	queryWeatherAPI(){
		let {city, country} = this.state.searchInput;
		console.log(`single location query for ${city}, ${country} to go here`);
	},
	queriesWeatherAPI(){
		console.log('multi-location query to go here');
	},
  render() {
    return (
      <div className="App">
        <Header 
        	handleNav={this.handleNav}
        	defaultValue={this.state.searchInput.country}
        	submitLocation={this.submitLocation}
        	updateLocation={this.updateLocation}
        />
        <Body 
        	currPage={this.state.currPage}
        	errors={this.state.errors}
        	response={this.state.response}
        />
      </div>
    );
  }
});

export default App;
