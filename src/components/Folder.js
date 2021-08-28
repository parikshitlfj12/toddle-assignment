import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiFillFolder } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { FolderContext } from "../contexts/FolderContext";
import { MdCancel } from "react-icons/md";
import { useParams } from "react-router";
import { Breadcrumb } from "react-bootstrap";
import { HiBackspace } from "react-icons/hi"

export default function Folder({parentFolder}) {
  const { folderId } = useParams();
  const { getFoldersForAPage, getBreadCrumb } = useContext(FolderContext);
  const [currentPageFolders, setcurrentPageFolders] = useState([]);
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);

  useEffect(() => {
    setcurrentPageFolders(getFoldersForAPage(folderId));
    setBreadCrumbItems(getBreadCrumb(parentFolder));
  }, [getFoldersForAPage, folderId, getBreadCrumb, parentFolder]);

  const { removeFolder, getCurrentFolder } = useContext(FolderContext);
  const history = useHistory();

  const handleRemove = (folderId) => {
    removeFolder(folderId);
    history.push(`/folder/${parentFolder.folderId}`);
  };

  const handleBack = () => {
    const current = getCurrentFolder(folderId);
    history.push(`/folder/${current.parentId}`)
  }

  const handleNavigate = (id) => {
    history.push(`/folder/${id}`)
  }

  return currentPageFolders.length ? (
    <section>
      <Breadcrumb>
        <HiBackspace onClick={handleBack} fontSize="25px" style={{marginRight: "20px", cursor: "pointer"}}/>
        {breadCrumbItems.map(item => {
          return(
            <Breadcrumb.Item key={item} style={{fontSize: "18px"}}>{item}</Breadcrumb.Item>
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
              padding: "8px 14px 8px 5px",
              borderRadius: "5px",
              margin: "2px",
            }}
          >
            <span
              onDoubleClick={() => {handleNavigate(folder.folderId)}}
              style={{ border: "none", cursor:"pointer" }}
              variant="outline-dark"
              className="text-truncate m-2"
            >
              <AiFillFolder fontSize="30px" style={{ margin: "2px 6px" }} />
              {folder.name}
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
              <MdCancel />
            </span>
          </div>
        );
      })}
    </section>
  ) : (
    <div>
      <Breadcrumb>
        <HiBackspace onClick={handleBack} fontSize="25px" style={{marginRight: "20px"}}/>
        
        {breadCrumbItems.map(item => {
          return(
            <Breadcrumb.Item key={item} style={{fontSize: "18px"}}>{item}</Breadcrumb.Item>
          )
        })}
        
      </Breadcrumb>
      <div className="mt-5">No Folders</div>
      
    </div>
  );
}
