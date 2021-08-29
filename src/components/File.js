import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FileContext } from "../contexts/fileContext";
import { Modal, Form, Button } from "react-bootstrap";
import fileImage from "../assets/img/file.png";

export default function File() {
  const { removeFile, getFileForPage, renameFile } = useContext(FileContext);
  const [files, setFiles] = useState([]);
  const { folderId } = useParams();
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFiles(getFileForPage(folderId));
  }, [getFileForPage, folderId]);

  const handleRemove = (fileId) => {
    removeFile(fileId);
  };

  const handleRightClick = (e, file) => {
    e.preventDefault();
    openModal();
    setNewName(file.name);
    setRenameId(file.fileId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    renameFile(renameId, newName);
    console.log(renameId, newName);
    setNewName("");
    closeModal();
  };
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  return files.length ? (
    <section>
      {files.map((oneFile) => {
        return (
          <span key={oneFile.fileId}>
            <span
              onContextMenu={(e) => {
                handleRightClick(e, oneFile);
              }}
              key={oneFile.fileId}
              as={Link}
              variant="outline-dark"
              className="text-truncate m-2"
            >
              <img src={fileImage} alt="File" width="5%" />
              <span style={{paddingLeft: "10px"}}>
                {oneFile.name}.<small>{oneFile.ext}</small>.{" "}
                <b>{oneFile.folderId}</b>
              </span>
              <span
                style={{ marginLeft: "15px", fontSize: "20px" }}
                onClick={() => {
                  handleRemove(oneFile.fileId);
                }}
              >
                <MdCancel />
              </span>
            </span>
            <Modal show={open} onHide={closeModal}>
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <Form.Group>
                    <Form.Label>Rename File</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal}>
                    Close
                  </Button>
                  <Button variant="success" type="submit">
                    Rename
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </span>
        );
      })}
    </section>
  ) : (
    <div>No Files</div>
  );
}
