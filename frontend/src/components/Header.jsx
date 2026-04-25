import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Bell, User, ChevronDown, Plus, LogOut, Settings, PanelLeft } from 'lucide-react';

const Header = ({ user, onNavigate, onToggleSidebar, handleLogout}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 px-4 md:px-6 h-16 flex items-center justify-between">
      
      {/* ✅ Left: Sidebar Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleSidebar}
        className="p-2 md:p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition"
        aria-label="Toggle sidebar"
      >
        <PanelLeft size={16} className="md:w-4 md:h-4 text-slate-600" />
      </motion.button>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        
        {/* ✨ Create Project Button - Responsive */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate?.('create-project')}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 
                   bg-violet-600 hover:bg-violet-700 text-white text-xs md:text-sm 
                   font-medium rounded-xl transition-colors shadow-sm hover:shadow
                   whitespace-nowrap"
        >
          <Plus size={14} className="md:w-4 md:h-4" />
          <span className="hidden xs:inline">Create Project</span>
          <span className="xs:hidden">Create</span>
        </motion.button>

        {/* Messages */}
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          onClick={() => onNavigate?.('messages')} 
          className="p-2 md:p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition relative"
          aria-label="Messages"
        >
          <MessageSquare size={16} className="md:w-4 md:h-4 text-slate-600" />
          <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-2 h-2 bg-emerald-500 rounded-full border border-white animate-pulse" />
        </motion.button>

        {/* Notifications */}
        <button 
          onClick={() => onNavigate?.('notifications')}
          className="p-2 md:p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition relative"
          aria-label="Notifications"
        >
          <Bell size={16} className="md:w-4 md:h-4 text-slate-600" />
          <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-2 h-2 bg-violet-500 rounded-full border border-white" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)} 
            className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-xl hover:bg-violet-50 transition"
            aria-label="User menu"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold text-[10px] md:text-xs border-2 border-white shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <ChevronDown size={12} className="md:w-4 md:h-4 text-slate-400 hidden sm:block" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl py-1.5 z-50"
              >
                {/* User Info */}
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-800 truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email || 'user@example.com'}</p>
                </div>
                
                {/* Menu Items */}
                <button 
                  onClick={() => { onNavigate?.('profile'); setDropdownOpen(false); }} 
                  className="w-full text-left px-3 py-2 text-sm hover:bg-violet-50 text-slate-700 flex items-center gap-2"
                >
                  <User size={14} /> My Profile
                </button>
                <button 
                  onClick={() => { onNavigate?.('settings'); setDropdownOpen(false); }} 
                  className="w-full text-left px-3 py-2 text-sm hover:bg-violet-50 text-slate-700 flex items-center gap-2"
                >
                  <Settings size={14} /> Settings
                </button>
                
                <hr className="my-1.5 border-slate-100" />
                
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-3 py-2 text-sm hover:bg-rose-50 text-rose-600 font-medium flex items-center gap-2"
                >
                  <LogOut size={14} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;