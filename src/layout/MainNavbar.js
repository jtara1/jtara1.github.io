import { Nav, Navbar } from 'react-bootstrap';
import React from 'react';
import Container from 'react-bootstrap/Container';

import classes from './MainNavBar.module.css';


const MainNavbar = () => {
  return (
    <Navbar className={classes.bar}>
      <Container>
        <Navbar.Brand href="/" className={classes.brand}>jtara1</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/about-me" className={classes.link}>About Me</Nav.Link>
            <Nav.Link href="/loot-box-calc" className={classes.link}>Loot Box Calc</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;