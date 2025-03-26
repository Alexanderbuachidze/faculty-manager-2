
import { useState } from "react";
import { useFaculty } from "../context/FacultyContext";
import FacultyItem from "./FacultyItem";
import FacultyModal from "./FacultyModal";
import { Button, Container, Row, Col } from "react-bootstrap";

const FacultyList = () => {
  const [openModal, setOpenModal] = useState(false);
  const { state: { faculties } } = useFaculty();

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container className="py-4">
        
        <Row className="align-items-center mb-4">
          <Col>
            <h1 className="fw-semibold">Faculty List</h1>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setOpenModal(true)}>
              + Add Faculty
            </Button>
          </Col>
        </Row>

        
        <Row className="gy-4">
          {faculties.length > 0 ? (
            faculties.map((faculty) => (
              <Col key={faculty.id} md={6}>
                <FacultyItem id={String(faculty.id)} initialFaculty={faculty} />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p className="text-muted">No faculties found.</p>
            </Col>
          )}
        </Row>
      </Container>

      
      {openModal && <FacultyModal openModal={openModal} closeModal={() => setOpenModal(false)} />}
    </Container>
  );
};

export default FacultyList;
