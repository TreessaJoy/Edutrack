import React, { useState } from 'react';
import { Student } from '../types';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  FileText,
  Linkedin,
  Github,
  Plus,
  Trash2,
  Check,
  Edit2,
  X,
  ExternalLink
} from 'lucide-react';

interface StudentProfileProps {
  student: Student;
  onUpdateStudent: (updated: Student) => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  student,
  onUpdateStudent
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: student.fullName,
    email: student.email,
    phone: student.phone,
    department: student.department,
    semester: student.semester,
    cgpa: student.cgpa,
    graduationYear: student.graduationYear,
    bio: student.bio,
    resumeUrl: student.resumeUrl,
    linkedinUrl: student.linkedinUrl,
    githubUrl: student.githubUrl
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCert, setNewCert] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Student = {
      ...student,
      ...editFormData
    };
    onUpdateStudent(updated);
    setIsEditModalOpen(false);
  };

  const handleAddSkill = () => {
    if (!newSkill.trim() || student.skills.includes(newSkill.trim())) return;
    const updated: Student = {
      ...student,
      skills: [...student.skills, newSkill.trim()]
    };
    onUpdateStudent(updated);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated: Student = {
      ...student,
      skills: student.skills.filter(s => s !== skillToRemove)
    };
    onUpdateStudent(updated);
  };

  const handleAddCert = () => {
    if (!newCert.trim() || student.certifications.includes(newCert.trim())) return;
    const updated: Student = {
      ...student,
      certifications: [...student.certifications, newCert.trim()]
    };
    onUpdateStudent(updated);
    setNewCert('');
  };

  const handleRemoveCert = (certToRemove: string) => {
    const updated: Student = {
      ...student,
      certifications: student.certifications.filter(c => c !== certToRemove)
    };
    onUpdateStudent(updated);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.fullName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{student.fullName}</h1>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  student.placementStatus === 'Placed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {student.placementStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Roll No: <span className="font-mono font-semibold text-slate-800">{student.rollNo}</span> · {student.department}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {student.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {student.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditFormData({
                  fullName: student.fullName,
                  email: student.email,
                  phone: student.phone,
                  department: student.department,
                  semester: student.semester,
                  cgpa: student.cgpa,
                  graduationYear: student.graduationYear,
                  bio: student.bio,
                  resumeUrl: student.resumeUrl,
                  linkedinUrl: student.linkedinUrl,
                  githubUrl: student.githubUrl
                });
                setIsEditModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Academic Profile</span>
            </button>
          </div>
        </div>

        {/* Bio & Academic stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Current CGPA</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{student.cgpa} <span className="text-xs text-slate-400 font-normal">/ 10.0</span></div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Current Semester</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">Semester {student.semester}</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Graduation Batch</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">Class of {student.graduationYear}</div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Career Dossier</span>
            <a
              href={student.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 mt-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Active Resume PDF
            </a>
          </div>
        </div>

        {student.bio && (
          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">About / Professional Bio</span>
            <p className="text-xs text-slate-700 leading-relaxed mt-1">
              {student.bio}
            </p>
          </div>
        )}
      </div>

      {/* Skills & Certifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Skills Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Technical Skills ({student.skills.length})</h2>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              placeholder="e.g. Django, Kubernetes, Redis..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddSkill}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {student.skills.map(s => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors"
              >
                <span>{s}</span>
                <button
                  onClick={() => handleRemoveSkill(s)}
                  className="text-slate-400 hover:text-rose-600"
                  title="Remove skill"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Certifications Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Certifications & Honors ({student.certifications.length})</h2>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newCert}
              onChange={(e) => setNewCert(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCert()}
              placeholder="e.g. AWS Solutions Architect..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddCert}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium"
            >
              Add
            </button>
          </div>

          <div className="space-y-2 pt-1">
            {student.certifications.map(c => (
              <div
                key={c}
                className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium text-slate-800">{c}</span>
                </div>
                <button
                  onClick={() => handleRemoveCert(c)}
                  className="text-slate-400 hover:text-rose-600"
                  title="Remove certification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Edit Student Academic Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.fullName}
                    onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cumulative CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    required
                    value={editFormData.cgpa}
                    onChange={(e) => setEditFormData({ ...editFormData, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Semester</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    required
                    value={editFormData.semester}
                    onChange={(e) => setEditFormData({ ...editFormData, semester: parseInt(e.target.value) || 1 })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Graduation Year</label>
                  <input
                    type="number"
                    required
                    value={editFormData.graduationYear}
                    onChange={(e) => setEditFormData({ ...editFormData, graduationYear: parseInt(e.target.value) || 2024 })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department / Branch</label>
                <select
                  value={editFormData.department}
                  onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 bg-white"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bio / Profile Summary</label>
                <textarea
                  rows={3}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Resume Document URL</label>
                <input
                  type="url"
                  value={editFormData.resumeUrl}
                  onChange={(e) => setEditFormData({ ...editFormData, resumeUrl: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
