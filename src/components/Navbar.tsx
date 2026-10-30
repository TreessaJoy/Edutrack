import React, { useState } from 'react';
import { Role, Student, NotificationItem } from '../types';
import {
  GraduationCap,
  Bell,
  CheckCheck,
  UserCheck,
  Shield,
  RotateCcw,
  BookOpen,
  Briefcase,
  FileCheck2,
  User,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

interface NavbarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeStudent: Student;
  studentsList: Student[];
  onSelectStudent: (student: Student) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  activeStudent,
  studentsList,
  onSelectStudent,
  notifications,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onResetData
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStudentMenu, setShowStudentMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          
          {/* Zone 1: Single text element wordmark with icon */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onTabChange('dashboard')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  EduTrack
                </span>
                <span className="hidden sm:inline-block text-[11px] font-medium text-slate-400 ml-2 tracking-normal">
                  Course & Placement Portal
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Single-line navigation links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
            {currentRole === 'student' ? (
              <>
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'dashboard'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-500" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => onTabChange('courses')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'courses' || activeTab === 'learning'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Courses & Learning</span>
                </button>

                <button
                  onClick={() => onTabChange('placements')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'placements'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span>Placement Drives</span>
                </button>

                <button
                  onClick={() => onTabChange('prep')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'prep'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <FileCheck2 className="w-4 h-4 text-slate-500" />
                  <span>Interview Prep</span>
                </button>

                <button
                  onClick={() => onTabChange('profile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>Student Profile</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onTabChange('admin-analytics')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin-analytics'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-500" />
                  <span>Placement Analytics</span>
                </button>

                <button
                  onClick={() => onTabChange('admin-students')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin-students'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-slate-500" />
                  <span>Student Directory</span>
                </button>

                <button
                  onClick={() => onTabChange('admin-courses')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin-courses'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Course Management</span>
                </button>

                <button
                  onClick={() => onTabChange('admin-placements')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin-placements'
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span>Drives & Shortlists</span>
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Actions & Role / Persona Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Student Persona Dropdown (shown when role is student) */}
            {currentRole === 'student' && (
              <div className="relative">
                <button
                  onClick={() => setShowStudentMenu(!showStudentMenu)}
                  className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
                  title="Switch Active Student"
                >
                  <img
                    src={activeStudent.avatar}
                    alt={activeStudent.fullName}
                    className="w-5 h-5 rounded-full object-cover border border-slate-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                    }}
                  />
                  <span className="hidden lg:inline">{activeStudent.fullName}</span>
                  <span className="text-[10px] text-slate-500 font-mono hidden xl:inline">({activeStudent.cgpa} CGPA)</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showStudentMenu && (
                  <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Switch Student Profile
                    </div>
                    {studentsList.map((std) => (
                      <button
                        key={std.id}
                        onClick={() => {
                          onSelectStudent(std);
                          setShowStudentMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          std.id === activeStudent.id ? 'bg-indigo-50/60 font-semibold text-indigo-900' : 'text-slate-700'
                        }`}
                      >
                        <div className="truncate">
                          <p className="truncate font-medium">{std.fullName}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{std.rollNo} · {std.department.split(' ')[0]}</p>
                        </div>
                        <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {std.cgpa}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Notification Center */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-900">Notifications ({unreadCount} new)</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={onMarkAllNotificationsRead}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">No notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            onMarkNotificationRead(n.id);
                            if (n.linkTab) onTabChange(n.linkTab);
                            setShowNotifications(false);
                          }}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                            !n.read ? 'bg-indigo-50/40' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-slate-900">{n.title}</h4>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Button */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => {
                  onRoleChange('student');
                  onTabChange('dashboard');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentRole === 'student'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Student</span>
              </button>
              <button
                onClick={() => {
                  onRoleChange('admin');
                  onTabChange('admin-analytics');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  currentRole === 'admin'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span>Admin / TPO</span>
              </button>
            </div>

            {/* Reset Database Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset all course enrollments, student records, and placement data back to initial seeds?')) {
                  onResetData();
                }
              }}
              title="Reset sample data"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
