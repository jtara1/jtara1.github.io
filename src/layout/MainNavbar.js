import { Nav, Navbar } from 'react-bootstrap';
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import classes from './MainNavBar.module.css';


const MainNavbar = () => {
  return (
    <Navbar className={classes.bar}>
      <Container>
        <Navbar.Brand>
          <Link className={[classes.brand, classes.navCommon].join(' ')} to="/">
            jtara1
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as="span">
              <Link className={[classes.link, classes.navCommon].join(' ')} to="/about-me">
                About Me
              </Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link className={[classes.link, classes.navCommon].join(' ')} to="/loot-box-calc">
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