import React from 'react'
import '../styles/infoCard.css';
import Btn from './btns.js';
import {NavLink} from "react-router-dom";


// function getChapterParams(url){
//   let params = url.replace("https://fast-bayou-41832.herokuapp.com/comic/", '').split('/');
//   params[1] +
// }


export default function InfoCard(props) {
  //renders list of chapters to choose from
  if(props.chapterView){
    return(
      <div className="comicInfoCard">
        <div className="infoTitle">
          <h3>Chapters</h3>
        </div>
        <div className="infoCardDescBox">
          {props.comic.chapters.map((chapter, index) => {
            return(
              <NavLink to={`/comic-view/${chapter.url.replace("https://fast-bayou-41832.herokuapp.com/comic/", '')}/${props.series}`}>
                <div className="chapterBox">
                  <h4>{chapter.title}</h4>
                </div>
              </NavLink>
            )
          }).reverse()}
        </div>
        <div className="infoBtnBox">
          <Btn text='Description' clickFunc={props.clickFunc}/>
        </div>
      </div>
    )
  } else {
    //renders description of the comic series
    return (
      <div className="comicInfoCard">
        <div className="infoTitle">
          <h3>{props.comic.title}</h3>
        </div>
        <div className="infoCardDescBox">
          <p className="infoCardDesc">{props.comic.description}</p>
        </div>
        <div className="infoBtnBox">
          <Btn text='Read Now!' clickFunc={props.clickFunc}/>
          {/* future functionality: favorite button
           <Btn icon='https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-heart-26.png'/> */}
        </div>
      </div>
    )
  }
}
