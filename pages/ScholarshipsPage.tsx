
import React, { useState, useMemo } from 'react';
import { scholarships } from '../data/scholarships';
import { Search, Award, Calendar, CheckCircle2, ChevronRight, Filter, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ScholarshipsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                           s.provider.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === 'All' || s.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [search, filterType]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Educational Scholarships</h1>
        <p className="text-slate-500 max-w-2xl">Browse verified State, Central and Private scholarships for students of Telangana and Andhra Pradesh.</p>
      </div>

      {/* Search and Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by scholarship name or provider..."
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-secondary-purple/20 focus:outline-none transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:col-span-2 overflow-x-auto pb-2 md:pb-0">
          {(['All', 'State', 'Central', 'Private'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`flex-grow px-4 py-4 rounded-2xl font-bold transition-all border whitespace-nowrap ${filterType === type ? 'bg-secondary-purple text-white border-secondary-purple shadow-lg' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-secondary-purple/50'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredScholarships.map((scholar, idx) => (
          <React.Fragment key={scholar.id}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-secondary-purple/10 text-secondary-purple rounded-2xl flex items-center justify-center group-hover:bg-secondary-purple group-hover:text-white transition-colors duration-500">
                  <Award size={28} />
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${scholar.type === 'State' ? 'bg-green-100 text-green-700' : scholar.type === 'Central' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                  {scholar.type}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-secondary-purple transition-colors leading-tight">{scholar.name}</h3>
              <p className="text-sm text-slate-500 mb-6 flex-grow">{scholar.eligibility.substring(0, 100)}...</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <Calendar size={14} className="mr-2 text-red-500" /> Deadline: {scholar.deadline}
                </div>
                <div className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <IndianRupee size={14} className="mr-2 text-green-500" /> Amount: {scholar.amount}
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={`/scholarships/${scholar.id}`} className="flex-grow py-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl font-bold text-center transition-all">
                  Details
                </Link>
                <a href={scholar.applyLink} target="_blank" rel="noopener noreferrer" className="flex-grow py-4 bg-secondary-purple hover:bg-purple-700 text-white rounded-2xl font-bold text-center transition-all shadow-md">
                  Apply Now
                </a>
              </div>
            </motion.div>

            {/* Injected AdSense Placeholder every 3 items */}
            {(idx + 1) % 3 === 0 && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-4 flex justify-center">
                 <div className="w-full max-w-2xl h-32 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-300">
                    <span className="text-[10px] font-bold bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded uppercase tracking-widest mb-2 text-slate-400">Advertisement</span>
                    <span className="text-xs">Sponsored Content</span>
                 </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
          <Search size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Scholarships Found</h2>
          <p className="text-slate-500">Try changing your search terms or filtering by a different type.</p>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Stay Alert for Official Deadlines!</h2>
            <p className="text-slate-400 mb-8">Most state scholarships (ePASS) usually open their portals during the start of the academic year. Ensure your income and caste certificates are updated to avoid last-minute rush.</p>
            <div className="space-y-4">
              {['Always apply through official portals', 'Never share your OTP/Passwords', 'Prepare digital copies of documents', 'Check eligibility criteria thoroughly'].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-sm">
                  <CheckCircle2 size={18} className="text-primary-teal" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md">
            <h4 className="font-bold mb-4 text-primary-teal uppercase tracking-widest text-xs">AI Assistance Available</h4>
            <p className="text-sm mb-6">Not sure which scholarship you're eligible for? Our AI Advisor can analyze your profile.</p>
            <Link to="/help" className="block text-center py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all">Try AI Matcher</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsPage;
