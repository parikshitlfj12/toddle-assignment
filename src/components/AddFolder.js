import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { AiFillFolderAdd } from "react-icons/ai";
import { FolderContext } from "../contexts/FolderContext";

export default function AddFolder({ currentFolder }) {
  const { folders, addFolder, removeFolder } = useContext(FolderContext);
  const parentId = "kajdasd"

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
    addFolder(name, parentId);
    
    setName("");
    closeModal();
  }

  return (
    <section>
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
    </section>
  );
}
