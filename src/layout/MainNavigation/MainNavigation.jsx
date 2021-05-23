import React from 'react';
import { useQuery } from 'react-query';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link, NavLink } from 'react-router-dom';
import './MainNavigation.css';
import { getAccount } from '../../services/account';

export default function MainNavigation({ jwtToken }) {
  const { data: response } = useQuery(
    'account',
    () => jwtToken && getAccount()
  );
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/movies">
          Simple Router
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100">
            {jwtToken ? (
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
                <Nav.Item className="account">
                  {response?.data?.login && 'Ulogovani ste kao '}
                  <strong style={{ color: '#fff' }}>
                    {response?.data?.login}
                  </strong>
                </Nav.Item>
                <Nav.Link as={NavLink} to="/logout">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link className="login" as={NavLink} to="/login">
                Login/Register
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
