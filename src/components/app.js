
import React, { Component } from "react";
import comicData from '../mockData/comicData.js';
import ComicList from './comicList.js';
import NavBar from './navBar.js';
import Home from './home.js';
import '../styles/app.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends Component {
  constructor() {
    super();
    this.state = {
  
    };
  }



  render() {
    return  (
      <Router>
        <Switch>
          <Route path="/comic-list/" exact={false}>
            <NavBar/>
            <ComicList list={comicData}/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
