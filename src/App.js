import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Home from './Home';
import Posts from './Posts';
import Todos from './Todos';
import NotFound from './NotFound';
class App extends Component {
  render() {
    return (
      <Home name="SSR with routing" />
    );
  }
}

export default App;
