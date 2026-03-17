import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Building, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className="glass p-6 rounded-xl shadow-lg flex flex-col justify-between h-full"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
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
        <Link to={`/project/${project.id}`} className="block w-full text-center bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2">
          View Details <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;