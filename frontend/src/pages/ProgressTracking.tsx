import React from 'react';
import { progressStats } from '../services/mockData';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Award, Zap, Calendar, GraduationCap, 
  ShieldCheck, CheckSquare, Sparkles 
} from 'lucide-react';

export const ProgressTracking: React.FC = () => {

  const activityData = [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 3.5 },
    { name: 'Wed', hours: 1 },
    { name: 'Thu', hours: 4 },
    { name: 'Fri', hours: 3 },
    { name: 'Sat', hours: 5.5 },
    { name: 'Sun', hours: 2.5 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Learning Progress & Stats</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Detailed overview of milestones completed, weekly hours, and achievements.</p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-lg text-xs font-semibold">
          <Zap className="w-4 h-4 text-amber-500 animate-bounce" />
          <span>Active Streak: {progressStats.streak} Days</span>
        </div>
      </div>

      {/* Stats Cards Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Roadmap Progress", value: `${progressStats.roadmapCompletion}%`, icon: GraduationCap, color: "text-primary bg-primary/10" },
          { label: "Skills Assessed", value: progressStats.skillsLearned, icon: ShieldCheck, color: "text-secondary bg-secondary/10" },
          { label: "Projects Finished", value: progressStats.projectsCompleted, icon: Award, color: "text-emerald-500 bg-emerald-500/10" },
          { label: "Weekly Hours", value: "20.5 hrs", icon: Calendar, color: "text-pink-500 bg-pink-500/10" }
        ].map((item, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">{item.label}</span>
              <strong className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{item.value}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Hours Graph */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-slate-905 dark:text-white text-sm">Weekly Activity Chart</h3>
            <p className="text-[10px] text-slate-405 dark:text-slate-400">Hours spent coding and reading study materials</p>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                <Area type="monotone" dataKey="hours" name="Study Hours" stroke="#2563EB" fillOpacity={1} fill="url(#colorHours)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Progression */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-slate-905 dark:text-white text-sm">Monthly Progress Rate</h3>
            <p className="text-[10px] text-slate-405 dark:text-slate-400">Accumulated syllabus completion percentage</p>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressStats.monthlyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                <Line type="monotone" dataKey="rate" name="Completion Rate %" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Badges and Milestones Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Achievements Badges */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <Award className="w-5 h-5 text-secondary animate-pulse" /> Achievement Badges
          </h3>
          <p className="text-[10px] text-slate-455 dark:text-slate-400">Earn badges by completing tasks, scoring high, and reviewing plans.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {progressStats.badges.map((badge) => (
              <div 
                key={badge.id} 
                className="p-3 border border-slate-100 dark:border-slate-850 rounded-xl bg-slate-50/20 dark:bg-slate-900/10 flex items-start gap-3"
              >
                <div className={`p-2 rounded-lg flex-shrink-0 ${badge.color}`}>
                  {badge.id === "b1" && <Zap className="w-4 h-4" />}
                  {badge.id === "b2" && <Award className="w-4 h-4" />}
                  {badge.id === "b3" && <CheckSquare className="w-4 h-4" />}
                  {badge.id === "b4" && <Sparkles className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-805 dark:text-white">{badge.title}</h4>
                  <p className="text-[9px] text-slate-450 dark:text-slate-500 leading-normal mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone milestones */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <CheckSquare className="w-5 h-5 text-success" /> Active Milestones Status
          </h3>
          <p className="text-[10px] text-slate-455 dark:text-slate-400">Your current path objectives and their statuses.</p>

          <div className="space-y-3 pt-2">
            {[
              { skillName: "Advanced JavaScript & ES6+", phase: "Phase 1", status: "Completed", color: "text-success bg-success/10" },
              { skillName: "SQL Databases (PostgreSQL)", phase: "Phase 1", status: "Completed", color: "text-success bg-success/10" },
              { skillName: "Node.js & Express REST APIs", phase: "Phase 2", status: "In Progress", color: "text-primary bg-primary/10" },
              { skillName: "ORM & Query Builders (Prisma)", phase: "Phase 2", status: "Not Started", color: "text-slate-500 bg-slate-100" }
            ].map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-850 rounded-lg text-xs">
                <div>
                  <h4 className="font-semibold text-slate-805 dark:text-white">{m.skillName}</h4>
                  <span className="text-[9px] text-slate-400">{m.phase}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${m.color}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
