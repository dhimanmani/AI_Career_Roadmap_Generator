import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Target, ClipboardList, Map, Award, 
  Users, ChevronDown, BookOpen, Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    { title: "Career Profiling", desc: "Build a multi-dimensional profile covering your college major, current skills, projects, and goals.", icon: Target, color: "text-blue-500 bg-blue-550/10" },
    { title: "Skill Gap Analysis", desc: "Compare your current skills with industry standards for your target role to identify key gaps.", icon: ClipboardList, color: "text-purple-500 bg-purple-550/10" },
    { title: "AI Roadmap Generation", desc: "Our machine learning model builds a custom sequential roadmap from foundations to interviews.", icon: Map, color: "text-emerald-500 bg-emerald-550/10" },
    { title: "Progress Tracking", desc: "Track milestones, update tasks, monitor weekly learning hours, and earn badges as you learn.", icon: Award, color: "text-amber-500 bg-amber-550/10" },
    { title: "Mentor Guidance", desc: "Get your roadmaps reviewed by real professors and industry advisors to ensure correctness.", icon: Users, color: "text-pink-500 bg-pink-550/10" },
    { title: "Project Recommendations", desc: "Get customized portfolio projects that directly cover your missing skills and boost resumes.", icon: BookOpen, color: "text-indigo-500 bg-indigo-550/10" }
  ];

  const steps = [
    { title: "Build Profile", desc: "Input your education, experience, interests, and current skills inventory.", date: "Step 1" },
    { title: "Set Career Goal", desc: "Select from key engineering tracks like AI, Software Eng, or Cloud Architect.", date: "Step 2" },
    { title: "AI Skill-Gap Check", desc: "ACRG instantly evaluates what you lack and highlights key focus areas.", date: "Step 3" },
    { title: "Generate & Follow", desc: "Review your detailed milestones, complete recommended projects, and submit to mentors.", date: "Step 4" }
  ];

  const testimonials = [
    { quote: "ACRG transformed my final year placement preparation. The AI recommended SQL projects that got me my first job at a fintech firm.", name: "Siddharth Verma", role: "Software Engineer at Stripe", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120" },
    { quote: "The mentor review aspect is outstanding. Having my AWS learning roadmap verified by a senior architect gave me immense confidence.", name: "Meera Nair", role: "Cloud Intern at Accenture", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120" }
  ];

  const faqs = [
    { q: "How does the AI generate my roadmap?", a: "Our recommendation engine matches your current skills score and preferences against real-world job requirements, creating a tailored, phase-by-phase sequencing of core concepts, books, and courses." },
    { q: "Can I get my roadmap reviewed by a teacher?", a: "Yes! The platform includes a Mentor portal. Once you generate a roadmap, you can submit it to registered professors or placement advisors for feedback and ratings." },
    { q: "Is the progress tracking customizable?", a: "Absolutely. You can mark milestones as 'In Progress' or 'Completed', add custom resources, change target deadlines, and export your roadmap to PDF anytime." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-darkBg dark:text-slate-100 transition-colors duration-200">
      {/* Navbar overlay */}
      <nav className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-primary to-secondary text-white rounded-lg">
            <Rocket className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">ACRG</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login')} className="text-sm font-semibold hover:text-primary transition-colors">Sign In</button>
          <button onClick={() => navigate('/register')} className="px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary-dark text-white rounded-lg shadow-md shadow-primary/15 transition-all">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto grid-bg">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI Placement Prep
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white"
          >
            Build Your Career Roadmap with <span className="text-gradient">Artificial Intelligence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Stop relying on generic tutorials. ACRG analyzes your skills, maps your gaps, and creates a high-fidelity learning path approved by mentors.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button onClick={() => navigate('/register')} className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 font-bold group transition-all">
              Build Your Roadmap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/login')} className="px-8 py-4 bg-white hover:bg-slate-50 dark:bg-darkBg-card dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-bold transition-colors">
              Explore Features
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 bg-white dark:bg-darkBg-card border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h4 className="text-3xl font-extrabold text-primary">98%</h4>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Placement Rate</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-extrabold text-secondary">15k+</h4>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Roadmaps Generated</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-extrabold text-emerald-500">4.9/5</h4>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Student Rating</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-3xl font-extrabold text-amber-500">250+</h4>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Industry Mentors</p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-950 dark:text-white">Structured Features for Your Growth</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Everything you need to level up and verify your skillset for top tech recruitments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feat.color}`}>
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Career growth timeline visualization */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/50 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white">How It Works</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your transition from student to hired engineer, simplified in 4 phases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:bg-slate-200 dark:before:bg-slate-850 before:hidden md:before:block">
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 glass-panel p-6 rounded-2xl bg-white dark:bg-darkBg-card space-y-4 text-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto font-bold text-sm">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-950 dark:text-white">Loved by Placement Officers & Students</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-2xl flex flex-col justify-between space-y-6">
              <p className="text-sm italic text-slate-650 dark:text-slate-300 leading-relaxed">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img src={test.image} alt={test.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{test.name}</h4>
                  <p className="text-xs text-slate-400">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200/50 dark:border-slate-800/50 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold text-center text-slate-950 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-darkBg-card overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between font-semibold text-slate-950 dark:text-white text-left text-sm"
                >
                  {faq.q}
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6 bg-white dark:bg-darkBg-card">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">ACRG</span>
            <p className="text-xs text-slate-400 leading-relaxed">Personalized AI Career Pathway Scaffolder & Assessment Dashboard for modern engineering students.</p>
          </div>
          <div>
            <h5 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Product</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-primary">Roadmap Builder</a></li>
              <li><a href="#" className="hover:text-primary">Gap Analysis</a></li>
              <li><a href="#" className="hover:text-primary">Mentor Portals</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Resources</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-primary">Docs & Guides</a></li>
              <li><a href="#" className="hover:text-primary">SQL Exercises</a></li>
              <li><a href="#" className="hover:text-primary">Placement Trends</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Legal</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 dark:border-slate-800/60 text-center text-xs text-slate-450 dark:text-slate-500">
          &copy; {new Date().getFullYear()} AI Career Roadmap Generator (ACRG). All rights reserved.
        </div>
      </footer>
    </div>
  );
};
