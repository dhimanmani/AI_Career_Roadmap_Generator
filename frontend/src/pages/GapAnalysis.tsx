import React from 'react';
import { gapAnalysisData } from '../services/mockData';
import { ProgressBar } from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, AlertTriangle, 
  ArrowRight, BookOpen, Star, Sparkles, CheckCircle2 
} from 'lucide-react';

export const GapAnalysis: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Skill Gap Analysis</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare your current skill scores against the required standard for a <strong className="text-slate-805 dark:text-white">{gapAnalysisData.selectedGoal}</strong> role.
          </p>
        </div>
        <button
          onClick={() => navigate('/roadmap')}
          className="px-4 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white text-xs font-bold rounded-lg shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all"
        >
          Generate AI Roadmap <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {/* Comparison visual overview */}
      <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
        <h3 className="font-bold text-slate-905 dark:text-white text-sm">Target Role Benchmark Comparison</h3>
        
        <div className="space-y-4 pt-2">
          {[
            { skill: "JavaScript & TypeScript Core", current: 75, target: 85, color: "bg-primary" },
            { skill: "React Web Framework", current: 80, target: 90, color: "bg-primary" },
            { skill: "Node.js & Backend Architecture", current: 35, target: 80, color: "bg-amber-500" },
            { skill: "Relational SQL Databases", current: 65, target: 75, color: "bg-primary" },
            { skill: "Docker Containerization", current: 20, target: 70, color: "bg-rose-500" }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-250">{item.skill}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  Current: <strong className="text-slate-800 dark:text-white">{item.current}%</strong> / Required: <strong>{item.target}%</strong>
                </span>
              </div>
              <div className="relative">
                {/* Benchmark Indicator Dot */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 z-10 w-2.5 h-4 bg-slate-900 dark:bg-white rounded-full cursor-help"
                  style={{ left: `${item.target}%` }}
                  title={`Target standard: ${item.target}%`}
                />
                <ProgressBar value={item.current} color={item.color} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths Card */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" /> Key Strengths
          </h3>
          <p className="text-[10px] text-slate-455 dark:text-slate-400">You already meet or exceed the requirements in these domains.</p>
          
          <div className="space-y-3 pt-2">
            {gapAnalysisData.strengths.map((str, idx) => (
              <div key={idx} className="p-3 border border-success/20 dark:border-success/30 rounded-xl bg-success/5 dark:bg-success/10 space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-success dark:text-success-light flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> {str.name}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{str.score}%</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {str.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses Card */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" /> Competency Gaps
          </h3>
          <p className="text-[10px] text-slate-455 dark:text-slate-400">These skills need improvement to qualify for placement drives.</p>

          <div className="space-y-3 pt-2">
            {gapAnalysisData.weaknesses.map((weak, idx) => (
              <div key={idx} className="p-3 border border-rose-200/20 dark:border-rose-900/35 rounded-xl bg-rose-50/5 dark:bg-rose-950/10 space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-rose-600 dark:text-rose-455 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> {weak.name}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{weak.score}%</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {weak.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Skills & Learning Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Priority Focus */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <TrendingUp className="w-5 h-5 text-primary" /> Priority Gaps to Fill
          </h3>
          <p className="text-[10px] text-slate-455 dark:text-slate-400">Start learning these first based on role importance and difficulty.</p>

          <div className="space-y-3 pt-2">
            {gapAnalysisData.prioritySkills.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg text-xs">
                <div className="space-y-0.5">
                  <h4 className="font-semibold text-slate-805 dark:text-white">{item.name}</h4>
                  <span className="text-[9px] text-slate-400">Timeline: {item.timeframe}</span>
                </div>
                <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                  item.importance === 'High' 
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-455' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-450'
                }`}>
                  {item.importance} Priority
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" /> Learning Recommendations
          </h3>
          <p className="text-[10px] text-slate-455 dark:text-slate-400">AI-curated resources targeting your exact weak areas.</p>

          <div className="space-y-3 pt-2">
            {gapAnalysisData.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg text-xs">
                <div>
                  <span className="text-[8px] font-bold text-secondary uppercase tracking-wider block">{rec.type}</span>
                  <h4 className="font-semibold text-slate-800 dark:text-white mt-0.5">{rec.resource}</h4>
                  <span className="text-[9px] text-slate-400">Focuses on: {rec.skill}</span>
                </div>
                <button
                  onClick={() => navigate('/projects')}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
