import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FileContext } from "../contexts/fileContext";
import { Modal, Form, Alert, Button } from "react-bootstrap";
import fileImage from "../assets/img/file.png";

export default function File({isRoot}) {
  const { removeFile, getFileForPage, renameFile } = useContext(FileContext);
  const [files, setFiles] = useState([]);
  const { folderId } = useParams();
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState("");
  const [duplicate, setDuplicate] = useState(false);
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

  
  function closeDuplicateModal() {
    setDuplicate(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkDuplicate() === false){
      setDuplicate(true);
      return;
    }
    renameFile(renameId, newName);
    setNewName("");
    closeModal();
  };
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const checkDuplicate = () => {
    // files
    let flag = 0;
    files.forEach(file => {
      if(file.name === newName){
        flag = 1;
        return false;
      }
    })
    return flag === 0 ? true : false;
  }

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
                  {oneFile.name}.<small>{oneFile.ext}</small>
                </span>
                <span
                  style={{ marginLeft: "15px", fontSize: "20px" }}
                  onClick={() => {
                    handleRemove(oneFile.fileId);
                  }}
                >
                  <MdCancel color="#8AD0FF" style={{ cursor:"pointer"}}/>
                </span>
              </span>
              <Modal centered show={open} onHide={closeModal}>
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
      <section>
        <Modal centered show={duplicate} onHide={closeDuplicateModal}>
            <Modal.Body>
              <Alert variant="danger">
                <Alert.Heading>File Name Already Exist!</Alert.Heading>
                <p>
                  There Already Exist a File name in the directory.
                  Please try to use a different file name
                </p>
              </Alert>
            </Modal.Body>
            <Button
              variant="outline-secondary"
              onClick={closeDuplicateModal}
              style={{margin: "-10px 10px 10px 10px"}}
            >
              Close
            </Button>
        </Modal>
      </section>
    </section>
  ) : (
    <>
      {isRoot ? <></> : <div>No Files</div>}
    </>
  );
}
