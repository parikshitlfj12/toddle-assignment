import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { AiFillFolderAdd } from "react-icons/ai";

export default function AddFolder({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Adding a folder in Context API, Two Central Store 
    // Folders and Files
    const sampleFolder = {
      name: name,
      parentId: currentFolder.id,
      path: ""
    }

    setName("");
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} className="mt-3" variant="outline-danger">
        <AiFillFolderAdd fontSize="25px" />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
