import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Code, Users, Rocket, Mail, MapPin, Phone, Github, Linkedin, Twitter, 
  Target, Lightbulb, Heart, Building, ArrowRight, Search, Zap, Shield, 
  CheckCircle, Star, TrendingUp 
} from 'lucide-react';
import Navbar from '../components/Navbar';

// Dummy Projects Data (6 Best Projects)
const bestProjects = [
  {
    id: 1,
    title: "AI Based Attendance System",
    description: "Automated attendance using facial recognition for colleges.",
    techStack: ["Python", "OpenCV", "React"],
    teamSize: 3,
    college: "DTU Delhi",
  },
  {
    id: 2,
    title: "E-Waste Management App",
    description: "Platform to connect recyclers with households.",
    techStack: ["Flutter", "Firebase"],
    teamSize: 4,
    college: "IIT Bombay",
  },
  {
    id: 3,
    title: "College Event Manager",
    description: "Manage all college fests and events in one place.",
    techStack: ["MERN", "Tailwind"],
    teamSize: 5,
    college: "NSUT Delhi",
  },
  {
    id: 4,
    title: "Smart Library System",
    description: "IoT based book tracking and reservation system.",
    techStack: ["Arduino", "React"],
    teamSize: 2,
    college: "VIT Vellore",
  },
  {
    id: 5,
    title: "Peer to Peer Learning",
    description: "Students teach students based on expertise.",
    techStack: ["Next.js", "Supabase"],
    teamSize: 3,
    college: "IIIT Hyderabad",
  },
  {
    id: 6,
    title: "Campus Food Delivery",
    description: "Hyperlocal food delivery within campus premises.",
    techStack: ["React Native", "Node"],
    teamSize: 4,
    college: "JU Kolkata",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const browseAll = () => navigate('/login');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    // 🎨 Warm Color Background - Amber/Orange/Rose/Brown Theme
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 
                    bg-[length:100%_100%] text-stone-900 relative overflow-x-hidden">
      
      {/* 🌈 Decorative Color Blobs - Warm Tones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] 
                   bg-gradient-to-br from-amber-300/40 via-orange-300/30 to-yellow-300/35 
                   rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -3, 3, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] 
                   bg-gradient-to-tr from-rose-300/35 via-pink-300/25 to-red-300/30 
                   rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[700px] h-[700px] 
                   bg-gradient-to-r from-orange-200/30 via-amber-200/20 to-yellow-200/25 
                   rounded-full blur-3xl"
        />
        {/* Subtle Pattern Overlay - Warm Brown Dots */}
        <div className="absolute inset-0 opacity-35" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.12) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>

      <Navbar />
      
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 🔥 Hero Section - Warm Vibrant Colors */}
        <section id="home" className="relative py-24 lg:py-32">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto text-center"
          >
            {/* Badge - Warm Gradient */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full 
                       bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200 
                       border border-amber-300 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-amber-800 via-orange-700 to-rose-700 bg-clip-text text-transparent">
                🚀 For Students, By Students
              </span>
            </motion.div>

            {/* Main Heading - Warm Gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 
                             bg-[length:200%_200%] animate-gradient bg-clip-text text-transparent">
                Hire Your Team
              </span>
              <br />
              <span className="text-stone-800">Build Your Dream Project</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-stone-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with talented students from top colleges. Post your project idea,
              find the right teammates, and bring your vision to life — all on{' '}
              <span className="text-amber-700 font-semibold">CollabHub</span>.
            </p>

            {/* CTA Buttons - Warm Colors */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a
                href="/#projects"
                className="group px-8 py-4 rounded-xl text-lg font-semibold 
                         border-2 border-amber-400 
                         bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 
                         hover:from-amber-200 hover:via-orange-200 hover:to-rose-200 
                         text-amber-800 hover:text-amber-900 transition-all duration-300 
                         flex items-center justify-center gap-2 backdrop-blur-sm shadow-md"
              >
                <Search size={20} className="group-hover:scale-110 transition-transform" /> 
                Find Teammates
              </a>
              <Link
                to="/create-project"
                className="group px-8 py-4 rounded-xl text-lg font-semibold 
                         bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                         hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                         text-white shadow-xl shadow-amber-300/50 
                         hover:shadow-amber-400/60 transition-all duration-300 
                         flex items-center justify-center gap-2"
              >
                <Zap size={20} className="group-hover:scale-110 transition-transform" /> 
                Post a Project
              </Link>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 text-sm"
            >
              {[
                { icon: Shield, text: "Verified Students", color: "text-amber-700", bg: "bg-amber-100" },
                { icon: Users, text: "10,000+ Members", color: "text-orange-700", bg: "bg-orange-100" },
                { icon: Rocket, text: "500+ Projects", color: "text-rose-700", bg: "bg-rose-100" }
              ].map((badge, idx) => (
                <span key={idx} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${badge.bg} border border-${badge.color.split('-')[1]}-200`}>
                  <badge.icon size={16} className={badge.color} /> 
                  <span className="text-stone-700 font-medium">{badge.text}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-amber-400 flex justify-center pt-2 bg-amber-50/50"
            >
              <div className="w-1.5 h-3 bg-amber-500 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ✨ How It Works - Warm Colorful Cards */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-center mb-4"
            >
              How to <span className="bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">Hire Your Team</span>
            </motion.h2>
            <p className="text-stone-700 text-center mb-16 max-w-2xl mx-auto">
              Get started in minutes. No complex setup, just pure collaboration.
            </p>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 lg:gap-8"
            >
              {[
                {
                  step: "01",
                  icon: Lightbulb,
                  title: "Post Your Idea",
                  desc: "Share your project details, required skills, and team size. It's completely free!",
                  gradient: "from-amber-200 to-orange-200",
                  iconColor: "text-amber-700",
                  border: "border-amber-300",
                  hoverShadow: "hover:shadow-amber-200/60"
                },
                {
                  step: "02",
                  icon: Search,
                  title: "Review Applications",
                  desc: "Talented students from top colleges apply. Browse profiles, skills, and portfolios.",
                  gradient: "from-orange-200 to-rose-200",
                  iconColor: "text-orange-700",
                  border: "border-orange-300",
                  hoverShadow: "hover:shadow-orange-200/60"
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Start Building",
                  desc: "Select your dream team, collaborate seamlessly, and launch your project together.",
                  gradient: "from-rose-200 to-red-200",
                  iconColor: "text-rose-700",
                  border: "border-rose-300",
                  hoverShadow: "hover:shadow-rose-200/60"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`group relative p-8 rounded-2xl 
                           bg-gradient-to-br ${item.gradient} 
                           border-2 ${item.border}
                           backdrop-blur-md transition-all duration-300 
                           shadow-lg ${item.hoverShadow}`}
                >
                  {/* Step Number */}
                  <div className={`absolute top-6 right-6 text-5xl font-bold 
                               bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`bg-white/70 w-14 h-14 rounded-xl flex items-center justify-center mb-6 
                               group-hover:scale-110 transition-transform border border-white/50 shadow-sm`}>
                    <item.icon className={`${item.iconColor} w-7 h-7`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-stone-900">{item.title}</h3>
                  <p className="text-stone-700 leading-relaxed">{item.desc}</p>
                  
                  {/* Decorative Corner */}
                  <div className={`absolute bottom-4 right-4 w-16 h-16 rounded-full 
                               bg-gradient-to-br ${item.gradient} opacity-30 blur-xl`} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 🔥 Trending Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full 
                           bg-gradient-to-r from-amber-200 to-orange-200 border border-amber-300">
                <TrendingUp size={16} className="text-amber-700" />
                <span className="text-sm font-medium text-amber-800">Hot Right Now</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">🔥 Trending Projects</span>
              </h2>
              <p className="text-lg text-stone-700 max-w-2xl mx-auto">
                Join these exciting projects or get inspired to post your own
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {bestProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative p-6 rounded-2xl 
                           bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100 
                           border-2 border-orange-300 
                           backdrop-blur-md transition-all duration-300 
                           flex flex-col justify-between h-full 
                           shadow-lg hover:shadow-orange-200/60"
                >
                  {/* Hiring Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-amber-200 text-amber-800 text-xs rounded-full font-medium border border-amber-300 flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse" />
                      Hiring
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-amber-800 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-stone-700 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack - Warm Colorful Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className={`px-3 py-1 text-xs rounded-lg border shadow-sm
                          ${i % 3 === 0 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                            i % 3 === 1 ? 'bg-orange-100 text-orange-800 border-orange-200' : 
                            'bg-rose-100 text-rose-800 border-rose-200'}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-orange-200 pt-4 mt-2">
                    <div className="flex justify-between text-sm text-stone-700 mb-4">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="text-amber-700" /> 
                        <span>{project.college}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-orange-700" /> 
                        <span>{project.teamSize} Needed</span>
                      </div>
                    </div>
                    <Link 
                      to={`/project/${project.id}`} 
                      className="group/btn block w-full text-center 
                               bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                               text-white py-3 rounded-xl 
                               hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                               transition-all duration-300 flex items-center justify-center gap-2 font-medium
                               shadow-md shadow-amber-300/50 hover:shadow-amber-400/60"
                    >
                      Apply Now 
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Decorative Glow */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full 
                               bg-gradient-to-br from-amber-300/40 to-orange-300/40 blur-2xl opacity-0 
                               group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>

            {/* Browse All Button */}
            <div className="text-center mt-12">
              <button 
                onClick={browseAll} 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl 
                         border-2 border-amber-400 text-amber-800 
                         bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100
                         hover:from-amber-200 hover:via-orange-200 hover:to-rose-200
                         hover:border-amber-500 hover:text-amber-900 
                         transition-all duration-300 font-semibold
                         backdrop-blur-sm shadow-md group"
              >
                Browse All Projects 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* 💡 Why Choose CollabHub - Warm Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-center mb-4"
            >
              Why Students <span className="bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">Choose CollabHub</span>
            </motion.h2>
            <p className="text-stone-700 text-center mb-16 max-w-2xl mx-auto">
              Built by students, for students. Experience collaboration redefined.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Cross-College Teams",
                  desc: "Collaborate with talented peers from IITs, NITs, DTU, and 500+ colleges across India.",
                  gradient: "from-amber-500 via-orange-500 to-yellow-500",
                  bg: "from-amber-100 via-orange-50 to-yellow-100",
                  border: "border-amber-300"
                },
                {
                  icon: Code,
                  title: "Real-World Experience",
                  desc: "Build projects that matter. Add meaningful work to your portfolio and resume.",
                  gradient: "from-orange-500 via-rose-500 to-red-500",
                  bg: "from-orange-100 via-rose-50 to-red-100",
                  border: "border-orange-300"
                },
                {
                  icon: Rocket,
                  title: "Career Opportunities",
                  desc: "Stand out to recruiters. Many students get internships and jobs through CollabHub projects.",
                  gradient: "from-rose-500 via-pink-500 to-purple-500",
                  bg: "from-rose-100 via-pink-50 to-purple-100",
                  border: "border-rose-300"
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${feature.bg} 
                           border-2 ${feature.border} 
                           backdrop-blur-md transition-all duration-300 text-center 
                           shadow-lg hover:shadow-xl`}
                >
                  <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl 
                               flex items-center justify-center mx-auto mb-6 
                               group-hover:scale-110 transition-transform shadow-md`}>
                    <feature.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-stone-900">{feature.title}</h3>
                  <p className="text-stone-700 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🎯 About Section */}
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">About CollabHub</span>
              </h2>
              <p className="text-xl text-stone-700 max-w-3xl mx-auto">
                We're on a mission to make student collaboration effortless and impactful.
              </p>
            </motion.div>

            {/* Vision Card - Warm Gradient Background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 rounded-3xl 
                       bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 
                       border-2 border-amber-300 backdrop-blur-md mb-16 text-center 
                       relative overflow-hidden shadow-xl"
            >
              {/* Animated Color Orbs - Warm Tones */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-32 h-32 
                         bg-gradient-to-br from-amber-300 to-orange-300 rounded-full blur-2xl"
              />
              <motion.div 
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.45, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 w-32 h-32 
                         bg-gradient-to-tr from-rose-300 to-red-300 rounded-full blur-2xl"
              />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full 
                             bg-amber-200 border border-amber-300">
                  <Target className="text-amber-700" size={18} />
                  <span className="text-sm font-medium text-amber-800">Our Vision</span>
                </div>
                <p className="text-lg lg:text-xl text-stone-800 leading-relaxed max-w-4xl mx-auto">
                  Every great startup began with a team. Every great project began with an idea.
                  CollabHub bridges the gap — helping students find their co-founders, teammates,
                  and collaborators to turn ideas into reality.
                </p>
              </div>
            </motion.div>

            {/* Steps - Warm Colors */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { icon: Lightbulb, title: "Post Idea", desc: "Share your project with the community.", color: "text-amber-700", bg: "from-amber-100 to-orange-100", border: "border-amber-300" },
                { icon: Users, title: "Get Applications", desc: "Skilled students apply to join your team.", color: "text-orange-700", bg: "from-orange-100 to-rose-100", border: "border-orange-300" },
                { icon: Heart, title: "Build Together", desc: "Collaborate, create, and celebrate success.", color: "text-rose-700", bg: "from-rose-100 to-red-100", border: "border-rose-300" }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`group p-8 rounded-2xl bg-gradient-to-br ${step.bg} 
                           border-2 ${step.border} 
                           backdrop-blur-md transition-all duration-300 text-center 
                           shadow-md hover:shadow-lg`}
                >
                  <div className={`bg-white/70 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 
                               group-hover:scale-105 transition-transform border border-white/50 shadow-sm`}>
                    <step.icon className={`${step.color} w-8 h-8`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-stone-900">{step.title}</h3>
                  <p className="text-stone-700">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 📬 Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">Let's Connect</span>
              </h2>
              <p className="text-xl text-stone-700">Have questions? We're here to help you build your team.</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="p-8 rounded-2xl 
                             bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100 
                             border-2 border-orange-300 backdrop-blur-md shadow-xl">
                  <h3 className="text-2xl font-bold mb-8 text-stone-900">Get in Touch</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Mail, text: "hello@collabhub.com", label: "Email", color: "text-amber-700", bg: "from-amber-100 to-orange-100" },
                      { icon: MapPin, text: "Pan-India • Remote First", label: "Location", color: "text-orange-700", bg: "from-orange-100 to-rose-100" },
                      { icon: Phone, text: "Support via Chat", label: "Support", color: "text-rose-700", bg: "from-rose-100 to-red-100" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className={`bg-gradient-to-br ${item.bg} p-3 rounded-xl 
                                     group-hover:scale-105 transition-all border border-white/50 shadow-sm`}>
                          <item.icon className={`${item.color}`} size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-stone-600 mb-0.5">{item.label}</p>
                          <span className="text-stone-900 font-medium">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-orange-200">
                    <h4 className="font-bold mb-4 text-stone-900">Follow Our Journey</h4>
                    <div className="flex gap-3">
                      {[
                        { icon: Github, href: "#", hoverColor: "hover:text-amber-700", hoverBg: "hover:from-amber-100" },
                        { icon: Linkedin, href: "#", hoverColor: "hover:text-orange-700", hoverBg: "hover:from-orange-100" },
                        { icon: Twitter, href: "#", hoverColor: "hover:text-rose-700", hoverBg: "hover:from-rose-100" }
                      ].map((social, idx) => (
                        <a 
                          key={idx} 
                          href={social.href} 
                          className={`p-3 bg-gradient-to-br from-stone-100 to-stone-50 rounded-xl 
                                   border border-stone-200 ${social.hoverBg} to-white
                                   ${social.hoverColor} transition-all duration-300 group shadow-sm`}
                        >
                          <social.icon className="text-stone-700 transition-colors" size={20} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form - Warm Colors */}
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl 
                         bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 
                         border-2 border-amber-300 backdrop-blur-md space-y-6 shadow-xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thanks for reaching out! We\'ll get back to you soon. 🚀');
                }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-800 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-stone-300 
                               focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                               outline-none transition-all text-stone-900 placeholder-stone-500 shadow-sm" 
                      placeholder="e.g., Rahul Sharma" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-800 mb-2">College Email</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-stone-300 
                               focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                               outline-none transition-all text-stone-900 placeholder-stone-500 shadow-sm" 
                      placeholder="you@college.edu" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-800 mb-2">How can we help?</label>
                  <textarea 
                    rows="4" 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-white/70 border-2 border-stone-300 
                             focus:ring-2 focus:ring-amber-400 focus:border-amber-500 
                             outline-none transition-all text-stone-900 placeholder-stone-500 resize-none shadow-sm" 
                    placeholder="Tell us about your project or question..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl 
                           bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                           text-white font-semibold 
                           hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                           transition-all duration-300 shadow-lg shadow-amber-300/50 
                           hover:shadow-amber-400/60 flex items-center justify-center gap-2 group"
                >
                  Send Message 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer - Warm Colors */}
        <footer className="py-10 border-t-2 border-amber-300 
                        bg-gradient-to-r from-amber-100 via-orange-50 to-rose-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-stone-800 font-medium">© 2024 CollabHub. All rights reserved.</p>
            <p className="text-sm text-stone-600 mt-2 flex items-center justify-center gap-1">
              Built with <Heart size={14} className="text-rose-500 fill-rose-500" /> for student builders across India
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Home;