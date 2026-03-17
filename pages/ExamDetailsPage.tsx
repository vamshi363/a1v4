import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { exams } from '../data/exams';
import { 
  ArrowLeft, ExternalLink, Calendar, CheckCircle2, School, 
  BookOpen, Clock, AlertCircle, ChevronDown, ChevronUp, 
  Youtube, Heart, Share2, Wallet, Users, Globe, FileText, Zap,
  Timer, Award, Download, BellRing, BarChart3, MapPin, ArrowRight,
  HelpCircle, BrainCircuit, Sparkles, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExamDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const exam = exams.find(e => e.id === id);
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'colleges'>('overview');

  // Load Saved State
  useEffect(() => {
    if (id) {
      const saved = JSON.parse(localStorage.getItem('tsap_saved_exams') || '[]');
      setIsSaved(saved.includes(id));
    }
  }, [id]);

  const toggleSave = () => {
    if (!id) return;
    const saved = JSON.parse(localStorage.getItem('tsap_saved_exams') || '[]');
    let newSaved;
    if (saved.includes(id)) {
      newSaved = saved.filter((s: string) => s !== id);
      setIsSaved(false);
    } else {
      newSaved = [...saved, id];
      setIsSaved(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
    localStorage.setItem('tsap_saved_exams', JSON.stringify(newSaved));
  };

  if (!exam) return <div className="p-20 text-center font-bold text-xl">Exam not found</div>;

  // Helper to calculate days left
  const getDaysLeft = () => {
    if (!exam.applicationEnd) return null;
    const end = new Date(exam.applicationEnd);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };
  const daysLeft = getDaysLeft();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 selection:bg-primary-teal/20">
      
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            className="fixed top-20 left-0 right-0 mx-auto w-max z-50 bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-full shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-primary-teal" />
            Added to Watchlist
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 1. IMMERSIVE HERO SECTION --- */}
      <div className="relative bg-slate-900 text-white overflow-hidden rounded-b-[2.5rem] shadow-2xl">
         {/* Background Patterns */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
         
         <div className="relative z-10 px-4 pt-4 pb-8 max-w-3xl mx-auto">
            {/* Top Nav */}
            <div className="flex justify-between items-center mb-8">
               <Link to="/exams" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
                  <ArrowLeft size={20} className="text-white" />
               </Link>
               <div className="flex gap-3">
                  <button onClick={toggleSave} className={`p-2 rounded-full transition-colors backdrop-blur-md ${isSaved ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                     <Heart size={20} className={isSaved ? "fill-current" : ""} />
                  </button>
                  <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md text-white">
                     <Share2 size={20} />
                  </button>
               </div>
            </div>

            {/* Exam Identity */}
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
               <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center text-slate-900 font-black text-3xl shadow-lg shrink-0">
                  {exam.name.charAt(0)}
               </div>
               <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                     <span className="px-3 py-1 rounded-full bg-primary-teal text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {exam.level} Level
                     </span>
                     <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-[10px] font-bold uppercase tracking-widest">
                        {exam.category}
                     </span>
                     {daysLeft !== null && daysLeft > 0 && daysLeft <= 15 && (
                        <span className="px-3 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest animate-pulse">
                           Closes in {daysLeft} Days
                        </span>
                     )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2">{exam.name}</h1>
                  <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed max-w-xl opacity-90">
                     {exam.fullName}
                  </p>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-20">
         
         {/* --- 2. KEY STATS GRID --- */}
         <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="flex flex-col items-center text-center border-r border-slate-100 dark:border-slate-800 last:border-0">
               <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">Difficulty</span>
               <span className={`text-sm font-black px-2 py-0.5 rounded ${exam.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : exam.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                  {exam.difficulty}
               </span>
            </div>
            <div className="flex flex-col items-center text-center border-r border-slate-100 dark:border-slate-800 last:border-0">
               <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">Frequency</span>
               <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{exam.frequency}</span>
            </div>
            <div className="flex flex-col items-center text-center border-r border-slate-100 dark:border-slate-800 last:border-0">
               <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">Mode</span>
               <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Online (CBT)</span>
            </div>
            <div className="flex flex-col items-center text-center">
               <span className="text-[10px] font-bold uppercase text-slate-400 mb-1">Avg Fee</span>
               <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{exam.feeRange}</span>
            </div>
         </div>

         {/* --- 3. TIMELINE & SCHEDULE --- */}
         <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
               <Calendar className="text-primary-teal" size={20} />
               <h2 className="text-lg font-black text-slate-900 dark:text-white">Exam Schedule</h2>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden">
               {/* Vertical Line */}
               <div className="absolute left-9 top-6 bottom-6 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
               
               <div className="space-y-8 relative z-10">
                  {/* Event 1: Application */}
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 border border-blue-100 dark:border-blue-800 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                        1
                     </div>
                     <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Application Deadline</h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">Last date to submit form online.</p>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg">
                           <Clock size={12} /> {exam.applicationEnd ? new Date(exam.applicationEnd).toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'}) : 'Not Announced'}
                        </div>
                     </div>
                  </div>

                  {/* Event 2: Exam Date */}
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-secondary-purple/10 text-secondary-purple border border-purple-100 dark:border-purple-900/50 flex items-center justify-center font-bold text-xs shrink-0 z-10">
                        2
                     </div>
                     <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Exam Date</h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">Tentative schedule for the test.</p>
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-lg">
                           <Calendar size={12} /> {exam.date}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* --- 4. EXAM PATTERN & DETAILS --- */}
         <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
               <FileText className="text-primary-teal" size={20} />
               <h2 className="text-lg font-black text-slate-900 dark:text-white">Exam Pattern</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Pattern Card */}
               <div className="bg-slate-50 dark:bg-slate-900 rounded-[1.5rem] p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-4 mb-4">
                     <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-orange-500">
                        <Timer size={24} />
                     </div>
                     <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">Structure</div>
                        <div className="font-medium text-sm mt-1 leading-snug">{exam.pattern}</div>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     <span className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[10px] font-bold text-slate-600 dark:text-slate-400">MCQ Format</span>
                     <span className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[10px] font-bold text-slate-600 dark:text-slate-400">Computer Based</span>
                  </div>
               </div>

               {/* Eligibility Card */}
               <div className="bg-slate-50 dark:bg-slate-900 rounded-[1.5rem] p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                     <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-blue-500">
                        <Users size={24} />
                     </div>
                     <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">Who Can Apply?</div>
                        <div className="font-medium text-sm mt-1 leading-snug">{exam.eligibility}</div>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                     <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <Globe size={12} />
                        <span>Languages: {exam.languages.join(', ')}</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* --- 5. PREPARATION TOOLKIT (IMPROVED) --- */}
         <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                  <Zap className="text-primary-teal" size={20} />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Preparation Toolkit</h2>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                  High Yield
               </span>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden border border-slate-700">
               
               {/* Strategy Text */}
               <div className="relative z-10 mb-8">
                  <div className="flex items-start gap-3">
                     <div className="p-2 bg-primary-teal/20 rounded-lg text-primary-teal">
                        <Sparkles size={18} />
                     </div>
                     <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Expert Strategy</h3>
                        <p className="text-sm font-medium leading-relaxed text-slate-100">
                           {exam.prepTips}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Action Grid */}
               <div className="grid grid-cols-2 gap-3 relative z-10 mb-6">
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(exam.name + ' syllabus pdf ' + new Date().getFullYear())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
                  >
                     <Download size={20} className="text-slate-300 group-hover:text-primary-teal transition-colors" />
                     <span className="text-xs font-bold text-slate-300">Syllabus</span>
                  </a>
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(exam.name + ' previous year question papers pdf')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
                  >
                     <FileText size={20} className="text-slate-300 group-hover:text-primary-teal transition-colors" />
                     <span className="text-xs font-bold text-slate-300">PYQ Papers</span>
                  </a>
                  <a 
                     href={`https://www.google.com/search?q=${encodeURIComponent(exam.name + ' free mock test online')}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
                  >
                     <Timer size={20} className="text-slate-300 group-hover:text-primary-teal transition-colors" />
                     <span className="text-xs font-bold text-slate-300">Mock Tests</span>
                  </a>
                  <Link 
                     to="/help"
                     className="flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br from-primary-teal/20 to-primary-teal/5 hover:from-primary-teal/30 hover:to-primary-teal/10 border border-primary-teal/20 rounded-2xl transition-all group"
                  >
                     <BrainCircuit size={20} className="text-primary-teal" />
                     <span className="text-xs font-bold text-primary-teal">AI Study Plan</span>
                  </Link>
               </div>

               {/* Bottom Note */}
               <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Powered by AI Analysis</span>
                  <Link to="/help" className="text-xs font-bold text-white hover:text-primary-teal flex items-center gap-1 transition-colors">
                     Ask a doubt <ChevronRight size={12} />
                  </Link>
               </div>

               {/* Background Decorative */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal rounded-full blur-[80px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary-purple rounded-full blur-[60px] opacity-10 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            </div>
         </section>

         {/* --- 6. ACCEPTING COLLEGES --- */}
         <section className="mb-24">
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-2">
                  <School className="text-primary-teal" size={20} />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Top Accepting Colleges</h2>
               </div>
               <Link to={`/universities?q=${encodeURIComponent(exam.name)}`} className="text-xs font-bold text-primary-teal hover:underline flex items-center">
                  View All <ArrowRight size={12} className="ml-1" />
               </Link>
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
               {exam.colleges.map((college, idx) => (
                  <div key={idx} className="min-w-[220px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary-teal transition-colors">
                     <div>
                        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 font-black text-sm mb-3">
                           {college.charAt(0)}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1 line-clamp-2">{college}</h4>
                        <div className="flex items-center text-xs text-slate-500">
                           <MapPin size={10} className="mr-1" /> Location varies
                        </div>
                     </div>
                     <Link to={`/universities?q=${encodeURIComponent(college)}`} className="mt-4 text-xs font-bold text-primary-teal flex items-center">
                        View Details <ArrowRight size={10} className="ml-1" />
                     </Link>
                  </div>
               ))}
               <Link to={`/universities?q=${encodeURIComponent(exam.name)}`} className="min-w-[100px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary-teal hover:border-primary-teal transition-colors group">
                  <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                     <ArrowRight size={16} />
                  </div>
                  <span className="text-[10px] font-bold">See All</span>
               </Link>
            </div>
         </section>

      </div>

      {/* --- 7. STICKY ACTION BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 z-40 safe-pb shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <div className="max-w-3xl mx-auto flex gap-3">
            <a 
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exam.name + ' exam preparation')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3.5 rounded-2xl transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
            >
               <Youtube size={18} className="text-red-600" />
               <span className="text-sm">Video Guide</span>
            </a>
            <a 
              href={exam.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-[2] flex items-center justify-center gap-2 bg-primary-teal hover:bg-teal-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-primary-teal/20 active:scale-95 transition-transform"
            >
              <span className="text-sm">Apply on Official Website</span>
              <ExternalLink size={16} />
            </a>
         </div>
      </div>
    </div>
  );
};

export default ExamDetailsPage;