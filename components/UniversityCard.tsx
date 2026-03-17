
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { University } from '../types';
import { MapPin, Building2, IndianRupee, BookOpen, Heart, Info, CheckCircle2, ArrowRight, FileText, Shield, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UniversityCardProps {
  uni: University;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ uni, isSaved: propIsSaved, onToggleSave }) => {
  const [localIsSaved, setLocalIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showParentInfo, setShowParentInfo] = useState(false); 

  // Determine if we use controlled state (prop) or local state
  const isSaved = propIsSaved !== undefined ? propIsSaved : localIsSaved;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onToggleSave) {
      onToggleSave(uni.id);
      // Trigger toast only if we are saving (not unsaving)
      if (!isSaved) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } else {
      // Local storage logic if no handler provided (fallback)
      const saved = JSON.parse(localStorage.getItem('tsap_saved_unis') || '[]');
      let newSaved;
      
      // Since localIsSaved might be out of sync if used mixed, better to rely on actual data check
      const actuallySaved = saved.includes(uni.id);
      
      if (actuallySaved) {
        newSaved = saved.filter((id: string) => id !== uni.id);
        setLocalIsSaved(false);
      } else {
        newSaved = [...saved, uni.id];
        setLocalIsSaved(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
      localStorage.setItem('tsap_saved_unis', JSON.stringify(newSaved));
    }
    
    // Dispatch custom event for BottomNav badge to update
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const toggleParentInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowParentInfo(!showParentInfo);
  };

  // 1. SUITABILITY LOGIC (Strictly based on rank/competition)
  const getSuitability = () => {
    const rank = uni.cutoffs[0]?.rank || 50000;
    
    // Highly Competitive (Red)
    if (rank < 5000) return { 
      label: 'Highly competitive', 
      color: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
      dotColor: 'bg-red-500'
    };
    
    // Moderate (Yellow)
    if (rank < 25000) return { 
      label: 'Moderate cutoff', 
      color: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
      dotColor: 'bg-amber-500'
    };
    
    // Good Chance / Accessible (Green)
    return { 
      label: 'Good chance', 
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
      dotColor: 'bg-emerald-500'
    };
  };

  const suitability = getSuitability();

  // 2. REASSURING MICRO COPY 
  const getMicroCopy = () => {
    if (uni.type === 'Government') return "Affordable government degree with high value.";
    if (uni.naacGrade.includes('A++')) return "Top-rated infrastructure and faculty.";
    if (uni.type === 'Autonomous') return "Focused on industry-ready skills.";
    return "Popular choice for local placements.";
  };

  const affiliationCode = uni.affiliation.split(' ')[0].replace(/[^a-zA-Z]/g, '').substring(0, 6);
  const examName = uni.courses[0]?.eligibility.split(' ')[0] || 'Entrance';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.99 }}
      className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden relative flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 w-full"
    >
      {/* Toast Feedback */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-0 right-0 mx-auto w-max z-30 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 size={12} className="text-primary-teal" />
            Saved to shortlist
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 1. HEADER & IDENTITY --- */}
      <div className="p-5 pb-2">
        <div className="flex gap-4 items-start">
          {/* Logo */}
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-1 flex items-center justify-center overflow-hidden shadow-sm">
            <span className="text-xl font-black text-slate-400 dark:text-slate-500">{uni.name.charAt(0)}</span>
          </div>

          {/* Name & Location */}
          <div className="flex-grow min-w-0">
            <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-white line-clamp-2 mb-1">
              {uni.name}
            </h3>
            
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 font-medium mb-2.5">
              <MapPin size={12} className="mr-1 text-slate-400" /> {uni.city}, {uni.state}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${uni.type === 'Government' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500'} dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300`}>
                {uni.type}
              </span>
              {uni.naacGrade !== 'N/A' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                  NAAC: {uni.naacGrade}
                </span>
              )}
               <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                  {affiliationCode}
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. SUITABILITY TAG --- */}
      <div className="px-5 mb-4">
        <div className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center gap-2 border ${suitability.color}`}>
          <div className={`w-2 h-2 rounded-full ${suitability.dotColor} animate-pulse`}></div>
          {suitability.label}
        </div>
      </div>

      {/* --- 3. QUICK FACTS --- */}
      <div className="px-5">
        <div className="grid grid-cols-2 gap-px bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 flex items-center gap-2.5">
            <BookOpen size={14} className="text-primary-teal shrink-0" />
            <div className="flex flex-col min-w-0">
               <span className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Top Course</span>
               <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{uni.courses[0]?.name || 'B.Tech'}</span>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 flex items-center gap-2.5">
            <IndianRupee size={14} className="text-secondary-purple shrink-0" />
            <div className="flex flex-col min-w-0">
               <span className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Annual Fee</span>
               <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{uni.fees.tuition.split(' ')[0]}</span>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 flex items-center gap-2.5">
            <FileText size={14} className="text-blue-500 shrink-0" />
            <div className="flex flex-col min-w-0">
               <span className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Exam</span>
               <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{examName}</span>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 flex items-center gap-2.5">
            <Building2 size={14} className="text-orange-500 shrink-0" />
            <div className="flex flex-col min-w-0">
               <span className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Hostel</span>
               <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{uni.fees.hostel !== 'N/A' ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. WHY CHOOSE & PARENT INFO --- */}
      <div className="px-5 py-4 flex-grow flex flex-col justify-end">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed border-l-2 border-primary-teal/30 pl-3 mb-3 italic">
          "{getMicroCopy()}"
        </p>

        {/* Parent Indicators */}
        <div className="relative">
          <button 
            onClick={toggleParentInfo}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors w-full py-1"
          >
            <UserCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest border-b border-dotted border-slate-400">Parent Info & Safety</span>
            {showParentInfo ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          
          <AnimatePresence>
            {showParentInfo && (
              <motion.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden bg-slate-50 dark:bg-slate-800 rounded-xl px-4 border border-slate-100 dark:border-slate-700"
              >
                <div className="py-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Recognition</span>
                    <span className={`flex items-center font-bold ${uni.type === 'Government' ? "text-emerald-600 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>
                      {uni.type === 'Government' ? <Shield size={10} className="mr-1" /> : null}
                      {uni.type === 'Government' ? 'Govt Recognized' : 'Private / Deemed'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Hostel Facility</span>
                    <span className={`font-bold ${uni.fees.hostel !== 'N/A' ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}>
                      {uni.fees.hostel !== 'N/A' ? 'Available' : 'Not Listed'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- 5. ACTION BUTTONS (44px+) --- */}
      <div className="p-5 pt-0 mt-auto grid grid-cols-[1fr,auto] gap-3">
        <Link 
          to={`/universities/${uni.id}`}
          className="flex items-center justify-center gap-2 h-12 bg-primary-teal hover:bg-teal-600 active:bg-teal-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-teal/20 text-sm group/btn"
        >
          <span>View Details</span>
          <ArrowRight size={16} className="opacity-70 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
        <button 
          onClick={handleSave}
          className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all active:scale-95 ${isSaved ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-transparent border-slate-100 hover:border-rose-100 hover:text-rose-400 text-slate-300 dark:border-slate-800'}`}
          aria-label="Save to shortlist"
        >
          <Heart size={22} className={isSaved ? "fill-current" : ""} />
        </button>
      </div>
    </motion.div>
  );
};
