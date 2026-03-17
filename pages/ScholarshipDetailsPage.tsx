import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { scholarships } from '../data/scholarships';
import { Award, ChevronRight, Globe, FileText, CheckCircle2, Info, AlertCircle, Calendar, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ScholarshipDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const scholar = scholarships.find(s => s.id === id);

  if (!scholar) return <div className="p-20 text-center">Scholarship not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/scholarships" className="inline-flex items-center text-primary-teal font-bold mb-8 hover:underline">
        <ArrowLeft size={18} className="mr-2" /> Back to Scholarships
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 shadow-xl"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start mb-10 pb-10 border-b dark:border-slate-800">
          <div className="w-24 h-24 bg-secondary-purple text-white rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg shadow-secondary-purple/30">
            <Award size={48} />
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
               {/* PROMINENT DATA SOURCE DISPLAY */}
               <div className="inline-flex items-center space-x-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Data Source: {scholar.dataSource}</span>
               </div>
              <span className="bg-secondary-purple/10 text-secondary-purple px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{scholar.type}</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Verified 2025</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{scholar.name}</h1>
            <div className="flex items-center text-slate-500 font-medium">
              <Info size={16} className="mr-2 text-secondary-purple" /> {scholar.provider}
            </div>
          </div>
        </div>

        {/* ADVERTISEMENT PLACEHOLDER */}
        <div className="w-full h-24 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center mb-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advertisement</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center"><CheckCircle2 size={20} className="mr-2 text-primary-teal" /> Eligibility Criteria</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">{scholar.eligibility}</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center"><FileText size={20} className="mr-2 text-primary-teal" /> Required Documents</h3>
              <ul className="grid grid-cols-1 gap-3">
                {scholar.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-sm p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-primary-teal/50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary-teal"></div>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <h3 className="text-lg font-bold mb-6">Application Summary</h3>
               <div className="space-y-6">
                 <div>
                   <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Last Date to Apply</span>
                   <div className="flex items-center text-red-400 font-bold"><Calendar size={18} className="mr-2" /> {scholar.deadline}</div>
                 </div>
                 <div>
                   <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Scholarship Amount</span>
                   <div className="flex items-center text-primary-teal font-bold text-xl">{scholar.amount}</div>
                 </div>
                 <a 
                   href={scholar.applyLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block w-full text-center py-4 bg-primary-teal hover:bg-teal-600 rounded-2xl font-bold transition-all shadow-lg"
                 >
                   Open Official Portal
                 </a>
               </div>
               <div className="absolute -bottom-6 -right-6 text-white/5 transform rotate-12">
                 <Globe size={150} />
               </div>
            </section>

            <div className="p-6 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-[2rem] flex items-start space-x-4">
              <AlertCircle className="text-orange-500 shrink-0 mt-1" size={24} />
              <div className="text-sm">
                <p className="font-bold text-orange-800 dark:text-orange-400 mb-1">Official Site Only!</p>
                <p className="text-orange-700/80 dark:text-orange-500/80">Never pay any processing fees to agents. Scholarships on this portal are applied for through government or official trust websites for free.</p>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-lg font-bold mb-4">Description</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{scholar.description}</p>
        </section>
      </motion.div>
    </div>
  );
};

export default ScholarshipDetailsPage;