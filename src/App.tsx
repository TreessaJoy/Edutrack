import React, { useState, useEffect } from 'react';
import {
  Role,
  Student,
  Course,
  PlacementJob,
  Enrollment,
  JobApplication,
  NotificationItem,
  ApplicationStage
} from './types';
import { EduTrackStorage } from './services/storage';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { CourseCatalog } from './components/CourseCatalog';
import { CoursePlayer } from './components/CoursePlayer';
import { PlacementPortal } from './components/PlacementPortal';
import { PlacementPrep } from './components/PlacementPrep';
import { StudentProfile } from './components/StudentProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { CertificateModal } from './components/CertificateModal';

export default function App() {
  // Global domain state loaded from persistent EduTrackStorage
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<PlacementJob[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Session & navigation state
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [activeStudentId, setActiveStudentId] = useState<string>('std_01');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeLearningCourseId, setActiveLearningCourseId] = useState<string | null>(null);
  const [certificateCourseId, setCertificateCourseId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state from storage
  const refreshData = () => {
    const stds = EduTrackStorage.getStudents();
    setStudents(stds);
    setCourses(EduTrackStorage.getCourses());
    setJobs(EduTrackStorage.getJobs());
    setEnrollments(EduTrackStorage.getEnrollments());
    setApplications(EduTrackStorage.getApplications());
    setNotifications(EduTrackStorage.getNotifications());

    // If active student not in list, fallback
    if (!stds.some(s => s.id === activeStudentId) && stds.length > 0) {
      setActiveStudentId(stds[0].id);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];

  // --- Handlers ---
  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    if (role === 'student') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('admin-analytics');
    }
  };

  const handleSelectStudent = (student: Student) => {
    setActiveStudentId(student.id);
    showToast(`Switched active profile to ${student.fullName}`);
  };

  const handleEnrollCourse = (courseId: string) => {
    if (!activeStudent) return;
    EduTrackStorage.enrollStudent(activeStudent.id, courseId);
    refreshData();
    const course = courses.find(c => c.id === courseId);
    showToast(`Enrolled successfully in ${course?.title || 'course'}!`);
  };

  const handleOpenCourse = (courseId: string) => {
    setActiveLearningCourseId(courseId);
    setActiveTab('learning');
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (!activeStudent || !activeLearningCourseId) return;
    EduTrackStorage.completeLesson(activeStudent.id, activeLearningCourseId, lessonId);
    refreshData();
    showToast('Lesson marked as completed! Progress updated.');
  };

  const handleApplyJob = (jobId: string, resumeUrl: string) => {
    if (!activeStudent) return;
    EduTrackStorage.applyForJob(activeStudent.id, jobId, resumeUrl);
    refreshData();
    const job = jobs.find(j => j.id === jobId);
    showToast(`Application submitted to ${job?.companyName || 'Recruiter'}!`);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    EduTrackStorage.updateStudent(updatedStudent);
    refreshData();
    showToast('Student academic profile updated successfully.');
  };

  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    const created = EduTrackStorage.addStudent(studentData);
    refreshData();
    showToast(`Registered new student ${created.fullName} (${created.rollNo})`);
  };

  const handleAddCourse = (courseData: Omit<Course, 'id' | 'enrolledCount' | 'rating'>) => {
    const created = EduTrackStorage.addCourse(courseData);
    refreshData();
    showToast(`Published course ${created.code}: ${created.title}`);
  };

  const handleAddJob = (jobData: Omit<PlacementJob, 'id'>) => {
    const created = EduTrackStorage.addJob(jobData);
    refreshData();
    showToast(`Published placement drive for ${created.companyName}`);
  };

  const handleUpdateJob = (job: PlacementJob) => {
    EduTrackStorage.updateJob(job);
    refreshData();
    showToast(`Updated placement drive for ${job.companyName}`);
  };

  const handleUpdateApplicationStatus = (
    appId: string,
    status: ApplicationStage,
    interviewDetails?: JobApplication['interviewDetails'],
    notes?: string
  ) => {
    EduTrackStorage.updateApplicationStatus(appId, status, interviewDetails, notes);
    refreshData();
    showToast(`Application updated to "${status}"`);
  };

  const handleResetData = () => {
    EduTrackStorage.resetToDefault();
    refreshData();
    showToast('Database reset to default university records.');
  };

  const handleMarkNotificationRead = (id: string) => {
    EduTrackStorage.markNotificationRead(id);
    refreshData();
  };

  const handleMarkAllNotificationsRead = () => {
    EduTrackStorage.markAllNotificationsRead();
    refreshData();
  };

  if (!activeStudent && students.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="p-6 text-center text-slate-500 text-sm">
          Loading EduTrack System...
        </div>
      </div>
    );
  }

  const certificateCourse = courses.find(c => c.id === certificateCourseId);
  const activeLearningCourse = courses.find(c => c.id === activeLearningCourseId);
  const activeLearningEnrollment = enrollments.find(
    e => e.studentId === activeStudent?.id && e.courseId === activeLearningCourseId
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'learning') setActiveLearningCourseId(null);
        }}
        activeStudent={activeStudent}
        studentsList={students}
        onSelectStudent={handleSelectStudent}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onResetData={handleResetData}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* STUDENT VIEWS */}
        {currentRole === 'student' && (
          <>
            {activeTab === 'dashboard' && (
              <StudentDashboard
                student={activeStudent}
                courses={courses}
                enrollments={enrollments}
                jobs={jobs}
                applications={applications}
                onNavigateTab={setActiveTab}
                onOpenCourse={handleOpenCourse}
                onViewCertificate={(courseId) => setCertificateCourseId(courseId)}
              />
            )}

            {activeTab === 'courses' && (
              <CourseCatalog
                courses={courses}
                enrollments={enrollments}
                student={activeStudent}
                onEnroll={handleEnrollCourse}
                onOpenCourse={handleOpenCourse}
                onViewCertificate={(courseId) => setCertificateCourseId(courseId)}
              />
            )}

            {activeTab === 'learning' && activeLearningCourse && (
              <CoursePlayer
                course={activeLearningCourse}
                enrollment={activeLearningEnrollment}
                student={activeStudent}
                onBack={() => setActiveTab('courses')}
                onCompleteLesson={handleCompleteLesson}
                onViewCertificate={() => setCertificateCourseId(activeLearningCourse.id)}
              />
            )}

            {activeTab === 'placements' && (
              <PlacementPortal
                jobs={jobs}
                applications={applications}
                student={activeStudent}
                onApply={handleApplyJob}
                onNavigatePrep={() => setActiveTab('prep')}
              />
            )}

            {activeTab === 'prep' && (
              <PlacementPrep student={activeStudent} />
            )}

            {activeTab === 'profile' && (
              <StudentProfile
                student={activeStudent}
                onUpdateStudent={handleUpdateStudent}
              />
            )}
          </>
        )}

        {/* ADMIN & TPO VIEWS */}
        {currentRole === 'admin' && (
          <AdminDashboard
            students={students}
            courses={courses}
            jobs={jobs}
            enrollments={enrollments}
            applications={applications}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onAddCourse={handleAddCourse}
            onAddJob={handleAddJob}
            onUpdateJob={handleUpdateJob}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            activeAdminTab={activeTab}
            onAdminTabChange={setActiveTab}
          />
        )}

      </main>

      {/* Official Certificate Modal */}
      {certificateCourseId && certificateCourse && activeStudent && (
        <CertificateModal
          isOpen={true}
          onClose={() => setCertificateCourseId(null)}
          student={activeStudent}
          course={certificateCourse}
          certificateId={
            enrollments.find(e => e.studentId === activeStudent.id && e.courseId === certificateCourse.id)?.certificateId ||
            'CERT-EDU-2024-99824'
          }
          completionDate={
            enrollments.find(e => e.studentId === activeStudent.id && e.courseId === certificateCourse.id)?.completedDate ||
            '2024-04-10'
          }
          grade={
            enrollments.find(e => e.studentId === activeStudent.id && e.courseId === certificateCourse.id)?.grade ||
            'A+'
          }
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white text-slate-500 py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <strong className="text-slate-800">EduTrack</strong> – Student Course & Placement Management System
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>React & Vite Architecture</span>
            <span>·</span>
            <span>REST & Relational Schema Ready</span>
            <span>·</span>
            <span>Campus Placement Cell</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
