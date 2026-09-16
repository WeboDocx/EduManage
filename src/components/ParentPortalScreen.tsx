import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface ParentPortalScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

interface MessageItem {
  id: string;
  sender: 'mentor' | 'guardian';
  senderName: string;
  initials: string;
  text: string;
  time: string;
  status?: string;
}

export const ParentPortalScreen: React.FC<ParentPortalScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  // Mobile sidebar visibility state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Ward selection state: 'aarav' or 'ananya'
  const [selectedWard, setSelectedWard] = useState<'aarav' | 'ananya'>('aarav');
  const [isWardDropdownOpen, setIsWardDropdownOpen] = useState(false);

  // Mentor chat state
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: '1',
      sender: 'mentor',
      senderName: 'Rahul Sharma',
      initials: 'RS',
      text: 'Hello Mr. Kumar, Aarav has shown great improvement in coordinate geometry. Please ensure he practices the mock test paper 3 this weekend.',
      time: 'Today, 10:14 AM',
    },
    {
      id: '2',
      sender: 'guardian',
      senderName: 'Suresh Kumar',
      initials: 'SK',
      text: 'Thank you, sir. We will monitor his weekend practice tests and review his formulas.',
      time: 'Today, 10:28 AM • Read',
    },
  ]);
  const [replyText, setReplyText] = useState('');

  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isFeePaid, setIsFeePaid] = useState(false);

  // Live GPS tracking modal
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg: MessageItem = {
      id: Date.now().toString(),
      sender: 'guardian',
      senderName: 'Suresh Kumar',
      initials: 'SK',
      text: replyText.trim(),
      time: 'Just now • Sent',
    };

    setMessages((prev) => [...prev, newMsg]);
    setReplyText('');
    onShowToast('Message dispatched directly to Mentor Rahul Sharma.');

    // Simulated mentor auto-reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'mentor',
          senderName: 'Rahul Sharma',
          initials: 'RS',
          text: 'Acknowledged. I will also review his homework submission by 4 PM today.',
          time: 'Just now',
        },
      ]);
    }, 2000);
  };

  const handleConfirmPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setIsPaymentModalOpen(false);
      setIsFeePaid(true);
      setPaymentSuccess(false);
      onShowToast('Payment of ₹4,500 processed successfully via UPI! Receipt REC-2026-001285 issued.');
    }, 1200);
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

            {/* Institutional Portals (PARENT PORTAL IS ACTIVE) */}
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

                {/* ACTIVE TAB: Parent Portal */}
                <button
                  aria-current="page"
                  className="w-full flex items-center gap-space-sm px-space-sm py-2 bg-primary-container text-on-primary font-semibold rounded-lg shadow-xs text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">family_restroom</span>
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
          {/* Breadcrumb & Year */}
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
              onClick={() => onShowToast('Quick search activated (Press ⌘K).')}
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
                onClick={() => onShowToast('3 pending notifications: 1 fee installment due, 1 homework submitted, 1 upcoming exam.')}
                className="relative p-2 rounded-lg text-outline hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center font-semibold leading-none">
                  3
                </span>
              </button>
              <button
                onClick={() => onShowToast('Parent Portal Help & Safety FAQ')}
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
        {/* 3. PARENT PORTAL MAIN WORKSPACE CANVAS */}
        {/* ========================================================================= */}
        <main className="w-full pt-16 bg-background min-h-screen px-space-xl py-space-xl">
          <div className="flex flex-col w-full space-y-space-lg">
            {/* Top Announcement Scrim / Trust Notification */}
            <div className="w-full bg-surface-container-low rounded-xl px-space-md py-space-sm flex flex-wrap items-center justify-between gap-space-sm shadow-xs border border-outline-variant/20">
              <div className="flex items-center gap-space-sm min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse flex-shrink-0"></span>
                <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold tracking-wider">
                  Live Campus Feed
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-body-sm text-body-sm text-on-surface truncate">
                  Parent Portal authenticated for <strong>Suresh Kumar</strong> • Biometric RFID gateways active at Siliguri Campus
                </span>
              </div>
              <div className="flex items-center gap-space-md text-on-surface-variant font-data-mono text-body-sm">
                <span>Session Key: SEC-PA-88219</span>
                <span className="bg-surface-container-highest text-primary px-2 py-0.5 rounded-md font-label-sm text-label-sm font-semibold">
                  Guardianship Verified
                </span>
              </div>
            </div>

            {/* Primary Profile & Active Ward Switcher Context Bar */}
            <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg border border-outline-variant/20">
              <div className="flex flex-col sm:flex-row sm:items-center gap-space-lg">
                <div className="relative flex-shrink-0">
                  {selectedWard === 'aarav' ? (
                    <img
                      className="w-20 h-20 rounded-xl object-cover shadow-md"
                      alt="Aarav Sharma"
                      referrerPolicy="no-referrer"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0wU3Q-PqSly3EF4mXI6vL4UqAalH2v3Cuu3pCNrsI8ruiy0_iC_pR3dgnc2dx9AWYw7Ms-oi9YlSsdH8Ae2_CEy0fQELbAyakQyN1as0heOO4TFQ-Ojz_D8-ToNB8Nbs0hDnaLGlAD4gM9sHYAfuIWNsTkfq5RMC0l8l5iHT0wBeBrig0PALf4mpQ6wnboaecYAubiJn8KhkW9yorIw093kcBueHOBW2Sjg30ea_MQ2lUeoYixaNB"
                    />
                  ) : (
                    <img
                      className="w-20 h-20 rounded-xl object-cover shadow-md"
                      alt="Ananya Kumar"
                      referrerPolicy="no-referrer"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqLx394Y0V26l5ikrHtOZXa6qUFuuU4z4GbgagakLXyh818W7S3_PvzW9nUC6Rj04OvXnHZ0PMBFYYsI32-lNyQY2nd44fJYnOX6a7B9WSW3zzYLYd01gQIjHnEDr1HWuUXkZ4Lt094YPYyDYH9QvYUS6GF5gFemJwLBrHwwgLx6uu9pMlwniFSTv_JonsDPz2Fe2Cpfp6mDjZe4EzXCP-0HFpX4Nq0jyvGlL6sVVZ5vTJNRX_GERu"
                    />
                  )}
                  <span className="absolute -bottom-1.5 -right-1.5 bg-primary text-on-primary text-[10px] font-label-sm px-1.5 py-0.5 rounded-md shadow-xs font-bold tracking-tight">
                    ACTIVE
                  </span>
                </div>

                <div className="flex flex-col space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-space-sm gap-y-1">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
                      {selectedWard === 'aarav' ? 'Aarav Sharma' : 'Ananya Kumar'}
                    </h1>
                    <span className="font-data-mono text-body-sm text-outline px-2 py-0.5 bg-surface-container-low rounded-md border border-outline-variant/20">
                      ID: {selectedWard === 'aarav' ? 'ZAYN-SIL-26-000125' : 'ZAYN-SIL-26-000189'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                      {selectedWard === 'aarav' ? 'Class 11 (Science)' : 'Class 7 (Junior Wing)'}
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {selectedWard === 'aarav'
                      ? 'JEE Foundation Morning Cohort (Batch A) • Siliguri HQ Campus • Roll #18'
                      : 'Foundation Section 7-B • Siliguri HQ Campus • Roll #09'}
                  </p>

                  <div className="flex flex-wrap items-center gap-space-md pt-1 font-body-sm text-body-sm text-outline">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">person_outline</span>
                      Class Mentor:{' '}
                      <strong className="text-on-surface ml-0.5">
                        {selectedWard === 'aarav' ? 'Rahul Sharma (Sr. Mathematics)' : 'Mrs. Sunita Verma (English Lit)'}
                      </strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
                      Emergency Desk: <strong className="text-on-surface ml-0.5">+91 (80) 4122-8900</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Ward Switcher Control + Primary Actions */}
              <div className="flex flex-wrap items-center gap-space-sm xl:self-center">
                {/* Child Switcher Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsWardDropdownOpen(!isWardDropdownOpen)}
                    className="flex items-center gap-space-sm px-space-md py-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg transition-colors font-label-md text-label-md border border-outline-variant/20 cursor-pointer"
                    id="childSwitcherBtn"
                  >
                    <span className="material-symbols-outlined text-primary text-[20px]">swap_horiz</span>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-outline uppercase font-semibold leading-none">Switch Child</span>
                      <span className="font-semibold text-on-surface text-body-sm">
                        {selectedWard === 'aarav' ? 'Aarav (Grade 11)' : 'Ananya (Grade 7)'}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
                  </button>

                  {isWardDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-72 bg-surface-container-lowest rounded-xl shadow-xl p-space-xs z-30 border border-outline-variant/30 animate-fadeIn">
                      <div className="px-space-sm py-2 font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Registered Wards (2)
                      </div>

                      {/* Option 1: Aarav */}
                      <div
                        onClick={() => {
                          setSelectedWard('aarav');
                          setIsWardDropdownOpen(false);
                          onShowToast('Active ward switched to Aarav Sharma (Grade 11 Science).');
                        }}
                        className={`p-space-sm rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                          selectedWard === 'aarav'
                            ? 'bg-surface-container-high/60'
                            : 'hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                          <div>
                            <div className="font-label-md text-label-md font-semibold text-on-surface">Aarav Sharma</div>
                            <div className="font-body-sm text-body-sm text-outline">Class 11 Science • JEE Cohort</div>
                          </div>
                        </div>
                        {selectedWard === 'aarav' ? (
                          <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                        ) : (
                          <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">
                            Switch
                          </span>
                        )}
                      </div>

                      {/* Option 2: Ananya */}
                      <div
                        onClick={() => {
                          setSelectedWard('ananya');
                          setIsWardDropdownOpen(false);
                          onShowToast('Active ward switched to Ananya Kumar (Grade 7-B Junior Wing).');
                        }}
                        className={`p-space-sm rounded-lg flex items-center justify-between cursor-pointer transition-colors mt-1 ${
                          selectedWard === 'ananya'
                            ? 'bg-surface-container-high/60'
                            : 'hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-secondary text-[20px]">backpack</span>
                          <div>
                            <div className="font-label-md text-label-md font-semibold text-on-surface">Ananya Kumar</div>
                            <div className="font-body-sm text-body-sm text-outline">Grade 7-B • Junior Wing</div>
                          </div>
                        </div>
                        {selectedWard === 'ananya' ? (
                          <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                        ) : (
                          <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded">
                            Switch
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    const el = document.getElementById('mentor-desk');
                    el?.scrollIntoView({ behavior: 'smooth' });
                    onShowToast('Scrolled to Mentor Desk communication channel.');
                  }}
                  className="px-space-md py-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-colors border border-outline-variant/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">chat_bubble_outline</span>
                  <span>Message Mentor</span>
                </button>

                <button
                  onClick={() => {
                    if (isFeePaid) {
                      onShowToast('All Q3 term fees have already been settled. Thank you!');
                    } else {
                      setIsPaymentModalOpen(true);
                    }
                  }}
                  className="px-space-md py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary-container transition-all flex items-center gap-1.5 active:scale-[0.98] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  <span>{isFeePaid ? 'Fees Cleared (₹0)' : 'Pay Fees (₹4,500)'}</span>
                </button>
              </div>
            </div>

            {/* Key Metrics Row (4 Dense Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
              {/* 1. Attendance */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Cumulative Attendance
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                        {selectedWard === 'aarav' ? '87.4%' : '96.0%'}
                      </span>
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-semibold">
                        Compliant
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">event_available</span>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-secondary h-full rounded-full transition-all duration-500"
                      style={{ width: selectedWard === 'aarav' ? '87.4%' : '96%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center font-data-mono text-body-sm text-outline">
                    <span>{selectedWard === 'aarav' ? '108 Present' : '114 Present'}</span>
                    <span>{selectedWard === 'aarav' ? '10 Absent' : '2 Absent'}</span>
                    <span>{selectedWard === 'aarav' ? '4 Late' : '1 Late'}</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-secondary font-medium pt-0.5">
                    Satisfies CBSE Board mandate minimum (&gt;75%)
                  </p>
                </div>
              </div>

              {/* 2. Fee Due Notice */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-label-sm text-label-sm uppercase tracking-wider font-semibold ${
                          isFeePaid || selectedWard === 'ananya' ? 'text-secondary' : 'text-error'
                        }`}
                      >
                        {isFeePaid || selectedWard === 'ananya' ? 'Tuition Cleared' : 'Fee Installment Due'}
                      </span>
                      {!isFeePaid && selectedWard === 'aarav' && (
                        <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                        {isFeePaid || selectedWard === 'ananya' ? '₹0' : '₹4,500'}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">/ Q3 Term</span>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isFeePaid || selectedWard === 'ananya'
                        ? 'bg-secondary-container/60 text-secondary'
                        : 'bg-error-container/60 text-error'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                  </div>
                </div>

                <div className="mt-4 pt-1">
                  <div className="flex items-center justify-between text-body-sm font-body-sm text-outline mb-2">
                    <span>
                      {isFeePaid || selectedWard === 'ananya'
                        ? 'Next Cycle: Q4 Term'
                        : 'Due date: '}
                      <strong>{!isFeePaid && selectedWard === 'aarav' ? '20 Sep 2026' : '01 Jan 2027'}</strong>
                    </span>
                    <span
                      className={`font-semibold ${
                        isFeePaid || selectedWard === 'ananya' ? 'text-secondary' : 'text-error'
                      }`}
                    >
                      {isFeePaid || selectedWard === 'ananya' ? 'Settled' : '4 days grace'}
                    </span>
                  </div>

                  {isFeePaid || selectedWard === 'ananya' ? (
                    <button
                      onClick={() => onShowToast('Downloading official Q3 payment receipt PDF.')}
                      className="w-full py-2 bg-secondary-container text-on-secondary-container font-label-md text-label-md rounded-lg flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:opacity-90"
                    >
                      <span>Download Receipt</span>
                      <span className="material-symbols-outlined text-[16px]">download</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsPaymentModalOpen(true)}
                      className="w-full py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-1.5 shadow-xs hover:bg-primary-container transition-all cursor-pointer"
                    >
                      <span>Pay Online Now</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Next Assessment */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Next Scheduled Exam
                    </span>
                    <div className="mt-1">
                      <span className="font-headline-md text-headline-md font-semibold text-on-surface truncate block">
                        {selectedWard === 'aarav' ? 'Mathematics Paper II' : 'English Literature & Grammar'}
                      </span>
                      <span className="font-body-sm text-body-sm text-primary font-medium">
                        Mid-Term Assessment Series
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">history_edu</span>
                  </div>
                </div>

                <div className="mt-4 pt-1">
                  <div className="p-2 bg-surface-container-low rounded-lg flex items-center justify-between font-data-mono text-body-sm text-on-surface border border-outline-variant/10">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                      20 Sep • 09:30 AM
                    </span>
                    <span className="font-label-sm text-label-sm bg-surface-container-lowest px-2 py-0.5 rounded text-outline border border-outline-variant/20">
                      Hall B
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-body-sm text-outline">
                    <span>Weightage: 35% final score</span>
                    <button
                      onClick={() => onShowToast('Exam syllabus PDF opened.')}
                      className="text-primary font-medium cursor-pointer hover:underline"
                    >
                      Syllabus PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Academic Rating */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/20">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Overall Academic Rating
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                        {selectedWard === 'aarav' ? '87.6%' : '92.4%'}
                      </span>
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                        {selectedWard === 'aarav' ? 'Grade A' : 'Grade A+'}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">military_tech</span>
                  </div>
                </div>

                <div className="mt-4 pt-1 space-y-1">
                  <div className="flex items-center justify-between text-body-sm font-body-sm">
                    <span className="text-outline">Cohort Standing:</span>
                    <span className="font-semibold text-on-surface font-data-mono">
                      {selectedWard === 'aarav' ? 'Rank #3 of 42' : 'Rank #2 of 38'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm">
                    <span className="text-outline">Distinction Status:</span>
                    <span className="font-semibold text-secondary">Earned Honours</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-outline pt-1 truncate">
                    {selectedWard === 'aarav'
                      ? 'Top percentile in Advanced Calculus & CS'
                      : 'High honors in English, Science & Social'}
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Asymmetric Layout Canvas: 60% Operations vs 40% Action Center */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              {/* Left Column (60% Desktop - Col span 7) */}
              <div className="lg:col-span-7 space-y-space-lg">
                {/* 1. Real-Time Physical Safety & Biometric Gate Log */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">sensor_door</span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Campus Safety &amp; Biometric Gate Log
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">
                          Real-time turnstile access and safe transport telemetry
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                      Safe On-Campus
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm bg-surface-container-low p-space-md rounded-xl border border-outline-variant/10">
                    {/* Entry Checkpoint */}
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Morning Entry
                      </span>
                      <div className="font-headline-sm text-headline-sm text-on-surface font-bold">08:48 AM</div>
                      <div className="font-body-sm text-body-sm text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-secondary">badge</span>
                        <span>Gate 2 Turnstile • RFID OK</span>
                      </div>
                    </div>

                    {/* Current Presence */}
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Current Verified Zone
                      </span>
                      <div className="font-headline-sm text-headline-sm text-primary font-bold">Lab 204 (Physics)</div>
                      <div className="font-body-sm text-body-sm text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
                        <span>Science Block (2nd Floor)</span>
                      </div>
                    </div>

                    {/* Expected Departure & Bus */}
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                        Expected Departure
                      </span>
                      <div className="font-headline-sm text-headline-sm text-on-surface font-bold">03:30 PM</div>
                      <div className="font-body-sm text-body-sm text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-outline">directions_bus</span>
                        <span>Bus Route #14 (Siliguri)</span>
                      </div>
                    </div>
                  </div>

                  {/* Transit live GPS tracking pill */}
                  <div className="mt-space-sm p-space-sm bg-surface-container-high/40 rounded-lg flex items-center justify-between border border-outline-variant/10">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[20px]">fmd_good</span>
                      <div className="font-body-sm text-body-sm text-on-surface">
                        Transport Fleet: <strong>Bus #14 (Driver: M. Das • Ph: 98321-44550)</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsGpsModalOpen(true)}
                      className="px-space-sm py-1 bg-surface-container-lowest hover:bg-surface-container text-primary font-label-sm text-label-sm font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1 border border-outline-variant/20 cursor-pointer"
                    >
                      <span>Track Live GPS</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* 2. Today's Academic Schedule & Live Classroom Pulse */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Today's Class Schedule
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">Thursday • 18 September 2026</p>
                      </div>
                    </div>
                    <span className="font-data-mono text-body-sm text-outline">4 of 6 Sessions</span>
                  </div>

                  <div className="space-y-space-sm">
                    {/* Period 1: Completed */}
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                      <div className="flex items-center gap-space-md">
                        <span className="font-data-mono text-body-sm font-semibold text-outline w-16">09:00 AM</span>
                        <div className="w-1.5 h-8 rounded-full bg-secondary"></div>
                        <div>
                          <div className="font-label-md text-label-md font-semibold text-on-surface">
                            Advanced Mathematics (Calculus II)
                          </div>
                          <div className="font-body-sm text-body-sm text-outline">
                            Faculty: Rahul Sharma • Room 104
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold bg-secondary-container/40 px-2 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        <span>Attended</span>
                      </div>
                    </div>

                    {/* Period 2: Ongoing Active Period */}
                    <div className="p-space-sm rounded-lg bg-surface-container-high/60 flex items-center justify-between shadow-xs ring-1 ring-primary/20">
                      <div className="flex items-center gap-space-md">
                        <span className="font-data-mono text-body-sm font-bold text-primary w-16">10:15 AM</span>
                        <div className="w-1.5 h-8 rounded-full bg-primary animate-pulse"></div>
                        <div>
                          <div className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-2">
                            <span>Physics Experimental Lab</span>
                            <span className="px-1.5 py-0.2 bg-primary text-on-primary text-[10px] font-label-sm font-bold rounded uppercase">
                              In Progress
                            </span>
                          </div>
                          <div className="font-body-sm text-body-sm text-outline">
                            Faculty: Amit Kumar • Optics Lab 204
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold bg-primary-fixed px-2 py-0.5 rounded">
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                        <span>Ongoing</span>
                      </div>
                    </div>

                    {/* Period 3: Upcoming */}
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                      <div className="flex items-center gap-space-md">
                        <span className="font-data-mono text-body-sm font-semibold text-outline w-16">11:30 AM</span>
                        <div className="w-1.5 h-8 rounded-full bg-outline-variant"></div>
                        <div>
                          <div className="font-label-md text-label-md font-semibold text-on-surface">
                            Inorganic Chemistry
                          </div>
                          <div className="font-body-sm text-body-sm text-outline">
                            Faculty: Dr. Sneha Sen • Room 102
                          </div>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/20">
                        Upcoming
                      </span>
                    </div>

                    {/* Period 4: Upcoming */}
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/10">
                      <div className="flex items-center gap-space-md">
                        <span className="font-data-mono text-body-sm font-semibold text-outline w-16">01:45 PM</span>
                        <div className="w-1.5 h-8 rounded-full bg-outline-variant"></div>
                        <div>
                          <div className="font-label-md text-label-md font-semibold text-on-surface">
                            Computer Science (Data Structures)
                          </div>
                          <div className="font-body-sm text-body-sm text-outline">
                            Faculty: Vinod Nair • CS Lab 1
                          </div>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/20">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Homework & Pending Assignments Module */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">assignment</span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Assignments &amp; Homework Pipeline
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">
                          Tracking submissions, deadlines, and teacher grading
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('assignments-coursework')}
                      className="font-label-sm text-label-sm text-primary font-semibold cursor-pointer hover:underline"
                    >
                      View All (6)
                    </button>
                  </div>

                  <div className="space-y-space-sm">
                    {/* HW Item 1 */}
                    <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-outline-variant/10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            Calculus &amp; Integration Problem Set (Sets 4 &amp; 5)
                          </span>
                          <span className="px-2 py-0.5 bg-secondary-container/40 text-on-secondary-container rounded font-label-sm text-label-sm font-semibold">
                            Mathematics
                          </span>
                        </div>
                        <div className="font-body-sm text-body-sm text-outline flex items-center gap-3">
                          <span>Due: Tomorrow, 11:59 PM</span>
                          <span>•</span>
                          <span>Max Marks: 50</span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-end justify-between sm:justify-center">
                        <span className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                          <span className="material-symbols-outlined text-[16px]">task_alt</span>
                          Submitted (16 Sep, 04:30 PM)
                        </span>
                        <span className="text-[11px] font-body-sm text-outline">Verified on Student Portal</span>
                      </div>
                    </div>

                    {/* HW Item 2 */}
                    <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-outline-variant/10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            Physics Ray Optics Lab Report #04
                          </span>
                          <span className="px-2 py-0.5 bg-surface-container-high text-primary rounded font-label-sm text-label-sm font-semibold">
                            Physics Lab
                          </span>
                        </div>
                        <div className="font-body-sm text-body-sm text-outline flex items-center gap-3">
                          <span className="text-error font-medium">Due: 22 Sep 2026 (4 days left)</span>
                          <span>•</span>
                          <span>Practical Log Submission</span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-end justify-between sm:justify-center">
                        <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm font-semibold">
                          <span className="material-symbols-outlined text-[16px] text-outline">pending_actions</span>
                          Work In Progress
                        </span>
                        <span className="text-[11px] font-body-sm text-outline">Draft saved locally</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Academic Performance Trend (Subject Mastery) */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">monitoring</span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Subject Mastery &amp; Term-1 Evaluation
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">
                          Benchmark vs cohort averages across core subjects
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onShowToast('Downloaded official signed transcript PDF for Aarav Sharma.')}
                      className="px-space-md py-1.5 bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto border border-outline-variant/20 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      <span>Download Signed Transcript (PDF)</span>
                    </button>
                  </div>

                  {/* Subject Benchmarks Bar Rows */}
                  <div className="space-y-space-md pt-2">
                    {/* Subject 1 */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-body-sm font-body-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-on-surface">Advanced Mathematics</span>
                          <span className="text-[11px] font-label-sm text-secondary bg-secondary-container/40 px-1.5 py-0.5 rounded">
                            High Distinction
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-data-mono">
                          <span className="text-outline">Class Avg: 71%</span>
                          <span className="font-bold text-primary">92%</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden flex">
                        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    {/* Subject 2 */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-body-sm font-body-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-on-surface">Computer Science (Python &amp; Data Structures)</span>
                          <span className="text-[11px] font-label-sm text-primary bg-primary-fixed px-1.5 py-0.5 rounded">
                            Top in Batch (Rank #1)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-data-mono">
                          <span className="text-outline">Class Avg: 78%</span>
                          <span className="font-bold text-primary">94%</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden flex">
                        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '94%' }}></div>
                      </div>
                    </div>

                    {/* Subject 3 */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-body-sm font-body-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-on-surface">Physics (Theory + Practical)</span>
                          <span className="text-[11px] font-label-sm text-outline bg-surface-container-high px-1.5 py-0.5 rounded">
                            Distinction
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-data-mono">
                          <span className="text-outline">Class Avg: 69%</span>
                          <span className="font-bold text-on-surface">86%</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden flex">
                        <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '86%' }}></div>
                      </div>
                    </div>

                    {/* Subject 4 */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-body-sm font-body-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-on-surface">Chemistry (Organic &amp; Physical)</span>
                          <span className="text-[11px] font-label-sm text-outline bg-surface-container-high px-1.5 py-0.5 rounded">
                            Distinction
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-data-mono">
                          <span className="text-outline">Class Avg: 68%</span>
                          <span className="font-bold text-on-surface">85%</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden flex">
                        <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (40% Desktop - Col span 5) */}
              <div className="lg:col-span-5 space-y-space-lg">
                {/* 1. Direct Fee Payment & Receipts Module */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/20" id="payment-module">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Fee Ledger &amp; Instant Pay
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">AY 2025–26 Science Stream</p>
                      </div>
                    </div>
                    <span
                      className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold ${
                        isFeePaid ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container/60 text-error'
                      }`}
                    >
                      {isFeePaid ? 'Cleared' : '1 Pending'}
                    </span>
                  </div>

                  {/* Breakdown Card */}
                  <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm border border-outline-variant/10">
                    <div className="flex justify-between items-center font-body-sm text-body-sm">
                      <span className="text-outline">Total Course Fee:</span>
                      <span className="font-semibold text-on-surface font-data-mono">₹45,000</span>
                    </div>
                    <div className="flex justify-between items-center font-body-sm text-body-sm">
                      <span className="text-outline">Total Paid to Date:</span>
                      <span className="font-semibold text-secondary font-data-mono">
                        {isFeePaid ? '₹45,000' : '₹40,500'}
                      </span>
                    </div>
                    <div className="h-[1px] bg-outline-variant/30 my-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        Outstanding (Q3 Installment):
                      </span>
                      <span
                        className={`font-headline-md text-headline-md font-bold font-data-mono ${
                          isFeePaid ? 'text-secondary' : 'text-error'
                        }`}
                      >
                        {isFeePaid ? '₹0' : '₹4,500'}
                      </span>
                    </div>
                  </div>

                  {/* 1-Click Payment Channels */}
                  <div className="mt-space-md space-y-space-sm">
                    <button
                      onClick={() => {
                        if (isFeePaid) {
                          onShowToast('Tuition already cleared.');
                        } else {
                          setIsPaymentModalOpen(true);
                        }
                      }}
                      className={`w-full py-2.5 font-label-md text-label-md rounded-lg shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer ${
                        isFeePaid
                          ? 'bg-secondary text-white'
                          : 'bg-primary text-on-primary hover:bg-primary-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                      <span>
                        {isFeePaid
                          ? 'Q3 Fees Cleared • No Outstanding'
                          : 'Pay ₹4,500 with UPI (GPay / PhonePe / QR)'}
                      </span>
                    </button>

                    <div className="grid grid-cols-2 gap-space-xs">
                      <button
                        onClick={() => {
                          if (isFeePaid) onShowToast('Tuition already paid.');
                          else setIsPaymentModalOpen(true);
                        }}
                        className="py-2 px-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-outline-variant/20 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">credit_card</span>
                        <span>Credit / Debit Card</span>
                      </button>
                      <button
                        onClick={() => {
                          if (isFeePaid) onShowToast('Tuition already paid.');
                          else setIsPaymentModalOpen(true);
                        }}
                        className="py-2 px-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-outline-variant/20 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px] text-primary">account_balance</span>
                        <span>NetBanking (NEFT)</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Receipt Record */}
                  <div className="mt-space-md pt-space-sm border-t border-outline-variant/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                            {isFeePaid ? 'REC-2026-001285 • ₹4,500 Paid' : 'REC-2026-001284 • ₹7,000 Paid'}
                          </span>
                          <span className="font-data-mono text-[11px] text-outline">
                            {isFeePaid
                              ? 'Paid just now • Instant UPI Ref #1049'
                              : 'Paid on 15 Sep 2026 • UPI Trans #9802'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onShowToast('Downloading official GST Tax Invoice PDF...')}
                        className="p-1.5 rounded-md hover:bg-surface-container text-primary transition-colors cursor-pointer"
                        title="Download GST Invoice"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Direct Two-Way Communication with Mentor */}
                <div
                  id="mentor-desk"
                  className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/20"
                >
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">forum</span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Direct Mentor Desk
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">Rahul Sharma (Class Teacher)</p>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary" title="Online now"></span>
                  </div>

                  {/* Message Thread Capsule */}
                  <div className="space-y-space-sm bg-surface-container-low p-space-md rounded-xl border border-outline-variant/10 max-h-72 overflow-y-auto">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-space-sm ${
                          msg.sender === 'guardian' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {msg.sender === 'mentor' && (
                          <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                            {msg.initials}
                          </div>
                        )}

                        <div
                          className={`p-space-sm rounded-xl shadow-xs max-w-[85%] ${
                            msg.sender === 'guardian'
                              ? 'bg-primary text-on-primary rounded-tr-none'
                              : 'bg-surface-container-lowest text-on-surface rounded-tl-none border border-outline-variant/20'
                          }`}
                        >
                          <p className="font-body-sm text-body-sm leading-relaxed">{msg.text}</p>
                          <div
                            className={`text-[10px] font-data-mono text-right mt-1 ${
                              msg.sender === 'guardian' ? 'text-on-primary/70' : 'text-outline'
                            }`}
                          >
                            {msg.time}
                          </div>
                        </div>

                        {msg.sender === 'guardian' && (
                          <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant font-bold text-xs flex items-center justify-center flex-shrink-0 border border-outline-variant/20">
                            {msg.initials}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <form onSubmit={handleSendMessage} className="mt-space-md flex items-center gap-space-xs">
                    <input
                      className="flex-1 px-space-md py-2 bg-surface-container-low rounded-lg text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors border border-outline-variant/20"
                      placeholder="Type message to Class Teacher..."
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="p-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-opacity flex items-center justify-center cursor-pointer shadow-xs"
                      title="Send message"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                  </form>
                </div>

                {/* 3. Official Institution Circulars */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/20">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">campaign</span>
                      </div>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Institutional Notices
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">
                          Verified announcements from Principal Desk
                        </p>
                      </div>
                    </div>
                    <span
                      onClick={() => onShowToast('Opening institutional announcements noticeboard.')}
                      className="material-symbols-outlined text-outline text-[18px] cursor-pointer hover:text-on-surface"
                    >
                      open_in_new
                    </span>
                  </div>

                  <div className="space-y-space-sm">
                    {/* Circular 1 */}
                    <div
                      onClick={() => onShowToast('CIRC-89: Term-1 Parent-Teacher Meeting details downloaded.')}
                      className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          CIRC-89 • ACADEMIC
                        </span>
                        <span className="font-data-mono text-[11px] text-outline">17 Sep 2026</span>
                      </div>
                      <div className="font-label-md text-label-md font-semibold text-on-surface mt-1">
                        Term-1 Parent-Teacher Meeting (PTM)
                      </div>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5 line-clamp-2">
                        Scheduled for Saturday 27 September at Siliguri Campus. Slot booking opens tomorrow 10:00 AM.
                      </p>
                    </div>

                    {/* Circular 2 */}
                    <div
                      onClick={() => onShowToast('CIRC-88: Winter uniform specifications loaded.')}
                      className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                          CIRC-88 • CAMPUS LIFE
                        </span>
                        <span className="font-data-mono text-[11px] text-outline">14 Sep 2026</span>
                      </div>
                      <div className="font-label-md text-label-md font-semibold text-on-surface mt-1">
                        Winter Uniform Policy &amp; Vacation Dates
                      </div>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5 line-clamp-2">
                        Mandatory winter blazer schedule and announcement of official Diwali term break timeline.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Sibling Switcher Card (Ananya Kumar) */}
                <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low rounded-xl p-space-lg shadow-xs border border-outline-variant/30 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <img
                        className="w-12 h-12 rounded-full object-cover shadow-xs"
                        alt="Ananya Kumar"
                        referrerPolicy="no-referrer"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqLx394Y0V26l5ikrHtOZXa6qUFuuU4z4GbgagakLXyh818W7S3_PvzW9nUC6Rj04OvXnHZ0PMBFYYsI32-lNyQY2nd44fJYnOX6a7B9WSW3zzYLYd01gQIjHnEDr1HWuUXkZ4Lt094YPYyDYH9QvYUS6GF5gFemJwLBrHwwgLx6uu9pMlwniFSTv_JonsDPz2Fe2Cpfp6mDjZe4EzXCP-0HFpX4Nq0jyvGlL6sVVZ5vTJNRX_GERu"
                      />
                      <div>
                        <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                          Sibling Profile
                        </span>
                        <div className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Ananya Kumar
                        </div>
                        <div className="font-body-sm text-body-sm text-outline">Grade 7-B • Junior Wing</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-label-sm font-semibold">
                      All Clear
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-space-sm my-space-md py-space-xs">
                    <div className="bg-surface-container-lowest p-space-sm rounded-lg border border-outline-variant/20">
                      <div className="text-[11px] font-label-sm text-outline">Attendance</div>
                      <div className="font-headline-sm text-headline-sm font-bold text-secondary">96.0%</div>
                      <div className="text-[10px] text-outline">Perfect record this month</div>
                    </div>
                    <div className="bg-surface-container-lowest p-space-sm rounded-lg border border-outline-variant/20">
                      <div className="text-[11px] font-label-sm text-outline">Tuition Status</div>
                      <div className="font-headline-sm text-headline-sm font-bold text-on-surface">₹0 Due</div>
                      <div className="text-[10px] text-secondary font-medium">Cleared for Q3</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedWard(selectedWard === 'aarav' ? 'ananya' : 'aarav');
                      onShowToast(
                        selectedWard === 'aarav'
                          ? 'Dashboard context switched to Ananya Kumar (Grade 7-B)!'
                          : 'Dashboard context switched to Aarav Sharma (Grade 11)!'
                      );
                    }}
                    className="w-full py-2 bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-outline-variant/20 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">swap_horiz</span>
                    <span>
                      {selectedWard === 'aarav' ? 'Switch Dashboard to Ananya' : 'Switch Dashboard to Aarav'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Quick Bar */}
            <div className="w-full pt-space-md pb-space-sm flex flex-col sm:flex-row items-center justify-between text-body-sm font-body-sm text-outline border-t border-outline-variant/30 gap-2">
              <div>
                EduManage Parent Console © 2026. Authorized Guardian Access for Suresh Kumar (Parent UID: GRD-88219).
              </div>
              <div className="flex items-center gap-space-md">
                <button
                  onClick={() => onShowToast('Emergency Response Desk: +91 80 4122-8900 (24x7 Active)')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Emergency Protocol
                </button>
                <button
                  onClick={() => setIsGpsModalOpen(true)}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Bus Fleet Dispatch
                </button>
                <button
                  onClick={() => onShowToast('Fee refund policies & terms viewed.')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Fee Refund Policy
                </button>
                <button
                  onClick={() => onShowToast('Connected to EduManage IT Helpdesk (Ticket #HD-9021).')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  IT Helpdesk
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE MODALS */}
      {/* ========================================================================= */}

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
                    onClick={handleConfirmPayment}
                    className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Simulate Approve ₹4,500</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* LIVE GPS BUS TRACKING MODAL */}
      {isGpsModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">directions_bus</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Live GPS Telemetry • Bus #14
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Driver: M. Das (Ph: 98321-44550) • Route: Siliguri Central
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGpsModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Radar / GPS Map Mock */}
            <div className="h-56 bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center p-4 border border-slate-700">
              {/* Map grid lines */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              {/* Road line */}
              <div className="absolute left-6 right-6 h-2 bg-slate-700 rounded-full top-1/2 -translate-y-1/2 flex items-center justify-between px-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              </div>

              {/* Bus marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-xl shadow-lg flex items-center gap-1.5 ring-4 ring-primary/30 animate-pulse">
                <span className="material-symbols-outlined text-[18px]">directions_bus</span>
                <span className="font-data-mono text-xs font-bold">Bus #14 (42 km/h)</span>
              </div>

              {/* Waypoint badges */}
              <div className="absolute top-4 left-4 bg-slate-800/90 text-emerald-400 text-[10px] font-data-mono px-2 py-1 rounded border border-emerald-500/30">
                START: Siliguri HQ (08:15 AM)
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-800/90 text-amber-400 text-[10px] font-data-mono px-2 py-1 rounded border border-amber-500/30">
                NEXT STOP: Sevoke Rd Crossing (ETA 12m)
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-surface-container-low rounded-lg">
                <span className="text-outline block">Speed</span>
                <span className="font-bold text-on-surface font-data-mono text-sm">42 km/h</span>
              </div>
              <div className="p-2 bg-surface-container-low rounded-lg">
                <span className="text-outline block">Next Stop</span>
                <span className="font-bold text-on-surface font-data-mono text-sm">Sevoke Rd</span>
              </div>
              <div className="p-2 bg-surface-container-low rounded-lg">
                <span className="text-outline block">ETA Gate</span>
                <span className="font-bold text-secondary font-data-mono text-sm">12 Mins</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => onShowToast('Calling bus driver M. Das (+91 98321-44550)...')}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Call Driver</span>
              </button>
              <button
                type="button"
                onClick={() => setIsGpsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
