import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, RefreshCw, Moon, Sun } from 'lucide-react';

const SettingsView = () => {
  const [pass, setPass] = useState({ current: '', new: '', confirm: '' });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
      
      <div className="p-6 rounded-2xl bg-white border border-violet-200/60 shadow-lg space-y-4">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2"><Lock size={18} className="text-violet-600" /> Change Password</h2>
        <div className="space-y-3">
          {['current', 'new', 'confirm'].map(type => (
            <input key={type} type="password" placeholder={type.charAt(0).toUpperCase() + type.slice(1) + ' Password'} value={pass[type]} onChange={e => setPass({...pass, [type]: e.target.value})} className="w-full p-3 border border-violet-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-400 outline-none" />
          ))}
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition">Update Password</button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-violet-200/60 shadow-lg space-y-4">
        <h2 className="font-semibold text-slate-800">Preferences</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Moon size={18} className="text-violet-600" /><span className="text-sm">Dark Mode</span></div>
          <button className="w-12 h-6 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" /></button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-rose-200/60 shadow-lg">
        <h2 className="font-semibold text-rose-700 flex items-center gap-2"><RefreshCw size={18} /> Reset Data</h2>
        <p className="text-sm text-slate-500 mt-1 mb-3">Clear all cached preferences and local data.</p>
        <button className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg text-sm font-medium hover:bg-rose-200 transition">Reset Now</button>
      </div>
    </motion.div>
  );
};

export default SettingsView;