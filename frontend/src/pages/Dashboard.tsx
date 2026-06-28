import React from 'react';
import {
  Target, GraduationCap, Clock, BookOpen,
  Sparkles, CheckCircle2, MessageSquare, Bell, ArrowRight, Zap, CheckSquare, AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, LineChart, Line
} from 'recharts';
import { DashboardCard } from '../components/DashboardCard';
import { ProgressBar } from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { goalService } from '../services/goal.service';
import { roadmapService } from '../services/roadmap.service';
import { notificationService } from '../services/notification.service';
import type { Roadmap } from '../types/api';

// Static chart data (real analytics would come from /analytics endpoint)
const skillGrowthData = [
  { name: 'Jan', JS: 40, SQL: 30, React: 20 },
  { name: 'Feb', JS: 50, SQL: 40, React: 35 },
  { name: 'Mar', JS: 65, SQL: 45, React: 55 },
  { name: 'Apr', JS: 70, SQL: 60, React: 70 },
  { name: 'May', JS: 75, SQL: 65, React: 80 },
  { name: 'Jun', JS: 80, SQL: 70, React: 85 },
];

// Skeleton loader component
function StatSkeleton() {
  return (
    <div className="h-24 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
  );
}

function RoadmapEmptyState({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="glass-panel p-8 rounded-xl border border-dashed border-primary/30 dark:border-primary/40 text-center space-y-4 flex flex-col items-center">
      <div className="p-3 bg-primary/10 rounded-full">
        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
      </div>
      <div>
        <h3 className="font-bold text-slate-800 dark:text-white text-sm">No Roadmap Generated Yet</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Set a career goal first, then generate your AI-powered learning roadmap.
        </p>
      </div>
      <button
        onClick={onGenerate}
        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg shadow-md shadow-primary/15 flex items-center gap-1.5 transition-colors"
      >
        Generate My Roadmap <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch user's career goals
  const { data: goals = [], isLoading: goalsLoading } = useQuery({
    queryKey: ['career-goals'],
    queryFn: goalService.list,
    staleTime: 60_000,
  });

  const activeGoal = goals.find((g) => g.isActive) ?? goals[0];

  // Fetch active roadmap (requires an existing roadmap id from the goal or career-goals)
  // We use the career goals to discover the roadmap for now
  const { data: roadmap, isLoading: roadmapLoading, error: roadmapError } = useQuery<Roadmap | null>({
    queryKey: ['active-roadmap', activeGoal?.id],
    queryFn: async () => {
      if (!activeGoal) return null;
      // Try to get roadmap via generate-check; if no roadmap exists, return null
      try {
        // We need to hit the backend to find existing roadmaps.
        // Since the API only has GET /roadmaps/:id (not list), we'll try
        // the careerGoal id stored in localStorage as a quick bridge
        const savedRoadmapId = localStorage.getItem('acrg_roadmap_id');
        if (!savedRoadmapId) return null;
        return await roadmapService.getById(savedRoadmapId);
      } catch {
        return null;
      }
    },
    enabled: !goalsLoading,
    staleTime: 30_000,
  });

  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.list,
    staleTime: 60_000,
  });

  const milestones = roadmap?.milestones ?? [];
  const completionPercent = roadmapService.getCompletionPercent(milestones);
  const completedCount = milestones.filter((m) => m.status === 'COMPLETED').length;
  const inProgressMilestone = milestones.find((m) => m.status === 'IN_PROGRESS') ?? milestones.find((m) => m.status === 'NOT_STARTED');

  // Build a simple weekly progress trend from milestones
  const roadmapTrendData = milestones.length > 0
    ? milestones.slice(0, 6).map((m, i) => ({
        name: `Wk ${i + 1}`,
        progress: m.status === 'COMPLETED' ? 100 : m.status === 'IN_PROGRESS' ? 50 : 0,
      }))
    : [
        { name: 'Wk 1', progress: 0 },
        { name: 'Wk 2', progress: 0 },
        { name: 'Wk 3', progress: 0 },
        { name: 'Wk 4', progress: 0 },
      ];

  const isLoading = goalsLoading || roadmapLoading;

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 dark:from-primary/20 dark:via-secondary/20 dark:to-primary/5 p-6 rounded-2xl border border-primary/10 dark:border-primary/25">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Welcome back, {user?.name?.split(' ')[0] ?? 'Learner'}! <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {activeGoal
              ? <>Targeting <strong className="text-slate-800 dark:text-slate-350">{goalService.trackToDisplayName(activeGoal.careerGoal)}</strong> — keep pushing!</>
              : 'Set a career goal to get started on your AI roadmap.'}
          </p>
        </div>
        <button
          onClick={() => navigate('/roadmap')}
          className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg shadow-md shadow-primary/15 flex items-center gap-1.5 transition-colors"
        >
          Open AI Roadmap <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
            <DashboardCard
              title="Current Career Goal"
              value={activeGoal ? goalService.trackToDisplayName(activeGoal.careerGoal) : 'Not Set'}
              icon={Target}
              change={activeGoal ? 'Active goal' : 'Select a goal →'}
              changeType="positive"
              color="text-primary bg-primary/10"
            />
            <DashboardCard
              title="Roadmap Completion"
              value={roadmap ? `${completionPercent}%` : '—'}
              icon={GraduationCap}
              change={roadmap ? `${completedCount} of ${milestones.length} milestones` : 'Generate a roadmap'}
              changeType="positive"
              color="text-secondary bg-secondary/10"
            />
            <DashboardCard
              title="Active Milestone"
              value={inProgressMilestone ? `Phase ${inProgressMilestone.phase}` : 'None'}
              icon={Clock}
              change={inProgressMilestone?.title ?? 'No active milestone'}
              changeType="positive"
              color="text-emerald-500 bg-emerald-500/10"
            />
          </>
        )}
      </div>

      {/* Secondary Quickstats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800">
          <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Milestones Done</p>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">
              {isLoading ? '—' : `${completedCount} / ${milestones.length}`}
            </h4>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800">
          <div className="p-2.5 rounded-lg bg-pink-50 dark:bg-pink-950/30 text-pink-500">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Notifications</p>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">
              {notifications.filter((n) => !n.isRead).length} Unread
            </h4>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800">
          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-500">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Roadmap Status</p>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white capitalize">
              {isLoading ? '—' : (roadmap?.status?.toLowerCase().replace('_', ' ') ?? 'Not started')}
            </h4>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Area Chart: Skill Growth */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Skill Growth Trends</h3>
              <p className="text-[10px] text-slate-405 dark:text-slate-400">Monthly proficiency progress on core competencies</p>
            </div>
            <span className="text-xs text-primary font-semibold hover:underline cursor-pointer" onClick={() => navigate('/skills')}>View Skill Board</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={skillGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorJS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorReact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                <Area type="monotone" dataKey="JS" name="TypeScript" stroke="#2563EB" fillOpacity={1} fill="url(#colorJS)" strokeWidth={2} />
                <Area type="monotone" dataKey="React" name="React/CSS" stroke="#7C3AED" fillOpacity={1} fill="url(#colorReact)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Roadmap Momentum */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Roadmap Momentum</h3>
            <p className="text-[10px] text-slate-405 dark:text-slate-400">Milestone completion progress</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roadmapTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                <Line type="monotone" dataKey="progress" name="Completion %" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom widgets grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Current Milestone / Empty State */}
        <div className="lg:col-span-8 space-y-6">
          {isLoading ? (
            <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 h-36 animate-pulse bg-slate-100 dark:bg-slate-800" />
          ) : roadmap ? (
            <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-primary" /> Current Roadmap Milestone
                </h3>
                <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded">
                  {inProgressMilestone ? 'In Progress' : 'Not Started'}
                </span>
              </div>

              {inProgressMilestone ? (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 font-bold text-xs">
                    P{inProgressMilestone.phase}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{inProgressMilestone.title}</h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 line-clamp-2">{inProgressMilestone.description}</p>
                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">Roadmap completion</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{completionPercent}%</span>
                      </div>
                      <ProgressBar value={completionPercent} size="sm" />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">All milestones completed! 🎉</p>
              )}
            </div>
          ) : (
            <RoadmapEmptyState onGenerate={() => navigate('/goals')} />
          )}

          {/* AI Skill Suggestions */}
          <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> AI Skill Suggestions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200/60 dark:border-slate-850 rounded-xl bg-slate-50/30 dark:bg-slate-800/20 space-y-2">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-250">Prisma ORM</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Required for modern TypeScript backends. Speeds up PostgreSQL queries.</p>
                <button onClick={() => navigate('/roadmap')} className="text-[10px] text-primary hover:underline font-semibold">+ Add to Phase 2</button>
              </div>
              <div className="p-4 border border-slate-200/60 dark:border-slate-850 rounded-xl bg-slate-50/30 dark:bg-slate-800/20 space-y-2">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-250">Docker Containers</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Simplifies local database deployments. Crucial for full-stack environments.</p>
                <button onClick={() => navigate('/roadmap')} className="text-[10px] text-primary hover:underline font-semibold">+ Add to Phase 4</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Notifications Widget */}
        <div className="lg:col-span-4 space-y-6">
          {roadmapError && (
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-xs">Could not load roadmap data.</p>
            </div>
          )}

          <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-500" /> Recent Alerts
            </h3>
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 italic text-center py-4">No notifications yet.</p>
              ) : (
                notifications.slice(0, 3).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => navigate('/notifications')}
                    className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer text-xs space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-primary tracking-wider uppercase">{notif.type}</span>
                      <span className="text-[8px] text-slate-400">{new Date(notif.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h5 className="font-semibold text-slate-800 dark:text-slate-200">{notif.title}</h5>
                    {!notif.isRead && (
                      <div className="w-2 h-2 rounded-full bg-primary inline-block ml-1" />
                    )}
                  </div>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={() => navigate('/notifications')}
                className="w-full text-[10px] text-primary hover:underline font-semibold text-center"
              >
                View all notifications
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-500" /> Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Set Career Goal', path: '/goals' },
                { label: 'Update Skills', path: '/skills' },
                { label: 'View Roadmap', path: '/roadmap' },
                { label: 'Check Progress', path: '/progress' },
              ].map((action) => (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {action.label}
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
