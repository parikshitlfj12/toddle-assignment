import React, { createContext, useState } from "react";
import uuid from "react-uuid";

export const FolderContext = createContext();

const FolderContextProvider = (props) => {
  const [folders, setFolders] = useState([
    {
      name: "Root",
      folderId: "999999",
      parentId: null,
    },
    {
      name: "Images",
      folderId: "63211",
      parentId: "999999",
    },
    {
      name: "Movies",
      folderId: "12nex",
      parentId: "999999",
    },
    {
      name: "Software",
      folderId: "3kfnsn",
      parentId: "999999",
    },
    {
      name: "Dad's Photos",
      folderId: "aslknca",
      parentId: "63211",
    },
    {
      name: "Mom's Picture",
      folderId: "5nqkjwsa",
      parentId: "63211",
    },
    {
      name: "Google Chrome",
      folderId: "Gkjasd",
      parentId: "3kfnsn",
    },
    {
      name: "Valorant",
      folderId: "Vjhbasnjk",
      parentId: "3kfnsn",
    },
    {
      name: "Valorant bin",
      folderId: "VBakjdns",
      parentId: "Vjhbasnjk",
    },
    {
      name: "Wolf Of WallStreet",
      folderId: "WOFJSKsd",
      parentId: "12nex",
    },
    {
      name: "Never Back Down",
      folderId: "NBDkjnasd",
      parentId: "12nex",
    },
    {
      name: "Never Back Down Lyrics",
      folderId: "NBD2kjnasd",
      parentId: "NBDkjnasd",
    },
    {
      name: "Legends",
      folderId: "Legkjnasd",
      parentId: "12nex",
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
      // eslint-disable-next-line no-loop-func
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
    let folderIds = [];
    let folderToRemove = folders.filter((fol) => {
      return fol.folderId === folderId;
    })[0];
    let foldersToRemove = folders.filter((fol) => {
      return fol.parentId === folderToRemove.folderId;
    });

    foldersToRemove = [...foldersToRemove, folderToRemove]
    folderIds = foldersToRemove.map(folder => {
      return folder.folderId;
    })
    
    
    const reNewed = folders.filter((fol) => {
      let flag = 0;
      folderIds.forEach(eachFolderId => {
        if(eachFolderId === fol.folderId){
          console.log("Found A Dolder Id", eachFolderId);
          flag = 1;
          return false;
        }
      })
      return flag === 1 ? false  : true;
    })
    console.log(reNewed)

    setFolders(reNewed);
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
