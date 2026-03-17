import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy Login Logic
    if(email && password) {
      onLogin({ name: "Demo User", email, college: "Demo College" });
      navigate('/dashboard');
    }
  };

  return (
    // Main Container: Pure screen ko cover karega aur content ko center karega
    <div className="flex justify-center items-center min-h-screen w-full px-4">
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6 gradient-text">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 backdrop-blur-sm"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 backdrop-blur-sm"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <button
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
             border-2 border-transparent rounded-3xl font-semibold cursor-pointer
             hover:scale-105 hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 
             transition-all duration-300 ease-in-out mt-4">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">SignUp</Link>
        </p>
        <p className="text-xs text-gray-500">
                    <Link to="/" className="hover:text-primary transition-colors flex items-center justify-center gap-1">
                      ← Back to Home
                    </Link>
                  </p>
      </motion.div>
    </div>
  );
};

export default Login;