import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillFileText } from "react-icons/ai"
import { MdCancel } from "react-icons/md";
import {FileContext} from "../contexts/FileContext"

export default function File() {
  const { files, removeFile } = useContext(FileContext);

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
            {oneFile.name}.<small>{oneFile.ext}</small> 
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
