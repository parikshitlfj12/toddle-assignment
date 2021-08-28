import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillFileText } from "react-icons/ai"
import { MdCancel } from "react-icons/md";
import {FileContext} from "../contexts/FileContext"

export default function File() {
  const { removeFile, getFileForPage } = useContext(FileContext);
  const [files, setFiles] = useState([
    {
      name: "Diet",
      ext: "pdf",
      fileId: 465132,
      folderId: "3kfnsn",
    },
    {
      name: "kjnad",
      ext: "pdf",
      fileId: "5466",
      folderId: "uygni",
    },
  ]);
  const { folderId } = useParams();

  useEffect(() => {
    setFiles(getFileForPage(folderId));
  }, [getFileForPage, folderId])

   const handleRemove = (fileId) => {
    removeFile(fileId);
   }

  return files.length ? (
    <section>
      {files.map((oneFile) => {
        return (
          <span
            key={oneFile.fileId}
            as={Link}
            variant="outline-dark"
            className="text-truncate m-2"
          >
            <AiFillFileText fontSize="30px" style={{ margin: "2px 6px" }} />
            {oneFile.name}.<small>{oneFile.ext}</small>. <b>{oneFile.folderId}</b>
            <span style={{marginLeft: "15px", fontSize: "20px"}} onClick={() => {handleRemove(oneFile.fileId)}}>
              <MdCancel />
            </span>
          </span>
        );
      })}
    </section>
  ) : (
    <div>No Files</div>
  );
}
