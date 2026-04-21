import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderOpen, FileText, User, Settings, Sparkles, ChevronLeft, ChevronRight, MessageSquare, LogOut } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ activeView, onNavigate, isCollapsed, onToggle }) => {
  return (
    <aside className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl border-r border-violet-200/60 shadow-xl z-30 transition-all duration-300 flex flex-col ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-violet-100">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <Sparkles size={18} className="text-white" />
          </div>
          {!isCollapsed && <span className="font-bold text-lg bg-gradient-to-r from-violet-700 to-fuchsia-600 bg-clip-text text-transparent">CollabHub</span>}
        </div>
        {!isCollapsed && (
          <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-violet-100 text-slate-500"><ChevronLeft size={16} /></button>
        )}
        {isCollapsed && (
          <button onClick={onToggle} className="p-1.5 rounded-lg hover:bg-violet-100 text-slate-500"><ChevronRight size={16} /></button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeView === item.id ? 'bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 border border-violet-200 shadow-sm' : 'text-slate-600 hover:bg-violet-50'}`}>
            <item.icon size={20} className={activeView === item.id ? 'text-violet-600' : 'text-slate-400'} />
            {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-violet-100 space-y-2">
        <button onClick={() => onNavigate('messages')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-violet-50 transition ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="relative"><MessageSquare size={20} /><span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 border border-white rounded-full animate-pulse"/></div>
          {!isCollapsed && <span className="font-medium text-sm">Messages</span>}
        </button>
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;