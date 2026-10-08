import React, { useState } from 'react';
import { ScreenType } from '../types';
import { useSidebar } from '../context/SidebarContext';

interface ResultsReportCardsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

interface StudentTranscript {
  rank: number;
  name: string;
  uid: string;
  shortUid: string;
  track: string;
  attendance: string;
  isLowAttd?: boolean;
  marks: string;
  totalMarks: number;
  maxMarks: number;
  pct: string;
  grade: string;
  gradeColorClass: string;
  status: 'DISTINCTION' | 'PASS' | 'RE-EVAL';
  statusColorClass: string;
  award: string;
  remarks: string;
  papers: {
    title: string;
    code: string;
    max: number;
    pass: number;
    score: number;
    grade: string;
    gradeColor: string;
  }[];
}

const STUDENTS_TRANSCRIPTS: StudentTranscript[] = [
  {
    rank: 1,
    name: 'Rahul Kumar',
    uid: 'ABC-SIL-26-00125',
    shortUid: '#00125',
    track: 'Regular Full-Time',
    attendance: '92.4%',
    marks: '219 / 250',
    totalMarks: 219,
    maxMarks: 250,
    pct: '87.6%',
    grade: 'A',
    gradeColorClass: 'text-tertiary',
    status: 'DISTINCTION',
    statusColorClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    award: 'Grade A (Distinction)',
    remarks:
      'Rahul demonstrates exemplary problem-solving skills and semantic coding discipline. Consistently completes project milestones ahead of schedule with robust unit tests.',
    papers: [
      {
        title: 'Paper 1: HTML5 & Responsive CSS3',
        code: 'SUB-CODE: FSD-101',
        max: 100,
        pass: 40,
        score: 82,
        grade: 'A',
        gradeColor: 'text-primary',
      },
      {
        title: 'Paper 2: JavaScript ES6+ & DOM',
        code: 'SUB-CODE: FSD-102',
        max: 100,
        pass: 40,
        score: 91,
        grade: 'A+',
        gradeColor: 'text-primary',
      },
      {
        title: 'Paper 3: Full Stack Practical Lab',
        code: 'SUB-CODE: LAB-103',
        max: 50,
        pass: 20,
        score: 46,
        grade: 'A+',
        gradeColor: 'text-primary',
      },
    ],
  },
  {
    rank: 2,
    name: 'Ayesha Khan',
    uid: 'ABC-SIL-26-00108',
    shortUid: '#00108',
    track: 'Regular Full-Time',
    attendance: '98.5%',
    marks: '241 / 250',
    totalMarks: 241,
    maxMarks: 250,
    pct: '96.2%',
    grade: 'A+',
    gradeColorClass: 'text-primary',
    status: 'DISTINCTION',
    statusColorClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    award: 'Grade A+ (Distinction - Batch Topper)',
    remarks:
      'Outstanding technical prowess and exceptional algorithmic logic. Highest aggregate in both theoretical modules and terminal full-stack sprint.',
    papers: [
      {
        title: 'Paper 1: HTML5 & Responsive CSS3',
        code: 'SUB-CODE: FSD-101',
        max: 100,
        pass: 40,
        score: 95,
        grade: 'A+',
        gradeColor: 'text-primary',
      },
      {
        title: 'Paper 2: JavaScript ES6+ & DOM',
        code: 'SUB-CODE: FSD-102',
        max: 100,
        pass: 40,
        score: 98,
        grade: 'A+',
        gradeColor: 'text-primary',
      },
      {
        title: 'Paper 3: Full Stack Practical Lab',
        code: 'SUB-CODE: LAB-103',
        max: 50,
        pass: 20,
        score: 48,
        grade: 'A+',
        gradeColor: 'text-primary',
      },
    ],
  },
  {
    rank: 3,
    name: 'Rohan Sengupta',
    uid: 'ABC-SIL-26-00142',
    shortUid: '#00142',
    track: 'Regular Full-Time',
    attendance: '89.0%',
    marks: '204 / 250',
    totalMarks: 204,
    maxMarks: 250,
    pct: '81.6%',
    grade: 'A',
    gradeColorClass: 'text-primary',
    status: 'PASS',
    statusColorClass: 'bg-secondary-container text-on-secondary-container',
    award: 'Grade A (First Class)',
    remarks:
      'Solid command over responsive layouts and asynchronous API handling. Recommended for senior front-end specialization track.',
    papers: [
      {
        title: 'Paper 1: HTML5 & Responsive CSS3',
        code: 'SUB-CODE: FSD-101',
        max: 100,
        pass: 40,
        score: 80,
        grade: 'A',
        gradeColor: 'text-primary',
      },
      {
        title: 'Paper 2: JavaScript ES6+ & DOM',
        code: 'SUB-CODE: FSD-102',
        max: 100,
        pass: 40,
        score: 83,
        grade: 'A',
        gradeColor: 'text-primary',
      },
      {
        title: 'Paper 3: Full Stack Practical Lab',
        code: 'SUB-CODE: LAB-103',
        max: 50,
        pass: 20,
        score: 41,
        grade: 'A',
        gradeColor: 'text-primary',
      },
    ],
  },
  {
    rank: 4,
    name: 'Sneha Ghosh',
    uid: 'ABC-SIL-26-00155',
    shortUid: '#00155',
    track: 'Regular Full-Time',
    attendance: '94.1%',
    marks: '196 / 250',
    totalMarks: 196,
    maxMarks: 250,
    pct: '78.4%',
    grade: 'B+',
    gradeColorClass: 'text-primary',
    status: 'PASS',
    statusColorClass: 'bg-secondary-container text-on-secondary-container',
    award: 'Grade B+ (Good Attainment)',
    remarks:
      'Consistent daily attendance and high attention to detail in visual interface styling. Keep working on modern JavaScript framework reactivity.',
    papers: [
      {
        title: 'Paper 1: HTML5 & Responsive CSS3',
        code: 'SUB-CODE: FSD-101',
        max: 100,
        pass: 40,
        score: 85,
        grade: 'A',
        gradeColor: 'text-primary',
      },
      {
        title: 'Paper 2: JavaScript ES6+ & DOM',
        code: 'SUB-CODE: FSD-102',
        max: 100,
        pass: 40,
        score: 72,
        grade: 'B+',
        gradeColor: 'text-tertiary',
      },
      {
        title: 'Paper 3: Full Stack Practical Lab',
        code: 'SUB-CODE: LAB-103',
        max: 50,
        pass: 20,
        score: 39,
        grade: 'B+',
        gradeColor: 'text-tertiary',
      },
    ],
  },
  {
    rank: 5,
    name: 'Bikramjit Paul',
    uid: 'ABC-SIL-26-00171',
    shortUid: '#00171',
    track: 'Regular Full-Time',
    attendance: '81.0%',
    marks: '168 / 250',
    totalMarks: 168,
    maxMarks: 250,
    pct: '67.2%',
    grade: 'B',
    gradeColorClass: 'text-on-surface-variant',
    status: 'PASS',
    statusColorClass: 'bg-secondary-container text-on-secondary-container',
    award: 'Grade B (Satisfactory Pass)',
    remarks:
      'Practical lab execution is proficient. Needs additional revision on semantic markup semantics and cross-browser testing.',
    papers: [
      {
        title: 'Paper 1: HTML5 & Responsive CSS3',
        code: 'SUB-CODE: FSD-101',
        max: 100,
        pass: 40,
        score: 68,
        grade: 'B',
        gradeColor: 'text-on-surface',
      },
      {
        title: 'Paper 2: JavaScript ES6+ & DOM',
        code: 'SUB-CODE: FSD-102',
        max: 100,
        pass: 40,
        score: 62,
        grade: 'B',
        gradeColor: 'text-on-surface',
      },
      {
        title: 'Paper 3: Full Stack Practical Lab',
        code: 'SUB-CODE: LAB-103',
        max: 50,
        pass: 20,
        score: 38,
        grade: 'B+',
        gradeColor: 'text-secondary',
      },
    ],
  },
  {
    rank: 6,
    name: 'Pooja Adhikari',
    uid: 'ABC-SIL-26-00189',
    shortUid: '#00189',
    track: 'Remedial Track',
    attendance: '64.5%',
    isLowAttd: true,
    marks: '112 / 250',
    totalMarks: 112,
    maxMarks: 250,
    pct: '44.8%',
    grade: 'F',
    gradeColorClass: 'text-error',
    status: 'RE-EVAL',
    statusColorClass: 'bg-error-container text-on-error-container',
    award: 'Grade F (Re-Evaluation Required)',
    remarks:
      'Did not meet minimum credit threshold in Paper 2. Eligible for Remedial Examination sprint scheduled for 28th September 2026.',
    papers: [
      {
        title: 'Paper 1: HTML5 & Responsive CSS3',
        code: 'SUB-CODE: FSD-101',
        max: 100,
        pass: 40,
        score: 52,
        grade: 'C',
        gradeColor: 'text-outline',
      },
      {
        title: 'Paper 2: JavaScript ES6+ & DOM',
        code: 'SUB-CODE: FSD-102',
        max: 100,
        pass: 40,
        score: 34,
        grade: 'F',
        gradeColor: 'text-error',
      },
      {
        title: 'Paper 3: Full Stack Practical Lab',
        code: 'SUB-CODE: LAB-103',
        max: 50,
        pass: 20,
        score: 26,
        grade: 'C',
        gradeColor: 'text-outline',
      },
    ],
  },
];

export const ResultsReportCardsScreen: React.FC<ResultsReportCardsScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<StudentTranscript>(STUDENTS_TRANSCRIPTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('Siliguri HQ Campus');
  const [selectedSession, setSelectedSession] = useState('AY 2025–26');
  const [selectedExam, setSelectedExam] = useState('Mid Term Assessment');
  const [selectedCourse, setSelectedCourse] = useState('Full Stack Web Dev');
  const [selectedBatch, setSelectedBatch] = useState('WD Evening (Batch 02)');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [currentPage, setCurrentPage] = useState(1);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const filteredStudents = STUDENTS_TRANSCRIPTS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortUid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadAllZip = () => {
    onShowToast('Preparing bulk ZIP archive containing 42 encrypted PDF Report Cards...');
    setTimeout(() => {
      onShowToast('Bulk archive downloaded: MidTerm_AY25-26_WDEve02_Transcripts.zip');
    }, 1200);
  };

  const handlePrint = (name: string) => {
    onShowToast(`Opening print spooler for ${name}'s official report card...`);
    window.print();
  };

  const handleDownloadSinglePDF = (name: string, uid: string) => {
    onShowToast(`Generated signed PDF report card for ${name} (${uid}).`);
  };

  const handleSendWhatsApp = (name: string) => {
    onShowToast(`Official transcript and student portal link sent via WhatsApp to ${name}.`);
  };

  const handlePublishAll = () => {
    setIsPublishModalOpen(false);
    onShowToast('All 42 Mid Term assessment results published to student & parent portals!');
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex">
      {/* ========================================================================= */}
      {/* 1. FIXED LEFT NAVIGATION SIDEBAR (w-64) */}
      {/* ========================================================================= */}
      {/* Mobile backdrop overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-12 bottom-0 w-64 bg-surface-container-lowest shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out border-r border-outline-variant/30 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Institution Header */}
          <div className="h-16 px-space-md flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/30">
            <div
              className="flex items-center gap-space-sm cursor-pointer"
              onClick={() => {
                onNavigate('dashboard');
                setIsSidebarOpen(false);
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm font-bold shadow-xs">
                A
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate max-w-[140px]">
                  Apex Institute
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
                  #INS-7429
                </span>
              </div>
            </div>
          </div>

          <div className="px-space-md py-space-xs">
            <span className="font-label-sm text-label-sm text-outline uppercase font-semibold px-space-sm tracking-wider">
              Navigation
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-space-sm py-space-xs">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span className="font-body-md text-body-md">Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate('admissions')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
              <span className="font-body-md text-body-md">Admissions</span>
            </button>

            <button
              onClick={() => onNavigate('students-directory')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">school</span>
              <span className="font-body-md text-body-md">Students</span>
            </button>

            {/* ACADEMICS (ACTIVE TAB AS SHOWN IN SCREENSHOT) */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => onNavigate('academics')}
                className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg transition-all bg-primary-container text-on-primary font-semibold shadow-[0_1px_3px_rgba(37,99,235,0.2)] text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                <span className="font-body-md text-body-md">Academics</span>
              </button>

              {/* Sub-links for Academics */}
              <div className="pl-7 pr-2 py-1 flex flex-col gap-1 border-l-2 border-primary ml-4 mt-0.5">
                <button
                  onClick={() => onNavigate('academics')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium cursor-pointer"
                >
                  Exams &amp; Assessments
                </button>
                <button
                  onClick={() => onNavigate('marks-entry')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium cursor-pointer"
                >
                  Marks Entry Console
                </button>
                <button
                  className="text-xs text-primary font-semibold py-0.5 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Results &amp; Report Cards</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                </button>
                <button
                  onClick={() => onNavigate('courses-batches')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium cursor-pointer"
                >
                  Courses &amp; Batches
                </button>
              </div>
            </div>

            <button
              onClick={() => onShowToast('Attendance registers active across 8 campus branches.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span className="font-body-md text-body-md">Attendance</span>
            </button>

            <button
              onClick={() => onShowToast('Fees & Finance ledger active.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span className="font-body-md text-body-md">Fees &amp; Finance</span>
            </button>

            <button
              onClick={() => onNavigate('certificates')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
              <span className="font-body-md text-body-md">Certificates</span>
            </button>

            <button
              onClick={() => onShowToast('Parent SMS & WhatsApp messaging portal.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">forum</span>
              <span className="font-body-md text-body-md">Communication</span>
            </button>

            <button
              onClick={() => onShowToast('Campus network and center configuration')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
              <span className="font-body-md text-body-md">Branches &amp; Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/30">
          <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-space-sm flex flex-col gap-1">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                Apex Tech Institute
              </span>
            </div>
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm">Branch HQ Network</span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded font-medium">
                8 Active
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-space-xs">
            <button
              onClick={() => onNavigate('landing')}
              className="font-label-md text-label-md text-error hover:text-on-error-container flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Sign Out</span>
            </button>
            <span className="font-label-sm text-label-sm text-outline">v2.4.8</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE CONTAINER (pl-0 lg:pl-64) */}
      {/* ========================================================================= */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pl-0 lg:pl-64' : 'pl-0'
      }`}>
        {/* Top Responsive App Bar (Sticky below global navigation) */}
        <header className="sticky top-12 z-30 h-14 sm:h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-4 sm:px-gutter-desktop flex items-center justify-between gap-space-md border-b border-outline-variant/20 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-space-md flex-1 max-w-2xl">
            <img
              alt="EduManage Logo"
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U-QhXESZEr_12u3oOW5wW6fVviAeAnkqC1YVMGXeEyDfiGfPHbkLv6gWOnkG7NCoQAvoMRvaD0VROU-wSN3jk9aE8NgN293_R6RLzmwi8pqgkH1wOL9xza5gs9BYtbTZgBkeAsNR4X76D1FOVvi4MLsvpeFcoX9epNVK5yx47Riyg60tGb6b9IPb-XWADgLIvIiAefmbdsx0P-4DOQL-MvN6hAVyB5f3uk0YcVmbGkecLG3pgNgtWkBqM"
            />
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface hidden lg:inline">
              EduManage
            </span>

            {/* Branch Selector */}
            <div
              onClick={() => onShowToast('Branch network filter active across 8 locations.')}
              className="relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-outline text-[18px] mr-1">domain</span>
              <span className="font-label-md text-label-md text-on-surface font-medium">
                All Branches (8 Active)
              </span>
              <span className="material-symbols-outlined text-outline text-[16px] ml-1">expand_more</span>
            </div>

            {/* Academic Year Badge */}
            <div className="bg-secondary-fixed-dim/40 text-on-secondary-fixed-variant px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm font-semibold tracking-wide">AY 2025-26</span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-space-md">
            <div className="relative hidden md:flex items-center bg-surface-container-low rounded-lg px-space-md py-1.5 w-64 border border-outline-variant/20">
              <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
              <input
                className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-full"
                placeholder="Search students, modules..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded font-mono shadow-xs">
                ⌘K
              </span>
            </div>

            <button
              onClick={() => onShowToast('3 results pending dean approval.')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold">
                3
              </span>
            </button>

            <button
              onClick={() => onShowToast('Help with transcript generation and grading rules')}
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
            </button>

            <div className="flex items-center gap-space-sm pl-space-xs">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="font-label-lg text-label-lg font-semibold text-on-surface leading-tight">
                  Rajesh Sharma
                </span>
                <span className="font-label-sm text-label-sm text-outline">Institution Admin / HQ</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. RESULTS & REPORT CARDS MAIN CONTENT */}
        {/* ========================================================================= */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-screen">
          <div className="flex flex-col w-full px-margin-desktop py-space-lg space-y-space-lg">
            {/* Breadcrumb & Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="flex flex-col space-y-space-xs">
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-outline">
                  <span
                    onClick={() => onNavigate('academics')}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Academics
                  </span>
                  <span className="text-outline-variant">/</span>
                  <span className="font-semibold text-on-surface">Results &amp; Transcripts</span>
                </div>
                <h1 className="font-display text-display text-on-surface tracking-tight font-bold">
                  Results &amp; Report Cards
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                  Review academic performance, generate official student report cards, and publish batch transcripts across affiliated campuses.
                </p>
              </div>

              {/* Actions Toolbar */}
              <div className="flex flex-wrap items-center gap-space-sm pt-2 md:pt-0">
                <button
                  onClick={() => setIsBroadcastModalOpen(true)}
                  className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-xs hover:bg-surface-container-high transition-all text-label-md font-label-md cursor-pointer border border-outline-variant/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">chat_bubble</span>
                  <span>WhatsApp / Email Broadcast</span>
                </button>

                <button
                  onClick={handleDownloadAllZip}
                  className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-xs hover:bg-surface-container-high transition-all text-label-md font-label-md cursor-pointer border border-outline-variant/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">folder_zip</span>
                  <span>Download All (ZIP)</span>
                </button>

                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className="inline-flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container text-on-primary shadow-xs hover:bg-primary transition-all text-label-md font-label-md cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Publish All Results</span>
                </button>
              </div>
            </div>

            {/* Filter & Parameter Segment */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center gap-space-md justify-between border border-outline-variant/20">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-sm flex-1">
                {/* Campus */}
                <div className="flex flex-col space-y-1">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Campus
                  </span>
                  <div className="relative">
                    <select
                      value={selectedCampus}
                      onChange={(e) => setSelectedCampus(e.target.value)}
                      className="w-full appearance-none bg-surface-container-low px-space-sm py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:bg-surface-container-high cursor-pointer pr-7 border border-outline-variant/20"
                    >
                      <option>Siliguri HQ Campus</option>
                      <option>Kolkata Sector V</option>
                      <option>Guwahati Tech Park</option>
                      <option>All Branches (8)</option>
                    </select>
                    <span className="material-symbols-outlined text-outline text-[16px] absolute right-2 top-2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Academic Session */}
                <div className="flex flex-col space-y-1">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Session
                  </span>
                  <div className="relative">
                    <select
                      value={selectedSession}
                      onChange={(e) => setSelectedSession(e.target.value)}
                      className="w-full appearance-none bg-surface-container-low px-space-sm py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:bg-surface-container-high cursor-pointer pr-7 border border-outline-variant/20"
                    >
                      <option>AY 2025–26</option>
                      <option>AY 2024–25</option>
                    </select>
                    <span className="material-symbols-outlined text-outline text-[16px] absolute right-2 top-2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Examination */}
                <div className="flex flex-col space-y-1">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Exam Period
                  </span>
                  <div className="relative">
                    <select
                      value={selectedExam}
                      onChange={(e) => setSelectedExam(e.target.value)}
                      className="w-full appearance-none bg-surface-container-low px-space-sm py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:bg-surface-container-high cursor-pointer pr-7 border border-outline-variant/20"
                    >
                      <option>Mid Term Assessment</option>
                      <option>Final Term Evaluation</option>
                      <option>Sprint 02 Mock Exam</option>
                    </select>
                    <span className="material-symbols-outlined text-outline text-[16px] absolute right-2 top-2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Course */}
                <div className="flex flex-col space-y-1">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Program / Course
                  </span>
                  <div className="relative">
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full appearance-none bg-surface-container-low px-space-sm py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:bg-surface-container-high cursor-pointer pr-7 border border-outline-variant/20"
                    >
                      <option>Full Stack Web Dev</option>
                      <option>Cloud Architecture &amp; DevOps</option>
                      <option>Applied AI Engineering</option>
                    </select>
                    <span className="material-symbols-outlined text-outline text-[16px] absolute right-2 top-2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Batch */}
                <div className="flex flex-col space-y-1">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Cohort / Batch
                  </span>
                  <div className="relative">
                    <select
                      value={selectedBatch}
                      onChange={(e) => setSelectedBatch(e.target.value)}
                      className="w-full appearance-none bg-surface-container-low px-space-sm py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface focus:outline-none focus:bg-surface-container-high cursor-pointer pr-7 border border-outline-variant/20"
                    >
                      <option>WD Evening (Batch 02)</option>
                      <option>WD Morning (Batch 01)</option>
                      <option>WD Weekend Intensive</option>
                    </select>
                    <span className="material-symbols-outlined text-outline text-[16px] absolute right-2 top-2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Search Input */}
              <div className="w-full xl:w-72 relative self-end">
                <span className="material-symbols-outlined text-outline text-[18px] absolute left-3 top-2.5">
                  search
                </span>
                <input
                  className="w-full bg-surface-container-low pl-9 pr-8 py-2 rounded-lg text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-high transition-all border border-outline-variant/20"
                  placeholder="Search student or UID..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="font-data-mono text-label-sm text-outline absolute right-2.5 top-2.5">/</span>
              </div>
            </div>

            {/* KPI Analytics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between space-y-space-sm relative overflow-hidden border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                    Results Processed
                  </span>
                  <span className="p-1.5 rounded-lg bg-surface-container text-primary material-symbols-outlined text-[18px]">
                    checklist
                  </span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                    42 / 42
                  </div>
                  <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-secondary font-medium mt-1">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span>100% evaluated (0 pending)</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                    Pass Rate
                  </span>
                  <span className="p-1.5 rounded-lg bg-secondary-fixed-dim/30 text-secondary material-symbols-outlined text-[18px]">
                    workspace_premium
                  </span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                    95.2%
                  </div>
                  <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant mt-1">
                    <span>40 Passed</span>
                    <span className="text-error font-medium">2 Re-eval / Abs</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                    Batch Average
                  </span>
                  <span className="p-1.5 rounded-lg bg-surface-container-high text-primary material-symbols-outlined text-[18px]">
                    analytics
                  </span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                    76.4%
                  </div>
                  <div className="flex items-center gap-1 font-body-sm text-body-sm text-secondary font-medium mt-1">
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                    <span>+4.2% vs previous term</span>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                    Highest Term Score
                  </span>
                  <span className="p-1.5 rounded-lg bg-tertiary-fixed/60 text-tertiary material-symbols-outlined text-[18px]">
                    military_tech
                  </span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg font-bold text-tertiary tracking-tight">
                    96.2%
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface truncate mt-1 font-medium">
                    <span>Ayesha Khan (UID-108)</span>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                    Attendance Factor
                  </span>
                  <span className="p-1.5 rounded-lg bg-surface-container text-secondary material-symbols-outlined text-[18px]">
                    link
                  </span>
                </div>
                <div>
                  <div className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                    93.8%
                  </div>
                  <div className="font-body-sm text-body-sm text-secondary truncate mt-1 font-medium">
                    <span>High linear correlation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytical Visuals Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
              {/* Card 1: Grade Distribution Bar Chart (7 cols) */}
              <div className="lg:col-span-7 bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between space-y-space-md border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Grade Distribution Curve
                    </h3>
                    <span className="font-body-sm text-body-sm text-outline">
                      Mid Term Grading Rubric (Cohort 42 Enrolled)
                    </span>
                  </div>
                  <span className="font-data-mono text-label-sm px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-medium">
                    Normalized Scale
                  </span>
                </div>

                {/* Custom Micro Bar Chart */}
                <div className="grid grid-cols-6 gap-3 pt-4 items-end h-40">
                  {/* A+ */}
                  <div
                    onClick={() => onShowToast('Filter applied: Grade A+ (8 students)')}
                    className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                  >
                    <span className="font-data-mono text-label-sm font-semibold text-primary">8</span>
                    <div className="w-full bg-surface-container rounded-t-md overflow-hidden flex items-end h-28">
                      <div
                        className="w-full bg-primary rounded-t-md transition-all group-hover:brightness-110"
                        style={{ height: '50%' }}
                      ></div>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">A+</span>
                    <span className="font-label-sm text-label-sm text-outline">90-100%</span>
                  </div>

                  {/* A */}
                  <div
                    onClick={() => onShowToast('Filter applied: Grade A (16 students)')}
                    className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                  >
                    <span className="font-data-mono text-label-sm font-semibold text-primary">16</span>
                    <div className="w-full bg-surface-container rounded-t-md overflow-hidden flex items-end h-28">
                      <div
                        className="w-full bg-primary-container rounded-t-md transition-all group-hover:brightness-110"
                        style={{ height: '100%' }}
                      ></div>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">A</span>
                    <span className="font-label-sm text-label-sm text-outline">80-89%</span>
                  </div>

                  {/* B+ */}
                  <div
                    onClick={() => onShowToast('Filter applied: Grade B+ (11 students)')}
                    className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                  >
                    <span className="font-data-mono text-label-sm font-semibold text-tertiary">11</span>
                    <div className="w-full bg-surface-container rounded-t-md overflow-hidden flex items-end h-28">
                      <div
                        className="w-full bg-tertiary-container rounded-t-md transition-all group-hover:brightness-110"
                        style={{ height: '68%' }}
                      ></div>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">B+</span>
                    <span className="font-label-sm text-label-sm text-outline">70-79%</span>
                  </div>

                  {/* B */}
                  <div
                    onClick={() => onShowToast('Filter applied: Grade B (5 students)')}
                    className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                  >
                    <span className="font-data-mono text-label-sm font-semibold text-secondary">5</span>
                    <div className="w-full bg-surface-container rounded-t-md overflow-hidden flex items-end h-28">
                      <div
                        className="w-full bg-secondary rounded-t-md transition-all group-hover:brightness-110"
                        style={{ height: '31%' }}
                      ></div>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">B</span>
                    <span className="font-label-sm text-label-sm text-outline">60-69%</span>
                  </div>

                  {/* C */}
                  <div
                    onClick={() => onShowToast('Filter applied: Grade C (2 students)')}
                    className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                  >
                    <span className="font-data-mono text-label-sm font-semibold text-on-surface-variant">2</span>
                    <div className="w-full bg-surface-container rounded-t-md overflow-hidden flex items-end h-28">
                      <div
                        className="w-full bg-outline rounded-t-md transition-all group-hover:brightness-110"
                        style={{ height: '12%' }}
                      ></div>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">C</span>
                    <span className="font-label-sm text-label-sm text-outline">50-59%</span>
                  </div>

                  {/* F */}
                  <div
                    onClick={() => onShowToast('0 Failures recorded under standard exam rules')}
                    className="flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                  >
                    <span className="font-data-mono text-label-sm font-semibold text-error">0</span>
                    <div className="w-full bg-surface-container rounded-t-md overflow-hidden flex items-end h-28">
                      <div className="w-full bg-error rounded-t-md transition-all" style={{ height: '2px' }}></div>
                    </div>
                    <span className="font-label-md text-label-md font-semibold text-on-surface">F</span>
                    <span className="font-label-sm text-label-sm text-outline">&lt;50%</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Subject Performance Breakdown (5 cols) */}
              <div className="lg:col-span-5 bg-surface-container-lowest p-space-md rounded-xl shadow-xs flex flex-col justify-between space-y-space-md border border-outline-variant/20">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Subject Mastery Breakdown
                    </h3>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold bg-secondary-fixed-dim/30 px-2 py-0.5 rounded">
                      3 Core Papers
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-outline mt-0.5">
                    Average aggregate attainment across cohort
                  </p>
                </div>

                <div className="space-y-3.5">
                  {/* Paper 1 */}
                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-1">
                      <span className="text-on-surface font-medium">Paper 1: HTML5 &amp; Responsive CSS3</span>
                      <span className="font-data-mono font-bold text-primary">81.2%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '81.2%' }}></div>
                    </div>
                  </div>

                  {/* Paper 2 */}
                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-1">
                      <span className="text-on-surface font-medium">Paper 2: JavaScript ES6+ &amp; Modern DOM</span>
                      <span className="font-data-mono font-bold text-tertiary">72.8%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="bg-tertiary-container h-full rounded-full" style={{ width: '72.8%' }}></div>
                    </div>
                  </div>

                  {/* Paper 3 */}
                  <div>
                    <div className="flex justify-between font-label-md text-label-md mb-1">
                      <span className="text-on-surface font-medium">Paper 3: Full Stack Practical Project Lab</span>
                      <span className="font-data-mono font-bold text-secondary">78.5%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '78.5%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-2 rounded-lg flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant border border-outline-variant/10">
                  <span>Curriculum Standard Threshold: 65.0%</span>
                  <span className="text-secondary font-semibold">Cohort Exceeding Target</span>
                </div>
              </div>
            </div>

            {/* Master Split Work Area: Table (60%) + Preview Modal/Panel (40%) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md items-start">
              {/* Master Student Results Table (Left 60% / xl:col-span-7) */}
              <div className="xl:col-span-7 bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col border border-outline-variant/20">
                {/* Table Header Bar */}
                <div className="p-space-md flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/20">
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Batch Evaluation Roster
                    </h2>
                    <span className="font-body-sm text-body-sm text-outline">
                      Click record to inspect official report card sheet
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onShowToast('Exported CSV of batch results roster.')}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                      title="Export CSV"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">file_download</span>
                    </button>
                    <button
                      onClick={() => onShowToast('Filter columns: Rank, Student, UID, Attendance, Marks, Status')}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                      title="Filter columns"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">tune</span>
                    </button>
                  </div>
                </div>

                {/* Responsive Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/20">
                        <th className="py-3 px-space-md font-semibold">Rank &amp; Student</th>
                        <th className="py-3 px-space-sm font-semibold">UID</th>
                        <th className="py-3 px-space-sm font-semibold">Attd %</th>
                        <th className="py-3 px-space-sm font-semibold">Marks</th>
                        <th className="py-3 px-space-sm font-semibold">Pct %</th>
                        <th className="py-3 px-space-sm font-semibold">Grade</th>
                        <th className="py-3 px-space-sm font-semibold">Status</th>
                        <th className="py-3 px-space-md text-right font-semibold">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y-0 text-on-surface text-body-sm font-body-sm">
                      {filteredStudents.map((student) => {
                        const isSelected = selectedStudent.uid === student.uid;
                        return (
                          <tr
                            key={student.uid}
                            onClick={() => setSelectedStudent(student)}
                            className={`transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-surface-container-low hover:bg-surface-container'
                                : 'hover:bg-surface-container-low'
                            }`}
                          >
                            <td className="py-3 px-space-md">
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`w-5 h-5 rounded-full flex items-center justify-center font-data-mono text-[10px] font-bold ${
                                    isSelected
                                      ? 'bg-primary text-on-primary'
                                      : student.status === 'RE-EVAL'
                                      ? 'bg-error-container text-on-error-container'
                                      : 'bg-surface-container-high text-on-surface-variant'
                                  }`}
                                >
                                  {student.rank}
                                </span>
                                <div className="flex flex-col">
                                  <span
                                    className={`font-label-lg text-label-lg ${
                                      isSelected
                                        ? 'font-semibold text-primary'
                                        : 'font-medium text-on-surface'
                                    }`}
                                  >
                                    {student.name}
                                  </span>
                                  <span className="text-label-sm text-outline font-data-mono">
                                    {student.track}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-space-sm font-data-mono text-outline">
                              {student.shortUid}
                            </td>

                            <td
                              className={`py-3 px-space-sm font-data-mono ${
                                student.isLowAttd
                                  ? 'text-error font-semibold'
                                  : 'text-on-surface'
                              }`}
                            >
                              {student.attendance}
                            </td>

                            <td className="py-3 px-space-sm font-data-mono font-medium">
                              {student.marks}
                            </td>

                            <td
                              className={`py-3 px-space-sm font-data-mono font-bold ${
                                student.status === 'RE-EVAL' ? 'text-error' : 'text-on-surface'
                              }`}
                            >
                              {student.pct}
                            </td>

                            <td
                              className={`py-3 px-space-sm font-bold ${student.gradeColorClass}`}
                            >
                              {student.grade}
                            </td>

                            <td className="py-3 px-space-sm">
                              <span
                                className={`px-2 py-0.5 rounded-full text-label-sm font-semibold flex items-center gap-1 w-fit ${student.statusColorClass}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    student.status === 'DISTINCTION'
                                      ? 'bg-tertiary'
                                      : student.status === 'RE-EVAL'
                                      ? 'bg-error'
                                      : 'bg-secondary'
                                  }`}
                                ></span>
                                {student.status}
                              </span>
                            </td>

                            <td className="py-3 px-space-md text-right">
                              <div
                                className="flex items-center justify-end gap-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  onClick={() => setSelectedStudent(student)}
                                  className={`p-1 rounded transition-colors cursor-pointer ${
                                    isSelected
                                      ? 'text-primary bg-surface-container-high'
                                      : 'text-on-surface-variant hover:bg-surface-container-high'
                                  }`}
                                  title="Preview Sheet"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                                </button>
                                <button
                                  onClick={() => handlePrint(student.name)}
                                  className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                                  title="Print"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[18px]">print</span>
                                </button>
                                <button
                                  onClick={() => handleDownloadSinglePDF(student.name, student.uid)}
                                  className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
                                  title="Download PDF"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[18px]">download</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="p-space-sm px-space-md bg-surface-container-low flex items-center justify-between text-body-sm text-outline border-t border-outline-variant/20">
                  <span>Showing 1 to 6 of 42 student transcripts</span>
                  <div className="flex items-center gap-1">
                    <button
                      className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface shadow-xs disabled:opacity-50 font-label-sm cursor-pointer border border-outline-variant/20"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      type="button"
                    >
                      Prev
                    </button>
                    <button
                      className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-sm font-semibold cursor-pointer"
                      type="button"
                    >
                      1
                    </button>
                    <button
                      onClick={() => setCurrentPage(2)}
                      className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface shadow-xs hover:bg-surface-container font-label-sm cursor-pointer border border-outline-variant/20"
                      type="button"
                    >
                      2
                    </button>
                    <button
                      onClick={() => setCurrentPage(3)}
                      className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface shadow-xs hover:bg-surface-container font-label-sm cursor-pointer border border-outline-variant/20"
                      type="button"
                    >
                      3
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                      className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface shadow-xs hover:bg-surface-container font-label-sm cursor-pointer border border-outline-variant/20"
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* Selected Student Report Card Preview Modal/Panel (Right 40% / xl:col-span-5) */}
              {/* ========================================================================= */}
              <div className="xl:col-span-5 flex flex-col space-y-space-sm sticky top-20">
                {/* Official Academic Certificate Card Layout */}
                <div className="bg-surface-container-lowest rounded-2xl shadow-md p-space-lg flex flex-col space-y-space-md relative overflow-hidden border border-outline-variant/20">
                  {/* Top Accent Watermark Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-tertiary-container to-secondary"></div>

                  {/* Academic Authority Crest & Institute Header */}
                  <div className="flex items-start justify-between pb-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold font-headline-md shadow-xs shrink-0">
                        <span className="material-symbols-outlined text-[28px]">account_balance</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface leading-snug">
                          Apex Institute of Technology &amp; Skills
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          Autonomous Skill Council • Affiliation Code: #INS-7429
                        </span>
                        <span className="font-label-sm text-label-sm text-secondary font-medium">
                          Siliguri HQ Campus • Directorate of Examinations
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-data-mono text-[10px] font-bold tracking-wider">
                        OFFICIAL TRANSCRIPT
                      </span>
                    </div>
                  </div>

                  {/* Document Title Banner */}
                  <div className="text-center py-2 bg-surface-container-low rounded-lg border border-outline-variant/10">
                    <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-wide uppercase">
                      Official Student Academic Transcript &amp; Report Card
                    </h4>
                    <p className="font-label-sm text-label-sm text-outline">
                      Semester Grade Sheet • AY 2025–2026
                    </p>
                  </div>

                  {/* Student Meta Box */}
                  <div className="bg-surface-container-lowest p-space-sm rounded-xl grid grid-cols-2 gap-2 text-body-sm shadow-xs border border-outline-variant/20">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline block font-medium">
                        STUDENT CANDIDATE
                      </span>
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">
                        {selectedStudent.name}
                      </span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-outline block font-medium">
                        ENROLLMENT UID
                      </span>
                      <span className="font-data-mono text-body-sm font-semibold text-primary">
                        {selectedStudent.uid}
                      </span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-outline block font-medium">
                        ACADEMIC PROGRAM
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">
                        Full Stack Web Development
                      </span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-outline block font-medium">
                        COHORT / TERM
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">
                        WD Evening (02) • Mid Term
                      </span>
                    </div>
                  </div>

                  {/* Subject Marks Breakdown Table */}
                  <div className="overflow-hidden rounded-lg bg-surface-container-low border border-outline-variant/20">
                    <table className="w-full text-left text-body-sm font-body-sm">
                      <thead>
                        <tr className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase border-b border-outline-variant/20">
                          <th className="py-2 px-3 font-semibold">Subject Module</th>
                          <th className="py-2 px-2 text-center font-semibold">Max</th>
                          <th className="py-2 px-2 text-center font-semibold">Pass</th>
                          <th className="py-2 px-2 text-center font-semibold">Score</th>
                          <th className="py-2 px-3 text-right font-semibold">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-0 text-on-surface">
                        {selectedStudent.papers.map((paper, i) => (
                          <tr
                            key={paper.code}
                            className={i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'}
                          >
                            <td className="py-2.5 px-3">
                              <span className="font-medium block">{paper.title}</span>
                              <span className="font-data-mono text-label-sm text-outline">{paper.code}</span>
                            </td>
                            <td className="py-2.5 px-2 text-center font-data-mono text-outline">{paper.max}</td>
                            <td className="py-2.5 px-2 text-center font-data-mono text-outline">{paper.pass}</td>
                            <td className="py-2.5 px-2 text-center font-data-mono font-bold text-on-surface">
                              {paper.score}
                            </td>
                            <td className={`py-2.5 px-3 text-right font-data-mono font-bold ${paper.gradeColor}`}>
                              {paper.grade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Consolidated Aggregate Score Summary */}
                  <div className="bg-surface-container p-space-sm rounded-xl flex items-center justify-between border border-outline-variant/10">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Consolidated Aggregate
                      </span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-display text-headline-lg font-bold text-primary">
                          {selectedStudent.marks}
                        </span>
                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                          ({selectedStudent.pct})
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Term Award
                      </span>
                      <span className="font-headline-sm text-headline-sm font-bold text-tertiary">
                        {selectedStudent.award}
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-medium">
                        Batch Attendance: {selectedStudent.attendance}
                      </span>
                    </div>
                  </div>

                  {/* Faculty Remarks */}
                  <div className="bg-surface-container-low p-space-sm rounded-xl border border-outline-variant/20">
                    <span className="font-label-sm text-label-sm text-outline font-semibold uppercase flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[15px] text-tertiary">rate_review</span>
                      Evaluator Remarks
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface italic leading-relaxed">
                      “{selectedStudent.remarks}”
                    </p>
                  </div>

                  {/* Verification QR & Institutional Dual Signatures */}
                  <div className="pt-2 flex items-end justify-between gap-4">
                    {/* QR Code for Verification */}
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/20">
                        <svg className="text-on-surface" fill="currentColor" height="48" viewBox="0 0 24 24" width="48">
                          <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h-2v2h2v-2zm-4 4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v-2h-2v2zm0-4h2v-2h-2v2zm-4 0h2v2h-2v-2zm0 4h2v-2h-2v2zM6 6h2v2H6V6zm12 0h2v2h-2V6zm-12 12h2v2H6v-2z"></path>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                          Scan to Verify
                        </span>
                        <span className="font-data-mono text-[10px] text-outline">SHA-256 Auth</span>
                        <span className="font-data-mono text-[9px] text-secondary">
                          apex-cert.verify/{selectedStudent.shortUid.replace('#', '7429-')}
                        </span>
                      </div>
                    </div>

                    {/* Signature Blocks */}
                    <div className="flex items-center gap-6 text-center">
                      <div className="flex flex-col items-center">
                        <div className="h-8 flex items-end justify-center font-display text-[15px] italic text-on-surface-variant select-none tracking-tighter">
                          A. Sharma
                        </div>
                        <div className="w-24 h-0.5 bg-outline-variant mb-1"></div>
                        <span className="font-label-sm text-[10px] font-semibold text-on-surface">
                          Amit Sharma
                        </span>
                        <span className="font-label-sm text-[9px] text-outline">Faculty Course Lead</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="h-8 flex items-end justify-center font-display text-[15px] italic text-primary select-none tracking-tighter">
                          R. Sharma
                        </div>
                        <div className="w-24 h-0.5 bg-outline-variant mb-1"></div>
                        <span className="font-label-sm text-[10px] font-semibold text-on-surface">
                          Rajesh Sharma
                        </span>
                        <span className="font-label-sm text-[9px] text-outline">Director &amp; Admin</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Toolbar Below Report Card */}
                <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-2 border border-outline-variant/20">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePrint(selectedStudent.name)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md cursor-pointer border border-outline-variant/20"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[17px]">print</span>
                      <span>Print Official</span>
                    </button>

                    <button
                      onClick={() => handleDownloadSinglePDF(selectedStudent.name, selectedStudent.uid)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md cursor-pointer border border-outline-variant/20"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[17px]">download</span>
                      <span>Download PDF</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSendWhatsApp(selectedStudent.name)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary-fixed-dim/30 text-secondary hover:bg-secondary-fixed-dim/50 transition-colors font-label-md text-label-md cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[17px]">send_to_mobile</span>
                      <span>Send WhatsApp</span>
                    </button>

                    <button
                      onClick={() =>
                        onShowToast(`Report Card for ${selectedStudent.name} published to student mobile app.`)
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors font-label-md text-label-md font-semibold cursor-pointer shadow-xs"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[17px]">public</span>
                      <span>Publish Online</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODALS */}
      {/* ========================================================================= */}

      {/* BROADCAST MODAL */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[24px]">chat_bubble</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Batch Broadcast Dispatch
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Send verified report card links to 42 enrolled students and parents
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <span className="font-label-md text-label-md font-semibold text-on-surface block mb-1">
                  Delivery Channels
                </span>
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-primary" />
                    <span>WhatsApp Verified Business API</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-primary" />
                    <span>Official Email PDF Attachment</span>
                  </label>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 text-xs text-on-surface-variant">
                <p className="font-semibold text-on-surface mb-1">Message Preview:</p>
                <p className="italic">
                  “Dear Student/Parent, Your official Mid Term Assessment Report Card for AY 2025–26 has been published by Apex Institute. Access your verified grade sheet here: https://apex-cert.verify/portal”
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBroadcastModalOpen(false);
                  onShowToast('Dispatched 42 automated WhatsApp & Email result notifications!');
                }}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-all shadow-xs cursor-pointer"
              >
                Dispatch to 42 Recipients
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PUBLISH ALL RESULTS CONFIRMATION MODAL */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Publish Batch Results
                </h3>
                <p className="font-body-sm text-body-sm text-outline">
                  Confirm public release of Mid Term 2025–26 marks
                </p>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              This action will seal the evaluation ledger and enable student report cards on their mobile app dashboards. Rank orders and grade certifications will be finalized.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={handlePublishAll}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-all shadow-xs cursor-pointer"
              >
                Confirm &amp; Publish All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
