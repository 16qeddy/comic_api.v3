
import React, { Component } from "react";
import comicData from '../mockData/comicData.js';
import ComicList from './comicList.js';
import NavBar from './navBar.js';
import Home from './home.js';
import ComicInfoView from './comicInfoView';
import ComicView from './comicView';
import '../styles/app.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
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
          <Route path="/comic-list/:query" exact={false}>
            <NavBar/>
            <ComicList list={comicData}/>
          </Route>
          <Route path="/comic-info/:title">
            <ComicInfoView />
          </Route>
          <Route path="/comic-view/:title/:chapter/:series">
            <NavBar/>
            <ComicView/>
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
