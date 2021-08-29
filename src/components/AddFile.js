import React, { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import { AiFillFileText } from "react-icons/ai";
import { FileContext } from "../contexts/fileContext";
import Button from "@material-ui/core/Button";

export default function AddFile({ parentFolder, isRoot }) {
  const { addFile } = useContext(FileContext);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [ext, setExt] = useState("");

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentFolderId = parentFolder.folderId;
    addFile(name, ext, currentFolderId);
    setName("");
    setExt("");
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
        startIcon={<AiFillFileText />}
      >
        Add File
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>File Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Label style={{ marginTop: "20px" }}>File Ext</Form.Label>
              <Form.Control
                type="text"
                required
                value={ext}
                onChange={(e) => setExt(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={closeModal}
              variant="contained"
              style={{
                width: "165px",
                backgroundColor: "grey",
                color: "white",
              }}
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
              Add File
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </section>
  );
}
