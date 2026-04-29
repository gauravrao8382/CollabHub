import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, GraduationCap, Calendar, Link as LinkIcon, 
  Camera, Edit3, Save, X, Plus, Trash2, CheckCircle2, 
  AlertCircle, Github, Linkedin, FileText 
} from 'lucide-react';
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError } from '../utils/toast';
import axios from 'axios';

const API = "https://collab-hub-production-adae.up.railway.app";

const ProfileView = ({ user, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: user?.college || '',
    passingYear: user?.passingYear?.toString() || '',  // ✅ String as per schema
    skills: user?.skills || [],
    about: user?.about || '',
    github: user?.github || '',
    linkedin: user?.linkedin || ''
  });
  
  const [newSkill, setNewSkill] = useState('');

  // Reset form when user prop changes
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      college: user?.college || '',
      passingYear: user?.passingYear?.toString() || '',
      skills: user?.skills || [],
      about: user?.about || '',
      github: user?.github || '',
      linkedin: user?.linkedin || ''
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
    
    // Validate URLs if provided
    if (formData.github && !/^https?:\/\/(github\.com)\/.+/.test(formData.github)) {
      newErrors.github = "Invalid GitHub URL";
    }
    if (formData.linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(formData.linkedin)) {
      newErrors.linkedin = "Invalid LinkedIn URL";
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
      const userId = user._id;
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API}/update/${userId}`, 
        { 
          ...formData, 
          passingYear: formData.passingYear.toString()  
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      updateToastSuccess(toastId, 'Profile updated successfully! ✨');
      
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
        
        {/* Header Card - Solid Violet Theme (No Gradient) */}
        <div className="relative rounded-2xl bg-white border border-violet-200 shadow-lg overflow-hidden">
          {/* Solid Header Bar */}
          <div className="h-24 bg-violet-600" />
          
          <div className="px-6 pb-6 flex flex-col md:flex-row md:items-end gap-4 -mt-12">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-xl border-4 border-white bg-violet-600 flex items-center justify-center shadow-lg overflow-hidden">
                <span className="text-3xl font-bold text-white">
                  {formData.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <button 
                className="absolute bottom-1 right-1 p-2 bg-white rounded-lg shadow hover:bg-violet-50 transition-all"
                title="Change photo"
              >
                <Camera size={14} className="text-violet-600" />
              </button>
            </div>
            
            {/* User Info */}
            <div className="flex-1 pt-2 md:pt-3">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-800">{formData.name || 'Not set'}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
                  title="Edit profile"
                >
                  <Edit3 size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1.5">
                <p className="text-slate-500 flex items-center gap-1.5 text-sm">
                  <GraduationCap size={13} className="text-violet-500" /> 
                  {formData.college || 'Add your college'}
                </p>
                <p className="text-slate-500 flex items-center gap-1.5 text-sm">
                  <Calendar size={13} className="text-violet-500" /> 
                  Passing: {formData.passingYear || 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="p-5 rounded-2xl bg-white border border-violet-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <User size={16} className="text-violet-600" /> Profile Details
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Mail size={11} /> Email
              </label>
              <div className="p-2.5 bg-slate-50 rounded-lg text-sm text-slate-700 break-all border border-slate-100">
                {formData.email || 'Not set'}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="space-y-3">
              {/* GitHub */}
              <div>
                <label className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Github size={11} /> GitHub
                </label>
                {formData.github ? (
                  <a 
                    href={formData.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 p-2.5 bg-slate-50 rounded-lg text-sm text-violet-600 hover:bg-violet-50 border border-slate-100 transition-colors"
                  >
                    <LinkIcon size={11} />
                    <span className="truncate">{formData.github.replace('https://', '').replace('http://', '')}</span>
                  </a>
                ) : (
                  <div className="p-2.5 bg-slate-50 rounded-lg text-sm text-slate-400 border border-slate-100">
                    Not added
                  </div>
                )}
              </div>
              
              {/* LinkedIn */}
              <div>
                <label className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Linkedin size={11} /> LinkedIn
                </label>
                {formData.linkedin ? (
                  <a 
                    href={formData.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 p-2.5 bg-slate-50 rounded-lg text-sm text-violet-600 hover:bg-violet-50 border border-slate-100 transition-colors"
                  >
                    <LinkIcon size={11} />
                    <span className="truncate">{formData.linkedin.replace('https://', '').replace('http://', '')}</span>
                  </a>
                ) : (
                  <div className="p-2.5 bg-slate-50 rounded-lg text-sm text-slate-400 border border-slate-100">
                    Not added
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-2">
              <FileText size={11} className="text-violet-500" /> About
            </label>
            {formData.about ? (
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {formData.about}
              </p>
            ) : (
              <p className="text-sm text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                No about section added yet
              </p>
            )}
          </div>

          {/* Skills Section */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <label className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-2">
              <CheckCircle2 size={11} className="text-violet-500" /> Skills & Expertise
            </label>
            {formData.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {formData.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-violet-100 text-violet-700 border border-violet-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                No skills added yet
              </p>
            )}
          </div>
        </div>

        {/* Quick Stats - Solid Theme */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Created', value: user?.createdProjects?.length || 0 },
            { label: 'Applied', value: user?.appliedProjects?.length || 0 },
            { label: 'Active', value: (user?.createdProjects?.filter(p => p.status === 'Open').length || 0) + (user?.appliedProjects?.filter(p => p.status === 'Accepted').length || 0) }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -2 }}
              className="p-3.5 rounded-xl bg-white border border-violet-200 text-center shadow-sm"
            >
              <div className="text-lg font-bold text-violet-600">{stat.value}</div>
              <div className="text-[10px] text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // ===== Edit Mode - Solid Theme =====
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="p-5 rounded-2xl bg-white border border-violet-200 shadow-lg">
        
        {/* Edit Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Edit3 size={18} className="text-violet-600" /> Edit Profile
          </h2>
          <button
            onClick={() => {
              setIsEditing(false);
              setErrors({});
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border-2 ${
                errors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:border-violet-500'
              } outline-none transition-all text-sm text-slate-900 placeholder-slate-400`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.name}
              </p>
            )}
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-100 border-2 border-slate-200 text-slate-500 cursor-not-allowed text-sm"
              />
            </div>
            <p className="mt-1 text-[10px] text-slate-400">Email cannot be changed</p>
          </div>

          {/* College & Year Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                College/Institute <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <GraduationCap size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => {
                    setFormData({ ...formData, college: e.target.value });
                    if (errors.college) setErrors({ ...errors, college: '' });
                  }}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-50 border-2 ${
                    errors.college ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:border-violet-500'
                  } outline-none transition-all text-sm text-slate-900 placeholder-slate-400`}
                  placeholder="e.g., DTU, IIT Bombay"
                />
              </div>
              {errors.college && (
                <p className="mt-1 text-xs text-rose-500">{errors.college}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Passing Year <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"  // ✅ String input as per schema
                  value={formData.passingYear}
                  onChange={(e) => {
                    setFormData({ ...formData, passingYear: e.target.value });
                    if (errors.passingYear) setErrors({ ...errors, passingYear: '' });
                  }}
                  pattern="[0-9]{4}"
                  maxLength={4}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-50 border-2 ${
                    errors.passingYear ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:border-violet-500'
                  } outline-none transition-all text-sm text-slate-900 placeholder-slate-400`}
                  placeholder="e.g., 2025"
                />
              </div>
              {errors.passingYear && (
                <p className="mt-1 text-xs text-rose-500">{errors.passingYear}</p>
              )}
            </div>
          </div>

          {/* About Section */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              About
            </label>
            <div className="relative">
              <FileText size={14} className="absolute left-3.5 top-3 text-slate-400" />
              <textarea
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                rows={3}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-50 border-2 border-slate-200 focus:border-violet-500 outline-none transition-all text-sm text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Tell us about yourself, your interests, and what you're looking for..."
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                GitHub Profile
              </label>
              <div className="relative">
                <Github size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => {
                    setFormData({ ...formData, github: e.target.value });
                    if (errors.github) setErrors({ ...errors, github: '' });
                  }}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-50 border-2 ${
                    errors.github ? 'border-rose-400' : 'border-slate-200 focus:border-violet-500'
                  } outline-none transition-all text-sm text-slate-900 placeholder-slate-400`}
                  placeholder="https://github.com/username"
                />
              </div>
              {errors.github && (
                <p className="mt-1 text-xs text-rose-500">{errors.github}</p>
              )}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                LinkedIn Profile
              </label>
              <div className="relative">
                <Linkedin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => {
                    setFormData({ ...formData, linkedin: e.target.value });
                    if (errors.linkedin) setErrors({ ...errors, linkedin: '' });
                  }}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-50 border-2 ${
                    errors.linkedin ? 'border-rose-400' : 'border-slate-200 focus:border-violet-500'
                  } outline-none transition-all text-sm text-slate-900 placeholder-slate-400`}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              {errors.linkedin && (
                <p className="mt-1 text-xs text-rose-500">{errors.linkedin}</p>
              )}
            </div>
          </div>

          {/* Skills Management */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Skills & Expertise
            </label>
            
            {/* Add Skill Input */}
            <div className="flex gap-2 mb-2.5">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="flex-1 px-3.5 py-2 rounded-lg bg-slate-50 border-2 border-slate-200 focus:border-violet-500 outline-none transition-all text-sm"
                placeholder="Add a skill (press Enter)"
              />
              <button
                type="button"
                onClick={addSkill}
                disabled={!newSkill.trim()}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                <Plus size={13} /> Add
              </button>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-1.5 min-h-[32px]">
              <AnimatePresence>
                {formData.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-violet-100 text-violet-700 border border-violet-200 flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="p-0.5 hover:bg-violet-200 rounded transition-colors"
                    >
                      <Trash2 size={9} />
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
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5 justify-end">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setErrors({});
            }}
            disabled={isSaving}
            className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 text-sm"
          >
            <X size={14} /> Cancel
          </button>
          
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 text-sm"
          >
            {isSaving ? (
              <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" /> Saving...</>
            ) : (
              <><Save size={14} /> Save Changes</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileView;