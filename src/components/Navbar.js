import react from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link>Add Folder</Nav.Link>
            <Nav.Link>Add File</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
