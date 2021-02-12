import React, { Component } from 'react'
import { withRouter } from "react-router";
import {NavLink, Redirect} from "react-router-dom";
import Loading from './loading.js';
import axios from 'axios';
import Btns from './btns.js';
import '../styles/comicView.css';


class ComicView extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       pages: [],
       index: 0,
       loading: true,
       redirect: false
    }
    this.getPages = this.getPages.bind(this);
    this.prevArrowOnClick = this.prevArrowOnClick.bind(this);
    this.nextArrowOnClick = this.nextArrowOnClick.bind(this);
  }

  componentDidMount(){
    this.getPages();
  }

  getPages(){
    let title = this.props.match.params.title;
    let chapter = this.props.match.params.chapter;
    let series = this.props.match.params.series;
    this.setState({loading: true})
    axios.get(`https://fast-bayou-41832.herokuapp.com/comic/${title}/${chapter}`)
    .then(data=>{
      if(data.data.length === 0){
        this.setState({redirect: `/comic-info/${series}`, loading: false});
      } else {
        this.setState({pages: data.data, loading: false});
      }
    })
  }

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
              <Btns clickFunc={this.prevArrowOnClick} className ="prevArrow" icon="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-arrow-50.png"/>
              <Btns text ="Next Chapter"/>
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
              <Btns text ="Prev Chapter"/>
              <Btns clickFunc={this.nextArrowOnClick} icon="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-arrow-50.png"/>
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
            <Btns clickFunc={this.prevArrowOnClick} className ="prevArrow" icon="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-arrow-50.png"/>
            <Btns clickFunc={this.nextArrowOnClick} icon="https://s3.us-east-2.amazonaws.com/images.for.hrr/icons8-arrow-50.png"/>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(ComicView);