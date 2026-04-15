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
    
    if (!validate()) {
      showError('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    const toastId = showLoading('Saving your profile...');

    try {
      const token = localStorage.getItem('token');
      const apiUrl = 'http://localhost:5000';
      
      const res = await axios.put(`${apiUrl}/updateProfile/${initialUser._id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const updatedUser = res.data.user;
      
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      if (onUserUpdate && updatedUser) {
        onUserUpdate(updatedUser);
      }
      
      updateToastSuccess(toastId, 'Profile updated successfully! 🎉');
      
      setTimeout(() => {
        navigate('/profile', { state: { updated: true } });
      }, 1500);

    } catch (err) {
      console.error('Update error:', err);
      updateToastError(
        toastId, 
        err.response?.data?.message || 'Failed to update profile. Please try again.'
      );
      
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
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30 text-stone-100 pt-20 px-4 pb-12 relative overflow-hidden">
      
      {/* Background Decorations - Warm Tones */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-amber-600/25 via-orange-600/20 to-rose-600/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-orange-600/20 via-rose-600/15 to-red-600/15 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header - Warm Theme */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate('/profile')}
            className="p-2.5 rounded-xl bg-stone-800/50 border border-stone-700/50 
                     hover:bg-stone-700/50 hover:border-amber-500/30 transition-all"
          >
            <ArrowLeft size={20} className="text-stone-300 hover:text-amber-400 transition-colors" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Edit Profile
            </h1>
            <p className="text-stone-400 text-sm">Update your personal information</p>
          </div>
        </motion.div>

        {/* Form Card - Warm Theme */}
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="p-6 md:p-8 rounded-3xl bg-stone-800/40 border border-stone-700/50 backdrop-blur-xl shadow-2xl space-y-6"
        >
          
          {/* Responsive Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Form Fields - Right side on desktop */}
            <div className="lg:col-span-3 space-y-5 order-2 lg:order-1">
              
              {/* Name Field - Warm Focus */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-stone-300 mb-2">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl bg-stone-900/50 border ${
                    fieldErrors.name ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-stone-700/50 focus:ring-amber-500/20'
                  } focus:border-amber-500/50 
                  text-stone-100 placeholder-stone-500 outline-none transition-all`}
                />
                {fieldErrors.name && (
                  <p className="text-rose-400 text-xs mt-1">{fieldErrors.name}</p>
                )}
              </motion.div>

              {/* College Field - Warm Focus */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-stone-300 mb-2">
                  College / Institution <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  placeholder="Enter your college name"
                  className={`w-full px-4 py-3 rounded-xl bg-stone-900/50 border ${
                    fieldErrors.college ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-stone-700/50 focus:ring-amber-500/20'
                  } focus:border-amber-500/50 
                  text-stone-100 placeholder-stone-500 outline-none transition-all`}
                />
                {fieldErrors.college && (
                  <p className="text-rose-400 text-xs mt-1">{fieldErrors.college}</p>
                )}
              </motion.div>

              {/* Passing Year Field - Warm */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-stone-300 mb-2">
                  Passing Year
                </label>
                <select
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-stone-900/50 border border-stone-700/50 
                           focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 
                           text-stone-100 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-stone-800">Select passing year</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year} className="bg-stone-800">{year}</option>
                    );
                  })}
                </select>
              </motion.div>

              {/* Skills Field - Warm Tags */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-stone-300 mb-2">
                  Skills
                </label>
                
                {/* Add Skill Input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Add a skill (e.g., React, Node.js)"
                    className="flex-1 px-4 py-3 rounded-xl bg-stone-900/50 border border-stone-700/50 
                             focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 
                             text-stone-100 placeholder-stone-500 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                    className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700
                             disabled:opacity-50 disabled:cursor-not-allowed 
                             text-white font-semibold transition-all flex items-center gap-1 shadow-md shadow-amber-500/25"
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                                   bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 
                                   border border-amber-500/30 text-amber-300 text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:text-rose-400 transition-colors p-0.5"
                          >
                            <Trash2 size={12} />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>

            </div>

            {/* Preview Panel - Warm Theme */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2 order-1 lg:order-2"
            >
              <div className="sticky top-24 p-5 rounded-2xl bg-stone-800/30 border border-stone-700/30 backdrop-blur-sm">
                <h3 className="font-semibold text-stone-200 mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  Live Preview
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-stone-500 text-xs mb-1">Name</p>
                    <p className="text-stone-200 font-medium">{formData.name || '—'}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs mb-1">College</p>
                    <p className="text-stone-200 font-medium">{formData.college || '—'}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs mb-1">Passing Year</p>
                    <p className="text-stone-200 font-medium">{formData.passingYear || '—'}</p>
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs mb-2">Skills</p>
                    {formData.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {formData.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs border border-amber-500/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-stone-500 italic">No skills added</p>
                    )}
                  </div>
                </div>

                {/* Completeness Indicator - Warm Progress */}
                <div className="mt-6 pt-4 border-t border-stone-700/30">
                  <div className="flex justify-between text-xs text-stone-400 mb-2">
                    <span>Profile Strength</span>
                    <span>{Math.min(100, 40 + (formData.skills.length * 10) + (formData.passingYear ? 15 : 0))}%</span>
                  </div>
                  <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
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

          {/* Action Buttons - Warm Theme */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-700/50"
          >
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 px-6 py-3 rounded-xl bg-stone-700/50 border border-stone-600/50 
                       text-stone-300 font-semibold hover:bg-stone-700 hover:border-amber-500/30 
                       transition-all flex items-center justify-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                       text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Changes
                </>
              )}
            </button>
          </motion.div>

        </motion.form>

        {/* Tips Section - Warm */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 rounded-2xl bg-stone-800/30 border border-stone-700/30 text-center"
        >
          <p className="text-stone-400 text-sm">
            💡 <strong>Tip:</strong> Add relevant technical skills to improve your profile visibility 
            and get matched with better projects!
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default EditProfile;