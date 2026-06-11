import React, { useState } from 'react';
import { mentorReviews } from '../services/mockData';
import type { MentorReviewItem } from '../services/mockData';
import { 
  MessageSquare, Star, CheckCircle2, 
  Send, RefreshCw 
} from 'lucide-react';
import { useForm } from 'react-hook-form';

export const MentorReview: React.FC = () => {
  const [reviews, setReviews] = useState<MentorReviewItem[]>(mentorReviews);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      mentorSelect: 'm01',
      studentNotes: ''
    }
  });

  const onSubmitReviewRequest = (data: { mentorSelect: string; studentNotes: string }) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      reset();
      
      // Simulate adding a pending review
      const newReview: MentorReviewItem = {
        id: `rev-${Date.now()}`,
        mentorName: data.mentorSelect === 'm01' ? 'Dr. Sarah Jenkins' : 'Prof. Marcus Vance',
        avatar: data.mentorSelect === 'm01' 
          ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' 
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: data.mentorSelect === 'm01' ? 'Senior Staff Engineer' : 'Placement Director',
        date: 'Just Now',
        rating: 0,
        status: 'Pending Review',
        feedbackText: 'Your roadmap has been submitted for review. The advisor will evaluate your timeline, skills score, and project completions shortly.',
        suggestions: []
      };
      
      setReviews(prev => [newReview, ...prev]);
      
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-100 text-emerald-750 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/50';
      case 'Requires Changes':
        return 'bg-rose-100 text-rose-750 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/50';
      case 'Pending Review':
      default:
        return 'bg-amber-100 text-amber-750 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
      {/* Left Column: Request Submission Form */}
      <div className="lg:col-span-4 space-y-6">
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <RefreshCw className="w-4.5 h-4.5 text-primary" /> Request Roadmap Review
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Submit your generated roadmap, skill scores, and projects to college placement advisors or industry mentors for advice.
          </p>

          <form onSubmit={handleSubmit(onSubmitReviewRequest)} className="space-y-4 pt-2">
            {/* Mentor Selection */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Select Mentor</label>
              <select
                {...register('mentorSelect')}
                className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
              >
                <option value="m01" className="dark:bg-darkBg-card">Dr. Sarah Jenkins (AI & Web)</option>
                <option value="m02" className="dark:bg-darkBg-card">Prof. Marcus Vance (Cloud & DevOps)</option>
              </select>
            </div>

            {/* Student Notes */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Notes / Focus Areas</label>
              <textarea
                {...register('studentNotes', { required: 'Please add details about your goals' })}
                placeholder="Mention any specific placement drives you are targeting, or parts of the roadmap you are unsure about..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-slate-250 dark:border-slate-700 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none resize-none"
              />
              {errors.studentNotes && <span className="text-[10px] text-rose-500">{errors.studentNotes.message}</span>}
            </div>

            {submitSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Request submitted successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg text-xs shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 transition-colors"
            >
              {submitting ? 'Sending Request...' : <><Send className="w-3.5 h-3.5" /> Submit for Review</>}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Feedback list history */}
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-panel p-6 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
            <MessageSquare className="w-4.5 h-4.5 text-secondary" /> Review History & Feedback
          </h3>

          <div className="space-y-6 pt-2 divide-y divide-slate-100 dark:divide-slate-800/80">
            {reviews.map((rev, idx) => (
              <div key={rev.id} className={`space-y-4 ${idx > 0 ? 'pt-6' : ''}`}>
                {/* Review Header metadata */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.mentorName} className="w-10 h-10 rounded-full object-cover border border-slate-200/60 dark:border-slate-700" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-905 dark:text-white">{rev.mentorName}</h4>
                      <p className="text-[9px] text-slate-400">{rev.role} &bull; {rev.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`px-2.5 py-0.5 text-[9px] font-bold border rounded-full ${getStatusBadge(rev.status)}`}>
                      {rev.status}
                    </span>
                    {rev.rating > 0 && (
                      <span className="text-[10px] font-semibold text-amber-500 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" /> {rev.rating} rating
                      </span>
                    )}
                  </div>
                </div>

                {/* Feedback content text */}
                <div className="p-4 rounded-xl bg-slate-50/40 dark:bg-slate-900/10 border border-slate-100 dark:border-slate-850 space-y-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Advisor Comments</span>
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed italic">
                    "{rev.feedbackText}"
                  </p>
                </div>

                {/* Suggestions bullets */}
                {rev.suggestions.length > 0 && (
                  <div className="space-y-2 pl-4">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block -ml-4">Suggestions Checklist</span>
                    <ul className="list-disc pl-4 text-xs text-slate-500 dark:text-slate-405 space-y-1.5">
                      {rev.suggestions.map((sug, sIdx) => (
                        <li key={sIdx}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
