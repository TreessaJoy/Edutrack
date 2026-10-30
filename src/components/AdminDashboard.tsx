import React, { useState } from 'react';
import {
  Student,
  Course,
  PlacementJob,
  Enrollment,
  JobApplication,
  ApplicationStage,
  PlacementStatus
} from '../types';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Briefcase,
  Plus,
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  Sparkles,
  TrendingUp,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  students: Student[];
  courses: Course[];
  jobs: PlacementJob[];
  enrollments: Enrollment[];
  applications: JobApplication[];
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onUpdateStudent: (student: Student) => void;
  onAddCourse: (course: Omit<Course, 'id' | 'enrolledCount' | 'rating'>) => void;
  onAddJob: (job: Omit<PlacementJob, 'id'>) => void;
  onUpdateJob: (job: PlacementJob) => void;
  onUpdateApplicationStatus: (
    appId: string,
    status: ApplicationStage,
    interviewDetails?: JobApplication['interviewDetails'],
    notes?: string
  ) => void;
  activeAdminTab: string;
  onAdminTabChange: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  courses,
  jobs,
  enrollments,
  applications,
  onAddStudent,
  onUpdateStudent,
  onAddCourse,
  onAddJob,
  onUpdateJob,
  onUpdateApplicationStatus,
  activeAdminTab,
  onAdminTabChange
}) => {
  // Modal states
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [interviewModalApp, setInterviewModalApp] = useState<JobApplication | null>(null);

  // Student directory filters
  const [studentSearch, setStudentSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Job pipeline view
  const [selectedJobIdForPipeline, setSelectedJobIdForPipeline] = useState<string>(jobs[0]?.id || '');

  // Form states
  const [newStudentForm, setNewStudentForm] = useState({
    rollNo: '',
    fullName: '',
    email: '',
    phone: '',
    department: 'Computer Science & Engineering',
    semester: 7,
    cgpa: 8.0,
    graduationYear: 2024,
    bio: '',
    skills: 'Python, React, SQL',
    certifications: 'AWS Certified Cloud Practitioner',
    resumeUrl: 'https://edutrack.edu/resumes/student_2024.pdf',
    linkedinUrl: '',
    githubUrl: '',
    placementStatus: 'Unplaced' as PlacementStatus,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const [newCourseForm, setNewCourseForm] = useState({
    code: '',
    title: '',
    category: 'Full-Stack' as Course['category'],
    department: 'Computer Science & Engineering',
    instructorName: '',
    instructorRole: 'Assistant Professor',
    instructorEmail: '',
    credits: 3,
    durationWeeks: 8,
    difficulty: 'Intermediate' as Course['difficulty'],
    description: '',
    prerequisites: 'Basic Programming, Data Structures',
    coverImage: '/src/assets/images/course_cloud_computing_1793378513238.jpg'
  });

  const [newJobForm, setNewJobForm] = useState({
    companyName: '',
    companyLogo: 'https://www.google.com/favicon.ico',
    companyWebsite: 'https://careers.google.com',
    roleTitle: '',
    jobType: 'Full-Time' as PlacementJob['jobType'],
    packageCTC: '12.0 LPA',
    location: 'Bengaluru / Hybrid',
    minCGPA: 7.5,
    eligibleBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Artificial Intelligence & Data Science'],
    deadline: '2026-11-30',
    driveDate: '2026-12-05',
    openings: 10,
    description: '',
    responsibilities: 'Build scalable software features\nCollaborate across engineering squads',
    requirements: 'Strong problem solving in Data Structures\nProficiency in modern programming language',
    selectionStages: 'Online Coding Test\nTechnical Interview 1\nHR Interview',
    status: 'Open' as PlacementJob['status']
  });

  const [interviewForm, setInterviewForm] = useState({
    date: '2026-11-08',
    time: '11:00 AM IST',
    round: 'Technical Round 1: Algorithms & System Design',
    mode: 'Online (Google Meet)' as 'Online (Google Meet)' | 'On-Campus (Auditorium)' | 'Technical Lab',
    link: 'https://meet.google.com/xyz-edu-interview'
  });

  // Calculate statistics
  const totalStudents = students.length;
  const placedCount = students.filter(s => s.placementStatus === 'Placed').length;
  const placementRate = totalStudents > 0 ? Math.round((placedCount / totalStudents) * 100) : 0;
  const totalOffers = applications.filter(a => a.status === 'Offer Extended').length;

  const branchSummary: Record<string, { total: number; placed: number; cgpas: number[] }> = {};
  students.forEach(s => {
    if (!branchSummary[s.department]) {
      branchSummary[s.department] = { total: 0, placed: 0, cgpas: [] };
    }
    branchSummary[s.department].total += 1;
    branchSummary[s.department].cgpas.push(s.cgpa);
    if (s.placementStatus === 'Placed') {
      branchSummary[s.department].placed += 1;
    }
  });

  // Student directory filtered list
  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesBranch = branchFilter === 'All' || s.department === branchFilter;
    const matchesStatus = statusFilter === 'All' || s.placementStatus === statusFilter;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Roll No', 'Full Name', 'Department', 'Semester', 'CGPA', 'Placement Status', 'Email', 'Phone'];
    const rows = filteredStudents.map(s => [
      s.rollNo,
      `"${s.fullName}"`,
      `"${s.department}"`,
      s.semester,
      s.cgpa,
      s.placementStatus,
      s.email,
      s.phone
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EduTrack_Student_Placement_Cohort_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent({
      rollNo: newStudentForm.rollNo,
      fullName: newStudentForm.fullName,
      email: newStudentForm.email,
      phone: newStudentForm.phone,
      department: newStudentForm.department,
      semester: Number(newStudentForm.semester),
      cgpa: Number(newStudentForm.cgpa),
      graduationYear: Number(newStudentForm.graduationYear),
      bio: newStudentForm.bio,
      skills: newStudentForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      certifications: newStudentForm.certifications.split(',').map(c => c.trim()).filter(Boolean),
      resumeUrl: newStudentForm.resumeUrl,
      linkedinUrl: newStudentForm.linkedinUrl,
      githubUrl: newStudentForm.githubUrl,
      placementStatus: newStudentForm.placementStatus,
      avatar: newStudentForm.avatar
    });
    setShowAddStudentModal(false);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCourse({
      code: newCourseForm.code,
      title: newCourseForm.title,
      category: newCourseForm.category,
      department: newCourseForm.department,
      instructor: {
        name: newCourseForm.instructorName,
        role: newCourseForm.instructorRole,
        email: newCourseForm.instructorEmail,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      },
      credits: Number(newCourseForm.credits),
      durationWeeks: Number(newCourseForm.durationWeeks),
      difficulty: newCourseForm.difficulty,
      description: newCourseForm.description,
      prerequisites: newCourseForm.prerequisites.split(',').map(p => p.trim()),
      coverImage: newCourseForm.coverImage,
      syllabus: [
        {
          id: `mod_${Date.now()}_1`,
          title: 'Module 1: Core Fundamentals & Principles',
          order: 1,
          lessons: [
            {
              id: `les_${Date.now()}_1`,
              title: 'Introduction, System Overview & Core Theory',
              type: 'reading',
              durationMin: 30,
              content: 'Curriculum overview and foundational theoretical components.'
            }
          ]
        }
      ]
    });
    setShowAddCourseModal(false);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    onAddJob({
      companyName: newJobForm.companyName,
      companyLogo: newJobForm.companyLogo,
      companyWebsite: newJobForm.companyWebsite,
      roleTitle: newJobForm.roleTitle,
      jobType: newJobForm.jobType,
      packageCTC: newJobForm.packageCTC,
      location: newJobForm.location,
      minCGPA: Number(newJobForm.minCGPA),
      eligibleBranches: newJobForm.eligibleBranches,
      deadline: newJobForm.deadline,
      driveDate: newJobForm.driveDate,
      openings: Number(newJobForm.openings),
      description: newJobForm.description,
      responsibilities: newJobForm.responsibilities.split('\n').filter(Boolean),
      requirements: newJobForm.requirements.split('\n').filter(Boolean),
      selectionStages: newJobForm.selectionStages.split('\n').filter(Boolean),
      status: newJobForm.status
    });
    setShowAddJobModal(false);
  };

  const handleScheduleInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewModalApp) return;

    onUpdateApplicationStatus(
      interviewModalApp.id,
      'Interview Scheduled',
      {
        date: interviewForm.date,
        time: interviewForm.time,
        round: interviewForm.round,
        mode: interviewForm.mode,
        link: interviewForm.link
      },
      `Interview slot confirmed by Placement Office. Please join the link 5 minutes prior.`
    );
    setInterviewModalApp(null);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Admin Subheader & Tab Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
              Training & Placement Administration
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            EduTrack Executive Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Institutional placement records, student cohorts, course offerings, and recruiter pipelines.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            onClick={() => onAdminTabChange('admin-analytics')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeAdminTab === 'admin-analytics'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Placement Analytics
          </button>
          <button
            onClick={() => onAdminTabChange('admin-students')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeAdminTab === 'admin-students'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Student Directory
          </button>
          <button
            onClick={() => onAdminTabChange('admin-courses')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeAdminTab === 'admin-courses'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Course Offerings
          </button>
          <button
            onClick={() => onAdminTabChange('admin-placements')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeAdminTab === 'admin-placements'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Drives & Applicant Pipeline
          </button>
        </div>
      </div>

      {/* VIEW 1: PLACEMENT ANALYTICS */}
      {activeAdminTab === 'admin-analytics' && (
        <div className="space-y-6">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Placement Rate</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-emerald-600">{placementRate}%</span>
                <span className="text-xs text-slate-400 font-mono">({placedCount}/{totalStudents} placed)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${placementRate}%` }} />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Highest Package</span>
              <div className="mt-2 text-3xl font-extrabold font-mono text-slate-900">
                32.5 <span className="text-sm font-sans font-semibold text-slate-500">LPA</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Extended by Google (Campus SWE)</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Average Placement Package</span>
              <div className="mt-2 text-3xl font-extrabold font-mono text-indigo-600">
                18.6 <span className="text-sm font-sans font-semibold text-slate-500">LPA</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Across 24 engineering drives</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Total Offers Dispatched</span>
              <div className="mt-2 text-3xl font-extrabold font-mono text-slate-900">
                {totalOffers} <span className="text-sm font-sans font-semibold text-slate-500">offers</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-2">100% on-campus verification</p>
            </div>
          </div>

          {/* Branch-wise Placement & Performance Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Branch-Wise Placement & Academic Analysis
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Real-time synchronization between academic records, CGPA distribution, and recruitment offers.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                    <th className="pb-3">Academic Department</th>
                    <th className="pb-3 text-right">Cohort Size</th>
                    <th className="pb-3 text-right">Students Placed</th>
                    <th className="pb-3 text-right">Placement Rate</th>
                    <th className="pb-3 text-right">Average CGPA</th>
                    <th className="pb-3 text-right">Visual Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {Object.keys(branchSummary).map(dept => {
                    const b = branchSummary[dept];
                    const rate = Math.round((b.placed / b.total) * 100);
                    const avgCgpa = (b.cgpas.reduce((x, y) => x + y, 0) / b.cgpas.length).toFixed(2);

                    return (
                      <tr key={dept} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 font-semibold text-slate-900">{dept}</td>
                        <td className="py-3 text-right font-mono">{b.total}</td>
                        <td className="py-3 text-right font-mono text-emerald-700 font-bold">{b.placed}</td>
                        <td className="py-3 text-right font-mono font-bold text-slate-900">{rate}%</td>
                        <td className="py-3 text-right font-mono">{avgCgpa}</td>
                        <td className="py-3 text-right w-44">
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden inline-block align-middle">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${rate}%` }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Corporate Recruiters Grid */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                Partner Recruiting Organizations ({jobs.length})
              </h3>
              <button
                onClick={() => {
                  onAdminTabChange('admin-placements');
                  setShowAddJobModal(true);
                }}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                + Post New Recruitment Drive
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {jobs.map(job => (
                <div key={job.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{job.companyName}</span>
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {job.packageCTC}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium truncate">{job.roleTitle}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-200">
                    <span>Min CGPA: {job.minCGPA}</span>
                    <span>{job.openings} Openings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: STUDENT DIRECTORY & MANAGEMENT */}
      {activeAdminTab === 'admin-students' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search student or roll no..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
              >
                <option value="All">All Departments</option>
                <option value="Computer Science & Engineering">CSE</option>
                <option value="Information Technology">IT</option>
                <option value="Artificial Intelligence & Data Science">AI & DS</option>
                <option value="Electronics & Communication">ECE</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
              >
                <option value="All">All Placement Statuses</option>
                <option value="Placed">Placed</option>
                <option value="In Process">In Process</option>
                <option value="Unplaced">Unplaced</option>
              </select>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={() => setShowAddStudentModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register Student</span>
              </button>
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Roll No</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4 text-right">CGPA</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4">Resume</th>
                    <th className="py-3 px-4 text-right">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredStudents.map(std => (
                    <tr key={std.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={std.avatar}
                            alt={std.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                            }}
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{std.fullName}</span>
                            <span className="text-[11px] text-slate-400">{std.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-slate-600">{std.rollNo}</td>
                      <td className="py-3 px-4">{std.department}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{std.cgpa}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          std.placementStatus === 'Placed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : std.placementStatus === 'In Process'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {std.placementStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={std.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          <span>PDF</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={std.placementStatus}
                          onChange={(e) => {
                            onUpdateStudent({
                              ...std,
                              placementStatus: e.target.value as PlacementStatus
                            });
                          }}
                          className="bg-white border border-slate-200 text-xs rounded px-2 py-1 focus:outline-none"
                        >
                          <option value="Unplaced">Unplaced</option>
                          <option value="In Process">In Process</option>
                          <option value="Placed">Placed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                No students match your filter criteria.
              </div>
            )}
          </div>

        </div>
      )}

      {/* VIEW 3: COURSE OFFERINGS */}
      {activeAdminTab === 'admin-courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">University Curriculum & Course Offerings</h2>
              <p className="text-xs text-slate-500">Manage syllabus, assign instructors, and review student progress.</p>
            </div>
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => {
              const courseEnrollments = enrollments.filter(e => e.courseId === course.id);
              const completedCount = courseEnrollments.filter(e => e.status === 'Completed').length;

              return (
                <div key={course.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.coverImage}
                        alt={course.title}
                        className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/course_cloud_computing_1793378513238.jpg';
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-600 text-xs">{course.code}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-500">{course.category}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mt-0.5 line-clamp-1">{course.title}</h3>
                        <p className="text-xs text-slate-500">Instructor: {course.instructor.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-center text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Credits</span>
                      <div className="font-mono font-bold text-slate-900">{course.credits}.0</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Enrolled</span>
                      <div className="font-mono font-bold text-slate-900">{courseEnrollments.length} students</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Completed</span>
                      <div className="font-mono font-bold text-emerald-700">{completedCount}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {course.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 4: PLACEMENT DRIVES & APPLICANT PIPELINE */}
      {activeAdminTab === 'admin-placements' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Placement Drive Applicant Pipeline</h2>
              <p className="text-xs text-slate-500">Review submitted resumes, schedule interviews, and extend placement offers.</p>
            </div>
            <button
              onClick={() => setShowAddJobModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Recruitment Drive</span>
            </button>
          </div>

          {/* Drive Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
            {jobs.map(job => {
              const jobApps = applications.filter(a => a.jobId === job.id);
              const isSelected = selectedJobIdForPipeline === job.id;

              return (
                <button
                  key={job.id}
                  onClick={() => setSelectedJobIdForPipeline(job.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{job.companyName}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isSelected ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {jobApps.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Job Candidate Pipeline */}
          {(() => {
            const currentJob = jobs.find(j => j.id === selectedJobIdForPipeline) || jobs[0];
            if (!currentJob) return null;
            const currentJobApps = applications.filter(a => a.jobId === currentJob.id);

            return (
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{currentJob.companyName}</h3>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs font-semibold text-indigo-600">{currentJob.roleTitle}</span>
                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {currentJob.packageCTC}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Min CGPA: <strong>{currentJob.minCGPA}</strong> · Openings: <strong>{currentJob.openings}</strong> · Drive Date: <strong>{currentJob.driveDate}</strong>
                    </p>
                  </div>
                </div>

                {/* Candidate Applications Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Roll No</th>
                        <th className="py-3 px-4">Department</th>
                        <th className="py-3 px-4 text-right">CGPA</th>
                        <th className="py-3 px-4">Applied Date</th>
                        <th className="py-3 px-4 text-center">Current Stage</th>
                        <th className="py-3 px-4 text-right">Pipeline Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {currentJobApps.map(app => {
                        const std = students.find(s => s.id === app.studentId);
                        if (!std) return null;

                        return (
                          <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <img
                                  src={std.avatar}
                                  alt={std.fullName}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                                />
                                <div>
                                  <span className="font-bold text-slate-900 block">{std.fullName}</span>
                                  <a
                                    href={app.resumeUsed}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] text-indigo-600 hover:underline flex items-center gap-0.5"
                                  >
                                    <span>Resume</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono font-medium text-slate-600">{std.rollNo}</td>
                            <td className="py-3 px-4">{std.department.split(' ')[0]}</td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{std.cgpa}</td>
                            <td className="py-3 px-4 font-mono text-slate-500">{app.appliedDate}</td>
                            <td className="py-3 px-4 text-center">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                app.status === 'Offer Extended'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'Interview Scheduled'
                                  ? 'bg-amber-100 text-amber-800'
                                  : app.status === 'Shortlisted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : app.status === 'Rejected'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => onUpdateApplicationStatus(app.id, 'Shortlisted')}
                                  title="Shortlist Candidate"
                                  className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[11px] font-medium"
                                >
                                  Shortlist
                                </button>
                                <button
                                  onClick={() => setInterviewModalApp(app)}
                                  title="Schedule Interview"
                                  className="px-2 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[11px] font-medium"
                                >
                                  Interview
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Extend official placement offer from ${currentJob.companyName} to ${std.fullName}?`)) {
                                      onUpdateApplicationStatus(app.id, 'Offer Extended', undefined, `Offer letter processed with package ${currentJob.packageCTC}.`);
                                    }
                                  }}
                                  title="Extend Offer"
                                  className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-medium"
                                >
                                  Offer
                                </button>
                                <button
                                  onClick={() => onUpdateApplicationStatus(app.id, 'Rejected')}
                                  title="Reject"
                                  className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[11px] font-medium"
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {currentJobApps.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500">
                    No students have applied to this drive yet.
                  </div>
                )}
              </div>
            );
          })()}

        </div>
      )}

      {/* MODAL: Register New Student */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Register New Student Profile</h2>
              <button onClick={() => setShowAddStudentModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateStudent} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStudentForm.fullName}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, fullName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">University Roll Number</label>
                  <input
                    type="text"
                    required
                    value={newStudentForm.rollNo}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, rollNo: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                    placeholder="e.g. 2024CSB1090"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={newStudentForm.email}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    placeholder="rahul@edutrack.edu"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={newStudentForm.phone}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    placeholder="+91 98765 00000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={newStudentForm.department}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, department: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Computer Science & Engineering">CSE</option>
                    <option value="Information Technology">IT</option>
                    <option value="Artificial Intelligence & Data Science">AI & DS</option>
                    <option value="Electronics & Communication">ECE</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    required
                    value={newStudentForm.cgpa}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Placement Status</label>
                  <select
                    value={newStudentForm.placementStatus}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, placementStatus: e.target.value as PlacementStatus })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Unplaced">Unplaced</option>
                    <option value="In Process">In Process</option>
                    <option value="Placed">Placed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technical Skills (comma separated)</label>
                <input
                  type="text"
                  value={newStudentForm.skills}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, skills: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  placeholder="Python, React, AWS, Docker..."
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800"
                >
                  Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add New Course */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Add Academic Course Offering</h2>
              <button onClick={() => setShowAddCourseModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    value={newCourseForm.code}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, code: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                    placeholder="CS501"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={newCourseForm.title}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    placeholder="Full-Stack Engineering"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCourseForm.category}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, category: e.target.value as Course['category'] })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Credits</label>
                  <input
                    type="number"
                    required
                    value={newCourseForm.credits}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, credits: parseInt(e.target.value) || 3 })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={newCourseForm.difficulty}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, difficulty: e.target.value as Course['difficulty'] })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lead Instructor Name</label>
                  <input
                    type="text"
                    required
                    value={newCourseForm.instructorName}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, instructorName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    placeholder="Dr. Anand Verma"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Instructor Email</label>
                  <input
                    type="email"
                    required
                    value={newCourseForm.instructorEmail}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, instructorEmail: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                    placeholder="a.verma@edutrack.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Description</label>
                <textarea
                  rows={3}
                  required
                  value={newCourseForm.description}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  placeholder="Master full stack architectures..."
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Save & Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Post New Job Drive */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Post New Placement Recruitment Drive</h2>
              <button onClick={() => setShowAddJobModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateJob} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.companyName}
                    onChange={(e) => setNewJobForm({ ...newJobForm, companyName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    placeholder="e.g. Adobe"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.roleTitle}
                    onChange={(e) => setNewJobForm({ ...newJobForm, roleTitle: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    placeholder="Software Engineer - Cloud"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">CTC Package</label>
                  <input
                    type="text"
                    required
                    value={newJobForm.packageCTC}
                    onChange={(e) => setNewJobForm({ ...newJobForm, packageCTC: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                    placeholder="18.0 LPA"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Min CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newJobForm.minCGPA}
                    onChange={(e) => setNewJobForm({ ...newJobForm, minCGPA: parseFloat(e.target.value) || 7.0 })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Openings</label>
                  <input
                    type="number"
                    required
                    value={newJobForm.openings}
                    onChange={(e) => setNewJobForm({ ...newJobForm, openings: parseInt(e.target.value) || 5 })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    required
                    value={newJobForm.deadline}
                    onChange={(e) => setNewJobForm({ ...newJobForm, deadline: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">On-Campus Drive Date</label>
                  <input
                    type="date"
                    required
                    value={newJobForm.driveDate}
                    onChange={(e) => setNewJobForm({ ...newJobForm, driveDate: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={2}
                  required
                  value={newJobForm.description}
                  onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  placeholder="Brief role and team overview..."
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddJobModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Publish Placement Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Schedule Interview */}
      {interviewModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">Schedule Interview Slot</h2>
              <button onClick={() => setInterviewModalApp(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleScheduleInterviewSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interview Round Title</label>
                <input
                  type="text"
                  required
                  value={interviewForm.round}
                  onChange={(e) => setInterviewForm({ ...interviewForm, round: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                  placeholder="Technical Round 1: DSA & Architecture"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Interview Date</label>
                  <input
                    type="date"
                    required
                    value={interviewForm.date}
                    onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time (IST)</label>
                  <input
                    type="text"
                    required
                    value={interviewForm.time}
                    onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                    placeholder="14:00 IST"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mode of Interview</label>
                <select
                  value={interviewForm.mode}
                  onChange={(e) => setInterviewForm({ ...interviewForm, mode: e.target.value as any })}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Online (Google Meet)">Online (Google Meet)</option>
                  <option value="On-Campus (Auditorium)">On-Campus (Auditorium)</option>
                  <option value="Technical Lab">Technical Lab</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meeting URL / Location Info</label>
                <input
                  type="url"
                  value={interviewForm.link}
                  onChange={(e) => setInterviewForm({ ...interviewForm, link: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInterviewModalApp(null)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Confirm & Notify Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
