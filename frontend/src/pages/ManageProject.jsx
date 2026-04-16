import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft, Briefcase, GraduationCap, Code, Users, CheckCircle,
  XCircle, Lock, Unlock, Loader2, AlertCircle, Mail, ExternalLink,
  Sparkles, ChevronRight, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

const API = "http://localhost:5000";

const ManageProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

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

  const isProjectOpen = project?.status === 'Open';

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
  const statusVariants = { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } }, exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } } };

  // Loading State - Warm Theme
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-amber-200 border-t-amber-500" />
          <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" style={{ animationDuration: '0.8s' }} />
        </motion.div>
      </div>
    );
  }

  // Not Found State - Warm Theme
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex flex-col items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto mb-6">
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

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 text-stone-900 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-amber-300/40 via-orange-300/30 to-rose-300/40 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-orange-300/40 via-rose-300/30 to-red-300/30 rounded-full blur-3xl" />
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

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-stone-500 hidden sm:inline">MANAGE PROJECT</span>
              {/* Status Toggle Button - Warm */}
              <motion.button whileHover={{ scale: actionLoading === "toggle" ? 1 : 1.02 }} whileTap={{ scale: actionLoading === "toggle" ? 1 : 0.98 }}
                onClick={toggleProjectStatus} disabled={actionLoading === "toggle"}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold transition-all shadow-md
                  ${isProjectOpen ? "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white shadow-rose-200/60" : "bg-gradient-to-r from-amber-600 via-orange-600 to-teal-600 hover:from-amber-700 hover:via-orange-700 hover:to-teal-700 text-white shadow-amber-200/60"} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                {actionLoading === "toggle" ? <Loader2 className="animate-spin" size={14} /> : isProjectOpen ? <Lock size={14} /> : <Unlock size={14} />}
                {isProjectOpen ? "Close Hiring" : "Open Hiring"}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* 📐 CONTENT WRAPPER - Warm Theme */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">

        {/* ← LEFT SIDE: Project Details */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="w-full lg:w-3/5 space-y-6">
          {/* Project Header Card - Warm */}
          <div className="p-6 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50">
            
            {/* Type Badge + Status - Warm */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold">
                <Briefcase size={12} /> {project.type || 'Project'}
              </span>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${isProjectOpen ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'bg-rose-100 border-rose-200 text-rose-800'}`}>
                {isProjectOpen ? <Unlock size={12} /> : <Lock size={12} />}
                {isProjectOpen ? 'Accepting Applications' : 'Hiring Closed'}
              </div>
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
                <span className="font-medium">Owner: {project.owner}</span>
              </div>
            </div>

            {/* Description - Warm */}
            <div className="mb-6 pb-6 border-b border-amber-200">
              <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                <Sparkles className="text-amber-600" size={18} /> About Project
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* Tech Stack - Warm Tags */}
            <div className="mb-6 pb-6 border-b border-amber-200">
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

            {/* 👥 Team Members Section - Warm */}
            <div>
              <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Users size={16} className="text-emerald-600" /> Team Members ({project.teamMembers?.length || 0})
              </h3>
              {project.teamMembers?.length > 0 ? (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 max-h-56 overflow-y-auto pr-1 custom-scrollbar-light">
                  {project.teamMembers.map((member, i) => (
                    <motion.div key={member._id || i} variants={itemVariants} whileHover={{ x: 4 }}
                      className="p-4 rounded-xl bg-white/70 border border-amber-200 hover:border-amber-400 transition-all flex items-center justify-between group shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar - Warm Gradient */}
                        <div onClick={() => viewUserProfile(member.userId || member._id)}
                          className="relative w-10 h-10 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md cursor-pointer hover:scale-105 transition-transform border-2 border-white"
                          title="View Profile"
                        >{member.name?.charAt(0)?.toUpperCase() || 'U'}</div>
                        {/* Member Info - Warm */}
                        <div>
                          <p onClick={() => viewUserProfile(member.userId || member._id)}
                            className="font-semibold text-sm text-stone-900 cursor-pointer hover:text-amber-700 transition-colors">{member.name}</p>
                          <p className="text-xs text-stone-600 flex items-center gap-1">
                            <GraduationCap size={12} className="text-amber-600" /> {member.college}
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="text-emerald-600 flex-shrink-0" size={18} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-stone-600 text-xs italic pl-2 py-3 px-4 rounded-xl bg-white/70 border border-amber-200 shadow-sm">
                  No team members yet — accept applicants to build your team!
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* → RIGHT SIDE: Applicants Management - Warm Theme */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="w-full lg:w-2/5">
          <div className="sticky top-24 p-6 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50">
            
            {/* Header - Warm */}
            <div className="mb-6 pb-4 border-b border-amber-200">
              <h2 className="text-xl font-bold text-stone-900 mb-1">Applicants</h2>
              <p className="text-stone-600 text-xs">{project.applicants?.length || 0} application{project.applicants?.length !== 1 ? 's' : ''} received</p>
            </div>

            <AnimatePresence mode="wait">
              {project.applicants?.length > 0 ? (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 custom-scrollbar-light">
                  {project.applicants.map((app, index) => (
                    <motion.div key={app._id} variants={itemVariants} layout
                      className="p-5 rounded-2xl bg-white/70 border border-amber-200 hover:border-amber-400 transition-all duration-300 shadow-sm"
                    >
                      {/* Applicant Header - Warm */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar - Warm Gradient */}
                          <div onClick={() => viewUserProfile(app.userId)}
                            className="w-11 h-11 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform border-2 border-white"
                            title="View Profile"
                          >{app.name?.charAt(0)?.toUpperCase() || 'A'}</div>
                          {/* Info - Warm */}
                          <div>
                            <h3 onClick={() => viewUserProfile(app.userId)}
                              className="font-semibold text-stone-900 cursor-pointer hover:text-amber-700 transition-colors flex items-center gap-1.5">
                              {app.name}<ExternalLink size={12} className="text-stone-400" />
                            </h3>
                            <p className="text-xs text-stone-600 flex items-center gap-2">
                              <span className="flex items-center gap-1"><GraduationCap size={12} className="text-amber-600" /> {app.college}</span>
                              <span className="w-1 h-1 bg-stone-300 rounded-full" />
                              <span>Class of {app.passingYear}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Skills & Email - Warm */}
                      <div className="mb-4 space-y-2">
                        <p className="text-xs text-stone-600"><span className="text-stone-700 font-medium">Skills:</span> <span className="text-stone-700">{app.skills}</span></p>
                        {app.email && (
                          <p className="text-xs text-stone-600 flex items-center gap-1.5">
                            <Mail size={12} className="text-orange-600" /> <span className="text-stone-700">{app.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Action Buttons - Warm */}
                      <div className="flex gap-2.5" onClick={(e) => e.stopPropagation()}>
                        <motion.button whileHover={{ scale: actionLoading === app.userId ? 1 : 1.02 }} whileTap={{ scale: actionLoading === app.userId ? 1 : 0.98 }}
                          onClick={(e) => { e.stopPropagation(); handleAccept(app.userId); }} disabled={actionLoading === app.userId}
                          className={`flex-1 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all flex items-center justify-center gap-1.5
                            ${actionLoading === app.userId ? 'bg-stone-200 border border-stone-300 text-stone-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-emerald-200/60 hover:shadow-emerald-300/70'}`}
                        >
                          {actionLoading === app.userId ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle size={14} />} Accept
                        </motion.button>
                        <motion.button whileHover={{ scale: actionLoading === app.userId ? 1 : 1.02 }} whileTap={{ scale: actionLoading === app.userId ? 1 : 0.98 }}
                          onClick={(e) => { e.stopPropagation(); handleReject(app.userId); }} disabled={actionLoading === app.userId}
                          className={`flex-1 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all flex items-center justify-center gap-1.5
                            ${actionLoading === app.userId ? 'bg-stone-200 border border-stone-300 text-stone-500 cursor-not-allowed' : 'bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 shadow-rose-200/60 hover:shadow-rose-300/70'}`}
                        >
                          <XCircle size={14} /> Reject
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={statusVariants} initial="initial" animate="animate" className="text-center py-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/70 border border-amber-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Users size={24} className="text-stone-400" />
                  </div>
                  <p className="text-stone-700 text-sm font-medium mb-1">No applicants yet</p>
                  <p className="text-stone-600 text-xs">{isProjectOpen ? "Share the project link to start receiving applications" : "Open hiring to start accepting applications"}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warning Note - Warm */}
            <p className="text-[10px] text-center text-stone-500 mt-5 pt-4 border-t border-amber-200">
              ⚠️ Actions are irreversible. Review applications carefully before deciding.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar CSS for Warm Light Mode */}
      <style>{`
        .custom-scrollbar-light::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-light::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: #fcd34d; border-radius: 3px; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
        .custom-scrollbar-light { scrollbar-width: thin; scrollbar-color: #fcd34d transparent; }
      `}</style>
    </div>
  );
};

export default ManageProject;