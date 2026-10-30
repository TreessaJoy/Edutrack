import React from 'react';
import { Student, Course, Enrollment, PlacementJob, JobApplication } from '../types';
import {
  BookOpen,
  Briefcase,
  Award,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  ExternalLink,
  Play
} from 'lucide-react';

interface StudentDashboardProps {
  student: Student;
  courses: Course[];
  enrollments: Enrollment[];
  jobs: PlacementJob[];
  applications: JobApplication[];
  onNavigateTab: (tab: string) => void;
  onOpenCourse: (courseId: string) => void;
  onViewCertificate: (courseId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  courses,
  enrollments,
  jobs,
  applications,
  onNavigateTab,
  onOpenCourse,
  onViewCertificate
}) => {
  const studentEnrollments = enrollments.filter(e => e.studentId === student.id);
  const studentApplications = applications.filter(a => a.studentId === student.id);

  const completedCoursesCount = studentEnrollments.filter(e => e.status === 'Completed').length;
  const inProgressCoursesCount = studentEnrollments.filter(e => e.status === 'In Progress' || e.status === 'Enrolled').length;
  const offersCount = studentApplications.filter(a => a.status === 'Offer Extended').length;

  // Upcoming interviews
  const upcomingInterviews = studentApplications.filter(
    a => a.status === 'Interview Scheduled' && a.interviewDetails
  );

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={student.avatar}
              alt={student.fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-indigo-400/40 shadow-md shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Welcome back, {student.fullName}
                </h1>
                <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                  student.placementStatus === 'Placed'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : student.placementStatus === 'In Process'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-slate-700 text-slate-300'
                }`}>
                  {student.placementStatus}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {student.department} · Semester {student.semester} · Class of {student.graduationYear}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300 font-mono">
                <span>Roll: {student.rollNo}</span>
                <span>·</span>
                <span>Cumulative CGPA: <strong className="text-indigo-300 text-sm">{student.cgpa}</strong> / 10.0</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('placements')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors text-center whitespace-nowrap"
            >
              Explore Placement Drives
            </button>
            <button
              onClick={() => onNavigateTab('courses')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-lg transition-colors text-center whitespace-nowrap"
            >
              Browse Course Catalog
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Enrolled Courses</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{studentEnrollments.length}</span>
            <span className="text-xs text-slate-500">({inProgressCoursesCount} active)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Completed Courses</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{completedCoursesCount}</span>
            <span className="text-xs text-emerald-600 font-medium">Certificates earned</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Placement Applications</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{studentApplications.length}</span>
            <span className="text-xs text-slate-500">drives submitted</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Job Offers Extended</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{offersCount}</span>
            <span className="text-xs text-amber-600 font-medium">Offers in hand</span>
          </div>
        </div>
      </div>

      {/* Upcoming Interview Alert Box (if any) */}
      {upcomingInterviews.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-amber-950">
                  Upcoming Interview Scheduled
                </h3>
                <span className="text-xs font-mono font-medium text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                  {upcomingInterviews[0].interviewDetails?.date} · {upcomingInterviews[0].interviewDetails?.time}
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-1">
                {upcomingInterviews[0].interviewDetails?.round} ({upcomingInterviews[0].interviewDetails?.mode})
              </p>
              {upcomingInterviews[0].interviewDetails?.link && (
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={upcomingInterviews[0].interviewDetails?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-md text-xs font-medium transition-colors"
                  >
                    <span>Join Video Meeting</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => onNavigateTab('prep')}
                    className="text-xs font-medium text-amber-900 hover:underline"
                  >
                    Review Interview Tips & Practice Questions →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: My Active Courses & Placement Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Learning Progress & Active Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                My Courses & Learning Progress
              </h2>
              <p className="text-xs text-slate-500">
                Continue learning lessons, submit checkpoints, and earn completion certificates.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('courses')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Explore all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {studentEnrollments.length === 0 ? (
              <div className="p-8 text-center bg-white border border-slate-200 rounded-xl">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-slate-800">No courses enrolled yet</h4>
                <p className="text-xs text-slate-500 mt-1">Enroll in technical and placement-aligned courses to prepare for recruitment.</p>
                <button
                  onClick={() => onNavigateTab('courses')}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Browse Course Catalog
                </button>
              </div>
            ) : (
              studentEnrollments.map((enr) => {
                const course = courses.find(c => c.id === enr.courseId);
                if (!course) return null;

                let totalLessons = 0;
                course.syllabus.forEach(m => (totalLessons += m.lessons.length));

                return (
                  <div
                    key={enr.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-slate-300 transition-all shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <img
                          src={course.coverImage}
                          alt={course.title}
                          className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/src/assets/images/course_cloud_computing_1793378513238.jpg';
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-indigo-600 font-semibold">{course.code}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-[11px] text-slate-500">{course.category}</span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Instructor: {course.instructor.name} · {course.credits} Credits
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:self-center shrink-0">
                        {enr.status === 'Completed' ? (
                          <button
                            onClick={() => onViewCertificate(course.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
                          >
                            <Award className="w-3.5 h-3.5 text-emerald-600" />
                            <span>View Certificate</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onOpenCourse(course.id)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-2xs"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Continue</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar & Status */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-500">
                          {enr.completedLessonIds.length} of {totalLessons} lessons completed
                        </span>
                        <span className="font-mono font-semibold text-slate-900">
                          {enr.progressPercentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            enr.progressPercentage === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${enr.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Application Pipeline & Readiness */}
        <div className="space-y-6">
          
          {/* Active Job Applications */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">
                Application Pipeline ({studentApplications.length})
              </h2>
              <button
                onClick={() => onNavigateTab('placements')}
                className="text-xs font-medium text-indigo-600 hover:underline"
              >
                View all
              </button>
            </div>

            {studentApplications.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">
                You haven't applied to any drives yet. Check the Placement Drives tab.
              </p>
            ) : (
              <div className="space-y-3">
                {studentApplications.map(app => {
                  const job = jobs.find(j => j.id === app.jobId);
                  if (!job) return null;

                  return (
                    <div
                      key={app.id}
                      className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{job.companyName}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          app.status === 'Offer Extended'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'Interview Scheduled'
                            ? 'bg-amber-100 text-amber-800'
                            : app.status === 'Shortlisted'
                            ? 'bg-blue-100 text-blue-800'
                            : app.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{job.roleTitle}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                        <span>CTC: {job.packageCTC}</span>
                        <span>Applied: {app.appliedDate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Placement Readiness Card */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Placement Readiness</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your profile is <strong className="text-emerald-400">88% ready</strong> for campus placements.
            </p>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>CGPA & Academic records verified ({student.cgpa})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Technical resume link uploaded</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{student.certifications.length} verified certifications attached</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Complete mock aptitude assessment before Nov 10</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('prep')}
              className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Take Mock Placement Test
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
