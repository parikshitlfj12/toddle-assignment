import React, { createContext, useState } from "react";
import uuid from "react-uuid";

export const FileContext = createContext();

const FileContextProvider = (props) => {
  const [files, setFiles] = useState([
    {
      name: "reyna",
      ext: "png",
      fileId: uuid(),
      folderId: "7895187",
    },
    {
      name: "worksheet",
      ext: "csv",
      fileId: uuid(),
      folderId: "7895187",
    },
    {
      name: "Diet",
      ext: "pdf",
      fileId: uuid(),
      folderId: "3kfnsn",
    },
  ]);

  const renameFile = (fileId, newName) => {
    const newArray = files.map(oneFile => {
      if(oneFile.fileId === fileId) {
        oneFile.name = newName;
      }
      return oneFile;
    }) 
    setFiles(newArray);  
  }

  const getFileForPage = (folderId) => {
    const returnFiles = files.filter((file) => {
      return file.folderId === folderId;
    });
    return returnFiles;
  };

  const addFile = (name, ext, currentFolderId) => {
    console.log("Curretn Folder Id == ", currentFolderId)
    const fileId = uuid();
    setFiles([...files, { name, ext, fileId, folderId: currentFolderId }]);
  };

  const removeFile = (fileId) => {
    setFiles(
      files.filter((file) => {
        return file.fileId !== fileId;
      })
    );
  };

  return (
    <FileContext.Provider
      value={{ files, addFile, removeFile, getFileForPage, renameFile}}
    >
      {props.children}
    </FileContext.Provider>
  );
};

export default FileContextProvider;
