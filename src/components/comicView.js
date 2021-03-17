import React, { Component } from 'react'
import { withRouter } from "react-router";
import {NavLink, Redirect} from "react-router-dom";
import Loading from './loading.js';
import axios from 'axios';
import Btns from './btns.js';
import '../styles/comicView.css';
import arrowIcon from '../assets/icons8-arrow-50.png';


class ComicView extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       pages: [],
       index: 0,
       loading: true,
       redirect: false,
       chapter: '',
       series: '',
       title: ''
    }
    this.getPages = this.getPages.bind(this);
    this.prevArrowOnClick = this.prevArrowOnClick.bind(this);
    this.nextArrowOnClick = this.nextArrowOnClick.bind(this);
  }

  componentDidMount(){
    this.getPages();
  }

  componentDidUpdate(prevProps) {
    //checks if the url params changed, if so the chapter will change
    let chapterCheck = this.props.match.params.chapter !== prevProps.match.params.chapter;
    let titleCheck = this.props.match.params.title !== prevProps.match.params.title;
    let seriesCheck = this.props.match.params.series !== prevProps.match.params.series;
    if (chapterCheck || titleCheck || seriesCheck) {
      this.getPages();
    }
  }

  getPages(){
    //gets the comic data from the url
    let chapter = this.props.match.params.chapter;
    let title = this.props.match.params.title;
    let series = this.props.match.params.series;
    this.setState({loading: true})
    axios.get(`https://fast-bayou-41832.herokuapp.com/comic/${title}/${chapter}`)
    .then(data=>{
      //if there is no data to get (chapter dose not exist) it will redirect to comic info page
      if(data.data.length === 0){
        this.setState({redirect: `/comic-info/${series}`, loading: false});
      } else {
        this.setState({
          pages: data.data,
          loading: false, 
          index: 0,
          title: title,
          chapter: chapter,
          series: series
        });
      }
    })
  }

  //onClick functions to cycle through pages
  prevArrowOnClick(){
    this.setState({index: this.state.index - 1});
  }

  nextArrowOnClick(){
    this.setState({index: this.state.index + 1});
  }

  render() {
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
    if(this.state.redirect){
      return(
        <Redirect to={this.state.redirect} />
      )
    }
    if(this.state.index === this.state.pages.length - 1){
      return(
        <div className="comicViewContainer">
          <div className="pageContainer">
            <div className="comicPage" style={{backgroundImage:`url(${this.state.pages[this.state.index]['image']})`}}></div>
            <div className="comicViewBtnContainer">
              <Btns clickFunc={this.prevArrowOnClick} className ="prevArrow" icon={arrowIcon}/>
              <NavLink to={`/comic-view/${this.state.title}/${Number(this.state.chapter) + 1}/${this.state.series}`}>
                <Btns className="nextPrevBtn" text ="Next Chapter"/>
              </NavLink>
            </div>
          </div>
        </div>
      )
    }
    if(this.state.index === 0){
      return(
        <div className="comicViewContainer">
          <div className="pageContainer">
            <div className="comicPage" style={{backgroundImage:`url(${this.state.pages[this.state.index]['image']})`}}></div>
            <div className="comicViewBtnContainer">
              <NavLink to={`/comic-view/${this.state.title}/${Number(this.state.chapter) - 1}/${this.state.series}`}>
                <Btns className="nextPrevBtn" text ="Prev Chapter"/>
              </NavLink>
              <Btns clickFunc={this.nextArrowOnClick} icon={arrowIcon}/>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="comicViewContainer">
        <div className="pageContainer">
          <div className="comicPage" style={{backgroundImage:`url(${this.state.pages[this.state.index]['image']})`}}></div>
          <div className="comicViewBtnContainer">
            <Btns clickFunc={this.prevArrowOnClick} className ="prevArrow" icon={arrowIcon}/>
            <Btns clickFunc={this.nextArrowOnClick} icon={arrowIcon}/>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(ComicView);