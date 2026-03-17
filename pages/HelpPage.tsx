import React from 'react';
import { Bot, Home, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col min-h-[80vh]">
      {/* Header - Kept for context */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-primary-teal p-3 rounded-2xl text-white shadow-lg">
          <Bot size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">AI Education Advisor</h1>
          <p className="text-slate-500">Your personal guide to admissions and scholarships.</p>
        </div>
      </div>

      {/* Main Content Area - Replaced Chat with Coming Soon */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col items-center justify-center p-8 md:p-16 text-center relative"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8 border-4 border-white dark:border-slate-700 shadow-lg">
               <Sparkles size={40} className="text-secondary-purple" />
            </div>

            {/* Main Text */}
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-teal to-secondary-purple leading-tight">
              Coming Soon
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-12 leading-relaxed">
              We are upgrading our AI Advisor to provide even more accurate admission predictions, real-time scholarship matching, and personalized career roadmaps.
            </p>

            {/* SPONSORED ADVERTISEMENT SECTION */}
            <div className="w-full mb-12">
               <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-slate-300 transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-3 py-1 rounded mb-4">
                    Sponsored Advertisement
                  </span>
                  <div className="text-center">
                    <h3 className="text-slate-400 font-bold text-sm">Ad Space Available</h3>
                    <p className="text-slate-400/60 text-xs mt-1">Reach thousands of students daily</p>
                  </div>
               </div>
            </div>

            {/* Return Action */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <Home size={20} />
              <span>Return to Home</span>
            </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default HelpPage;