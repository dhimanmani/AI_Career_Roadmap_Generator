import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: string;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'neutral',
  color = 'text-primary bg-primary/10',
  className = '',
}) => {
  const changeColor = {
    positive: 'text-success dark:text-success-light',
    negative: 'text-danger dark:text-danger-light',
    neutral: 'text-slate-500 dark:text-slate-400',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glass-panel glass-panel-hover p-6 rounded-xl relative overflow-hidden flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</h3>
        {change && (
          <p className="mt-2 text-xs flex items-center gap-1">
            <span className={`font-semibold ${changeColor[changeType]}`}>{change}</span>
            <span className="text-slate-400 dark:text-slate-500">vs last month</span>
          </p>
        )}
      </div>
      {/* Decorative gradient corner */}
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );
};
