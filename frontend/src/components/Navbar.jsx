import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X, Home, Briefcase, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Smooth scroll helper function
  const scrollToSection = (hash) => {
    const element = document.getElementById(hash);
    if (element) {
      const navbarHeight = 72;
      const offset = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
      window.history.pushState(null, null, `#${hash}`);
    }
  };

  // ✅ Navigation handler - only logic changed, no styling
  const handleNavClick = (href, e) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === '/') {
      if (location.pathname !== '/') navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (href.includes('#')) {
      const hash = href.split('#')[1];
      if (location.pathname === '/' || location.pathname === '') {
        scrollToSection(hash);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(hash), 100);
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Projects', href: '/#projects', icon: Briefcase },
    { name: 'About', href: '/#about', icon: Sparkles },
    { name: 'Contact', href: '/#contact', icon: MessageSquare },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 px-4 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={(e) => handleNavClick('/', e)}>
          <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span
            className={`text-lg font-bold transition-colors ${
              scrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            CollabHub
          </span>
        </Link>

        {/* Desktop Menu - ✅ Changed Link to button for hash navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(link.href, e)}
              className={`cursor-pointer px-3 py-2 text-sm font-medium transition ${
                scrolled
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right Buttons - UNCHANGED */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              scrolled
                ? 'text-slate-700 border border-slate-200 hover:bg-slate-50'
                : 'text-white border border-white/30 hover:bg-white/10'
            }`}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle - UNCHANGED */}
        <button
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu - ✅ Changed Link to button for hash navigation */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-white rounded-xl shadow p-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleNavClick(link.href, e)}
              className="block py-2 text-slate-700 text-left w-full"
            >
              {link.name}
            </button>
          ))}

          <div className="pt-2 border-t">
            <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2">Login</Link>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="block py-2 text-violet-600 font-semibold">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;