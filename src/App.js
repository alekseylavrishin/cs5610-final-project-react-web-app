import './App.css';
import Project from "./Project";
import {Routes, Route, Navigate} from "react-router";
import {HashRouter} from "react-router-dom";

function App() {
  return (
      <HashRouter>
          <div>
              <Routes>
                  <Route path="/" element={<Navigate to="project" />} />
                  <Route path="/project/*" element={<Project />}/>
              </Routes>
            </div>
      </HashRouter>
  );
}

export default App;
