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

// ===== Warm Light Theme LabeledInput Component =====
const LabeledInput = ({ 
  label, icon: Icon, type = "text", placeholder, value, onChange, 
  isTextArea = false, required = true, onKeyDown, error, disabled = false 
}) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start md:items-center py-4 border-b border-amber-200 last:border-0"
  >
    {/* Label - Warm */}
    <label className="md:col-span-3 text-xs md:text-sm font-semibold text-stone-700 flex items-center gap-2 md:justify-end text-right">
      <Icon className="text-amber-600 w-4 h-4 flex-shrink-0" /> 
      <span className="hidden md:inline">{label}</span>
      <span className="md:hidden">{label}</span>
      {required && <span className="text-rose-600 text-[10px] md:text-sm">*</span>}
    </label>

    {/* Input - Warm Focus */}
    <div className="md:col-span-9">
      {isTextArea ? (
        <textarea
          className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
            error ? 'border-rose-400 focus:ring-rose-400' : 'border-stone-200 focus:ring-amber-400 focus:border-amber-500'
          } outline-none transition-all duration-300 text-stone-900 placeholder-stone-400 resize-none hover:border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder={placeholder} rows={4} required={required} value={value}
          onChange={onChange} disabled={disabled}
        />
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
            error ? 'border-rose-400 focus:ring-rose-400' : 'border-stone-200 focus:ring-amber-400 focus:border-amber-500'
          } outline-none transition-all duration-300 text-stone-900 placeholder-stone-400 hover:border-amber-300 disabled:opacity-50 disabled:cursor-not-allowed`}
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
  </motion.div>
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

  // ===== Fetch existing project =====
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // ===== Loading State - Warm Theme =====
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

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 
                    text-stone-900 py-8 px-4 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 
                   bg-gradient-to-r from-amber-300/40 via-orange-300/30 to-rose-300/40 
                   rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 
                   bg-gradient-to-r from-orange-300/40 via-rose-300/30 to-red-300/30 
                   rounded-full blur-3xl"
        />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`,
               backgroundSize: '64px 64px'
             }} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10"
      >

        {/* 🔙 Header Card - Warm Theme ===== */}
        <motion.div
          variants={itemVariants}
          className="p-5 md:p-7 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50 mb-6 relative overflow-hidden group"
        >
          {/* Warm Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-200/40 via-orange-200/30 to-rose-200/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}
              onClick={handleBack} type="button"
              className="p-2.5 rounded-xl bg-white/70 border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-400 transition-all flex items-center justify-center shadow-sm"
              aria-label="Go back"
            >
              <ArrowLeft className="text-stone-600 hover:text-amber-700 transition-colors w-5 h-5" />
            </motion.button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  Edit Project
                </span>
              </h1>
              <p className="text-stone-600 text-sm mt-0.5">Update your project details</p>
            </div>
            
            {/* Status Badge - Warm */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-800">Quick Edit</span>
            </div>
          </div>
        </motion.div>

        {/* 📝 Form Card - Warm Theme ===== */}
        <motion.form
          onSubmit={handleSubmit} variants={containerVariants} initial="hidden" animate="visible"
          className="p-5 md:p-7 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50 relative overflow-hidden"
        >
          {/* Card Glow - Warm */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-200/30 via-orange-200/20 to-rose-200/30 pointer-events-none" />
          
          {/* Form Fields */}
          <div className="space-y-2 relative z-10">
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

          {/* 🔘 Action Buttons - Warm Theme */}
          <div className="mt-8 pt-6 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="button" onClick={handleBack} disabled={saving}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/70 border-2 border-amber-200 
                       text-stone-700 font-semibold hover:bg-amber-50 hover:border-amber-400 
                       transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
            >
              <ArrowLeft size={18} /> Back
            </motion.button>

            <motion.button whileHover={{ scale: saving ? 1 : 1.02 }} whileTap={{ scale: saving ? 1 : 0.98 }}
              type="submit" disabled={saving}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                       text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                       transition-all duration-300 shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70 
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              {/* Button Glow - Warm */}
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              {saving ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Saving Changes...</>
              ) : (
                <><Save className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Update Project</>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* 💡 Helper Tips - Warm Theme */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {[
            { icon: Code, text: "Use comma-separated values for skills (e.g., React, Node.js)", color: "text-amber-700", bg: "from-amber-100 to-orange-100" },
            { icon: FileText, text: "Keep descriptions clear and concise for better visibility", color: "text-orange-700", bg: "from-orange-100 to-rose-100" }
          ].map((tip, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${tip.bg} border-2 border-amber-200 shadow-sm`}
            >
              <tip.icon className={`w-4 h-4 ${tip.color} flex-shrink-0`} />
              <p className="text-xs text-stone-700">{tip.text}</p>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default EditProject;