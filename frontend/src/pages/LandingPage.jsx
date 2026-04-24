import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardView from '../components/DashboardView';
import ProjectsView from '../components/ProjectsView';
import ApplicationsView from '../components/ApplicationsView';
import ProfileView from '../components/ProfileView';
import SettingsView from '../components/SettingsView';

const LandingPage = ({user,setUser,projects,setProjects}) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth < 1024) setIsCollapsed(true); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderView = () => {
    switch(activeView) {
      case 'dashboard': return <DashboardView user={user} projects={projects} searchTerm={searchTerm} />;
      case 'projects': return <ProjectsView user={user} searchTerm={searchTerm} projects={projects} />;
      case 'applications': return <ApplicationsView user={user} projects={projects} />;
      case 'profile': return <ProfileView user={user} />;
      case 'settings': return <SettingsView user={user} />;
      default: return <DashboardView user={user} projects={projects} searchTerm={searchTerm} />;
    }
  };

  return (
    // ✅ Removed gradient, using solid bg-slate-50
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* Sidebar */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'} lg:block fixed lg:relative z-30`}>
        <Sidebar 
          activeView={activeView} 
          onNavigate={(view) => { setActiveView(view); if(window.innerWidth < 1024) setIsCollapsed(true); }} 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
      </div>

      {/* Main Content Area - ✅ DYNAMIC MARGIN based on isCollapsed */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 
        ${isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}>
        
        <Header 
          user={user} 
          onNavigate={setActiveView} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Routes>
            <Route index element={<DashboardView user={user} projects={projects} />} />
            <Route path="projects" element={<ProjectsView user={user} projects={projects} />} />
            <Route path="applications" element={<ApplicationsView user={user} projects={projects} />} />
            <Route path="profile" element={<ProfileView user={user} />} />
            <Route path="settings" element={<SettingsView user={user} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;