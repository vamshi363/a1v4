import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ChevronRight, Building2, Compass, ArrowRight, Bell, CalendarClock, CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink, BookOpen, BookMarked } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scholarships } from '../data/scholarships';
import { exams } from '../data/exams';

const HomePage: React.FC = () => {
  // New State for Reminder Toast
  const [showReminder, setShowReminder] = useState(false);
  
  const handleSetReminder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowReminder(true);
    setTimeout(() => setShowReminder(false), 3000);
  };

  // Filter exams for "Beyond EAMCET" section (Private Universities & Deemed)
  const alternativeExams = useMemo(() => {
    return exams.filter(e => e.category === 'Private Engineering' || e.category === 'Skill-Based');
  }, []);

  // AI-Driven: Calculate days left based on the Verified 'applicationEnd' field
  const endingSoonExams = useMemo(() => {
    const today = new Date();
    
    return exams
      .filter(e => e.applicationEnd) // Only those with AI-detected dates
      .map(e => {
        const endDate = new Date(e.applicationEnd!);
        const diffTime = endDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...e, daysLeft };
      })
      .filter(e => e.daysLeft >= 0 && e.daysLeft <= 30) // Only upcoming in 30 days
      .sort((a, b) => a.daysLeft - b.daysLeft) // Urgent first
      .slice(0, 5); // Limit to top 5
  }, []);

  const getBadgeColor = (days: number) => {
    if (days <= 3) return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900';
    if (days <= 10) return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900';
    return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
  };

  // Helper to format "last checked" time
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  // --- NEW HELPERS FOR EXAM CARDS ---
  const getDeadlineBadge = (dateStr?: string) => {
    if (!dateStr) return null;
    const endDate = new Date(dateStr);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (days < 0) return null; // Expired
    
    if (days <= 3) return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 mb-1">
        Closes in {days} days
      </span>
    );
    if (days <= 10) return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 mb-1">
        Closes in {days} days
      </span>
    );
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 mb-1">
        Last date: {endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
      </span>
    );
  };

  const getMicroGuidance = (category: string) => {
    if (category === 'Private Engineering') return "Accepted by multiple private colleges";
    if (category === 'Government') return "Best for low-fee government seats";
    if (category === 'Management') return "Gateway to top MBA colleges";
    if (category === 'Skill-Based') return "Direct entry based on skills";
    return "Recommended for career growth";
  };

  return (
    <div className="w-full relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showReminder && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            className="fixed top-20 left-0 right-0 mx-auto w-max z-50 bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-full shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 size={16} className="text-primary-teal" />
            Reminder set successfully
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Compacted for Mobile */}
      <section className="relative bg-gradient-to-br from-primary-teal to-teal-700 py-6 md:py-16 px-4 overflow-hidden text-white">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-secondary-purple/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-5xl font-black mb-6 leading-tight"
          >
            Admissions in Telangana & Andhra <br className="hidden md:block" /> Made Simple.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-base md:text-xl font-black text-white/90">You are here to find</span>
          </motion.div>

          {/* Big Bold Navigation Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-row items-center justify-center gap-3 md:gap-5 w-full max-w-2xl mx-auto"
          >
             <Link 
               to="/universities" 
               className="w-full flex-1 bg-white text-teal-800 hover:bg-teal-50 px-3 md:px-6 py-3.5 rounded-2xl font-black text-sm md:text-xl uppercase tracking-wider transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-3 border-2 border-transparent hover:border-teal-200"
             >
               <Building2 className="shrink-0 w-5 h-5 md:w-6 md:h-6" />
               Universities
             </Link>
             <Link 
               to="/scholarships" 
               className="w-full flex-1 bg-secondary-purple hover:bg-purple-600 text-white px-3 md:px-6 py-3.5 rounded-2xl font-black text-sm md:text-xl uppercase tracking-wider transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 md:gap-3 border-2 border-transparent hover:border-purple-400"
             >
               <Award className="shrink-0 w-5 h-5 md:w-6 md:h-6" />
               Scholarships
             </Link>
          </motion.div>

          {/* NEW CTA for Exam Finder - Highlighted */}
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="mt-10 flex justify-center"
          >
             <Link to="/exam-finder" className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-300 to-yellow-400 text-amber-950 px-6 py-3.5 rounded-full text-sm md:text-base font-black shadow-[0_10px_30px_-10px_rgba(251,191,36,0.5)] hover:shadow-[0_10px_40px_-10px_rgba(251,191,36,0.7)] hover:scale-105 transition-all duration-300 border border-yellow-200/50">
               <span className="absolute -top-2.5 -right-2 bg-white text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-amber-100 animate-bounce">
                  AI Tool
               </span>
               <div className="bg-white/30 p-1.5 rounded-full group-hover:bg-white/50 transition-colors">
                  <Compass size={18} className="shrink-0" />
               </div>
               <span>Confused? Find the right exam for you</span>
               <ChevronRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
             </Link>
          </motion.div>
        </div>
      </section>

      {/* EXAMS BEYOND EAMCET SECTION (Moved Up) */}
      <section className="py-12 bg-slate-50 dark:bg-slate-950 overflow-hidden border-b border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto pl-4 pr-0 md:px-4">
            <div className="flex justify-between items-end mb-6 pr-4">
               <div>
                  <h2 className="text-2xl md:text-3xl font-black mb-1">Exams Beyond EAMCET</h2>
                  <p className="text-slate-500 text-sm font-medium">Top colleges also accept these entrance exams.</p>
               </div>
               <Link to="/exams" className="text-slate-400 hover:text-slate-600 font-bold text-xs flex items-center">
                  View All <ChevronRight size={14} />
               </Link>
            </div>

            <div className="overflow-x-auto no-scrollbar pb-8 -ml-4 pl-4 snap-x snap-mandatory">
               <div className="flex gap-4 w-max">
                  {alternativeExams.map((exam) => (
                     <motion.div 
                        key={exam.id}
                        whileTap={{ scale: 0.98 }}
                        className="snap-center w-72 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[1.5rem] p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                     >
                        <div>
                           <div className="flex justify-between items-start mb-2">
                              <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                                 <GraduationCap size={20} />
                              </div>
                              <div className="flex flex-col items-end">
                                {getDeadlineBadge(exam.applicationEnd)}
                                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-slate-500">{exam.level} Exam</span>
                              </div>
                           </div>
                           
                           <h3 className="font-black text-lg leading-tight mb-1 truncate">{exam.name}</h3>
                           <p className="text-xs text-slate-400 truncate mb-1">{exam.fullName}</p>
                           
                           {/* Micro Guidance */}
                           <p className="text-[10px] text-slate-500 mb-3 font-medium bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded w-fit">
                              {getMicroGuidance(exam.category)}
                           </p>
                           
                           <div className="mb-4">
                              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Accepted By</div>
                              <div className="flex flex-wrap gap-1">
                                 {exam.colleges.slice(0, 2).map((col, i) => (
                                    <span key={i} className="text-[10px] bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded border dark:border-slate-600 text-slate-600 dark:text-slate-300 truncate max-w-[120px]">{col.split(' ')[0]}</span>
                                 ))}
                                 {exam.colleges.length > 2 && <span className="text-[10px] text-slate-400 flex items-center">+{exam.colleges.length - 2} more</span>}
                              </div>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                           <Link 
                              to={`/exams/${exam.id}`}
                              className="py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs text-center hover:opacity-90 transition-opacity shadow-sm"
                           >
                              View Exam Details
                           </Link>
                           <Link 
                              to={`/universities?q=${encodeURIComponent(exam.name)}`}
                              className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                           >
                              View Colleges
                           </Link>
                        </div>
                     </motion.div>
                  ))}
                  
                  {/* Explore More Card */}
                  <Link to="/exams" className="snap-center w-40 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary-teal transition-colors group">
                     <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <ArrowRight size={20} className="text-slate-400 group-hover:text-primary-teal" />
                     </div>
                     <span className="font-bold text-sm text-slate-500 group-hover:text-primary-teal">Explore All Exams</span>
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* NEW: COURSE EXPLORER QUICK ACCESS */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-primary-teal/20 text-primary-teal px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-primary-teal/20">
                  <BookMarked size={12} /> New Section
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Pick the Right Course, <br/> Build Your Future.</h2>
                <p className="text-slate-400 max-w-md mb-8 text-sm md:text-base">
                  Detailed guides for 150+ courses including engineering, medical, and emerging technologies. Know the subjects, skills, and salaries.
                </p>
                <Link to="/courses" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-lg active:scale-95">
                  Browse Course Library <ArrowRight size={18} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                 {[
                   { name: 'Engineering', count: '45+', color: 'text-primary-teal' },
                   { name: 'Medical', count: '30+', color: 'text-red-400' },
                   { name: 'Emerging Tech', count: '10+', color: 'text-blue-400' },
                   { name: 'Creative', count: '20+', color: 'text-purple-400' },
                 ].map((c) => (
                   <div key={c.name} className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl text-center">
                     <div className={`text-xl font-black ${c.color}`}>{c.count}</div>
                     <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-sans">{c.name}</div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: EXAMS THAT END SOON SECTION (AI VERIFIED - Moved Down) */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4">
           {/* Section Header */}
           <div className="flex justify-between items-end mb-6">
              <div>
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                    ⏰ Exams That End Soon
                 </h2>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    AI-Verified deadlines from official sources.
                 </p>
              </div>
              <Link to="/exams" className="text-xs font-bold text-primary-teal hover:text-teal-700 flex items-center gap-1 mb-1">
                 View all exams <ArrowRight size={12} />
              </Link>
           </div>

           {/* Vertical Card List */}
           <div className="space-y-4">
              {endingSoonExams.length > 0 ? (
                 endingSoonExams.map((exam, idx) => (
                   <motion.div 
                      key={exam.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white dark:bg-slate-900 rounded-[1.25rem] p-5 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group"
                   >
                      <div className="flex justify-between items-start mb-3">
                         <div>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                               {exam.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                               {/* Verification Badge */}
                               {exam.verificationStatus === 'Verified' ? (
                                  <div className="flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                                     <ShieldCheck size={12} />
                                     Verified {formatTimeAgo(exam.lastVerified)}
                                  </div>
                               ) : (
                                  <div className="flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800 px-2 py-0.5 rounded-full">
                                     <AlertTriangle size={12} />
                                     Verification Pending
                                  </div>
                               )}
                            </div>
                         </div>
                         
                         {/* Countdown Badge */}
                         <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${getBadgeColor(exam.daysLeft)}`}>
                            <CalendarClock size={14} />
                            <span className="text-xs font-bold whitespace-nowrap">
                               {exam.daysLeft} days left
                            </span>
                         </div>
                      </div>

                      <div className="flex items-center gap-3 mb-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                         <span className="bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            {exam.category}
                         </span>
                         <span className="truncate max-w-[150px]">
                            Deadline: {exam.applicationEnd}
                         </span>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                         <Link 
                            to={`/exams/${exam.id}`} 
                            className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl text-sm font-bold text-center hover:opacity-90 transition-opacity"
                         >
                            View Exam
                         </Link>
                         <button 
                            onClick={handleSetReminder}
                            className="w-12 h-11 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary-teal hover:border-primary-teal hover:bg-teal-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                            aria-label="Set Reminder"
                         >
                            <Bell size={20} />
                         </button>
                      </div>
                      
                      {/* Source Link (Trust Factor) */}
                      {exam.sourceUrl && (
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <a 
                             href={exam.sourceUrl} 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="text-[10px] text-slate-400 hover:text-primary-teal flex items-center gap-1 bg-white dark:bg-slate-800 px-2 py-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-700"
                             title="Verify on official site"
                           >
                              Source <ExternalLink size={10} />
                           </a>
                        </div>
                      )}
                   </motion.div>
                 ))
              ) : (
                <div className="text-center py-8 bg-white dark:bg-slate-900 rounded-[1.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                   <p className="text-slate-500 text-sm font-medium">No deadlines closing in the next 30 days.</p>
                   <Link to="/exams" className="text-primary-teal font-bold text-xs mt-2 inline-block">View upcoming calendar</Link>
                </div>
              )}
           </div>
        </div>
      </section>

      {/* ADVERTISEMENT 2 */}
      <div className="w-full bg-slate-50 dark:bg-slate-950 py-6 border-y border-slate-100 dark:border-slate-800">
         <div className="max-w-4xl mx-auto px-4">
            <div className="w-full h-28 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sponsored Ad</span>
            </div>
         </div>
      </div>

      {/* Scholarships Section */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-black mb-2">Scholarships closing soon</h2>
              <p className="text-slate-500 font-medium text-sm md:text-base">Don't miss the deadline for these official schemes.</p>
            </div>
            <Link to="/scholarships" className="text-secondary-purple font-black flex items-center hover:underline group text-xs md:text-base">
              See All <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.slice(0, 2).map((scholar) => (
              <div key={scholar.id} className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all group">
                <div className="bg-white dark:bg-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border dark:border-slate-600 text-secondary-purple group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-black group-hover:text-secondary-purple transition-colors leading-tight line-clamp-2">{scholar.name}</h3>
                  </div>
                  <span className={`self-start px-3 py-1 mb-4 rounded-full text-[10px] font-black uppercase tracking-widest ${scholar.type === 'State' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {scholar.type} Funding
                  </span>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">{scholar.eligibility.substring(0, 90)}...</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">Ends: {scholar.deadline}</div>
                    <Link to={`/scholarships/${scholar.id}`} className="text-secondary-purple font-black flex items-center text-xs uppercase tracking-widest hover:translate-x-1 transition-transform">
                      Check Eligibility <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVERTISEMENT 3 */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="w-full h-24 bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Advertisement</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto bg-primary-teal rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center text-white shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-5xl font-black mb-4">Start your journey with confidence.</h2>
            <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto font-medium">We gather data from verified government sources so you can make the right decision for your future.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/universities" className="w-full sm:w-auto bg-white text-primary-teal px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1">
                 Browse Colleges
               </Link>
               <Link to="/help" className="w-full sm:w-auto bg-teal-800 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-teal-900 transition-all shadow-xl hover:-translate-y-1">
                 Ask AI Advisor
               </Link>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;