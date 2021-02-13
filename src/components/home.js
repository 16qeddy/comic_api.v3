import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ComicCoverSmall from './comicCoverSmall.js';
import ComicCoverBig from './comicCoverBig.js';
import NavBar from './navBar.js';
import Loading from './loading.js';
import '../styles/home.css';
import '../styles/scrollBars.css';


//renders home screen. add functionality to use real data to determine recommended and popular
export default function Home(props) {

  if(props.loading){
    return(
      <Loading/>
    )
  }

  if(useMediaQuery('(min-width:900px)')){
    return(
      <div id="home">
        <NavBar home={true}/>
        <div className="homeContainer">
          <ComicCoverBig list = {props.popular}/>
          <ComicCoverBig list = {props.recommended} title="Recommended"/>
        </div>
      </div>
    )
  }
    return (
      <div id="home">
        <NavBar home={true}/>
        <div className="homeContainer">
          <ComicCoverBig list = {props.popular}/>
          <ComicCoverSmall list = {props.recommended}/>
        </div>
      </div>
    )
}
