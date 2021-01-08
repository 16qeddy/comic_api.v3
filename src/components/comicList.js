import React from 'react'
import '../styles/comicList.css'

let ComicList = (props) => {
  return (
    <div className="flexContainer">
      {props.list.map((item)=>{
        return (
          <div className="comicCard">
            <div className="comicCover">
              <img src={item.image}></img>
            </div>
            <div className="cardColumn">
              <h4>{item.title}</h4>
              <div>{item.description}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ComicList;

