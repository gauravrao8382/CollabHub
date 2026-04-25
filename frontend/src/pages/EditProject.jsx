import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Briefcase, FileText, Users, Code, 
  Building, Sparkles, Loader2, CheckCircle2, AlertCircle, Save 
} from 'lucide-react';
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

const API = "http://localhost:5000";

// ===== Clean Theme LabeledInput Component =====
const LabeledInput = ({ 
  label, icon: Icon, type = "text", placeholder, value, onChange, 
  isTextArea = false, required = true, onKeyDown, error, disabled = false 
}) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center py-4 border-b border-slate-200 last:border-0">
    {/* Label - Clean */}
    <label className="md:col-span-3 text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-2 md:justify-end text-right">
      <Icon className="text-violet-600 w-4 h-4 flex-shrink-0" /> 
      <span className="hidden md:inline">{label}</span>
      <span className="md:hidden">{label}</span>
      {required && <span className="text-rose-600 text-[10px] md:text-sm">*</span>}
    </label>

    {/* Input - Clean Focus */}
    <div className="md:col-span-9">
      {isTextArea ? (
        <textarea
          className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
            error ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-violet-400 focus:border-violet-500'
          } outline-none transition-all duration-300 text-slate-900 placeholder-slate-400 resize-none hover:border-violet-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder={placeholder} rows={4} required={required} value={value}
          onChange={onChange} disabled={disabled}
        />
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
            error ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-violet-400 focus:border-violet-500'
          } outline-none transition-all duration-300 text-slate-900 placeholder-slate-400 hover:border-violet-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder={placeholder} required={required} value={value}
          onChange={onChange} onKeyDown={onKeyDown} disabled={disabled}
        />
      )}
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            className="mt-1.5 text-xs text-rose-600 flex items-center gap-1"
          >
            <AlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  </div>
);

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ 
    title: '', description: '', techStack: '', teamSize: '', college: '' 
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API}/project/${projectId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data = res.data.project;
        setFormData({
          title: data.title || '',
          description: data.description || '',
          techStack: Array.isArray(data.techStack) ? data.techStack.join(', ') : data.techStack || '',
          teamSize: data.teamSize || '',
          college: data.college || ''
        });
      } catch (err) {
        showError(err.response?.data?.message || "Failed to load project");
        setTimeout(() => navigate('/profile'), 2000);
      } finally { setLoading(false); }
    };
    fetchProject();
  }, [projectId, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Project name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.description.trim().length < 20) newErrors.description = "Description should be at least 20 characters";
    if (!formData.techStack.trim()) newErrors.techStack = "Please add at least one skill";
    if (!formData.college.trim()) newErrors.college = "College name is required";
    if (!formData.teamSize || Number(formData.teamSize) < 1) newErrors.teamSize = "Team size must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (!validateForm()) { showError('Please fix the errors above'); return; }
    
    setSaving(true);
    const toastId = showLoading('Saving project changes...');

    try {
      const updatedProject = {
        ...formData,
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s),
        teamSize: Number(formData.teamSize)
      };
      await axios.put(`${API}/project/${projectId}/edit`, updatedProject, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      updateToastSuccess(toastId, 'Project updated successfully! 🚀');
      showInfo('Redirecting to project page...');
      setTimeout(() => navigate(`/project/${projectId}`), 1500);
    } catch (err) {
      console.error('Update error:', err);
      updateToastError(toastId, err.response?.data?.message || "Update failed");
    } finally { setSaving(false); }
  };

  const handleBack = () => navigate(-1);
  const handleKeyDown = (e) => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault(); };

  // ===== Loading State - Clean Theme =====
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-violet-500 animate-spin" />
      </div>
    );
  }

  return (
    // 🎨 Clean Slate Background - No Gradients, No Tilt Effect
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4">

      <div className="max-w-4xl mx-auto">

        {/* 🔙 Header Card - Clean Theme (No Animation) */}
        <div className="p-5 md:p-7 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack} type="button"
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition-all flex items-center justify-center"
              aria-label="Go back"
            >
              <ArrowLeft className="text-slate-600 hover:text-violet-700 transition-colors w-5 h-5" />
            </button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                Edit Project
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">Update your project details</p>
            </div>
            
            {/* Status Badge - Clean */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-xs font-medium text-violet-700">Quick Edit</span>
            </div>
          </div>
        </div>

        {/* 📝 Form Card - Clean Theme (No Animation) */}
        <form onSubmit={handleSubmit} className="p-5 md:p-7 rounded-3xl bg-white/80 border border-slate-200/60 backdrop-blur-md shadow-sm">
          {/* Form Fields */}
          <div className="space-y-2">
            <LabeledInput label="Project Name" icon={Briefcase} placeholder="e.g., AI Based Attendance System"
              value={formData.title} onChange={e => { setFormData({ ...formData, title: e.target.value }); if (errors.title) setErrors({ ...errors, title: '' }); }}
              error={errors.title} disabled={saving} />

            <LabeledInput label="Description" icon={FileText} isTextArea={true}
              placeholder="Describe your project idea, goals, and what you want to build..."
              value={formData.description} onChange={e => { setFormData({ ...formData, description: e.target.value }); if (errors.description) setErrors({ ...errors, description: '' }); }}
              error={errors.description} disabled={saving} />

            <LabeledInput label="Skills Required" icon={Code} placeholder="React, Node.js, Python (comma separated)"
              value={formData.techStack} onChange={e => { setFormData({ ...formData, techStack: e.target.value }); if (errors.techStack) setErrors({ ...errors, techStack: '' }); }}
              error={errors.techStack} disabled={saving} />

            <LabeledInput label="College Name" icon={Building} placeholder="e.g., DTU, IIT Bombay, NSUT..."
              value={formData.college} onChange={e => { setFormData({ ...formData, college: e.target.value }); if (errors.college) setErrors({ ...errors, college: '' }); }}
              error={errors.college} disabled={saving} />

            <LabeledInput label="Team Size" icon={Users} type="number" placeholder="e.g., 3" min="1" max="10"
              value={formData.teamSize} onChange={e => { setFormData({ ...formData, teamSize: e.target.value }); if (errors.teamSize) setErrors({ ...errors, teamSize: '' }); }}
              onKeyDown={handleKeyDown} error={errors.teamSize} disabled={saving} />
          </div>

          {/* 🔘 Action Buttons - Clean Theme */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button" onClick={handleBack} disabled={saving}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 
                       text-slate-700 font-medium hover:bg-violet-50 hover:border-violet-300 
                       transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              type="submit" disabled={saving}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-violet-600 
                       text-white font-medium hover:bg-violet-700 
                       transition-all duration-300 shadow-sm hover:shadow 
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...</>
              ) : (
                <><Save className="w-5 h-5" /> Update Project</>
              )}
            </button>
          </div>
        </form>

        {/* 💡 Helper Tips - Clean Theme (No Animation) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Code, text: "Use comma-separated values for skills (e.g., React, Node.js)", color: "text-violet-700", bg: "bg-violet-50" },
            { icon: FileText, text: "Keep descriptions clear and concise for better visibility", color: "text-fuchsia-700", bg: "bg-fuchsia-50" }
          ].map((tip, idx) => (
            <div key={idx} className={`flex items-center gap-3 p-4 rounded-xl ${tip.bg} border border-slate-200`}>
              <tip.icon className={`w-4 h-4 ${tip.color} flex-shrink-0`} />
              <p className="text-xs text-slate-700">{tip.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default EditProject;