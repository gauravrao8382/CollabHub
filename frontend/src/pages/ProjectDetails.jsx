import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Loader2, AlertCircle, Briefcase, GraduationCap, Code, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetails = ({ projects, onApply }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === parseInt(id));
  
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    skills: '',
    passingYear: ''
  });
  
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [error, setError] = useState(null);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Project not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 font-semibold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyClick = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.college || !formData.skills || !formData.passingYear) {
      setError("Please fill in all fields to apply.");
      // Scroll to error on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (hasApplied) return;

    setIsApplying(true);
    setError(null);

    setTimeout(() => {
      try {
        const applicationData = {
          projectId: project.id,
          ...formData,
          appliedAt: new Date().toISOString()
        };

        if (onApply) onApply(applicationData);
        
        setHasApplied(true);
        setFormData({ name: '', college: '', skills: '', passingYear: '' });
      } catch (err) {
        setError("Failed to apply. Please try again.");
      } finally {
        setIsApplying(false);
      }
    }, 1500);
  };

  return (
    // MAIN CONTAINER
    // Mobile: Normal flow (h-auto, overflow-y-auto) -> Single Scrollbar
    // Desktop: Fixed height (h-screen, overflow-hidden) -> Split Scroll
    <div className="w-full bg-gray-50 flex flex-col lg:h-screen lg:overflow-hidden min-h-screen">
      
      {/* TOP BAR */}
      <div className="flex-none h-16 border-b border-gray-200 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-20 sticky top-0 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <span className="text-xs font-bold text-gray-400 hidden sm:inline-block">PROJECT DETAILS</span>
      </div>

      {/* CONTENT WRAPPER */}
      {/* Mobile: Static flex column */}
      {/* Desktop: Flex row with internal scrolling */}
      <div className="flex flex-col lg:flex-row flex-1 w-full max-w-[1920px] mx-auto">
        
        {/* LEFT SIDE: Project Details */}
        {/* Mobile: Normal div (part of main scroll) */}
        {/* Desktop: Fixed height with internal scroll */}
        <div className="w-full lg:w-3/5 lg:h-full lg:overflow-y-auto custom-scrollbar bg-gradient-to-br from-white to-gray-50 lg:border-r border-gray-100 relative">
          <div className="p-5 sm:p-8 lg:p-10 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
              {project.type || 'Project Opportunity'}
            </span>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 text-gray-600 text-sm">
                <GraduationCap size={16} className="text-purple-500" />
                <span className="font-semibold">{project.college}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 text-gray-600 text-sm">
                <Briefcase size={16} className="text-blue-500" />
                <span className="font-semibold">Owner: {project.owner}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About Project</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
                <Code size={16} className="text-indigo-600" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack && project.techStack.length > 0 ? (
                  project.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs italic">No tech stack listed</span>
                )}
              </div>
            </div>
            
            {/* Spacer for mobile visual separation */}
            <div className="h-6 lg:hidden"></div>
          </div>
        </div>

        {/* RIGHT SIDE: Application Form */}
        {/* Mobile: Normal div (part of main scroll, appears AFTER details) */}
        {/* Desktop: Fixed height with internal scroll */}
        <div className="w-full lg:w-2/5 lg:h-full lg:overflow-y-auto bg-white relative lg:shadow-xl z-10">
          <div className="min-h-full flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            
            {hasApplied ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h2>
                <p className="text-gray-600 mb-6 text-sm px-4">
                  Thanks <strong>{formData.name}</strong>, we've received your details for <br/>
                  <span className="font-semibold text-indigo-600">{project.title}</span>.
                </p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg text-sm"
                >
                  Back to Dashboard
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Join this Team</h2>
                  <p className="text-gray-500 text-xs">Fill in your details to apply.</p>
                </div>

                <form onSubmit={handleApplyClick} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Rahul Sharma"
                        className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                      />
                      <Briefcase size={14} className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  {/* College & Year Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">College</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                          placeholder="IIT Delhi"
                          className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                        />
                        <GraduationCap size={14} className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Passing Year</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="passingYear"
                          value={formData.passingYear}
                          onChange={handleInputChange}
                          placeholder="2025"
                          min="2024"
                          max="2030"
                          className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                        />
                        <Calendar size={14} className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Your Skills</label>
                    <div className="relative">
                      <textarea
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        placeholder="React, Node.js..."
                        rows="3"
                        className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none text-sm"
                      />
                      <Code size={14} className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-lg flex items-center gap-2">
                      <AlertCircle size={12} /> {error}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isApplying}
                    className={`w-full py-3.5 rounded-lg font-bold text-sm text-white shadow-md transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2
                      ${isApplying 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/30'
                      }`}
                  >
                    {isApplying ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Sending...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  
                  <p className="text-[9px] text-center text-gray-400 mt-3">
                    By applying, you agree to share your details.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Custom Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;