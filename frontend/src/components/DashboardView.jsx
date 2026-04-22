import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, FileText, Plus, Users, Briefcase, Calendar } from 'lucide-react';

const DashboardView = ({ user, projects, searchTerm }) => {
  const [activeTab, setActiveTab] = useState('applied');
  const userIdStr = user?._id?.toString();

  // 🔍 Filters aligned with your Mongoose Schema
  const appliedProjects = projects.filter(p => 
    p.applicants?.some(a => a.userId?.toString() === userIdStr)
  );
  
  const createdProjects = projects.filter(p => 
    p.owner?.toString() === userIdStr
  );
  
  // "Selected" = User accepted into the project (moved to teamMembers)
  const selectedProjects = projects.filter(p => 
    p.teamMembers?.some(m => m.userId?.toString() === userIdStr)
  );
  
  const completedProjects = projects.filter(p => 
    p.status === 'Completed' && (
      p.owner?.toString() === userIdStr ||
      p.teamMembers?.some(m => m.userId?.toString() === userIdStr)
    )
  );

  const tabs = [
    { id: 'applied', label: 'Applied', icon: FileText, count: appliedProjects.length, color: 'violet' },
    { id: 'created', label: 'Created', icon: Plus, count: createdProjects.length, color: 'fuchsia' },
    { id: 'selected', label: 'Selected', icon: Zap, count: selectedProjects.length, color: 'amber' },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, count: completedProjects.length, color: 'emerald' },
  ];

  // 🎨 Static color mapping to avoid Tailwind JIT purging
  const tabColors = {
    violet: { active: 'bg-violet-50 text-violet-700 border-violet-200', badge: 'bg-violet-100 text-violet-700' },
    fuchsia: { active: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', badge: 'bg-fuchsia-100 text-fuchsia-700' },
    amber: { active: 'bg-amber-50 text-amber-700 border-amber-200', badge: 'bg-amber-100 text-amber-700' },
    emerald: { active: 'bg-emerald-50 text-emerald-700 border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
  };

  const getActiveProjects = () => {
    let base = [];
    switch (activeTab) {
      case 'applied': base = appliedProjects; break;
      case 'created': base = createdProjects; break;
      case 'selected': base = selectedProjects; break;
      case 'completed': base = completedProjects; break;
      default: base = [];
    }

    // Apply search filter if provided
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      base = base.filter(p => 
        p.title?.toLowerCase().includes(term) || 
        p.description?.toLowerCase().includes(term) ||
        p.college?.toLowerCase().includes(term)
      );
    }
    return base;
  };

  const displayProjects = getActiveProjects();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open': return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Closed': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white/70 rounded-xl border border-slate-200/60 backdrop-blur-md w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all border ${
              activeTab === t.id
                ? `${tabColors[t.color].active} shadow-sm`
                : 'bg-transparent text-slate-500 hover:bg-slate-100 border-transparent'
            }`}
          >
            <t.icon size={14} /> {t.label}
            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${tabColors[t.color].badge}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Project Grid - Only Real Projects */}
      {displayProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayProjects.map((proj) => (
            <motion.div
              key={proj._id}
              whileHover={{ y: -4 }}
              className="group p-6 min-h-[280px] flex flex-col justify-between rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-lg text-slate-800 line-clamp-2">
                    {proj.title}
                  </h3>
                  <span className={`px-2.5 py-1 text-[11px] font-medium rounded-full shrink-0 border ${getStatusStyle(proj.status)}`}>
                    {proj.status}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {proj.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.techStack.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-50 text-slate-500">+{proj.techStack.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-fuchsia-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {proj.createdAt && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(proj.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
                    <Users size={12} /> {proj.teamMembers?.length || proj.applicants?.length || 0} Members
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200"
        >
          <Briefcase size={48} className="mb-3 opacity-40" />
          <p className="text-sm font-medium text-slate-500">No projects found in this category.</p>
          <p className="text-xs text-slate-400 mt-1">Try switching tabs or adjusting your search.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardView;