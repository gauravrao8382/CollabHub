import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProject = ({ onAddProject }) => {
  const [formData, setFormData] = useState({ title: '', description: '', techStack: '', teamSize: '', college: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim()),
      teamSize: Number(formData.teamSize),
      owner: "Current User",
      applicants: 0
    };
    onAddProject(newProject);
    navigate('/projects');
  };

  return (
    <div className="pt-24 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Project</h1>
      <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl space-y-4">
        <input className="w-full p-3 border rounded-lg" placeholder="Project Title" required onChange={e => setFormData({...formData, title: e.target.value})} />
        <textarea className="w-full p-3 border rounded-lg" placeholder="Description" required onChange={e => setFormData({...formData, description: e.target.value})} />
        <input className="w-full p-3 border rounded-lg" placeholder="Tech Stack (comma separated)" required onChange={e => setFormData({...formData, techStack: e.target.value})} />
        <input className="w-full p-3 border rounded-lg" type="number" placeholder="Team Size Needed" required onChange={e => setFormData({...formData, teamSize: e.target.value})} />
        <input className="w-full p-3 border rounded-lg" placeholder="Your College" required onChange={e => setFormData({...formData, college: e.target.value})} />
        <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold">Post Project</button>
      </form>
    </div>
  );
};

export default CreateProject;