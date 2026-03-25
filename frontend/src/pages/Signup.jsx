import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Building, GraduationCap, Tags, CheckCircle, ArrowRight, Loader2, Home } from 'lucide-react';
import axios from "axios";
const Signup = ({ onLogin }) => {
  const API = "http://localhost:5000";

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Details
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

  const navigate = useNavigate();
  const otpInputRef = useRef(null);

  // Timer for OTP resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async(e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData.email);
    const res = await axios.post(`${API}/signup`,{
      email:formData.email
    })
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setTimer(30); // 30 seconds cooldown
      setStep(2);
      // Auto-focus OTP input in next render
      setTimeout(() => otpInputRef.current?.focus(), 100);
    }, 1500);
    alert(res.data.message)
  };

  const handleVerifyOtp = async (e) => {
  e.preventDefault();

  if (formData.otp.length < 4) {
    alert("Please enter a valid OTP");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post(`${API}/verify-otp`, {
      email: formData.email,
      otp: formData.otp
    });

    alert(res.data.message);

    setStep(3); 

  } catch (err) {
    alert(err.response?.data?.message || "Invalid OTP");
    
  }

  setLoading(false);
};

  const handleFinalSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.college || !formData.passingYear || !formData.skills) {
    alert("Please fill all details");
    return;
  }
  setLoading(true);
  try {
    await axios.post(`${API}/complete-signup`, {
      name: formData.name,
      email: formData.email,
      college: formData.college,
      passingYear: formData.passingYear,
      skills: formData.skills.split(',').map(s => s.trim()),
    });
    const res = await axios.post(`${API}/login`, {
      email: formData.email
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    onLogin(res.data.user);
    navigate('/dashboard');

  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }

  setLoading(false);
};

  const handleResendOtp = () => {
    if (timer === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTimer(30);
        alert("OTP sent again!");
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4 bg-gray-50 py-12">
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass p-8 md:p-10 rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden border border-white/60 bg-white/80 backdrop-blur-xl"
      >
        {/* Background Decor */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="relative z-10 text-center mb-8">
          <Link to="/" className="absolute top-0 left-0 p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-gray-100">
            <Home size={20} />
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {step === 1 && "Create Account"}
            {step === 2 && "Verify Email"}
            {step === 3 && "Complete Profile"}
          </h2>
          <p className="text-sm text-gray-500">
            {step === 1 && "Enter your email to get started"}
            {step === 2 && `We sent a code to ${formData.email}`}
            {step === 3 && "Tell us more about yourself"}
          </p>
          
          {/* Progress Bar */}
          <div className="flex gap-2 justify-center mt-4">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  s <= step ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* --- STEP 1: EMAIL --- */}
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOtp}
              className="space-y-6 relative z-10"
            >
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    placeholder="student@college.edu" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all" 
                    required 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                 rounded-xl font-bold cursor-pointer shadow-lg shadow-indigo-500/30
                 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] 
                 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Send OTP"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </motion.form>
          )}

          {/* --- STEP 2: OTP --- */}
          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyOtp}
              className="space-y-6 relative z-10"
            >
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Enter OTP</label>
                <input 
                  ref={otpInputRef}
                  type="text" 
                  placeholder="1234" 
                  maxLength={4}
                  className="w-full text-center tracking-[0.5em] text-2xl font-bold py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all" 
                  required 
                  value={formData.otp}
                  onChange={e => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setFormData({...formData, otp: val});
                  }} 
                />
              </div>

              <div className="text-center text-sm">
                {timer > 0 ? (
                  <p className="text-gray-400">Resend code in <span className="font-bold text-indigo-600">{timer}s</span></p>
                ) : (
                  <button type="button" onClick={handleResendOtp} className="text-indigo-600 font-semibold hover:underline">
                    Resend OTP
                  </button>
                )}
              </div>
              
              <button 
                
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                 rounded-xl font-bold cursor-pointer shadow-lg shadow-indigo-500/30
                 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] 
                 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify & Continue"}
                {!loading && <CheckCircle size={20} />}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Change Email
              </button>
            </motion.form>
          )}

          {/* --- STEP 3: DETAILS --- */}
          {step === 3 && (
            <motion.form
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleFinalSubmit}
              className="space-y-4 relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase ml-1">Passing Year</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 text-gray-400" size={18} />
                    <select 
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 appearance-none" 
                      required 
                      value={formData.passingYear}
                      onChange={e => setFormData({...formData, passingYear: e.target.value})} 
                    >
                      <option value="">Select Year</option>
                      {[2024, 2025, 2026, 2027, 2028].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase ml-1">College Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="e.g. IIT Delhi, DTU, etc." 
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50" 
                    required 
                    value={formData.college}
                    onChange={e => setFormData({...formData, college: e.target.value})} 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase ml-1">Skills (Comma separated)</label>
                <div className="relative">
                  <Tags className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="React, Node.js, Python, UI/UX" 
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50" 
                    required 
                    value={formData.skills}
                    onChange={e => setFormData({...formData, skills: e.target.value})} 
                  />
                </div>
                <p className="text-[10px] text-gray-400 ml-1">Example: React, Firebase, Tailwind</p>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                 rounded-xl font-bold cursor-pointer shadow-lg shadow-indigo-500/30
                 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] 
                 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
                {!loading && <ArrowRight size={20} />}
              </button>
            </motion.form>
          )}

        </AnimatePresence>

        <div className="mt-8 text-center relative z-10">
          <p className="text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;