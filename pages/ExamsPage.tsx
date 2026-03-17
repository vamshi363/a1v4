import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, Globe, Palette, Briefcase, Building2, 
  School, Compass, ArrowRight, Calendar, AlertCircle, 
  Stethoscope, Gavel, FlaskConical, Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { exams } from '../data/exams';
import { motion, AnimatePresence } from 'framer-motion';

const ExamsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeType, setActiveType] = useState<string>('All');

  // Categories with Icons
  const categories = [
    { id: 'All', label: 'All Exams', icon: <School size={16} /> },
    { id: 'Engineering', label: 'Engineering', icon: <GraduationCap size={16} /> },
    { id: 'Medical', label: 'Medical', icon: <Stethoscope size={16} /> },
    { id: 'Government', label: 'Govt Jobs', icon: <Building2 size={16} /> },
    { id: 'Management', label: 'Management', icon: <Briefcase size={16} /> },
    { id: 'Law', label: 'Law', icon: <Gavel size={16} /> },
    { id: 'Pharmacy', label: 'Pharmacy', icon: <FlaskConical size={16} /> },
    { id: 'Global', label: 'Abroad', icon: <Globe size={16} /> },
    { id: 'Design', label: 'Design', icon: <Palette size={16} /> },
  ];

  // Secondary Filter Options (Scrollable)
  const types = ['All', 'Private', 'Government', 'Deemed', 'Autonomous'];

  const filteredExams = useMemo(() => {
    // 1. Filter Logic
    const filtered = exams.filter(exam => {
      // Type Filter (Secondary Row)
      if (activeType !== 'All') {
        if (activeType === 'Government') {
           if (exam.category !== 'Government') return false;
        }
        else if (activeType === 'Private') {
           // Show all private categories (Engineering, Management, etc.)
           if (exam.category === 'Government') return false;
        }
        else if (activeType === 'Deemed' || activeType === 'Autonomous') {
           // Deemed and Autonomous universities typically conduct 'University' level exams
           if (exam.level !== 'University') return false;
        }
      }

      // Category Filter (Primary Row)
      if (activeCategory === 'All') return true;
      
      const courseStr = exam.courses.join(' ').toLowerCase();
      const cat = exam.category;

      if (activeCategory === 'Engineering') return cat === 'Private Engineering' || courseStr.includes('b.tech') || exam.id.includes('jee');
      if (activeCategory === 'Medical') return courseStr.includes('mbbs') || courseStr.includes('bds') || exam.name.includes('NEET');
      if (activeCategory === 'Government') return cat === 'Government';
      if (activeCategory === 'Management') return cat === 'Management' || courseStr.includes('mba');
      if (activeCategory === 'Law') return courseStr.includes('law') || courseStr.includes('llb');
      if (activeCategory === 'Pharmacy') return courseStr.includes('pharm');
      if (activeCategory === 'Global') return cat === 'Global';
      if (activeCategory === 'Design') return cat === 'Design';
      
      return cat === activeCategory;
    });

    // 2. Sort Logic (Deadline Priority)
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    return filtered.sort((a, b) => {
      const getTimestamp = (dateStr?: string) => {
        if (!dateStr) return null;
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? null : d.getTime();
      };

      const timeA = getTimestamp(a.applicationEnd);
      const timeB = getTimestamp(b.applicationEnd);

      // Status Check
      const isOpenA = timeA !== null && timeA >= today.getTime();
      const isOpenB = timeB !== null && timeB >= today.getTime();

      // Open exams first
      if (isOpenA && !isOpenB) return -1;
      if (!isOpenA && isOpenB) return 1;

      // If both open, sort by ending soonest
      if (isOpenA && isOpenB) {
        if (timeA !== timeB) return (timeA || 0) - (timeB || 0);
      }

      return 0;
    });
  }, [activeCategory, activeType]);

  const getDifficultyColor = (diff: string) => {
    if (diff === 'Easy') return 'text-green-600 bg-green-50 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
    if (diff === 'Medium') return 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800';
    return 'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
  };

  const getDeadlineBadge = (dateStr?: string) => {
    if (!dateStr) return <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Check Site</span>;
    
    const endDate = new Date(dateStr);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (days < 0) return <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Applications Closed</span>; 
    
    if (days <= 7) return (
      <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 px-2 py-1 rounded-md whitespace-nowrap animate-pulse">
        <AlertCircle size={10} /> Closes in {days} days
      </span>
    );
    return (
      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400 px-2 py-1 rounded-md whitespace-nowrap">
        Apply by {endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      
      {/* 1. Header Section */}
      <div className="bg-white dark:bg-slate-900 pt-6 pb-2 px-4 sticky top-0 z-40 border-b border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
             <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">Entrance Exams</h1>
                <p className="text-xs text-slate-500 font-medium">Gateway to your dream college</p>
             </div>
             <div className="flex gap-2">
                <Link to="/exam-finder" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary-teal hover:bg-teal-50 transition-colors">
                    <Compass size={24} />
                </Link>
                <button 
                  onClick={() => { setActiveCategory('All'); setActiveType('All'); }}
                  className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary-teal hover:bg-teal-50 transition-colors"
                  title="Reset Filters"
                >
                    <Filter size={24} />
                </button>
             </div>
          </div>

          {/* Primary Scroll (Streams) */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
             {categories.map(cat => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap border transition-all active:scale-95 ${
                   activeCategory === cat.id 
                     ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' 
                     : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                 }`}
               >
                 {cat.icon}
                 <span>{cat.label}</span>
               </button>
             ))}
          </div>

          {/* Secondary Scroll (Types) - SCROLLABLE */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mt-1">
             {types.map(type => (
               <button
                 key={type}
                 onClick={() => setActiveType(type)}
                 className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-all active:scale-95 ${
                   activeType === type 
                     ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600' 
                     : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                 }`}
               >
                 {type}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        
        {/* Exam Finder Banner */}
        <Link to="/exam-finder" className="mb-8 block group relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl shadow-blue-500/20">
           <div className="relative z-10 flex items-center justify-between">
              <div>
                 <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest mb-2 border border-white/10">
                    <Compass size={12} /> Smart Tool
                 </div>
                 <h2 className="text-xl font-black mb-1">Not sure which exam to take?</h2>
                 <p className="text-blue-100 text-sm font-medium">Answer 5 questions to get a personalized roadmap.</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                 <ArrowRight size={24} />
              </div>
           </div>
           {/* Decor */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        </Link>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredExams.length} Exams Found</span>
           <span className="text-[10px] text-slate-400 bg-white dark:bg-slate-900 px-2 py-1 rounded border dark:border-slate-800">Sorted by Deadline</span>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredExams.map((exam, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                key={exam.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-5 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex flex-col"
              >
                  {/* Top Row: Identity & Status */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 font-black text-lg shadow-sm">
                          {exam.name.charAt(0)}
                       </div>
                       <div>
                          <Link to={`/exams/${exam.id}`} className="text-lg font-black text-slate-900 dark:text-white hover:text-primary-teal transition-colors line-clamp-1">
                             {exam.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getDifficultyColor(exam.difficulty)}`}>
                                {exam.difficulty}
                             </span>
                             <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">• {exam.level} Level</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col items-end">
                       {getDeadlineBadge(exam.applicationEnd)}
                    </div>
                  </div>

                  {/* Middle: Full Name */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mb-4 pl-1">
                      {exam.fullName}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                     <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2 text-center border border-slate-100 dark:border-slate-700">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Mode</div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{exam.courses[0]}</div>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2 text-center border border-slate-100 dark:border-slate-700">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Freq</div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{exam.frequency}</div>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2 text-center border border-slate-100 dark:border-slate-700">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Fee</div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{exam.feeRange}</div>
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
                     <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                        <Calendar size={14} className="text-slate-400" />
                        <span>Exam Date: <span className="text-slate-900 dark:text-white">{exam.date}</span></span>
                     </div>
                     <Link 
                        to={`/exams/${exam.id}`} 
                        className="flex items-center gap-1 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-slate-900/10"
                     >
                        Details <ArrowRight size={12} />
                     </Link>
                  </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 mt-4">
             <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
               <School size={32} />
             </div>
             <h3 className="text-lg font-bold mb-2">No exams found</h3>
             <p className="text-slate-500 text-sm mb-6">Try adjusting your category or level filters.</p>
             <button onClick={() => { setActiveCategory('All'); setActiveType('All'); }} className="text-white bg-primary-teal px-6 py-3 rounded-xl font-bold text-sm shadow-lg">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsPage;