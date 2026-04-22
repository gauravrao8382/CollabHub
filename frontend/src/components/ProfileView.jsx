import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, GraduationCap, Calendar, MapPin, Camera, 
  Edit3, Save, X, Plus, Trash2, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { showSuccess, showError, showLoading, updateToastSuccess } from '../utils/toast';
import axios from 'axios';

const API = "http://localhost:5000";

const ProfileView = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: user?.college || '',
    passingYear: user?.passingYear || '',
    skills: user?.skills || [],
    location: user?.location || ''
  });
  
  const [newSkill, setNewSkill] = useState('');

  // Reset form when user prop changes
  React.useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      college: user?.college || '',
      passingYear: user?.passingYear || '',
      skills: user?.skills || [],
      location: user?.location || ''
    });
  }, [user]);

  // ===== Validation =====
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.college.trim()) newErrors.college = "College name is required";
    if (!formData.passingYear) newErrors.passingYear = "Passing year is required";
    else if (formData.passingYear < 1990 || formData.passingYear > 2030) {
      newErrors.passingYear = "Invalid year";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== Handle Save =====
  const handleSave = async () => {
    if (!validateForm()) {
      showError('Please fix the errors above');
      return;
    }
    
    setIsSaving(true);
    const toastId = showLoading('Saving profile...');
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API}/user/profile`, 
        { ...formData, passingYear: Number(formData.passingYear) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      updateToastSuccess(toastId, 'Profile updated successfully! ✨');
      
      // Update parent state if callback provided
      if (onUserUpdate) {
        onUserUpdate(response.data.user);
      }
      
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
      updateToastError(toastId, err.response?.data?.message || 'Update failed');
    } finally {
      setIsSaving(false);
    }
  };

  // ===== Skills Management =====
  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({ 
      ...formData, 
      skills: formData.skills.filter(s => s !== skillToRemove) 
    });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  // ===== Display Mode =====
  if (!isEditing) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="relative rounded-2xl bg-white border border-violet-200/60 shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
          
          <div className="px-6 pb-6 flex flex-col md:flex-row md:items-end gap-4 -mt-14">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl border-4 border-white bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-xl overflow-hidden">
                <span className="text-4xl font-bold text-white">
                  {formData.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <button 
                className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-lg hover:bg-violet-50 hover:scale-105 transition-all"
                title="Change photo"
              >
                <Camera size={16} className="text-violet-600" />
              </button>
            </div>
            
            {/* User Info */}
            <div className="flex-1 pt-2 md:pt-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-800">{formData.name || 'Not set'}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                  title="Edit profile"
                >
                  <Edit3 size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <p className="text-slate-500 flex items-center gap-1.5 text-sm">
                  <GraduationCap size={14} className="text-violet-400" /> 
                  {formData.college || 'Add your college'}
                </p>
                <p className="text-slate-500 flex items-center gap-1.5 text-sm">
                  <Calendar size={14} className="text-violet-400" /> 
                  Passing: {formData.passingYear || 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="p-6 rounded-2xl bg-white border border-violet-200/60 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <User size={18} className="text-violet-600" /> Profile Details
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Mail size={12} /> Email
              </label>
              <div className="p-3 bg-slate-50 rounded-xl text-sm text-slate-700 break-all">
                {formData.email || 'Not set'}
              </div>
            </div>
            
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <MapPin size={12} /> Location
              </label>
              <div className="p-3 bg-slate-50 rounded-xl text-sm text-slate-700">
                {formData.location || 'Not set'}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-3">
              <CheckCircle2 size={12} className="text-violet-400" /> Skills & Expertise
            </label>
            {formData.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 border border-violet-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">No skills added yet</p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Projects', value: user?.createdProjects?.length || 0, color: 'violet' },
            { label: 'Applied', value: user?.appliedProjects?.length || 0, color: 'fuchsia' },
            { label: 'Completed', value: user?.completedProjects?.length || 0, color: 'emerald' }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-xl bg-white border border-${stat.color}-200/60 text-center shadow-sm`}
            >
              <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // ===== Edit Mode =====
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="p-6 rounded-2xl bg-white border border-violet-200/60 shadow-lg">
        
        {/* Edit Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Edit3 size={20} className="text-violet-600" /> Edit Profile
          </h2>
          <button
            onClick={() => {
              setIsEditing(false);
              setErrors({});
            }}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 border-2 ${
                errors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-violet-400 focus:border-violet-500'
              } outline-none transition-all text-slate-900 placeholder-slate-400`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.name}
              </p>
            )}
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-500 cursor-not-allowed"
              />
            </div>
            <p className="mt-1 text-[10px] text-slate-400">Email cannot be changed</p>
          </div>

          {/* College & Year Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                College/Institute <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => {
                    setFormData({ ...formData, college: e.target.value });
                    if (errors.college) setErrors({ ...errors, college: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 ${
                    errors.college ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-violet-400 focus:border-violet-500'
                  } outline-none transition-all text-slate-900 placeholder-slate-400`}
                  placeholder="e.g., DTU, IIT Bombay"
                />
              </div>
              {errors.college && (
                <p className="mt-1 text-xs text-rose-500">{errors.college}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Passing Year <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  value={formData.passingYear}
                  onChange={(e) => {
                    setFormData({ ...formData, passingYear: e.target.value });
                    if (errors.passingYear) setErrors({ ...errors, passingYear: '' });
                  }}
                  min="1990"
                  max="2030"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 ${
                    errors.passingYear ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-violet-400 focus:border-violet-500'
                  } outline-none transition-all text-slate-900 placeholder-slate-400`}
                  placeholder="e.g., 2025"
                />
              </div>
              {errors.passingYear && (
                <p className="mt-1 text-xs text-rose-500">{errors.passingYear}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Location
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:ring-violet-400 focus:border-violet-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                placeholder="e.g., Delhi, India"
              />
            </div>
          </div>

          {/* Skills Management */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Skills & Expertise
            </label>
            
            {/* Add Skill Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-200 focus:ring-violet-400 focus:border-violet-500 outline-none transition-all text-sm"
                placeholder="Add a skill (press Enter)"
              />
              <button
                type="button"
                onClick={addSkill}
                disabled={!newSkill.trim()}
                className="px-4 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                <Plus size={14} /> Add
              </button>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              <AnimatePresence>
                {formData.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 border border-violet-200 flex items-center gap-1.5"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="p-0.5 hover:bg-violet-200 rounded-full transition-colors"
                    >
                      <Trash2 size={10} />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
              {formData.skills.length === 0 && (
                <span className="text-sm text-slate-400 italic">No skills added yet</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setErrors({});
            }}
            disabled={isSaving}
            className="px-6 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
          
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all shadow-lg shadow-violet-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Saving...</>
            ) : (
              <><Save size={16} /> Save Changes</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileView;