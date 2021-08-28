import React, { createContext, useState } from 'react'
import uuid from 'react-uuid'


export const FolderContext = createContext();

const FolderContextProvider = (props) => {
  const [folders,setFolders] = useState([
      {
        name: "Root",
        folderId: "7895187",
        parentId: null
      },{
        name: "Movies",
        folderId: "63211",
        parentId: "7895187"
      },{
        name: "Songs",
        folderId: "12nex",
        parentId: "7895187"
      }
    ])

  const addFolder = (name, parentId) => {
    const folderId = uuid();
    setFolders([...folders, {name, parentId, folderId}]);
  }

  const removeFolder = (folderId) => {

    setFolders(folders.filter(fol => {
      return (fol.folderId !== folderId);
    }))
  }
  return (
    <FolderContext.Provider value={{folders, addFolder, removeFolder}}>
      {props.children}
    </FolderContext.Provider>
  );
}
 
export default FolderContextProvider;