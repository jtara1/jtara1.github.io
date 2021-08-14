import React from 'react';

import Container from 'react-bootstrap/Container';
import {
  Nav,
  Navbar,
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
        <Nav.Item>
          <Nav.Link style={style} eventKey="blogs-link">Blogs</Nav.Link>
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
    </Container>
  </>
);

export default App;
