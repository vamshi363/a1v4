
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { universities } from '../data/universities';
import { Search, Filter, X, ChevronDown, Check, Info, ArrowRight, Loader2, Scale } from 'lucide-react';
import { UniversityCard } from '../components/UniversityCard';
import { motion, AnimatePresence } from 'framer-motion';

// Sub-component for filter buttons
const FilterOption: React.FC<{ label: string, isActive: boolean, onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-3 rounded-xl text-sm font-bold border-2 transition-all ${isActive ? 'border-secondary-purple bg-secondary-purple/10 text-secondary-purple' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'}`}
  >
    {label}
  </button>
);

const HeartIcon = () => (
  <svg className="w-3 h-3 inline-block mx-1 text-red-500 fill-current" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const UniversitiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  
  // Mobile Filter State
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [filterState, setFilterState] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStream, setFilterStream] = useState('All');

  // Pagination & Saved Items
  const [visibleCount, setVisibleCount] = useState(10);
  const [savedUniversities, setSavedUniversities] = useState<string[]>([]);

  // Init from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      if (['Engineering', 'Medicine', 'Law'].includes(q)) {
        setFilterStream(q);
      } else {
        setSearch(q);
      }
    }
  }, [searchParams]);

  // Load saved from local storage (mock for now)
  useEffect(() => {
    const saved = localStorage.getItem('tsap_saved_unis');
    if (saved) setSavedUniversities(JSON.parse(saved));
  }, []);

  const toggleSave = (id: string) => {
    const newSaved = savedUniversities.includes(id) 
      ? savedUniversities.filter(sid => sid !== id)
      : [...savedUniversities, id];
    
    setSavedUniversities(newSaved);
    localStorage.setItem('tsap_saved_unis', JSON.stringify(newSaved));
    // Dispatch event for bottom nav badge
    window.dispatchEvent(new Event('favorites-updated'));
  };

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const searchLower = search.toLowerCase();
      // Enhanced Search Logic: Check name, location, and especially EXAM ELIGIBILITY
      const matchesSearch = 
        uni.name.toLowerCase().includes(searchLower) || 
        uni.city.toLowerCase().includes(searchLower) ||
        uni.district.toLowerCase().includes(searchLower) ||
        uni.courses.some(c => c.eligibility.toLowerCase().includes(searchLower)); 

      const matchesState = filterState === 'All' || uni.state === filterState;
      const matchesType = filterType === 'All' || uni.type === filterType;
      
      let matchesStream = true;
      if (filterStream === 'Engineering') {
        matchesStream = uni.courses.some(c => c.name.includes('B.Tech') || c.name.includes('B.E'));
      }
      return matchesSearch && matchesState && matchesType && matchesStream;
    });
  }, [search, filterState, filterType, filterStream]);

  // Helper to render content with ads interspersed
  const renderContentWithAds = () => {
    const items = [];
    const visibleList = filteredUniversities.slice(0, visibleCount);

    visibleList.forEach((uni, index) => {
      items.push(
        <UniversityCard 
          key={uni.id}
          uni={uni} 
          isSaved={savedUniversities.includes(uni.id)}
          onToggleSave={toggleSave}
        />
      );
      
      // Native Ad Placeholder every 5 items
      if ((index + 1) % 5 === 0 && index !== visibleList.length - 1) {
        items.push(
          <div key={`ad-${index}`} className="col-span-1 md:col-span-2 lg:col-span-3 w-full bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-center my-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">Advertisement</span>
            <div className="w-full h-40 bg-white dark:bg-slate-800 rounded-xl mb-4 flex items-center justify-center shadow-inner relative overflow-hidden">
               <span className="text-slate-400 text-xs font-medium z-10 relative">Sponsored Ad</span>
               <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-100 dark:to-slate-900/50 opacity-50"></div>
            </div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1 text-sm">Featured Opportunity</h4>
          </div>
        );
      }
    });
    return items;
  };

  const activeFilterCount = [filterState, filterType, filterStream].filter(f => f !== 'All').length;

  const clearFilters = () => {
    setFilterState('All');
    setFilterType('All');
    setFilterStream('All');
  };

  return (
    <div className="min-h-screen pb-32">
      {/* 1. Header & Search Area */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search colleges, exams (e.g. EAMCET)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-teal/20 focus:outline-none transition-all text-base font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilterSheet(true)}
              className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl transition-all ${activeFilterCount > 0 ? 'bg-secondary-purple text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}
            >
              <Filter size={20} />
              {activeFilterCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950">{activeFilterCount}</span>}
            </button>
          </div>

          {/* Active Chips Row */}
          <AnimatePresence>
            {activeFilterCount > 0 && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1"
              >
                {filterState !== 'All' && (
                  <button onClick={() => setFilterState('All')} className="flex items-center space-x-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold whitespace-nowrap">
                    <span>{filterState}</span> <X size={12} />
                  </button>
                )}
                {filterType !== 'All' && (
                  <button onClick={() => setFilterType('All')} className="flex items-center space-x-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold whitespace-nowrap">
                    <span>{filterType}</span> <X size={12} />
                  </button>
                )}
                {filterStream !== 'All' && (
                  <button onClick={() => setFilterStream('All')} className="flex items-center space-x-1 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold whitespace-nowrap">
                    <span>{filterStream}</span> <X size={12} />
                  </button>
                )}
                <button onClick={clearFilters} className="px-3 py-1.5 text-slate-500 text-xs font-bold whitespace-nowrap underline decoration-dashed">
                  Clear All
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Guidance Strip */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-800/50">
         <div className="max-w-3xl mx-auto px-4 py-3 flex items-start gap-3">
            <Info size={16} className="text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs font-medium text-amber-800 dark:text-amber-400 leading-snug">
               <span className="font-bold">Pro Tip:</span> Tap the heart icon <HeartIcon /> to save colleges. Compare up to 3 colleges side-by-side.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
         {filteredUniversities.length > 0 && (
           <div className="mb-6">
             <h1 className="text-xl font-black mb-1">
               {filteredUniversities.length} Universities Found
             </h1>
             <p className="text-sm text-slate-500">Showing top results in Telangana & AP</p>
           </div>
         )}

        {/* 3. University List - Grid or Empty State */}
        {filteredUniversities.length === 0 ? (
          <div className="col-span-1 md:col-span-3 py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm mt-4">
             <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Search size={32} className="text-slate-400" />
             </div>
             <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">No colleges found</h3>
             <p className="text-slate-500 mb-8 max-w-sm mx-auto">We couldn't find any colleges matching "<span className="font-bold">{search}</span>" in our verified database.</p>
             <button 
               onClick={() => { setSearch(''); clearFilters(); }}
               className="px-8 py-4 bg-primary-teal text-white rounded-2xl font-bold hover:bg-teal-600 transition-colors shadow-lg active:scale-95"
             >
               Show All Colleges
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {renderContentWithAds()}
          </div>
        )}

        {/* 4. Load More / End of List */}
        {filteredUniversities.length > 0 && (
          <div className="mt-10 mb-8 text-center col-span-1 md:col-span-2 lg:col-span-3">
             {visibleCount < filteredUniversities.length ? (
               <button 
                 onClick={() => setVisibleCount(prev => prev + 10)}
                 className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
               >
                 <span>Load More Colleges</span>
                 <ChevronDown size={18} />
               </button>
             ) : (
               <p className="text-slate-400 text-sm font-medium italic">You've reached the end of the list</p>
             )}
          </div>
        )}
      </div>

      {/* 5. Compare Banner (Floating) */}
      <AnimatePresence>
        {savedUniversities.length >= 2 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-20 md:bottom-0 left-0 right-0 z-40 p-4"
          >
            <div className="max-w-3xl mx-auto bg-slate-900 text-white p-4 rounded-3xl shadow-2xl shadow-slate-900/50 flex items-center justify-center border border-slate-800 relative overflow-hidden">
               {/* Background Pattern */}
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900 to-slate-800 z-0"></div>
               
               <div className="relative z-10 flex items-center justify-between w-full">
                 <div className="flex items-center gap-3 pl-2">
                    <div className="bg-primary-teal p-2.5 rounded-xl text-white shadow-lg">
                      <Scale size={22} />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{savedUniversities.length} Colleges Saved</div>
                      <div className="text-xs text-slate-400 font-medium">Ready to compare side-by-side?</div>
                    </div>
                 </div>
                 <Link 
                   to={`/compare?ids=${savedUniversities.slice(0,3).join(',')}`}
                   className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-md active:scale-95"
                 >
                   Compare <ArrowRight size={14} />
                 </Link>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Filter Bottom Sheet */}
      <AnimatePresence>
        {showFilterSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterSheet(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 bg-white dark:bg-slate-900 rounded-t-[2rem] z-50 overflow-hidden max-h-[85vh] flex flex-col shadow-2xl"
            >
              <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
                 <h2 className="text-xl font-black">Filter Colleges</h2>
                 <button onClick={() => setShowFilterSheet(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition-colors">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="overflow-y-auto p-6 space-y-8 pb-32">
                 {/* State Filter */}
                 <section>
                    <h3 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary-teal rounded-full"></div> State
                    </h3>
                    <div className="flex flex-wrap gap-3">
                       {['All', 'Telangana', 'Andhra Pradesh'].map(opt => (
                         <FilterOption 
                           key={opt} 
                           label={opt} 
                           isActive={filterState === opt} 
                           onClick={() => setFilterState(opt)} 
                         />
                       ))}
                    </div>
                 </section>

                 {/* Type Filter */}
                 <section>
                    <h3 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-1 h-4 bg-secondary-purple rounded-full"></div> Institute Type
                    </h3>
                    <div className="flex flex-wrap gap-3">
                       {['All', 'Government', 'Private', 'Deemed', 'Autonomous'].map(opt => (
                         <FilterOption 
                           key={opt} 
                           label={opt} 
                           isActive={filterType === opt} 
                           onClick={() => setFilterType(opt)} 
                         />
                       ))}
                    </div>
                 </section>

                 {/* Stream Filter */}
                 <section>
                    <h3 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-1 h-4 bg-blue-500 rounded-full"></div> Stream
                    </h3>
                    <div className="flex flex-wrap gap-3">
                       {['All', 'Engineering', 'Medicine', 'Pharmacy', 'Law'].map(opt => (
                         <FilterOption 
                           key={opt} 
                           label={opt} 
                           isActive={filterStream === opt} 
                           onClick={() => setFilterStream(opt)} 
                         />
                       ))}
                    </div>
                 </section>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 absolute bottom-0 left-0 right-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                 <button 
                   onClick={() => setShowFilterSheet(false)}
                   className="w-full py-4 bg-primary-teal text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary-teal/20 active:scale-95 transition-transform"
                 >
                   Apply Filters
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UniversitiesPage;
