// ─── Course Intelligence Schema ─────────────────────────────────────────────

export interface SubjectsByYear {
  year1: string[];
  year2: string[];
  year3: string[];
  year4: string[];
}

export interface CareerRoadmap {
  year1: string[];
  year2: string[];
  year3: string[];
  year4: string[];
}

export interface CourseSEO {
  page_title: string;
  meta_description: string;
  seo_keywords: string[];
  slug: string;
  faq_section: { question: string; answer: string }[];
}

export interface CourseIntelligence {
  course_name: string;
  category: string;
  course_overview: string;
  course_duration: string;
  subjects_by_year: SubjectsByYear;
  skills_students_learn: string[];
  career_paths: string[];
  industries_hiring: string[];
  average_salary_india_fresher: string;
  average_salary_india_experienced: string;
  future_demand_score: number;
  future_growth_reason: string;
  automation_risk: "Low" | "Medium" | "High";
  recommended_for_students_with_interests: string[];
  entrance_exams_india: string[];
  top_indian_colleges: string[];
  government_scholarships: string[];
  private_scholarships: string[];
  related_courses: string[];

  // Career Discovery fields
  required_skills: string[];
  recommended_interests: string[];
  personality_fit: string[];
  academic_strengths: string[];
  industry_sectors: string[];
  career_roadmap: CareerRoadmap;

  seo: CourseSEO;
}
