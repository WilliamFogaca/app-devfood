import React, { Component } from 'react';
/* Components */
import Header from './templates/Header';
import Content from './templates/Content';
/* Styles */
import './assets/scss/App.scss';

class App extends Component {
  state = {
    isLoggedIn: false,
  };
  render() {
    return (
      <div className="root">
        <Header />
        <Content />
      </div>
    )
  }
}

export default App;
