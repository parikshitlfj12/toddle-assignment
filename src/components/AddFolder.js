import React, { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import { AiFillFolderAdd } from "react-icons/ai";
import { FolderContext } from "../contexts/FolderContext";
import Button from "@material-ui/core/Button";

export default function AddFolder({ parentFolder, isRoot }) {
  const { addFolder } = useContext(FolderContext);
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
    addFolder(name, parentFolder.folderId);
    setName("");
    closeModal();
  }

  return (
    <section style={{ margin: "0px 10px" }}>
      <Button
        variant="contained"
        style={{ width: "165px", backgroundColor: "#4AB7FF", color: "white" }}
        disabled={isRoot}
        onClick={openModal}
        className="mt-3"
        startIcon={<AiFillFolderAdd />}
      >
        Add Folder
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
            <Button
              variant="contained"
              style={{
                width: "165px",
                backgroundColor: "grey",
                color: "white",
              }}
              onClick={closeModal}
            >
              Close
            </Button>
            <Button
              variant="contained"
              style={{
                marginLeft: "10px",
                width: "165px",
                backgroundColor: "#4AB7FF",
                color: "white",
              }}
              type="submit"
            >
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </section>
  );
}
