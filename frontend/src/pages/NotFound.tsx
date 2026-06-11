import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-darkBg p-6">
      <div className="w-full max-w-md text-center bg-white dark:bg-darkBg-card border border-slate-205 dark:border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary" />

        <div className="p-4 bg-rose-50 dark:bg-rose-955/20 text-rose-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-rose-100 dark:border-rose-900/50">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-slate-905 dark:text-white">Page Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The page you are looking for does not exist, or has been relocated by administrators.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-2 px-4 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" /> Home Page
          </button>
        </div>
      </div>
    </div>
  );
};
