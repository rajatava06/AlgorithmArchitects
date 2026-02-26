
import React from 'react';
import { Project } from '../types';
import { Clock, Tag, MoreVertical } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getCategoryColor = (cat: Project['category']) => {
    switch (cat) {
      case 'Design': return 'bg-pink-100 text-pink-600';
      case 'Craft': return 'bg-amber-100 text-amber-600';
      case 'Tech': return 'bg-blue-100 text-blue-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer relative"
    >
      <div className="aspect-video w-full rounded-xl bg-slate-100 mb-4 overflow-hidden relative">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-sm">
            No preview available
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 bg-white/90 rounded-lg shadow-sm text-slate-600 hover:text-indigo-600">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock size={12} />
            <span>{new Date(project.lastModified).toLocaleDateString()}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex -space-x-2">
          {[1, 2].map(i => (
            <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
          ))}
          <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-400">
            +3
          </div>
        </div>
        <span className="text-xs font-medium text-slate-400">
          {project.status}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
