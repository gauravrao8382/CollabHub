// pages/ProjectCompletion.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft, Flag, CheckCircle, Loader2, AlertCircle, ExternalLink,
  Github, Globe, Users, Briefcase, GraduationCap, Link2, FileText,
  Video, BookOpen, Shield, Sparkles, ChevronRight, Info
} from "lucide-react";
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError } from '../utils/toast';

const API = "http://localhost:5000";

const ProjectCompletion = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    liveLink: '',
    githubLink: '',
    demoVideoLink: '',
    documentationLink: '',
    finalNotes: '',
    checklist: {
      codeReviewed: false,
      tested: false,
      documented: false,
      deployed: false
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!projectId) {
      showError("Invalid project ID");
      navigate("/dashboard");
      return;
    }
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(`${API}/project/${projectId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setProject(res.data.project);
    } catch (err) {
      console.error(err);
      showError("Failed to load project details");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // URL Validation Helper
  const isValidUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.liveLink.trim()) {
      newErrors.liveLink = "Live link is required";
    } else if (!isValidUrl(formData.liveLink)) {
      newErrors.liveLink = "Please enter a valid URL (https://...)";
    }
    
    if (!formData.githubLink.trim()) {
      newErrors.githubLink = "GitHub link is required";
    } else if (!isValidUrl(formData.githubLink)) {
      newErrors.githubLink = "Please enter a valid GitHub URL";
    }
    
    if (formData.demoVideoLink && !isValidUrl(formData.demoVideoLink)) {
      newErrors.demoVideoLink = "Please enter a valid video URL";
    }
    
    if (formData.documentationLink && !isValidUrl(formData.documentationLink)) {
      newErrors.documentationLink = "Please enter a valid documentation URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle Checklist Change
  const handleChecklistChange = (key) => {
    setFormData(prev => ({
      ...prev,
      checklist: { ...prev.checklist, [key]: !prev.checklist[key] }
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError("Please fix the errors before submitting");
      return;
    }

    setSubmitting(true);
    const toastId = showLoading("Submitting completion details...");

    try {
      await axios.patch(
        `${API}/project/${projectId}/complete`,
        {
          ...formData,
          completedAt: new Date().toISOString()
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      
      updateToastSuccess(toastId, "Project marked as complete! 🎉");
      showSuccess("Completion details submitted successfully");
      
      setTimeout(() => {
        navigate(`/project/${projectId}`);
      }, 1000);
      
    } catch (err) {
      console.error('Completion error:', err);
      updateToastError(toastId, err.response?.data?.message || "Failed to submit completion");
      showError("Failed to submit completion details");
    } finally {
      setSubmitting(false);
    }
  };

  // Loading State - Clean Theme
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-violet-500 animate-spin" />
      </div>
    );
  }

  // Not Found State - Clean Theme
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Project not found</h2>
          <p className="text-slate-500 mb-6">The project you're looking for doesn't exist.</p>
          
          <div className="flex justify-center">
            <button 
              onClick={() => navigate(-1)} 
              className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    // 🎨 Clean Slate Background - No Gradients
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* 🔗 TOP BAR - Clean Theme */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-violet-700 transition-colors font-medium px-4 py-2 rounded-xl hover:bg-violet-50"
            >
              <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <Flag size={16} className="text-violet-600" />
              <span className="text-xs font-medium text-slate-500">PROJECT COMPLETION</span>
            </div>
          </div>
        </div>
      </header>

      {/* 📐 MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 🏆 Header Section - Clean */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium mb-4">
            <Sparkles size={14} /> Final Submission
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
            Complete Project: {project.title}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Review your project details and submit the final links for completion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 🔒 READ-ONLY: Project Info Card - Clean */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
              <Shield className="text-violet-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">Project Details <span className="text-xs font-normal text-slate-500">(Read-only)</span></h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Project Name */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1 block">Project Name</label>
                <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  {project.title}
                  <CheckCircle size={14} className="text-emerald-500" />
                </p>
              </div>
              
              {/* Project Type */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1 block">Type</label>
                <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Briefcase size={14} className="text-violet-600" /> {project.type || 'Project'}
                </p>
              </div>
              
              {/* College */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1 block">College</label>
                <p className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <GraduationCap size={14} className="text-violet-600" /> {project.college}
                </p>
              </div>
              
              {/* Owner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1 block">Owner</label>
                <p className="text-sm font-semibold text-slate-800">{project.owner}</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2 block">About Project</label>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                {project.description}
              </p>
            </div>
          </div>

          {/* 👥 READ-ONLY: Team Members Card - Clean */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
              <Users className="text-violet-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">Team Members <span className="text-xs font-normal text-slate-500">(Read-only)</span></h2>
            </div>
            
            {project.teamMembers?.length > 0 ? (
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar-light">
                {project.teamMembers.map((member, index) => (
                  <div key={member._id || index} 
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-violet-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar - Solid Violet */}
                      <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                        {(member.name?.charAt(0) || 'U').toUpperCase()}
                      </div>
                      {/* Info */}
                      <div>
                        <p className="font-semibold text-sm text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.college}</p>
                      </div>
                    </div>
                    {/* Role Badge - Clean */}
                    <span className={`px-3 py-1 text-[10px] font-medium rounded-full uppercase border
                      ${member.role === 'owner' 
                        ? 'bg-amber-50 text-amber-700 border-amber-200' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {member.role === 'owner' ? '👑 Owner' : 'Member'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">No team members</p>
            )}
          </div>

          {/* ✏️ EDITABLE: Submission Links Card - Clean */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
              <Link2 className="text-violet-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">Submission Links <span className="text-xs font-normal text-rose-500">*</span></h2>
            </div>
            
            <div className="space-y-4">
              {/* Live Link - Required */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Live Project Link <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="url" 
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleInputChange}
                    placeholder="https://your-project.vercel.app"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border-2 outline-none transition-all duration-300 text-slate-900 placeholder-slate-400 hover:border-violet-300
                      ${errors.liveLink ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-violet-400 focus:border-violet-500'}`}
                  />
                  <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.liveLink && (
                  <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.liveLink}
                  </p>
                )}
              </div>

              {/* GitHub Link - Required */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  GitHub Repository <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="url" 
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repo"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border-2 outline-none transition-all duration-300 text-slate-900 placeholder-slate-400 hover:border-violet-300
                      ${errors.githubLink ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-violet-400 focus:border-violet-500'}`}
                  />
                  <Github size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.githubLink && (
                  <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.githubLink}
                  </p>
                )}
              </div>

              {/* Demo Video Link - Optional */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Demo Video Link <span className="text-slate-400">(Optional)</span>
                </label>
                <div className="relative">
                  <input 
                    type="url" 
                    name="demoVideoLink"
                    value={formData.demoVideoLink}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/watch?v=..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border-2 border-slate-200 outline-none transition-all duration-300 text-slate-900 placeholder-slate-400 hover:border-violet-300 focus:ring-violet-400 focus:border-violet-500`}
                  />
                  <Video size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.demoVideoLink && (
                  <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.demoVideoLink}
                  </p>
                )}
              </div>

              {/* Documentation Link - Optional */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
                  Documentation Link <span className="text-slate-400">(Optional)</span>
                </label>
                <div className="relative">
                  <input 
                    type="url" 
                    name="documentationLink"
                    value={formData.documentationLink}
                    onChange={handleInputChange}
                    placeholder="https://docs.your-project.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border-2 border-slate-200 outline-none transition-all duration-300 text-slate-900 placeholder-slate-400 hover:border-violet-300 focus:ring-violet-400 focus:border-violet-500`}
                  />
                  <BookOpen size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                {errors.documentationLink && (
                  <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.documentationLink}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ✅ Completion Checklist Card - Clean */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
              <CheckCircle className="text-violet-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">Completion Checklist</h2>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { key: 'codeReviewed', label: 'Code has been reviewed', icon: '🔍' },
                { key: 'tested', label: 'All features tested', icon: '🧪' },
                { key: 'documented', label: 'Documentation added', icon: '📝' },
                { key: 'deployed', label: 'Project is deployed', icon: '🚀' }
              ].map((item) => (
                <label key={item.key} 
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.checklist[item.key] 
                      ? 'bg-emerald-50 border-emerald-200' 
                      : 'bg-white/70 border-slate-200 hover:border-violet-300'
                    }`}
                >
                  <input 
                    type="checkbox" 
                    checked={formData.checklist[item.key]}
                    onChange={() => handleChecklistChange(item.key)}
                    className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-400 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <span>{item.icon}</span> {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 📝 Final Notes Card - Clean */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
              <FileText className="text-violet-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">Final Notes <span className="text-xs font-normal text-slate-500">(Optional)</span></h2>
            </div>
            
            <div>
              <textarea 
                name="finalNotes"
                value={formData.finalNotes}
                onChange={handleInputChange}
                placeholder="Add any additional notes about the project completion, challenges faced, or future improvements..."
                rows={4}
                className="w-full p-4 rounded-xl bg-white/70 border-2 border-slate-200 focus:ring-violet-400 focus:border-violet-500 outline-none transition-all duration-300 text-slate-900 placeholder-slate-400 resize-none hover:border-violet-300"
              />
              <p className="text-[10px] text-slate-500 mt-2 text-right">{formData.finalNotes.length}/500</p>
            </div>
          </div>

          {/* ⚠️ Info Box - Clean */}
          <div className="p-4 rounded-2xl bg-violet-50 border border-violet-200 flex items-start gap-3">
            <Info className="text-violet-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-slate-600">
              <strong className="text-slate-800">Note:</strong> Once submitted, completion details can only be modified by contacting support. 
              Please ensure all links are working and information is accurate before submitting.
            </p>
          </div>

          {/* 🚀 Submit Button - Clean */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              disabled={submitting}
              className="flex-1 py-3.5 rounded-xl font-medium text-sm text-slate-700 bg-white/70 border-2 border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Cancel
            </button>
            <button 
              type="submit"
              disabled={submitting}
              className={`flex-1 py-3.5 rounded-xl font-medium text-sm text-white shadow-sm transition-all flex items-center justify-center gap-2
                ${submitting 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-violet-600 hover:bg-violet-700'
                }`}
            >
              {submitting ? (
                <><Loader2 className="animate-spin" size={18} /> Submitting...</>
              ) : (
                <><Flag size={18} /> Submit Completion <ChevronRight size={18} /></>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* ✨ Custom Scrollbar CSS - Clean Theme */}
      <style>{`
        .custom-scrollbar-light::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-light::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .custom-scrollbar-light { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
      `}</style>
    </div>
  );
};

export default ProjectCompletion;