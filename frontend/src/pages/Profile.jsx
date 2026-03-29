import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Camera, Mail, Building, Briefcase, PlusCircle, ArrowRight,
  Users, CheckCircle, Clock, Edit3, LogOut, Award, UserCheck,
  Sparkles, ChevronRight, Shield, TrendingUp
} from 'lucide-react';

// ===== Dark Theme EmptyState Component =====
const EmptyState = ({ icon: Icon, msg, subMsg, link, linkText, color = 'violet' }) => {
  const colorClasses = {
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', btn: 'from-violet-600 to-cyan-600' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', btn: 'from-cyan-600 to-emerald-600' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', btn: 'from-emerald-600 to-teal-600' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', btn: 'from-amber-600 to-orange-600' }
  };
  
  const colors = colorClasses[color] || colorClasses.violet;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className={`w-20 h-20 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center mx-auto mb-6`}>
        <Icon className={`w-10 h-10 ${colors.text}`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-100 mb-2">{msg}</h3>
      {subMsg && <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">{subMsg}</p>}
      {link && linkText && (
        <Link 
          to={link} 
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${colors.btn} 
                    text-white font-semibold hover:opacity-90 transition-all shadow-lg 
                    shadow-violet-500/25 hover:shadow-violet-500/40`}
        >
          {linkText} <ArrowRight size={18} />
        </Link>
      )}
    </motion.div>
  );
};

// ===== Dark Theme Project Card Component =====
const ProjectCard = ({ project, type, color, onAction }) => {
  const colorClasses = {
    indigo: { badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20', hover: 'hover:border-indigo-500/30', text: 'text-indigo-400' },
    purple: { badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20', hover: 'hover:border-purple-500/30', text: 'text-purple-400' },
    cyan: { badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20', hover: 'hover:border-cyan-500/30', text: 'text-cyan-400' },
    emerald: { badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', hover: 'hover:border-emerald-500/30', text: 'text-emerald-400' }
  };
  
  const colors = colorClasses[color] || colorClasses.indigo;
  
  const statusColors = {
    Accepted: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    Rejected: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    Pending: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ y: -4 }}
      className={`group p-5 rounded-2xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl 
                ${colors.hover} transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className={`font-bold text-lg text-gray-100 group-hover:${colors.text} transition-colors truncate`}>
            {project.title}
          </h3>
          {project.status && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status] || colors.badge}`}>
              {project.status}
            </span>
          )}
          {project.role && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors.badge} flex items-center gap-1`}>
              <Award size={10} /> {project.role}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <Building size={14} className={colors.text} /> 
            <span className="truncate max-w-[150px]">{project.college}</span>
          </span>
          <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:inline" />
          <span className="px-2 py-0.5 bg-gray-700/50 rounded text-xs">{project.type}</span>
          <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:inline" />
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-500" /> 
            {project.date || project.posted || project.completedDate}
          </span>
          {project.applicants?.length !== undefined && (
            <>
              <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:inline" />
              <span className={`flex items-center gap-1.5 ${colors.text} font-medium`}>
                <Users size={14} /> {project.applicants.length} Applicants
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {onAction?.secondary && (
          <button
            onClick={(e) => { e.stopPropagation(); onAction.secondary.onClick(); }}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white 
                     bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors 
                     flex items-center gap-1.5 border border-gray-600/50"
          >
            {onAction.secondary.icon} {onAction.secondary.label}
          </button>
        )}
        <Link 
          to={onAction?.primary?.link || `/project/${project._id || project.id}`}
          onClick={(e) => onAction?.primary?.onClick?.(e)}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold ${colors.text} 
                    hover:text-gray-100 transition-colors group/link`}
        >
          {onAction?.primary?.label || 'View Details'} 
          <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const Profile = ({ user, onLogout, projects }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applied');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // ===== State for filtered projects =====
  const [createdProject, setCreatedProject] = useState([]);
  const [appliedProject, setAppliedProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);

  // ===== Filter projects based on user =====
  useEffect(() => {
    if (projects && user?._id) {
      const userId = String(user._id);
      
      // Created projects (user is owner)
      const created = projects.filter(p => String(p.owner) === userId);
      setCreatedProject(created);
      
      // Applied projects (user applied)
      const applied = projects.filter(p => 
        p.applicants?.some(applicant => String(applicant.userId) === userId)
      );
      setAppliedProject(applied);
      
      // Selected projects (user is team member)
      const selected = projects.filter(p => 
        p.teamMembers?.some(member => String(member.userId) === userId)
      );
      setSelectedProject(selected);
    }
  }, [projects, user]);

  // ===== Image upload handler =====
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // ===== Logout handler =====
  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (onLogout) onLogout();
      navigate('/');
    }
  };

  // ===== Tab navigation with smooth scroll =====
  const handleStatClick = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // ===== Animation variants =====
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const tabVariants = {
    enter: (direction) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 30 : -30, opacity: 0 })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 text-gray-100 pt-20 px-4 pb-12 relative overflow-hidden">
      
      {/* ===== Background Decorative Elements ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-violet-600/25 to-cyan-600/25 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl"
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ===== Profile Header Card ===== */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-10 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl mb-8 relative overflow-hidden group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-violet-600/10 to-cyan-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">

            {/* Profile Picture */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="relative group cursor-pointer" 
              onClick={triggerFileInput}
            >
              {/* Animated Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-700/50 shadow-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              
              {/* Camera Button */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2 md:p-2.5 rounded-full bg-gray-900/90 border border-gray-700 shadow-lg"
              >
                <Camera size={18} className="text-violet-400" />
              </motion.div>
              
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </motion.div>

            {/* User Details & Actions */}
            <div className="flex-1 text-center lg:text-left w-full">
              <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4">
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight"
                  >
                    <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                      {user?.name}
                    </span>
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center lg:justify-start gap-2.5 text-sm font-medium"
                  >
                    {[
                      { icon: Mail, text: user?.email, color: "text-cyan-400" },
                      { icon: Building, text: user?.college, color: "text-violet-400" }
                    ].map((item, idx) => (
                      <span 
                        key={idx}
                        className="flex items-center gap-2 px-4 py-2 rounded-full 
                                 bg-gray-700/50 border border-gray-600/50 
                                 hover:border-violet-500/30 transition-colors"
                      >
                        <item.icon size={16} className={item.color} /> 
                        <span className="text-gray-300">{item.text}</span>
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-700/50 border border-gray-600/50 
                             text-gray-300 font-semibold hover:bg-gray-700 hover:border-violet-500/30 
                             transition-all duration-300"
                  >
                    <Edit3 size={18} /> {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 
                             text-rose-400 font-semibold hover:bg-rose-500/20 hover:border-rose-500/30 
                             transition-all duration-300 group"
                  >
                    <LogOut size={18} className="group-hover:-rotate-12 transition-transform" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </motion.div>
              </div>

              {/* Stats Row (Clickable) */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              >
                {[
                  { label: 'Applied', value: appliedProject.length, color: 'violet', icon: Briefcase, tab: 'applied' },
                  { label: 'Created', value: createdProject.length, color: 'purple', icon: PlusCircle, tab: 'created' },
                  { label: 'Selected', value: selectedProject.length, color: 'cyan', icon: UserCheck, tab: 'selected' },
                  { label: 'Completed', value: projects?.filter(p => p.status === 'Completed')?.length || 0, color: 'emerald', icon: Award, tab: 'completed' }
                ].map((stat, idx) => (
                  <motion.button
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStatClick(stat.tab)}
                    className={`p-4 rounded-2xl bg-gray-900/50 border border-gray-700/50 
                             hover:border-${stat.color}-500/30 transition-all duration-300 text-center group`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 
                                 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`text-${stat.color}-400 w-5 h-5`} />
                    </div>
                    <p className={`text-2xl font-bold bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-300 bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400 font-medium mt-1">{stat.label}</p>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ===== Tabs & Content Section ===== */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700/50 bg-gray-800/30 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700">
            {[
              { id: 'applied', label: 'Applied', icon: Briefcase, color: 'violet' },
              { id: 'created', label: 'Created', icon: PlusCircle, color: 'purple' },
              { id: 'selected', label: 'Selected', icon: UserCheck, color: 'cyan' },
              { id: 'completed', label: 'Completed', icon: Award, color: 'emerald' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[100px] lg:min-w-[140px] py-4 px-2 text-center font-semibold text-sm lg:text-base 
                         transition-all duration-300 relative capitalize ${
                  activeTab === tab.id 
                    ? `text-${tab.color}-400` 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <tab.icon size={18} className={activeTab === tab.id ? `text-${tab.color}-400` : ''} />
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 
                             bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-400 rounded-full`} 
                  />
                )}
                <span className="absolute inset-0 bg-violet-500/5 opacity-0 hover:opacity-100 transition-opacity rounded-t-3xl" />
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="p-5 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">

              {/* ===== APPLIED TAB ===== */}
              {activeTab === 'applied' && (
                <motion.div
                  key="applied"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {appliedProject.length > 0 ? (
                    appliedProject.map((project) => (
                      <ProjectCard
                        key={project._id || project.id}
                        project={project}
                        type="applied"
                        color="indigo"
                        onAction={{
                          primary: { link: `/project/${project._id || project.id}`, label: 'View Details' }
                        }}
                      />
                    ))
                  ) : (
                    <EmptyState 
                      icon={Briefcase}
                      msg="No applications yet"
                      subMsg="Browse projects and apply to join exciting teams"
                      link="/dashboard"
                      linkText="Browse Projects"
                      color="violet"
                    />
                  )}
                </motion.div>
              )}

              {/* ===== CREATED TAB ===== */}
              {activeTab === 'created' && (
                <motion.div
                  key="created"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {createdProject.length > 0 ? (
                    createdProject.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={{ ...project, status: 'Active' }}
                        type="created"
                        color="purple"
                        onAction={{
                          primary: { link: `/project/${project._id}/manage`, label: 'Manage' },
                          secondary: { 
                            label: 'Edit', 
                            icon: <Edit3 size={14} />,
                            onClick: () => navigate(`/project/${project._id}/edit`)
                          }
                        }}
                      />
                    ))
                  ) : (
                    <EmptyState 
                      icon={PlusCircle}
                      msg="No projects created yet"
                      subMsg="Share your idea and find talented teammates to build with"
                      link="/create-project"
                      linkText="Create Project"
                      color="purple"
                    />
                  )}
                </motion.div>
              )}

              {/* ===== SELECTED TAB ===== */}
              {activeTab === 'selected' && (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {selectedProject.length > 0 ? (
                    selectedProject.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={{ ...project, status: 'Selected' }}
                        type="selected"
                        color="cyan"
                        onAction={{
                          primary: { link: `/project/${project._id}`, label: 'View Project' }
                        }}
                      />
                    ))
                  ) : (
                    <EmptyState 
                      icon={UserCheck}
                      msg="Not selected yet"
                      subMsg="Keep applying! Your perfect team match is out there"
                      link="/dashboard"
                      linkText="Find Projects"
                      color="cyan"
                    />
                  )}
                </motion.div>
              )}

              {/* ===== COMPLETED TAB ===== */}
              {activeTab === 'completed' && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {projects?.filter(p => p.status === 'Completed')?.length > 0 ? (
                    projects.filter(p => p.status === 'Completed').map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={{ ...project, status: 'Completed' }}
                        type="completed"
                        color="emerald"
                        onAction={{
                          primary: { link: `/project/${project._id}`, label: 'View Certificate' }
                        }}
                      />
                    ))
                  ) : (
                    <EmptyState 
                      icon={Award}
                      msg="No completed projects yet"
                      subMsg="Finish a project to showcase your achievements here"
                      link="/dashboard"
                      linkText="Find Projects"
                      color="emerald"
                    />
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

        {/* ===== Profile Tips Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { icon: Shield, title: "Profile Completeness", value: "85%", desc: "Add skills to reach 100%", color: "violet" },
            { icon: TrendingUp, title: "Profile Views", value: "124", desc: "+12 this week", color: "cyan" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 
                             flex items-center justify-center`}>
                  <stat.icon className={`text-${stat.color}-400 w-5 h-5`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-200">{stat.title}</p>
                  <p className="text-xs text-gray-400">{stat.desc}</p>
                </div>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: stat.value }}
                  transition={{ duration: 0.8, delay: 0.5 + idx * 0.1 }}
                  className={`h-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-400 rounded-full`}
                />
              </div>
              <p className="text-right text-xs text-gray-400 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;