import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface TeacherPortalScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

interface StudentAttendanceRecord {
  id: string;
  name: string;
  avatar: string;
  studentId: string;
  streak: string;
  biometricLog: string;
  gateScanSuccess: boolean;
  status: 'P' | 'A' | 'L';
  leavesNote?: string;
}

export const TeacherPortalScreen: React.FC<TeacherPortalScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  // Attendance Roster State
  const [students, setStudents] = useState<StudentAttendanceRecord[]>([
    {
      id: 'stu-1',
      name: 'Aarav Sharma',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDbCRMjllUkuFQW66AcQrDF_G14r0sri2T0MJwVpisfwX0dtBvN1f5ClCHR_1N2kvFqlXws6dA_y6y3Ql1Ls2bU_tPNpR4XWDzFvUM09yxnOpMY_Lwef8EnDiuKkOyB8-rxX0mdZBRWYCRzLM2fRjPlSLw6GTUXXnc42RruUHxLFY_fMO7c2b9Do4OjcapjVAN8LF9ujhLdlVFPezp9pktTdMoXgD8Hv1Xr0DhRVzPQlLCRANg6MZxg',
      studentId: 'STU-2026-0041',
      streak: '14 Days Clean',
      biometricLog: '10:04 AM (Turnstile 2)',
      gateScanSuccess: true,
      status: 'P',
    },
    {
      id: 'stu-2',
      name: 'Priya Sengupta',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDbcQXdxGipyxUv3Y654BDT3SoS-hd5ZTzN_WM2whApf-Qm_J1EI7bW2kFmcY5DzjYKQJWL37J_g--3mPh_9BciZmwXOw-OrtIK-5AXbJScbvDziu1NJXfw_hYjEISc5WlMaky84WfHPgyoDMByvxFUcb9yC_Pe0XsNqmer1JUjHQuB0hzDSQFCqLsXMEdJg1RIfKad17TdwBqRz4gDJ9VF25uw5h9zSrBALNfn0I4t27Tp4EqISFkW',
      studentId: 'STU-2026-0089',
      streak: '22 Days Clean',
      biometricLog: '10:09 AM (Turnstile 2)',
      gateScanSuccess: true,
      status: 'P',
    },
    {
      id: 'stu-3',
      name: 'Arjun Das',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDJEGyHUU_-F7Ae7n9duigOAmBYozOM-Vrln81BqdWF1Y7Y1CcHct5YxzdEa-DSFmx1uM39QRTT_7QxRyS9TbobATO7eEOgBXl9XTtByvxiQ4NwVHyspDSbn50MqfYSRrvHqH7Nv89UsXZv3CdpHIIJeJ2UbHgncGiLZ80YWrDMYziIgejnRUCYcbXc7Vrux9s4xHxF9HVbn8w-up1IMoHKy9CH9gLSu3HyiyX2F4DecxZRhIwzW39C',
      studentId: 'STU-2026-0112',
      streak: '2 Leaves this week',
      biometricLog: 'No gate scan',
      gateScanSuccess: false,
      status: 'A',
      leavesNote: '2 Leaves this week',
    },
    {
      id: 'stu-4',
      name: 'Tanusree Paul',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuByY8gzG5dGmEoOzV23oG8bovArXraMOVsxe8guzYyVPlAj9E1EmVemXbeFN6Vl4sKeiCKJWQ4bZVP4xRIMQOBMvg15RSioJ-3524f-Yp5VDSFlsehp5VYs2MW5ZdkY4LNAAkUDtoN62FNvaqP1FRHVOntHqaEE1CVNQOuOnsfNC5Pz4YOSP2lbnbC8YG_9pxDe9npzebs4B0M0erHEskbMRkXV4m5uecu9tcnVuk962IgoGxogMIuD',
      studentId: 'STU-2026-0034',
      streak: '98% Term Avg',
      biometricLog: '10:11 AM (Turnstile 1)',
      gateScanSuccess: true,
      status: 'P',
    },
  ]);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRegisterLocked, setIsRegisterLocked] = useState(false);
  const [isSpeedGraderOpen, setIsSpeedGraderOpen] = useState(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);
  const [isUploadNotesOpen, setIsUploadNotesOpen] = useState(false);
  const [isSmartboardOpen, setIsSmartboardOpen] = useState(false);

  // Student enquiry status
  const [snehaApproved, setSnehaApproved] = useState(false);

  // Handle Attendance status toggle
  const handleToggleStatus = (id: string, newStatus: 'P' | 'A' | 'L') => {
    setStudents((prev) =>
      prev.map((stu) => (stu.id === id ? { ...stu, status: newStatus } : stu))
    );
  };

  // Mark all present
  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((stu) => ({ ...stu, status: 'P' })));
    onShowToast('Marked all students in Batch JEE 2026-B as Present (P).');
  };

  // Sync Face Terminal
  const handleSyncBiometric = () => {
    onShowToast('Synchronizing with Turnstile Gate 2 facial terminal... 4 students verified.');
  };

  // Lock register
  const handleSaveRegister = () => {
    setIsRegisterLocked(true);
    onShowToast('Attendance register for Batch JEE 2026-B locked and synced to institutional ledger.');
    setTimeout(() => setIsRegisterLocked(false), 3000);
  };

  // Scroll to attendance widget
  const handleScrollToAttendance = () => {
    const el = document.getElementById('attendance-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex">
      {/* ========================================================================= */}
      {/* 1. FIXED LEFT NAVIGATION SIDEBAR (w-[260px]) */}
      {/* ========================================================================= */}
      {/* Mobile backdrop overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-[260px] bg-surface-container-lowest shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none border-r border-outline-variant/30 transition-transform duration-300 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="h-16 px-space-lg flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/20">
            <div
              className="flex items-center gap-space-sm cursor-pointer"
              onClick={() => {
                onNavigate('dashboard');
                setIsMobileSidebarOpen(false);
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
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
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

            {/* Institutional Portals (TEACHER PORTAL IS ACTIVE) */}
            <div className="space-y-space-xs">
              <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase font-semibold tracking-wider">
                Institutional Portals
              </span>
              <nav className="space-y-0.5">
                {/* ACTIVE TAB: Teacher Portal */}
                <button
                  aria-current="page"
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-sm text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">school</span>
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
      <div className="pl-0 lg:pl-[260px] flex-1 flex flex-col min-w-0">
        {/* Fixed Top Header */}
        <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-space-xl border-b border-outline-variant/20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-space-md">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(prev => !prev)}
              className="lg:hidden p-2 -ml-1 mr-1 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
              aria-label="Toggle Sidebar Menu"
              title="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isMobileSidebarOpen ? 'close' : 'menu'}
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
              onClick={() => onShowToast('Quick find: Professor Rahul Sharma')}
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
                onClick={() => onShowToast('3 Priority Alerts: 34 Calculus submissions waiting, Smart Podium live in Room 302, Sneha leave request.')}
                className="relative p-2 rounded-lg text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center font-semibold leading-none">
                  3
                </span>
              </button>
              <button
                onClick={() => onShowToast('Faculty Help Desk & Academic Regulations')}
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
        {/* 3. MAIN CONTENT WORKSPACE */}
        {/* ========================================================================= */}
        <main className="w-full pt-16 bg-background min-h-screen px-space-xl py-space-xl">
          <div className="flex flex-col w-full">
            {/* Dynamic Faculty Quick Strip & Overview Header */}
            <section className="w-full mb-space-lg">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden border border-outline-variant/20">
                <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary-container/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-start gap-space-md z-10">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-xl object-cover shadow-sm"
                      alt="Rahul Sharma"
                      referrerPolicy="no-referrer"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6hl8nmqRw4v-5YdZybrOfbcFKYyhlJxaglPUappyecvo0-uGMGczJGBNcwIWwyMjDXzwZ5GQYjyiAF2xUB935CA3fLsj4_p09ONaaTrh_vg54d2KzZgTMaLGNruWxpw3_GLQUBnTeNT38hR4fXvWtGwK-Ls_r20EQxx_zSAArtRoH_MUUVgbKdYs9ReChz6Kz5MVk-SUOhIUpBUowgRGlEaLnfdouACyyRecOYsB4u1VdCAHfEWvW"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <h1 className="font-display text-headline-lg text-on-surface tracking-tight font-bold">
                        Good morning, Rahul! 👨‍🏫
                      </h1>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                        Teacher Portal
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-medium">
                        Binnaguri Sync Active
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                      Senior Mathematics Faculty <span className="text-outline-variant">•</span> Employee ID:{' '}
                      <span className="font-data-mono font-semibold text-on-surface">TCH-0024</span>{' '}
                      <span className="text-outline-variant">•</span> Siliguri HQ Campus (Primary)
                    </p>
                  </div>
                </div>

                {/* Quick Action Controls */}
                <div className="flex items-center gap-space-xs flex-wrap z-10">
                  <button
                    onClick={handleScrollToAttendance}
                    id="btn-quick-attendance"
                    className="flex items-center gap-space-xs px-space-md py-2 bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-md text-label-md transition-all shadow-sm active:scale-[0.98] cursor-pointer font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    <span>Take Today's Attendance</span>
                  </button>
                  <button
                    onClick={() => setIsCreateAssignmentOpen(true)}
                    className="flex items-center gap-space-xs px-space-md py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-all cursor-pointer font-semibold border border-outline-variant/20"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">add_task</span>
                    <span>+ Create Assignment</span>
                  </button>
                  <button
                    onClick={() => onNavigate('marks-entry')}
                    className="flex items-center gap-space-xs px-space-md py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-all cursor-pointer font-semibold border border-outline-variant/20"
                  >
                    <span className="material-symbols-outlined text-[18px] text-tertiary">fact_check</span>
                    <span>Enter Exam Marks</span>
                  </button>
                  <button
                    onClick={() => setIsUploadNotesOpen(true)}
                    className="flex items-center gap-space-xs px-space-md py-2 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md transition-all cursor-pointer font-semibold border border-outline-variant/20"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">upload_file</span>
                    <span>Upload Study Notes</span>
                  </button>
                  <button
                    onClick={() => onShowToast('Slot Swap & Faculty Leave request portal opened.')}
                    className="flex items-center gap-space-xs px-space-sm py-2 bg-surface-container-low hover:bg-surface-container text-on-surface-variant rounded-lg font-label-md text-label-md transition-all cursor-pointer border border-outline-variant/20"
                    title="Request Leave or Slot Swap"
                  >
                    <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Top Operational KPIs */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-lg">
              {/* KPI 1 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Today's Lectures
                    </span>
                    <span className="font-display text-display text-on-surface tracking-tight mt-1 font-bold">
                      4 Sessions
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                  </div>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low/50 px-2 py-1.5 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span>2 Done</span>
                    <span className="text-outline-variant">•</span>
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                    <span>1 Live</span>
                    <span className="text-outline-variant">•</span>
                    <span className="w-2 h-2 rounded-full bg-outline"></span>
                    <span>1 Next</span>
                  </div>
                  <span className="font-data-mono font-semibold text-primary">5.5h Total</span>
                </div>
              </div>

              {/* KPI 2 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Total Enrolled
                    </span>
                    <span className="font-display text-display text-on-surface tracking-tight mt-1 font-bold">
                      184 Learners
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[22px]">groups</span>
                  </div>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low/50 px-2 py-1.5 rounded-lg">
                  <span className="truncate">JEE 2026-A, JEE 2026-B, NEET Found.</span>
                  <span className="font-data-mono font-semibold text-secondary">3 Batches</span>
                </div>
              </div>

              {/* KPI 3 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Pending Grading
                    </span>
                    <span className="font-display text-display text-on-surface tracking-tight mt-1 font-bold">
                      38 Submissions
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[22px]">pending_actions</span>
                  </div>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low/50 px-2 py-1.5 rounded-lg">
                  <span className="truncate">Calculus Ch 4 (34) • Vectors (4)</span>
                  <span className="font-data-mono font-semibold text-error text-[11px] bg-error-container/60 px-1 rounded">
                    Needs Action
                  </span>
                </div>
              </div>

              {/* KPI 4 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Attendance Compliance
                    </span>
                    <span className="font-display text-display text-on-surface tracking-tight mt-1 font-bold">
                      98.2%
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined text-[22px]">sensors</span>
                  </div>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low/50 px-2 py-1.5 rounded-lg">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
                    <span>Turnstile Gate 2</span>
                  </span>
                  <span className="font-data-mono font-semibold text-secondary">Synced 09:42</span>
                </div>
              </div>
            </section>

            {/* Two Column Content Grid (62% / 38%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              {/* Left Main Column (62% / 7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-lg min-w-0">
                {/* Live Teaching Schedule Accordion/Timeline */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">calendar_view_day</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Today's Teaching Schedule &amp; Live Rosters
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline font-data-mono">
                      Wednesday, 28 Jan 2026
                    </span>
                  </div>

                  <div className="space-y-space-sm">
                    {/* Slot 1: Completed */}
                    <div className="p-space-md bg-surface-container-low/60 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors border border-outline-variant/10">
                      <div className="flex items-start gap-space-md">
                        <div className="flex flex-col items-center justify-center px-2.5 py-1.5 bg-surface-container-lowest rounded-md text-center shadow-sm">
                          <span className="font-data-mono text-label-sm font-semibold text-on-surface">09:00</span>
                          <span className="text-[10px] text-outline">10:00 AM</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                              Mathematics (Calculus)
                            </span>
                            <span className="px-2 py-0.2 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                              Room 204
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-body-sm text-on-surface-variant">
                            <span className="font-semibold text-primary">Batch: JEE 2026-A</span>
                            <span>•</span>
                            <span>42 Enrolled</span>
                            <span>•</span>
                            <span className="text-secondary font-medium">39 Present, 2 Absent, 1 Late</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-xs self-end md:self-center">
                        <span className="px-2 py-1 rounded bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                        </span>
                        <button
                          onClick={() => onShowToast('Displaying attendance register for JEE 2026-A (Room 204).')}
                          className="px-3 py-1 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded font-label-sm text-label-sm shadow-sm transition-all cursor-pointer border border-outline-variant/20"
                        >
                          View Register
                        </button>
                      </div>
                    </div>

                    {/* Slot 2: Live Now (Active Accent) */}
                    <div className="p-space-md bg-surface-container-lowest rounded-lg shadow-md relative overflow-hidden border border-primary/30">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                        <div className="flex items-start gap-space-md pl-1">
                          <div className="flex flex-col items-center justify-center px-2.5 py-1.5 bg-primary-container text-on-primary rounded-md text-center shadow-sm">
                            <span className="font-data-mono text-label-sm font-semibold">10:15</span>
                            <span className="text-[10px] opacity-80">11:15 AM</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                                Advanced Problem Solving
                              </span>
                              <span className="px-2 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-semibold">
                                Room 302
                              </span>
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-error font-label-sm text-[10px] font-bold uppercase tracking-wider animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Live Now
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-body-sm text-on-surface-variant">
                              <span className="font-semibold text-primary">Batch: JEE 2026-B</span>
                              <span>•</span>
                              <span>38 Students Registered</span>
                              <span>•</span>
                              <span className="font-data-mono text-outline">Smart Podium Connected</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-space-xs self-end md:self-center">
                          <button
                            onClick={handleScrollToAttendance}
                            className="px-3 py-1.5 bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-sm text-label-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">touch_app</span> Start Roll Call
                          </button>
                          <button
                            onClick={() => setIsSmartboardOpen(true)}
                            className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-outline-variant/20"
                          >
                            <span className="material-symbols-outlined text-[16px] text-tertiary">cast</span> Smartboard
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Slot 3: Upcoming */}
                    <div className="p-space-md bg-surface-container-low/60 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors border border-outline-variant/10">
                      <div className="flex items-start gap-space-md">
                        <div className="flex flex-col items-center justify-center px-2.5 py-1.5 bg-surface-container-lowest rounded-md text-center shadow-sm">
                          <span className="font-data-mono text-label-sm font-semibold text-on-surface">01:30</span>
                          <span className="text-[10px] text-outline">02:30 PM</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                              Foundation Algebra
                            </span>
                            <span className="px-2 py-0.2 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                              Room 108
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-body-sm text-on-surface-variant">
                            <span className="font-semibold text-primary">Batch: NEET Morning</span>
                            <span>•</span>
                            <span>40 Students</span>
                            <span>•</span>
                            <span className="text-outline">Topic: Quadratic Equations &amp; Graphing</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-xs self-end md:self-center">
                        <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium">
                          In ~2 hours
                        </span>
                        <button
                          onClick={() => onShowToast('Loaded lecture preparation material for Foundation Algebra.')}
                          className="px-3 py-1 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded font-label-sm text-label-sm shadow-sm transition-all cursor-pointer border border-outline-variant/20"
                        >
                          Prep Material
                        </button>
                      </div>
                    </div>

                    {/* Slot 4: Doubt Clearing Lab */}
                    <div className="p-space-md bg-surface-container-low/60 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-space-sm hover:bg-surface-container-low transition-colors border border-outline-variant/10">
                      <div className="flex items-start gap-space-md">
                        <div className="flex flex-col items-center justify-center px-2.5 py-1.5 bg-surface-container-lowest rounded-md text-center shadow-sm">
                          <span className="font-data-mono text-label-sm font-semibold text-on-surface">03:00</span>
                          <span className="text-[10px] text-outline">04:30 PM</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                              Special Doubt Clearing Lab
                            </span>
                            <span className="px-2 py-0.2 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                              Lab 204
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-body-sm text-on-surface-variant">
                            <span className="text-tertiary font-semibold">All Batches Open</span>
                            <span>•</span>
                            <span className="font-medium text-secondary">25 Students RSVP'd</span>
                            <span>•</span>
                            <span>Focus: Advanced Coordinate Geometry</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-xs self-end md:self-center">
                        <span className="px-2 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">
                          Lab Session
                        </span>
                        <button
                          onClick={() => onShowToast('RSVP roster: 25 students registered for Coordinate Geometry Clinic.')}
                          className="px-3 py-1 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded font-label-sm text-label-sm shadow-sm transition-all cursor-pointer border border-outline-variant/20"
                        >
                          RSVP Sheet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Classroom Attendance Marking Widget */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/20" id="attendance-section">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[20px]">checklist_rtl</span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Quick Roll Call — Batch JEE 2026-B
                        </h2>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        38 Students Registered • Room 302 • Current Session
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleMarkAllPresent}
                        id="btn-mark-all-present"
                        className="px-3 py-1.5 bg-surface-container-low hover:bg-surface-container text-primary font-label-sm text-label-sm font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer border border-outline-variant/20"
                      >
                        <span className="material-symbols-outlined text-[16px]">done_all</span> Mark All Present
                      </button>
                      <button
                        onClick={handleSyncBiometric}
                        className="px-3 py-1.5 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold rounded-lg hover:bg-secondary-fixed-dim transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">fingerprint</span> Sync Face Terminal
                      </button>
                    </div>
                  </div>

                  {/* Student Roster Table */}
                  <div className="overflow-x-auto rounded-lg border border-outline-variant/20">
                    <table className="w-full text-left font-body-md text-body-md">
                      <thead>
                        <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider">
                          <th className="py-2.5 px-3">Student Name &amp; ID</th>
                          <th className="py-2.5 px-3">Recent Streak</th>
                          <th className="py-2.5 px-3">Biometric Log</th>
                          <th className="py-2.5 px-3 text-center">Status Toggle</th>
                          <th className="py-2.5 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/10">
                        {students.map((stu) => {
                          const isAbsent = stu.status === 'A';
                          return (
                            <tr
                              key={stu.id}
                              className={`transition-colors ${
                                isAbsent ? 'bg-error-container/10' : 'hover:bg-surface-container-low/50 bg-surface-container-lowest'
                              }`}
                            >
                              <td className="py-3 px-3 flex items-center gap-3">
                                <img
                                  className="w-8 h-8 rounded-full object-cover shadow-xs"
                                  alt={stu.name}
                                  referrerPolicy="no-referrer"
                                  src={stu.avatar}
                                />
                                <div>
                                  <div className="font-label-md text-label-md font-semibold text-on-surface">
                                    {stu.name}
                                  </div>
                                  <div className="font-data-mono text-[11px] text-outline">{stu.studentId}</div>
                                </div>
                              </td>

                              <td className="py-3 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded font-label-sm text-[11px] font-semibold ${
                                    isAbsent
                                      ? 'bg-error-container text-on-error-container'
                                      : 'bg-secondary-container/50 text-on-secondary-container'
                                  }`}
                                >
                                  {stu.streak}
                                </span>
                              </td>

                              <td className="py-3 px-3">
                                <div
                                  className={`font-data-mono text-body-sm flex items-center gap-1 font-medium ${
                                    stu.gateScanSuccess ? 'text-secondary' : 'text-error font-semibold'
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    {stu.gateScanSuccess ? 'check' : 'close'}
                                  </span>
                                  <span>{stu.biometricLog}</span>
                                </div>
                              </td>

                              <td className="py-3 px-3">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => handleToggleStatus(stu.id, 'P')}
                                    className={`px-2.5 py-1 rounded text-label-sm font-semibold transition-colors cursor-pointer ${
                                      stu.status === 'P'
                                        ? 'bg-secondary text-on-secondary'
                                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                    }`}
                                  >
                                    P
                                  </button>
                                  <button
                                    onClick={() => handleToggleStatus(stu.id, 'A')}
                                    className={`px-2.5 py-1 rounded text-label-sm font-semibold transition-colors cursor-pointer ${
                                      stu.status === 'A'
                                        ? 'bg-error text-on-error'
                                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                    }`}
                                  >
                                    A
                                  </button>
                                  <button
                                    onClick={() => handleToggleStatus(stu.id, 'L')}
                                    className={`px-2.5 py-1 rounded text-label-sm font-semibold transition-colors cursor-pointer ${
                                      stu.status === 'L'
                                        ? 'bg-tertiary text-on-tertiary'
                                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                    }`}
                                  >
                                    L
                                  </button>
                                </div>
                              </td>

                              <td className="py-3 px-3 text-right">
                                {isAbsent ? (
                                  <button
                                    onClick={() => setIsSmsModalOpen(true)}
                                    className="px-2 py-1 bg-error-container text-on-error-container hover:bg-error hover:text-on-error rounded font-label-sm text-[11px] font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer"
                                    title="Trigger Automated Guardian Notification"
                                  >
                                    <span className="material-symbols-outlined text-[12px]">sms</span> SMS Parent
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => onShowToast(`Direct messaging channel opened for ${stu.name}.`)}
                                    className="text-outline hover:text-primary p-1 rounded cursor-pointer transition-colors"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary & Lock Action */}
                  <div className="mt-space-md pt-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-low/40 p-space-sm rounded-lg border border-outline-variant/10">
                    <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span> 35 Present
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-error"></span> 2 Absent
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-outline"></span> 1 Unmarked
                      </span>
                    </div>
                    <button
                      onClick={handleSaveRegister}
                      id="btn-save-attendance"
                      className={`px-space-md py-2 font-label-md text-label-md font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isRegisterLocked
                          ? 'bg-secondary text-on-secondary'
                          : 'bg-primary-container hover:bg-primary text-on-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isRegisterLocked ? 'check' : 'lock'}
                      </span>
                      <span>
                        {isRegisterLocked ? 'Locked & Synced!' : 'Save & Lock Register (AY 2025–26)'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column (38% / 5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-space-lg min-w-0">
                {/* Pending Coursework & Evaluation Queue */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[20px]">assignment_turned_in</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Evaluation Queue
                      </h2>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-[11px] font-bold">
                      2 Due
                    </span>
                  </div>

                  <div className="space-y-space-sm">
                    {/* Evaluation Card 1 */}
                    <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs hover:bg-surface-container transition-colors border border-outline-variant/10">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            Calculus &amp; Integration Problem Set
                          </span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Batch JEE 2026-A • Deadline passed yesterday
                          </p>
                        </div>
                        <span className="font-data-mono font-bold text-error text-label-md">34 waiting</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 my-1 overflow-hidden">
                        <div className="bg-primary-container h-full rounded-full" style={{ width: '19%' }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-body-sm text-body-sm text-outline">8 / 42 Graded</span>
                        <button
                          onClick={() => setIsSpeedGraderOpen(true)}
                          className="px-3 py-1 bg-primary-container hover:bg-primary text-on-primary rounded font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">bolt</span> Launch Speed Grader
                        </button>
                      </div>
                    </div>

                    {/* Evaluation Card 2 */}
                    <div className="p-space-md bg-surface-container-low rounded-lg flex flex-col gap-space-xs hover:bg-surface-container transition-colors border border-outline-variant/10">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            Vectors &amp; 3D Geometry Quiz
                          </span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Batch JEE 2026-B • Auto-scored MCQ + 2 Subjective
                          </p>
                        </div>
                        <span className="font-data-mono font-bold text-outline text-label-md">28 waiting</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 my-1 overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: '26%' }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-body-sm text-body-sm text-outline">10 / 38 Graded</span>
                        <button
                          onClick={() => onNavigate('marks-entry')}
                          className="px-3 py-1 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm transition-all cursor-pointer border border-outline-variant/20"
                        >
                          Review Marks
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Faculty Workload & Multi-Campus Schedule */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[20px]">pie_chart</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Faculty Workload Matrix
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">92% Optimal</span>
                  </div>

                  <div className="space-y-space-sm">
                    {/* Siliguri HQ Node */}
                    <div className="p-space-sm bg-surface-container-low/50 rounded-lg border border-outline-variant/10">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px] text-primary">domain</span>
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            Siliguri HQ Campus
                          </span>
                        </div>
                        <span className="font-data-mono text-label-sm font-semibold text-primary">16 Lecture Hrs</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-outline">
                        Monday, Wednesday, Friday • Batch A &amp; Foundation
                      </p>
                    </div>

                    {/* Binnaguri Branch Node */}
                    <div className="p-space-sm bg-surface-container-low/50 rounded-lg border border-outline-variant/10">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px] text-secondary">share_location</span>
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            Binnaguri Branch Node
                          </span>
                        </div>
                        <span className="font-data-mono text-label-sm font-semibold text-secondary">
                          10 Lecture Hrs
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-outline">
                        Tuesday, Thursday • Super-30 Integrated Batch
                      </p>
                    </div>

                    {/* Progress Bar & Capacity */}
                    <div className="pt-space-xs">
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="text-outline">Weekly Allocation Cap</span>
                        <span className="font-data-mono font-semibold text-on-surface">26 / 28 Hours</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden flex">
                        <div className="bg-primary-container h-full" style={{ width: '57%' }} title="Siliguri"></div>
                        <div className="bg-secondary h-full" style={{ width: '35%' }} title="Binnaguri"></div>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px] text-outline">
                        <span>Siliguri: 57%</span>
                        <span>Binnaguri: 35%</span>
                        <span>Buffer: 2 hrs remaining</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Student Enquiries & Doubt Messages */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">mark_chat_unread</span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Student Enquiries &amp; Doubts
                      </h2>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  </div>

                  <div className="space-y-space-sm">
                    {/* Enquiry 1 */}
                    <div className="p-space-sm bg-surface-container-low rounded-lg space-y-1 border border-outline-variant/10">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          Aarav Sharma (JEE-A)
                        </span>
                        <span className="font-data-mono text-[10px] text-outline">Today 08:30 AM</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        “Sir, could you review question 14 on page 82 of calculus set? Got stuck on step 3 substitution.”
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="px-2 py-0.5 rounded bg-secondary-container/50 text-on-secondary-container font-label-sm text-[10px] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">attachment</span> Replied with PDF note
                        </span>
                      </div>
                    </div>

                    {/* Enquiry 2 */}
                    <div className="p-space-sm bg-surface-container-low rounded-lg space-y-1 border border-outline-variant/10">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          Sneha Roy (NEET Morning)
                        </span>
                        <span className="font-data-mono text-[10px] text-outline">Yesterday</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        “Requesting permission for absent on Thursday for regional olympiad examination.”
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        {snehaApproved ? (
                          <span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-semibold rounded flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">check</span> Permission Granted
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setSnehaApproved(true);
                                onShowToast('Leave permission granted to Sneha Roy for Regional Olympiad.');
                              }}
                              className="px-2.5 py-1 bg-surface-container-lowest hover:bg-surface-container text-primary font-label-sm text-[11px] font-semibold rounded shadow-sm cursor-pointer border border-outline-variant/20"
                            >
                              Grant Approval
                            </button>
                            <button
                              onClick={() => onShowToast('Forwarded Sneha Roy request to Campus Headmaster Admin.')}
                              className="px-2.5 py-1 bg-surface-container-lowest hover:bg-surface-container text-outline font-label-sm text-[11px] rounded cursor-pointer border border-outline-variant/20"
                            >
                              Forward to Admin
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Permission Guardrail Notice Card */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm text-on-surface-variant shadow-sm border border-outline-variant/20">
                  <span className="material-symbols-outlined text-outline text-[20px] shrink-0 mt-0.5">verified_user</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface">
                      Role Governance &amp; Guardrail
                    </span>
                    <p className="font-body-sm text-body-sm mt-0.5 text-on-surface-variant">
                      Role: <strong className="text-on-surface">Faculty Lead</strong>. Financial ledgers, fee collections, and salary disbursement records are strictly restricted to Institution Finance Administration per ISO-27001 data compliance.
                    </p>
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

      {/* SPEED GRADER MODAL */}
      {isSpeedGraderOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">bolt</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Speed Grader • Calculus Ch 4
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">Submission 9 of 42 • Aarav Sharma</p>
                </div>
              </div>
              <button
                onClick={() => setIsSpeedGraderOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface">aarav_sharma_set402_proofs.pdf</span>
                <span className="text-secondary font-mono">Submitted 16 Sep, 11:24 PM</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-outline-variant/30 text-xs font-mono text-neutral-700">
                Step 3: ∫ x · e^(2x) dx = (1/2) x e^(2x) - ∫ (1/2) e^(2x) dx = (1/2) x e^(2x) - (1/4) e^(2x) + C ... [Verified Correct]
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-outline block mb-1">Score (out of 50)</label>
                  <input
                    defaultValue="48"
                    type="number"
                    className="w-full px-3 py-2 bg-surface-container-lowest rounded-lg border border-outline-variant/40 text-sm font-bold text-on-surface"
                  />
                </div>
                <div className="flex-[2]">
                  <label className="text-xs font-semibold text-outline block mb-1">Remarks for Aarav</label>
                  <input
                    defaultValue="Excellent clarity on integration by parts! Precise bounds."
                    type="text"
                    className="w-full px-3 py-2 bg-surface-container-lowest rounded-lg border border-outline-variant/40 text-sm text-on-surface"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
              <span className="text-xs text-outline font-data-mono">Keyboard: [⌘ + Enter] to save &amp; next</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsSpeedGraderOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSpeedGraderOpen(false);
                    onShowToast('Marks saved! 48/50 awarded to Aarav Sharma. 33 remaining.');
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">check</span>
                  <span>Save &amp; Grade Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMS PARENT MODAL */}
      {isSmsModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[24px]">sms</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Automated Absence Notification
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">Arjun Das (STU-2026-0112)</p>
                </div>
              </div>
              <button
                onClick={() => setIsSmsModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-1">
                <div className="flex justify-between text-outline">
                  <span>Parent / Guardian:</span>
                  <span className="font-semibold text-on-surface">Mr. Suresh Das (+91 98320 11984)</span>
                </div>
                <div className="flex justify-between text-outline">
                  <span>Session:</span>
                  <span className="font-semibold text-on-surface">Batch JEE 2026-B (10:15 - 11:15 AM)</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-outline block mb-1">SMS Template</label>
                <textarea
                  defaultValue="Dear Guardian, your ward Arjun Das was logged ABSENT for Period 2 (Advanced Problem Solving) at Siliguri Campus today. Please reply or contact campus reception if leave was pre-authorized."
                  rows={4}
                  className="w-full p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/30 text-on-surface font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsSmsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsSmsModalOpen(false);
                  onShowToast('SMS dispatched via Twilio Gateway to Mr. Suresh Das (+91 98320 11984).');
                }}
                className="px-4 py-2 rounded-lg bg-error text-on-error text-xs font-semibold hover:bg-error/90 shadow-xs cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                <span>Dispatch SMS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE ASSIGNMENT MODAL */}
      {isCreateAssignmentOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">add_task</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Create Coursework Assignment
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">Publish to Batch Roster</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateAssignmentOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-outline block mb-1">Target Batch</label>
                <select className="w-full p-2 bg-surface-container-low rounded-lg border border-outline-variant/30 text-on-surface">
                  <option>JEE 2026-A (Morning Cohort)</option>
                  <option>JEE 2026-B (Advanced Problem Solving)</option>
                  <option>NEET Morning (Foundation)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-outline block mb-1">Assignment Title</label>
                <input
                  defaultValue="Differential Equations &amp; Boundary Values — Set 5"
                  className="w-full p-2 bg-surface-container-low rounded-lg border border-outline-variant/30 text-on-surface font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-outline block mb-1">Due Date</label>
                  <input
                    defaultValue="2026-02-05"
                    type="date"
                    className="w-full p-2 bg-surface-container-low rounded-lg border border-outline-variant/30 text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-semibold text-outline block mb-1">Total Marks</label>
                  <input
                    defaultValue="50"
                    type="number"
                    className="w-full p-2 bg-surface-container-low rounded-lg border border-outline-variant/30 text-on-surface"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsCreateAssignmentOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsCreateAssignmentOpen(false);
                  onShowToast('New assignment published to JEE 2026-A! Notification sent to 42 students.');
                }}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">publish</span>
                <span>Publish Assignment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD STUDY NOTES MODAL */}
      {isUploadNotesOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">upload_file</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Upload Study Notes
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">Push to Student LMS Portal</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadNotesOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-outline-variant/60 hover:border-secondary rounded-xl p-6 text-center bg-surface-container-low transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-secondary mb-2 block">cloud_upload</span>
              <span className="text-sm font-semibold text-on-surface block">
                Click or drag &amp; drop lecture PDF or slides
              </span>
              <span className="text-xs text-outline mt-1 block">Supported formats: PDF, PPTX, MP4 (up to 100 MB)</span>
              <div className="mt-3 inline-block px-3 py-1 bg-surface-container-lowest rounded-md text-xs font-mono text-outline border border-outline-variant/30">
                Calculus_Chapter4_Complete_Derivations.pdf (8.2 MB)
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsUploadNotesOpen(false)}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsUploadNotesOpen(false);
                  onShowToast('Study notes uploaded and synced across student portals for Siliguri & Binnaguri!');
                }}
                className="px-4 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-semibold hover:bg-secondary/90 shadow-xs cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">check</span>
                <span>Upload &amp; Notify Students</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SMARTBOARD PODIUM MODAL */}
      {isSmartboardOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[24px]">cast</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Room 302 Smartboard Stream
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">Interactive Whiteboard &amp; Student Tablets</p>
                </div>
              </div>
              <button
                onClick={() => setIsSmartboardOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-neutral-400 border-b border-neutral-800 pb-2">
                <span>PODIUM IP: 192.168.10.32</span>
                <span className="text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span> Live Broadcast
                </span>
              </div>
              <div className="py-6 text-center text-neutral-300">
                <span className="material-symbols-outlined text-5xl text-primary mb-2 block">devices</span>
                <span>38 Student Tablets Connected in Room 302</span>
                <p className="text-[11px] text-neutral-400 mt-1">Screen sharing active: "Calculus_Integration_Advanced.pdf"</p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => setIsSmartboardOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container"
              >
                Close Stream Console
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
