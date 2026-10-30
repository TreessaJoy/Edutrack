export type Role = 'student' | 'admin';

export type PlacementStatus = 'Unplaced' | 'In Process' | 'Placed';

export interface Student {
  id: string;
  rollNo: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  semester: number;
  cgpa: number;
  graduationYear: number;
  bio: string;
  skills: string[];
  certifications: string[];
  resumeUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  placementStatus: PlacementStatus;
  avatar: string;
}

export type LessonType = 'reading' | 'video' | 'quiz' | 'assignment';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  type: LessonType;
  durationMin: number;
  content: string;
  quiz?: QuizQuestion[];
  assignmentPrompt?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: 'Full-Stack' | 'AI & Machine Learning' | 'Cloud Computing' | 'Data Science' | 'Cybersecurity' | 'Soft Skills';
  department: string;
  instructor: {
    name: string;
    role: string;
    email: string;
    avatar: string;
  };
  credits: number;
  durationWeeks: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolledCount: number;
  description: string;
  prerequisites: string[];
  coverImage: string;
  syllabus: CourseModule[];
}

export type EnrollmentStatus = 'Enrolled' | 'In Progress' | 'Completed';

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledDate: string;
  progressPercentage: number;
  completedLessonIds: string[];
  status: EnrollmentStatus;
  grade?: string;
  completedDate?: string;
  certificateId?: string;
}

export type JobType = 'Full-Time' | 'Internship' | 'Trainee';
export type JobStatus = 'Open' | 'Closed' | 'Interviewing';

export interface PlacementJob {
  id: string;
  companyName: string;
  companyLogo: string;
  companyWebsite: string;
  roleTitle: string;
  jobType: JobType;
  packageCTC: string; // e.g. "14.5 LPA" or "₹45,000/month"
  location: string;
  minCGPA: number;
  eligibleBranches: string[];
  deadline: string;
  driveDate: string;
  openings: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  selectionStages: string[];
  status: JobStatus;
}

export type ApplicationStage = 'Applied' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Extended' | 'Rejected';

export interface JobApplication {
  id: string;
  studentId: string;
  jobId: string;
  appliedDate: string;
  status: ApplicationStage;
  resumeUsed: string;
  interviewDetails?: {
    date: string;
    time: string;
    round: string;
    mode: 'Online (Google Meet)' | 'On-Campus (Auditorium)' | 'Technical Lab';
    link?: string;
  };
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'placement' | 'course' | 'system';
  timestamp: string;
  read: boolean;
  linkTab?: string;
}
