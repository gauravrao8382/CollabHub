import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Code, Users, Rocket, Mail, MapPin, Phone, Github, Linkedin, Twitter, 
  Target, Lightbulb, Heart, Building, ArrowRight, Search, Zap, Shield, 
  TrendingUp, Monitor, Smartphone, Palette, Award, Globe, Layers, 
  Cpu, MessageSquare, Star, CheckCircle2, Play, ExternalLink, Trophy
} from 'lucide-react';
import Navbar from '../components/Navbar';

// Dummy Projects Data
const bestProjects = [
  {
    id: 1,
    title: "AI Based Attendance System",
    description: "Automated attendance using facial recognition for colleges.",
    techStack: ["Python", "OpenCV", "React"],
    teamSize: 3,
    college: "DTU Delhi",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "E-Waste Management App",
    description: "Platform to connect recyclers with households.",
    techStack: ["Flutter", "Firebase"],
    teamSize: 4,
    college: "IIT Bombay",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "College Event Manager",
    description: "Manage all college fests and events in one place.",
    techStack: ["MERN", "Tailwind"],
    teamSize: 5,
    college: "NSUT Delhi",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Smart Library System",
    description: "IoT based book tracking and reservation system.",
    techStack: ["Arduino", "React"],
    teamSize: 2,
    college: "VIT Vellore",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Peer to Peer Learning",
    description: "Students teach students based on expertise.",
    techStack: ["Next.js", "Supabase"],
    teamSize: 3,
    college: "IIIT Hyderabad",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Campus Food Delivery",
    description: "Hyperlocal food delivery within campus premises.",
    techStack: ["React Native", "Node"],
    teamSize: 4,
    college: "JU Kolkata",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop"
  },
];

const Home = () => {
  const navigate = useNavigate();
  const browseAll = () => navigate('/login');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      <Navbar />
      
      {/* 🔥 HERO SECTION - Purple Theme */}
      <section id="/" className="relative min-h-[600px] lg:min-h-[700px] flex items-start justify-center overflow-hidden pt-20 lg:pt-28 pb-12">
        
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop" 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
              style={{ left: `${20 + i * 20}%`, top: `${25 + (i % 2) * 30}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-4 lg:pt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            
            {/* ✅ Purple Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-2 mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Rocket className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-medium text-white">CollabHub - Student Platform</span>
            </div>

            {/* ✅ Purple Accent Text */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              DREAM. CREATE.<br />
              <span className="text-violet-400">SUCCEED.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 mb-5 max-w-2xl mx-auto leading-relaxed">
              Connect with talented students from top colleges. Find teammates, share ideas, and build amazing projects!
            </p>

            {/* ✅ Purple Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link to="/create-project" className="group px-6 py-3 rounded-full bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition-all flex items-center gap-2 shadow-lg shadow-violet-600/30">
                <Zap size={16} /> START BUILDING <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button className="group px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                <Play size={16} /> WATCH DEMO
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ✨ FEATURES SECTION - Purple Theme */}
      <section className="relative -mt-16 z-20 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Globe, title: "Cross-College", desc: "500+ colleges", color: "bg-violet-600" },
              { icon: Code, title: "Real Projects", desc: "Build portfolio", color: "bg-violet-500" },
              { icon: Users, title: "Find Teammates", desc: "Match skills", color: "bg-fuchsia-500" },
              { icon: Trophy, title: "Career Growth", desc: "Get noticed", color: "bg-violet-400" }
            ].map((f, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -4 }} className="bg-white rounded-xl p-5 shadow-lg border border-slate-100 text-center">
                <div className={`${f.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <f.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h3>
                <p className="text-xs text-slate-500">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🔥 ABOUT SECTION - Purple Theme */}
      <section id="about" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" alt="Students" className="w-full h-auto" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {/* ✅ Purple Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 rounded-full bg-violet-100">
                <Target className="w-3.5 h-3.5 text-violet-600" />
                <span className="text-xs font-medium text-violet-700">About</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                Build Your Dream<br /><span className="text-violet-600">Team Today</span>
              </h2>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Every great project began with an idea. CollabHub helps students find teammates and collaborators to turn ideas into reality.
              </p>

              {/* ✅ Purple Checkmarks */}
              <div className="space-y-3 mb-6">
                {[
                  "Post projects & find teammates",
                  "Collaborate across colleges",
                  "Build real portfolio projects",
                  "Get noticed by recruiters"
                ].map((txt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-violet-600" />
                    </div>
                    <span className="text-sm text-slate-700">{txt}</span>
                  </div>
                ))}
              </div>

              {/* ✅ Purple Button */}
              <Link to="/create-project" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/30">
                Get Started <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🎨 SERVICES SECTION - Purple Theme */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 rounded-full bg-violet-100">
              <Layers className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-medium text-violet-700">What We Offer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Everything to <span className="text-violet-600">Collaborate</span></h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">Powerful tools designed for student teams</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Monitor, title: "Web Dev", desc: "React, Next.js, Vue", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", color: "bg-violet-600" },
              { icon: Smartphone, title: "Mobile Apps", desc: "Flutter, React Native", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop", color: "bg-fuchsia-600" },
              { icon: Palette, title: "UI/UX Design", desc: "Figma, Adobe XD", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop", color: "bg-pink-600" },
              { icon: Cpu, title: "AI & ML", desc: "Python, TensorFlow", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop", color: "bg-violet-500" },
              { icon: Globe, title: "Cloud & DevOps", desc: "AWS, Docker, K8s", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop", color: "bg-indigo-600" },
              { icon: Shield, title: "Cybersecurity", desc: "Security, Encryption", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop", color: "bg-violet-700" }
            ].map((s, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -4 }} className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-md hover:shadow-lg transition-all">
                <div className="relative h-36 overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className={`${s.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                      <s.icon className="text-white w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{s.desc}</p>
                  {/* ✅ Purple Link */}
                  <button className="inline-flex items-center gap-1 text-violet-600 font-semibold text-xs hover:gap-2 transition-all">Learn More <ArrowRight size={12} /></button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🔥 STATS SECTION - Purple Theme */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=600&fit=crop" alt="Stats" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/85" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Trusted by Students</h2>
            <p className="text-sm text-slate-300">Join thousands building projects together</p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, num: "10K+", label: "Students", color: "text-violet-400" },
              { icon: Rocket, num: "500+", label: "Projects", color: "text-fuchsia-400" },
              { icon: Building, num: "500+", label: "Colleges", color: "text-pink-400" },
              { icon: Star, num: "4.9/5", label: "Rating", color: "text-amber-400" }
            ].map((st, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className={`w-12 h-12 ${st.color.replace('text-','bg-').replace('400','500')}/20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <st.icon className={`w-6 h-6 ${st.color}`} />
                </div>
                <p className={`text-2xl sm:text-3xl font-bold ${st.color} mb-1`}>{st.num}</p>
                <p className="text-xs text-slate-400">{st.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🔥 PROJECTS SECTION - Purple Theme */}
      <section id="projects" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            {/* ✅ Purple Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 rounded-full bg-violet-100">
              <TrendingUp size={14} className="text-violet-600" />
              <span className="text-xs font-medium text-violet-700">Hot Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Trending Projects</h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">Join exciting projects or post your own</p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bestProjects.map((p) => (
              <motion.div key={p.id} variants={itemVariants} whileHover={{ y: -4 }} className="group bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 hover:shadow-lg transition-all">
                <div className="relative h-40 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-3 right-3">
                    {/* ✅ Purple Badge */}
                    <span className="px-2.5 py-1 bg-violet-600 text-white text-xs rounded-full font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Hiring
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 text-white/90 text-xs">
                      <Building size={12} /> <span>{p.college}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-1">{p.title}</h3>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.techStack.slice(0,3).map((t,i) => <span key={i} className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-600">{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Users size={12} /> <span>{p.teamSize} needed</span>
                    </div>
                    {/* ✅ Purple Button */}
                    <Link to={`/project/${p.id}`} className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-all">
                      Apply <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <button onClick={browseAll} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all">
              Browse All <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 💬 TESTIMONIALS - Purple Theme */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 rounded-full bg-violet-100">
              <MessageSquare className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-medium text-violet-700">Testimonials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">What Students Say</h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Priya S.", role: "IIT Delhi", text: "Found perfect teammates for hackathon. We won first place!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
              { name: "Rahul V.", role: "NIT Trichy", text: "Amazing platform! Built AI project that got featured in tech magazine.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
              { name: "Ananya P.", role: "BITS Pilani", text: "Built 3 projects, got 2 internship offers. Highly recommend!", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" }
            ].map((t, i) => (
              <motion.div key={i} variants={itemVariants} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_,j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 📬 CTA SECTION - Purple Gradient */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=600&fit=crop" alt="CTA" className="w-full h-full object-cover" />
          {/* ✅ Pure Purple Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/95 to-fuchsia-600/95" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-sm text-white/80 mb-6 max-w-xl mx-auto">Join thousands of students collaborating on exciting projects. Your dream team is one click away!</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/create-project" className="group px-6 py-3 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                <Rocket size={16} /> Start Free
              </Link>
              <Link to="/about" className="group px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                Learn More <ExternalLink size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 📬 CONTACT SECTION - Purple Theme */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {/* ✅ Purple Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 rounded-full bg-violet-100">
                <Mail className="w-3.5 h-3.5 text-violet-600" />
                <span className="text-xs font-medium text-violet-700">Contact</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Let's Connect</h2>
              <p className="text-sm text-slate-600 mb-6">Have questions? We're here to help.</p>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", val: "hello@collabhub.com", color: "bg-violet-600" },
                  { icon: MapPin, label: "Location", val: "Pan-India • Remote", color: "bg-fuchsia-600" },
                  { icon: Phone, label: "Support", val: "Chat Support", color: "bg-pink-600" }
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`${it.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <it.icon className="text-white w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{it.label}</p>
                      <span className="text-sm font-semibold text-slate-900">{it.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-900 mb-3">Follow Us</p>
                <div className="flex gap-2">
                  {[Github, Linkedin, Twitter].map((S, i) => (
                    <a key={i} href="#" className="p-2.5 bg-slate-100 hover:bg-violet-600 rounded-lg transition-all group">
                      <S className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ✅ Purple Form */}
            <motion.form initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100" onSubmit={(e) => { e.preventDefault(); alert('Thanks! 🚀'); }}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Name</label>
                  <input type="text" required className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
                  <input type="email" required className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none text-sm" placeholder="you@college.edu" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Message</label>
                <textarea rows="4" required className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none text-sm resize-none" placeholder="Your message..."></textarea>
              </div>
              {/* ✅ Purple Submit Button */}
              <button type="submit" className="w-full py-3 rounded-lg bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all flex items-center justify-center gap-2">
                Send Message <ArrowRight size={14} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer - Purple Theme */}
      <footer className="py-8 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              {/* ✅ Purple Logo Icon */}
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <Rocket className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">CollabHub</span>
            </div>
            <p className="text-slate-400 text-xs">© 2024 CollabHub. All rights reserved.</p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              Built with <Heart size={12} className="text-pink-500 fill-pink-500" /> for students
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;