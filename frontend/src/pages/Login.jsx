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

const Login = ({ onLogin }) => {
  const API = "http://localhost:5000";
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(`${API}/login`, { email, password });

      if (res.data.user) {
        setSuccess('Login successful! Redirecting...');
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        // Small delay for success animation
        setTimeout(() => {
          onLogin(res.data.user);
          navigate('/dashboard', { state: { user: res.data.user } });
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
      // Shake animation trigger could go here
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 text-gray-100 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* ===== Background Decorative Elements ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-violet-600/30 to-cyan-600/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            x: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Radial Gradient Center */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/50" />
      </div>

      {/* ===== Login Card ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md z-10"
      >
        {/* Glassmorphism Card */}
        <div className="p-8 md:p-10 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl">
          
          {/* Card Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 pointer-events-none" />
          
          {/* Logo/Brand */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 mb-4 shadow-lg shadow-violet-500/25">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h2>
            <p className="text-gray-400 mt-2 text-sm">Sign in to continue to CollabHub</p>
          </motion.div>

          {/* Alert Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-300">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="you@college.edu"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 
                           focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                           outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                           hover:border-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 
                           focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                           outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                           hover:border-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            {/* Forgot Password */}
            <motion.div variants={itemVariants} className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 
                         text-white font-semibold hover:from-violet-500 hover:to-cyan-500 
                         transition-all duration-300 shadow-lg shadow-violet-500/25 
                         hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                {/* Button Hover Glow */}
                <span className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
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

          {/* Divider */}
          <motion.div 
            variants={itemVariants}
            className="relative my-8"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800/40 text-gray-400">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-4"
          >
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-700/50 
                       border border-gray-600/50 text-gray-300 font-medium hover:bg-gray-700 
                       hover:border-violet-500/30 transition-all duration-300"
            >
              <Chrome className="w-5 h-5" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-700/50 
                       border border-gray-600/50 text-gray-300 font-medium hover:bg-gray-700 
                       hover:border-violet-500/30 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.p 
            variants={itemVariants}
            className="mt-8 text-center text-sm text-gray-400"
          >
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-violet-400 font-semibold hover:text-violet-300 transition-colors hover:underline"
            >
              Create account
            </Link>
          </motion.p>

          {/* Back to Home */}
          <motion.p 
            variants={itemVariants}
            className="mt-4 text-center text-xs text-gray-500"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-1 hover:text-gray-300 transition-colors"
            >
              <ArrowRight className="w-3 h-3 rotate-180" />
              Back to Home
            </Link>
          </motion.p>
        </div>

        {/* Footer Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-gray-500 mt-6"
        >
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-violet-400 hover:underline">Terms</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-violet-400 hover:underline">Privacy Policy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;