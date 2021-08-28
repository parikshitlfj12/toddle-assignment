import React, { createContext, Component } from 'react'
export const FileContext = createContext();

class FileContextProvider extends Component {
    state = {
      fileArray: []
    }
  render() { 
    return (
      <FileContext.Provider value={{...this.state}}>

      </FileContext.Provider>
    );
  }
}
 
export default FileContextProvider;