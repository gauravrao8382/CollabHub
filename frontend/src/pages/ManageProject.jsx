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
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API = "http://localhost:5000";

const ManageProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [toast, setToast] = useState(null);

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
      showToast("Failed to load project", "error");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
      showToast("Application accepted!", "success");
      fetchProject();
    } catch {
      showToast("Failed to accept application", "error");
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
      showToast("Application rejected", "success");
      fetchProject();
    } catch {
      showToast("Failed to reject application", "error");
    } finally {
      setActionLoading(null);
    }
  };

  // ✅ Toggle project status between 'open' and 'closed'
  const toggleProjectStatus = async () => {
    try {
      const newStatus = project.status === 'Open' ? 'Closed' : 'Open';
      
      await axios.put(`${API}/toggle-hiring/${project._id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      
      showToast(newStatus === 'Closed' ? "Project closed for applications" : "Project opened for applications!", "success");
      fetchProject();
    } catch (err) {
      console.error(err);
      showToast("Failed to update project status", "error");
    }
  };

  // ✅ Helper: Check if project is open
  const isProjectOpen = project?.status === 'Open';

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600"/>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Project not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 font-semibold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 flex flex-col lg:h-screen lg:overflow-hidden min-h-screen">
      
      {/* TOP BAR */}
      <div className="flex-none h-16 border-b border-gray-200 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-20 sticky top-0 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </button>
        
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 hidden sm:inline-block">MANAGE PROJECT</span>
          
          {/* ✅ Status-based Toggle Button */}
          <button
            onClick={toggleProjectStatus}
            disabled={actionLoading === "toggle"}
            className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-semibold transition-all shadow-md ${
              isProjectOpen 
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-red-400 disabled:to-red-500" 
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-400 disabled:to-green-500"
            } disabled:cursor-not-allowed`}
          >
            {actionLoading === "toggle" ? (
              <Loader2 className="animate-spin" size={16}/>
            ) : isProjectOpen ? (
              <Lock size={16}/>
            ) : (
              <Unlock size={16}/>
            )}
            {isProjectOpen ? "Close Project" : "Open Project"}
          </button>
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="flex flex-col lg:flex-row flex-1 w-full max-w-[1920px] mx-auto min-h-0">
        
        {/* LEFT SIDE: Project Details */}
        <div className="w-full lg:w-3/5 lg:h-full lg:overflow-hidden flex flex-col bg-gradient-to-br from-white to-gray-50 lg:border-r border-gray-100 relative">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 lg:p-10">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
                {project.type || 'Project'}
              </span>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 text-gray-600 text-sm">
                  <GraduationCap size={16} className="text-purple-500" />
                  <span className="font-semibold">{project.college}</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 text-gray-600 text-sm">
                  <Briefcase size={16} className="text-blue-500" />
                  <span className="font-semibold">Owner: {project.owner}</span>
                </div>
                
                {/* ✅ Status Badge based on project.status */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm border text-sm font-semibold ${
                  isProjectOpen 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  {isProjectOpen ? <Unlock size={16}/> : <Lock size={16}/>}
                  {isProjectOpen ? 'Accepting Applications' : 'Hiring Closed'}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">About Project</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Code size={16} className="text-indigo-600" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack && project.techStack.length > 0 ? (
                    project.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs italic">No tech stack listed</span>
                  )}
                </div>
              </div>
              
              {/* 👥 TEAM MEMBERS Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Users size={16} className="text-emerald-600" />
                  Team Members ({project.teamMembers?.length || 0})
                </h3>
                
                {project.teamMembers?.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                    {project.teamMembers.map((member, i) => (
                      <motion.div 
                        key={member._id || i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            onClick={() => viewUserProfile(member.userId || member._id)}
                            className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all"
                            title="View Profile"
                          >
                            {member.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p 
                              onClick={() => viewUserProfile(member.userId || member._id)}
                              className="font-semibold text-sm text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors"
                            >
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <GraduationCap size={10}/> {member.college}
                            </p>
                          </div>
                        </div>
                        <CheckCircle className="text-green-500" size={18}/>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs italic pl-1">No team members yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Applicants Management */}
        <div className="w-full lg:w-2/5 lg:h-full lg:overflow-hidden flex flex-col bg-white relative lg:shadow-xl z-10">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 lg:p-10">
            
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Applicants</h2>
              <p className="text-gray-500 text-xs">
                {project.applicants?.length || 0} application{project.applicants?.length !== 1 ? 's' : ''} received
              </p>
            </div>

            <AnimatePresence mode="wait">
              {project.applicants?.length > 0 ? (
                <div className="space-y-3">
                  {project.applicants.map((app, index) => (
                    <motion.div 
                      key={app._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.03 }}
                      className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            onClick={() => viewUserProfile(app.userId)}
                            className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all"
                            title="View Profile"
                          >
                            {app.name?.charAt(0)?.toUpperCase() || 'A'}
                          </div>
                          <div>
                            <h3 
                              onClick={() => viewUserProfile(app.userId)}
                              className="font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors flex items-center gap-1"
                            >
                              {app.name}
                              <ExternalLink size={12} className="text-gray-400"/>
                            </h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <GraduationCap size={12}/> {app.college} • {app.passingYear}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold text-gray-700">Skills:</span> {app.skills}
                        </p>
                        {app.email && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Mail size={10}/> {app.email}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(app.userId);
                          }}
                          disabled={actionLoading === app.userId}
                          className={`flex-1 py-2 rounded-lg font-semibold text-xs text-white shadow-sm transition-all flex items-center justify-center gap-1 ${
                            actionLoading === app.userId
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                          }`}
                        >
                          {actionLoading === app.userId ? (
                            <Loader2 className="animate-spin" size={14}/>
                          ) : (
                            <CheckCircle size={14}/>
                          )}
                          Accept
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(app.userId);
                          }}
                          disabled={actionLoading === app.userId}
                          className={`flex-1 py-2 rounded-lg font-semibold text-xs text-white shadow-sm transition-all flex items-center justify-center gap-1 ${
                            actionLoading === app.userId
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
                          }`}
                        >
                          <XCircle size={14}/> Reject
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-gray-400"/>
                  </div>
                  <p className="text-gray-500 text-sm">No applicants yet</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {isProjectOpen ? "Share the project link to get applications" : "Open the project to start accepting applications"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <p className="text-[9px] text-center text-gray-400 mt-4 pt-4 border-t border-gray-100">
              Actions are irreversible. Review applications carefully.
            </p>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 text-sm font-medium ${
              toast.type === 'error' 
                ? 'bg-red-500 text-white' 
                : 'bg-green-500 text-white'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle size={16}/> : <CheckCircle size={16}/>}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 10px;
          transition: background-color 0.2s ease;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #cbd5e1;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }
        .custom-scrollbar:hover {
          scrollbar-color: #e2e8f0 transparent;
        }
      `}</style>
    </div>
  );
};

export default ManageProject;