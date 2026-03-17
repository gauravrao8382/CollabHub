import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${formData.name}! We will contact you at ${formData.email} soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-4 gradient-text">Get In Touch</h1>
          <p className="text-xl text-gray-600">Have questions? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full"><Mail className="text-primary" /></div>
                  <span className="text-gray-700">support@collabhub.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full"><MapPin className="text-primary" /></div>
                  <span className="text-gray-700">New Delhi, India</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full"><Phone className="text-primary" /></div>
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold mb-4">Follow Us</h4>
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
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="glass p-8 rounded-2xl space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none transition"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none transition"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                rows="4" 
                required
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary outline-none transition"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-bold hover:opacity-90 transition">
              Send Message
            </button>
          </motion.form>

        </div>
      </div>
    </div>
  );
};

export default Contact;