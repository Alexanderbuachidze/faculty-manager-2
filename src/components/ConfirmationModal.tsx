import { useState } from "react";
import { useFaculty } from "../context/FacultyContext";
import { deleteFaculty } from "../lib/actions";
import { Faculty } from "../lib/faculty";
import { Button, Modal, Alert } from "react-bootstrap";

type Props = {
  closeModal: () => void;
  faculty: Faculty;
};

const ConfirmationModal = ({ closeModal, faculty }: Props) => {
  const { dispatch } = useFaculty();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleDelete() {
    setLoading(true);
    setMessage(null);

    try {
      console.log(faculty.id);
      const result = await deleteFaculty(dispatch, faculty?.id);

      if (!result.success) {
        throw new Error(result.message);
      }

      setMessage({ type: "success", text: "Deleted successfully!" });
      closeModal();
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold">Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted">This action cannot be undone. This will permanently delete the faculty.</p>

        {message && (
          <Alert variant={message.type === "error" ? "danger" : "success"} className="mb-3">
            {message.text}
          </Alert>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Processing..." : "Delete Faculty"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
