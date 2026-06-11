import React, { useState } from 'react';
import type { CareerGoal } from '../services/mockData';
import { careerGoals } from '../services/mockData';
import { CareerCard } from '../components/CareerCard';
import { Modal } from '../components/Modal';
import { Drawer } from '../components/Drawer';
import { useNavigate } from 'react-router-dom';
import { Target, Scale, Award, Info, Sparkles, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';

export const GoalSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGoalId, setSelectedGoalId] = useState<string>('full-stack');
  const [detailGoal, setDetailGoal] = useState<CareerGoal | null>(null);
  const [compareList, setCompareList] = useState<CareerGoal[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleSelectGoal = (id: string) => {
    setSelectedGoalId(id);
  };

  const handleViewDetails = (career: CareerGoal) => {
    setDetailGoal(career);
  };

  const handleAddToCompare = (career: CareerGoal) => {
    if (compareList.find((c) => c.id === career.id)) {
      setCompareList(prev => prev.filter((c) => c.id !== career.id));
    } else {
      if (compareList.length >= 2) {
        // Limit to 2 for side-by-side comparison
        setCompareList([compareList[1], career]);
      } else {
        setCompareList(prev => [...prev, career]);
      }
    }
  };

  const startComparison = () => {
    if (compareList.length < 2) return;
    setIsCompareOpen(true);
  };

  const handleConfirmGoal = () => {
    // Save selection and proceed to skills assessment
    navigate('/skills');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Choose Your Target Career Goal</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Select the target career you are aiming for. ACRG will analyze your gaps relative to this standard.</p>
        </div>
        
        {compareList.length >= 2 && (
          <button
            onClick={startComparison}
            className="px-4 py-2 border border-primary/30 text-primary dark:text-primary-light hover:bg-primary/5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-4 h-4" /> Compare Selected ({compareList.length})
          </button>
        )}
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerGoals.map((career) => (
          <CareerCard
            key={career.id}
            career={career}
            isSelected={selectedGoalId === career.id}
            onSelect={handleSelectGoal}
            onCompare={handleAddToCompare}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Selection Confirmation Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/80 dark:bg-darkBg-card/85 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-20 shadow-lg flex items-center justify-between max-w-7xl mx-auto rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Active Selection</p>
            <h4 className="text-sm font-bold text-slate-805 dark:text-white">
              {careerGoals.find(c => c.id === selectedGoalId)?.title || 'None Selected'}
            </h4>
          </div>
        </div>
        <button
          onClick={handleConfirmGoal}
          className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 transition-all"
        >
          Confirm & Analyze Skills <ChevronRight className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Compare Careers Modal */}
      <Modal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        title="Career Track Comparison"
        size="lg"
        footer={
          <button
            onClick={() => setIsCompareOpen(false)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold"
          >
            Close Comparison
          </button>
        }
      >
        {compareList.length >= 2 && (
          <div className="grid grid-cols-2 gap-6 divide-x divide-slate-150 dark:divide-slate-800">
            {compareList.slice(0, 2).map((item, idx) => (
              <div key={item.id} className={`${idx === 1 ? 'pl-6' : ''} space-y-4`}>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{item.demand} Demand</span>
                  <h4 className="font-extrabold text-base text-slate-905 dark:text-white">{item.title}</h4>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>

                <div className="space-y-3 py-3 border-y border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> Salary Range</span>
                    <span className="font-semibold text-slate-705 dark:text-slate-300">{item.salary}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Job Growth</span>
                    <span className="font-semibold text-success dark:text-success-light">{item.growth}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Required Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.requiredSkills.map((sk, skIdx) => (
                      <span key={skIdx} className="px-2 py-0.5 text-[9px] rounded bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-655 dark:text-slate-400">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Details Side Drawer */}
      <Drawer
        isOpen={!!detailGoal}
        onClose={() => setDetailGoal(null)}
        title={detailGoal?.title || ''}
        footer={
          <div className="flex gap-2 w-full">
            <button
              onClick={() => {
                if (detailGoal) handleSelectGoal(detailGoal.id);
                setDetailGoal(null);
              }}
              className="flex-1 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-bold transition-colors"
            >
              Select as Target Goal
            </button>
            <button
              onClick={() => setDetailGoal(null)}
              className="py-2 px-4 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-50 rounded-lg text-xs font-semibold"
            >
              Close
            </button>
          </div>
        }
      >
        {detailGoal && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs bg-primary/10 text-primary dark:bg-primary/20 px-2 py-0.5 rounded font-semibold">
                {detailGoal.demand} Placement Demand
              </span>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-2">About the Role</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{detailGoal.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-primary" /> Market Statistics
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-505 block">Avg Annual Salary</span>
                  <strong className="text-slate-700 dark:text-slate-300 font-bold">{detailGoal.salary}</strong>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-505 block">Job Growth Rate</span>
                  <strong className="text-success dark:text-success-light font-bold">{detailGoal.growth}</strong>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-secondary" /> Core Competencies You Will Build
              </h4>
              <ul className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {detailGoal.requiredSkills.map((sk, idx) => (
                  <li key={idx} className="py-2.5 flex items-center gap-2 text-slate-650 dark:text-slate-350">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {sk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
