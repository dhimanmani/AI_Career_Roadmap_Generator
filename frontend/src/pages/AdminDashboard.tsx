import React, { useState } from 'react';
import { adminDashboardAnalytics, careerGoals } from '../services/mockData';
import { DataTable } from '../components/DataTable';
import { 
  Users, Layers, Settings, Plus, Search, ShieldAlert
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Columns for DataTable users listing
  const userColumns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Email', accessor: 'email' as const },
    { header: 'Role', accessor: 'role' as const, render: (val: string) => (
      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
        val === 'Admin' 
          ? 'bg-rose-100 text-rose-700 dark:bg-rose-955/30 dark:text-rose-455' 
          : val === 'Mentor' 
            ? 'bg-purple-100 text-purple-700 dark:bg-purple-955/30 dark:text-purple-455' 
            : 'bg-blue-100 text-blue-700 dark:bg-blue-955/30 dark:text-blue-455'
      }`}>
        {val}
      </span>
    )},
    { header: 'Status', accessor: 'status' as const, render: (val: string) => (
      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
        val === 'Active' 
          ? 'bg-success/10 text-success' 
          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
      }`}>
        {val}
      </span>
    )}
  ];

  // Filtered users list
  const filteredUsers = adminDashboardAnalytics.users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Dashboard Console</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Configure global learning tracks, manage templates, and audit users.</p>
        </div>
        <button
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg shadow-md shadow-primary/20 flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Create Career Track
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-455 font-bold uppercase tracking-wider block">Total Students</span>
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {adminDashboardAnalytics.stats.totalUsers}
            </strong>
            <span className="text-[9px] text-success font-semibold flex items-center gap-0.5">+12 new registrations today</span>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-455 font-bold uppercase tracking-wider block">Active Templates</span>
            <strong className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {adminDashboardAnalytics.stats.activeTemplates} Tracks
            </strong>
            <span className="text-[9px] text-slate-450">7 target role pathways</span>
          </div>
          <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-455 font-bold uppercase tracking-wider block">Pending Submissions</span>
            <strong className="text-2xl font-extrabold text-slate-905 dark:text-white">
              {adminDashboardAnalytics.stats.pendingSubmissions} Reviews
            </strong>
            <span className="text-[9px] text-rose-500 font-semibold">Requires immediate review</span>
          </div>
          <div className="p-3 rounded-lg bg-rose-500/10 text-rose-500">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main grids: Users list and template manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: User Table */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Registered Users Database</h3>
            
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search user..."
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                />
              </div>

              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 outline-none"
              >
                <option value="All" className="dark:bg-darkBg-card">All Roles</option>
                <option value="Student" className="dark:bg-darkBg-card">Student</option>
                <option value="Mentor" className="dark:bg-darkBg-card">Mentor</option>
                <option value="Admin" className="dark:bg-darkBg-card">Admin</option>
              </select>
            </div>
          </div>

          <DataTable
            columns={userColumns}
            data={filteredUsers}
            searchKey="name"
          />
        </div>

        {/* Right column: Templates database */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Pathways Templates</h3>
          <p className="text-[10px] text-slate-455">Standard syllabus baselines used for AI generator training weights.</p>

          <div className="space-y-3 pt-2 max-h-[360px] overflow-y-auto pr-1">
            {careerGoals.map((track) => (
              <div 
                key={track.id} 
                className="p-3 border border-slate-100 dark:border-slate-850 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-805/40 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-semibold text-slate-805 dark:text-white">{track.title}</h4>
                  <span className="text-[9px] text-slate-400">{track.requiredSkills.length} core skills &bull; {track.demand}</span>
                </div>
                <button
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Configure curriculum details"
                >
                  <Settings className="w-4.5 h-4.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
