import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, User, Building, GraduationCap, Tags, CheckCircle, 
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

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 
                    text-stone-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-10 -left-10 w-80 h-80 
                   bg-gradient-to-r from-amber-300/40 to-orange-300/40 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.25, 0.4, 0.25], x: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-10 -right-10 w-80 h-80 
                   bg-gradient-to-r from-rose-300/40 to-red-300/40 rounded-full blur-3xl"
        />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>

      {/* 🪟 Signup Card - Warm Glass */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-lg z-10"
      >
        {/* Glass Card - Warm Theme */}
        <div className="p-6 md:p-10 rounded-3xl 
                      bg-gradient-to-br from-white/80 to-white/60 
                      border-2 border-amber-200 backdrop-blur-md shadow-2xl shadow-amber-200/30">
          
          {/* Card Glow - Warm */}
          <div className="absolute inset-0 rounded-3xl 
                        bg-gradient-to-r from-amber-200/20 to-rose-200/20 pointer-events-none" />
          
          {/* Header */}
          <div className="relative z-10 text-center mb-8">
            <Link to="/" className="absolute -top-2 left-0 p-2 text-stone-500 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-100">
              <Home size={20} />
            </Link>

            {/* Step Indicator - Warm */}
            <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full 
                                 bg-amber-200/60 border border-amber-300">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-medium text-amber-800">Step {step} of 3</span>
            </motion.div>

            {/* Title - Warm Gradient */}
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
              <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 
                             bg-clip-text text-transparent">
                {step === 1 && "Create Account"}
                {step === 2 && "Verify Email"}
                {step === 3 && "Complete Profile"}
              </span>
            </h2>
            
            <p className="text-sm text-stone-600">
              {step === 1 && "Enter your college email to get started"}
              {step === 2 && `We sent a code to ${formData.email}`}
              {step === 3 && "Tell us more about yourself"}
            </p>

            {/* Progress Bar - Warm */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <motion.div
                    animate={{ 
                      width: s <= step ? '2rem' : '0.5rem',
                      backgroundColor: s <= step ? '#ea580c' : '#fed7aa'
                    }}
                    className={`h-1.5 rounded-full ${s <= step ? 'bg-orange-500' : 'bg-amber-200'}`}
                  />
                  {s < 3 && <div className={`w-8 h-1.5 rounded-full ${s < step ? 'bg-orange-300' : 'bg-amber-200'}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            
            {/* ===== STEP 1: EMAIL ===== */}
            {step === 1 && (
              <motion.form key="step1" custom={direction} variants={stepVariants}
                initial="enter" animate="center" exit="exit"
                onSubmit={handleSendOtp} className="space-y-6 relative z-10">
                
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
                  <motion.label variants={itemVariants} className="block text-sm font-medium text-stone-700">
                    College Email Address
                  </motion.label>
                  <motion.div variants={itemVariants} className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input type="email" placeholder="student@college.edu"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border-2 border-stone-200 
                               focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                               outline-none transition-all text-stone-900 placeholder-stone-400
                               hover:border-amber-300"
                      value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      disabled={loading} required />
                  </motion.div>
                  <motion.p variants={itemVariants} className="text-xs text-stone-500">
                    We'll send a verification code to this email
                  </motion.p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button type="submit" disabled={loading || !formData.email}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                             text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                             transition-all duration-300 shadow-lg shadow-amber-300/50 
                             hover:shadow-amber-400/60 disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending OTP...</> : 
                     <><>Send Verification Code <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></></>}
                  </button>
                </motion.div>
              </motion.form>
            )}

            {/* ===== STEP 2: OTP ===== */}
            {step === 2 && (
              <motion.form key="step2" custom={direction} variants={stepVariants}
                initial="enter" animate="center" exit="exit"
                onSubmit={handleVerifyOtp} className="space-y-6 relative z-10">
                
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
                  <motion.label variants={itemVariants} className="block text-sm font-medium text-stone-700 text-center">
                    Enter Verification Code
                  </motion.label>
                  <motion.div variants={itemVariants} className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input ref={otpInputRef} type="text" inputMode="numeric" pattern="[0-9]*"
                      placeholder="••••" maxLength={4}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border-2 border-stone-200 
                               focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                               outline-none transition-all text-stone-900 placeholder-stone-400
                               text-center text-2xl tracking-[0.5em] font-mono font-bold hover:border-amber-300"
                      value={formData.otp}
                      onChange={e => setFormData({ ...formData, otp: e.target.value.replace(/[^0-9]/g, '').slice(0, 4) })}
                      disabled={loading} required />
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-stone-600">Resend code in <span className="font-semibold text-amber-700">{timer}s</span></p>
                  ) : (
                    <button type="button" onClick={handleResendOtp} disabled={loading}
                      className="text-sm text-amber-700 font-medium hover:text-amber-800 transition-colors disabled:opacity-50">
                      Resend verification code
                    </button>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3">
                  <button type="submit" disabled={loading || formData.otp.length < 4}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                             text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                             transition-all shadow-lg shadow-amber-300/50 hover:shadow-amber-400/60 
                             disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</> : 
                     <><>Verify & Continue <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" /></></>}
                  </button>
                  <button type="button" onClick={() => { paginate(-1); setStep(1); }} disabled={loading}
                    className="w-full py-3 rounded-xl bg-white/70 border-2 border-stone-200 
                             text-stone-700 font-medium hover:bg-amber-50 hover:border-amber-400 
                             transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Email
                  </button>
                </motion.div>
              </motion.form>
            )}

            {/* ===== STEP 3: PROFILE ===== */}
            {step === 3 && (
              <motion.form key="step3" custom={direction} variants={stepVariants}
                initial="enter" animate="center" exit="exit"
                onSubmit={handleFinalSubmit} className="space-y-5 relative z-10">
                
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-stone-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                        <input type="text" placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border-2 border-stone-200 
                                   focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                                   outline-none transition-all text-stone-900 placeholder-stone-400 hover:border-amber-300"
                          value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} disabled={loading} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-stone-700">Passing Year</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                        <select
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border-2 border-stone-200 
                                   focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                                   outline-none transition-all text-stone-900 appearance-none hover:border-amber-300 cursor-pointer"
                          value={formData.passingYear} onChange={e => setFormData({ ...formData, passingYear: e.target.value })} disabled={loading} required>
                          <option value="" className="bg-white">Select Year</option>
                          {[2024,2025,2026,2027,2028,2029,2030].map(year => <option key={year} value={year} className="bg-white">{year}</option>)}
                        </select>
                        <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2 mt-4">
                    <label className="block text-sm font-medium text-stone-700">College Name</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input type="text" placeholder="e.g. IIT Delhi, DTU..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border-2 border-stone-200 
                                 focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                                 outline-none transition-all text-stone-900 placeholder-stone-400 hover:border-amber-300"
                        value={formData.college} onChange={e => setFormData({ ...formData, college: e.target.value })} disabled={loading} required />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="block text-sm font-medium text-stone-700">Skills</label>
                    <div className="relative">
                      <Tags className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input type="text" placeholder="React, Node.js, Python..."
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/70 border-2 border-stone-200 
                                 focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                                 outline-none transition-all text-stone-900 placeholder-stone-400 hover:border-amber-300"
                        value={formData.skills} onChange={e => setFormData({ ...formData, skills: e.target.value })} disabled={loading} required />
                    </div>
                    <p className="text-xs text-stone-500">Separate multiple skills with commas</p>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3 pt-2">
                  <button type="submit" disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                             text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                             transition-all shadow-lg shadow-amber-300/50 hover:shadow-amber-400/60 
                             disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</> : 
                     <><>Create My Account <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" /></></>}
                  </button>
                  <button type="button" onClick={() => { paginate(-1); setStep(2); }} disabled={loading}
                    className="w-full py-3 rounded-xl bg-white/70 border-2 border-stone-200 
                             text-stone-700 font-medium hover:bg-amber-50 hover:border-amber-400 
                             transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Verification
                  </button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Login Link - Warm */}
          <motion.div className="mt-8 pt-6 border-t border-amber-200 text-center relative z-10">
            <p className="text-sm text-stone-600">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-700 font-semibold hover:text-amber-800 transition-colors hover:underline">
                Sign in instead
              </Link>
            </p>
          </motion.div>
        </div>

        <motion.p className="text-center text-xs text-stone-500 mt-6">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-amber-700 hover:underline">Terms</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-amber-700 hover:underline">Privacy Policy</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Signup;