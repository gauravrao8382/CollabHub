import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ArrowLeft, Mail, Building, Linkedin, Code, Award, Briefcase, Calendar,
  ExternalLink, AlertCircle, Trophy, Target, Star, CheckCircle2, User, Github
} from 'lucide-react';

const API = "https://collab-hub-production-adae.up.railway.app";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${API}/profile/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } 
  };
  
  const itemVariants = { 
    hidden: { opacity: 0, y: 12 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } 
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  // Error
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-sm w-full">
          <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={28} className="text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Profile not found</h2>
          <p className="text-gray-600 mb-4 text-sm">The user profile doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 text-sm">
            <ArrowLeft size={14} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-3 pb-4 px-3 sm:pt-4 sm:pb-6 sm:px-4">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Back Button - Responsive */}
        <motion.button 
          initial={{ opacity: 0, x: -12 }} 
          animate={{ opacity: 1, x: 0 }} 
          onClick={() => navigate(-1)}
          className="mb-3 sm:mb-4 flex items-center gap-1.5 text-gray-600 hover:text-violet-600 font-medium transition-colors group text-sm w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> 
          <span>Back</span>
        </motion.button>

        {/* Profile Header - Responsive */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm mb-3 sm:mb-4"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar - Responsive */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-xl sm:text-2xl font-bold text-gray-700">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>

            {/* User Info - Responsive */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <h1 className="text-lg sm:text-xl font-bold mb-1 truncate">{user.name}</h1>
              
              {/* Badges - Scrollable on mobile */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 text-xs sm:text-sm mb-3">
                {user.college && (
                  <span className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-md bg-gray-100 border border-gray-200 max-w-full">
                    <Building size={12} className="text-gray-600 flex-shrink-0" /> 
                    <span className="text-gray-700 truncate">{user.college}</span>
                  </span>
                )}
                <span className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-md bg-gray-100 border border-gray-200">
                  <Mail size={12} className="text-gray-600 flex-shrink-0" /> 
                  <span className="text-gray-700 truncate">{user.email}</span>
                </span>
                {user.passingYear && (
                  <span className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-md bg-gray-100 border border-gray-200">
                    <Calendar size={12} className="text-gray-600 flex-shrink-0" /> 
                    <span className="text-gray-700">Class of {user.passingYear}</span>
                  </span>
                )}
              </div>

              {/* Action Buttons - Full width on mobile */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <button className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors flex items-center justify-center sm:justify-start gap-1.5 text-sm min-w-[100px]">
                  <Mail size={12} /> <span className="hidden sm:inline">Contact</span>
                </button>
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center sm:justify-start gap-1.5 text-sm min-w-[100px]"
                  >
                    <Linkedin size={12} className="text-violet-600 flex-shrink-0" /> <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - Responsive Grid */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4"
        >
          {[
            { icon: Briefcase, value: user.completedProjects?.length || 0, label: "Projects" },
            { icon: Trophy, value: user.leetcode?.solved || 0, label: "Solved" },
            { icon: Star, value: user.leetcode?.rating || 'N/A', label: "Rating" },
            { icon: Target, value: user.skills?.length || 0, label: "Skills" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-white border border-gray-200 rounded-lg p-2.5 sm:p-3 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-violet-50 flex items-center justify-center mx-auto mb-1 sm:mb-1.5">
                <stat.icon className="text-violet-600 w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <p className="text-base sm:text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-[10px] sm:text-[11px] text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs Section - Responsive */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          {/* Tab Navigation - Scrollable on mobile */}
          <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto scrollbar-hide">
            {['about', 'skills', 'projects', 'social'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 text-center font-medium text-xs sm:text-sm transition-colors relative capitalize whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-violet-600 border-b-2 border-violet-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content - Responsive */}
          <div className="p-3 sm:p-4 min-h-[280px] sm:min-h-[320px]">
            <AnimatePresence mode="wait">
              
              {/* ABOUT TAB */}
              {activeTab === 'about' && (
                <motion.div 
                  key="about" 
                  initial={{ opacity: 0, x: -12 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 12 }} 
                  transition={{ duration: 0.25 }} 
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Bio */}
                  <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2 flex items-center gap-1.5">
                      <Award className="text-violet-600 flex-shrink-0" size={14} /> About Me
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                      {user.bio || <span className="text-gray-500 italic">No bio available yet.</span>}
                    </p>
                  </div>

                  {/* Info Grid - Responsive */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Building, label: "College", value: user.college },
                      { icon: Calendar, label: "Passing", value: user.passingYear || "—" },
                      { icon: Mail, label: "Email", value: user.email },
                      { icon: Briefcase, label: "Projects", value: user.completedProjects?.length || 0 }
                    ].map((info, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 8 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: idx * 0.05 }}
                        className="p-2.5 sm:p-3 rounded-lg border border-gray-200 bg-white flex items-center gap-2"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-violet-50 flex items-center justify-center flex-shrink-0">
                          <info.icon className="text-violet-600 w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-500 font-medium">{info.label}</p>
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{info.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <motion.div 
                  key="skills" 
                  initial={{ opacity: 0, x: -12 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 12 }} 
                  transition={{ duration: 0.25 }}
                >
                  <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1.5">
                      <Code className="text-violet-600 flex-shrink-0" size={14} /> Skills
                    </h3>
                    {user.skills?.length > 0 ? (
                      <motion.div className="flex flex-wrap gap-1.5" variants={containerVariants} initial="hidden" animate="visible">
                        {user.skills.map((skill, index) => (
                          <motion.span 
                            key={index} 
                            variants={itemVariants}
                            className="px-2 py-1 sm:px-2.5 sm:py-1 rounded-md bg-white border border-gray-300 text-gray-800 text-xs font-medium hover:border-violet-400 transition-colors cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    ) : (
                      <EmptyState icon={Code} message="No skills" subMessage="Add your expertise" />
                    )}
                  </div>
                </motion.div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <motion.div 
                  key="projects" 
                  initial={{ opacity: 0, x: -12 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 12 }} 
                  transition={{ duration: 0.25 }} 
                  className="space-y-2.5 sm:space-y-3"
                >
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="text-green-600 flex-shrink-0" size={14} /> Projects
                  </h3>
                  {user.completedProjects?.length > 0 ? (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
                      {user.completedProjects.map((project, index) => (
                        <motion.div 
                          key={project._id || index} 
                          variants={itemVariants}
                          className="p-3 rounded-lg border border-gray-200 bg-white hover:border-violet-300 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{project.title}</h4>
                            <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-medium border border-green-200 flex-shrink-0">
                              Done
                            </span>
                          </div>
                          <p className="text-xs text-gray-700 mb-1.5 line-clamp-2">{project.description}</p>
                          {project.techStack?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.techStack.slice(0, 5).map((tech, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-medium border border-gray-200">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500 pt-1.5 border-t border-gray-100">
                            {project.completedDate && <span className="flex items-center gap-1"><Calendar size={10} /> {project.completedDate}</span>}
                            {project.role && <span className="flex items-center gap-1"><Award size={10} /> {project.role}</span>}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <EmptyState icon={Briefcase} message="No projects" subMessage="Start building" />
                  )}
                </motion.div>
              )}

              {/* SOCIAL TAB */}
              {activeTab === 'social' && (
                <motion.div 
                  key="social" 
                  initial={{ opacity: 0, x: -12 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 12 }} 
                  transition={{ duration: 0.25 }} 
                  className="space-y-3 sm:space-y-4"
                >
                  {/* LinkedIn */}
                  {user.linkedin && (
                    <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                          <Linkedin className="text-violet-600 flex-shrink-0" size={16} /> LinkedIn
                        </h3>
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-600 hover:underline flex items-center gap-0.5">
                          View <ExternalLink size={10} />
                        </a>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        {[
                          { label: "Connections", value: user.linkedinStats?.connections || '500+' },
                          { label: "Experience", value: user.linkedinStats?.experience || '—' },
                          { label: "Education", value: user.college || '—' }
                        ].map((item, idx) => (
                          <div key={idx} className="text-center p-1.5 sm:p-2 rounded bg-white border border-gray-200">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{item.value}</p>
                            <p className="text-[10px] text-gray-500">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* LeetCode */}
                  {user.leetcode && (
                    <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                          <Code className="text-violet-600 flex-shrink-0" size={16} /> LeetCode
                        </h3>
                        <a href={user.leetcode.profileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-600 hover:underline flex items-center gap-0.5">
                          View <ExternalLink size={10} />
                        </a>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        {[
                          { label: "Solved", value: user.leetcode.solved || 0 },
                          { label: "Rating", value: user.leetcode.rating || '—' },
                          { label: "Contests", value: user.leetcode.contests || 0 }
                        ].map((item, idx) => (
                          <div key={idx} className="text-center p-1.5 sm:p-2 rounded bg-white border border-gray-200">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{item.value}</p>
                            <p className="text-[10px] text-gray-500">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GitHub */}
                  {user.github && (
                    <div className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                          <Github className="text-gray-700 flex-shrink-0" size={16} /> GitHub
                        </h3>
                        <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-700 hover:underline flex items-center gap-0.5">
                          View <ExternalLink size={10} />
                        </a>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        {[
                          { label: "Repos", value: user.githubStats?.repos || '—' },
                          { label: "Followers", value: user.githubStats?.followers || '—' },
                          { label: "Contribs", value: user.githubStats?.contributions || '—' }
                        ].map((item, idx) => (
                          <div key={idx} className="text-center p-1.5 sm:p-2 rounded bg-white border border-gray-200">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{item.value}</p>
                            <p className="text-[10px] text-gray-500">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {!user.linkedin && !user.leetcode && !user.github && (
                    <EmptyState icon={Linkedin} message="No social links" subMessage="Connect your profiles" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

// ===== Reusable Components =====

const EmptyState = ({ icon: Icon, message, subMessage }) => (
  <div className="text-center py-5 sm:py-6">
    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-2">
      <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-gray-500" />
    </div>
    <p className="text-gray-900 font-medium text-xs sm:text-sm mb-0.5">{message}</p>
    {subMessage && <p className="text-[10px] text-gray-500">{subMessage}</p>}
  </div>
);

export default UserProfile;