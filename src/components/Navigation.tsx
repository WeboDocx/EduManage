import React from 'react';
import { ScreenType } from '../types';
import { BRAND_HOTLINKS } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';
import { useSidebar } from '../context/SidebarContext';

interface NavigationProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onShowToast?: (msg: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate, onShowToast }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const hasSidebarScreen = !['landing', 'register', 'onboarding'].includes(currentScreen);

  return (
    <>
      {/* Top Screen Selector Floating Bar for convenient testing & demo */}
      <div className="bg-inverse-surface text-inverse-on-surface text-xs py-1.5 px-3 sm:px-4 sticky top-0 z-[60] border-b border-surface-container-highest/20 flex items-center justify-between gap-3 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Quick Sidebar Toggle on left */}
          {hasSidebarScreen && (
            <button
              onClick={() => {
                toggleSidebar();
                onShowToast?.(isSidebarOpen ? 'Sidebar hide ho gaya (Full Workspace)' : 'Sidebar show ho gaya');
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border flex-shrink-0 ${
                isSidebarOpen
                  ? 'bg-surface-container-highest/40 hover:bg-surface-container-highest/70 text-white border-white/20'
                  : 'bg-primary text-white border-primary shadow-xs ring-2 ring-primary/40'
              }`}
              title={isSidebarOpen ? 'Sidebar Hide karein (Shortcut: Ctrl+B / Cmd+B)' : 'Sidebar Show karein (Shortcut: Ctrl+B / Cmd+B)'}
            >
              <span className="material-symbols-outlined text-[15px]">
                {isSidebarOpen ? 'left_panel_close' : 'left_panel_open'}
              </span>
              <span className="hidden sm:inline">{isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}</span>
              <kbd className="hidden md:inline-block px-1 py-0.2 rounded bg-black/30 text-[9px] font-mono text-white/70">
                ⌘B
              </kbd>
            </button>
          )}

          <span className="hidden md:inline-flex items-center gap-1 font-semibold text-secondary-fixed flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
            EduManage Screens:
          </span>
          <div className="flex items-center bg-surface-container-highest/20 rounded-lg p-0.5 overflow-x-auto max-w-[calc(100vw-180px)] sm:max-w-none">
            <button
              onClick={() => onNavigate('certificates')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'certificates'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'bg-primary/20 text-primary-fixed hover:bg-primary/30 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
              <span>Certificates</span>
            </button>
            <button
              onClick={() => onNavigate('certificate-studio')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'certificate-studio'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">draw</span>
              <span>Template Studio</span>
            </button>
            <button
              onClick={() => onNavigate('students-directory')}
              className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentScreen === 'students-directory'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">group</span>
              <span>All Students</span>
            </button>
            <button
              onClick={() => onNavigate('student-profile')}
              className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentScreen === 'student-profile'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">badge</span>
              <span>Student Profile</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentScreen === 'dashboard'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">grid_view</span>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('academics')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'academics'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">assignment</span>
              <span>Exams</span>
            </button>
            <button
              onClick={() => onNavigate('marks-entry')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'marks-entry'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">grade</span>
              <span>Marks Entry</span>
            </button>
            <button
              onClick={() => onNavigate('timetable-schedule')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'timetable-schedule'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">calendar_month</span>
              <span>Timetable &amp; Schedule</span>
            </button>
            <button
              onClick={() => onNavigate('assignments-coursework')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'assignments-coursework'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">assignment</span>
              <span>Assignments &amp; HW</span>
            </button>
            <button
              onClick={() => onNavigate('teacher-portal')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'teacher-portal'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">school</span>
              <span>Teacher Portal</span>
            </button>
            <button
              onClick={() => onNavigate('student-portal')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'student-portal'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">person</span>
              <span>Student Portal</span>
            </button>
            <button
              onClick={() => onNavigate('parent-portal')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'parent-portal'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">family_restroom</span>
              <span>Parent Portal</span>
            </button>
            <button
              onClick={() => onNavigate('results-transcripts')}
              className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                currentScreen === 'results-transcripts'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Results &amp; Transcripts</span>
            </button>
            <button
              onClick={() => onNavigate('courses-batches')}
              className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentScreen === 'courses-batches'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">menu_book</span>
              <span>Courses &amp; Batches</span>
            </button>
            <button
              onClick={() => onNavigate('admissions')}
              className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1.5 ${
                currentScreen === 'admissions'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">contact_support</span>
              <span>Admissions CRM</span>
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                currentScreen === 'landing'
                  ? 'bg-primary-container text-white shadow-sm font-semibold'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              1. Landing Showcase
            </button>
            <button
              onClick={() => onNavigate('register')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                currentScreen === 'register'
                  ? 'bg-primary-container text-white shadow-sm font-semibold'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              2. Create Institution (Step 1)
            </button>
            <button
              onClick={() => onNavigate('onboarding')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                currentScreen === 'onboarding'
                  ? 'bg-primary-container text-white shadow-sm font-semibold'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              3. Campus Setup (Step 2)
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                currentScreen === 'admin'
                  ? 'bg-primary-container text-white shadow-sm font-semibold'
                  : 'text-outline-variant hover:text-white'
              }`}
            >
              4. Super Admin Console
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-outline-variant">
          <ThemeToggle
            variant="compact"
            onToggleCallback={(mode) => onShowToast?.(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode (saved)`)}
          />
          <span className="hidden sm:inline">Multi-Tenant Platform UI</span>
          <span className="text-secondary-fixed flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 99.9% Uptime SLA
          </span>
        </div>
      </div>

      {/* Main Header (Rendered on Landing, Register, and Onboarding screens) */}
      {currentScreen === 'landing' && (
        <header className="sticky top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
          <div className="h-16 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-2 text-left group"
              >
                <img
                  alt="EduManage Brandmark"
                  className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                  src={BRAND_HOTLINKS.logo}
                />
                <span className="font-headline-md text-lg tracking-tight text-on-surface font-bold">
                  EduManage
                </span>
              </button>
              <nav className="hidden lg:flex items-center gap-6 ml-2">
                <a
                  href="#features"
                  className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Features
                </a>
                <a
                  href="#solutions"
                  className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Solutions
                </a>
                <a
                  href="#multi-branch"
                  className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Multi-Branch
                </a>
                <a
                  href="#branch-finder"
                  className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Find Branch
                </a>
                <button
                  onClick={() => onNavigate('admin')}
                  className="font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Admin Hub
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle
                variant="compact"
                onToggleCallback={(mode) => onShowToast?.(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode`)}
              />
              <button
                onClick={() => onNavigate('admin')}
                className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-lg font-label-md text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary-container text-white font-label-md text-sm hover:bg-primary transition-all active:scale-[0.98] shadow-sm"
              >
                Start Free
              </button>
              <button
                onClick={() => onNavigate('admin')}
                title="Super Admin Profile"
                className="relative ring-2 ring-transparent hover:ring-primary rounded-full transition-all"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ml-1"
                  src={BRAND_HOTLINKS.profileSarah}
                />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Simplified Auth Header for Step 1 and Step 2 */}
      {(currentScreen === 'register' || currentScreen === 'onboarding') && (
        <header className="h-16 w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between border-b border-surface-container-low">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-left group"
          >
            <img
              alt="EduManage Brandmark"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={BRAND_HOTLINKS.logo}
            />
            <span className="font-headline-sm text-base text-on-surface font-bold">
              EduManage
            </span>
          </button>
          <div className="flex items-center gap-4">
            <ThemeToggle
              variant="compact"
              onToggleCallback={(mode) => onShowToast?.(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode`)}
            />
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-1 font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Overview
            </button>
            <a
              href="mailto:support@edumanage.io"
              className="inline-flex items-center gap-1 font-label-md text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-lg">support_agent</span>
              Contact Support
            </a>
          </div>
        </header>
      )}
    </>
  );
};
