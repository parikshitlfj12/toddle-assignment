import React, { createContext, useState } from "react";
import uuid from "react-uuid";

export const FolderContext = createContext();

const FolderContextProvider = (props) => {
  const [folders, setFolders] = useState([
    {
      name: "Root",
      folderId: "7895187",
      parentId: null,
    },
    {
      name: "1",
      folderId: "63211",
      parentId: "7895187",
    },
    {
      name: "2",
      folderId: "12nex",
      parentId: "7895187",
    },
    {
      name: "3",
      folderId: "3kfnsn",
      parentId: "7895187",
    },
    {
      name: "4",
      folderId: "aslknca",
      parentId: "63211",
    },
    {
      name: "5",
      folderId: "6nqkjwsa",
      parentId: "63211",
    },
    {
      name: "6",
      folderId: "63211",
      parentId: "6nqkjwsa",
    },
    {
      name: "8",
      folderId: "63211",
      parentId: "3kfnsn",
    },
    {
      name: "10",
      folderId: "632asd11",
      parentId: "3kfnsn",
    },
    {
      name: "12",
      folderId: "12kjnasdn",
      parentId: "632asd11",
    },
  ]);

  const renameFolder = (folderId, newName) => {
    const newArray = folders.map(oneFolder => {
      if(oneFolder.folderId === folderId) {
        oneFolder.name = newName;
      }
      return oneFolder;
    }) 
    setFolders(newArray);
  }

  const getBreadCrumb = (currentFolder) => {
    const arr = []
    if(currentFolder === undefined || currentFolder.parentId === undefined || currentFolder.folderId === undefined || currentFolder.name === "/"){
      return ["/"];
    }
    if(currentFolder.parentId === null){
      return ["/", "Root"];
    }
    arr.push("/", "Root");

    const tempArr = [];
    tempArr.push(currentFolder.name);

    
    let parent = folders.filter(fold => {
      return (fold.folderId === currentFolder.parentId)
    })[0]

    
    while (parent.parentId !== null) {
      tempArr.push(parent.name);
      let newParent = folders.filter(fold => {
        return (fold.folderId === parent.parentId)
      })[0]
      parent = newParent;
    }

    var rev = tempArr.reverse(); 
    rev.forEach(one => {
      arr.push(one)
    }) ;
    return arr;
  };

  const getFoldersForAPage = (folderId = null) => {
    if (folderId == null) {
      const returnFolder = folders.filter((fol) => fol.parentId === null);
      return returnFolder;
    } else {
      const pageFolders = folders.filter((folder) => {
        return folder.parentId === folderId;
      });
      return pageFolders;
    }
  };

  const addFolder = (name, parentId) => {
    const folderId = uuid();
    setFolders([...folders, { name, parentId, folderId }]);
  };

  const getCurrentFolder = (folderId = undefined) => {
    if (folderId === undefined) {
      const folde = Object.create(
        folders.filter((fol) => fol.parentId === null)[0]
      );
      folde.name = "/";
      return folde;
    }
    return folders.filter((fol) => fol.folderId === folderId)[0];
  };

  const removeFolder = (folderId) => {
    setFolders(
      folders.filter((fol) => {
        return fol.folderId !== folderId;
      })
    );
  };
  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        removeFolder,
        getFoldersForAPage,
        getCurrentFolder,
        getBreadCrumb,
        renameFolder
      }}
    >
      {props.children}
    </FolderContext.Provider>
  );
};

export default FolderContextProvider;
