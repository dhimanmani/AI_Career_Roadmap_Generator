import React from 'react';
import { 
  Target, GraduationCap, Clock, BookOpen, 
  Sparkles, CheckCircle2, MessageSquare, Bell, ArrowRight, Zap, CheckSquare
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, LineChart, Line 
} from 'recharts';
import { DashboardCard } from '../components/DashboardCard';
import { ProgressBar } from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { 
  currentStudentProfile, careerGoals, progressStats, 
  notificationsList, mentorReviews, sampleRoadmap 
} from '../services/mockData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Find user's target career info
  const targetCareer = careerGoals.find(c => c.id === 'full-stack') || careerGoals[0];

  const skillGrowthData = [
    { name: 'Jan', JS: 40, SQL: 30, React: 20 },
    { name: 'Feb', JS: 50, SQL: 40, React: 35 },
    { name: 'Mar', JS: 65, SQL: 45, React: 55 },
    { name: 'Apr', JS: 70, SQL: 60, React: 70 },
    { name: 'May', JS: 75, SQL: 65, React: 80 },
    { name: 'Jun', JS: 80, SQL: 70, React: 85 }
  ];

  const roadmapTrendData = [
    { name: 'Wk 1', progress: 10 },
    { name: 'Wk 2', progress: 15 },
    { name: 'Wk 3', progress: 22 },
    { name: 'Wk 4', progress: 28 },
    { name: 'Wk 5', progress: 34 },
    { name: 'Wk 6', progress: 38 }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 dark:from-primary/20 dark:via-secondary/20 dark:to-primary/5 p-6 rounded-2xl border border-primary/10 dark:border-primary/25">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Welcome back, {currentStudentProfile.name}! <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You are currently on a <strong className="text-slate-800 dark:text-slate-350">{progressStats.streak} day learning streak</strong>. Keep up the momentum!
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
        <DashboardCard 
          title="Current Career Goal" 
          value={targetCareer.title} 
          icon={Target} 
          change="+15% demand" 
          changeType="positive"
          color="text-primary bg-primary/10"
        />
        <DashboardCard 
          title="Roadmap Completion" 
          value={`${progressStats.roadmapCompletion}%`} 
          icon={GraduationCap} 
          change="Completed Phase 1" 
          changeType="positive"
          color="text-secondary bg-secondary/10"
        />
        <DashboardCard 
          title="Weekly Learning" 
          value="20.5 Hours" 
          icon={Clock} 
          change="+2.4 hours" 
          changeType="positive"
          color="text-emerald-500 bg-emerald-500/10"
        />
      </div>

      {/* Secondary Quickstats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800">
          <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Milestones Done</p>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">{progressStats.skillsLearned} / {sampleRoadmap.length}</h4>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800">
          <div className="p-2.5 rounded-lg bg-pink-50 dark:bg-pink-950/30 text-pink-500">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Projects Completed</p>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">{progressStats.projectsCompleted} Projects</h4>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center gap-3 border border-slate-200/60 dark:border-slate-800">
          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-500">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Certificates Earned</p>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white">{progressStats.certificatesEarned} Certificates</h4>
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
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
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

        {/* Line Chart: Roadmap progress trend */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Roadmap Momentum</h3>
            <p className="text-[10px] text-slate-405 dark:text-slate-400">Weekly progress velocity toward targeted path</p>
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
        {/* Left Side: Tasks & Recommendations */}
        <div className="lg:col-span-8 space-y-6">
          {/* Upcoming Tasks */}
          <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-primary" /> Current Roadmap Milestone
              </h3>
              <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded">In Progress</span>
            </div>
            
            {/* Display the active milestone (Node.js API) */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 font-bold text-xs">
                M3
              </div>
              <div className="flex-1 space-y-1.5">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Node.js & Express REST APIs</h4>
                <p className="text-xs text-slate-550 dark:text-slate-400">
                  Build robust backend web servers, implement core middleware routes, and integrate database connections.
                </p>
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-slate-400">Section completion</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">45%</span>
                  </div>
                  <ProgressBar value={45} size="sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Skills */}
          <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> AI Skill Suggestions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200/60 dark:border-slate-850 rounded-xl bg-slate-50/30 dark:bg-slate-800/20 space-y-2">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-250">Prisma ORM</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Required for modern TypeScript backends. Speeds up PostgreSQL queries.</p>
                <button 
                  onClick={() => navigate('/roadmap')}
                  className="text-[10px] text-primary hover:underline font-semibold"
                >
                  + Add to Phase 2
                </button>
              </div>
              <div className="p-4 border border-slate-200/60 dark:border-slate-850 rounded-xl bg-slate-50/30 dark:bg-slate-800/20 space-y-2">
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-250">Docker Containers</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Simplifies local database deployments. Crucial for full-stack environments.</p>
                <button 
                  onClick={() => navigate('/roadmap')}
                  className="text-[10px] text-primary hover:underline font-semibold"
                >
                  + Add to Phase 4
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Feedback & Notifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mentor Feedback */}
          <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-500" /> Recent Mentor Feedback
            </h3>
            
            {mentorReviews.slice(0, 1).map((rev) => (
              <div key={rev.id} className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={rev.avatar} alt={rev.mentorName} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{rev.mentorName}</h4>
                    <p className="text-[9px] text-slate-400">{rev.role}</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-relaxed line-clamp-3">
                  "{rev.feedbackText}"
                </p>
                <button
                  onClick={() => navigate('/mentor')}
                  className="text-[10px] text-primary hover:underline font-semibold"
                >
                  View full comments
                </button>
              </div>
            ))}
          </div>

          {/* Notifications Widget */}
          <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-500" /> Recent Alerts
            </h3>
            <div className="space-y-3">
              {notificationsList.slice(0, 2).map((notif) => (
                <div 
                  key={notif.id} 
                  onClick={() => navigate('/notifications')}
                  className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer text-xs space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-primary tracking-wider uppercase">{notif.category}</span>
                    <span className="text-[8px] text-slate-400">{notif.time}</span>
                  </div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">{notif.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
