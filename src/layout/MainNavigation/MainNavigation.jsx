import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, NavLink } from 'react-router-dom';
import './MainNavigation.css';

export default function MainNavigation({ isLoggedIn }) {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/movies">
          Simple Router
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100">
            {isLoggedIn ? (
              <>
                <Nav.Link as={NavLink} to="/movies">
                  Filmovi
                </Nav.Link>
                <Nav.Link as={NavLink} to="/books">
                  Knjige
                </Nav.Link>
                <Nav.Link as={NavLink} to="/people">
                  Osobe
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
