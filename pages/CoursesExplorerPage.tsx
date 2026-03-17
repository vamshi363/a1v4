import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, GraduationCap, ArrowRight, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allCourses, courseCategories } from '../data';

const CoursesExplorerPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesSearch = 
        course.course_name.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase()) ||
        course.skills_students_learn.some(s => s.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || course.category.toLowerCase().includes(activeCategory.toLowerCase()) || (activeCategory === 'Engineering' && course.category.includes('Engineering'));
      
      // Special handling for category keys vs names
      let exactCategoryMatch = activeCategory === 'All';
      if (!exactCategoryMatch) {
         const categoryObj = courseCategories.find(c => c.name === activeCategory || c.key === activeCategory);
         if (categoryObj) {
            exactCategoryMatch = course.category.includes(categoryObj.name.split(' ')[0]);
         } else {
            exactCategoryMatch = course.category.toLowerCase().includes(activeCategory.toLowerCase());
         }
      }

      return matchesSearch && exactCategoryMatch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-teal/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-black mb-6"
          >
            Explore Career-Ready Courses
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            Find the perfect course after intermediate. Detailed roadmaps, subjects, and top college recommendations for over {allCourses.length} courses.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search by course name, skill, or career..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-primary-teal outline-none transition-all text-white placeholder:text-slate-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="sticky top-24">
              <h2 className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <Filter size={14} /> Categories
              </h2>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <button 
                  onClick={() => setActiveCategory('All')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all text-left ${activeCategory === 'All' ? 'bg-primary-teal text-white shadow-lg' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600'}`}
                >
                  All Categories
                </button>
                {courseCategories.map((cat) => (
                  <button 
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all text-left flex justify-between items-center group ${activeCategory === cat.name ? 'bg-primary-teal text-white shadow-lg' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600'}`}
                  >
                    <span>{cat.name.split(' and ')[0]}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeCategory === cat.name ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-900 dark:text-white">{filteredCourses.length} Courses Available</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course) => (
                  <motion.div 
                    layout
                    key={course.seo.slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl text-primary-teal group-hover:bg-primary-teal group-hover:text-white transition-colors">
                          <BookOpen size={24} />
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100 uppercase tracking-wider">
                          <TrendingUp size={12} /> {course.future_demand_score > 80 ? 'High Demand' : 'Steady'}
                        </div>
                      </div>
                      <h4 className="text-xl font-black mb-2 group-hover:text-primary-teal transition-colors leading-tight">{course.course_name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                        {course.course_overview}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {course.skills_students_learn.slice(0, 3).map((skill, index) => (
                          <span key={`${skill}-${index}`} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-bold text-slate-500">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <Link 
                      to={`/courses/${course.seo.slug}`}
                      className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold text-sm text-center group-hover:bg-primary-teal group-hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      View Details <ChevronRight size={16} />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredCourses.length === 0 && (
              <div className="py-20 text-center">
                 <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-slate-400" />
                 </div>
                 <h4 className="font-bold text-lg mb-2">No courses found</h4>
                 <p className="text-slate-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesExplorerPage;
