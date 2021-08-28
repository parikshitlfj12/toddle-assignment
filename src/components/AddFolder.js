import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { AiFillFolderAdd } from "react-icons/ai";
import { FolderContext } from "../contexts/FolderContext";


export default function AddFolder({parentFolder}) {
  const { addFolder } = useContext(FolderContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [buttonActive, setButtonActive] = useState(false);

  // useEffect(() => {
  //   if(parentFolder.parentId === null){
  //     setButtonActive(false);
  //   }
  // }, [parentFolder.parentId, parentFolder])
  

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
    <section style={{display: "inline", margin: "0px 10px"}}>
      <Button disabled={buttonActive} onClick={openModal} className="mt-3" variant="outline-danger">
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
