import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Loader2
} from 'lucide-react';

const API = "http://localhost:5000";

// ✅ SAME LabeledInput (unchanged)
const LabeledInput = ({ label, icon: Icon, type = "text", placeholder, value, onChange, isTextArea = false, required = true, onKeyDown }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start md:items-center py-2 md:py-3 border-b border-gray-100 last:border-0"
  >
    <label className="md:col-span-3 text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-1 md:gap-2 md:justify-end text-right">
      <Icon className="text-indigo-600 w-4 h-4 hidden md:inline" /> 
      <span>{label}</span>
      {required && <span className="text-red-500">*</span>}
    </label>

    <div className="md:col-span-9">
      {isTextArea ? (
        <textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder={placeholder}
          rows={4}
          required={required}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      )}
    </div>
  </motion.div>
);

const EditProject = () => {
  const {  projectId } = useParams();
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

  // ✅ Fetch existing project
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
        alert("Failed to load project");
        navigate('/profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  // ✅ Update project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    try {
      const updatedProject = {
        ...formData,
        techStack: formData.techStack.split(',').map(s => s.trim()),
        teamSize: Number(formData.teamSize)
      };

      await axios.put(`${API}/project/${projectId}/edit`, updatedProject, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Project updated successfully 🚀");
      navigate(`/project/${projectId}`);

    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
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

  // ✅ Loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600"/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-3 md:px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >

        {/* Header */}
        <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl mb-5 shadow">
          <div className="flex items-center gap-3">
            <button onClick={handleBack}>
              <ArrowLeft />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-indigo-600">
                Edit Project
              </h1>
              <p className="text-gray-500 text-sm">
                Update your project details
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow">

          <LabeledInput 
            label="Project Name"
            icon={Briefcase}
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />

          <LabeledInput 
            label="Description"
            icon={FileText}
            isTextArea
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />

          <LabeledInput 
            label="Skills Required"
            icon={Code}
            value={formData.techStack}
            onChange={e => setFormData({...formData, techStack: e.target.value})}
          />

          <LabeledInput 
            label="College Name"
            icon={Building}
            value={formData.college}
            onChange={e => setFormData({...formData, college: e.target.value})}
          />

          <LabeledInput 
            label="Team Size"
            icon={Users}
            type="number"
            value={formData.teamSize}
            onChange={e => setFormData({...formData, teamSize: e.target.value})}
            onKeyDown={handleKeyDown}
          />

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-auto px-5 py-2.5 text-indigo-600 border border-indigo-600 rounded-3xl 
                       hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 
                       hover:text-white transition-all duration-300 ease-in-out font-semibold 
                       flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto py-2.5 px-7 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                       border-2 border-transparent rounded-3xl font-semibold cursor-pointer
                       hover:scale-105 hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 
                       transition-all duration-300 ease-in-out flex items-center justify-center gap-2
                       disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm md:text-base"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4"/> Saving...
                </>
              ) : (
                <>
                  <Sparkles size={16}/> Update
                </>
              )}
            </button>
          </div>

        </motion.form>

      </motion.div>
    </div>
  );
};

export default EditProject;