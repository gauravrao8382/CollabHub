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
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 
                    text-stone-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 
                   bg-gradient-to-r from-amber-300/40 via-orange-300/30 to-rose-300/30 
                   rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.25, 0.45, 0.25], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 
                   bg-gradient-to-r from-orange-300/40 via-rose-300/30 to-red-300/30 
                   rounded-full blur-3xl"
        />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>

      {/* 🔐 Login Card - Warm Glass */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md z-10"
      >
        {/* Glass Card - Warm Theme */}
        <div className="p-8 md:p-10 rounded-3xl 
                      bg-gradient-to-br from-white/80 to-white/60 
                      border-2 border-amber-200 backdrop-blur-md 
                      shadow-2xl shadow-amber-200/30">
          
          {/* Card Glow - Warm */}
          <div className="absolute inset-0 rounded-3xl 
                        bg-gradient-to-r from-amber-200/30 via-orange-200/20 to-rose-200/30 
                        pointer-events-none" />
          
          {/* Header with Back Button */}
          <motion.div variants={itemVariants} className="text-center mb-8 relative">
            <Link to="/" className="absolute -top-2 left-0 p-2 text-stone-500 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-100">
              <Home size={20} />
            </Link>
            
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl 
                          bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 mb-4 
                          shadow-lg shadow-amber-300/50">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 
                             bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h2>
            <p className="text-stone-600 mt-2 text-sm">Sign in to continue to CollabHub</p>
          </motion.div>

          {/* Login Form - Warm */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input type="email" placeholder="you@college.edu"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border-2 border-stone-200 
                           focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                           outline-none transition-all text-stone-900 placeholder-stone-400
                           hover:border-amber-300"
                  value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/70 border-2 border-stone-200 
                           focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                           outline-none transition-all text-stone-900 placeholder-stone-400
                           hover:border-amber-300"
                  value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-600 transition-colors"
                  disabled={loading}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Forgot Password - Warm */}
            <motion.div variants={itemVariants} className="text-right">
              <Link to="/forgot-password" className="text-sm text-amber-700 hover:text-amber-800 transition-colors font-medium">
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button - Warm Gradient */}
            <motion.div variants={itemVariants}>
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                         text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                         transition-all duration-300 shadow-lg shadow-amber-300/50 hover:shadow-amber-400/60 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : 
                 <><>Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></></>}
              </button>
            </motion.div>
          </form>

          {/* Divider - Warm */}
          <motion.div variants={itemVariants} className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/60 text-stone-600">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login - Warm */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <button type="button" onClick={() => showInfo('Google login coming soon! 🔜')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/70 
                       border-2 border-stone-200 text-stone-700 font-medium 
                       hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 shadow-sm"
            >
              <Chrome className="w-5 h-5 text-stone-500" /> Google
            </button>
            <button type="button" onClick={() => showInfo('GitHub login coming soon! 🔜')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/70 
                       border-2 border-stone-200 text-stone-700 font-medium 
                       hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 shadow-sm"
            >
              <Github className="w-5 h-5 text-stone-500" /> GitHub
            </button>
          </motion.div>

          {/* Sign Up Link - Warm */}
          <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-stone-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-amber-700 font-semibold hover:text-amber-800 transition-colors hover:underline">
              Create account
            </Link>
          </motion.p>

          {/* Back to Home - Warm */}
          <motion.p variants={itemVariants} className="mt-4 text-center text-xs text-stone-500">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-amber-700 transition-colors">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to Home
            </Link>
          </motion.p>
        </div>

        {/* Footer Note - Warm */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="text-center text-xs text-stone-500 mt-6"
        >
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-amber-700 hover:underline">Terms</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-amber-700 hover:underline">Privacy Policy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;