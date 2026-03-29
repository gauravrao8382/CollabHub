import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, User, Building, GraduationCap, Tags, CheckCircle, 
  ArrowRight, Loader2, Home, ArrowLeft, Key, Sparkles 
} from 'lucide-react';
import axios from "axios";

const Signup = ({ onLogin }) => {
  const API = "http://localhost:5000";
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    name: '',
    college: '',
    passingYear: '',
    skills: ''
  });

  const otpInputRef = useRef(null);

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Auto-focus OTP input when step changes to 2
  useEffect(() => {
    if (step === 2 && otpInputRef.current) {
      setTimeout(() => otpInputRef.current?.focus(), 100);
    }
  }, [step]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API}/signup`, { email: formData.email });
      
      setOtpSent(true);
      setTimer(30);
      setStep(2);
      
      // Show success message
      setTimeout(() => otpInputRef.current?.focus(), 100);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.otp.length < 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API}/verify-otp`, {
        email: formData.email,
        otp: formData.otp
      });

      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.college || !formData.passingYear || !formData.skills) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    
    try {
      await axios.post(`${API}/complete-signup`, {
        name: formData.name,
        email: formData.email,
        college: formData.college,
        passingYear: formData.passingYear,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      });

      const res = await axios.post(`${API}/login`, { email: formData.email });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLogin(res.data.user);
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer === 0) {
      setLoading(true);
      setError('');
      
      try {
        await axios.post(`${API}/signup`, { email: formData.email });
        setTimer(30);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to resend OTP");
      } finally {
        setLoading(false);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.08, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0
    })
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 text-gray-100 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {/* ===== Background Decorative Elements ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 -left-10 w-80 h-80 bg-gradient-to-r from-violet-600/25 to-cyan-600/25 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.15, 1, 1.15],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -15, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 -right-10 w-80 h-80 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/30" />
      </div>

      {/* ===== Signup Card ===== */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-lg z-10"
      >
        {/* Glassmorphism Card */}
        <div className="p-6 md:p-10 rounded-3xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl shadow-2xl">
          
          {/* Card Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 pointer-events-none" />
          
          {/* Header */}
          <div className="relative z-10 text-center mb-8">
            {/* Back to Home */}
            <Link 
              to="/" 
              className="absolute -top-2 left-0 p-2 text-gray-400 hover:text-violet-400 transition-colors rounded-lg hover:bg-gray-700/50"
              aria-label="Back to home"
            >
              <Home size={20} />
            </Link>

            {/* Step Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-violet-500/10 border border-violet-500/20"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-medium text-violet-300">
                Step {step} of 3
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {step === 1 && "Create Account"}
                {step === 2 && "Verify Email"}
                {step === 3 && "Complete Profile"}
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-sm text-gray-400">
              {step === 1 && "Enter your college email to get started"}
              {step === 2 && `We sent a verification code to ${formData.email}`}
              {step === 3 && "Tell us more about yourself to personalize your experience"}
            </p>

            {/* Progress Bar */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <motion.div
                    initial={false}
                    animate={{ 
                      width: s <= step ? '2rem' : '0.5rem',
                      backgroundColor: s <= step ? '#8b5cf6' : '#374151'
                    }}
                    transition={{ duration: 0.3 }}
                    className={`h-1.5 rounded-full ${s <= step ? 'bg-violet-500' : 'bg-gray-600'}`}
                  />
                  {s < 3 && (
                    <div className={`w-8 h-1.5 rounded-full ${s < step ? 'bg-violet-500/50' : 'bg-gray-700'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
              >
                <ArrowRight className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 rotate-180" />
                <p className="text-sm text-red-300">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Steps */}
          <AnimatePresence mode="wait" custom={direction}>
            
            {/* ===== STEP 1: EMAIL ===== */}
            {step === 1 && (
              <motion.form
                key="step1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onSubmit={handleSendOtp}
                className="space-y-6 relative z-10"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
                  <motion.label variants={itemVariants} className="block text-sm font-medium text-gray-300">
                    College Email Address
                  </motion.label>
                  <motion.div variants={itemVariants} className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      placeholder="student@college.edu"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 
                               focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                               outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                               hover:border-gray-600"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      disabled={loading}
                    />
                  </motion.div>
                  <motion.p variants={itemVariants} className="text-xs text-gray-500">
                    We'll send a verification code to this email
                  </motion.p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={loading || !formData.email}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 
                             text-white font-semibold hover:from-violet-500 hover:to-cyan-500 
                             transition-all duration-300 shadow-lg shadow-violet-500/25 
                             hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send Verification Code
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.form>
            )}

            {/* ===== STEP 2: OTP ===== */}
            {step === 2 && (
              <motion.form
                key="step2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onSubmit={handleVerifyOtp}
                className="space-y-6 relative z-10"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
                  <motion.label variants={itemVariants} className="block text-sm font-medium text-gray-300 text-center">
                    Enter Verification Code
                  </motion.label>
                  <motion.div variants={itemVariants} className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      ref={otpInputRef}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="••••"
                      maxLength={4}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 
                               focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                               outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                               text-center text-2xl tracking-[0.5em] font-mono font-bold
                               hover:border-gray-600"
                      required
                      value={formData.otp}
                      onChange={e => {
                        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                        setFormData({ ...formData, otp: val });
                      }}
                      disabled={loading}
                    />
                  </motion.div>
                </motion.div>

                {/* Resend OTP */}
                <motion.div variants={itemVariants} className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-gray-400">
                      Resend code in <span className="font-semibold text-violet-400">{timer}s</span>
                    </p>
                  ) : (
                    <button 
                      type="button" 
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-sm text-violet-400 font-medium hover:text-violet-300 
                               transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Resend verification code
                    </button>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading || formData.otp.length < 4}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 
                             text-white font-semibold hover:from-violet-500 hover:to-cyan-500 
                             transition-all duration-300 shadow-lg shadow-violet-500/25 
                             hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Continue
                        <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => { paginate(-1); setStep(1); }}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 
                             text-gray-300 font-medium hover:bg-gray-700 hover:border-violet-500/30 
                             transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change Email
                  </button>
                </motion.div>
              </motion.form>
            )}

            {/* ===== STEP 3: PROFILE DETAILS ===== */}
            {step === 3 && (
              <motion.form
                key="step3"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                onSubmit={handleFinalSubmit}
                className="space-y-5 relative z-10"
              >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {/* Name & Passing Year Row */}
                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 
                                   focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                                   outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                                   hover:border-gray-600"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Passing Year</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <select
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 
                                   focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                                   outline-none transition-all duration-300 text-gray-100 appearance-none
                                   hover:border-gray-600 cursor-pointer"
                          required
                          value={formData.passingYear}
                          onChange={e => setFormData({ ...formData, passingYear: e.target.value })}
                          disabled={loading}
                        >
                          <option value="" className="bg-gray-800">Select Year</option>
                          {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                            <option key={year} value={year} className="bg-gray-800">{year}</option>
                          ))}
                        </select>
                        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>

                  {/* College */}
                  <motion.div variants={itemVariants} className="space-y-2 mt-4">
                    <label className="block text-sm font-medium text-gray-300">College Name</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="e.g. IIT Delhi, DTU, NSUT..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 
                                 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                                 outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                                 hover:border-gray-600"
                        required
                        value={formData.college}
                        onChange={e => setFormData({ ...formData, college: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                  </motion.div>

                  {/* Skills */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Skills</label>
                    <div className="relative">
                      <Tags className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="React, Node.js, Python, UI/UX..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900/50 border border-gray-700 
                                 focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                                 outline-none transition-all duration-300 text-gray-100 placeholder-gray-500
                                 hover:border-gray-600"
                        required
                        value={formData.skills}
                        onChange={e => setFormData({ ...formData, skills: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Separate multiple skills with commas</p>
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 
                             text-white font-semibold hover:from-violet-500 hover:to-cyan-500 
                             transition-all duration-300 shadow-lg shadow-violet-500/25 
                             hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create My Account
                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => { paginate(-1); setStep(2); }}
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 
                             text-gray-300 font-medium hover:bg-gray-700 hover:border-violet-500/30 
                             transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Verification
                  </button>
                </motion.div>
              </motion.form>
            )}

          </AnimatePresence>

          {/* Login Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-gray-700/50 text-center relative z-10"
          >
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-violet-400 font-semibold hover:text-violet-300 transition-colors hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-500 mt-6"
        >
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-violet-400 hover:underline">Terms</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-violet-400 hover:underline">Privacy Policy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;