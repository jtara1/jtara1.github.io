import React from 'react';

import Container from 'react-bootstrap/Container';
import {
  ListGroup,
  Nav,
  Row
} from 'react-bootstrap';

import './App.css';
import { WEBSITE_TITLE } from './config';

const MainNavBar = () => {
  const style = {
    fontSize: 30
  };

  return (
    <Nav className="justify-content-center m-3" variant="pills" defaultActiveKey="home-link">
      <Nav.Item>
        <Nav.Link style={style} eventKey="home-link">Home</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

const App = () => (
  <>
    <MainNavBar />
    <Container className="p-3">
      <Row>
        <h1 className="header">Welcome to {WEBSITE_TITLE}</h1>
      </Row>

      <Row>
        <p style={{ fontSize: 20, textAlign: 'center' }}>
          This is a work in progress, but take a look at some of these pages:
        </p>
      </Row>

      <Row xs="auto" className="justify-content-center">
        <ListGroup>
          <ListGroup.Item href="/pages/bernoulli.html" action>Loot Box Calc (Bernoulli Trials Calc)</ListGroup.Item>
        </ListGroup>
      </Row>
    </Container>
  </>
);

export default App;
