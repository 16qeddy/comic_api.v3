import React from 'react'
import '../styles/navBar.css';

export default function NavBar(props) {
  if(props.home){
    return(
      <div className="homeNavBar">
      <h1>Robin Comics</h1>
      <div id="searchCard">
        <div id="submitBtn">
          <img src="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-search-24.png"></img>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div className="navBar">
      <div id="homeBtn">
        <img id="homeBtnIcon" src="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-home-24.png"></img>
      </div>
      <div id="searchCard">
        <input id="searchBar" placeholder="Search..."></input>
        <div id="submitBtn">
          <img src="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-search-24.png"></img>
        </div>
      </div>
    </div>
  )
}
