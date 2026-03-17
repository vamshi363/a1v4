import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Share2, Download, RotateCcw, GraduationCap, Award,
  BookOpen, MessageCircle, Clock, FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

// ─── Types ───────────────────────────────────────────────────────────────────
interface QuizAnswer {
  question: number;
  answer: string;
  text: string;
}

interface SavedQuizData {
  quizAnswers: QuizAnswer[];
  stream: string;
  completedAt: number;
}

interface CareerDef {
  name: string;
  emoji: string;
  rules: { question: number; answer: string; points: number }[];
  salary: string;
  demand: string;
  skills: string[];
  whyMatch: string;
}

interface CourseDef {
  name: string;
  duration: string;
  exam: string;
}

interface ScoredCareer {
  career: CareerDef;
  score: number;
  maxScore: number;
  matchPercent: number;
}

// ─── Career Definitions ──────────────────────────────────────────────────────
const CAREERS: CareerDef[] = [
  {
    name: 'Software / Tech Engineer',
    emoji: '💻',
    rules: [
      { question: 1, answer: 'A', points: 3 },
      { question: 2, answer: 'A', points: 3 },
      { question: 3, answer: 'A', points: 3 },
      { question: 10, answer: 'A', points: 2 },
      { question: 12, answer: 'A', points: 2 },
    ],
    salary: '₹6L – ₹25L',
    demand: '🔥 Very High',
    skills: ['Programming', 'Problem Solving', 'System Design'],
    whyMatch: 'Your analytical mindset and love for technology make you a natural fit for building the digital future.',
  },
  {
    name: 'Data Scientist / AI',
    emoji: '🤖',
    rules: [
      { question: 1, answer: 'A', points: 3 },
      { question: 2, answer: 'A', points: 2 },
      { question: 6, answer: 'A', points: 3 },
      { question: 7, answer: 'A', points: 2 },
      { question: 10, answer: 'A', points: 2 },
    ],
    salary: '₹8L – ₹30L',
    demand: '🔥 Very High',
    skills: ['Statistics', 'Machine Learning', 'Python'],
    whyMatch: 'You have a data-driven mind that loves uncovering patterns — perfect for the AI revolution.',
  },
  {
    name: 'Doctor / MBBS',
    emoji: '🩺',
    rules: [
      { question: 2, answer: 'B', points: 3 },
      { question: 3, answer: 'B', points: 3 },
      { question: 4, answer: 'B', points: 3 },
      { question: 12, answer: 'B', points: 3 },
      { question: 13, answer: 'B', points: 2 },
    ],
    salary: '₹8L – ₹35L',
    demand: '🔥 Very High',
    skills: ['Biology', 'Empathy', 'Critical Thinking'],
    whyMatch: 'Your compassion and scientific curiosity align perfectly with a career in healing and healthcare.',
  },
  {
    name: 'UI/UX Designer',
    emoji: '🎨',
    rules: [
      { question: 1, answer: 'B', points: 3 },
      { question: 6, answer: 'B', points: 3 },
      { question: 7, answer: 'B', points: 2 },
      { question: 10, answer: 'B', points: 3 },
      { question: 12, answer: 'D', points: 3 },
    ],
    salary: '₹5L – ₹20L',
    demand: '✅ High',
    skills: ['Design Thinking', 'Figma/Sketch', 'User Research'],
    whyMatch: 'Your creative eye and user-focused thinking make you ideal for crafting beautiful digital experiences.',
  },
  {
    name: 'Civil Services / IAS',
    emoji: '🏛️',
    rules: [
      { question: 5, answer: 'C', points: 2 },
      { question: 6, answer: 'C', points: 2 },
      { question: 7, answer: 'D', points: 3 },
      { question: 8, answer: 'D', points: 2 },
      { question: 9, answer: 'A', points: 2 },
    ],
    salary: '₹6L – ₹18L',
    demand: '✅ High',
    skills: ['Leadership', 'General Knowledge', 'Public Speaking'],
    whyMatch: 'Your desire to serve the nation and lead with integrity points toward a prestigious career in civil services.',
  },
  {
    name: 'Chartered Accountant (CA)',
    emoji: '📊',
    rules: [
      { question: 2, answer: 'C', points: 3 },
      { question: 3, answer: 'C', points: 3 },
      { question: 12, answer: 'C', points: 3 },
      { question: 8, answer: 'B', points: 2 },
    ],
    salary: '₹7L – ₹22L',
    demand: '✅ High',
    skills: ['Accounting', 'Taxation', 'Auditing'],
    whyMatch: 'Your precision with numbers and love for structured thinking make you a strong fit for chartered accountancy.',
  },
  {
    name: 'Entrepreneur / MBA',
    emoji: '🚀',
    rules: [
      { question: 5, answer: 'C', points: 3 },
      { question: 7, answer: 'C', points: 3 },
      { question: 8, answer: 'C', points: 3 },
      { question: 9, answer: 'B', points: 2 },
    ],
    salary: '₹5L – ₹50L+',
    demand: '🔥 Very High',
    skills: ['Business Strategy', 'Marketing', 'Leadership'],
    whyMatch: 'Your entrepreneurial spirit and risk-taking attitude position you perfectly for the world of business.',
  },
  {
    name: 'Architect / Designer',
    emoji: '🏗️',
    rules: [
      { question: 1, answer: 'B', points: 3 },
      { question: 4, answer: 'A', points: 2 },
      { question: 6, answer: 'B', points: 3 },
      { question: 12, answer: 'D', points: 3 },
    ],
    salary: '₹4L – ₹18L',
    demand: '⚡ Growing',
    skills: ['Spatial Design', 'AutoCAD', 'Creative Vision'],
    whyMatch: 'Your blend of creativity and technical aptitude makes architecture a wonderful canvas for your talents.',
  },
  {
    name: 'Lawyer',
    emoji: '⚖️',
    rules: [
      { question: 5, answer: 'C', points: 2 },
      { question: 6, answer: 'C', points: 3 },
      { question: 12, answer: 'C', points: 3 },
      { question: 9, answer: 'A', points: 2 },
    ],
    salary: '₹5L – ₹25L',
    demand: '✅ High',
    skills: ['Legal Reasoning', 'Argumentation', 'Research'],
    whyMatch: 'Your sharp reasoning and advocacy skills are a natural match for the legal profession.',
  },
  {
    name: 'Pharmacist / Biotech',
    emoji: '🧬',
    rules: [
      { question: 2, answer: 'B', points: 3 },
      { question: 3, answer: 'B', points: 2 },
      { question: 12, answer: 'B', points: 3 },
      { question: 11, answer: 'D', points: 2 },
    ],
    salary: '₹4L – ₹15L',
    demand: '⚡ Growing',
    skills: ['Biochemistry', 'Research', 'Lab Techniques'],
    whyMatch: 'Your curiosity for life sciences and research mindset make biotech and pharmacy an exciting path.',
  },
];

// ─── Courses per Career ──────────────────────────────────────────────────────
const CAREER_COURSES: Record<string, CourseDef[]> = {
  'Software / Tech Engineer': [
    { name: 'B.Tech in Computer Science', duration: '4 Years', exam: 'JEE / EAMCET' },
    { name: 'BCA (Bachelor of Computer Applications)', duration: '3 Years', exam: 'University Entrance' },
    { name: 'B.Sc in Information Technology', duration: '3 Years', exam: 'EAMCET / Direct' },
  ],
  'Data Scientist / AI': [
    { name: 'B.Tech in AI & Machine Learning', duration: '4 Years', exam: 'JEE / EAMCET' },
    { name: 'B.Sc in Data Science', duration: '3 Years', exam: 'University Entrance' },
    { name: 'B.Tech in CS (AI Specialization)', duration: '4 Years', exam: 'JEE / EAMCET' },
  ],
  'Doctor / MBBS': [
    { name: 'MBBS (Bachelor of Medicine & Surgery)', duration: '5.5 Years', exam: 'NEET' },
    { name: 'BDS (Bachelor of Dental Surgery)', duration: '5 Years', exam: 'NEET' },
    { name: 'BAMS (Ayurvedic Medicine)', duration: '5.5 Years', exam: 'NEET' },
  ],
  'UI/UX Designer': [
    { name: 'B.Des in Interaction Design', duration: '4 Years', exam: 'UCEED / NID DAT' },
    { name: 'BFA in Applied Arts', duration: '4 Years', exam: 'University Entrance' },
    { name: 'B.Sc in Multimedia & Design', duration: '3 Years', exam: 'Direct Admission' },
  ],
  'Civil Services / IAS': [
    { name: 'BA in Political Science / History', duration: '3 Years', exam: 'University Entrance' },
    { name: 'BA in Public Administration', duration: '3 Years', exam: 'University Entrance' },
    { name: 'Integrated MA in Social Sciences', duration: '5 Years', exam: 'CUET' },
  ],
  'Chartered Accountant (CA)': [
    { name: 'B.Com (Hons) + CA Foundation', duration: '3 Years + CA', exam: 'CA Foundation' },
    { name: 'B.Com in Accounting & Finance', duration: '3 Years', exam: 'University Entrance' },
    { name: 'BBA in Finance', duration: '3 Years', exam: 'University / CUET' },
  ],
  'Entrepreneur / MBA': [
    { name: 'BBA (Bachelor of Business Admin)', duration: '3 Years', exam: 'CUET / IPU CET' },
    { name: 'B.Com (Hons) + MBA', duration: '3 + 2 Years', exam: 'CAT / XAT / GMAT' },
    { name: 'Integrated BBA-MBA', duration: '5 Years', exam: 'University Entrance' },
  ],
  'Architect / Designer': [
    { name: 'B.Arch (Bachelor of Architecture)', duration: '5 Years', exam: 'NATA / JEE Paper 2' },
    { name: 'B.Des in Industrial Design', duration: '4 Years', exam: 'UCEED / NID DAT' },
    { name: 'B.Planning (Town Planning)', duration: '4 Years', exam: 'JEE / EAMCET' },
  ],
  'Lawyer': [
    { name: 'BA LLB (Integrated Law)', duration: '5 Years', exam: 'CLAT / LSAT' },
    { name: 'BBA LLB (Business + Law)', duration: '5 Years', exam: 'CLAT / LSAT' },
    { name: 'B.Com LLB (Commerce + Law)', duration: '5 Years', exam: 'CLAT / LSAT' },
  ],
  'Pharmacist / Biotech': [
    { name: 'B.Pharm (Bachelor of Pharmacy)', duration: '4 Years', exam: 'EAMCET / GPAT' },
    { name: 'B.Tech in Biotechnology', duration: '4 Years', exam: 'JEE / EAMCET' },
    { name: 'B.Sc in Microbiology', duration: '3 Years', exam: 'University Entrance' },
  ],
};

// ─── Profile badge logic ─────────────────────────────────────────────────────
function getProfileBadges(answers: QuizAnswer[]): string[] {
  const badges: string[] = [];
  const answerMap = new Map<number, string>();
  answers.forEach(a => answerMap.set(a.question, a.answer));

  const analyticalQs = [1, 2, 3, 10];
  if (analyticalQs.filter(q => answerMap.get(q) === 'A').length >= 2) badges.push('🧠 Analytical Thinker');

  const creativeQs = [1, 6, 10, 12];
  if (creativeQs.filter(q => answerMap.get(q) === 'B').length >= 2) badges.push('🎨 Creative Mind');

  const leaderQs = [5, 7, 8];
  if (leaderQs.filter(q => answerMap.get(q) === 'C').length >= 2) badges.push('👑 Leadership Oriented');

  const scienceQs = [2, 3, 4, 12];
  if (scienceQs.filter(q => answerMap.get(q) === 'B').length >= 2) badges.push('🔬 Science Enthusiast');

  if (answerMap.get(1) === 'A' && answerMap.get(10) === 'A') badges.push('⚡ Tech-Oriented');

  if (answerMap.get(8) === 'C' || answerMap.get(9) === 'B') badges.push('🚀 Future Builder');

  return [...new Set(badges)].slice(0, 3);
}

// ─── Score calculator ────────────────────────────────────────────────────────
function scoreCareer(career: CareerDef, answers: QuizAnswer[]): ScoredCareer {
  const answerMap = new Map<number, string>();
  answers.forEach(a => answerMap.set(a.question, a.answer));

  let score = 0;
  const maxScore = career.rules.reduce((sum, r) => sum + r.points, 0);

  career.rules.forEach(rule => {
    if (answerMap.get(rule.question) === rule.answer) {
      score += rule.points;
    }
  });

  return {
    career,
    score,
    maxScore,
    matchPercent: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
  };
}

// ─── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Rank helpers ────────────────────────────────────────────────────────────
const RANK_CONFIG = [
  { label: '#1 Best Match', glowClass: 'gold-glow', borderColor: 'border-yellow-500/60', bgAccent: 'from-yellow-500/20 to-amber-500/10' },
  { label: '#2 Great Match', glowClass: 'silver-glow', borderColor: 'border-slate-300/40', bgAccent: 'from-slate-300/15 to-slate-400/5' },
  { label: '#3 Good Match', glowClass: 'bronze-glow', borderColor: 'border-orange-600/40', bgAccent: 'from-orange-600/15 to-orange-700/5' },
];

const RANK_BADGE_COLORS = [
  'bg-gradient-to-r from-yellow-400 to-amber-500 text-black',
  'bg-gradient-to-r from-slate-300 to-slate-400 text-black',
  'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
];

// ─── Main Component ─────────────────────────────────────────────────────────
const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  // ─── Read & validate localStorage ──────────────────────────────────────────
  const saved = localStorage.getItem('quizAnswers');
  if (!saved) {
    navigate('/quiz');
    return null;
  }

  let parsedData: SavedQuizData;
  try {
    parsedData = JSON.parse(saved) as SavedQuizData;
  } catch {
    navigate('/quiz');
    return null;
  }

  const quizAnswers = parsedData.quizAnswers ?? [];
  if (quizAnswers.length === 0) {
    navigate('/quiz');
    return null;
  }

  // ─── Score all careers & pick top 3 ────────────────────────────────────────
  const top3 = useMemo(() => {
    const scored = CAREERS.map(c => scoreCareer(c, quizAnswers));
    scored.sort((a, b) => b.score - a.score || b.matchPercent - a.matchPercent);
    return scored.slice(0, 3);
  }, [quizAnswers]);

  const profileBadges = useMemo(() => getProfileBadges(quizAnswers), [quizAnswers]);
  const topCareerName = top3[0]?.career.name ?? '';
  const topCourses = CAREER_COURSES[topCareerName] ?? [];

  // ─── Confetti on mount ─────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200);

    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    confetti({ ...defaults, particleCount: 80, origin: { x: 0.2, y: 0.6 } });
    confetti({ ...defaults, particleCount: 80, origin: { x: 0.8, y: 0.6 } });

    setTimeout(() => {
      confetti({ ...defaults, particleCount: 60, origin: { x: 0.5, y: 0.4 } });
    }, 300);

    setTimeout(() => {
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.3, y: 0.3 }, colors: ['#FFD700', '#FFA500', '#FF6347'] });
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.7, y: 0.3 }, colors: ['#3B82F6', '#8B5CF6', '#06B6D4'] });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleWhatsAppShare = () => {
    const msg = encodeURIComponent(
      `I just found my perfect career match on After Inter! 🎓\nMy top match is ${topCareerName}. Check yours at afterinter.in 🚀`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const handleDownloadPDF = () => window.print();

  const getMatchColor = (pct: number) => {
    if (pct >= 80) return 'text-emerald-400';
    if (pct >= 60) return 'text-blue-400';
    if (pct >= 40) return 'text-amber-400';
    return 'text-slate-400';
  };

  if (!showContent) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🎉</div>
          <p className="text-slate-400 font-medium">Preparing your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative bg-navy min-h-screen">

      {/* ═══════════════ SECTION 1: CELEBRATION HEADER ═══════════════ */}
      <section
        className="relative py-16 md:py-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(170deg, #0A0F1E 0%, #111827 50%, #0F172A 100%)' }}
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="text-7xl md:text-8xl mb-6"
          >
            🎉
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="font-heading text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight mb-4"
          >
            Your Career Matches Are{' '}
            <span className="text-gradient">Ready!</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8"
          >
            Based on your answers, we've found the careers that match your unique personality, interests, and skills.
          </motion.p>

          {/* Profile Badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.7}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {profileBadges.map((badge, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 backdrop-blur-sm text-slate-200 px-4 py-2 rounded-full text-sm font-bold"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SECTION 2: TOP 3 CAREER MATCHES ═══════════════ */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-4 block">
              Your Top Matches
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white">
              Career <span className="text-gradient">Recommendations</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {top3.map((item, idx) => {
              const rank = RANK_CONFIG[idx];
              const badgeColor = RANK_BADGE_COLORS[idx];

              return (
                <motion.div
                  key={item.career.name}
                  variants={staggerItem}
                  className={`relative rounded-3xl border-2 ${rank.borderColor} ${rank.glowClass} overflow-hidden transition-all duration-300 hover:scale-[1.02]`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${rank.bgAccent}`} />

                  <div className="p-6 md:p-8">
                    {/* Rank badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full ${badgeColor}`}>
                        {rank.label}
                      </span>
                      <span className="text-3xl">{item.career.emoji}</span>
                    </div>

                    {/* Career name */}
                    <h3 className="font-heading text-xl md:text-2xl font-black text-white mb-3">
                      {item.career.name}
                    </h3>

                    {/* Match percentage */}
                    <div className="mb-5">
                      <div className="flex items-end gap-2 mb-2">
                        <span className={`font-heading text-5xl md:text-6xl font-black ${getMatchColor(item.matchPercent)}`}>
                          {item.matchPercent}%
                        </span>
                        <span className="text-slate-500 text-sm font-medium pb-2">match</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.matchPercent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + idx * 0.2, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            idx === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                            : idx === 1 ? 'bg-gradient-to-r from-slate-300 to-slate-400'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Why this matches */}
                    <div className="mb-5">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Why this matches you:
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.career.whyMatch}
                      </p>
                    </div>

                    {/* Salary & Demand */}
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-sm">Salary Range</span>
                        <span className="text-white font-bold text-sm">{item.career.salary}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-sm">Future Demand</span>
                        <span className="text-sm font-bold px-2.5 py-1 rounded-full bg-white/10 text-white">
                          {item.career.demand}
                        </span>
                      </div>
                    </div>

                    {/* Top Skills */}
                    <div className="mb-6">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Top Skills Needed
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.career.skills.map(skill => (
                          <span
                            key={skill}
                            className="bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/careers/${item.career.name.toLowerCase().replace(/[\s\/]+/g, '-').replace(/[()]/g, '')}`}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3.5 rounded-2xl font-heading font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
                    >
                      Explore This Career <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3: RECOMMENDED COURSES ═══════════════ */}
      <section
        className="py-16 md:py-20 px-4"
        style={{ background: 'linear-gradient(180deg, #0A0F1E, #111827)' }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 mb-4 block">
              Start Your Journey
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white">
              Recommended <span className="text-gradient">Courses</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm md:text-base">
              Top courses for your #1 match: <span className="text-white font-semibold">{topCareerName}</span>
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {topCourses.map((course) => (
              <motion.div
                key={course.name}
                variants={staggerItem}
                className="glass-card rounded-3xl p-6 md:p-8 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={28} />
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-4">
                  {course.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock size={14} className="text-blue-400" />
                    <span>Duration: <span className="text-white font-medium">{course.duration}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <FileText size={14} className="text-amber-400" />
                    <span>Entrance: <span className="text-white font-medium">{course.exam}</span></span>
                  </div>
                </div>

                <Link
                  to="/courses"
                  className="flex items-center gap-2 text-emerald-400 text-sm font-bold group-hover:text-emerald-300 transition-colors"
                >
                  View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4: QUICK LINKS ═══════════════ */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 mb-4 block">
              Next Steps
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white">
              Take <span className="text-gradient">Action</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <motion.div variants={staggerItem}>
              <Link
                to="/universities"
                className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 group block"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <GraduationCap size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-lg">Find Colleges</h3>
                  <p className="text-slate-500 text-xs">Browse top universities</p>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Link
                to="/scholarships"
                className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 group block"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-lg">Find Scholarships</h3>
                  <p className="text-slate-500 text-xs">Save on your education</p>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Link
                to="/exams"
                className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 group block"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-lg">Check Entrance Exams</h3>
                  <p className="text-slate-500 text-xs">Prepare for what's next</p>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>

            <motion.div variants={staggerItem}>
              <button
                onClick={() => {
                  const chatBtn = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
                  if (chatBtn) chatBtn.click();
                  else navigate('/help');
                }}
                className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 group w-full text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-lg">Ask AI Counselor 🤖</h3>
                  <p className="text-slate-500 text-xs">Get personalized guidance</p>
                </div>
                <ArrowRight size={18} className="text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SECTION 5: SHARE & SAVE ═══════════════ */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #2563EB 100%)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

            <div className="relative z-10 text-center p-8 md:p-14">
              <h2 className="font-heading text-2xl md:text-4xl font-black text-white mb-3">
                Share Your Results! 🎓
              </h2>
              <p className="text-blue-100 text-sm md:text-base mb-8 max-w-xl mx-auto">
                Let your friends know about your career match, or save a copy for later.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3.5 rounded-2xl font-heading font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                >
                  <Share2 size={18} /> Share on WhatsApp
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="w-full sm:w-auto bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-7 py-3.5 rounded-2xl font-heading font-bold text-sm transition-all hover:scale-105 active:scale-95 border border-white/20 flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Download as PDF
                </button>

                <Link
                  to="/quiz"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-7 py-3.5 rounded-2xl font-heading font-bold text-sm transition-all hover:scale-105 active:scale-95 border border-white/20 flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} /> Retake Quiz
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ResultsPage;
