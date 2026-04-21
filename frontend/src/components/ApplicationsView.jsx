import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Settings, ExternalLink } from 'lucide-react';

const ApplicationsView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <h1 className="text-2xl font-bold text-slate-800">My Applications</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1,2].map(i => (
        <motion.div key={i} whileHover={{ y: -2 }} className="p-5 rounded-2xl bg-white border border-violet-200/60 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white font-bold">P{i}</div>
            <span className="px-2 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">Accepted</span>
          </div>
          <h3 className="font-semibold text-slate-800">Collaboration Platform {i}</h3>
          <p className="text-sm text-slate-500 line-clamp-2">Working on frontend and state management modules.</p>
          <div className="mt-auto flex gap-2 pt-2">
            <button className="flex-1 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1 hover:bg-violet-700"><Settings size={14} /> Manage</button>
            <button className="px-3 py-2 bg-white border border-violet-200 text-violet-700 rounded-lg text-sm font-medium hover:bg-violet-50"><ExternalLink size={14} /></button>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default ApplicationsView;