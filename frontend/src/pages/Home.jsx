import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Users, Rocket, Mail, MapPin, Phone, Github, Linkedin, Twitter, Target, Lightbulb, Heart, Building, ArrowRight, Search, Zap, Shield } from 'lucide-react';
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
    const navigate=useNavigate();
    const browseAll=()=>{
        navigate('/login')
    }
  return (
    <>
    <Navbar/>
    <div className="pt-5 px-4">
      
      {/* 🔥 Hero Section - New Slogan */}
      <section id="home" className="text-center py-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold mb-6"
          >
            🚀 For Students, By Students
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">Hire Your Team</span>
            <br />
            <span className="text-gray-800">Build Your Dream Project</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Connect with talented students from top colleges. Post your project idea, 
            find the right teammates, and bring your vision to life — all on CollabHub.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/#projects" 
              className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-primary/50 gradient-text hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:border-transparent transition shadow-sm hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Search size={20} /> Find Teammates
            </a>
            <Link 
              to="/create-project" 
              className="px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-semibold hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Zap size={20} /> Post a Project
            </Link>
          </div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500"
          >
            <span className="flex items-center gap-2"><Shield size={16} className="text-green-500"/> Verified Students</span>
            <span className="flex items-center gap-2"><Users size={16} className="text-primary"/> 10,000+ Members</span>
            <span className="flex items-center gap-2"><Rocket size={16} className="text-secondary"/> 500+ Projects</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ✨ How It Works - Simplified */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12"
          >
            How to <span className="gradient-text">Hire Your Team</span> in 3 Steps
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                icon: Lightbulb, 
                title: "Post Your Idea", 
                desc: "Share your project details, required skills, and team size. It's free!" 
              },
              { 
                step: "02", 
                icon: Search, 
                title: "Review Applications", 
                desc: "Students from top colleges apply. Check their profiles and skills." 
              },
              { 
                step: "03", 
                icon: Rocket, 
                title: "Start Building", 
                desc: "Select your team, collaborate, and launch your project together." 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition">
                  {item.step}
                </div>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="text-primary w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 Best Projects Section */}
      <section id="projects" className="py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold mb-4 gradient-text">🔥 Trending Projects</h2>
            <p className="text-lg text-gray-600">Join these exciting projects or get inspired to post your own</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="glass p-6 rounded-xl shadow-lg flex flex-col justify-between h-full border border-transparent hover:border-primary/30 transition"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                      Hiring
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1"><Building size={14} /> {project.college}</div>
                    <div className="flex items-center gap-1"><Users size={14} /> {project.teamSize} Needed</div>
                  </div>
                  <Link to={`/project/${project.id}`} className="block w-full text-center bg-gradient-to-r from-primary to-secondary text-white py-2.5 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 font-medium">
                    Apply Now <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={browseAll} className="inline-flex items-center gap-2 px-6 py-3  text-indigo-600 border-1 border-indigo-600 rounded-3xl 
                        hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 
                        hover:text-white transition font-semibold cursor-pointer">
              Browse All Projects <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 💡 Why Students Love CollabHub */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Students <span className="gradient-text">Choose CollabHub</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Users, 
                title: "Cross-College Teams", 
                desc: "Collaborate with talented peers from IITs, NITs, DTU, and 500+ colleges across India." 
              },
              { 
                icon: Code, 
                title: "Real-World Experience", 
                desc: "Build projects that matter. Add meaningful work to your portfolio and resume." 
              },
              { 
                icon: Rocket, 
                title: "Career Opportunities", 
                desc: "Stand out to recruiters. Many students get internships and jobs through CollabHub projects." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="glass p-8 rounded-2xl text-center hover:shadow-xl transition"
              >
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎯 About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold mb-4 gradient-text">About CollabHub</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make student collaboration effortless and impactful.
            </p>
          </motion.div>

          <div className="glass p-10 rounded-2xl mb-12 text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <Target className="text-primary" /> Our Vision
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Every great startup began with a team. Every great project began with an idea. 
              CollabHub bridges the gap — helping students find their co-founders, teammates, 
              and collaborators to turn ideas into reality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Post Idea", desc: "Share your project with the community." },
              { icon: Users, title: "Get Applications", desc: "Skilled students apply to join your team." },
              { icon: Heart, title: "Build Together", desc: "Collaborate, create, and celebrate success." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-xl text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📬 Contact Section */}
      <section id="contact" className="py-16 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold mb-4 gradient-text">Let's Connect</h2>
            <p className="text-xl text-gray-600">Have questions? We're here to help you build your team.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full"><Mail className="text-primary" /></div>
                    <span className="text-gray-700">hello@collabhub.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full"><MapPin className="text-primary" /></div>
                    <span className="text-gray-700">Pan-India • Remote First</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full"><Phone className="text-primary" /></div>
                    <span className="text-gray-700">Support via Chat</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-bold mb-4">Follow Our Journey</h4>
                  <div className="flex gap-4">
                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition"><Github size={20} /></a>
                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition"><Linkedin size={20} /></a>
                    <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition"><Twitter size={20} /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-8 rounded-2xl space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks for reaching out! We\'ll get back to you soon. 🚀');
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input type="text" required className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none transition" placeholder="e.g., Rahul Sharma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">College Email</label>
                <input type="email" required className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none transition" placeholder="you@college.edu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
                <textarea rows="4" required className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none transition" placeholder="Tell us about your project or question..."></textarea>
              </div>
              <button className="w-full py-3  text-indigo-600 border-1 border-indigo-600 rounded-3xl 
                        hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 
                        hover:text-white transition font-semibold flex items-center justify-center gap-2">
                Send Message <ArrowRight size={18} />
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass py-10 text-center border-t">
        <p className="text-gray-600 font-medium">© 2024 CollabHub. All rights reserved.</p>
        <p className="text-sm text-gray-500 mt-2">Built with ❤️ for student builders across India</p>
      </footer>

    </div></>
  );
};

export default Home;