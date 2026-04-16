import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ExternalLink, Github, Users, Code, 
  Calendar, CheckCircle, Globe, Monitor, Smartphone, 
  Cpu, Database, Layers, Link as LinkIcon
} from 'lucide-react';

// Dummy Data (Same as Dashboard for demonstration)
const completedProjectsData = [
  {
    id: 4,
    title: "EcoTrack - Carbon Footprint Calculator",
    type: "Web Development",
    status: "completed",
    description: "A comprehensive web app that helps users track their daily carbon footprint and suggests eco-friendly alternatives.",
    longDescription: "EcoTrack was built to address the growing concern of climate change by empowering individuals to understand their environmental impact. The platform features a personalized dashboard, weekly challenges, and community leaderboards.",
    college: "VIT Vellore",
    completionDate: "Dec 2023",
    techStack: ["Next.js", "Tailwind CSS", "Supabase", "Recharts", "TypeScript", "Vercel"],
    liveLink: "https://ecotrack-demo.vercel.app",
    repoLink: "https://github.com/ecotrack",
    screenshots: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    ],
    team: [
      { name: "Aditya Sharma", role: "Frontend Lead", avatar: "A" },
      { name: "Neha Gupta", role: "Backend Dev", avatar: "N" },
      { name: "Rohan Verma", role: "UI/UX Designer", avatar: "R" }
    ]
  },
  {
    id: 5,
    title: "MediConnect - Doctor Appointment Portal",
    type: "App Development",
    status: "completed",
    description: "Full-stack mobile application connecting patients with specialists for instant video consultations.",
    longDescription: "MediConnect bridges the gap between patients and healthcare providers. Features include real-time video calling via WebRTC, secure prescription storage, and an AI-powered symptom checker.",
    college: "Manipal Institute",
    completionDate: "Feb 2024",
    techStack: ["React Native", "Node.js", "MongoDB", "WebRTC", "Firebase", "Redux"],
    liveLink: "https://mediconnect-app.store",
    repoLink: "https://github.com/mediconnect",
    screenshots: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516549655169-df83a0921564?auto=format&fit=crop&q=80&w=800"
    ],
    team: [
      { name: "Kavita Reddy", role: "Mobile Lead", avatar: "K" },
      { name: "Sameer Khan", role: "DevOps Engineer", avatar: "S" }
    ]
  },
  {
    id: 6,
    title: "CryptoSentinel - Market Analyzer",
    type: "Data Science",
    status: "completed",
    description: "Real-time cryptocurrency market analysis tool with sentiment analysis from Twitter and news APIs.",
    longDescription: "CryptoSentinel aggregates data from 15+ exchanges and analyzes social media sentiment to predict market trends. It provides visual heatmaps, portfolio tracking, and automated alerts.",
    college: "ISI Kolkata",
    completionDate: "Jan 2024",
    techStack: ["Python", "Pandas", "Dash", "AWS Lambda", "TensorFlow", "PostgreSQL"],
    liveLink: "https://cryptosentinel.io",
    repoLink: "https://github.com/cryptosentinel",
    screenshots: [
      "https://images.unsplash.com/photo-1621504450168-b8c437536155?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800"
    ],
    team: [
      { name: "Arjun Das", role: "Data Scientist", avatar: "A" },
      { name: "Meera Iyer", role: "Backend Dev", avatar: "M" },
      { name: "Zoya Ali", role: "Frontend Dev", avatar: "Z" },
      { name: "Danish Sheikh", role: "ML Engineer", avatar: "D" }
    ]
  }
];

const CompletedProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = completedProjectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-md border-2 border-amber-200 shadow-lg shadow-amber-100/50"
        >
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Project not found</h2>
          <p className="text-stone-600 mb-4">The project you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="px-6 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-xl font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-md shadow-amber-200/60 hover:shadow-amber-300/70"
          >
            ← Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    // 🎨 Warm Theme Background
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 pb-20 relative overflow-hidden">
      
      {/* 🌈 Decorative Warm Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 
                   bg-gradient-to-br from-amber-300/40 to-orange-300/30 
                   rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 
                   bg-gradient-to-tr from-rose-300/35 to-red-300/25 
                   rounded-full blur-3xl"
        />
        {/* Warm Pattern Overlay */}
        <div className="absolute inset-0 opacity-40" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120,53,15,0.08) 1px, transparent 0)`,
               backgroundSize: '64px 64px'
             }} 
        />
      </div>

      {/* 🔗 Sticky Header - Warm Theme */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-stone-600 hover:text-amber-700 hover:bg-amber-100 transition-colors font-medium group px-3 py-2 rounded-xl"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex gap-3">
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-xl font-semibold text-sm hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all shadow-md shadow-amber-200/60 hover:shadow-amber-300/70"
            >
              <ExternalLink size={16} /> <span className="hidden sm:inline">Live Demo</span>
            </a>
            <a 
              href={project.repoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-xl font-semibold text-sm hover:from-stone-800 hover:to-stone-900 transition-all shadow-md hover:shadow-lg border-2 border-stone-600"
            >
              <Github size={16} /> <span className="hidden sm:inline">Source</span>
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12 relative z-10">
        
        {/* 🏆 Hero Section - Warm Colors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100/80 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-200 shadow-sm"
          >
            <CheckCircle size={14} className="text-emerald-600" /> Completed Project
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 leading-tight">
            {project.title}
          </h1>
          
          <p className="text-xl text-stone-700 max-w-3xl leading-relaxed">
            {project.longDescription || project.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <div className="flex items-center gap-2 text-stone-700 bg-white/80 px-4 py-2.5 rounded-xl shadow-sm border border-amber-200 backdrop-blur-sm">
              <Monitor size={18} className="text-amber-600" />
              <span className="font-medium">{project.type}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700 bg-white/80 px-4 py-2.5 rounded-xl shadow-sm border border-orange-200 backdrop-blur-sm">
              <Calendar size={18} className="text-orange-600" />
              <span className="font-medium">{project.completionDate}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700 bg-white/80 px-4 py-2.5 rounded-xl shadow-sm border border-rose-200 backdrop-blur-sm">
              <Users size={18} className="text-rose-600" />
              <span className="font-medium">{project.college}</span>
            </div>
          </div>
        </motion.div>

        {/* 📐 Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ← Left Column: Tech Stack & Team (Sticky on Desktop) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Tech Stack Card - Warm Gradient */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 via-orange-50 to-white p-6 rounded-2xl shadow-md border-2 border-amber-200 backdrop-blur-md"
            >
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Code size={20} className="text-amber-600" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <motion.span 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border shadow-sm transition-all cursor-default
                      ${i % 3 === 0 ? 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200' : 
                        i % 3 === 1 ? 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200' : 
                        'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200'}`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Team Card - Warm Theme */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-orange-50 via-rose-50 to-white p-6 rounded-2xl shadow-md border-2 border-orange-200 backdrop-blur-md"
            >
              <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Users size={20} className="text-orange-600" />
                Team Members
              </h3>
              <div className="space-y-4">
                {project.team.map((member, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/60 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-sm font-bold text-white border-2 border-white shadow-md">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">{member.name}</p>
                      <p className="text-xs text-stone-600">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links Card - Warm Gradient */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
            >
              {/* Decorative orb */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                <LinkIcon size={20} />
                Project Links
              </h3>
              <div className="space-y-3 relative z-10">
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-between p-3 bg-white/15 hover:bg-white/25 rounded-xl transition-colors backdrop-blur-sm group"
                >
                  <span className="text-sm font-medium">Visit Live Site</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href={project.repoLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-between p-3 bg-white/15 hover:bg-white/25 rounded-xl transition-colors backdrop-blur-sm group"
                >
                  <span className="text-sm font-medium">View Source Code</span>
                  <Github size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* → Right Column: Gallery & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 🖼️ Screenshots Gallery - Warm Borders */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Monitor size={20} className="text-amber-600" />
                Project Screenshots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((shot, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="rounded-2xl overflow-hidden shadow-lg border-2 border-amber-200 bg-amber-50/60 aspect-video relative group"
                  >
                    <img src={shot} alt={`Screenshot ${i+1}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 📝 Detailed Description - Warm Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white via-amber-50/50 to-orange-50/50 p-8 rounded-2xl shadow-md border-2 border-amber-200 backdrop-blur-md"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Layers size={20} className="text-orange-600" />
                About the Project
              </h3>
              <div className="prose prose-stone max-w-none text-stone-700">
                <p className="leading-relaxed mb-4">{project.longDescription}</p>
                <p className="leading-relaxed">
                  This project was developed over a period of 4 months by a dedicated team of students. 
                  It solves the real-world problem of {project.type.toLowerCase()} by leveraging modern web technologies.
                  Key achievements include high performance, responsive design, and robust backend architecture.
                </p>
                
                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-amber-200">
                  {[
                    { label: "Duration", value: "4 Months", icon: Calendar },
                    { label: "Team Size", value: project.team.length, icon: Users },
                    { label: "Technologies", value: project.techStack.length, icon: Code },
                    { label: "Status", value: "✅ Live", icon: CheckCircle }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-white/70 border border-amber-200 shadow-sm">
                      <stat.icon size={18} className="mx-auto mb-1 text-amber-600" />
                      <p className="text-xs text-stone-500">{stat.label}</p>
                      <p className="font-bold text-stone-800">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 📊 Additional Info Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-5 rounded-2xl border-2 border-amber-200 shadow-sm">
                <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <Globe size={18} className="text-amber-600" />
                  Platform
                </h4>
                <p className="text-stone-700 text-sm">
                  {project.type.includes('Web') ? '🌐 Web Application' : 
                   project.type.includes('App') ? '📱 Mobile Application' : 
                   '💻 Desktop/Cloud Service'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-rose-100 to-red-100 p-5 rounded-2xl border-2 border-rose-200 shadow-sm">
                <h4 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <Database size={18} className="text-rose-600" />
                  Backend
                </h4>
                <p className="text-stone-700 text-sm">
                  {project.techStack.filter(t => ['Node.js', 'Python', 'Supabase', 'MongoDB', 'PostgreSQL', 'Firebase'].includes(t)).join(', ') || 'Custom API'}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CompletedProjectDetails;