import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import CompletedProjectDetails from './pages/CompletedProjectDetails';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import EditProject from './pages/EditProject';
import ManageProject from './pages/ManageProject';
import UserProfile from './pages/UserProfile';
import Messages from './pages/Messages';
import ProjectChat from './pages/ProjectChat';



function App() {
  const API = "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Simulate fetching projects from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API}/getprojects`);

        setProjects(res.data.projects);
      }
      catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);

  // ✅ Load user from localStorage on refresh and check token validity
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          handleLogout();
        } else {
          // ✅ Valid token
          setUser(JSON.parse(storedUser));
        }

      } catch (err) {
        handleLogout();
      }
    }

    setLoading(false);
  }, []);

  // ✅ Login handler
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Add project
  const handleAddProject = (newProject) => {
    setProjects([newProject, ...projects]);
  };

  // App.jsx - handleUserUpdate function add karein
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // 🔥 Loader jab tak auth check ho raha
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen text-gray-800">

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />

          <Route
            path="/login"
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/signup"
            element={!user ? <Signup onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} projects={projects} setProjects={setProjects} /> : <Navigate to="/login" />}
          />

          <Route
            path="/create-project"
            element={user ? <CreateProject onAddProject={handleAddProject} /> : <Navigate to="/login" />}
          />

          <Route
            path="/profile"
            element={user ? <Profile user={user} onLogout={handleLogout} projects={projects} /> : <Navigate to="/login" />}
          />
          <Route path="/project/:projectId/edit" element={user ? <EditProject /> : <Navigate to="/login" />} />
          <Route path="/project/:projectId/manage" element={user ? <ManageProject /> : <Navigate to="/login" />} />
          <Route path="/profile/:userId" element={user ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="/profile/edit" element={<EditProfile user={user}  onUserUpdate={handleUserUpdate}/>} />
          <Route path="/messages" element={<Messages user={user} projects={projects} />} />
          <Route path="/messages/:projectId" element={<ProjectChat user={user} projects={projects} />} />
          {/* Semi Public */}

          <Route path="/project/:id" element={user ? <ProjectDetails projects={projects} user={user} /> : <Navigate to="/login" />} />
          <Route path="/completed-project/:id" element={user ? <CompletedProjectDetails /> : <Navigate to="/login" />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;