import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { useSidebar } from '../context/SidebarContext';

interface StudentPortalScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

export const StudentPortalScreen: React.FC<StudentPortalScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // State for Fee payment
  const [isFeePaid, setIsFeePaid] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // State for Assignment submission
  const [activeDeliverableTab, setActiveDeliverableTab] = useState<'all' | 'submitted'>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploadedSet402, setHasUploadedSet402] = useState(false);

  // State for Lecture Notes modal
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  // State for Admit Card modal
  const [isAdmitCardModalOpen, setIsAdmitCardModalOpen] = useState(false);

  const handleApprovePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setIsPaymentModalOpen(false);
      setIsFeePaid(true);
      setPaymentSuccess(false);
      onShowToast('Payment of ₹4,500 settled via UPI. Receipt #REC-2026-001285 issued.');
    }, 1200);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setHasUploadedSet402(true);
      onShowToast('Calculus Problem Set #SET-402 submitted successfully! Time-stamped and queued for Rahul Sharma.');
    }, 1200);
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
            <div
              className="flex items-center gap-space-sm cursor-pointer"
              onClick={() => {
                onNavigate('dashboard');
                setIsSidebarOpen(false);
              }}
            >
              <img
                alt="Brand logo"
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
              onClick={() => onShowToast('Siliguri HQ Campus selected (Branch #01 • 8 Active)')}
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
                  onClick={() => onShowToast('Campus Directory loaded.')}
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

            {/* Academic Operations */}
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

            {/* Institutional Portals (STUDENT PORTAL IS ACTIVE) */}
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

                {/* ACTIVE TAB: Student Portal */}
                <button
                  aria-current="page"
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 bg-primary-container text-on-primary font-semibold rounded-lg shadow-xs text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">person</span>
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
                  onClick={() => onShowToast('Fee Ledgers & Billing Console')}
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
        {/* Fixed Top Header */}
        <header className={`fixed top-0 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-space-xl border-b border-outline-variant/20 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'left-0 lg:left-[260px]' : 'left-0'
        }`}>
          {/* Breadcrumbs */}
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
              onClick={() => onShowToast('Quick find: Aarav Sharma')}
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
              <ThemeToggle
                variant="pill"
                onToggleCallback={(mode) => onShowToast(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode`)}
              />
              <button
                onClick={() => onShowToast('3 Priority Alerts: Fee due in 4 days, Physics Live Now, Calculus HW due tomorrow.')}
                className="relative p-2 rounded-lg text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center font-semibold leading-none">
                  3
                </span>
              </button>
              <button
                onClick={() => onShowToast('Help desk and student handbook')}
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
        {/* 3. STUDENT PORTAL MAIN WORKSPACE CANVAS */}
        {/* ========================================================================= */}
        <main className="w-full pt-16 bg-background min-h-screen px-space-xl py-space-xl">
          <div className="flex flex-col w-full space-y-space-xl">
            {/* Urgent Action Banner with Micro-interaction */}
            <div className="relative overflow-hidden rounded-xl bg-surface-container shadow-xs p-space-lg border border-outline-variant/20">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full pointer-events-none"></div>
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-space-md z-10">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-xs text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[26px]">
                      {isFeePaid ? 'verified' : 'notifications_active'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm uppercase font-semibold tracking-wider ${
                          isFeePaid
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-error-container text-on-error-container'
                        }`}
                      >
                        {isFeePaid ? 'Cleared & Up to Date' : 'Priority Alert'}
                      </span>
                      <span className="font-data-mono text-body-sm text-outline">
                        {isFeePaid ? 'All Term III dues cleared' : 'Due in 4 Days (20 Sep 2026)'}
                      </span>
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 font-semibold">
                      {isFeePaid
                        ? 'Fee Installment #3 Settled Successfully'
                        : 'Fee Installment #3 Pending Clearance'}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {isFeePaid
                        ? 'Official receipt REC-2026-001285 issued and linked to student ledger. Valid for all lab and exam modules.'
                        : 'Installment for Q3 academic laboratory and mock module. Quick pay via UPI to prevent late penalty.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm flex-shrink-0">
                  <div className="text-right mr-space-xs hidden sm:flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline">
                      {isFeePaid ? 'Status' : 'Installment Due'}
                    </span>
                    <span
                      className={`font-headline-sm text-headline-sm font-semibold ${
                        isFeePaid ? 'text-secondary' : 'text-on-surface'
                      }`}
                    >
                      {isFeePaid ? '₹0 Due' : '₹4,500'}
                    </span>
                  </div>
                  {isFeePaid ? (
                    <button
                      onClick={() => onShowToast('Downloading official payment receipt #REC-2026-001285...')}
                      className="px-space-lg py-2.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-md text-label-md hover:opacity-90 transition-all shadow-xs flex items-center gap-space-xs cursor-pointer"
                    >
                      <span>Receipt PDF</span>
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsPaymentModalOpen(true)}
                      className="px-space-lg py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-xs active:scale-[0.98] flex items-center gap-space-xs cursor-pointer"
                    >
                      <span>Pay ₹4,500</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Student Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pb-space-xs">
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider mb-1">
                  <span>Session 2025–26</span>
                  <span>•</span>
                  <span>JEE Foundation Morning Cohort (Batch A)</span>
                  <span>•</span>
                  <span className="text-secondary font-semibold">Siliguri HQ Campus</span>
                </div>
                <h1 className="font-display text-display text-on-surface tracking-tight font-bold">
                  Welcome back, Aarav! 🎓
                </h1>
              </div>
              <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-2 rounded-xl shadow-xs border border-outline-variant/20">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
                <span className="font-label-md text-label-md text-on-surface">
                  Campus Gate Attendance: <strong className="text-secondary font-semibold">Logged 08:42 AM</strong>
                </span>
              </div>
            </div>

            {/* Top 4 Bento Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-lg">
              {/* Metric 1: Attendance */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between mb-space-sm">
                  <span className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold">
                    Overall Attendance
                  </span>
                  <div className="p-1.5 rounded-lg bg-secondary-container/40 text-on-secondary-container">
                    <span className="material-symbols-outlined text-[20px]">co_present</span>
                  </div>
                </div>
                <div className="flex flex-col mb-space-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">87.4%</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm font-semibold">
                      On Track
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    108 of 124 Completed Sessions
                  </span>
                </div>
                <div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '87.4%' }}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[11px] font-data-mono text-outline">
                    <span>Min req: 75%</span>
                    <span>Target: 90%</span>
                  </div>
                </div>
              </div>

              {/* Metric 2: Fee Balance */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between mb-space-sm">
                  <span className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold">
                    Fee Balance
                  </span>
                  <div className="p-1.5 rounded-lg bg-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </div>
                </div>
                <div className="flex flex-col mb-space-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      {isFeePaid ? '₹0' : '₹4,500'}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      {isFeePaid ? 'Fully Cleared' : 'Due Inst. #3'}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {isFeePaid ? '₹45,000 Cleared / ₹45,000 Total' : '₹40,500 Cleared / ₹45,000 Total'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="w-1/2 bg-surface-container h-2 rounded-full overflow-hidden mr-2">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: isFeePaid ? '100%' : '90%' }}
                    ></div>
                  </div>
                  {isFeePaid ? (
                    <span className="font-label-md text-label-md text-secondary font-semibold flex items-center gap-1">
                      Cleared <span className="material-symbols-outlined text-[16px]">check</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setIsPaymentModalOpen(true)}
                      className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center cursor-pointer"
                    >
                      Pay Now
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Metric 3: Upcoming Exam */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between mb-space-sm">
                  <span className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold">
                    Upcoming Exam
                  </span>
                  <div className="p-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant">
                    <span className="material-symbols-outlined text-[20px]">timer</span>
                  </div>
                </div>
                <div className="flex flex-col mb-space-sm">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold line-clamp-1">
                    Mathematics Paper II
                  </span>
                  <span className="font-body-sm text-body-sm text-error font-medium mt-1">
                    Starts in 3 Days (20 Sep, 10:00 AM)
                  </span>
                </div>
                <div className="flex items-center justify-between text-outline font-data-mono text-[11px] pt-1 bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/10">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">meeting_room</span> Hall 204
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">history</span> 180 Mins
                  </span>
                </div>
              </div>

              {/* Metric 4: Assignments Pending */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between mb-space-sm">
                  <span className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold">
                    Assignments
                  </span>
                  <div className="p-1.5 rounded-lg bg-surface-container-highest text-on-primary-fixed-variant">
                    <span className="material-symbols-outlined text-[20px]">assignment</span>
                  </div>
                </div>
                <div className="flex flex-col mb-space-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
                      {hasUploadedSet402 ? '2 Pending' : '3 Pending'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${
                        hasUploadedSet402
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      {hasUploadedSet402 ? 'Cleared Today' : '1 Today'}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Historical Accuracy: <strong>88.2%</strong>
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-label-sm text-label-sm text-outline">2 due later this week</span>
                  <a
                    className="font-label-md text-label-md text-primary font-semibold hover:underline"
                    href="#worksheets"
                  >
                    Submit
                  </a>
                </div>
              </div>
            </div>

            {/* Main Asymmetric Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
              {/* LEFT COLUMN: Operations & Timeline (60% / 7 Cols) */}
              <div className="lg:col-span-7 space-y-space-xl">
                {/* Section 1: Today's Timeline View */}
                <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg border border-outline-variant/20">
                  <div className="flex items-center justify-between pb-space-md">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                        Academic Schedule
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Today's Class Timetable
                      </h2>
                    </div>
                    <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded-lg text-outline font-data-mono text-body-sm border border-outline-variant/10">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>Thursday, 17 Sep 2026</span>
                    </div>
                  </div>

                  {/* Schedule Items */}
                  <div className="space-y-space-md pt-space-xs">
                    {/* Period 1: Completed */}
                    <div className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors border border-outline-variant/10">
                      <div className="flex flex-col items-center justify-center w-24 flex-shrink-0 pt-0.5">
                        <span className="font-data-mono text-label-md text-on-surface font-semibold">09:00 - 10:00</span>
                        <span className="font-label-sm text-label-sm text-outline">Period 1</span>
                      </div>
                      <div className="w-1.5 self-stretch rounded-full bg-secondary"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-space-sm">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                            Mathematics — Integral Calculus
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 flex-shrink-0">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span> Present
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-outline">person</span> Rahul Sharma
                          </span>
                          <span className="text-outline">•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-outline">location_on</span> Room 204 (Lecture Block A)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Period 2: Live Now */}
                    <div className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-high/60 shadow-xs relative overflow-hidden ring-1 ring-primary/20">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>
                      <div className="flex flex-col items-center justify-center w-24 flex-shrink-0 pt-0.5">
                        <span className="font-data-mono text-label-md text-primary font-bold">10:15 - 11:15</span>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">Period 2</span>
                      </div>
                      <div className="w-1.5 self-stretch rounded-full bg-primary animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-space-sm">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                            Physics — Wave Optics &amp; Diffraction
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-bold flex items-center gap-1 flex-shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-on-error animate-ping"></span> Live Now
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-outline">person</span> Amit Kumar
                          </span>
                          <span className="text-outline">•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-outline">biotech</span> Physics Lab 2
                          </span>
                        </div>
                        <div className="mt-2.5 pt-2 flex items-center gap-space-md">
                          <button
                            onClick={() => setIsNotesModalOpen(true)}
                            className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">menu_book</span> View Class Notes &amp; Slides
                          </button>
                          <span className="text-outline-variant font-label-sm">•</span>
                          <span className="font-label-sm text-label-sm text-outline">
                            Biometric Verified at 10:14 AM
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Period 3: Upcoming */}
                    <div className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors border border-outline-variant/10">
                      <div className="flex flex-col items-center justify-center w-24 flex-shrink-0 pt-0.5">
                        <span className="font-data-mono text-label-md text-outline">11:30 - 12:30</span>
                        <span className="font-label-sm text-label-sm text-outline">Period 3</span>
                      </div>
                      <div className="w-1.5 self-stretch rounded-full bg-outline-variant"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-space-sm">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                            Organic Chemistry — Hydrocarbons
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                            Upcoming
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-outline">person</span> Dr. Sneha Sen
                          </span>
                          <span className="text-outline">•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-outline">location_on</span> Room 204 (Lecture Block A)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Period 4: Practical Clinic */}
                    <div className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors border border-outline-variant/10">
                      <div className="flex flex-col items-center justify-center w-24 flex-shrink-0 pt-0.5">
                        <span className="font-data-mono text-label-md text-outline">02:00 - 03:30</span>
                        <span className="font-label-sm text-label-sm text-outline">Clinic</span>
                      </div>
                      <div className="w-1.5 self-stretch rounded-full bg-outline-variant"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-space-sm">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                            Doubt Clearing &amp; Numerical Problem Clinic
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                            Optional
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-1 text-on-surface-variant font-body-sm text-body-sm">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-outline">person</span> Rahul Sharma
                          </span>
                          <span className="text-outline">•</span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-outline">groups</span> Tutorial Pod B
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Worksheets & Assignments */}
                <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg space-y-space-md border border-outline-variant/20" id="worksheets">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                        Deliverables
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Assignments &amp; Worksheets
                      </h2>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <button
                        onClick={() => setActiveDeliverableTab('all')}
                        className={`px-space-sm py-1 text-label-md font-label-md rounded-lg font-semibold transition-colors cursor-pointer ${
                          activeDeliverableTab === 'all'
                            ? 'bg-surface-container-low text-on-surface'
                            : 'text-outline hover:text-on-surface'
                        }`}
                      >
                        All (3)
                      </button>
                      <button
                        onClick={() => {
                          setActiveDeliverableTab('submitted');
                          onShowToast('Displaying 14 evaluated submissions for Term II.');
                        }}
                        className={`px-space-sm py-1 text-label-md font-label-md rounded-lg font-semibold transition-colors cursor-pointer ${
                          activeDeliverableTab === 'submitted'
                            ? 'bg-surface-container-low text-on-surface'
                            : 'text-outline hover:text-on-surface'
                        }`}
                      >
                        Submitted (14)
                      </button>
                    </div>
                  </div>

                  {/* Assignment Cards */}
                  <div className="space-y-space-sm">
                    {/* Card 1: Urgent */}
                    <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-outline-variant/10">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-space-xs flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold ${
                              hasUploadedSet402
                                ? 'bg-secondary-container text-on-secondary-container'
                                : 'bg-error-container text-on-error-container'
                            }`}
                          >
                            {hasUploadedSet402 ? 'Submitted for Evaluation' : 'Due Tomorrow, 11:59 PM'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                            Mathematics
                          </span>
                          <span className="font-data-mono text-label-sm text-outline">#SET-402</span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Calculus &amp; Integration Problem Set — Chapter 4
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          25 standard subjective proofs and substitution integrals. Hand-drawn diagrams mandatory.
                        </p>
                      </div>
                      <div className="flex items-center gap-space-sm flex-shrink-0">
                        {hasUploadedSet402 ? (
                          <div className="flex items-center gap-1 px-space-md py-2 rounded-lg bg-secondary-container/50 text-on-secondary-container font-label-md text-label-md font-semibold">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            <span>Submitted PDF</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container shadow-xs flex items-center gap-space-xs transition-transform active:scale-95 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">upload_file</span>
                            <span>Upload PDF</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Card 2: Pending */}
                    <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-outline-variant/10">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-space-xs flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold">
                            Due: 22 Sep 2026
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                            Physics Lab
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Physics Electromagnetism Lab Report
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Verification of Faraday's Law through digital galvanometer sensor datasets.
                        </p>
                      </div>
                      <div className="flex items-center gap-space-sm flex-shrink-0">
                        <span className="px-3 py-1.5 rounded-lg bg-surface-container text-outline font-label-md text-label-md flex items-center gap-1 border border-outline-variant/20">
                          <span className="material-symbols-outlined text-[16px]">pending</span> Pending
                        </span>
                      </div>
                    </div>

                    {/* Card 3: Graded with Distinction */}
                    <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-outline-variant/10">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-space-xs flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-secondary-container/60 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                            Evaluated 14 Sep
                          </span>
                          <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                            Chemistry
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Chemical Thermodynamics Quiz
                        </h4>
                        <p className="font-body-sm text-body-sm text-secondary font-medium italic">
                          "Great derivation clarity on enthalpy of vaporization!" — Dr. Sen
                        </p>
                      </div>
                      <div className="flex items-center gap-space-md flex-shrink-0">
                        <div className="text-right">
                          <div className="font-headline-sm text-headline-sm text-on-surface font-bold">46 / 50</div>
                          <div className="font-label-sm text-label-sm text-secondary font-semibold">Distinction 🌟</div>
                        </div>
                        <button
                          onClick={() => onShowToast('Chemical Thermodynamics evaluated rubric: Q1: 10/10, Q2: 12/12, Q3: 14/15, Q4: 10/13')}
                          className="p-2 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Analytics, Card & Campus Updates (40% / 5 Cols) */}
              <div className="lg:col-span-5 space-y-space-xl">
                {/* Section 1: Digital Student ID Card */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-inverse-surface via-inverse-surface to-primary text-inverse-on-surface p-space-lg shadow-md border border-slate-700">
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-surface-container-lowest/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/20 flex items-center justify-center font-bold text-inverse-on-surface">
                        EM
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm leading-tight text-white font-semibold">
                          EduManage Academy
                        </div>
                        <div className="font-label-sm text-label-sm text-primary-fixed-dim">Institutional Smart ID</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                      Active PASS
                    </span>
                  </div>

                  <div className="mt-space-lg flex items-center gap-space-md">
                    <img
                      className="w-16 h-16 rounded-xl object-cover shadow-xs bg-surface-container-high flex-shrink-0"
                      alt="Aarav Sharma"
                      referrerPolicy="no-referrer"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgFyghwo23SXhPc08cfxrqljr1y10t445nmnRXqhoEgHgvZjcwKyo4AnQGOvdvkoWls5ZsMPSpl-PvgGx3CzTCT32cHpqFKp2qoJGTqpUQUjlFkM7r-yh5t-p6VRc-2lYf_DprbSveycGEYxXJyXOfbWedK2gK6LHR7L5BNjcuhmYZiRUhH5m96afot_fGQOyMnrbqSxMxDOKYjxmAGO4xo50fy6NDPUqVcaH2QcZtWut_nsdPwYtr"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-headline-md text-headline-md font-bold text-white truncate">Aarav Sharma</h3>
                      <p className="font-body-sm text-body-sm text-inverse-on-surface/80">
                        Class 11 • JEE Foundation Batch A
                      </p>
                      <p className="font-data-mono text-[11px] text-primary-fixed-dim mt-0.5">UID: ZAYN-SIL-26-000125</p>
                    </div>

                    {/* Turnstile Access QR Simulation */}
                    <div className="w-16 h-16 bg-white p-1 rounded-lg flex-shrink-0 flex items-center justify-center shadow-inner">
                      <svg className="w-full h-full text-inverse-surface" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm11-2h2v2h-2v-2zm-3 2h2v4h-2v-4zm5 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-7-2h2v2h-2v-2zm0 2h2v2h-2v-2z"></path>
                      </svg>
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-sm flex items-center justify-between text-[11px] font-data-mono text-inverse-on-surface/70 border-t border-white/10">
                    <span>Gate Sensor: Turnstile OK</span>
                    <span>Valid Thru: June 2027</span>
                  </div>
                </div>

                {/* Section 2: Academic Performance & Recent Results */}
                <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg space-y-space-md border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                        Evaluation Matrix
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Mid-Term Assessment
                      </h2>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-md text-label-md font-bold">
                      Rank #3 Cohort
                    </span>
                  </div>

                  {/* Overall Score Ring Banner */}
                  <div className="p-space-md rounded-xl bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-outline">Composite Aggregate</span>
                      <span className="font-display text-display text-primary font-extrabold leading-none">87.6%</span>
                      <span className="font-body-sm text-body-sm text-secondary font-medium mt-1">
                        Top 2.5% Percentile in Siliguri Branch
                      </span>
                    </div>

                    {/* SVG Donut Chart Inline */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-surface-container"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        ></path>
                        <path
                          className="text-primary"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="87.6, 100"
                          strokeLinecap="round"
                          strokeWidth="3.5"
                        ></path>
                      </svg>
                      <span className="absolute font-data-mono text-xs font-bold text-on-surface">A+</span>
                    </div>
                  </div>

                  {/* Subject Breakdown Progress Pills */}
                  <div className="space-y-space-sm pt-space-xs">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Mathematics</span>
                        <span className="font-data-mono text-label-md text-on-surface font-bold">92%</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Physics</span>
                        <span className="font-data-mono text-label-md text-on-surface font-bold">86%</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div className="bg-tertiary h-full rounded-full" style={{ width: '86%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Chemistry</span>
                        <span className="font-data-mono text-label-md text-on-surface font-bold">85%</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onShowToast('Downloaded official Mid-Term Report Card PDF for Aarav Sharma.')}
                    className="w-full py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-space-xs cursor-pointer border border-outline-variant/20"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">download</span>
                    <span>Download Official Report Card (PDF)</span>
                  </button>
                </div>

                {/* Section 3: Biometric Attendance Snapshot */}
                <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg space-y-space-md border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                        Biometrics
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        September 2026 Attendance
                      </h2>
                    </div>
                    <span className="font-data-mono text-label-sm text-secondary font-bold">87.4% Rate</span>
                  </div>

                  {/* Attendance Calendar Heatmap Mini Grid */}
                  <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/10">
                    <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-label-sm text-outline pb-1 font-semibold">
                      <span>M</span>
                      <span>T</span>
                      <span>W</span>
                      <span>T</span>
                      <span>F</span>
                      <span>S</span>
                      <span>S</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 text-center font-data-mono text-[11px]">
                      {/* Row 1 */}
                      <span className="p-1 rounded text-outline-variant">31</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">01</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">02</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">03</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">04</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">05</span>
                      <span className="p-1 rounded bg-surface-container-high text-outline">06</span>
                      {/* Row 2 */}
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">07</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">08</span>
                      <span className="p-1 rounded bg-error text-white font-semibold" title="Absent (Medical)">09</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">10</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">11</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">12</span>
                      <span className="p-1 rounded bg-surface-container-high text-outline">13</span>
                      {/* Row 3 */}
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">14</span>
                      <span className="p-1 rounded bg-tertiary-container text-white font-semibold" title="Late Arrival">15</span>
                      <span className="p-1 rounded bg-secondary text-white font-semibold" title="Present">16</span>
                      <span className="p-1 rounded bg-secondary text-white font-bold ring-2 ring-primary" title="Today - Logged">17</span>
                      <span className="p-1 rounded bg-surface-container text-outline">18</span>
                      <span className="p-1 rounded bg-surface-container text-outline">19</span>
                      <span className="p-1 rounded bg-surface-container-high text-outline">20</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 px-1">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-secondary"></span> 18 Present
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-tertiary-container"></span> 2 Late
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-error"></span> 1 Medical Leave
                    </span>
                  </div>
                </div>

                {/* Section 4: Institution Announcements */}
                <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg space-y-space-md border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                        Notice Board
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        Campus Announcements
                      </h2>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[20px]">campaign</span>
                  </div>

                  <div className="space-y-space-sm">
                    {/* Notice 1 */}
                    <div
                      onClick={() => onShowToast('Dean Directive: Library open till 9 PM with AC and study pods active.')}
                      className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-space-sm border border-outline-variant/10 cursor-pointer hover:bg-surface-container transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">local_library</span>
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-primary font-semibold">
                            Dean's Directive
                          </span>
                          <span className="font-data-mono text-[11px] text-outline">2h ago</span>
                        </div>
                        <p className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug">
                          Siliguri Campus Library extended hours until 9:00 PM for upcoming Mock Exams.
                        </p>
                      </div>
                    </div>

                    {/* Notice 2 */}
                    <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-space-sm border border-outline-variant/10">
                      <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                            Examination Cell
                          </span>
                          <span className="font-data-mono text-[11px] text-outline">Yesterday</span>
                        </div>
                        <p className="font-headline-sm text-[13px] text-on-surface font-semibold leading-snug">
                          All India JEE Mock Test Schedule published. Download Admit Card before 19 Sep.
                        </p>
                        <button
                          onClick={() => setIsAdmitCardModalOpen(true)}
                          className="inline-flex items-center gap-0.5 font-label-sm text-label-sm text-primary font-semibold hover:underline pt-0.5 cursor-pointer"
                        >
                          Download Admit Card <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE MODALS */}
      {/* ========================================================================= */}

      {/* UPLOAD PDF MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">upload_file</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Upload Solution PDF
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">Calculus &amp; Integration • #SET-402</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-outline-variant/60 hover:border-primary rounded-xl p-6 text-center bg-surface-container-low transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">cloud_upload</span>
                <span className="text-sm font-semibold text-on-surface block">
                  Click to browse or drag &amp; drop PDF
                </span>
                <span className="text-xs text-outline mt-1 block">Maximum file size: 15 MB</span>
                <div className="mt-3 inline-block px-3 py-1 bg-surface-container-lowest rounded-md text-xs font-mono text-outline border border-outline-variant/30">
                  aarav_sharma_set402_proofs.pdf (3.4 MB)
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  {isUploading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      <span>Submit Solution PDF</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAY ONLINE MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">account_balance_wallet</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Instant UPI Fee Payment
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">Q3 Installment • Aarav Sharma</p>
                </div>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto animate-bounce">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h4 className="font-bold text-lg text-on-surface">Payment Successful!</h4>
                <p className="text-sm text-outline">
                  Transaction ₹4,500 settled via UPI. Receipt #REC-2026-001285 issued.
                </p>
              </div>
            ) : (
              <>
                <div className="p-4 bg-surface-container-low rounded-xl text-center border border-outline-variant/20 space-y-2">
                  <span className="text-xs font-semibold text-outline uppercase tracking-wider block">
                    Amount Payable
                  </span>
                  <div className="text-3xl font-bold font-data-mono text-primary">₹4,500.00</div>
                  <p className="text-xs text-on-surface-variant">Q3 Science Tuition &amp; Lab Consumables</p>
                </div>

                {/* Simulated QR Code */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-outline-variant/30 shadow-inner">
                  <div className="w-40 h-40 bg-gradient-to-br from-neutral-900 to-neutral-800 p-2 rounded-lg flex flex-col justify-between text-white shadow-md relative overflow-hidden">
                    <div className="flex justify-between">
                      <div className="w-8 h-8 bg-white rounded-xs"></div>
                      <div className="w-8 h-8 bg-white rounded-xs"></div>
                    </div>
                    <div className="text-center font-data-mono text-[9px] text-neutral-300">
                      SCAN TO PAY VIA ANY UPI APP
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="w-8 h-8 bg-white rounded-xs"></div>
                      <span className="text-[10px] font-bold text-primary-fixed">UPI 2.0</span>
                    </div>
                  </div>
                  <p className="font-data-mono text-[11px] text-neutral-600 mt-2 font-semibold">
                    UPI ID: apex.edumanage@icici
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApprovePayment}
                    className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Approve Payment (₹4,500)</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CLASS NOTES & SLIDES MODAL */}
      {isNotesModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">menu_book</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Physics Class Notes &amp; Slides
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Wave Optics &amp; Diffraction • Amit Kumar • Lab 2
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNotesModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-500 text-2xl">picture_as_pdf</span>
                  <div>
                    <div className="text-sm font-semibold text-on-surface">Youngs_Double_Slit_Theory.pdf</div>
                    <div className="text-xs text-outline font-data-mono">4.8 MB • Uploaded today at 10:05 AM</div>
                  </div>
                </div>
                <button
                  onClick={() => onShowToast('Downloaded Youngs_Double_Slit_Theory.pdf.')}
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                </button>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-500 text-2xl">slideshow</span>
                  <div>
                    <div className="text-sm font-semibold text-on-surface">Diffraction_Fresnel_Fraunhofer.pptx</div>
                    <div className="text-xs text-outline font-data-mono">12.4 MB • 32 Slides</div>
                  </div>
                </div>
                <button
                  onClick={() => onShowToast('Downloaded Diffraction_Fresnel_Fraunhofer.pptx.')}
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsNotesModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIT CARD MODAL */}
      {isAdmitCardModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">assignment_turned_in</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    JEE All India Mock Admit Card
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">Roll #18 • Hall 204 • Morning Session</p>
                </div>
              </div>
              <button
                onClick={() => setIsAdmitCardModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-4 bg-surface-container-low rounded-xl space-y-2 border border-outline-variant/20 text-xs">
              <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                <span className="text-outline">Candidate Name:</span>
                <span className="font-bold text-on-surface">Aarav Sharma</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                <span className="text-outline">Candidate UID:</span>
                <span className="font-mono text-on-surface">ZAYN-SIL-26-000125</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-1.5">
                <span className="text-outline">Exam Date &amp; Slot:</span>
                <span className="font-bold text-primary">20 Sep 2026 • 10:00 AM - 01:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Exam Venue:</span>
                <span className="text-on-surface">Siliguri HQ • Block A (Hall 204)</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsAdmitCardModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsAdmitCardModalOpen(false);
                  onShowToast('Downloaded official PDF admit card: JEE_Mock_AdmitCard_AaravSharma.pdf');
                }}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download Admit Card (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
