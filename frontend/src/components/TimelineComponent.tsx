import React from 'react';
import type { RoadmapMilestone } from '../services/mockData';
import { RoadmapCard } from './RoadmapCard';
import { CheckCircle2, PlayCircle, Circle, ArrowDown } from 'lucide-react';

interface TimelineComponentProps {
  milestones: RoadmapMilestone[];
  onStatusChange?: (id: string, nextStatus: 'Not Started' | 'In Progress' | 'Completed') => void;
  onViewDetails?: (milestone: RoadmapMilestone) => void;
}

export const TimelineComponent: React.FC<TimelineComponentProps> = ({
  milestones,
  onStatusChange,
  onViewDetails,
}) => {
  // Sort milestones by phase
  const sortedMilestones = [...milestones].sort((a, b) => a.phase - b.phase);

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <div className="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center border-4 border-slate-50 dark:border-darkBg shadow-md">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'In Progress':
        return (
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center border-4 border-slate-50 dark:border-darkBg shadow-md animate-pulse">
            <PlayCircle className="w-4 h-4" />
          </div>
        );
      case 'Not Started':
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 flex items-center justify-center border-4 border-slate-50 dark:border-darkBg shadow-sm">
            <Circle className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:inset-y-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-slate-250 dark:before:bg-slate-800">
      {sortedMilestones.map((milestone, idx) => {
        const isLast = idx === sortedMilestones.length - 1;

        return (
          <div key={milestone.id} className="relative">
            {/* Timeline Marker */}
            <span className="absolute -left-10 sm:-left-12 top-1.5 z-10">
              {getTimelineIcon(milestone.status)}
            </span>

            {/* Content Node */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Phase Info */}
              <div className="lg:col-span-2 pt-2">
                <span className="text-xs font-semibold text-primary dark:text-primary-light uppercase tracking-wider block">
                  Phase {milestone.phase}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {milestone.phase === 1 && 'Foundations'}
                  {milestone.phase === 2 && 'Intermediate'}
                  {milestone.phase === 3 && 'Core Projects'}
                  {milestone.phase === 4 && 'Advanced Ops'}
                  {milestone.phase === 5 && 'Placement Ready'}
                </span>
              </div>

              {/* Milestone Details Card */}
              <div className="lg:col-span-10">
                <RoadmapCard
                  milestone={milestone}
                  onStatusChange={onStatusChange}
                  onViewDetails={onViewDetails}
                />
              </div>
            </div>

            {/* Connecting Arrow */}
            {!isLast && (
              <div className="hidden lg:flex justify-center absolute -bottom-6 left-1/2 -translate-x-1/2 text-slate-350 dark:text-slate-800 pointer-events-none">
                <ArrowDown className="w-4 h-4" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
