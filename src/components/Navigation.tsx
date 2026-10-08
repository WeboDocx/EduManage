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
        className="bg-inverse-surface text-inverse-on-surface text-xs py-2 px-3 sm:px-5 sticky top-0 z-[60] border-b border-surface-container-highest/20 flex items-center justify-between gap-2 sm:gap-3 shadow-md"
        aria-label="Main Navigation"
      >
        {/* Left Side: Sidebar toggle + Brand + Landing with #anchors dropdown + Create Institution + Dropdowns */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 flex-wrap">
          {/* Quick Sidebar Toggle on left (only visible on dashboard/admin screens) */}
          {hasSidebarScreen && (
            <button
              onClick={() => {
                toggleSidebar();
                onShowToast?.(isSidebarOpen ? 'Sidebar hide ho gaya' : 'Sidebar show ho gaya');
              }}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer border flex-shrink-0 ${
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
            className="flex items-center gap-1.5 sm:gap-2 text-white font-bold tracking-tight hover:opacity-90 transition-opacity cursor-pointer mr-0.5 group"
            title="EduManage Home"
          >
            <img
              alt="EduManage Logo"
              className="h-6.5 w-6.5 object-contain rounded-md shadow-xs group-hover:scale-105 transition-transform flex-shrink-0"
              src={BRAND_HOTLINKS.logo}
              onError={(e) => {
                // Fallback to svg asset if needed
                (e.currentTarget as HTMLImageElement).src = '/edumanage-logo.svg';
              }}
            />
            <span className="font-headline-sm text-xs sm:text-sm font-bold tracking-tight text-white flex items-center">
              <span>Edu</span>
              <span className="text-blue-400 font-extrabold">Manage</span>
            </span>
          </button>

          <div className="h-4 w-[1px] bg-white/15 hidden sm:block"></div>

          {/* MAIN PAGES */}
          <div className="flex items-center gap-1 sm:gap-1.5">
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
              <span className="hidden md:inline">Create Institution</span>
              <span className="md:hidden">Create</span>
            </button>
          </div>

          <div className="h-4 w-[1px] bg-white/15 hidden md:block"></div>

          {/* DROPDOWN MENUS (Desktop/Tablet) for Admin, Super Admin, Academics, Portals */}
          <div className="hidden md:flex items-center gap-1">
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

        {/* Right Side: Global Search Bar + Quick Action CTA + Admin Hub + Theme Toggle + Sarah Profile + Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
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

          {/* Quick CTA: Start Free Trial / Create Institution */}
          <button
            onClick={() => {
              handleSelectScreen('register');
              onShowToast?.('Opening Step 1: Create Institution registration');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary transition-all active:scale-[0.98] shadow-sm cursor-pointer"
            title="Start Free Registration"
          >
            <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
            <span>Start Free</span>
          </button>

          {/* Quick Hub shortcut: If not on dashboard/admin, allow 1-click switch to Admin Hub */}
          {currentScreen !== 'dashboard' && currentScreen !== 'admin' && (
            <button
              onClick={() => handleSelectScreen('dashboard')}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-outline-variant hover:text-white hover:bg-surface-container-highest/30 text-xs font-semibold transition-all cursor-pointer"
              title="Open Admin Dashboard"
            >
              <span className="material-symbols-outlined text-[14px]">dashboard</span>
              <span>Dashboard</span>
            </button>
          )}

          {/* Theme Toggle (Dark / Light) */}
          <ThemeToggle
            variant="compact"
            onToggleCallback={(mode) => onShowToast?.(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode (saved)`)}
          />

          {/* User Profile Avatar with fast tooltip */}
          <button
            onClick={() => handleSelectScreen('admin')}
            title="Dr. Sarah Jenkins (Super Admin) - Click for Admin Console"
            className="relative ring-2 ring-transparent hover:ring-primary rounded-full transition-all cursor-pointer flex-shrink-0 ml-0.5"
          >
            <img
              alt="Dr. Sarah Jenkins"
              className="w-7 h-7 rounded-full object-cover border border-white/20"
              src={BRAND_HOTLINKS.profileSarah}
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-secondary ring-1 ring-inverse-surface"></span>
          </button>

          {/* Mobile Screen Selector Trigger (Pages Menu) */}
          <div className="md:hidden relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                mobileMenuOpen
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-container-highest/40 hover:bg-surface-container-highest/70 text-white border-white/20'
              }`}
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[17px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
              <span className="text-[11px] font-medium">Pages</span>
            </button>

            {/* Mobile Dropdown Menu Sheet */}
            {mobileMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-2xl bg-surface-container-lowest text-on-surface border border-outline-variant/30 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container mb-2">
                  <span className="font-bold text-xs text-on-surface">Navigate EduManage</span>
                  <span className="text-[10px] text-outline font-mono">Mobile View</span>
                </div>

                {/* Landing Showcase & Anchors */}
                <div className="mb-3">
                  <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1 flex items-center justify-between">
                    <span>Landing Showcase</span>
                    <span className="text-[9px] font-mono">#anchors</span>
                  </div>
                  <button
                    onClick={handleSelectLanding}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 mb-1 ${
                      currentScreen === 'landing' ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">home</span>
                    <span className="font-bold">Landing Home (Top)</span>
                  </button>

                  <div className="pl-2 space-y-0.5 border-l-2 border-surface-container ml-2 my-1">
                    {LANDING_ANCHORS.map((anchor) => (
                      <button
                        key={anchor.id}
                        onClick={() => handleSelectAnchor(anchor.id)}
                        className="w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[13px]">{anchor.icon}</span>
                          <span>{anchor.label}</span>
                        </span>
                        <span className="text-[9px] font-mono text-outline">#{anchor.id}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSelectScreen('register')}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium flex items-center gap-2 mt-1 ${
                      currentScreen === 'register' ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">add_business</span>
                    Create Institution (Step 1)
                  </button>
                </div>

                {/* Admin Pages */}
                <div className="mb-3 border-t border-surface-container pt-2">
                  <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1">Admin Pages</div>
                  {adminItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectScreen(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 mb-0.5 ${
                        currentScreen === item.id ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Super Admin */}
                <div className="mb-3 border-t border-surface-container pt-2">
                  <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1">Super Admin</div>
                  {superAdminItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectScreen(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 mb-0.5 ${
                        currentScreen === item.id ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-500 font-bold">{item.badge}</span>}
                    </button>
                  ))}
                </div>

                {/* Academics */}
                <div className="mb-3 border-t border-surface-container pt-2">
                  <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1">Academics & Exams</div>
                  {academicItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectScreen(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 mb-0.5 ${
                        currentScreen === item.id ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Portals */}
                <div className="border-t border-surface-container pt-2">
                  <div className="text-[10px] font-bold uppercase text-outline tracking-wider px-2 py-1">Portals</div>
                  {portalItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectScreen(item.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 mb-0.5 ${
                        currentScreen === item.id ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
