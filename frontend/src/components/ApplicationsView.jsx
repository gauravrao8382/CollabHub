import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Settings, ExternalLink, Edit3, Users, 
  CheckCircle, XCircle, Clock, Eye, Plus, ArrowRight
} from 'lucide-react';

const ApplicationsView = ({ user, projects }) => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState(null);

  // 🔍 Filter: Show only projects created by current user
  const myProjects = useMemo(() => {
    const userIdStr = user?._id?.toString();
    if (!userIdStr) return [];
    
    return projects.filter(p => {
      const ownerId = p.owner?._id?.toString() || p.owner?.toString();
      return ownerId === userIdStr;
    });
  }, [projects, user]);

  // 🔀 Status-based filtering
  const filteredProjects = useMemo(() => {
    if (statusFilter === 'all') return myProjects;
    return myProjects.filter(p => p.status === statusFilter);
  }, [myProjects, statusFilter]);

  const statusTabs = [
    { id: 'all', label: 'All', count: myProjects.length },
    { id: 'Open', label: 'Open', count: myProjects.filter(p => p.status === 'Open').length },
    { id: 'Completed', label: 'Completed', count: myProjects.filter(p => p.status === 'Completed').length },
    { id: 'Closed', label: 'Closed', count: myProjects.filter(p => p.status === 'Closed').length },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open': return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Closed': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const handleCreateProject = () => {
    navigate('/create-project');
  };

  const ProjectCard = ({ proj }) => {
    const navigate = useNavigate();
    const isExpanded = expandedProject === proj._id;
    const applicantCount = proj.applicants?.length || 0;
    const teamMemberCount = proj.teamMembers?.length || 0;
    const isCompleted = proj.status === 'Completed';

    const onManageProject = (projectId) => {
      navigate(`/project/${projectId}/manage`);
    }
    const onEditProject = (projectId) => {
      navigate(`/project/${projectId}/edit`);
    }
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-violet-300 transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold shadow-sm">
              {proj.title?.charAt(0)?.toUpperCase() || 'P'}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 line-clamp-1">{proj.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getStatusStyle(proj.status)}`}>
                  {proj.status}
                </span>
                {proj.college && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <FileText size={10} /> {proj.college}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Quick Actions - Only Show Edit/Expand if NOT Completed */}
          {!isCompleted && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEditProject?.(proj)}
                className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                title="Edit Project"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => setExpandedProject(isExpanded ? null : proj._id)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                <Eye size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 mt-3 line-clamp-2">{proj.description}</p>

        {/* Tech Stack */}
        {proj.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {proj.techStack.slice(0, 5).map((tech, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600 border border-slate-200">
                {tech}
              </span>
            ))}
            {proj.techStack.length > 5 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-50 text-slate-400">
                +{proj.techStack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Expandable Section - Only Show if NOT Completed */}
        <AnimatePresence>
          {isExpanded && !isCompleted && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                
                {/* Quick Stats Row */}
                <div className="flex gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {proj.teamSize || '-'} slots
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle size={12} /> {applicantCount} applied
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} /> {teamMemberCount} selected
                  </span>
                </div>

                {/* Applicants Preview */}
                {applicantCount > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                        <Users size={12} /> Recent Applicants
                      </span>
                      <button 
                        onClick={() => onManageApplicants?.(proj)}
                        className="text-[10px] text-violet-600 hover:text-violet-700 font-medium"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="space-y-2">
                      {proj.applicants?.slice(0, 3).map((applicant, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-medium">
                              {applicant.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <div className="text-xs font-medium text-slate-700 line-clamp-1">{applicant.name}</div>
                              <div className="text-[10px] text-slate-400">{applicant.college || 'N/A'}</div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded transition-colors" title="Accept">
                              <CheckCircle size={14} />
                            </button>
                            <button className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition-colors" title="Reject">
                              <XCircle size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                {(proj.gitlink || proj.livelink) && (
                  <div className="flex gap-2">
                    {proj.gitlink && (
                      <a 
                        href={proj.gitlink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-1 transition-colors"
                      >
                        <ExternalLink size={12} /> GitHub
                      </a>
                    )}
                    {proj.livelink && (
                      <a 
                        href={proj.livelink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-2 text-xs font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-lg flex items-center justify-center gap-1 transition-colors"
                      >
                        <ExternalLink size={12} /> Live Demo
                      </a>
                    )}
                  </div>
                )}

                {/* Main Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onManageProject(proj._id)}
                    className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-violet-700 transition-colors shadow-sm"
                  >
                    <Settings size={14} /> Manage Applicants
                  </button>
                  <button
                    onClick={() => onEditProject(proj._id)}
                    className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium flex items-center justify-center gap-1 hover:bg-slate-50 transition-colors"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Actions (when not expanded) */}
        {!isExpanded && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Users size={12} /> {applicantCount} applied
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {new Date(proj.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            
            {/* ✅ CONDITIONAL BUTTONS: Completed vs Active */}
            <div className="flex gap-1.5">
              {isCompleted ? (
                // ✅ COMPLETED: Show only View Details
                <button
                  onClick={() => navigate(`/project/${proj._id}`)}
                  className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-violet-700 transition-colors"
                >
                  View Details <ArrowRight size={12} />
                </button>
              ) : (
                // ✅ ACTIVE: Show Manage + Edit
                <>
                  <button
                    onClick={() => onManageProject(proj._id)}
                    className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-violet-700 transition-colors"
                  >
                    <Settings size={12} /> Manage
                  </button>
                  <button
                    onClick={() => onEditProject(proj._id)}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-slate-50 transition-colors"
                  >
                    <Edit3 size={12} /> Edit
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* ✅ COMPLETED BADGE - Show on card footer if completed */}
        {isCompleted && (
          <div className="mt-3 pt-3 border-t border-emerald-200 flex items-center justify-end">
            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle size={10} /> Project Completed
            </span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Projects</h1>
        <button 
          onClick={handleCreateProject}
          className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-violet-700 transition-colors shadow-sm"
        >
          <Plus size={16} /> Create New
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
              statusFilter === tab.id
                ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-violet-50 hover:border-violet-200'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 text-[10px] rounded-full ${
              statusFilter === tab.id ? 'bg-white/20' : 'bg-slate-100 text-slate-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProjects.map(proj => (
            <ProjectCard key={proj._id} proj={proj} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200"
        >
          <FileText size={48} className="mb-3 opacity-30" />
          <p className="text-sm font-medium text-slate-500">
            {statusFilter === 'all' ? "You haven't created any projects yet." : `No ${statusFilter.toLowerCase()} projects found.`}
          </p>
          <button
            onClick={handleCreateProject}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            + Create Your First Project
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ApplicationsView;