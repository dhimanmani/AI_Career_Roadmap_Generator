import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import { 
  User, Palette, Save, 
  CheckCircle2, Sun, Moon
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [successMsg, setSuccessMsg] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: 'Alex Rivera',
      email: 'alex.rivera@university.edu',
      weeklyReports: true,
      mentorAlerts: true,
      marketingEmails: false
    }
  });

  const onSubmitSettings = () => {
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Account & App Settings</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Configure your profile details, alert frequencies, and UI theme preferences.</p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit(onSubmitSettings)} className="space-y-6">
        {/* Profile Card */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
            <User className="w-4.5 h-4.5 text-primary" /> Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Full Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-205 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email Address</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-205 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Theme Preferences */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
            <Palette className="w-4.5 h-4.5 text-secondary" /> Appearance & Theme
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">Select how the user console appears on your workspace screens.</p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {/* Light Mode panel */}
            <div 
              onClick={() => { if (theme === 'dark') toggleTheme(); }}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                theme === 'light' 
                  ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' 
                  : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <Sun className="w-6 h-6" />
              <span className="text-xs font-bold">Light Mode</span>
            </div>

            {/* Dark Mode panel */}
            <div 
              onClick={() => { if (theme === 'light') toggleTheme(); }}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                theme === 'dark' 
                  ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/25' 
                  : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <Moon className="w-6 h-6" />
              <span className="text-xs font-bold">Dark Mode</span>
            </div>
          </div>
        </div>

        {/* Notifications Checkboxes */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
            <Sun className="w-4.5 h-4.5 text-emerald-500" /> Notifications & Alerts
          </h3>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-850 hover:bg-slate-55/10 cursor-pointer">
              <input
                type="checkbox"
                {...register('weeklyReports')}
                className="w-4.5 h-4.5 text-primary rounded border-slate-350 dark:border-slate-700 bg-transparent mt-0.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-250 block">Weekly Progress Reports</span>
                <span className="text-[10px] text-slate-450 dark:text-slate-450 leading-relaxed block">Receive email performance updates detailing study habits.</span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-850 hover:bg-slate-55/10 cursor-pointer">
              <input
                type="checkbox"
                {...register('mentorAlerts')}
                className="w-4.5 h-4.5 text-primary rounded border-slate-355 dark:border-slate-700 bg-transparent mt-0.5"
              />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-250 block">Mentor Review Alerts</span>
                <span className="text-[10px] text-slate-450 dark:text-slate-450 leading-relaxed block">Receive immediate warnings when an advisor approves a milestone.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-between items-center bg-white dark:bg-darkBg-card p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
          {successMsg ? (
            <div className="text-success text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Preferences updated successfully!
            </div>
          ) : (
            <span className="text-[10px] text-slate-400">Unsaved changes are marked with an asterisk (*)</span>
          )}

          <button
            type="submit"
            className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm shadow-primary/20"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
