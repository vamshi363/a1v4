
import React, { useState, useEffect } from 'react';
import { 
  Calculator, TrendingUp, Search, Info, CheckCircle2, 
  School, Bookmark, Trash2, ArrowRight, Calendar, 
  Banknote, Scale, X, FileText, ClipboardList, 
  Clock, Plus, Save, Filter, MapPin, Compass
} from 'lucide-react';
import { universities } from '../data/universities';
import { scholarships } from '../data/scholarships';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UniversityCard } from '../components/UniversityCard';

// Types for Application Tracker
interface Application {
  id: string;
  name: string;
  type: 'University' | 'Scholarship' | 'Exam';
  status: 'To Do' | 'Applied' | 'Pending' | 'Accepted' | 'Rejected';
  deadline?: string;
  notes?: string;
}

const ToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'cutoff' | 'fee' | 'calendar' | 'roi' | 'compare' | 'checklist' | 'scholarship-check' | 'tracker'>('cutoff');
  
  // --- CUTOFF PREDICTOR STATE ---
  const [cutoffExam, setCutoffExam] = useState('TS EAMCET');
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('OC');
  const [gender, setGender] = useState('Male');
  const [branch, setBranch] = useState('CSE');
  const [results, setResults] = useState<{uni: typeof universities[0], probability: string, color: string}[]>([]);

  // --- FEE ESTIMATOR STATE ---
  const [selectedUni, setSelectedUni] = useState('');
  const [needHostel, setNeedHostel] = useState(false);

  // --- ROI CALCULATOR STATE ---
  const [roiFee, setRoiFee] = useState('');
  const [roiSalary, setRoiSalary] = useState('');
  const [roiYears, setRoiYears] = useState<string | null>(null);

  // --- COMPARE STATE ---
  const [compareList, setCompareList] = useState<string[]>([]);
  const [compareSearch, setCompareSearch] = useState('');

  // --- CHECKLIST STATE ---
  const [checklistType, setChecklistType] = useState('TS EAMCET Counseling');
  const [checklistCategory, setChecklistCategory] = useState('OC');

  // --- SCHOLARSHIP CHECKER STATE ---
  const [scholState, setScholState] = useState('Telangana');
  const [scholIncome, setScholIncome] = useState('150000'); // < 1.5L
  const [scholCategory, setScholCategory] = useState('BC');
  const [scholResults, setScholResults] = useState<typeof scholarships>([]);

  // --- APPLICATION TRACKER STATE ---
  const [applications, setApplications] = useState<Application[]>([]);
  const [newApp, setNewApp] = useState({ name: '', type: 'University', status: 'To Do' });
  const [showAddApp, setShowAddApp] = useState(false);

  // --- INITIALIZATION ---
  useEffect(() => {
    // Load tracker data
    const savedApps = localStorage.getItem('tsap_applications');
    if (savedApps) {
      setApplications(JSON.parse(savedApps));
    }
  }, []);

  useEffect(() => {
    // Save tracker data
    localStorage.setItem('tsap_applications', JSON.stringify(applications));
  }, [applications]);

  // --- HANDLERS ---

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const rankNum = parseInt(rank);
    if (!rankNum) return;
    
    // Sophisticated Logic Simulation
    const predictedResults = universities.filter(u => {
       // 1. Exam/State Filter
       if (cutoffExam.includes('TS') && u.state !== 'Telangana') return false;
       if (cutoffExam.includes('AP') && u.state !== 'Andhra Pradesh') return false;
       
       // 2. Course Availability Check
       const hasBranch = ['CSE', 'ECE', 'EEE', 'MEC'].includes(branch) 
         ? u.courses.some(c => c.name.includes('B.Tech') || c.name.includes('B.E'))
         : true;
       if (!hasBranch) return false;

       return true;
    }).map(u => {
       const baseCutoff = u.cutoffs[0]?.rank || 40000;
       
       // Multipliers for Logic
       let multiplier = 1.0;
       
       // Category
       if (category === 'BC') multiplier += 0.5;
       if (category === 'SC') multiplier += 2.0;
       if (category === 'ST') multiplier += 2.5;

       // Branch Difficulty
       if (branch === 'CSE') multiplier *= 1.0;
       else if (branch === 'ECE') multiplier *= 1.3;
       else if (branch === 'EEE') multiplier *= 2.0;
       else multiplier *= 3.0;

       // Gender
       if (gender === 'Female') multiplier += 0.2; // slight edge in many colleges

       const adjustedCutoff = baseCutoff * multiplier;
       
       // Determine Probability
       let probability = 'Low';
       let color = 'bg-red-100 text-red-700 border-red-200';

       if (rankNum < adjustedCutoff * 0.7) {
         probability = 'Very High';
         color = 'bg-green-100 text-green-700 border-green-200';
       } else if (rankNum < adjustedCutoff) {
         probability = 'High';
         color = 'bg-emerald-100 text-emerald-700 border-emerald-200';
       } else if (rankNum < adjustedCutoff * 1.2) {
         probability = 'Borderline';
         color = 'bg-amber-100 text-amber-700 border-amber-200';
       }

       return { uni: u, probability, color, rawLimit: adjustedCutoff };
    }).filter(item => {
       // Filter out "Low" probability to keep list clean, or keep them for realism
       // Let's keep Borderline and better for relevance, unless list is empty
       return rankNum < item.rawLimit * 1.5; 
    }).sort((a,b) => (a.probability === 'Very High' ? -1 : 1)); // Sort best matches first

    setResults(predictedResults);
  };

  const calculateROI = (e: React.FormEvent) => {
    e.preventDefault();
    const fee = parseFloat(roiFee);
    const salary = parseFloat(roiSalary);
    if (fee && salary) {
      const years = fee / salary;
      setRoiYears(years.toFixed(1));
    }
  };

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(c => c !== id));
    } else {
      if (compareList.length < 2) {
        setCompareList([...compareList, id]);
      }
    }
  };

  const handleCheckScholarship = () => {
    const incomeNum = parseInt(scholIncome);
    const eligible = scholarships.filter(s => {
      // State Filter
      if (s.type === 'State') {
        if (scholState === 'Telangana' && !s.provider.includes('Telangana')) return false;
        if (scholState === 'Andhra Pradesh' && !s.provider.includes('Andhra')) return false;
      }
      
      // Rough Income Filter (Indicative)
      const incomeLimit = s.eligibility.match(/₹([\d.]+) Lakh/);
      if (incomeLimit && incomeNum > parseFloat(incomeLimit[1]) * 100000) return false;

      return true;
    });
    setScholResults(eligible);
  };

  const addApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApp.name) return;
    const app: Application = {
      id: Date.now().toString(),
      name: newApp.name,
      type: newApp.type as any,
      status: newApp.status as any,
      deadline: new Date().toISOString().split('T')[0]
    };
    setApplications([...applications, app]);
    setNewApp({ name: '', type: 'University', status: 'To Do' });
    setShowAddApp(false);
  };

  const deleteApplication = (id: string) => {
    setApplications(applications.filter(a => a.id !== id));
  };

  const updateAppStatus = (id: string, status: string) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status: status as any } : a));
  };

  const getChecklist = () => {
     const baseDocs = [
       'Aadhar Card',
       'S.S.C / 10th Marks Memo',
       'Intermediate / 12th Marks Memo',
       'Study Certificates (6th to Inter)',
       'Transfer Certificate (TC)',
       'Passport Size Photos (4-6)'
     ];
     
     if (checklistCategory !== 'OC') {
       baseDocs.push('Caste Certificate (MeeSeva)');
     }

     if (checklistType.includes('Counseling')) {
       baseDocs.push('Rank Card');
       baseDocs.push('Hall Ticket');
       baseDocs.push('Income Certificate (Latest)');
       if (checklistCategory === 'OC') baseDocs.push('EWS Certificate (if applicable)');
       baseDocs.push('Residence Certificate (Non-Local candidates)');
     } else if (checklistType.includes('Scholarship')) {
       baseDocs.push('Bank Passbook (Front Page)');
       baseDocs.push('Bonafide / Admission Certificate');
       baseDocs.push('Income Certificate (Original)');
       baseDocs.push('Allotment Order');
       baseDocs.push('Attendance Certificate (for renewal)');
     }

     return baseDocs;
  };

  const estimatedUni = universities.find(u => u.id === selectedUni);
  const compareUnis = universities.filter(u => compareList.includes(u.id));

  // Calendar Data
  const calendarEvents = [
    { title: "TS EAMCET Exam", date: "2025-05-10", type: "Exam", color: "red" },
    { title: "AP EAPCET Exam", date: "2025-05-15", type: "Exam", color: "red" },
    { title: "TS ICET Exam", date: "2025-05-25", type: "Exam", color: "orange" },
    { title: "TS EAMCET Results", date: "2025-06-15", type: "Result", color: "green" },
    { title: "Phase 1 Counseling", date: "2025-07-01", type: "Counseling", color: "blue" },
    ...scholarships.map(s => ({
      title: `${s.name} Deadline`,
      date: s.deadline.includes('December') ? '2025-12-31' : '2025-09-30', // Mock parsing for demo
      type: "Scholarship",
      color: "purple"
    }))
  ].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getDaysLeft = (dateStr: string) => {
     const days = Math.ceil((new Date(dateStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
     return days > 0 ? `${days} days left` : 'Passed';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Student Toolbox</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">A suite of smart tools to guide your education journey in Telangana & Andhra Pradesh.</p>
      </div>

      {/* NEW SMART EXAM FINDER CARD */}
      <div className="mb-12">
        <Link to="/exam-finder" className="block relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                 <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-white/10">
                    <Compass size={14} /> New Feature
                 </div>
                 <h2 className="text-3xl md:text-4xl font-black mb-2">Confused about Exams?</h2>
                 <p className="text-slate-300 max-w-lg mb-6 text-lg">Take our 1-minute smart quiz to find the perfect entrance exams based on your budget, comfort, and career goals.</p>
                 <span className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                    Start Decision Tool <ArrowRight size={18} />
                 </span>
              </div>
              <div className="bg-white/10 p-6 rounded-full border-4 border-white/5 animate-pulse">
                 <Compass size={64} />
              </div>
           </div>
           {/* Decorative */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal rounded-full blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-purple rounded-full blur-[100px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Nav */}
        <div className="lg:w-1/4 space-y-4">
          {[
            { id: 'cutoff', label: 'Cutoff Predictor', icon: <TrendingUp size={20} />, color: 'bg-primary-teal', border: 'border-primary-teal', text: 'text-primary-teal' },
            { id: 'fee', label: 'Fee Estimator', icon: <Calculator size={20} />, color: 'bg-secondary-purple', border: 'border-secondary-purple', text: 'text-secondary-purple' },
            { id: 'scholarship-check', label: 'Scholarship Checker', icon: <Filter size={20} />, color: 'bg-pink-600', border: 'border-pink-600', text: 'text-pink-600' },
            { id: 'tracker', label: 'Application Tracker', icon: <Save size={20} />, color: 'bg-indigo-600', border: 'border-indigo-600', text: 'text-indigo-600' },
            { id: 'compare', label: 'Compare Colleges', icon: <Scale size={20} />, color: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-500' },
            { id: 'checklist', label: 'Document Checklist', icon: <ClipboardList size={20} />, color: 'bg-cyan-600', border: 'border-cyan-600', text: 'text-cyan-600' },
            { id: 'calendar', label: 'Deadlines Calendar', icon: <Calendar size={20} />, color: 'bg-blue-600', border: 'border-blue-600', text: 'text-blue-600' },
            { id: 'roi', label: 'ROI Calculator', icon: <Banknote size={20} />, color: 'bg-green-600', border: 'border-green-600', text: 'text-green-600' },
          ].map((tool) => (
            <button 
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`w-full text-left p-4 lg:p-5 rounded-2xl transition-all border flex items-center space-x-4 ${activeTool === tool.id ? `${tool.color} text-white ${tool.border} shadow-xl scale-105` : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400'}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activeTool === tool.id ? 'bg-white/20' : `bg-slate-100 dark:bg-slate-800 ${tool.text}`}`}>
                {tool.icon}
              </div>
              <div className="font-bold text-sm md:text-base">{tool.label}</div>
            </button>
          ))}
          
          <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden hidden lg:block border border-slate-800">
             <div className="relative z-10">
               <h4 className="font-bold mb-2">Disclaimer</h4>
               <p className="text-xs text-slate-400 leading-relaxed">Tools provide indicative data based on past trends. Always verify with official counseling authorities (TSCHE/APSCHE) before making financial or admission decisions.</p>
             </div>
             <Info className="absolute -bottom-4 -right-4 text-white/5" size={80} />
          </div>

          {/* SIDEBAR ADVERTISEMENT */}
          <div className="hidden lg:flex w-full h-48 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 items-center justify-center">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest rotate-90">Advertisement</span>
          </div>
        </div>

        {/* Tool Content */}
        <div className="lg:w-3/4 min-h-[600px]">
          <AnimatePresence mode="wait">
            
            {/* --- TOOL 1: CUTOFF PREDICTOR --- */}
            {activeTool === 'cutoff' && (
              <motion.div 
                key="cutoff"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 md:p-10 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-primary-teal p-2 rounded-lg text-white"><TrendingUp size={24} /></div>
                  <h2 className="text-2xl font-bold">Cutoff Rank Predictor</h2>
                </div>

                <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-500 uppercase">Select Exam</label>
                    <select 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-primary-teal shadow-inner text-lg"
                      value={cutoffExam}
                      onChange={(e) => setCutoffExam(e.target.value)}
                    >
                      <option>TS EAMCET</option>
                      <option>AP EAPCET</option>
                      <option>TS ICET</option>
                      <option>AP ICET</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-500 uppercase">Your Rank</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 15000"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-primary-teal shadow-inner text-lg"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-500 uppercase">Preferred Branch</label>
                    <select 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-primary-teal shadow-inner text-lg"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    >
                      <option value="CSE">CSE (Computer Science)</option>
                      <option value="ECE">ECE (Electronics)</option>
                      <option value="EEE">EEE (Electrical)</option>
                      <option value="MEC">Mechanical</option>
                      <option value="CIV">Civil</option>
                      <option value="MBA">MBA (Management)</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-500 uppercase">Category</label>
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-primary-teal shadow-inner text-lg"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>OC</option>
                        <option>BC</option>
                        <option>SC</option>
                        <option>ST</option>
                        <option>EWS</option>
                      </select>
                       <select 
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-primary-teal shadow-inner text-lg"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-primary-teal hover:bg-teal-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg text-xl flex items-center justify-center gap-2">
                      <Search size={24} /> Predict Colleges
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4">* Results are indicative based on 2024 trends & category logic.</p>
                  </div>
                </form>

                {results.length > 0 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <h3 className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Results ({results.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {results.map(({ uni, probability, color }) => (
                         <div key={uni.id} className="relative">
                            <UniversityCard uni={uni} />
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm ${color}`}>
                               {probability} Chance
                            </div>
                         </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* --- TOOL 2: SCHOLARSHIP CHECKER --- */}
            {activeTool === 'scholarship-check' && (
              <motion.div 
                key="schol"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 md:p-10 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-pink-600 p-2 rounded-lg text-white"><Filter size={24} /></div>
                  <h2 className="text-2xl font-bold">Scholarship Eligibility Checker</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div className="space-y-3">
                     <label className="text-xs font-bold uppercase text-slate-500">State of Domicile</label>
                     <div className="flex gap-2">
                       {['Telangana', 'Andhra Pradesh'].map(s => (
                         <button 
                           key={s} 
                           onClick={() => setScholState(s)}
                           className={`flex-grow py-3 rounded-xl font-bold border ${scholState === s ? 'bg-pink-600 text-white border-pink-600' : 'border-slate-200 dark:border-slate-800'}`}
                         >
                           {s}
                         </button>
                       ))}
                     </div>
                   </div>

                   <div className="space-y-3">
                     <label className="text-xs font-bold uppercase text-slate-500">Annual Family Income</label>
                     <select 
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none font-medium"
                        value={scholIncome}
                        onChange={(e) => setScholIncome(e.target.value)}
                     >
                        <option value="100000">Less than ₹1 Lakh</option>
                        <option value="150000">Less than ₹1.5 Lakh</option>
                        <option value="200000">Less than ₹2 Lakh</option>
                        <option value="500000">Less than ₹5 Lakh</option>
                        <option value="800000">Less than ₹8 Lakh</option>
                        <option value="1000000">Above ₹8 Lakh</option>
                     </select>
                   </div>

                   <div className="space-y-3">
                     <label className="text-xs font-bold uppercase text-slate-500">Category</label>
                     <select 
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none font-medium"
                        value={scholCategory}
                        onChange={(e) => setScholCategory(e.target.value)}
                     >
                        <option value="SC">SC (Scheduled Caste)</option>
                        <option value="ST">ST (Scheduled Tribe)</option>
                        <option value="BC">BC (Backward Class)</option>
                        <option value="EBC">EBC (Economically Backward)</option>
                        <option value="Minority">Minority</option>
                        <option value="OC">OC / General</option>
                     </select>
                   </div>
                </div>

                <button 
                  onClick={handleCheckScholarship}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-2xl shadow-lg mb-8"
                >
                  Find Eligible Schemes
                </button>

                {scholResults.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-bold border-b pb-2 dark:border-slate-800">You may be eligible for:</h3>
                    {scholResults.map(s => (
                       <div key={s.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-pink-300 transition-colors">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold">{s.name}</h4>
                             <span className="text-[10px] bg-white dark:bg-slate-700 px-2 py-1 rounded shadow-sm">{s.type}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2">{s.eligibility}</p>
                          <a href={s.applyLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-pink-600 font-bold text-xs mt-3 hover:underline">
                            Official Details <ArrowRight size={12} className="ml-1" />
                          </a>
                       </div>
                    ))}
                  </div>
                ) : (
                   <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                      <p className="text-slate-500 text-sm">Click "Find Eligible Schemes" to see results based on criteria.</p>
                   </div>
                )}
              </motion.div>
            )}

            {/* --- TOOL 3: APPLICATION TRACKER --- */}
            {activeTool === 'tracker' && (
              <motion.div 
                key="tracker"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 md:p-10 shadow-sm"
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white"><Save size={24} /></div>
                    <h2 className="text-2xl font-bold">Application Tracker</h2>
                  </div>
                  <button onClick={() => setShowAddApp(!showAddApp)} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl font-bold flex items-center text-sm">
                    <Plus size={16} className="mr-2" /> Add
                  </button>
                </div>

                {showAddApp && (
                  <form onSubmit={addApplication} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl mb-8 animate-in slide-in-from-top-4">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <input 
                          type="text" 
                          placeholder="Name (e.g. Osmania Univ, JVD Scholarship)"
                          className="px-4 py-3 rounded-xl border-none" 
                          value={newApp.name}
                          onChange={e => setNewApp({...newApp, name: e.target.value})}
                          required
                        />
                        <select 
                          className="px-4 py-3 rounded-xl border-none"
                          value={newApp.type}
                          onChange={e => setNewApp({...newApp, type: e.target.value as any})}
                        >
                          <option>University</option>
                          <option>Scholarship</option>
                          <option>Exam</option>
                        </select>
                        <select 
                          className="px-4 py-3 rounded-xl border-none"
                          value={newApp.status}
                          onChange={e => setNewApp({...newApp, status: e.target.value as any})}
                        >
                          <option>To Do</option>
                          <option>Applied</option>
                          <option>Pending</option>
                        </select>
                     </div>
                     <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl">Save to List</button>
                  </form>
                )}

                <div className="space-y-4">
                  {applications.length > 0 ? applications.map(app => (
                    <div key={app.id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <div className="flex items-center space-x-4 mb-3 md:mb-0 w-full md:w-auto">
                          <div className={`w-3 h-3 rounded-full ${app.status === 'Applied' ? 'bg-green-500' : app.status === 'To Do' ? 'bg-slate-300' : 'bg-orange-500'}`}></div>
                          <div>
                            <h4 className="font-bold">{app.name}</h4>
                            <span className="text-xs text-slate-500">{app.type} • Added {app.deadline}</span>
                          </div>
                       </div>
                       <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
                          <select 
                             className="text-xs bg-white dark:bg-slate-900 border rounded-lg px-2 py-1"
                             value={app.status}
                             onChange={(e) => updateAppStatus(app.id, e.target.value)}
                          >
                             <option>To Do</option>
                             <option>Applied</option>
                             <option>Pending</option>
                             <option>Accepted</option>
                             <option>Rejected</option>
                          </select>
                          <button onClick={() => deleteApplication(app.id)} className="text-red-400 hover:text-red-600 p-2">
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                  )) : (
                    <div className="text-center py-10 text-slate-400">
                       <Save size={40} className="mx-auto mb-2 opacity-20" />
                       <p>No applications tracked yet. Data is saved in your browser.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* --- TOOL 4: FEE ESTIMATOR --- */}
            {activeTool === 'fee' && (
              <motion.div 
                key="fee"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-secondary-purple p-2 rounded-lg text-white"><Calculator size={24} /></div>
                  <h2 className="text-2xl font-bold">Fee & Cost Estimator</h2>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-slate-500 uppercase">Select University</label>
                    <select 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-secondary-purple shadow-inner text-lg"
                      value={selectedUni}
                      onChange={(e) => setSelectedUni(e.target.value)}
                    >
                      <option value="">Select an institution...</option>
                      {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </select>
                  </div>

                  {estimatedUni && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700">
                           <div className="flex items-center space-x-3">
                              <School className="text-secondary-purple" />
                              <span className="font-bold">Includes Hostel?</span>
                           </div>
                           <button 
                             onClick={() => setNeedHostel(!needHostel)}
                             className={`w-14 h-8 rounded-full relative transition-all ${needHostel ? 'bg-secondary-purple' : 'bg-slate-300'}`}
                           >
                             <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${needHostel ? 'left-7' : 'left-1'}`}></div>
                           </button>
                        </div>
                        
                        <div className="p-8 bg-secondary-purple/5 border border-secondary-purple/20 rounded-[2.5rem] relative overflow-hidden">
                           <h4 className="text-secondary-purple font-black text-sm uppercase mb-4 tracking-widest">Estimation Breakdown</h4>
                           <div className="space-y-4">
                             <div className="flex justify-between text-sm">
                               <span className="text-slate-500">Tuition (Annual)</span>
                               <span className="font-bold">{estimatedUni.fees.tuition}</span>
                             </div>
                             {needHostel && (
                               <div className="flex justify-between text-sm">
                                 <span className="text-slate-500">Hostel (Monthly)</span>
                                 <span className="font-bold">{estimatedUni.fees.hostel}</span>
                               </div>
                             )}
                             <div className="pt-4 border-t border-secondary-purple/10 flex justify-between items-end">
                               <span className="font-bold uppercase text-xs text-slate-500">Total Est. (1st Year)</span>
                               <span className="text-2xl font-black text-secondary-purple">
                                 ₹{estimatedUni.fees.tuition === 'N/A' ? 'N/A' : (parseInt(estimatedUni.fees.tuition.replace(/[^0-9]/g, '')) + (needHostel ? 60000 : 0))}*
                               </span>
                             </div>
                           </div>
                        </div>
                      </div>

                      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col justify-center">
                         <h3 className="text-xl font-bold mb-4">Financial Tips</h3>
                         <ul className="space-y-4 text-sm text-slate-400">
                           <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 text-primary-teal shrink-0 mt-0.5" /> Check for ePASS eligibility to get 100% reimbursement.</li>
                           <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 text-primary-teal shrink-0 mt-0.5" /> Private university fees exclude caution deposits.</li>
                           <li className="flex items-start"><CheckCircle2 size={16} className="mr-2 text-primary-teal shrink-0 mt-0.5" /> Explore merit scholarships to reduce the burden.</li>
                         </ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* --- TOOL 5: DEADLINES CALENDAR --- */}
            {activeTool === 'calendar' && (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-blue-600 p-2 rounded-lg text-white"><Calendar size={24} /></div>
                  <h2 className="text-2xl font-bold">Admission & Scholarship Deadlines</h2>
                </div>

                <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8">
                  {calendarEvents.map((event, idx) => (
                    <div key={idx} className="relative pl-8 group">
                       <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 bg-${event.color}-500 shadow-sm group-hover:scale-125 transition-transform`}></div>
                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded text-white bg-${event.color}-500`}>{event.type}</span>
                              <h4 className="font-bold text-lg">{event.title}</h4>
                            </div>
                            <p className="text-slate-500 text-sm font-semibold flex items-center"><Clock size={14} className="mr-1" /> {event.date}</p>
                         </div>
                         <div className="text-right">
                            <span className="font-black text-2xl block">{getDaysLeft(event.date).split(' ')[0]}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-400">Days Left</span>
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* --- TOOL 6: COMPARE COLLEGES --- */}
            {activeTool === 'compare' && (
               <motion.div 
                 key="compare"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm"
               >
                 <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-orange-500 p-2 rounded-lg text-white"><Scale size={24} /></div>
                    <h2 className="text-2xl font-bold">Compare Universities</h2>
                 </div>

                 <div className="mb-8">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search to add to compare (Max 2)..."
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 shadow-inner text-lg"
                        value={compareSearch}
                        onChange={(e) => setCompareSearch(e.target.value)}
                      />
                    </div>
                    {compareSearch && (
                      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl max-h-60 overflow-y-auto">
                        {universities.filter(u => u.name.toLowerCase().includes(compareSearch.toLowerCase())).map(u => (
                          <button 
                            key={u.id}
                            onClick={() => { toggleCompare(u.id); setCompareSearch(''); }}
                            className="w-full text-left p-3 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl flex justify-between items-center"
                            disabled={compareList.length >= 2 && !compareList.includes(u.id)}
                          >
                            <span>{u.name}</span>
                            {compareList.includes(u.id) && <CheckCircle2 size={16} className="text-green-500" />}
                          </button>
                        ))}
                      </div>
                    )}
                 </div>

                 {compareList.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                     {compareList.length === 1 && <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none opacity-20"><Scale size={100} /></div>}
                     {compareUnis.map((uni) => (
                       <div key={uni.id} className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 relative">
                          <button onClick={() => toggleCompare(uni.id)} className="absolute top-4 right-4 p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors">
                            <X size={16} />
                          </button>
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2 h-16">{uni.name}</h3>
                            <div className="text-sm text-slate-500">{uni.city}</div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                              <span className="text-slate-500 font-bold text-xs uppercase">Type</span>
                              <span className="font-bold">{uni.type}</span>
                            </div>
                            <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                              <span className="text-slate-500 font-bold text-xs uppercase">Affiliation</span>
                              <span className="font-bold text-right text-xs max-w-[50%]">{uni.affiliation}</span>
                            </div>
                            <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                              <span className="text-slate-500 font-bold text-xs uppercase">NAAC</span>
                              <span className="font-bold text-green-500">{uni.naacGrade}</span>
                            </div>
                            <div className="flex justify-between border-b dark:border-slate-700 pb-2">
                              <span className="text-slate-500 font-bold text-xs uppercase">Tuition Fee</span>
                              <span className="font-bold">{uni.fees.tuition}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                               <span className="text-slate-500 font-bold text-xs uppercase">Ranking</span>
                               <span className="font-bold">{uni.cutoffs[0]?.rank ? `Top ${uni.cutoffs[0].rank}` : 'N/A'}</span>
                            </div>
                          </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-20 text-slate-400">
                     <Scale size={48} className="mx-auto mb-4 opacity-50" />
                     <p>Search and select two universities to compare.</p>
                   </div>
                 )}
               </motion.div>
            )}

            {/* --- TOOL 7: DOCUMENT CHECKLIST --- */}
             {activeTool === 'checklist' && (
              <motion.div 
                key="checklist"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-cyan-600 p-2 rounded-lg text-white"><ClipboardList size={24} /></div>
                  <h2 className="text-2xl font-bold">Document Checklist</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Purpose</label>
                    <select 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-cyan-600 shadow-inner text-lg"
                      value={checklistType}
                      onChange={(e) => setChecklistType(e.target.value)}
                    >
                      <option>TS EAMCET Counseling</option>
                      <option>AP EAPCET Counseling</option>
                      <option>JoSAA (IIT/NIT) Counseling</option>
                      <option>TS ICET Counseling</option>
                      <option>State Scholarship (ePASS/JVD)</option>
                      <option>Central Scholarship (NSP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Your Category</label>
                    <select 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-cyan-600 shadow-inner text-lg"
                      value={checklistCategory}
                      onChange={(e) => setChecklistCategory(e.target.value)}
                    >
                      <option value="OC">Open Category (OC)</option>
                      <option value="BC">BC / SC / ST / EBC</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 md:p-8">
                   <h3 className="font-bold mb-6 text-lg border-b dark:border-slate-700 pb-4">Required Certificates</h3>
                   <div className="space-y-4">
                     {getChecklist().map((item, idx) => (
                       <label key={idx} className="flex items-center space-x-4 p-3 bg-white dark:bg-slate-700/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                         <input type="checkbox" className="w-6 h-6 rounded-md text-cyan-600 focus:ring-cyan-600 border-gray-300" />
                         <span className="font-medium">{item}</span>
                       </label>
                     ))}
                   </div>
                   <div className="mt-8 pt-6 border-t dark:border-slate-700 flex items-start gap-4">
                     <Info size={20} className="text-slate-400 shrink-0 mt-1" />
                     <p className="text-sm text-slate-500">Note: Always carry 3 sets of Xerox copies and 4 passport size photos along with original documents to the Help Line Center.</p>
                   </div>
                </div>
              </motion.div>
            )}

            {/* --- TOOL 8: ROI CALCULATOR --- */}
            {activeTool === 'roi' && (
              <motion.div 
                key="roi"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-sm"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-green-600 p-2 rounded-lg text-white"><Banknote size={24} /></div>
                  <h2 className="text-2xl font-bold">ROI Calculator</h2>
                </div>
                
                <p className="mb-8 text-slate-500">Calculate how many years it will take to recover your education investment.</p>

                <form onSubmit={calculateROI} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Total 4-Year Tuition Fee (₹)</label>
                    <input 
                      type="number" 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-green-600 shadow-inner text-lg"
                      value={roiFee}
                      onChange={(e) => setRoiFee(e.target.value)}
                      placeholder="e.g. 500000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Expected Annual Salary (₹)</label>
                    <input 
                      type="number" 
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-green-600 shadow-inner text-lg"
                      value={roiSalary}
                      onChange={(e) => setRoiSalary(e.target.value)}
                      placeholder="e.g. 400000"
                    />
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg text-xl">
                    Calculate Return
                  </button>
                </form>

                {roiYears && (
                  <div className="mt-8 p-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-3xl text-center">
                    <p className="text-sm text-green-800 dark:text-green-400 font-bold uppercase tracking-widest mb-2">Recovery Time</p>
                    <div className="text-5xl font-black text-green-700 dark:text-green-400 mb-2">{roiYears} Years</div>
                    <p className="text-xs text-slate-500">Estimated time to earn back your tuition fees based on full salary.</p>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
