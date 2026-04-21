import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, 
  CheckCircle2, Github, Chrome, Home 
} from 'lucide-react';
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

const Login = ({ onLogin }) => {
  const API = "http://localhost:5000";
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { showError('Please enter both email and password'); return; }

    setLoading(true);
    const toastId = showLoading('Signing you in...');

    try {
      const res = await axios.post(`${API}/login`, { email, password });
      if (res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        updateToastSuccess(toastId, 'Login successful! Welcome back 🎉');
        showInfo('Redirecting to dashboard...');
        setTimeout(() => { onLogin(res.data.user); navigate('/dashboard', { state: { user: res.data.user } }); }, 1200);
      }
    } catch (err) {
      console.error('Login error:', err);
      updateToastError(toastId, err.response?.data?.message || "Invalid credentials");
    } finally { setLoading(false); }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  return (
    // 🟣 Responsive Container - Desktop Wider, Mobile Fit
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-6 sm:py-8 relative overflow-hidden">
      
      {/* 🟣 Decorative Blobs - Responsive Position */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.25, 0.12] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute top-5 sm:top-10 -left-5 sm:-left-10 w-48 h-48 sm:w-72 sm:h-72 
                   bg-violet-200/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 11, repeat: Infinity }}
          className="absolute bottom-5 sm:bottom-10 -right-5 sm:-right-10 w-48 h-48 sm:w-72 sm:h-72 
                   bg-fuchsia-200/20 rounded-full blur-3xl"
        />
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(124,58,237,0.08) 1px, transparent 0)`,
               backgroundSize: '36px 36px'
             }} 
        />
      </div>

      {/* 🔐 Login Card - Responsive Width */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-xs sm:max-w-sm md:max-w-md z-10"
      >
        {/* Clean Card */}
        <div className="p-5 sm:p-7 md:p-8 rounded-2xl 
                      bg-white border border-slate-200 backdrop-blur-sm 
                      shadow-xl shadow-violet-200/20">
          
          {/* Header with Back Button */}
          <motion.div variants={itemVariants} className="text-center mb-5 sm:mb-6 relative">
            <Link to="/" className="absolute -top-1.5 -left-1.5 p-1.5 text-slate-400 hover:text-violet-600 transition-colors rounded-lg hover:bg-slate-100">
              <Home size={16} className="sm:w-5 sm:h-5" />
            </Link>
            
            <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl 
                          bg-violet-600 mb-2.5 sm:mb-3 shadow-lg shadow-violet-600/25">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">Sign in to CollabHub</p>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
            
            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-[10px] sm:text-xs font-medium text-slate-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                <input type="email" placeholder="you@college.edu"
                  className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                           focus:ring-2 focus:ring-violet-400 focus:border-violet-500 
                           outline-none transition-all text-sm text-slate-900 placeholder-slate-400
                           hover:border-violet-300"
                  value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-[10px] sm:text-xs font-medium text-slate-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••"
                  className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                           focus:ring-2 focus:ring-violet-400 focus:border-violet-500 
                           outline-none transition-all text-sm text-slate-900 placeholder-slate-400
                           hover:border-violet-300"
                  value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-600 transition-colors"
                  disabled={loading}>
                  {showPassword ? <EyeOff size={16} className="sm:w-5 sm:h-5" /> : <Eye size={16} className="sm:w-5 sm:h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Forgot Password */}
            <motion.div variants={itemVariants} className="text-right -mt-0.5">
              <Link to="/forgot-password" className="text-[10px] sm:text-xs text-violet-600 hover:text-violet-700 transition-colors">
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <button type="submit" disabled={loading}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-violet-600 
                         text-white font-semibold text-sm hover:bg-violet-700 
                         transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 group"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 
                 <><>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></></>}
              </button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative my-3.5 sm:my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-[10px] sm:text-xs">
              <span className="px-2.5 sm:px-3 bg-white text-slate-400">or</span>
            </div>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button type="button" onClick={() => showInfo('Google login coming soon!')}
              className="flex items-center justify-center gap-1.5 py-1.5 sm:py-2 rounded-lg bg-white 
                       border border-slate-200 text-slate-600 text-[10px] sm:text-xs font-medium 
                       hover:bg-slate-50 hover:border-violet-300 transition-all duration-200"
            >
              <Chrome className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Google</span><span className="xs:hidden">G</span>
            </button>
            <button type="button" onClick={() => showInfo('GitHub login coming soon!')}
              className="flex items-center justify-center gap-1.5 py-1.5 sm:py-2 rounded-lg bg-white 
                       border border-slate-200 text-slate-600 text-[10px] sm:text-xs font-medium 
                       hover:bg-slate-50 hover:border-violet-300 transition-all duration-200"
            >
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">GitHub</span><span className="xs:hidden">GH</span>
            </button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.p variants={itemVariants} className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-slate-500">
            No account?{' '}
            <Link to="/signup" className="text-violet-600 font-medium hover:text-violet-700 transition-colors">
              Sign up
            </Link>
          </motion.p>

          {/* Back to Home */}
          <motion.p variants={itemVariants} className="mt-1.5 sm:mt-2 text-center text-[10px]">
            <Link to="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-violet-600 transition-colors">
              <ArrowRight className="w-2.5 h-2.5 rotate-180" /> Home
            </Link>
          </motion.p>
        </div>

        {/* Footer Note - Always Visible */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center text-[9px] sm:text-[10px] text-slate-400 mt-2.5 sm:mt-3 px-2"
        >
          By signing in, you agree to{' '}
          <Link to="/terms" className="text-violet-500 hover:underline">Terms</Link>
          {' '}&{' '}
          <Link to="/privacy" className="text-violet-500 hover:underline">Privacy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;