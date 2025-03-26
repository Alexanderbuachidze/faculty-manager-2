
import { useEffect, useState } from "react";
import { useFaculty } from "../context/FacultyContext";
import { Faculty } from "../lib/faculty";
import ConfirmationModal from "./ConfirmationModal";
import FacultyModal from "./FacultyModal";
import { Button, Card } from "react-bootstrap";

type Props = {
  initialFaculty: Faculty;
  id: string;
};

const FacultyItem = ({ initialFaculty }: Props) => {
  const { state } = useFaculty();
  const [faculty, setFaculty] = useState<Faculty>(initialFaculty);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const updatedFaculty = state.faculties.find((f) => f.id === initialFaculty.id);
    if (updatedFaculty) {
      setFaculty(updatedFaculty);
    }
  }, [state.faculties, initialFaculty.id]);

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        {openModal && <FacultyModal faculty={faculty} closeModal={() => setOpenModal(false)} openModal />}
        {openDeleteModal && <ConfirmationModal faculty={faculty} closeModal={() => setOpenDeleteModal(false)} />}

        
        <Card.Title className="fw-semibold">{faculty?.title}</Card.Title>
        <Card.Text className="text-muted">{faculty?.body}</Card.Text>

        
        <div className="d-flex gap-2 mt-3">
          <Button onClick={() => setOpenModal(true)} variant="primary">
            Edit
          </Button>
          <Button onClick={() => setOpenDeleteModal(true)} variant="danger">
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FacultyItem;
