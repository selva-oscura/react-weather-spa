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
		console.log(this.state);
	},
	submitLocation(e){
		console.log('target', e.target)
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
