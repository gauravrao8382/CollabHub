import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, RefreshCw, Plus, Sparkles,
  Code, Layers, Cpu, Globe, Database, Shield,
  Terminal, Cloud, Activity, Zap, ArrowRight, ArrowUpRight,
  Briefcase, University, ChevronDown, Users, ExternalLink,
  Image as ImageIcon, CheckCircle2, MessageSquare, Bell, LogOut
} from 'lucide-react';

// --- 1. Open Project Card Component (Warm Dark Theme) ---
const OpenProjectCard = ({ project, onApplyClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -6, transition: { duration: 0.2 } }}
    className="group relative p-1 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 hover:from-amber-500/40 hover:via-orange-500/40 hover:to-rose-500/40 transition-all duration-300"
  >
    <div className="h-full p-5 rounded-2xl bg-stone-800/40 border border-stone-700/50 backdrop-blur-xl flex flex-col">
      
      {/* Header with Warm Gradient Banner */}
      <div className="relative h-28 rounded-xl bg-gradient-to-br from-amber-600/30 via-orange-600/30 to-rose-600/30 overflow-hidden mb-4">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-500/30 rounded-full blur-2xl" />
        
        {/* Status Badge - Warm */}
        <div className="absolute top-3 left-3 bg-emerald-500/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Open
        </div>
        
        {/* Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-bold text-stone-100 drop-shadow-sm line-clamp-1 group-hover:text-amber-300 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <p className="text-stone-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* College Badge - Warm */}
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-4 p-2.5 rounded-xl bg-stone-900/50 border border-stone-700/50">
          <University size={14} className="text-amber-400 flex-shrink-0" />
          <span className="font-medium truncate">{project.college}</span>
        </div>

        {/* Footer: Team + Apply */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-700/50">
          {/* Team Avatars - Warm */}
          <div className="flex -space-x-2">
            {project.team?.slice(0, 2).map((member, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full border-2 border-stone-800 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg" 
                title={member.name}
              >
                {member.name?.charAt(0)?.toUpperCase()}
              </div>
            ))}
            {project.membersCount > 2 && (
              <div className="w-8 h-8 rounded-full border-2 border-stone-800 bg-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-300">
                +{project.membersCount - 2}
              </div>
            )}
          </div>

          {/* Apply Button - Warm Gradient */}
          <button
            onClick={() => onApplyClick(project._id)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                     text-white text-xs font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                     transition-all duration-300 flex items-center gap-2 shadow-lg shadow-amber-500/30 
                     hover:shadow-amber-500/50 group/btn"
          >
            Apply 
            <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 2. Completed Project Card Component (Warm Dark Theme) ---
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
      whileHover={{ y: -6 }}
      className="group relative p-1 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 hover:from-amber-500/30 hover:via-orange-500/30 hover:to-rose-500/30 transition-all duration-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="h-full p-5 rounded-2xl bg-stone-800/40 border border-stone-700/50 backdrop-blur-xl flex flex-col">
        
        {/* Screenshot / Hero Image */}
        <div className="relative h-40 rounded-xl bg-stone-900/50 overflow-hidden mb-4 border border-stone-700/50">
          {project.screenshots && project.screenshots.length > 0 ? (
            <img
              src={project.screenshots[0]}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-800 to-stone-900 text-stone-500">
              <ImageIcon size={40} className="opacity-50" />
            </div>
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60" />
          
          {/* Completed Badge - Warm */}
          <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
            <CheckCircle2 size={12} /> Completed
          </div>

          {/* Screenshot Count */}
          {project.screenshots && project.screenshots.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-sm text-stone-300 text-[10px] px-2 py-1 rounded-lg flex items-center gap-1 border border-stone-700/50">
              <ImageIcon size={10} /> {project.screenshots.length}
            </div>
          )}

          {/* Hover Overlay - Warm */}
          <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all">
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-stone-100 mb-2 leading-tight group-hover:text-amber-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-stone-400 text-xs mb-4 line-clamp-2">{project.description}</p>

          {/* Tech Stack - Warm Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack?.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-2.5 py-1 bg-stone-900/50 text-stone-300 text-[10px] font-medium rounded-lg border border-stone-700/50">
                {tech}
              </span>
            ))}
            {project.techStack?.length > 3 && (
              <span className="px-2.5 py-1 bg-stone-900/50 text-stone-500 text-[10px] rounded-lg border border-stone-700/50">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Team - Warm */}
          <div className="mb-5">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Users size={10} className="text-amber-400" /> Built By
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {project.team?.slice(0, 3).map((member, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-stone-800 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white shadow-lg" title={member.name}>
                    {member.name?.charAt(0)?.toUpperCase()}
                  </div>
                ))}
                {project.team?.length > 3 && (
                  <div className="w-8 h-8 rounded-full border-2 border-stone-800 bg-stone-700 flex items-center justify-center text-xs font-bold text-stone-300">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
              <span className="text-xs text-stone-400 font-medium">
                {project.team?.length} Members
              </span>
            </div>
          </div>

          {/* Action Buttons - Warm */}
          <div className="mt-auto grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
              >
                <ExternalLink size={14} /> Live
              </a>
            )}
            <button
              onClick={handleViewDetails}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                project.liveLink 
                  ? 'bg-stone-700/50 border-stone-600/50 text-stone-300 hover:bg-stone-700 hover:border-amber-500/30' 
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

// --- Main Dashboard Component (Warm Dark Theme) ---
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
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30 text-stone-100 relative overflow-x-hidden pb-20">
      
      {/* ===== Background Decorative Elements - Warm Tones ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-r from-amber-600/25 via-orange-600/20 to-rose-600/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-orange-600/20 via-rose-600/15 to-red-600/15 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-gradient-to-r from-amber-600/15 via-orange-600/10 to-yellow-600/10 rounded-full blur-3xl"
        />
        {/* Warm Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* ===== Sticky Header - Warm Theme ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-stone-900/70 border-b border-stone-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo + Greeting - Warm */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 rounded-lg transition-colors"
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
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                    {user?.name || 'User'}
                  </span>{' '}
                  👋
                </motion.h1>
                <p className="text-xs text-stone-400 font-medium">Ready to build something amazing?</p>
              </div>
              <div className="lg:hidden">
                <h1 className="text-lg font-bold">Hi, {user?.name?.split(' ')[0] || 'User'}!</h1>
              </div>
            </div>

            {/* Header Right Actions - Warm */}
            <div className="flex items-center gap-2">
              
              {/* Messages - Warm Hover */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/messages')}
                className="relative p-2.5 text-stone-400 hover:text-amber-400 hover:bg-stone-800/50 rounded-xl transition-all"
                title="Messages"
              >
                <MessageSquare size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 border-2 border-stone-900 rounded-full animate-pulse"></span>
              </motion.button>

              {/* Notifications - Warm Hover */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 text-stone-400 hover:text-amber-400 hover:bg-stone-800/50 rounded-xl transition-all"
                title="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-500 border-2 border-stone-900 rounded-full"></span>
              </motion.button>

              {/* Create Project - Desktop - Warm Gradient */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/create-project')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-xl font-semibold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all"
              >
                <Plus size={18} strokeWidth={2.5} />
                <span className="hidden lg:inline">Create Project</span>
              </motion.button>

              {/* Profile Dropdown - Warm */}
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 pr-3 rounded-xl hover:bg-stone-800/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center overflow-hidden border-2 border-stone-800">
                      <span className="text-sm font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown size={16} className="text-stone-400 group-hover:text-stone-300 transition-colors hidden sm:block" />
                </button>
                
                {/* Dropdown Menu - Warm */}
                <div className="absolute right-0 mt-2 w-48 py-2 rounded-xl bg-stone-800/90 border border-stone-700/50 backdrop-blur-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-300 hover:bg-stone-700/50 hover:text-white transition-colors">
                    <User size={16} /> Profile
                  </Link>
                  <Link to="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-300 hover:bg-stone-700/50 hover:text-white transition-colors">
                    <Settings size={16} /> Settings
                  </Link>
                  <hr className="my-2 border-stone-700/50" />
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors">
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
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="relative bg-stone-800/40 border border-stone-700/50 rounded-2xl flex items-center p-2 backdrop-blur-xl">
              <Search size={20} className="ml-3 text-stone-500" />
              <input
                type="text"
                placeholder="Search projects, colleges, or tech..."
                className="w-full py-3 px-4 bg-transparent border-none focus:outline-none text-stone-100 placeholder-stone-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="p-2 hover:bg-stone-700/50 rounded-lg text-stone-400 hover:text-rose-400 transition"
                >
                  <RefreshCw size={18} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Tabs & Filters Row - Warm */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col lg:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-stone-800/40 border border-stone-700/50 backdrop-blur-xl"
          >
            {/* Custom Tabs - Warm Colors */}
            <div className="flex p-1 bg-stone-900/50 rounded-xl w-full lg:w-auto">
              {[
                { id: 'open', label: 'Open Projects', icon: Zap, color: 'amber' },
                { id: 'completed', label: 'Completed', icon: CheckCircle2, color: 'emerald' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-stone-800 text-${tab.color}-400 shadow-sm border border-${tab.color}-500/30`
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <tab.icon size={16} className={activeTab === tab.id ? `text-${tab.color}-400` : ''} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filters - Warm */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <div className="relative min-w-[150px]">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full appearance-none bg-stone-900/50 border border-stone-700/50 text-stone-300 py-2.5 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 cursor-pointer"
                >
                  {projectTypes.map((type) => (
                    <option key={type.name} value={type.name} className="bg-stone-800">{type.name}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
              </div>
              
              <input
                type="text"
                placeholder="Filter College"
                value={filterCollege}
                onChange={(e) => setFilterCollege(e.target.value)}
                className="w-full lg:w-40 bg-stone-900/50 border border-stone-700/50 text-stone-300 py-2.5 px-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 placeholder-stone-500"
              />
              
              <button 
                onClick={handleReset} 
                className="p-2.5 text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
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
                <Sparkles className="text-amber-400" size={20} />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  Trending Open Projects
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="text-emerald-400" size={20} />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Completed Showcase
                </span>
              </>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              activeTab === 'open' 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {filteredProjects.length}
            </span>
          </h2>

          {/* Mobile Create Button - Warm */}
          <button
            onClick={() => navigate('/create-project')}
            className="sm:hidden flex items-center justify-center w-11 h-11 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-xl shadow-lg shadow-amber-500/30"
          >
            <Plus size={20} />
          </button>
        </motion.div>

        {/* Projects Grid - Warm */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id || project.id}
                  variants={itemVariants}
                  layout
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
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-full animate-pulse" />
                  <div className="absolute inset-2 bg-stone-800/50 rounded-full border border-stone-700/50 flex items-center justify-center backdrop-blur-sm">
                    <Search size={56} className="text-stone-500" />
                  </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-stone-100 mb-2">No projects found</h3>
                <p className="text-stone-400 max-w-md mb-8 px-4">
                  Try adjusting your filters or check back later for more {activeTab} projects.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-stone-800/50 border border-stone-700/50 text-stone-300 font-semibold rounded-xl hover:bg-stone-700/50 hover:border-amber-500/30 transition-all"
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
          className="fixed bottom-6 right-6 sm:hidden w-14 h-14 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-full shadow-2xl shadow-amber-500/40 flex items-center justify-center z-40"
        >
          <Plus size={24} strokeWidth={2.5} />
        </motion.button>

      </main>
    </div>
  );
};

// Helper icons for dropdown - Warm compatible
const User = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const Settings = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

export default Dashboard;