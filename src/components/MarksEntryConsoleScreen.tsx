import React, { useState, useMemo } from 'react';
import { ScreenType } from '../types';
import { useSidebar } from '../context/SidebarContext';

interface MarksEntryConsoleScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

type AttendanceStatus = 'P' | 'A' | 'Ex';

interface StudentGradeRecord {
  id: string;
  index: string;
  name: string;
  uid: string;
  avatarUrl?: string;
  initials?: string;
  initialsBg?: string;
  initialsText?: string;
  attendance: AttendanceStatus;
  marks: number | null;
  feedback: string;
}

const INITIAL_RECORDS: StudentGradeRecord[] = [
  {
    id: 's1',
    index: '01',
    name: 'Rahul Kumar',
    uid: 'ABC-SIL-26-00125',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8JLxfDCSqhZoH3H_XpAU7niGian8RQi4JMEbzUj4lN8AQZXYsZfx2sjmjSoPmw6vNZtq9HJ13MXuLO-dK5oOCsiOgxCGEMW96fk1elzW3EU5d0oKvggfLCRpYbre_EtIbskqM989GLOsCExJKx_4WYUQHI-r_sZ50xs9-Jw2W09NwomzsspyCbSLMMfifJML9foKit0HyVZzxmKC3WtwQvjXeX-dLaLB4JeK90prHLYvq5whkcb5J',
    attendance: 'P',
    marks: 82,
    feedback: 'Strong layout architecture',
  },
  {
    id: 's2',
    index: '02',
    name: 'Ayesha Khan',
    uid: 'ABC-SIL-26-00128',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCKP1gNgwW6jHaqXfDJ83kVslbzLhEDtiq-iB4qX-aUOFYjfvI7lnlD1auNJaZokSPdMwIzZcCAS50sPqEvUSc02Tbz8ViKt2u4qmYz0yGnnl0y3KP9zv2-fkVY55yyUHHJOmmEPVs9NGqDAwpkhuInYS8oN5lzTnM4Sawi9R0LgkTFuZgEgMFGLFrjrn-4fffeRuKczF9FgPdh2CM6H1vMwYQDJndQ0tzyAmLAw3KEDZHxcOdEJYJ',
    attendance: 'P',
    marks: 94,
    feedback: 'Outstanding responsiveness and styling',
  },
  {
    id: 's3',
    index: '03',
    name: 'Arjun Das',
    uid: 'ABC-SIL-26-00132',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPV5ZVXakYAnFEuE2AA7R5Va27NlwISdOSHYYCS8f9MOtpZid1V8X-g28ubYtfyL8eFe33FPXKWr7Hq3cf1TXZq4JUERZZbHBpcIulnexuwhynjiEhix9JVYuIO_4dv6KbCxTjXPUpg5a-uB_BNSFdnH8TXFml3b-RhJ2GRNjqTQ2jrTvaoBFX0stT1NKElJ9eQy2xJbxIOVibs0EEnhajMItZda0nA2HsmOruuBZ34uO8v-Oe6uyJ',
    attendance: 'A',
    marks: null,
    feedback: 'Medical leave notified',
  },
  {
    id: 's4',
    index: '04',
    name: 'Priya Sengupta',
    uid: 'ABC-SIL-26-00140',
    initials: 'PS',
    initialsBg: 'bg-tertiary-fixed',
    initialsText: 'text-on-tertiary-fixed',
    attendance: 'P',
    marks: 78,
    feedback: 'Good CSS Grid implementation',
  },
  {
    id: 's5',
    index: '05',
    name: 'Rohit Verma',
    uid: 'ABC-SIL-26-00145',
    initials: 'RV',
    initialsBg: 'bg-secondary-fixed',
    initialsText: 'text-on-secondary-fixed',
    attendance: 'P',
    marks: 64,
    feedback: 'Revise pseudo-elements and transitions',
  },
  {
    id: 's6',
    index: '06',
    name: 'Sneha Roy',
    uid: 'ABC-SIL-26-00151',
    initials: 'SR',
    initialsBg: 'bg-primary-fixed',
    initialsText: 'text-on-primary-fixed',
    attendance: 'P',
    marks: null,
    feedback: '',
  },
];

export const MarksEntryConsoleScreen: React.FC<MarksEntryConsoleScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [records, setRecords] = useState<StudentGradeRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);

  // Calculate Grade helper
  const calculateGrade = (marks: number | null, attendance: AttendanceStatus) => {
    if (attendance === 'A' || attendance === 'Ex' || marks === null) {
      return { grade: '—', color: 'bg-surface-container text-outline' };
    }
    if (marks >= 90) return { grade: 'A+', color: 'bg-primary-fixed text-on-primary-fixed' };
    if (marks >= 80) return { grade: 'A', color: 'bg-secondary-fixed text-on-secondary-fixed' };
    if (marks >= 70) return { grade: 'B+', color: 'bg-secondary-container text-on-secondary-container' };
    if (marks >= 60) return { grade: 'B', color: 'bg-surface-container-high text-on-surface' };
    if (marks >= 40) return { grade: 'C', color: 'bg-surface-container text-on-surface-variant' };
    return { grade: 'F', color: 'bg-error text-on-error' };
  };

  // Metrics
  const totalRegistered = 42;
  const enteredRecordsCount = useMemo(() => {
    return records.filter((r) => r.attendance === 'A' || r.attendance === 'Ex' || r.marks !== null).length + (35 - records.length);
  }, [records]);

  const progressPercentage = Math.round((enteredRecordsCount / totalRegistered) * 100);

  const handleMarksChange = (id: string, value: string) => {
    if (isLocked) {
      onShowToast('Marksheet is locked. Admin override required to make modifications.');
      return;
    }
    const num = value === '' ? null : Math.min(100, Math.max(0, Number(value)));
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, marks: num } : r))
    );
  };

  const handleAttendanceChange = (id: string, att: AttendanceStatus) => {
    if (isLocked) {
      onShowToast('Marksheet is locked.');
      return;
    }
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            attendance: att,
            marks: att === 'A' || att === 'Ex' ? null : r.marks ?? 0,
          };
        }
        return r;
      })
    );
  };

  const handleFeedbackChange = (id: string, text: string) => {
    if (isLocked) return;
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, feedback: text } : r))
    );
  };

  const handleLockMarks = () => {
    if (isLocked) {
      onShowToast('Marksheet is already locked with audit token INS-MRK-8819.');
      return;
    }
    setIsLocking(true);
    setTimeout(() => {
      setIsLocking(false);
      setIsLocked(true);
      onShowToast('Marks successfully locked and verified on ledger. Candidate portal updated!');
    }, 900);
  };

  const handleSaveDraft = () => {
    onShowToast('Draft evaluation marks saved locally (Last saved just now).');
  };

  const handleBulkFillAbsent = () => {
    if (isLocked) return;
    setRecords((prev) =>
      prev.map((r) => (r.marks === null && r.attendance !== 'A' ? { ...r, attendance: 'A' } : r))
    );
    onShowToast('Updated unfilled student records as Absent with 0 score.');
  };

  const handleExportTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Index,Student Name,UID,Attendance,Marks,Feedback\n' +
      records
        .map(
          (r) =>
            `"${r.index}","${r.name}","${r.uid}","${r.attendance}","${r.marks ?? ''}","${r.feedback}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Marksheet_WD_Evening_HTML5_CSS.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Downloaded standardized Excel/CSV Marksheet template.');
  };

  const filteredRecords = useMemo(() => {
    return records.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.uid.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [records, searchQuery]);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex">
      {/* ========================================================================= */}
      {/* 1. FIXED LEFT NAVIGATION SIDEBAR (w-64) */}
      {/* ========================================================================= */}
      {/* Mobile backdrop overlay with smooth fade in/out */}
      <div
        className={`fixed inset-0 top-12 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-all duration-300 ease-out ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-12 bottom-0 w-64 max-w-[85vw] bg-surface-container-lowest shadow-2xl lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform border-r border-outline-variant/30 ${
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
                  className="text-xs text-primary font-semibold py-0.5 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Marks Entry Console</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                </button>
                <button
                  onClick={() => onNavigate('results-transcripts')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium cursor-pointer"
                >
                  Results &amp; Report Cards
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
              onClick={() => onShowToast('Attendance ledger active across all 8 campus branches.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span className="font-body-md text-body-md">Attendance</span>
            </button>

            <button
              onClick={() => onShowToast('Finance, Fee invoicing & Reconciliation console active.')}
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
              onClick={() => onShowToast('Broadcast SMS & Parent WhatsApp gateway')}
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
              onClick={() => onShowToast('Siliguri HQ selected for marks verification.')}
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
              onClick={() => onShowToast('Evaluation audit reports ready for review.')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold">
                3
              </span>
            </button>

            <button
              onClick={() => onShowToast('Marks Entry and Grading Policies Help')}
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
        {/* 3. MARKS ENTRY CONSOLE MAIN CONTENT */}
        {/* ========================================================================= */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-screen">
          <div className="flex flex-col w-full">
            <div className="w-full px-margin-desktop py-space-lg flex flex-col gap-space-lg">
              {/* Top Action & Meta Header */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                    <span
                      onClick={() => onNavigate('academics')}
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Academics
                    </span>
                    <span className="text-outline-variant">/</span>
                    <span
                      onClick={() => onNavigate('academics')}
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Exams
                    </span>
                    <span className="text-outline-variant">/</span>
                    <span className="font-semibold text-on-surface">Marks Entry</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                    Marks Entry Console
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Rapid inline spreadsheet grading, validation rules, and automated marksheet calculation.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-space-sm">
                  <button
                    onClick={handleSaveDraft}
                    className="px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-xs hover:bg-surface-container-high transition-all flex items-center gap-1.5 active:scale-[0.98] cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">save</span>
                    <span>Save Draft</span>
                  </button>

                  <button
                    onClick={() => setIsImportModalOpen(true)}
                    className="px-space-md py-2 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-lg text-label-lg shadow-xs hover:bg-secondary-fixed-dim transition-all flex items-center gap-1.5 active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                    <span>Import from Excel</span>
                  </button>

                  <button
                    onClick={handleLockMarks}
                    disabled={isLocking}
                    className={`px-space-md py-2 rounded-lg font-label-lg text-label-lg shadow-[0_2px_8px_rgba(37,99,235,0.25)] transition-all flex items-center gap-1.5 active:scale-[0.98] cursor-pointer ${
                      isLocked
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-primary-container text-on-primary hover:bg-primary'
                    }`}
                    type="button"
                  >
                    {isLocking ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                        <span>Validating Matrix...</span>
                      </>
                    ) : isLocked ? (
                      <>
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        <span>Marks Locked</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        <span>Submit &amp; Lock Marks</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Filter Context Ribbon */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-md border border-outline-variant/20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Exam Session
                    </span>
                    <div className="flex items-center gap-1.5 text-on-surface font-label-lg text-label-lg truncate">
                      <span className="material-symbols-outlined text-primary text-[18px]">event_note</span>
                      <span className="truncate">Mid Term (2025–26)</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Branch
                    </span>
                    <div className="flex items-center gap-1.5 text-on-surface font-label-lg text-label-lg truncate">
                      <span className="material-symbols-outlined text-secondary text-[18px]">apartment</span>
                      <span className="truncate">Siliguri HQ Campus</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Course
                    </span>
                    <div className="flex items-center gap-1.5 text-on-surface font-label-lg text-label-lg truncate">
                      <span className="material-symbols-outlined text-tertiary text-[18px]">terminal</span>
                      <span className="truncate">Full Stack Web Dev</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Batch
                    </span>
                    <div className="flex items-center gap-1.5 text-on-surface font-label-lg text-label-lg truncate">
                      <span className="material-symbols-outlined text-outline text-[18px]">groups</span>
                      <span className="truncate">WD Evening (Batch 02)</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Subject Module
                    </span>
                    <div className="flex items-center gap-1.5 text-on-surface font-label-lg text-label-lg truncate">
                      <span className="material-symbols-outlined text-primary text-[18px]">code</span>
                      <span className="truncate">HTML5, CSS &amp; Tailwind</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Evaluator
                    </span>
                    <div className="flex items-center gap-1.5 text-on-surface font-label-lg text-label-lg truncate">
                      <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-[10px] font-bold text-primary">
                        AS
                      </span>
                      <span className="truncate">Amit Sharma (Faculty)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exam Summary & Real-time Progress Bar Ribbon */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-md border border-outline-variant/20">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-sm items-center">
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Max Marks</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">100</span>
                  </div>

                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Pass Criteria</span>
                    <span className="font-headline-md text-headline-md text-secondary font-bold">40.0%</span>
                  </div>

                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Total Registered</span>
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">42</span>
                  </div>

                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Marks Entered</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline-md text-headline-md text-primary font-bold">{enteredRecordsCount}</span>
                      <span className="font-label-sm text-label-sm text-outline">/ 42</span>
                    </div>
                  </div>

                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Class Average</span>
                    <span className="font-headline-md text-headline-md text-tertiary font-bold">78.4</span>
                  </div>

                  <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/10">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Highest Score</span>
                    <span className="font-headline-md text-headline-md text-secondary font-bold">96 / 100</span>
                  </div>
                </div>

                {/* Linear Progress Visualization */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span className="flex items-center gap-1.5 font-semibold text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Evaluation Progress: {progressPercentage}% Complete
                    </span>
                    <span className="text-outline">
                      {totalRegistered - enteredRecordsCount} Pending student records
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-primary transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Validation & Alert Banner */}
              <div className="bg-surface-container-high rounded-xl p-space-md shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-outline-variant/20">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center text-tertiary shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[22px]">verified_user</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                        Validation Notice
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                        Live Sync
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      2 students marked Absent. 1 pending entry cell. Auto-save enabled (Last saved 30s ago).
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs shrink-0 flex-wrap">
                  <button
                    onClick={handleExportTemplate}
                    className="px-space-sm py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1 shadow-xs cursor-pointer border border-outline-variant/20"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    <span>Export Template</span>
                  </button>

                  <button
                    onClick={handleBulkFillAbsent}
                    className="px-space-sm py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1 shadow-xs cursor-pointer border border-outline-variant/20"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">rule</span>
                    <span>Bulk Fill Absent (0)</span>
                  </button>

                  <button
                    onClick={() => setIsValidateModalOpen(true)}
                    className="px-space-sm py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">checklist</span>
                    <span>Validate Sheet</span>
                  </button>
                </div>
              </div>

              {/* Main Workspace Split Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
                {/* Master Spreadsheet Canvas (8 cols) */}
                <div className="xl:col-span-8 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col border border-outline-variant/20">
                    {/* Table Toolbar Header */}
                    <div className="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/20">
                      <div className="flex items-center gap-space-sm">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Student Evaluation Register
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-data-mono text-data-mono font-medium">
                          {filteredRecords.length} of 42 rendered
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative flex items-center bg-surface-container-lowest rounded-lg px-2.5 py-1 shadow-xs border border-outline-variant/20">
                          <span className="material-symbols-outlined text-outline text-[16px] mr-1.5">search</span>
                          <input
                            className="bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none w-36 sm:w-48"
                            placeholder="Filter student or UID..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>

                        <button
                          onClick={() => onShowToast('Filter criteria: Batch WD-EVE-02')}
                          className="p-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface shadow-xs cursor-pointer border border-outline-variant/20"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">tune</span>
                        </button>
                      </div>
                    </div>

                    {/* Data Grid */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/20">
                            <th className="py-3 px-space-sm w-12 text-center">#</th>
                            <th className="py-3 px-space-md min-w-[200px]">Student / UID</th>
                            <th className="py-3 px-space-sm min-w-[120px] text-center">Attendance</th>
                            <th className="py-3 px-space-sm min-w-[110px] text-center">Marks (100)</th>
                            <th className="py-3 px-space-sm min-w-[80px] text-center">Score %</th>
                            <th className="py-3 px-space-sm min-w-[70px] text-center">Grade</th>
                            <th className="py-3 px-space-sm min-w-[100px] text-center">Status</th>
                            <th className="py-3 px-space-md min-w-[220px]">Teacher Feedback</th>
                          </tr>
                        </thead>

                        <tbody className="font-body-md text-body-md divide-y divide-surface-container-high">
                          {filteredRecords.map((record) => {
                            const { grade, color: gradeColor } = calculateGrade(record.marks, record.attendance);
                            const isAbsent = record.attendance === 'A';
                            const isPending = record.marks === null && !isAbsent;

                            return (
                              <tr
                                key={record.id}
                                className={`transition-colors group ${
                                  isAbsent
                                    ? 'bg-surface-container-low/50 hover:bg-surface-container-low opacity-85'
                                    : isPending
                                    ? 'bg-surface-container-lowest hover:bg-surface-container-low'
                                    : 'hover:bg-surface-container-low'
                                }`}
                              >
                                {/* Index */}
                                <td className="py-3 px-space-sm text-center font-data-mono text-outline font-semibold">
                                  {record.index}
                                </td>

                                {/* Student / UID */}
                                <td className="py-3 px-space-md">
                                  <div className="flex items-center gap-space-sm">
                                    {record.avatarUrl ? (
                                      <img
                                        className={`w-9 h-9 rounded-full object-cover shadow-xs ${
                                          isAbsent ? 'grayscale' : ''
                                        }`}
                                        alt={record.name}
                                        src={record.avatarUrl}
                                      />
                                    ) : (
                                      <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center font-label-lg text-label-lg font-bold shadow-xs ${
                                          record.initialsBg || 'bg-primary-fixed'
                                        } ${record.initialsText || 'text-on-primary-fixed'}`}
                                      >
                                        {record.initials}
                                      </div>
                                    )}

                                    <div className="flex flex-col min-w-0">
                                      <span className="font-label-lg text-label-lg font-semibold text-on-surface truncate">
                                        {record.name}
                                      </span>
                                      <span className="font-data-mono text-data-mono text-outline truncate">
                                        {record.uid}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                {/* Attendance Pills */}
                                <td className="py-3 px-space-sm">
                                  <div className="flex items-center justify-center p-0.5 bg-surface-container rounded-lg">
                                    <button
                                      onClick={() => handleAttendanceChange(record.id, 'P')}
                                      className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-bold shadow-xs cursor-pointer transition-colors ${
                                        record.attendance === 'P'
                                          ? 'bg-primary text-on-primary'
                                          : 'text-outline hover:text-on-surface'
                                      }`}
                                      type="button"
                                    >
                                      P
                                    </button>

                                    <button
                                      onClick={() => handleAttendanceChange(record.id, 'A')}
                                      className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-bold shadow-xs cursor-pointer transition-colors ${
                                        record.attendance === 'A'
                                          ? 'bg-error text-on-error'
                                          : 'text-outline hover:text-on-surface'
                                      }`}
                                      type="button"
                                    >
                                      A
                                    </button>

                                    <button
                                      onClick={() => handleAttendanceChange(record.id, 'Ex')}
                                      className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-medium cursor-pointer transition-colors ${
                                        record.attendance === 'Ex'
                                          ? 'bg-secondary text-on-secondary font-bold'
                                          : 'text-outline hover:text-on-surface'
                                      }`}
                                      type="button"
                                    >
                                      Ex
                                    </button>
                                  </div>
                                </td>

                                {/* Marks Input */}
                                <td className="py-3 px-space-sm text-center">
                                  {isAbsent ? (
                                    <input
                                      className="w-16 h-8 text-center bg-surface-container-highest text-outline font-data-mono rounded-lg cursor-not-allowed"
                                      disabled
                                      type="text"
                                      value="—"
                                    />
                                  ) : (
                                    <input
                                      className={`w-16 h-8 text-center font-data-mono text-on-surface font-semibold rounded-lg focus:outline-none transition-all ${
                                        isPending
                                          ? 'bg-surface-container-lowest shadow-[0_0_0_2px_#ba1a1a] animate-pulse focus:shadow-[0_0_0_2px_#2563eb]'
                                          : 'bg-surface-container-low focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#2563eb]'
                                      }`}
                                      max="100"
                                      min="0"
                                      placeholder="0–100"
                                      type="number"
                                      value={record.marks ?? ''}
                                      onChange={(e) => handleMarksChange(record.id, e.target.value)}
                                    />
                                  )}
                                </td>

                                {/* Score % */}
                                <td className="py-3 px-space-sm text-center font-data-mono text-data-mono font-semibold text-on-surface">
                                  {isAbsent ? '0.0%' : record.marks !== null ? `${record.marks}.0%` : '—'}
                                </td>

                                {/* Grade */}
                                <td className="py-3 px-space-sm text-center">
                                  <span
                                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${gradeColor}`}
                                  >
                                    {grade}
                                  </span>
                                </td>

                                {/* Status */}
                                <td className="py-3 px-space-sm text-center">
                                  {isAbsent ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-medium">
                                      <span className="material-symbols-outlined text-[14px]">cancel</span>
                                      <span>Absent</span>
                                    </span>
                                  ) : isPending ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-medium">
                                      <span className="material-symbols-outlined text-[14px]">pending</span>
                                      <span>Pending</span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-medium">
                                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                      <span>Entered</span>
                                    </span>
                                  )}
                                </td>

                                {/* Teacher Feedback */}
                                <td className="py-3 px-space-md">
                                  <input
                                    className="w-full px-2 py-1 bg-transparent hover:bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded focus:outline-none focus:shadow-[0_0_0_1px_#2563eb]"
                                    type="text"
                                    value={record.feedback}
                                    placeholder={isPending ? 'Add remarks...' : ''}
                                    onChange={(e) => handleFeedbackChange(record.id, e.target.value)}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Footer Pagination */}
                    <div className="px-space-md py-space-sm bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-outline-variant/20">
                      <div className="flex items-center gap-2 text-outline font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        <span>
                          Showing first 6 of 42 records. Use keyboard{' '}
                          <kbd className="px-1.5 py-0.5 bg-surface-container rounded text-on-surface font-data-mono text-[11px] border border-outline-variant/30">
                            Tab
                          </kbd>{' '}
                          /{' '}
                          <kbd className="px-1.5 py-0.5 bg-surface-container rounded text-on-surface font-data-mono text-[11px] border border-outline-variant/30">
                            Enter
                          </kbd>{' '}
                          to traverse cells rapidly.
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          className="p-1 rounded bg-surface-container-lowest text-outline hover:text-on-surface shadow-xs disabled:opacity-40 cursor-pointer border border-outline-variant/20"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                        </button>
                        <span className="font-data-mono text-data-mono px-2 text-on-surface font-semibold">
                          Page {currentPage} of 7
                        </span>
                        <button
                          className="p-1 rounded bg-surface-container-lowest text-on-surface hover:text-primary shadow-xs cursor-pointer border border-outline-variant/20"
                          onClick={() => setCurrentPage((p) => Math.min(7, p + 1))}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* Side Utility Cards (4 cols) */}
                {/* ========================================================================= */}
                <div className="xl:col-span-4 flex flex-col gap-space-lg">
                  {/* Card 1: Grading Scale Reference */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-md border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">grade</span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Grading Scale Rules
                        </h2>
                      </div>
                      <span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant font-medium">
                        Apex Standard
                      </span>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Automated grade letters calculated against candidate's percentage score:
                    </p>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low border border-outline-variant/10">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                            A+
                          </span>
                          <span className="font-label-md text-label-md text-on-surface font-medium">
                            Outstanding
                          </span>
                        </div>
                        <span className="font-data-mono text-data-mono text-outline font-semibold">
                          90 – 100%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low border border-outline-variant/10">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                            A
                          </span>
                          <span className="font-label-md text-label-md text-on-surface font-medium">
                            Excellent
                          </span>
                        </div>
                        <span className="font-data-mono text-data-mono text-outline font-semibold">
                          80 – 89%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low border border-outline-variant/10">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                            B+
                          </span>
                          <span className="font-label-md text-label-md text-on-surface font-medium">
                            Good
                          </span>
                        </div>
                        <span className="font-data-mono text-data-mono text-outline font-semibold">
                          70 – 79%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low border border-outline-variant/10">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold">
                            B
                          </span>
                          <span className="font-label-md text-label-md text-on-surface font-medium">
                            Average
                          </span>
                        </div>
                        <span className="font-data-mono text-data-mono text-outline font-semibold">
                          60 – 69%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low border border-outline-variant/10">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold">
                            C
                          </span>
                          <span className="font-label-md text-label-md text-on-surface font-medium">
                            Pass Minimal
                          </span>
                        </div>
                        <span className="font-data-mono text-data-mono text-outline font-semibold">
                          40 – 59%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-error-container/40 border border-error/20">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold">
                            F
                          </span>
                          <span className="font-label-md text-label-md text-on-error-container font-medium">
                            Fail Criteria
                          </span>
                        </div>
                        <span className="font-data-mono text-data-mono text-error font-semibold">
                          &lt; 40%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Import Workflow Step Card */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-md border border-outline-variant/20">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">sync_alt</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Import Workflow
                      </h2>
                    </div>

                    <div className="flex flex-col gap-space-sm relative">
                      <div className="flex items-start gap-space-sm">
                        <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold shrink-0">
                          1
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Upload CSV / Excel Sheet
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Use standard column template containing UID &amp; Score.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-space-sm">
                        <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold shrink-0">
                          2
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Auto-match UIDs
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            System parses identifier codes against batch roster.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-space-sm">
                        <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold shrink-0">
                          3
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Verify Conflicts
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Inspect outliers, duplicate records, or format anomalies.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-space-sm">
                        <div className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center font-bold shrink-0">
                          4
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Merge Marks
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Batch-populate inline register with audit logging.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Submission Confirmation Notice */}
                  <div className="bg-surface-container-high rounded-xl p-space-md shadow-xs flex flex-col gap-space-sm border border-outline-variant/20">
                    <div className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-primary text-[20px]">policy</span>
                      <span className="font-headline-sm text-headline-sm font-semibold">
                        Submission Lock Notice
                      </span>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      Final submission formally locks these marks and notifies enrolled students via their portal. Any subsequent edits or grade recalculations will require an explicit Institution Admin override.
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-outline-variant/20">
                      <span className="font-label-sm text-label-sm text-outline">Audit Token: INS-MRK-8819</span>
                      <span
                        onClick={() => onShowToast('Exam Board Evaluation Rule: Section 14.B')}
                        className="font-label-sm text-label-sm text-primary font-semibold cursor-pointer hover:underline"
                      >
                        Read Policy
                      </span>
                    </div>
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

      {/* IMPORT EXCEL MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">upload_file</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Import Marks from Spreadsheet
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Supports .xlsx, .xls and .csv formats
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-primary/40 bg-surface-container-low rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-primary text-[40px] mb-2">cloud_upload</span>
              <p className="font-label-lg text-label-lg font-semibold text-on-surface">
                Drag and drop Excel or CSV marksheet
              </p>
              <p className="text-xs text-outline mt-1">Columns required: Student UID, Marks (0-100)</p>
              <label className="mt-4 px-4 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-lg cursor-pointer hover:bg-primary transition-all shadow-xs">
                Browse Files
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  className="hidden"
                  onChange={() => {
                    setIsImportModalOpen(false);
                    onShowToast('Simulated: Imported 42 student marks from Excel spreadsheet with zero errors!');
                  }}
                />
              </label>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
              <button
                onClick={handleExportTemplate}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                Download Standard Column Template
              </button>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VALIDATE SHEET MODAL */}
      {isValidateModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">checklist</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Validation Diagnostics
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Rule verification against Exam Committee Bylaws
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsValidateModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-secondary-fixed/30 flex items-center justify-between border border-secondary/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span className="text-xs font-semibold text-on-surface">Range Check (0 to 100)</span>
                </div>
                <span className="text-xs text-secondary font-bold font-mono">PASSED</span>
              </div>

              <div className="p-3 rounded-lg bg-secondary-fixed/30 flex items-center justify-between border border-secondary/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span className="text-xs font-semibold text-on-surface">UID Attendance Alignment</span>
                </div>
                <span className="text-xs text-secondary font-bold font-mono">PASSED</span>
              </div>

              <div className="p-3 rounded-lg bg-error-container/40 flex items-center justify-between border border-error/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-[18px]">warning</span>
                  <span className="text-xs font-semibold text-on-surface">Pending Cell (Row 06: Sneha Roy)</span>
                </div>
                <span className="text-xs text-error font-bold font-mono">1 CELL UNFILLED</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsValidateModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all cursor-pointer shadow-xs"
              >
                Return to Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
