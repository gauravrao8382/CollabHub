import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', college: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy Signup Logic
    if(formData.name && formData.email && formData.college && formData.password) {
      onLogin({ name: formData.name, email: formData.email, college: formData.college });
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4">
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass p-8 rounded-2xl w-full max-w-md shadow-xl relative"
      >
        {/* Optional: Top right home icon if you prefer */}
        <Link to="/" className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>

        <h2 className="text-3xl font-bold text-center mb-6 gradient-text">Join CollabHub</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 backdrop-blur-sm" 
            required 
            onChange={e => setFormData({...formData, name: e.target.value})} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 backdrop-blur-sm" 
            required 
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="College Name" 
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 backdrop-blur-sm" 
            required 
            onChange={e => setFormData({...formData, college: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 backdrop-blur-sm" 
            required 
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />
          
          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
             border-2 border-transparent rounded-3xl font-semibold cursor-pointer
             hover:scale-105 hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 
             transition-all duration-300 ease-in-out mt-2">
            SignUp
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
          </p>
          
          {/* New Home Button Added Here */}
          <p className="text-xs text-gray-500">
            <Link to="/" className="hover:text-primary transition-colors flex items-center justify-center gap-1">
              ← Back to Home
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;