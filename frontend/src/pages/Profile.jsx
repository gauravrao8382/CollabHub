import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate added for logout logic
import { Camera, Mail, Building, Briefcase, PlusCircle, ArrowRight, Users, CheckCircle, Clock, Edit3, LogOut } from 'lucide-react';

// Dummy Data
const dummyApplied = [
  { id: 1, title: "AI Based Attendance System", college: "DTU Delhi", type: "AI/ML", status: "Pending", date: "2 days ago" },
  { id: 2, title: "E-Waste Management App", college: "IIT Bombay", type: "App Dev", status: "Accepted", date: "1 week ago" },
  { id: 3, title: "Smart Library System", college: "VIT Vellore", type: "IoT", status: "Rejected", date: "3 weeks ago" },
];

const dummyCreated = [
  { id: 101, title: "Campus Food Delivery", college: "Your College", type: "App Dev", applicants: 12, posted: "5 days ago" },
  { id: 102, title: "Peer to Peer Learning", college: "Your College", type: "Web Dev", applicants: 8, posted: "2 weeks ago" },
];

// Note: Ensure your App.js passes onLogout prop if you want global state cleanup
const Profile = ({ user, onLogout }) => {
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

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Call parent logout function if provided
      if (onLogout) onLogout();
      
      // Clear any local storage if used
      localStorage.removeItem('user'); 
      
      // Redirect to login or home
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Profile Header Card --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass p-8 md:p-10 rounded-3xl shadow-lg mb-8 relative overflow-hidden border border-white/50"
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
                
                {/* Action Buttons Group */}
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 text-gray-700 rounded-full font-semibold transition-all shadow-sm">
                    <Edit3 size={18} /> Edit Profile
                  </button>
                  
                  {/* NEW LOGOUT BUTTON */}
                  <button 
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 text-red-600 rounded-full font-semibold transition-all shadow-sm group"
                    title="Logout"
                  >
                    <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center shadow-sm">
                  <p className="text-3xl font-bold text-indigo-600">{dummyApplied.length}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">Applied</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center shadow-sm">
                  <p className="text-3xl font-bold text-purple-600">{dummyCreated.length}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">Created</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center shadow-sm">
                  <p className="text-3xl font-bold text-green-600">
                    {dummyApplied.filter(p => p.status === 'Accepted').length}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">Selected</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 text-center shadow-sm">
                  <p className="text-3xl font-bold text-blue-600">
                     {dummyCreated.reduce((acc, curr) => acc + curr.applicants, 0)}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">Total Applicants</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Tabs & Content Section --- */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl shadow-lg overflow-hidden min-h-[500px] border border-white/50"
        >
          {/* Tabs Header */}
          <div className="flex border-b border-gray-100 bg-white/50 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('applied')}
              className={`flex-1 py-5 text-center font-bold text-lg transition-all duration-300 relative ${
                activeTab === 'applied' 
                  ? 'text-indigo-600 bg-indigo-50/50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Briefcase size={20} /> Applied Projects
              </span>
              {activeTab === 'applied' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('created')}
              className={`flex-1 py-5 text-center font-bold text-lg transition-all duration-300 relative ${
                activeTab === 'created' 
                  ? 'text-purple-600 bg-purple-50/50' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <PlusCircle size={20} /> Created Projects
              </span>
              {activeTab === 'created' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-t-full" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 bg-gray-50/30">
            {activeTab === 'applied' ? (
              <div className="space-y-4">
                {dummyApplied.length > 0 ? (
                  dummyApplied.map((project) => (
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
                  <div className="text-center py-12">
                    <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="text-indigo-400" size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">No applications found yet.</p>
                    <Link to="/projects" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">Browse Projects</Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {dummyCreated.length > 0 ? (
                  dummyCreated.map((project) => (
                    <div key={project.id} className="group bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-purple-100 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                          <span className="flex items-center gap-1 text-green-600 font-medium"><Users size={14}/> {project.applicants} Applicants</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                         <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                           Edit
                         </button>
                         <Link to={`/project/${project.id}`} className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                           Manage <ArrowRight size={16} />
                         </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PlusCircle className="text-purple-400" size={32} />
                    </div>
                    <p className="text-gray-500 font-medium mb-4">You haven't created any projects yet.</p>
                    <Link to="/create-project" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all">
                      Create Your First Project <ArrowRight size={18} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;