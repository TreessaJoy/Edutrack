import React, { useState } from 'react';
import { Course, Enrollment, Student } from '../types';
import {
  Search,
  BookOpen,
  Star,
  Users,
  Clock,
  Award,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Play,
  X,
  Filter
} from 'lucide-react';

interface CourseCatalogProps {
  courses: Course[];
  enrollments: Enrollment[];
  student: Student;
  onEnroll: (courseId: string) => void;
  onOpenCourse: (courseId: string) => void;
  onViewCertificate: (courseId: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  enrollments,
  student,
  onEnroll,
  onOpenCourse,
  onViewCertificate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(null);

  const categories = ['All', 'Cloud Computing', 'AI & Machine Learning', 'Full-Stack', 'Cybersecurity', 'Soft Skills'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Academic Course Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore university courses, specialized tech tracks, and placement preparation modules.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, codes, topics..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-2xs"
          />
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Level:
          </span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs rounded-md px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {difficulties.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const enrollment = enrollments.find(e => e.studentId === student.id && e.courseId === course.id);
          const isEnrolled = !!enrollment;
          const isCompleted = enrollment?.status === 'Completed';

          return (
            <div
              key={course.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col group"
            >
              {/* Cover Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/course_cloud_computing_1793378513238.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-xs rounded">
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/90 text-slate-800 backdrop-blur-xs rounded shadow-2xs">
                    {course.difficulty}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-mono font-bold text-indigo-600">{course.code}</span>
                    <span>·</span>
                    <span>{course.credits} Credits</span>
                    <span>·</span>
                    <span>{course.durationWeeks} Weeks</span>
                  </div>

                  <h3
                    onClick={() => setActiveModalCourse(course)}
                    className="text-base font-bold text-slate-900 line-clamp-2 hover:text-indigo-600 cursor-pointer transition-colors"
                  >
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Instructor & Meta */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-5 h-5 rounded-full object-cover border border-slate-200"
                      />
                      <span className="truncate font-medium text-slate-700">{course.instructor.name}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-slate-700 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-[10px] text-slate-400">({course.enrolledCount})</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <button
                        onClick={() => onViewCertificate(course.id)}
                        className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>View Certificate (A+)</span>
                      </button>
                    ) : isEnrolled ? (
                      <button
                        onClick={() => onOpenCourse(course.id)}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Resume Course ({enrollment?.progressPercentage}%)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onEnroll(course.id)}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Enroll Now</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveModalCourse(course)}
                      className="px-2.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-xs"
                      title="Syllabus Details"
                    >
                      Details
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-xl">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-800">No courses match your criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the filters or searching with a different keyword.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedDifficulty('All'); setSearchQuery(''); }}
            className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Course Detail & Syllabus Modal */}
      {activeModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-indigo-600">{activeModalCourse.code}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{activeModalCourse.category}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-medium text-slate-700">{activeModalCourse.difficulty} Level</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {activeModalCourse.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalCourse(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1.5">
                  Course Overview
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {activeModalCourse.description}
                </p>
              </div>

              {/* Instructor Details */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <img
                  src={activeModalCourse.instructor.avatar}
                  alt={activeModalCourse.instructor.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{activeModalCourse.instructor.name}</h4>
                  <p className="text-[11px] text-slate-500">{activeModalCourse.instructor.role}</p>
                  <p className="text-[11px] text-indigo-600 font-mono mt-0.5">{activeModalCourse.instructor.email}</p>
                </div>
              </div>

              {/* Prerequisites */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">
                  Prerequisites & Recommended Background
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalCourse.prerequisites.map((req, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md font-medium">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Syllabus Breakdown */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">
                  Syllabus Curriculum ({activeModalCourse.syllabus.length} Modules)
                </h4>
                <div className="space-y-3">
                  {activeModalCourse.syllabus.map((mod, i) => (
                    <div key={mod.id} className="border border-slate-200 rounded-lg p-3 bg-white">
                      <div className="font-bold text-slate-900 text-xs mb-1.5">
                        {mod.title}
                      </div>
                      <div className="space-y-1">
                        {mod.lessons.map(les => (
                          <div key={les.id} className="flex items-center justify-between text-xs text-slate-600 pl-2">
                            <span>• {les.title} ({les.type})</span>
                            <span className="text-[11px] font-mono text-slate-400">{les.durationMin}m</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Department: <strong>{activeModalCourse.department}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalCourse(null)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onEnroll(activeModalCourse.id);
                    onOpenCourse(activeModalCourse.id);
                    setActiveModalCourse(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Enroll & Start Learning
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
