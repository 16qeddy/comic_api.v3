import React from 'react'
import '../styles/comicCoverBig.css';
import {NavLink} from "react-router-dom";

//returns a list of full sized covers with either no, custom or default ("popular") as the title.
// title options: false for no title, custom (give a string), or default (popular) if left untouched.

export default function ComicCoverBig(props) {

  if(props.title){
    return(
      <div className="ComicCoverBig">
      <div className="options">
        <span>{props.title}</span>
      </div>
      <div className="popular">
        {props.list.map((e)=>{
          return (
          <div className="popCard">
            <NavLink to={`/comic-info/${e.title}`}>
              <div className="popCover">
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

  if(props.title === false){
    return(
    <div className="ComicCoverBig">
      <div className="popular">
        {props.list.map((e)=>{
          return (
          <div className="popCard">
            <NavLink to={`/comic-info/${e.title}`}>
              <div className="popCover">
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
    <div className="ComicCoverBig">
      <div className="options">
        <span>Popular</span>
      </div>
      <div className="popular">
        {props.list.map((e)=>{
          return (
          <div className="popCard">
            <NavLink to={`/comic-info/${e.title}`}>
              <div className="popCover">
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
