import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Camera, Mail, Building, Briefcase, PlusCircle, ArrowRight,
  Users, CheckCircle, Clock, Edit3, LogOut, Award, UserCheck,
  Sparkles, ChevronRight, Shield, TrendingUp, GraduationCap, Calendar
} from 'lucide-react';
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

// ===== Warm Light Theme EmptyState Component =====
const EmptyState = ({ icon: Icon, msg, subMsg, link, linkText, color = 'amber' }) => {
  const colorClasses = {
    amber: { bg: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-700', btn: 'from-amber-600 via-orange-600 to-rose-600' },
    orange: { bg: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-700', btn: 'from-orange-600 via-rose-600 to-red-600' },
    rose: { bg: 'bg-rose-100', border: 'border-rose-200', text: 'text-rose-700', btn: 'from-rose-600 via-red-600 to-pink-600' },
    emerald: { bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-700', btn: 'from-emerald-600 via-teal-600 to-cyan-600' }
  };
  const colors = colorClasses[color] || colorClasses.amber;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 px-4">
      <div className={`w-20 h-20 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center mx-auto mb-6 shadow-sm`}>
        <Icon className={`w-10 h-10 ${colors.text}`} />
      </div>
      <h3 className="text-lg font-semibold text-stone-900 mb-2">{msg}</h3>
      {subMsg && <p className="text-stone-600 text-sm mb-6 max-w-sm mx-auto">{subMsg}</p>}
      {link && linkText && (
        <Link to={link} className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${colors.btn} text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70`}>
          {linkText} <ArrowRight size={18} />
        </Link>
      )}
    </motion.div>
  );
};

// ===== Warm Light Theme Project Card Component =====
const ProjectCard = ({ project, type, color, onAction }) => {
  const colorClasses = {
    amber: { badge: 'bg-amber-100 text-amber-800 border-amber-200', hover: 'hover:border-amber-400', text: 'text-amber-700' },
    orange: { badge: 'bg-orange-100 text-orange-800 border-orange-200', hover: 'hover:border-orange-400', text: 'text-orange-700' },
    rose: { badge: 'bg-rose-100 text-rose-800 border-rose-200', hover: 'hover:border-rose-400', text: 'text-rose-700' },
    emerald: { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', hover: 'hover:border-emerald-400', text: 'text-emerald-700' }
  };
  const colors = colorClasses[color] || colorClasses.amber;
  
  const statusColors = {
    Accepted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Rejected: 'bg-rose-100 text-rose-800 border-rose-200',
    Pending: 'bg-amber-100 text-amber-800 border-amber-200',
    Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Active: 'bg-amber-100 text-amber-800 border-amber-200'
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`group p-5 rounded-2xl bg-white/80 border-2 border-amber-200 backdrop-blur-md ${colors.hover} transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className={`font-bold text-lg text-stone-900 group-hover:${colors.text} transition-colors truncate`}>{project.title}</h3>
          {project.status && <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status] || colors.badge}`}>{project.status}</span>}
          {project.role && <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors.badge} flex items-center gap-1 shadow-sm`}><Award size={10} /> {project.role}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
          <span className="flex items-center gap-1.5"><Building size={14} className={colors.text} /> <span className="truncate max-w-[150px]">{project.college}</span></span>
          <span className="w-1 h-1 bg-stone-300 rounded-full hidden sm:inline" />
          <span className="px-2 py-0.5 bg-amber-100 rounded text-xs border border-amber-200">{project.type}</span>
          <span className="w-1 h-1 bg-stone-300 rounded-full hidden sm:inline" />
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-stone-400" /> {project.date || project.posted || project.completedDate}</span>
          {project.applicants?.length !== undefined && (<>
            <span className="w-1 h-1 bg-stone-300 rounded-full hidden sm:inline" />
            <span className={`flex items-center gap-1.5 ${colors.text} font-medium`}><Users size={14} /> {project.applicants.length} Applicants</span>
          </>)}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {onAction?.secondary && (
          <button onClick={(e) => { e.stopPropagation(); onAction.secondary.onClick(); }}
            className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 bg-white/70 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1.5 border border-amber-200 shadow-sm"
          >{onAction.secondary.icon} {onAction.secondary.label}</button>
        )}
        <Link to={onAction?.primary?.link || `/project/${project._id || project.id}`} onClick={(e) => onAction?.primary?.onClick?.(e)}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold ${colors.text} hover:text-stone-900 transition-colors group/link`}
        >{onAction?.primary?.label || 'View Details'} <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" /></Link>
      </div>
    </motion.div>
  );
};

const Profile = ({ user, onLogout, projects }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('applied');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState(user);
  const fileInputRef = useRef(null);

  const [createdProject, setCreatedProject] = useState([]);
  const [appliedProject, setAppliedProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [completedProject, setCompletedProject] = useState([]);

  useEffect(() => {
    if (location.state?.updated && user) {
      showInfo('Profile updated! Welcome back ✨');
      const savedUser = localStorage.getItem('user');
      if (savedUser) { const parsedUser = JSON.parse(savedUser); setLocalUser(parsedUser); }
    }
  }, [location.state, user]);

  useEffect(() => { setLocalUser(user); }, [user]);

  useEffect(() => {
    if (projects && localUser?._id) {
      const userId = String(localUser._id);
      setCreatedProject(projects.filter(p => String(p.owner) === userId));
      setAppliedProject(projects.filter(p => p.applicants?.some(a => String(a.userId) === userId)));
      setSelectedProject(projects.filter(p => p.teamMembers?.some(m => String(m.userId) === userId)));
      setCompletedProject(projects.filter(p => p.status === 'Completed' && (String(p.owner) === userId || p.applicants?.some(a => String(a.userId) === userId && a.status === 'Accepted') || p.teamMembers?.some(m => String(m.userId) === userId))));
    }
  }, [projects, localUser]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showError('Please select a valid image file'); return; }
    if (file.size > 5 * 1024 * 1024) { showError('Image size should be less than 5MB'); return; }
    const toastId = showLoading('Uploading profile picture...');
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUrl = reader.result;
        setProfileImage(imageDataUrl);
        try {
          const formData = new FormData();
          formData.append('profileImage', file);
          await axios.post('http://localhost:5000/upload-profile-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          updateToastSuccess(toastId, 'Profile picture updated! 🎨');
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setLocalUser({ ...parsedUser, profileImage: imageDataUrl });
            localStorage.setItem('user', JSON.stringify({ ...parsedUser, profileImage: imageDataUrl }));
          }
        } catch (uploadErr) {
          console.error('Upload error:', uploadErr);
          updateToastSuccess(toastId, 'Picture updated locally! (Server sync failed)');
          showError('Failed to sync with server. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Image read error:', err);
      updateToastError(toastId, 'Failed to process image. Please try again.');
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      showInfo('Logging out... See you soon! 👋');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (onLogout) onLogout();
      setTimeout(() => navigate('/'), 800);
    }
  };

  const handleEditClick = () => {
    navigate('/profile/edit', { state: { user: { ...localUser, skills: localUser?.skills || [] } } });
  };

  const handleStatClick = (tabName) => { setActiveTab(tabName); window.scrollTo({ top: 400, behavior: 'smooth' }); };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  const getCurrentProjects = () => {
    switch(activeTab) {
      case 'applied': return appliedProject;
      case 'created': return createdProject;
      case 'selected': return selectedProject;
      case 'completed': return completedProject;
      default: return appliedProject;
    }
  };

  const getTabColor = (tabId) => ({ applied: 'amber', created: 'orange', selected: 'rose', completed: 'emerald' }[tabId] || 'amber');

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 text-stone-900 pt-20 px-4 pb-12 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-amber-300/40 via-orange-300/30 to-rose-300/40 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-orange-300/40 via-rose-300/30 to-red-300/30 rounded-full blur-3xl" />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`, backgroundSize: '64px 64px' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* 👤 Profile Header Card - Warm Theme */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          className="p-6 md:p-10 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50 mb-8 relative overflow-hidden group"
        >
          {/* Glow Effect - Warm */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-200/40 via-orange-200/30 to-rose-200/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-amber-200/30 via-orange-200/20 to-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">

            {/* Profile Picture - Warm Gradient */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative group cursor-pointer order-1 lg:order-1" onClick={triggerFileInput} title="Click to change profile picture">
              {/* Animated Ring - Warm */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                    {localUser?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              {/* Camera Button - Warm */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2 md:p-2.5 rounded-full bg-white/90 border-2 border-amber-200 shadow-md"
              >
                <Camera size={18} className="text-amber-600" />
              </motion.div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </motion.div>

            {/* User Details & Actions - Warm */}
            <div className="flex-1 text-center lg:text-left w-full order-2 lg:order-2">
              <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4">
                <div>
                  <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
                    <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">{localUser?.name || 'User'}</span>
                  </motion.h1>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center lg:justify-start gap-2.5 text-sm font-medium">
                    {[
                      { icon: Mail, text: localUser?.email, color: "text-orange-600" },
                      { icon: Building, text: localUser?.college, color: "text-amber-600" },
                      { icon: GraduationCap, text: localUser?.passingYear ? `Passing: ${localUser.passingYear}` : null, color: "text-emerald-600" }
                    ].filter(item => item.text).map((item, idx) => (
                      <span key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-amber-200 hover:border-amber-400 transition-colors shadow-sm">
                        <item.icon size={16} className={item.color} /> <span className="text-stone-700">{item.text}</span>
                      </span>
                    ))}
                  </motion.div>
                  {/* Skills Tags - Warm */}
                  {localUser?.skills?.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3">
                      {localUser.skills.slice(0, 5).map((skill, idx) => (
                        <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium border shadow-sm
                          ${idx % 3 === 0 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                            idx % 3 === 1 ? 'bg-orange-100 text-orange-800 border-orange-200' : 
                            'bg-rose-100 text-rose-800 border-rose-200'}`}>{skill}</span>
                      ))}
                      {localUser.skills.length > 5 && <span className="px-2 py-1 text-xs text-stone-500">+{localUser.skills.length - 5} more</span>}
                    </motion.div>
                  )}
                </div>
                {/* Action Buttons - Warm */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 order-3 lg:order-3">
                  <button onClick={handleEditClick}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 border-2 border-amber-200 text-stone-700 font-semibold hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 shadow-sm"
                  >
                    <Edit3 size={18} /> Edit
                  </button>
                  <button onClick={handleLogoutClick}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-100 border-2 border-rose-200 text-rose-700 font-semibold hover:bg-rose-200 hover:border-rose-400 transition-all duration-300 group shadow-sm"
                  >
                    <LogOut size={18} className="group-hover:-rotate-12 transition-transform" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </motion.div>
              </div>

              {/* Stats Row (Clickable) - Warm Colors */}
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { label: 'Applied', value: appliedProject.length, color: 'amber', icon: Briefcase, tab: 'applied' },
                  { label: 'Created', value: createdProject.length, color: 'orange', icon: PlusCircle, tab: 'created' },
                  { label: 'Selected', value: selectedProject.length, color: 'rose', icon: UserCheck, tab: 'selected' },
                  { label: 'Completed', value: completedProject.length, color: 'emerald', icon: Award, tab: 'completed' }
                ].map((stat, idx) => (
                  <motion.button key={stat.label} variants={itemVariants} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleStatClick(stat.tab)}
                    className={`p-4 rounded-2xl bg-white/70 border-2 border-amber-200 hover:border-${stat.color}-400 transition-all duration-300 text-center group shadow-sm`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-${stat.color}-100 to-${stat.color}-200 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform border border-${stat.color}-200`}>
                      <stat.icon className={`text-${stat.color}-600 w-5 h-5`} />
                    </div>
                    <p className={`text-2xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-500 bg-clip-text text-transparent`}>{stat.value}</p>
                    <p className="text-xs text-stone-600 font-medium mt-1">{stat.label}</p>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 📋 Tabs & Content Section - Warm Theme */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50 overflow-hidden"
        >
          {/* Tab Navigation - Warm */}
          <div className="flex border-b border-amber-200 bg-amber-50/60 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-300">
            {[
              { id: 'applied', label: 'Applied', icon: Briefcase, color: 'amber' },
              { id: 'created', label: 'Created', icon: PlusCircle, color: 'orange' },
              { id: 'selected', label: 'Selected', icon: UserCheck, color: 'rose' },
              { id: 'completed', label: 'Completed', icon: Award, color: 'emerald' }
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[100px] lg:min-w-[140px] py-4 px-2 text-center font-semibold text-sm lg:text-base transition-all duration-300 relative capitalize ${activeTab === tab.id ? `text-${tab.color}-700` : 'text-stone-500 hover:text-stone-700'}`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <tab.icon size={18} className={activeTab === tab.id ? `text-${tab.color}-600` : ''} />
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTabIndicator" className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-400 rounded-full`} />
                )}
                <span className="absolute inset-0 bg-amber-100/40 opacity-0 hover:opacity-100 transition-opacity rounded-t-3xl" />
              </button>
            ))}
          </div>

          {/* Tab Content Area - Warm */}
          <div className="p-5 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              {['applied', 'created', 'selected', 'completed'].map((tabId) => (
                activeTab === tabId && (
                  <motion.div key={tabId} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-4">
                    {getCurrentProjects().length > 0 ? (
                      getCurrentProjects().map((project) => (
                        <ProjectCard key={project._id || project.id} project={{ ...project, status: tabId === 'created' ? 'Active' : tabId === 'selected' ? 'Selected' : tabId === 'completed' ? 'Completed' : project.status }}
                          type={tabId} color={getTabColor(tabId)}
                          onAction={{
                            primary: { link: tabId === 'created' ? `/project/${project._id}/manage` : `/project/${project._id || project.id}`, label: tabId === 'created' ? 'Manage' : 'View Details' },
                            secondary: tabId === 'created' ? { label: 'Edit', icon: <Edit3 size={14} />, onClick: () => navigate(`/project/${project._id}/edit`) } : undefined
                          }}
                        />
                      ))
                    ) : (
                      <EmptyState icon={{ applied: Briefcase, created: PlusCircle, selected: UserCheck, completed: Award }[tabId]}
                        msg={{ applied: "No applications yet", created: "No projects created yet", selected: "Not selected yet", completed: "No completed projects yet" }[tabId]}
                        subMsg={{ applied: "Browse projects and apply to join exciting teams", created: "Share your idea and find talented teammates to build with", selected: "Keep applying! Your perfect team match is out there", completed: "Finish a project to showcase your achievements here" }[tabId]}
                        link="/dashboard" linkText={{ applied: "Browse Projects", created: "Create Project", selected: "Find Projects", completed: "Find Projects" }[tabId]}
                        color={getTabColor(tabId)}
                      />
                    )}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 💡 Profile Tips Section - Warm Theme */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Shield, title: "Profile Completeness", value: `${Math.min(100, 60 + (localUser?.skills?.length || 0) * 8 + (localUser?.college ? 15 : 0) + (localUser?.passingYear ? 7 : 0))}%`, desc: "Add skills & details to reach 100%", color: "amber" },
            { icon: TrendingUp, title: "Profile Views", value: "124", desc: "+12 this week", color: "orange" }
          ].map((stat, idx) => {
            const percentage = parseInt(stat.value);
            return (
              <motion.div key={idx} whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r from-${stat.color}-100 to-${stat.color}-200 flex items-center justify-center border border-${stat.color}-200`}>
                    <stat.icon className={`text-${stat.color}-600 w-5 h-5`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{stat.title}</p>
                    <p className="text-xs text-stone-600">{stat.desc}</p>
                  </div>
                </div>
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden border border-amber-200">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.8, delay: 0.5 + idx * 0.1 }}
                    className={`h-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-400 rounded-full`} />
                </div>
                <p className="text-right text-xs text-stone-500 mt-1">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Custom Scrollbar CSS for Warm Light Mode */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #fcd34d; border-radius: 3px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #fcd34d transparent; }
      `}</style>
    </div>
  );
};

export default Profile;