// components/Settings.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Lock, Smartphone, Eye, EyeOff,
  CheckCircle2, AlertCircle, LogOut, Edit2, Save,
  Mail, Key, ChevronRight
} from 'lucide-react';

// --- Settings Section Component (Warm Light Theme) ---
const SettingsSection = ({ title, icon: Icon, children, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-5 lg:p-6 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-amber-200 shadow-lg shadow-amber-100/50"
  >
    <div className="flex items-start gap-4 mb-5">
      <div className="p-2.5 rounded-xl bg-amber-100 border border-amber-200">
        <Icon size={20} className="text-amber-600" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-stone-900">{title}</h3>
        {description && <p className="text-sm text-stone-600 mt-0.5">{description}</p>}
      </div>
    </div>
    {children}
  </motion.div>
);

// --- Password Input Component (Warm Light Theme) ---
const PasswordInput = ({ label, value, onChange, placeholder, showToggle = true }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-stone-700">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white/70 border-2 border-stone-200 rounded-xl 
                   text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 
                   focus:ring-amber-400 focus:border-amber-500 transition-all hover:border-amber-300"
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

// --- Device Card Component (Warm Light Theme) ---
const DeviceCard = ({ device, onRevoke, isCurrent }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`p-4 rounded-xl border-2 flex items-center justify-between gap-4 shadow-sm ${
      isCurrent 
        ? 'bg-emerald-100 border-emerald-200' 
        : 'bg-white/70 border-amber-200'
    }`}
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className={`p-2.5 rounded-lg ${isCurrent ? 'bg-emerald-200' : 'bg-amber-100'}`}>
        <Smartphone size={18} className={isCurrent ? 'text-emerald-700' : 'text-amber-600'} />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-stone-900 truncate">{device.name}</p>
          {isCurrent && (
            <span className="px-2 py-0.5 bg-emerald-200 text-emerald-800 text-[10px] font-semibold rounded-full border border-emerald-300 shadow-sm">
              Current
            </span>
          )}
        </div>
        <p className="text-xs text-stone-600 truncate">{device.location}</p>
        <p className="text-xs text-stone-500">Last active: {device.lastActive}</p>
      </div>
    </div>
    
    {!isCurrent && (
      <button
        onClick={() => onRevoke(device.id)}
        className="p-2 text-stone-500 hover:text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
        title="Revoke access"
      >
        <LogOut size={16} />
      </button>
    )}
  </motion.div>
);

// --- Main Settings Component (Warm Light Theme) ---
const Settings = ({ user, onUpdateUser }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('security');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Password State
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  // Device Management State
  const [devices, setDevices] = useState([
    { id: 1, name: 'Chrome on Windows', location: 'Mumbai, India', lastActive: '2 minutes ago', current: true },
    { id: 2, name: 'Safari on iPhone', location: 'Delhi, India', lastActive: '2 hours ago', current: false },
    { id: 3, name: 'Firefox on Linux', location: 'Bangalore, India', lastActive: '1 day ago', current: false },
  ]);

  // Profile Settings State
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: user?.college || '',
    passingYear: user?.passingYear || '',
    skills: user?.skills?.join(', ') || '',
  });

  // Handlers
  const handlePasswordChange = (field) => (e) => {
    setPasswords(prev => ({ ...prev, [field]: e.target.value }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwords.new.length < 8) { setPasswordError('New password must be at least 8 characters'); return; }
    if (passwords.new !== passwords.confirm) { setPasswordError('New passwords do not match'); return; }
    if (!passwords.current) { setPasswordError('Please enter your current password'); return; }

    try {
      // API call: await api.changePassword({ current: passwords.current, new: passwords.new });
      setPasswordSuccess('Password changed successfully! 🔐');
      setPasswords({ current: '', new: '', confirm: '' });
      setShowPasswordForm(false);
      setTimeout(() => setPasswordSuccess(''), 3000);
    } catch (err) {
      setPasswordError('Failed to change password. Please try again.');
    }
  };

  const handleRevokeDevice = (deviceId) => { setDevices(prev => prev.filter(d => d.id !== deviceId)); };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { ...profile, skills: profile.skills.split(',').map(s => s.trim()).filter(Boolean) };
      // await api.updateProfile(updatedProfile);
      onUpdateUser?.(updatedProfile);
      alert('Profile updated successfully! ✨');
    } catch (err) { alert('Failed to update profile'); }
  };

  const handleForgotPassword = () => { navigate('/forgot-password', { state: { email: user?.email } }); };

  const sections = [
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'profile', label: 'Profile', icon: Edit2 },
    { id: 'devices', label: 'Devices', icon: Smartphone },
  ];

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 text-stone-900 relative pb-20">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-r from-amber-300/40 to-orange-300/30 rounded-full blur-3xl" />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`, backgroundSize: '64px 64px' }} />
      </div>

      {/* 🔗 Header - Warm Theme */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-amber-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-amber-700 hover:bg-amber-100 rounded-xl transition-all"
            >
              <ArrowLeft size={18} /> <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">Settings</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* 🧭 Sidebar Navigation - Warm Theme */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1 p-2 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-amber-200 shadow-lg shadow-amber-100/50">
              {sections.map((section) => (
                <button key={section.id} onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-2 border-amber-300 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-amber-50'
                  }`}
                >
                  <section.icon size={18} className={activeSection === section.id ? 'text-amber-600' : 'text-stone-500'} />
                  <span className="font-medium text-sm">{section.label}</span>
                  {activeSection === section.id && <ChevronRight size={16} className="ml-auto opacity-50 text-amber-600" />}
                </button>
              ))}
            </nav>
          </motion.aside>

          {/* ⚙️ Settings Content */}
          <div className="flex-1 space-y-6">
            <AnimatePresence mode="wait">
              
              {/* 🔐 Security Section - Warm */}
              {activeSection === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                  {/* Change Password */}
                  <SettingsSection title="Change Password" icon={Lock} description="Update your password to keep your account secure">
                    <AnimatePresence>
                      {!showPasswordForm ? (
                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowPasswordForm(true)}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-white/70 border-2 border-amber-200 hover:border-amber-400 transition-all group shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-100 border border-amber-200">
                              <Key size={18} className="text-amber-600" />
                            </div>
                            <span className="text-stone-700 font-medium">Set a new password</span>
                          </div>
                          <ArrowLeft size={16} className="text-stone-400 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      ) : (
                        <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          onSubmit={handleSubmitPassword} className="space-y-4 overflow-hidden"
                        >
                          <PasswordInput label="Current Password" value={passwords.current} onChange={handlePasswordChange('current')} placeholder="••••••••" />
                          <PasswordInput label="New Password" value={passwords.new} onChange={handlePasswordChange('new')} placeholder="Minimum 8 characters" />
                          <PasswordInput label="Confirm New Password" value={passwords.confirm} onChange={handlePasswordChange('confirm')} placeholder="••••••••" />
                          
                          {passwordError && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 p-3 rounded-lg bg-rose-100 border border-rose-200 text-rose-700 text-sm shadow-sm"
                            >
                              <AlertCircle size={16} /> {passwordError}
                            </motion.div>
                          )}
                          {passwordSuccess && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-2 p-3 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm shadow-sm"
                            >
                              <CheckCircle2 size={16} /> {passwordSuccess}
                            </motion.div>
                          )}
                          
                          <div className="flex gap-3 pt-2">
                            <button type="button" onClick={() => { setShowPasswordForm(false); setPasswords({ current: '', new: '', confirm: '' }); setPasswordError(''); }}
                              className="flex-1 px-4 py-2.5 rounded-xl bg-white/70 text-stone-700 font-medium hover:bg-amber-50 transition-colors border-2 border-amber-200 shadow-sm"
                            >Cancel</button>
                            <button type="submit"
                              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-lg shadow-amber-200/60"
                            >Update Password</button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </SettingsSection>

                  {/* Forgot Password - Warm */}
                  <SettingsSection title="Forgot Password?" icon={Key} description="Can't remember your password? Reset it via email">
                    <div className="space-y-4">
                      <p className="text-sm text-stone-600">We'll send a password reset link to your registered email address.</p>
                      <button onClick={handleForgotPassword}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/70 border-2 border-amber-200 text-stone-700 font-medium hover:border-amber-400 hover:text-amber-700 transition-all shadow-sm"
                      >
                        <Mail size={18} className="text-amber-600" /> Send Reset Link to {user?.email}
                      </button>
                    </div>
                  </SettingsSection>
                </motion.div>
              )}

              {/* 👤 Profile Section - Warm */}
              {activeSection === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <SettingsSection title="Profile Information" icon={Edit2} description="Update your personal details and preferences">
                    <form onSubmit={handleProfileUpdate} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-stone-700">Full Name</label>
                          <input type="text" value={profile.name} onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/70 border-2 border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all hover:border-amber-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-stone-700">Email</label>
                          <input type="email" value={profile.email} disabled
                            className="w-full px-4 py-3 bg-stone-100 border-2 border-stone-200 rounded-xl text-stone-500 cursor-not-allowed"
                          />
                          <p className="text-xs text-stone-500">Email cannot be changed</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-stone-700">College</label>
                          <input type="text" value={profile.college} onChange={(e) => setProfile(prev => ({ ...prev, college: e.target.value }))} placeholder="Your college name"
                            className="w-full px-4 py-3 bg-white/70 border-2 border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all hover:border-amber-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-stone-700">Passing Year</label>
                          <input type="number" value={profile.passingYear} onChange={(e) => setProfile(prev => ({ ...prev, passingYear: e.target.value }))} placeholder="2025" min="2020" max="2030"
                            className="w-full px-4 py-3 bg-white/70 border-2 border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all hover:border-amber-300"
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="text-sm font-medium text-stone-700">Skills</label>
                          <input type="text" value={profile.skills} onChange={(e) => setProfile(prev => ({ ...prev, skills: e.target.value }))} placeholder="React, Node.js, Python (comma separated)"
                            className="w-full px-4 py-3 bg-white/70 border-2 border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 transition-all hover:border-amber-300"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-4">
                        <button type="submit"
                          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-lg shadow-amber-200/60"
                        >
                          <Save size={18} /> Save Changes
                        </button>
                      </div>
                    </form>
                  </SettingsSection>
                </motion.div>
              )}

              {/* 📱 Devices Section - Warm */}
              {activeSection === 'devices' && (
                <motion.div key="devices" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <SettingsSection title="Active Sessions" icon={Smartphone} description="Manage devices where your account is logged in">
                    <div className="space-y-3">
                      <AnimatePresence>
                        {devices.map((device) => (
                          <DeviceCard key={device.id} device={device} isCurrent={device.current} onRevoke={handleRevokeDevice} />
                        ))}
                      </AnimatePresence>
                    </div>
                    {devices.length > 1 && (
                      <button onClick={() => { if (window.confirm('Revoke all other sessions?')) setDevices(prev => prev.filter(d => d.current)); }}
                        className="mt-4 flex items-center gap-2 px-4 py-2.5 text-sm text-rose-700 hover:text-rose-800 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
                      >
                        <LogOut size={16} /> Sign out from all other devices
                      </button>
                    )}
                  </SettingsSection>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Custom Scrollbar CSS for Warm Light Mode */}
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #fcd34d; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #f59e0b; }
      `}</style>
    </div>
  );
};

export default Settings;