import React from 'react';
import '../styles/btns.css';


//takes props: 
  //clickFunc = a function for onClick events
  //className = an additional className for custom css
  //text = for button text
  //icon = an image url for an adding a custom image to the button
  

export default function Btns (props) {
  if(props.text){
    return (
      <div className={`textBtn ${props.className || ''}`} onClick={props.clickFunc}>
        {props.text}
      </div>
    )
  }
  return (
    <div className={`iconBtn ${props.className || ''}`} onClick={props.clickFunc}>
      <img src={props.icon}></img>
    </div>
  )
}
