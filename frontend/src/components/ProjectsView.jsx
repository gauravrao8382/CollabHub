import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Globe, Code, Cpu } from 'lucide-react';

const ProjectsView = ({ searchTerm }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
    <h1 className="text-2xl font-bold text-slate-800">Explore Projects</h1>
    <div className="flex gap-2 overflow-x-auto pb-2">
      {['All', 'Web Dev', 'App Dev', 'AI/ML'].map(f => (
        <button key={f} className="px-4 py-2 bg-white border border-violet-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-violet-50 whitespace-nowrap">{f}</button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array(6).fill(0).map((_, i) => (
        <motion.div key={i} whileHover={{ y: -4 }} className="p-4 rounded-2xl bg-white border border-violet-200/60 shadow-sm">
          <div className="h-24 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 mb-3 flex items-center justify-center"><Globe size={28} className="text-violet-400" /></div>
          <h3 className="font-semibold text-slate-800">Project {i+1}</h3>
          <p className="text-xs text-slate-500 mt-1">Full stack development with modern tools.</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default ProjectsView;