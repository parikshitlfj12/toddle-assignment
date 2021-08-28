import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillFolder } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { FolderContext } from "../contexts/FolderContext";
import { MdCancel } from "react-icons/md";

export default function Folder() {
  const { folders, removeFolder } = useContext(FolderContext);

   const handleRemove = (folderId) => {
    removeFolder(folderId);
   }

  return folders.length ? (
    <section>
      {folders.map((folder) => {
        return (
          <span
            key={folder.folderId}
            to={`/folder/${folder.folderId}`}
            as={Link}
            variant="outline-dark"
            className="text-truncate m-2"
          >
            <AiFillFolder fontSize="30px" style={{ margin: "2px 6px" }} />
            {folder.name}
            <span style={{marginLeft: "15px", fontSize: "20px"}} onClick={() => {handleRemove(folder.folderId)}}>
              <MdCancel />
            </span>
          </span>
        );
      })}
    </section>
  ) : (
    <div>No Folders</div>
  );
}
