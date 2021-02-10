import '../styles/navBar.css';
import {NavLink} from "react-router-dom";

import React, { Component } from 'react'
import { withRouter } from "react-router";

class NavBar extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        query: 'search-comics'         
      }
      this.searchOnEnter = this.searchOnEnter.bind(this);
      this.searchOnChange = this.searchOnChange.bind(this);
    }
    
    searchOnChange(e){
      this.setState({
        query: e.target.value
      })
    }

    searchOnEnter(e){
      if(e.keyCode === 13){
        this.props.history.push(`/comic-list/${this.state.query}`);
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.match.params.query !== prevProps.match.params.query) {
        document.getElementById('searchBar').value = '';
        this.setState({
          query: 'search-comics'
        });
      }
    }

  render() {
    //home navbar
    if(this.props.home){
      return(
        <div className="homeNavBar">
        <h1>Robin Comics</h1>
        <div id="searchCard">
          <NavLink to='/comic-list/search'>
            <div id="submitBtn">
              <img src="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-search-24.png"></img>
            </div>
          </NavLink>
        </div>
      </div>
      )
    }

    if(this.props.fixed === false){
      return (
        <div className="navBarNoFixed">
          <NavLink to="/">
            <div id="homeBtn">
              <img id="homeBtnIcon" src="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-home-24.png"></img>
            </div>
          </NavLink>
          <div id="searchCard">
            <input id="searchBar" placeholder="Search..." onKeyUp={this.searchOnEnter} onChange={this.searchOnChange}></input>
            <NavLink to={`/comic-list/${this.state.query}`}>
              <div id="submitBtn">
                <img src="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-search-24.png"></img>
              </div>
            </NavLink>
          </div>
        </div>
      )
    }
    //search navbar
    return (
      <div className="navBar">
        <NavLink to="/">
          <div id="homeBtn">
            <img id="homeBtnIcon" src="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-home-24.png"></img>
          </div>
        </NavLink>
        <div id="searchCard">
          <input id="searchBar" placeholder="Search..." onKeyUp={this.searchOnEnter} onChange={this.searchOnChange}></input>
          <NavLink to={`/comic-list/${this.state.query}`}>
            <div id="submitBtn">
              <img src="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-search-24.png"></img>
            </div>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default withRouter(NavBar);

