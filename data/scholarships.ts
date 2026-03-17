
import { Scholarship } from '../types';

export const scholarships: Scholarship[] = [
  // --- STATE GOVERNMENT SCHOLARSHIPS (TELANGANA) ---
  {
    id: 'ts-epass-postmatric',
    name: 'Telangana ePASS Post-Matric Scholarship',
    type: 'State',
    provider: 'Government of Telangana',
    eligibility: 'SC/ST/BC/EBC/Minority/Disabled students of Telangana. Family annual income < ₹2 Lakh (Urban) or ₹1.5 Lakh (Rural).',
    deadline: 'December 31, 2025 (Tentative)',
    amount: '100% Tuition Fee Reimbursement + Maintenance Allowance (₹500-₹1200/month)',
    documents: ['Aadhar Card', 'Caste Certificate', 'Income Certificate', 'Bank Passbook', 'CET Allotment Order', 'SSC Memo'],
    applyLink: 'https://telanganaepass.cgg.gov.in',
    description: 'The primary scholarship scheme for students pursuing higher education (Inter to Ph.D.) in Telangana.',
    dataSource: 'Telangana ePASS Portal'
  },
  {
    id: 'ts-ambedkar-overseas',
    name: 'Ambedkar Overseas Vidya Nidhi (SC/ST)',
    type: 'State',
    provider: 'Government of Telangana',
    eligibility: 'SC/ST students pursuing PG/PhD abroad (USA, UK, Australia, Canada, etc.). Income < ₹5 Lakh. GRE/GMAT/TOEFL scores required.',
    deadline: 'Twice a year (Mar/Sep)',
    amount: 'Grant of up to ₹20 Lakhs + One way ticket.',
    documents: ['Passport', 'Visa', 'Admission Letter', 'Income Certificate', 'Caste Certificate', 'GRE/TOEFL Score Card'],
    applyLink: 'https://telanganaepass.cgg.gov.in/OverseasLinks.do',
    description: 'Financial assistance for SC/ST students to study abroad.',
    dataSource: 'Telangana ePASS Portal'
  },
  {
    id: 'ts-jyothiba-phule-overseas',
    name: 'Mahatma Jyothiba Phule Overseas Vidya Nidhi (BC)',
    type: 'State',
    provider: 'Government of Telangana',
    eligibility: 'BC students pursuing higher education abroad. Income < ₹5 Lakh.',
    deadline: 'Twice a year',
    amount: 'Grant of up to ₹20 Lakhs.',
    documents: ['Passport', 'Admission Offer', 'Income Proof', 'Caste Proof'],
    applyLink: 'https://telanganaepass.cgg.gov.in',
    description: 'Overseas study grant for Backward Class students.',
    dataSource: 'Telangana ePASS Portal'
  },

  // --- STATE GOVERNMENT SCHOLARSHIPS (ANDHRA PRADESH) ---
  {
    id: 'ap-jvd-rtf',
    name: 'Jagananna Vidya Deevena (RTF)',
    type: 'State',
    provider: 'Government of Andhra Pradesh',
    eligibility: 'SC, ST, BC, EBC, Kapu, Minority, Differently Abled students. Family income < ₹2.5 Lakh. Land < 25 acres (wet+dry).',
    deadline: 'Continuous (Academic Year)',
    amount: '100% Tuition Fee Reimbursement credited directly to the mother\'s bank account.',
    documents: ['Rice Card', 'Aadhar Card', 'Mother\'s Bank Details', 'Caste Certificate', 'Income Certificate'],
    applyLink: 'https://jnanabhumi.ap.gov.in',
    description: 'Ensures full fee reimbursement for ITI, Polytechnic, Degree, B.Tech, MBA, MCA, and Pharmacy courses.',
    dataSource: 'JnanaBhumi AP Portal'
  },
  {
    id: 'ap-jvd-mtf',
    name: 'Jagananna Vasathi Deevena (MTF)',
    type: 'State',
    provider: 'Government of Andhra Pradesh',
    eligibility: 'Eligible students under JVD. Must reside in hostels or have valid attendance.',
    deadline: 'Two installments per year',
    amount: '₹10,000 (ITI), ₹15,000 (Polytechnic), ₹20,000 (Degree & PG) per annum.',
    documents: ['Attendance Certificate', 'Biometric Authentication', 'Rice Card'],
    applyLink: 'https://jnanabhumi.ap.gov.in',
    description: 'Covers boarding and lodging expenses for students.',
    dataSource: 'JnanaBhumi AP Portal'
  },
  {
    id: 'ap-videshi-vidya',
    name: 'Jagananna Videshi Vidya Deevena',
    type: 'State',
    provider: 'Government of Andhra Pradesh',
    eligibility: 'Students admitted to top 200 QS ranked universities abroad. Income < ₹8 Lakh.',
    deadline: 'Before Session Starts',
    amount: 'Up to ₹1.25 Crore (Top 100 Univ) or ₹50 Lakhs (101-200 Rank) or Full Tuition Fees.',
    documents: ['Admission Letter', 'Rank Proof', 'Income Certificate', 'Passport'],
    applyLink: 'https://jnanabhumi.ap.gov.in',
    description: 'Top-tier overseas scholarship for meritorious AP students.',
    dataSource: 'AP State Government'
  },

  // --- CENTRAL GOVERNMENT SCHOLARSHIPS ---
  {
    id: 'nsp-csss',
    name: 'Central Sector Scheme of Scholarship (CSSS)',
    type: 'Central',
    provider: 'Department of Higher Education, GoI',
    eligibility: 'Students above 80th percentile in Class 12. Pursuing regular college/university courses. Family income < ₹4.5 Lakh.',
    deadline: 'October 31, 2025',
    amount: '₹12,000/year (Graduation) to ₹20,000/year (PG).',
    documents: ['Class 12 Marksheet', 'Income Certificate', 'Aadhar', 'Bonafide'],
    applyLink: 'https://scholarships.gov.in',
    description: 'Merit-based support for university students.',
    dataSource: 'National Scholarship Portal'
  },
  {
    id: 'aicte-pragati',
    name: 'AICTE Pragati Scholarship for Girls',
    type: 'Central',
    provider: 'AICTE',
    eligibility: 'Girl students admitted to 1st year of Technical Degree/Diploma. Max 2 girls per family. Income < ₹8 Lakh.',
    deadline: 'December 2025',
    amount: '₹50,000 per annum.',
    documents: ['Admission Proof', 'Income Certificate', 'Aadhar', 'Tuition Fee Receipt'],
    applyLink: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati',
    description: 'Empowering women in technical education.',
    dataSource: 'AICTE Official Website'
  },
  {
    id: 'aicte-saksham',
    name: 'AICTE Saksham Scholarship',
    type: 'Central',
    provider: 'AICTE',
    eligibility: 'Differently-abled students (disability > 40%) admitted to technical institutions. Income < ₹8 Lakh.',
    deadline: 'December 2025',
    amount: '₹50,000 per annum.',
    documents: ['Disability Certificate', 'Income Certificate', 'Admission Proof'],
    applyLink: 'https://www.aicte-india.org',
    description: 'Support for differently-abled students in technical fields.',
    dataSource: 'AICTE Official Website'
  },

  // --- PRIVATE SCHOLARSHIPS ---
  {
    id: 'santoor-women',
    name: 'Santoor Women\'s Scholarship',
    type: 'Private',
    provider: 'Wipro Consumer Care',
    eligibility: 'Girl students from AP/Telangana who passed Class 12 from Govt school and joined graduation. Income < ₹6 Lakh.',
    deadline: 'September 2025',
    amount: '₹24,000 per annum.',
    documents: ['10th & 12th Marksheets', 'College ID', 'Bank Passbook'],
    applyLink: 'https://www.santoorscholarships.com',
    description: 'Supporting girl education from underprivileged backgrounds.',
    dataSource: 'Santoor Scholarship Portal'
  },
  {
    id: 'tata-trusts-medical',
    name: 'Tata Trusts Medical and Healthcare Scholarship',
    type: 'Private',
    provider: 'Tata Trusts',
    eligibility: 'Students in UG/PG Medical and Healthcare courses. Merit based.',
    deadline: 'Varies',
    amount: 'Covers 30-80% of tuition fees.',
    documents: ['Marksheets', 'Fee Structure', 'Letter of Motivation'],
    applyLink: 'https://www.tatatrusts.org',
    description: 'Grants for students in healthcare sciences.',
    dataSource: 'Tata Trusts Website'
  },
  {
    id: 'reliance-foundation',
    name: 'Reliance Foundation Undergraduate Scholarship',
    type: 'Private',
    provider: 'Reliance Foundation',
    eligibility: 'First-year UG students with high merit. Family income < ₹15 Lakh.',
    deadline: 'October 2025',
    amount: 'Up to ₹2 Lakhs over the degree duration.',
    documents: ['Aptitude Test Score', 'Marksheets', 'Income Proof'],
    applyLink: 'https://www.reliancefoundation.org',
    description: 'Merit-cum-means scholarship for bright students.',
    dataSource: 'Reliance Foundation'
  },
  {
    id: 'hdfc-badhte-kadam',
    name: 'HDFC Badhte Kadam',
    type: 'Private',
    provider: 'HDFC Bank',
    eligibility: 'Students facing financial crisis or loss of earning member. High academic performance.',
    deadline: 'September 2025',
    amount: 'Up to ₹1,00,000.',
    documents: ['Crisis Proof (Death cert etc)', 'Income Proof', 'Marksheets'],
    applyLink: 'https://www.hdfcbank.com',
    description: 'Crisis support scholarship.',
    dataSource: 'Buddy4Study / HDFC'
  },
  {
    id: 'sitaram-jindal',
    name: 'Sitaram Jindal Foundation Scholarship',
    type: 'Private',
    provider: 'Sitaram Jindal Foundation',
    eligibility: 'Meritorious students from Class 11 to PG level. Income limits apply.',
    deadline: 'Round the year',
    amount: '₹500 to ₹2500 per month.',
    documents: ['Marksheets', 'Principal Attestation', 'Income Certificate'],
    applyLink: 'https://www.sitaramjindalfoundation.org',
    description: 'General merit scholarship for poor students.',
    dataSource: 'Official Foundation Website'
  },
  {
    id: 'ongc-scholarship',
    name: 'ONGC Scholarship for SC/ST/OBC',
    type: 'Private',
    provider: 'ONGC',
    eligibility: 'SC/ST/OBC students pursuing Engineering, MBBS, MBA, or Geology PG.',
    deadline: 'October 2025',
    amount: '₹48,000 per annum.',
    documents: ['Caste Certificate', 'Marksheets', 'Bank Details'],
    applyLink: 'https://www.ongcindia.com',
    description: 'CSR initiative by ONGC.',
    dataSource: 'ONGC India Website'
  }
];
