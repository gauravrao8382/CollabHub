import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Loader2
} from 'lucide-react';

// ✅ FIX: LabeledInput ko BAHAR define karein (ANDAR nahi!) - Same Styling Preserved
const LabeledInput = ({ label, icon: Icon, type = "text", placeholder, value, onChange, isTextArea = false, required = true, onKeyDown }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start md:items-center py-2 md:py-3 border-b border-gray-100 last:border-0"
  >
    {/* Label Column (Left) - Compact */}
    <label className="md:col-span-3 text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-1 md:gap-2 md:justify-end text-right pl-1 md:pl-0">
      <Icon className="text-indigo-600 w-3 h-3 md:w-4 md:h-4 md:inline hidden" /> 
      <span className="md:hidden"><Icon className="text-indigo-600 w-4 h-4 inline mr-1" />{label}</span>
      <span className="hidden md:inline">{label}</span>
      {required && <span className="text-red-500 text-[10px] md:text-sm">*</span>}
    </label>
    
    {/* Input Column (Right) */}
    <div className="md:col-span-9">
      {isTextArea ? (
        <textarea
          className="w-full p-2.5 md:p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white/50 backdrop-blur-sm hover:bg-white resize-none text-sm md:text-base"
          placeholder={placeholder}
          rows={4}
          required={required}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className="w-full p-2.5 md:p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white/50 backdrop-blur-sm hover:bg-white text-sm md:text-base"
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);

    const newProject = {
      title: formData.title,
      description: formData.description,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s !== ""),
      teamSize: Number(formData.teamSize),
      college: formData.college, 
    };

    try {
        const res = await axios.post(`${API}/create-project`,  newProject , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (res.data.project || res.data.success) {
            alert("Project created successfully! 🚀");
            setFormData({ title: '', description: '', techStack: '', teamSize: '', college: '' });
            navigate('/dashboard');
        }
    } catch (err) {
        console.error("Error:", err);
        alert(err.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  const handleBack = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    navigate(-1);
  };

  // ✅ Prevent Enter key from submitting form (except in textarea)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-3 md:px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header - Compact */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 shadow-lg p-4 md:p-6 rounded-2xl mb-4 md:mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-8 md:-mr-10 -mt-8 md:-mt-10"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 md:w-24 md:h-24 bg-purple-500/10 rounded-full blur-2xl -ml-6 md:-ml-8 -mb-6 md:-mb-8"></div>
          
          <div className="relative z-10 flex items-center gap-3">
            <button 
              onClick={handleBack}
              type="button"
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center group"
            >
              <ArrowLeft className="text-gray-600 group-hover:text-indigo-600 transition w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Create New Project
              </h1>
              <p className="text-gray-600 text-xs md:text-sm">Fill details & find your dream team</p>
            </div>
          </div>
        </div>

        {/* Form Card - Compact Layout */}
        <motion.form 
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-md border border-white/40 shadow-lg rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Form Fields Container - Reduced Padding */}
          <div className="px-4 md:px-6 py-4 space-y-1">
            
            <LabeledInput 
              label="Project Name" 
              icon={Briefcase}
              placeholder="e.g., AI Based Attendance System"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />

            <LabeledInput 
              label="Description" 
              icon={FileText}
              isTextArea={true}
              placeholder="Describe your project idea, goals, and what you want to build..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />

            <LabeledInput 
              label="Skills Required" 
              icon={Code}
              placeholder="React, Node.js, Python (comma separated)"
              value={formData.techStack}
              onChange={e => setFormData({...formData, techStack: e.target.value})}
            />
            
            <LabeledInput 
              label="College Name" 
              icon={Building}
              placeholder="e.g., DTU, IIT Bombay, NSUT..."
              value={formData.college}
              onChange={e => setFormData({...formData, college: e.target.value})}
            />

            <LabeledInput 
              label="Team Size" 
              icon={Users}
              type="number"
              placeholder="e.g., 3"
              min="1"
              max="10"
              value={formData.teamSize}
              onChange={e => setFormData({...formData, teamSize: e.target.value})}
              onKeyDown={handleKeyDown}
            />

          </div>

          {/* Action Buttons - Compact Footer */}
          <div className="px-4 md:px-6 py-3 bg-gray-50/50 border-t border-gray-200/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-full sm:w-auto px-5 py-2.5 text-indigo-600 border border-indigo-600 rounded-3xl 
                       hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 
                       hover:text-white transition-all duration-300 ease-in-out font-semibold 
                       flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <button
              type="submit" 
              disabled={loading}
              className="w-full sm:w-auto py-2.5 px-7 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                       border-2 border-transparent rounded-3xl font-semibold cursor-pointer
                       hover:scale-105 hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 
                       transition-all duration-300 ease-in-out flex items-center justify-center gap-2
                       disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm md:text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Posting...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Post Project
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Helper Tip - Compact */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-center text-xs md:text-sm text-gray-500 px-2"
        >
          <p>💡 <span className="font-medium text-gray-700">Pro Tip:</span> Add 3-5 relevant skills for better matches!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreateProject;