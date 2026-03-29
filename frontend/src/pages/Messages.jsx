import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MessageSquare, Clock, Users, ArrowLeft,
  ChevronRight, Sparkles, Activity, CheckCircle2,
  Mail, Zap, Shield
} from 'lucide-react';

const Messages = ({ user, projects }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter: Projects where user is member or owner
  const myProjects = projects.filter((project) => {
    const isTeamMember = project.team?.some(member =>
      member._id === user?._id || member.id === user?._id || member.email === user?.email
    );
    const isOwner = project.owner === user?._id ||
      project.owner === user?.id ||
      project.createdBy === user?._id ||
      project.createdBy === user?.id;
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.college?.toLowerCase().includes(searchTerm.toLowerCase());

    return (isTeamMember || isOwner) && matchesSearch;
  });

  const openProjectChat = (project) => {
    navigate(`/messages/${project._id || project.id}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 text-gray-100 relative overflow-hidden">
      
      {/* ===== Background Decorative Elements ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-violet-600/25 to-cyan-600/25 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl"
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* ===== Header ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/70 border-b border-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="p-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 
                       hover:bg-gray-800 hover:border-violet-500/30 transition-all"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={20} className="text-gray-300 hover:text-violet-400 transition-colors" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Messages
                </span>
              </h1>
              <p className="text-xs text-gray-400">Connect with your project teams</p>
            </div>
            
            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center border-2 border-gray-800">
                <span className="text-sm font-bold text-violet-300">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 relative z-10">

        {/* ===== Search Bar ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-0 focus-within:opacity-100 transition duration-300 pointer-events-none" />
          <div className="relative bg-gray-800/40 border border-gray-700/50 rounded-2xl flex items-center p-2 backdrop-blur-xl">
            <Search className="ml-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search your projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none 
                       text-gray-100 placeholder-gray-500 focus:ring-0"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="p-2 hover:bg-gray-700/50 rounded-lg text-gray-400 hover:text-rose-400 transition"
              >
                <ArrowLeft size={16} className="rotate-45" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ===== Projects List Card ===== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-5 border-b border-gray-700/50 flex items-center justify-between">
            <h2 className="font-bold text-gray-100 flex items-center gap-2.5">
              <MessageSquare size={18} className="text-violet-400" />
              Your Projects
            </h2>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full 
                           bg-violet-500/20 text-violet-300 border border-violet-500/30">
              {myProjects.length}
            </span>
          </div>

          {/* Projects List */}
          <div className="divide-y divide-gray-700/30">
            <AnimatePresence mode="popLayout">
              {myProjects.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar"
                >
                  {myProjects.map((project) => (
                    <motion.button
                      key={project._id || project.id}
                      layout
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      onClick={() => openProjectChat(project)}
                      className="w-full p-5 flex items-center gap-4 hover:bg-gray-700/30 
                               transition text-left group border-b border-gray-700/30 last:border-0"
                    >
                      {/* Project Avatar with Status */}
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 
                                      flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {project.title?.charAt(0)?.toUpperCase() || 'P'}
                        </div>
                        {/* Status Badge */}
                        <span className={`absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full 
                                       border-2 border-gray-900 flex items-center justify-center ${
                                          project.status === 'Completed' 
                                            ? 'bg-emerald-500' 
                                            : 'bg-amber-500'
                                        }`}>
                          {project.status === 'Completed' ?
                            <CheckCircle2 size={11} className="text-white" /> :
                            <Activity size={11} className="text-white" />
                          }
                        </span>
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-100 truncate group-hover:text-violet-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{project.description}</p>
                        <div className="flex items-center gap-3 mt-2.5">
                          <span className="text-[10px] font-medium px-2.5 py-1 rounded-lg 
                                         bg-gray-700/50 text-gray-300 border border-gray-600/50">
                            {project.type || 'General'}
                          </span>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1.5">
                            <Users size={11} className="text-violet-400" />
                            {project.team?.length || 1} members
                          </span>
                          {project.lastMessage && (
                            <>
                              <span className="w-1 h-1 bg-gray-600 rounded-full" />
                              <span className="text-[10px] text-gray-500 truncate max-w-[120px]">
                                {project.lastMessage}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Arrow + Unread Badge */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {project.unreadCount > 0 && (
                          <span className="w-5 h-5 rounded-full bg-violet-500 text-white 
                                         text-[10px] font-bold flex items-center justify-center">
                            {project.unreadCount > 9 ? '9+' : project.unreadCount}
                          </span>
                        )}
                        <ChevronRight size={18} className="text-gray-500 group-hover:text-violet-400 
                                                         group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gray-700/50 border border-gray-600/50 
                                flex items-center justify-center mx-auto mb-5">
                    <Sparkles size={40} className="text-violet-400/50" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">No projects yet</h3>
                  <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                    Join or create a project to start messaging your team members.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 
                             text-white font-semibold hover:from-violet-500 hover:to-cyan-500 
                             transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 
                             flex items-center gap-2 mx-auto"
                  >
                    <Zap size={16} /> Browse Projects
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ===== Quick Tips Section ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {[
            { icon: Shield, text: "All messages are encrypted end-to-end", color: "violet" },
            { icon: Clock, text: "Get notified instantly when teammates reply", color: "cyan" }
          ].map((tip, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50"
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-r from-${tip.color}-500/20 to-${tip.color}-600/20 
                           flex items-center justify-center flex-shrink-0`}>
                <tip.icon className={`text-${tip.color}-400 w-4 h-4`} />
              </div>
              <p className="text-xs text-gray-400">{tip.text}</p>
            </motion.div>
          ))}
        </motion.div>

      </main>

      {/* Custom Scrollbar CSS for Dark Mode */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4b5563; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #374151 transparent; }
      `}</style>
    </div>
  );
};

export default Messages;