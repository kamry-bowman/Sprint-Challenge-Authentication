import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Jokes from './components/Jokes';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path='/login' component={ Login } />
        <Route path='/' exact component={ Jokes } />
      </React.Fragment>
    );
  }
}

export default App;
