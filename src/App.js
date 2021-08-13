import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import {
  Col,
  Nav,
  Navbar,
  Row
} from 'react-bootstrap';

import './App.css';
import { WEBSITE_TITLE } from './config';

const MainNavBar = () => {
  const style = { border: '5px solid' };

  return (
    <Navbar id="main-nav-bar" bg="light" expand="xl">
      {/*<Container fluid="xl" style={{ width: '100px' }}>*/}
      <Container fluid="xl">
        <Nav href="#home" style={style}>Home</Nav>
        <Nav href="#blogs" style={style}>Blogs</Nav>
      </Container>
    </Navbar>
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
