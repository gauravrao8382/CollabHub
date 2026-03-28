import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Send, Users, Code, Globe, Cpu, Database, 
  Shield, ExternalLink, User, MessageSquare, Sparkles,
  Paperclip, Smile, MoreVertical, Phone, Video
} from 'lucide-react';

const ProjectChat = ({ user, projects }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showDetails, setShowDetails] = useState(true); // Toggle sidebar
  const messagesEndRef = useRef(null);

  // Find current project
  const project = projects.find(p => p._id === projectId || p.id === projectId);

  // Mock: Messages load karna (Backend se fetch karein actual me)
  useEffect(() => {
    if (project) {
      // fetch(`/api/messages/${projectId}`)...
      // setMessages(fetchedMessages);
    }
  }, [projectId, project]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !project) return;

    const messageData = {
      _id: Date.now().toString(),
      senderId: user._id,
      senderName: user.name,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    // Optimistic update
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');

    // Socket emit ya API call yahan
    // socket.emit('send_message', { ...messageData, projectId });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles size={64} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">Project not found</h2>
          <button 
            onClick={() => navigate('/messages')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            ← Back to Messages
          </button>
        </div>
      </div>
    );
  }

  const techIcons = {
    'Web Development': <Globe size={14} />,
    'App Development': <Code size={14} />,
    'AI/ML': <Cpu size={14} />,
    'Data Science': <Database size={14} />,
    'Blockchain': <Shield size={14} />,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/messages')}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
              {project.title?.charAt(0)}
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-800 truncate">{project.title}</h1>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {project.team?.length || 1} members online
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className={`p-2 rounded-xl transition ${showDetails ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Toggle Details"
            >
              <Users size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-600">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full flex gap-4 p-4 overflow-hidden">
        
        {/* Chat Area */}
        <div className={`flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all ${showDetails ? 'lg:mr-0' : ''}`}>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <AnimatePresence>
              {messages.length > 0 ? (
                messages.map((msg) => {
                  const isOwn = msg.senderId === user._id;
                  return (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[85%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar */}
                        {!isOwn && (
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 border-2 border-white">
                            {msg.senderName?.charAt(0) || 'U'}
                          </div>
                        )}
                        
                        {/* Message Bubble */}
                        <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                          isOwn 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                        }`}>
                          {!isOwn && <p className="text-[10px] font-bold text-gray-400 mb-0.5">{msg.senderName}</p>}
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          <p className={`text-[9px] mt-1 text-right ${isOwn ? 'text-indigo-200' : 'text-gray-400'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <MessageSquare size={56} className="mb-3 text-indigo-200" />
                  <p className="text-sm font-medium">No messages yet</p>
                  <p className="text-xs">Start the conversation with your team!</p>
                </div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-3">
              <button type="button" className="p-2 text-gray-400 hover:text-indigo-600 transition rounded-full hover:bg-gray-50">
                <Paperclip size={20} />
              </button>
              
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              
              <button type="button" className="p-2 text-gray-400 hover:text-yellow-500 transition rounded-full hover:bg-gray-50">
                <Smile size={20} />
              </button>
              
              <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar: Project Details + Team */}
        <AnimatePresence>
          {showDetails && (
            <motion.aside
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 320 }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="hidden lg:flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Project Details */}
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-500" />
                  Project Details
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                
                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[10px] font-medium rounded border border-gray-200 flex items-center gap-1">
                          {techIcons[project.type] || <Code size={10} />}
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex gap-2">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition"
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                  {project.repoLink && (
                    <a 
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
                    >
                      <Code size={14} /> Code
                    </a>
                  )}
                </div>
              </div>

              {/* Team Members */}
              <div className="p-5 flex-1 overflow-y-auto">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Users size={16} className="text-indigo-500" />
                  Team Members
                </h3>
                
                <div className="space-y-3">
                  {project.team?.map((member, i) => {
                    const isCurrentUser = member._id === user._id || member.email === user.email;
                    return (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
                            {member.name?.charAt(0) || 'U'}
                          </div>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isCurrentUser ? 'text-indigo-600' : 'text-gray-800'}`}>
                            {member.name} {isCurrentUser && '(You)'}
                          </p>
                          <p className="text-[10px] text-gray-400 truncate">{member.role || 'Member'}</p>
                        </div>
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                          <MessageSquare size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Add Member Button (Owner only) */}
                {(project.owner === user._id || project.createdBy === user._id) && (
                  <button className="w-full mt-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium hover:border-indigo-300 hover:text-indigo-500 transition">
                    + Add Member
                  </button>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ProjectChat;