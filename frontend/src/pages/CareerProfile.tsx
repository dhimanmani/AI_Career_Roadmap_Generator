import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  User, Briefcase, Heart, BookOpen, ChevronRight, 
  ChevronLeft, Save, Sparkles, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CareerProfile: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saveDrafting, setSaveDrafting] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: {
      name: 'Alex Rivera',
      age: 21,
      education: 'B.Tech in Computer Science & Engineering',
      university: 'Metropolitan Institute of Technology',
      graduationYear: 2027,
      experience: 'Frontend Web Developer Intern at PixelCraft Solutions (3 months)',
      certifications: 'AWS Certified Cloud Practitioner, Google Data Analytics Professional Certificate',
      projects: 'E-Commerce Frontend React App, Personal Portfolio Site',
      interests: ['web-dev', 'ai'],
      learningStyle: 'hands-on'
    }
  });

  const nextStep = async () => {
    // Validate inputs for specific step before moving forward
    const fieldsToValidate = step === 1
      ? (['name', 'age', 'education', 'university', 'graduationYear'] as const)
      : [];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = () => {
    setSaveDrafting(true);
    setTimeout(() => {
      setSaveDrafting(false);
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    }, 1000);
  };

  const onSubmit = () => {
    navigate('/goals');
  };

  const stepsInfo = [
    { title: "Personal Details", icon: User },
    { title: "Experience", icon: Briefcase },
    { title: "Interests", icon: Heart },
    { title: "Learning Style", icon: BookOpen }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Configure Career Profile</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">Provide details to generate the most accurate AI learning path</p>
        </div>
        <button
          onClick={handleSaveDraft}
          disabled={saveDrafting}
          className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-350 transition-colors flex items-center gap-1.5"
        >
          {saveDrafting ? 'Saving...' : draftSaved ? <><CheckCircle2 className="w-3.5 h-3.5 text-success" /> Saved</> : <><Save className="w-3.5 h-3.5" /> Save Draft</>}
        </button>
      </div>

      {/* Step Indicators */}
      <div className="glass-panel p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 grid grid-cols-4 gap-2">
        {stepsInfo.map((s, idx) => {
          const stepNum = idx + 1;
          const isActive = step === stepNum;
          const isCompleted = step > stepNum;
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                isActive 
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105' 
                  : isCompleted 
                    ? 'bg-success/10 text-success border-success/30' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}>
                <s.icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] hidden sm:inline font-semibold ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80">
        <AnimatePresence mode="wait">
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Step 1: Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Full Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                  />
                  {errors.name && <span className="text-[10px] text-rose-500">{errors.name.message}</span>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Age</label>
                  <input
                    type="number"
                    {...register('age', { required: 'Age is required', min: 16 })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                  />
                  {errors.age && <span className="text-[10px] text-rose-500">{errors.age.message}</span>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Education Major</label>
                <input
                  type="text"
                  {...register('education', { required: 'Education major is required' })}
                  placeholder="e.g. B.Tech in Computer Science"
                  className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">University / College</label>
                  <input
                    type="text"
                    {...register('university', { required: 'University is required' })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Graduation Year</label>
                  <input
                    type="number"
                    {...register('graduationYear', { required: 'Graduation Year is required' })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Experience */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" /> Step 2: Experience & Qualifications
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Internships / Work History</label>
                <textarea
                  {...register('experience')}
                  placeholder="Describe any previous internships or jobs. E.g. Frontend developer intern at ABC Tech (3 months)"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Certifications Earned</label>
                <textarea
                  {...register('certifications')}
                  placeholder="AWS Cloud Practitioner, GCP Architect, CCNA etc."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed Projects</label>
                <textarea
                  {...register('projects')}
                  placeholder="E.g. Chat application using websockets, Personal blog site, E-commerce dashboard."
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: Interests */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" /> Step 3: Technical Interests
              </h3>
              <p className="text-[11px] text-slate-450 dark:text-slate-400">Select domains you find most appealing for career research</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'ai', label: 'Artificial Intelligence & ML' },
                  { id: 'web-dev', label: 'Web Development' },
                  { id: 'data-science', label: 'Data Science' },
                  { id: 'cloud', label: 'Cloud Architecture' },
                  { id: 'cybersecurity', label: 'Cybersecurity' }
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-350"
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      {...register('interests')}
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: Preferred Learning Style */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Step 4: Preferred Learning Style
              </h3>
              <p className="text-[11px] text-slate-450 dark:text-slate-400">We'll customize your suggested materials based on your style</p>

              <div className="space-y-3 pt-2">
                {[
                  { id: 'visual', label: 'Visual Learning', desc: 'Prefer watching video tutorials, interactive graphics, and structured diagrams.' },
                  { id: 'hands-on', label: 'Hands-on Coding', desc: 'Learn best by building projects, solving challenges, and writing code immediately.' },
                  { id: 'theoretical', label: 'Theoretical / Book-based', desc: 'Prefer reading thorough books, technical articles, and official documentation.' },
                  { id: 'self-paced', label: 'Self-paced / Cohort', desc: 'Mix of guided bootcamps, community discussions, and structured quizzes.' }
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer text-left"
                  >
                    <input
                      type="radio"
                      value={item.id}
                      {...register('learningStyle')}
                      className="w-4 h-4 text-primary mt-0.5 focus:ring-primary border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-855 dark:text-slate-200">{item.label}</h4>
                      <p className="text-[10px] text-slate-405 dark:text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-6 pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 disabled:opacity-40 rounded-lg text-xs font-semibold flex items-center gap-1 dark:text-slate-350 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              Save & Analyze Goal <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
