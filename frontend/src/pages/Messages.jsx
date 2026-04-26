import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Search, Users, ChevronRight, CheckCircle2, Activity } from 'lucide-react';

const Messages = ({ user, projects }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter projects where user is member or owner
  const myProjects = projects.filter((project) => {
    const isTeamMember = project.team?.some(member =>
      member._id === user?._id || member.id === user?._id || member.email === user?.email
    );
    const isOwner = project.owner === user?._id || project.owner === user?.id ||
                    project.createdBy === user?._id || project.createdBy === user?.id;
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.college?.toLowerCase().includes(searchTerm.toLowerCase());
    return (isTeamMember || isOwner) && matchesSearch;
  });

  const openProjectChat = (project) => {
    navigate(`/messages/${project._id || project.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 🔗 Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          
          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-slate-900 truncate">Messages</h1>
            <p className="text-xs text-slate-500 hidden sm:block">Connect with your project teams</p>
          </div>
          
          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold text-xs">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        
        {/* 🔍 Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl 
                       text-sm text-slate-900 placeholder-slate-400 
                       focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
              >
                <ArrowLeft size={14} className="rotate-45" />
              </button>
            )}
          </div>
        </div>

        {/* 📋 Projects List */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          
          {/* List Header */}
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
              <MessageSquare size={16} className="text-violet-600" /> Your Projects
            </h2>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {myProjects.length}
            </span>
          </div>

          {/* Projects List - ✅ Scrollbar Hidden */}
          <div className="divide-y divide-slate-100 max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-hide">
            {myProjects.length > 0 ? (
              myProjects.map((project) => (
                <button 
                  key={project._id || project.id} 
                  onClick={() => openProjectChat(project)}
                  className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition text-left group"
                >
                  {/* Project Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
                      {project.title?.charAt(0)?.toUpperCase() || 'P'}
                    </div>
                    {/* Status Badge */}
                    <span className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full border-2 border-white flex items-center justify-center ${
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
                    <h3 className="font-medium text-slate-900 truncate text-sm group-hover:text-violet-700 transition">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{project.description}</p>
                    <div className="flex items-center gap-2.5 mt-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {project.type || 'General'}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Users size={10} /> {project.team?.length || 1}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              ))
            ) : (
              /* Empty State */
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-slate-400" />
                </div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">No projects yet</h3>
                <p className="text-xs text-slate-500 mb-4">Join or create a project to start messaging.</p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 text-xs font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg transition"
                >
                  Browse Projects
                </button>
              </div>
            )}
          </div>
        </div>

      </main>

      {/* ✅ CSS to Hide Scrollbar (Cross-browser) */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
};

export default Messages;