import React from 'react'
import '../styles/loading.css';

export default function Loading(props) {
  return (
      <div className="loadingContainer">
          <img src="https://s3.us-east-2.amazonaws.com/images.for.hrr/ComicLoading.gif"></img>
      </div>
  )
}
