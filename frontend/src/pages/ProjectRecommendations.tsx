import React, { useState, useMemo } from 'react';
import { projectRecommendations } from '../services/mockData';
import { Clock, Star, Plus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectRecommendations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [addedProjects, setAddedProjects] = useState<string[]>([]);

  const categories = ['All', 'Web Development', 'AI', 'Data Science', 'Cloud', 'Cybersecurity'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Handle adding project to user's roadmap
  const handleAddProject = (id: string) => {
    if (addedProjects.includes(id)) {
      setAddedProjects(prev => prev.filter(pId => pId !== id));
    } else {
      setAddedProjects(prev => [...prev, id]);
    }
  };

  // Filter recommendations
  const filteredProjects = useMemo(() => {
    return projectRecommendations.filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchDiff = activeDifficulty === 'All' || item.difficulty === activeDifficulty;
      return matchCat && matchDiff;
    });
  }, [activeCategory, activeDifficulty]);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Advanced':
        return 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20';
      case 'Intermediate':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20';
      case 'Beginner':
      default:
        return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI Portfolio Project Recommendations</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Complete these custom projects to reinforce your learning curriculum and boost resume scores.</p>
      </div>

      {/* Filter Options */}
      <div className="glass-panel p-5 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
        {/* Category Filters */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-550 block">Domain Categories</span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filters */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-550 block">Difficulty level</span>
          <div className="flex flex-wrap gap-1.5">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                  activeDifficulty === diff
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((proj) => {
            const isAdded = addedProjects.includes(proj.id);
            
            return (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between border border-slate-200 dark:border-slate-800"
              >
                <div>
                  {/* Category and Difficulty */}
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <span className="text-[9px] font-bold text-primary uppercase tracking-wider">{proj.category}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-semibold rounded ${getDifficultyColor(proj.difficulty)}`}>
                      {proj.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight mb-2">{proj.title}</h3>
                  
                  {/* Description */}
                  <p className="text-xs text-slate-500 dark:text-slate-405 leading-relaxed mb-4 line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Meta Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-slate-100 dark:border-slate-800/60 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Duration</span>
                      <strong className="text-slate-700 dark:text-slate-300 font-bold">{proj.duration}</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-current" /> Popularity</span>
                      <strong className="text-slate-705 dark:text-slate-300 font-bold">{proj.popularity}% rate</strong>
                    </div>
                  </div>

                  {/* Skills Covered */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] font-semibold uppercase text-slate-400 block">Skills Practiced</span>
                    <div className="flex flex-wrap gap-1">
                      {proj.skillsCovered.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[9px] rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-655 dark:text-slate-400">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handleAddProject(proj.id)}
                  className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    isAdded
                      ? 'bg-success text-white hover:bg-success-dark'
                      : 'bg-slate-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Added to Roadmap
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Add to Phase 3
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
