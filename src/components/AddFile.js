import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { AiFillFileText } from "react-icons/ai";
import { FileContext } from "../contexts/FileContext";

export default function AddFile({ parentFolder }) {  
  const {addFile} = useContext(FileContext);


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
    <section style={{display: "inline"}}>
      <Button onClick={openModal} className="mt-3" variant="outline-info">
        <AiFillFileText fontSize="25px" />
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
              <Form.Label style={{marginTop: "20px"}}>File Ext</Form.Label>
              <Form.Control
                type="text"
                required
                value={ext}
                onChange={(e) => setExt(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add File
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </section>
  );
}
