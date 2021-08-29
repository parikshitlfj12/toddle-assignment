import React, { createContext, useState } from "react";
import uuid from "react-uuid";

export const FileContext = createContext();

const FileContextProvider = (props) => {
  const [files, setFiles] = useState([
    {
      name: "Kashmir",
      ext: "jpeg",
      fileId: uuid(),
      folderId: "5nqkjwsa",
    },
    {
      name: "LadhakMom",
      ext: "png",
      fileId: uuid(),
      folderId: "5nqkjwsa",
    },
    {
      name: "RandomPhoto",
      ext: "jpeg",
      fileId: uuid(),
      folderId: "63211",
    },{
      name: "chrome",
      ext: "exe",
      fileId: uuid(),
      folderId: "3kfnsn",
    },
    {
      name: "firefox",
      ext: "exe",
      fileId: uuid(),
      folderId: "3kfnsn",
    },
    {
      name: "wolfStreet",
      ext: "pm4",
      fileId: uuid(),
      folderId: "WOFJSKsd",
    },
    {
      name: "Never Back Down",
      ext: "mp4",
      fileId: uuid(),
      folderId: "NBDkjnasd",
    },
    {
      name: "Github",
      ext: "exe",
      fileId: uuid(),
      folderId: "3kfnsn",
    },
    {
      name: "Edge",
      ext: "exe",
      fileId: uuid(),
      folderId: "3kfnsn",
    },
    {
      name: "chrome",
      ext: "bin",
      fileId: uuid(),
      folderId: "Gkjasd",
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
