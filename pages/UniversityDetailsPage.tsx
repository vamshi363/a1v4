import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { universities } from '../data/universities';
import { scholarships } from '../data/scholarships';
import { Course } from '../types';
import { 
  MapPin, Shield, CheckCircle2, BookOpen, IndianRupee, 
  Building2, School, Award, ChevronDown, ChevronUp, 
  ExternalLink, Phone, Mail, GraduationCap, 
  ArrowLeft, TrendingUp, Youtube, Star, Scale, ShieldCheck, Navigation,
  Camera, X, Image as ImageIcon, Search, Globe, Footprints, Layers,
  FileText, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UniversityDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const uni = universities.find(u => u.id === id);
  
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});
  const [showVideos, setShowVideos] = useState(false);
  const [showImageSheet, setShowImageSheet] = useState(false); // Map Sheet
  const [showPhotoOptions, setShowPhotoOptions] = useState(false); // New Photo Choice Modal
  
  // Map View State: 'm' = Map, 'k' = Satellite, 'h' = Hybrid, 'street' = Street View (simulated via layer=c)
  const [mapViewMode, setMapViewMode] = useState<'m' | 'k' | 'h' | 'street'>('m');

  // Predictor State
  const [predRank, setPredRank] = useState('');
  const [predCategory, setPredCategory] = useState('OC');
  const [predGender, setPredGender] = useState('Male');
  const [showPredResults, setShowPredResults] = useState(false);

  // Logo State
  const [logoError, setLogoError] = useState(false);

  // Load Saved State
  useEffect(() => {
    if (id) {
      const saved = JSON.parse(localStorage.getItem('tsap_saved_unis') || '[]');
      setIsSaved(saved.includes(id));
    }
  }, [id]);

  // Handle Save Toggle
  const toggleSave = () => {
    if (!id) return;
    const saved = JSON.parse(localStorage.getItem('tsap_saved_unis') || '[]');
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
    localStorage.setItem('tsap_saved_unis', JSON.stringify(newSaved));
    // Dispatch event for bottom nav
    window.dispatchEvent(new Event('favorites-updated'));
  };

  // Group Courses
  const groupedCourses = useMemo(() => {
    if (!uni) return {} as Record<string, Course[]>;
    return uni.courses.reduce<Record<string, Course[]>>((acc, course) => {
      const level = course.level === 'UG' ? 'Undergraduate' : course.level === 'PG' ? 'Postgraduate' : 'Diploma';
      if (!acc[level]) acc[level] = [];
      acc[level].push(course);
      return acc;
    }, {});
  }, [uni]);

  // Default Open First Accordion
  useEffect(() => {
    const levels = Object.keys(groupedCourses);
    if (levels.length > 0) {
      setExpandedLevels({ [levels[0]]: true });
    }
  }, [groupedCourses]);

  if (!uni) return <div className="p-20 text-center text-xl font-bold">University not found</div>;

  const toggleLevel = (level: string) => {
    setExpandedLevels(prev => ({ ...prev, [level]: !prev[level] }));
  };

  // Prediction Calculation Logic
  const calculateProbability = (courseName: string) => {
    if (!predRank) return null;
    const rank = parseInt(predRank);
    const baseCutoff = uni.cutoffs[0]?.rank || 40000;

    // Multipliers logic
    let branchMultiplier = 1.0;
    if (courseName.includes('CSE') || courseName.includes('Computer')) branchMultiplier = 1.0;
    else if (courseName.includes('ECE') || courseName.includes('IT')) branchMultiplier = 1.3;
    else if (courseName.includes('EEE') || courseName.includes('Mechanical')) branchMultiplier = 2.5;
    else if (courseName.includes('Civil')) branchMultiplier = 3.0;
    else branchMultiplier = 4.0;

    let categoryMultiplier = 1.0;
    if (predCategory === 'BC') categoryMultiplier = 1.6;
    if (predCategory === 'SC') categoryMultiplier = 3.2;
    if (predCategory === 'ST') categoryMultiplier = 3.8;
    
    const genderMultiplier = predGender === 'Female' ? 1.1 : 1.0;

    const estimatedCutoff = baseCutoff * branchMultiplier * categoryMultiplier * genderMultiplier;

    if (rank <= estimatedCutoff * 0.8) return { label: 'Very High', color: 'text-green-600', bg: 'bg-green-500', percent: 95 };
    if (rank <= estimatedCutoff) return { label: 'High', color: 'text-emerald-600', bg: 'bg-emerald-500', percent: 80 };
    if (rank <= estimatedCutoff * 1.2) return { label: 'Moderate', color: 'text-amber-600', bg: 'bg-amber-500', percent: 50 };
    return { label: 'Low', color: 'text-red-600', bg: 'bg-red-500', percent: 20 };
  };

  // Relevant Scholarships
  const relevantScholarships = scholarships.filter(s => 
    s.type === 'Central' || 
    (uni.state === 'Telangana' && s.provider.includes('Telangana')) ||
    (uni.state === 'Andhra Pradesh' && s.provider.includes('Andhra'))
  ).slice(0, 3);

  // URLs
  const mapsQuery = encodeURIComponent(uni.name + ' ' + uni.city);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const imagesUrl = `https://www.google.com/search?tbm=isch&q=${mapsQuery}+campus+photos`;
  
  // Dynamic Embed URL based on View Mode
  let embedMapsUrl = '';
  if (mapViewMode === 'street') {
     embedMapsUrl = `https://maps.google.com/maps?q=${mapsQuery}&layer=c&z=17&ie=UTF8&iwloc=A&output=embed`;
  } else {
     embedMapsUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=${mapViewMode}&z=15&ie=UTF8&iwloc=A&output=embed`;
  }

  // Generate Logo URL
  const getLogoUrl = () => {
    try {
      const domain = new URL(uni.website).hostname;
      return `https://logo.clearbit.com/${domain}`;
    } catch (e) {
      return '';
    }
  };
  const logoUrl = getLogoUrl();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32 font-sans selection:bg-primary-teal/20">
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
            Saved to shortlist
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- 1. HEADER & IDENTITY --- */}
      <header className="relative bg-white dark:bg-slate-900 pt-6 pb-12 px-4 rounded-b-[2.5rem] shadow-sm border-b border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
           <Link to="/universities" className="inline-flex items-center text-slate-500 hover:text-primary-teal font-bold text-sm bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors">
             <ArrowLeft size={16} className="mr-1" /> Back
           </Link>
           {isSaved && (
              <Link to={`/compare?ids=${uni.id}`} className="inline-flex items-center text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors">
                 <Scale size={14} className="mr-1.5" /> Compare
              </Link>
           )}
        </div>
        
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-4 mb-4 w-full">
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden p-2 shrink-0">
              {!logoError && logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={`${uni.name} Logo`} 
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-3xl font-black text-slate-300">{uni.name.charAt(0)}</span>
              )}
            </div>

            {/* --- CAMPUS VIEW BUTTON (OPENS INTERNAL MAP SHEET) --- */}
            <button 
              onClick={() => { setShowImageSheet(true); setMapViewMode('m'); }}
              className="h-20 flex-1 max-w-[260px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex flex-row items-center justify-center gap-3 transition-all hover:scale-[1.02] group relative overflow-hidden px-4"
            >
               <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125"></div>
               <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/5 rounded-tr-full -ml-2 -mb-2"></div>
               
               <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                 <Navigation size={24} className="fill-white" />
               </div>
               
               <span className="text-xs font-black uppercase tracking-wide leading-tight text-left">
                 View on<br/>Google Maps
               </span>
            </button>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">
            {uni.name}
          </h1>
          
          <div className="flex items-center text-slate-500 font-medium text-sm mb-4">
            <MapPin size={16} className="mr-1 text-slate-400" />
            {uni.city}, {uni.state}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
             {/* Data Source Badge */}
             <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg border border-blue-100 dark:border-blue-800">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Data Source: {uni.dataSource}</span>
             </div>

             <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${uni.type === 'Government' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-600'} dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300`}>
                {uni.type}
             </span>
             {uni.naacGrade !== 'N/A' && (
               <span className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                 NAAC: {uni.naacGrade}
               </span>
             )}
          </div>

          {/* Reassurance Line */}
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100 w-full md:w-auto dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50">
             <Shield size={14} className="fill-current" />
             <span>Officially recognized institution. Safe to apply.</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10 space-y-6">
        
        {/* --- 2. QUICK SNAPSHOT (Grid) --- */}
        <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-lg border border-slate-100 dark:border-slate-800 p-5">
           <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Quick Snapshot</h3>
           <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-lg text-primary-teal">
                    <BookOpen size={18} />
                 </div>
                 <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Top Course</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight block">{uni.courses[0]?.name || 'B.Tech'}</span>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-500">
                    <FileText size={18} />
                 </div>
                 <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Exam</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight block">{uni.courses[0]?.eligibility.split(' ')[0] || 'Entrance'}</span>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-secondary-purple">
                    <IndianRupee size={18} />
                 </div>
                 <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Approx Fee</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight block">{uni.fees.tuition.split(' ')[0]}/yr</span>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-500">
                    <Building2 size={18} />
                 </div>
                 <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Hostel</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight block">{uni.fees.hostel !== 'N/A' ? 'Available' : 'Not Listed'}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* --- 3. STUDENT VIDEOS & REVIEWS (COLLAPSIBLE BUTTON) --- */}
        <section>
           <button 
             onClick={() => setShowVideos(!showVideos)}
             className="w-full flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] group"
           >
              <div className="flex items-center gap-4 text-left">
                 <div className="bg-red-100 dark:bg-red-900/30 p-3.5 rounded-2xl text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                    <Youtube size={28} />
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Student Videos & Reviews</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Tap to watch campus tours (Telugu/English)</p>
                 </div>
              </div>
              <div className={`w-10 h-10 rounded-full border border-slate-100 dark:border-slate-700 flex items-center justify-center transition-all ${showVideos ? 'bg-slate-100 dark:bg-slate-800 rotate-180' : 'bg-white dark:bg-slate-900'}`}>
                 <ChevronDown size={20} className="text-slate-400" />
              </div>
           </button>

           <AnimatePresence>
             {showVideos && (
               <motion.div 
                 initial={{ height: 0, opacity: 0, marginTop: 0 }}
                 animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                 exit={{ height: 0, opacity: 0, marginTop: 0 }}
                 className="overflow-hidden"
               >
                 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-4 shadow-sm space-y-3">
                    {[
                      { title: 'Watch Campus Tour (Telugu)', sub: 'See hostels, labs, and campus life', query: 'campus tour telugu' },
                      { title: 'Watch Student Reviews (Telugu)', sub: 'Honest opinions from current students', query: 'student review telugu' },
                      { title: 'Watch Placements Explained', sub: 'Packages and career scope', query: 'placements telugu' },
                      { title: 'Watch Campus Tour (English)', sub: 'Detailed academic overview', query: 'campus tour english' },
                    ].map((item, idx) => (
                       <a 
                         key={idx}
                         href={`https://www.youtube.com/results?search_query=${encodeURIComponent(uni.name + ' ' + item.query)}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center gap-4 w-full p-4 bg-slate-50 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-slate-700/50 border border-slate-100 dark:border-slate-700 rounded-2xl transition-all active:scale-[0.98] group shadow-sm hover:border-red-100 dark:hover:border-red-900/30"
                       >
                          {/* Left Icon */}
                          <div className="shrink-0 w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-red-600 shadow-sm border border-slate-100 dark:border-slate-600">
                             <Youtube size={20} fill="currentColor" />
                          </div>
                          
                          {/* Center Text */}
                          <div className="flex-grow min-w-0">
                             <div className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-tight mb-0.5 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                                {item.title}
                             </div>
                             <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                                {item.sub}
                             </div>
                          </div>

                          {/* Right Icon */}
                          <ExternalLink size={16} className="text-slate-300 group-hover:text-red-400 transition-colors shrink-0" />
                       </a>
                    ))}

                    {/* Disclaimer */}
                    <div className="pt-2 pb-1">
                       <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                          Videos are sourced from public YouTube content. After Inter does not promote or endorse any specific creator.
                       </p>
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </section>

        {/* --- 5. POST VIDEO CTA --- */}
        <section>
           <button 
             onClick={toggleSave}
             className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 border-2 ${isSaved ? 'bg-white border-green-500 text-green-600 dark:bg-slate-900' : 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:text-slate-900'}`}
           >
              {isSaved ? (
                <>
                  <CheckCircle2 size={20} className="fill-current" /> Saved to Shortlist
                </>
              ) : (
                <>
                  <Star size={20} className="fill-current text-yellow-400" /> Save This University
                </>
              )}
           </button>
           <div className="mt-4 flex justify-center">
              <Link to={`/compare?ids=${uni.id}`} className="text-slate-500 hover:text-primary-teal font-bold text-sm underline decoration-dashed">
                 Compare with other colleges
              </Link>
           </div>
        </section>

        {/* --- AD PLACEHOLDER 1 --- */}
        <div className="w-full h-32 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-300">
           <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded mb-1 text-slate-400">Advertisement</span>
           <span className="text-[10px] font-bold uppercase tracking-widest">Sponsored Ad</span>
        </div>

        {/* --- 6. COURSES & ELIGIBILITY --- */}
        <section>
           <h2 className="text-xl font-black mb-5 flex items-center gap-2 px-1">
             <GraduationCap className="text-slate-400" size={24} />
             Courses Offered
           </h2>
           <div className="space-y-4">
             {Object.entries(groupedCourses).map(([level, courses]) => (
               <div key={level} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                  <button 
                    onClick={() => toggleLevel(level)}
                    className="w-full flex items-center justify-between p-5 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-slate-700 dark:text-slate-200"
                  >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-primary-teal shadow-sm border border-slate-100 dark:border-slate-600">
                            {level === 'Undergraduate' ? <BookOpen size={16} /> : <GraduationCap size={16} />}
                        </div>
                        <span>{level} Programs <span className="text-slate-400 font-normal text-sm ml-1">({(courses as Course[]).length})</span></span>
                    </div>
                    {expandedLevels[level] ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>
                  <AnimatePresence>
                    {expandedLevels[level] && (
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }} 
                         animate={{ height: 'auto', opacity: 1 }} 
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.2 }}
                         className="overflow-hidden"
                       >
                         <div className="p-5 space-y-4">
                            {(courses as Course[]).map((course, idx) => (
                               <div key={idx} className="bg-white dark:bg-slate-800/30 rounded-xl p-4 border border-slate-100 dark:border-slate-800 hover:border-primary-teal/30 transition-colors shadow-sm">
                                  <div className="flex justify-between items-start mb-3">
                                      <div className="font-bold text-base text-slate-900 dark:text-white leading-tight">{course.name}</div>
                                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded shadow-sm whitespace-nowrap ml-3">
                                        {course.duration}
                                      </span>
                                  </div>
                                  
                                  {/* Distinct Eligibility Section */}
                                  <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                     <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                     <div className="text-xs text-blue-900 dark:text-blue-100 leading-relaxed">
                                        <span className="font-bold text-blue-700 dark:text-blue-300 uppercase text-[10px] tracking-wide mr-1.5">Eligibility:</span>
                                        {course.eligibility}
                                     </div>
                                  </div>
                               </div>
                            ))}
                         </div>
                       </motion.div>
                    )}
                  </AnimatePresence>
               </div>
             ))}
           </div>
        </section>

        {/* --- 7. FEES SECTION --- */}
        <section>
           <h2 className="text-xl font-black mb-5 flex items-center gap-2 px-1">
             <IndianRupee className="text-slate-400" size={24} />
             Fee Structure
           </h2>
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                 <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Tuition Fee</span>
                 <div className="text-right">
                    <span className="block text-2xl font-black text-slate-900 dark:text-white">{uni.fees.tuition}</span>
                    <span className="text-xs text-slate-400 font-medium">Per Year (Approx)</span>
                 </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                 <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Hostel Fee</span>
                 <div className="text-right">
                    <span className="block text-xl font-bold text-slate-700 dark:text-slate-300">{uni.fees.hostel}</span>
                    <span className="text-xs text-slate-400 font-medium">If Applicable</span>
                 </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl flex items-start gap-3">
                 <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 shrink-0">
                    <IndianRupee size={12} />
                 </div>
                 <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
                   Fees are approximate and subject to change by the university or state counseling authorities.
                 </p>
              </div>
           </div>
        </section>

        {/* --- 8. SCHOLARSHIP SUPPORT --- */}
        <section>
           <h2 className="text-xl font-black mb-5 flex items-center gap-2 px-1">
             <Award className="text-slate-400" size={24} />
             Scholarships Accepted
           </h2>
           <div className="space-y-3">
              {relevantScholarships.length > 0 ? relevantScholarships.map(s => (
                 <Link to={`/scholarships/${s.id}`} key={s.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary-teal transition-colors shadow-sm group">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                       <span className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-primary-teal transition-colors">{s.name}</span>
                    </div>
                    <ChevronDown size={16} className="-rotate-90 text-slate-300 group-hover:text-primary-teal" />
                 </Link>
              )) : (
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm text-slate-500 text-center font-medium">
                  Standard state and central scholarships are applicable here.
                </div>
              )}
           </div>
           <p className="mt-4 text-xs text-slate-400 text-center">
             *Eligible students can claim full fee reimbursement via state schemes.
           </p>
        </section>

        {/* --- 4. ADMISSION PREDICTOR (Moved Here) --- */}
        <section>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden">
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="bg-primary-teal p-2 rounded-xl text-white shadow-lg">
                 <TrendingUp size={20} />
               </div>
               <div>
                 <h2 className="text-lg font-black leading-tight">Check Your Chances</h2>
                 <p className="text-[10px] text-slate-400 font-medium">Based on 2024 cutoff trends</p>
               </div>
             </div>

             <div className="grid grid-cols-3 gap-3 mb-4 relative z-10">
                <div className="col-span-1">
                   <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Rank</label>
                   <input 
                     type="number" 
                     placeholder="15000"
                     className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-teal text-white placeholder:text-white/30 font-medium"
                     value={predRank}
                     onChange={(e) => { setPredRank(e.target.value); setShowPredResults(false); }}
                   />
                </div>
                <div className="col-span-1">
                   <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Cat</label>
                   <select 
                     className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-teal text-white appearance-none font-medium"
                     value={predCategory}
                     onChange={(e) => { setPredCategory(e.target.value); setShowPredResults(false); }}
                   >
                     <option className="text-black">OC</option>
                     <option className="text-black">BC</option>
                     <option className="text-black">SC</option>
                     <option className="text-black">ST</option>
                   </select>
                </div>
                <div className="col-span-1">
                   <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Gender</label>
                   <select 
                     className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-teal text-white appearance-none font-medium"
                     value={predGender}
                     onChange={(e) => { setPredGender(e.target.value); setShowPredResults(false); }}
                   >
                     <option className="text-black">Male</option>
                     <option className="text-black">Female</option>
                   </select>
                </div>
             </div>

             {!showPredResults ? (
               <button 
                onClick={() => predRank && setShowPredResults(true)}
                disabled={!predRank}
                className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors shadow-lg relative z-10"
               >
                 Predict My Admission
               </button>
             ) : (
               <div className="space-y-3 mt-6 bg-slate-800/80 p-4 rounded-xl border border-white/10 relative z-10 backdrop-blur-md">
                  <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-wider">Course Probability</h4>
                  {groupedCourses['Undergraduate']?.slice(0, 4).map((course, idx) => {
                     const prob = calculateProbability(course.name);
                     if (!prob) return null;
                     return (
                       <div key={idx} className="flex items-center justify-between gap-4">
                          <span className="text-xs font-medium truncate w-1/3 text-slate-300">{course.name}</span>
                          <div className="flex-grow h-1.5 bg-slate-700 rounded-full overflow-hidden">
                             <div className={`h-full ${prob.bg}`} style={{ width: `${prob.percent}%` }}></div>
                          </div>
                          <span className={`text-[10px] font-bold w-14 text-right ${prob.color}`}>{prob.label}</span>
                       </div>
                     )
                  })}
                  <button 
                    onClick={() => setShowPredResults(false)}
                    className="text-[10px] text-slate-400 underline w-full text-center mt-3 hover:text-white transition-colors"
                  >
                    Check Another Rank
                  </button>
               </div>
             )}
             
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </section>

        {/* --- 9. CONTACT & OFFICIAL INFO --- */}
        <section className="mb-8">
           <h2 className="text-xl font-black mb-5 flex items-center gap-2 px-1">
             <Building2 className="text-slate-400" size={24} />
             Contact & Location
           </h2>
           <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-start gap-4">
                 <MapPin size={20} className="text-slate-400 shrink-0 mt-0.5" />
                 <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                   {uni.address}
                 </p>
              </div>
              <div className="flex items-center gap-4">
                 <Phone size={20} className="text-slate-400 shrink-0" />
                 <a href={`tel:${uni.phone}`} className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary-teal transition-colors">{uni.phone}</a>
              </div>
              <div className="flex items-center gap-4">
                 <Mail size={20} className="text-slate-400 shrink-0" />
                 <a href={`mailto:${uni.email}`} className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary-teal break-all transition-colors">{uni.email}</a>
              </div>
           </div>
        </section>
      </div>

      {/* --- 10. STICKY ACTION BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 z-50 safe-pb shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <div className="max-w-3xl mx-auto flex items-center gap-3">
            {/* DIRECT LINK TO PHOTOS (TRIGGERS NEW MODAL) */}
            <button 
              onClick={() => setShowPhotoOptions(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold py-3.5 px-4 rounded-xl text-sm transition-all active:scale-95 whitespace-nowrap"
            >
              <ImageIcon size={18} />
              <span className="hidden sm:inline">Images of College</span>
              <span className="inline sm:hidden">Photos</span>
            </button>
            <a 
              href={uni.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-primary-teal hover:bg-teal-600 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-lg shadow-primary-teal/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Apply Now</span>
              <ExternalLink size={16} />
            </a>
            <button 
              onClick={toggleSave}
              className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all active:scale-90 flex-shrink-0 ${isSaved ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'}`}
            >
              <Heart size={24} className={isSaved ? "fill-current" : ""} />
            </button>
         </div>
      </div>

      {/* --- 11. PHOTO OPTIONS MODAL (NEW) --- */}
      <AnimatePresence>
        {showPhotoOptions && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[60]"
               onClick={() => setShowPhotoOptions(false)}
            />
            <motion.div 
               initial={{ y: "100%", scale: 0.95 }}
               animate={{ y: 0, scale: 1 }}
               exit={{ y: "100%", scale: 0.95 }}
               className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[60] bg-white dark:bg-slate-900 md:rounded-3xl rounded-t-[2rem] p-6 max-w-sm w-full mx-auto shadow-2xl"
            >
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">View Campus Photos</h3>
                    <p className="text-slate-500 text-xs mt-1">Select a source to view images</p>
                  </div>
                  <button onClick={() => setShowPhotoOptions(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                     <X size={20} />
                  </button>
               </div>

               <div className="space-y-3">
                  {/* OPTION 1: GOOGLE MAPS */}
                  <a 
                    href={mapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary-teal dark:hover:border-primary-teal transition-all group"
                    onClick={() => setShowPhotoOptions(false)}
                  >
                     <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-blue-500 shadow-sm shrink-0 border border-slate-100 dark:border-slate-600">
                        <MapPin size={24} />
                     </div>
                     <div className="flex-grow">
                        <div className="font-bold text-slate-800 dark:text-white group-hover:text-primary-teal transition-colors">Google Maps</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Best For: User Photos & 360</div>
                     </div>
                     <ExternalLink size={16} className="text-slate-300" />
                  </a>

                  {/* OPTION 2: WEB SEARCH */}
                  <a 
                    href={imagesUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-secondary-purple dark:hover:border-secondary-purple transition-all group"
                    onClick={() => setShowPhotoOptions(false)}
                  >
                     <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-secondary-purple shadow-sm shrink-0 border border-slate-100 dark:border-slate-600">
                        <Globe size={24} />
                     </div>
                     <div className="flex-grow">
                        <div className="font-bold text-slate-800 dark:text-white group-hover:text-secondary-purple transition-colors">Web Search</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Best For: Events & Gallery</div>
                     </div>
                     <ExternalLink size={16} className="text-slate-300" />
                  </a>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- 12. MAP SHEET (EXISTING) --- */}
      <AnimatePresence>
        {showImageSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowImageSheet(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-[60] bg-white dark:bg-slate-900 rounded-t-[2rem] overflow-hidden h-[85vh] flex flex-col shadow-2xl"
            >
              {/* Header with Title and VIEW CONTROLS */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-3 bg-white dark:bg-slate-900">
                 <div className="flex justify-between items-center">
                    <div>
                       <h3 className="font-bold text-lg leading-tight">{uni.name}</h3>
                       <p className="text-xs text-slate-500">View Campus & Location</p>
                    </div>
                    <button 
                      onClick={() => setShowImageSheet(false)}
                      className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <X size={20} />
                    </button>
                 </div>

                 {/* Multi-View Toggles */}
                 <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto no-scrollbar">
                    <button 
                      onClick={() => setMapViewMode('m')}
                      className={`flex-1 min-w-[80px] py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${mapViewMode === 'm' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                    >
                       <MapPin size={12} /> Map
                    </button>
                    <button 
                      onClick={() => setMapViewMode('k')}
                      className={`flex-1 min-w-[80px] py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${mapViewMode === 'k' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                    >
                       <Globe size={12} /> Satellite
                    </button>
                    <button 
                      onClick={() => setMapViewMode('street')}
                      className={`flex-1 min-w-[100px] py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${mapViewMode === 'street' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
                    >
                       <Footprints size={12} /> Street View
                    </button>
                 </div>
              </div>

              {/* Content */}
              <div className="flex-grow bg-slate-100 dark:bg-slate-950 relative">
                 <iframe 
                   src={embedMapsUrl}
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy"
                   title="Campus Map"
                   className="w-full h-full"
                 ></iframe>
                 
                 {/* Overlay Controls */}
                 <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-lg space-y-3">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">More Photo Sources</p>
                    <div className="flex gap-3">
                       <a 
                         href={mapsUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex-1 flex flex-col items-center justify-center gap-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                       >
                         <Camera size={20} className="mb-1" />
                         <span>User Photos</span>
                         <span className="text-[8px] opacity-70">Google Maps</span>
                       </a>
                       <a 
                         href={imagesUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex-1 flex flex-col items-center justify-center gap-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                       >
                         <Search size={20} className="mb-1" />
                         <span>Web Images</span>
                         <span className="text-[8px] opacity-70">Google Search</span>
                       </a>
                    </div>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UniversityDetailsPage;