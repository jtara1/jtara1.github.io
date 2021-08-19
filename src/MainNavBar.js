import { Nav } from 'react-bootstrap';
import React from 'react';

export const MainNavBar = () => {
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
