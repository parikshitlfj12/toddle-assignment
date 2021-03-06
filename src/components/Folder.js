import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button as BootstrapButton, Modal, Form, Alert } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import DeleteIcon from "@material-ui/icons/Delete";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { FolderContext } from "../contexts/FolderContext";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router";
import folderImage from "../assets/img/folder.png";

// Material UI

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import { emphasize, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// Css styles
import "../assets/styles/folder.css";

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Folder({ parentFolder, isRoot }) {
  const classes = useStyles();


  // Data
  const { folderId } = useParams();
  const { getFoldersForAPage, getBreadCrumb, renameFolder, folders } =
    useContext(FolderContext);
  const [currentPageFolders, setcurrentPageFolders] = useState([]);
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMain, setOpenMain] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
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
  function closeMainModal() {
    setOpenMain(false);
  }

  function closeDuplicateModal() {
    setDuplicate(false);
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

  const checkDuplicate = () => {
    // currentPageFolders
    let flag = 0;
    currentPageFolders.forEach((folder) => {
      if (folder.name === newName) {
        flag = 1;
        return false;
      }
    });
    return flag === 0 ? true : false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkDuplicate() === false) {
      setDuplicate(true);
      return;
    }
    renameFolder(renameId, newName);
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

  const breadCrumbnavigate = (folderName) => {
    folders.forEach(folder => {
      if(folderName === "/"){
        history.push("null");
        return;
      }
      if(folder.name === folderName){
        history.push(folder.folderId);
        return;
      }
    })
  };

  // Return
  return currentPageFolders.length ? (
    <section>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          onClick={handleBack}
          icon={<ArrowBackIosIcon style={{ fontSize: "15px" }} />}
        />
        {breadCrumbItems.map((item) => {
          return item === "Root" ? (
            <StyledBreadcrumb
              component="a"
              onClick={() => {breadCrumbnavigate(item)}}
              label="Root"
              icon={<HomeIcon style={{ fontSize: "15px" }} />}
            />
          ) : (
            <StyledBreadcrumb
              component="a"
              key={item}
              onClick={() => {breadCrumbnavigate(item)}}
              label={item}
              href={folderId}
            />
          );
        })}
      </Breadcrumbs>

      <br />
      <section style={{ marginTop: "10px" }}>
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
                  <img src={folderImage} alt="Folder" width="30px" />
                  <span style={{ paddingLeft: "10px" }}>{folder.name}</span>
                </span>
                <span
                  style={{
                    marginLeft: "6px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    console.log("Is Root == ", isRoot);
                    if (isRoot) {
                      return;
                    } else {
                      handleRemove(folder.folderId);
                    }
                  }}
                >
                  {isRoot ? <></> : <MdCancel color="#8AD0FF" />}
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
                  <b>
                    <i>WARNING!!! </i>
                  </b>
                  Clicking on delete button will permanently delete your Folder
                  from Drive.
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="contained"
                    startIcon={<HighlightOffIcon />}
                    onClick={closeMainModal}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#4AB7FF", marginLeft: "10px" }}
                    startIcon={<AccountCircleIcon />}
                    onClick={() => {
                      console.log("OPEN RENAME MODAL");
                      closeMainModal();
                      openModal();
                    }}
                  >
                    Rename
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      closeMainModal();
                      handleRemove(folder.folderId);
                    }}
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>

              <Modal centered show={open} onHide={closeModal}>
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
                    <Button
                      variant="contained"
                      startIcon={<HighlightOffIcon />}
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ backgroundColor: "#4AB7FF", marginLeft: "10px" }}
                      startIcon={<AccountCircleIcon />}
                    >
                      Rename
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </span>
          );
        })}
      </section>

      <section>
        <Modal centered show={duplicate} onHide={closeDuplicateModal}>
          <Modal.Body>
            <Alert variant="danger">
              <Alert.Heading>Folder Name Already Exist!</Alert.Heading>
              <p>
                There Already Exist a Folder name in the directory. Please try
                to use a different Folder name
              </p>
            </Alert>
          </Modal.Body>
          <BootstrapButton
            variant="outline-secondary"
            onClick={closeDuplicateModal}
            style={{ margin: "-10px 10px 10px 10px" }}
          >
            Close
          </BootstrapButton>
        </Modal>
      </section>
    </section>
  ) : (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          onClick={handleBack}
          icon={<ArrowBackIosIcon style={{ fontSize: "15px" }} />}
        />
        {breadCrumbItems.map((item) => {
          return item === "Root" ? (
            <StyledBreadcrumb
              key={item}
              onClick={() => {breadCrumbnavigate(item)}}
              label="Root"
              icon={<HomeIcon style={{ fontSize: "15px" }} />}
            />
          ) : (
            <StyledBreadcrumb key={item} label={item} onClick={() => {breadCrumbnavigate(item)}}/>
          );
        })}
      </Breadcrumbs>
      <div className="mt-5">No Folders</div>
    </div>
  );
}
