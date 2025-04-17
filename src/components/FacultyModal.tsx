
import { useState } from "react";
import { useFaculty } from "../context/FacultyContext";
import { addFaculty, updateFaculty } from "../lib/actions";
import { Faculty } from "../lib/faculty";
import { Button, Modal } from "react-bootstrap";

type Props = {
  faculty?: Faculty;
  closeModal: () => void;
  openModal: boolean;
};

const FacultyModal = ({ faculty, closeModal, openModal }: Props) => {
  const [facultyItem, setFacultyItem] = useState<Faculty>({
    id: faculty?.id ?? Date.now(),
    title: faculty?.title ?? "",
    body: faculty?.body ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { dispatch } = useFaculty();

  const isUpdating = !!faculty;
  const isUnchanged =
    isUpdating &&
    facultyItem.title === faculty.title &&
    facultyItem.body === faculty.body;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let result;

      if (isUpdating) {
        result = await updateFaculty(dispatch, facultyItem);
      } else {
        result = await addFaculty(dispatch, facultyItem);
      }

      if (!result.success) {
        throw new Error(result.message);
      }

      setMessage({
        type: "success",
        text: isUpdating ? "Updated successfully!" : "Added successfully!",
      });

      closeModal();
    } catch (error) {
      setMessage({ type: "error", text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={openModal} onHide={closeModal} centered dialogClassName="modal-fixed-right">
      <Modal.Header className="modal-header-settings" closeButton>
        <Modal.Title>{isUpdating ? "Edit Faculty" : "Add Faculty"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {message && (
          <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Faculty Title"
              value={facultyItem.title}
              onChange={(e) =>
                setFacultyItem({ ...facultyItem, title: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Faculty Description"
              value={facultyItem.body}
              onChange={(e) =>
                setFacultyItem({ ...facultyItem, body: e.target.value })
              }
              required
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={loading || (isUpdating && isUnchanged)}
          >
            {loading
              ? "Processing..."
              : isUpdating
              ? "Update Faculty"
              : "Add Faculty"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FacultyModal;

