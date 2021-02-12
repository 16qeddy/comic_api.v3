import React, { Children, Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router";
import InfoCard from "./infoCard.js";
import '../styles/comicInfoView.css';
import Loading from './loading.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";



class ComicInfoView extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       comic: {},
       chapterView: false,
       loading: true,
       series: '' 
    }

    this.toggleChapterView = this.toggleChapterView.bind(this);
  }
  
  componentDidMount(){
    let title = this.props.match.params.title;
    axios.get(`https://fast-bayou-41832.herokuapp.com/api/search-comic/${title}`)
    .then(data=>{
      this.setState({comic: data.data[0], loading: false, series: title})
    })
  }

  toggleChapterView(){
    this.setState({
      chapterView: !this.state.chapterView
    })
  }

  render() {
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
    return (
      <div className="comicInfoContainer" style={{backgroundImage:`url(${this.state.comic.image})`}}>
        <div className="InfoColumn">
          <div className="InfoSpacer"/>
          <InfoCard series={this.state.series} comic={this.state.comic} chapterView={this.state.chapterView} clickFunc={this.toggleChapterView}/>
        </div>
      </div>
    )
  }
}

export default withRouter(ComicInfoView);


