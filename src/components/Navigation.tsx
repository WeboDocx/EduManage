import React, { useState, useRef, useEffect } from 'react';
import { ScreenType } from '../types';
import { BRAND_HOTLINKS } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';
import { useSidebar } from '../context/SidebarContext';
import { GlobalSearchBar } from './GlobalSearchBar';
import { NotificationCenter } from './NotificationCenter';

interface NavigationProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onShowToast?: (msg: string) => void;
}

interface NavItem {
  id: ScreenType;
  label: string;
  icon: string;
  description?: string;
  badge?: string;
}

interface AnchorItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const LANDING_ANCHORS: AnchorItem[] = [
  { id: 'hero', label: 'Overview & Hero', icon: 'vertical_align_top', description: 'Hero banner, trust metrics & quick demo' },
  { id: 'solutions', label: 'Solutions & Repute', icon: 'verified', description: '1,200+ partner schools and academies' },
  { id: 'features', label: '12 Platform Modules', icon: 'apps', description: 'Students, admissions, fees, RFID & certs' },
  { id: 'multi-branch', label: 'Multi-Branch Topology', icon: 'hub', description: 'HQ command & satellite campus synchronization' },
  { id: 'branch-finder', label: 'Campus Locator & Map', icon: 'map', description: 'Interactive metro map & seat vacancy check' },
  { id: 'cta', label: 'Instant Free Trial', icon: 'rocket_launch', description: 'Quick onboarding & architecture review' },
];

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate, onShowToast }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const hasSidebarScreen = !['landing', 'register', 'onboarding'].includes(currentScreen);

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<'landing' | 'admin' | 'super-admin' | 'academics' | 'portals' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectScreen = (screen: ScreenType) => {
    onNavigate(screen);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLanding = () => {
    onNavigate('landing');
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnchor = (anchorId: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (currentScreen !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Group definitions
  const adminItems: NavItem[] = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: 'grid_view', description: 'Institution KPI overview & alerts' },
    { id: 'students-directory', label: 'Students Directory', icon: 'group', description: 'Student rosters, search & CSV export' },
    { id: 'student-profile', label: 'Student 360° Profile', icon: 'badge', description: 'Academic records, attendance & finance' },
    { id: 'courses-batches', label: 'Courses & Batches', icon: 'menu_book', description: 'Curriculum batches & cohort rosters' },
    { id: 'admissions', label: 'Admissions & CRM', icon: 'contact_support', description: 'Leads, enquiry pipeline & enrollment' },
    { id: 'certificates', label: 'Certificates Console', icon: 'workspace_premium', description: 'Issuance & credential records' },
    { id: 'certificate-studio', label: 'Template Studio', icon: 'draw', description: 'Custom certificate design builder' },
  ];

  const superAdminItems: NavItem[] = [
    { id: 'admin', label: 'Super Admin Console', icon: 'admin_panel_settings', description: 'Multi-campus, tenants & system security', badge: 'PRO' },
    { id: 'onboarding', label: 'Campus Setup (Step 2)', icon: 'domain_add', description: 'Branch campuses & multi-campus wizard' },
  ];

  const academicItems: NavItem[] = [
    { id: 'timetable-schedule', label: 'Timetable & Schedule', icon: 'calendar_month', description: 'Weekly schedules & lecture allocations' },
    { id: 'academics', label: 'Exams & Assessments', icon: 'assignment', description: 'Exam slots, halls & grading schedules' },
    { id: 'marks-entry', label: 'Marks Entry Console', icon: 'grade', description: 'Score inputs & grade calculation sheets' },
    { id: 'results-transcripts', label: 'Results & Transcripts', icon: 'verified', description: 'Report cards, transcripts & rankings' },
    { id: 'assignments-coursework', label: 'Assignments & HW', icon: 'task', description: 'Submissions, rubrics & deadlines' },
  ];

  const portalItems: NavItem[] = [
    { id: 'teacher-portal', label: 'Teacher Portal', icon: 'school', description: 'Attendance, class log & grading hub' },
    { id: 'student-portal', label: 'Student Portal', icon: 'person', description: 'Learner LMS, grades & submissions' },
    { id: 'parent-portal', label: 'Parent Portal', icon: 'family_restroom', description: 'Fee receipts, alerts & progress monitor' },
  ];

  const isAdminActive = adminItems.some(i => i.id === currentScreen);
  const isSuperAdminActive = superAdminItems.some(i => i.id === currentScreen);
  const isAcademicsActive = academicItems.some(i => i.id === currentScreen);
  const isPortalsActive = portalItems.some(i => i.id === currentScreen);

  // Helper to render general dropdown menu
  const renderDropdown = (
    title: string,
    key: 'admin' | 'super-admin' | 'academics' | 'portals',
    icon: string,
    items: NavItem[],
    isActive: boolean
  ) => {
    const isOpen = activeDropdown === key;
    const currentItem = items.find(i => i.id === currentScreen);

    return (
      <div className="relative">
        <button
          onClick={() => setActiveDropdown(isOpen ? null : key)}
          aria-expanded={isOpen}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
            isActive
              ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
              : isOpen
              ? 'bg-surface-container-highest/60 text-white'
              : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/30'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">{icon}</span>
          <span>{title}</span>
          {currentItem && (
            <span className="hidden xl:inline text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-white font-normal truncate max-w-[90px]">
              {currentItem.label.split(' ')[0]}
            </span>
          )}
          <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

        {isOpen && (
          <div
            className="absolute left-0 mt-2 w-72 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/30 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
            style={{ minWidth: '260px' }}
          >
            <div className="px-3 py-1.5 border-b border-surface-container-low mb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">{icon}</span>
                {title} Options
              </span>
              <span className="text-[10px] text-outline-variant font-mono">{items.length} pages</span>
            </div>

            <div className="max-h-[360px] overflow-y-auto py-1">
              {items.map((item) => {
                const isSelected = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectScreen(item.id)}
                    className={`w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-surface-container text-xs transition-colors group cursor-pointer ${
                      isSelected ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-surface-container-high text-on-surface-variant group-hover:bg-primary group-hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`truncate text-xs ${isSelected ? 'font-bold text-primary' : 'font-medium text-on-surface'}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-500 font-bold uppercase">
                            {item.badge}
                          </span>
                        )}
                        {isSelected && (
                          <span className="material-symbols-outlined text-[14px] text-primary">check</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[10px] text-outline line-clamp-1 leading-snug mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* SINGLE PRIMARY TOP NAVIGATION BAR (Consolidated, No Secondary Navbar, No Horizontal Scrollbar) */}
      <nav
        ref={navContainerRef}
        className="bg-inverse-surface text-inverse-on-surface text-xs h-12 px-2.5 sm:px-4 md:px-5 sticky top-0 z-[60] border-b border-surface-container-highest/20 flex items-center justify-between gap-1.5 sm:gap-2 shadow-md flex-nowrap select-none"
        aria-label="Main Navigation"
      >
        {/* Left Side: Mobile Menu trigger + Brand + Desktop Sidebar toggle & Dropdowns */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-nowrap min-w-0">
          {/* Mobile Menu Trigger Button (Visible on mobile & tablet < lg) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-surface-container-highest/40 hover:bg-surface-container-highest/70 text-white border border-white/20 flex items-center justify-center cursor-pointer min-w-[38px] min-h-[38px] active:scale-95 transition-all flex-shrink-0"
            aria-label="Open navigation drawer"
            title="Open All Modules Menu"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>

          {/* Quick Sidebar Toggle (Visible on desktop/laptop for screens with sidebar) */}
          {hasSidebarScreen && (
            <button
              onClick={() => {
                toggleSidebar();
                onShowToast?.(isSidebarOpen ? 'Sidebar hide ho gaya' : 'Sidebar show ho gaya');
              }}
              className={`hidden lg:flex p-1.5 rounded-lg text-xs font-semibold items-center justify-center transition-all cursor-pointer border flex-shrink-0 ${
                isSidebarOpen
                  ? 'bg-surface-container-highest/40 hover:bg-surface-container-highest/70 text-white border-white/20'
                  : 'bg-primary text-white border-primary shadow-xs ring-2 ring-primary/40'
              }`}
              title={isSidebarOpen ? 'Sidebar Hide karein (Ctrl+B)' : 'Sidebar Show karein (Ctrl+B)'}
              aria-label={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            >
              <span className="material-symbols-outlined text-[17px]">
                {isSidebarOpen ? 'left_panel_close' : 'left_panel_open'}
              </span>
            </button>
          )}

          {/* Logo / Brandmark with EduManage branding */}
          <button
            onClick={handleSelectLanding}
            className="flex items-center gap-1.5 sm:gap-2 text-white font-bold tracking-tight hover:opacity-90 transition-opacity cursor-pointer mr-0.5 group flex-shrink-0"
            title="EduManage Home"
          >
            <img
              alt="EduManage Logo"
              className="h-6 w-6 sm:h-6.5 sm:w-6.5 object-contain rounded-md shadow-xs group-hover:scale-105 transition-transform flex-shrink-0"
              src={BRAND_HOTLINKS.logo}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/edumanage-logo.svg';
              }}
            />
            <div className="flex flex-col text-left leading-none">
              <span className="font-headline-sm text-xs sm:text-sm font-bold tracking-tight text-white flex items-center">
                <span>Edu</span>
                <span className="text-blue-400 font-extrabold">Manage</span>
              </span>
              <span className="hidden xs:inline sm:hidden text-[9px] text-blue-200/70 font-mono font-medium truncate max-w-[90px] mt-0.5">
                Apex OS
              </span>
            </div>
          </button>

          <div className="h-4 w-[1px] bg-white/15 hidden md:block"></div>

          {/* MAIN PAGES (Desktop only: Hidden on mobile to keep bar 1-line clean) */}
          <div className="hidden md:flex items-center gap-1 sm:gap-1.5">
            {/* 1. Landing Page with #Anchors Dropdown */}
            <div className="relative">
              <div
                className={`inline-flex items-center rounded-lg transition-all ${
                  currentScreen === 'landing'
                    ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                    : activeDropdown === 'landing'
                    ? 'bg-surface-container-highest/60 text-white'
                    : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/30'
                }`}
              >
                <button
                  onClick={handleSelectLanding}
                  className="px-2.5 py-1.5 font-semibold flex items-center gap-1.5 text-xs cursor-pointer select-none"
                  title="Landing Page Overview"
                >
                  <span className="material-symbols-outlined text-[15px]">home</span>
                  <span>Landing</span>
                </button>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'landing' ? null : 'landing')}
                  aria-expanded={activeDropdown === 'landing'}
                  className={`pr-1.5 pl-0.5 py-1.5 text-xs cursor-pointer flex items-center justify-center transition-opacity hover:opacity-80 ${
                    currentScreen === 'landing' ? 'border-l border-white/20' : ''
                  }`}
                  title="Landing Page Section #Anchors"
                  aria-label="Toggle Landing page section links"
                >
                  <span className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${activeDropdown === 'landing' ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
              </div>

              {/* Landing Anchors Dropdown Menu */}
              {activeDropdown === 'landing' && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/30 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
                  style={{ minWidth: '270px' }}
                >
                  <div className="px-3 py-1.5 border-b border-surface-container-low mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-outline-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">tag</span>
                      Landing Sections
                    </span>
                    <span className="text-[10px] text-outline-variant font-mono">#anchors</span>
                  </div>

                  <div className="max-h-[360px] overflow-y-auto py-1">
                    {LANDING_ANCHORS.map((anchor) => (
                      <button
                        key={anchor.id}
                        onClick={() => handleSelectAnchor(anchor.id)}
                        className="w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-surface-container text-xs transition-colors group cursor-pointer text-on-surface-variant"
                      >
                        <div className="p-1.5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors bg-surface-container-high text-on-surface-variant group-hover:bg-primary group-hover:text-white">
                          <span className="material-symbols-outlined text-[15px]">{anchor.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="truncate text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                              {anchor.label}
                            </span>
                            <span className="text-[10px] font-mono text-outline opacity-80 bg-surface-container-high px-1 py-0.5 rounded">
                              #{anchor.id}
                            </span>
                          </div>
                          <p className="text-[10px] text-outline line-clamp-1 leading-snug mt-0.5">
                            {anchor.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Create Institution (Step 1) */}
            <button
              onClick={() => handleSelectScreen('register')}
              className={`px-2.5 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-xs cursor-pointer ${
                currentScreen === 'register'
                  ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/20'
                  : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/30'
              }`}
              title="Create Institution - Step 1"
            >
              <span className="material-symbols-outlined text-[15px]">add_business</span>
              <span>Create Institution</span>
            </button>
          </div>

          <div className="h-4 w-[1px] bg-white/15 hidden lg:block"></div>

          {/* DROPDOWN MENUS (Desktop/Tablet) for Admin, Super Admin, Academics, Portals */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Admin Pages Dropdown */}
            {renderDropdown('Admin Pages', 'admin', 'admin_panel_settings', adminItems, isAdminActive)}

            {/* Super Admin Dropdown */}
            {renderDropdown('Super Admin', 'super-admin', 'shield_person', superAdminItems, isSuperAdminActive)}

            {/* Academics Dropdown */}
            {renderDropdown('Academics', 'academics', 'auto_stories', academicItems, isAcademicsActive)}

            {/* Portals Dropdown */}
            {renderDropdown('Portals', 'portals', 'hub', portalItems, isPortalsActive)}
          </div>
        </div>

        {/* Right Side: Global Search Bar + Notification Center + Theme Toggle + Sarah Profile */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 flex-nowrap">
          {/* Global Search Bar (Quick jump to students, courses, or admin pages) */}
          <GlobalSearchBar
            onNavigate={handleSelectScreen}
            onShowToast={onShowToast}
          />

          {/* Notification Center Dropdown (System alerts, task deadlines, academic announcements) */}
          <NotificationCenter
            onNavigate={handleSelectScreen}
            onShowToast={onShowToast}
          />

          {/* Theme Toggle (Dark / Light) */}
          <ThemeToggle
            variant="compact"
            onToggleCallback={(mode) => onShowToast?.(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode (saved)`)}
          />

          {/* Quick CTA: Start Free Trial / Create Institution (Visible on desktop) */}
          <button
            onClick={() => {
              handleSelectScreen('register');
              onShowToast?.('Opening Step 1: Create Institution registration');
            }}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary transition-all active:scale-[0.98] shadow-sm cursor-pointer"
            title="Start Free Registration"
          >
            <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
            <span>Start Free</span>
          </button>

          {/* User Profile Avatar with fast tooltip (Desktop/Tablet) */}
          <button
            onClick={() => handleSelectScreen('admin')}
            title="Dr. Sarah Jenkins (Super Admin) - Click for Admin Console"
            className="hidden sm:block relative ring-2 ring-transparent hover:ring-primary rounded-full transition-all cursor-pointer flex-shrink-0 ml-0.5"
          >
            <img
              alt="Dr. Sarah Jenkins"
              className="w-7 h-7 rounded-full object-cover border border-white/20"
              src={BRAND_HOTLINKS.profileSarah}
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-secondary ring-1 ring-inverse-surface"></span>
          </button>
        </div>
      </nav>

      {/* MOBILE FULL SLIDE-OVER NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[70] transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div
            className="fixed inset-y-0 right-0 w-[88vw] max-w-[350px] bg-surface-container-lowest text-on-surface z-[80] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="h-14 px-4 bg-surface-container-low/80 border-b border-outline-variant/20 flex items-center justify-between flex-shrink-0">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleSelectLanding}
              >
                <img
                  alt="EduManage Logo"
                  className="h-6 w-6 object-contain rounded-md"
                  src={BRAND_HOTLINKS.logo}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/edumanage-logo.svg';
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-on-surface leading-tight">
                    Edu<span className="text-primary font-extrabold">Manage</span>
                  </span>
                  <span className="text-[10px] text-outline font-medium">Apex Academic OS</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Quick Profile & Current Screen Status */}
            <div className="p-3 bg-surface-container-lowest border-b border-outline-variant/15 flex flex-col gap-2.5 flex-shrink-0">
              {/* Active Screen Indicator */}
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Active Screen
                </span>
                <span className="text-[11px] font-bold text-on-surface capitalize truncate max-w-[170px]">
                  {currentScreen.replace('-', ' ')}
                </span>
              </div>

              {/* In-drawer Quick Search Bar Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface text-xs transition-colors cursor-pointer group"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">search</span>
                <span className="flex-1 text-left text-outline truncate group-hover:text-on-surface">
                  Search students, courses, pages...
                </span>
                <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-surface-container-high text-outline">
                  ⌘K
                </kbd>
              </button>

              {/* In-Drawer Interactive Theme Switcher Row */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-primary">dark_mode</span>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-on-surface">Theme Mode</span>
                    <span className="text-[10px] text-outline">Dark / Light preview</span>
                  </div>
                </div>
                <ThemeToggle
                  variant="compact"
                  onToggleCallback={(mode) => onShowToast?.(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode`)}
                />
              </div>

              {/* Quick Jump Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleSelectScreen('dashboard')}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-primary text-on-primary text-xs font-semibold shadow-xs hover:bg-primary-container transition-colors cursor-pointer min-h-[40px]"
                >
                  <span className="material-symbols-outlined text-[16px]">dashboard</span>
                  <span>Dashboard</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectScreen('register')}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold transition-colors cursor-pointer min-h-[40px]"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">add_business</span>
                  <span>New Campus</span>
                </button>
              </div>
            </div>

            {/* Scrollable Navigation Modules in Drawer */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs divide-y divide-outline-variant/10">
              {/* 1. Core Administrative Modules */}
              <div className="pt-1">
                <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1 mb-1">
                  Core Admin Modules ({adminItems.length})
                </div>
                <div className="space-y-0.5">
                  {adminItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectScreen(item.id)}
                      className={`w-full text-left px-2.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer min-h-[42px] ${
                        currentScreen === item.id
                          ? 'bg-primary text-white font-bold shadow-xs'
                          : 'hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[18px] ${currentScreen === item.id ? 'text-white' : 'text-primary'}`}>
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block truncate">{item.label}</span>
                        {item.description && (
                          <span className={`text-[10px] block truncate ${currentScreen === item.id ? 'text-white/80' : 'text-outline'}`}>
                            {item.description}
                          </span>
                        )}
                      </div>
                      {currentScreen === item.id && (
                        <span className="material-symbols-outlined text-[15px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Academics & Exams */}
              <div className="pt-3">
                <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1 mb-1">
                  Academics & Examination ({academicItems.length})
                </div>
                <div className="space-y-0.5">
                  {academicItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectScreen(item.id)}
                      className={`w-full text-left px-2.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer min-h-[42px] ${
                        currentScreen === item.id
                          ? 'bg-primary text-white font-bold shadow-xs'
                          : 'hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[18px] ${currentScreen === item.id ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`}>
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block truncate">{item.label}</span>
                        {item.description && (
                          <span className={`text-[10px] block truncate ${currentScreen === item.id ? 'text-white/80' : 'text-outline'}`}>
                            {item.description}
                          </span>
                        )}
                      </div>
                      {currentScreen === item.id && (
                        <span className="material-symbols-outlined text-[15px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Multi-Role Portals */}
              <div className="pt-3">
                <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1 mb-1">
                  Multi-Role Portals ({portalItems.length})
                </div>
                <div className="space-y-0.5">
                  {portalItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectScreen(item.id)}
                      className={`w-full text-left px-2.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer min-h-[42px] ${
                        currentScreen === item.id
                          ? 'bg-primary text-white font-bold shadow-xs'
                          : 'hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[18px] ${currentScreen === item.id ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block truncate">{item.label}</span>
                        {item.description && (
                          <span className={`text-[10px] block truncate ${currentScreen === item.id ? 'text-white/80' : 'text-outline'}`}>
                            {item.description}
                          </span>
                        )}
                      </div>
                      {currentScreen === item.id && (
                        <span className="material-symbols-outlined text-[15px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Super Admin & Infrastructure */}
              <div className="pt-3">
                <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1 mb-1">
                  Super Admin Console ({superAdminItems.length})
                </div>
                <div className="space-y-0.5">
                  {superAdminItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectScreen(item.id)}
                      className={`w-full text-left px-2.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer min-h-[42px] ${
                        currentScreen === item.id
                          ? 'bg-primary text-white font-bold shadow-xs'
                          : 'hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[18px] ${currentScreen === item.id ? 'text-white' : 'text-amber-600 dark:text-amber-400'}`}>
                        {item.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block truncate">{item.label}</span>
                        {item.description && (
                          <span className={`text-[10px] block truncate ${currentScreen === item.id ? 'text-white/80' : 'text-outline'}`}>
                            {item.description}
                          </span>
                        )}
                      </div>
                      {item.badge && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/15 text-amber-600 font-bold uppercase">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Landing Showcase & Section Anchors */}
              <div className="pt-3">
                <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1 mb-1 flex items-center justify-between">
                  <span>Landing Showcase</span>
                  <span className="text-[9px] font-mono text-outline">#anchors</span>
                </div>
                <button
                  onClick={handleSelectLanding}
                  className={`w-full text-left px-2.5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2.5 mb-1 cursor-pointer min-h-[42px] ${
                    currentScreen === 'landing' ? 'bg-primary text-white font-bold shadow-xs' : 'hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  <span>Landing Home (Overview)</span>
                </button>

                <div className="pl-3 space-y-0.5 border-l-2 border-surface-container ml-2 my-1">
                  {LANDING_ANCHORS.map((anchor) => (
                    <button
                      key={anchor.id}
                      onClick={() => handleSelectAnchor(anchor.id)}
                      className="w-full text-left px-2 py-2 rounded text-[11px] flex items-center justify-between hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer min-h-[38px]"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="material-symbols-outlined text-[14px] text-outline">{anchor.icon}</span>
                        <span className="truncate">{anchor.label}</span>
                      </span>
                      <span className="text-[9px] font-mono text-outline flex-shrink-0">#{anchor.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-surface-container-low/80 border-t border-outline-variant/15 flex flex-col gap-2 text-xs flex-shrink-0">
              <div
                onClick={() => handleSelectScreen('admin')}
                className="flex items-center justify-between p-2 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    alt="Dr. Sarah Jenkins"
                    className="w-8 h-8 rounded-full object-cover border border-outline-variant/40 flex-shrink-0"
                    src={BRAND_HOTLINKS.profileSarah}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">Dr. Sarah Jenkins</p>
                    <p className="text-[10px] text-outline truncate">Super Admin • Apex HQ</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-primary">Admin Console →</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold cursor-pointer transition-colors"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION DOCK (Native App-Like Ergonomic Thumb Navigation) */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant/30 z-[55] flex items-center justify-around px-1 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] select-none"
        role="navigation"
        aria-label="Mobile Bottom Navigation"
      >
        {/* 1. Dashboard */}
        <button
          onClick={() => handleSelectScreen('dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex-1 min-h-[44px] ${
            currentScreen === 'dashboard'
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          title="Admin Dashboard"
        >
          <span className="material-symbols-outlined text-[20px]">
            grid_view
          </span>
          <span className="leading-tight mt-0.5 text-[9px]">Dashboard</span>
        </button>

        {/* 2. Students */}
        <button
          onClick={() => handleSelectScreen('students-directory')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex-1 min-h-[44px] ${
            ['students-directory', 'student-profile'].includes(currentScreen)
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          title="Students Directory"
        >
          <span className="material-symbols-outlined text-[20px]">
            group
          </span>
          <span className="leading-tight mt-0.5 text-[9px]">Students</span>
        </button>

        {/* 3. Academics */}
        <button
          onClick={() => handleSelectScreen('timetable-schedule')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex-1 min-h-[44px] ${
            ['timetable-schedule', 'academics', 'marks-entry', 'results-transcripts', 'assignments-coursework'].includes(currentScreen)
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          title="Academics & Schedule"
        >
          <span className="material-symbols-outlined text-[20px]">
            menu_book
          </span>
          <span className="leading-tight mt-0.5 text-[9px]">Academics</span>
        </button>

        {/* 4. Admissions */}
        <button
          onClick={() => handleSelectScreen('admissions')}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex-1 min-h-[44px] ${
            ['admissions', 'courses-batches', 'certificates'].includes(currentScreen)
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          title="Admissions & CRM"
        >
          <span className="material-symbols-outlined text-[20px]">
            contact_support
          </span>
          <span className="leading-tight mt-0.5 text-[9px]">Admissions</span>
        </button>

        {/* 5. Menu Drawer */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex-1 min-h-[44px] ${
            mobileMenuOpen
              ? 'text-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          title="All Navigation Modules"
        >
          <span className="material-symbols-outlined text-[20px]">
            apps
          </span>
          <span className="leading-tight mt-0.5 text-[9px]">All Menu</span>
        </button>
      </div>
    </>
  );
};
