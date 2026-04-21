import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, User, Building, GraduationCap, Tags, CheckCircle2, 
  ArrowRight, Loader2, Home, ArrowLeft, Key, Sparkles 
} from 'lucide-react';
import axios from "axios";
import { showSuccess, showError, showLoading, updateToastSuccess, updateToastError, showInfo } from '../utils/toast';

const Signup = ({ onLogin }) => {
  const API = "http://localhost:5000";
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    name: '',
    college: '',
    passingYear: '',
    skills: ''
  });

  const otpInputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (step === 2 && otpInputRef.current) {
      setTimeout(() => otpInputRef.current?.focus(), 100);
    }
  }, [step]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) { showError('Please enter your college email'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { showError('Please enter a valid email address'); return; }

    setLoading(true);
    const toastId = showLoading('Sending verification code...');
    try {
      await axios.post(`${API}/signup`, { email: formData.email });
      updateToastSuccess(toastId, 'Verification code sent! Check your inbox 📧');
      setOtpSent(true); setTimer(30); setStep(2);
      setTimeout(() => otpInputRef.current?.focus(), 100);
    } catch (err) {
      console.error('Send OTP error:', err);
      updateToastError(toastId, err.response?.data?.message || "Failed to send OTP");
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (formData.otp.length < 4) { showError('Please enter the 4-digit code'); return; }
    setLoading(true);
    const toastId = showLoading('Verifying code...');
    try {
      await axios.post(`${API}/verify-otp`, { email: formData.email, otp: formData.otp });
      updateToastSuccess(toastId, 'Email verified! ✅');
      showInfo('Now complete your profile...');
      setStep(3);
    } catch (err) {
      console.error('Verify OTP error:', err);
      updateToastError(toastId, err.response?.data?.message || "Invalid code");
    } finally { setLoading(false); }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { showError('Please enter your full name'); return; }
    if (!formData.college.trim()) { showError('Please enter your college name'); return; }
    if (!formData.passingYear) { showError('Please select your passing year'); return; }
    if (!formData.skills.trim()) { showError('Please add at least one skill'); return; }

    setLoading(true);
    const toastId = showLoading('Creating your account...');
    try {
      await axios.post(`${API}/complete-signup`, {
        name: formData.name, email: formData.email, college: formData.college,
        passingYear: formData.passingYear,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      });
      const loginRes = await axios.post(`${API}/login`, { email: formData.email });
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      updateToastSuccess(toastId, 'Account created successfully! Welcome aboard 🎉');
      if (onLogin) onLogin(loginRes.data.user);
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      console.error('Signup error:', err);
      updateToastError(toastId, err.response?.data?.message || "Signup failed");
    } finally { setLoading(false); }
  };

  const handleResendOtp = async () => {
    if (timer === 0) {
      setLoading(true);
      const toastId = showLoading('Resending code...');
      try {
        await axios.post(`${API}/signup`, { email: formData.email });
        updateToastSuccess(toastId, 'New code sent! 📧');
        setTimer(30);
      } catch (err) {
        updateToastError(toastId, err.response?.data?.message || "Failed to resend");
      } finally { setLoading(false); }
    } else {
      showInfo(`Please wait ${timer}s before resending`);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  const stepVariants = {
    enter: (direction) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 30 : -30, opacity: 0 })
  };
  
  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = (newDirection) => setPage([page + newDirection, newDirection]);

  // Helper to render current step - fixes JSX adjacent elements error
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.form 
            key="step1" 
            custom={direction} 
            variants={stepVariants}
            initial="enter" 
            animate="center" 
            exit="exit"
            onSubmit={handleSendOtp} 
            className="space-y-4 sm:space-y-5 md:space-y-6 relative z-10"
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-1.5 sm:space-y-2">
              <motion.label variants={itemVariants} className="block text-[10px] sm:text-xs font-medium text-slate-600">
                College Email Address
              </motion.label>
              <motion.div variants={itemVariants} className="relative">
                <Mail className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="student@college.edu"
                  className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                           focus:ring-2 focus:ring-violet-400 focus:border-violet-500 
                           outline-none transition-all text-sm text-slate-900 placeholder-slate-400
                           hover:border-violet-300"
                  value={formData.email} 
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading} 
                  required 
                />
              </motion.div>
              <motion.p variants={itemVariants} className="text-[9px] sm:text-xs text-slate-500">
                We'll send a verification code to this email
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button 
                type="submit" 
                disabled={loading || !formData.email}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-violet-600 
                         text-white font-semibold text-sm hover:bg-violet-700 
                         transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 
                         disabled:opacity-50 flex items-center justify-center gap-1.5 group"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> <span className="hidden xs:inline">Sending</span> OTP...</>
                ) : (
                  <><span className="hidden xs:inline">Send Verification Code</span><span className="xs:hidden">Send Code</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                )}
              </button>
            </motion.div>
          </motion.form>
        );
      
      case 2:
        return (
          <motion.form 
            key="step2" 
            custom={direction} 
            variants={stepVariants}
            initial="enter" 
            animate="center" 
            exit="exit"
            onSubmit={handleVerifyOtp} 
            className="space-y-4 sm:space-y-5 md:space-y-6 relative z-10"
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2 sm:space-y-3">
              <motion.label variants={itemVariants} className="block text-[10px] sm:text-xs font-medium text-slate-600 text-center">
                Enter Verification Code
              </motion.label>
              <motion.div variants={itemVariants} className="relative">
                <Key className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                <input 
                  ref={otpInputRef} 
                  type="text" 
                  inputMode="numeric" 
                  pattern="[0-9]*"
                  placeholder="••••" 
                  maxLength={4}
                  className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                           focus:ring-2 focus:ring-violet-400 focus:border-violet-500 
                           outline-none transition-all text-sm text-slate-900 placeholder-slate-400
                           text-center text-lg sm:text-xl tracking-[0.3em] sm:tracking-[0.5em] font-mono font-bold 
                           hover:border-violet-300"
                  value={formData.otp}
                  onChange={e => setFormData({ ...formData, otp: e.target.value.replace(/[^0-9]/g, '').slice(0, 4) })}
                  disabled={loading} 
                  required 
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              {timer > 0 ? (
                <p className="text-[10px] sm:text-xs text-slate-600">
                  Resend code in <span className="font-semibold text-violet-600">{timer}s</span>
                </p>
              ) : (
                <button 
                  type="button" 
                  onClick={handleResendOtp} 
                  disabled={loading}
                  className="text-[10px] sm:text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors disabled:opacity-50"
                >
                  Resend verification code
                </button>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2 sm:space-y-3">
              <button 
                type="submit" 
                disabled={loading || formData.otp.length < 4}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-violet-600 
                         text-white font-semibold text-sm hover:bg-violet-700 
                         transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 
                         disabled:opacity-50 flex items-center justify-center gap-1.5 group"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                ) : (
                  <><span className="hidden xs:inline">Verify & Continue</span><span className="xs:hidden">Verify</span> <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" /></>
                )}
              </button>
              <button 
                type="button" 
                onClick={() => { paginate(-1); setStep(1); }} 
                disabled={loading}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                         text-slate-700 text-[10px] sm:text-xs font-medium 
                         hover:bg-slate-100 hover:border-violet-300 
                         transition-all disabled:opacity-50 
                         flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Change Email</span><span className="xs:hidden">Back</span>
              </button>
            </motion.div>
          </motion.form>
        );
      
      case 3:
        return (
          <motion.form 
            key="step3" 
            custom={direction} 
            variants={stepVariants}
            initial="enter" 
            animate="center" 
            exit="exit"
            onSubmit={handleFinalSubmit} 
            className="space-y-3 sm:space-y-4 md:space-y-5 relative z-10"
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-600">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                               focus:ring-2 focus:ring-violet-400 focus:border-violet-500 
                               outline-none transition-all text-sm text-slate-900 placeholder-slate-400 
                               hover:border-violet-300"
                      value={formData.name} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })} 
                      disabled={loading} 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-[10px] sm:text-xs font-medium text-slate-600">Passing Year</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                    <select
                      className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                               focus:ring-2 focus:ring-violet-400 focus:border-violet-500 
                               outline-none transition-all text-sm text-slate-900 appearance-none 
                               hover:border-violet-300 cursor-pointer"
                      value={formData.passingYear} 
                      onChange={e => setFormData({ ...formData, passingYear: e.target.value })} 
                      disabled={loading} 
                      required
                    >
                      <option value="" className="bg-white">Select Year</option>
                      {[2024,2025,2026,2027,2028,2029,2030].map(year => (
                        <option key={year} value={year} className="bg-white">{year}</option>
                      ))}
                    </select>
                    <ArrowRight className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
                <label className="block text-[10px] sm:text-xs font-medium text-slate-600">College Name</label>
                <div className="relative">
                  <Building className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="e.g. IIT Delhi, DTU..."
                    className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                             focus:ring-2 focus:ring-violet-400 focus:border-violet-500 
                             outline-none transition-all text-sm text-slate-900 placeholder-slate-400 
                             hover:border-violet-300"
                    value={formData.college} 
                    onChange={e => setFormData({ ...formData, college: e.target.value })} 
                    disabled={loading} 
                    required 
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1.5 sm:space-y-2">
                <label className="block text-[10px] sm:text-xs font-medium text-slate-600">Skills</label>
                <div className="relative">
                  <Tags className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="React, Node.js, Python..."
                    className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                             focus:ring-2 focus:ring-violet-400 focus:border-violet-500 
                             outline-none transition-all text-sm text-slate-900 placeholder-slate-400 
                             hover:border-violet-300"
                    value={formData.skills} 
                    onChange={e => setFormData({ ...formData, skills: e.target.value })} 
                    disabled={loading} 
                    required 
                  />
                </div>
                <p className="text-[9px] sm:text-xs text-slate-500">Separate multiple skills with commas</p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-violet-600 
                         text-white font-semibold text-sm hover:bg-violet-700 
                         transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 
                         disabled:opacity-50 flex items-center justify-center gap-1.5 group"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
                ) : (
                  <><span className="hidden xs:inline">Create My Account</span><span className="xs:hidden">Create</span> <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" /></>
                )}
              </button>
              <button 
                type="button" 
                onClick={() => { paginate(-1); setStep(2); }} 
                disabled={loading}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-slate-50 border border-slate-200 
                         text-slate-700 text-[10px] sm:text-xs font-medium 
                         hover:bg-slate-100 hover:border-violet-300 
                         transition-all disabled:opacity-50 
                         flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Back to Verification</span><span className="xs:hidden">Back</span>
              </button>
            </motion.div>
          </motion.form>
        );
      
      default:
        return null;
    }
  };

  return (
    // 🟣 Responsive Container - Violet/Slate Theme (Matching Login)
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-6 sm:py-8 relative overflow-hidden">
      
      {/* 🟣 Decorative Blobs - Responsive Position (Violet/Fuchsia) */}
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

      {/* 🔐 Signup Card - Responsive Width */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-xs sm:max-w-sm md:max-w-md z-10"
      >
        {/* Clean Card - Matching Login Style */}
        <div className="p-5 sm:p-7 md:p-8 rounded-2xl 
                      bg-white border border-slate-200 backdrop-blur-sm 
                      shadow-xl shadow-violet-200/20">
          
          {/* Header */}
          <motion.div className="text-center mb-5 sm:mb-6 relative">
            <Link to="/" className="absolute -top-1.5 -left-1.5 p-1.5 text-slate-400 hover:text-violet-600 transition-colors rounded-lg hover:bg-slate-100">
              <Home size={16} className="sm:w-5 sm:h-5" />
            </Link>
            
            {/* Step Indicator - Violet Theme */}
            <motion.div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl 
                          bg-violet-600 mb-2.5 sm:mb-3 shadow-lg shadow-violet-600/25 mx-auto">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            
            <motion.div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4 rounded-full 
                                 bg-violet-100/60 border border-violet-200">
              <span className="text-[10px] sm:text-xs font-medium text-violet-700">Step {step} of 3</span>
            </motion.div>

            {/* Title - Violet Gradient */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2">
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {step === 1 && "Create Account"}
                {step === 2 && "Verify Email"}
                {step === 3 && "Complete Profile"}
              </span>
            </h2>
            
            <p className="text-slate-500 mt-0.5 sm:mt-1 text-[10px] sm:text-xs">
              {step === 1 && "Enter your college email to get started"}
              {step === 2 && `We sent a code to ${formData.email}`}
              {step === 3 && "Tell us more about yourself"}
            </p>

            {/* Progress Bar - Violet Theme */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <motion.div
                    animate={{ 
                      width: s <= step ? '2rem' : '0.5rem',
                      backgroundColor: s <= step ? '#7c3aed' : '#ddd6fe'
                    }}
                    className={`h-1 sm:h-1.5 rounded-full ${s <= step ? 'bg-violet-500' : 'bg-violet-200'}`}
                  />
                  {s < 3 && <div className={`w-4 sm:w-8 h-1 sm:h-1.5 rounded-full ${s < step ? 'bg-violet-300' : 'bg-violet-200'}`} />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* ✅ FIXED: Using helper function to return single element per step */}
          <AnimatePresence mode="wait" custom={direction}>
            {renderStep()}
          </AnimatePresence>

          {/* Login Link - Violet Theme */}
          <motion.div className="mt-3 sm:mt-4 pt-4 sm:pt-6 border-t border-slate-200 text-center relative z-10">
            <p className="text-[10px] sm:text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-600 font-medium hover:text-violet-700 transition-colors hover:underline">
                Sign in instead
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Footer Note - Always Visible */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center text-[9px] sm:text-[10px] text-slate-400 mt-2.5 sm:mt-3 px-2"
        >
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-violet-500 hover:underline">Terms</Link>
          {' '}&{' '}
          <Link to="/privacy" className="text-violet-500 hover:underline">Privacy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;