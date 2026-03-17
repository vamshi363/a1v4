import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseBySlug } from '../data';
import { Briefcase, BookOpen, GraduationCap, DollarSign, TrendingUp, Award, Building, CheckCircle, HelpCircle, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet';

export const CoursePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = slug ? getCourseBySlug(slug) : undefined;

  useEffect(() => {
    if (!course) {
      navigate('/');
    }
  }, [course, navigate]);

  if (!course) return null;

  return (
    <div className="font-sans pb-20 md:pb-0">
      <Helmet>
        <title>{course.seo.page_title}</title>
        <meta name="description" content={course.seo.meta_description} />
        <meta name="keywords" content={course.seo.seo_keywords.join(', ')} />
        <link rel="canonical" href={`https://afterinter.com/#/courses/${course.seo.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": course.seo.faq_section.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-teal via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-primary-teal font-medium text-sm mb-6 border border-slate-700">
            {course.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.course_name}</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {course.course_overview}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
              <BookOpen size={18} className="text-primary-teal" />
              <span className="font-medium">{course.course_duration}</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
               <TrendingUp size={18} className={course.future_demand_score > 75 ? "text-green-400" : "text-yellow-400"} />
               <span className="font-medium">Demand Score: {course.future_demand_score}/100</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        
        {/* Course Subjects */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
               <BookOpen size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Subjects Studied</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(course.subjects_by_year).map(([year, subjects]) => (
              subjects.length > 0 && (
                <div key={year} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-200 capitalize">
                    {year.replace('year', 'Year ')}
                  </h3>
                  <ul className="space-y-2">
                    {subjects.map((subject, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle size={16} className="text-primary-teal mt-1 mr-2 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
               <Award size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Skills Learned</h2>
          </div>
          <div className="flex flex-wrap gap-3">
             {course.skills_students_learn.map((skill, idx) => (
               <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full font-medium text-sm border border-slate-200 dark:border-slate-700">
                 {skill}
               </span>
             ))}
          </div>
        </section>

        {/* Career Opportunities */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
               <Briefcase size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Career Opportunities</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
             <div className="mb-8">
               <h3 className="font-bold text-lg mb-4 dark:text-white">Expected Job Roles</h3>
               <div className="flex flex-wrap gap-3">
                 {course.career_paths.map((path, idx) => (
                   <span key={idx} className="bg-primary-teal/10 text-primary-teal px-4 py-2 rounded-lg font-medium border border-primary-teal/20">
                     {path}
                   </span>
                 ))}
               </div>
             </div>
             
             <div>
               <h3 className="font-bold text-lg mb-4 dark:text-white">Top Hiring Industries</h3>
               <ul className="grid sm:grid-cols-2 gap-3">
                 {course.industries_hiring.map((industry, idx) => (
                   <li key={idx} className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                     <span>{industry}</span>
                   </li>
                 ))}
               </ul>
             </div>
          </div>
        </section>

        {/* Salary Potential */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
               <DollarSign size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Salary Potential in India</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Fresher (0-2 Years)</div>
                <div className="text-3xl font-black text-slate-800 dark:text-white">{course.average_salary_india_fresher}</div>
                <div className="text-xs text-slate-400 mt-2">Per Annum (Approx)</div>
             </div>
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary-teal text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">High Growth</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Experienced (5+ Years)</div>
                <div className="text-3xl font-black text-primary-teal">{course.average_salary_india_experienced}</div>
                <div className="text-xs text-slate-400 mt-2">Per Annum (Approx)</div>
             </div>
          </div>
        </section>

        {/* Future Demand */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
               <TrendingUp size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Future Demand & Growth</h2>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
             <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{course.future_demand_score}</div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Career Demand Score<br/>(Out of 100)</div>
             </div>
             <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
               {course.future_growth_reason}
             </p>
             <div className="mt-4 inline-flex items-center space-x-2 text-sm bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500">Automation Risk:</span>
                <span className={`font-bold ${course.automation_risk === 'Low' ? 'text-green-500' : course.automation_risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{course.automation_risk}</span>
             </div>
          </div>
        </section>
        
        {/* Entrance Exams & Colleges */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center space-x-3 mb-6">
               <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-600 dark:text-red-400">
                 <FileText size={24} />
               </div>
               <h2 className="text-2xl font-bold dark:text-white">Entrance Exams</h2>
            </div>
            <ul className="space-y-2">
               {course.entrance_exams_india.map((exam, idx) => (
                 <li key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-200 shadow-sm flex items-center justify-between">
                   <span>{exam}</span>
                   <Link to={`/exams`} className="text-primary-teal text-sm hover:underline">View details</Link>
                 </li>
               ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-6">
               <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg text-yellow-600 dark:text-yellow-400">
                 <GraduationCap size={24} />
               </div>
               <h2 className="text-2xl font-bold dark:text-white">Top Colleges</h2>
            </div>
            <ul className="space-y-2">
               {course.top_indian_colleges.map((college, idx) => (
                 <li key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-200 shadow-sm flex items-center space-x-3">
                   <Building size={16} className="text-slate-400 shrink-0" />
                   <span>{college}</span>
                 </li>
               ))}
            </ul>
            <div className="mt-4">
               <Link to="/universities" className="text-primary-teal font-bold hover:underline flex items-center">
                 Search more {course.course_name} colleges <TrendingUp size={16} className="ml-1" />
               </Link>
            </div>
          </section>
        </div>

        {/* Career Roadmap Link */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-teal/20 rounded-full blur-3xl"></div>
           <div className="relative z-10">
             <h2 className="text-3xl font-black mb-4">Plan Your 4-Year Journey</h2>
             <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
               View the semester-by-semester roadmap for {course.course_name}, detailing what skills to learn, projects to build, and internships to target.
             </p>
             <Link 
               to={`/roadmaps/${course.seo.slug}`} 
               className="inline-block bg-primary-teal hover:bg-teal-400 text-slate-900 font-black px-8 py-4 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg"
             >
               View Career Roadmap
             </Link>
           </div>
        </section>

        {/* FAQs */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
             <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400">
               <HelpCircle size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
             {course.seo.faq_section.map((faq, idx) => (
               <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                 <h3 className="text-lg font-bold mb-3 text-slate-800 dark:text-white">{faq.question}</h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
               </div>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CoursePage;
