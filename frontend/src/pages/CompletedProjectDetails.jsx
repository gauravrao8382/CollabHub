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
    description: "A comprehensive web app that helps users track their daily carbon footprint and suggests eco-friendly alternatives. It uses real-time data to calculate emissions from travel, food, and energy usage.",
    longDescription: "EcoTrack was built to address the growing concern of climate change by empowering individuals to understand their environmental impact. The platform features a personalized dashboard, weekly challenges, and community leaderboards. We integrated APIs for flight tracking and local energy grid data to provide accurate calculations.",
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
    description: "Full-stack mobile application connecting patients with specialists for instant video consultations and appointment booking.",
    longDescription: "MediConnect bridges the gap between patients and healthcare providers. Features include real-time video calling via WebRTC, secure prescription storage, and an AI-powered symptom checker. The app handles over 500+ daily consultations.",
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
    longDescription: "CryptoSentinel aggregates data from 15+ exchanges and analyzes social media sentiment to predict market trends. It provides visual heatmaps, portfolio tracking, and automated alerts for significant price movements.",
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
  
  // Find project by ID (Convert string param to number)
  const project = completedProjectsData.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Project not found</h2>
          <button onClick={() => navigate('/dashboard')} className="mt-4 text-indigo-600 hover:underline">Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <div className="flex gap-3">
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-md"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
            <a 
              href={project.repoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors shadow-md"
            >
              <Github size={16} /> Source Code
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wide">
            <CheckCircle size={12} /> Completed Project
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {project.title}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {project.longDescription || project.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <Monitor size={18} className="text-indigo-500" />
              <span className="font-medium">{project.type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <Calendar size={18} className="text-purple-500" />
              <span className="font-medium">Completed: {project.completionDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <Users size={18} className="text-blue-500" />
              <span className="font-medium">{project.college}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Tech Stack & Team (Sticky on Desktop) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Tech Stack Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Code size={20} className="text-indigo-600" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-semibold text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Team Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} className="text-emerald-600" />
                Team Members
              </h3>
              <div className="space-y-4">
                {project.team.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-sm font-bold text-indigo-700 border-2 border-white shadow-sm">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <LinkIcon size={20} />
                Project Links
              </h3>
              <div className="space-y-3">
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm">
                  <span className="text-sm font-medium">Visit Live Site</span>
                  <ExternalLink size={16} />
                </a>
                <a href={project.repoLink} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm">
                  <span className="text-sm font-medium">View Source Code</span>
                  <Github size={16} />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Gallery & Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Screenshots Gallery */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Monitor size={20} className="text-indigo-600" />
                Project Screenshots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((shot, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-gray-100 aspect-video"
                  >
                    <img src={shot} alt={`Screenshot ${i+1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Detailed Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Project</h3>
              <div className="prose prose-indigo max-w-none text-gray-600">
                <p className="leading-relaxed mb-4">{project.longDescription}</p>
                <p className="leading-relaxed">
                  This project was developed over a period of 4 months by a dedicated team of students. 
                  It solves the real-world problem of {project.type.toLowerCase()} by leveraging modern web technologies.
                  Key achievements include high performance, responsive design, and robust backend architecture.
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