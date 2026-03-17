import { QuizQuestion } from './quizTypes';

export const careerDiscoveryQuestions: QuizQuestion[] = [
  // -- INTEREST QUESTIONS --
  {
    id: "int_01",
    category: "interest",
    type: "situational",
    question_text: "In your free time, which of these activities sounds most appealing?",
    options: [
      { text: "Building a computer app or website", value: "A", associated_tags: ["technology", "coding"] },
      { text: "Writing a story or keeping a journal", value: "B", associated_tags: ["writing", "creative"] },
      { text: "Helping someone resolve a dispute", value: "C", associated_tags: ["helping others", "law", "communication"] },
      { text: "Analyzing statistics from your favorite sport", value: "D", associated_tags: ["math", "data analysis", "science"] }
    ]
  },
  {
    id: "int_02",
    category: "interest",
    type: "scale",
    question_text: "On a scale of 1-5, how much do you enjoy drawing, designing, or making things look visually appealing?",
    options: [
      { text: "Scale Concept", value: "scale", associated_tags: ["art", "design", "creative"] }
    ]
  },
  {
    id: "int_03",
    category: "interest",
    type: "multiple_choice",
    question_text: "Which industry fascinates you the most?",
    options: [
      { text: "Healthcare & Medicine", value: "health", associated_tags: ["medicine", "science", "helping others"] },
      { text: "Corporate Business & Finance", value: "business", associated_tags: ["business", "finance", "leadership"] },
      { text: "Robotics & Engineering", value: "engineering", associated_tags: ["technology", "machines", "physics"] },
      { text: "Media, Film & Entertainment", value: "media", associated_tags: ["media", "art", "creative"] }
    ]
  },

  // -- SKILL QUESTIONS --
  {
    id: "sk_01",
    category: "skill",
    type: "scale",
    question_text: "On a scale of 1-5, how comfortable are you with complex math and numbers?",
    options: [
      { text: "Scale Concept", value: "scale", associated_tags: ["mathematics", "analytical_thinking"] }
    ]
  },
  {
    id: "sk_02",
    category: "skill",
    type: "situational",
    question_text: "When working on a group project, what role do you naturally take?",
    options: [
      { text: "The Planner (organizing tasks and timelines)", value: "A", associated_tags: ["project_management", "leadership"] },
      { text: "The Creator (designing slides or writing content)", value: "B", associated_tags: ["design", "writing"] },
      { text: "The Presenter (speaking in front of the class)", value: "C", associated_tags: ["public_speaking", "communication"] },
      { text: "The Analyst (doing the research and fact-checking)", value: "D", associated_tags: ["analytical_thinking", "research"] }
    ]
  },
  {
    id: "sk_03",
    category: "skill",
    type: "multiple_choice",
    question_text: "Which of these software tools do you feel most comfortable learning or using?",
    options: [
      { text: "Programming Languages (Python, C++)", value: "code", associated_tags: ["programming", "coding"] },
      { text: "Spreadsheets (Excel, Google Sheets)", value: "excel", associated_tags: ["data_analysis", "spreadsheet", "accounting"] },
      { text: "Design/Video Editing Tools (Photoshop, Premiere)", value: "design_tools", associated_tags: ["graphic_design", "video_editing"] },
      { text: "Writing / Publishing tools (Word, WordPress)", value: "word", associated_tags: ["writing", "communication"] }
    ]
  },

  // -- ACADEMIC QUESTIONS --
  {
    id: "acad_01",
    category: "academic",
    type: "multiple_choice",
    question_text: "Which of these subjects do you consistently score the highest in (or enjoy the most)?",
    options: [
      { text: "Physics / Chemistry", value: "science", associated_tags: ["Physics", "Chemistry", "Science"] },
      { text: "Biology / Environmental Science", value: "bio", associated_tags: ["Biology", "Life Sciences"] },
      { text: "Accountancy / Business Studies / Economics", value: "commerce", associated_tags: ["Accountancy", "Business Studies", "Economics"] },
      { text: "History / English / Political Science", value: "arts", associated_tags: ["History/Pol Science", "English", "Arts"] },
      { text: "Computer Science / IT", value: "cs", associated_tags: ["Computer Science", "IT"] }
    ]
  },

  // -- PERSONALITY QUESTIONS --
  {
    id: "pers_01",
    category: "personality",
    type: "multiple_choice",
    question_text: "How do you prefer to work?",
    options: [
      { text: "Independently, focusing deeply on my own tasks", value: "independent", associated_tags: ["independent", "introvert", "focused"] },
      { text: "Collaboratively, bouncing ideas off a team", value: "team", associated_tags: ["teamwork", "extrovert", "collaborative"] }
    ]
  },
  {
    id: "pers_02",
    category: "personality",
    type: "scale",
    question_text: "On a scale of 1-5, how well do you handle high-pressure, fast-paced situations?",
    options: [
      { text: "Scale Concept", value: "scale", associated_tags: ["stress_tolerance", "high_pressure"] }
    ]
  }
];
