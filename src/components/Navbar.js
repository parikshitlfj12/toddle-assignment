import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Sky.io
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link>My Files</Nav.Link>
            <Nav.Link>Recent</Nav.Link>
            <Nav.Link>Settings</Nav.Link>
            <Nav.Link>Recycle Bin</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
