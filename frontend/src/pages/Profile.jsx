import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Camera, Mail, Building, Briefcase, PlusCircle, ArrowRight, 
  Users, CheckCircle, Clock, Edit3, LogOut, Award, LayoutGrid 
} from 'lucide-react';

// --- Dummy Data ---
const dummyApplied = [
  { id: 1, title: "AI Based Attendance System", college: "DTU Delhi", type: "AI/ML", status: "Pending", date: "2 days ago" },
  { id: 2, title: "E-Waste Management App", college: "IIT Bombay", type: "App Dev", status: "Accepted", date: "1 week ago" },
  { id: 3, title: "Smart Library System", college: "VIT Vellore", type: "IoT", status: "Rejected", date: "3 weeks ago" },
  { id: 4, title: "Blockchain Voting", college: "IIIT Delhi", type: "Web3", status: "Pending", date: "5 hours ago" },
];

const dummyCreated = [
  { id: 101, title: "Campus Food Delivery", college: "Your College", type: "App Dev", applicants: 12, posted: "5 days ago" },
  { id: 102, title: "Peer to Peer Learning", college: "Your College", type: "Web Dev", applicants: 8, posted: "2 weeks ago" },
];


const dummyCompleted = [
  { id: 201, title: "Alumni Connect Portal", college: "NSUT", type: "Web Dev", completedDate: "Jan 2024", role: "Frontend Lead" },
  { id: 202, title: "Hostel Automation", college: "Your College", type: "IoT", completedDate: "Dec 2023", role: "Hardware Engineer" },
];

const Profile = ({ user, onLogout, projects }) => {
  console.log("Profile Component - User:", user?._id);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applied');
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const [createdProject, setCreatedProject] = useState([]);
  useEffect(() => {
    if (projects && user) {
      console.log("Current User ID:", user);
      const filtered = projects.filter(
        p => String(p.owner) === String(user._id)
      );
      setCreatedProject(filtered);
    }
  }, [projects, user]);

  const [appliedProject,setAppliedProject] = useState([]);
  useEffect(()=>{
    if (projects && user) {
      console.log("Current User ID:", user);
      const filtered = projects.filter(
        p => p.applicants && p.applicants.some(applicant => String(applicant.userId) === String(user._id))
      );
      setAppliedProject(filtered);
    }
  },[projects,user])

  // const [completedProject,setCompletedProject] = useState([]);
  // useEffect(()=>{
  //   const res =axios.get(`${API}/getcompletedprojects`);
  //   setCompletedProject(res.data.completedProjects);
  // },[])

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      
      if (onLogout) onLogout();
      navigate('/'); 
    }
  };

  // Helper to handle clicking stats and switching tabs
  const handleStatClick = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Profile Header Card --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass p-8 md:p-10 rounded-3xl shadow-lg mb-8 relative overflow-hidden border border-white/50 bg-white/70 backdrop-blur-xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            
            {/* Profile Picture */}
            <div className="relative group cursor-pointer" onClick={triggerFileInput}>
              <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-extrabold text-indigo-600">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow-lg group-hover:scale-110 transition-transform border border-gray-100">
                <Camera size={20} className="text-indigo-600" />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>

            {/* User Details & Actions */}
            <div className="flex-1 text-center md:text-left w-full">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">{user?.name}</h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                      <Mail size={16} className="text-indigo-500"/> {user?.email}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                      <Building size={16} className="text-purple-500"/> {user?.college}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 text-gray-700 rounded-full font-semibold transition-all shadow-sm">
                    <Edit3 size={18} /> Edit Profile
                  </button>
                  <button 
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 text-red-600 rounded-full font-semibold transition-all shadow-sm group"
                  >
                    <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>

              {/* Stats Row (Clickable) */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => handleStatClick('applied')}
                  className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center shadow-sm hover:shadow-md hover:bg-indigo-50/50 hover:border-indigo-200 transition-all cursor-pointer group"
                >
                  <p className="text-3xl font-bold text-indigo-600 group-hover:scale-110 transition-transform">{appliedProject.length}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">Applied</p>
                </button>
                
                <button 
                  onClick={() => handleStatClick('created')}
                  className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center shadow-sm hover:shadow-md hover:bg-purple-50/50 hover:border-purple-200 transition-all cursor-pointer group"
                >
                  <p className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform">{createdProject.length}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">Created</p>
                </button>

                <button 
                  onClick={() => handleStatClick('applied')} // Selected is a subset of Applied, so we show Applied tab but user can filter visually or we just show all applied
                  className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center shadow-sm hover:shadow-md hover:bg-green-50/50 hover:border-green-200 transition-all cursor-pointer group"
                >
                  <p className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform">
                    {dummyApplied.filter(p => p.status === 'Accepted').length}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">Selected</p>
                </button>

                <button 
                  onClick={() => handleStatClick('created')} // Total applicants relates to created projects
                  className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center shadow-sm hover:shadow-md hover:bg-blue-50/50 hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <p className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform">
                     {dummyCreated.reduce((acc, curr) => acc + curr.applicants, 0)}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">Total Applicants</p>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Tabs & Content Section --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl shadow-lg overflow-hidden min-h-[500px] border border-white/50 bg-white/60 backdrop-blur-md"
        >
          {/* Tabs Header */}
          <div className="flex border-b border-gray-100 bg-white/50 backdrop-blur-md overflow-x-auto">
            <button
              onClick={() => setActiveTab('applied')}
              className={`flex-1 min-w-[120px] py-5 text-center font-bold text-lg transition-all duration-300 relative ${
                activeTab === 'applied' 
                  ? 'text-indigo-600 bg-indigo-50/50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Briefcase size={20} /> Applied
              </span>
              {activeTab === 'applied' && (
                <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-full" />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('created')}
              className={`flex-1 min-w-[120px] py-5 text-center font-bold text-lg transition-all duration-300 relative ${
                activeTab === 'created' 
                  ? 'text-purple-600 bg-purple-50/50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <PlusCircle size={20} /> Created
              </span>
              {activeTab === 'created' && (
                <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-t-full" />
              )}
            </button>

            {/* NEW COMPLETED TAB */}
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 min-w-[120px] py-5 text-center font-bold text-lg transition-all duration-300 relative ${
                activeTab === 'completed' 
                  ? 'text-emerald-600 bg-emerald-50/50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Award size={20} /> Completed
              </span>
              {activeTab === 'completed' && (
                <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-t-full" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 bg-gray-50/30 min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* --- APPLIED CONTENT --- */}
              {activeTab === 'applied' && (
                <motion.div 
                  key="applied"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {appliedProject.length > 0 ? (
                    appliedProject.map((project) => (
                      <div key={project.id} className="group bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                              project.status === 'Accepted' ? 'bg-green-50 text-green-700 border-green-200' : 
                              project.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 
                              'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center gap-3">
                            <span className="flex items-center gap-1"><Building size={14}/> {project.college}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{project.type}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="flex items-center gap-1"><Clock size={14}/> {project.date}</span>
                          </p>
                        </div>
                        <Link to={`/project/${project.id}`} className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 whitespace-nowrap">
                          View Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <EmptyState icon={Briefcase} msg="No applications found yet." link="/projects" linkText="Browse Projects" color="indigo" />
                  )}
                </motion.div>
              )}

              {/* --- CREATED CONTENT --- */}
              {activeTab === 'created' && (
                <motion.div 
                  key="created"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {createdProject.length > 0 ? (
                    createdProject.map((project) => (
                      <div key={project._id} className="group bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-purple-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">{project.title}</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              Active
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center gap-3">
                            <span className="flex items-center gap-1"><Building size={14}/> {project.college}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{project.type}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="flex items-center gap-1 text-green-600 font-medium"><Users size={14}/>{project.applicants?.length || 0} Applicants</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                           {/* Edit Button */}
                            <Link 
                              to={`/project/${project._id}/edit`}
                              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Edit3 size={16} /> Edit
                            </Link>

                            {/* Manage Button */}
                            <Link 
                              to={`/project/${project._id}/manage`}
                              className="px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Users size={16} /> Manage
                            </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyState icon={PlusCircle} msg="You haven't created any projects yet." link="/create-project" linkText="Create First Project" color="purple" />
                  )}
                </motion.div>
              )}

              {/* --- COMPLETED CONTENT (NEW) --- */}
              {activeTab === 'completed' && (
                <motion.div 
                  key="completed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {dummyCompleted.length > 0 ? (
                    dummyCompleted.map((project) => (
                      <div key={project.id} className="group bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                              <CheckCircle size={12} /> Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center gap-3">
                            <span className="flex items-center gap-1"><Building size={14}/> {project.college}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{project.type}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="flex items-center gap-1 text-emerald-600 font-medium"><Award size={14}/> {project.role}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="flex items-center gap-1 text-gray-400"><Clock size={14}/> {project.completedDate}</span>
                          </p>
                        </div>
                        <Link to={`/project/${project.id}`} className="flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-800 whitespace-nowrap">
                          View Certificate <ArrowRight size={16} />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <EmptyState icon={Award} msg="No completed projects yet." link="/projects" linkText="Find Projects" color="emerald" />
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// Simple Empty State Component to reduce repetition
const EmptyState = ({ icon: Icon, msg, link, linkText, color }) => (
  <div className="text-center py-12">
    <div className={`bg-${color}-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
      <Icon className={`text-${color}-400`} size={32} />
    </div>
    <p className="text-gray-500 font-medium mb-4">{msg}</p>
    <Link to={link} className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-${color}-600 to-${color}-500 text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all`}>
      {linkText} <ArrowRight size={18} />
    </Link>
  </div>
);

export default Profile;