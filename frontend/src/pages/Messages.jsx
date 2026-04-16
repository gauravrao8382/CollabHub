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

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 text-stone-900 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-amber-300/40 via-orange-300/30 to-rose-300/40 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-orange-300/40 via-rose-300/30 to-red-300/30 rounded-full blur-3xl" />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`, backgroundSize: '64px 64px' }} />
      </div>

      {/* 🔗 Header - Warm Theme */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-amber-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/dashboard')}
              className="p-2.5 rounded-xl bg-white/70 border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-400 transition-all shadow-sm"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={20} className="text-stone-600 hover:text-amber-700 transition-colors" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">Messages</span>
              </h1>
              <p className="text-xs text-stone-600">Connect with your project teams</p>
            </div>
            
            {/* User Avatar - Warm Gradient */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-2 border-amber-200">
                <span className="text-sm font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 relative z-10">

        {/* 🔍 Search Bar - Warm Glow */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/40 via-orange-200/40 to-rose-200/40 rounded-2xl blur-xl opacity-0 focus-within:opacity-100 transition duration-300 pointer-events-none" />
          <div className="relative bg-white/70 border-2 border-amber-200 rounded-2xl flex items-center p-2 backdrop-blur-md shadow-sm">
            <Search className="ml-3 text-stone-400" size={20} />
            <input type="text" placeholder="Search your projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-4 py-3 bg-transparent border-none focus:outline-none text-stone-900 placeholder-stone-400 focus:ring-0"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="p-2 hover:bg-amber-100 rounded-lg text-stone-500 hover:text-rose-600 transition">
                <ArrowLeft size={16} className="rotate-45" />
              </button>
            )}
          </div>
        </motion.div>

        {/* 📋 Projects List Card - Warm Theme */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-3xl bg-white/80 border-2 border-amber-200 backdrop-blur-md shadow-lg shadow-amber-100/50 overflow-hidden"
        >
          {/* Card Header - Warm */}
          <div className="p-5 border-b border-amber-200 flex items-center justify-between">
            <h2 className="font-bold text-stone-900 flex items-center gap-2.5">
              <MessageSquare size={18} className="text-amber-600" /> Your Projects
            </h2>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 shadow-sm">
              {myProjects.length}
            </span>
          </div>

          {/* Projects List - Warm */}
          <div className="divide-y divide-amber-200">
            <AnimatePresence mode="popLayout">
              {myProjects.length > 0 ? (
                <motion.div variants={containerVariants} initial="hidden" animate="visible"
                  className="max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar-light"
                >
                  {myProjects.map((project) => (
                    <motion.button key={project._id || project.id} layout variants={itemVariants} whileHover={{ x: 4 }}
                      onClick={() => openProjectChat(project)}
                      className="w-full p-5 flex items-center gap-4 hover:bg-amber-50 transition text-left group border-b border-amber-200 last:border-0"
                    >
                      {/* Project Avatar with Status - Warm Gradient */}
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 
                                      flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white">
                          {project.title?.charAt(0)?.toUpperCase() || 'P'}
                        </div>
                        {/* Status Badge */}
                        <span className={`absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full border-2 border-white flex items-center justify-center shadow-sm ${
                            project.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}>
                          {project.status === 'Completed' ? <CheckCircle2 size={11} className="text-white" /> : <Activity size={11} className="text-white" />}
                        </span>
                      </div>

                      {/* Project Info - Warm */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-stone-900 truncate line-clamp-1 group-hover:text-amber-700 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-1 truncate">{project.description}</p>
                        <div className="flex items-center gap-3 mt-2.5">
                          <span className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 border border-amber-200 shadow-sm">
                            {project.type || 'General'}
                          </span>
                          <span className="text-[10px] text-stone-600 flex items-center gap-1.5">
                            <Users size={11} className="text-amber-600" /> {project.team?.length || 1} members
                          </span>
                          {project.lastMessage && (<>
                            <span className="w-1 h-1 bg-stone-300 rounded-full" />
                            <span className="text-[10px] text-stone-500 truncate max-w-[120px] line-clamp-1">{project.lastMessage}</span>
                          </>)}
                        </div>
                      </div>

                      {/* Arrow + Unread Badge - Warm */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {project.unreadCount > 0 && (
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                            {project.unreadCount > 9 ? '9+' : project.unreadCount}
                          </span>
                        )}
                        <ChevronRight size={18} className="text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <Sparkles size={40} className="text-amber-600/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">No projects yet</h3>
                  <p className="text-stone-600 text-sm mb-6 max-w-xs mx-auto">
                    Join or create a project to start messaging your team members.
                  </p>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/dashboard')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold 
                             hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-lg shadow-amber-200/60 
                             hover:shadow-amber-300/70 flex items-center gap-2 mx-auto"
                  >
                    <Zap size={16} /> Browse Projects
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 💡 Quick Tips Section - Warm Theme */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Shield, text: "All messages are encrypted end-to-end", color: "amber" },
            { icon: Clock, text: "Get notified instantly when teammates reply", color: "orange" }
          ].map((tip, idx) => (
            <motion.div key={idx} whileHover={{ y: -3 }}
              className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-${tip.color}-100 to-${tip.color}-50 border-2 border-${tip.color}-200 shadow-sm`}
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-r from-${tip.color}-200 to-${tip.color}-100 flex items-center justify-center flex-shrink-0 border border-${tip.color}-200`}>
                <tip.icon className={`text-${tip.color}-600 w-4 h-4`} />
              </div>
              <p className="text-xs text-stone-700">{tip.text}</p>
            </motion.div>
          ))}
        </motion.div>

      </main>

      {/* Custom Scrollbar CSS for Warm Light Mode */}
      <style>{`
        .custom-scrollbar-light::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar-light::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb { background: #fcd34d; border-radius: 3px; }
        .custom-scrollbar-light::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
        .custom-scrollbar-light { scrollbar-width: thin; scrollbar-color: #fcd34d transparent; }
      `}</style>
    </div>
  );
};

export default Messages;