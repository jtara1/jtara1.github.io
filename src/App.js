import React from 'react';

import Container from 'react-bootstrap/Container';
import {
  ListGroup,
  Row
} from 'react-bootstrap';

import './App.css';
import { WEBSITE_TITLE } from './config';
import { MainNavBar } from './MainNavBar';


function toggleIFrame(id) {
  const element = document.querySelector(id);
  element.hidden = !element.hidden;
}

const App = () => (
  <>
    <MainNavBar />
    <Container className="p-3" style={{ height: "1000px", border: "5px dotted black" }}>
      <Row className="p-1">
        <h1 className="header">Welcome to {WEBSITE_TITLE}</h1>
      </Row>

      <Row>
        <p style={{ fontSize: 20, textAlign: 'center' }}>
          This is a work in progress, but take a look at some of these pages:
        </p>
      </Row>

      <Row xs="auto" className="justify-content-center">
        <ListGroup>
          <ListGroup.Item action onClick={() => toggleIFrame('#bernoulli-iframe')}>
            Loot Box Calc (Bernoulli Trials Calc)
          </ListGroup.Item>
        </ListGroup>
      </Row>
      <iframe
        src={`${process.env.PUBLIC_URL}/pages/bernoulli.html`}
        id="bernoulli-iframe"
        height="50%"
        width="100%"
        frameBorder="0"
        hidden
      />
    </Container>
  </>
);

export default App;
