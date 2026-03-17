import { QuizResponse } from '../quiz/quizTypes';
import { StudentProfile } from './careerMatchingEngine';
import { careerDiscoveryQuestions } from '../quiz/careerDiscoveryQuestions';

export function processQuizResults(responses: QuizResponse[]): StudentProfile {
  const profile: StudentProfile = {
    interests: [],
    skills: [],
    academic_strengths: [],
    personality_traits: []
  };

  responses.forEach(response => {
    // Find the original question to know its category and options
    const question = careerDiscoveryQuestions.find(q => q.id === response.question_id);
    if (!question) return;

    if (question.type === 'multiple_choice' || question.type === 'situational') {
      const selectedOption = question.options.find(opt => opt.value === response.selected_value);
      if (selectedOption && selectedOption.associated_tags) {
        if (question.category === 'interest') {
          profile.interests.push(...selectedOption.associated_tags);
        } else if (question.category === 'skill') {
          profile.skills.push(...selectedOption.associated_tags);
        } else if (question.category === 'personality') {
          profile.personality_traits.push(...selectedOption.associated_tags);
        } else if (question.category === 'academic') {
          profile.academic_strengths.push(...selectedOption.associated_tags);
        }
      }
    } else if (question.type === 'scale') {
      const numericValue = typeof response.selected_value === 'number' ? response.selected_value : parseInt(String(response.selected_value), 10);
      // If scale rating is high (e.g., 4 or 5 out of 5), add the tags related to this scaled question
      if (numericValue >= 4) {
        // We assume the first option holds the associated tags for the scale concept
        const tags = question.options[0]?.associated_tags || [];
        if (question.category === 'interest') {
          profile.interests.push(...tags);
        } else if (question.category === 'skill') {
          profile.skills.push(...tags);
        } else if (question.category === 'personality') {
          profile.personality_traits.push(...tags);
        }
      }
    }
  });

  // Deduplicate array values
  profile.interests = [...new Set(profile.interests)];
  profile.skills = [...new Set(profile.skills)];
  profile.academic_strengths = [...new Set(profile.academic_strengths)];
  profile.personality_traits = [...new Set(profile.personality_traits)];

  return profile;
}
