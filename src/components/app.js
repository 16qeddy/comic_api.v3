
import React, { Component } from "react";
import comicData from '../mockData/comicData.js';
import ComicList from './comicList.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Home() {
  return <h2>Home</h2>;
}

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
