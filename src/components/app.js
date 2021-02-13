
import React, { Component } from "react";
import ComicList from './comicList.js';
import NavBar from './navBar.js';
import Home from './home.js';
import ComicInfoView from './comicInfoView';
import ComicView from './comicView';
import axios from 'axios';
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
      loading: true,
      recommended: [],
      popular: []
    };
  }

  //gets data for popular and recommended. ///implement logic to determine actual rec and pop///
  componentDidMount(){
    axios.all([
    axios.get(`https://fast-bayou-41832.herokuapp.com/api/search-comic/carnage`), 
    axios.get(`https://fast-bayou-41832.herokuapp.com/api/search-comic/saga`)
    ])
    .then((data)=>{
      this.setState({
        popular: data[0].data,
        recommended: data[1].data,
        loading: false
      })
    })
  }


  render() {
    return  (
      <Router>
        <Switch>
          <Route path="/comic-list/:query" exact={false}>
            <NavBar/>
            <ComicList/>
          </Route>
          <Route path="/comic-info/:title">
            <ComicInfoView />
          </Route>
          <Route path="/comic-view/:title/:chapter/:series">
            <NavBar/>
            <ComicView/>
          </Route>
          <Route path="/">
            <Home loading={this.state.loading} popular={this.state.popular} recommended={this.state.recommended}/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
