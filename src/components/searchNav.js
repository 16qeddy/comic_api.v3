import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import '../styles/app.css';

let SearchNav = (props) => {

  return (
    <Navbar bg="danger" expand="lg">
      <Navbar.Brand className="yellowText" href="#home" onClick={props.goHome}>Robin Comics</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={props.goHome} href="#home">Home</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link href="https://fast-bayou-41832.herokuapp.com/download">Get the App</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link onClick={props.goBack} href="#back">Back</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl onKeyUp={props.searchOnKeyUp} type="text" placeholder="Search" className="mr-sm-2" />
          <Button onClick={props.onSubmit} className="test" variant="dark">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SearchNav;