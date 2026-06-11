import React from 'react';
import type { SkillItem } from '../services/mockData';
import { ProgressBar } from './ProgressBar';
import { ShieldCheck, Award, Zap } from 'lucide-react';

interface SkillCardProps {
  skill: SkillItem;
  className?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, className = '' }) => {
  const getLevelBadgeColor = (lvl: string) => {
    switch (lvl) {
      case 'Advanced':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/50';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/50';
      case 'Beginner':
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const getLevelIcon = (lvl: string) => {
    switch (lvl) {
      case 'Advanced':
        return <Award className="w-3.5 h-3.5" />;
      case 'Intermediate':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'Beginner':
      default:
        return <Zap className="w-3.5 h-3.5" />;
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-purple-500';
    if (score >= 50) return 'bg-primary';
    return 'bg-amber-500';
  };

  return (
    <div className={`glass-panel p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between ${className}`}>
      <div>
        {/* Category & Status */}
        <div className="flex justify-between items-center gap-2 mb-3">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {skill.category}
          </span>
          <span className={`px-2 py-0.5 text-[9px] font-semibold border rounded flex items-center gap-1 ${getLevelBadgeColor(skill.level)}`}>
            {getLevelIcon(skill.level)}
            {skill.level}
          </span>
        </div>

        {/* Skill Name */}
        <h4 className="font-bold text-slate-800 dark:text-white mb-4 text-sm tracking-tight">{skill.name}</h4>
      </div>

      {/* Progress Section */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-medium">Proficiency Score</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{skill.score}%</span>
        </div>
        <ProgressBar value={skill.score} color={getProgressColor(skill.score)} size="sm" />
      </div>
    </div>
  );
};
