import React, { createContext, useState } from 'react'
import uuid from 'react-uuid'


export const FileContext = createContext();

const  FileContextProvider = (props) => {
  const [files,setFiles] = useState([
      {
        name: "reyna",
        ext: "png",
        fileId: uuid(),
        folderId: ""
      },{
        name: "worksheet",
        ext: "csv",
        fileId: uuid(),
        folderId: ""
      },{
        name: "Diet",
        ext: "pdf",
        fileId: uuid(),
        folderId: ""
      },
    ])

  const addFile = (name, ext, currentFolderId) => {
    const fileId = uuid();
    setFiles([...files, {name, ext, fileId, folderId: currentFolderId}]);
  }

  const removeFile = (fileId) => {
    console.log(fileId);
    console.log(files)
    setFiles(files.filter(file => {
      return (file.fileId !== fileId);
    }))
  }
  return (
    <FileContext.Provider value={{files, addFile, removeFile}}>
      {props.children}
    </FileContext.Provider>
  );
}
 
export default FileContextProvider;