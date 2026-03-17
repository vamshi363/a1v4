// ─── Skill Intelligence Schema ──────────────────────────────────────────────

export interface SkillSEO {
  page_title: string;
  meta_description: string;
  seo_keywords: string[];
  slug: string;
  faq_section: { question: string; answer: string }[];
}

export interface SkillIntelligence {
  skill_name: string;
  slug: string;
  description: string;
  related_careers: string[];
  related_courses: string[];
  seo: SkillSEO;
}
