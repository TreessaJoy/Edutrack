import {
  Student,
  Course,
  PlacementJob,
  Enrollment,
  JobApplication,
  NotificationItem,
  ApplicationStage
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_COURSES,
  INITIAL_JOBS,
  INITIAL_ENROLLMENTS,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface StorageState {
  students: Student[];
  courses: Course[];
  jobs: PlacementJob[];
  enrollments: Enrollment[];
  applications: JobApplication[];
  notifications: NotificationItem[];
}

const STORAGE_KEY = 'edutrack_system_data_v2';

export class EduTrackStorage {
  private static loadState(): StorageState {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (serialized) {
        return JSON.parse(serialized);
      }
    } catch (e) {
      console.error('Failed to load EduTrack local state, resetting to initial', e);
    }

    const initialState: StorageState = {
      students: INITIAL_STUDENTS,
      courses: INITIAL_COURSES,
      jobs: INITIAL_JOBS,
      enrollments: INITIAL_ENROLLMENTS,
      applications: INITIAL_APPLICATIONS,
      notifications: INITIAL_NOTIFICATIONS
    };
    EduTrackStorage.saveState(initialState);
    return initialState;
  }

  private static saveState(state: StorageState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save EduTrack state', e);
    }
  }

  // --- Students ---
  static getStudents(): Student[] {
    return this.loadState().students;
  }

  static getStudentById(id: string): Student | undefined {
    return this.getStudents().find(s => s.id === id);
  }

  static updateStudent(student: Student): void {
    const state = this.loadState();
    const idx = state.students.findIndex(s => s.id === student.id);
    if (idx !== -1) {
      state.students[idx] = student;
      this.saveState(state);
    }
  }

  static addStudent(studentData: Omit<Student, 'id'>): Student {
    const state = this.loadState();
    const newStudent: Student = {
      ...studentData,
      id: `std_${Date.now()}`
    };
    state.students.unshift(newStudent);
    this.saveState(state);
    return newStudent;
  }

  // --- Courses ---
  static getCourses(): Course[] {
    return this.loadState().courses;
  }

  static getCourseById(id: string): Course | undefined {
    return this.getCourses().find(c => c.id === id);
  }

  static addCourse(courseData: Omit<Course, 'id' | 'enrolledCount' | 'rating'>): Course {
    const state = this.loadState();
    const newCourse: Course = {
      ...courseData,
      id: `crs_${Date.now()}`,
      enrolledCount: 0,
      rating: 5.0
    };
    state.courses.unshift(newCourse);
    this.saveState(state);
    return newCourse;
  }

  static updateCourse(course: Course): void {
    const state = this.loadState();
    const idx = state.courses.findIndex(c => c.id === course.id);
    if (idx !== -1) {
      state.courses[idx] = course;
      this.saveState(state);
    }
  }

  // --- Enrollments ---
  static getEnrollments(): Enrollment[] {
    return this.loadState().enrollments;
  }

  static getEnrollmentsForStudent(studentId: string): Enrollment[] {
    return this.getEnrollments().filter(e => e.studentId === studentId);
  }

  static enrollStudent(studentId: string, courseId: string): Enrollment {
    const state = this.loadState();
    const existing = state.enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
    if (existing) return existing;

    const newEnrollment: Enrollment = {
      id: `enr_${Date.now()}`,
      studentId,
      courseId,
      enrolledDate: new Date().toISOString().split('T')[0],
      progressPercentage: 0,
      completedLessonIds: [],
      status: 'Enrolled'
    };

    state.enrollments.push(newEnrollment);

    // Increment course count
    const courseIdx = state.courses.findIndex(c => c.id === courseId);
    if (courseIdx !== -1) {
      state.courses[courseIdx].enrolledCount += 1;
    }

    // Add notification
    const course = state.courses.find(c => c.id === courseId);
    state.notifications.unshift({
      id: `notif_${Date.now()}`,
      title: 'Course Enrolled Successfully',
      message: `You have successfully enrolled in ${course?.title || 'the course'}. Start learning today!`,
      type: 'course',
      timestamp: 'Just now',
      read: false,
      linkTab: 'courses'
    });

    this.saveState(state);
    return newEnrollment;
  }

  static completeLesson(studentId: string, courseId: string, lessonId: string): Enrollment | undefined {
    const state = this.loadState();
    const enrollment = state.enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
    if (!enrollment) return undefined;

    if (!enrollment.completedLessonIds.includes(lessonId)) {
      enrollment.completedLessonIds.push(lessonId);
    }

    // Calculate total lessons in course
    const course = state.courses.find(c => c.id === courseId);
    let totalLessons = 0;
    course?.syllabus.forEach(m => {
      totalLessons += m.lessons.length;
    });

    if (totalLessons > 0) {
      const pct = Math.round((enrollment.completedLessonIds.length / totalLessons) * 100);
      enrollment.progressPercentage = Math.min(100, pct);

      if (enrollment.progressPercentage === 100) {
        enrollment.status = 'Completed';
        enrollment.grade = 'A+';
        enrollment.completedDate = new Date().toISOString().split('T')[0];
        if (!enrollment.certificateId) {
          enrollment.certificateId = `CERT-EDU-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
        }

        // Add completion notification
        state.notifications.unshift({
          id: `notif_${Date.now()}`,
          title: 'Course Completed! Certificate Unlocked',
          message: `Congratulations! You finished 100% of ${course?.title}. Your official certificate is ready.`,
          type: 'course',
          timestamp: 'Just now',
          read: false,
          linkTab: 'courses'
        });
      } else {
        enrollment.status = 'In Progress';
      }
    }

    this.saveState(state);
    return enrollment;
  }

  // --- Jobs & Placement Drives ---
  static getJobs(): PlacementJob[] {
    return this.loadState().jobs;
  }

  static getJobById(id: string): PlacementJob | undefined {
    return this.getJobs().find(j => j.id === id);
  }

  static addJob(jobData: Omit<PlacementJob, 'id'>): PlacementJob {
    const state = this.loadState();
    const newJob: PlacementJob = {
      ...jobData,
      id: `job_${Date.now()}`
    };
    state.jobs.unshift(newJob);

    state.notifications.unshift({
      id: `notif_${Date.now()}`,
      title: `New Placement Drive: ${newJob.companyName}`,
      message: `${newJob.companyName} opened recruitment for ${newJob.roleTitle} (${newJob.packageCTC}). Apply by ${newJob.deadline}.`,
      type: 'placement',
      timestamp: 'Just now',
      read: false,
      linkTab: 'placements'
    });

    this.saveState(state);
    return newJob;
  }

  static updateJob(job: PlacementJob): void {
    const state = this.loadState();
    const idx = state.jobs.findIndex(j => j.id === job.id);
    if (idx !== -1) {
      state.jobs[idx] = job;
      this.saveState(state);
    }
  }

  // --- Applications ---
  static getApplications(): JobApplication[] {
    return this.loadState().applications;
  }

  static getApplicationsForStudent(studentId: string): JobApplication[] {
    return this.getApplications().filter(a => a.studentId === studentId);
  }

  static applyForJob(studentId: string, jobId: string, resumeUsed: string): JobApplication {
    const state = this.loadState();
    const existing = state.applications.find(a => a.studentId === studentId && a.jobId === jobId);
    if (existing) return existing;

    const newApp: JobApplication = {
      id: `app_${Date.now()}`,
      studentId,
      jobId,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      resumeUsed
    };

    state.applications.push(newApp);

    const job = state.jobs.find(j => j.id === jobId);
    state.notifications.unshift({
      id: `notif_${Date.now()}`,
      title: `Applied to ${job?.companyName || 'Company'}`,
      message: `Your application for ${job?.roleTitle || 'Role'} has been registered. The placement cell will notify you of shortlists.`,
      type: 'placement',
      timestamp: 'Just now',
      read: false,
      linkTab: 'placements'
    });

    this.saveState(state);
    return newApp;
  }

  static updateApplicationStatus(
    applicationId: string,
    status: ApplicationStage,
    interviewDetails?: JobApplication['interviewDetails'],
    notes?: string
  ): void {
    const state = this.loadState();
    const app = state.applications.find(a => a.id === applicationId);
    if (app) {
      app.status = status;
      if (interviewDetails) app.interviewDetails = interviewDetails;
      if (notes !== undefined) app.notes = notes;

      const job = state.jobs.find(j => j.id === app.jobId);
      const student = state.students.find(s => s.id === app.studentId);

      // If offer extended, update student placement status
      if (status === 'Offer Extended' && student) {
        student.placementStatus = 'Placed';
      }

      state.notifications.unshift({
        id: `notif_${Date.now()}`,
        title: `Application Update: ${job?.companyName || 'Campus Drive'}`,
        message: `Your status has been updated to "${status}". Check placement details for instructions.`,
        type: 'placement',
        timestamp: 'Just now',
        read: false,
        linkTab: 'placements'
      });

      this.saveState(state);
    }
  }

  // --- Notifications ---
  static getNotifications(): NotificationItem[] {
    return this.loadState().notifications;
  }

  static markNotificationRead(id: string): void {
    const state = this.loadState();
    const notif = state.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.saveState(state);
    }
  }

  static markAllNotificationsRead(): void {
    const state = this.loadState();
    state.notifications.forEach(n => {
      n.read = true;
    });
    this.saveState(state);
  }

  // --- Analytics & Aggregates ---
  static getAnalytics() {
    const state = this.loadState();
    const totalStudents = state.students.length;
    const placedStudents = state.students.filter(s => s.placementStatus === 'Placed').length;
    const placementRate = totalStudents > 0 ? Math.round((placedStudents / totalStudents) * 100) : 0;

    const totalCourses = state.courses.length;
    const totalEnrollments = state.enrollments.length;
    const completedEnrollments = state.enrollments.filter(e => e.status === 'Completed').length;
    const courseCompletionRate = totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0;

    const totalJobs = state.jobs.length;
    const totalApplications = state.applications.length;
    const offersExtended = state.applications.filter(a => a.status === 'Offer Extended').length;

    // Numerical CTC calculations
    const numericCtcs = state.jobs
      .map(j => {
        const match = j.packageCTC.match(/([\d.]+)\s*LPA/i);
        return match ? parseFloat(match[1]) : 0;
      })
      .filter(n => n > 0);

    const highestPackage = numericCtcs.length > 0 ? Math.max(...numericCtcs) : 32.5;
    const avgPackage = numericCtcs.length > 0 ? (numericCtcs.reduce((a, b) => a + b, 0) / numericCtcs.length).toFixed(1) : '18.6';

    // Branch-wise stats
    const branchMap: Record<string, { total: number; placed: number; avgCgpa: number; cgpas: number[] }> = {};
    state.students.forEach(s => {
      const dept = s.department;
      if (!branchMap[dept]) {
        branchMap[dept] = { total: 0, placed: 0, avgCgpa: 0, cgpas: [] };
      }
      branchMap[dept].total += 1;
      branchMap[dept].cgpas.push(s.cgpa);
      if (s.placementStatus === 'Placed') {
        branchMap[dept].placed += 1;
      }
    });

    const branchStats = Object.keys(branchMap).map(dept => {
      const b = branchMap[dept];
      const avg = b.cgpas.length > 0 ? (b.cgpas.reduce((x, y) => x + y, 0) / b.cgpas.length).toFixed(2) : '0';
      return {
        department: dept,
        total: b.total,
        placed: b.placed,
        rate: Math.round((b.placed / b.total) * 100),
        avgCgpa: avg
      };
    });

    return {
      totalStudents,
      placedStudents,
      placementRate,
      totalCourses,
      totalEnrollments,
      completedEnrollments,
      courseCompletionRate,
      totalJobs,
      totalApplications,
      offersExtended,
      highestPackage: `${highestPackage} LPA`,
      avgPackage: `${avgPackage} LPA`,
      branchStats
    };
  }

  // Reset to initial
  static resetToDefault(): void {
    const initialState: StorageState = {
      students: INITIAL_STUDENTS,
      courses: INITIAL_COURSES,
      jobs: INITIAL_JOBS,
      enrollments: INITIAL_ENROLLMENTS,
      applications: INITIAL_APPLICATIONS,
      notifications: INITIAL_NOTIFICATIONS
    };
    this.saveState(initialState);
  }

  static exportJson(): string {
    return JSON.stringify(this.loadState(), null, 2);
  }
}
