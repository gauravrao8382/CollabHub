import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, FileText, Plus, Users } from 'lucide-react';

const DashboardView = ({ user, searchTerm }) => {
  const tabs = [
    { id: 'applied', label: 'Applied', icon: FileText, color: 'violet', count: 2 },
    { id: 'created', label: 'Created', icon: Plus, color: 'fuchsia', count: 1 },
    { id: 'completed', label: 'Completed', icon: CheckCircle2, color: 'emerald', count: 0 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
      
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/70 rounded-xl border border-violet-200/60 w-fit backdrop-blur-md">
        {tabs.map(t => (
          <button key={t.id} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all bg-white text-${t.color}-700 shadow-sm border border-${t.color}-200`}>
            <t.icon size={14} /> {t.label} <span className={`px-2 py-0.5 text-[10px] bg-${t.color}-100 text-${t.color}-800 rounded-full`}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* Placeholder Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <motion.div key={i} whileHover={{ y: -4 }} className="p-4 rounded-2xl bg-white border border-violet-200/60 shadow-sm">
            <h3 className="font-semibold text-slate-800">AI-Powered Collab Tool</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">Building a real-time collaboration platform with AI suggestions.</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">{[1,2,3].map(j => <div key={j} className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-violet-500 to-fuchsia-500" />)}</div>
              <span className="text-xs text-slate-500 flex items-center gap-1"><Users size={12} /> 3 Members</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardView;