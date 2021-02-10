import React, { Component } from 'react'
import { withRouter } from "react-router";
import {NavLink} from "react-router-dom";
import Loading from './loading.js';
import axios from 'axios';

class ComicView extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       pages: [],
       index: 0,
       loading: false,
       page: ''
    }
    this.getPages = this.getPages.bind(this);
  }

  componentDidMount(){
    this.getPages();
  }

  // componentDidUpdate(){
  //   let title = this.props.match.params.title !== prevProps.match.params.title;
  //   let chapter = this.props.match.params.chapter !== prevProps.match.params.chapter;
  //   if (title || chapter) {
  //     this.getPages();
  //   }
  // }

  getPages(){
    let title = this.props.match.params.title;
    let chapter = this.props.match.params.chapter;
    this.setState({loading: true})
    axios.get(`https://fast-bayou-41832.herokuapp.com/comic/${title}/${chapter}`)
    .then(data=>{
      this.setState({pages: data.data, loading: false})
      console.log(this.state.pages[this.state.index]['image']);
    })
  }

  render() {
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
    return (
      <div className="pageContainer">
        <img src={this.state.pages[this.state.index]['image']}></img>
      </div>
    )
  }
}


export default withRouter(ComicView);