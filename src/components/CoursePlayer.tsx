import React, { useState } from 'react';
import { Course, CourseLesson, Enrollment, Student } from '../types';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  FileText,
  PlayCircle,
  HelpCircle,
  Code2,
  Award,
  ChevronDown,
  ChevronRight,
  Clock,
  Sparkles,
  Send
} from 'lucide-react';

interface CoursePlayerProps {
  course: Course;
  enrollment?: Enrollment;
  student: Student;
  onBack: () => void;
  onCompleteLesson: (lessonId: string) => void;
  onViewCertificate: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({
  course,
  enrollment,
  student,
  onBack,
  onCompleteLesson,
  onViewCertificate
}) => {
  // Find first uncompleted lesson or first lesson
  const allLessons: { moduleTitle: string; lesson: CourseLesson }[] = [];
  course.syllabus.forEach(m => {
    m.lessons.forEach(l => {
      allLessons.push({ moduleTitle: m.title, lesson: l });
    });
  });

  const completedIds = enrollment?.completedLessonIds || [];
  const defaultLesson = allLessons.find(item => !completedIds.includes(item.lesson.id))?.lesson || allLessons[0]?.lesson;

  const [activeLesson, setActiveLesson] = useState<CourseLesson>(defaultLesson || course.syllabus[0]?.lessons[0]);
  const [quizSelectedAnswers, setQuizSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [assignmentText, setAssignmentText] = useState<string>('');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState<boolean>(false);

  const isCurrentLessonCompleted = completedIds.includes(activeLesson?.id);
  const totalLessons = allLessons.length;
  const completedCount = completedIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleMarkComplete = () => {
    if (!activeLesson) return;
    onCompleteLesson(activeLesson.id);

    // If this completed the entire course, trigger confetti
    if (completedCount + 1 >= totalLessons) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    handleMarkComplete();
  };

  const handleAssignmentSubmit = () => {
    if (!assignmentText.trim()) return;
    setAssignmentSubmitted(true);
    handleMarkComplete();
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Back to Catalog"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600">{course.code}</span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500">{course.department}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs font-medium text-slate-500">Course Progress</div>
              <div className="text-base font-bold font-mono text-slate-900">
                {progressPercent}% <span className="text-xs text-slate-400 font-normal">({completedCount}/{totalLessons})</span>
              </div>
            </div>

            {progressPercent === 100 ? (
              <button
                onClick={onViewCertificate}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
              >
                <Award className="w-4 h-4" />
                <span>View Certificate</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
          <div
            className={`h-full transition-all duration-300 ${
              progressPercent === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Syllabus & Lesson Navigation */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs h-fit max-h-[800px] overflow-y-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-3">
            Course Curriculum ({course.syllabus.length} Modules)
          </h2>

          <div className="space-y-4">
            {course.syllabus.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-1">
                <div className="px-2 py-1 text-xs font-bold text-slate-800">
                  {mod.title}
                </div>
                <div className="space-y-0.5">
                  {mod.lessons.map(les => {
                    const isDone = completedIds.includes(les.id);
                    const isActive = activeLesson?.id === les.id;

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveLesson(les);
                          setQuizSubmitted(false);
                          setAssignmentSubmitted(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-950 font-semibold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {les.durationMin}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Lesson Content */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs">
          {activeLesson ? (
            <div className="space-y-6">
              
              {/* Lesson Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="uppercase tracking-wider font-semibold text-indigo-600">
                    {activeLesson.type}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {activeLesson.durationMin} minutes estimated
                  </span>
                  <span>·</span>
                  <span className={isCurrentLessonCompleted ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                    {isCurrentLessonCompleted ? 'Completed' : 'Pending Completion'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  {activeLesson.title}
                </h2>
              </div>

              {/* Lesson Body based on Type */}
              {activeLesson.type === 'reading' && (
                <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {activeLesson.content}
                </div>
              )}

              {activeLesson.type === 'video' && (
                <div className="space-y-4">
                  <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden group">
                    <PlayCircle className="w-16 h-16 text-indigo-400 group-hover:scale-110 transition-transform cursor-pointer" />
                    <p className="text-xs text-slate-300 mt-2">Interactive Video Lecture Simulator</p>
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-indigo-500 rounded-full" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">08:14 / {activeLesson.durationMin}:00</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeLesson.content}
                  </p>
                </div>
              )}

              {activeLesson.type === 'quiz' && (
                <div className="space-y-6">
                  <p className="text-xs text-slate-600">{activeLesson.content}</p>

                  {activeLesson.quiz && activeLesson.quiz.map((q, qIndex) => (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <h4 className="text-sm font-semibold text-slate-900">
                        {qIndex + 1}. {q.question}
                      </h4>
                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = quizSelectedAnswers[q.id] === optIndex;
                          const isCorrect = q.correctIndex === optIndex;
                          let optStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

                          if (quizSubmitted) {
                            if (isCorrect) {
                              optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              optStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                            }
                          } else if (isSelected) {
                            optStyle = 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold';
                          }

                          return (
                            <button
                              key={optIndex}
                              disabled={quizSubmitted}
                              onClick={() => setQuizSelectedAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                              className={`w-full text-left p-3 text-xs rounded-lg border transition-all ${optStyle}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-slate-400 font-medium">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                          <strong className="text-slate-800">Explanation: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  {!quizSubmitted && (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizSelectedAnswers).length === 0}
                      className="px-5 py-2.5 bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      Submit Quiz Answers & Complete Lesson
                    </button>
                  )}
                </div>
              )}

              {activeLesson.type === 'assignment' && (
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
                      Assignment Task
                    </h4>
                    <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                      {activeLesson.assignmentPrompt || activeLesson.content}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Submit Your Solution / Architecture Analysis:
                    </label>
                    <textarea
                      rows={6}
                      value={assignmentText}
                      onChange={(e) => setAssignmentText(e.target.value)}
                      placeholder="Type your design decisions, technical code snippets, or architectural trade-offs here..."
                      className="w-full p-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-mono"
                    />
                  </div>

                  {!assignmentSubmitted ? (
                    <button
                      onClick={handleAssignmentSubmit}
                      disabled={!assignmentText.trim()}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 disabled:opacity-50 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Solution for Evaluation</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium">
                      ✓ Assignment submitted and verified by course grading system!
                    </div>
                  )}
                </div>
              )}

              {/* Lesson Completion Action Button */}
              {activeLesson.type !== 'quiz' && activeLesson.type !== 'assignment' && (
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Finished reading this section? Mark it to update your progress.
                  </span>
                  <button
                    onClick={handleMarkComplete}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      isCurrentLessonCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCurrentLessonCompleted ? 'Completed' : 'Mark Lesson Completed'}</span>
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a lesson from the curriculum on the left to begin learning.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
