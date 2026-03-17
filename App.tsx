import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import UniversitiesPage from './pages/UniversitiesPage';
import UniversityDetailsPage from './pages/UniversityDetailsPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import ScholarshipDetailsPage from './pages/ScholarshipDetailsPage';
import ToolsPage from './pages/ToolsPage';
import ExamsPage from './pages/ExamsPage';
import ExamDetailsPage from './pages/ExamDetailsPage';
import ExamFinderPage from './pages/ExamFinderPage';
import HelpPage from './pages/HelpPage';
import SavedPage from './pages/SavedPage';
import ComparePage from './pages/ComparePage';
import { LegalPage } from './pages/LegalPage';
import { CoursePage } from './pages/CoursePage';
import CoursesExplorerPage from './pages/CoursesExplorerPage';
import { CareerPage } from './pages/CareerPage';
import { SkillPage } from './pages/SkillPage';
import { RoadmapPage } from './pages/RoadmapPage';

// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/universities" element={<UniversitiesPage />} />
          <Route path="/universities/:id" element={<UniversityDetailsPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetailsPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/exams/:id" element={<ExamDetailsPage />} />
          <Route path="/exam-finder" element={<ExamFinderPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/courses" element={<CoursesExplorerPage />} />
          <Route path="/courses/:slug" element={<CoursePage />} />
          <Route path="/quiz" element={
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
               <div className="text-6xl mb-6">🧭</div>
               <h1 className="text-3xl md:text-5xl font-black mb-4 font-heading">Career Discovery Quiz</h1>
               <p className="text-slate-400 mb-8 max-w-md text-lg">Our AI-powered career quiz is coming soon. We're building something amazing for you!</p>
               <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-3 rounded-2xl text-sm font-bold">🚀 Launching Soon</div>
            </div>
          } />
          <Route path="/careers/:slug" element={<CareerPage />} />
          <Route path="/skills/:slug" element={<SkillPage />} />
          <Route path="/roadmaps/:slug" element={<RoadmapPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
          <Route path="/terms" element={<LegalPage title="Terms & Conditions" />} />
          <Route path="/disclaimer" element={<LegalPage title="Disclaimer" />} />
          <Route path="/login" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
               <h1 className="text-3xl font-bold mb-4">Join After Inter</h1>
               <p className="text-slate-500 mb-8">Save your favorite colleges and track applications.</p>
               <button className="bg-primary-teal text-white px-12 py-4 rounded-2xl font-bold shadow-lg">Sign In with Google</button>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;