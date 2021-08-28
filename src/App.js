import './App.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route } from "react-router-dom"
import FolderContextProvider from './contexts/FolderContext';
import FileContextProvider from "./contexts/FileContext"

function App() {
  return (
    <Router>
      <div>
        <FolderContextProvider>
        <FileContextProvider>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/folder/:folderId" component={Dashboard} />
        </FileContextProvider>
        </FolderContextProvider>
        </div>
    </Router>
  );
}

export default App;
