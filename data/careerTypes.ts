// ─── Career Intelligence Schema ─────────────────────────────────────────────

export interface CareerRoadmap {
  year1: string[];
  year2: string[];
  year3: string[];
  year4: string[];
}

export interface CareerSEO {
  page_title: string;
  meta_description: string;
  seo_keywords: string[];
  slug: string;
  faq_section: { question: string; answer: string }[];
}

export interface CareerIntelligence {
  career_name: string;
  slug: string;
  description: string;
  day_to_day_work: string;
  required_skills: string[];
  recommended_interests: string[];
  average_salary_fresher: string;
  average_salary_experienced: string;
  future_demand_score: number;
  future_growth_reason: string;
  automation_risk: "Low" | "Medium" | "High";
  related_courses: string[];
  industry_sectors: string[];
  career_roadmap: CareerRoadmap;
  seo: CareerSEO;
}
