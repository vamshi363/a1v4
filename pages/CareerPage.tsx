import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { allCareers } from '../data';
import { Briefcase, BookOpen, Map, DollarSign, TrendingUp, Award, CheckCircle, HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

export const CareerPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  // Find career by slug
  const career = slug ? allCareers.find(c => c.seo.slug === slug) : undefined;

  useEffect(() => {
    if (!career) {
      navigate('/');
    }
  }, [career, navigate]);

  if (!career) return null;

  return (
    <div className="font-sans pb-20 md:pb-0">
      <Helmet>
        <title>{career.seo.page_title}</title>
        <meta name="description" content={career.seo.meta_description} />
        <meta name="keywords" content={career.seo.seo_keywords.join(', ')} />
        <link rel="canonical" href={`https://afterinter.com/#/careers/${career.seo.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": career.seo.faq_section.map(faq => ({
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
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary-purple via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-secondary-purple font-medium text-sm mb-6 border border-slate-700">
            Career Profile
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{career.career_name}</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {career.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
               <TrendingUp size={18} className={career.future_demand_score > 75 ? "text-green-400" : "text-yellow-400"} />
               <span className="font-medium">Demand Score: {career.future_demand_score}/100</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
               <Briefcase size={18} className="text-secondary-purple" />
               <span className="font-medium">{career.industry_sectors[0] || 'Multiple Industries'}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        
        {/* Day to Day Work */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
               <Briefcase size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">What You'll Do Every Day</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
             <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
               {career.day_to_day_work}
             </p>
          </div>
        </section>

        {/* Skills & Interests */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center space-x-3 mb-6">
               <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                 <Award size={24} />
               </div>
               <h2 className="text-2xl font-bold dark:text-white">Required Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
               {career.required_skills.map((skill, idx) => (
                 <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full font-medium text-sm border border-slate-200 dark:border-slate-700">
                   {skill}
                 </span>
               ))}
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-6">
               <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                 <CheckCircle size={24} />
               </div>
               <h2 className="text-2xl font-bold dark:text-white">Recommended Interests</h2>
            </div>
            <div className="flex flex-wrap gap-3">
               {career.recommended_interests.map((interest, idx) => (
                 <span key={idx} className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-full font-medium text-sm border border-orange-200 dark:border-orange-800/50">
                   {interest}
                 </span>
               ))}
            </div>
          </section>
        </div>

        {/* Salary Potential */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
               <DollarSign size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Salary Progression in India</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Starting Salary (Fresher)</div>
                <div className="text-3xl font-black text-slate-800 dark:text-white">{career.average_salary_fresher}</div>
             </div>
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-secondary-purple text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">Peak Earning</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Experienced Salary</div>
                <div className="text-3xl font-black text-secondary-purple">{career.average_salary_experienced}</div>
             </div>
          </div>
        </section>

        {/* Future Demand */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
               <TrendingUp size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Future Job Demand</h2>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
             <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{career.future_demand_score}</div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Career Demand Score<br/>(Out of 100)</div>
             </div>
             <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
               {career.future_growth_reason}
             </p>
             <div className="mt-4 inline-flex items-center space-x-2 text-sm bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-500">Automation Risk:</span>
                <span className={`font-bold ${career.automation_risk === 'Low' ? 'text-green-500' : career.automation_risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{career.automation_risk}</span>
             </div>
          </div>
        </section>

        {/* How to Get There (Courses) */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-600 dark:text-red-400">
               <BookOpen size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Courses to Enter This Career</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Consider checking out these degree programs to build the necessary foundation for a career as a {career.career_name}:
          </p>
          <ul className="grid sm:grid-cols-2 gap-4">
             {career.related_courses.map((courseName, idx) => (
               <li key={idx}>
                 <Link to={`/courses`} className="block bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-colors cursor-pointer">
                   {courseName}
                 </Link>
               </li>
             ))}
          </ul>
        </section>

        {/* Career Roadmap Link */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-purple/20 rounded-full blur-3xl"></div>
           <div className="relative z-10">
             <h2 className="text-3xl font-black mb-4">View The Career Roadmap</h2>
             <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
               Discover the exact step-by-step path to becoming a successful {career.career_name}, from your first year of college to landing your dream job.
             </p>
             <Link 
               to={`/roadmaps/career-${career.seo.slug}`} 
               className="inline-flex items-center space-x-3 bg-secondary-purple hover:bg-purple-500 text-white font-black px-8 py-4 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg"
             >
               <Map size={20} />
               <span>Open Roadmap</span>
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
             {career.seo.faq_section.map((faq, idx) => (
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

export default CareerPage;
