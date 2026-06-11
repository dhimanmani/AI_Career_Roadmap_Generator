import React, { useState, useMemo } from 'react';
import { skillInventory } from '../services/mockData';
import type { SkillItem } from '../services/mockData';
import { SkillCard } from '../components/SkillCard';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, ArrowRight, Layers } from 'lucide-react';

export const SkillInventory: React.FC = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<SkillItem[]>(skillInventory);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Handle self-assessment skill level click
  const handleLevelChange = (skillName: string, nextLevel: 'Beginner' | 'Intermediate' | 'Advanced') => {
    let nextScore = 30;
    if (nextLevel === 'Intermediate') nextScore = 65;
    if (nextLevel === 'Advanced') nextScore = 90;

    setSkills(prev => prev.map(item => {
      if (item.name === skillName) {
        return { ...item, level: nextLevel, score: nextScore };
      }
      return item;
    }));
  };

  const categories = ['All', 'Programming', 'Frameworks', 'Databases', 'Cloud', 'AI/ML', 'Soft Skills'];

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter(s => s.category === activeCategory);
  }, [skills, activeCategory]);

  // Aggregate Category averages for Radar Chart
  const radarChartData = useMemo(() => {
    const groups: Record<string, { total: number; count: number }> = {
      'Programming': { total: 0, count: 0 },
      'Frameworks': { total: 0, count: 0 },
      'Databases': { total: 0, count: 0 },
      'Cloud': { total: 0, count: 0 },
      'AI/ML': { total: 0, count: 0 },
      'Soft Skills': { total: 0, count: 0 }
    };

    skills.forEach(item => {
      if (groups[item.category]) {
        groups[item.category].total += item.score;
        groups[item.category].count += 1;
      }
    });

    return Object.keys(groups).map(key => ({
      subject: key,
      value: groups[key].count > 0 ? Math.round(groups[key].total / groups[key].count) : 0,
      fullMark: 100
    }));
  }, [skills]);

  // Overall average score
  const overallAvgScore = useMemo(() => {
    const total = skills.reduce((sum, item) => sum + item.score, 0);
    return Math.round(total / skills.length);
  }, [skills]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Skill Assessment & Inventory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Rate your technical proficiency levels. The AI model utilizes this grid to discover your knowledge gaps.</p>
        </div>
        <button
          onClick={() => navigate('/gap-analysis')}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg shadow-md shadow-primary/10 flex items-center gap-1.5 transition-colors"
        >
          View Gap Analysis <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Radar & Score Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart Visual */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Competency Framework</h3>
            <p className="text-[10px] text-slate-405 dark:text-slate-400 mt-0.5">Average proficiency metrics across engineering domains</p>
          </div>
          <div className="w-full h-60 my-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarChartData}>
                <PolarGrid stroke="#E2E8F0" className="dark:stroke-slate-800" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" fontSize={8} />
                <Radar name="My Score" dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full pt-3 border-t border-slate-100 dark:border-slate-805/50 flex justify-around text-xs">
            <div>
              <span className="text-slate-400 block">Overall Skill Rating</span>
              <strong className="text-primary text-base font-extrabold">{overallAvgScore} / 100</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Assessed Skills</span>
              <strong className="text-slate-705 dark:text-white text-base font-extrabold">{skills.length}</strong>
            </div>
          </div>
        </div>

        {/* Assessment list panel */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-primary" /> Self-Assessment Grid
            </h3>
            <span className="text-[10px] text-slate-400">Click levels to rate yourself</span>
          </div>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Assessment Table List */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {filteredSkills.map((item) => (
              <div 
                key={item.name} 
                className="p-3 rounded-lg border border-slate-100 dark:border-slate-850 bg-slate-50/20 dark:bg-slate-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-semibold text-slate-805 dark:text-white">{item.name}</h4>
                  <span className="text-[9px] text-slate-400 dark:text-slate-550 uppercase font-semibold">{item.category}</span>
                </div>

                {/* Rating options */}
                <div className="flex items-center gap-1 text-[10px] font-semibold">
                  {[
                    { id: 'Beginner', val: 30 },
                    { id: 'Intermediate', val: 65 },
                    { id: 'Advanced', val: 90 }
                  ].map((levelItem) => {
                    const isSelected = item.level === levelItem.id;
                    const badgeStyles = {
                      Beginner: isSelected 
                        ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350 border-slate-300' 
                        : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-600',
                      Intermediate: isSelected 
                        ? 'bg-blue-150 text-blue-700 dark:bg-blue-950/45 dark:text-blue-450 border-blue-400/30' 
                        : 'text-slate-400 hover:bg-blue-50/50 hover:text-blue-600 dark:hover:bg-blue-955/20',
                      Advanced: isSelected 
                        ? 'bg-purple-150 text-purple-700 dark:bg-purple-950/45 dark:text-purple-450 border-purple-400/30' 
                        : 'text-slate-400 hover:bg-purple-50/50 hover:text-purple-600 dark:hover:bg-purple-955/20'
                    };
                    
                    return (
                      <button
                        key={levelItem.id}
                        type="button"
                        onClick={() => handleLevelChange(item.name, levelItem.id as SkillItem['level'])}
                        className={`px-2.5 py-1 border border-transparent rounded transition-all ${
                          badgeStyles[levelItem.id as keyof typeof badgeStyles]
                        }`}
                      >
                        {levelItem.id}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Skill Cards */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
          <Layers className="w-4.5 h-4.5 text-secondary" /> Active Skills Ledger ({filteredSkills.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSkills.map((item) => (
            <SkillCard key={item.name} skill={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
