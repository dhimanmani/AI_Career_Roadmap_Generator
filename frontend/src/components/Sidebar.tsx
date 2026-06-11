import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, User, Target, ClipboardList, TrendingUp, Map, BarChart3, 
  Lightbulb, Users, Bell, Shield, Settings, LogOut, ChevronLeft, ChevronRight, GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const menuGroups = [
    {
      group: "Core",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Career Profile", path: "/profile", icon: User },
        { name: "Goal Selection", path: "/goals", icon: Target },
      ]
    },
    {
      group: "Assessment & Planning",
      items: [
        { name: "Skill Inventory", path: "/skills", icon: ClipboardList },
        { name: "Gap Analysis", path: "/gap-analysis", icon: TrendingUp },
        { name: "AI Roadmap Builder", path: "/roadmap", icon: Map },
      ]
    },
    {
      group: "Execution",
      items: [
        { name: "Progress Tracking", path: "/progress", icon: BarChart3 },
        { name: "Recommended Projects", path: "/projects", icon: Lightbulb },
        { name: "Mentor Review", path: "/mentor", icon: Users },
      ]
    },
    {
      group: "Account & System",
      items: [
        { name: "Notifications", path: "/notifications", icon: Bell },
        { name: "Reports & Analytics", path: "/reports", icon: BarChart3 },
        { name: "Admin Console", path: "/admin", icon: Shield },
        { name: "Settings", path: "/settings", icon: Settings },
      ]
    }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <motion.aside
      className={`h-screen fixed top-0 left-0 z-40 bg-white dark:bg-darkBg-card border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      animate={{ width: collapsed ? 80 : 256 }}
    >
      {/* Sidebar Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="p-2 bg-gradient-to-tr from-primary to-secondary text-white rounded-lg flex-shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              >
                ACRG
              </motion.span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="overflow-y-auto overflow-x-hidden p-3 space-y-4 max-h-[calc(100vh-140px)]">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              {!collapsed && (
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase px-3">
                  {group.group}
                </p>
              )}
              {group.items.map((item, iIdx) => (
                <NavLink
                  key={iIdx}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                      isActive
                        ? 'bg-primary text-white font-medium shadow-md shadow-primary/20'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Logout Action */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors duration-150"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Sign Out
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  );
};
