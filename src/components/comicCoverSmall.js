import React from 'react'
import '../styles/comicCoverSmall.css';
import {NavLink} from "react-router-dom";

//returns a list of small box covers with either no, custom or default ("recommended") as the title.
// title options: false for no title, custom (give a string), or default (recommended) if left untouched.

export default function ComicCoverSmall(props) {
  
  if(props.title === false){
    return(
    <div className="comicCoverSmall">
      <div className="recommended">
      {props.list.map((e)=>{
          return (
          <div className="recCard">
            <NavLink to={`/comic-info/${e.title}`}>
              <div className="recCoverCard">
                <img src={e.image}></img>
              </div>
            </NavLink>
          </div>
          )
        })}
      </div>
    </div>
    )
  }

  if(props.title){
    return(
    <div className="comicCoverSmall">
      <span className="recTitle">{props.title}</span>
      <div className="recommended">
      {props.list.map((e)=>{
          return (
          <div className="recCard">
            <NavLink to={`/comic-info/${e.title}`}>
              <div className="recCoverCard">
                <img src={e.image}></img>
              </div>
            </NavLink>
          </div>
          )
        })}
      </div>
    </div>
    )
  }
  return (
    <div className="comicCoverSmall">
      <span className="recTitle">Recommended</span>
      <div className="recommended">
      {props.list.map((e)=>{
          return (
          <div className="recCard">
            <NavLink to={`/comic-info/${e.title}`}>
              <div className="recCoverCard">
                <img src={e.image}></img>
              </div>
            </NavLink>
          </div>
          )
        })}
      </div>
    </div>
  )
}
