
import { Navbar, Nav, Container } from 'react-bootstrap';



const Header = () => {
  return (
    <Navbar expand="lg" bg="white" className="navbar shadow-sm border-bottom">
      <Container fluid>
        <Navbar.Brand href="/" className="text-primary">
          🎓 Faculty Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="falcon-navbar" />
        <Navbar.Collapse id="falcon-navbar">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-secondary">Home</Nav.Link>
            
            <Nav.Link href="/about" className="text-secondary">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

