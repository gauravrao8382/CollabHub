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
  CheckCircle2
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <AlertCircle size={48} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">User not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 font-semibold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </motion.button>

        {/* Profile Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass p-8 md:p-10 rounded-3xl shadow-lg mb-6 relative overflow-hidden border border-white/50 bg-white/70 backdrop-blur-xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-extrabold text-indigo-600">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">{user.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm font-medium text-gray-500 mb-4">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                  <Building size={16} className="text-purple-500"/> {user.college}
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                  <Mail size={16} className="text-indigo-500"/> {user.email}
                </span>
                {user.passingYear && (
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                    <Calendar size={16} className="text-blue-500"/> Class of {user.passingYear}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <StatCard 
            icon={Briefcase}
            value={user.completedProjects?.length || 0}
            label="Completed Projects"
            color="indigo"
          />
          <StatCard 
            icon={Trophy}
            value={user.leetcode?.solved || 0}
            label="LeetCode Solved"
            color="yellow"
          />
          <StatCard 
            icon={Star}
            value={user.leetcode?.rating || 'N/A'}
            label="LeetCode Rating"
            color="orange"
          />
          <StatCard 
            icon={Target}
            value={user.skills?.length || 0}
            label="Skills"
            color="purple"
          />
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl shadow-lg overflow-hidden border border-white/50 bg-white/60 backdrop-blur-md"
        >
          <div className="flex border-b border-gray-100 bg-white/50 backdrop-blur-md overflow-x-auto">
            {['about', 'skills', 'projects', 'social'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[120px] py-4 text-center font-bold text-sm md:text-base transition-all duration-300 relative capitalize ${
                  activeTab === tab 
                    ? 'text-indigo-600 bg-indigo-50/50' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-full" 
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 bg-gray-50/30 min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* About Tab */}
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Award className="text-indigo-600" size={20} />
                      About
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {user.bio || "No bio available"}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <InfoCard 
                      icon={Building}
                      label="College"
                      value={user.college}
                      color="purple"
                    />
                    <InfoCard 
                      icon={Calendar}
                      label="Passing Year"
                      value={user.passingYear || "Not specified"}
                      color="blue"
                    />
                    <InfoCard 
                      icon={Mail}
                      label="Email"
                      value={user.email}
                      color="indigo"
                    />
                    <InfoCard 
                      icon={Briefcase}
                      label="Completed Projects"
                      value={user.completedProjects?.length || 0}
                      color="green"
                    />
                  </div>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Code className="text-indigo-600" size={20} />
                      Technical Skills
                    </h3>
                    {user.skills && user.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {user.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-full text-sm font-semibold text-indigo-700 hover:shadow-md hover:scale-105 transition-all cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-8">No skills listed</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-600" size={20} />
                    Completed Projects
                  </h3>
                  {user.completedProjects && user.completedProjects.length > 0 ? (
                    user.completedProjects.map((project, index) => (
                      <motion.div
                        key={project._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-lg text-gray-800">{project.title}</h4>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
                            Completed
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.techStack?.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> {project.completedDate}
                          </span>
                          {project.role && (
                            <span className="flex items-center gap-1">
                              <Award size={14} /> {project.role}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <EmptyState 
                      icon={Briefcase}
                      message="No completed projects yet"
                      color="emerald"
                    />
                  )}
                </motion.div>
              )}

              {/* Social Tab */}
              {activeTab === 'social' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* LinkedIn */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Linkedin className="text-blue-600" size={24} />
                        LinkedIn Profile
                      </h3>
                      {user.linkedin && (
                        <a 
                          href={user.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Visit Profile <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    {user.linkedin ? (
                      <div className="grid md:grid-cols-3 gap-4">
                        <SocialStat 
                          label="Connections"
                          value={user.linkedinStats?.connections || '500+'}
                          icon={TrendingUp}
                          color="blue"
                        />
                        <SocialStat 
                          label="Experience"
                          value={user.linkedinStats?.experience || 'N/A'}
                          icon={Briefcase}
                          color="indigo"
                        />
                        <SocialStat 
                          label="Education"
                          value={user.linkedinStats?.education || user.college}
                          icon={Building}
                          color="purple"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-4">LinkedIn profile not linked</p>
                    )}
                  </div>

                  {/* LeetCode */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Code className="text-yellow-600" size={24} />
                        LeetCode Profile
                      </h3>
                      {user.leetcode?.profileUrl && (
                        <a 
                          href={user.leetcode.profileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                        >
                          Visit Profile <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    {user.leetcode ? (
                      <div className="grid md:grid-cols-3 gap-4">
                        <SocialStat 
                          label="Problems Solved"
                          value={user.leetcode.solved || 0}
                          icon={Target}
                          color="yellow"
                        />
                        <SocialStat 
                          label="Rating"
                          value={user.leetcode.rating || 'N/A'}
                          icon={Trophy}
                          color="orange"
                        />
                        <SocialStat 
                          label="Contests"
                          value={user.leetcode.contests || 0}
                          icon={Award}
                          color="red"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-4">LeetCode profile not linked</p>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, value, label, color }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-4 rounded-2xl border border-${color}-200 shadow-sm text-center`}
  >
    <Icon className={`w-6 h-6 text-${color}-600 mx-auto mb-2`} />
    <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
    <p className="text-xs text-gray-600 font-medium">{label}</p>
  </motion.div>
);

// Info Card Component
const InfoCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
    <div className={`w-10 h-10 rounded-full bg-${color}-50 flex items-center justify-center`}>
      <Icon className={`w-5 h-5 text-${color}-600`} />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

// Social Stat Component
const SocialStat = ({ label, value, icon: Icon, color }) => (
  <div className={`p-4 rounded-xl bg-${color}-50 border border-${color}-100`}>
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`w-4 h-4 text-${color}-600`} />
      <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
    <p className={`text-lg font-bold text-${color}-700`}>{value}</p>
  </div>
);

// Empty State Component
const EmptyState = ({ icon: Icon, message, color }) => (
  <div className="text-center py-12">
    <div className={`w-16 h-16 rounded-full bg-${color}-50 flex items-center justify-center mx-auto mb-4`}>
      <Icon className={`w-8 h-8 text-${color}-400`} />
    </div>
    <p className="text-gray-500 font-medium">{message}</p>
  </div>
);

export default UserProfile;