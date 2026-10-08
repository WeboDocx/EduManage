import React, { useState } from 'react';
import { ScreenType, Institution, AuditEvent } from '../types';
import { BRAND_HOTLINKS, INITIAL_INSTITUTIONS, INITIAL_AUDIT_EVENTS } from '../data/mockData';
import { useSidebar } from '../context/SidebarContext';

interface SuperAdminConsoleProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const SuperAdminConsole: React.FC<SuperAdminConsoleProps> = ({ onNavigate, onShowToast }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(INITIAL_AUDIT_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [activeNavTab, setActiveNavTab] = useState<string>('all');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Handle inline institutional actions
  const handleApprove = (id: string, name: string) => {
    setInstitutions(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Active' } : item))
    );
    onShowToast(`Approved institution: ${name}. Verification certificate issued.`);
  };

  const handleImpersonate = (name: string) => {
    onShowToast(`Impersonating tenant session for ${name}. Logging into tenant admin view...`);
  };

  const handleExportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      'Code,Name,Domain,Type,Branches,Enrolled,Status,Plan\n' +
      institutions.map(i => `${i.code},"${i.name}",${i.domain},"${i.type}",${i.branches},${i.enrolled},${i.status},${i.plan}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'edumanage_institutions_audit.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Exported institutional records to edumanage_institutions_audit.csv');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    const newEvent: AuditEvent = {
      id: `evt-${Date.now()}`,
      type: 'tier_upgrade',
      title: `Platform Admin broadcast sent to all 124 organizations: "${broadcastMessage}"`,
      description: 'Dispatched to 124 multi-tenant clusters',
      timeAgo: 'Just now',
      uuidOrImpact: 'High-Priority Alert',
      tag: 'Admin Broadcast',
      tagColorClass: 'bg-primary-fixed text-primary font-bold',
      icon: 'campaign',
      iconBgClass: 'bg-primary text-white',
      iconTextClass: 'text-white',
    };
    setAuditEvents([newEvent, ...auditEvents]);
    onShowToast('Broadcast notification successfully pushed to all active tenants.');
    setIsBroadcastOpen(false);
    setBroadcastMessage('');
  };

  // Filter institutions
  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.domain.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : inst.status === statusFilter;

    const matchesType =
      typeFilter === 'All' ? true : inst.type === typeFilter;

    const matchesNav =
      activeNavTab === 'all'
        ? true
        : activeNavTab === 'pending'
        ? inst.status === 'Pending Review'
        : activeNavTab === 'active'
        ? inst.status === 'Active'
        : activeNavTab === 'suspended'
        ? inst.status === 'Suspended'
        : true;

    return matchesSearch && matchesStatus && matchesType && matchesNav;
  });

  // H1 2025 Growth Chart data
  const growthBars = [
    { month: 'Jan', regs: 68, branches: 140, heightReg: 70, heightBr: 110 },
    { month: 'Feb', regs: 84, branches: 190, heightReg: 85, heightBr: 130 },
    { month: 'Mar', regs: 112, branches: 245, heightReg: 110, heightBr: 155 },
    { month: 'Apr', regs: 145, branches: 320, heightReg: 140, heightBr: 180 },
    { month: 'May (Peak)', regs: 194, branches: 410, heightReg: 175, heightBr: 220 },
    { month: 'Jun (Proj)', regs: 220, branches: 460, heightReg: 195, heightBr: 240 },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col lg:flex-row">
      {/* 1. FIXED SUPER ADMIN SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-full lg:w-72' : 'hidden'} bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col justify-between shrink-0 transition-all duration-300`}>
        <div>
          {/* Logo Brand Header */}
          <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                alt="EduManage Brandmark"
                className="h-8 w-auto object-contain"
                src={BRAND_HOTLINKS.logo}
              />
              <div>
                <span className="font-headline-sm text-base font-bold text-on-surface leading-none block">
                  EduManage
                </span>
                <span className="text-[10px] text-primary font-semibold tracking-wider uppercase block mt-0.5">
                  Super Admin Hub
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-data-mono font-bold">
                ROOT
              </span>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer flex items-center justify-center"
                aria-label="Hide sidebar"
                title="Hide sidebar"
              >
                <span className="material-symbols-outlined text-[18px]">menu_open</span>
              </button>
            </div>
          </div>

          {/* Global Multi-Tenant Org Switcher */}
          <div className="p-4 border-b border-outline-variant/20">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-outline mb-1.5">
              TENANT SCOPE
            </label>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between cursor-pointer hover:border-primary transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <div className="text-xs font-bold text-on-surface">Global HQ / All Orgs</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-bold">
                124 Active
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-6">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-outline px-2 mb-2">
                INSTITUTIONS & TENANTS
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveNavTab('all');
                    setStatusFilter('All');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeNavTab === 'all'
                      ? 'bg-primary-container text-white shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">domain</span>
                    All Institutions
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeNavTab === 'all' ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    124
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveNavTab('pending');
                    setStatusFilter('Pending Review');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeNavTab === 'pending'
                      ? 'bg-primary-container text-white shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-amber-500">pending_actions</span>
                    Pending Review
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                    8
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveNavTab('active');
                    setStatusFilter('Active');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeNavTab === 'active'
                      ? 'bg-primary-container text-white shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-secondary">verified</span>
                    Active Campuses
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-secondary-fixed text-secondary">
                    112
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveNavTab('suspended');
                    setStatusFilter('Suspended');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeNavTab === 'suspended'
                      ? 'bg-primary-container text-white shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-error">lock_reset</span>
                    Suspended / Due
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-error-container text-on-error-container">
                    4
                  </span>
                </button>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-outline px-2 mb-2">
                PLATFORM OPERATIONS
              </span>
              <div className="space-y-1 text-xs text-on-surface-variant">
                <button
                  onClick={() => onShowToast('Subscriptions Ledger: ₹18.4L MRR recurring revenue.')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-container-low text-left font-medium"
                >
                  <span className="material-symbols-outlined text-base">receipt_long</span>
                  Subscriptions & Billing
                </button>
                <button
                  onClick={() => onShowToast('Platform RBAC: 3,420 administrative accounts managed.')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-container-low text-left font-medium"
                >
                  <span className="material-symbols-outlined text-base">manage_accounts</span>
                  Platform Users & RBAC
                </button>
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-container-low text-left font-medium"
                >
                  <span className="material-symbols-outlined text-base">hub</span>
                  Branches & Topology Setup
                </button>
                <button
                  onClick={() => onShowToast('Cryptographic Certificates: Root CA active with 100% SHA-256 integrity.')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-container-low text-left font-medium"
                >
                  <span className="material-symbols-outlined text-base">qr_code_2</span>
                  Cryptographic Certificates
                </button>
                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-container-low text-left font-medium"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  Export Audit CSV
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Super Admin Profile & Exit */}
        <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <img
                alt="Super Admin"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                src={BRAND_HOTLINKS.profileSarah}
              />
              <div>
                <div className="text-xs font-bold text-on-surface">Dr. Alistair Vance</div>
                <div className="text-[10px] text-outline font-data-mono">Super Admin (Root)</div>
              </div>
            </div>
            <button
              onClick={() => {
                onShowToast('Session ended. Returned to overview.');
                onNavigate('landing');
              }}
              className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors"
              title="Exit Console"
            >
              <span className="material-symbols-outlined text-base">logout</span>
            </button>
          </div>
          <div className="text-[10px] text-outline flex items-center justify-between">
            <span>Cluster: US-East-1</span>
            <span className="text-secondary font-bold">14ms latency</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN ADMIN CONSOLE CONTENT AREA */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Header Bar */}
        <header className="h-16 px-4 md:px-8 border-b border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between gap-4 sticky top-12 z-40">
          <div className="flex items-center gap-2 text-xs">
            {/* Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-1.5 -ml-1 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer border border-outline-variant/30 shadow-xs flex items-center justify-center"
              aria-label="Toggle Sidebar Menu"
              title={isSidebarOpen ? "Hide Sidebar (Maximize workspace)" : "Show Sidebar"}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>
            <span className="text-outline">Platform</span>
            <span className="text-outline">/</span>
            <span className="font-bold text-on-surface">Global Orchestration Hub</span>
            <span className="hidden sm:inline-flex items-center gap-1 ml-3 px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Cluster US-East-1 Healthy
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <div className="relative hidden md:block w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tenant or code... (⌘K)"
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="material-symbols-outlined absolute left-2 top-2 text-outline text-sm">
                search
              </span>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => onShowToast('You have 3 system alerts pending: 2 certificate renewals, 1 past-due payment.')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-lg">notifications</span>
              <span className="w-2 h-2 rounded-full bg-error absolute top-1.5 right-1.5"></span>
            </button>

            {/* Onboard Button */}
            <button
              onClick={() => onNavigate('onboarding')}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-xs transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Onboard Institution</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-4 md:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Welcome & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-on-surface">
                Platform Overview / Global Orchestration
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Good morning, Platform Admin. Multi-tenant cluster operating within SLA parameters.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                className="text-xs px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface font-medium"
              >
                <option>Last 30 Days (H1 2025)</option>
                <option>Quarter to Date (Q2)</option>
                <option>Year to Date (YTD)</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-outline-variant bg-surface hover:bg-surface-container-low font-semibold text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">file_download</span>
                <span>Export Audit</span>
              </button>

              <button
                onClick={() => setIsBroadcastOpen(true)}
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-secondary-fixed text-secondary hover:bg-secondary-fixed-dim font-bold"
              >
                <span className="material-symbols-outlined text-sm">campaign</span>
                <span>Broadcast Alert</span>
              </button>
            </div>
          </div>

          {/* 6 KPI METRIC CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-1">
                <span className="font-semibold uppercase text-[10px]">TOTAL ORGS</span>
                <span className="text-secondary font-bold">+12.4%</span>
              </div>
              <div className="text-xl font-bold font-headline-md text-on-surface">1,248</div>
              <div className="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-primary h-full w-[88%]"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-1">
                <span className="font-semibold uppercase text-[10px]">HEALTHY UPTIME</span>
                <span className="text-secondary font-bold">99.98%</span>
              </div>
              <div className="text-xl font-bold font-headline-md text-on-surface">1,182</div>
              <div className="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary h-full w-[95%]"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-1">
                <span className="font-semibold uppercase text-[10px]">TOTAL STUDENTS</span>
                <span className="text-primary font-bold">+15.2%</span>
              </div>
              <div className="text-xl font-bold font-headline-md text-on-surface">1,84,520</div>
              <div className="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-primary h-full w-[78%]"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-1">
                <span className="font-semibold uppercase text-[10px]">CAMPUS BRANCHES</span>
                <span className="text-secondary font-bold">+11.8%</span>
              </div>
              <div className="text-xl font-bold font-headline-md text-on-surface">3,842</div>
              <div className="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-tertiary h-full w-[82%]"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-1">
                <span className="font-semibold uppercase text-[10px]">PLATFORM MRR</span>
                <span className="text-secondary font-bold">+9.4%</span>
              </div>
              <div className="text-xl font-bold font-headline-md text-on-surface">₹18.4L</div>
              <div className="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary h-full w-[91%]"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mb-1">
                <span className="font-semibold uppercase text-[10px]">DUE RENEWALS</span>
                <span className="text-amber-600 font-bold">14 Orgs</span>
              </div>
              <div className="text-xl font-bold font-headline-md text-on-surface">₹2.8L</div>
              <div className="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-500 h-full w-[35%]"></div>
              </div>
            </div>
          </div>

          {/* DUAL ANALYTICS VISUALS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SVG 1: New Institution Registrations & Branch Growth Chart (8 cols) */}
            <div className="lg:col-span-8 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface flex items-center gap-2">
                    <span>New Institution Registrations & Branch Expansion</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-secondary-fixed text-secondary font-bold">
                      +38% H1 Run Rate
                    </span>
                  </h3>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Monthly cohort progression across schools and coaching networks
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-primary inline-block"></span>
                    <span className="text-on-surface-variant text-[11px]">Branches Added</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-secondary inline-block"></span>
                    <span className="text-on-surface-variant text-[11px]">New Orgs</span>
                  </div>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="h-56 w-full relative pt-2">
                <svg className="w-full h-full" viewBox="0 0 600 220">
                  {/* Grid */}
                  <line x1="40" y1="180" x2="570" y2="180" stroke="#eaedff" strokeWidth="1" />
                  <line x1="40" y1="130" x2="570" y2="130" stroke="#eaedff" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="80" x2="570" y2="80" stroke="#eaedff" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="30" x2="570" y2="30" stroke="#eaedff" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Y Axis */}
                  <text x="30" y="184" textAnchor="end" className="text-[9px] fill-gray-400">0</text>
                  <text x="30" y="134" textAnchor="end" className="text-[9px] fill-gray-400">150</text>
                  <text x="30" y="84" textAnchor="end" className="text-[9px] fill-gray-400">300</text>
                  <text x="30" y="34" textAnchor="end" className="text-[9px] fill-gray-400">450</text>

                  {/* Bars */}
                  {growthBars.map((bar, i) => {
                    const x = 70 + i * 85;
                    const isHovered = hoveredMonth === bar.month;
                    return (
                      <g
                        key={i}
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredMonth(bar.month)}
                        onMouseLeave={() => setHoveredMonth(null)}
                      >
                        {/* Branches Added Bar */}
                        <rect
                          x={x}
                          y={180 - bar.heightBr * 0.65}
                          width="26"
                          height={bar.heightBr * 0.65}
                          rx="4"
                          className={`${
                            isHovered ? 'fill-primary-container' : 'fill-primary/80'
                          } transition-all`}
                        />

                        {/* New Orgs Bar */}
                        <rect
                          x={x + 28}
                          y={180 - bar.heightReg * 0.65}
                          width="26"
                          height={bar.heightReg * 0.65}
                          rx="4"
                          className={`${
                            isHovered ? 'fill-secondary' : 'fill-secondary/80'
                          } transition-all`}
                        />

                        {/* X Label */}
                        <text
                          x={x + 27}
                          y="200"
                          textAnchor="middle"
                          className={`text-[10px] ${
                            isHovered ? 'fill-primary font-bold' : 'fill-slate-500'
                          }`}
                        >
                          {bar.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {hoveredMonth && (
                  <div className="absolute top-2 right-4 bg-on-surface text-surface-container-lowest text-xs rounded-lg px-3 py-1.5 shadow-lg border border-outline-variant/20">
                    <span className="font-bold text-primary-fixed">{hoveredMonth} Data:</span>{' '}
                    <span>Branches added & Orgs registered</span>
                  </div>
                )}
              </div>
            </div>

            {/* SVG 2: Institutional Distribution by Sector Donut Chart (4 cols) */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                  Sector Distribution
                </h3>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  Breakdown by institutional model
                </p>
              </div>

              {/* Donut Chart */}
              <div className="flex items-center justify-center my-2 relative">
                <svg className="w-40 h-40" viewBox="0 0 160 160">
                  {/* Segment 1: K-12 (42% -> 151 deg) */}
                  <circle
                    r="55"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    stroke="#004ac6"
                    strokeWidth="24"
                    strokeDasharray="145 345"
                    strokeDashoffset="0"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={() => setHoveredSector('K-12 Day Schools: 524 (42%)')}
                    onMouseLeave={() => setHoveredSector(null)}
                  />
                  {/* Segment 2: Coaching (28% -> 96 deg) */}
                  <circle
                    r="55"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    stroke="#006a61"
                    strokeWidth="24"
                    strokeDasharray="96 345"
                    strokeDashoffset="-145"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={() => setHoveredSector('Coaching Chains: 349 (28%)')}
                    onMouseLeave={() => setHoveredSector(null)}
                  />
                  {/* Segment 3: Training (18% -> 62 deg) */}
                  <circle
                    r="55"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    stroke="#4338d9"
                    strokeWidth="24"
                    strokeDasharray="62 345"
                    strokeDashoffset="-241"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={() => setHoveredSector('Tech / Training: 225 (18%)')}
                    onMouseLeave={() => setHoveredSector(null)}
                  />
                  {/* Segment 4: Tuition (12% -> 42 deg) */}
                  <circle
                    r="55"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    stroke="#c3c6d7"
                    strokeWidth="24"
                    strokeDasharray="42 345"
                    strokeDashoffset="-303"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseEnter={() => setHoveredSector('Tuitions & Others: 150 (12%)')}
                    onMouseLeave={() => setHoveredSector(null)}
                  />
                </svg>

                <div className="absolute text-center pointer-events-none">
                  <div className="text-xl font-bold font-headline-md text-on-surface">1,248</div>
                  <div className="text-[10px] text-outline uppercase font-semibold">Institutions</div>
                </div>
              </div>

              {/* Sector Legend */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    <span className="text-on-surface">K-12 Day Schools</span>
                  </span>
                  <span className="font-bold text-on-surface">42% (524)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <span className="text-on-surface">Coaching Institutes</span>
                  </span>
                  <span className="font-bold text-on-surface">28% (349)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                    <span className="text-on-surface">Training & Vocational</span>
                  </span>
                  <span className="font-bold text-on-surface">18% (225)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                    <span className="text-on-surface">Tuitions & Others</span>
                  </span>
                  <span className="font-bold text-on-surface">12% (150)</span>
                </div>
              </div>

              {hoveredSector && (
                <div className="text-[11px] text-primary font-bold text-center pt-2 border-t border-outline-variant/20">
                  {hoveredSector}
                </div>
              )}
            </div>
          </div>

          {/* HIGH-DENSITY RECENT REGISTERED INSTITUTIONS DATA TABLE */}
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-4 sm:p-5 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  Recent Registered Institutions
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Multi-tenant deployment status, branch capacity, and license plans
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="14d Trial">14d Trial</option>
                  <option value="Suspended">Suspended</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface font-medium"
                >
                  <option value="All">All Types</option>
                  <option value="School (K-12)">School (K-12)</option>
                  <option value="Coaching Chain">Coaching Chain</option>
                  <option value="Training Center">Training Center</option>
                  <option value="Tuition Center">Tuition Center</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/30">
                  <tr>
                    <th className="py-3 px-4">INSTITUTION</th>
                    <th className="py-3 px-4">CLASSIFICATION</th>
                    <th className="py-3 px-4">BRANCHES</th>
                    <th className="py-3 px-4">STUDENTS</th>
                    <th className="py-3 px-4">PLAN TIER</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {filteredInstitutions.map((inst) => (
                    <tr key={inst.id} className="hover:bg-surface-container-low/50 transition-colors">
                      {/* Name & Code */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${inst.avatarBg} ${inst.avatarTextColor} flex items-center justify-center font-bold text-xs shrink-0`}
                          >
                            {inst.avatarLetter}
                          </div>
                          <div>
                            <div className="font-bold text-on-surface">{inst.name}</div>
                            <div className="text-[11px] text-outline font-data-mono">
                              {inst.code} • {inst.domain}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Classification */}
                      <td className="py-3.5 px-4">
                        <span className="text-on-surface-variant">{inst.type}</span>
                      </td>

                      {/* Branches */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-on-surface">{inst.branches}</span>{' '}
                        <span className="text-outline">branches</span>
                      </td>

                      {/* Students & Capacity */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-on-surface">{inst.enrolled.toLocaleString()}</div>
                        <div className="text-[10px] text-outline">{inst.capacityRate}</div>
                      </td>

                      {/* Plan */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-[11px] font-medium border border-outline-variant/40">
                          {inst.plan}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {inst.status === 'Active' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary font-bold text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            Active
                          </span>
                        )}
                        {inst.status === 'Pending Review' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Pending Review
                          </span>
                        )}
                        {inst.status === '14d Trial' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-bold text-[10px]">
                            Trial (6d left)
                          </span>
                        )}
                        {inst.status === 'Suspended' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold text-[10px]">
                            Suspended
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {inst.status === 'Pending Review' && (
                            <button
                              onClick={() => handleApprove(inst.id, inst.name)}
                              className="px-2.5 py-1 rounded-md bg-secondary text-white text-[11px] font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleImpersonate(inst.name)}
                            className="px-2 py-1 rounded-md bg-surface-container text-primary text-[11px] font-bold hover:bg-primary-fixed transition-colors"
                            title="Impersonate Tenant Console"
                          >
                            Impersonate
                          </button>
                          <button
                            onClick={() => onShowToast(`Opening tenant management dossier for ${inst.name}.`)}
                            className="p-1 rounded text-outline hover:text-on-surface"
                            title="More Actions"
                          >
                            <span className="material-symbols-outlined text-base">more_vert</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant bg-surface-container-low/30">
              <span>Showing {filteredInstitutions.length} of {institutions.length} institutions</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-1 rounded border border-outline-variant bg-surface disabled:opacity-50" disabled>
                  Prev
                </button>
                <button className="px-2.5 py-1 rounded bg-primary text-white font-bold">1</button>
                <button className="px-2.5 py-1 rounded hover:bg-surface-container">2</button>
                <button className="px-2.5 py-1 rounded hover:bg-surface-container">3</button>
                <button className="px-2 py-1 rounded border border-outline-variant bg-surface hover:bg-surface-container">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM SPLIT SECTION: LIVE AUDIT LOG & ORCHESTRATION ACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live Event Audit Log (7 cols) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <h3 className="font-headline-sm text-sm font-bold text-on-surface">
                    Platform Live Event Audit Log
                  </h3>
                </div>
                <span className="text-[10px] text-outline font-data-mono">Streaming Updates</span>
              </div>

              <div className="space-y-3">
                {auditEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start justify-between gap-3 text-xs hover:border-outline transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg ${evt.iconBgClass} flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        <span className="material-symbols-outlined text-sm">{evt.icon}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface leading-tight">
                          {evt.title}{' '}
                          {evt.highlightText && (
                            <span className="text-primary font-bold">{evt.highlightText}</span>
                          )}
                        </div>
                        {evt.description && (
                          <div className="text-[11px] text-outline mt-0.5">{evt.description}</div>
                        )}
                        <div className="text-[10px] text-outline mt-1 font-data-mono">
                          {evt.timeAgo} • {evt.uuidOrImpact}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {evt.tag && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${evt.tagColorClass}`}>
                          {evt.tag}
                        </span>
                      )}
                      {evt.actionButton && (
                        <button
                          onClick={() => onShowToast('Verification check triggered for pending institution.')}
                          className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-bold"
                        >
                          {evt.actionButton}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Orchestration Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Quick Actions Card */}
              <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface mb-3">
                  Super Admin Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onNavigate('onboarding')}
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 text-left transition-all group"
                  >
                    <span className="material-symbols-outlined text-primary text-xl group-hover:scale-110 transition-transform">
                      add_business
                    </span>
                    <div className="font-bold text-xs text-on-surface mt-1">Provision Tenant</div>
                    <div className="text-[10px] text-outline">Deploy new institution cluster</div>
                  </button>

                  <button
                    onClick={() => onShowToast('Pricing tier matrix opened: Starter, Professional, Enterprise.')}
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 text-left transition-all group"
                  >
                    <span className="material-symbols-outlined text-secondary text-xl group-hover:scale-110 transition-transform">
                      price_change
                    </span>
                    <div className="font-bold text-xs text-on-surface mt-1">Pricing Tiers</div>
                    <div className="text-[10px] text-outline">Manage plan pricing & add-ons</div>
                  </button>

                  <button
                    onClick={() => setIsBroadcastOpen(true)}
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 text-left transition-all group"
                  >
                    <span className="material-symbols-outlined text-tertiary text-xl group-hover:scale-110 transition-transform">
                      campaign
                    </span>
                    <div className="font-bold text-xs text-on-surface mt-1">Broadcast Alert</div>
                    <div className="text-[10px] text-outline">Push to 124 organizations</div>
                  </button>

                  <button
                    onClick={() => onShowToast('Security audit complete: Zero vulnerabilities detected.')}
                    className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 text-left transition-all group"
                  >
                    <span className="material-symbols-outlined text-primary text-xl group-hover:scale-110 transition-transform">
                      security
                    </span>
                    <div className="font-bold text-xs text-on-surface mt-1">Security Audit</div>
                    <div className="text-[10px] text-outline">Check CA certificates & keys</div>
                  </button>
                </div>
              </div>

              {/* SLA & Security Status Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-fixed">
                    ENTERPRISE CLUSTER
                  </span>
                  <span className="text-[10px] text-slate-300 font-data-mono">SLA 99.98%</span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold">Multi-Tenant Vault Encrypted</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  PostgreSQL multi-tenant schema partitioning with AES-256 field-level student data encryption.
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-secondary-fixed font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                    Root MFA Enforced
                  </span>
                  <span className="text-slate-400 font-data-mono text-[10px]">Zero Breaches</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Broadcast Alert Modal */}
      {isBroadcastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-container-high relative">
            <button
              onClick={() => setIsBroadcastOpen(false)}
              className="absolute top-4 right-4 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined">campaign</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  Platform Broadcast Alert
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Dispatches emergency maintenance or feature notification to all 124 institutions
                </p>
              </div>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Broadcast Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="e.g. Scheduled database maintenance at 02:00 UTC on Sunday. All services will remain online via read-replica fallback."
                  className="w-full text-xs p-3 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcastOpen(false)}
                  className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-xs"
                >
                  Dispatch to All Campuses
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
