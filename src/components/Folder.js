import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { FolderContext } from "../contexts/FolderContext";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router";
import { Breadcrumb } from "react-bootstrap";
import { HiBackspace } from "react-icons/hi";
import folderImage from "../assets/img/folder.png";
import "../assets/styles/folder.css";

export default function Folder({ parentFolder }) {
  // Data
  const { folderId } = useParams();
  const { getFoldersForAPage, getBreadCrumb, renameFolder } =
    useContext(FolderContext);
  const [currentPageFolders, setcurrentPageFolders] = useState([]);
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMain, setOpenMain] = useState(false);
  const [newName, setNewName] = useState("");
  const [renameId, setRenameId] = useState("");
  const { removeFolder, getCurrentFolder } = useContext(FolderContext);
  const history = useHistory();

  useEffect(() => {
    setcurrentPageFolders(getFoldersForAPage(folderId));
    setBreadCrumbItems(getBreadCrumb(parentFolder));
  }, [getFoldersForAPage, folderId, getBreadCrumb, parentFolder]);

  // Functions
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  function openMainModal() {
    setOpenMain(true);
  }
  function closeMainModal() {
    setOpenMain(false);
  }

  const handleRemove = (folderId) => {
    removeFolder(folderId);
    history.push(`/folder/${parentFolder.folderId}`);
  };

  const handleBack = () => {
    const current = getCurrentFolder(folderId);
    history.push(`/folder/${current.parentId}`);
  };

  const handleNavigate = (id) => {
    history.push(`/folder/${id}`);
  };

  const handleSubmit = (e) => {
    renameFolder(renameId, newName);
    e.preventDefault();
    setNewName("");
    closeModal();
  };

  const handleRightClick = (e, folder) => {
    setOpenMain(true);
    e.preventDefault();
    // openModal();
    setNewName(folder.name);
    setRenameId(folder.folderId);
  };

  // Return
  return currentPageFolders.length ? (
    <section>
      <Breadcrumb>
        <HiBackspace
          onClick={handleBack}
          fontSize="25px"
          style={{ marginRight: "20px", cursor: "pointer" }}
        />
        {breadCrumbItems.map((item) => {
          return (
            <Breadcrumb.Item key={item} className="style-breadcrumb-items">
              {item}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>

      <br />
      {currentPageFolders.map((folder) => {
        return (
          <span key={folder.folderId}>
            <div
              onContextMenu={(e) => {
                handleRightClick(e, folder);
              }}
              style={{
                display: "inline",
                padding: "30px 14px 30px 5px",
                borderRadius: "5px",
                margin: "2px",
              }}
            >
              <span
                onDoubleClick={(e) => {
                  e.preventDefault();
                  handleNavigate(folder.folderId);
                }}
                style={{ border: "none", cursor: "pointer" }}
                variant="outline-dark"
                className="text-truncate m-2"
              >
                <img src={folderImage} alt="Folder" width="50px" />
                <span style={{ paddingLeft: "10px" }}>{folder.name}</span>
              </span>
              <span
                style={{
                  marginLeft: "6px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleRemove(folder.folderId);
                }}
              >
                <MdCancel color="#dc143c" />
              </span>
            </div>

            {/* MAIN MODAL */}
            <Modal
              show={openMain}
              onHide={closeMainModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <Modal.Title>Choose Action</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <b><i>WARNING!!! </i></b>Clicking on delete button will permanently delete your Folder from Drive.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  onClick={() => {
                    console.log("OPEN RENAME MODAL");
                    closeMainModal();
                    openModal();
                  }}
                >
                  Rename
                </Button>
                <Button
                  onClick={() => {
                    closeMainModal();
                    handleRemove(folder.folderId);
                  }}
                  variant="danger"
                  type="submit"
                >
                  Delete
                </Button>
                <Button variant="secondary" onClick={closeMainModal}>
                    Close
                  </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={open} onHide={closeModal}>
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <Form.Group>
                    <Form.Label>Type New Folder Name</Form.Label>
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
    <div>
      <Breadcrumb>
        <HiBackspace
          onClick={handleBack}
          fontSize="25px"
          style={{ marginRight: "20px", cursor: "pointer" }}
        />
        {breadCrumbItems.map((item) => {
          return (
            <Breadcrumb.Item key={item} className="style-breadcrumb">
              {item}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
      <div className="mt-5">No Folders</div>
    </div>
  );
}
