import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, LogOut, Menu, X, Sparkles, ChevronDown, 
  MessageSquare, Bell, Settings, Home, Briefcase
} from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navbarRef = useRef(null);

  // ===== Handle scroll effect for navbar =====
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== Handle hash scrolling for anchor links =====
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          const navbarHeight = 72;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  // ===== Close mobile menu on route change =====
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // ===== Close menus on outside click =====
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && 
          !e.target.closest('.user-menu') && 
          !e.target.closest('.user-trigger')) {
        setShowUserMenu(false);
      }
      if (isOpen && navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, showUserMenu]);

  const handleLogout = () => {
    onLogout?.();
    navigate('/login');
  };

  // ===== Handle navigation with hash support AND home scroll =====
  const handleNavClick = (href, e) => {
    // Close mobile menu
    setIsOpen(false);
    
    // Handle Home link - scroll to top
    if (href === '/') {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
      }
      // Always scroll to top when Home is clicked
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // If it's a hash link and we're already on home, scroll smoothly
    if (href.includes('#') && location.pathname === '/') {
      e.preventDefault();
      const hash = href.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        const navbarHeight = 72;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, null, `#${hash}`);
      }
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home, id: 'home' },
    { name: 'Projects', href: '/#projects', icon: Briefcase, id: 'projects' },
    { name: 'About', href: '/#about', icon: Sparkles, id: 'about' },
    { name: 'Contact', href: '/#contact', icon: MessageSquare, id: 'contact' },
  ];

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  };

  const userMenuVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  return (
    <motion.nav 
      ref={navbarRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed w-full top-0 z-50 px-4 py-3 transition-all duration-300 pointer-events-auto ${
        scrolled 
          ? 'bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group pointer-events-auto"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 
                        flex items-center justify-center shadow-lg shadow-violet-500/25 
                        group-hover:shadow-violet-500/40 transition-shadow pointer-events-none">
            <Sparkles className="w-5 h-5 text-white pointer-events-none" />
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 
                         bg-clip-text text-transparent group-hover:from-violet-300 group-hover:to-cyan-300 
                         transition-all pointer-events-none">
            CollabHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || 
                           (link.href !== '/' && location.pathname.startsWith(link.href.split('#')[0]));
            
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group cursor-pointer ${
                  isActive 
                    ? 'text-violet-300' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="flex items-center gap-2 pointer-events-none">
                  <link.icon size={16} className={isActive ? 'text-violet-400' : 'text-gray-500 group-hover:text-gray-300 pointer-events-none'} />
                  {link.name}
                </span>
                {isActive && (
                  <motion.span 
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 
                             bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full pointer-events-none"
                  />
                )}
                <span className="absolute inset-0 rounded-xl bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          
          {user ? (
            <>
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/notifications')}
                className="relative p-2.5 text-gray-400 hover:text-violet-400 hover:bg-gray-800/50 
                         rounded-xl transition-all hidden sm:flex cursor-pointer"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell size={18} className="pointer-events-none" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 border-2 border-gray-900 rounded-full pointer-events-none" />
              </motion.button>

              {/* Messages */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/messages')}
                className="relative p-2.5 text-gray-400 hover:text-violet-400 hover:bg-gray-800/50 
                         rounded-xl transition-all hidden sm:flex cursor-pointer"
                title="Messages"
                aria-label="Messages"
              >
                <MessageSquare size={18} className="pointer-events-none" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 border-2 border-gray-900 rounded-full animate-pulse pointer-events-none" />
              </motion.button>

              {/* User Menu */}
              <div className="relative user-menu pointer-events-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="user-trigger flex items-center gap-2 p-1.5 pr-3 rounded-xl 
                           hover:bg-gray-800/50 transition-all border border-transparent 
                           hover:border-gray-700/50 cursor-pointer"
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 
                                p-0.5 shadow-lg shadow-violet-500/25 pointer-events-none">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center 
                                  border-2 border-gray-800 overflow-hidden pointer-events-none">
                      <span className="text-sm font-bold bg-gradient-to-r from-violet-400 to-cyan-400 
                                     bg-clip-text text-transparent pointer-events-none">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-300 hidden lg:inline pointer-events-none">
                    {user.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform pointer-events-none ${showUserMenu ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      variants={userMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 py-2 rounded-2xl bg-gray-800/90 
                               border border-gray-700/50 backdrop-blur-xl shadow-2xl z-50 overflow-hidden pointer-events-auto"
                    >
                      <div className="px-4 py-3 border-b border-gray-700/50 pointer-events-none">
                        <p className="text-sm font-semibold text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      
                      <div className="py-1">
                        {[
                          { icon: User, label: 'Profile', href: '/profile' },
                          { icon: Briefcase, label: 'Dashboard', href: '/dashboard' },
                          { icon: Settings, label: 'Settings', href: '/settings' },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 
                                     hover:bg-gray-700/50 hover:text-white transition-colors cursor-pointer"
                          >
                            <item.icon size={16} className="text-gray-500 pointer-events-none" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      
                      <div className="pt-1 border-t border-gray-700/50">
                        <button
                          onClick={() => { setShowUserMenu(false); handleLogout(); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 
                                   hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
                        >
                          <LogOut size={16} className="pointer-events-none" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            /* Auth Buttons - Desktop */
            <div className="hidden md:flex items-center gap-2 pointer-events-auto">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 
                         border border-gray-700/50 hover:bg-gray-800/50 hover:border-violet-500/30 
                         transition-all duration-300 cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 
                         text-white hover:from-violet-500 hover:to-cyan-500 transition-all duration-300 
                         shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 cursor-pointer"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2.5 text-gray-400 hover:text-violet-400 hover:bg-gray-800/50 
                     rounded-xl transition-all cursor-pointer pointer-events-auto"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} className="pointer-events-none" /> : <Menu size={20} className="pointer-events-none" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 p-4 rounded-2xl 
                     bg-gray-800/90 border border-gray-700/50 backdrop-blur-xl shadow-2xl z-40 pointer-events-auto"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 
                           hover:bg-gray-700/50 hover:text-white transition-colors cursor-pointer"
                >
                  <link.icon size={18} className="text-gray-500 pointer-events-none" />
                  {link.name}
                </Link>
              ))}
              
              <div className="my-2 border-t border-gray-700/50" />
              
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => { setIsOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 
                             hover:bg-gray-700/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <User size={18} className="text-violet-400 pointer-events-none" />
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => { setIsOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 
                             hover:bg-gray-700/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <Briefcase size={18} className="text-cyan-400 pointer-events-none" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 
                             hover:bg-rose-500/10 transition-colors text-left w-full cursor-pointer"
                  >
                    <LogOut size={18} className="pointer-events-none" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl text-center text-sm font-semibold text-gray-300 
                             border border-gray-700/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl text-center text-sm font-semibold 
                             bg-gradient-to-r from-violet-600 to-cyan-600 text-white 
                             hover:from-violet-500 hover:to-cyan-500 transition-colors cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;