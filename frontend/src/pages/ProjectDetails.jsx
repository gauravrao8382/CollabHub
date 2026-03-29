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
        if (applicant) {
          setApplicationStatus(applicant.status || 'pending');
        }
      }
    }
  }, [project, user]);

  const [formData, setFormData] = useState({
    name: '',
    college: '',
    skills: '',
    passingYear: ''
  });

  // 🔹 Check if hiring is closed
  const isHiringClosed = project?.status === 'Close' || project?.hiringClosed === true;

  // ===== Animation variants =====
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const statusVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Project not found</h2>
          <p className="text-gray-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 
                     text-white font-semibold hover:from-violet-500 hover:to-cyan-500 
                     transition-all duration-300 shadow-lg shadow-violet-500/25 
                     flex items-center gap-2 mx-auto"
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

    if (isHiringClosed) {
      setError("Applications are closed for this project.");
      return;
    }

    if (!formData.name || !formData.college || !formData.skills || !formData.passingYear) {
      setError("Please fill in all fields to apply.");
      return;
    }

    if (applicationStatus !== null || isTeamMember) return;

    setIsApplying(true);
    setError(null);

    try {
      const applicationData = {
        name: formData.name,
        college: formData.college,
        skills: formData.skills,
        passingYear: formData.passingYear,
      };

      const res = await axios.post(`${API}/apply/${project._id}`, applicationData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });

      setApplicationStatus('pending');
      setFormData({ name: '', college: '', skills: '', passingYear: '' });

    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const hasApplied = applicationStatus !== null && !isTeamMember;

  // 🔹 Helper: Get member ID safely
  const getMemberId = (member) => {
    return String(member?.userId || member?._id || member?.id || '');
  };

  // 🔹 Build complete members list
  const getAllMembers = () => {
    let allMembers = [];
    if (project.owner) {
      const ownerId = typeof project.owner === 'object'
        ? project.owner._id || project.owner.id
        : project.owner;
      const ownerName = typeof project.owner === 'object'
        ? project.owner.name
        : project.ownerName || 'Project Owner';
      const ownerCollege = typeof project.owner === 'object'
        ? project.owner.college
        : project.ownerCollege || '';
      const ownerExists = project.teamMembers?.some(m => getMemberId(m) === String(ownerId));
      if (!ownerExists && ownerId) {
        allMembers.push({
          _id: ownerId,
          userId: ownerId,
          name: ownerName,
          college: ownerCollege,
          isOwner: true
        });
      }
    }
    if (project.teamMembers?.length > 0) {
      allMembers = [...allMembers, ...project.teamMembers.map(m => ({
        ...m,
        isOwner: m.role === 'owner' || getMemberId(m) === String(typeof project.owner === 'object' ? project.owner._id : project.owner)
      }))];
    }
    return allMembers;
  };

  const handleMemberClick = (memberId, e) => {
    if (window.getSelection().toString()) return;
    const currentUserId = String(user?._id || '');
    if (memberId && memberId !== currentUserId) {
      navigate(`/profile/${memberId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 text-gray-100 relative overflow-hidden">
      
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* ===== TOP BAR ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/70 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-colors font-medium 
                       px-4 py-2 rounded-xl hover:bg-gray-800/50"
            >
              <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
            </motion.button>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 hidden sm:inline">PROJECT DETAILS</span>
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* ===== CONTENT WRAPPER ===== */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">

        {/* ===== LEFT SIDE: Project Details ===== */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full lg:w-3/5 space-y-6"
        >
          {/* Project Header Card */}
          <div className="p-6 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl">
            
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
                <Briefcase size={12} /> {project.type || 'Project Opportunity'}
              </span>
              {isHiringClosed && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
                  <Lock size={12} /> Hiring Closed
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-700/50 text-gray-300 text-sm">
                <GraduationCap size={16} className="text-violet-400" />
                <span className="font-medium">{project.college}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-700/50 text-gray-300 text-sm">
                <Briefcase size={16} className="text-cyan-400" />
                <span className="font-medium">
                  Owner: {typeof project.owner === 'object' ? project.owner.name : project.ownerName || project.owner}
                </span>
              </div>
              {project.teamMembers?.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-700/50 text-gray-300 text-sm">
                  <Users size={16} className="text-emerald-400" />
                  <span className="font-medium">{project.teamMembers.length} Members</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-100 mb-3 flex items-center gap-2">
                <Sparkles className="text-violet-400" size={18} />
                About Project
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* 👥 Team Members Section */}
            <div className="mb-6 pb-6 border-b border-gray-700/50">
              <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Users size={16} className="text-emerald-400" />
                Team Members
              </h3>

              {(() => {
                const allMembers = getAllMembers();
                const currentUserId = String(user?._id || '');
                const otherMembers = allMembers.filter(member => getMemberId(member) !== currentUserId);

                if (allMembers.length === 0) {
                  return (
                    <p className="text-xs text-gray-500 italic pl-2 py-3 px-4 rounded-xl bg-gray-900/30 border border-gray-700/30">
                      No team members yet — be the first to join!
                    </p>
                  );
                }

                if (otherMembers.length === 0) {
                  return (
                    <p className="text-xs text-violet-300 italic pl-2 py-3 px-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                      {currentUserId ? "🎉 You are the only member!" : "👋 Login to join this project"}
                    </p>
                  );
                }

                return (
                  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                    {otherMembers.map((member, index) => {
                      const memberId = getMemberId(member);
                      const isMemberOwner = member.isOwner ||
                        memberId === String(typeof project.owner === 'object' ? project.owner._id : project.owner);

                      return (
                        <motion.div
                          key={memberId || index}
                          variants={itemVariants}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/30 border border-gray-700/50 
                                   hover:border-violet-500/30 transition-all cursor-pointer group"
                          onClick={(e) => handleMemberClick(memberId, e)}
                          title={`View ${member.name || 'Profile'}`}
                        >
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full 
                                          flex items-center justify-center text-white text-sm font-bold 
                                          shadow-lg group-hover:scale-105 transition-transform">
                              {(member.name?.charAt?.(0) || 'U').toUpperCase()}
                            </div>
                            {isMemberOwner && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full 
                                           flex items-center justify-center text-[10px] text-white border-2 border-gray-900" 
                                title="Project Owner">
                                👑
                              </span>
                            )}
                          </div>

                          {/* Member Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-100 truncate group-hover:text-violet-300 transition-colors flex items-center gap-2">
                              {member.name || 'Anonymous'}
                              {isMemberOwner && (
                                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-full border border-amber-500/30">
                                  Owner
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {member.college || 'College not specified'}
                            </p>
                          </div>

                          {/* Role Badge + Arrow */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase ${
                              isMemberOwner 
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {isMemberOwner ? 'Owner' : 'Member'}
                            </span>
                            <ChevronRight size={14} className="text-gray-500 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
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
              <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Code size={16} className="text-violet-400" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack && project.techStack.length > 0 ? (
                  project.techStack.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3.5 py-2 bg-gray-900/50 border border-gray-700/50 rounded-xl 
                               text-xs font-semibold text-gray-300 hover:border-violet-500/30 
                               hover:text-violet-300 transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs italic">No tech stack listed</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== RIGHT SIDE: Application Form / Status ===== */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full lg:w-2/5"
        >
          <div className="sticky top-24 p-6 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl">
            
            <AnimatePresence mode="wait">
              
              {/* 🔒 STATE: Hiring Closed */}
              {isHiringClosed && (
                <motion.div
                  key="closed"
                  variants={statusVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  className="text-center py-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-5">
                    <Lock size={36} className="text-rose-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-100 mb-2">Hiring Closed 🔒</h2>
                  <p className="text-gray-400 mb-6 text-sm px-2">
                    Applications for <br />
                    <span className="font-semibold text-violet-300">{project.title}</span> are now closed.
                  </p>

                  <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 mb-6 text-left">
                    <p className="text-xs text-gray-400 font-medium mb-2">📌 Project Status:</p>
                    <ul className="text-[10px] text-gray-500 space-y-1.5">
                      <li><strong className="text-gray-300">Closed On:</strong> {project.closedDate ? new Date(project.closedDate).toLocaleDateString() : 'N/A'}</li>
                      <li><strong className="text-gray-300">Team Size:</strong> {project.teamMembers?.length || 0} members</li>
                      <li><strong className="text-gray-300">Position:</strong> <span className="text-emerald-400">Filled</span></li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white 
                               font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all 
                               shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 text-sm"
                    >
                      Explore More Projects
                    </button>
                    {isTeamMember && (
                      <button
                        onClick={() => navigate(`/project/${project._id}/workspace`)}
                        className="w-full py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-gray-300 
                                 font-semibold hover:bg-gray-700 hover:border-violet-500/30 transition-all text-sm"
                      >
                        Open Workspace
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ✅ STATE: Already a Team Member */}
              {!isHiringClosed && isTeamMember && (
                <motion.div
                  key="member"
                  variants={statusVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  className="text-center py-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <UserCheck size={36} className="text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-100 mb-2">You're on the Team! 🎉</h2>
                  <p className="text-gray-400 mb-6 text-sm px-2">
                    You are already a member of <br />
                    <span className="font-semibold text-violet-300">{project.title}</span>.
                  </p>

                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="w-full py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-gray-300 
                               font-semibold hover:bg-gray-700 hover:border-violet-500/30 transition-all text-sm 
                               flex items-center justify-center gap-2"
                    >
                      <Briefcase size={16} /> Go to Dashboard
                    </button>
                    <button
                      onClick={() => navigate(`/project/${project._id}/workspace`)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white 
                               font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all 
                               shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 text-sm 
                               flex items-center justify-center gap-2"
                    >
                      <Code size={16} /> Open Workspace
                    </button>
                  </div>

                  <p className="text-[10px] text-gray-500">
                    Check your dashboard for project tasks and updates.
                  </p>
                </motion.div>
              )}

              {/* ⏳ STATE: Application Pending */}
              {!isHiringClosed && !isTeamMember && applicationStatus === 'pending' && (
                <motion.div
                  key="pending"
                  variants={statusVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  className="text-center py-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-5">
                    <Clock size={36} className="text-amber-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-100 mb-2">Application Pending</h2>
                  <p className="text-gray-400 mb-6 text-sm px-2">
                    Thanks <strong className="text-gray-200">{formData.name || user?.name}</strong>, your application for <br />
                    <span className="font-semibold text-violet-300">{project.title}</span> is under review.
                  </p>

                  <div className="bg-gray-900/50 border border-amber-500/20 rounded-xl p-4 mb-6 text-left">
                    <p className="text-xs text-amber-300 font-medium mb-2">📋 Application Summary:</p>
                    <ul className="text-[10px] text-gray-400 space-y-1.5">
                      <li><strong className="text-gray-300">College:</strong> {formData.college || 'N/A'}</li>
                      <li><strong className="text-gray-300">Passing Year:</strong> {formData.passingYear || 'N/A'}</li>
                      <li><strong className="text-gray-300">Skills:</strong> {formData.skills || 'N/A'}</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white 
                             font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all 
                             shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 text-sm"
                  >
                    Back to Dashboard
                  </button>

                  <p className="text-[10px] text-gray-500 mt-3">
                    You'll be notified once the project owner reviews your application.
                  </p>
                </motion.div>
              )}

              {/* ❌ STATE: Application Rejected */}
              {!isHiringClosed && !isTeamMember && applicationStatus === 'rejected' && (
                <motion.div
                  key="rejected"
                  variants={statusVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  className="text-center py-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-5">
                    <AlertCircle size={36} className="text-rose-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-100 mb-2">Application Not Selected</h2>
                  <p className="text-gray-400 mb-6 text-sm px-2">
                    Sorry, your application for <br />
                    <span className="font-semibold text-violet-300">{project.title}</span> was not selected this time.
                  </p>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white 
                             font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all 
                             shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 text-sm"
                  >
                    Explore More Projects
                  </button>
                </motion.div>
              )}

              {/* ✨ STATE: Not Applied - Show Form */}
              {!isHiringClosed && !isTeamMember && !applicationStatus && (
                <motion.div
                  key="form"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="py-2"
                >
                  <div className="mb-6 pb-4 border-b border-gray-700/50">
                    <h2 className="text-xl font-bold text-gray-100 mb-1">Join this Team</h2>
                    <p className="text-gray-400 text-xs">Fill in your details to apply.</p>
                  </div>

                  <form onSubmit={handleApplyClick} className="space-y-4">
                    {/* Name */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Rahul Sharma"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 
                                   focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                                   outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                                   hover:border-gray-600 disabled:opacity-50"
                          disabled={isApplying || hasApplied}
                        />
                        <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                      </div>
                    </motion.div>

                    {/* College & Year Row */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">College</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="college"
                            value={formData.college}
                            onChange={handleInputChange}
                            placeholder="IIT Delhi"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 
                                     focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                                     outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                                     hover:border-gray-600 disabled:opacity-50"
                            disabled={isApplying || hasApplied}
                          />
                          <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Passing Year</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="passingYear"
                            value={formData.passingYear}
                            onChange={handleInputChange}
                            placeholder="2025"
                            min="2024"
                            max="2030"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 
                                     focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                                     outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                                     hover:border-gray-600 disabled:opacity-50"
                            disabled={isApplying || hasApplied}
                          />
                          <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Your Skills</label>
                      <div className="relative">
                        <textarea
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          placeholder="React, Node.js, Python..."
                          rows="3"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 
                                   focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                                   outline-none transition-all duration-300 text-gray-100 placeholder-gray-500 resize-none
                                   hover:border-gray-600 disabled:opacity-50"
                          disabled={isApplying || hasApplied}
                        />
                        <Code size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                      </div>
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center gap-2"
                        >
                          <AlertCircle size={12} className="flex-shrink-0" /> {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                      <button
                        type="submit"
                        disabled={isApplying || hasApplied || isHiringClosed}
                        className={`w-full py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg transition-all 
                                  flex items-center justify-center gap-2 mt-2
                                  ${isApplying || hasApplied || isHiringClosed
                                    ? 'bg-gray-700/50 border border-gray-600/50 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/40'
                                  }`}
                      >
                        {isApplying ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            Sending...
                          </>
                        ) : hasApplied ? (
                          "Already Applied"
                        ) : isHiringClosed ? (
                          "Hiring Closed"
                        ) : (
                          <>
                            Submit Application
                            <ArrowLeft size={16} className="rotate-180" />
                          </>
                        )}
                      </button>
                    </motion.div>

                    <p className="text-[9px] text-center text-gray-500 mt-3">
                      By applying, you agree to share your details with the project owner.
                    </p>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      {/* Custom Scrollbar CSS for Dark Mode */}
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #4b5563; }
      `}</style>
    </div>
  );
};

export default ProjectDetails;