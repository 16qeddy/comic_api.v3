import React from 'react'
import recommended from '../mockData/recommended.js';
import comicList from '../mockData/comicData.js';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ComicCoverSmall from './comicCoverSmall.js';
import ComicCoverBig from './comicCoverBig.js';
import NavBar from './navBar.js';
import '../styles/home.css';
import '../styles/scrollBars.css';

//renders home screen. add functionality to not use mock data for recommended and popular
export default function Home(props) {


  if(useMediaQuery('(min-width:900px)')){
    
    return(
      <div id="home">
        <NavBar home={true}/>
        <div className="homeContainer">
          <ComicCoverBig list = {comicList}/>
          <ComicCoverBig list = {recommended} title="Recommended"/>
        </div>
      </div>
    )
  }
    return (
      <div id="home">
        <NavBar home={true}/>
        <div className="homeContainer">
          <ComicCoverBig list = {comicList}/>
          <ComicCoverSmall list = {recommended}/>
        </div>
      </div>
    )
}
