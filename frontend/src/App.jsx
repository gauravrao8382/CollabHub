import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import CompletedProjectDetails from './pages/CompletedProjectDetails';
import Search from './pages/Search';
import Profile from './pages/Profile';
import { initialProjects } from './data/projects';

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(initialProjects);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);
  const handleAddProject = (newProject) => setProjects([newProject, ...projects]);

  return (
    <Router>
      <div className="min-h-screen text-gray-800">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} projects={projects} /> : <Login onLogin={handleLogin} />} />
          <Route path="/projects" element={<Projects projects={projects} />} />
          <Route path="/search" element={<Search projects={projects} />} />
          <Route path="/create-project" element={user ? <CreateProject onAddProject={handleAddProject} /> : <Login onLogin={handleLogin} />} />
          <Route path="/project/:id" element={<ProjectDetails projects={projects} />} />
          <Route path="/completed-project/:id" element={<CompletedProjectDetails />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Login onLogin={handleLogin} />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;