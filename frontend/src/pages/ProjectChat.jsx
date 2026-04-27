import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MessageSquare, Paperclip, ExternalLink, Info } from 'lucide-react';

const ProjectChat = ({ user, projects }) => {
  const API = "https://collab-hub-production-adae.up.railway.app";
  const { projectId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Find current project
  const project = projects.find(p => p._id === projectId || p.id === projectId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${API}/message/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        // 🔥 Backend se data ko UI format me convert karo
        const formattedMessages = res.data.messages.map(msg => ({
          _id: msg._id,
          senderId: msg.userId,
          senderName: msg.name,
          text: msg.message,
          timestamp: msg.createdAt
        }));

        setMessages(formattedMessages);

      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (projectId) {
      fetchMessages();
    }
  }, [projectId]);
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

const sendMessage = async (e) => {
  e.preventDefault();
  if (!newMessage.trim() || !project) return;

  const tempMessage = {
    _id: Date.now().toString(),
    senderId: user?._id,
    senderName: user?.name,
    text: newMessage.trim(),
    timestamp: new Date().toISOString()
  };

  // 🔥 Optimistic UI
  setMessages(prev => [...prev, tempMessage]);
  setNewMessage('');

  try {
    const res = await axios.post(
      `${API}/message/${projectId}`,
      { message: tempMessage.text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    const realMessage = {
    _id: res.data.message._id,
    senderId: res.data.message.userId,
    senderName: res.data.message.name,
    text: res.data.message.message,
    timestamp: res.data.message.createdAt // ✅ important
  };

    // 🔥 Replace temp message with DB message
    setMessages(prev =>
      prev.map(msg =>
        msg._id === tempMessage._id ? realMessage : msg
      )
    );

  } catch (err) {
    console.error(err);

    // ❌ rollback UI if error
    setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
  }

  // focus maintain
  setTimeout(() => inputRef.current?.focus(), 100);
};

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  // Project not found state
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={28} className="text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Project not found</h2>
          <p className="text-sm text-slate-500 mb-5">The chat you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/messages')}
            className="px-4 py-2 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg transition flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} /> Back to Messages
          </button>
        </div>
      </div>
    );
  }

  return (
    // ✅ Use dvh for mobile viewport fix + flex column layout
    <div className="h-screen h-dvh bg-slate-50 flex flex-col overflow-hidden">
      
      {/* 🔗 Header - Fixed height */}
      <header className="shrink-0 sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-3 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/messages')}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
            aria-label="Back to messages"
          >
            <ArrowLeft size={18} className="text-slate-600" />
          </button>

          {/* Project Info */}
          <button 
            onClick={() => navigate(`/project/${project._id || project.id}`)}
            className="flex items-center gap-2.5 flex-1 min-w-0 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {project.title?.charAt(0)?.toUpperCase() || 'P'}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-semibold text-slate-900 truncate text-sm">{project.title}</h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                {project.team?.length || 1} online
              </p>
            </div>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-0.5">
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-violet-600 hover:bg-slate-100 rounded-lg transition"
                title="Open Live Project"
              >
                <ExternalLink size={16} />
              </a>
            )}
            <button className="p-2 text-slate-500 hover:text-violet-600 hover:bg-slate-100 rounded-lg transition" title="Project Info">
              <Info size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* 💬 Chat Area - Flex container with proper constraints */}
      <main className="flex-1 min-h-0 max-w-4xl mx-auto w-full flex flex-col p-2 sm:p-3">
        
        <div className="flex-1 min-h-0 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          
          {/* Messages Container - ✅ Scrollable area with min-h-0 */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-hide">
            {messages.length > 0 ? (
              <>
                {/* Date Separator */}
                {messages[0] && (
                  <div className="flex justify-center sticky top-0 z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs shadow-sm">
                      {formatDate(messages[0].timestamp)}
                    </span>
                  </div>
                )}
                
                {messages.map((msg, index) => {
                  const isOwn = msg.senderId === user?._id;
                  const showAvatar = !isOwn && (index === 0 || messages[index - 1]?.senderId !== msg.senderId);
                  
                  return (
                    <div key={msg._id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                        
                        {/* Avatar - Only for first message from each user */}
                        {!isOwn && (
                          <div className={`flex-shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}>
                            <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-medium">
                              {msg.senderName?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                          </div>
                        )}

                        {/* Message Bubble */}
                        <div className={`px-3.5 py-2.5 rounded-2xl text-sm shadow-sm ${
                          isOwn 
                            ? 'bg-violet-600 text-white rounded-br-md' 
                            : 'bg-slate-100 text-slate-900 rounded-bl-md'
                        }`}>
                          {/* Sender Name */}
                          {!isOwn && showAvatar && (
                            <p className="text-[10px] font-medium text-slate-500 mb-0.5">{msg.senderName}</p>
                          )}
                          
                          {/* Message Text */}
                          <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                          
                          {/* Timestamp */}
                          <p className={`text-[10px] mt-1 text-right ${isOwn ? 'text-violet-200' : 'text-slate-400'}`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center px-4 pb-8">
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  <MessageSquare size={24} className="text-slate-400" />
                </div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">No messages yet</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Start the conversation with your team on <span className="font-medium">{project.title}</span>!
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ✅ Input Area - Fixed at bottom, never hidden */}
          <form onSubmit={sendMessage} className="shrink-0 p-2 sm:p-3 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center gap-2">
              {/* Attach */}
              {/* <button 
                type="button"
                className="p-2 text-slate-500 hover:text-violet-600 hover:bg-slate-100 rounded-lg transition"
                title="Attach file"
              >
                <Paperclip size={18} />
              </button> */}

              {/* Input */}
              <input 
                ref={inputRef}
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(e); } }}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm 
                         text-slate-900 placeholder-slate-400 
                         focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition"
              />

              {/* Send */}
              <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className={`p-2.5 rounded-xl transition flex items-center justify-center shrink-0 ${
                  newMessage.trim()
                    ? 'bg-violet-600 text-white hover:bg-violet-700' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* ✅ CSS to Hide Scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 640px) {
          input:focus {
            scroll-margin-bottom: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectChat;