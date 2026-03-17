import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, Check } from 'lucide-react';
import { careerQuizQuestions, streamMap, PILLAR_COLORS } from '../data/quiz/careerQuestions';

/* ── Constants ─────────────────────────────────────────────── */
const TOTAL = careerQuizQuestions.length; // 15
const STORAGE_KEY = 'quizAnswers';

/* ── Types ─────────────────────────────────────────────────── */
interface SavedAnswer {
  question: number;
  answer: string;
  text: string;
  pillar: string;
}

/* ── IKIGAI Scoring ────────────────────────────────────────── */
interface IkigaiScores {
  love: number;
  goodAt: number;
  paysWell: number;
  worldNeeds: number;
}

function computeIkigaiScores(answers: SavedAnswer[]): IkigaiScores {
  const raw = { love: 0, goodAt: 0, paysWell: 0, worldNeeds: 0 };
  const max = { love: 0, goodAt: 0, paysWell: 0, worldNeeds: 0 };

  answers.forEach(a => {
    const pillar = a.pillar as keyof IkigaiScores;
    if (!(pillar in raw)) return; // skip 'stream'

    // Each question contributes up to 3 points to its own pillar
    max[pillar] += 3;

    // Score based on how strongly the answer aligns
    // A answers typically align with tech/analytical → love.tech, goodAt.tech, etc.
    // We give 3 for the primary choice, 2 for secondary, 1 for tertiary
    // Simplified: every answer gets 3 points in its pillar (they answered)
    raw[pillar] += 3;

    // Cross-pillar bonuses based on answer consistency
    if (pillar === 'love') {
      if (a.answer === 'A') { raw.goodAt += 1; raw.worldNeeds += 1; }
      if (a.answer === 'C') { raw.paysWell += 1; }
    }
    if (pillar === 'goodAt') {
      if (a.answer === 'A') { raw.love += 1; raw.worldNeeds += 1; }
      if (a.answer === 'C') { raw.paysWell += 1; }
    }
    if (pillar === 'paysWell') {
      if (a.answer === 'A' || a.answer === 'B') { raw.goodAt += 1; }
      if (a.answer === 'C') { raw.worldNeeds += 1; }
    }
    if (pillar === 'worldNeeds') {
      if (a.answer === 'A') { raw.love += 1; raw.goodAt += 1; }
      if (a.answer === 'B') { raw.love += 1; }
    }
  });

  // Normalize to 0-100
  const totalMax = Math.max(max.love + 6, 1); // +6 for possible cross-pillar bonuses
  return {
    love: Math.min(100, Math.round((raw.love / totalMax) * 100)),
    goodAt: Math.min(100, Math.round((raw.goodAt / totalMax) * 100)),
    paysWell: Math.min(100, Math.round((raw.paysWell / totalMax) * 100)),
    worldNeeds: Math.min(100, Math.round((raw.worldNeeds / totalMax) * 100)),
  };
}

/* ── Encouragement text ────────────────────────────────────── */
function getEncMsg(idx: number): string {
  if (idx <= 3) return 'Great start! Discovering what you love ❤️';
  if (idx <= 7) return "Discovering your strengths 💪";
  if (idx <= 10) return 'Understanding your goals 💰';
  if (idx <= 13) return 'Exploring world impact 🌍';
  return 'Almost done! 🚀';
}

/* ── Pillar progress ───────────────────────────────────────── */
const PILLAR_RANGES: { pillar: string; label: string; emoji: string; start: number; end: number }[] = [
  { pillar: 'love',       label: 'What You Love',    emoji: '❤️', start: 0,  end: 3  },
  { pillar: 'goodAt',     label: 'What You\'re Good At', emoji: '💪', start: 4,  end: 7  },
  { pillar: 'paysWell',   label: 'What Pays Well',   emoji: '💰', start: 8,  end: 10 },
  { pillar: 'worldNeeds', label: 'What World Needs', emoji: '🌍', start: 11, end: 13 },
  { pillar: 'stream',     label: 'Your Stream',      emoji: '📚', start: 14, end: 14 },
];

/* ── IKIGAI Diagram SVG (Intro Screen) ─────────────────────── */
const IkigaiDiagram: React.FC = () => (
  <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto my-8">
    {/* Love circle - pink/red */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
      className="absolute rounded-full border-2 border-pink-400/40"
      style={{
        width: '55%', height: '55%',
        top: '5%', left: '22.5%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(236,72,153,0.05) 70%)',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: '15%' }}>
        <span className="text-2xl">❤️</span>
        <span className="text-xs font-bold text-pink-300 mt-1">Love</span>
      </div>
    </motion.div>

    {/* Good At circle - blue */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
      className="absolute rounded-full border-2 border-blue-400/40"
      style={{
        width: '55%', height: '55%',
        top: '25%', left: '0%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.05) 70%)',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingRight: '20%', paddingTop: '10%' }}>
        <span className="text-2xl">💪</span>
        <span className="text-xs font-bold text-blue-300 mt-1">Skills</span>
      </div>
    </motion.div>

    {/* Pays Well circle - gold */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.7, type: 'spring', stiffness: 150 }}
      className="absolute rounded-full border-2 border-amber-400/40"
      style={{
        width: '55%', height: '55%',
        top: '25%', right: '0%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 70%)',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingLeft: '20%', paddingTop: '10%' }}>
        <span className="text-2xl">💰</span>
        <span className="text-xs font-bold text-amber-300 mt-1">Salary</span>
      </div>
    </motion.div>

    {/* World Needs circle - green */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 150 }}
      className="absolute rounded-full border-2 border-emerald-400/40"
      style={{
        width: '55%', height: '55%',
        bottom: '5%', left: '22.5%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 70%)',
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: '15%' }}>
        <span className="text-2xl">🌍</span>
        <span className="text-xs font-bold text-emerald-300 mt-1">Market</span>
      </div>
    </motion.div>

    {/* Center IKIGAI label */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
        <span className="font-heading text-xs font-black text-white uppercase tracking-wider">IKIGAI</span>
      </div>
    </motion.div>
  </div>
);

/* ── Main Component ────────────────────────────────────────── */
const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'loading'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, SavedAnswer>>({});
  const [direction, setDirection] = useState<1 | -1>(1);
  const [loadingStep, setLoadingStep] = useState(0);

  const currentQ = careerQuizQuestions[currentIdx];
  const progressPct = ((currentIdx + 1) / TOTAL) * 100;
  const pillarColor = PILLAR_COLORS[currentQ.pillar] ?? PILLAR_COLORS.love;

  // Which pillar section are we in?
  const currentPillar = PILLAR_RANGES.find(p => currentIdx >= p.start && currentIdx <= p.end);

  /* ── Answer selection ────────────────────────────────────── */
  const handleSelect = useCallback(
    (label: string, text: string) => {
      setAnswers(prev => ({
        ...prev,
        [currentQ.id]: {
          question: currentQ.id,
          answer: label,
          text,
          pillar: currentQ.pillar,
        },
      }));

      setTimeout(() => {
        if (currentIdx < TOTAL - 1) {
          setDirection(1);
          setCurrentIdx(i => i + 1);
        } else {
          finishQuiz(label, text);
        }
      }, 400);
    },
    [currentIdx, currentQ],
  );

  /* ── Finish quiz ─────────────────────────────────────────── */
  const finishQuiz = (lastLabel: string, lastText: string) => {
    const allAnswers: SavedAnswer[] = Object.values({
      ...answers,
      [currentQ.id]: {
        question: currentQ.id,
        answer: lastLabel,
        text: lastText,
        pillar: currentQ.pillar,
      },
    }).sort((a, b) => a.question - b.question);

    const q15 = allAnswers.find(a => a.question === 15);
    const stream = q15 ? streamMap[q15.answer] ?? 'Unknown' : 'Unknown';
    const ikigaiScores = computeIkigaiScores(allAnswers);

    const payload = {
      quizAnswers: allAnswers,
      ikigaiScores,
      stream,
      completedAt: Date.now(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setPhase('loading');
  };

  /* ── Loading animation stages → redirect ─────────────────── */
  useEffect(() => {
    if (phase !== 'loading') return;
    const timers = [
      setTimeout(() => setLoadingStep(1), 1200),
      setTimeout(() => setLoadingStep(2), 2400),
      setTimeout(() => setLoadingStep(3), 3600),
      setTimeout(() => navigate('/results'), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase, navigate]);

  /* ── Go back ─────────────────────────────────────────────── */
  const goBack = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx(i => i - 1);
    }
  };

  /* ── Slide animation ─────────────────────────────────────── */
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  /* ════════════════ INTRO SCREEN ════════════════════════════ */
  if (phase === 'intro') {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(170deg, #0A0F1E 0%, #111827 50%, #0F172A 100%)' }}
      >
        {/* Decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-lg mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            ✨ Career Discovery Quiz
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4"
          >
            Discover Your{' '}
            <span className="text-gradient">IKIGAI</span>{' '}
            🎯
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-base sm:text-lg max-w-md mx-auto mb-2"
          >
            We'll find where your passion, skills, salary goals and market demand all meet
          </motion.p>

          {/* IKIGAI Diagram */}
          <IkigaiDiagram />

          {/* Pillar labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              { emoji: '❤️', label: 'Love', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
              { emoji: '💪', label: 'Skills', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
              { emoji: '💰', label: 'Salary', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
              { emoji: '🌍', label: 'Market', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
            ].map(p => (
              <span key={p.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${p.color}`}>
                {p.emoji} {p.label}
              </span>
            ))}
          </motion.div>

          {/* Start Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: 'spring', stiffness: 200 }}
            onClick={() => setPhase('quiz')}
            className="glow-pulse inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-2xl font-heading font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)]"
          >
            Start Discovery <ArrowRight size={20} />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-slate-600 text-xs mt-5 font-medium"
          >
            15 questions • Takes 3 minutes • Free
          </motion.p>
        </div>
      </div>
    );
  }

  /* ════════════════ LOADING SCREEN (IKIGAI Building) ════════ */
  if (phase === 'loading') {
    const stages = [
      { text: 'Measuring what you love...', emoji: '❤️', color: 'text-pink-400' },
      { text: 'Analyzing your strengths...', emoji: '💪', color: 'text-blue-400' },
      { text: 'Checking market demand...', emoji: '🌍', color: 'text-emerald-400' },
      { text: 'Finding your IKIGAI...', emoji: '✨', color: 'text-amber-400' },
    ];

    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(170deg, #0A0F1E 0%, #111827 50%, #0F172A 100%)' }}
      >
        {/* Animated IKIGAI circles building up */}
        <div className="relative w-48 h-48 mb-10">
          {/* Love circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={loadingStep >= 0 ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 150 }}
            className="absolute rounded-full border-2 border-pink-400/50"
            style={{
              width: '60%', height: '60%', top: '0%', left: '20%',
              background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)',
            }}
          />
          {/* Good At circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={loadingStep >= 1 ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 150 }}
            className="absolute rounded-full border-2 border-blue-400/50"
            style={{
              width: '60%', height: '60%', top: '20%', left: '0%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
            }}
          />
          {/* World Needs circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={loadingStep >= 2 ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 150 }}
            className="absolute rounded-full border-2 border-emerald-400/50"
            style={{
              width: '60%', height: '60%', bottom: '0%', left: '20%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)',
            }}
          />
          {/* Pays Well circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={loadingStep >= 2 ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
            className="absolute rounded-full border-2 border-amber-400/50"
            style={{
              width: '60%', height: '60%', top: '20%', right: '0%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)',
            }}
          />
          {/* Center glow on final step */}
          {loadingStep >= 3 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400/30 to-purple-400/30 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                <span className="text-xl">✨</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Stage text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loadingStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="text-4xl mb-3">{stages[loadingStep].emoji}</div>
            <div className={`font-heading text-xl md:text-2xl font-bold ${stages[loadingStep].color}`}>
              {stages[loadingStep].text}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-3 mt-8">
          {stages.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                i <= loadingStep ? 'bg-blue-500 scale-110' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ════════════════ QUIZ UI ═════════════════════════════════ */
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: 'linear-gradient(170deg, #0A0F1E 0%, #111827 50%, #0F172A 100%)' }}
    >
      {/* ─── TOP BAR ──────────────────────────────────────── */}
      <div className="w-full px-4 pt-4 pb-2">
        <div className="max-w-3xl mx-auto">
          {/* Row: back / pillar indicator / exit */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={goBack}
              disabled={currentIdx === 0}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-slate-300" />
            </button>

            {/* Pillar indicator */}
            {currentPillar && (
              <span className={`text-sm font-bold ${pillarColor.accent}`}>
                {currentPillar.emoji} {currentPillar.label}
              </span>
            )}

            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-white transition-colors px-3 py-2 rounded-xl hover:bg-white/10"
            >
              <X size={16} /> Exit
            </Link>
          </div>

          {/* Pillar progress segments */}
          <div className="flex gap-1 mb-1">
            {PILLAR_RANGES.map(p => {
              const pc = PILLAR_COLORS[p.pillar];
              const total = p.end - p.start + 1;
              const answered = Array.from({ length: total }, (_, i) => p.start + i)
                .filter(idx => answers[careerQuizQuestions[idx]?.id]).length;
              const isActive = currentIdx >= p.start && currentIdx <= p.end;
              const fillPct = (answered / total) * 100;

              return (
                <div key={p.pillar} className="flex-1">
                  <div className={`h-1.5 rounded-full overflow-hidden ${isActive ? 'bg-white/15' : 'bg-white/5'}`}>
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${pc.gradient}`}
                      animate={{ width: `${fillPct}%` }}
                      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Question counter & encouragement */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-bold text-slate-500">
              Q{currentIdx + 1} of {TOTAL}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={getEncMsg(currentIdx)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`text-xs font-medium ${pillarColor.accent}`}
              >
                {getEncMsg(currentIdx)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─── QUESTION AREA ────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQ.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Question number badge + text */}
              <div className="text-center mb-8 md:mb-10">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${pillarColor.bg} border ${pillarColor.border} mb-4`}>
                  <span className={`font-heading text-xl font-black ${pillarColor.accent}`}>
                    Q{currentQ.id}
                  </span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug px-2">
                  {currentQ.question}
                </h2>
              </div>

              {/* 2×2 answer grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {currentQ.options.map(opt => {
                  const isSelected = answers[currentQ.id]?.answer === opt.label;

                  return (
                    <motion.button
                      key={opt.label}
                      onClick={() => handleSelect(opt.label, opt.text)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative group rounded-2xl p-5 md:p-6 text-left transition-all duration-200 border-2 ${
                        isSelected
                          ? `bg-gradient-to-br ${pillarColor.bg} ${pillarColor.border} shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)]`
                          : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r ${pillarColor.gradient} flex items-center justify-center`}
                        >
                          <Check size={14} className="text-white" strokeWidth={3} />
                        </motion.div>
                      )}

                      <div className="flex items-start gap-3">
                        <span className="text-3xl md:text-4xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          {opt.emoji}
                        </span>
                        <div className="min-w-0">
                          <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Option {opt.label}
                          </span>
                          <span className="block text-sm md:text-base font-semibold text-white leading-snug">
                            {opt.text}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── BOTTOM NAV DOTS ──────────────────────────────── */}
      <div className="py-4 flex justify-center gap-1.5 px-4 flex-wrap">
        {careerQuizQuestions.map((q, idx) => {
          const pColor = PILLAR_COLORS[q.pillar];
          const isCurrent = idx === currentIdx;
          const isAnswered = !!answers[q.id];

          return (
            <div
              key={q.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                isCurrent
                  ? `bg-gradient-to-r ${pColor.gradient} w-6`
                  : isAnswered
                  ? `bg-gradient-to-r ${pColor.gradient} opacity-50 w-2`
                  : 'bg-slate-700 w-2'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuizPage;
