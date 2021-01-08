import React from 'react'
import recommended from '../mockData/recommended.js';
import comicList from '../mockData/comicData.js';
import NavBar from './navBar.js';
import '../styles/home.css';


export default function Home() {
  return (
    <div id="home">
      <NavBar home={true}/>
      <div className="options">
        <span>Popular</span>
      </div>
      <div id="popular">
        {comicList.map((e)=>{
          return (
          <div className="popCard">
            <div className="popCover">
              <img src={e.image}></img>
            </div>
          </div>
          )
        })}
      </div>
      <span className="recTitle">Recommended</span>
      <div id="recommended">
      {recommended.map((e)=>{
          return (
          <div className="recCard">
            <div className="recCoverCard">
              <img src={e.image}></img>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
