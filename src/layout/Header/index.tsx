import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export type HeaderProps = {
  children?: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <Navbar bg="light" data-testid="navbar" fixed="top">
      <Container className="px-5" fluid>
        <Navbar.Brand as={Link} to="/">
          Contacts
        </Navbar.Brand>
        {children}
      </Container>
    </Navbar>
  );
};

export default Header;
