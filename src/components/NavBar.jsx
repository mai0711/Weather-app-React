import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function NavBar() {
  return (
    <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Weather Forecast</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Current</Nav.Link>
            <Nav.Link href="/hourly">Hourly</Nav.Link>
            <Nav.Link href="/weeklyweather">7 Days</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
