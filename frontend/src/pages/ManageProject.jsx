import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Code,
  Users,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Loader2,
  AlertCircle,
  Mail,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// ✅ Import toast utilities
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

const API = "http://localhost:5000";

const ManageProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  // ✅ REMOVED: const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`${API}/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setProject(res.data.project);
    } catch (err) {
      console.error(err);
      // ✅ Use toast utility instead of inline toast
      showError("Failed to load project");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // ✅ REMOVED: Local showToast function - using imported utilities instead

  const viewUserProfile = (userId) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  const handleAccept = async (userId) => {
    setActionLoading(userId);
    try {
      await axios.patch(`${API}/accept/${projectId}/${userId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      // ✅ Use toast utility
      showSuccess("Application accepted! 🎉");
      fetchProject();
    } catch (err) {
      console.error('Accept error:', err);
      // ✅ Use toast utility
      showError("Failed to accept application");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (userId) => {
    setActionLoading(userId);
    try {
      await axios.patch(`${API}/reject/${projectId}/${userId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      // ✅ Use toast utility
      showSuccess("Application rejected");
      fetchProject();
    } catch (err) {
      console.error('Reject error:', err);
      // ✅ Use toast utility
      showError("Failed to reject application");
    } finally {
      setActionLoading(null);
    }
  };

  // Toggle project status between 'open' and 'closed'
  const toggleProjectStatus = async () => {
    setActionLoading("toggle");
    
    // ✅ Show loading toast for async action
    const toastId = showLoading('Updating project status...');
    
    try {
      const newStatus = project.status === 'Open' ? 'Closed' : 'Open';

      await axios.put(`${API}/toggle-hiring/${project._id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      // ✅ Update toast based on result
      const message = newStatus === 'Closed' 
        ? "Project closed for applications 🔒" 
        : "Project opened for applications! 🚀";
      
      updateToastSuccess(toastId, message);
      
      fetchProject();
    } catch (err) {
      console.error(err);
      // ✅ Update toast to error
      updateToastError(toastId, "Failed to update project status");
    } finally {
      setActionLoading(null);
    }
  };

  // Helper: Check if project is open
  const isProjectOpen = project?.status === 'Open';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const statusVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-14 h-14 rounded-full border-4 border-violet-500/20 border-t-violet-500" />
          <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-r-cyan-500 animate-spin" style={{ animationDuration: '0.8s' }} />
        </motion.div>
      </div>
    );
  }

  // Not Found State
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

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500 hidden sm:inline">MANAGE PROJECT</span>

              {/* Status Toggle Button */}
              <motion.button
                whileHover={{ scale: actionLoading === "toggle" ? 1 : 1.02 }}
                whileTap={{ scale: actionLoading === "toggle" ? 1 : 0.98 }}
                onClick={toggleProjectStatus}
                disabled={actionLoading === "toggle"}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all shadow-lg
                  ${isProjectOpen
                    ? "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-500/25"
                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25"
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {actionLoading === "toggle" ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : isProjectOpen ? (
                  <Lock size={14} />
                ) : (
                  <Unlock size={14} />
                )}
                {isProjectOpen ? "Close Hiring" : "Open Hiring"}
              </motion.button>
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
            
            {/* Type Badge + Status */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
                <Briefcase size={12} /> {project.type || 'Project'}
              </span>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                isProjectOpen 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
              }`}>
                {isProjectOpen ? <Unlock size={12} /> : <Lock size={12} />}
                {isProjectOpen ? 'Accepting Applications' : 'Hiring Closed'}
              </div>
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
                <span className="font-medium">Owner: {project.owner}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-gray-100 mb-3 flex items-center gap-2">
                <Sparkles className="text-violet-400" size={18} />
                About Project
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="mb-6 pb-6 border-b border-gray-700/50">
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

            {/* 👥 Team Members Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Users size={16} className="text-emerald-400" />
                Team Members ({project.teamMembers?.length || 0})
              </h3>

              {project.teamMembers?.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3 max-h-56 overflow-y-auto pr-1 custom-scrollbar"
                >
                  {project.teamMembers.map((member, i) => (
                    <motion.div
                      key={member._id || i}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      className="p-4 rounded-xl bg-gray-900/30 border border-gray-700/50 
                               hover:border-emerald-500/30 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div 
                          onClick={() => viewUserProfile(member.userId || member._id)}
                          className="relative w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full 
                                   flex items-center justify-center text-white text-sm font-bold 
                                   shadow-lg cursor-pointer hover:scale-105 transition-transform"
                          title="View Profile"
                        >
                          {member.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        
                        {/* Member Info */}
                        <div>
                          <p 
                            onClick={() => viewUserProfile(member.userId || member._id)}
                            className="font-semibold text-sm text-gray-100 cursor-pointer hover:text-violet-300 transition-colors"
                          >
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <GraduationCap size={12} className="text-violet-400" /> {member.college}
                          </p>
                        </div>
                      </div>
                      
                      <CheckCircle className="text-emerald-400 flex-shrink-0" size={18} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-gray-500 text-xs italic pl-2 py-3 px-4 rounded-xl bg-gray-900/30 border border-gray-700/30">
                  No team members yet — accept applicants to build your team!
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* ===== RIGHT SIDE: Applicants Management ===== */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full lg:w-2/5"
        >
          <div className="sticky top-24 p-6 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl">
            
            {/* Header */}
            <div className="mb-6 pb-4 border-b border-gray-700/50">
              <h2 className="text-xl font-bold text-gray-100 mb-1">Applicants</h2>
              <p className="text-gray-400 text-xs">
                {project.applicants?.length || 0} application{project.applicants?.length !== 1 ? 's' : ''} received
              </p>
            </div>

            <AnimatePresence mode="wait">
              {project.applicants?.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 custom-scrollbar"
                >
                  {project.applicants.map((app, index) => (
                    <motion.div
                      key={app._id}
                      variants={itemVariants}
                      layout
                      className="p-5 rounded-2xl bg-gray-900/30 border border-gray-700/50 
                               hover:border-violet-500/30 transition-all duration-300"
                    >
                      {/* Applicant Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div
                            onClick={() => viewUserProfile(app.userId)}
                            className="w-11 h-11 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full 
                                     flex items-center justify-center text-white font-bold text-sm 
                                     shadow-lg cursor-pointer hover:scale-105 transition-transform"
                            title="View Profile"
                          >
                            {app.name?.charAt(0)?.toUpperCase() || 'A'}
                          </div>
                          
                          {/* Info */}
                          <div>
                            <h3
                              onClick={() => viewUserProfile(app.userId)}
                              className="font-semibold text-gray-100 cursor-pointer hover:text-violet-300 transition-colors flex items-center gap-1.5"
                            >
                              {app.name}
                              <ExternalLink size={12} className="text-gray-500" />
                            </h3>
                            <p className="text-xs text-gray-400 flex items-center gap-2">
                              <span className="flex items-center gap-1">
                                <GraduationCap size={12} className="text-violet-400" /> {app.college}
                              </span>
                              <span className="w-1 h-1 bg-gray-600 rounded-full" />
                              <span>Class of {app.passingYear}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Skills & Email */}
                      <div className="mb-4 space-y-2">
                        <p className="text-xs text-gray-400">
                          <span className="text-gray-300 font-medium">Skills:</span>{' '}
                          <span className="text-gray-300">{app.skills}</span>
                        </p>
                        {app.email && (
                          <p className="text-xs text-gray-400 flex items-center gap-1.5">
                            <Mail size={12} className="text-cyan-400" /> 
                            <span className="text-gray-300">{app.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2.5" onClick={(e) => e.stopPropagation()}>
                        <motion.button
                          whileHover={{ scale: actionLoading === app.userId ? 1 : 1.02 }}
                          whileTap={{ scale: actionLoading === app.userId ? 1 : 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(app.userId);
                          }}
                          disabled={actionLoading === app.userId}
                          className={`flex-1 py-2.5 rounded-xl font-semibold text-xs text-white shadow-lg transition-all 
                                    flex items-center justify-center gap-1.5
                                    ${actionLoading === app.userId
                                      ? 'bg-gray-700/50 border border-gray-600/50 text-gray-400 cursor-not-allowed'
                                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25 hover:shadow-emerald-500/40'
                                    }`}
                        >
                          {actionLoading === app.userId ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <CheckCircle size={14} />
                          )}
                          Accept
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: actionLoading === app.userId ? 1 : 1.02 }}
                          whileTap={{ scale: actionLoading === app.userId ? 1 : 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(app.userId);
                          }}
                          disabled={actionLoading === app.userId}
                          className={`flex-1 py-2.5 rounded-xl font-semibold text-xs text-white shadow-lg transition-all 
                                    flex items-center justify-center gap-1.5
                                    ${actionLoading === app.userId
                                      ? 'bg-gray-700/50 border border-gray-600/50 text-gray-400 cursor-not-allowed'
                                      : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-rose-500/25 hover:shadow-rose-500/40'
                                    }`}
                        >
                          <XCircle size={14} /> Reject
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  variants={statusVariants}
                  initial="initial"
                  animate="animate"
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-700/50 border border-gray-600/50 flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-300 text-sm font-medium mb-1">No applicants yet</p>
                  <p className="text-gray-500 text-xs">
                    {isProjectOpen 
                      ? "Share the project link to start receiving applications" 
                      : "Open hiring to start accepting applications"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warning Note */}
            <p className="text-[10px] text-center text-gray-500 mt-5 pt-4 border-t border-gray-700/50">
              ⚠️ Actions are irreversible. Review applications carefully before deciding.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ✅ REMOVED: Inline Toast Notification Block - react-hot-toast handles this globally via <Toaster /> in App.js */}

      {/* Custom Scrollbar CSS for Dark Mode */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #374151 transparent; }
      `}</style>
    </div>
  );
};

export default ManageProject;