import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Search, Bell, Menu, User, Settings, LogOut, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { UserAvatar } from './UserAvatar';
import { currentStudentProfile, notificationsList } from '../services/mockData';

interface NavbarProps {
  onMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Student Dashboard';
    if (path.includes('/profile')) return 'Career Profile';
    if (path.includes('/goals')) return 'Goal Selection';
    if (path.includes('/skills')) return 'Skill Inventory';
    if (path.includes('/gap-analysis')) return 'Gap Analysis';
    if (path.includes('/roadmap')) return 'AI Roadmap Builder';
    if (path.includes('/progress')) return 'Progress & Milestones';
    if (path.includes('/projects')) return 'Recommended Projects';
    if (path.includes('/mentor')) return 'Mentor Reviews';
    if (path.includes('/notifications')) return 'Notifications';
    if (path.includes('/analytics')) return 'Reports & Analytics';
    if (path.includes('/admin')) return 'Admin Console';
    if (path.includes('/settings')) return 'Settings';
    return 'ACRG Console';
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;

  return (
    <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-6 bg-white/80 dark:bg-darkBg-card/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      {/* Page Title & Mobile Menu Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            {getPageTitle()}
            {location.pathname.includes('/roadmap') && (
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary dark:bg-primary/20 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse" /> AI Core
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Mock Search Bar */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 w-64 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
          <Search className="w-4 h-4" />
          <span className="text-xs">Search or type /...</span>
          <kbd className="ml-auto text-[9px] bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 shadow-sm font-mono text-slate-500 dark:text-slate-400">⌘K</kbd>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Icon */}
        <button 
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
          >
            <UserAvatar name={currentStudentProfile.name} status="online" size="sm" />
            <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-300">
              {currentStudentProfile.name.split(' ')[0]}
            </span>
          </button>

          {profileOpen && (
            <>
              {/* Overlay to close the menu */}
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-darkBg-card rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{currentStudentProfile.name}</p>
                  <p className="text-xs text-slate-500 truncate dark:text-slate-400">{currentStudentProfile.email}</p>
                </div>
                
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  My Profile
                </Link>
                
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Account Settings
                </Link>
                
                <div className="border-t border-slate-100 dark:border-slate-800/80 my-1" />
                
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
