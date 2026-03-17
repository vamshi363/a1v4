import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, GraduationCap, Compass, Trophy, Brain, Star, ChevronRight, Zap, Target, Map, Award, MessageCircle } from 'lucide-react';

// ─── Animated Particle Background ───────────────────────────────────────────
const ParticleField: React.FC = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 12}s`,
    size: `${2 + Math.random() * 3}px`,
    opacity: 0.2 + Math.random() * 0.4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

// ─── Animated Counter ────────────────────────────────────────────────────────
const AnimatedCounter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ target, suffix = '+', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Data ────────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Courses', value: 100, icon: <BookOpen size={18} /> },
  { label: 'Careers', value: 50, icon: <Compass size={18} /> },
  { label: 'Colleges', value: 200, icon: <GraduationCap size={18} /> },
  { label: 'Scholarships', value: 50, icon: <Award size={18} /> },
];

const steps = [
  { step: 1, title: 'Take Quiz', subtitle: '3 min', icon: <Target size={28} />, color: 'from-blue-500 to-blue-600' },
  { step: 2, title: 'See Career Matches', subtitle: 'AI-Powered', icon: <Sparkles size={28} />, color: 'from-purple-500 to-purple-600' },
  { step: 3, title: 'Explore Courses & Colleges', subtitle: 'Detailed Guides', icon: <BookOpen size={28} />, color: 'from-emerald-500 to-emerald-600' },
  { step: 4, title: 'Find Scholarships & Exams', subtitle: 'Save Money', icon: <Trophy size={28} />, color: 'from-amber-500 to-amber-600' },
  { step: 5, title: 'Get AI Guidance', subtitle: 'Personalized', icon: <Brain size={28} />, color: 'from-rose-500 to-rose-600' },
];

const careers = [
  { name: 'Engineering', emoji: '⚙️', salary: '₹6L – ₹25L', demand: 'Very High', color: 'border-blue-500/30 hover:border-blue-500' },
  { name: 'Medicine', emoji: '🩺', salary: '₹8L – ₹30L', demand: 'Very High', color: 'border-emerald-500/30 hover:border-emerald-500' },
  { name: 'Design', emoji: '🎨', salary: '₹4L – ₹18L', demand: 'High', color: 'border-purple-500/30 hover:border-purple-500' },
  { name: 'Law', emoji: '⚖️', salary: '₹5L – ₹20L', demand: 'High', color: 'border-amber-500/30 hover:border-amber-500' },
  { name: 'Business', emoji: '📊', salary: '₹5L – ₹22L', demand: 'Very High', color: 'border-rose-500/30 hover:border-rose-500' },
  { name: 'Arts', emoji: '🎭', salary: '₹3L – ₹15L', demand: 'Medium', color: 'border-cyan-500/30 hover:border-cyan-500' },
];

const testimonials = [
  {
    name: 'Priya Reddy',
    college: 'JNTU Hyderabad',
    text: `I was totally confused after Inter. The career quiz showed me that Data Science matched my interests perfectly. Now I'm in my 2nd year B.Tech CS and loving every bit of it!`,
    avatar: '👩‍🎓',
    rating: 5,
  },
  {
    name: 'Arjun Kumar',
    college: 'Osmania University',
    text: `My parents wanted me to do Engineering but my heart was in design. After Inter helped me discover UI/UX Design as a career. The scholarship finder saved my family ₹2 Lakhs!`,
    avatar: '👨‍💻',
    rating: 5,
  },
  {
    name: 'Sneha Sharma',
    college: 'NALSAR Hyderabad',
    text: `I never knew Law could be such a rewarding career until I took the quiz. The step-by-step roadmap and college recommendations were spot on. Highly recommend to all Inter students!`,
    avatar: '👩‍⚖️',
    rating: 5,
  },
];

// ─── Stagger animation variants ─────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Main Component ─────────────────────────────────────────────────────────
const HomePage: React.FC = () => {
  return (
    <div className="w-full relative bg-navy">
      
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center px-4 overflow-hidden"
        style={{ background: 'linear-gradient(170deg, #0A0F1E 0%, #111827 50%, #0F172A 100%)' }}
      >
        <ParticleField />
        
        {/* Decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Zap size={14} /> Trusted by 10,000+ students
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6"
          >
            Confused After Inter?{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient">Find Your Perfect Career</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover careers based on your interests, skills & future demand.{' '}
            <span className="text-slate-300 font-medium">Used by 10,000+ students in Telangana & AP</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
          >
            <Link
              to="/quiz"
              className="glow-pulse inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-heading font-black text-base sm:text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)]"
            >
              Start Career Discovery Quiz
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-slate-600 text-xs mt-6 font-medium"
          >
            Free • No login required • Takes just 3 minutes
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative z-10 -mt-10 px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-blue-400 mb-2">{stat.icon}</div>
                <div className="font-heading text-3xl md:text-4xl font-black text-white">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="text-slate-400 text-sm font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-4 block">How It Works</span>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white">
              Your Career Path in{' '}
              <span className="text-gradient">5 Simple Steps</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="relative group"
              >
                <div className="glass-card rounded-3xl p-6 text-center hover:bg-white/10 transition-all duration-300 h-full flex flex-col items-center">
                  {/* Step number */}
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                    Step {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-white text-lg mb-1">{step.title}</h3>
                  <p className="text-slate-500 text-xs font-medium">{step.subtitle}</p>
                </div>

                {/* Connector arrow (hidden on mobile / last item) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight size={16} className="text-slate-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FEATURED CAREERS ═══════════════ */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #0A0F1E, #111827)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400 mb-4 block">Popular Paths</span>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white">
              Explore <span className="text-gradient">Top Careers</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm md:text-base">
              Data-driven insights on salary, demand, and growth for the most popular career paths after Intermediate.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {careers.map((career) => (
              <motion.div
                key={career.name}
                variants={itemVariants}
                className={`glass-card rounded-3xl p-6 md:p-8 border-2 ${career.color} transition-all duration-300 hover:bg-white/5 group cursor-pointer`}
              >
                {/* Emoji + Name */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{career.emoji}</span>
                  <h3 className="font-heading text-xl md:text-2xl font-black text-white">{career.name}</h3>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Avg Salary</span>
                    <span className="text-white font-bold text-sm">{career.salary}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Demand</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      career.demand === 'Very High' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : career.demand === 'High'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {career.demand}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-blue-400 text-sm font-bold group-hover:text-blue-300 transition-colors">
                  Explore {career.name} Careers <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 mb-4 block">Student Stories</span>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white">
              Hear From <span className="text-gradient">Real Students</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={itemVariants}
                className="glass-card rounded-3xl p-6 md:p-8 hover:bg-white/5 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.college}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #2563EB 100%)' }}
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10 text-center p-10 md:p-16">
            <h2 className="font-heading text-2xl md:text-5xl font-black text-white mb-4 leading-tight">
              Ready to Find Your Path?
            </h2>
            <p className="text-blue-100 text-sm md:text-lg mb-8 max-w-xl mx-auto">
              Take our free 3-minute Career Discovery Quiz and unlock personalized recommendations for your future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/quiz"
                className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-2xl font-heading font-black text-lg hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles size={20} /> Take the Quiz Now
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto bg-blue-800/50 text-white px-8 py-4 rounded-2xl font-heading font-bold text-lg hover:bg-blue-800/70 transition-all hover:-translate-y-1 border border-white/20 flex items-center justify-center gap-2"
              >
                <BookOpen size={20} /> Browse Courses
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;