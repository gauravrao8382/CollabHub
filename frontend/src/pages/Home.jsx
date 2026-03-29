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

  // Animation variants for staggered effects
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-900 text-gray-100">
      <Navbar />
      
      <div className="px-4 sm:px-6 lg:px-8">

        {/* 🔥 Hero Section - Premium Dark Design */}
        <section id="home" className="relative py-24 lg:py-32 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-full blur-3xl"
            />
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                🚀 For Students, By Students
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Hire Your Team
              </span>
              <br />
              <span className="text-gray-200">Build Your Dream Project</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with talented students from top colleges. Post your project idea,
              find the right teammates, and bring your vision to life — all on{' '}
              <span className="text-violet-400 font-semibold">CollabHub</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a
                href="/#projects"
                className="group px-8 py-4 rounded-xl text-lg font-semibold border border-violet-500/30 
                         bg-gradient-to-r from-violet-500/10 to-cyan-500/10 
                         hover:from-violet-500/20 hover:to-cyan-500/20 
                         text-violet-300 hover:text-white transition-all duration-300 
                         flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Search size={20} className="group-hover:scale-110 transition-transform" /> 
                Find Teammates
              </a>
              <Link
                to="/create-project"
                className="group px-8 py-4 rounded-xl text-lg font-semibold 
                         bg-gradient-to-r from-violet-600 to-cyan-600 
                         hover:from-violet-500 hover:to-cyan-500 
                         text-white shadow-lg shadow-violet-500/25 
                         hover:shadow-violet-500/40 transition-all duration-300 
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
                { icon: Shield, text: "Verified Students", color: "text-emerald-400" },
                { icon: Users, text: "10,000+ Members", color: "text-violet-400" },
                { icon: Rocket, text: "500+ Projects", color: "text-cyan-400" }
              ].map((badge, idx) => (
                <span key={idx} className="flex items-center gap-2 text-gray-400">
                  <badge.icon size={16} className={badge.color} /> 
                  {badge.text}
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
              className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 bg-gray-400 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ✨ How It Works - Dark Glassmorphism */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-center mb-4"
            >
              How to <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Hire Your Team</span>
            </motion.h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
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
                  gradient: "from-amber-500/20 to-orange-500/20"
                },
                {
                  step: "02",
                  icon: Search,
                  title: "Review Applications",
                  desc: "Talented students from top colleges apply. Browse profiles, skills, and portfolios.",
                  gradient: "from-violet-500/20 to-purple-500/20"
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Start Building",
                  desc: "Select your dream team, collaborate seamlessly, and launch your project together.",
                  gradient: "from-cyan-500/20 to-emerald-500/20"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 
                           backdrop-blur-xl hover:border-violet-500/30 transition-all duration-300"
                >
                  {/* Step Number */}
                  <div className="absolute top-6 right-6 text-5xl font-bold text-gray-700/30 group-hover:text-violet-500/10 transition-colors">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`bg-gradient-to-r ${item.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className="text-violet-400 w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-100">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
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
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
                <TrendingUp size={16} className="text-violet-400" />
                <span className="text-sm font-medium text-violet-300">Hot Right Now</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">🔥 Trending Projects</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
                  className="group relative p-6 rounded-2xl bg-gray-800/40 border border-gray-700/50 
                           backdrop-blur-xl hover:border-violet-500/40 transition-all duration-300 
                           flex flex-col justify-between h-full"
                >
                  {/* Hiring Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full font-medium border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      Hiring
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-violet-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg border border-gray-600/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-700/50 pt-4 mt-2">
                    <div className="flex justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="text-violet-400" /> 
                        <span>{project.college}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-cyan-400" /> 
                        <span>{project.teamSize} Needed</span>
                      </div>
                    </div>
                    <Link 
                      to={`/project/${project.id}`} 
                      className="group/btn block w-full text-center bg-gradient-to-r from-violet-600 to-cyan-600 
                               text-white py-3 rounded-xl hover:from-violet-500 hover:to-cyan-500 
                               transition-all duration-300 flex items-center justify-center gap-2 font-medium
                               shadow-lg shadow-violet-500/10 hover:shadow-violet-500/25"
                    >
                      Apply Now 
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>

            {/* Browse All Button */}
            <div className="text-center mt-12">
              <button 
                onClick={browseAll} 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl 
                         border border-violet-500/30 text-violet-300 
                         hover:bg-violet-500/10 hover:border-violet-500/50 
                         hover:text-white transition-all duration-300 font-semibold
                         backdrop-blur-sm group"
              >
                Browse All Projects 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* 💡 Why Choose CollabHub */}
        <section className="py-20 bg-gradient-to-b from-gray-900/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-center mb-4"
            >
              Why Students <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Choose CollabHub</span>
            </motion.h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Built by students, for students. Experience collaboration redefined.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Cross-College Teams",
                  desc: "Collaborate with talented peers from IITs, NITs, DTU, and 500+ colleges across India.",
                  color: "from-violet-500 to-purple-500"
                },
                {
                  icon: Code,
                  title: "Real-World Experience",
                  desc: "Build projects that matter. Add meaningful work to your portfolio and resume.",
                  color: "from-cyan-500 to-emerald-500"
                },
                {
                  icon: Rocket,
                  title: "Career Opportunities",
                  desc: "Stand out to recruiters. Many students get internships and jobs through CollabHub projects.",
                  color: "from-amber-500 to-orange-500"
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 
                           backdrop-blur-xl hover:border-violet-500/30 transition-all duration-300 text-center"
                >
                  <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
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
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">About CollabHub</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We're on a mission to make student collaboration effortless and impactful.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 
                       border border-gray-700/50 backdrop-blur-xl mb-16 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-violet-500/10 border border-violet-500/20">
                  <Target className="text-violet-400" size={18} />
                  <span className="text-sm font-medium text-violet-300">Our Vision</span>
                </div>
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                  Every great startup began with a team. Every great project began with an idea.
                  CollabHub bridges the gap — helping students find their co-founders, teammates,
                  and collaborators to turn ideas into reality.
                </p>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { icon: Lightbulb, title: "Post Idea", desc: "Share your project with the community.", color: "text-amber-400" },
                { icon: Users, title: "Get Applications", desc: "Skilled students apply to join your team.", color: "text-violet-400" },
                { icon: Heart, title: "Build Together", desc: "Collaborate, create, and celebrate success.", color: "text-emerald-400" }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 
                           backdrop-blur-xl hover:border-violet-500/30 transition-all duration-300 text-center"
                >
                  <div className="bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-violet-500/20 transition-colors">
                    <step.icon className={`${step.color} w-8 h-8`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-100">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
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
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Let's Connect</span>
              </h2>
              <p className="text-xl text-gray-400">Have questions? We're here to help you build your team.</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl">
                  <h3 className="text-2xl font-bold mb-8 text-gray-100">Get in Touch</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Mail, text: "hello@collabhub.com", label: "Email" },
                      { icon: MapPin, text: "Pan-India • Remote First", label: "Location" },
                      { icon: Phone, text: "Support via Chat", label: "Support" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="bg-violet-500/10 p-3 rounded-xl group-hover:bg-violet-500/20 transition-colors">
                          <item.icon className="text-violet-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-0.5">{item.label}</p>
                          <span className="text-gray-200 font-medium">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-700/50">
                    <h4 className="font-bold mb-4 text-gray-200">Follow Our Journey</h4>
                    <div className="flex gap-3">
                      {[
                        { icon: Github, href: "#" },
                        { icon: Linkedin, href: "#" },
                        { icon: Twitter, href: "#" }
                      ].map((social, idx) => (
                        <a 
                          key={idx} 
                          href={social.href} 
                          className="p-3 bg-gray-700/50 rounded-xl hover:bg-violet-500/20 
                                   hover:border-violet-500/30 border border-transparent 
                                   transition-all duration-300 group"
                        >
                          <social.icon className="text-gray-400 group-hover:text-violet-400 transition-colors" size={20} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gray-800/40 border border-gray-700/50 backdrop-blur-xl space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thanks for reaching out! We\'ll get back to you soon. 🚀');
                }}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 
                               focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                               outline-none transition-all text-gray-100 placeholder-gray-500" 
                      placeholder="e.g., Rahul Sharma" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">College Email</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 
                               focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                               outline-none transition-all text-gray-100 placeholder-gray-500" 
                      placeholder="you@college.edu" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">How can we help?</label>
                  <textarea 
                    rows="4" 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 
                             focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 
                             outline-none transition-all text-gray-100 placeholder-gray-500 resize-none" 
                    placeholder="Tell us about your project or question..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 
                           text-white font-semibold hover:from-violet-500 hover:to-cyan-500 
                           transition-all duration-300 shadow-lg shadow-violet-500/25 
                           hover:shadow-violet-500/40 flex items-center justify-center gap-2 group"
                >
                  Send Message 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 font-medium">© 2024 CollabHub. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
              Built with <Heart size={14} className="text-rose-500 fill-rose-500" /> for student builders across India
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Home;