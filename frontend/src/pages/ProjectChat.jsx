import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Send, MessageSquare, Sparkles,
  Paperclip, Smile, ExternalLink
} from 'lucide-react';

const ProjectChat = ({ user, projects }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate('/messages')}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          
          {/* Clickable Project Title - Navigate to Project Details */}
          <button 
            onClick={() => navigate(`/project/${project._id}`)}
            className="flex items-center gap-3 flex-1 min-w-0 hover:bg-gray-50 rounded-xl px-2 py-1.5 transition text-left"
            title="View Project Details"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm flex-shrink-0">
              {project.title?.charAt(0)}
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-800 truncate hover:text-indigo-600 transition">
                {project.title}
              </h1>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {project.team?.length || 1} members online • Click for details
              </p>
            </div>
          </button>

          {/* Optional: Quick link to live project */}
          {project.liveLink && (
            <a 
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-xl transition"
              title="Open Live Project"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Chat Area - Full Width */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col p-4 overflow-hidden">
        
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          
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

      </div>
    </div>
  );
};

export default ProjectChat;