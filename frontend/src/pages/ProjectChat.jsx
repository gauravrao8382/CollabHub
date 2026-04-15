import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Send, MessageSquare, Sparkles,
  Paperclip, Smile, ExternalLink, MoreVertical,
  Phone, Video, Info
} from 'lucide-react';

const ProjectChat = ({ user, projects }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Find current project
  const project = projects.find(p => p._id === projectId || p.id === projectId);

  // Mock: Load messages (replace with actual API fetch)
  useEffect(() => {
    if (project) {
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
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
    setIsTyping(false);

    // Focus input after send
    inputRef.current?.focus();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring", stiffness: 300, damping: 25 } 
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-stone-800/50 border border-stone-700/50 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} className="text-amber-400/50" />
          </div>
          <h2 className="text-xl font-bold text-stone-100 mb-2">Project not found</h2>
          <p className="text-stone-400 mb-6 text-sm">The chat you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/messages')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 
                     text-white font-semibold hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 
                     transition-all duration-300 shadow-lg shadow-amber-500/30 
                     flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Back to Messages
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/30 text-stone-100 flex flex-col relative overflow-hidden">
      
      {/* ===== Background Decorative Elements - Warm Tones ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-amber-600/30 via-orange-600/25 to-rose-600/25 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-orange-600/25 via-rose-600/20 to-red-600/20 rounded-full blur-3xl"
        />
        {/* Warm Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* ===== Header - Warm Theme ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-stone-900/70 border-b border-stone-800/50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Back Button - Warm */}
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/messages')}
              className="p-2.5 rounded-xl bg-stone-800/50 border border-stone-700/50 
                       hover:bg-stone-800 hover:border-amber-500/30 transition-all"
              aria-label="Back to messages"
            >
              <ArrowLeft size={20} className="text-stone-300 hover:text-amber-400 transition-colors" />
            </motion.button>

            {/* Clickable Project Title - Warm */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(`/project/${project._id}`)}
              className="flex items-center gap-3 flex-1 min-w-0 hover:bg-stone-800/50 rounded-xl px-2 py-1.5 transition text-left group"
              title="View Project Details"
            >
              {/* Project Avatar - Warm Gradient */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 
                              flex items-center justify-center text-white font-bold shadow-lg">
                  {project.title?.charAt(0)?.toUpperCase() || 'P'}
                </div>
                {/* Online Status */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 
                               border-2 border-stone-900 rounded-full animate-pulse" />
              </div>
              
              {/* Project Info - Warm */}
              <div className="min-w-0 flex-1">
                <h1 className="font-bold text-stone-100 truncate group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h1>
                <p className="text-xs text-stone-400 flex items-center gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    {project.team?.length || 1} online
                  </span>
                  <span className="text-stone-600">•</span>
                  <span className="text-amber-400 group-hover:underline transition-colors">View details</span>
                </p>
              </div>
            </motion.button>

            {/* Action Buttons - Warm */}
            <div className="flex items-center gap-1">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-stone-400 hover:text-amber-400 hover:bg-stone-800/50 
                           rounded-xl transition-all"
                  title="Open Live Project"
                >
                  <ExternalLink size={18} />
                </a>
              )}
              <button 
                className="p-2.5 text-stone-400 hover:text-amber-400 hover:bg-stone-800/50 
                         rounded-xl transition-all"
                title="Project Info"
              >
                <Info size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Chat Area - Warm Theme ===== */}
      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col p-3 lg:p-4 overflow-hidden relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex flex-col rounded-3xl bg-stone-800/40 border border-stone-700/50 
                   backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          
          {/* Messages Container - Warm */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {messages.length > 0 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {/* Date Separator - Warm */}
                  {messages[0] && (
                    <div className="flex justify-center my-2">
                      <span className="px-3 py-1 rounded-full bg-stone-700/50 text-xs text-stone-400 border border-stone-600/50">
                        {formatDate(messages[0].timestamp)}
                      </span>
                    </div>
                  )}
                  
                  {messages.map((msg, index) => {
                    const isOwn = msg.senderId === user._id;
                    const showAvatar = !isOwn && (index === 0 || messages[index - 1]?.senderId !== msg.senderId);
                    
                    return (
                      <motion.div
                        key={msg._id}
                        variants={messageVariants}
                        layout
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end gap-2.5 max-w-[85%] sm:max-w-[75%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                          
                          {/* Avatar - Only show for first message from each user - Warm */}
                          {!isOwn && showAvatar && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 
                                       flex items-center justify-center text-white text-xs font-bold 
                                       shadow-lg flex-shrink-0 border-2 border-stone-800"
                            >
                              {msg.senderName?.charAt(0)?.toUpperCase() || 'U'}
                            </motion.div>
                          )}
                          {!isOwn && !showAvatar && <div className="w-8" />}

                          {/* Message Bubble - Warm */}
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className={`px-4 py-2.5 rounded-2xl text-sm shadow-lg ${
                              isOwn
                                ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-br-md shadow-amber-500/30'
                                : 'bg-stone-900/50 text-stone-100 border border-stone-700/50 rounded-bl-md backdrop-blur-sm'
                            }`}
                          >
                            {/* Sender Name for received messages - Warm */}
                            {!isOwn && showAvatar && (
                              <p className="text-[10px] font-semibold text-amber-300 mb-1">
                                {msg.senderName}
                              </p>
                            )}
                            
                            {/* Message Text */}
                            <p className="leading-relaxed whitespace-pre-wrap break-words">
                              {msg.text}
                            </p>
                            
                            {/* Timestamp - Warm */}
                            <p className={`text-[9px] mt-1.5 text-right ${
                              isOwn ? 'text-amber-200/70' : 'text-stone-500'
                            }`}>
                              {formatTime(msg.timestamp)}
                              {isOwn && msg.readBy?.length > 0 && (
                                <span className="ml-1 text-emerald-300">✓✓</span>
                              )}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Typing Indicator - Warm */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-end gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 
                                      flex items-center justify-center text-white text-xs font-bold shadow-lg" />
                        <div className="px-4 py-3 rounded-2xl bg-stone-900/50 border border-stone-700/50 backdrop-blur-sm">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center px-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-stone-700/50 border border-stone-600/50 
                                flex items-center justify-center mb-5">
                    <MessageSquare size={40} className="text-amber-400/50" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-100 mb-2">No messages yet</h3>
                  <p className="text-stone-400 text-sm max-w-xs">
                    Start the conversation with your team and collaborate on {project.title}!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Status - Warm */}
          {isTyping && messages.length > 0 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-stone-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Someone is typing...
              </p>
            </div>
          )}

          {/* Input Area - Warm */}
          <form onSubmit={sendMessage} className="p-4 bg-stone-900/30 border-t border-stone-700/50">
            <div className="flex items-center gap-2">
              {/* Attach Button - Warm */}
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-stone-400 hover:text-amber-400 hover:bg-stone-800/50 
                         rounded-xl transition-all"
                title="Attach file"
              >
                <Paperclip size={18} />
              </motion.button>

              {/* Message Input - Warm Focus */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(e);
                    }
                  }}
                  placeholder="Type a message..."
                  className="w-full bg-stone-800/50 border border-stone-700/50 rounded-2xl 
                           px-5 py-3 text-sm text-stone-100 placeholder-stone-500 
                           focus:outline-none focus:ring-2 focus:ring-amber-500/50 
                           focus:border-amber-500 transition-all duration-300"
                />
              </div>

              {/* Emoji Button - Warm */}
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-stone-400 hover:text-amber-400 hover:bg-stone-800/50 
                         rounded-xl transition-all"
                title="Add emoji"
              >
                <Smile size={18} />
              </motion.button>

              {/* Send Button - Warm Gradient */}
              <motion.button
                type="submit"
                disabled={!newMessage.trim()}
                whileHover={{ scale: newMessage.trim() ? 1.05 : 1 }}
                whileTap={{ scale: newMessage.trim() ? 0.95 : 1 }}
                className={`p-3 rounded-xl transition-all shadow-lg flex items-center justify-center ${
                  newMessage.trim()
                    ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 shadow-amber-500/30 hover:shadow-amber-500/50'
                    : 'bg-stone-700/50 text-stone-500 cursor-not-allowed'
                }`}
              >
                <Send size={18} className={newMessage.trim() ? 'ml-0.5' : ''} />
              </motion.button>
            </div>
            
            {/* Input Helper Text - Warm */}
            <p className="text-[10px] text-stone-500 text-center mt-2">
              Press <kbd className="px-1.5 py-0.5 bg-stone-700/50 rounded text-stone-400">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-stone-700/50 rounded text-stone-400">Shift+Enter</kbd> for new line
            </p>
          </form>
        </motion.div>

      </main>

      {/* Custom Scrollbar CSS for Warm Dark Mode */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #44403c; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #57534e; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #44403c transparent; }
        
        /* Smooth focus outline */
        input:focus, button:focus {
          outline: none;
        }
        
        /* Prevent text selection on interactive elements */
        .cursor-pointer, button {
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectChat;