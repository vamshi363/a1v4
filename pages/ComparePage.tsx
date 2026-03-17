
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { universities } from '../data/universities';
import { University } from '../types';
import { 
  ArrowLeft, X, Plus, CheckCircle2, TrendingUp, 
  IndianRupee, Building2, GraduationCap, Award, 
  MapPin, ShieldCheck, Sparkles, ExternalLink, HelpCircle, Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ComparePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCounselingAd, setShowCounselingAd] = useState(true);

  // Load IDs from URL or Local Storage
  useEffect(() => {
    const idsFromUrl = searchParams.get('ids')?.split(',') || [];
    if (idsFromUrl.length > 0) {
      setSelectedIds(idsFromUrl.filter(id => id));
    } else {
      // Fallback to saved items if no URL params
      const saved = JSON.parse(localStorage.getItem('tsap_saved_unis') || '[]');
      if (saved.length > 0) setSelectedIds(saved.slice(0, 3)); // Max 3 default
    }
  }, [searchParams]);

  const selectedUnis = useMemo(() => {
    return selectedIds.map(id => universities.find(u => u.id === id)).filter(Boolean) as University[];
  }, [selectedIds]);

  const removeCollege = (id: string) => {
    const newIds = selectedIds.filter(cid => cid !== id);
    setSelectedIds(newIds);
    // Update URL without reloading
    const newUrl = newIds.length > 0 ? `/compare?ids=${newIds.join(',')}` : '/saved';
    if (newIds.length === 0) navigate('/saved');
    else window.history.replaceState(null, '', `/#${newUrl}`);
  };

  // --- HELPER LOGIC FOR COMPARISON ---
  
  const getFeeValue = (feeStr: string) => parseInt(feeStr.replace(/[^0-9]/g, '')) || 0;
  const getRankValue = (uni: University) => uni.cutoffs[0]?.rank || 999999;
  
  const lowestFeeId = useMemo(() => {
    if (selectedUnis.length < 2) return null;
    return selectedUnis.reduce((prev, curr) => getFeeValue(prev.fees.tuition) < getFeeValue(curr.fees.tuition) ? prev : curr).id;
  }, [selectedUnis]);

  const bestPlacementId = useMemo(() => {
    if (selectedUnis.length < 2) return null;
    return selectedUnis.reduce((prev, curr) => {
       // A++ > A+ > A > B
       const getScore = (g: string) => g === 'A++' ? 4 : g === 'A+' ? 3 : g === 'A' ? 2 : 1;
       return getScore(prev.naacGrade) > getScore(curr.naacGrade) ? prev : curr;
    }).id;
  }, [selectedUnis]);

  const renderCell = (content: React.ReactNode, isHeader = false, highlight?: 'green' | 'red' | 'neutral') => (
    <div className={`p-4 min-w-[160px] max-w-[160px] flex flex-col justify-center border-r border-slate-100 dark:border-slate-800 ${isHeader ? 'sticky left-0 bg-white dark:bg-slate-900 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]' : ''} ${highlight === 'green' ? 'bg-green-50 dark:bg-green-900/10' : highlight === 'red' ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
      {content}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      
      {/* 1. STICKY TOP BAR */}
      <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">
         <div className="px-4 py-3 flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
               <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <ArrowLeft size={20} />
               </button>
               <div>
                  <h1 className="font-black text-lg leading-none">Compare</h1>
                  <p className="text-[10px] text-slate-500 font-medium">Up to 3 colleges</p>
               </div>
            </div>
            {selectedIds.length > 0 && (
               <button onClick={() => setSelectedIds([])} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                  Clear All
               </button>
            )}
         </div>
         
         {/* 2. COLLEGE SELECTOR STRIP */}
         <div className="px-4 pb-4 overflow-x-auto no-scrollbar flex gap-3 max-w-7xl mx-auto">
            <AnimatePresence>
               {selectedUnis.map((uni, idx) => (
                  <motion.div 
                     key={uni.id}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="relative flex-shrink-0 w-36 bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center group"
                  >
                     <button onClick={() => removeCollege(uni.id)} className="absolute top-1 right-1 p-1 bg-white dark:bg-slate-700 rounded-full text-slate-400 hover:text-red-500 shadow-sm">
                        <X size={12} />
                     </button>
                     {/* Sponsored Badge Logic (Mock) */}
                     {idx === 1 && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 text-[8px] font-bold uppercase tracking-widest text-slate-400 shadow-sm">Sponsored</div>
                     )}
                     <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-lg font-black text-slate-400 mb-2 shadow-sm">
                        {uni.name.charAt(0)}
                     </div>
                     <div className="text-xs font-bold leading-tight line-clamp-2 h-8">{uni.name}</div>
                  </motion.div>
               ))}
            </AnimatePresence>
            
            {selectedIds.length < 3 && (
               <Link to="/saved" className="flex-shrink-0 w-36 bg-white dark:bg-slate-900 rounded-xl p-3 border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 hover:border-primary-teal hover:text-primary-teal transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-2">
                     <Plus size={20} />
                  </div>
                  <span className="text-xs font-bold">Add College</span>
               </Link>
            )}
         </div>
      </div>

      {selectedIds.length === 0 ? (
         <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
               <Building2 size={32} className="text-slate-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">No Colleges Selected</h2>
            <p className="text-slate-500 mb-6 max-w-xs">Select colleges from your saved list to start comparing them side-by-side.</p>
            <Link to="/saved" className="px-8 py-3 bg-primary-teal text-white rounded-xl font-bold shadow-lg">Go to Saved Colleges</Link>
         </div>
      ) : (
         <div className="max-w-7xl mx-auto">
            {/* 3. COMPARISON TABLE */}
            <div className="overflow-x-auto pb-6">
               <div className="min-w-max">
                  
                  {/* --- SECTION 1: QUICK VERDICT --- */}
                  <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                     {renderCell(<div className="font-black text-xs uppercase tracking-widest text-slate-500">Quick Verdict</div>, true)}
                     {selectedUnis.map(uni => (
                        renderCell(
                           <div className="space-y-2">
                              {uni.id === lowestFeeId && (
                                 <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-[10px] font-bold">
                                    <IndianRupee size={10} /> Best Budget
                                 </div>
                              )}
                              {uni.id === bestPlacementId && (
                                 <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold">
                                    <TrendingUp size={10} /> Top Placements
                                 </div>
                              )}
                              {uni.type === 'Government' && (
                                 <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-[10px] font-bold">
                                    <ShieldCheck size={10} /> Gov. Recognized
                                 </div>
                              )}
                           </div>
                        )
                     ))}
                  </div>

                  {/* --- SECTION 2: ADMISSION --- */}
                  <div className="bg-slate-50/50 dark:bg-slate-900/50 py-2 px-4 text-xs font-black uppercase text-slate-400 tracking-widest sticky left-0">Admission</div>
                  
                  <div className="flex border-b border-slate-100 dark:border-slate-800">
                     {renderCell(<div className="font-bold text-xs text-slate-600 dark:text-slate-300">Exam Accepted</div>, true)}
                     {selectedUnis.map(uni => renderCell(<span className="text-sm font-medium">{uni.courses[0]?.eligibility.split(' ')[0] || 'Entrance'}</span>))}
                  </div>
                  <div className="flex border-b border-slate-100 dark:border-slate-800">
                     {renderCell(<div className="font-bold text-xs text-slate-600 dark:text-slate-300">Difficulty</div>, true)}
                     {selectedUnis.map(uni => {
                        const rank = getRankValue(uni);
                        const difficulty = rank < 5000 ? 'High' : rank < 20000 ? 'Medium' : 'Low';
                        const color = difficulty === 'High' ? 'text-red-500' : difficulty === 'Medium' ? 'text-amber-500' : 'text-green-500';
                        return renderCell(<span className={`text-sm font-bold ${color}`}>{difficulty}</span>);
                     })}
                  </div>

                  {/* --- SECTION 3: FEES (Critical) --- */}
                  <div className="bg-slate-50/50 dark:bg-slate-900/50 py-2 px-4 text-xs font-black uppercase text-slate-400 tracking-widest sticky left-0 mt-4">Fees & Cost</div>

                  <div className="flex border-b border-slate-100 dark:border-slate-800">
                     {renderCell(<div className="font-bold text-xs text-slate-600 dark:text-slate-300">Tuition (Year)</div>, true)}
                     {selectedUnis.map(uni => {
                        const isLowest = uni.id === lowestFeeId;
                        return renderCell(
                           <span className={`text-sm font-bold ${isLowest ? 'text-green-600' : ''}`}>
                              {uni.fees.tuition}
                           </span>, 
                           false, 
                           isLowest ? 'green' : undefined
                        );
                     })}
                  </div>
                  <div className="flex border-b border-slate-100 dark:border-slate-800">
                     {renderCell(<div className="font-bold text-xs text-slate-600 dark:text-slate-300">Hostel</div>, true)}
                     {selectedUnis.map(uni => renderCell(<span className="text-sm font-medium text-slate-500">{uni.fees.hostel}</span>))}
                  </div>

                   {/* --- SECTION 4: SCHOLARSHIPS --- */}
                  <div className="bg-slate-50/50 dark:bg-slate-900/50 py-2 px-4 text-xs font-black uppercase text-slate-400 tracking-widest sticky left-0 mt-4">Scholarships</div>

                  <div className="flex border-b border-slate-100 dark:border-slate-800">
                     {renderCell(<div className="font-bold text-xs text-slate-600 dark:text-slate-300">Reimbursement</div>, true)}
                     {selectedUnis.map(uni => renderCell(
                        <div className="flex flex-col gap-2">
                           <span className="text-sm font-bold flex items-center gap-1">
                              {uni.state === 'Telangana' ? 'ePASS' : 'JVD'} Eligible <CheckCircle2 size={12} className="text-green-500" />
                           </span>
                           <Link to={`/scholarships?type=State`} className="text-[10px] font-bold text-secondary-purple underline">
                              Check Eligibility
                           </Link>
                        </div>
                     ))}
                  </div>
                  
                  {/* --- SECTION 5: OUTCOMES --- */}
                  <div className="bg-slate-50/50 dark:bg-slate-900/50 py-2 px-4 text-xs font-black uppercase text-slate-400 tracking-widest sticky left-0 mt-4">Outcomes</div>

                   <div className="flex border-b border-slate-100 dark:border-slate-800">
                     {renderCell(<div className="font-bold text-xs text-slate-600 dark:text-slate-300">Placement Grade</div>, true)}
                     {selectedUnis.map(uni => {
                        const grade = uni.naacGrade.includes('A') ? 'High' : 'Medium';
                        return renderCell(<span className="text-sm font-bold">{grade} ({uni.naacGrade})</span>);
                     })}
                  </div>
                   <div className="flex border-b border-slate-100 dark:border-slate-800">
                     {renderCell(<div className="font-bold text-xs text-slate-600 dark:text-slate-300">Type</div>, true)}
                     {selectedUnis.map(uni => renderCell(<span className="text-sm font-medium">{uni.type}</span>))}
                  </div>

               </div>
            </div>

            {/* 6. SMART INSIGHTS SECTION */}
            <div className="px-4 mb-8">
               <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="text-yellow-400" size={20} />
                        <h3 className="font-black text-lg">Our Analysis</h3>
                     </div>
                     <div className="space-y-3">
                        {lowestFeeId && (
                           <div className="flex items-start gap-3 text-sm">
                              <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={16} />
                              <p><span className="font-bold text-green-300">Choose {selectedUnis.find(u => u.id === lowestFeeId)?.name}</span> if budget is your main priority. It has the most affordable tuition.</p>
                           </div>
                        )}
                        {bestPlacementId && bestPlacementId !== lowestFeeId && (
                           <div className="flex items-start gap-3 text-sm">
                              <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={16} />
                              <p><span className="font-bold text-blue-300">Choose {selectedUnis.find(u => u.id === bestPlacementId)?.name}</span> for better campus facilities and placement track record (NAAC Score).</p>
                           </div>
                        )}
                        <div className="flex items-start gap-3 text-sm">
                           <Info className="text-slate-400 shrink-0 mt-0.5" size={16} />
                           <p className="text-slate-300 text-xs">This advice is based on official data points like fees and NAAC accreditation. Always visit the campus before deciding.</p>
                        </div>
                     </div>
                  </div>
                  {/* Decorative */}
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary-teal rounded-full blur-[60px] opacity-30"></div>
               </div>
            </div>

            {/* ETHICAL MONETIZATION: CONTEXTUAL PARTNERS */}
            <div className="px-4 mb-24">
               <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-white dark:bg-slate-900">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Education Partners</span>
                     <span className="bg-slate-100 dark:bg-slate-800 text-[10px] px-2 py-0.5 rounded text-slate-500">Sponsored</span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                     <div className="min-w-[200px] p-3 bg-secondary-purple/5 rounded-xl border border-secondary-purple/10">
                        <h4 className="font-bold text-sm text-secondary-purple mb-1">Scholarship Search</h4>
                        <p className="text-xs text-slate-500 mb-2">Find private grants matching your profile.</p>
                        <Link to="/scholarships" className="text-xs font-bold underline decoration-dotted">View Options</Link>
                     </div>
                     <div className="min-w-[200px] p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800">
                        <h4 className="font-bold text-sm text-blue-600 mb-1">Education Loan</h4>
                        <p className="text-xs text-slate-500 mb-2">Low interest rates for engineering.</p>
                        <span className="text-xs font-bold underline decoration-dotted text-blue-500 cursor-pointer">Check Eligibility</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* 7. STICKY BOTTOM ACTIONS */}
      {selectedIds.length > 0 && (
         <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 z-40 safe-pb shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto flex gap-3">
               <Link 
                  to={`/universities/${selectedIds[0]}`}
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm text-center border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
               >
                  View {selectedUnis[0]?.name.split(' ')[0]}
               </Link>
               <button 
                  onClick={() => navigate('/saved')}
                  className="flex-1 bg-primary-teal text-white py-3.5 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform"
               >
                  Save Final Choice
               </button>
            </div>
         </div>
      )}

    </div>
  );
};

export default ComparePage;
