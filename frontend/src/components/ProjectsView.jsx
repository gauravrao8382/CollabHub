import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Globe, Code, Cpu, Search, Building2, Tag, X, ToggleLeft, ToggleRight } from 'lucide-react';

const ProjectsView = ({ user, projects, searchTerm }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  // 🔀 New: Toggle between 'open', 'completed', or 'all'
  const [statusView, setStatusView] = useState('open');

  const categories = ['All', 'Web Dev', 'App Dev', 'AI/ML', 'DevOps', 'Blockchain'];

  // 🔍 Filter: Exclude user's own created projects (Robust check)
  const availableProjects = useMemo(() => {
    const userIdStr = user?._id?.toString();
    if (!userIdStr) return projects;
    
    return projects.filter(p => {
      const ownerId = p.owner?._id?.toString() || p.owner?.toString();
      return ownerId !== userIdStr;
    });
  }, [projects, user]);

  // 🔍 Search & Filter Logic
  const filterProjects = (projectList) => {
    return projectList.filter(p => {
      // Search bar filter (global)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
          p.title?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.college?.toLowerCase().includes(term) ||
          p.techStack?.some(t => t.toLowerCase().includes(term));
        if (!matchesSearch) return false;
      }

      // College filter
      if (collegeFilter && !p.college?.toLowerCase().includes(collegeFilter.toLowerCase())) {
        return false;
      }

      // Name/Title filter
      if (nameFilter && !p.title?.toLowerCase().includes(nameFilter.toLowerCase())) {
        return false;
      }

      // Category filter (based on techStack or title keywords)
      if (categoryFilter && categoryFilter !== 'All') {
        const techLower = p.techStack?.map(t => t.toLowerCase()) || [];
        const titleLower = p.title?.toLowerCase() || '';
        
        const categoryMap = {
          'Web Dev': ['react', 'node', 'next', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript'],
          'App Dev': ['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios', 'mobile'],
          'AI/ML': ['python', 'tensorflow', 'pytorch', 'ai', 'ml', 'machine learning', 'deep learning'],
          'DevOps': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins'],
          'Blockchain': ['solidity', 'ethereum', 'web3', 'blockchain', 'crypto']
        };
        
        const keywords = categoryMap[categoryFilter] || [];
        const matchesCategory = keywords.some(k => 
          techLower.includes(k) || titleLower.includes(k)
        );
        if (!matchesCategory) return false;
      }

      return true;
    });
  };

  // 🔀 Status-based filtering based on toggle
  const filteredByStatus = useMemo(() => {
    const baseFiltered = filterProjects(availableProjects);
    
    if (statusView === 'open') {
      return baseFiltered.filter(p => p.status === 'Open');
    } else if (statusView === 'completed') {
      return baseFiltered.filter(p => p.status === 'Completed');
    }
    return baseFiltered; // 'all' - show both
  }, [availableProjects, statusView, searchTerm, collegeFilter, nameFilter, categoryFilter]);

  const openProjects = filteredByStatus.filter(p => p.status === 'Open');
  const completedProjects = filteredByStatus.filter(p => p.status === 'Completed');

  const clearFilters = () => {
    setCollegeFilter('');
    setNameFilter('');
    setCategoryFilter('');
    setActiveFilter('All');
  };

  const hasActiveFilters = collegeFilter || nameFilter || categoryFilter || searchTerm;

  const ProjectCard = ({ proj }) => (
    <motion.div
      whileHover={{ y: -4 }}
      className="group p-5 min-h-[220px] flex flex-col justify-between rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-violet-300 transition-all duration-300"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-800 line-clamp-2">{proj.title}</h3>
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full shrink-0 border ${
            proj.status === 'Open' 
              ? 'bg-violet-100 text-violet-700 border-violet-200' 
              : 'bg-emerald-100 text-emerald-700 border-emerald-200'
          }`}>
            {proj.status}
          </span>
        </div>
        
        <p className="text-sm text-slate-500 mt-2 line-clamp-2">{proj.description}</p>
        
        {proj.college && (
          <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
            <Building2 size={12} />
            <span>{proj.college}</span>
          </div>
        )}

        {proj.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {proj.techStack.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {[1, 2].map(j => (
            <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-fuchsia-400" />
          ))}
        </div>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Code size={12} /> {proj.teamSize || proj.applicants?.length || 0} slots
        </span>
      </div>
    </motion.div>
  );

  const SectionHeader = ({ title, count, icon: Icon }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-violet-500" />
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      </div>
      <span className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
        {count} projects
      </span>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header with Toggle Switch */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Explore Projects</h1>
        
        {/* 🔀 Status Toggle Switch - Right Side */}
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200/60">
          <span className={`text-xs font-medium transition-colors ${statusView === 'open' ? 'text-violet-600' : 'text-slate-400'}`}>
            Open
          </span>
          <button
            onClick={() => setStatusView(prev => prev === 'open' ? 'completed' : 'open')}
            className="relative w-12 h-6 rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            aria-label="Toggle project status view"
          >
            <motion.div
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center"
              animate={{ x: statusView === 'open' ? 0 : 24 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {statusView === 'open' ? (
                <Globe size={12} className="text-violet-500" />
              ) : (
                <Cpu size={12} className="text-emerald-500" />
              )}
            </motion.div>
          </button>
          <span className={`text-xs font-medium transition-colors ${statusView === 'completed' ? 'text-emerald-600' : 'text-slate-400'}`}>
            Completed
          </span>
        </div>
      </div>
      
      {/* Search & Filters */}
      <div className="space-y-3">
        {/* Quick Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setCategoryFilter(cat === 'All' ? '' : cat);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
                activeFilter === cat
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-violet-50 hover:border-violet-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Name Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300"
            />
          </div>

          {/* College Filter */}
          <div className="relative">
            <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by college..."
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setActiveFilter(e.target.value || 'All');
              }}
              className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 appearance-none"
            >
              <option value="">All Categories</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters & Clear */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">Active filters:</span>
            {nameFilter && (
              <span className="px-2 py-1 text-xs bg-violet-100 text-violet-700 rounded-md flex items-center gap-1">
                Name: {nameFilter}
                <button onClick={() => setNameFilter('')}><X size={10} /></button>
              </span>
            )}
            {collegeFilter && (
              <span className="px-2 py-1 text-xs bg-fuchsia-100 text-fuchsia-700 rounded-md flex items-center gap-1">
                College: {collegeFilter}
                <button onClick={() => setCollegeFilter('')}><X size={10} /></button>
              </span>
            )}
            {categoryFilter && (
              <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-md flex items-center gap-1">
                Category: {categoryFilter}
                <button onClick={() => { setCategoryFilter(''); setActiveFilter('All'); }}><X size={10} /></button>
              </span>
            )}
            <button 
              onClick={clearFilters}
              className="text-xs text-slate-400 hover:text-slate-600 underline ml-auto"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* 🔄 Dynamic Section Rendering based on toggle */}
      <AnimatePresence mode="wait">
        {statusView === 'all' ? (
          // Show both sections
          <motion.div key="both" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            {/* Open Projects */}
            {openProjects.length > 0 && (
              <div>
                <SectionHeader title="Open for Collaboration" count={openProjects.length} icon={Globe} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                  {openProjects.map(proj => (
                    <ProjectCard key={proj._id} proj={proj} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Completed Projects */}
            {completedProjects.length > 0 && (
              <div>
                <SectionHeader title="Completed Projects" count={completedProjects.length} icon={Cpu} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                  {completedProjects.map(proj => (
                    <ProjectCard key={proj._id} proj={proj} />
                  ))}
                </div>
              </div>
            )}
            
            {openProjects.length === 0 && completedProjects.length === 0 && (
              <EmptyState message="No projects match your filters." />
            )}
          </motion.div>
        ) : statusView === 'open' ? (
          // Show only Open
          <motion.div key="open" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <SectionHeader title="Open for Collaboration" count={openProjects.length} icon={Globe} />
            {openProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                {openProjects.map(proj => (
                  <ProjectCard key={proj._id} proj={proj} />
                ))}
              </div>
            ) : (
              <EmptyState message="No open projects match your filters." />
            )}
          </motion.div>
        ) : (
          // Show only Completed
          <motion.div key="completed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <SectionHeader title="Completed Projects" count={completedProjects.length} icon={Cpu} />
            {completedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                {completedProjects.map(proj => (
                  <ProjectCard key={proj._id} proj={proj} />
                ))}
              </div>
            ) : (
              <EmptyState message="No completed projects found." />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Reusable Empty State Component
const EmptyState = ({ message }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-12 text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200"
  >
    <Filter size={40} className="mb-3 opacity-30" />
    <p className="text-sm font-medium text-slate-500">{message}</p>
  </motion.div>
);

export default ProjectsView;