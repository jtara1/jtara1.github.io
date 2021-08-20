import Container from 'react-bootstrap/Container';
import { WEBSITE_TITLE } from '../config';
import React from 'react';


const Home = () => {
  return (
    <Container className="p-3">
      <h1 className="header">Welcome to {WEBSITE_TITLE}</h1>
      <p style={{ fontSize: 20, textAlign: 'center' }}>
        This is a work in progress, but take a look at some of the different pages.
      </p>
    </Container>
  );
}

export default Home;
