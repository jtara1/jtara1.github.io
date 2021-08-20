import { Nav, Navbar } from 'react-bootstrap';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import classes from './MainNavBar.module.css';


const MainNavbar = () => {
  return (
    <Navbar className={classes.bar}>
      <Container>
        <Navbar.Brand className={classes.brand}>
          <Link stlye={{ all: "inherit" }} to="/">
            jtara1
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link className={classes.link}>
              <Link stlye={{ all: "inherit" }} to="/about-me">
                About Me
              </Link>
            </Nav.Link>
            <Nav.Link href="/loot-box-calc" className={classes.link}>
              <Link stlye={{ all: "inherit" }} to="/loot-box-calc">
                Loot Box Calc
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;