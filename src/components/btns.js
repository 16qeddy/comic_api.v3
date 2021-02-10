import React from 'react';
import '../styles/btns.css';

export default function Btns (props) {
  if(props.text){
    return (
      <div className="textBtn" onClick={props.clickFunc}>
        {props.text}
      </div>
    )
  }
  return (
    <div className="iconBtn" onClick={props.clickFunc}>
      <img src={props.icon}></img>
    </div>
  )
}
