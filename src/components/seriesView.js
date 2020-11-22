import React from 'react';
import '../styles/seriesView.css';
import { Card, Jumbotron, Button, Col, Row } from 'react-bootstrap';

// let SeriesView = (props) => {
//   return (
//     <Jumbotron>
//       <div className="flex">
//         <img src={props.series.image}></img>
//         <div className="infoContainer">
//           <h1>{props.series.title}</h1>
//           <p>
//             {props.series.description}
//           </p>
//           <ol>
//             {props.series.chapters.reverse().map((comic) => {
//               return (<li>{comic.title}</li>)
//             })}
//           </ol>
//         </div>
//       </div>
//     </Jumbotron>
//   )

// }

let SeriesView = (props) => {
  return (
    <Card bg="danger" text="warning">
      <Card.Body>
        <Col>
          <Row>
            <Col xs={12} md={6} lg={3}>
              <img src={props.series.image}></img>
            </Col>
            <Col xs={12} md={6} lg={9}>
              <h1>{props.series.title}</h1>
              <p>
                {props.series.description}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              {props.series.chapters.map((comic) => {
                return (<div className="chapterLink" onClick={function () { props.handler(comic.url) }} key={comic.title}>{comic.title}</div>)
              })}
            </Col>
          </Row>
        </Col>
      </Card.Body>
    </Card>
  )

}
export default SeriesView;