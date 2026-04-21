import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, RefreshCw, Plus, Sparkles,
  Code, Layers, Cpu, Globe, Database, Shield,
  Zap, ArrowRight,
  Briefcase, University, ChevronDown, Users, ExternalLink,
  Image as ImageIcon, CheckCircle2, MessageSquare, Bell, LogOut,
  User, Settings
} from 'lucide-react';

// --- 1. Open Project Card Component ---
const OpenProjectCard = ({ project, onApplyClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="group relative p-0.5 rounded-xl bg-gradient-to-r from-violet-200/40 via-fuchsia-200/40 to-pink-200/40 hover:from-violet-300/50 hover:via-fuchsia-300/50 hover:to-pink-300/50 transition-all duration-300"
  >
    <div className="h-full p-3 sm:p-4 rounded-xl bg-white/80 border border-slate-200 backdrop-blur-md flex flex-col shadow-sm shadow-violet-200/50">
      
      {/* Header with Violet Gradient Banner */}
      <div className="relative h-24 sm:h-28 rounded-lg bg-gradient-to-br from-violet-200/60 via-fuchsia-200/60 to-pink-200/60 overflow-hidden mb-3">
        <div className="absolute inset-0 opacity-40" 
             style={{backgroundImage: `radial-gradient(circle at 2px 2px, rgba(124,58,237,0.08) 1px, transparent 0)`, backgroundSize: '20px 20px'}} />
        <div className="absolute -bottom-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 bg-violet-300/40 rounded-full blur-xl" />
        
        {/* Status Badge */}
        <div className="absolute top-2 left-2 bg-emerald-100/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-800 border border-emerald-200 flex items-center gap-1 shadow-sm">
          <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
          Open
        </div>
        
        {/* Title */}
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 drop-shadow-sm line-clamp-1 truncate group-hover:text-violet-800 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <p className="text-[11px] sm:text-xs text-slate-700 mb-3 line-clamp-2 leading-relaxed flex-grow overflow-hidden">
          {project.description}
        </p>

        {/* College Badge */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-600 mb-3 p-2 rounded-lg bg-violet-50/60 border border-violet-200">
          <University size={12} className="text-violet-700 flex-shrink-0" />
          <span className="font-medium truncate max-w-[100px] sm:max-w-[120px]">{project.college}</span>
        </div>

        {/* Footer: Team + Apply */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-violet-200">
          {/* Team Avatars */}
          <div className="flex -space-x-1.5">
            {project.team?.slice(0, 2).map((member, i) => (
              <div key={i} 
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-white shadow-sm" 
                title={member.name}
              >
                {member.name?.charAt(0)?.toUpperCase()}
              </div>
            ))}
            {project.membersCount > 2 && (
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-violet-100 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-violet-800 shadow-sm">
                +{project.membersCount - 2}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <button
            onClick={() => onApplyClick(project._id)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-violet-600 
                     text-white text-[10px] sm:text-xs font-semibold hover:bg-violet-700 
                     transition-all flex items-center gap-1 shadow-sm shadow-violet-200/60 group/btn whitespace-nowrap"
          >
            <span className="hidden sm:inline">Apply</span>
            <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 2. Completed Project Card Component ---
const CompletedProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => navigate(`/completed-project/${project.id || project._id}`);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative p-0.5 rounded-xl bg-gradient-to-r from-violet-200/30 via-fuchsia-200/30 to-pink-200/30 hover:from-violet-300/40 hover:via-fuchsia-300/40 hover:to-pink-300/40 transition-all duration-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="h-full p-3 sm:p-4 rounded-xl bg-white/80 border border-slate-200 backdrop-blur-md flex flex-col shadow-sm shadow-violet-100/50">
        
        {/* Screenshot / Hero Image */}
        <div className="relative h-24 sm:h-28 rounded-lg bg-violet-50/60 overflow-hidden mb-3 border border-violet-200">
          {project.screenshots && project.screenshots.length > 0 ? (
            <img src={project.screenshots[0]} alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-fuchsia-50 text-violet-400">
              <ImageIcon size={28} className="opacity-60" />
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-100/80 via-transparent to-transparent opacity-50" />
          
          {/* Completed Badge */}
          <div className="absolute top-2 right-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200 flex items-center gap-1 shadow-sm">
            <CheckCircle2 size={10} /> <span className="hidden xs:inline">Completed</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-violet-600 text-white px-4 py-1.5 rounded-lg font-semibold text-[10px] sm:text-xs shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all whitespace-nowrap">
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 leading-tight line-clamp-1 truncate group-hover:text-violet-800 transition-colors">
            {project.title}
          </h3>
          <p className="text-[10px] sm:text-xs text-slate-700 mb-3 line-clamp-2 overflow-hidden">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.techStack?.slice(0, 3).map((tech, i) => (
              <span key={i} className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-medium rounded border shadow-sm whitespace-nowrap
                ${i % 3 === 0 ? 'bg-violet-100 text-violet-800 border-violet-200' : 
                  i % 3 === 1 ? 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200' : 
                  'bg-pink-100 text-pink-800 border-pink-200'}`}>
                {tech}
              </span>
            ))}
            {project.techStack?.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] rounded border border-slate-200">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Team */}
          <div className="mb-4">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Users size={12} className="text-violet-700" /> Built By
            </p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {project.team?.slice(0, 3).map((member, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center text-[8px] font-bold text-white shadow-sm" title={member.name}>
                    {member.name?.charAt(0)?.toUpperCase()}
                  </div>
                ))}
                {project.team?.length > 3 && (
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-violet-100 flex items-center justify-center text-[8px] font-bold text-violet-800 shadow-sm">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-600 font-medium whitespace-nowrap">
                {project.team?.length}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-bold rounded-lg transition-all shadow-sm whitespace-nowrap"
              >
                <ExternalLink size={12} /> <span className="hidden xs:inline">Live</span>
              </a>
            )}
            <button onClick={handleViewDetails}
              className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border whitespace-nowrap ${
                project.liveLink 
                  ? 'bg-white/70 border-violet-200 text-slate-700 hover:bg-violet-50 hover:border-violet-400' 
                  : 'bg-violet-600 border-transparent text-white hover:bg-violet-700 w-full'
              }`}
            >
              Details <ArrowRight size={12} />
            </button>
          </div>
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
    { name: "App Dev", icon: Code },
    { name: "Web Dev", icon: Globe },
    { name: "AI/ML", icon: Cpu },
    { name: "Blockchain", icon: Shield },
    { name: "Data Sci", icon: Database },
  ];

  // 🔍 Filtering Logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.college?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || project.type === filterType;
    const matchesCollege = !filterCollege || project.college?.toLowerCase().includes(filterCollege.toLowerCase());
    const isOpen = project.status === 'Open' || !project.status;
    const isCompleted = project.status === 'Completed';
    const matchesTab = activeTab === 'open' ? isOpen : isCompleted;
    const isOwner = project.owner === user?._id;
    return matchesSearch && matchesType && matchesCollege && matchesTab && !isOwner;
  });

  const handleReset = () => {
    setSearchTerm('');
    setFilterType('All');
    setFilterCollege('');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-x-hidden pb-16 sm:pb-20">
      
      {/* Decorative Violet Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] 
                   bg-violet-200/30 rounded-full blur-2xl sm:blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-[15%] left-[-5%] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] 
                   bg-fuchsia-200/20 rounded-full blur-2xl sm:blur-3xl"
        />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(124,58,237,0.08) 1px, transparent 0)`,
               backgroundSize: '48px 48px'
             }} 
        />
      </div>

      {/* ===== Sticky Header ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            
            {/* Greeting */}
           <div className="flex items-center gap-3 sm:gap-4">
  <div>
    <motion.h1
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="text-base sm:text-lg lg:text-xl font-bold tracking-tight"
    >
      Hello,{' '}
      <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
        {user?.name?.split(' ')[0] || 'User'}
      </span>{' '}
      👋
    </motion.h1>
    <p className="text-xs sm:text-sm text-slate-600 hidden sm:block font-medium">
      Ready to build something amazing?
    </p>
  </div>
</div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* Messages - Fixed Icon Size */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/messages')}
                className="relative p-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                title="Messages"
              >
                <MessageSquare size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
              </motion.button>

              {/* Notifications - Fixed Icon Size */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                title="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 border-2 border-white rounded-full"></span>
              </motion.button>

              {/* Create Project - Fixed Icon Size */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/create-project')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg font-semibold text-xs shadow-sm shadow-violet-600/25 hover:shadow-violet-600/40 hover:bg-violet-700 transition-all"
              >
                <Plus size={18} strokeWidth={2.5} />
                <span className="hidden lg:inline">Create</span>
              </motion.button>

              {/* 🔥 Profile Dropdown - ENHANCED FOR DESKTOP 🔥 */}
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 pr-2 rounded-lg hover:bg-violet-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                </button>
                
                {/* ✅ ENHANCED Dropdown Menu - Larger for Desktop */}
                <div className="absolute right-0 mt-2 w-56 sm:w-64 py-2 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email || 'user@college.edu'}</p>
                  </div>
                  
                  {/* Menu Items - Larger & Spacious */}
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                      <User size={16} className="text-violet-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">My Profile</p>
                      <p className="text-xs text-slate-400">View & edit your profile</p>
                    </div>
                    <ChevronDown size={14} className="text-slate-300 rotate-[-90deg]" />
                  </Link>
                  
                  <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-fuchsia-100 flex items-center justify-center">
                      <Settings size={16} className="text-fuchsia-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Settings</p>
                      <p className="text-xs text-slate-400">Account preferences</p>
                    </div>
                    <ChevronDown size={14} className="text-slate-300 rotate-[-90deg]" />
                  </Link>
                  
                  <hr className="my-2 border-slate-200" />
                  
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                      <LogOut size={16} className="text-rose-600" />
                    </div>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">

        {/* Search & Filter Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 sm:mb-6 space-y-3 sm:space-y-4"
        >
          {/* Search Bar */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/40 via-fuchsia-200/40 to-pink-200/40 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-white border border-slate-200 rounded-xl flex items-center p-2 backdrop-blur-md shadow-sm">
              <Search size={18} className="ml-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, colleges..."
                className="w-full py-2.5 px-3 bg-transparent border-none focus:outline-none text-sm text-slate-900 placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="p-2 hover:bg-violet-50 rounded-lg text-slate-500 hover:text-violet-600 transition"
                >
                  <RefreshCw size={16} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Tabs & Filters Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 items-center justify-between p-3 rounded-xl bg-white border border-slate-200 backdrop-blur-md shadow-sm"
          >
            {/* Custom Tabs */}
            <div className="flex p-0.5 bg-violet-100/60 rounded-lg w-full sm:w-auto border border-violet-200">
              {[
                { id: 'open', label: 'Open', icon: Zap, color: 'violet' },
                { id: 'completed', label: 'Done', icon: CheckCircle2, color: 'emerald' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-white text-${tab.color}-600 shadow-sm border border-${tab.color}-300`
                      : 'text-slate-600 hover:text-slate-800 hover:bg-violet-50'
                  }`}
                >
                  <tab.icon size={14} className={activeTab === tab.id ? `text-${tab.color}-600` : ''} />
                  <span className="hidden xs:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <div className="relative min-w-[120px]">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-500 cursor-pointer hover:border-violet-300"
                >
                  {projectTypes.map((type) => (
                    <option key={type.name} value={type.name} className="bg-white text-sm">{type.name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              
              <input
                type="text"
                placeholder="College"
                value={filterCollege}
                onChange={(e) => setFilterCollege(e.target.value)}
                className="w-24 sm:w-32 bg-white border border-slate-200 text-slate-700 py-2 px-3 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-500 placeholder-slate-400 hover:border-violet-300"
              />
              
              <button 
                onClick={handleReset} 
                className="p-2 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                title="Reset"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
            {activeTab === 'open' ? (
              <>
                <Sparkles className="text-violet-600" size={16} />
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Open Projects
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="text-emerald-600" size={16} />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Completed
                </span>
              </>
            )}
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              activeTab === 'open' 
                ? 'bg-violet-100 text-violet-700 border border-violet-200' 
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              {filteredProjects.length}
            </span>
          </h2>

          {/* Mobile Create Button */}
          <button
            onClick={() => navigate('/create-project')}
            className="sm:hidden flex items-center justify-center w-10 h-10 bg-violet-600 text-white rounded-lg shadow-sm shadow-violet-600/25"
          >
            <Plus size={18} />
          </button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project._id || project.id}
                  variants={itemVariants}
                  layout
                  className="h-full"
                >
                  {activeTab === 'open' ? (
                    <OpenProjectCard
                      project={project}
                      onApplyClick={goToProjectDetails}
                    />
                  ) : (
                    <CompletedProjectCard project={project} />
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-12 sm:py-16 flex flex-col items-center justify-center text-center"
              >
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-200/60 via-fuchsia-200/60 to-pink-200/60 rounded-full animate-pulse" />
                  <div className="absolute inset-2 bg-white rounded-full border border-slate-200 flex items-center justify-center backdrop-blur-md shadow-sm">
                    <Search size={40} className="text-slate-400" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">No projects found</h3>
                <p className="text-xs text-slate-600 max-w-sm mb-4 px-2">
                  Try adjusting filters or check back later.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-violet-50 hover:border-violet-300 transition-all shadow-sm"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile FAB */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create-project')}
          className="fixed bottom-4 right-4 sm:hidden w-12 h-12 bg-violet-600 text-white rounded-full shadow-lg shadow-violet-600/40 flex items-center justify-center z-40"
        >
          <Plus size={20} strokeWidth={2.5} />
        </motion.button>

      </main>
    </div>
  );
};

export default Dashboard;