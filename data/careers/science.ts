import { CareerIntelligence } from '../careerTypes';

export const scienceCareers: CareerIntelligence[] = [
  {
    career_name: "Research Scientist",
    slug: "research-scientist",
    description: "Research Scientists design, undertake, and analyze information from controlled laboratory-based investigations, experiments, and trials, often leading to scientific discoveries or new product development.",
    day_to_day_work: "Planning and conducting experiments, analyzing data using statistical software, writing research papers, applying for grants, and presenting findings at conferences.",
    required_skills: ["data_analysis", "critical_thinking", "laboratory_skills", "academic_writing", "research_methodology"],
    recommended_interests: ["science", "discovery", "experiments", "reading", "problem solving"],
    average_salary_fresher: "₹5L–₹9L",
    average_salary_experienced: "₹12L–₹35L",
    future_demand_score: 85,
    future_growth_reason: "Advancements in biotechnology, pharmaceuticals, and environmental science require heavy R&D investment and scientific expertise.",
    automation_risk: "Low",
    related_courses: ["B.Sc (Physics/Chemistry/Bio)", "M.Sc", "Ph.D", "Biotechnology Engineering"],
    industry_sectors: ["Pharmaceuticals", "Academia", "Government Institutes (ISRO/DRDO)", "Biotech"],
    career_roadmap: {
      year1: ["Complete Master's degree (M.Sc)", "Clear NET/GATE for a Ph.D. fellowship", "Begin research at a university lab"],
      year2: ["Execute Ph.D. experiments", "Publish first set of research papers", "Attend international conferences"],
      year3: ["Complete Ph.D. thesis", "Join as a Post-Doctoral Fellow or Junior Scientist", "Secure first major research grant"],
      year4: ["Become a Principal Investigator (PI) or Senior Scientist", "Lead a dedicated research team", "Contribute heavily to R&D pipelines for products"]
    },
    seo: {
      page_title: "Research Scientist Career Guide 2025 – Scope, Salary, Roadmap",
      meta_description: "Learn how to build a career as a Research Scientist in India. Discover salary details, the importance of a Ph.D., and top research institutions.",
      seo_keywords: ["research scientist salary india", "scientist career path", "how to become scientist at ISRO", "phd scope india"],
      slug: "research-scientist",
      faq_section: [
        { question: "Do I need a Ph.D. to be a Research Scientist?", answer: "While you can assist in labs with an M.Sc., a Ph.D. is usually required to lead independent research and achieve senior scientist roles." },
        { question: "Where do Scientists work?", answer: "They work in university labs, government institutes like CSIR or ISRO, and private R&D departments (especially in pharma)." },
        { question: "What is the starting salary during a Ph.D.?", answer: "In India, Ph.D. scholars with JRF typically receive a stipend of around ₹31,000–₹35,000 per month." }
      ]
    }
  },
  {
    career_name: "Statistician",
    slug: "statistician",
    description: "Statisticians use statistical methods to collect and analyze data and to help solve real-world problems in business, engineering, healthcare, or other fields.",
    day_to_day_work: "Designing surveys/experiments to collect data, using software (R/Python/SAS) to analyze numbers, and interpreting data to find trends or relationships.",
    required_skills: ["mathematics", "statistics", "R_programming", "python", "data_modeling"],
    recommended_interests: ["mathematics", "numbers", "logic", "trends", "data analysis"],
    average_salary_fresher: "₹5L–₹10L",
    average_salary_experienced: "₹15L–₹40L",
    future_demand_score: 90,
    future_growth_reason: "With data driving the modern economy, statisticians are essential for predicting trends and ensuring data integrity across machine learning and business analytics.",
    automation_risk: "Medium",
    related_courses: ["B.Sc Statistics", "Mathematics", "Data Science", "Economics"],
    industry_sectors: ["Government", "Healthcare/Pharma", "Finance", "Tech"],
    career_roadmap: {
      year1: ["Master statistical theory and probability", "Learn programming in R and Python", "Work on beginner data modeling projects"],
      year2: ["Study experimental design and sampling methods", "Use SQL for data extraction", "Understand applied machine learning"],
      year3: ["Work as a Junior Statistician or Data Analyst", "Build predictive models for employers", "Interpret survey data for businesses"],
      year4: ["Become a Senior Statistician or Data Science Lead", "Guide organizational strategy via numerical analysis", "Lead clinical trial statistics in pharma"]
    },
    seo: {
      page_title: "Statistician Career Scope 2025 – Statistics Jobs, Salary",
      meta_description: "Explore the career path of a Statistician in India. Guide to salaries, R/Python skills, and top jobs for B.Sc Statistics graduates.",
      seo_keywords: ["statistician salary india", "b.sc statistics scope", "data analyst vs statistician", "statistics jobs"],
      slug: "statistician",
      faq_section: [
        { question: "What is the difference between a Statistician and Data Analyst?", answer: "Statisticians heavily focus on mathematical theory and ensuring statistical significance, whereas Data Analysts focus more on business insights." },
        { question: "Is programming needed for Statistics?", answer: "Yes, modern statisticians write scripts in R, Python, and SAS to process large datasets." },
        { question: "Are Statisticians in demand?", answer: "Yes, they are highly sought after in clinical trials, government census, and technology companies building AI models." }
      ]
    }
  }
];
