import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const Search = ({ projects }) => {
  const [query, setQuery] = useState('');
  
  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.college.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Projects</h1>
      <input 
        type="text" 
        placeholder="Search by title, college, or tech..." 
        className="w-full max-w-xl mx-auto block p-4 rounded-xl border shadow-sm mb-8 focus:ring-2 focus:ring-primary outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? filtered.map(p => <ProjectCard key={p.id} project={p} />) : <p className="text-center col-span-3">No projects found.</p>}
      </div>
    </div>
  );
};

export default Search;