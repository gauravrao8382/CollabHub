import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft, Briefcase, GraduationCap, Code, Users, CheckCircle,
  XCircle, Lock, Unlock, Loader2, AlertCircle, Mail, ExternalLink,
  Sparkles, ChevronRight, Shield, Flag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

const API = "https://collabhub-f4t3.onrender.com";

const ManageProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [projectId]);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => { fetchProject(); }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`${API}/project/${projectId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProject(res.data.project);
    } catch (err) {
      console.error(err);
      showError("Failed to load project");
      navigate("/dashboard");
    } finally { setLoading(false); }
  };

  const viewUserProfile = (userId) => { if (userId) navigate(`/profile/${userId}`); };

  const handleAccept = async (userId) => {
    setActionLoading(userId);
    try {
      await axios.patch(`${API}/accept/${projectId}/${userId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      showSuccess("Application accepted! 🎉");
      fetchProject();
    } catch (err) {
      console.error('Accept error:', err);
      showError("Failed to accept application");
    } finally { setActionLoading(null); }
  };

  const handleReject = async (userId) => {
    setActionLoading(userId);
    try {
      await axios.patch(`${API}/reject/${projectId}/${userId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      showSuccess("Application rejected");
      fetchProject();
    } catch (err) {
      console.error('Reject error:', err);
      showError("Failed to reject application");
    } finally { setActionLoading(null); }
  };

  const toggleProjectStatus = async () => {
    setActionLoading("toggle");
    const toastId = showLoading('Updating project status...');
    try {
      const newStatus = project.status === 'Open' ? 'Closed' : 'Open';
      await axios.put(`${API}/toggle-hiring/${project._id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const message = newStatus === 'Closed' ? "Project closed for applications 🔒" : "Project opened for applications! 🚀";
      updateToastSuccess(toastId, message);
      fetchProject();
    } catch (err) {
      console.error(err);
      updateToastError(toastId, "Failed to update project status");
    } finally { setActionLoading(null); }
  };

  const handleReadyForCompletion = () => {
      navigate(`/complete/${project._id}`);
  };

  const isProjectOpen = project?.status === 'Open';
  const canMarkComplete = project?.teamMembers?.length > 0;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
  const statusVariants = { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } }, exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } } };

  // Loading State - Clean Theme
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-violet-500" />
        </motion.div>
      </div>
    );
  }

  // Not Found State - Clean Theme
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Project not found</h2>
          <p className="text-slate-500 mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} 
            className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-sm flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    // 🎨 Clean Slate Background - No Gradients
    <div className="min-h-screen bg-slate-50 text-slate-900 relative">

      {/* 🔗 TOP BAR - Clean Theme */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button whileHover={{ scale: 1.02, x: -2 }} whileTap={{ scale: 0.98 }} onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-violet-700 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-violet-50"
            >
              <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
            </motion.button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">MANAGE PROJECT</span>
              {/* Status Toggle Button - Clean */}
              <motion.button whileHover={{ scale: actionLoading === "toggle" ? 1 : 1.02 }} whileTap={{ scale: actionLoading === "toggle" ? 1 : 0.98 }}
                onClick={toggleProjectStatus} disabled={actionLoading === "toggle"}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-medium transition-all shadow-sm
                  ${isProjectOpen 
                    ? "bg-rose-600 hover:bg-rose-700 text-white" 
                    : "bg-violet-600 hover:bg-violet-700 text-white"} 
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {actionLoading === "toggle" ? <Loader2 className="animate-spin" size={14} /> : isProjectOpen ? <Lock size={14} /> : <Unlock size={14} />}
                {isProjectOpen ? "Close Hiring" : "Open Hiring"}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* 📐 CONTENT WRAPPER - Clean Theme */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">

        {/* ← LEFT SIDE: Project Details (Scrollable) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.4 }} 
          className="w-full lg:w-3/5"
        >
          <div className="max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-6 pb-6">
              {/* Project Header Card - Clean */}
              <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm">
                
                {/* Type Badge + Status + Ready for Completion Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  {/* Left: Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-medium">
                      <Briefcase size={12} /> {project.type || 'Project'}
                    </span>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${isProjectOpen ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                      {isProjectOpen ? <Unlock size={12} /> : <Lock size={12} />}
                      {isProjectOpen ? 'Accepting Applications' : 'Hiring Closed'}
                    </div>
                  </div>
                  
                  {/* Right: Ready for Completion Button */}
                  <motion.button
                    whileHover={{ scale: canMarkComplete ? 1.05 : 1 }}
                    whileTap={{ scale: canMarkComplete ? 0.95 : 1 }}
                    onClick={handleReadyForCompletion}
                    disabled={!canMarkComplete}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm
                      ${canMarkComplete
                        ? 'bg-violet-600 hover:bg-violet-700 text-white'
                        : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    title={canMarkComplete ? "Mark project as ready for completion" : "Add team members first"}
                  >
                    <Flag size={12} />
                    Ready for Completion
                    <ChevronRight size={10} />
                  </motion.button>
                </div>

                {/* Title - Solid Color */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 leading-tight">
                  {project.title}
                </h1>

                {/* Meta Info - Clean */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                    <GraduationCap size={16} className="text-violet-600" />
                    <span className="font-medium">{project.college}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                    <Briefcase size={16} className="text-fuchsia-600" />
                    <span className="font-medium">Owner: {project.owner}</span>
                  </div>
                </div>

                {/* Description - Clean */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Sparkles className="text-violet-600" size={18} /> About Project
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Tech Stack - Clean Tags */}
                <div className="mb-6 pb-6 border-b border-slate-200">
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

                {/* 👥 Team Members Section - Clean */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                    <Users size={16} className="text-emerald-600" /> Team Members ({project.teamMembers?.length || 0})
                  </h3>
                  {project.teamMembers?.length > 0 ? (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 max-h-56 overflow-y-auto pr-1 custom-scrollbar-light">
                      {project.teamMembers.map((member, i) => (
                        <motion.div key={member._id || i} variants={itemVariants} whileHover={{ x: 4 }}
                          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-violet-300 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-4">
                            {/* Avatar - Solid Violet */}
                            <div onClick={() => viewUserProfile(member.userId || member._id)}
                              className="relative w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:bg-violet-700 transition-colors border-2 border-white"
                              title="View Profile"
                            >{member.name?.charAt(0)?.toUpperCase() || 'U'}</div>
                            {/* Member Info - Clean */}
                            <div>
                              <p onClick={() => viewUserProfile(member.userId || member._id)}
                                className="font-semibold text-sm text-slate-800 cursor-pointer hover:text-violet-700 transition-colors">{member.name}</p>
                              <p className="text-xs text-slate-500 flex items-center gap-1">
                                <GraduationCap size={12} className="text-violet-600" /> {member.college}
                              </p>
                            </div>
                          </div>
                          <CheckCircle className="text-emerald-600 flex-shrink-0" size={18} />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-slate-500 text-xs italic pl-2 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200">
                      No team members yet — accept applicants to build your team!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* → RIGHT SIDE: Applicants Management - Clean Theme (Sticky) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.4, delay: 0.1 }} 
          className="w-full lg:w-2/5"
        >
          <div className="sticky top-24 lg:top-28 p-6 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            
            {/* Header - Clean */}
            <div className="mb-6 pb-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Applicants</h2>
              <p className="text-slate-500 text-xs">{project.applicants?.length || 0} application{project.applicants?.length !== 1 ? 's' : ''} received</p>
            </div>

            <AnimatePresence mode="wait">
              {project.applicants?.length > 0 ? (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                  {project.applicants.map((app, index) => (
                    <motion.div key={app._id} variants={itemVariants} layout
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-violet-300 transition-all duration-300"
                    >
                      {/* Applicant Header - Clean */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar - Solid Violet */}
                          <div onClick={() => viewUserProfile(app.userId)}
                            className="w-11 h-11 bg-violet-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:bg-violet-700 transition-colors border-2 border-white"
                            title="View Profile"
                          >{app.name?.charAt(0)?.toUpperCase() || 'A'}</div>
                          {/* Info - Clean */}
                          <div>
                            <h3 onClick={() => viewUserProfile(app.userId)}
                              className="font-semibold text-slate-800 cursor-pointer hover:text-violet-700 transition-colors flex items-center gap-1.5">
                              {app.name}<ExternalLink size={12} className="text-slate-400" />
                            </h3>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                              <span className="flex items-center gap-1"><GraduationCap size={12} className="text-violet-600" /> {app.college}</span>
                              <span className="w-1 h-1 bg-slate-300 rounded-full" />
                              <span>Class of {app.passingYear}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Skills & Email - Clean */}
                      <div className="mb-4 space-y-2">
                        <p className="text-xs text-slate-600"><span className="text-slate-700 font-medium">Skills:</span> <span className="text-slate-700">{app.skills}</span></p>
                        {app.email && (
                          <p className="text-xs text-slate-600 flex items-center gap-1.5">
                            <Mail size={12} className="text-violet-600" /> <span className="text-slate-700">{app.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Action Buttons - Clean */}
                      <div className="flex gap-2.5" onClick={(e) => e.stopPropagation()}>
                        <motion.button whileHover={{ scale: actionLoading === app.userId ? 1 : 1.02 }} whileTap={{ scale: actionLoading === app.userId ? 1 : 0.98 }}
                          onClick={(e) => { e.stopPropagation(); handleAccept(app.userId); }} disabled={actionLoading === app.userId}
                          className={`flex-1 py-2.5 rounded-xl font-medium text-xs text-white shadow-sm transition-all flex items-center justify-center gap-1.5
                            ${actionLoading === app.userId 
                              ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed' 
                              : 'bg-emerald-600 hover:bg-emerald-700'}`}
                        >
                          {actionLoading === app.userId ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle size={14} />} Accept
                        </motion.button>
                        <motion.button whileHover={{ scale: actionLoading === app.userId ? 1 : 1.02 }} whileTap={{ scale: actionLoading === app.userId ? 1 : 0.98 }}
                          onClick={(e) => { e.stopPropagation(); handleReject(app.userId); }} disabled={actionLoading === app.userId}
                          className={`flex-1 py-2.5 rounded-xl font-medium text-xs text-white shadow-sm transition-all flex items-center justify-center gap-1.5
                            ${actionLoading === app.userId 
                              ? 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed' 
                              : 'bg-rose-600 hover:bg-rose-700'}`}
                        >
                          <XCircle size={14} /> Reject
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={statusVariants} initial="initial" animate="animate" className="text-center py-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-slate-400" />
                  </div>
                  <p className="text-slate-700 text-sm font-medium mb-1">No applicants yet</p>
                  <p className="text-slate-500 text-xs">{isProjectOpen ? "Share the project link to start receiving applications" : "Open hiring to start accepting applications"}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warning Note - Clean */}
            <p className="text-[10px] text-center text-slate-500 mt-5 pt-4 border-t border-slate-200">
              ⚠️ Actions are irreversible. Review applications carefully before deciding.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ✨ Custom Scrollbar CSS - Clean Theme */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
        
        .custom-scrollbar-light::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-light::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .custom-scrollbar-light { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
      `}</style>
    </div>
  );
};

export default ManageProject;