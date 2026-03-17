import { allCareers } from '../careers';
import { industryTrends } from '../market/industryTrends';
import { CareerIntelligence } from '../careerTypes';

export interface StudentProfile {
  interests: string[];
  skills: string[];
  academic_strengths: string[];
  personality_traits: string[];
}

export interface CareerMatch {
  career_name: string;
  slug: string;
  match_score: number;        // 0-100
  reason_for_match: string;
  recommended_courses: string[];
  future_demand_score: number;
  average_salary: string;
}

// Helper to parse salary string like "₹12L–₹35L" into a number representing the max or average (e.g. 35)
function parseMaxSalaryLakhs(salaryStr: string): number {
  if (!salaryStr) return 0;
  // Match the last occurrence of a number followed by 'L' or 'Cr'
  const match = salaryStr.match(/₹([\d.]+)L/g);
  let highest = 0;
  if (match) {
    match.forEach(m => {
      const val = parseFloat(m.replace('₹', '').replace('L', ''));
      if (val > highest) highest = val;
    });
  } else if (salaryStr.includes('Cr')) {
    // If it contains Cr, it's very high, assign a high base value in Lakhs
    highest = 100;
  }
  return highest || 10; // default generic fallback
}

export function findTopCareers(profile: StudentProfile): CareerMatch[] {
  const matches: CareerMatch[] = [];

  // Define max salary out of all careers to normalize the salary score
  let globalMaxSalary = 1;
  allCareers.forEach(c => {
    const maxSal = parseMaxSalaryLakhs(c.average_salary_experienced);
    if (maxSal > globalMaxSalary) globalMaxSalary = maxSal;
  });

  allCareers.forEach((career) => {
    // 1. Interest Match (30%)
    let interestMatch = 0;
    if (career.recommended_interests.length > 0) {
      const profileInterestsLower = profile.interests.map(i => i.toLowerCase());
      const careerInterestsLower = career.recommended_interests.map(i => i.toLowerCase());
      const intersection = careerInterestsLower.filter(i => profileInterestsLower.includes(i));
      interestMatch = intersection.length / career.recommended_interests.length;
    }

    // 2. Skill Match (25%)
    let skillMatch = 0;
    if (career.required_skills.length > 0) {
      const profileSkillsLower = profile.skills.map(s => s.toLowerCase());
      const careerSkillsLower = career.required_skills.map(s => s.toLowerCase());
      const intersection = careerSkillsLower.filter(s => profileSkillsLower.includes(s));
      skillMatch = intersection.length / career.required_skills.length;
    }

    // 3. Subject Match (15%)
    // Check if the student's academic strengths appear as keywords in the related courses
    let subjectMatch = 0;
    if (profile.academic_strengths.length > 0 && career.related_courses.length > 0) {
      let subjectsMatched = 0;
      const joinedCourses = career.related_courses.join(' ').toLowerCase();
      profile.academic_strengths.forEach(subj => {
        if (joinedCourses.includes(subj.toLowerCase())) {
          subjectsMatched++;
        }
      });
      subjectMatch = Math.min(subjectsMatched / 2, 1); // Normalize so 2 matches is 100%
    }

    // 4. Future Demand Match (20%)
    // Assume demand score is directly provided by the career, if not, pull from industryTrends
    let futureDemandScore = career.future_demand_score || 50;
    let futureDemand = futureDemandScore / 100;

    // 5. Salary Score (10%)
    const careerMaxSalary = parseMaxSalaryLakhs(career.average_salary_experienced);
    let salaryScore = careerMaxSalary / globalMaxSalary;

    // Calculate Final Weighted Score
    const finalScore = 
      (interestMatch * 0.30) +
      (skillMatch * 0.25) +
      (subjectMatch * 0.15) +
      (futureDemand * 0.20) +
      (salaryScore * 0.10);

    // Convert to 0-100 percentage
    const matchPercentage = Math.round(finalScore * 100);

    // Generate Reason String
    const matchingAttributes = [];
    if (interestMatch > 0) matchingAttributes.push("aligns with your interests");
    if (skillMatch > 0) matchingAttributes.push("utilizes your current skill sets");
    if (subjectMatch > 0) matchingAttributes.push("fits your academic background");
    
    let reasonString = "This career is an excellent fit.";
    if (matchingAttributes.length > 0) {
      reasonString = `This career is highly recommended because it ${matchingAttributes.join(", and ")}.`;
    }

    matches.push({
      career_name: career.career_name,
      slug: career.slug || career.career_name.toLowerCase().replace(/\s+/g, '-'),
      match_score: matchPercentage,
      reason_for_match: reasonString,
      recommended_courses: career.related_courses,
      future_demand_score: futureDemandScore,
      average_salary: career.average_salary_experienced
    });
  });

  // Sort descending by score and return top 5
  return matches.sort((a, b) => b.match_score - a.match_score).slice(0, 5);
}
