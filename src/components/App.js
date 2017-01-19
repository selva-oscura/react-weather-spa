import React, { Component } from 'react';
import Header from './Header';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p>hello world</p>
      </div>
    );
  }
}

export default App;
