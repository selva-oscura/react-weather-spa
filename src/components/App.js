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
  render() {
    return (
      <div className="App">
        <Header />
        <Body />
        <p>{this.state.currPage}</p>
      </div>
    );
  }
})

export default App;
