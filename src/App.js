import './App.css';
import rootDashboard from './pages/Dashboard';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import FolderContextProvider from './contexts/FolderContext';
import FileContextProvider from "./contexts/FileContext";

function App() {
  return (
    <Router>
      
      <div>
        <FolderContextProvider>
        <FileContextProvider>
          <Switch>
            <Route exact path="/" component={rootDashboard} />
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
