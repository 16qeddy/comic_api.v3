import React from 'react';
import { Card } from 'react-bootstrap';
import '../styles/cardbox.css';

let SeriesCard = (props) => {

  return (
    <div onClick={function () { props.clickHandler(props.series) }} className="cardbox">
      <Card text="red" bg="dark" border="danger">
        <Card.Img variant="top" src={props.series.image} />
        <Card.Body className="cardTextArea">
          <Card.Title>{props.series.title}</Card.Title>
        </Card.Body>
      </Card>
    </div>

  );
}

export default SeriesCard;