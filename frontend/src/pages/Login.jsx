import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  Github,
  Chrome
} from 'lucide-react';
// ✅ Import toast utilities
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
    
    if (!email.trim() || !password.trim()) {
      showError('Please enter both email and password');
      return;
    }

    setLoading(true);
    const toastId = showLoading('Signing you in...');

    try {
      const res = await axios.post(`${API}/login`, { email, password });

      if (res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        updateToastSuccess(toastId, 'Login successful! Welcome back 🎉');
        showInfo('Redirecting to dashboard...');
        
        setTimeout(() => {
          onLogin(res.data.user);
          navigate('/dashboard', { state: { user: res.data.user } });
        }, 1200);
      }
    } catch (err) {
      console.error('Login error:', err);
      updateToastError(
        toastId, 
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30 text-stone-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* ===== Background Decorative Elements - Warm Tones ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Blobs - Warm */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-amber-600/30 via-orange-600/25 to-rose-600/25 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-orange-600/25 via-rose-600/20 to-red-600/20 rounded-full blur-3xl"
        />
        
        {/* Warm Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Radial Gradient Center - Warm */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50" />
      </div>

      {/* ===== Login Card - Warm Theme ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md z-10"
      >
        {/* Glassmorphism Card - Warm */}
        <div className="p-8 md:p-10 rounded-3xl bg-stone-800/40 border border-stone-700/50 backdrop-blur-xl shadow-2xl">
          
          {/* Card Glow Effect - Warm */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-rose-500/5 pointer-events-none" />
          
          {/* Logo/Brand - Warm */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 mb-4 shadow-lg shadow-amber-500/25">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h2>
            <p className="text-stone-400 mt-2 text-sm">Sign in to continue to CollabHub</p>
          </motion.div>

          {/* Login Form - Warm */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field - Warm Focus */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-stone-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                <input
                  type="email"
                  placeholder="you@college.edu"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-stone-900/50 border border-stone-700 
                           focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 
                           outline-none transition-all duration-300 text-stone-100 placeholder-stone-500
                           hover:border-stone-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </motion.div>

            {/* Password Field - Warm Focus */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-stone-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-stone-900/50 border border-stone-700 
                           focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 
                           outline-none transition-all duration-300 text-stone-100 placeholder-stone-500
                           hover:border-stone-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Forgot Password - Warm */}
            <motion.div variants={itemVariants} className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button - Warm Gradient */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                         text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                         transition-all duration-300 shadow-lg shadow-amber-500/30 
                         hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                {/* Button Hover Glow - Warm */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-rose-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Divider - Warm */}
          <motion.div 
            variants={itemVariants}
            className="relative my-8"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-700/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-stone-800/40 text-stone-400">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login Buttons - Warm Hover */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-4"
          >
            <button
              type="button"
              onClick={() => showInfo('Google login coming soon! 🔜')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-700/50 
                       border border-stone-600/50 text-stone-300 font-medium hover:bg-stone-700 
                       hover:border-amber-500/30 transition-all duration-300"
            >
              <Chrome className="w-5 h-5" />
              Google
            </button>
            <button
              type="button"
              onClick={() => showInfo('GitHub login coming soon! 🔜')}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-700/50 
                       border border-stone-600/50 text-stone-300 font-medium hover:bg-stone-700 
                       hover:border-amber-500/30 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </motion.div>

          {/* Sign Up Link - Warm */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-center text-sm text-stone-400"
          >
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-amber-400 font-semibold hover:text-amber-300 transition-colors hover:underline"
            >
              Create account
            </Link>
          </motion.p>

          {/* Back to Home - Warm */}
          <motion.p 
            variants={itemVariants}
            className="mt-4 text-center text-xs text-stone-500"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-1 hover:text-stone-300 transition-colors"
            >
              <ArrowRight className="w-3 h-3 rotate-180" />
              Back to Home
            </Link>
          </motion.p>
        </div>

        {/* Footer Note - Warm */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-stone-500 mt-6"
        >
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-amber-400 hover:underline">Terms</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;