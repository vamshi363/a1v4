import { CareerIntelligence } from '../careerTypes';

export const technologyCareers: CareerIntelligence[] = [
  {
    career_name: "Software Developer",
    slug: "software-developer",
    description: "Software Developers design, code, and test applications. They collaborate with teams to build scalable software solutions that solve real-world problems.",
    day_to_day_work: "Writing and debugging code, participating in agile scrums, code reviews, architectural discussions, and pushing code to production environments.",
    required_skills: ["programming", "problem_solving", "algorithms", "version_control", "system_design"],
    recommended_interests: ["coding", "technology", "puzzles", "building things", "logic"],
    average_salary_fresher: "₹4L–₹12L",
    average_salary_experienced: "₹15L–₹45L",
    future_demand_score: 90,
    future_growth_reason: "Every business is becoming a digital business. Demand for software developers remains strong across all sectors globally.",
    automation_risk: "Low",
    related_courses: ["Computer Science Engineering", "Information Technology", "Software Engineering", "BCA / MCA"],
    industry_sectors: ["IT Services", "Tech Products", "Fintech", "E-commerce"],
    career_roadmap: {
      year1: ["Learn fundamentals (Java/Python/JS)", "Understand databases", "Build simple projects"],
      year2: ["Learn frameworks (React/Spring/Node)", "Understand API design", "Start contributing to open source"],
      year3: ["Focus on system architecture", "Learn cloud basics", "Take up leadership in small projects"],
      year4: ["Lead engineering teams", "Design scalable systems", "Mentor junior developers"]
    },
    seo: {
      page_title: "Software Developer Career Scope 2025 – Salary, Skills, Roadmap",
      meta_description: "Discover the career of a Software Developer in India. Find out the average salary, required skills, future demand, and a step-by-step career roadmap.",
      seo_keywords: ["software developer salary", "how to become software engineer", "coding careers", "software engineer roadmap"],
      slug: "software-developer",
      faq_section: [
        { question: "What does a Software Developer do?", answer: "They build applications, write code, debug issues, and ensure software systems run smoothly." },
        { question: "Is Software Developer a good career?", answer: "Yes, it is currently one of the highest-paying and most secure careers due to global digitalization." },
        { question: "What is the average salary of a Software Developer in India?", answer: "Freshers can earn ₹4L–₹12L, while experienced developers can earn upwards of ₹45L." }
      ]
    }
  },
  {
    career_name: "Data Scientist",
    slug: "data-scientist",
    description: "Data Scientists analyze complex, unstructured data using machine learning algorithms to extract actionable insights that guide business decisions.",
    day_to_day_work: "Cleaning data sets, building predictive models, validating results, and presenting insights to stakeholders via dashboards and reports.",
    required_skills: ["python", "machine_learning", "statistics", "sql", "data_visualization"],
    recommended_interests: ["mathematics", "statistics", "data analysis", "artificial intelligence", "business strategy"],
    average_salary_fresher: "₹6L–₹14L",
    average_salary_experienced: "₹18L–₹50L",
    future_demand_score: 95,
    future_growth_reason: "Organizations rely on data-driven decision-making, fueling massive demand for professionals who can interpret big data.",
    automation_risk: "Low",
    related_courses: ["Data Science", "Artificial Intelligence & Machine Learning", "Statistics", "Mathematics"],
    industry_sectors: ["Tech", "Banking & Finance", "Healthcare", "Retail", "Consulting"],
    career_roadmap: {
      year1: ["Master Python/R and SQL", "Learn statistics and probability", "Work on beginner datasets"],
      year2: ["Learn machine learning algorithms", "Participate in Kaggle competitions", "Build regression/classification models"],
      year3: ["Study deep learning and NLP", "Deploy models to production", "Communicate data insights visually"],
      year4: ["Lead data science projects", "Architect big data pipelines", "Drive AI strategy"]
    },
    seo: {
      page_title: "Data Scientist Career Scope & Roadmap 2025 – Salary, Skills",
      meta_description: "Become a Data Scientist in India. Learn about the required skills, average salary, future demand, and step-by-step career roadmap.",
      seo_keywords: ["data scientist salary", "how to become a data scientist", "data science career", "machine learning jobs"],
      slug: "data-scientist",
      faq_section: [
        { question: "What is the role of a Data Scientist?", answer: "A Data Scientist uses statistical methods and machine learning to analyze data and predict future trends." },
        { question: "Do I need coding for Data Science?", answer: "Yes, proficiency in Python or R and SQL is essential for data manipulation and modeling." },
        { question: "Are Data Scientists in high demand?", answer: "Yes, with the rise of AI and Big Data, it is one of the most sought-after tech jobs globally." }
      ]
    }
  },
  {
    career_name: "Cyber Security Analyst",
    slug: "cyber-security-analyst",
    description: "Cyber Security Analysts protect IT infrastructure, networks, and data from cyber attacks, mitigating risks and ensuring compliance with security standards.",
    day_to_day_work: "Monitoring network traffic for security breaches, conducting vulnerability assessments, updating security protocols, and responding to cyber incidents.",
    required_skills: ["networking", "ethical_hacking", "risk_management", "cryptography", "incident_response"],
    recommended_interests: ["security", "hacking", "troubleshooting", "networks", "technology"],
    average_salary_fresher: "₹5L–₹10L",
    average_salary_experienced: "₹15L–₹40L",
    future_demand_score: 92,
    future_growth_reason: "With growing digital footprints and severe data privacy laws, preventing cyber threats has become a top priority for all businesses.",
    automation_risk: "Low",
    related_courses: ["Cyber Security Engineering", "Information Technology", "Computer Science Engineering", "Network Engineering"],
    industry_sectors: ["Banking & Finance", "Government/Defence", "Tech", "Healthcare", "E-commerce"],
    career_roadmap: {
      year1: ["Understand networking and OS fundamentals", "Learn scripting (Python/Bash)", "Familiarize with security protocols"],
      year2: ["Get certifications (CompTIA Security+, CEH)", "Perform vulnerability scanning", "Learn SIEM tools"],
      year3: ["Specialize in penetration testing or SOC", "Handle real-time incident responses", "Learn cloud security"],
      year4: ["Become a Security Architect or CISO", "Design enterprise security frameworks", "Lead security audits"]
    },
    seo: {
      page_title: "Cyber Security Analyst Career Scope 2025 – Salary, Skills, Roadmap",
      meta_description: "Guide to a career as a Cyber Security Analyst. Details on salaries, skills required, roadmap, and how to get started in cyber security.",
      seo_keywords: ["cyber security career", "ethical hacker salary", "cyber security jobs in India", "information security analyst"],
      slug: "cyber-security-analyst",
      faq_section: [
        { question: "What does a Cyber Security Analyst do?", answer: "They monitor systems, identify vulnerabilities, and prevent unauthorized access or data breaches." },
        { question: "Is programming required for Cyber Security?", answer: "While not strictly for coding, scripting (Python, PowerShell) is very highly recommended for automation." },
        { question: "Which certifications are best for beginners?", answer: "CompTIA Security+, CEH (Certified Ethical Hacker), and CISSP are highly valued in the industry." }
      ]
    }
  },
  {
    career_name: "Cloud Architect",
    slug: "cloud-architect",
    description: "Cloud Architects design and manage an organization's cloud computing strategy, including cloud adoption plans, application design, and management and monitoring.",
    day_to_day_work: "Designing scalable cloud infrastructure, managing cloud budgets, ensuring cloud privacy/security, and migrating legacy systems to the cloud.",
    required_skills: ["cloud_platforms", "system_architecture", "devops", "networking", "security"],
    recommended_interests: ["infrastructure", "cloud computing", "system design", "servers", "technology"],
    average_salary_fresher: "₹8L–₹15L (Usually requires prior experience)",
    average_salary_experienced: "₹20L–₹60L",
    future_demand_score: 90,
    future_growth_reason: "Companies are accelerating their shift from on-premise servers to cloud environments (AWS, Azure, GCP) for better scalability and remote access.",
    automation_risk: "Low",
    related_courses: ["Computer Science Engineering", "Information Technology", "Cloud Computing & DevOps"],
    industry_sectors: ["IT Services", "Finance", "Healthcare", "E-commerce", "SaaS"],
    career_roadmap: {
      year1: ["Learn OS, networking, and virtualization basics", "Get hands-on with AWS/Azure/GCP", "Understand storage and compute services"],
      year2: ["Get Associate level cloud certifications", "Learn Infrastructure as Code (Terraform)", "Understand CI/CD pipelines"],
      year3: ["Get Professional/Expert level certifications", "Design multi-tier cloud architectures", "Optimize cloud costs and security"],
      year4: ["Lead enterprise cloud migrations", "Design multi-cloud and hybrid-cloud strategies", "Architect globally distributed systems"]
    },
    seo: {
      page_title: "Cloud Architect Career Scope 2025 – AWS, Azure, GCP, Salary",
      meta_description: "Explore the Cloud Architect career path in India. Learn about AWS, Azure, GCP, salaries, skills, and the future demand for cloud professionals.",
      seo_keywords: ["cloud architect salary", "AWS solution architect", "cloud computing careers", "how to become cloud architect"],
      slug: "cloud-architect",
      faq_section: [
        { question: "What does a Cloud Architect do?", answer: "They design and deploy well-architected cloud infrastructure that is scalable, secure, and cost-effective." },
        { question: "Can a fresher become a Cloud Architect?", answer: "Usually, freshers start as Cloud Engineers or System Admins and move up to Architect roles after gaining experience." },
        { question: "Which cloud platform should I learn first?", answer: "AWS is currently the market leader, but Microsoft Azure is also highly adopted in enterprise sectors." }
      ]
    }
  },
  {
    career_name: "Artificial Intelligence (AI) Engineer",
    slug: "ai-engineer",
    description: "AI Engineers build AI models using machine learning algorithms and deep learning neural networks to draw business insights, which can be used to make business decisions that affect the entire organization.",
    day_to_day_work: "Training LLMs (Large Language Models), fine-tuning neural networks, deploying AI models via APIs, and optimizing inference speeds.",
    required_skills: ["python", "deep_learning", "nlp", "computer_vision", "mathematics"],
    recommended_interests: ["artificial intelligence", "robotics", "mathematics", "innovation", "logic"],
    average_salary_fresher: "₹8L–₹18L",
    average_salary_experienced: "₹25L–₹70L",
    future_demand_score: 98,
    future_growth_reason: "AI is revolutionizing every industry. The rapid development of GenAI has created massive demand for specialized engineers.",
    automation_risk: "Low",
    related_courses: ["Artificial Intelligence & Machine Learning", "Computer Science Engineering", "Data Science"],
    industry_sectors: ["Tech Giants", "Healthcare", "Automotive (Self-driving)", "Finance", "Robotics"],
    career_roadmap: {
      year1: ["Master Python and math for ML", "Understand classical ML algorithms", "Learn basic neural networks"],
      year2: ["Specialize in NLP or Computer Vision", "Use PyTorch / TensorFlow", "Train image or text models"],
      year3: ["Work with LLMs and Transformers", "Learn model deployment (MLops)", "Contribute to AI research"],
      year4: ["Architect enterprise AI solutions", "Lead an AI research team", "Build autonomous systems"]
    },
    seo: {
      page_title: "AI Engineer Career Scope 2025 – Salary, Skills, Roadmap",
      meta_description: "Become an Artificial Intelligence Engineer. Detailed guide covering average salary, skill requirements, related courses, and career roadmap.",
      seo_keywords: ["AI engineer salary", "artificial intelligence career", "machine learning engineer", "how to build AI models"],
      slug: "ai-engineer",
      faq_section: [
        { question: "What is the difference between AI Engineer and Data Scientist?", answer: "Data Scientists focus more on extracting insights and analytics, while AI Engineers focus on building, optimizing, and deploying AI models into software." },
        { question: "Is Math necessary for AI Engineering?", answer: "Yes, a strong foundation in Linear Algebra, Calculus, and Probability is crucial for deeply understanding neural networks." },
        { question: "What is the salary of an AI Engineer in India?", answer: "AI Engineers are among the highest paid, with experienced professionals earning between ₹25 Lakhs to ₹70 Lakhs+ per year." }
      ]
    }
  }
];
