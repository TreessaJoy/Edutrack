import React, { useState } from 'react';
import { Student } from '../types';
import { PLACEMENT_PREP_DATA } from '../data/mockData';
import {
  FileCheck,
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Building,
  RotateCcw,
  Target
} from 'lucide-react';

interface PlacementPrepProps {
  student: Student;
}

export const PlacementPrep: React.FC<PlacementPrepProps> = ({ student }) => {
  const [activePrepTab, setActivePrepTab] = useState<'quiz' | 'companies' | 'ats'>('quiz');
  
  // Quiz state
  const questions = PLACEMENT_PREP_DATA.aptitudeQuestions;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  // ATS / Profile Analysis
  const getATSInsights = () => {
    const hasEnoughSkills = student.skills.length >= 6;
    const hasCertifications = student.certifications.length >= 2;
    const hasHighCGPA = student.cgpa >= 8.0;

    let score = 60;
    if (hasEnoughSkills) score += 15;
    if (hasCertifications) score += 15;
    if (hasHighCGPA) score += 10;

    return {
      score: Math.min(100, score),
      strengths: [
        `Strong academic performance with CGPA of ${student.cgpa}/10.0`,
        `Diverse technical skill stack: ${student.skills.slice(0, 4).join(', ')}`,
        `${student.certifications.length} verified professional certifications attached`
      ],
      recommendations: [
        'Highlight quantified metrics in project descriptions (e.g., "Reduced response latency by 35%")',
        'Tailor resume keywords to match specific job descriptions (e.g. Docker, Microservices, CI/CD)',
        'Practice LeetCode Medium dynamic programming and graph problems weekly'
      ]
    };
  };

  const ats = getATSInsights();

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Placement & Interview Preparation Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sharpen your aptitude, technical problem solving, company patterns, and resume readiness.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setActivePrepTab('quiz')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activePrepTab === 'quiz'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mock Aptitude & Tech Test
          </button>
          <button
            onClick={() => setActivePrepTab('companies')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activePrepTab === 'companies'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Company Interview Guides
          </button>
          <button
            onClick={() => setActivePrepTab('ats')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activePrepTab === 'ats'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Resume & ATS Analyzer
          </button>
        </div>
      </div>

      {/* Tab 1: Mock Aptitude Test */}
      {activePrepTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                General Placement Assessment: Quantitative, Logical & CS Fundamentals
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Standard preliminary test format used by top tier tech & consulting firms.
              </p>
            </div>

            {isSubmitted && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-500">Your Final Score:</span>
                  <div className="text-lg font-mono font-bold text-slate-900">
                    {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
                  </div>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const isSelected = selectedAnswers[q.id] !== undefined;
              const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctIndex;
              const isWrong = isSubmitted && isSelected && selectedAnswers[q.id] !== q.correctIndex;

              return (
                <div key={q.id} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
                      Question {idx + 1} · {q.category}
                    </span>
                    {isSubmitted && (
                      <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isCorrect ? '✓ Correct (+1)' : '✗ Incorrect (0)'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {q.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const selected = selectedAnswers[q.id] === optIdx;
                      let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        } else if (selected && optIdx !== q.correctIndex) {
                          btnStyle = 'border-rose-300 bg-rose-50 text-rose-900';
                        }
                      } else if (selected) {
                        btnStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-2xs';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                          className={`w-full text-left p-3 text-xs rounded-lg border transition-all ${btnStyle}`}
                        >
                          <span className="font-mono text-slate-400 font-medium mr-2">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-2 p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">Correct Explanation: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isSubmitted && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Answered: {Object.keys(selectedAnswers).length} of {questions.length} questions
              </span>
              <button
                onClick={() => setIsSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-6 py-2.5 bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Submit Mock Assessment
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Company Interview Guides */}
      {activePrepTab === 'companies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLACEMENT_PREP_DATA.interviewTips.map(item => (
            <div
              key={item.company}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {item.company.charAt(0)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{item.company}</h3>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  Recruiter Insights
                </span>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                  Primary Evaluation Focus
                </span>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">
                  {item.focus}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                  Senior Candidate Preparation Tip
                </span>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Resume & ATS Analyzer */}
      {activePrepTab === 'ats' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-2xl font-mono border border-indigo-200 shadow-2xs">
                  {ats.score}%
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    ATS & Placement Readiness Score
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Evaluated based on profile completeness, technical skills breadth, verified certifications, and CGPA.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={student.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors"
                >
                  View Active Resume PDF
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Profile Strengths
                </h3>
                <ul className="space-y-2">
                  {ats.strengths.map((str, i) => (
                    <li key={i} className="text-xs text-slate-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                      ✓ {str}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-3">
                  <Target className="w-4 h-4 text-amber-600" />
                  Actionable Recommendations to Improve Score
                </h3>
                <ul className="space-y-2">
                  {ats.recommendations.map((rec, i) => (
                    <li key={i} className="text-xs text-slate-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                      → {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
