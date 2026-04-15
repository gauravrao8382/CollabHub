import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  AlertCircle
} from 'lucide-react';
// ✅ Import toast utilities
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

// ===== Warm Dark Theme LabeledInput Component =====
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
  error 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center py-4 border-b border-stone-700/50 last:border-0"
  >
    {/* Label Column (Left) */}
    <label className="md:col-span-3 text-xs md:text-sm font-semibold text-stone-300 flex items-center gap-2 md:justify-end text-right">
      <Icon className="text-amber-400 w-4 h-4 md:w-4 md:h-4 flex-shrink-0" />
      <span className="hidden md:inline">{label}</span>
      <span className="md:hidden">{label}</span>
      {required && <span className="text-rose-400 text-[10px] md:text-sm">*</span>}
    </label>

    {/* Input Column (Right) */}
    <div className="md:col-span-9">
      {isTextArea ? (
        <textarea
          className={`w-full px-4 py-3 rounded-xl bg-stone-900/50 border ${
            error ? 'border-rose-500/50 focus:ring-rose-500/50' : 'border-stone-700 focus:ring-amber-500/50 focus:border-amber-500'
          } outline-none transition-all duration-300 text-stone-100 placeholder-stone-500 resize-none hover:border-stone-600`}
          placeholder={placeholder}
          rows={4}
          required={required}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-3 rounded-xl bg-stone-900/50 border ${
            error ? 'border-rose-500/50 focus:ring-rose-500/50' : 'border-stone-700 focus:ring-amber-500/50 focus:border-amber-500'
          } outline-none transition-all duration-300 text-stone-100 placeholder-stone-500 hover:border-stone-600`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      )}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-rose-400 flex items-center gap-1"
        >
          <AlertCircle size={12} /> {error}
        </motion.p>
      )}
    </div>
  </motion.div>
);

const CreateProject = ({ onAddProject }) => {
  const API = "http://localhost:5000";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    teamSize: '',
    college: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (loading) return;
    
    if (!validateForm()) {
      showError('Please fix the errors above');
      return;
    }
    
    setLoading(true);
    const toastId = showLoading('Creating your project...');

    const newProject = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s !== ""),
      teamSize: Number(formData.teamSize),
      college: formData.college.trim(),
    };

    try {
      const res = await axios.post(`${API}/create-project`, newProject, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (res.data.project || res.data.success) {
        updateToastSuccess(toastId, 'Project created successfully! 🚀');
        showInfo('Redirecting to dashboard...');
        
        setFormData({ title: '', description: '', techStack: '', teamSize: '', college: '' });
        setErrors({});
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Create project error:', err);
      updateToastError(
        toastId, 
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    navigate(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30 text-stone-100 py-8 px-4 relative overflow-hidden">
      
      {/* ===== Background Decorative Elements - Warm Tones ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-amber-600/30 via-orange-600/25 to-rose-600/25 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-orange-600/25 via-rose-600/20 to-red-600/20 rounded-full blur-3xl"
        />
        {/* Warm Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* ===== Header Card - Warm Theme ===== */}
        <motion.div
          variants={itemVariants}
          className="p-5 md:p-7 rounded-3xl bg-stone-800/40 border border-stone-700/50 backdrop-blur-xl shadow-2xl mb-6 relative overflow-hidden group"
        >
          {/* Warm Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              type="button"
              className="p-2.5 rounded-xl bg-stone-700/50 border border-stone-600/50 hover:bg-stone-700 hover:border-amber-500/30 transition-all flex items-center justify-center"
            >
              <ArrowLeft className="text-stone-300 hover:text-amber-400 transition-colors w-5 h-5" />
            </motion.button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  Create New Project
                </span>
              </h1>
              <p className="text-stone-400 text-sm mt-0.5">Fill details & find your dream team</p>
            </div>
            
            {/* Status Indicator - Warm */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium text-amber-300">Quick Setup</span>
            </div>
          </div>
        </motion.div>

        {/* ===== Form Card - Warm Theme ===== */}
        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-5 md:p-7 rounded-3xl bg-stone-800/40 border border-stone-700/50 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Card Glow - Warm */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/3 via-orange-500/3 to-rose-500/3 pointer-events-none" />
          
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
            />
          </div>

          {/* Action Buttons - Warm Theme */}
          <div className="mt-8 pt-6 border-t border-stone-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleBack}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-700/50 border border-stone-600/50 
                       text-stone-300 font-semibold hover:bg-stone-700 hover:border-amber-500/30 
                       transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </motion.button>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                       text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                       transition-all duration-300 shadow-lg shadow-amber-500/30 
                       hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              {/* Button Glow - Warm */}
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Post Project
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Helper Tips - Warm Theme */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {[
            { icon: Code, text: "Add 3-5 relevant skills for better team matches", color: "text-amber-400" },
            { icon: Users, text: "Be realistic about team size requirements", color: "text-orange-400" }
          ].map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-stone-800/30 border border-stone-700/50"
            >
              <tip.icon className={`w-4 h-4 ${tip.color} flex-shrink-0`} />
              <p className="text-xs text-stone-400">{tip.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreateProject;