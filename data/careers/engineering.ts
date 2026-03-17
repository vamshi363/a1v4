import { CareerIntelligence } from '../careerTypes';

export const engineeringCareers: CareerIntelligence[] = [
  {
    career_name: "Mechanical Engineer",
    slug: "mechanical-engineer",
    description: "Mechanical Engineers design, develop, build, and test mechanical and thermal sensors and devices, including tools, engines, and machines.",
    day_to_day_work: "Using CAD software to design parts, analyzing thermodynamics of systems, prototyping new devices, and overseeing the manufacturing process in factories.",
    required_skills: ["cad", "thermodynamics", "problem_solving", "physics", "manufacturing"],
    recommended_interests: ["machines", "automobiles", "robotics", "physics", "building things"],
    average_salary_fresher: "₹3.5L–₹7L",
    average_salary_experienced: "₹10L–₹25L",
    future_demand_score: 80,
    future_growth_reason: "Automation, renewable energy technology, and electric vehicles (EVs) are driving a resurgence in demand for skilled mechanical engineers.",
    automation_risk: "Medium",
    related_courses: ["Mechanical Engineering", "Automobile Engineering", "Robotics & Automation"],
    industry_sectors: ["Automotive / EV", "Aerospace", "Manufacturing", "Energy"],
    career_roadmap: {
      year1: ["Master CAD tools (AutoCAD, SolidWorks)", "Understand core principles of materials and mechanics", "Intern at a manufacturing plant"],
      year2: ["Learn finite element analysis (FEA) and computational fluid dynamics (CFD)", "Work on an automotive or robotics project", "Understand manufacturing processes"],
      year3: ["Focus on a specialization like EV tech or HVAC", "Pursue a PG program or MBA", "Lead small engineering teams"],
      year4: ["Become a Senior Mechanical Engineer or Project Manager", "Oversee entire production lifecycles", "Transition into management"]
    },
    seo: {
      page_title: "Mechanical Engineer Career Guide 2025 – Salary & Scope",
      meta_description: "Learn how to build a career as a Mechanical Engineer in India. Explore salaries, skills needed, industry demand, and career roadmap.",
      seo_keywords: ["mechanical engineering jobs", "mechanical engineer salary india", "EV engineering career", "how to become mechanical engineer"],
      slug: "mechanical-engineer",
      faq_section: [
        { question: "What is the future of Mechanical Engineering?", answer: "The future is bright, especially in Electric Vehicles (EV), robotics, and renewable energy sectors." },
        { question: "What software should I learn?", answer: "Proficiency in SolidWorks, AutoCAD, CATIA, and Ansys is highly recommended." },
        { question: "Does Mechanical Engineering pay well?", answer: "Yes, especially if you move into specialized areas like aerospace or transition into technical management or consulting." }
      ]
    }
  },
  {
    career_name: "Civil Engineer",
    slug: "civil-engineer",
    description: "Civil Engineers conceive, design, build, supervise, operate, construct, and maintain infrastructure projects and systems in the public and private sector.",
    day_to_day_work: "Designing structures (bridges, roads, buildings) using software, analyzing survey reports, managing construction sites, and ensuring projects meet safety standards.",
    required_skills: ["auto_cad", "structural_analysis", "project_management", "mathematics", "surveying"],
    recommended_interests: ["buildings", "infrastructure", "architecture", "mathematics", "outdoor work"],
    average_salary_fresher: "₹3L–₹6L",
    average_salary_experienced: "₹8L–₹22L",
    future_demand_score: 75,
    future_growth_reason: "Developing nations and global urbanization require continuous construction and repair of infrastructure, maintaining steady demand.",
    automation_risk: "Low",
    related_courses: ["Civil Engineering", "Architecture", "Construction Management"],
    industry_sectors: ["Construction", "Real Estate", "Government (PWD/NHAI)", "Consulting"],
    career_roadmap: {
      year1: ["Learn structural drawing tools (AutoCAD, Revit)", "Understand soil mechanics and materials", "Complete a site internship"],
      year2: ["Master structural analysis software like STAAD Pro", "Work as a Junior Site Engineer", "Learn basic project estimation"],
      year3: ["Specialize in structures, transportation, or town planning", "Manage smaller construction sites", "Prepare for government exams (IES/GATE) if interested"],
      year4: ["Become a Senior Project Engineer or Consultant", "Oversee massive infra projects", "Ensure regulatory compliance for large structures"]
    },
    seo: {
      page_title: "Civil Engineer Career 2025 – Scope, Salary, Top Skills",
      meta_description: "Complete guide to a career in Civil Engineering in India. Explore salary trends, required skills, government jobs, and infrastructure sector growth.",
      seo_keywords: ["civil engineer salary", "how to become civil engineer", "government jobs civil engineering", "construction career"],
      slug: "civil-engineer",
      faq_section: [
        { question: "What does a Civil Engineer do?", answer: "They design and oversee the construction of large infrastructure like roads, bridges, dams, and buildings." },
        { question: "Are government jobs available for Civil Engineers?", answer: "Yes, departments like PWD, CPWD, NHAI, and Railways regularly hire Civil Engineers through exams like SSC JE and IES." },
        { question: "Is AutoCAD important?", answer: "Extremely important. Software skills are essential for designing structures before they are built." }
      ]
    }
  }
];
