import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column vh-100% p-3 bg-white border-end shadow-sm" style={{ width: '240px'}} >
      <h5 className="text-primary fw-bold">📋 Menu</h5>
      <Nav className="flex-column mt-3">
        <Nav.Link href="/faculties" className="text-secondary">Faculties</Nav.Link>
        <Nav.Link href="/settings" className="text-secondary">Settings</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
