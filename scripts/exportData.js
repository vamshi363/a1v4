import { writeFileSync } from 'fs';
import { join } from 'path';
import { allCourses } from './data/index.js';
import { allCareers } from './data/index.js';
import { allSkills } from './data/index.js';

// Convert the TypeScript data objects to JSON and write to disk
const outputDir = join(process.cwd(), 'data');

const exportedData = {
  courses: allCourses,
  careers: allCareers,
  skills: allSkills
};

writeFileSync(join(outputDir, 'intelligence_db.json'), JSON.stringify(exportedData, null, 2));
console.log(`Successfully exported ${allCourses.length} courses, ${allCareers.length} careers, and ${allSkills.length} skills to data/intelligence_db.json`);
