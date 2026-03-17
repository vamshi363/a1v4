import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { allSkills } from '../data';
import { Award, Briefcase, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';

export const SkillPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  // Find skill by slug
  const skill = slug ? allSkills.find(s => s.seo.slug === slug) : undefined;

  useEffect(() => {
    if (!skill) {
      navigate('/');
    }
  }, [skill, navigate]);

  if (!skill) return null;

  return (
    <div className="font-sans pb-20 md:pb-0">
      <Helmet>
        <title>{skill.seo.page_title}</title>
        <meta name="description" content={skill.seo.meta_description} />
        <meta name="keywords" content={skill.seo.seo_keywords.join(', ')} />
        <link rel="canonical" href={`https://afterinter.com/#/skills/${skill.seo.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": skill.seo.faq_section.map(faq => ({
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
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-slate-900"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-800 text-blue-400 font-medium text-sm mb-6 border border-slate-700">
            Skill Profile
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{skill.skill_name}</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {skill.description}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        
        {/* Why Learn This Skill */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
             <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
               <Award size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Why {skill.skill_name} Matters</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
             <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
               {skill.description}
             </p>
          </div>
        </section>

        {/* Careers & Courses */}
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <div className="flex items-center space-x-3 mb-6">
               <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                 <Briefcase size={24} />
               </div>
               <h2 className="text-2xl font-bold dark:text-white">Careers Requiring This</h2>
            </div>
            <ul className="space-y-3">
               {skill.related_careers.map((career, idx) => (
                 <li key={idx} className="flex items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                   <CheckCircle size={18} className="text-purple-500 mr-3 shrink-0" />
                   <span className="font-medium text-slate-800 dark:text-slate-200">{career}</span>
                 </li>
               ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center space-x-3 mb-6">
               <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                 <BookOpen size={24} />
               </div>
               <h2 className="text-2xl font-bold dark:text-white">Courses to Learn This</h2>
            </div>
            <ul className="space-y-3">
               {skill.related_courses.map((course, idx) => (
                 <li key={idx} className="flex items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                   <BookOpen size={18} className="text-orange-500 mr-3 shrink-0" />
                   <span className="font-medium text-slate-800 dark:text-slate-200">{course}</span>
                 </li>
               ))}
            </ul>
          </section>
        </div>

        {/* FAQs */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
             <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400">
               <HelpCircle size={24} />
             </div>
             <h2 className="text-2xl font-bold dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
             {skill.seo.faq_section.map((faq, idx) => (
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

export default SkillPage;
