import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="glass fixed w-full top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold gradient-text">CollabHub</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-700 hover:text-primary transition font-medium">Home</a>
          <a href="/#about" className="text-gray-700 hover:text-primary transition font-medium">About</a>
          <a href="/#contact" className="text-gray-700 hover:text-primary transition font-medium">Contact</a>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-primary font-semibold">
                <User size={20} /> {user.name}
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
            <Link 
            to="/login" 
                className="px-4 py-2 text-indigo-600 border-1 border-indigo-600 rounded-3xl 
                        hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 
                        hover:text-white transition font-semibold">
            Login
            </Link>
            <Link 
            to="/signup" 
                className="px-4 py-2 text-indigo-600 border-1 border-indigo-600 rounded-3xl 
                        hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 
                        hover:text-white transition font-semibold">
            SignUp
            </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute top-16 left-0 w-full p-4 flex flex-col space-y-4"
        >
          <a href="/" onClick={() => setIsOpen(false)} className="text-gray-700">Home</a>
          <a href="/#projects" onClick={() => setIsOpen(false)} className="text-gray-700">Projects</a>
          <a href="/#about" onClick={() => setIsOpen(false)} className="text-gray-700">About</a>
          <a href="/#contact" onClick={() => setIsOpen(false)} className="text-gray-700">Contact</a>
          <Link to="/login" onClick={() => setIsOpen(false)} className="text-primary font-semibold">Login</Link>
          <Link to="/signup" onClick={() => setIsOpen(false)} className="text-primary font-semibold">Signup</Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;