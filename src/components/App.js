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
				country: "",
			},
			error: "",
		}
	},
	handleNav(e){
		console.log('clicked', e.target.className)
	},
  render() {
    return (
      <div className="App">
        <Header />
        <Body 
        	currPage={this.state.currPage}
        />
      </div>
    );
  }
})

export default App;
