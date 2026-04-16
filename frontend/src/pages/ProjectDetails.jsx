import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Loader2, AlertCircle, Briefcase,
  GraduationCap, Code, Calendar, Users, Clock, UserCheck, Lock,
  Sparkles, ExternalLink, ChevronRight, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";

const ProjectDetails = ({ projects, user }) => {
  const API = "http://localhost:5000";
  const { id } = useParams();
  const navigate = useNavigate();

  // 🎯 Page load par top par scroll kare
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    return () => {
      // Cleanup: optional - agar needed ho to
    };
  }, [id]);

  const [isApplying, setIsApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isTeamMember, setIsTeamMember] = useState(false);
  const [error, setError] = useState(null);

  const project = projects.find(p => p._id === id);

  useEffect(() => {
    if (project && user) {
      const teamMember = project.teamMembers?.some(member =>
        String(member.userId || member._id) === String(user._id)
      );
      setIsTeamMember(!!teamMember);
      if (!teamMember && project.applicants?.length > 0) {
        const applicant = project.applicants.find(app =>
          String(app.userId || app._id) === String(user._id)
        );
        if (applicant) setApplicationStatus(applicant.status || 'pending');
      }
    }
  }, [project, user]);

  const [formData, setFormData] = useState({
    name: '', college: '', skills: '', passingYear: ''
  });

  const isHiringClosed = project?.status === 'Close' || project?.hiringClosed === true;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
  const statusVariants = { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } } };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex flex-col items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertCircle size={40} className="text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Project not found</h2>
          <p className="text-stone-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} 
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-amber-200/60 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleApplyClick = async (e) => {
    e.preventDefault();
    if (isHiringClosed) { setError("Applications are closed for this project."); return; }
    if (!formData.name || !formData.college || !formData.skills || !formData.passingYear) {
      setError("Please fill in all fields to apply."); return;
    }
    if (applicationStatus !== null || isTeamMember) return;
    setIsApplying(true); setError(null);
    try {
      const applicationData = { name: formData.name, college: formData.college, skills: formData.skills, passingYear: formData.passingYear };
      await axios.post(`${API}/apply/${project._id}`, applicationData, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` }
      });
      setApplicationStatus('pending');
      setFormData({ name: '', college: '', skills: '', passingYear: '' });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply. Please try again.");
    } finally { setIsApplying(false); }
  };

  const hasApplied = applicationStatus !== null && !isTeamMember;
  const getMemberId = (member) => String(member?.userId || member?._id || member?.id || '');

  const getAllMembers = () => {
    let allMembers = [];
    if (project.owner) {
      const ownerId = typeof project.owner === 'object' ? project.owner._id || project.owner.id : project.owner;
      const ownerName = typeof project.owner === 'object' ? project.owner.name : project.ownerName || 'Project Owner';
      const ownerCollege = typeof project.owner === 'object' ? project.owner.college : project.ownerCollege || '';
      const ownerExists = project.teamMembers?.some(m => getMemberId(m) === String(ownerId));
      if (!ownerExists && ownerId) {
        allMembers.push({ _id: ownerId, userId: ownerId, name: ownerName, college: ownerCollege, isOwner: true });
      }
    }
    if (project.teamMembers?.length > 0) {
      allMembers = [...allMembers, ...project.teamMembers.map(m => ({
        ...m, isOwner: m.role === 'owner' || getMemberId(m) === String(typeof project.owner === 'object' ? project.owner._id : project.owner)
      }))];
    }
    return allMembers;
  };

  const handleMemberClick = (memberId, e) => {
    if (window.getSelection().toString()) return;
    const currentUserId = String(user?._id || '');
    if (memberId && memberId !== currentUserId) navigate(`/profile/${memberId}`);
  };

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 text-stone-900 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-amber-300/40 to-orange-300/30 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-rose-300/40 to-red-300/30 rounded-full blur-3xl" />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`, backgroundSize: '64px 64px' }} />
      </div>

      {/* 🔗 TOP BAR - Warm Theme */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button whileHover={{ scale: 1.02, x: -2 }} whileTap={{ scale: 0.98 }} onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-stone-600 hover:text-amber-700 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-amber-50"
            >
              <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
            </motion.button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-500 hidden sm:inline">PROJECT DETAILS</span>
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* 📐 CONTENT WRAPPER - Warm Theme */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">

        {/* ← LEFT SIDE: Project Details (Scrollable) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.4 }} 
          className="w-full lg:w-3/5"
        >
          {/* ✅ Scrollable container for left content */}
          <div className="max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-6 pb-6">
              {/* Project Header Card - Warm */}
              <div className="p-6 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50">
                
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold shadow-sm">
                    <Briefcase size={12} /> {project.type || 'Project Opportunity'}
                  </span>
                  {isHiringClosed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold shadow-sm">
                      <Lock size={12} /> Hiring Closed
                    </span>
                  )}
                </div>

                {/* Title - Warm Gradient */}
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">{project.title}</span>
                </h1>

                {/* Meta Info - Warm */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 border border-amber-200 text-stone-700 text-sm shadow-sm">
                    <GraduationCap size={16} className="text-amber-600" />
                    <span className="font-medium">{project.college}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 border border-amber-200 text-stone-700 text-sm shadow-sm">
                    <Briefcase size={16} className="text-orange-600" />
                    <span className="font-medium">Owner: {typeof project.owner === 'object' ? project.owner.name : project.ownerName || project.owner}</span>
                  </div>
                  {project.teamMembers?.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 border border-amber-200 text-stone-700 text-sm shadow-sm">
                      <Users size={16} className="text-emerald-600" />
                      <span className="font-medium">{project.teamMembers.length} Members</span>
                    </div>
                  )}
                </div>

                {/* Description - Warm */}
                <div className="mb-6 pb-6 border-b border-amber-200">
                  <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                    <Sparkles className="text-amber-600" size={18} /> About Project
                  </h3>
                  <p className="text-stone-700 text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* 👥 Team Members Section - Warm */}
                <div className="mb-6 pb-6 border-b border-amber-200">
                  <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Users size={16} className="text-emerald-600" /> Team Members
                  </h3>
                  {(() => {
                    const allMembers = getAllMembers();
                    const currentUserId = String(user?._id || '');
                    const otherMembers = allMembers.filter(member => getMemberId(member) !== currentUserId);
                    if (allMembers.length === 0) {
                      return <p className="text-xs text-stone-500 italic pl-2 py-3 px-4 rounded-xl bg-white/70 border border-amber-200 shadow-sm">No team members yet — be the first to join!</p>;
                    }
                    if (otherMembers.length === 0) {
                      return <p className="text-xs text-amber-700 italic pl-2 py-3 px-4 rounded-xl bg-amber-100 border border-amber-200 shadow-sm">{currentUserId ? "🎉 You are the only member!" : "👋 Login to join this project"}</p>;
                    }
                    return (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                        {otherMembers.map((member, index) => {
                          const memberId = getMemberId(member);
                          const isMemberOwner = member.isOwner || memberId === String(typeof project.owner === 'object' ? project.owner._id : project.owner);
                          return (
                            <motion.div key={memberId || index} variants={itemVariants} whileHover={{ x: 4 }}
                              className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-amber-200 hover:border-amber-400 transition-all cursor-pointer group shadow-sm"
                              onClick={(e) => handleMemberClick(memberId, e)} title={`View ${member.name || 'Profile'}`}
                            >
                              {/* Avatar - Warm Gradient */}
                              <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:scale-105 transition-transform border-2 border-white">
                                  {(member.name?.charAt?.(0) || 'U').toUpperCase()}
                                </div>
                                {isMemberOwner && (
                                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-[10px] text-white border-2 border-white shadow-sm" title="Project Owner">👑</span>
                                )}
                              </div>
                              {/* Member Info - Warm */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-stone-900 truncate group-hover:text-amber-700 transition-colors flex items-center gap-2">
                                  {member.name || 'Anonymous'}
                                  {isMemberOwner && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full border border-amber-200 shadow-sm">Owner</span>}
                                </p>
                                <p className="text-xs text-stone-600 truncate">{member.college || 'College not specified'}</p>
                              </div>
                              {/* Role Badge + Arrow - Warm */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase border shadow-sm ${isMemberOwner ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'}`}>
                                  {isMemberOwner ? 'Owner' : 'Member'}
                                </span>
                                <ChevronRight size={14} className="text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    );
                  })()}
                </div>

                {/* Tech Stack - Warm Tags */}
                <div>
                  <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Code size={16} className="text-amber-600" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.techStack && project.techStack.length > 0 ? (
                      project.techStack.map((tech, i) => (
                        <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className={`px-3.5 py-2 bg-white/70 border border-amber-200 rounded-xl text-xs font-semibold text-stone-700 hover:border-amber-400 transition-all cursor-default shadow-sm
                            ${i % 3 === 0 ? 'hover:text-amber-800 hover:bg-amber-100' : i % 3 === 1 ? 'hover:text-orange-800 hover:bg-orange-100' : 'hover:text-rose-800 hover:bg-rose-100'}`}
                        >{tech}</motion.span>
                      ))
                    ) : (<span className="text-stone-500 text-xs italic">No tech stack listed</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* → RIGHT SIDE: Application Form / Status - Warm Theme (Sticky) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.4, delay: 0.1 }} 
          className="w-full lg:w-2/5"
        >
          {/* ✅ Sticky container - right panel fixed rahega */}
          <div className="sticky top-24 lg:top-28 p-6 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            
            <AnimatePresence mode="wait">
              
              {/* 🔒 STATE: Hiring Closed - Warm */}
              {isHiringClosed && (
                <motion.div key="closed" variants={statusVariants} initial="initial" animate="animate" exit="initial" className="text-center py-4">
                  <div className="w-20 h-20 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <Lock size={36} className="text-rose-600" />
                  </div>
                  <h2 className="text-xl font-bold text-stone-900 mb-2">Hiring Closed 🔒</h2>
                  <p className="text-stone-600 mb-6 text-sm px-2">Applications for <br /><span className="font-semibold text-amber-700">{project.title}</span> are now closed.</p>
                  <div className="bg-white/70 border border-amber-200 rounded-xl p-4 mb-6 text-left shadow-sm">
                    <p className="text-xs text-stone-600 font-medium mb-2">📌 Project Status:</p>
                    <ul className="text-[10px] text-stone-500 space-y-1.5">
                      <li><strong className="text-stone-700">Closed On:</strong> {project.closedDate ? new Date(project.closedDate).toLocaleDateString() : 'N/A'}</li>
                      <li><strong className="text-stone-700">Team Size:</strong> {project.teamMembers?.length || 0} members</li>
                      <li><strong className="text-stone-700">Position:</strong> <span className="text-emerald-700">Filled</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <button onClick={() => navigate('/dashboard')}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70 text-sm"
                    >Explore More Projects</button>
                    {isTeamMember && (
                      <button onClick={() => navigate(`/project/${project._id}/workspace`)}
                        className="w-full py-3 rounded-xl bg-white/70 border-2 border-amber-200 text-stone-700 font-semibold hover:bg-amber-50 hover:border-amber-400 transition-all text-sm shadow-sm"
                      >Open Workspace</button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ✅ STATE: Already a Team Member - Warm */}
              {!isHiringClosed && isTeamMember && (
                <motion.div key="member" variants={statusVariants} initial="initial" animate="animate" exit="initial" className="text-center py-4">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <UserCheck size={36} className="text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-stone-900 mb-2">You're on the Team! 🎉</h2>
                  <p className="text-stone-600 mb-6 text-sm px-2">You are already a member of <br /><span className="font-semibold text-amber-700">{project.title}</span>.</p>
                  <div className="space-y-3 mb-6">
                    <button onClick={() => navigate('/dashboard')}
                      className="w-full py-3 rounded-xl bg-white/70 border-2 border-amber-200 text-stone-700 font-semibold hover:bg-amber-50 hover:border-amber-400 transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Briefcase size={16} /> Go to Dashboard
                    </button>
                    <button onClick={() => navigate(`/project/${project._id}/workspace`)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70 text-sm flex items-center justify-center gap-2"
                    >
                      <Code size={16} /> Open Workspace
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500">Check your dashboard for project tasks and updates.</p>
                </motion.div>
              )}

              {/* ⏳ STATE: Application Pending - Warm */}
              {!isHiringClosed && !isTeamMember && applicationStatus === 'pending' && (
                <motion.div key="pending" variants={statusVariants} initial="initial" animate="animate" exit="initial" className="text-center py-4">
                  <div className="w-20 h-20 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <Clock size={36} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-stone-900 mb-2">Application Pending</h2>
                  <p className="text-stone-600 mb-6 text-sm px-2">Thanks <strong className="text-stone-800">{formData.name || user?.name}</strong>, your application for <br /><span className="font-semibold text-amber-700">{project.title}</span> is under review.</p>
                  <div className="bg-white/70 border border-amber-200 rounded-xl p-4 mb-6 text-left shadow-sm">
                    <p className="text-xs text-amber-700 font-medium mb-2">📋 Application Summary:</p>
                    <ul className="text-[10px] text-stone-600 space-y-1.5">
                      <li><strong className="text-stone-700">College:</strong> {formData.college || 'N/A'}</li>
                      <li><strong className="text-stone-700">Passing Year:</strong> {formData.passingYear || 'N/A'}</li>
                      <li><strong className="text-stone-700">Skills:</strong> {formData.skills || 'N/A'}</li>
                    </ul>
                  </div>
                  <button onClick={() => navigate('/dashboard')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70 text-sm"
                  >Back to Dashboard</button>
                  <p className="text-[10px] text-stone-500 mt-3">You'll be notified once the project owner reviews your application.</p>
                </motion.div>
              )}

              {/* ❌ STATE: Application Rejected - Warm */}
              {!isHiringClosed && !isTeamMember && applicationStatus === 'rejected' && (
                <motion.div key="rejected" variants={statusVariants} initial="initial" animate="animate" exit="initial" className="text-center py-4">
                  <div className="w-20 h-20 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <AlertCircle size={36} className="text-rose-600" />
                  </div>
                  <h2 className="text-xl font-bold text-stone-900 mb-2">Application Not Selected</h2>
                  <p className="text-stone-600 mb-6 text-sm px-2">Sorry, your application for <br /><span className="font-semibold text-amber-700">{project.title}</span> was not selected this time.</p>
                  <button onClick={() => navigate('/dashboard')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70 text-sm"
                  >Explore More Projects</button>
                </motion.div>
              )}

              {/* ✨ STATE: Not Applied - Show Form - Warm */}
              {!isHiringClosed && !isTeamMember && !applicationStatus && (
                <motion.div key="form" variants={containerVariants} initial="hidden" animate="visible" className="py-2">
                  <div className="mb-6 pb-4 border-b border-amber-200">
                    <h2 className="text-xl font-bold text-stone-900 mb-1">Join this Team</h2>
                    <p className="text-stone-600 text-xs">Fill in your details to apply.</p>
                  </div>
                  <form onSubmit={handleApplyClick} className="space-y-4">
                    {/* Name - Warm Inputs */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wide mb-1.5">Full Name</label>
                      <div className="relative">
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Rahul Sharma"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border-2 border-stone-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-500 outline-none transition-all duration-300 text-stone-900 placeholder-stone-400 hover:border-amber-300 disabled:opacity-50"
                          disabled={isApplying || hasApplied} />
                        <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      </div>
                    </motion.div>
                    {/* College & Year Row - Warm */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wide mb-1.5">College</label>
                        <div className="relative">
                          <input type="text" name="college" value={formData.college} onChange={handleInputChange} placeholder="IIT Delhi"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border-2 border-stone-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-500 outline-none transition-all duration-300 text-stone-900 placeholder-stone-400 hover:border-amber-300 disabled:opacity-50"
                            disabled={isApplying || hasApplied} />
                          <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wide mb-1.5">Passing Year</label>
                        <div className="relative">
                          <input type="number" name="passingYear" value={formData.passingYear} onChange={handleInputChange} placeholder="2025" min="2024" max="2030"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border-2 border-stone-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-500 outline-none transition-all duration-300 text-stone-900 placeholder-stone-400 hover:border-amber-300 disabled:opacity-50"
                            disabled={isApplying || hasApplied} />
                          <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        </div>
                      </div>
                    </motion.div>
                    {/* Skills - Warm */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-wide mb-1.5">Your Skills</label>
                      <div className="relative">
                        <textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="React, Node.js, Python..." rows="3"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border-2 border-stone-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-500 outline-none transition-all duration-300 text-stone-900 placeholder-stone-400 resize-none hover:border-amber-300 disabled:opacity-50"
                          disabled={isApplying || hasApplied} />
                        <Code size={14} className="absolute left-3.5 top-3.5 text-stone-400" />
                      </div>
                    </motion.div>
                    {/* Error Message - Warm */}
                    <AnimatePresence>
                      {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="p-3 rounded-xl bg-rose-100 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 shadow-sm"
                        >
                          <AlertCircle size={12} className="flex-shrink-0" /> {error}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Submit Button - Warm Gradient */}
                    <motion.div variants={itemVariants}>
                      <button type="submit" disabled={isApplying || hasApplied || isHiringClosed}
                        className={`w-full py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-2
                          ${isApplying || hasApplied || isHiringClosed
                            ? 'bg-white/70 border-2 border-amber-200 text-stone-500 cursor-not-allowed shadow-sm'
                            : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 hover:shadow-amber-300/70'
                          }`}
                      >
                        {isApplying ? (<><Loader2 className="animate-spin" size={16} /> Sending...</>) : hasApplied ? ("Already Applied") : isHiringClosed ? ("Hiring Closed") : (<><>Submit Application <ArrowLeft size={16} className="rotate-180" /></></>)}
                      </button>
                    </motion.div>
                    <p className="text-[9px] text-center text-stone-500 mt-3">By applying, you agree to share your details with the project owner.</p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ✨ Custom Scrollbar CSS for Warm Light Mode */}
      <style>{`
        /* Custom scrollbar for scrollable areas */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fcd34d;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #fcd34d transparent;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;