import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { useSidebar } from '../context/SidebarContext';

interface TimetableScheduleScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

interface SessionDetail {
  id: string;
  title: string;
  subtitle: string;
  subject: string;
  type: 'theory' | 'lab' | 'doubt' | 'double' | 'test';
  faculty: string;
  room: string;
  time: string;
  day: string;
  attendance?: string;
}

export const TimetableScheduleScreen: React.FC<TimetableScheduleScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  // Sidebar visibility state from shared context (desktop & mobile toggle support)
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // Drawer visibility state
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Clash resolution state inside drawer
  const [clashResolved, setClashResolved] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('10:00 – 11:00 AM');
  const [selectedFaculty, setSelectedFaculty] = useState('Rahul Sharma');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics (Calculus & Vectors)');
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState<'Weekly' | 'Daily' | 'Faculty' | 'Rooms & Labs'>('Weekly');
  const [activeCohort, setActiveCohort] = useState('Batch JEE 2026-A (Morning)');
  const [activeCampus, setActiveCampus] = useState('Siliguri HQ Campus');
  const [activeProgram, setActiveProgram] = useState('JEE Foundation & Advanced (2-Yr)');

  // Selected session for modal inspect
  const [inspectedSession, setInspectedSession] = useState<SessionDetail | null>(null);

  // Handle slot conflict resolution
  const handleApplyRecommendedSlot = () => {
    setClashResolved(true);
    setSelectedSlot('Friday 11:00 – 12:00 PM');
    onShowToast('Applied recommended slot: Friday 11:00 AM. Schedule clash successfully resolved!');
  };

  const handleSubstituteFaculty = () => {
    setSelectedFaculty('Vikram Verma (Sr. Math)');
    setClashResolved(true);
    onShowToast('Substituted faculty to Vikram Verma. Clash resolved on Wednesday 10:00 AM!');
  };

  const handleOverrideSchedule = () => {
    onShowToast('Admin override applied. Session forced into Wednesday 10:00 AM with conflict logged in registry.');
  };

  const handleExport = (format: string) => {
    setExportDropdownOpen(false);
    onShowToast(`Exporting Master Timetable in ${format} format...`);
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
        className={`fixed left-0 top-0 h-full w-[260px] bg-surface-container-lowest shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none border-r border-outline-variant/30 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="h-16 px-space-lg flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/20">
            <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => { onNavigate('dashboard'); setIsSidebarOpen(false); }}>
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
              onClick={() => onShowToast(`Current: ${activeCampus} (Branch #01 • 8 Active)`)}
              className="w-full p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors border border-outline-variant/20"
            >
              <div className="flex items-center gap-space-sm overflow-hidden">
                <span className="material-symbols-outlined text-primary text-[20px]">apartment</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                    {activeCampus}
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
                  onClick={() => onShowToast('Campus Directory')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    hub
                  </span>
                  <span className="font-label-md text-label-md">Campus Directory</span>
                </button>
                <button
                  onClick={() => onShowToast('Staff Governance portal.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    badge
                  </span>
                  <span className="font-label-md text-label-md">Staff Governance</span>
                </button>
              </nav>
            </div>

            {/* Academic Operations (TIMETABLE & SCHEDULE IS ACTIVE) */}
            <div className="space-y-space-xs">
              <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase font-semibold tracking-wider">
                Academic Operations
              </span>
              <nav className="space-y-0.5">
                {/* ACTIVE TAB */}
                <button
                  aria-current="page"
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-sm text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  <span className="font-label-md text-label-md">Timetable &amp; Schedule</span>
                </button>

                <button
                  onClick={() => onNavigate('assignments-coursework')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all group text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface">
                    assignment
                  </span>
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
                  onClick={() => onNavigate('teacher-portal')}
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
                  onClick={() => onShowToast('Fee Ledgers & Billing console.')}
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
      {/* 2. MAIN WORKSPACE CONTAINER */}
      {/* ========================================================================= */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pl-0 lg:pl-[260px]' : 'pl-0'
      }`}>
        {/* Fixed Top Header */}
        <header className={`fixed top-0 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-space-xl border-b border-outline-variant/20 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'left-0 lg:left-[260px]' : 'left-0'
        }`}>
          {/* Breadcrumbs & Sidebar Toggle */}
          <div className="flex items-center gap-space-md">
            {/* Show/Hide Sidebar Toggle Button (Visible on all screens) */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-2 -ml-1 mr-1 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center border border-outline-variant/30 shadow-xs"
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
                onClick={() => onShowToast('Siliguri HQ Campus')}
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
              onClick={() => onShowToast('Quick find active: search batches, faculty, or halls.')}
              className="relative flex items-center cursor-pointer"
            >
              <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-1.5 rounded-lg text-outline hover:text-on-surface transition-colors border border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span className="font-body-sm text-body-sm pr-6">
                  Quick find student, ledger, timetable...
                </span>
                <kbd className="font-data-mono text-[10px] bg-surface-container-lowest px-1.5 py-0.5 rounded shadow-sm text-on-surface font-semibold border border-outline-variant/30">
                  ⌘K
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-space-sm">
              <ThemeToggle
                variant="pill"
                onToggleCallback={(mode) => onShowToast(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode`)}
              />
              <button
                onClick={() => onShowToast('Schedule Conflict Notification: 1 room collision flagged in Hall 204.')}
                className="relative p-2 rounded-lg text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center font-semibold leading-none">
                  3
                </span>
              </button>
              <button
                onClick={() => onShowToast('Timetable Scheduling Rules & Room Capacity Matrix')}
                className="p-2 rounded-lg text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">help_outline</span>
              </button>
            </div>

            <div className="h-6 w-[1px] bg-outline-variant/40"></div>

            <div className="flex items-center gap-space-sm pl-space-xs">
              <img
                alt="Profile"
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
        {/* 3. MAIN WORKSPACE CONTENT */}
        {/* ========================================================================= */}
        <main className="w-full pt-16 bg-background min-h-screen px-space-xl py-space-xl">
          <div className="flex flex-col w-full gap-space-lg">
            {/* Top Title & Subtitle Banner */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
                    Master Timetable &amp; Classroom Schedules
                  </h1>
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                      clashResolved
                        ? 'bg-secondary-fixed text-on-secondary-fixed'
                        : 'bg-secondary-fixed text-on-secondary-fixed'
                    } font-label-sm text-label-sm font-semibold shadow-sm`}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    {clashResolved ? '100% Conflict Free • Synced' : 'Zero Active Clashes • 100% Validated'}
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                  Orchestrate weekly batch timetables, monitor real-time laboratory room allocations, and resolve
                  teacher schedule clashes.
                </p>
              </div>

              {/* Actions Toolbar */}
              <div className="flex items-center gap-space-sm flex-wrap">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer border border-outline-variant/20 font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">print</span>
                  <span>Print Master Routine</span>
                </button>

                {/* Export Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
                    className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer border border-outline-variant/20 font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">ios_share</span>
                    <span>Export Timetable</span>
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </button>
                  {exportDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-surface-container-lowest rounded-lg shadow-xl py-1 z-30 border border-outline-variant/30">
                      <button
                        onClick={() => handleExport('PDF Matrix Layout')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-on-surface hover:bg-surface-container-low font-body-sm text-body-sm text-left cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                        <span>PDF Matrix Layout</span>
                      </button>
                      <button
                        onClick={() => handleExport('Excel (.xlsx)')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-on-surface hover:bg-surface-container-low font-body-sm text-body-sm text-left cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-secondary">table_view</span>
                        <span>Excel (.xlsx) Spread</span>
                      </button>
                      <button
                        onClick={() => handleExport('iCal Feed')}
                        className="w-full flex items-center gap-2 px-3 py-2 text-on-surface hover:bg-surface-container-low font-body-sm text-body-sm text-left cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">event_repeat</span>
                        <span>iCal Universal Sync</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Add Class Session (Toggles Drawer) */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  id="openScheduleDrawerBtn"
                  className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Add Class Session</span>
                  <kbd className="font-data-mono text-[10px] bg-primary/40 px-1.5 py-0.5 rounded text-on-primary-container font-semibold">
                    ⌘N
                  </kbd>
                </button>
              </div>
            </div>

            {/* Filtration & View Segment Ribbon */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border border-outline-variant/20">
              <div className="flex flex-wrap items-center gap-space-sm">
                {/* Campus Selector */}
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-[18px]">apartment</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline font-medium">Campus</span>
                    <select
                      value={activeCampus}
                      onChange={(e) => {
                        setActiveCampus(e.target.value);
                        onShowToast(`Filtered timetable for: ${e.target.value}`);
                      }}
                      className="font-label-md text-label-md text-on-surface font-semibold bg-transparent border-none outline-none cursor-pointer pr-2"
                    >
                      <option value="Siliguri HQ Campus">Siliguri HQ Campus</option>
                      <option value="Binnaguri Branch Node">Binnaguri Branch Node</option>
                      <option value="Jalpaiguri City Annex">Jalpaiguri City Annex</option>
                    </select>
                  </div>
                </div>

                {/* Course Selector */}
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">auto_stories</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline font-medium">Program / Course</span>
                    <select
                      value={activeProgram}
                      onChange={(e) => {
                        setActiveProgram(e.target.value);
                        onShowToast(`Program filtered: ${e.target.value}`);
                      }}
                      className="font-label-md text-label-md text-on-surface font-semibold bg-transparent border-none outline-none cursor-pointer pr-2"
                    >
                      <option value="JEE Foundation & Advanced (2-Yr)">JEE Foundation &amp; Advanced (2-Yr)</option>
                      <option value="NEET Premier Medical (1-Yr)">NEET Premier Medical (1-Yr)</option>
                      <option value="Foundation Science (Class 9-10)">Foundation Science (Class 9-10)</option>
                    </select>
                  </div>
                </div>

                {/* Batch Selector */}
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-[18px]">groups</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline font-medium">Cohort Batch</span>
                    <select
                      value={activeCohort}
                      onChange={(e) => {
                        setActiveCohort(e.target.value);
                        onShowToast(`Switched cohort view to: ${e.target.value}`);
                      }}
                      className="font-label-md text-label-md text-on-surface font-semibold bg-transparent border-none outline-none cursor-pointer pr-2"
                    >
                      <option value="Batch JEE 2026-A (Morning)">Batch JEE 2026-A (Morning)</option>
                      <option value="Batch JEE 2026-B (Afternoon)">Batch JEE 2026-B (Afternoon)</option>
                      <option value="NEET 2026 Achievers">NEET 2026 Achievers</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Segmented Navigation & Calendar Scroller */}
              <div className="flex items-center gap-space-md flex-wrap justify-between lg:justify-end">
                <div className="bg-surface-container-low p-1 rounded-lg flex items-center gap-1 font-label-md text-label-md border border-outline-variant/20">
                  {(['Weekly', 'Daily', 'Faculty', 'Rooms & Labs'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveViewTab(tab);
                        onShowToast(`Switched view to ${tab} projection.`);
                      }}
                      className={`px-3 py-1 rounded transition-colors font-semibold cursor-pointer ${
                        activeViewTab === tab
                          ? 'bg-surface-container-lowest shadow-sm text-primary'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/20">
                  <button
                    onClick={() => onShowToast('Previous Week: 08 Sep – 13 Sep 2026')}
                    className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5 px-1">
                    <span className="material-symbols-outlined text-[18px] text-primary">calendar_today</span>
                    15 Sep – 20 Sep 2026 <span className="text-outline font-normal">(W38)</span>
                  </span>
                  <button
                    onClick={() => onShowToast('Next Week: 22 Sep – 27 Sep 2026')}
                    className="p-1 rounded hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                  <button
                    onClick={() => onShowToast('Navigated to current schedule day (Today).')}
                    className="ml-1 px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/20"
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>

            {/* Workspace Shell: Matrix Canvas + Real-Time Drawer Panel */}
            <div className="relative flex flex-col xl:flex-row gap-space-lg items-start">
              {/* Main Timetable Grid Box */}
              <div className="w-full xl:flex-1 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-outline-variant/20">
                {/* Grid Scroll Container */}
                <div className="overflow-x-auto w-full">
                  <div className="min-w-[940px]">
                    {/* Grid Header Row (Days of Week) */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold tracking-wider text-center py-2.5 shadow-sm sticky top-0 z-10 border-b border-outline-variant/20">
                      <div className="flex items-center justify-center font-data-mono text-outline">TIME</div>
                      <div className="flex flex-col items-center">
                        <span className="text-on-surface font-semibold">Monday</span>
                        <span className="text-[10px] font-normal text-outline">15 Sep</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-on-surface font-semibold">Tuesday</span>
                        <span className="text-[10px] font-normal text-outline">16 Sep</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-on-surface font-semibold">Wednesday</span>
                        <span className="text-[10px] font-normal text-outline">17 Sep</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-on-surface font-semibold">Thursday</span>
                        <span className="text-[10px] font-normal text-outline">18 Sep</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-on-surface font-semibold">Friday</span>
                        <span className="text-[10px] font-normal text-outline">19 Sep</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-on-surface font-semibold">Saturday</span>
                        <span className="text-[10px] font-normal text-outline">20 Sep</span>
                      </div>
                    </div>

                    {/* TIME SLOTS ROWS */}

                    {/* ========================================================= */}
                    {/* 09:00 - 10:00 AM */}
                    {/* ========================================================= */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] min-h-[96px] bg-surface-container-lowest hover:bg-surface-container-low/20 transition-colors border-b border-outline-variant/10">
                      <div className="flex flex-col justify-start items-center p-2 font-data-mono text-[11px] text-outline font-semibold bg-surface-container-low/40">
                        09:00 AM
                        <span className="text-[9px] font-normal text-outline/70">10:00 AM</span>
                      </div>

                      {/* Mon 09:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-mon-09',
                              title: 'Mathematics',
                              subtitle: 'Calculus & Vectors',
                              subject: 'Mathematics',
                              type: 'theory',
                              faculty: 'Rahul Sharma',
                              room: 'Hall 204',
                              time: '09:00 – 10:00 AM',
                              day: 'Monday',
                              attendance: '38/40 Verified',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                              <span className="font-data-mono text-[10px] text-secondary font-semibold flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-[12px]">check_circle</span> 38/40
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Mathematics
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Calculus &amp; Vectors
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Rahul Sharma</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Tue 09:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-tue-09',
                              title: 'Adv Mechanics',
                              subtitle: 'Rotational Dynamics',
                              subject: 'Physics',
                              type: 'theory',
                              faculty: 'Amit Kumar',
                              room: 'Hall 204',
                              time: '09:00 – 10:00 AM',
                              day: 'Tuesday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                              <span className="font-data-mono text-[10px] text-outline">Planned</span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Adv Mechanics
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Rotational Dynamics
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Amit Kumar</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Wed 09:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-wed-09',
                              title: 'Math Mentorship',
                              subtitle: 'Trigonometric Limits',
                              subject: 'Mathematics',
                              type: 'doubt',
                              faculty: 'Rahul Sharma',
                              room: 'Study 12',
                              time: '09:00 – 10:00 AM',
                              day: 'Wednesday',
                            })
                          }
                          className="h-full bg-surface-container-low/50 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[10px] font-semibold">
                                Tut/Doubt
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug">
                              Math Mentorship
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Trigonometric Limits
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Rahul Sharma</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Study 12</span>
                          </div>
                        </div>
                      </div>

                      {/* Thu 09:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() => {
                            setIsDrawerOpen(true);
                            onShowToast('Configuring slot for Thursday 09:00 AM');
                          }}
                          className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                            add
                          </span>
                        </div>
                      </div>

                      {/* Fri 09:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-fri-09',
                              title: 'Mathematics',
                              subtitle: 'Integral Calculus',
                              subject: 'Mathematics',
                              type: 'theory',
                              faculty: 'Rahul Sharma',
                              room: 'Hall 204',
                              time: '09:00 – 10:00 AM',
                              day: 'Friday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Mathematics
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Integral Calculus
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Rahul Sharma</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Sat 09:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() => {
                            setIsDrawerOpen(true);
                            onShowToast('Configuring slot for Saturday 09:00 AM');
                          }}
                          className="h-full bg-surface-container-low/30 hover:bg-surface-container-low rounded-lg p-2 flex items-center justify-center cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                            add
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* 10:00 - 11:00 AM */}
                    {/* ========================================================= */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] min-h-[96px] bg-surface-container-lowest hover:bg-surface-container-low/20 transition-colors border-b border-outline-variant/10">
                      <div className="flex flex-col justify-start items-center p-2 font-data-mono text-[11px] text-outline font-semibold bg-surface-container-low/40">
                        10:00 AM
                        <span className="text-[9px] font-normal text-outline/70">11:00 AM</span>
                      </div>

                      {/* Mon 10:00 AM: Practical Lab */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-mon-10',
                              title: 'Physics (Optics)',
                              subtitle: 'Wave Optics & Laser Grid',
                              subject: 'Physics',
                              type: 'lab',
                              faculty: 'Amit Kumar',
                              room: 'Physics Lab 02',
                              time: '10:00 – 11:00 AM',
                              day: 'Monday',
                            })
                          }
                          className="h-full bg-surface-container-highest/50 hover:bg-surface-container-highest rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary font-label-sm text-[10px] font-semibold">
                                Practical Lab
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Physics (Optics)
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Wave Optics &amp; Laser Grid
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Amit Kumar</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Physics Lab 02</span>
                          </div>
                        </div>
                      </div>

                      {/* Tue 10:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() => {
                            setIsDrawerOpen(true);
                            onShowToast('Configuring slot for Tuesday 10:00 AM');
                          }}
                          className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                            add
                          </span>
                        </div>
                      </div>

                      {/* Wed 10:00 AM: Guided Practice (or clashes if forced) */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-wed-10',
                              title: 'Guided Practice',
                              subtitle: 'Self Module Work',
                              subject: 'Library Study',
                              type: 'theory',
                              faculty: 'Batch Proctor',
                              room: 'Central Annex',
                              time: '10:00 – 11:00 AM',
                              day: 'Wednesday',
                            })
                          }
                          className="h-full bg-surface-container-high/40 rounded-lg p-2 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-outline"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-[10px] font-semibold">
                                Library Self-Study
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold">
                              Guided Practice
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant">Self Module Work</p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="text-on-surface">Batch Proctor</span>
                            <span className="bg-surface-container-lowest px-1 rounded">Central Annex</span>
                          </div>
                        </div>
                      </div>

                      {/* Thu 10:00 AM: Physical Chemistry */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-thu-10',
                              title: 'Physical Chemistry',
                              subtitle: 'Chemical Kinetics II',
                              subject: 'Chemistry',
                              type: 'theory',
                              faculty: 'Dr. Sneha Sen',
                              room: 'Hall 204',
                              time: '10:00 – 11:00 AM',
                              day: 'Thursday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Physical Chemistry
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Chemical Kinetics II
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Dr. Sneha Sen</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Fri 10:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-fri-10',
                              title: 'Thermodynamics',
                              subtitle: 'Carnot Cycles',
                              subject: 'Physics',
                              type: 'theory',
                              faculty: 'Amit Kumar',
                              room: 'Hall 204',
                              time: '10:00 – 11:00 AM',
                              day: 'Friday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Thermodynamics
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">Carnot Cycles</p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Amit Kumar</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Sat 10:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() => {
                            setIsDrawerOpen(true);
                            onShowToast('Configuring slot for Saturday 10:00 AM');
                          }}
                          className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                            add
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* 11:00 - 12:00 PM */}
                    {/* ========================================================= */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] min-h-[96px] bg-surface-container-lowest hover:bg-surface-container-low/20 transition-colors border-b border-outline-variant/10">
                      <div className="flex flex-col justify-start items-center p-2 font-data-mono text-[11px] text-outline font-semibold bg-surface-container-low/40">
                        11:00 AM
                        <span className="text-[9px] font-normal text-outline/70">12:00 PM</span>
                      </div>

                      {/* Mon 11:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-mon-11',
                              title: 'Organic Chemistry',
                              subtitle: 'Reaction Mechanisms',
                              subject: 'Chemistry',
                              type: 'theory',
                              faculty: 'Dr. Sneha Sen',
                              room: 'Hall 204',
                              time: '11:00 – 12:00 PM',
                              day: 'Monday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Organic Chemistry
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Reaction Mechanisms
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Dr. Sneha Sen</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Tue 11:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-tue-11',
                              title: 'Mathematics',
                              subtitle: '3D Coordinate Geometry',
                              subject: 'Mathematics',
                              type: 'theory',
                              faculty: 'Rahul Sharma',
                              room: 'Hall 204',
                              time: '11:00 – 12:00 PM',
                              day: 'Tuesday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Mathematics
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              3D Coordinate Geometry
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Rahul Sharma</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Wed 11:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-wed-11',
                              title: 'Organic Chemistry',
                              subtitle: 'Hydrocarbons & Alkynes',
                              subject: 'Chemistry',
                              type: 'theory',
                              faculty: 'Dr. Sneha Sen',
                              room: 'Hall 204',
                              time: '11:00 – 12:00 PM',
                              day: 'Wednesday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Organic Chemistry
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Hydrocarbons &amp; Alkynes
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Dr. Sneha Sen</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Thu 11:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-thu-11',
                              title: 'Electrostatics',
                              subtitle: 'Gauss Law & Flux',
                              subject: 'Physics',
                              type: 'theory',
                              faculty: 'Amit Kumar',
                              room: 'Hall 204',
                              time: '11:00 – 12:00 PM',
                              day: 'Thursday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold line-clamp-1">
                              Electrostatics
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Gauss Law &amp; Flux
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Amit Kumar</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Fri 11:00 AM (Target Slot for Clash Resolution!) */}
                      <div className="p-1.5">
                        {clashResolved ? (
                          <div
                            onClick={() =>
                              setInspectedSession({
                                id: 'sess-fri-11-new',
                                title: selectedSubject.split(' (')[0],
                                subtitle: 'Calculus & Vectors (Assigned Slot)',
                                subject: 'Mathematics',
                                type: 'theory',
                                faculty: selectedFaculty,
                                room: 'Room 204 (Smartboard A)',
                                time: '11:00 – 12:00 PM',
                                day: 'Friday',
                              })
                            }
                            className="h-full bg-secondary-container/40 hover:bg-secondary-container/60 rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-secondary/40 ring-1 ring-secondary/30"
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-[10px] font-semibold">
                                  Resolved Slot
                                </span>
                                <span className="material-symbols-outlined text-[14px] text-secondary">
                                  check_circle
                                </span>
                              </div>
                              <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                                {selectedSubject.split(' (')[0]}
                              </h4>
                              <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                                Calculus &amp; Vectors
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                              <span className="truncate font-medium text-on-surface">{selectedFaculty}</span>
                              <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Room 204</span>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setIsDrawerOpen(true);
                              handleApplyRecommendedSlot();
                            }}
                            className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex flex-col items-center justify-center cursor-pointer transition-colors group border border-dashed border-outline-variant/40"
                            title="Auto-suggested resolution slot"
                          >
                            <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                              add
                            </span>
                            <span className="text-[10px] text-outline font-medium">Free Slot</span>
                          </div>
                        )}
                      </div>

                      {/* Sat 11:00 AM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-sat-11',
                              title: 'Unit Assessment',
                              subtitle: 'OMR Mock Series',
                              subject: 'Examination Cell',
                              type: 'test',
                              faculty: 'Exam Cell',
                              room: 'Auditorium B',
                              time: '11:00 – 12:00 PM',
                              day: 'Saturday',
                            })
                          }
                          className="h-full bg-secondary-fixed/30 hover:bg-secondary-fixed/50 rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[10px] font-semibold">
                                Weekly Test
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold">
                              Unit Assessment
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant">OMR Mock Series</p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="text-on-surface">Exam Cell</span>
                            <span className="bg-surface-container-lowest px-1 rounded">Auditorium B</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* 12:00 - 01:00 PM */}
                    {/* ========================================================= */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] min-h-[96px] bg-surface-container-lowest hover:bg-surface-container-low/20 transition-colors border-b border-outline-variant/10">
                      <div className="flex flex-col justify-start items-center p-2 font-data-mono text-[11px] text-outline font-semibold bg-surface-container-low/40">
                        12:00 PM
                        <span className="text-[9px] font-normal text-outline/70">01:00 PM</span>
                      </div>

                      {/* Mon 12:00 PM */}
                      <div className="p-1.5">
                        <div
                          onClick={() => {
                            setIsDrawerOpen(true);
                            onShowToast('Configuring slot for Monday 12:00 PM');
                          }}
                          className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                            add
                          </span>
                        </div>
                      </div>

                      {/* Tue 12:00 PM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-tue-12',
                              title: 'Inorganic Chem',
                              subtitle: 'Periodic Classification',
                              subject: 'Chemistry',
                              type: 'theory',
                              faculty: 'Dr. Sneha Sen',
                              room: 'Hall 204',
                              time: '12:00 – 01:00 PM',
                              day: 'Tuesday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Inorganic Chem
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Periodic Classification
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Dr. Sneha Sen</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Wed 12:00 PM */}
                      <div className="p-1.5">
                        <div
                          onClick={() => {
                            setIsDrawerOpen(true);
                            onShowToast('Configuring slot for Wednesday 12:00 PM');
                          }}
                          className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                            add
                          </span>
                        </div>
                      </div>

                      {/* Thu 12:00 PM */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-thu-12',
                              title: 'Mathematics',
                              subtitle: 'Matrices & Determinants',
                              subject: 'Mathematics',
                              type: 'theory',
                              faculty: 'Rahul Sharma',
                              room: 'Hall 204',
                              time: '12:00 – 01:00 PM',
                              day: 'Thursday',
                            })
                          }
                          className="h-full bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm transition-all group cursor-pointer relative overflow-hidden border border-outline-variant/10"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-semibold">
                                Theory
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug line-clamp-1">
                              Mathematics
                            </h4>
                            <p className="font-body-sm text-[11px] text-on-surface-variant truncate">
                              Matrices &amp; Determinants
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 font-label-sm text-[10px] text-outline">
                            <span className="truncate font-medium text-on-surface">Rahul Sharma</span>
                            <span className="bg-surface-container-lowest px-1 rounded shadow-sm">Hall 204</span>
                          </div>
                        </div>
                      </div>

                      {/* Fri 12:00 PM */}
                      <div className="p-1.5">
                        <div
                          onClick={() => {
                            setIsDrawerOpen(true);
                            onShowToast('Configuring slot for Friday 12:00 PM');
                          }}
                          className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                            add
                          </span>
                        </div>
                      </div>

                      {/* Sat 12:00 PM */}
                      <div className="p-1.5">
                        <div
                          onClick={() => {
                            setIsDrawerOpen(true);
                            onShowToast('Configuring slot for Saturday 12:00 PM');
                          }}
                          className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer transition-colors group"
                        >
                          <span className="material-symbols-outlined text-[18px] text-outline/40 group-hover:text-primary transition-colors">
                            add
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* 01:00 PM - 02:00 PM: Institution-Wide Recess / Lunch Strip */}
                    {/* ========================================================= */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] min-h-[46px] bg-surface-container-high/40 border-b border-outline-variant/20">
                      <div className="flex items-center justify-center font-data-mono text-[11px] text-outline font-semibold bg-surface-container-low/60">
                        01:00 PM
                      </div>
                      <div className="col-span-6 flex items-center justify-center gap-2 bg-[radial-gradient(#c3c6d7_1px,transparent_1px)] [background-size:12px_12px] px-4 py-1 text-on-surface-variant/80 font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                        <span className="material-symbols-outlined text-[16px] text-outline">restaurant</span>
                        <span>Academic Recess • Lunch • Facility Sanitization Block</span>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* 02:00 - 04:00 PM: Double Block / Labs */}
                    {/* ========================================================= */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] min-h-[160px] bg-surface-container-lowest hover:bg-surface-container-low/20 transition-colors border-b border-outline-variant/10">
                      <div className="flex flex-col justify-between items-center py-4 font-data-mono text-[11px] text-outline font-semibold bg-surface-container-low/40">
                        <span>02:00 PM</span>
                        <span className="text-[9px] font-normal text-outline/60">Double</span>
                        <span>04:00 PM</span>
                      </div>

                      {/* Mon 02-04 PM */}
                      <div className="p-1.5 flex flex-col gap-1.5">
                        <div
                          onClick={() => setIsDrawerOpen(true)}
                          className="h-1/2 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline/40">add</span>
                        </div>
                        <div
                          onClick={() => setIsDrawerOpen(true)}
                          className="h-1/2 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline/40">add</span>
                        </div>
                      </div>

                      {/* Tue 02-04 PM */}
                      <div className="p-1.5 flex flex-col gap-1.5">
                        <div
                          onClick={() => setIsDrawerOpen(true)}
                          className="h-1/2 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline/40">add</span>
                        </div>
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-tue-03',
                              title: 'Math Helpdesk',
                              subtitle: 'Doubt Clinic Session',
                              subject: 'Mathematics',
                              type: 'doubt',
                              faculty: 'Rahul Sharma',
                              room: 'Hall 204',
                              time: '03:00 – 04:00 PM',
                              day: 'Tuesday',
                            })
                          }
                          className="h-1/2 bg-surface-container-high/60 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm relative overflow-hidden cursor-pointer"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
                          <div>
                            <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[9px] font-semibold">
                              Doubt Clinic
                            </span>
                            <h4 className="font-headline-sm text-[12px] text-on-surface font-semibold truncate">
                              Math Helpdesk
                            </h4>
                          </div>
                          <span className="text-[10px] text-outline">Hall 204</span>
                        </div>
                      </div>

                      {/* Wed 02:00-04:00 PM: 2-HOUR DOUBLE BLOCK */}
                      <div className="p-1.5">
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-wed-double',
                              title: 'Computer Science',
                              subtitle:
                                'Python & Data Structures: Recursion Trees & Algorithmic Complexity',
                              subject: 'Computer Science',
                              type: 'double',
                              faculty: 'Debolina Mitra',
                              room: 'Computer Lab 1 (Node 40)',
                              time: '02:00 – 04:00 PM',
                              day: 'Wednesday',
                            })
                          }
                          className="h-full bg-tertiary-container text-on-tertiary rounded-lg p-3 flex flex-col justify-between shadow-md relative overflow-hidden group cursor-pointer"
                        >
                          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-md pointer-events-none"></div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="px-2 py-0.5 rounded-full bg-white/20 text-on-tertiary font-label-sm text-[10px] font-semibold tracking-wider uppercase">
                                2-Hour Double Block
                              </span>
                              <span className="font-data-mono text-[10px] text-on-tertiary/90 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">terminal</span> CS Node
                              </span>
                            </div>
                            <h4 className="font-headline-md text-headline-md text-on-tertiary leading-tight font-semibold">
                              Computer Science
                            </h4>
                            <p className="font-body-md text-body-md text-on-tertiary-container mt-1 line-clamp-2">
                              Python &amp; Data Structures: Recursion Trees &amp; Algorithmic Complexity
                            </p>
                          </div>
                          <div className="pt-3 flex items-center justify-between text-on-tertiary/90 font-label-sm text-label-sm">
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[16px]">account_circle</span>
                              <span className="font-semibold">Debolina Mitra</span>
                            </div>
                            <span className="bg-black/20 px-2 py-0.5 rounded text-[11px] font-data-mono">
                              Computer Lab 1 (Node 40)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Thu 02-04 PM */}
                      <div className="p-1.5 flex flex-col gap-1.5">
                        <div
                          onClick={() => setIsDrawerOpen(true)}
                          className="h-1/2 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline/40">add</span>
                        </div>
                        <div
                          onClick={() => setIsDrawerOpen(true)}
                          className="h-1/2 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline/40">add</span>
                        </div>
                      </div>

                      {/* Fri 02:00-04:00 PM */}
                      <div className="p-1.5 flex flex-col gap-1.5">
                        <div
                          onClick={() => setIsDrawerOpen(true)}
                          className="h-1/2 rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-outline/40">add</span>
                        </div>
                        <div
                          onClick={() =>
                            setInspectedSession({
                              id: 'sess-fri-03',
                              title: 'Mock Paper Discussion',
                              subtitle: 'JEE Advanced Full Paper Analysis',
                              subject: 'Mathematics',
                              type: 'theory',
                              faculty: 'Rahul Sharma',
                              room: 'Seminar Aud.',
                              time: '03:00 – 04:00 PM',
                              day: 'Friday',
                            })
                          }
                          className="h-1/2 bg-surface-container-high/70 hover:bg-surface-container-high rounded-lg p-2 flex flex-col justify-between shadow-sm relative overflow-hidden cursor-pointer group"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                          <div>
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-label-sm text-[9px] font-semibold">
                                Special Session
                              </span>
                            </div>
                            <h4 className="font-headline-sm text-[12px] text-on-surface font-semibold truncate">
                              Mock Paper Discussion
                            </h4>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-outline">
                            <span className="text-on-surface truncate">Rahul Sharma</span>
                            <span className="bg-surface-container-lowest px-1 rounded truncate">Seminar Aud.</span>
                          </div>
                        </div>
                      </div>

                      {/* Sat 02-04 PM */}
                      <div className="p-1.5 flex flex-col gap-1.5">
                        <div className="h-full rounded-lg bg-surface-container-low/20 flex items-center justify-center text-outline/40 font-label-sm text-[11px]">
                          Weekend Open Lab
                        </div>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* 04:00 - 05:00 PM */}
                    {/* ========================================================= */}
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] min-h-[96px] bg-surface-container-lowest hover:bg-surface-container-low/20 transition-colors">
                      <div className="flex flex-col justify-start items-center p-2 font-data-mono text-[11px] text-outline font-semibold bg-surface-container-low/40">
                        04:00 PM
                        <span className="text-[9px] font-normal text-outline/70">05:00 PM</span>
                      </div>
                      {[1, 2, 3, 4, 5].map((idx) => (
                        <div key={idx} className="p-1.5">
                          <div
                            onClick={() => setIsDrawerOpen(true)}
                            className="h-full rounded-lg bg-surface-container-low/30 hover:bg-surface-container-low p-2 flex items-center justify-center cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px] text-outline/40">add</span>
                          </div>
                        </div>
                      ))}
                      <div className="p-1.5">
                        <div className="h-full rounded-lg bg-surface-container-low/20 flex items-center justify-center text-outline/40 font-label-sm text-[11px]">
                          Dismissal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Matrix Interactive Helper Bar */}
                <div className="px-space-md py-2.5 bg-surface-container-low/50 flex flex-wrap items-center justify-between text-on-surface-variant font-label-sm text-label-sm gap-2 border-t border-outline-variant/20">
                  <div className="flex items-center gap-space-md">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Theory Lectures
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span> Lab Practicals
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Test / Doubt Helpdesk
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-outline">
                    <span className="material-symbols-outlined text-[16px]">touch_app</span>
                    <span>Click any session block to inspect faculty profile, move slots, or substitute.</span>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* SCHEDULE CLASS & REAL-TIME CLASH RESOLVER DRAWER PANEL (w-[380px]) */}
              {/* ========================================================================= */}
              {isDrawerOpen && (
                <div
                  id="scheduleDrawer"
                  className="w-full xl:w-[380px] bg-surface-container-lowest rounded-xl shadow-xl p-space-lg flex flex-col gap-space-md relative shrink-0 border border-outline-variant/30 animate-in fade-in slide-in-from-right duration-200"
                >
                  {/* Drawer Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Schedule New Session
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-data-mono text-[11px] font-semibold">
                          #SESS-JEE-942
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Real-time conflict validation active
                      </span>
                    </div>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="p-1 rounded-lg text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
                      id="closeScheduleDrawerBtn"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  {/* LIVE CONFLICT ALERT CALLOUT (UX HIGHLIGHT) */}
                  {!clashResolved ? (
                    <div className="bg-error-container text-on-error-container p-3 rounded-lg flex items-start gap-2.5 shadow-sm border border-error/20">
                      <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5">warning</span>
                      <div className="flex flex-col space-y-1 text-left">
                        <div className="font-label-md text-label-md font-semibold text-error leading-tight">
                          Clash Warning Detected
                        </div>
                        <p className="font-body-sm text-[12px] leading-relaxed">
                          <span className="font-semibold">{selectedFaculty}</span> is already allocated to{' '}
                          <span className="font-semibold">NEET Foundation (Room 301)</span> on{' '}
                          <span className="underline">Wednesdays 10:00–11:00 AM</span>.
                        </p>
                        <div className="pt-1.5 flex flex-col gap-1 text-[11px]">
                          <span className="font-medium text-on-error-container/80">
                            • Auto-suggested slot:{' '}
                            <button
                              onClick={handleApplyRecommendedSlot}
                              className="font-bold underline text-on-error-container hover:text-primary cursor-pointer text-left inline"
                            >
                              Friday 11:00 AM
                            </button>
                          </span>
                          <span className="font-medium text-on-error-container/80">
                            • Or substitute:{' '}
                            <button
                              onClick={handleSubstituteFaculty}
                              className="font-bold underline text-on-error-container hover:text-primary cursor-pointer text-left inline"
                            >
                              Vikram Verma (Sr. Math)
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-secondary-container/40 text-on-secondary-container p-3 rounded-lg flex items-start gap-2.5 shadow-sm border border-secondary/30">
                      <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <div className="flex flex-col space-y-0.5 text-left">
                        <div className="font-label-md text-label-md font-semibold text-secondary leading-tight">
                          Schedule Clash Resolved
                        </div>
                        <p className="font-body-sm text-[12px] leading-relaxed">
                          Allocated to <span className="font-semibold">{selectedSlot}</span> with faculty{' '}
                          <span className="font-semibold">{selectedFaculty}</span>. All institutional constraints
                          satisfied.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Form Inputs */}
                  <div className="flex flex-col gap-3 font-body-md text-body-md">
                    {/* Course & Batch (Read-only pills) */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                          Course
                        </label>
                        <div className="px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md font-medium truncate border border-outline-variant/20">
                          JEE Foundation
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                          Target Batch
                        </label>
                        <div className="px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md font-medium truncate border border-outline-variant/20">
                          JEE 2026-A
                        </div>
                      </div>
                    </div>

                    {/* Subject Selection */}
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Subject Module
                      </label>
                      <div className="relative">
                        <select
                          value={selectedSubject}
                          onChange={(e) => setSelectedSubject(e.target.value)}
                          className="w-full bg-surface-container-lowest px-3 py-2 rounded-lg font-label-md text-label-md text-on-surface shadow-sm focus:outline-none appearance-none cursor-pointer border border-outline-variant/20"
                        >
                          <option>Mathematics (Calculus &amp; Vectors)</option>
                          <option>Physics (Electromagnetism)</option>
                          <option>Physical Chemistry</option>
                          <option>Organic Chemistry</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[18px] text-outline pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Faculty Selection with Avatar */}
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Assigned Faculty
                      </label>
                      <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-8 h-8 rounded-full object-cover shadow-sm"
                            alt="Assigned Lecturer"
                            referrerPolicy="no-referrer"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs_YN51so15tKmt8Ii2c8gsweGx3eFXQDaFICHgr9ITQOGL21Ng8ArtfJslBjIZNCSyG8tBMg0nNhK7BGq-eX__4DoQb4292-Bj2r3xHne1fUGn-JmRGIihC56RvvQpn1ZbU1MK_NRNT_R9qzHNWckoYKEG5YUiRPJlcIIlglR2kktleKLIq0XV8z6EJMBrrJZVdeqZzTDKEsCre-dGrYM9zgBBY0p-qbM7qQ0G9G1rW-QpU64RQnO"
                          />
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                              {selectedFaculty}
                            </span>
                            <span
                              className={`font-label-sm text-[10px] ${
                                clashResolved ? 'text-secondary' : 'text-error'
                              } font-medium`}
                            >
                              {clashResolved ? 'Available & Verified' : '1 Active Clashing Slot'}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (selectedFaculty === 'Rahul Sharma') {
                              handleSubstituteFaculty();
                            } else {
                              setSelectedFaculty('Rahul Sharma');
                              setClashResolved(false);
                            }
                          }}
                          className="font-label-sm text-label-sm text-primary font-semibold hover:underline cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                    </div>

                    {/* Classroom / Lab Allocation & Occupancy Progress Bar */}
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Classroom / Lab Allocation
                      </label>
                      <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">meeting_room</span>
                            <span className="font-label-md text-label-md text-on-surface font-semibold">
                              Room 204 (Smartboard A)
                            </span>
                          </div>
                          <span className="font-label-sm text-[10px] text-outline">Cap: 45 Students</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-[11px] font-label-sm text-on-surface-variant">
                            <span>Weekly Occupancy</span>
                            <span className="font-bold text-primary">82% Booked</span>
                          </div>
                          <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary-container h-1.5 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Schedule Recurrence & Slot */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">Days</label>
                        <div className="px-2.5 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-[11px] font-medium leading-tight border border-outline-variant/20">
                          Mon, Wed, Fri (Recurring)
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-outline uppercase font-semibold">Slot</label>
                        <div
                          className={`px-2.5 py-1.5 rounded-lg bg-surface-container-low ${
                            clashResolved ? 'text-secondary' : 'text-error'
                          } font-label-md text-[11px] font-semibold flex items-center justify-between border border-outline-variant/20`}
                        >
                          {selectedSlot}
                          <span
                            className={`material-symbols-outlined text-[14px] ${
                              clashResolved ? 'text-secondary' : 'text-error'
                            }`}
                          >
                            {clashResolved ? 'check' : 'priority_high'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Drawer Action Buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    {!clashResolved && (
                      <button
                        onClick={handleApplyRecommendedSlot}
                        className="w-full py-2 px-3 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                        <span>Apply Recommended Slot (Fri 11:00)</span>
                      </button>
                    )}

                    {clashResolved && (
                      <button
                        onClick={() => {
                          setIsDrawerOpen(false);
                          onShowToast('Session #SESS-JEE-942 scheduled into Master Timetable & verified without collisions!');
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Confirm &amp; Publish Schedule</span>
                      </button>
                    )}

                    {!clashResolved && (
                      <button
                        onClick={handleOverrideSchedule}
                        className="w-full py-2 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-error font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-outline-variant/20"
                      >
                        <span className="material-symbols-outlined text-[18px]">rule</span>
                        <span>Override &amp; Force Schedule</span>
                      </button>
                    )}

                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      id="cancelScheduleDrawerBtn"
                      className="w-full py-1.5 text-center text-outline hover:text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
                    >
                      Cancel &amp; Discard
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Analytics Bar & Institutional Utilization Footer */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/20">
              <div className="flex flex-wrap items-center gap-space-lg text-on-surface font-body-sm text-body-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-[15px] font-semibold leading-none">36.0 Hrs</span>
                    <span className="text-[11px] text-outline">Total Weekly Lectures</span>
                  </div>
                </div>
                <div className="h-7 w-[1px] bg-outline-variant/30 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">monitoring</span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-[15px] font-semibold leading-none text-secondary">
                      92% Optimal
                    </span>
                    <span className="text-[11px] text-outline">Faculty Utilization Rate</span>
                  </div>
                </div>
                <div className="h-7 w-[1px] bg-outline-variant/30 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">science</span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-[15px] font-semibold leading-none">4 Free Units</span>
                    <span className="text-[11px] text-outline">Lab &amp; Terminal Availability</span>
                  </div>
                </div>
              </div>

              {/* Quick Legend / Mode Status Indicator */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-secondary text-[16px]">sync_saved_locally</span>
                  Autosaved to Siliguri HQ Node (v4.8.2)
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. SESSION INSPECTION MODAL DIALOG */}
      {/* ========================================================================= */}
      {inspectedSession && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">event_note</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    {inspectedSession.title}
                  </h3>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">
                    {inspectedSession.day} • {inspectedSession.time} • {inspectedSession.room}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectedSession(null)}
                className="p-1 rounded-lg text-outline hover:bg-surface-container-low cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3 font-body-sm">
              <div className="p-3 bg-surface-container-low rounded-lg space-y-1">
                <span className="font-label-sm text-outline uppercase font-semibold text-[11px]">Topic Scope</span>
                <p className="font-body-md text-on-surface font-medium">{inspectedSession.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="font-label-sm text-outline text-[10px] uppercase font-semibold">Assigned Faculty</span>
                  <p className="font-label-md text-on-surface font-semibold mt-0.5">{inspectedSession.faculty}</p>
                  <span className="text-[11px] text-secondary font-medium">Verified for Session</span>
                </div>
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="font-label-sm text-outline text-[10px] uppercase font-semibold">Classroom Facility</span>
                  <p className="font-label-md text-on-surface font-semibold mt-0.5">{inspectedSession.room}</p>
                  <span className="text-[11px] text-primary font-medium">Smart Podium Active</span>
                </div>
              </div>

              {inspectedSession.attendance && (
                <div className="flex items-center justify-between p-2.5 bg-secondary-container/30 rounded-lg text-on-secondary-container">
                  <span className="font-semibold text-[12px] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">how_to_reg</span> Attendance Sync
                  </span>
                  <span className="font-data-mono font-bold text-[12px]">{inspectedSession.attendance}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/20">
              <button
                onClick={() => {
                  setInspectedSession(null);
                  onShowToast(`Reschedule request initiated for ${inspectedSession.title}.`);
                }}
                className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md font-semibold cursor-pointer"
              >
                Reschedule Slot
              </button>
              <button
                onClick={() => {
                  setInspectedSession(null);
                  onNavigate('teacher-portal');
                }}
                className="px-4 py-1.5 bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold cursor-pointer shadow-sm"
              >
                Open in Teacher Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
