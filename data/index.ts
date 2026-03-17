// Master Course Index - exports all course categories
import { CourseIntelligence } from './courseTypes';
import { engineeringCourses } from './courses/engineering';
import { medicalCourses } from './courses/medical';
import { commerceCourses } from './courses/commerce';
import { scienceCourses } from './courses/science';
import { creativeCourses } from './courses/creative';
import { lawCourses } from './courses/law';
import { agricultureCourses } from './courses/agriculture';
import { hospitalityCourses } from './courses/hospitality';
import { mediaCourses } from './courses/media';
import { emergingCourses } from './courses/emerging';

// All courses combined
export const allCourses: CourseIntelligence[] = [
  ...engineeringCourses,
  ...medicalCourses,
  ...commerceCourses,
  ...scienceCourses,
  ...creativeCourses,
  ...lawCourses,
  ...agricultureCourses,
  ...hospitalityCourses,
  ...mediaCourses,
  ...emergingCourses,
];

// Category-wise exports
export {
  engineeringCourses,
  medicalCourses,
  commerceCourses,
  scienceCourses,
  creativeCourses,
  lawCourses,
  agricultureCourses,
  hospitalityCourses,
  mediaCourses,
  emergingCourses,
};

// Category names and counts
export const courseCategories = [
  { name: "Engineering and Technology", key: "engineering", count: engineeringCourses.length },
  { name: "Medical and Health Sciences", key: "medical", count: medicalCourses.length },
  { name: "Commerce and Business", key: "commerce", count: commerceCourses.length },
  { name: "Science and Research", key: "science", count: scienceCourses.length },
  { name: "Creative and Design", key: "creative", count: creativeCourses.length },
  { name: "Law and Governance", key: "law", count: lawCourses.length },
  { name: "Agriculture and Environmental Sciences", key: "agriculture", count: agricultureCourses.length },
  { name: "Hospitality and Tourism", key: "hospitality", count: hospitalityCourses.length },
  { name: "Media and Communication", key: "media", count: mediaCourses.length },
  { name: "Emerging Future Technologies", key: "emerging", count: emergingCourses.length },
];

// Helper: find course by slug
export function getCourseBySlug(slug: string): CourseIntelligence | undefined {
  return allCourses.find(c => c.seo.slug === slug);
}

// Helper: search courses
export function searchCourses(query: string): CourseIntelligence[] {
  const q = query.toLowerCase();
  return allCourses.filter(c =>
    c.course_name.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.seo.seo_keywords.some(k => k.toLowerCase().includes(q)) ||
    c.career_paths.some(p => p.toLowerCase().includes(q))
  );
}

// Helper: get courses by category
export function getCoursesByCategory(category: string): CourseIntelligence[] {
  return allCourses.filter(c => c.category === category);
}

// Total course count
export const totalCourseCount = allCourses.length;

// Expected imports/exports layout
export { allCareers } from './careers';
export { allSkills } from './skills';

export { interestCareerMap, skillCareerMap, subjectCareerMap } from './ikigai/ikigaiMapping';
export { industryTrends } from './market/industryTrends';

export { careerDiscoveryQuestions } from './quiz/careerDiscoveryQuestions';
export { findTopCareers } from './matching/careerMatchingEngine';
export { processQuizResults } from './matching/quizProcessor';
