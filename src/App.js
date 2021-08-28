import './App.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route } from "react-router-dom"
import FolderContextProvider from './contexts/FolderContext';

function App() {
  return (
    <Router>
      <div>
        <FolderContextProvider>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/folder/:folderId" component={Dashboard} />
        </FolderContextProvider>
        </div>
    </Router>
  );
}

export default App;
