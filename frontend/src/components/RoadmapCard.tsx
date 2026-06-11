import React from 'react';
import type { RoadmapMilestone } from '../services/mockData';
import { PlayCircle, BookOpen, ExternalLink, CheckCircle2, Circle, Clock } from 'lucide-react';

interface RoadmapCardProps {
  milestone: RoadmapMilestone;
  onStatusChange?: (id: string, nextStatus: 'Not Started' | 'In Progress' | 'Completed') => void;
  onViewDetails?: (milestone: RoadmapMilestone) => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({
  milestone,
  onStatusChange,
  onViewDetails,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-success bg-success/10 border-success/20 dark:text-success-light dark:bg-success/20';
      case 'In Progress':
        return 'text-primary bg-primary/10 border-primary/20 dark:text-primary-light dark:bg-primary/20';
      case 'Not Started':
      default:
        return 'text-slate-500 bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-700';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Advanced':
        return 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20';
      case 'Intermediate':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20';
      case 'Beginner':
      default:
        return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20';
    }
  };

  const cycleStatus = () => {
    if (!onStatusChange) return;
    if (milestone.status === 'Not Started') {
      onStatusChange(milestone.id, 'In Progress');
    } else if (milestone.status === 'In Progress') {
      onStatusChange(milestone.id, 'Completed');
    } else {
      onStatusChange(milestone.id, 'Not Started');
    }
  };

  return (
    <div className="glass-panel p-5 rounded-xl flex flex-col justify-between transition-all hover:shadow-md border border-slate-200 dark:border-slate-800">
      <div>
        {/* Milestone Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div>
            <span className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold border rounded-full ${getStatusColor(milestone.status)}`}>
              {milestone.status}
            </span>
            <span className={`inline-block ml-1.5 px-2 py-0.5 text-[10px] font-medium rounded ${getDifficultyColor(milestone.difficulty)}`}>
              {milestone.difficulty}
            </span>
          </div>
          {onStatusChange && (
            <button
              onClick={cycleStatus}
              className="p-1 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Update status"
            >
              {milestone.status === 'Completed' ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Skill Title */}
        <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm tracking-tight">{milestone.skillName}</h4>

        {/* Skill Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {milestone.description}
        </p>

        {/* Duration Meta */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Estimated Time: <strong className="text-slate-700 dark:text-slate-350">{milestone.duration}</strong></span>
        </div>
      </div>

      {/* Resources & Details */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex flex-col gap-2">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Suggested Material</span>
          {milestone.resources.slice(0, 2).map((res, rIdx) => (
            <a
              key={rIdx}
              href={res.url}
              className="flex items-center gap-2 text-xs text-slate-650 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors group truncate"
            >
              {res.type === 'Video' ? (
                <PlayCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
              ) : (
                <BookOpen className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              )}
              <span className="truncate flex-1">{res.title}</span>
              <ExternalLink className="w-3 h-3 text-slate-450 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(milestone)}
            className="w-full text-center mt-2 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg transition-colors border border-slate-150 dark:border-slate-800"
          >
            Review Milestone details
          </button>
        )}
      </div>
    </div>
  );
};
