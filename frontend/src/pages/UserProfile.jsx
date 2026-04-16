import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ArrowLeft, Mail, Building, Linkedin, Code, Award, Briefcase, Calendar,
  ExternalLink, Loader2, AlertCircle, Trophy, Target, TrendingUp, Star,
  CheckCircle2, User, Github, Globe
} from 'lucide-react';

const API = "http://localhost:5000";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    console.log("Fetching profile for user ID:", userId);
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

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-amber-200 border-t-amber-500" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" style={{ animationDuration: '0.8s' }} />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 flex flex-col items-center justify-center px-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertCircle size={40} className="text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">User not found</h2>
          <p className="text-stone-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate(-1)} 
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-amber-200/60 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 text-stone-900 pt-20 px-4 pb-12">
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-amber-300/40 to-orange-300/30 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-rose-300/40 to-red-300/30 rounded-full blur-3xl" />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`, backgroundSize: '64px 64px' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 🔙 Back Button - Warm Theme */}
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-stone-600 hover:text-amber-700 font-medium transition-colors group px-3 py-2 rounded-xl hover:bg-amber-100"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> <span>Back</span>
        </motion.button>

        {/* 👤 Profile Header - Warm Glass Card */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          className="relative p-6 md:p-10 rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50 mb-8 overflow-hidden group"
        >
          {/* Hover Glow Effect - Warm */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/40 to-orange-200/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-amber-200/30 to-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
            {/* Avatar with Ring Animation - Warm */}
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              {/* Online Status - Warm */}
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full shadow-sm" />
            </motion.div>

            {/* User Info - Warm */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3"
              >
                <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">{user.name}</span>
              </motion.h1>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm font-medium mb-5"
              >
                {[
                  { icon: Building, text: user.college, color: "text-amber-600" },
                  { icon: Mail, text: user.email, color: "text-orange-600" },
                  ...(user.passingYear ? [{ icon: Calendar, text: `Class of ${user.passingYear}`, color: "text-emerald-600" }] : [])
                ].map((item, idx) => (
                  <span key={idx}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-amber-200 hover:border-amber-400 transition-colors shadow-sm"
                  >
                    <item.icon size={16} className={item.color} /> <span className="text-stone-700">{item.text}</span>
                  </span>
                ))}
              </motion.div>

              {/* Action Buttons - Warm */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-amber-200/60 flex items-center gap-2 text-sm">
                  <Mail size={16} /> Contact
                </button>
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-white/70 border-2 border-amber-200 text-stone-700 font-semibold hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 flex items-center gap-2 text-sm shadow-sm"
                  >
                    <Linkedin size={16} className="text-amber-600" /> LinkedIn
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 📊 Stats Cards - Warm Theme */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Briefcase, value: user.completedProjects?.length || 0, label: "Completed Projects", color: "amber" },
            { icon: Trophy, value: user.leetcode?.solved || 0, label: "LeetCode Solved", color: "orange" },
            { icon: Star, value: user.leetcode?.rating || 'N/A', label: "LeetCode Rating", color: "rose" },
            { icon: Target, value: user.skills?.length || 0, label: "Skills", color: "emerald" }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-5 rounded-2xl bg-white/80 border-2 border-amber-200 backdrop-blur-md hover:border-amber-400 transition-all duration-300 text-center shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-${stat.color}-100 to-${stat.color}-200 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform border border-${stat.color}-200`}>
                <stat.icon className={`text-${stat.color}-600 w-6 h-6`} />
              </div>
              <p className={`text-2xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-500 bg-clip-text text-transparent`}>{stat.value}</p>
              <p className="text-xs text-stone-600 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 📋 Tabs Section - Warm Theme */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          className="rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md overflow-hidden shadow-lg shadow-amber-100/50"
        >
          {/* Tab Navigation - Warm */}
          <div className="flex border-b border-amber-200 bg-amber-50/60 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-300">
            {['about', 'skills', 'projects', 'social'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[100px] lg:min-w-[140px] py-4 px-2 text-center font-semibold text-sm lg:text-base transition-all duration-300 relative capitalize ${activeTab === tab ? 'text-amber-700' : 'text-stone-500 hover:text-stone-700'}`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                )}
                <span className="absolute inset-0 bg-amber-100/40 opacity-0 hover:opacity-100 transition-opacity rounded-t-3xl" />
              </button>
            ))}
          </div>

          {/* Tab Content Area - Warm */}
          <div className="p-6 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* ===== ABOUT TAB - Warm ===== */}
              {activeTab === 'about' && (
                <motion.div key="about" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  {/* Bio Section - Warm */}
                  <div className="p-6 rounded-2xl bg-white/70 border-2 border-amber-200 shadow-sm">
                    <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                      <Award className="text-amber-600" size={20} /> About Me
                    </h3>
                    <p className="text-stone-700 leading-relaxed">{user.bio || <span className="text-stone-500 italic">No bio available yet.</span>}</p>
                  </div>

                  {/* Info Grid - Warm */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Building, label: "College", value: user.college, color: "amber" },
                      { icon: Calendar, label: "Passing Year", value: user.passingYear || "Not specified", color: "orange" },
                      { icon: Mail, label: "Email", value: user.email, color: "emerald" },
                      { icon: Briefcase, label: "Completed Projects", value: user.completedProjects?.length || 0, color: "rose" }
                    ].map((info, idx) => (
                      <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-white/70 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 flex items-center gap-4 shadow-sm"
                      >
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-r from-${info.color}-100 to-${info.color}-200 flex items-center justify-center flex-shrink-0 border border-${info.color}-200`}>
                          <info.icon className={`text-${info.color}-600 w-5 h-5`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-stone-500 font-medium">{info.label}</p>
                          <p className="text-sm font-semibold text-stone-900 truncate">{info.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ===== SKILLS TAB - Warm ===== */}
              {activeTab === 'skills' && (
                <motion.div key="skills" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                  <div className="p-6 rounded-2xl bg-white/70 border-2 border-amber-200 shadow-sm">
                    <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                      <Code className="text-amber-600" size={20} /> Technical Skills
                    </h3>
                    {user.skills && user.skills.length > 0 ? (
                      <motion.div className="flex flex-wrap gap-3" variants={containerVariants} initial="hidden" animate="visible">
                        {user.skills.map((skill, index) => (
                          <motion.span key={index} variants={itemVariants} whileHover={{ scale: 1.05, y: -2 }}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold border shadow-sm transition-all duration-300 cursor-default
                              ${index % 3 === 0 ? 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200' : 
                                index % 3 === 1 ? 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200' : 
                                'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200'}`}
                          >{skill}</motion.span>
                        ))}
                      </motion.div>
                    ) : (
                      <EmptyState icon={Code} message="No skills listed yet" subMessage="Add your technical skills to showcase your expertise" />
                    )}
                  </div>
                </motion.div>
              )}

              {/* ===== PROJECTS TAB - Warm ===== */}
              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600" size={20} /> Completed Projects
                  </h3>
                  {user.completedProjects && user.completedProjects.length > 0 ? (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                      {user.completedProjects.map((project, index) => (
                        <motion.div key={project._id || index} variants={itemVariants} whileHover={{ y: -3 }}
                          className="group p-5 rounded-2xl bg-white/70 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                            <h4 className="font-bold text-lg text-stone-900 group-hover:text-amber-700 transition-colors">{project.title}</h4>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1 w-fit shadow-sm">
                              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Completed
                            </span>
                          </div>
                          <p className="text-sm text-stone-700 mb-4 leading-relaxed">{project.description}</p>
                          {project.techStack?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.techStack.map((tech, i) => (
                                <span key={i} className={`px-3 py-1 rounded-lg text-xs font-medium border shadow-sm
                                  ${i % 3 === 0 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                                    i % 3 === 1 ? 'bg-orange-100 text-orange-800 border-orange-200' : 
                                    'bg-rose-100 text-rose-800 border-rose-200'}`}>{tech}</span>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-3 border-t border-amber-200">
                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-amber-600" /> {project.completedDate || 'Date not specified'}</span>
                            {project.role && (<span className="flex items-center gap-1.5"><Award size={14} className="text-orange-600" /> {project.role}</span>)}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <EmptyState icon={Briefcase} message="No completed projects yet" subMessage="Start building and showcase your work here" />
                  )}
                </motion.div>
              )}

              {/* ===== SOCIAL TAB - Warm ===== */}
              {activeTab === 'social' && (
                <motion.div key="social" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }} className="space-y-6">
                  {/* LinkedIn Card - Warm */}
                  <div className="p-6 rounded-2xl bg-white/70 border-2 border-amber-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                        <Linkedin className="text-blue-600" size={24} /> LinkedIn Profile
                      </h3>
                      {user.linkedin && (
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 font-medium transition-colors group"
                        >
                          Visit Profile <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                    {user.linkedin ? (
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Connections", value: user.linkedinStats?.connections || '500+', icon: TrendingUp, color: "blue" },
                          { label: "Experience", value: user.linkedinStats?.experience || 'N/A', icon: Briefcase, color: "amber" },
                          { label: "Education", value: user.linkedinStats?.education || user.college, icon: Building, color: "orange" }
                        ].map((item, idx) => (<SocialStat key={idx} {...item} />))}
                      </div>
                    ) : (
                      <EmptyState icon={Linkedin} message="LinkedIn not connected" subMessage="Link your profile to showcase professional experience" />
                    )}
                  </div>

                  {/* LeetCode Card - Warm */}
                  <div className="p-6 rounded-2xl bg-white/70 border-2 border-amber-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                        <Code className="text-amber-600" size={24} /> LeetCode Profile
                      </h3>
                      {user.leetcode?.profileUrl && (
                        <a href={user.leetcode.profileUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 font-medium transition-colors group"
                        >
                          Visit Profile <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                    {user.leetcode ? (
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Problems Solved", value: user.leetcode.solved || 0, icon: Target, color: "amber" },
                          { label: "Rating", value: user.leetcode.rating || 'N/A', icon: Trophy, color: "orange" },
                          { label: "Contests", value: user.leetcode.contests || 0, icon: Award, color: "rose" }
                        ].map((item, idx) => (<SocialStat key={idx} {...item} />))}
                      </div>
                    ) : (
                      <EmptyState icon={Code} message="LeetCode not connected" subMessage="Connect to showcase your problem-solving skills" />
                    )}
                  </div>

                  {/* GitHub Card - Warm */}
                  {user.github && (
                    <div className="p-6 rounded-2xl bg-white/70 border-2 border-amber-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                          <Github className="text-stone-700" size={24} /> GitHub Profile
                        </h3>
                        <a href={user.github} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-stone-700 hover:text-stone-900 font-medium transition-colors group"
                        >
                          Visit Profile <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Repositories", value: user.githubStats?.repos || 'N/A', icon: Code, color: "stone" },
                          { label: "Followers", value: user.githubStats?.followers || 'N/A', icon: User, color: "amber" },
                          { label: "Contributions", value: user.githubStats?.contributions || 'N/A', icon: TrendingUp, color: "emerald" }
                        ].map((item, idx) => (<SocialStat key={idx} {...item} />))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Custom Scrollbar CSS for Warm Light Mode */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #fcd34d; border-radius: 3px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #fcd34d transparent; }
      `}</style>
    </div>
  );
};

// ===== Reusable Components - Warm Light Theme =====

// Stat Card Component - Warm
const StatCard = ({ icon: Icon, value, label, color }) => (
  <motion.div whileHover={{ scale: 1.02 }}
    className={`bg-gradient-to-br from-${color}-100 to-${color}-200 p-5 rounded-2xl border-2 border-${color}-200 backdrop-blur-md text-center hover:border-${color}-400 transition-all shadow-sm`}
  >
    <Icon className={`w-6 h-6 text-${color}-600 mx-auto mb-2`} />
    <p className={`text-2xl font-bold bg-gradient-to-r from-${color}-600 to-${color}-500 bg-clip-text text-transparent`}>{value}</p>
    <p className="text-xs text-stone-600 font-medium">{label}</p>
  </motion.div>
);

// Social Stat Component - Warm
const SocialStat = ({ label, value, icon: Icon, color }) => {
  const colorMap = {
    blue: { bg: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-600' },
    amber: { bg: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-700', icon: 'text-amber-600' },
    orange: { bg: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-700', icon: 'text-orange-600' },
    rose: { bg: 'bg-rose-100', border: 'border-rose-200', text: 'text-rose-700', icon: 'text-rose-600' },
    emerald: { bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'text-emerald-600' },
    stone: { bg: 'bg-stone-100', border: 'border-stone-200', text: 'text-stone-700', icon: 'text-stone-600' }
  };
  const c = colorMap[color] || colorMap.amber;
  
  return (
    <motion.div whileHover={{ y: -3 }} className={`p-4 rounded-xl ${c.bg} border-2 ${c.border} backdrop-blur-md shadow-sm`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${c.icon}`} />
        <span className="text-xs text-stone-500 font-medium">{label}</span>
      </div>
      <p className={`text-lg font-bold ${c.text} truncate`}>{value}</p>
    </motion.div>
  );
};

// Empty State Component - Warm
const EmptyState = ({ icon: Icon, message, subMessage }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
    <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
      <Icon className="w-8 h-8 text-amber-600" />
    </div>
    <p className="text-stone-900 font-semibold mb-1">{message}</p>
    {subMessage && <p className="text-sm text-stone-600">{subMessage}</p>}
  </motion.div>
);

export default UserProfile;