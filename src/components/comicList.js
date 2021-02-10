import '../styles/comicList.css'
import React, { Component } from 'react'
import {NavLink} from "react-router-dom";
import { withRouter } from "react-router";
import axios from 'axios';
import Loading from './loading.js';

class ComicList extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         results: [],
         loading: false
      }
      this.requestAndLoading = this.requestAndLoading.bind(this);
    }

    componentDidMount(){
      if(this.props.match.params.query !== 'search'){
        this.requestAndLoading();
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.match.params.query !== prevProps.match.params.query) {
        this.requestAndLoading();
      }
    }
    
    requestAndLoading(){
      this.setState({
        loading: true
      })
      let query = this.props.match.params.query;
      axios.get(`https://fast-bayou-41832.herokuapp.com/api/search-comic/${query}`)
      .then(data=>{
        this.setState({
          results: data.data,
          loading: false
        })
      })
    }

  render() {
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
    if(this.state.results.length<1){
      return (
        <div className="flexContainer">
          <div className="comicCard">
            <div className="noResults">
              <h4>No Results :(</h4>
              <div>try another search!</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flexContainer">
        {this.state.results.map((item)=>{
          return (
            <NavLink to = {`/comic-info/${item.title}`}>
              <div className="comicCard">
                <div className="comicCover">
                  <img src={item.image}></img>
                </div>
                <div className="cardColumn">
                  <h4>{item.title}</h4>
                  <div>{item.description}</div>
                </div>
              </div>
            </NavLink>
          )
        })}
      </div>
    )
  }
}


export default withRouter(ComicList);

