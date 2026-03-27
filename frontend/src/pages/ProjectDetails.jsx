import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Loader2, AlertCircle, Briefcase, GraduationCap, Code, Calendar, Users, Clock, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from "axios";

const ProjectDetails = ({ projects, user }) => {
  const API = "http://localhost:5000";
  const { id } = useParams();
  const navigate = useNavigate();

  const [isApplying, setIsApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [isTeamMember, setIsTeamMember] = useState(false);
  const [error, setError] = useState(null);

  const project = projects.find(p => p._id === id);

  useEffect(() => {
    if (project && user) {
      const teamMember = project.teamMembers?.some(member => 
        String(member.userId || member._id) === String(user._id)
      );
      setIsTeamMember(!!teamMember);

      if (!teamMember && project.applicants?.length > 0) {
        const applicant = project.applicants.find(app => 
          String(app.userId || app._id) === String(user._id)
        );
        if (applicant) {
          setApplicationStatus(applicant.status || 'pending');
        }
      }
    }
  }, [project, user]);

  const [formData, setFormData] = useState({
    name: '',
    college: '',
    skills: '',
    passingYear: ''
  });

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (hasApplied || isTeamMember) return;

    setIsApplying(true);
    setError(null);

    try {
      const applicationData = {
        name: formData.name,
        college: formData.college,
        skills: formData.skills,
        passingYear: formData.passingYear,
      };

      const res = await axios.post(`${API}/apply/${project._id}`, applicationData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      console.log("Response:", res.data.message);
      setApplicationStatus('pending');
      setFormData({ name: '', college: '', skills: '', passingYear: '' });

    } catch (err) {
      console.error(err);
      setError("Failed to apply. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const hasApplied = applicationStatus !== null && !isTeamMember;

  // 🔹 Helper: Get member ID safely
  const getMemberId = (member) => {
    return String(member?.userId || member?._id || member?.id || '');
  };

  // 🔹 Build complete members list (owner + teamMembers)
  const getAllMembers = () => {
    let allMembers = [];
    const currentUserId = String(user?._id || '');
    
    // Add owner if exists
    if (project.owner) {
      const ownerId = typeof project.owner === 'object' 
        ? project.owner._id || project.owner.id 
        : project.owner;
      
      const ownerName = typeof project.owner === 'object'
        ? project.owner.name 
        : project.ownerName || 'Project Owner';
      
      const ownerCollege = typeof project.owner === 'object'
        ? project.owner.college
        : project.ownerCollege || '';
      
      const ownerExists = project.teamMembers?.some(m => 
        getMemberId(m) === String(ownerId)
      );
      
      if (!ownerExists && ownerId) {
        allMembers.push({
          _id: ownerId,
          userId: ownerId,
          name: ownerName,
          college: ownerCollege,
          isOwner: true
        });
      }
    }
    
    // Add team members
    if (project.teamMembers?.length > 0) {
      allMembers = [...allMembers, ...project.teamMembers.map(m => ({
        ...m,
        isOwner: m.role === 'owner' || 
                 getMemberId(m) === String(typeof project.owner === 'object' ? project.owner._id : project.owner)
      }))];
    }
    
    return allMembers;
  };

  // 🔹 Handle member click - navigate to profile
  const handleMemberClick = (memberId, e) => {
    // Ignore if text is selected (for copy-paste)
    if (window.getSelection().toString()) return;
    
    const currentUserId = String(user?._id || '');
    if (memberId && memberId !== currentUserId) {
      navigate(`/profile/${memberId}`);
    }
  };

  return (
    <div className="w-full bg-gray-50 flex flex-col lg:h-screen lg:overflow-hidden min-h-screen">
      
      {/* TOP BAR */}
      <div className="flex-none h-16 border-b border-gray-200 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-20 sticky top-0 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <span className="text-xs font-bold text-gray-400 hidden sm:inline-block">PROJECT DETAILS</span>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="flex flex-col lg:flex-row flex-1 w-full max-w-[1920px] mx-auto">
        
        {/* LEFT SIDE: Project Details */}
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
                <span className="font-semibold">Owner: {typeof project.owner === 'object' ? project.owner.name : project.ownerName || project.owner}</span>
              </div>
              {project.teamMembers?.length > 0 && (
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 text-gray-600 text-sm">
                  <Users size={16} className="text-green-500" />
                  <span className="font-semibold">{project.teamMembers.length} Members</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About Project</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
            </div>

            {/* 👥 Team Members Section - CLICKABLE */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 uppercase tracking-wide">
                <Users size={16} className="text-green-600" />
                Team Members
              </h3>
              
              {(() => {
                const allMembers = getAllMembers();
                const currentUserId = String(user?._id || '');
                const otherMembers = allMembers.filter(member => 
                  getMemberId(member) !== currentUserId
                );
                
                if (allMembers.length === 0) {
                  return (
                    <p className="text-xs text-gray-400 italic pl-2 bg-gray-50 py-2 px-3 rounded-lg">
                      No team members yet
                    </p>
                  );
                }
                
                if (otherMembers.length === 0) {
                  return (
                    <p className="text-xs text-gray-400 italic pl-2 bg-indigo-50 py-2 px-3 rounded-lg text-indigo-700">
                      {currentUserId ? "🎉 You are the only member!" : "👋 Login to join this project"}
                    </p>
                  );
                }
                
                return (
                  <div className="space-y-2">
                    {otherMembers.map((member, index) => {
                      const memberId = getMemberId(member);
                      const isMemberOwner = member.isOwner || 
                                           memberId === String(typeof project.owner === 'object' ? project.owner._id : project.owner);
                      
                      return (
                        <div 
                          key={memberId || index} 
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer group"
                          onClick={(e) => handleMemberClick(memberId, e)}
                          title={`View ${member.name || 'Profile'}`}
                        >
                          {/* Avatar with hover effect */}
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold relative flex-shrink-0 group-hover:scale-105 transition-transform">
                            {(member.name?.charAt?.(0) || 'U').toUpperCase()}
                            {isMemberOwner && (
                              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center text-[9px] text-white border-2 border-white" title="Project Owner">
                                👑
                              </span>
                            )}
                          </div>
                          
                          {/* Member Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                              {member.name || 'Anonymous'}
                              {isMemberOwner && (
                                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded uppercase flex-shrink-0">
                                  Owner
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {member.college || 'College not specified'}
                            </p>
                          </div>
                          
                          {/* Role Badge */}
                          <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase flex-shrink-0 ${
                            isMemberOwner ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {isMemberOwner ? 'Owner' : 'Member'}
                          </span>
                          
                          {/* Click Indicator */}
                          <ArrowLeft size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors rotate-180 flex-shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Tech Stack */}
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
            
            <div className="h-6 lg:hidden"></div>
          </div>
        </div>

        {/* RIGHT SIDE: Application Form / Status */}
        <div className="w-full lg:w-2/5 lg:h-full lg:overflow-y-auto bg-white relative lg:shadow-xl z-10">
          <div className="min-h-full flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            
            {/* STATE 1: Already a Team Member */}
            {isTeamMember ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <UserCheck size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're on the Team! 🎉</h2>
                <p className="text-gray-600 mb-6 text-sm px-4">
                  You are already a member of <br/>
                  <span className="font-semibold text-indigo-600">{project.title}</span>.
                </p>
                
                <div className="space-y-3 mb-6">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg text-sm flex items-center justify-center gap-2"
                  >
                    <Briefcase size={16} /> Go to Dashboard
                  </button>
                  <button 
                    onClick={() => navigate(`/project/${project._id}/workspace`)}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg text-sm flex items-center justify-center gap-2"
                  >
                    <Code size={16} /> Open Workspace
                  </button>
                </div>
                
                <p className="text-[10px] text-gray-400">
                  Check your dashboard for project tasks and updates.
                </p>
              </motion.div>

            /* STATE 2: Application Pending */
            ) : applicationStatus === 'pending' ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <Clock size={40} className="text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Pending</h2>
                <p className="text-gray-600 mb-6 text-sm px-4">
                  Thanks <strong>{formData.name || user?.name}</strong>, your application for <br/>
                  <span className="font-semibold text-indigo-600">{project.title}</span> is under review.
                </p>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-xs text-amber-800 font-medium mb-2">📋 Application Summary:</p>
                  <ul className="text-[10px] text-amber-700 space-y-1">
                    <li><strong>College:</strong> {formData.college || 'N/A'}</li>
                    <li><strong>Passing Year:</strong> {formData.passingYear || 'N/A'}</li>
                    <li><strong>Skills:</strong> {formData.skills || 'N/A'}</li>
                  </ul>
                </div>

                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg text-sm"
                >
                  Back to Dashboard
                </button>
                
                <p className="text-[10px] text-gray-400 mt-3">
                  You'll be notified once the project owner reviews your application.
                </p>
              </motion.div>

            /* STATE 3: Application Rejected */
            ) : applicationStatus === 'rejected' ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <AlertCircle size={40} className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Not Selected</h2>
                <p className="text-gray-600 mb-6 text-sm px-4">
                  Sorry, your application for <br/>
                  <span className="font-semibold text-indigo-600">{project.title}</span> was not selected this time.
                </p>
                <button 
                  onClick={() => navigate('/projects')}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg text-sm"
                >
                  Explore More Projects
                </button>
              </motion.div>

            /* STATE 4: Not Applied - Show Form */
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
                    disabled={isApplying || hasApplied || isTeamMember}
                    className={`w-full py-3.5 rounded-lg font-bold text-sm text-white shadow-md transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer
                      ${isApplying || hasApplied || isTeamMember
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