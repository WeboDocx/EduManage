import React, { useState } from 'react';
import { ScreenType } from '../types';
import { useSidebar } from '../context/SidebarContext';

interface AssignmentsCourseworkScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

interface StudentSubmission {
  id: string;
  name: string;
  uid: string;
  status: 'Graded' | 'Reviewing' | 'Late' | 'Overdue';
  statusTime: string;
  score?: number;
  maxScore: number;
}

export const AssignmentsCourseworkScreen: React.FC<AssignmentsCourseworkScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'active' | 'due' | 'grading' | 'drafts' | 'archived'>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<string>('calc-ch4');
  const [ayeshakhanScore, setAyeshaKhanScore] = useState<string>('');
  
  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAlertDefaultersModalOpen, setIsAlertDefaultersModalOpen] = useState(false);
  const [isInspectorPdfOpen, setIsInspectorPdfOpen] = useState(false);

  // New assignment form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Mathematics (JEE Adv)');
  const [newCohort, setNewCohort] = useState('JEE 2026-A (Morning)');
  const [newMaxMarks, setNewMaxMarks] = useState('50');
  const [newDueDate, setNewDueDate] = useState('2026-09-25');

  const [studentList, setStudentList] = useState<StudentSubmission[]>([
    {
      id: '1',
      name: 'Aarav Sharma',
      uid: '#ZAYN-00125',
      status: 'Graded',
      statusTime: '16 Sep, 04:30 PM',
      score: 48,
      maxScore: 50,
    },
    {
      id: '2',
      name: 'Ayesha Khan',
      uid: '#ABC-00128',
      status: 'Reviewing',
      statusTime: '17 Sep, 10:15 AM',
      score: undefined,
      maxScore: 50,
    },
    {
      id: '3',
      name: 'Arjun Das',
      uid: '#ABC-00132',
      status: 'Late',
      statusTime: '17 Sep, 09:40 PM',
      score: undefined,
      maxScore: 50,
    },
    {
      id: '4',
      name: 'Priya Sengupta',
      uid: '#ABC-00140',
      status: 'Overdue',
      statusTime: 'No attempt logged',
      score: 0,
      maxScore: 50,
    },
  ]);

  const handleGradeAyesha = () => {
    const val = parseFloat(ayeshakhanScore);
    if (isNaN(val) || val < 0 || val > 50) {
      onShowToast('Please enter a valid score between 0 and 50 for Ayesha Khan.');
      return;
    }
    setStudentList((prev) =>
      prev.map((s) =>
        s.id === '2' ? { ...s, status: 'Graded', score: val, statusTime: 'Just now' } : s
      )
    );
    onShowToast(`Recorded score ${val}/50 for Ayesha Khan.`);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      onShowToast('Please specify a title for the assignment.');
      return;
    }
    setIsCreateModalOpen(false);
    onShowToast(`Assignment "${newTitle}" created and broadcast to ${newCohort}!`);
    setNewTitle('');
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex">
      {/* ========================================================================= */}
      {/* 1. FIXED LEFT NAVIGATION SIDEBAR (w-[260px]) */}
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
        className={`fixed left-0 top-12 bottom-0 w-[260px] bg-surface-container-lowest shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none border-r border-outline-variant/30 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="h-16 px-space-lg flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/20">
            <div
              className="flex items-center gap-space-sm cursor-pointer"
              onClick={() => {
                onNavigate('dashboard');
                setIsSidebarOpen(false);
              }}
            >
              <img
                alt="EduManage Logo"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida/AEtjO1U-QhXESZEr_12u3oOW5wW6fVviAeAnkqC1YVMGXeEyDfiGfPHbkLv6gWOnkG7NCoQAvoMRvaD0VROU-wSN3jk9aE8NgN293_R6RLzmwi8pqgkH1wOL9xza5gs9BYtbTZgBkeAsNR4X76D1FOVvi4MLsvpeFcoX9epNVK5yx47Riyg60tGb6b9IPb-XWADgLIvIiAefmbdsx0P-4DOQL-MvN6hAVyB5f3uk0YcVmbGkecLG3pgNgtWkBqM"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold">
                  EduManage
                </span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                  Enterprise OS
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer flex items-center justify-center"
              aria-label="Hide sidebar"
              title="Hide sidebar"
            >
              <span className="material-symbols-outlined text-[20px]">menu_open</span>
            </button>
          </div>

          {/* Campus Selector Pill */}
          <div className="px-space-md py-space-sm">
            <div
              onClick={() => onShowToast('Siliguri HQ Campus selected (Branch #01 • 8 Active branches connected)')}
              className="w-full p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors border border-outline-variant/20"
            >
              <div className="flex items-center gap-space-sm overflow-hidden">
                <span className="material-symbols-outlined text-primary text-[20px]">apartment</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                    Siliguri HQ Campus
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                    Branch #01 • 8 Active
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[18px]">unfold_more</span>
            </div>
          </div>

          {/* Navigation Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-space-md py-space-xs space-y-space-md">
            {/* Administrative */}
            <div className="space-y-space-xs">
              <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase font-semibold tracking-wider">
                Administrative
              </span>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    dashboard
                  </span>
                  <span className="font-label-md text-label-md">Executive Overview</span>
                </button>
                <button
                  onClick={() => onShowToast('Opening Campus Directory of 8 centers.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    hub
                  </span>
                  <span className="font-label-md text-label-md">Campus Directory</span>
                </button>
                <button
                  onClick={() => onShowToast('Staff Governance: 64 active faculty and administrative personnel.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    badge
                  </span>
                  <span className="font-label-md text-label-md">Staff Governance</span>
                </button>
              </nav>
            </div>

            {/* Academic Operations (ACTIVE SECTION) */}
            <div className="space-y-space-xs">
              <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase font-semibold tracking-wider">
                Academic Operations
              </span>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('timetable-schedule')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    calendar_month
                  </span>
                  <span className="font-label-md text-label-md">Timetable &amp; Schedule</span>
                </button>

                {/* ACTIVE TAB: Assignments & HW */}
                <button
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg bg-primary-container text-on-primary font-semibold shadow-xs text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                  <span className="font-label-md text-label-md">Assignments &amp; HW</span>
                </button>

                <button
                  onClick={() => onNavigate('academics')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    grade
                  </span>
                  <span className="font-label-md text-label-md">Exam Matrices</span>
                </button>
              </nav>
            </div>

            {/* Institutional Portals */}
            <div className="space-y-space-xs">
              <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase font-semibold tracking-wider">
                Institutional Portals
              </span>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onShowToast('Teacher Portal loaded for Dr. Aris Thorne.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    school
                  </span>
                  <span className="font-label-md text-label-md">Teacher Portal</span>
                </button>
                <button
                  onClick={() => onNavigate('student-portal')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    person
                  </span>
                  <span className="font-label-md text-label-md">Student Portal</span>
                </button>
                <button
                  onClick={() => onNavigate('parent-portal')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    family_restroom
                  </span>
                  <span className="font-label-md text-label-md">Parent Portal</span>
                </button>
              </nav>
            </div>

            {/* Finance & Accounts */}
            <div className="space-y-space-xs">
              <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase font-semibold tracking-wider">
                Finance &amp; Accounts
              </span>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onShowToast('Fee Ledgers & Payment Tracking.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    payments
                  </span>
                  <span className="font-label-md text-label-md">Fee Ledgers</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-space-md bg-surface-container-lowest border-t border-outline-variant/30">
            <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                    EduManage Cloud
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">v4.8.2 Live Node</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE CONTAINER (pl-0 lg:pl-[260px]) */}
      {/* ========================================================================= */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pl-0 lg:pl-[260px]' : 'pl-0'
      }`}>
        {/* Top Responsive Header (Sticky below global navigation) */}
        <header className="sticky top-12 z-30 h-14 sm:h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex items-center justify-between px-4 sm:px-space-xl border-b border-outline-variant/20 transition-all duration-300 ease-in-out">
          {/* Breadcrumb & Year */}
          <div className="flex items-center gap-space-md">
            {/* Sidebar Toggle Button (Desktop & Mobile) */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-2 -ml-1 mr-1 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer border border-outline-variant/30 shadow-xs flex items-center justify-center"
              aria-label="Toggle Sidebar Menu"
              title={isSidebarOpen ? "Hide Sidebar (Maximize workspace)" : "Show Sidebar"}
            >
              <span className="material-symbols-outlined text-[22px]">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>

            <div className="flex items-center gap-space-xs text-outline font-body-sm text-body-sm">
              <span
                onClick={() => onNavigate('dashboard')}
                className="hover:text-primary cursor-pointer transition-colors"
              >
                Platform
              </span>
              <span>/</span>
              <span
                onClick={() => onShowToast('Siliguri HQ Operations')}
                className="hover:text-primary cursor-pointer transition-colors"
              >
                Siliguri HQ
              </span>
              <span>/</span>
              <span className="text-on-surface font-semibold">Operations</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold tracking-wide">
              AY 2025–26
            </span>
          </div>

          {/* Search, Notifications & User */}
          <div className="flex items-center gap-space-lg">
            <div
              onClick={() => onShowToast('Global Search opened (Press ⌘K).')}
              className="relative flex items-center cursor-pointer"
            >
              <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-1.5 rounded-lg text-outline hover:text-on-surface transition-colors border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span className="font-body-sm text-body-sm pr-6">
                  Quick find student, ledger, timetable...
                </span>
                <kbd className="font-data-mono text-[10px] bg-surface-container-lowest px-1.5 py-0.5 rounded shadow-xs text-on-surface font-semibold border border-outline-variant/30">
                  ⌘K
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-space-sm">
              <button
                onClick={() => onShowToast('3 pending homework cutoff deadlines tonight.')}
                className="relative p-2 rounded-lg text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center font-semibold leading-none">
                  3
                </span>
              </button>
              <button
                onClick={() => onShowToast('Assignments & Evaluation documentation')}
                className="p-2 rounded-lg text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">help_outline</span>
              </button>
            </div>

            <div className="h-6 w-[1px] bg-outline-variant/40"></div>

            <div className="flex items-center gap-space-sm pl-space-xs">
              <img
                alt="Profile of Dr. Aris Thorne"
                className="w-8 h-8 rounded-full object-cover shadow-xs"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WGopkRi0e7RACbAeh9HarEQpgzwV4gII2BBnN0fImO0_ivQuf3D8fWWXjnDa8i7tNyimgkcDUKUpCQ0SbimmA8304zNb8-OtViMqR7RWTsqbRK69ytaSQUrdsT77u80IH5L7DiWTGCwRGcXNmevxS6bfF83aQaWrI7pGS91Kgb52wdoxaqDG5GJfP-jdFHhXzJ-uH663fwJU19MjIi3ZIknbHOIbpbDy0SCYfb9-a95DfMmTqAAIK0TQ"
              />
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                  Dr. Aris Thorne
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-medium">
                  Headmaster Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. ASSIGNMENTS MAIN WORKSPACE CANVAS */}
        {/* ========================================================================= */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-screen px-space-md sm:px-space-xl py-space-md sm:py-space-xl">
          <div className="flex flex-col w-full space-y-space-xl">
            {/* Top Level Command Bar & Summary Head */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="flex flex-col space-y-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-data-mono text-label-sm uppercase tracking-wider font-semibold">
                    ACADEMICS-OPS // REGISTRY v4.8
                  </span>
                  <span className="text-outline text-body-sm">•</span>
                  <span className="font-body-sm text-outline">Central Institutional Syllabus Track</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                  Assignments &amp; Coursework Engine
                </h1>
                <p className="font-body-md text-on-surface-variant max-w-2xl">
                  Manage structured homework sets, track cross-batch submission pipelines, run faculty marking rubrics, and automated defaulter dispatches.
                </p>
              </div>

              {/* Quick Action Controls */}
              <div className="flex flex-wrap items-center gap-space-sm">
                <button
                  onClick={() => setIsAlertDefaultersModalOpen(true)}
                  className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-lowest shadow-xs text-on-surface hover:bg-surface-container-low transition-all font-label-md text-label-md cursor-pointer border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">forum</span>
                  <span>Bulk WhatsApp Alert</span>
                </button>

                <button
                  onClick={() =>
                    onShowToast('Preparing encrypted archive of 34 student PDF uploads...')
                  }
                  className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-lowest shadow-xs text-on-surface hover:bg-surface-container-low transition-all font-label-md text-label-md cursor-pointer border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">folder_zip</span>
                  <span>Download Submissions</span>
                </button>

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-space-xs px-space-lg py-2 rounded-lg bg-primary text-on-primary shadow-sm hover:bg-primary-container active:scale-[0.98] transition-all font-label-md text-label-md font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Create Assignment</span>
                </button>
              </div>
            </div>

            {/* Metric Architecture Strip: 5 KPI Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
              {/* Card 1 */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Total Assigned
                  </span>
                  <span className="p-1.5 rounded-lg bg-surface-container-low text-primary">
                    <span className="material-symbols-outlined text-[18px]">library_books</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-display text-display text-on-surface leading-none font-bold">148</span>
                    <span className="font-data-mono text-[11px] text-secondary font-semibold">+12 mo</span>
                  </div>
                  <p className="font-body-sm text-outline mt-1 truncate">Term II curriculum units</p>
                </div>
                <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Active &amp; Open
                  </span>
                  <span className="p-1.5 rounded-lg bg-surface-container-high text-primary-container">
                    <span className="material-symbols-outlined text-[18px]">timelapse</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-display text-display text-primary leading-none font-bold">42</span>
                    <span className="font-label-sm text-label-sm text-outline">Across 18 Batches</span>
                  </div>
                  <p className="font-body-sm text-outline mt-1 truncate">Accepting student uploads</p>
                </div>
                <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-error uppercase tracking-wider font-semibold">
                    Due Today
                  </span>
                  <span className="p-1.5 rounded-lg bg-error-container text-error">
                    <span className="material-symbols-outlined text-[18px]">notification_important</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-display text-display text-error leading-none font-bold">6</span>
                    <span className="font-label-sm text-label-sm text-error font-semibold">Critical cutoff</span>
                  </div>
                  <p className="font-body-sm text-outline mt-1 truncate">Cutoff at 11:59 PM tonight</p>
                </div>
                <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Needs Grading
                  </span>
                  <span className="p-1.5 rounded-lg bg-surface-container-low text-tertiary">
                    <span className="material-symbols-outlined text-[18px]">rate_review</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-display text-display text-on-surface leading-none font-bold">28</span>
                    <span className="font-data-mono text-[11px] text-tertiary font-semibold">Faculty Queued</span>
                  </div>
                  <p className="font-body-sm text-outline mt-1 truncate">480+ total student sheets</p>
                </div>
                <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col justify-between space-y-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Completed / Arch.
                  </span>
                  <span className="p-1.5 rounded-lg bg-secondary-container text-secondary">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-display text-display text-secondary leading-none font-bold">98</span>
                    <span className="font-data-mono text-[11px] text-secondary font-semibold">84.6% Avg</span>
                  </div>
                  <p className="font-body-sm text-outline mt-1 truncate">Synchronized with gradebook</p>
                </div>
                <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>

            {/* Filter & Segment Ribbon */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs space-y-space-md border border-outline-variant/20">
              {/* Top Filter Row: State Tabs */}
              <div className="flex items-center justify-between border-b-0 pb-1 overflow-x-auto gap-space-md">
                <div className="flex items-center gap-space-xs shrink-0">
                  <button
                    onClick={() => setActiveFilterTab('all')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md shadow-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeFilterTab === 'all'
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span>All Assignments</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[11px] font-data-mono ${
                        activeFilterTab === 'all'
                          ? 'bg-surface-container-lowest/25'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      148
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveFilterTab('active')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeFilterTab === 'active'
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span>Active</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-data-mono">
                      42
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveFilterTab('due')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeFilterTab === 'due'
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span>Due Soon</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-error-container text-error text-[11px] font-data-mono font-bold">
                      6
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveFilterTab('grading')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeFilterTab === 'grading'
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span>Needs Grading</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-tertiary text-[11px] font-data-mono">
                      28
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveFilterTab('drafts')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeFilterTab === 'drafts'
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span>Drafts</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-data-mono">
                      8
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveFilterTab('archived')}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeFilterTab === 'archived'
                        ? 'bg-primary text-on-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`}
                  >
                    <span>Archived</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-outline text-[11px] font-data-mono">
                      98
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-space-sm shrink-0">
                  <span className="font-data-mono text-label-sm text-outline">Viewing Batch JEE-2026</span>
                  <button
                    onClick={() => onShowToast('Filter options configured for Batch JEE-2026.')}
                    className="p-1 rounded text-outline hover:text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">tune</span>
                  </button>
                </div>
              </div>

              {/* Multi-Axis Filter Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-space-sm pt-space-xs">
                {/* Campus Selector */}
                <div className="flex flex-col space-y-1">
                  <label className="font-label-sm text-label-sm text-outline font-semibold">Campus Unit</label>
                  <div
                    onClick={() => onShowToast('Siliguri HQ selected')}
                    className="flex items-center justify-between px-space-sm py-1.5 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md cursor-pointer hover:bg-surface-container border border-outline-variant/20"
                  >
                    <span className="truncate">Siliguri HQ Campus</span>
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </div>
                </div>

                {/* Course Scope */}
                <div className="flex flex-col space-y-1">
                  <label className="font-label-sm text-label-sm text-outline font-semibold">Target Program</label>
                  <div
                    onClick={() => onShowToast('Program: JEE Foundation & Adv')}
                    className="flex items-center justify-between px-space-sm py-1.5 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md cursor-pointer hover:bg-surface-container border border-outline-variant/20"
                  >
                    <span className="truncate">JEE Foundation &amp; Adv</span>
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </div>
                </div>

                {/* Batch Filter */}
                <div className="flex flex-col space-y-1">
                  <label className="font-label-sm text-label-sm text-outline font-semibold">Active Cohort</label>
                  <div
                    onClick={() => onShowToast('Cohort: Batch JEE 2026-A')}
                    className="flex items-center justify-between px-space-sm py-1.5 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md cursor-pointer hover:bg-surface-container border border-outline-variant/20"
                  >
                    <span className="truncate">Batch JEE 2026-A</span>
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </div>
                </div>

                {/* Subject Filter */}
                <div className="flex flex-col space-y-1">
                  <label className="font-label-sm text-label-sm text-outline font-semibold">Subject Domain</label>
                  <div
                    onClick={() => onShowToast('Subject: All Academic Subjects')}
                    className="flex items-center justify-between px-space-sm py-1.5 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md cursor-pointer hover:bg-surface-container border border-outline-variant/20"
                  >
                    <span className="truncate">All Academic Subjects</span>
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </div>
                </div>

                {/* Date Filter */}
                <div className="flex flex-col space-y-1">
                  <label className="font-label-sm text-label-sm text-outline font-semibold">Deadline Range</label>
                  <div
                    onClick={() => onShowToast('Date range: Current Cycle (This Week)')}
                    className="flex items-center justify-between px-space-sm py-1.5 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md cursor-pointer hover:bg-surface-container border border-outline-variant/20"
                  >
                    <span className="truncate">Current Cycle (This Week)</span>
                    <span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Asymmetric Workspace: 65% Assignments Registry / 35% Inspection Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              {/* LEFT / MAIN REGISTRY (65% -> 8 Cols) */}
              <div className="lg:col-span-8 flex flex-col space-y-space-md">
                {/* List Header Context Bar */}
                <div className="flex items-center justify-between px-space-xs">
                  <div className="flex items-center gap-space-sm">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Curriculum Worksheets &amp; Sets
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-data-mono text-[11px] font-semibold">
                      4 Selected in Scope
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs text-outline text-body-sm font-label-sm">
                    <span>Sort:</span>
                    <span className="text-on-surface font-semibold cursor-pointer">Urgency / Due Date ↓</span>
                  </div>
                </div>

                {/* ASSIGNMENT CARD 1: Selected / Spotlight */}
                <div
                  onClick={() => setSelectedAssignment('calc-ch4')}
                  className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-md transition-all relative overflow-hidden group cursor-pointer border ${
                    selectedAssignment === 'calc-ch4'
                      ? 'border-primary/40 ring-1 ring-primary/20'
                      : 'border-outline-variant/20'
                  }`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
                  <div className="flex flex-col space-y-space-md">
                    {/* Card Header & Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-space-xs">
                          <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                            Homework Worksheet
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                            Max Marks: 50
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-data-mono text-[11px] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Due in 2 days (18 Sep, 11:59 PM)
                          </span>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold pt-1">
                          Calculus &amp; Integration Problem Set — Chapter 4
                        </h3>
                        <p className="font-body-sm text-on-surface-variant">
                          Focus: Definite integrals, substitution methods, Leibniz rule, and geometric bounded area computations.
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/20">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span className="font-label-sm text-label-sm text-on-surface font-medium">
                          Selected Workspace
                        </span>
                      </div>
                    </div>

                    {/* Academic Routing Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm py-space-xs bg-surface-container-low/60 rounded-lg px-space-md border border-outline-variant/10">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Subject Track</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          Mathematics (JEE Adv)
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Class Cohort</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          JEE 2026-A (Morning)
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Lead Evaluator</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          Prof. Rahul Sharma
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Student Enrolled</span>
                        <span className="font-label-md text-label-md text-primary font-semibold font-data-mono block">
                          42 Candidates
                        </span>
                      </div>
                    </div>

                    {/* Submissions Metric Bar Inline */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="font-label-md text-label-md text-on-surface font-medium flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-secondary">cloud_done</span>
                          Submitted: <span className="font-data-mono font-bold text-on-surface">34 / 42 (81.0%)</span>
                        </span>
                        <span className="font-data-mono text-label-sm text-error font-semibold">
                          8 Overdue / Pending
                        </span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden flex">
                        <div className="bg-secondary h-full rounded-l-full" style={{ width: '81%' }}></div>
                        <div className="bg-error/30 h-full rounded-r-full" style={{ width: '19%' }}></div>
                      </div>
                    </div>

                    {/* Card Action Buttons Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                      <div className="flex items-center gap-space-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowToast('Focused grading ledger for 34 submitted sheets.');
                          }}
                          className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">draw</span>
                          <span>Grade Submissions (34)</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsAlertDefaultersModalOpen(true);
                          }}
                          className="px-space-md py-1.5 rounded-lg bg-error-container text-error font-label-md text-label-md hover:bg-error/20 transition-all flex items-center gap-1 font-semibold cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">send_to_mobile</span>
                          <span>Alert 8 Defaulters</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-outline">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowToast('Edit Problem Set: Calculus Ch-4');
                          }}
                          className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                          title="Edit Problem Set"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowToast('Exporting analytics for Calculus Chapter 4.');
                          }}
                          className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                          title="Export Analytics"
                        >
                          <span className="material-symbols-outlined text-[18px]">ios_share</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowToast('Additional options menu opened.');
                          }}
                          className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                          title="More Options"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ASSIGNMENT CARD 2: Active / Lab */}
                <div
                  onClick={() => setSelectedAssignment('em-lab')}
                  className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs hover:shadow-md transition-all cursor-pointer group border border-outline-variant/20"
                >
                  <div className="flex flex-col space-y-space-md">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-space-xs">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                            Lab Report &amp; Simulation
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                            Max Marks: 25
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-data-mono text-[11px] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            Active • Due 22 Sep 2026
                          </span>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold pt-1 group-hover:text-primary transition-colors">
                          Electromagnetic Induction Lab Report &amp; Circuit Simulations
                        </h3>
                        <p className="font-body-sm text-on-surface-variant">
                          Empirical data logs from Faraday coil apparatus with LTSpice waveform attachments.
                        </p>
                      </div>
                      <span className="p-1.5 rounded-lg bg-surface-container-low text-outline group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm py-space-xs bg-surface-container-low/40 rounded-lg px-space-md border border-outline-variant/10">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Subject</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          Physics Experimental
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Batch</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          JEE 2026-A
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Faculty</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          Dr. Amit Kumar
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Paced Return</span>
                        <span className="font-label-md text-label-md text-secondary font-semibold font-data-mono block">
                          40 / 42 (95.2%)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-body-sm pt-1">
                      <div className="flex items-center gap-space-sm">
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                          High Engagement
                        </span>
                        <span className="text-outline text-[12px]">•</span>
                        <span className="font-body-sm text-outline">Only 2 non-respondents remaining</span>
                      </div>
                      <div className="flex items-center gap-space-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onShowToast('Inspecting 40 lab report submissions.');
                          }}
                          className="px-space-sm py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high text-label-sm font-semibold transition-all cursor-pointer"
                        >
                          Inspect Submissions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ASSIGNMENT CARD 3: Due Today Alert */}
                <div
                  onClick={() => setSelectedAssignment('org-chem')}
                  className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs hover:shadow-md transition-all cursor-pointer group border border-outline-variant/20"
                >
                  <div className="flex flex-col space-y-space-md">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-space-xs">
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                            Structured Practice Unit
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                            Max Marks: 100
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-error-container text-error font-data-mono text-[11px] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                            Due Today • 11:59 PM Final Cutoff
                          </span>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold pt-1 group-hover:text-primary transition-colors">
                          Reaction Mechanisms in Organic Synthesis
                        </h3>
                        <p className="font-body-sm text-on-surface-variant">
                          Electrophilic aromatic substitution, Aldol condensation pathways, and stereochemistry diagrams.
                        </p>
                      </div>
                      <span className="p-1.5 rounded-lg bg-surface-container-low text-outline group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm py-space-xs bg-surface-container-low/40 rounded-lg px-space-md border border-outline-variant/10">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Subject</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          Organic Chemistry
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Batch</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          NEET Foundation-01
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Faculty</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          Dr. S. Mukherjee
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Submissions</span>
                        <span className="font-label-md text-label-md text-error font-semibold font-data-mono block">
                          18 / 36 (50.0%)
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-error h-full rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>

                {/* ASSIGNMENT CARD 4: Graded / Archived */}
                <div
                  onClick={() => setSelectedAssignment('history-essay')}
                  className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs hover:shadow-md transition-all cursor-pointer group opacity-90 hover:opacity-100 border border-outline-variant/20"
                >
                  <div className="flex flex-col space-y-space-md">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-space-xs">
                          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                            Analytical Essay
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                            Max Marks: 50
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-data-mono text-[11px] font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            Fully Graded (Avg 44/50)
                          </span>
                        </div>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold pt-1 group-hover:text-primary transition-colors">
                          Modern Indian History &amp; Governance Structural Essay
                        </h3>
                        <p className="font-body-sm text-on-surface-variant">
                          Post-1947 economic policy frameworks, constitutional amendments, and federalism shifts.
                        </p>
                      </div>
                      <span className="p-1.5 rounded-lg bg-surface-container-low text-outline group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm py-space-xs bg-surface-container-low/40 rounded-lg px-space-md border border-outline-variant/10">
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Subject</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          General Studies X
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Batch</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          Foundation 10-A
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Faculty Lead</span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate block">
                          Ananya Sen
                        </span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-outline block font-medium">Return Rate</span>
                        <span className="font-label-md text-label-md text-secondary font-semibold font-data-mono block">
                          28 / 28 (100%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT INSPECTION & LEDGER COLUMN (35% -> 4 Cols) */}
              <div className="lg:col-span-4 flex flex-col space-y-space-md sticky top-20">
                {/* Inspection Ledger Box */}
                <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col space-y-space-md border border-outline-variant/20">
                  {/* Inspection Header */}
                  <div className="flex items-start justify-between pb-space-xs border-b-0">
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                        Submissions Inspector
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                        Calculus &amp; Integration PS-4
                      </h4>
                      <span className="font-data-mono text-[11px] text-outline">CRN-2026-MTH-0094</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-surface-container-low text-on-surface font-data-mono text-[11px] font-semibold border border-outline-variant/20">
                      JEE 2026-A
                    </span>
                  </div>

                  {/* Attached Teaching Resources */}
                  <div className="space-y-space-xs">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Attached Source Materials
                    </span>
                    <div className="flex flex-col space-y-1.5">
                      <div
                        onClick={() => {
                          setIsInspectorPdfOpen(true);
                          onShowToast('Viewing attached PDF: calculus_ps4_question_bank.pdf');
                        }}
                        className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer border border-outline-variant/10"
                      >
                        <div className="flex items-center gap-space-xs overflow-hidden">
                          <span className="material-symbols-outlined text-error text-[20px]">picture_as_pdf</span>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                              calculus_ps4_question_bank.pdf
                            </span>
                            <span className="font-data-mono text-[10px] text-outline">
                              2.4 MB • Cryptographically Signed
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px]">
                          download
                        </span>
                      </div>

                      <div
                        onClick={() => onShowToast('Scoring Schema: marking_rubric_v2.pdf')}
                        className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer border border-outline-variant/10"
                      >
                        <div className="flex items-center gap-space-xs overflow-hidden">
                          <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                              marking_rubric_v2.pdf
                            </span>
                            <span className="font-data-mono text-[10px] text-outline">
                              480 KB • Step Scoring Schema
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px]">
                          visibility
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submission Progress Diagnostics Graphic */}
                  <div className="p-space-md rounded-xl bg-surface-container-low/80 space-y-space-sm border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        Cohort Submission Ratio
                      </span>
                      <span className="font-data-mono text-label-sm text-secondary font-bold">81.0% Turnout</span>
                    </div>

                    {/* Stacked Bar Visual */}
                    <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden flex shadow-inner">
                      <div className="bg-secondary h-full" style={{ width: '81%' }} title="34 Submitted"></div>
                      <div className="bg-error h-full" style={{ width: '19%' }} title="8 Pending"></div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-between text-[11px] font-label-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        <span className="text-on-surface font-medium">34 Submitted (81%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-error"></span>
                        <span className="text-error font-semibold">8 Non-Submitted (19%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Student Submissions Table */}
                  <div className="space-y-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Live Audit Ledger (42)
                      </span>
                      <span className="font-data-mono text-[10px] text-outline">Auto-sync active</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-outline font-label-sm text-[11px] border-b border-outline-variant/20">
                            <th className="pb-2 font-semibold">Student</th>
                            <th className="pb-2 font-semibold">Status</th>
                            <th className="pb-2 font-semibold">Score</th>
                            <th className="pb-2 text-right font-semibold">Action</th>
                          </tr>
                        </thead>

                        <tbody className="space-y-2">
                          {studentList.map((student) => (
                            <tr
                              key={student.id}
                              className="group hover:bg-surface-container-low/60 rounded-lg transition-colors"
                            >
                              <td className="py-2.5 pr-2">
                                <div className="flex flex-col">
                                  <span className="font-label-md text-label-md text-on-surface font-semibold leading-none">
                                    {student.name}
                                  </span>
                                  <span className="font-data-mono text-[10px] text-outline mt-0.5">
                                    {student.uid}
                                  </span>
                                </div>
                              </td>

                              <td className="py-2.5 pr-2">
                                <div className="flex flex-col">
                                  <span
                                    className={`px-1.5 py-0.5 rounded font-label-sm text-[10px] font-semibold w-fit ${
                                      student.status === 'Graded'
                                        ? 'bg-secondary-container text-on-secondary-container'
                                        : student.status === 'Reviewing'
                                        ? 'bg-surface-container-high text-primary'
                                        : student.status === 'Late'
                                        ? 'bg-amber-100 text-amber-900'
                                        : 'bg-error-container text-error font-bold'
                                    }`}
                                  >
                                    {student.status === 'Late' ? 'Late (+2h)' : student.status}
                                  </span>
                                  <span className="font-data-mono text-[9px] text-outline mt-0.5">
                                    {student.statusTime}
                                  </span>
                                </div>
                              </td>

                              <td className="py-2.5 pr-2">
                                {student.id === '2' && student.status === 'Reviewing' ? (
                                  <div className="flex items-center gap-0.5">
                                    <input
                                      className="w-8 h-6 bg-surface-container-lowest text-center rounded font-data-mono text-[11px] text-on-surface focus:outline-none focus:bg-surface-container-high border border-outline-variant/30"
                                      placeholder="--"
                                      type="text"
                                      value={ayeshakhanScore}
                                      onChange={(e) => setAyeshaKhanScore(e.target.value)}
                                    />
                                    <span className="font-data-mono text-[10px] text-outline">/50</span>
                                  </div>
                                ) : student.score !== undefined ? (
                                  <span
                                    className={`font-data-mono text-label-md font-bold ${
                                      student.status === 'Overdue'
                                        ? 'text-error'
                                        : 'text-secondary'
                                    }`}
                                  >
                                    {student.score}
                                    {student.status !== 'Overdue' && (
                                      <span className="text-outline font-normal text-[11px]">/50</span>
                                    )}
                                  </span>
                                ) : (
                                  <span className="font-data-mono text-label-sm text-outline">Unmarked</span>
                                )}
                              </td>

                              <td className="py-2.5 text-right">
                                {student.id === '2' && student.status === 'Reviewing' ? (
                                  <button
                                    onClick={handleGradeAyesha}
                                    className="px-2 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm transition-all shadow-xs cursor-pointer font-semibold"
                                  >
                                    Grade
                                  </button>
                                ) : student.status === 'Overdue' ? (
                                  <button
                                    onClick={() =>
                                      onShowToast(`Individual reminder dispatched to ${student.name} via WhatsApp.`)
                                    }
                                    className="px-2 py-1 rounded bg-error-container text-error hover:bg-error/20 font-label-sm text-label-sm transition-all font-semibold cursor-pointer"
                                  >
                                    Notify
                                  </button>
                                ) : student.status === 'Late' ? (
                                  <button
                                    onClick={() =>
                                      onShowToast(`Opening late submission evaluation sheet for ${student.name}.`)
                                    }
                                    className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all cursor-pointer font-medium"
                                  >
                                    Review
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      onShowToast(`Viewing graded submission sheet of ${student.name} (48/50).`)
                                    }
                                    className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm transition-all cursor-pointer font-medium"
                                  >
                                    View PDF
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Dispatch Defaulter Reminder CTA */}
                  <div className="pt-space-xs">
                    <button
                      onClick={() => setIsAlertDefaultersModalOpen(true)}
                      className="w-full py-2.5 px-space-md rounded-lg bg-on-surface text-surface-container-lowest font-label-md text-label-md font-semibold hover:bg-on-surface/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary-fixed">cell_tower</span>
                      <span>Dispatch SMS / WhatsApp (8 Non-Submitters)</span>
                    </button>
                    <p className="font-data-mono text-[10px] text-outline text-center mt-1.5">
                      Includes automatic guardian carbon-copy escalation
                    </p>
                  </div>
                </div>

                {/* Quick Faculty Note Card */}
                <div className="bg-surface-container-low rounded-xl p-space-md shadow-xs space-y-space-xs border border-outline-variant/20">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Faculty Marking Guidance
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Questions 4 and 7 test step-wise integration identities. Apply full credit if reduction formulas are cited accurately even with minor calculation drift.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-data-mono text-[11px] text-outline">Author: Rahul Sharma</span>
                    <button
                      onClick={() => onShowToast('Instruction edit modal opened for faculty authors.')}
                      className="font-label-sm text-label-sm text-primary font-semibold hover:underline cursor-pointer"
                    >
                      Edit Instruction
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

      {/* CREATE ASSIGNMENT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">add_circle</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Create New Coursework Unit
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Publish homework or practice lab worksheet across cohorts
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Assignment Title / Problem Set *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thermodynamics & Heat Capacity Problem Set"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Subject Track</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-2 py-2 bg-surface-container-low rounded-lg text-xs text-on-surface border border-outline-variant/30 focus:outline-none cursor-pointer"
                  >
                    <option>Mathematics (JEE Adv)</option>
                    <option>Physics Experimental</option>
                    <option>Organic Chemistry</option>
                    <option>General Studies X</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Cohort Batch</label>
                  <select
                    value={newCohort}
                    onChange={(e) => setNewCohort(e.target.value)}
                    className="w-full px-2 py-2 bg-surface-container-low rounded-lg text-xs text-on-surface border border-outline-variant/30 focus:outline-none cursor-pointer"
                  >
                    <option>JEE 2026-A (Morning)</option>
                    <option>NEET Foundation-01</option>
                    <option>Foundation 10-A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Max Score</label>
                  <input
                    type="number"
                    value={newMaxMarks}
                    onChange={(e) => setNewMaxMarks(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-sm text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="p-3 border border-dashed border-outline-variant/60 rounded-xl text-center bg-surface-container-low/50">
                <span className="material-symbols-outlined text-outline text-[24px]">upload_file</span>
                <p className="text-xs text-on-surface font-medium mt-1">Upload Question Bank / Rubric PDF</p>
                <p className="text-[10px] text-outline">Drag and drop or click to attach (Max 25MB)</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer"
                >
                  Publish to Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ALERT DEFAULTERS MODAL */}
      {isAlertDefaultersModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">cell_tower</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Defaulter Alert Dispatch
                </h3>
                <p className="font-body-sm text-body-sm text-outline">
                  Automated SMS &amp; WhatsApp Reminder
                </p>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Dispatches urgent submission notifications to all <strong>8 non-submitters</strong> in Batch JEE 2026-A for Calculus &amp; Integration Problem Set. Carbon-copies designated guardian phones.
            </p>

            <div className="p-3 bg-surface-container-low rounded-xl text-xs text-on-surface-variant space-y-1 border border-outline-variant/20">
              <span className="font-semibold text-on-surface block">Dispatch Summary:</span>
              <div className="flex justify-between">
                <span>Student WhatsApp Messages:</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between">
                <span>Parent SMS Escalations:</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between text-error font-semibold">
                <span>Hard Cutoff:</span>
                <span>18 Sep, 11:59 PM</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsAlertDefaultersModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setIsAlertDefaultersModalOpen(false);
                  onShowToast('Dispatched 8 SMS & WhatsApp alerts to student & parent phones!');
                }}
                className="px-4 py-2 rounded-lg bg-on-surface text-surface-container-lowest text-xs font-semibold hover:bg-on-surface/90 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">send</span>
                <span>Broadcast Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECTOR PDF PREVIEW MODAL */}
      {isInspectorPdfOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[24px]">picture_as_pdf</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    calculus_ps4_question_bank.pdf
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    2.4 MB • SHA-256 Verified Institutional Curriculum Asset
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsInspectorPdfOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 space-y-4">
              <div className="text-center space-y-1">
                <h4 className="font-bold text-on-surface text-base">APEX INSTITUTE OF TECHNOLOGY &amp; SKILLS</h4>
                <p className="text-xs text-outline">Department of Mathematics • Advanced JEE Problem Set 04</p>
              </div>

              <div className="space-y-2 text-xs text-on-surface leading-relaxed bg-surface-container-lowest p-4 rounded-lg shadow-xs">
                <p className="font-semibold text-primary">Problem 1 (5 Marks):</p>
                <p>Evaluate the definite integral ∫₀^(π/2) (sin³x)/(sin³x + cos³x) dx using King's property.</p>
                
                <p className="font-semibold text-primary pt-2">Problem 2 (10 Marks):</p>
                <p>Determine the bounded area enclosed between y² = 4ax and the line y = mx.</p>
              </div>

              <div className="flex items-center justify-between text-xs text-outline pt-2">
                <span>Authorized by Prof. Rahul Sharma</span>
                <span className="font-data-mono">Verified Node: #INS-7429</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => {
                  setIsInspectorPdfOpen(false);
                  onShowToast('Downloaded calculus_ps4_question_bank.pdf');
                }}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download PDF File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
