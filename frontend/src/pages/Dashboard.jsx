import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, RefreshCw, Plus, Sparkles, 
  Code, Layers, Cpu, Globe, Database, Shield, 
  Terminal, Cloud, Activity, Zap, ArrowRight, ArrowUpRight,
  Briefcase, University, ChevronDown, Users, ExternalLink, 
  Image as ImageIcon, CheckCircle2, MessageSquare
} from 'lucide-react';

// --- 1. Open Project Card Component ---
const OpenProjectCard = ({ project, onApplyClick }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full relative"
  >
    <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30 flex items-center gap-1">
        <Activity size={12} /> Open
      </div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold drop-shadow-md line-clamp-1">{project.title}</h3>
      </div>
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{project.description}</p>
      
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
        <University size={14} className="text-indigo-500" />
        <span className="font-medium truncate">{project.college}</span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div className="flex -space-x-2">
          {project.team?.slice(0, 2).map((member, i) => (
            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700" title={member.name}>
              {member.name.charAt(0)}
            </div>
          ))}
          {project.membersCount > 2 && (
            <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
              +{project.membersCount - 2}
            </div>
          )}
        </div>
        
        <button 
          onClick={() => onApplyClick(project._id)}
          className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-md cursor-pointer"
        >
          Apply <ArrowRight size={12} />
        </button>
      </div>
    </div>
  </motion.div>
);

// --- 2. Completed Project Card Component ---
const CompletedProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/completed-project/${project.id || project._id}`);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full group cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Screenshot / Hero Image Area */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {project.screenshots && project.screenshots.length > 0 ? (
          <img 
            src={project.screenshots[0]} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600">
            <ImageIcon size={48} />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
          <CheckCircle2 size={12} /> Completed
        </div>
        
        {project.screenshots && project.screenshots.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
            <ImageIcon size={10} /> {project.screenshots.length} Shots
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
             View Full Details
           </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{project.title}</h3>
        </div>
        
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{project.description}</p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack?.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded border border-gray-200">
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-400 text-[10px] rounded">+{project.techStack.length - 3}</span>
          )}
        </div>

        {/* Team Members */}
        <div className="mb-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Users size={10} /> Built By
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {project.team?.slice(0, 3).map((member, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700" title={member.name}>
                  {member.name.charAt(0)}
                </div>
              ))}
              {project.team?.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                  +{project.team.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {project.team?.length} Members
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm hover:shadow-indigo-500/30"
          >
            <ExternalLink size={14} /> Live Demo
          </a>
          <button 
            onClick={handleViewDetails}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg transition-colors"
          >
            Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Dashboard Component ---
const Dashboard = ({ user, projects, setProjects }) => {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCollege, setFilterCollege] = useState('');
  const [activeTab, setActiveTab] = useState('open');

  const goToProjectDetails = (id) => {
    navigate(`/project/${id}`);
  };

  const projectTypes = [
    { name: "All", icon: Layers },
    { name: "App Development", icon: Code },
    { name: "Web Development", icon: Globe },
    { name: "AI/ML", icon: Cpu },
    { name: "Blockchain", icon: Shield },
    { name: "Data Science", icon: Database },
  ];

  // 🔍 Filtering Logic with Owner Exclusion
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.college?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || project.type === filterType;
    const matchesCollege = !filterCollege || project.college?.toLowerCase().includes(filterCollege.toLowerCase());
    
    const isOpen = project.status === 'Open' || !project.status;
    const isCompleted = project.status === 'Completed';
    const matchesTab = activeTab === 'open' ? isOpen : isCompleted;

    // 🚫 Exclude projects where current user is the owner
    const isOwner = project.owner === user?._id ;
                  
    return matchesSearch && matchesType && matchesCollege && matchesTab && !isOwner;
  });

  const handleReset = () => {
    setSearchTerm('');
    setFilterType('All');
    setFilterCollege('');
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden pb-20">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-200/30 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* --- Header --- */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <motion.h1 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-2xl font-extrabold text-gray-800 tracking-tight"
                >
                  Hello, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{user?.name || 'User'}</span> 👋
                </motion.h1>
                <p className="text-xs text-gray-500 font-medium">Ready to build something amazing?</p>
              </div>
              <div className="md:hidden">
                 <h1 className="text-xl font-bold text-gray-800">Hi, {user?.name?.split(' ')[0]}!</h1>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              
              {/* 📨 Messages Button - NEW */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/messages')}
                className="relative p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                title="Messages"
              >
                <MessageSquare size={22} />
                {/* Unread badge - optional */}
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
              </motion.button>

              {/* Create Project Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/create-project')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
              >
                <Plus size={18} strokeWidth={3} />
                <span>Create Project</span>
              </motion.button>
              
              {/* Profile Link */}
              <Link to="/profile" className="relative group">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 p-0.5 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    <span className="text-lg font-bold text-indigo-600">{user?.name?.charAt(0) || 'U'}</span>
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search & Filter Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center p-2">
              <div className="pl-4 pr-3 text-gray-400">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="Search projects, colleges, or tech..."
                className="w-full py-3 px-2 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition">
                  <RefreshCw size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Tabs & Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/60 shadow-sm">
            
            {/* Custom Tabs */}
            <div className="flex p-1 bg-gray-100/80 rounded-xl w-full lg:w-auto">
              <button
                onClick={() => setActiveTab('open')}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeTab === 'open' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Zap size={16} className={activeTab === 'open' ? 'fill-current' : ''} />
                Open Projects
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeTab === 'completed' 
                    ? 'bg-white text-emerald-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <CheckCircle2 size={16} className={activeTab === 'completed' ? 'fill-current' : ''} />
                Completed Showcase
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar">
              <div className="relative min-w-[160px]">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                >
                  {projectTypes.map((type) => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              <input
                type="text"
                placeholder="Filter College"
                value={filterCollege}
                onChange={(e) => setFilterCollege(e.target.value)}
                className="w-full lg:w-40 bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
              <button onClick={handleReset} className="p-2.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            {activeTab === 'open' ? (
              <>
                <Sparkles className="text-yellow-500" size={20} />
                Trending Open Projects
              </>
            ) : (
              <>
                <CheckCircle2 className="text-emerald-500" size={20} />
                Completed Showcase
              </>
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              activeTab === 'open' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {filteredProjects.length}
            </span>
          </h2>
          
          <button 
            onClick={() => navigate('/create-project')}
            className="sm:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id || project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {activeTab === 'open' ? (
                    <OpenProjectCard 
                      project={project} 
                      onApplyClick={goToProjectDetails} 
                    />
                  ) : (
                    <CompletedProjectCard 
                      project={project} 
                    />
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 flex flex-col items-center justify-center text-center"
              >
                <div className="w-48 h-48 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping"></div>
                  <Search size={64} className="text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects found</h3>
                <p className="text-gray-500 max-w-md mb-8">
                  Try adjusting your filters or check back later for more {activeTab} projects.
                </p>
                <button 
                  onClick={handleReset}
                  className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;