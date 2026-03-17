export interface CareerQuizOption {
  label: string;   // "A" | "B" | "C" | "D"
  emoji: string;
  text: string;
}

export type IkigaiPillar = 'love' | 'goodAt' | 'paysWell' | 'worldNeeds' | 'stream';

export interface CareerQuizQuestion {
  id: number;
  question: string;
  pillar: IkigaiPillar;
  pillarLabel: string;
  options: CareerQuizOption[];
}

export const careerQuizQuestions: CareerQuizQuestion[] = [
  // ━━━━ ❤️ PILLAR 1: WHAT YOU LOVE (Q1-Q4) ━━━━
  {
    id: 1,
    question: "What activity makes you forget time completely?",
    pillar: 'love',
    pillarLabel: '❤️ Passion Section',
    options: [
      { label: "A", emoji: "💻", text: "Coding / building tech things" },
      { label: "B", emoji: "🎨", text: "Drawing / designing / creating art" },
      { label: "C", emoji: "📊", text: "Solving math / business problems" },
      { label: "D", emoji: "🤝", text: "Talking / helping / teaching people" },
    ],
  },
  {
    id: 2,
    question: "Which topic could you read about for hours?",
    pillar: 'love',
    pillarLabel: '❤️ Passion Section',
    options: [
      { label: "A", emoji: "🔬", text: "Science, technology, research" },
      { label: "B", emoji: "🏥", text: "Human body, medicine, health" },
      { label: "C", emoji: "💼", text: "Business, money, startups" },
      { label: "D", emoji: "🌍", text: "Society, law, environment, history" },
    ],
  },
  {
    id: 3,
    question: "If money was not a problem, what would you do?",
    pillar: 'love',
    pillarLabel: '❤️ Passion Section',
    options: [
      { label: "A", emoji: "🤖", text: "Build software / AI / apps" },
      { label: "B", emoji: "🎭", text: "Create art / films / music / games" },
      { label: "C", emoji: "🏢", text: "Run a company / startup" },
      { label: "D", emoji: "👨‍⚕️", text: "Help sick people / do research" },
    ],
  },
  {
    id: 4,
    question: "Which school project did you enjoy most?",
    pillar: 'love',
    pillarLabel: '❤️ Passion Section',
    options: [
      { label: "A", emoji: "🔧", text: "Science project / coding / experiment" },
      { label: "B", emoji: "🎨", text: "Art / craft / creative project" },
      { label: "C", emoji: "📊", text: "Business plan / math project" },
      { label: "D", emoji: "📝", text: "Essay / debate / social project" },
    ],
  },

  // ━━━━ 💪 PILLAR 2: WHAT YOU ARE GOOD AT (Q5-Q8) ━━━━
  {
    id: 5,
    question: "What do friends/family always ask YOUR help for?",
    pillar: 'goodAt',
    pillarLabel: '💪 Strengths Section',
    options: [
      { label: "A", emoji: "💻", text: "Tech problems / fixing devices" },
      { label: "B", emoji: "🎨", text: "Creative work / design help" },
      { label: "C", emoji: "💰", text: "Advice / planning / decisions" },
      { label: "D", emoji: "❤️", text: "Personal problems / emotional support" },
    ],
  },
  {
    id: 6,
    question: "Which skill comes most naturally to you?",
    pillar: 'goodAt',
    pillarLabel: '💪 Strengths Section',
    options: [
      { label: "A", emoji: "⚡", text: "Logical thinking & problem solving" },
      { label: "B", emoji: "🎭", text: "Creativity & visual thinking" },
      { label: "C", emoji: "📢", text: "Communication & leadership" },
      { label: "D", emoji: "🔬", text: "Research & deep analysis" },
    ],
  },
  {
    id: 7,
    question: "In group projects, what role do you naturally take?",
    pillar: 'goodAt',
    pillarLabel: '💪 Strengths Section',
    options: [
      { label: "A", emoji: "🖥️", text: "Technical work / coding / analysis" },
      { label: "B", emoji: "🎨", text: "Design / presentation / creative" },
      { label: "C", emoji: "👑", text: "Leading / organizing / deciding" },
      { label: "D", emoji: "🤝", text: "Supporting / coordinating / helping" },
    ],
  },
  {
    id: 8,
    question: "Which subject got your best grades naturally?",
    pillar: 'goodAt',
    pillarLabel: '💪 Strengths Section',
    options: [
      { label: "A", emoji: "📐", text: "Maths & Physics" },
      { label: "B", emoji: "🔬", text: "Biology & Chemistry" },
      { label: "C", emoji: "💰", text: "Commerce & Economics" },
      { label: "D", emoji: "📚", text: "Languages & Social Sciences" },
    ],
  },

  // ━━━━ 💰 PILLAR 3: WHAT PAYS WELL (Q9-Q11) ━━━━
  {
    id: 9,
    question: "What is your salary goal in 10 years?",
    pillar: 'paysWell',
    pillarLabel: '💰 Salary Section',
    options: [
      { label: "A", emoji: "💎", text: "₹20L–₹50L (high corporate salary)" },
      { label: "B", emoji: "🚀", text: "₹1Cr+ (entrepreneur / top professional)" },
      { label: "C", emoji: "🏥", text: "₹10L–₹20L (stable professional)" },
      { label: "D", emoji: "❤️", text: "Salary is not my priority" },
    ],
  },
  {
    id: 10,
    question: "How long are you willing to study/train?",
    pillar: 'paysWell',
    pillarLabel: '💰 Salary Section',
    options: [
      { label: "A", emoji: "⚡", text: "2-3 years (quick career start)" },
      { label: "B", emoji: "📚", text: "4-5 years (standard degree)" },
      { label: "C", emoji: "🎓", text: "6-8 years (doctor/CA/IAS level)" },
      { label: "D", emoji: "🔄", text: "Lifelong learning is fine" },
    ],
  },
  {
    id: 11,
    question: "Which work style fits your salary goals?",
    pillar: 'paysWell',
    pillarLabel: '💰 Salary Section',
    options: [
      { label: "A", emoji: "🏢", text: "Corporate job with growth & bonuses" },
      { label: "B", emoji: "💼", text: "Own business / freelance (risky but high reward)" },
      { label: "C", emoji: "🏥", text: "Government / stable service job" },
      { label: "D", emoji: "🌍", text: "NGO / social work (purpose over money)" },
    ],
  },

  // ━━━━ 🌍 PILLAR 4: WHAT WORLD NEEDS (Q12-Q14) ━━━━
  {
    id: 12,
    question: "Which problem do you most want to solve?",
    pillar: 'worldNeeds',
    pillarLabel: '🌍 Market Section',
    options: [
      { label: "A", emoji: "🤖", text: "Tech gap (people need more AI/software)" },
      { label: "B", emoji: "🏥", text: "Health gap (people need better healthcare)" },
      { label: "C", emoji: "💰", text: "Wealth gap (people need financial guidance)" },
      { label: "D", emoji: "📚", text: "Education/justice gap (people need equality)" },
    ],
  },
  {
    id: 13,
    question: "Which industry do you think will grow most?",
    pillar: 'worldNeeds',
    pillarLabel: '🌍 Market Section',
    options: [
      { label: "A", emoji: "💻", text: "Technology & AI" },
      { label: "B", emoji: "🏥", text: "Healthcare & Biotech" },
      { label: "C", emoji: "💼", text: "Finance & Business" },
      { label: "D", emoji: "🌱", text: "Environment & Sustainability" },
    ],
  },
  {
    id: 14,
    question: "What type of impact do you want to create?",
    pillar: 'worldNeeds',
    pillarLabel: '🌍 Market Section',
    options: [
      { label: "A", emoji: "🚀", text: "Build products used by millions" },
      { label: "B", emoji: "❤️", text: "Directly help people one-on-one" },
      { label: "C", emoji: "💰", text: "Create jobs / build economy" },
      { label: "D", emoji: "⚖️", text: "Change laws / policy / society" },
    ],
  },

  // ━━━━ 📚 STREAM IDENTIFIER (Q15) ━━━━
  {
    id: 15,
    question: "What is your Inter stream?",
    pillar: 'stream',
    pillarLabel: '📚 Your Stream',
    options: [
      { label: "A", emoji: "📐", text: "MPC (Maths, Physics, Chemistry)" },
      { label: "B", emoji: "🔬", text: "BiPC (Biology, Physics, Chemistry)" },
      { label: "C", emoji: "💰", text: "MEC / CEC (Commerce)" },
      { label: "D", emoji: "📖", text: "HEC / Arts / Other" },
    ],
  },
];

/** Map Q15 answer label to stream name */
export const streamMap: Record<string, string> = {
  A: "MPC",
  B: "BiPC",
  C: "MEC",
  D: "HEC",
};

/** Pillar accent colors for UI theming */
export const PILLAR_COLORS: Record<string, { accent: string; bg: string; border: string; gradient: string }> = {
  love:       { accent: 'text-pink-400',    bg: 'bg-pink-500/10',    border: 'border-pink-500/20',    gradient: 'from-pink-500 to-rose-500' },
  goodAt:     { accent: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    gradient: 'from-blue-500 to-cyan-500' },
  paysWell:   { accent: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   gradient: 'from-amber-400 to-yellow-500' },
  worldNeeds: { accent: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', gradient: 'from-emerald-500 to-green-500' },
  stream:     { accent: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  gradient: 'from-purple-500 to-violet-500' },
};
