import React, { useState } from 'react';
import { PlacementJob, JobApplication, Student } from '../types';
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  Filter,
  Clock,
  ArrowRight,
  Send,
  X,
  FileText,
  Video,
  Sparkles
} from 'lucide-react';

interface PlacementPortalProps {
  jobs: PlacementJob[];
  applications: JobApplication[];
  student: Student;
  onApply: (jobId: string, resumeUrl: string) => void;
  onNavigatePrep: () => void;
}

export const PlacementPortal: React.FC<PlacementPortalProps> = ({
  jobs,
  applications,
  student,
  onApply,
  onNavigatePrep
}) => {
  const [activeTab, setActiveTab] = useState<'openings' | 'applications'>('openings');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeJobDetails, setActiveJobDetails] = useState<PlacementJob | null>(null);

  const studentApplications = applications.filter(a => a.studentId === student.id);

  const filteredJobs = jobs.filter(j => {
    const matchesType = selectedType === 'All' || j.jobType === selectedType;
    const matchesSearch =
      j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.packageCTC.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const checkEligibility = (job: PlacementJob) => {
    const cgpaOk = student.cgpa >= job.minCGPA;
    const branchOk = job.eligibleBranches.some(b =>
      b.toLowerCase() === student.department.toLowerCase() ||
      b.toLowerCase().includes(student.department.toLowerCase()) ||
      student.department.toLowerCase().includes(b.toLowerCase())
    );

    return {
      eligible: cgpaOk && branchOk,
      cgpaOk,
      branchOk
    };
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Campus Placement & Internship Drives
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Apply to top technology recruiters, track your selection stages, and review interview schedules.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('openings')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'openings'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Recruitment Drives ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'applications'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Applications ({studentApplications.length})
          </button>
        </div>
      </div>

      {activeTab === 'openings' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search company, role, package..."
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
              <span className="text-slate-400">Type:</span>
              {['All', 'Full-Time', 'Internship'].map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
                    selectedType === t
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map(job => {
              const application = studentApplications.find(a => a.jobId === job.id);
              const { eligible, cgpaOk, branchOk } = checkEligibility(job);

              return (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    {/* Company Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0">
                          <Building2 className="w-6 h-6 text-slate-700" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-base">
                              {job.companyName}
                            </h3>
                            <a
                              href={job.companyWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-slate-700"
                              title="Visit company careers"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                            {job.roleTitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold font-mono text-slate-900">
                          {job.packageCTC}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          {job.jobType}
                        </span>
                      </div>
                    </div>

                    {/* Meta tags */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-500">
                      <span>Location: <strong className="text-slate-700">{job.location}</strong></span>
                      <span>·</span>
                      <span>Min CGPA: <strong className="font-mono text-slate-700">{job.minCGPA}</strong></span>
                      <span>·</span>
                      <span>Openings: <strong className="font-mono text-slate-700">{job.openings}</strong></span>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Eligibility Badge */}
                    <div className="mt-4 p-2.5 rounded-lg text-xs flex items-center justify-between border">
                      {eligible ? (
                        <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50/80 border-emerald-200 w-full p-1.5 rounded">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium text-[11px]">
                            Eligible to Apply (CGPA {student.cgpa} ≥ {job.minCGPA} & Branch matches)
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-rose-800 bg-rose-50/80 border-rose-200 w-full p-1.5 rounded">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span className="font-medium text-[11px]">
                            {!cgpaOk
                              ? `Ineligible: CGPA ${student.cgpa} is below min ${job.minCGPA}`
                              : `Ineligible: ${student.department} is not listed in target branches`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions & Deadline */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Deadline: {job.deadline}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveJobDetails(job)}
                        className="px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                      >
                        Details
                      </button>

                      {application ? (
                        <span className={`px-3 py-1.5 rounded-md font-semibold text-xs ${
                          application.status === 'Offer Extended'
                            ? 'bg-emerald-100 text-emerald-800'
                            : application.status === 'Interview Scheduled'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          ✓ {application.status}
                        </span>
                      ) : (
                        <button
                          onClick={() => onApply(job.id, student.resumeUrl)}
                          disabled={!eligible}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 disabled:opacity-40 disabled:hover:bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-md transition-colors shadow-2xs"
                        >
                          <Send className="w-3 h-3" />
                          <span>1-Click Apply</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submitted Applications Tracker View */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Active Application Pipeline
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Track your interview rounds, selection status, and feedback from company recruiters.
            </p>

            {studentApplications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No active applications. Explore available campus drives to apply.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {studentApplications.map(app => {
                  const job = jobs.find(j => j.id === app.jobId);
                  if (!job) return null;

                  const stages = ['Applied', 'Shortlisted', 'Interview Scheduled', 'Offer Extended'];
                  const currentStageIndex = stages.indexOf(app.status);

                  return (
                    <div
                      key={app.id}
                      className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-base">{job.companyName}</h3>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs font-semibold text-indigo-600">{job.roleTitle}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Package: <span className="font-mono font-semibold text-slate-800">{job.packageCTC}</span> · Applied on {app.appliedDate}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            app.status === 'Offer Extended'
                              ? 'bg-emerald-500 text-white'
                              : app.status === 'Interview Scheduled'
                              ? 'bg-amber-500 text-white'
                              : app.status === 'Rejected'
                              ? 'bg-rose-500 text-white'
                              : 'bg-indigo-600 text-white'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>

                      {/* Visual 4-Step Pipeline Bar */}
                      <div className="py-2">
                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                          {stages.map((stg, i) => {
                            const isPassed = app.status === 'Offer Extended' ? true : currentStageIndex >= i;
                            const isCurrent = app.status === stg;

                            return (
                              <div key={stg} className="space-y-1">
                                <div
                                  className={`h-1.5 rounded-full transition-all ${
                                    isPassed ? 'bg-indigo-600' : 'bg-slate-200'
                                  }`}
                                />
                                <span
                                  className={`block text-[11px] truncate ${
                                    isCurrent
                                      ? 'font-bold text-indigo-600'
                                      : isPassed
                                      ? 'font-medium text-slate-800'
                                      : 'text-slate-400'
                                  }`}
                                >
                                  {stg}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interview Details Card if Scheduled */}
                      {app.interviewDetails && app.status === 'Interview Scheduled' && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-amber-950 flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-amber-700" />
                              Interview Details: {app.interviewDetails.round}
                            </span>
                            <span className="font-mono font-semibold text-amber-900">
                              {app.interviewDetails.date} at {app.interviewDetails.time}
                            </span>
                          </div>
                          <p className="text-xs text-amber-800">
                            Format: <strong>{app.interviewDetails.mode}</strong>
                          </p>
                          {app.interviewDetails.link && (
                            <div className="pt-2 flex items-center gap-3">
                              <a
                                href={app.interviewDetails.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-md transition-colors"
                              >
                                <Video className="w-3.5 h-3.5" /> Join Virtual Meeting
                              </a>
                              <button
                                onClick={onNavigatePrep}
                                className="text-xs font-semibold text-amber-950 hover:underline"
                              >
                                Open Interview Preparation Hub →
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Notes / Recruiter feedback */}
                      {app.notes && (
                        <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                          <strong className="text-slate-800">TPO / Recruiter Remarks: </strong>
                          {app.notes}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Job Details Modal */}
      {activeJobDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            
            <div className="flex items-start justify-between p-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">{activeJobDetails.companyName}</h2>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-mono font-bold text-slate-700">{activeJobDetails.packageCTC}</span>
                </div>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">{activeJobDetails.roleTitle}</p>
              </div>
              <button
                onClick={() => setActiveJobDetails(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1.5">
                  Job Description
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {activeJobDetails.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1.5">
                  Key Responsibilities
                </h4>
                <ul className="space-y-1 text-slate-600">
                  {activeJobDetails.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1.5">
                  Candidate Requirements
                </h4>
                <ul className="space-y-1 text-slate-600">
                  {activeJobDetails.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1.5">
                  Selection Stages
                </h4>
                <div className="space-y-1.5">
                  {activeJobDetails.selectionStages.map((stg, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                      <span className="font-mono text-indigo-600 font-bold">{i + 1}.</span>
                      <span>{stg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Deadline: <strong>{activeJobDetails.deadline}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveJobDetails(null)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onApply(activeJobDetails.id, student.resumeUrl);
                    setActiveJobDetails(null);
                  }}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
