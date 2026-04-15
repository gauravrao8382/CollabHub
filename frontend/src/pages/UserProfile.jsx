import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ArrowLeft, 
  Mail, 
  Building, 
  Linkedin, 
  Code, 
  Award, 
  Briefcase, 
  Calendar,
  ExternalLink,
  Loader2,
  AlertCircle,
  Trophy,
  Target,
  TrendingUp,
  Star,
  CheckCircle2,
  User,
  Github,
  Globe
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-full border-4 border-violet-500/20 border-t-violet-500" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-r-fuchsia-500 animate-spin" style={{ animationDuration: '0.8s' }} />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">User not found</h2>
          <p className="text-gray-400 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 
                     text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 
                     transition-all duration-300 shadow-lg shadow-violet-500/25 
                     flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 pt-20 px-4 pb-12">
      {/* Background Decorative Elements - Old Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-fuchsia-600/10 to-violet-600/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button - Old Theme */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span>Back</span>
        </motion.button>

        {/* Profile Header - Old Theme Glass Card */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-6 md:p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 
                   backdrop-blur-sm shadow-2xl mb-8 overflow-hidden group"
        >
          {/* Hover Glow Effect - Violet/Fuchsia */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
            {/* Avatar with Ring Animation */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/10 
                           shadow-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 
                           flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              {/* Online Status */}
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-4 border-slate-900 rounded-full" />
            </motion.div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3"
              >
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {user.name}
                </span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm font-medium mb-5"
              >
                {[
                  { icon: Building, text: user.college, color: "text-violet-400" },
                  { icon: Mail, text: user.email, color: "text-fuchsia-400" },
                  ...(user.passingYear ? [{ icon: Calendar, text: `Class of ${user.passingYear}`, color: "text-emerald-400" }] : [])
                ].map((item, idx) => (
                  <span 
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 rounded-full 
                             bg-white/5 border border-white/10 
                             hover:border-violet-500/30 transition-colors"
                  >
                    <item.icon size={16} className={item.color} /> 
                    <span className="text-gray-300">{item.text}</span>
                  </span>
                ))}
              </motion.div>

              {/* Action Buttons - Old Theme */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-3"
              >
                <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 
                               text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 
                               transition-all duration-300 shadow-lg shadow-violet-500/25 
                               flex items-center gap-2 text-sm">
                  <Mail size={16} /> Contact
                </button>
                {user.linkedin && (
                  <a 
                    href={user.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 
                             text-gray-300 font-semibold hover:bg-white/10 hover:border-violet-500/30 
                             transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - Responsive Grid - Old Theme */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Briefcase, value: user.completedProjects?.length || 0, label: "Completed Projects", color: "violet" },
            { icon: Trophy, value: user.leetcode?.solved || 0, label: "LeetCode Solved", color: "amber" },
            { icon: Star, value: user.leetcode?.rating || 'N/A', label: "LeetCode Rating", color: "orange" },
            { icon: Target, value: user.skills?.length || 0, label: "Skills", color: "fuchsia" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 
                       backdrop-blur-sm hover:border-violet-500/30 transition-all duration-300 text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 
                           flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`text-${stat.color}-400 w-6 h-6`} />
              </div>
              <p className={`text-2xl font-bold bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-300 bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs Section - Old Theme Glassmorphism */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl"
        >
          {/* Tab Navigation - Old Theme */}
          <div className="flex border-b border-white/10 bg-white/5 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
            {['about', 'skills', 'projects', 'social'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[100px] lg:min-w-[140px] py-4 px-2 text-center font-semibold text-sm lg:text-base 
                         transition-all duration-300 relative capitalize ${
                  activeTab === tab 
                    ? 'text-violet-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 
                             bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" 
                  />
                )}
                {/* Hover Effect */}
                <span className="absolute inset-0 bg-violet-500/5 opacity-0 hover:opacity-100 transition-opacity rounded-t-3xl" />
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="p-6 md:p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* ===== ABOUT TAB ===== */}
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Bio Section - Old Theme */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="text-violet-400" size={20} />
                      About Me
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {user.bio || <span className="text-gray-500 italic">No bio available yet.</span>}
                    </p>
                  </div>

                  {/* Info Grid - Old Theme */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Building, label: "College", value: user.college, color: "violet" },
                      { icon: Calendar, label: "Passing Year", value: user.passingYear || "Not specified", color: "fuchsia" },
                      { icon: Mail, label: "Email", value: user.email, color: "emerald" },
                      { icon: Briefcase, label: "Completed Projects", value: user.completedProjects?.length || 0, color: "amber" }
                    ].map((info, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 
                                 hover:border-violet-500/30 transition-all duration-300 flex items-center gap-4"
                      >
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-r from-${info.color}-500/20 to-${info.color}-600/20 
                                     flex items-center justify-center flex-shrink-0`}>
                          <info.icon className={`text-${info.color}-400 w-5 h-5`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 font-medium">{info.label}</p>
                          <p className="text-sm font-semibold text-gray-200 truncate">{info.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ===== SKILLS TAB ===== */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <Code className="text-violet-400" size={20} />
                      Technical Skills
                    </h3>
                    {user.skills && user.skills.length > 0 ? (
                      <motion.div 
                        className="flex flex-wrap gap-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {user.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-4 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 
                                     border border-violet-500/20 rounded-xl text-sm font-semibold 
                                     text-violet-300 hover:text-white hover:border-violet-500/40 
                                     transition-all duration-300 cursor-default backdrop-blur-sm"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    ) : (
                      <EmptyState 
                        icon={Code}
                        message="No skills listed yet"
                        subMessage="Add your technical skills to showcase your expertise"
                      />
                    )}
                  </div>
                </motion.div>
              )}

              {/* ===== PROJECTS TAB ===== */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-400" size={20} />
                    Completed Projects
                  </h3>
                  {user.completedProjects && user.completedProjects.length > 0 ? (
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {user.completedProjects.map((project, index) => (
                        <motion.div
                          key={project._id || index}
                          variants={itemVariants}
                          whileHover={{ y: -3 }}
                          className="group p-5 rounded-2xl bg-white/5 border border-white/10 
                                   hover:border-emerald-500/30 transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                            <h4 className="font-bold text-lg text-white group-hover:text-violet-300 transition-colors">
                              {project.title}
                            </h4>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20 flex items-center gap-1 w-fit">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                          
                          {/* Tech Stack - Old Theme */}
                          {project.techStack?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.techStack.map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-gray-300 border border-white/10">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-3 border-t border-white/10">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-violet-400" /> 
                              {project.completedDate || 'Date not specified'}
                            </span>
                            {project.role && (
                              <span className="flex items-center gap-1.5">
                                <Award size={14} className="text-amber-400" /> 
                                {project.role}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <EmptyState 
                      icon={Briefcase}
                      message="No completed projects yet"
                      subMessage="Start building and showcase your work here"
                    />
                  )}
                </motion.div>
              )}

              {/* ===== SOCIAL TAB ===== */}
              {activeTab === 'social' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* LinkedIn Card - Old Theme */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Linkedin className="text-blue-400" size={24} />
                        LinkedIn Profile
                      </h3>
                      {user.linkedin && (
                        <a 
                          href={user.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                        >
                          Visit Profile 
                          <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                    {user.linkedin ? (
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Connections", value: user.linkedinStats?.connections || '500+', icon: TrendingUp, color: "blue" },
                          { label: "Experience", value: user.linkedinStats?.experience || 'N/A', icon: Briefcase, color: "violet" },
                          { label: "Education", value: user.linkedinStats?.education || user.college, icon: Building, color: "fuchsia" }
                        ].map((item, idx) => (
                          <SocialStat key={idx} {...item} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState 
                        icon={Linkedin}
                        message="LinkedIn not connected"
                        subMessage="Link your profile to showcase professional experience"
                      />
                    )}
                  </div>

                  {/* LeetCode Card - Old Theme */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Code className="text-amber-400" size={24} />
                        LeetCode Profile
                      </h3>
                      {user.leetcode?.profileUrl && (
                        <a 
                          href={user.leetcode.profileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors group"
                        >
                          Visit Profile 
                          <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                    {user.leetcode ? (
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Problems Solved", value: user.leetcode.solved || 0, icon: Target, color: "amber" },
                          { label: "Rating", value: user.leetcode.rating || 'N/A', icon: Trophy, color: "orange" },
                          { label: "Contests", value: user.leetcode.contests || 0, icon: Award, color: "red" }
                        ].map((item, idx) => (
                          <SocialStat key={idx} {...item} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState 
                        icon={Code}
                        message="LeetCode not connected"
                        subMessage="Connect to showcase your problem-solving skills"
                      />
                    )}
                  </div>

                  {/* GitHub Card (Bonus) - Old Theme */}
                  {user.github && (
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Github className="text-gray-300" size={24} />
                          GitHub Profile
                        </h3>
                        <a 
                          href={user.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-white font-medium transition-colors group"
                        >
                          Visit Profile 
                          <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Repositories", value: user.githubStats?.repos || 'N/A', icon: Code, color: "gray" },
                          { label: "Followers", value: user.githubStats?.followers || 'N/A', icon: User, color: "violet" },
                          { label: "Contributions", value: user.githubStats?.contributions || 'N/A', icon: TrendingUp, color: "emerald" }
                        ].map((item, idx) => (
                          <SocialStat key={idx} {...item} />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// ===== Reusable Components - Old Theme =====

// Stat Card Component
const StatCard = ({ icon: Icon, value, label, color }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`bg-gradient-to-br from-${color}-500/10 to-${color}-600/10 p-5 rounded-2xl 
              border border-${color}-500/20 backdrop-blur-sm text-center hover:border-${color}-500/40 transition-all`}
  >
    <Icon className={`w-6 h-6 text-${color}-400 mx-auto mb-2`} />
    <p className={`text-2xl font-bold bg-gradient-to-r from-${color}-400 to-${color}-300 bg-clip-text text-transparent`}>
      {value}
    </p>
    <p className="text-xs text-gray-400 font-medium">{label}</p>
  </motion.div>
);

// Social Stat Component
const SocialStat = ({ label, value, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -3 }}
    className={`p-4 rounded-xl bg-${color}-500/10 border border-${color}-500/20 backdrop-blur-sm`}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`w-4 h-4 text-${color}-400`} />
      <span className="text-xs text-gray-400 font-medium">{label}</span>
    </div>
    <p className={`text-lg font-bold text-${color}-300 truncate`}>{value}</p>
  </motion.div>
);

// Empty State Component - Old Theme
const EmptyState = ({ icon: Icon, message, subMessage }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-12"
  >
    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-gray-500" />
    </div>
    <p className="text-gray-300 font-semibold mb-1">{message}</p>
    {subMessage && <p className="text-sm text-gray-500">{subMessage}</p>}
  </motion.div>
);

export default UserProfile;