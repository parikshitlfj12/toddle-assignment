import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiFillFolder } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { FolderContext } from "../contexts/FolderContext";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router";
import { Breadcrumb } from "react-bootstrap";

export default function Folder({parentFolder}) {
  const { folderId } = useParams();
  const { getFoldersForAPage, getBreadCrumb } = useContext(FolderContext);
  const [currentPageFolders, setcurrentPageFolders] = useState([]);
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);

  useEffect(() => {
    setcurrentPageFolders(getFoldersForAPage(folderId));
    setBreadCrumbItems(getBreadCrumb(parentFolder));
  }, [getFoldersForAPage, folderId, getBreadCrumb, parentFolder])

  const { removeFolder } = useContext(FolderContext);
  const history = useHistory();

  const handleRemove = (folderId) => {
    removeFolder(folderId);
    history.push(`/folder/${parentFolder.folderId}`);
  };

  return currentPageFolders.length ? (
    <section>
      <Breadcrumb>
        {breadCrumbItems.map(item => {
          return(
            <Breadcrumb.Item href="#">{item}</Breadcrumb.Item>
          )
        })}
        
      </Breadcrumb>
      <br/>
      {currentPageFolders.map((folder) => {
        return (
          <div
            key={folder.folderId}
            style={{
              border: "2px solid black",
              display: "inline",
              padding: "12px 5px",
              borderRadius: "5px",
              margin: "2px",
            }}
          >
            <Button
              style={{ border: "none" }}
              to={`/folder/${folder.folderId}`}
              as={Link}
              variant="outline-dark"
              className="text-truncate m-2"
            >
              <AiFillFolder fontSize="30px" style={{ margin: "2px 6px" }} />
              {folder.name}
            </Button>
            <span
              style={{
                marginLeft: "-4px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleRemove(folder.folderId);
              }}
            >
              <MdCancel />
            </span>
          </div>
        );
      })}
    </section>
  ) : (
    <div>No Folders</div>
  );
}
