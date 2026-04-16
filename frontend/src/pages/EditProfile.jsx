import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, X, Plus, Trash2, Sparkles, Check } from 'lucide-react';
import axios from 'axios';
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError } from '../utils/toast';

const EditProfile = ({ user, onUserUpdate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialUser = user || location.state?.user || {};
  
  const [formData, setFormData] = useState({
    name: initialUser.name || '',
    college: initialUser.college || '',
    passingYear: initialUser.passingYear || '',
    skills: initialUser.skills || []
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // ===== Validation =====
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.college.trim()) errors.college = 'College is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ===== Form Handlers =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
      setNewSkill('');
      showSuccess(`Skill "${skill}" added! ✨`);
    } else if (!skill) {
      showError('Please enter a skill name');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
    showInfo(`Skill "${skillToRemove}" removed`);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // ===== Submit Handler =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { showError('Please fill in all required fields'); return; }
    
    setLoading(true);
    const toastId = showLoading('Saving your profile...');

    try {
      const token = localStorage.getItem('token');
      const apiUrl = 'http://localhost:5000';
      
      const res = await axios.put(`${apiUrl}/updateProfile/${initialUser._id}`, formData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      const updatedUser = res.data.user;
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        if (onUserUpdate) onUserUpdate(updatedUser);
      }
      
      updateToastSuccess(toastId, 'Profile updated successfully! 🎉');
      setTimeout(() => navigate('/profile', { state: { updated: true } }), 1500);

    } catch (err) {
      console.error('Update error:', err);
      updateToastError(toastId, err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // ===== Animation Variants =====
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 
                    text-stone-900 pt-20 px-4 pb-12 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 
                   bg-gradient-to-r from-amber-300/40 via-orange-300/30 to-rose-300/40 
                   rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-72 h-72 
                   bg-gradient-to-tr from-orange-300/40 via-rose-300/30 to-red-300/30 
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

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* 🔙 Header - Warm Theme */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate('/profile')}
            className="p-2.5 rounded-xl bg-white/70 border-2 border-amber-200 
                     hover:bg-amber-50 hover:border-amber-400 transition-all shadow-sm"
          >
            <ArrowLeft size={20} className="text-stone-600 hover:text-amber-700 transition-colors" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-stone-600 text-sm">Update your personal information</p>
          </div>
        </motion.div>

        {/* 📝 Form Card - Warm Theme */}
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="p-6 md:p-8 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50 space-y-6"
        >
          
          {/* Responsive Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Form Fields - Right side on desktop */}
            <div className="lg:col-span-3 space-y-5 order-2 lg:order-1">
              
              {/* Name Field - Warm Focus */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
                    fieldErrors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-stone-200 focus:ring-amber-400'
                  } focus:border-amber-500 text-stone-900 placeholder-stone-400 outline-none transition-all hover:border-amber-300`}
                />
                {fieldErrors.name && <p className="text-rose-600 text-xs mt-1">{fieldErrors.name}</p>}
              </motion.div>

              {/* College Field - Warm Focus */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-stone-700 mb-2">
                  College / Institution <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text" name="college" value={formData.college} onChange={handleChange} required
                  placeholder="Enter your college name"
                  className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
                    fieldErrors.college ? 'border-rose-400 focus:ring-rose-400' : 'border-stone-200 focus:ring-amber-400'
                  } focus:border-amber-500 text-stone-900 placeholder-stone-400 outline-none transition-all hover:border-amber-300`}
                />
                {fieldErrors.college && <p className="text-rose-600 text-xs mt-1">{fieldErrors.college}</p>}
              </motion.div>

              {/* Passing Year Field - Warm */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Passing Year</label>
                <select
                  name="passingYear" value={formData.passingYear} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-stone-200 
                           focus:border-amber-500 focus:ring-2 focus:ring-amber-400 
                           text-stone-900 outline-none transition-all appearance-none cursor-pointer hover:border-amber-300"
                >
                  <option value="" className="bg-white">Select passing year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return <option key={year} value={year} className="bg-white">{year}</option>;
                  })}
                </select>
              </motion.div>

              {/* Skills Field - Warm Tags */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Skills</label>
                
                {/* Add Skill Input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleSkillKeyDown} placeholder="Add a skill (e.g., React, Node.js)"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/70 border-2 border-stone-200 
                             focus:border-amber-500 focus:ring-2 focus:ring-amber-400 
                             text-stone-900 placeholder-stone-400 outline-none transition-all hover:border-amber-300"
                  />
                  <button
                    type="button" onClick={handleAddSkill} disabled={!newSkill.trim()}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-700 hover:via-orange-700 hover:to-rose-700
                             disabled:opacity-50 disabled:cursor-not-allowed 
                             text-white font-semibold transition-all flex items-center gap-1 shadow-md shadow-amber-200/60 hover:shadow-amber-300/70"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Skills Tags - Warm Gradient */}
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {formData.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm
                            ${index % 3 === 0 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                              index % 3 === 1 ? 'bg-orange-100 text-orange-800 border-orange-200' : 
                              'bg-rose-100 text-rose-800 border-rose-200'}`}
                        >
                          {skill}
                          <button type="button" onClick={() => handleRemoveSkill(skill)}
                            className="hover:text-rose-600 transition-colors p-0.5">
                            <Trash2 size={12} />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>

            </div>

            {/* 👁️ Preview Panel - Warm Theme */}
            <motion.div variants={itemVariants} className="lg:col-span-2 order-1 lg:order-2">
              <div className="sticky top-24 p-5 rounded-2xl bg-white/70 border-2 border-amber-200 backdrop-blur-md shadow-sm">
                <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-600" />
                  Live Preview
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-stone-500 text-xs mb-1">Name</p>
                    <p className="text-stone-900 font-medium">{formData.name || '—'}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs mb-1">College</p>
                    <p className="text-stone-900 font-medium">{formData.college || '—'}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs mb-1">Passing Year</p>
                    <p className="text-stone-900 font-medium">{formData.passingYear || '—'}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs mb-2">Skills</p>
                    {formData.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {formData.skills.map((skill, idx) => (
                          <span key={idx} className={`px-2 py-0.5 rounded text-xs border shadow-sm
                            ${idx % 3 === 0 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                              idx % 3 === 1 ? 'bg-orange-100 text-orange-800 border-orange-200' : 
                              'bg-rose-100 text-rose-800 border-rose-200'}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-stone-400 italic">No skills added</p>
                    )}
                  </div>
                </div>

                {/* Completeness Indicator - Warm Progress */}
                <div className="mt-6 pt-4 border-t border-amber-200">
                  <div className="flex justify-between text-xs text-stone-500 mb-2">
                    <span>Profile Strength</span>
                    <span>{Math.min(100, 40 + (formData.skills.length * 10) + (formData.passingYear ? 15 : 0))}%</span>
                  </div>
                  <div className="h-1.5 bg-amber-100 rounded-full overflow-hidden border border-amber-200">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, 40 + (formData.skills.length * 10) + (formData.passingYear ? 15 : 0))}%` }}
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* 🔘 Action Buttons - Warm Theme */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-amber-200">
            <button
              type="button" onClick={() => navigate('/profile')}
              className="flex-1 px-6 py-3 rounded-xl bg-white/70 border-2 border-amber-200 
                       text-stone-700 font-semibold hover:bg-amber-50 hover:border-amber-400 
                       transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit" disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                       text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       flex items-center justify-center gap-2 shadow-lg shadow-amber-200/60 hover:shadow-amber-300/70"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
              ) : (
                <><Save size={18} /> Save Changes</>
              )}
            </button>
          </motion.div>

        </motion.form>

        {/* 💡 Tips Section - Warm */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 p-4 rounded-2xl bg-white/70 border-2 border-amber-200 text-center shadow-sm"
        >
          <p className="text-stone-700 text-sm">
            💡 <strong>Tip:</strong> Add relevant technical skills to improve your profile visibility 
            and get matched with better projects!
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default EditProfile;