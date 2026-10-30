import React from 'react';
import { Course, Student } from '../types';
import { Award, CheckCircle, Download, Printer, X } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  course: Course;
  certificateId?: string;
  completionDate?: string;
  grade?: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  student,
  course,
  certificateId = 'CERT-EDU-2024-99824',
  completionDate = new Date().toISOString().split('T')[0],
  grade = 'A+'
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Official Academic Certificate of Completion</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              Print Certificate
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 relative border-8 border-double border-slate-200 m-4 rounded-lg">
          
          {/* Subtle Decorative Background Watermark */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <Award className="w-96 h-96 text-slate-900" />
          </div>

          {/* Header */}
          <div className="text-center relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 text-amber-400 mb-3 shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-slate-500">
              EduTrack Academy of Technology & Research
            </h3>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Certificate of Technical Achievement
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Credential Verification ID: <span className="font-mono text-slate-700 font-medium">{certificateId}</span>
            </p>
          </div>

          {/* Recipient Details */}
          <div className="text-center my-8 relative z-10">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              This is to officially certify that
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 font-serif tracking-normal">
              {student.fullName}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Roll No: <span className="font-mono font-medium text-slate-800">{student.rollNo}</span> · Department of {student.department}
            </p>
            <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-4 mb-5" />
            <p className="text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
              has successfully fulfilled all curriculum requirements, continuous assessments, checkpoint quizzes, and practical assignments for the course
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
              {course.title}
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Course Code: {course.code} · Credits: {course.credits}.0 · Performance Grade: <span className="text-emerald-700 font-bold">{grade}</span>
            </p>
          </div>

          {/* Signatures & Verification footer */}
          <div className="grid grid-cols-2 gap-8 pt-6 mt-8 border-t border-slate-200 relative z-10">
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 font-medium pb-1 border-b border-slate-300 w-36 mx-auto">
                {course.instructor.name}
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-1">{course.instructor.name}</p>
              <p className="text-[11px] text-slate-500">Lead Course Instructor</p>
            </div>

            <div className="text-center">
              <div className="font-serif italic text-base text-slate-800 font-medium pb-1 border-b border-slate-300 w-36 mx-auto">
                Dr. R. K. Vishwanathan
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-1">Dr. R. K. Vishwanathan</p>
              <p className="text-[11px] text-slate-500">Dean of Academic Affairs</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            <span>Date of Issue: {completionDate}</span>
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <CheckCircle className="w-3 h-3" /> Digitally Verified Credential
            </span>
            <span>Accredited Academic Record</span>
          </div>

        </div>

      </div>
    </div>
  );
};
