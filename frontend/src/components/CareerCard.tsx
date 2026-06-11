import React from 'react';
import type { CareerGoal } from '../services/mockData';
import { Target, TrendingUp, DollarSign, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CareerCardProps {
  career: CareerGoal;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onCompare?: (career: CareerGoal) => void;
  onViewDetails?: (career: CareerGoal) => void;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  career,
  isSelected = false,
  onSelect,
  onCompare,
  onViewDetails,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass-panel p-6 rounded-xl flex flex-col justify-between border-2 transition-all ${
        isSelected
          ? 'border-primary ring-2 ring-primary/20 dark:border-primary'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}
    >
      <div>
        {/* Header Title */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{career.title}</h3>
            <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded-full ${
              career.demand === 'Very High' 
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400' 
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
            }`}>
              {career.demand} Demand
            </span>
          </div>
          <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${isSelected ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
            <Target className="w-5 h-5" />
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {career.description}
        </p>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-slate-100 dark:border-slate-800/60 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" /> Avg Salary
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate block">
              {career.salary.split(' ')[0]}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Growth
            </span>
            <span className="font-semibold text-success dark:text-success-light truncate block">
              {career.growth.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="mb-6">
          <span className="text-[10px] font-semibold uppercase text-slate-400 dark:text-slate-500 block mb-2">Required Core Skills</span>
          <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-hidden">
            {career.requiredSkills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[10px] rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
                {skill}
              </span>
            ))}
            {career.requiredSkills.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                +{career.requiredSkills.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 pt-2">
        {onSelect && (
          <button
            onClick={() => onSelect(career.id)}
            className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors ${
              isSelected
                ? 'bg-primary text-white hover:bg-primary-dark shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isSelected ? 'Target Career Active' : 'Select as Goal'}
          </button>
        )}
        <div className="flex gap-2">
          {onCompare && (
            <button
              onClick={() => onCompare(career)}
              className="flex-1 py-1.5 text-[11px] font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg transition-colors"
            >
              Compare
            </button>
          )}
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(career)}
              className="flex-1 py-1.5 text-[11px] font-medium text-primary dark:text-primary-light hover:underline flex items-center justify-center gap-0.5"
            >
              Details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
