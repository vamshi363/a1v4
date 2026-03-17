import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { allCourses, allCareers, getCourseBySlug } from '../data';
import { Map, Flag, CheckSquare, Briefcase, GraduationCap, ChevronRight, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet';

export const RoadmapPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Try to find if the slug belongs to a course or a career
  // We prefixed career roadmaps with 'career-' when linking from CareerPage to differentiate
  const isCareerRoadmap = slug?.startsWith('career-');
  const actualSlug = isCareerRoadmap ? slug?.replace('career-', '') : slug;

  const item = isCareerRoadmap 
    ? allCareers.find(c => c.seo.slug === actualSlug)
    : getCourseBySlug(actualSlug || '');

  useEffect(() => {
    if (!item) {
      navigate('/');
    }
  }, [item, navigate]);

  if (!item) return null;

  const itemName = isCareerRoadmap ? (item as any).career_name : (item as any).course_name;
  const roadmap = item.career_roadmap;

  return (
    <div className="flex flex-col min-h-screen font-sans pb-20 md:pb-0 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Helmet>
        <title>{`4-Year Roadmap: ${itemName} - Step by Step Guide`}</title>
        <meta name="description" content={`Discover the comprehensive 4-year roadmap for ${itemName}. Learn what skills to acquire, projects to build, and internships to take.`} />
        <link rel="canonical" href={`https://afterinter.com/#/roadmaps/${slug}`} />
      </Helmet>
      
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-slate-900 to-transparent pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 pt-16 pb-12 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-primary-teal text-white rounded-2xl mb-6 shadow-xl shadow-primary-teal/20 mx-auto">
             <Map size={32} />
           </div>
           <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight dark:text-white">
             {itemName} <br/> <span className="text-primary-teal">Roadmap</span>
           </h1>
           <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto">
             A step-by-step guide to mastering the skills needed for {itemName}. Focus on one year at a time.
           </p>
        </div>

        {/* Roadmap Display */}
        <div className="space-y-6">
          {Object.entries(roadmap).map(([year, tasks], index) => {
            const steps = tasks as string[];
            if (!steps || steps.length === 0) return null;
            
            return (
              <div key={year} className="relative pl-6 sm:pl-10">
                 {/* Connection Line */}
                 {index !== Object.keys(roadmap).length - 1 && (
                   <div className="absolute top-10 bottom-[-24px] left-[15px] sm:left-[23px] w-0.5 bg-slate-200 dark:bg-slate-800"></div>
                 )}
                 
                 {/* Year Card */}
                 <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative group transition-all hover:border-primary-teal/40 hover:shadow-md">
                   {/* Node marker */}
                   <div className="absolute top-8 -left-[20px] sm:-left-[28px] w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm z-10 group-hover:border-primary-teal transition-colors">
                     <span className="w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:bg-primary-teal transition-colors"></span>
                   </div>
                   
                   <h2 className="text-xl sm:text-2xl font-black mb-5 capitalize dark:text-white flex items-center justify-between">
                     {year.replace('year', 'Year ')}
                     <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">Foundation</span>
                   </h2>
                   
                   <ul className="space-y-4">
                     {steps.map((step, idx) => (
                       <li key={idx} className="flex items-start">
                         <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-700"></div>
                         <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium text-base sm:text-lg">{step}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
              </div>
            );
          })}
          
          {/* Outro Node */}
          <div className="relative pl-6 sm:pl-10 mt-6">
             <div className="bg-primary-teal/10 dark:bg-primary-teal/5 text-primary-teal rounded-3xl p-6 sm:p-8 border border-primary-teal/20 relative">
                 <div className="absolute top-1/2 -translate-y-1/2 -left-[20px] sm:-left-[28px] w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-4 border-primary-teal flex items-center justify-center z-10">
                     <Flag size={14} className="text-primary-teal fill-current" />
                 </div>
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div>
                     <h3 className="text-xl font-black mb-1 text-slate-900 dark:text-white">Ready for the Next Step?</h3>
                     <p className="text-sm sm:text-base opacity-80 font-medium">Your solid foundation is built. It's time to test your knowledge.</p>
                   </div>
                   <Link to="/exam-finder" className="whitespace-nowrap bg-primary-teal text-white font-bold py-3 px-6 rounded-xl hover:bg-teal-600 transition-colors shadow-lg active:scale-95 inline-flex justify-center items-center">
                     Find Entrance Exams <ChevronRight size={18} className="ml-1" />
                   </Link>
                 </div>
             </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default RoadmapPage;
