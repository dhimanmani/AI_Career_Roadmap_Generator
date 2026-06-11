import React, { useState } from 'react';
import { sampleRoadmap } from '../services/mockData';
import type { RoadmapMilestone } from '../services/mockData';
import { TimelineComponent } from '../components/TimelineComponent';
import { RoadmapCard } from '../components/RoadmapCard';
import { Modal } from '../components/Modal';
import { 
  Sparkles, FileDown, RotateCw, LayoutGrid, ListTodo, 
  Milestone, PlayCircle, BookOpen, Clock, Loader2, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RoadmapBuilder: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<RoadmapMilestone[]>(sampleRoadmap);
  const [view, setView] = useState<'timeline' | 'kanban' | 'checklist'>('timeline');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeDetails, setActiveDetails] = useState<RoadmapMilestone | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Update status (Completed, In Progress, Not Started)
  const handleStatusChange = (id: string, nextStatus: 'Not Started' | 'In Progress' | 'Completed') => {
    setRoadmaps(prev => prev.map(m => {
      if (m.id === id) return { ...m, status: nextStatus };
      return m;
    }));
  };

  // Regenerate simulated call
  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      // Mock update status back to defaults
      setRoadmaps(sampleRoadmap.map(m => ({
        ...m,
        status: m.id === 'm1' || m.id === 'm2' ? 'Completed' : m.id === 'm3' ? 'In Progress' : 'Not Started'
      })));
    }, 2000);
  };

  // Export PDF simulated call
  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 1500);
  };

  // Kanban groupings
  const kanbanColumns = [
    { title: "Not Started", status: "Not Started", color: "bg-slate-500/10 text-slate-550 border-slate-200" },
    { title: "In Progress", status: "In Progress", color: "bg-primary/10 text-primary border-primary/20" },
    { title: "Completed", status: "Completed", color: "bg-success/10 text-success border-success/20" }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header controls bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI-Generated Learning Roadmap</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Personalized sequence tailored for placement drives starting August.</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex-1 sm:flex-initial px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-350 transition-colors flex items-center justify-center gap-1.5"
          >
            {isRegenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RotateCw className="w-3.5 h-3.5" />
            )}
            Regenerate
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex-1 sm:flex-initial px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-darkBg font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
            Export PDF
          </button>
        </div>
      </div>

      {/* View Selectors */}
      <div className="flex justify-between items-center bg-white dark:bg-darkBg-card p-2 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex gap-1">
          <button
            onClick={() => setView('timeline')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              view === 'timeline'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Milestone className="w-4 h-4" /> Timeline View
          </button>
          <button
            onClick={() => setView('kanban')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              view === 'kanban'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Kanban Board
          </button>
          <button
            onClick={() => setView('checklist')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              view === 'checklist'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <ListTodo className="w-4 h-4" /> Milestone Checklist
          </button>
        </div>
        
        <div className="hidden md:flex items-center gap-1.5 px-3 text-xs text-slate-400 dark:text-slate-550">
          <Sparkles className="w-4.5 h-4.5 text-primary animate-pulse" />
          <span>Curriculum generated instantly using ACRG core model</span>
        </div>
      </div>

      {/* Main Views Container */}
      <div className="min-h-[450px]">
        {isRegenerating ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-xs text-slate-500 animate-pulse">Analyzing profiles & recalculating gaps...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* 1. Timeline View */}
            {view === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-darkBg-card p-6 md:p-8 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <TimelineComponent
                  milestones={roadmaps}
                  onStatusChange={handleStatusChange}
                  onViewDetails={setActiveDetails}
                />
              </motion.div>
            )}

            {/* 2. Kanban View */}
            {view === 'kanban' && (
              <motion.div
                key="kanban"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {kanbanColumns.map((col) => {
                  const colMilestones = roadmaps.filter(m => m.status === col.status);
                  
                  return (
                    <div key={col.status} className="flex flex-col space-y-4 min-h-[400px]">
                      <div className={`px-4 py-2 border rounded-xl font-bold text-xs flex justify-between items-center ${col.color}`}>
                        <span>{col.title}</span>
                        <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border text-[10px]">{colMilestones.length}</span>
                      </div>
                      
                      <div className="space-y-4 overflow-y-auto flex-1 max-h-[70vh] pr-1">
                        {colMilestones.length > 0 ? (
                          colMilestones.map((m) => (
                            <RoadmapCard
                              key={m.id}
                              milestone={m}
                              onStatusChange={handleStatusChange}
                              onViewDetails={setActiveDetails}
                            />
                          ))
                        ) : (
                          <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl py-12 text-center text-xs text-slate-400">
                            No milestones here
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* 3. Checklist View */}
            {view === 'checklist' && (
              <motion.div
                key="checklist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-darkBg-card border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800"
              >
                {roadmaps.map((m) => (
                  <div key={m.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleStatusChange(m.id, m.status === 'Completed' ? 'Not Started' : 'Completed')}
                        className="p-1 rounded text-slate-400 hover:text-primary transition-colors"
                      >
                        {m.status === 'Completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700" />
                        )}
                      </button>
                      <div>
                        <h4 className={`font-semibold ${m.status === 'Completed' ? 'line-through text-slate-455' : 'text-slate-805 dark:text-white'}`}>
                          {m.skillName}
                        </h4>
                        <p className="text-[10px] text-slate-405 dark:text-slate-500">Phase {m.phase} &bull; {m.duration}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setActiveDetails(m)}
                      className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-semibold"
                    >
                      Resources
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={!!activeDetails}
        onClose={() => setActiveDetails(null)}
        title={activeDetails?.skillName || ''}
        footer={
          <button
            onClick={() => setActiveDetails(null)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold"
          >
            Close Details
          </button>
        }
      >
        {activeDetails && (
          <div className="space-y-5">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{activeDetails.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-xs py-3 border-y border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-4 h-4 text-primary" />
                <span>Duration: <strong className="text-slate-700 dark:text-slate-300">{activeDetails.duration}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Milestone className="w-4 h-4 text-secondary" />
                <span>Difficulty: <strong className="text-slate-700 dark:text-slate-300">{activeDetails.difficulty}</strong></span>
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase text-slate-400">Complete list of resources</h4>
              <div className="space-y-2">
                {activeDetails.resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      {res.type === 'Video' ? (
                        <PlayCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-blue-500" />
                      )}
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block">{res.title}</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider">{res.type} reference</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-primary font-bold hover:underline">Link &rarr;</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
