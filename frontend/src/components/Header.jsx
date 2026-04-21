import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Bell, User, ChevronDown } from 'lucide-react';

const Header = ({ user, onNavigate, searchTerm, setSearchTerm }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-violet-200/60 px-4 md:px-6 h-16 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-lg relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects, skills, colleges..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-violet-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onNavigate('messages')} className="p-2.5 rounded-xl bg-white border border-violet-200 hover:bg-violet-50 transition relative">
          <MessageSquare size={18} className="text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border border-white animate-pulse" />
        </motion.button>

        <button className="p-2.5 rounded-xl bg-white border border-violet-200 hover:bg-violet-50 transition relative">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full border border-white" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-2 rounded-xl hover:bg-violet-50 transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {dropdownOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-violet-200 rounded-xl shadow-xl py-2 z-50">
              <button onClick={() => { onNavigate('profile'); setDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-violet-50 text-slate-700">My Profile</button>
              <button onClick={() => { onNavigate('settings'); setDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-violet-50 text-slate-700">Settings</button>
              <hr className="my-2 border-slate-200" />
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-rose-50 text-rose-600 font-medium">Logout</button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;