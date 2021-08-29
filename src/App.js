import './App.css';
import rootDashboard from './pages/Dashboard';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


import FolderContextProvider from './contexts/FolderContext';
import FileContextProvider from "./contexts/fileContext";

function App() {
  return (
    <Router>
      
      <div>
        <FolderContextProvider>
        <FileContextProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/folder/999999" />
            </Route>
            <Route exact path="/folder/null" component={rootDashboard} />
            <Route exact path="/folder/:folderId" component={rootDashboard} />
            <Route>
              <h1>No Page Found</h1>
            </Route>
          </Switch>
        </FileContextProvider>
        </FolderContextProvider>
        </div>
      
    </Router>
  );
}

export default App;
