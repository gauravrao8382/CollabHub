import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, RefreshCw, Plus, Sparkles,
  Code, Layers, Cpu, Globe, Database, Shield,
  Terminal, Cloud, Activity, Zap, ArrowRight, ArrowUpRight,
  Briefcase, University, ChevronDown, Users, ExternalLink,
  Image as ImageIcon, CheckCircle2, MessageSquare, Bell, LogOut,
  User, Settings
} from 'lucide-react';

// --- 1. Open Project Card Component (Fixed Height + Truncation) ---
const OpenProjectCard = ({ project, onApplyClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    className="group relative p-1 rounded-2xl bg-gradient-to-r from-amber-200/40 via-orange-200/40 to-rose-200/40 hover:from-amber-300/50 hover:via-orange-300/50 hover:to-rose-300/50 transition-all duration-300"
  >
    <div className="h-full p-5 rounded-2xl bg-white/80 border-2 border-amber-200 backdrop-blur-md flex flex-col shadow-lg shadow-amber-100/50">
      
      {/* Header with Warm Gradient Banner - FIXED HEIGHT h-32 */}
      <div className="relative h-32 rounded-xl bg-gradient-to-br from-amber-200/60 via-orange-200/60 to-rose-200/60 overflow-hidden mb-4">
        <div className="absolute inset-0 opacity-40" 
             style={{backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`, backgroundSize: '20px 20px'}} />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-300/40 rounded-full blur-2xl" />
        
        {/* Status Badge - Warm */}
        <div className="absolute top-3 left-3 bg-emerald-100/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Open
        </div>
        
        {/* Title - Truncated with ellipsis */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-stone-900 drop-shadow-sm line-clamp-1 truncate group-hover:text-amber-800 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Description - Truncated to 2 lines with ellipsis */}
        <p className="text-stone-700 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow overflow-hidden">
          {project.description}
        </p>

        {/* College Badge - Warm */}
        <div className="flex items-center gap-2 text-xs text-stone-600 mb-4 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200">
          <University size={14} className="text-amber-700 flex-shrink-0" />
          <span className="font-medium truncate max-w-[120px]">{project.college}</span>
        </div>

        {/* Footer: Team + Apply */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-amber-200">
          {/* Team Avatars - Warm */}
          <div className="flex -space-x-2">
            {project.team?.slice(0, 2).map((member, i) => (
              <div key={i} 
                className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-[10px] font-bold text-white shadow-md" 
                title={member.name}
              >
                {member.name?.charAt(0)?.toUpperCase()}
              </div>
            ))}
            {project.membersCount > 2 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-800 shadow-sm">
                +{project.membersCount - 2}
              </div>
            )}
          </div>

          {/* Apply Button - Warm Gradient */}
          <button
            onClick={() => onApplyClick(project._id)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                     text-white text-xs font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                     transition-all duration-300 flex items-center gap-2 shadow-md shadow-amber-200/60 
                     hover:shadow-amber-300/70 group/btn whitespace-nowrap"
          >
            Apply <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 2. Completed Project Card Component (Fixed Height + Truncation) ---
const CompletedProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const handleViewDetails = () => navigate(`/completed-project/${project.id || project._id}`);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="group relative p-1 rounded-2xl bg-gradient-to-r from-amber-200/30 via-orange-200/30 to-rose-200/30 hover:from-amber-300/40 hover:via-orange-300/40 hover:to-rose-300/40 transition-all duration-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="h-full p-5 rounded-2xl bg-white/80 border-2 border-amber-200 backdrop-blur-md flex flex-col shadow-lg shadow-amber-100/50">
        
        {/* Screenshot / Hero Image - FIXED HEIGHT h-32 (same as OpenProjectCard) */}
        <div className="relative h-32 rounded-xl bg-amber-50/60 overflow-hidden mb-4 border border-amber-200">
          {project.screenshots && project.screenshots.length > 0 ? (
            <img src={project.screenshots[0]} alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 text-amber-400">
              <ImageIcon size={32} className="opacity-60" />
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-100/80 via-transparent to-transparent opacity-50" />
          
          {/* Completed Badge - Warm */}
          <div className="absolute top-3 right-3 bg-emerald-100/80 backdrop-blur-sm text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 size={12} /> Completed
          </div>

          {/* Screenshot Count */}
          {project.screenshots && project.screenshots.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-stone-700 text-[10px] px-2 py-1 rounded-lg flex items-center gap-1 border border-amber-200 shadow-sm">
              <ImageIcon size={10} /> {project.screenshots.length}
            </div>
          )}

          {/* Hover Overlay - Warm */}
          <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all whitespace-nowrap">
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          {/* Title - Truncated */}
          <h3 className="text-lg font-bold text-stone-900 mb-2 leading-tight line-clamp-1 truncate group-hover:text-amber-800 transition-colors">
            {project.title}
          </h3>
          {/* Description - Truncated to 2 lines */}
          <p className="text-stone-700 text-xs mb-4 line-clamp-2 overflow-hidden">{project.description}</p>

          {/* Tech Stack - Warm Tags (Truncated to 3 + "..." for more) */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack?.slice(0, 3).map((tech, i) => (
              <span key={i} className={`px-2.5 py-1 text-[10px] font-medium rounded-lg border shadow-sm whitespace-nowrap
                ${i % 3 === 0 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                  i % 3 === 1 ? 'bg-orange-100 text-orange-800 border-orange-200' : 
                  'bg-rose-100 text-rose-800 border-rose-200'}`}>
                {tech}
              </span>
            ))}
            {project.techStack?.length > 3 && (
              <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-[10px] rounded-lg border border-stone-200">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Team - Warm */}
          <div className="mb-5">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Users size={10} className="text-amber-700" /> Built By
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {project.team?.slice(0, 3).map((member, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white shadow-md" title={member.name}>
                    {member.name?.charAt(0)?.toUpperCase()}
                  </div>
                ))}
                {project.team?.length > 3 && (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-800 shadow-sm">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
              <span className="text-xs text-stone-600 font-medium whitespace-nowrap">
                {project.team?.length} Members
              </span>
            </div>
          </div>

          {/* Action Buttons - Warm */}
          <div className="mt-auto grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-200/60 hover:shadow-amber-300/70 whitespace-nowrap"
              >
                <ExternalLink size={14} /> Live
              </a>
            )}
            <button onClick={handleViewDetails}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                project.liveLink 
                  ? 'bg-white/70 border-amber-200 text-stone-700 hover:bg-amber-50 hover:border-amber-400' 
                  : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 border-transparent text-white hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 w-full'
              }`}
            >
              Details <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Dashboard Component (Warm Light Theme) ---
const Dashboard = ({ user, projects, setProjects }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCollege, setFilterCollege] = useState('');
  const [activeTab, setActiveTab] = useState('open');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 
                    text-stone-900 relative overflow-x-hidden pb-20">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] 
                   bg-gradient-to-r from-amber-300/40 via-orange-300/30 to-rose-300/40 
                   rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] 
                   bg-gradient-to-r from-orange-300/40 via-rose-300/30 to-red-300/30 
                   rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] 
                   bg-gradient-to-r from-amber-300/30 via-orange-300/20 to-yellow-300/30 
                   rounded-full blur-3xl"
        />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`,
               backgroundSize: '64px 64px'
             }} 
        />
      </div>

      {/* ===== Sticky Header - Warm Theme ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo + Greeting - Warm */}
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 text-stone-600 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Layers size={22} />
              </button>
              
              <div className="hidden lg:block">
                <motion.h1
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-xl lg:text-2xl font-extrabold tracking-tight"
                >
                  Hello,{' '}
                  <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                    {user?.name || 'User'}
                  </span>{' '}
                  👋
                </motion.h1>
                <p className="text-xs text-stone-600 font-medium">Ready to build something amazing?</p>
              </div>
              <div className="lg:hidden">
                <h1 className="text-lg font-bold text-stone-900">Hi, {user?.name?.split(' ')[0] || 'User'}!</h1>
              </div>
            </div>

            {/* Header Right Actions - Warm */}
            <div className="flex items-center gap-2">
              
              {/* Messages - Warm Hover */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/messages')}
                className="relative p-2.5 text-stone-600 hover:text-amber-700 hover:bg-amber-100 rounded-xl transition-all"
                title="Messages"
              >
                <MessageSquare size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
              </motion.button>

              {/* Notifications - Warm Hover */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 text-stone-600 hover:text-amber-700 hover:bg-amber-100 rounded-xl transition-all"
                title="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-500 border-2 border-white rounded-full"></span>
              </motion.button>

              {/* Create Project - Desktop - Warm Gradient */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/create-project')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-xl font-semibold shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70 transition-all"
              >
                <Plus size={18} strokeWidth={2.5} />
                <span className="hidden lg:inline">Create Project</span>
              </motion.button>

              {/* Profile Dropdown - Warm */}
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 pr-3 rounded-xl hover:bg-amber-100 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-amber-200">
                      <span className="text-sm font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown size={16} className="text-stone-500 group-hover:text-stone-700 transition-colors hidden sm:block" />
                </button>
                
                {/* Dropdown Menu - Warm */}
                <div className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-white/90 border-2 border-amber-200 backdrop-blur-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-800 transition-colors">
                    <User size={16} /> Profile
                  </Link>
                  <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-amber-50 hover:text-amber-800 transition-colors">
                    <Settings size={16} /> Settings
                  </Link>
                  <hr className="my-2 border-amber-200" />
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-700 hover:bg-rose-50 transition-colors">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Main Content - Warm Theme ===== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* Search & Filter Section - Warm */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 space-y-4 lg:space-y-6"
        >
          {/* Search Bar - Warm Glow */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/40 via-orange-200/40 to-rose-200/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-white/70 border-2 border-amber-200 rounded-2xl flex items-center p-2 backdrop-blur-md shadow-sm">
              <Search size={20} className="ml-3 text-stone-400" />
              <input
                type="text"
                placeholder="Search projects, colleges, or tech..."
                className="w-full py-3 px-4 bg-transparent border-none focus:outline-none text-stone-900 placeholder-stone-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="p-2 hover:bg-amber-100 rounded-lg text-stone-500 hover:text-rose-600 transition"
                >
                  <RefreshCw size={18} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Tabs & Filters Row - Warm */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col lg:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-white/70 border-2 border-amber-200 backdrop-blur-md shadow-sm"
          >
            {/* Custom Tabs - Warm Colors */}
            <div className="flex p-1 bg-amber-100/60 rounded-xl w-full lg:w-auto border border-amber-200">
              {[
                { id: 'open', label: 'Open Projects', icon: Zap, color: 'amber' },
                { id: 'completed', label: 'Completed', icon: CheckCircle2, color: 'emerald' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-white text-${tab.color}-700 shadow-sm border border-${tab.color}-300`
                      : 'text-stone-600 hover:text-stone-800 hover:bg-amber-50'
                  }`}
                >
                  <tab.icon size={16} className={activeTab === tab.id ? `text-${tab.color}-700` : ''} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filters - Warm */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
              <div className="relative min-w-[150px]">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full appearance-none bg-white/70 border-2 border-amber-200 text-stone-700 py-2.5 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 cursor-pointer hover:border-amber-400"
                >
                  {projectTypes.map((type) => (
                    <option key={type.name} value={type.name} className="bg-white">{type.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
              
              <input
                type="text"
                placeholder="Filter College"
                value={filterCollege}
                onChange={(e) => setFilterCollege(e.target.value)}
                className="w-full lg:w-40 bg-white/70 border-2 border-amber-200 text-stone-700 py-2.5 px-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 placeholder-stone-400 hover:border-amber-400"
              />
              
              <button 
                onClick={handleReset} 
                className="p-2.5 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Reset filters"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Section Header - Warm */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <h2 className="text-xl lg:text-2xl font-bold flex items-center gap-2.5">
            {activeTab === 'open' ? (
              <>
                <Sparkles className="text-amber-600" size={20} />
                <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  Trending Open Projects
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="text-emerald-600" size={20} />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Completed Showcase
                </span>
              </>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              activeTab === 'open' 
                ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              {filteredProjects.length}
            </span>
          </h2>

          {/* Mobile Create Button - Warm */}
          <button
            onClick={() => navigate('/create-project')}
            className="sm:hidden flex items-center justify-center w-11 h-11 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-xl shadow-lg shadow-amber-200/60"
          >
            <Plus size={20} />
          </button>
        </motion.div>

        {/* Projects Grid - Warm - Added items-stretch for equal heights */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 items-stretch"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
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
                className="col-span-full py-16 lg:py-24 flex flex-col items-center justify-center text-center"
              >
                <div className="relative w-40 h-40 lg:w-48 lg:h-48 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/60 via-orange-200/60 to-rose-200/60 rounded-full animate-pulse" />
                  <div className="absolute inset-2 bg-white/70 rounded-full border-2 border-amber-200 flex items-center justify-center backdrop-blur-md shadow-sm">
                    <Search size={56} className="text-stone-400" />
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-stone-900 mb-2">No projects found</h3>
                <p className="text-stone-600 max-w-md mb-8 px-4">
                  Try adjusting your filters or check back later for more {activeTab} projects.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-white/70 border-2 border-amber-200 text-stone-700 font-semibold rounded-xl hover:bg-amber-50 hover:border-amber-400 transition-all shadow-sm"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile FAB for Create Project - Warm */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create-project')}
          className="fixed bottom-6 right-6 sm:hidden w-14 h-14 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-full shadow-2xl shadow-amber-300/60 flex items-center justify-center z-40"
        >
          <Plus size={24} strokeWidth={2.5} />
        </motion.button>

      </main>
    </div>
  );
};

export default Dashboard;