import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, Loader2, AlertCircle, Briefcase,
  GraduationCap, Code, Calendar, Users, Clock, UserCheck, Lock,
  Sparkles, ExternalLink, ChevronRight, Shield, PanelLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";

const ProjectDetails = ({ projects, user }) => {
  const API = "https://collabhub-f4t3.onrender.com";
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
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

  const isHiringClosed = project?.status === 'Closed' || project?.hiringClosed === true;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
  const statusVariants = { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } } };

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Project not found</h2>
          <p className="text-slate-500 mb-6 text-sm">The project you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} 
            className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-sm flex items-center gap-2 mx-auto"
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
      const applicationData = { 
        name: formData.name, 
        college: formData.college, 
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s), 
        passingYear: formData.passingYear 
      };
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
    <div className="min-h-screen bg-slate-50 text-slate-900 relative">

      {/* 🔗 TOP BAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button whileHover={{ scale: 1.02, x: -2 }} whileTap={{ scale: 0.98 }} onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-violet-700 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-violet-50"
            >
              <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
            </motion.button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">PROJECT DETAILS</span>
              <div className="w-2 h-2 rounded-full bg-violet-500" />
            </div>
          </div>
        </div>
      </header>

      {/* 📐 CONTENT WRAPPER - Fixed Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col xl:flex-row gap-6">

          {/* ← LEFT SIDE: Project Details */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="w-full xl:w-3/5">
            <div className="space-y-6">
              
              {/* Project Header Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-medium">
                    <Briefcase size={12} /> {project.type || 'Project Opportunity'}
                  </span>
                  {isHiringClosed && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                      <Lock size={12} /> Hiring Closed
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                  {project.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                    <GraduationCap size={16} className="text-violet-600" />
                    <span className="font-medium">{project.college}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                    <Briefcase size={16} className="text-fuchsia-600" />
                    <span className="font-medium">Owner: {typeof project.owner === 'object' ? project.owner.name : project.ownerName || project.owner}</span>
                  </div>
                  {project.teamMembers?.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                      <Users size={16} className="text-emerald-600" />
                      <span className="font-medium">{project.teamMembers.length} Members</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Sparkles className="text-violet-600" size={18} /> About Project
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* 👥 Team Members Section */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Users size={16} className="text-emerald-600" /> Team Members
                  </h3>
                  {(() => {
                    const allMembers = getAllMembers();
                    const currentUserId = String(user?._id || '');
                    const otherMembers = allMembers.filter(member => getMemberId(member) !== currentUserId);
                    if (allMembers.length === 0) {
                      return <p className="text-xs text-slate-500 italic pl-2 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200">No team members yet — be the first to join!</p>;
                    }
                    if (otherMembers.length === 0) {
                      return <p className="text-xs text-violet-700 italic pl-2 py-3 px-4 rounded-xl bg-violet-50 border border-violet-200">{currentUserId ? "🎉 You are the only member!" : "👋 Login to join this project"}</p>;
                    }
                    return (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                        {otherMembers.map((member, index) => {
                          const memberId = getMemberId(member);
                          const isMemberOwner = member.isOwner || memberId === String(typeof project.owner === 'object' ? project.owner._id : project.owner);
                          return (
                            <motion.div key={memberId || index} variants={itemVariants} whileHover={{ x: 4 }}
                              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-violet-300 transition-all cursor-pointer group"
                              onClick={(e) => handleMemberClick(memberId, e)} title={`View ${member.name || 'Profile'}`}
                            >
                              {/* Avatar */}
                              <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold group-hover:bg-violet-700 transition-colors border-2 border-white">
                                  {(member.name?.charAt?.(0) || 'U').toUpperCase()}
                                </div>
                                {isMemberOwner && (
                                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 rounded-full flex items-center justify-center text-[10px] text-white border-2 border-white" title="Project Owner">👑</span>
                                )}
                              </div>
                              {/* Member Info */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-violet-700 transition-colors flex items-center gap-2">
                                  {member.name || 'Anonymous'}
                                  {isMemberOwner && <span className="px-2 py-0.5 bg-violet-50 text-violet-700 text-[10px] font-medium rounded-full border border-violet-200">Owner</span>}
                                </p>
                                <p className="text-xs text-slate-500 truncate">{member.college || 'College not specified'}</p>
                              </div>
                              {/* Role Badge + Arrow */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className={`px-2.5 py-1 text-[10px] font-medium rounded-full uppercase border ${isMemberOwner ? 'bg-violet-50 text-violet-700 border-violet-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                  {isMemberOwner ? 'Owner' : 'Member'}
                                </span>
                                <ChevronRight size={14} className="text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all" />
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    );
                  })()}
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Code size={16} className="text-violet-600" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.techStack && project.techStack.length > 0 ? (
                      project.techStack.map((tech, i) => (
                        <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-all cursor-default"
                        >{tech}</motion.span>
                      ))
                    ) : (<span className="text-slate-500 text-xs italic">No tech stack listed</span>)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* → RIGHT SIDE: Application Form / Status (Sticky) */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="w-full xl:w-2/5">
            <div className="sticky top-24 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
              
            <AnimatePresence mode="wait">
              
              {/* 🔒 STATE: Hiring Closed */}
              {isHiringClosed && (
                <motion.div key="closed" variants={statusVariants} initial="initial" animate="animate" exit="initial" className="text-center py-4">
                  <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-5">
                    <Lock size={36} className="text-rose-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Hiring Closed 🔒</h2>
                  <p className="text-slate-500 mb-6 text-sm px-2">Applications for <br /><span className="font-semibold text-violet-700">{project.title}</span> are now closed.</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left">
                    <p className="text-xs text-slate-600 font-medium mb-2">📌 Project Status:</p>
                    <ul className="text-[10px] text-slate-500 space-y-1.5">
                      <li><strong className="text-slate-700">Closed On:</strong> {project.closedDate ? new Date(project.closedDate).toLocaleDateString() : 'N/A'}</li>
                      <li><strong className="text-slate-700">Team Size:</strong> {project.teamMembers?.length || 0} members</li>
                      <li><strong className="text-slate-700">Position:</strong> <span className="text-emerald-700">Filled</span></li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <button onClick={() => navigate('/dashboard')}
                      className="w-full py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-sm text-sm"
                    >Explore More Projects</button>
                    {isTeamMember && (
                      <button onClick={() => navigate(`/project/${project._id}/workspace`)}
                        className="w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-violet-50 hover:border-violet-300 transition-colors text-sm"
                      >Open Workspace</button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ✅ STATE: Already a Team Member */}
              {!isHiringClosed && isTeamMember && (
                <motion.div key="member" variants={statusVariants} initial="initial" animate="animate" exit="initial" className="text-center py-4">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                    <UserCheck size={36} className="text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">You're on the Team! 🎉</h2>
                  <p className="text-slate-500 mb-6 text-sm px-2">You are already a member of <br /><span className="font-semibold text-violet-700">{project.title}</span>.</p>
                  <div className="space-y-3 mb-6">
                    <button onClick={() => navigate('/dashboard')}
                      className="w-full py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium hover:bg-violet-50 hover:border-violet-300 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <Briefcase size={16} /> Go to Dashboard
                    </button>
                    <button onClick={() => navigate(`/project/${project._id}/workspace`)}
                      className="w-full py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-sm text-sm flex items-center justify-center gap-2"
                    >
                      <Code size={16} /> Open Workspace
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500">Check your dashboard for project tasks and updates.</p>
                </motion.div>
              )}

              {/* ⏳ STATE: Application Pending */}
              {!isHiringClosed && !isTeamMember && applicationStatus === 'pending' && (
                <motion.div key="pending" variants={statusVariants} initial="initial" animate="animate" exit="initial" className="text-center py-4">
                  <div className="w-20 h-20 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center mx-auto mb-5">
                    <Clock size={36} className="text-violet-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Application Pending</h2>
                  <p className="text-slate-500 mb-6 text-sm px-2">Thanks <strong className="text-slate-700">{formData.name || user?.name}</strong>, your application for <br /><span className="font-semibold text-violet-700">{project.title}</span> is under review.</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left">
                    <p className="text-xs text-violet-700 font-medium mb-2">📋 Application Summary:</p>
                    <ul className="text-[10px] text-slate-600 space-y-1.5">
                      <li><strong className="text-slate-700">College:</strong> {formData.college || 'N/A'}</li>
                      <li><strong className="text-slate-700">Passing Year:</strong> {formData.passingYear || 'N/A'}</li>
                      <li><strong className="text-slate-700">Skills:</strong> {formData.skills || 'N/A'}</li>
                    </ul>
                  </div>
                  <button onClick={() => navigate('/dashboard')}
                    className="w-full py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-sm text-sm"
                  >Back to Dashboard</button>
                  <p className="text-[10px] text-slate-500 mt-3">You'll be notified once the project owner reviews your application.</p>
                </motion.div>
              )}

              {/* ❌ STATE: Application Rejected */}
              {!isHiringClosed && !isTeamMember && applicationStatus === 'rejected' && (
                <motion.div key="rejected" variants={statusVariants} initial="initial" animate="animate" exit="initial" className="text-center py-4">
                  <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-5">
                    <AlertCircle size={36} className="text-rose-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">Application Not Selected</h2>
                  <p className="text-slate-500 mb-6 text-sm px-2">Sorry, your application for <br /><span className="font-semibold text-violet-700">{project.title}</span> was not selected this time.</p>
                  <button onClick={() => navigate('/dashboard')}
                    className="w-full py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-sm text-sm"
                  >Explore More Projects</button>
                </motion.div>
              )}

              {/* ✨ STATE: Not Applied - Show Form */}
              {!isHiringClosed && !isTeamMember && !applicationStatus && (
                <motion.div key="form" variants={containerVariants} initial="hidden" animate="visible" className="py-2">
                  <div className="mb-6 pb-4 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Join this Team</h2>
                    <p className="text-slate-500 text-xs">Fill in your details to apply.</p>
                  </div>
                  <form onSubmit={handleApplyClick} className="space-y-4">
                    {/* Name */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Full Name</label>
                      <div className="relative">
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Rahul Sharma"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none transition-all text-slate-900 placeholder-slate-400 hover:border-violet-300 disabled:opacity-50"
                          disabled={isApplying || hasApplied} />
                        <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </motion.div>
                    {/* College & Year Row */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">College</label>
                        <div className="relative">
                          <input type="text" name="college" value={formData.college} onChange={handleInputChange} placeholder="IIT Delhi"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none transition-all text-slate-900 placeholder-slate-400 hover:border-violet-300 disabled:opacity-50"
                            disabled={isApplying || hasApplied} />
                          <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Passing Year</label>
                        <div className="relative">
                          <input type="number" name="passingYear" value={formData.passingYear} onChange={handleInputChange} placeholder="2025" min="2024" max="2030"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none transition-all text-slate-900 placeholder-slate-400 hover:border-violet-300 disabled:opacity-50"
                            disabled={isApplying || hasApplied} />
                          <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                    </motion.div>
                    {/* Skills */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Your Skills</label>
                      <div className="relative">
                        <textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="React, Node.js, Python..." rows="3"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-violet-400 focus:border-violet-500 outline-none transition-all text-slate-900 placeholder-slate-400 resize-none hover:border-violet-300 disabled:opacity-50"
                          disabled={isApplying || hasApplied} />
                        <Code size={14} className="absolute left-3.5 top-3.5 text-slate-400" />
                      </div>
                    </motion.div>
                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2"
                        >
                          <AlertCircle size={12} className="flex-shrink-0" /> {error}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                      <button type="submit" disabled={isApplying || hasApplied || isHiringClosed}
                        className={`w-full py-3.5 rounded-xl font-medium text-sm text-white shadow-sm transition-all flex items-center justify-center gap-2 mt-2
                          ${isApplying || hasApplied || isHiringClosed
                            ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-violet-600 hover:bg-violet-700'
                          }`}
                      >
                        {isApplying ? (<><Loader2 className="animate-spin" size={16} /> Sending...</>) : hasApplied ? ("Already Applied") : isHiringClosed ? ("Hiring Closed") : (<><>Submit Application <ArrowLeft size={16} className="rotate-180" /></></>)}
                      </button>
                    </motion.div>
                    <p className="text-[9px] text-center text-slate-500 mt-3">By applying, you agree to share your details with the project owner.</p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ✨ Custom Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
      `}</style>
    </div>
  );
};

export default ProjectDetails;