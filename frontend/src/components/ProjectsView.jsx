import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Filter, Globe, Code, Cpu, Search, Building2, Tag, X, ArrowRight, CheckCircle, Clock, UserCheck } from 'lucide-react';

const ProjectsView = ({ user, projects, searchTerm }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusView, setStatusView] = useState('open');

  const categories = ['All', 'Web Dev', 'App Dev', 'AI/ML', 'DevOps', 'Blockchain'];

  // 🔍 Filter: Exclude user's own created projects
  const availableProjects = useMemo(() => {
    const userIdStr = user?._id?.toString();
    if (!userIdStr) return projects;
    
    return projects.filter(p => {
      const ownerId = p.owner?._id?.toString() || p.owner?.toString();
      return ownerId !== userIdStr;
    });
  }, [projects, user]);

  // 🔍 Check application status helper
  const getApplicationStatus = (project) => {
    const userIdStr = user?._id?.toString();
    if (!userIdStr) return null;
    
    // Check if team member
    const isTeamMember = project.teamMembers?.some(m => 
      String(m.userId || m._id) === userIdStr
    );
    if (isTeamMember) return 'team';
    
    // Check if applied
    const applicant = project.applicants?.find(a => 
      String(a.userId || a._id) === userIdStr
    );
    if (applicant) return applicant.status || 'pending';
    
    return null; // Not applied yet
  };

  // 🔍 Search & Filter Logic
  const filterProjects = (projectList) => {
    return projectList.filter(p => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesSearch = 
          p.title?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.college?.toLowerCase().includes(term) ||
          p.techStack?.some(t => t.toLowerCase().includes(term));
        if (!matchesSearch) return false;
      }
      if (collegeFilter && !p.college?.toLowerCase().includes(collegeFilter.toLowerCase())) return false;
      if (nameFilter && !p.title?.toLowerCase().includes(nameFilter.toLowerCase())) return false;
      
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
        const matchesCategory = keywords.some(k => techLower.includes(k) || titleLower.includes(k));
        if (!matchesCategory) return false;
      }
      return true;
    });
  };

  const filteredByStatus = useMemo(() => {
    const baseFiltered = filterProjects(availableProjects);
    if (statusView === 'open') return baseFiltered.filter(p => p.status === 'Open');
    if (statusView === 'completed') return baseFiltered.filter(p => p.status === 'Completed');
    return baseFiltered;
  }, [availableProjects, statusView, searchTerm, collegeFilter, nameFilter, categoryFilter]);

  const openProjects = filteredByStatus.filter(p => p.status === 'Open');
  const completedProjects = filteredByStatus.filter(p => p.status === 'Completed');

  const clearFilters = () => {
    setCollegeFilter(''); setNameFilter(''); setCategoryFilter(''); setActiveFilter('All');
  };

  const hasActiveFilters = collegeFilter || nameFilter || categoryFilter || searchTerm;

  // 🎴 Project Card with Apply Button
  const ProjectCard = ({ proj }) => {
    const appStatus = getApplicationStatus(proj);
    const isHiringClosed = proj.status !== 'Open';
    
    const handleCardClick = () => {
      navigate(`/project/${proj._id}`);
    };
    
    const handleApplyClick = (e) => {
      e.stopPropagation(); // Prevent card navigation
      navigate(`/project/${proj._id}`);
    };

    const getActionButton = () => {
      if (isHiringClosed) {
        return (
          <span className="px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-not-allowed">
            <Clock size={12} /> Closed
          </span>
        );
      }
      
      switch (appStatus) {
        case 'team':
          return (
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-emerald-200">
              <UserCheck size={12} /> In Team
            </span>
          );
        case 'pending':
          return (
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-amber-200">
              <Clock size={12} /> Pending
            </span>
          );
        case 'accepted':
          return (
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-emerald-200">
              <CheckCircle size={12} /> Accepted
            </span>
          );
        case 'rejected':
          return (
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-red-200">
              Not Selected
            </span>
          );
        default:
          return (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApplyClick}
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 hover:from-violet-700 hover:to-fuchsia-700 transition-all shadow-sm"
            >
              Apply Now <ArrowRight size={12} />
            </motion.button>
          );
      }
    };

    return (
      <motion.div
        whileHover={{ y: -4 }}
        onClick={handleCardClick}
        className="group p-5 min-h-[240px] flex flex-col justify-between rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-violet-300 transition-all duration-300 cursor-pointer"
      >
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-800 line-clamp-2 group-hover:text-violet-700 transition-colors">
              {proj.title}
            </h3>
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
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Code size={12} /> {proj.teamSize || proj.applicants?.length || 0} slots
            </span>
            {getActionButton()}
          </div>
        </div>
      </motion.div>
    );
  };

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
      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Explore Projects</h1>
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200/60">
          <span className={`text-xs font-medium transition-colors ${statusView === 'open' ? 'text-violet-600' : 'text-slate-400'}`}>Open</span>
          <button
            onClick={() => setStatusView(prev => prev === 'open' ? 'completed' : 'open')}
            className="relative w-12 h-6 rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          >
            <motion.div
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center"
              animate={{ x: statusView === 'open' ? 0 : 24 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {statusView === 'open' ? <Globe size={12} className="text-violet-500" /> : <Cpu size={12} className="text-emerald-500" />}
            </motion.div>
          </button>
          <span className={`text-xs font-medium transition-colors ${statusView === 'completed' ? 'text-emerald-600' : 'text-slate-400'}`}>Completed</span>
        </div>
      </div>
      
      {/* Filters */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setCategoryFilter(cat === 'All' ? '' : cat); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
                activeFilter === cat
                  ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-violet-50 hover:border-violet-200'
              }`}
            >
              {cat}
              <span className={`ml-2 px-2 py-0.5 text-[10px] rounded-full ${activeFilter === cat ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
                {cat === 'All' ? availableProjects.length : filterProjects(availableProjects).filter(p => {
                  if (cat === 'All') return true;
                  const techLower = p.techStack?.map(t => t.toLowerCase()) || [];
                  const titleLower = p.title?.toLowerCase() || '';
                  const keywords = {
                    'Web Dev': ['react', 'node', 'next', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript'],
                    'App Dev': ['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios', 'mobile'],
                    'AI/ML': ['python', 'tensorflow', 'pytorch', 'ai', 'ml', 'machine learning', 'deep learning'],
                    'DevOps': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins'],
                    'Blockchain': ['solidity', 'ethereum', 'web3', 'blockchain', 'crypto']
                  }[cat] || [];
                  return keywords.some(k => techLower.includes(k) || titleLower.includes(k));
                }).length}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by name..." value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300" />
          </div>
          <div className="relative">
            <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Filter by college..." value={collegeFilter} onChange={(e) => setCollegeFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300" />
          </div>
          <div className="relative">
            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setActiveFilter(e.target.value || 'All'); }}
              className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-300 appearance-none">
              <option value="">All Categories</option>
              {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">Active filters:</span>
            {nameFilter && <span className="px-2 py-1 text-xs bg-violet-100 text-violet-700 rounded-md flex items-center gap-1">Name: {nameFilter}<button onClick={() => setNameFilter('')}><X size={10} /></button></span>}
            {collegeFilter && <span className="px-2 py-1 text-xs bg-fuchsia-100 text-fuchsia-700 rounded-md flex items-center gap-1">College: {collegeFilter}<button onClick={() => setCollegeFilter('')}><X size={10} /></button></span>}
            {categoryFilter && <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-md flex items-center gap-1">Category: {categoryFilter}<button onClick={() => { setCategoryFilter(''); setActiveFilter('All'); }}><X size={10} /></button></span>}
            <button onClick={clearFilters} className="text-xs text-slate-400 hover:text-slate-600 underline ml-auto">Clear all</button>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {statusView === 'all' ? (
          <motion.div key="both" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            {openProjects.length > 0 && (
              <div>
                <SectionHeader title="Open for Collaboration" count={openProjects.length} icon={Globe} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                  {openProjects.map(proj => <ProjectCard key={proj._id} proj={proj} />)}
                </div>
              </div>
            )}
            {completedProjects.length > 0 && (
              <div>
                <SectionHeader title="Completed Projects" count={completedProjects.length} icon={Cpu} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                  {completedProjects.map(proj => <ProjectCard key={proj._id} proj={proj} />)}
                </div>
              </div>
            )}
            {openProjects.length === 0 && completedProjects.length === 0 && <EmptyState message="No projects match your filters." />}
          </motion.div>
        ) : statusView === 'open' ? (
          <motion.div key="open" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <SectionHeader title="Open for Collaboration" count={openProjects.length} icon={Globe} />
            {openProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                {openProjects.map(proj => <ProjectCard key={proj._id} proj={proj} />)}
              </div>
            ) : <EmptyState message="No open projects match your filters." />}
          </motion.div>
        ) : (
          <motion.div key="completed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <SectionHeader title="Completed Projects" count={completedProjects.length} icon={Cpu} />
            {completedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
                {completedProjects.map(proj => <ProjectCard key={proj._id} proj={proj} />)}
              </div>
            ) : <EmptyState message="No completed projects found." />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EmptyState = ({ message }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-12 text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200">
    <Filter size={40} className="mb-3 opacity-30" />
    <p className="text-sm font-medium text-slate-500">{message}</p>
  </motion.div>
);

export default ProjectsView;