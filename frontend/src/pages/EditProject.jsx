import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, 
  Briefcase, 
  FileText, 
  Users, 
  Code, 
  Building, 
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Save
} from 'lucide-react';
// ✅ Import toast utilities
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

const API = "http://localhost:5000";

// ===== Dark Theme LabeledInput Component =====
const LabeledInput = ({ 
  label, 
  icon: Icon, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  isTextArea = false, 
  required = true, 
  onKeyDown,
  error,
  disabled = false
}) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center py-4 border-b border-gray-700/50 last:border-0"
  >
    {/* Label */}
    <label className="md:col-span-3 text-xs md:text-sm font-semibold text-gray-300 flex items-center gap-2 md:justify-end text-right">
      <Icon className="text-violet-400 w-4 h-4 flex-shrink-0" /> 
      <span className="hidden md:inline">{label}</span>
      <span className="md:hidden">{label}</span>
      {required && <span className="text-rose-400 text-[10px] md:text-sm">*</span>}
    </label>

    {/* Input */}
    <div className="md:col-span-9">
      {isTextArea ? (
        <textarea
          className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border ${
            error ? 'border-rose-500/50 focus:ring-rose-500/50' : 'border-gray-700 focus:ring-violet-500/50 focus:border-violet-500'
          } outline-none transition-all duration-300 text-gray-100 placeholder-gray-500 resize-none hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder={placeholder}
          rows={4}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border ${
            error ? 'border-rose-500/50 focus:ring-rose-500/50' : 'border-gray-700 focus:ring-violet-500/50 focus:border-violet-500'
          } outline-none transition-all duration-300 text-gray-100 placeholder-gray-500 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
      )}
      
      {/* Error Message - Keep field-level errors inline */}
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"
          >
            <AlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    techStack: '', 
    teamSize: '', 
    college: '' 
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  // ✅ REMOVED: const [success, setSuccess] = useState(''); - toasts handle this

  // ===== Fetch existing project =====
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${API}/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = res.data.project;
        setFormData({
          title: data.title || '',
          description: data.description || '',
          techStack: Array.isArray(data.techStack)
            ? data.techStack.join(', ')
            : data.techStack || '',
          teamSize: data.teamSize || '',
          college: data.college || ''
        });

      } catch (err) {
        // ✅ Use toast for fetch error instead of inline message
        showError(err.response?.data?.message || "Failed to load project");
        
        // Still navigate back after error
        setTimeout(() => navigate('/profile'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  // ===== Form Validation =====
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

  // ===== Update project =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    if (!validateForm()) {
      showError('Please fix the errors above'); // ✅ Toast for validation failure
      return;
    }
    
    setSaving(true);

    // ✅ Show loading toast
    const toastId = showLoading('Saving project changes...');

    try {
      const updatedProject = {
        ...formData,
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s),
        teamSize: Number(formData.teamSize)
      };

      await axios.put(`${API}/project/${projectId}/edit`, updatedProject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // ✅ Update loading toast to success
      updateToastSuccess(toastId, 'Project updated successfully! 🚀');
      
      // ✅ Optional: Show extra info
      showInfo('Redirecting to project page...');
      
      // Small delay for toast visibility before redirect
      setTimeout(() => {
        navigate(`/project/${projectId}`);
      }, 1500);

    } catch (err) {
      console.error('Update error:', err);
      // ✅ Update loading toast to error
      updateToastError(
        toastId, 
        err.response?.data?.message || "Update failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => navigate(-1);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  // ===== Animation variants =====
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // ===== Loading State =====
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 text-gray-100 py-8 px-4 relative overflow-hidden">
      
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
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10"
      >

        {/* ===== Header Card ===== */}
        <motion.div
          variants={itemVariants}
          className="p-5 md:p-7 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl mb-6 relative overflow-hidden group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              type="button"
              className="p-2.5 rounded-xl bg-gray-700/50 border border-gray-600/50 hover:bg-gray-700 hover:border-violet-500/30 transition-all flex items-center justify-center"
              aria-label="Go back"
            >
              <ArrowLeft className="text-gray-300 hover:text-violet-400 transition-colors w-5 h-5" />
            </motion.button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Edit Project
                </span>
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">Update your project details</p>
            </div>
            
            {/* Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-medium text-violet-300">Quick Edit</span>
            </div>
          </div>
        </motion.div>

        {/* ===== Form Card ===== */}
        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-5 md:p-7 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Card Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/3 to-cyan-500/3 pointer-events-none" />
          
          {/* ✅ REMOVED: Inline success/error message blocks - toasts handle these now */}
          {/* Field-level errors still show inside LabeledInput components */}

          {/* Form Fields */}
          <div className="space-y-2 relative z-10">
            <LabeledInput
              label="Project Name"
              icon={Briefcase}
              placeholder="e.g., AI Based Attendance System"
              value={formData.title}
              onChange={e => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              error={errors.title}
              disabled={saving}
            />

            <LabeledInput
              label="Description"
              icon={FileText}
              isTextArea={true}
              placeholder="Describe your project idea, goals, and what you want to build..."
              value={formData.description}
              onChange={e => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              error={errors.description}
              disabled={saving}
            />

            <LabeledInput
              label="Skills Required"
              icon={Code}
              placeholder="React, Node.js, Python (comma separated)"
              value={formData.techStack}
              onChange={e => {
                setFormData({ ...formData, techStack: e.target.value });
                if (errors.techStack) setErrors({ ...errors, techStack: '' });
              }}
              error={errors.techStack}
              disabled={saving}
            />

            <LabeledInput
              label="College Name"
              icon={Building}
              placeholder="e.g., DTU, IIT Bombay, NSUT..."
              value={formData.college}
              onChange={e => {
                setFormData({ ...formData, college: e.target.value });
                if (errors.college) setErrors({ ...errors, college: '' });
              }}
              error={errors.college}
              disabled={saving}
            />

            <LabeledInput
              label="Team Size"
              icon={Users}
              type="number"
              placeholder="e.g., 3"
              min="1"
              max="10"
              value={formData.teamSize}
              onChange={e => {
                setFormData({ ...formData, teamSize: e.target.value });
                if (errors.teamSize) setErrors({ ...errors, teamSize: '' });
              }}
              onKeyDown={handleKeyDown}
              error={errors.teamSize}
              disabled={saving}
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleBack}
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 
                       text-gray-300 font-semibold hover:bg-gray-700 hover:border-violet-500/30 
                       transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </motion.button>

            <motion.button
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 
                       text-white font-semibold hover:from-violet-500 hover:to-cyan-500 
                       transition-all duration-300 shadow-lg shadow-violet-500/25 
                       hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              {/* Button Glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Update Project
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* ===== Helper Tips ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {[
            { icon: Code, text: "Use comma-separated values for skills (e.g., React, Node.js)" },
            { icon: FileText, text: "Keep descriptions clear and concise for better visibility" }
          ].map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50"
            >
              <tip.icon className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <p className="text-xs text-gray-400">{tip.text}</p>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default EditProject;