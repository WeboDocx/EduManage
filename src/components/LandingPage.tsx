import React, { useState } from 'react';
import { ScreenType, BranchLocation } from '../types';
import { BRAND_HOTLINKS, INITIAL_BRANCH_LOCATIONS } from '../data/mockData';
import { DemoModal, ApplyModal } from './Modals';

interface LandingPageProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onShowToast }) => {
  const [selectedChartTab, setSelectedChartTab] = useState<'combined' | 'admissions' | 'revenue'>('combined');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ month: string; admissions: string; revenue: string } | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [applyingBranch, setApplyingBranch] = useState<BranchLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Delhi NCR (Central & North)');
  const [selectedRadius, setSelectedRadius] = useState('15 km');
  const [activeMapPin, setActiveMapPin] = useState<string>('loc-1');

  // Trajectory chart dataset
  const chartData = [
    { month: 'Jan', adm: 210, rev: 32.4, x: 50, yAdm: 160, yRev: 140 },
    { month: 'Feb', adm: 340, rev: 36.1, x: 130, yAdm: 135, yRev: 130 },
    { month: 'Mar', adm: 490, rev: 41.8, x: 210, yAdm: 100, yRev: 110 },
    { month: 'Apr', adm: 780, rev: 44.5, x: 290, yAdm: 60, yRev: 95 },
    { month: 'May (Peak)', adm: 980, rev: 48.2, x: 370, yAdm: 30, yRev: 80 },
    { month: 'Jun (Proj)', adm: 1040, rev: 52.0, x: 450, yAdm: 20, yRev: 65 },
  ];

  const filteredBranches = INITIAL_BRANCH_LOCATIONS.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Trust Badges Bar */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high/80 border border-outline-variant/30 text-xs font-semibold text-primary shadow-xs">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>Multi-Tenant Architecture v4.2</span>
            <span className="text-outline-variant">•</span>
            <span className="text-on-surface-variant font-medium">99.9% Uptime SLA</span>
            <span className="text-outline-variant">•</span>
            <span className="text-secondary font-bold">Trusted by 1,200+ Institutions</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.15]">
            Manage Your Entire Institution From{' '}
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-container to-tertiary">
              One Powerful Platform
            </span>
          </h1>

          <p className="font-body-lg text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            From admissions and student lifecycle tracking to multi-branch fees, biometric attendance, and automated cryptographic certificates. Designed for modern schools, coaching institutes, and training chains.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('register')}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-primary-container text-white font-label-lg text-base font-semibold shadow-md hover:bg-primary hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <span>Start Free Trial</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface font-label-lg text-base font-semibold hover:bg-surface-container-low transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-primary text-xl">play_circle</span>
              <span>Book a 15-min Demo</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-1 text-xs text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span>Instant setup in 10 mins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span>Zero setup fee</span>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE LIVE DASHBOARD PREVIEW CHROME */}
        <div className="mt-12 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-2xl overflow-hidden">
          {/* Top Browser URL Bar */}
          <div className="bg-surface-container-low px-4 py-2.5 border-b border-outline-variant/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
              </div>
              <span className="text-xs font-data-mono text-outline ml-2 hidden sm:inline">
                https://admin.edumanage.io/hq-apex/central-dashboard
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                LIVE CENTRAL SYNC
              </span>
              <span className="text-[11px] font-data-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                v4.18.2
              </span>
            </div>
          </div>

          {/* Interactive Dashboard Interior */}
          <div className="p-4 sm:p-6 md:p-8 bg-surface/50">
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                  <span className="font-semibold tracking-wider uppercase text-[10px]">TOTAL ADMISSIONS</span>
                  <span className="text-secondary font-semibold bg-secondary-fixed/50 px-1.5 py-0.5 rounded text-[11px]">
                    +14.2%
                  </span>
                </div>
                <div className="text-2xl font-bold font-headline-md text-on-surface">3,842</div>
                <div className="text-xs text-outline mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-secondary">trending_up</span>
                  Across 6 branches this quarter
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                  <span className="font-semibold tracking-wider uppercase text-[10px]">FEE COLLECTION</span>
                  <span className="text-secondary font-semibold bg-secondary-fixed/50 px-1.5 py-0.5 rounded text-[11px]">
                    94.6%
                  </span>
                </div>
                <div className="text-2xl font-bold font-headline-md text-on-surface">₹48.2 Lakhs</div>
                <div className="text-xs text-outline mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-secondary">done_all</span>
                  Auto-reconciled via Razorpay & UPI
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                  <span className="font-semibold tracking-wider uppercase text-[10px]">TODAY'S ATTENDANCE</span>
                  <span className="text-primary font-semibold bg-primary-fixed/50 px-1.5 py-0.5 rounded text-[11px]">
                    Biometric
                  </span>
                </div>
                <div className="text-2xl font-bold font-headline-md text-on-surface">96.4%</div>
                <div className="text-xs text-outline mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-primary">fingerprint</span>
                  3,704 scanned by 08:30 AM
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                  <span className="font-semibold tracking-wider uppercase text-[10px]">CAMPUSES SYNCED</span>
                  <span className="text-secondary font-semibold bg-secondary-fixed/50 px-1.5 py-0.5 rounded text-[11px]">
                    Active
                  </span>
                </div>
                <div className="text-2xl font-bold font-headline-md text-on-surface">6 / 6 Hubs</div>
                <div className="text-xs text-outline mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-secondary">sync</span>
                  Multi-branch ledger in real-time
                </div>
              </div>
            </div>

            {/* Split: Interactive SVG Trajectory Chart & Branch Health */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SVG Trajectory Chart (2 cols) */}
              <div className="lg:col-span-2 p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                      <span>Admissions vs Revenue Trajectory</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-primary-fixed text-primary font-medium">
                        Q1-Q2 2025
                      </span>
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      Hover data points to inspect monthly sync records
                    </p>
                  </div>

                  <div className="flex items-center bg-surface-container-low rounded-lg p-1 text-xs">
                    <button
                      onClick={() => setSelectedChartTab('combined')}
                      className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                        selectedChartTab === 'combined'
                          ? 'bg-primary-container text-white shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Combined
                    </button>
                    <button
                      onClick={() => setSelectedChartTab('admissions')}
                      className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                        selectedChartTab === 'admissions'
                          ? 'bg-primary-container text-white shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Admissions
                    </button>
                    <button
                      onClick={() => setSelectedChartTab('revenue')}
                      className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                        selectedChartTab === 'revenue'
                          ? 'bg-primary-container text-white shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Fee Revenue
                    </button>
                  </div>
                </div>

                {/* SVG Visual Canvas */}
                <div className="relative h-56 w-full pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                    <defs>
                      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#006a61" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#006a61" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#e2e7ff" strokeWidth="1" />
                    <line x1="40" y1="120" x2="480" y2="120" stroke="#e2e7ff" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="40" y1="70" x2="480" y2="70" stroke="#e2e7ff" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#e2e7ff" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Y Axis Labels */}
                    <text x="30" y="173" textAnchor="end" className="text-[9px] fill-gray-400">0</text>
                    <text x="30" y="123" textAnchor="end" className="text-[9px] fill-gray-400">400</text>
                    <text x="30" y="73" textAnchor="end" className="text-[9px] fill-gray-400">800</text>
                    <text x="30" y="23" textAnchor="end" className="text-[9px] fill-gray-400">1.2K</text>

                    {/* Filled Area for Admissions */}
                    {(selectedChartTab === 'combined' || selectedChartTab === 'admissions') && (
                      <>
                        <path
                          d="M 50 160 Q 90 150, 130 135 T 210 100 T 290 60 T 370 30 T 450 20 L 450 170 L 50 170 Z"
                          fill="url(#blueGradient)"
                        />
                        <path
                          d="M 50 160 Q 90 150, 130 135 T 210 100 T 290 60 T 370 30 T 450 20"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </>
                    )}

                    {/* Revenue Curve */}
                    {(selectedChartTab === 'combined' || selectedChartTab === 'revenue') && (
                      <>
                        <path
                          d="M 50 140 Q 90 135, 130 130 T 210 110 T 290 95 T 370 80 T 450 65 L 450 170 L 50 170 Z"
                          fill="url(#tealGradient)"
                        />
                        <path
                          d="M 50 140 Q 90 135, 130 130 T 210 110 T 290 95 T 370 80 T 450 65"
                          fill="none"
                          stroke="#006a61"
                          strokeWidth="2.5"
                          strokeDasharray={selectedChartTab === 'combined' ? '4 3' : 'none'}
                          strokeLinecap="round"
                        />
                      </>
                    )}

                    {/* Interactive Points */}
                    {chartData.map((d, idx) => (
                      <g
                        key={idx}
                        className="cursor-pointer group"
                        onMouseEnter={() =>
                          setHoveredDataPoint({
                            month: d.month,
                            admissions: `${d.adm} students`,
                            revenue: `₹${d.rev}L collected`,
                          })
                        }
                        onMouseLeave={() => setHoveredDataPoint(null)}
                      >
                        {/* X-axis Month Label */}
                        <text
                          x={d.x}
                          y="188"
                          textAnchor="middle"
                          className="text-[10px] font-medium fill-slate-500 group-hover:fill-primary"
                        >
                          {d.month}
                        </text>

                        {(selectedChartTab === 'combined' || selectedChartTab === 'admissions') && (
                          <circle
                            cx={d.x}
                            y={d.yAdm}
                            r="5"
                            className="fill-white stroke-primary stroke-2 group-hover:r-7 transition-all"
                          />
                        )}

                        {(selectedChartTab === 'combined' || selectedChartTab === 'revenue') && (
                          <circle
                            cx={d.x}
                            y={d.yRev}
                            r="4"
                            className="fill-white stroke-secondary stroke-2 group-hover:r-6 transition-all"
                          />
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Dynamic Tooltip on Hover */}
                  {hoveredDataPoint && (
                    <div className="absolute top-2 right-4 bg-on-surface text-surface-container-lowest text-xs rounded-lg px-3 py-2 shadow-xl border border-outline-variant/20 animate-in fade-in">
                      <div className="font-semibold text-primary-fixed">{hoveredDataPoint.month} Metrics</div>
                      <div className="text-[11px] text-gray-300">
                        Admissions: <span className="font-bold text-white">{hoveredDataPoint.admissions}</span>
                      </div>
                      <div className="text-[11px] text-gray-300">
                        Revenue: <span className="font-bold text-secondary-fixed">{hoveredDataPoint.revenue}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Legend & Summary */}
                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
                      <span className="text-on-surface-variant font-medium">New Student Admissions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
                      <span className="text-on-surface-variant font-medium">Fee Receipts (₹)</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-outline font-data-mono">
                    Updated 2m ago from 6 branches
                  </span>
                </div>
              </div>

              {/* Right Column: Branch Health & Real-Time Sync Feeds */}
              <div className="space-y-4">
                {/* Branch Health Card */}
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider">
                      Branch Health Matrix
                    </h4>
                    <span className="text-[10px] text-secondary font-semibold bg-secondary-fixed/50 px-1.5 py-0.5 rounded">
                      ALL OPERATIONAL
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-on-surface">Apex North Campus</div>
                        <div className="text-[10px] text-outline">1,240 Enrolled • 98.2% Fees</div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </div>

                    <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-on-surface">City Center Satellite</div>
                        <div className="text-[10px] text-outline">850 Enrolled • 92.4% Fees</div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </div>

                    <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-on-surface">Tech Hub Academy</div>
                        <div className="text-[10px] text-outline">1,120 Enrolled • 96.0% Fees</div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </div>
                  </div>
                </div>

                {/* Real-time Stream Card */}
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Real-Time Event Stream
                    </h4>
                    <span className="text-[10px] text-outline font-data-mono">Live</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="border-l-2 border-primary pl-2 py-0.5">
                      <div className="text-on-surface font-medium text-[11px]">Fee Receipt Generated #REC-9821</div>
                      <div className="text-outline text-[10px]">₹35,000 paid by Aarav • 1m ago</div>
                    </div>
                    <div className="border-l-2 border-secondary pl-2 py-0.5">
                      <div className="text-on-surface font-medium text-[11px]">RFID Gate Check: 42 Students</div>
                      <div className="text-outline text-[10px]">North Gate Turnstile #2 • 3m ago</div>
                    </div>
                    <div className="border-l-2 border-tertiary pl-2 py-0.5">
                      <div className="text-on-surface font-medium text-[11px]">QR Certificate Verified</div>
                      <div className="text-outline text-[10px]">Exam Board CA Registry • 7m ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF LOGOS BAND */}
      <section className="py-10 border-y border-outline-variant/20 bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-6">
            POWERS CENTRALIZED OPERATIONS FOR 1,200+ REPUTED ACADEMIES & INSTITUTIONS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center gap-2 font-bold text-on-surface text-base">
              <span className="material-symbols-outlined text-primary text-2xl">school</span>
              <span>Delhi Public Academy</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-on-surface text-base">
              <span className="material-symbols-outlined text-secondary text-2xl">workspace_premium</span>
              <span>Zenith Coaching Group</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-on-surface text-base">
              <span className="material-symbols-outlined text-tertiary text-2xl">computer</span>
              <span>TechPro Institute</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-on-surface text-base">
              <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
              <span>Apex Tuition Network</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-on-surface text-base">
              <span className="material-symbols-outlined text-secondary text-2xl">verified</span>
              <span>Cambridge Skill Academy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 12 STRUCTURAL FEATURE MODULES GRID */}
      <section id="features" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-fixed/50 px-3 py-1 rounded-full">
            All-in-One Educational Engine
          </span>
          <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface mt-3">
            Every Module Needed to Run Single or Multi-Campus Institutions
          </h2>
          <p className="text-on-surface-variant text-base mt-2">
            Engineered with deep workflow automation, cryptographic validation, and multi-tenant security.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {/* 1. Student Management */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">person</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Student Lifecycle</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Complete student profiles, enrollment history, guardian directory, KYC records, and automated status transitions.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-primary">360° Digital Dossier →</span>
          </div>

          {/* 2. Admission Management */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">how_to_reg</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Admission Funnel</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Inquiry capture, document verification, seat reservation limits, entrance evaluations, and instant offer letters.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-secondary">Zero Drop-off Pipeline →</span>
          </div>

          {/* 3. Multi-Branch Management */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">hub</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Multi-Branch Topology</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Centralized master control for headquarters while granting isolated autonomous dashboards for branch managers.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-tertiary">Unified Ledger Sync →</span>
          </div>

          {/* 4. Course & Batch Management */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">class</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Courses & Batches</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Dynamic academic semesters, batch scheduling, room capacity allocations, and syllabus milestone trackers.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-primary">Conflict-Free Timetables →</span>
          </div>

          {/* 5. Fee & Payment Management */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Fee & Online Gateway</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Installment structures, automated SMS payment links, GST compliance receipts, late fee penalties, and UPI reconciliation.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-secondary">99.4% Collection Rate →</span>
          </div>

          {/* 6. Biometric & RFID Attendance */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">fingerprint</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Biometric & RFID Sync</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Direct cloud sync with turnstile biometric hardware. Real-time absentee SMS dispatched to parents in under 3 seconds.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-primary">Zero-Touch Gate Audit →</span>
          </div>

          {/* 7. Exams & Grading Matrix */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">assignment</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Exams & Marksheets</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Configurable grading scales (CBSE, ICSE, GPA), hall tickets generation, subject weightages, and instant report cards.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-tertiary">Automated Grade Matrix →</span>
          </div>

          {/* 8. Cryptographic QR Certificates */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">qr_code_2</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Tamper-Proof QR Certs</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              One-click batch generation of graduation diplomas and certificates with scannable SHA-256 public verification pages.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-primary">Instant Public Verification →</span>
          </div>

          {/* 9. Teacher & Staff Management */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">badge</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Faculty & Payroll</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Teacher workload balancing, proxy assignment on leave, biometric check-in, and automated payroll pay slip generation.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-secondary">Smart Substitution Engine →</span>
          </div>

          {/* 10. Reports & Analytics */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">insights</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Executive Analytics</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Cohort drop-off predictors, branch financial benchmarks, fee dues ageing reports, and audit logs exportable in CSV/PDF.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-primary">Central Executive BI →</span>
          </div>

          {/* 11. Online Admission Portal */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">public</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">White-Label Web Portals</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Custom branded public portal (`portal.yourschool.edu`) for parent inquiries, branch vacancy checks, and online fees.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-tertiary">Custom Domain & Branding →</span>
          </div>

          {/* 12. Unified Communication */}
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-all hover:shadow-md group">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">notifications_active</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">WhatsApp & SMS Hub</h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Broadcast circulars, emergency holiday notices, and automated exam reminders via WhatsApp Business API and SMS gateways.
            </p>
            <span className="inline-block mt-3 text-[11px] font-semibold text-primary">High-Deliverability Broadcast →</span>
          </div>
        </div>
      </section>

      {/* 5. MULTI-BRANCH CAMPUS TOPOLOGY DIAGRAM */}
      <section id="multi-branch" className="py-16 bg-surface-container-low/40 border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-fixed/50 px-3 py-1 rounded-full">
              Multi-Branch Architecture
            </span>
            <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface mt-3">
              One Central Command HQ. Unlimited Distributed Branches.
            </h2>
            <p className="text-on-surface-variant text-base mt-2">
              Maintain consolidated financial and academic governance while empowering branch principals with autonomous controls.
            </p>
          </div>

          <div className="p-6 md:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-xl max-w-5xl mx-auto">
            {/* HQ Central Node */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-primary text-white text-center shadow-lg relative z-10">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
                CENTRAL HEADQUARTERS HUB
              </div>
              <h3 className="font-headline-md text-lg font-bold">Apex Central Institution HQ</h3>
              <p className="text-xs text-primary-fixed mt-1">
                Unified Financial Ledger • Global Accreditation • Staff Access Matrix
              </p>
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-around text-xs">
                <div>
                  <div className="font-bold text-sm">₹1.84 Cr</div>
                  <div className="text-[10px] text-primary-fixed">YTD Consolidated Fees</div>
                </div>
                <div className="h-6 w-px bg-white/20"></div>
                <div>
                  <div className="font-bold text-sm">3,842</div>
                  <div className="text-[10px] text-primary-fixed">Active Students</div>
                </div>
                <div className="h-6 w-px bg-white/20"></div>
                <div>
                  <div className="font-bold text-sm">184</div>
                  <div className="text-[10px] text-primary-fixed">Central Faculty</div>
                </div>
              </div>
            </div>

            {/* Connecting SVG Lines */}
            <div className="h-14 hidden md:flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 800 60">
                <path d="M 400 0 L 400 30 L 140 30 L 140 60" fill="none" stroke="#004ac6" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 400 0 L 400 60" fill="none" stroke="#004ac6" strokeWidth="2" />
                <path d="M 400 0 L 400 30 L 660 30 L 660 60" fill="none" stroke="#004ac6" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* 3 Child Campuses */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4 md:mt-0">
              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-secondary transition-all shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed">
                    North Campus
                  </span>
                  <span className="text-[11px] text-secondary font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Synced
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface">Apex North Campus</h4>
                <p className="text-[11px] text-outline mt-0.5">Plot 14, Institutional Area, Rohini</p>
                <div className="mt-3 pt-2 border-t border-outline-variant/30 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-outline text-[10px]">Enrollment</div>
                    <div className="font-bold text-on-surface">1,240 / 1,300</div>
                  </div>
                  <div>
                    <div className="text-outline text-[10px]">Fee Collection</div>
                    <div className="font-bold text-secondary">98.2% Done</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-secondary transition-all shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed">
                    City Center
                  </span>
                  <span className="text-[11px] text-secondary font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Synced
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface">City Center Satellite</h4>
                <p className="text-[11px] text-outline mt-0.5">Knowledge Boulevard, Connaught</p>
                <div className="mt-3 pt-2 border-t border-outline-variant/30 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-outline text-[10px]">Enrollment</div>
                    <div className="font-bold text-on-surface">850 / 900</div>
                  </div>
                  <div>
                    <div className="text-outline text-[10px]">Fee Collection</div>
                    <div className="font-bold text-secondary">92.4% Done</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-secondary transition-all shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed">
                    Tech Hub
                  </span>
                  <span className="text-[11px] text-secondary font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Synced
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface">Tech Hub Academy</h4>
                <p className="text-[11px] text-outline mt-0.5">Cyber Park Avenue, Phase 2</p>
                <div className="mt-3 pt-2 border-t border-outline-variant/30 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-outline text-[10px]">Enrollment</div>
                    <div className="font-bold text-on-surface">1,120 / 1,200</div>
                  </div>
                  <div>
                    <div className="text-outline text-[10px]">Fee Collection</div>
                    <div className="font-bold text-secondary">96.0% Done</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate('onboarding')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-container"
              >
                <span>Provision an additional satellite branch in 2 minutes</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROSPECTIVE FAMILIES & STUDENTS BRANCH FINDER */}
      <section id="branch-finder" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-fixed/50 px-3 py-1 rounded-full">
            Public Directory & Locator
          </span>
          <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface mt-3">
            Find Nearby Campuses & Check Seat Vacancies
          </h2>
          <p className="text-on-surface-variant text-base mt-2">
            Prospective parents and students can locate affiliated campuses, view remaining batch slots, and apply online directly.
          </p>
        </div>

        {/* Finder Controls Bar */}
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Metro Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Delhi NCR (Central & North)</option>
                <option>Bangalore Urban (Koramangala & Indiranagar)</option>
                <option>Mumbai Metropolitan Region</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Search Campus or Course
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Rohini, STEM, IIT Prep"
                  className="w-full text-sm pl-9 pr-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-lg">
                  search
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Proximity Radius
              </label>
              <select
                value={selectedRadius}
                onChange={(e) => setSelectedRadius(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>5 km radius</option>
                <option>15 km radius</option>
                <option>30 km metro-wide</option>
              </select>
            </div>
          </div>
        </div>

        {/* Split: Map Container & Campus Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map Preview (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-outline-variant/40 relative min-h-[380px] shadow-sm bg-slate-100">
            <img
              alt="Metro Campus Map"
              className="w-full h-full object-cover min-h-[380px]"
              src={selectedRegion.includes('Bangalore') ? BRAND_HOTLINKS.bangaloreMap : BRAND_HOTLINKS.delhiMap}
            />
            {/* Interactive Pins Overlay */}
            <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>

            {/* Pin 1 */}
            <button
              onClick={() => setActiveMapPin('loc-1')}
              className={`absolute top-1/3 left-1/3 p-2 rounded-xl text-white shadow-xl transition-transform hover:scale-110 flex items-center gap-1.5 ${
                activeMapPin === 'loc-1' ? 'bg-primary ring-4 ring-primary-fixed scale-110' : 'bg-primary/90'
              }`}
            >
              <span className="material-symbols-outlined text-sm">school</span>
              <span className="text-xs font-bold whitespace-nowrap">Apex North Campus (42 seats)</span>
            </button>

            {/* Pin 2 */}
            <button
              onClick={() => setActiveMapPin('loc-2')}
              className={`absolute top-1/2 left-1/2 p-2 rounded-xl text-white shadow-xl transition-transform hover:scale-110 flex items-center gap-1.5 ${
                activeMapPin === 'loc-2' ? 'bg-primary ring-4 ring-primary-fixed scale-110' : 'bg-primary/90'
              }`}
            >
              <span className="material-symbols-outlined text-sm">apartment</span>
              <span className="text-xs font-bold whitespace-nowrap">City Center Satellite (18 seats)</span>
            </button>

            {/* Pin 3 */}
            <button
              onClick={() => setActiveMapPin('loc-3')}
              className={`absolute bottom-1/4 right-1/4 p-2 rounded-xl text-white shadow-xl transition-transform hover:scale-110 flex items-center gap-1.5 ${
                activeMapPin === 'loc-3' ? 'bg-inverse-surface ring-4 ring-outline scale-110' : 'bg-inverse-surface/90'
              }`}
            >
              <span className="material-symbols-outlined text-sm">biotech</span>
              <span className="text-xs font-bold whitespace-nowrap">Tech Hub (Waitlist)</span>
            </button>

            <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-outline-variant/30 text-xs text-on-surface font-medium flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>GPS Coordinate Lock: 28.6139° N, 77.2090° E</span>
            </div>
          </div>

          {/* Campus List Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setActiveMapPin(branch.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeMapPin === branch.id
                    ? 'bg-surface-container-lowest border-primary shadow-md ring-1 ring-primary/20'
                    : 'bg-surface-container-lowest border-outline-variant/40 hover:border-outline hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${branch.badgeColor}`}>
                      {branch.status}
                    </span>
                    <h4 className="font-headline-sm text-sm font-bold text-on-surface mt-1.5">
                      {branch.name}
                    </h4>
                    <p className="text-xs text-outline mt-0.5">{branch.address}</p>
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium whitespace-nowrap">
                    {branch.distance}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                  {branch.seatsRemaining ? (
                    <span className="text-xs font-semibold text-secondary">
                      🔥 Only {branch.seatsRemaining} seats remaining
                    </span>
                  ) : (
                    <span className="text-xs text-outline">{branch.termNote}</span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setApplyingBranch(branch);
                    }}
                    className="text-xs font-bold text-primary hover:text-primary-container px-3 py-1.5 rounded-lg hover:bg-primary-fixed/30 transition-colors"
                  >
                    {branch.actionText}
                  </button>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-xl bg-surface-container-low border border-dashed border-outline-variant text-center">
              <span className="text-xs text-on-surface-variant">
                Are you an institution administrator looking to add your campus here?
              </span>
              <button
                onClick={() => onNavigate('onboarding')}
                className="block mx-auto text-xs font-bold text-primary hover:underline mt-1"
              >
                + Register & Provision Branch →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH IMPACT CONVERSION CTA BANNER */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-primary via-primary-container to-tertiary text-white p-8 md:p-14 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-fixed bg-white/20 px-3 py-1 rounded-full">
              Instant Provisioning
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to simplify your institution management?
            </h2>
            <p className="text-primary-fixed text-base md:text-lg">
              Join over 1,200 schools, colleges, and coaching networks running on EduManage today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('register')}
                className="h-12 px-8 rounded-xl bg-white text-primary font-bold text-base shadow-lg hover:bg-primary-fixed transition-all active:scale-[0.98]"
              >
                Create Your Institution Free
              </button>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="h-12 px-6 rounded-xl bg-white/15 border border-white/30 text-white font-semibold text-base hover:bg-white/25 transition-colors"
              >
                Schedule Architecture Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENTERPRISE FOOTER */}
      <footer className="bg-surface-container-low border-t border-outline-variant/30 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <img
                alt="EduManage Brandmark"
                className="h-8 w-auto object-contain"
                src={BRAND_HOTLINKS.logo}
              />
              <span className="font-headline-md text-lg font-bold text-on-surface">EduManage</span>
            </div>
            <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
              The unified administrative operating system for schools, multi-campus academies, and higher education networks. ISO 27001 & SOC-2 certified infrastructure.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-secondary font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              All Systems Operational (99.98% 90-Day SLA)
            </div>
          </div>

          <div>
            <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li><a href="#features" className="hover:text-primary">Student Records</a></li>
              <li><a href="#features" className="hover:text-primary">Multi-Branch Sync</a></li>
              <li><a href="#features" className="hover:text-primary">Fee & UPI Gateways</a></li>
              <li><a href="#features" className="hover:text-primary">Biometric Attendance</a></li>
              <li><a href="#features" className="hover:text-primary">QR Certificates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li><a href="#solutions" className="hover:text-primary">K-12 Day Schools</a></li>
              <li><a href="#solutions" className="hover:text-primary">Competitive Coaching</a></li>
              <li><a href="#solutions" className="hover:text-primary">Vocational Institutes</a></li>
              <li><a href="#solutions" className="hover:text-primary">Tuition Centers</a></li>
              <li><button onClick={() => onNavigate('admin')} className="text-primary font-semibold hover:underline">Super Admin Hub</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline-sm text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li><span className="hover:text-primary cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-primary cursor-pointer">Privacy & DPA</span></li>
              <li><span className="hover:text-primary cursor-pointer">ISO 27001 Certificate</span></li>
              <li><span className="hover:text-primary cursor-pointer">FERPA / GDPR Compliance</span></li>
              <li><span className="text-outline">© 2025 EduManage Systems</span></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSubmitSuccess={(msg) => onShowToast(msg)}
      />
      <ApplyModal
        branch={applyingBranch}
        onClose={() => setApplyingBranch(null)}
        onSubmitSuccess={(msg) => onShowToast(msg)}
      />
    </div>
  );
};
