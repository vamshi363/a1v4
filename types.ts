
export interface University {
  id: string;
  name: string;
  state: 'Telangana' | 'Andhra Pradesh';
  city: string;
  district: string;
  type: 'Government' | 'Private' | 'Deemed' | 'Autonomous';
  affiliation: string;
  naacGrade: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  courses: Course[];
  fees: {
    tuition: string;
    hostel: string;
  };
  cutoffs: {
    year: string;
    rank: number;
  }[];
  description: string;
  dataSource: string; // Added field for mandatory source attribution
}

export interface Course {
  name: string;
  level: 'UG' | 'PG' | 'Diploma';
  duration: string;
  eligibility: string;
}

export interface Scholarship {
  id: string;
  name: string;
  type: 'State' | 'Central' | 'Private';
  provider: string;
  eligibility: string;
  deadline: string;
  amount: string;
  documents: string[];
  applyLink: string;
  description: string;
  dataSource: string; // Added field for mandatory source attribution
}

export interface SavedItem {
  id: string;
  type: 'university' | 'scholarship';
  name: string;
  addedAt: string;
}

// NEW: AI Verification Schema for Exams
export interface Exam {
  id: string;
  name: string;
  fullName: string;
  category: 'Government' | 'Private Engineering' | 'Management' | 'Design' | 'Global' | 'Skill-Based';
  level: 'State' | 'National' | 'University' | 'International';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  courses: string[];
  colleges: string[]; 
  date: string;
  website: string;
  description: string;
  eligibility: string;
  frequency: string;
  feeRange: string;
  languages: string[];
  pattern: string;
  prepTips: string;

  // AI Pipeline Fields
  applicationStart?: string; // ISO Date YYYY-MM-DD
  applicationEnd?: string;   // ISO Date YYYY-MM-DD
  verificationStatus: 'Verified' | 'Pending' | 'Official-Site-Down';
  lastVerified: string; // ISO Timestamp
  sourceUrl?: string; // Deep link to the specific notification
  aiConfidenceScore?: number; // 0.0 to 1.0
}
