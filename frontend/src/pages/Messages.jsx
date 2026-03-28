import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MessageSquare, Clock, Users, ArrowLeft, 
  ChevronRight, Sparkles, Activity, CheckCircle2
} from 'lucide-react';

const Messages = ({ user, projects }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter: Sirf woh projects jahan user member ya owner hai
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-6">
        
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search your projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Projects List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-500" />
              Your Projects
            </h2>
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {myProjects.length}
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            <AnimatePresence>
              {myProjects.length > 0 ? (
                myProjects.map((project) => (
                  <motion.button
                    key={project._id || project.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => openProjectChat(project)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition text-left group"
                  >
                    {/* Project Avatar */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {project.title?.charAt(0) || 'P'}
                      </div>
                      {/* Status Badge */}
                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                        project.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}>
                        {project.status === 'Completed' ? 
                          <CheckCircle2 size={10} className="text-white" /> : 
                          <Activity size={10} className="text-white" />
                        }
                      </span>
                    </div>
                    
                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{project.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {project.type || 'General'}
                        </span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Users size={10} />
                          {project.team?.length || 1} members
                        </span>
                      </div>
                    </div>

                    <ChevronRight size={20} className="text-gray-300 group-hover:text-indigo-500 transition" />
                  </motion.button>
                ))
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <Sparkles size={56} className="mx-auto mb-4 text-indigo-200" />
                  <h3 className="font-semibold text-gray-700 mb-1">No projects yet</h3>
                  <p className="text-sm mb-4">Join or create a project to start messaging your team.</p>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
                  >
                    Browse Projects
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Messages;