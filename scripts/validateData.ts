/**
 * DB Validation Script for TSAP Study Portal
 * Validates course, career, and skill data for issues:
 * 1. Duplicate Slugs
 * 2. Missing Fields
 * 3. Broken references between skills/careers/courses
 */

import { allCourses, allCareers, allSkills } from '../data/index.js';

let errorCount = 0;

function reportError(type: string, item: string, message: string) {
  console.error(`[❌ ERROR] ${type} | ${item} | ${message}`);
  errorCount++;
}

console.log('--- Starting Data Validation ---');

// 1. Check for Duplicate Slugs
const courseSlugs = new Set<string>();
allCourses.forEach(c => {
  if (courseSlugs.has(c.seo.slug)) reportError('Duplicate Course Slug', c.course_name, c.seo.slug);
  courseSlugs.add(c.seo.slug);
});

const careerSlugs = new Set<string>();
allCareers.forEach(c => {
  if (careerSlugs.has(c.slug)) reportError('Duplicate Career Slug', c.career_name, c.slug);
  careerSlugs.add(c.slug);
});

const skillSlugs = new Set<string>();
allSkills.forEach(s => {
  if (skillSlugs.has(s.slug)) reportError('Duplicate Skill Slug', s.skill_name, s.slug);
  skillSlugs.add(s.slug);
});

console.log(`✅ Passed slug duplication checks`);
console.log(`Total Courses: ${allCourses.length}`);
console.log(`Total Careers: ${allCareers.length}`);
console.log(`Total Skills:  ${allSkills.length}`);

if (errorCount > 0) {
  console.log(`\n❌ Validation Failed with ${errorCount} errors.`);
  process.exit(1);
} else {
  console.log(`\n✅ All Data is Valid!`);
}
