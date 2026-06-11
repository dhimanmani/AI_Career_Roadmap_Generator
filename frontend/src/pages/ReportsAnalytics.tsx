import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Calendar, FileText, ArrowUpRight, GraduationCap 
} from 'lucide-react';
import { progressStats } from '../services/mockData';

export const ReportsAnalytics: React.FC = () => {

  const cohortData = [
    { subject: 'Programming', you: 80, classAvg: 70 },
    { subject: 'Frameworks', you: 85, classAvg: 60 },
    { subject: 'Databases', you: 70, classAvg: 65 },
    { subject: 'Cloud', you: 45, classAvg: 50 },
    { subject: 'AI/ML', you: 30, classAvg: 45 },
    { subject: 'Soft Skills', you: 90, classAvg: 80 }
  ];

  const domainData = [
    { name: 'Frontend', score: 85, req: 80 },
    { name: 'Backend', score: 55, req: 75 },
    { name: 'Data Eng', score: 65, req: 70 },
    { name: 'DevOps', score: 30, req: 65 }
  ];

  const distributionData = [
    { week: 'Wk 1', Lectures: 5, Coding: 8, Reading: 4 },
    { week: 'Wk 2', Lectures: 6, Coding: 10, Reading: 3 },
    { week: 'Wk 3', Lectures: 4, Coding: 12, Reading: 5 },
    { week: 'Wk 4', Lectures: 7, Coding: 15, Reading: 4 },
    { week: 'Wk 5', Lectures: 5, Coding: 18, Reading: 6 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reports & Advanced Analytics</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Detailed performance audit reports and comparison metrics against cohort averages.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-805 text-slate-705 dark:text-slate-350 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" /> Export Report
        </button>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Placement Readiness Index</span>
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white">78 / 100</strong>
            <span className="text-[9px] text-success font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> +5% this week</span>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Rank</span>
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white">Top 12%</strong>
            <span className="text-[9px] text-slate-450">Compared to {progressStats.cohortSize} students</span>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Learning Hours</span>
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white">124.5 hrs</strong>
            <span className="text-[9px] text-slate-450">Active since January 2026</span>
          </div>
          <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cohort Comparison */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-slate-905 dark:text-white text-sm">Cohort Comparison</h3>
            <p className="text-[10px] text-slate-405 dark:text-slate-450">Your score vs current class average</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <XAxis dataKey="subject" stroke="#94A3B8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={9} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="you" name="My Score" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="classAvg" name="Class Average" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Proficiency bar */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-slate-905 dark:text-white text-sm">Domain Breakdown</h3>
            <p className="text-[10px] text-slate-405 dark:text-slate-450">Proficiency scores compared to hiring standards</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="score" name="Your Level" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="req" name="Target Goal" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Distribution analysis chart */}
      <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-805 space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Weekly Study Time Breakdown</h3>
          <p className="text-[10px] text-slate-405 dark:text-slate-450">Distribution between watching lectures, writing code, and reading text guides</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
              <XAxis dataKey="week" stroke="#94A3B8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Area type="monotone" dataKey="Lectures" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} />
              <Area type="monotone" dataKey="Coding" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
              <Area type="monotone" dataKey="Reading" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
