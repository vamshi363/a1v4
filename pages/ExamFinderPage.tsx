
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, CheckCircle2, RotateCcw, GraduationCap, 
  DollarSign, MapPin, BrainCircuit, ShieldCheck, School, Sparkles, 
  Loader2, TrendingUp, AlertCircle, Compass, Play, BarChart3, Stethoscope, FlaskConical
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { exams } from '../data/exams';

interface QuizState {
  stream: string;
  comfort: string;
  budget: string;
  location: string;
  backup: string;
}

type QuizStatus = 'intro' | 'active' | 'analyzing' | 'results';

const ExamFinderPage: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<QuizStatus>('intro');
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizState>({
    stream: '',
    comfort: '',
    budget: '',
    location: '',
    backup: ''
  });

  const totalSteps = 5;

  const handleStart = () => {
    setStatus('active');
  };

  const handleAnswer = (key: keyof QuizState, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      setStatus('analyzing');
    }
  };

  // Simulate Analysis
  useEffect(() => {
    if (status === 'analyzing') {
      const timer = setTimeout(() => {
        setStatus('results');
      }, 2000); // Slightly faster for better UX
      return () => clearTimeout(timer);
    }
  }, [status]);

  // --- RECOMMENDATION LOGIC ---
  const results = useMemo(() => {
    if (status !== 'results') return { recommended: [], backups: [] };

    // 1. Precise Filtering based on Course Content
    // This fixes the issue where NEET (Government category) appeared in Engineering
    let filtered = exams.filter(e => {
      const courseStr = e.courses.join(' ').toLowerCase();
      const examName = e.name.toLowerCase();

      if (answers.stream === 'Engineering') {
        // Must contain engineering keywords or be strictly categorized
        return (courseStr.includes('b.tech') || courseStr.includes('b.e') || courseStr.includes('b.arch') || e.category === 'Private Engineering') && !courseStr.includes('mbbs');
      }
      if (answers.stream === 'Medical') {
        return courseStr.includes('mbbs') || courseStr.includes('bds') || courseStr.includes('ayush') || examName.includes('neet');
      }
      if (answers.stream === 'Management') {
        return e.category === 'Management' || courseStr.includes('mba') || courseStr.includes('pgdm');
      }
      if (answers.stream === 'Pharmacy') {
         return courseStr.includes('pharm') || courseStr.includes('agri');
      }
      return true;
    });

    // Fallback Logic
    const isFallback = filtered.length === 0;
    if (isFallback) {
      // If no specific match, show popular Engineering/Govt exams as safe default
      filtered = exams.filter(e => e.category === 'Government' || e.category === 'Private Engineering'); 
    }

    // 2. Advanced Scoring System
    const scoredExams = filtered.map(exam => {
      let score = 0;
      let maxScore = 25; // Increased max score for granular weighting
      let reasons: string[] = [];
      let tags: string[] = [];

      // A. Location Match (Weight: 8) - Critical for TS/AP context
      const isTS = exam.id.includes('ts') || exam.colleges.some(c => c.includes('Hyderabad') || c.includes('Osmania') || c.includes('JNTUH') || c.includes('Warangal'));
      const isAP = exam.id.includes('ap') || exam.colleges.some(c => c.includes('Andhra') || c.includes('Visakhapatnam') || c.includes('Tirupati'));
      const isNational = exam.level === 'National';

      if (answers.location === 'Telangana') {
        if (isTS) { score += 8; reasons.push('Top choice for Telangana students'); tags.push('Home State'); }
        else if (isNational) { score += 5; }
        else if (isAP) { score -= 3; } // Penalize AP exams for TS students slightly unless they want backup
      } else if (answers.location === 'Andhra Pradesh') {
         if (isAP) { score += 8; reasons.push('Top choice for Andhra students'); tags.push('Home State'); }
         else if (isNational) { score += 5; }
         else if (isTS) { score -= 3; }
      } else {
         score += 5; // Flexible location
      }

      // B. Difficulty / Comfort Match (Weight: 7)
      if (answers.comfort === 'Competitive') {
        if (exam.difficulty === 'Hard') { score += 7; reasons.push('Matches your competitive ambition'); tags.push('Top Tier'); }
        else if (exam.difficulty === 'Medium') { score += 4; }
        else { score += 2; }
      } else if (answers.comfort === 'Moderate') {
        if (exam.difficulty === 'Medium') { score += 7; reasons.push('Perfect difficulty balance'); tags.push('Balanced'); }
        else if (exam.difficulty === 'Hard') { score += 3; reasons.push('Ambitious but reachable'); }
        else { score += 5; tags.push('Safe Bet'); }
      } else if (answers.comfort === 'Easy') {
        if (exam.difficulty === 'Easy') { score += 7; reasons.push('Stress-free entry'); tags.push('Easy Entry'); }
        else if (exam.difficulty === 'Medium') { score += 4; }
        else { score -= 2; reasons.push('Might be too competitive'); }
      }

      // C. Budget Match (Weight: 5)
      if (answers.budget === 'Low') {
        if (exam.category === 'Government') { score += 5; tags.push('Govt Aided'); }
        else { score += 1; }
      } else if (answers.budget === 'Medium') {
        if (exam.category === 'Government') { score += 5; tags.push('High ROI'); }
        else if (exam.category === 'Private Engineering') { score += 4; }
      } else { // High
         score += 5; 
         if (exam.category === 'Private Engineering') tags.push('Premium Infra');
      }

      // D. Stream Specific Bonus (Weight: 5)
      // Boost EAMCET for Engineering/Medical/Agri as it covers all
      if (exam.id.includes('eamcet') || exam.id.includes('eapcet')) {
          score += 3; // General boost for state common entrance
      }

      // Calculate Percentage
      const matchPercentage = Math.min(Math.round((score / maxScore) * 100), 99);

      return { 
        ...exam, 
        score, 
        matchPercentage,
        matchReason: reasons[0] || 'Good fit for your profile',
        tags: tags.slice(0, 3), // Show max 3 tags
        isFallback
      };
    });

    // 3. Sort by Score descending
    scoredExams.sort((a, b) => b.score - a.score);

    return {
      recommended: scoredExams.slice(0, 3),
      backups: scoredExams.slice(3, 10),
      isFallback: isFallback
    };
  }, [status, answers]);


  // --- STEPS CONFIGURATION ---
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <QuestionStep 
            question="What is your primary study goal?"
            subtitle="We'll filter exams based on your career path."
            options={[
              { label: 'Engineering', sub: 'B.Tech / B.E. / B.Arch', value: 'Engineering', icon: <GraduationCap /> },
              { label: 'Medical', sub: 'MBBS / BDS / Ayush', value: 'Medical', icon: <Stethoscope /> },
              { label: 'Management', sub: 'MBA / PGDM', value: 'Management', icon: <DollarSign /> },
              { label: 'Pharmacy / Agri', sub: 'B.Pharm / B.Sc Agri', value: 'Pharmacy', icon: <FlaskConical /> },
            ]}
            onSelect={(val) => handleAnswer('stream', val)}
            currentStep={1} totalSteps={totalSteps}
          />
        );
      case 2:
        return (
          <QuestionStep 
            question="How do you handle competitive pressure?"
            subtitle="This matches exam difficulty to your preparation style."
            options={[
              { label: 'I love challenges', sub: 'Aiming for Top 1% (IITs/AIIMS)', value: 'Competitive', icon: <BrainCircuit /> },
              { label: 'Balanced approach', sub: 'Aiming for Best State Colleges', value: 'Moderate', icon: <TrendingUp /> },
              { label: 'Play it safe', sub: 'Direct admission / Easier entry', value: 'Easy', icon: <ShieldCheck /> },
            ]}
            onSelect={(val) => handleAnswer('comfort', val)}
            currentStep={2} totalSteps={totalSteps}
          />
        );
      case 3:
        return (
          <QuestionStep 
            question="What is your annual tuition budget?"
            subtitle="To find colleges that fit your finances."
            options={[
              { label: '< ₹1 Lakh', sub: 'Govt Reimbursement / Affordable', value: 'Low' },
              { label: '₹1 Lakh - ₹3 Lakhs', sub: 'Standard Private Colleges', value: 'Medium' },
              { label: '> ₹3 Lakhs', sub: 'Premium Universities', value: 'High' },
            ]}
            onSelect={(val) => handleAnswer('budget', val)}
            currentStep={3} totalSteps={totalSteps}
          />
        );
      case 4:
        return (
          <QuestionStep 
            question="Where is your preferred location?"
            subtitle="We prioritize exams that have seats in your state."
            options={[
              { label: 'Telangana', sub: 'Hyderabad & Districts', value: 'Telangana' },
              { label: 'Andhra Pradesh', sub: 'Vizag, Vijayawada, etc.', value: 'Andhra Pradesh' },
              { label: 'Anywhere in India', sub: 'Open to relocating', value: 'India' },
            ]}
            onSelect={(val) => handleAnswer('location', val)}
            currentStep={4} totalSteps={totalSteps}
          />
        );
      case 5:
        return (
          <QuestionStep 
            question="Do you want backup options?"
            subtitle="Safety nets in case your main goal doesn't work out."
            options={[
              { label: 'Yes, show me safe backups', value: 'Yes' },
              { label: 'No, only top targets', value: 'No' },
            ]}
            onSelect={(val) => handleAnswer('backup', val)}
            currentStep={5} totalSteps={totalSteps}
          />
        );
      default:
        return null;
    }
  };

  if (status === 'intro') {
     return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
           {/* Decor */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-primary-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-purple/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

           <div className="relative z-10 max-w-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-teal to-teal-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl shadow-teal-500/30 transform rotate-3">
                 <Compass size={40} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
                 Find Your Perfect <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-teal to-secondary-purple">Exam Path</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                 Confused by EAMCET, JEE, NEET? Answer 5 simple questions and our AI-driven tool will recommend the best entrance exams tailored to your profile.
              </p>
              
              <div className="flex flex-col gap-4">
                 <button 
                   onClick={handleStart}
                   className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                 >
                    <Play size={20} fill="currentColor" /> Start Quiz
                 </button>
                 <button onClick={() => navigate(-1)} className="text-slate-400 font-bold text-sm hover:text-slate-600">
                    Go Back
                 </button>
              </div>

              <div className="mt-12 flex justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                 <div className="flex items-center gap-1"><CheckCircle2 size={14} /> Free to use</div>
                 <div className="flex items-center gap-1"><CheckCircle2 size={14} /> No Sign-up</div>
              </div>
           </div>
        </div>
     )
  }

  if (status === 'analyzing') {
    return (
       <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-8">
             <div className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
             <div className="w-24 h-24 rounded-full border-4 border-primary-teal border-t-transparent animate-spin absolute top-0 left-0"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit className="text-secondary-purple animate-pulse" size={32} />
             </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 animate-pulse">Analyzing your profile...</h2>
          <p className="text-slate-500">Matching against 50+ exams and location preferences</p>
       </div>
    )
  }

  if (status === 'results') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
        <div className="bg-primary-teal p-8 pb-20 rounded-b-[3rem] text-center text-white relative overflow-hidden">
           <div className="relative z-10">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
                <Sparkles size={12} /> Analysis Complete
             </div>
             <h1 className="text-3xl font-black mb-2">Your Exam Roadmap</h1>
             <p className="opacity-90 max-w-md mx-auto">
               {results.isFallback 
                 ? `We couldn't find exact matches for ${answers.stream}, but here are the most popular options.` 
                 : `Curated for a student from ${answers.location} aiming for ${answers.stream}.`}
             </p>
           </div>
           {/* Background Pattern */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="max-w-xl mx-auto px-4 -mt-12 relative z-20 space-y-6">
          
          {/* Top Recommendations */}
          {results.recommended.length > 0 ? (
            results.recommended.map((exam, idx) => (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.15 }}
                 key={exam.id} 
                 className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden relative"
               >
                  {idx === 0 && (
                     <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-sm">
                        #1 Top Match
                     </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <h3 className="text-xl font-black text-slate-900 dark:text-white">{exam.name}</h3>
                           <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                              <BarChart3 size={12} /> {exam.matchPercentage}% Match
                           </div>
                        </div>
                        <p className="text-xs text-slate-400">{exam.fullName}</p>
                     </div>
                  </div>

                  {/* Dynamic Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                     {exam.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md">
                           {tag}
                        </span>
                     ))}
                     <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${exam.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        {exam.difficulty}
                     </span>
                  </div>
                  
                  {/* AI Reason */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl mb-5 border border-slate-100 dark:border-slate-700">
                     <div className="flex items-start gap-3">
                        <Sparkles size={16} className="text-secondary-purple shrink-0 mt-0.5" />
                        <div>
                           <span className="text-xs font-bold text-secondary-purple uppercase tracking-wide block mb-0.5">Why this fits you</span>
                           <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                              {exam.matchReason}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="flex gap-3">
                     <Link to={`/exams/${exam.id}`} className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3.5 rounded-xl font-bold text-sm text-center shadow-lg hover:scale-[1.02] transition-transform">
                        View Exam Details
                     </Link>
                     <Link to={`/universities?q=${encodeURIComponent(exam.name)}`} className="px-4 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                        Colleges
                     </Link>
                  </div>
               </motion.div>
            ))
          ) : (
             <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl text-center shadow-lg">
                <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="font-bold text-lg mb-2">No direct matches found</h3>
                <p className="text-slate-500 mb-6">Your criteria might be too specific. Try broadening your location or budget preferences.</p>
                <button 
                  onClick={() => { setStep(1); setStatus('active'); }}
                  className="bg-primary-teal text-white px-6 py-3 rounded-xl font-bold"
                >
                   Adjust Filters
                </button>
             </div>
          )}

          {/* Backup Options Section */}
          {answers.backup === 'Yes' && results.backups.length > 0 && (
            <div className="pt-4">
               <h3 className="font-bold text-slate-400 uppercase tracking-widest text-center text-xs mb-4">Good Safety Options</h3>
               <div className="space-y-3">
                 {results.backups.map(exam => (
                   <Link to={`/exams/${exam.id}`} key={exam.id} className="block bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center hover:border-slate-300 transition-colors shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs">
                           {exam.name[0]}
                        </div>
                        <div>
                           <div className="font-bold text-sm">{exam.name}</div>
                           <div className="text-[10px] text-slate-500">{exam.difficulty} Difficulty</div>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                   </Link>
                 ))}
               </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex gap-4 pt-6">
             <button 
               onClick={() => { setStep(1); setStatus('active'); setAnswers({ stream: '', comfort: '', budget: '', location: '', backup: '' }); }}
               className="flex-1 py-4 text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:text-slate-600"
             >
               <RotateCcw size={16} /> Retake Quiz
             </button>
             <Link to="/help" className="flex-1 py-4 text-primary-teal font-bold text-sm flex items-center justify-center gap-2 hover:text-teal-700">
               Ask AI for More Help
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
       {/* Progress Bar */}
       <div className="h-1.5 bg-slate-100 dark:bg-slate-800 w-full fixed top-0 left-0 z-50">
         <motion.div 
           className="h-full bg-gradient-to-r from-primary-teal to-secondary-purple"
           initial={{ width: 0 }}
           animate={{ width: `${(step / totalSteps) * 100}%` }}
           transition={{ duration: 0.5 }}
         />
       </div>

       {/* Top Nav */}
       <div className="p-4 pt-6 flex justify-between items-center">
         <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-600 font-bold text-sm flex items-center">
            Close
         </button>
         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full">
            Question {step}/{totalSteps}
         </span>
       </div>

       {/* Question Area */}
       <div className="flex-grow flex items-center justify-center p-6 pb-20">
          <AnimatePresence mode="wait">
             {renderStep()}
          </AnimatePresence>
       </div>
    </div>
  );
};

// Reusable Question Component
const QuestionStep: React.FC<{ 
  question: string, 
  subtitle: string,
  options: { label: string, sub?: string, value: string, icon?: React.ReactNode }[], 
  onSelect: (val: string) => void,
  currentStep: number,
  totalSteps: number
}> = ({ question, subtitle, options, onSelect }) => (
  <motion.div 
    key={question}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="w-full max-w-md"
  >
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3 leading-tight">
        {question}
      </h2>
      <p className="text-slate-500 text-lg font-medium">{subtitle}</p>
    </div>

    <div className="space-y-3">
      {options.map((opt, idx) => (
        <motion.button
          key={opt.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(241, 245, 249, 0.8)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(opt.value)}
          className="w-full p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary-teal dark:hover:border-primary-teal text-left flex items-center gap-4 transition-all shadow-sm group"
        >
          {opt.icon && (
            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary-teal group-hover:text-white transition-colors shrink-0">
               {React.cloneElement(opt.icon as React.ReactElement, { size: 20 })}
            </div>
          )}
          <div className="flex-grow">
             <div className="font-bold text-lg text-slate-800 dark:text-slate-200 group-hover:text-primary-teal transition-colors">{opt.label}</div>
             {opt.sub && <div className="text-xs font-semibold text-slate-400 mt-0.5">{opt.sub}</div>}
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-primary-teal group-hover:bg-primary-teal group-hover:text-white transition-all">
             <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
          </div>
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default ExamFinderPage;
