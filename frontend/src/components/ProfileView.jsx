import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, MapPin, Camera } from 'lucide-react';

const ProfileView = ({ user }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
    <div className="relative rounded-2xl bg-white border border-violet-200/60 shadow-lg overflow-hidden">
      <div className="h-28 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500" />
      <div className="px-6 pb-6 flex flex-col md:flex-row md:items-end gap-4 -mt-12">
        <div className="w-24 h-24 rounded-2xl border-4 border-white bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-xl overflow-hidden relative">
          <span className="text-3xl font-bold text-white">{user?.name?.charAt(0)}</span>
          <button className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-violet-50"><Camera size={14} className="text-violet-600" /></button>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800">{user?.name}</h1>
          <p className="text-slate-500 flex items-center gap-1 mt-1"><GraduationCap size={14} /> {user?.college}</p>
        </div>
      </div>
    </div>

    <div className="p-6 rounded-2xl bg-white border border-violet-200/60 shadow-lg space-y-4">
      <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2"><User size={18} className="text-violet-600" /> Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1"><label className="text-xs font-medium text-slate-500">Email</label><div className="p-3 bg-slate-50 rounded-xl text-sm flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {user?.email}</div></div>
        <div className="space-y-1"><label className="text-xs font-medium text-slate-500">Location</label><div className="p-3 bg-slate-50 rounded-xl text-sm flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> Delhi, India</div></div>
      </div>
    </div>
  </motion.div>
);

export default ProfileView;