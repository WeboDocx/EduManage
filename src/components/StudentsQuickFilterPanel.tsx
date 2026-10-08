import React, { useState } from 'react';

export interface QuickFilterPreferences {
  academicYear: string;
  department: string;
  status: string;
  isPanelExpanded: boolean;
}

export const SESSION_QUICK_FILTER_KEY = 'edumanage_students_quick_filter_session_prefs_v1';

export const ACADEMIC_YEARS = [
  { id: 'All Academic Years', label: 'All Years', badge: 'All' },
  { id: '2026-2027', label: 'AY 2026-27', sub: 'Upcoming / Spring', badge: '2026-27' },
  { id: '2025-2026', label: 'AY 2025-26', sub: 'Current Active', badge: '2025-26', isCurrent: true },
  { id: '2024-2025', label: 'AY 2024-25', sub: 'Previous Session', badge: '2024-25' },
  { id: '2023-2024', label: 'AY 2023-24', sub: 'Archived', badge: '2023-24' },
];

export const DEPARTMENTS = [
  { id: 'All Departments', label: 'All Departments', icon: 'apps' },
  { id: 'Computer Science & IT', label: 'Computer Science & IT', icon: 'terminal', short: 'CS & IT' },
  { id: 'Commerce & Accounting', label: 'Commerce & Accounting', icon: 'account_balance', short: 'Commerce' },
  { id: 'Digital Marketing & Media', label: 'Digital Marketing & Media', icon: 'campaign', short: 'Marketing' },
  { id: 'Design & Arts', label: 'Design & Arts', icon: 'palette', short: 'Design' },
  { id: 'Languages & Communication', label: 'Languages & Communication', icon: 'record_voice_over', short: 'Languages' },
];

export const STATUS_OPTIONS = [
  { id: 'All Statuses', label: 'All Statuses', color: 'bg-outline/50', border: 'border-outline/40' },
  { id: 'Active', label: 'Active', color: 'bg-emerald-500', border: 'border-emerald-500/40', text: 'text-emerald-700 dark:text-emerald-300' },
  { id: 'Inactive', label: 'Inactive / On-Hold', color: 'bg-amber-500', border: 'border-amber-500/40', text: 'text-amber-700 dark:text-amber-300' },
  { id: 'Completed', label: 'Completed', color: 'bg-primary', border: 'border-primary/40', text: 'text-primary' },
  { id: 'Dropped Out', label: 'Dropped Out', color: 'bg-rose-500', border: 'border-rose-500/40', text: 'text-rose-700 dark:text-rose-300' },
];

export interface StudentsQuickFilterPanelProps {
  academicYear: string;
  department: string;
  status: string;
  isExpanded: boolean;
  onAcademicYearChange: (ay: string) => void;
  onDepartmentChange: (dept: string) => void;
  onStatusChange: (status: string) => void;
  onToggleExpand: () => void;
  onResetFilters: () => void;
  onClearSession: () => void;
  matchingCount: number;
  totalCount: number;
  academicYearCounts: Record<string, number>;
  departmentCounts: Record<string, number>;
  statusCounts: Record<string, number>;
  lastSavedAt: string | null;
}

export const StudentsQuickFilterPanel: React.FC<StudentsQuickFilterPanelProps> = ({
  academicYear,
  department,
  status,
  isExpanded,
  onAcademicYearChange,
  onDepartmentChange,
  onStatusChange,
  onToggleExpand,
  onResetFilters,
  onClearSession,
  matchingCount,
  totalCount,
  academicYearCounts,
  departmentCounts,
  statusCounts,
  lastSavedAt,
}) => {
  const [showSessionTooltip, setShowSessionTooltip] = useState(false);

  // Check how many quick filters are active (not set to "All")
  const activeCount =
    (academicYear !== 'All Academic Years' ? 1 : 0) +
    (department !== 'All Departments' ? 1 : 0) +
    (status !== 'All Statuses' ? 1 : 0);

  // Apply quick preset
  const handleApplyPreset = (presetAy: string, presetDept: string, presetStatus: string) => {
    onAcademicYearChange(presetAy);
    onDepartmentChange(presetDept);
    onStatusChange(presetStatus);
  };

  return (
    <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs overflow-hidden transition-all duration-200 print:hidden">
      {/* Top Header & Summary Bar */}
      <div className="p-3.5 sm:p-4 bg-surface-container-low/70 border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Title + Active Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[19px]">tune</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-label-lg text-sm font-bold text-on-surface tracking-tight">
                  Quick Filters
                </h3>
                {activeCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary text-on-primary shadow-2xs">
                    {activeCount} {activeCount === 1 ? 'Filter' : 'Filters'} Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-container text-outline">
                    Showing All Records
                  </span>
                )}
              </div>
              <p className="text-[11px] text-outline">
                Filter by Academic Year, Department &amp; Status with instant session persistence
              </p>
            </div>
          </div>

          {/* Session Storage Pill */}
          <div className="relative inline-block ml-auto sm:ml-0">
            <button
              type="button"
              onClick={() => setShowSessionTooltip(prev => !prev)}
              onMouseEnter={() => setShowSessionTooltip(true)}
              onMouseLeave={() => setShowSessionTooltip(false)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant/40 text-[11px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              title="Click for session storage details"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-data-mono font-semibold text-emerald-700 dark:text-emerald-400">
                Session Saved
              </span>
              {lastSavedAt && (
                <span className="text-[10px] text-outline font-data-mono hidden sm:inline">
                  ({lastSavedAt})
                </span>
              )}
            </button>

            {showSessionTooltip && (
              <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-1.5 w-64 p-2.5 bg-inverse-surface text-inverse-on-surface rounded-xl text-xs shadow-xl z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400 mt-0.5">
                    save
                  </span>
                  <div>
                    <p className="font-semibold text-white">Local Session Storage Active</p>
                    <p className="text-[11px] text-inverse-on-surface/80 mt-0.5 leading-relaxed">
                      Your chosen Academic Year, Department, and Status preferences are automatically remembered throughout your browsing session.
                    </p>
                    {lastSavedAt && (
                      <p className="text-[10px] text-inverse-on-surface/60 font-data-mono mt-1">
                        Last synced: {lastSavedAt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Presets & Control Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Presets Pills */}
          <div className="hidden lg:flex items-center gap-1 p-0.5 bg-surface-container rounded-lg border border-outline-variant/30 text-xs">
            <span className="text-[10px] font-semibold text-outline px-2 uppercase tracking-wider">
              Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset('2025-2026', 'All Departments', 'Active')}
              className="px-2 py-1 rounded text-[11px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
            >
              Current Active
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('All Academic Years', 'Computer Science & IT', 'All Statuses')}
              className="px-2 py-1 rounded text-[11px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
            >
              CS &amp; IT
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('All Academic Years', 'Commerce & Accounting', 'All Statuses')}
              className="px-2 py-1 rounded text-[11px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
            >
              Commerce
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('All Academic Years', 'All Departments', 'Completed')}
              className="px-2 py-1 rounded text-[11px] font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
            >
              Completed
            </button>
          </div>

          {/* Reset Filters Button */}
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-error hover:bg-error-container/20 border border-error/20 transition-all cursor-pointer"
              title="Reset all quick filters to default"
            >
              <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              <span>Reset</span>
            </button>
          )}

          {/* Toggle Expand / Collapse */}
          <button
            type="button"
            onClick={onToggleExpand}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/40 text-xs font-semibold transition-all cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide Panel' : 'Show Filter Options'}</span>
            <span className="material-symbols-outlined text-[16px]">
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Quick Filter Panels */}
      {isExpanded && (
        <div className="p-4 sm:p-5 flex flex-col gap-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. ACADEMIC YEAR SECTION */}
            <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-surface-container-low/40 border border-outline-variant/30">
              <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    calendar_month
                  </span>
                  <span>1. Academic Year</span>
                </div>
                {academicYear !== 'All Academic Years' && (
                  <button
                    type="button"
                    onClick={() => onAcademicYearChange('All Academic Years')}
                    className="text-[11px] text-primary hover:underline font-medium cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                {ACADEMIC_YEARS.map(ay => {
                  const isSelected = academicYear === ay.id;
                  const count = academicYearCounts[ay.id] ?? 0;

                  return (
                    <button
                      key={ay.id}
                      type="button"
                      onClick={() => onAcademicYearChange(ay.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary font-semibold shadow-xs ring-1 ring-primary'
                          : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected
                              ? 'bg-on-primary'
                              : ay.isCurrent
                              ? 'bg-emerald-500'
                              : 'bg-outline-variant'
                          }`}
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="truncate">{ay.label}</span>
                          {ay.sub && (
                            <span
                              className={`text-[10px] truncate ${
                                isSelected ? 'text-on-primary/80' : 'text-outline'
                              }`}
                            >
                              {ay.sub}
                            </span>
                          )}
                        </div>
                      </div>

                      <span
                        className={`font-data-mono text-[11px] px-1.5 py-0.5 rounded ml-2 flex-shrink-0 ${
                          isSelected
                            ? 'bg-on-primary/20 text-on-primary font-bold'
                            : 'bg-surface-container-high text-outline font-medium'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. DEPARTMENT SECTION */}
            <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-surface-container-low/40 border border-outline-variant/30">
              <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    domain
                  </span>
                  <span>2. Department</span>
                </div>
                {department !== 'All Departments' && (
                  <button
                    type="button"
                    onClick={() => onDepartmentChange('All Departments')}
                    className="text-[11px] text-primary hover:underline font-medium cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                {DEPARTMENTS.map(dept => {
                  const isSelected = department === dept.id;
                  const count = departmentCounts[dept.id] ?? 0;

                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => onDepartmentChange(dept.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary font-semibold shadow-xs ring-1 ring-primary'
                          : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`material-symbols-outlined text-[17px] flex-shrink-0 ${
                            isSelected ? 'text-on-primary' : 'text-primary'
                          }`}
                        >
                          {dept.icon}
                        </span>
                        <span className="truncate">{dept.label}</span>
                      </div>

                      <span
                        className={`font-data-mono text-[11px] px-1.5 py-0.5 rounded ml-2 flex-shrink-0 ${
                          isSelected
                            ? 'bg-on-primary/20 text-on-primary font-bold'
                            : 'bg-surface-container-high text-outline font-medium'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. CURRENT STATUS SECTION */}
            <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-surface-container-low/40 border border-outline-variant/30">
              <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    verified_user
                  </span>
                  <span>3. Current Status</span>
                </div>
                {status !== 'All Statuses' && (
                  <button
                    type="button"
                    onClick={() => onStatusChange('All Statuses')}
                    className="text-[11px] text-primary hover:underline font-medium cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                {STATUS_OPTIONS.map(st => {
                  const isSelected = status === st.id;
                  const count = statusCounts[st.id] ?? 0;

                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => onStatusChange(st.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-on-primary font-semibold shadow-xs ring-1 ring-primary'
                          : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-on-primary' : st.color}`} />
                        <span className="truncate">{st.label}</span>
                      </div>

                      <span
                        className={`font-data-mono text-[11px] px-1.5 py-0.5 rounded ml-2 flex-shrink-0 ${
                          isSelected
                            ? 'bg-on-primary/20 text-on-primary font-bold'
                            : 'bg-surface-container-high text-outline font-medium'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Filter Footer Info Bar */}
          <div className="pt-3 border-t border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-outline font-medium">Applied Settings:</span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-data-mono font-semibold text-on-surface">
                AY: {academicYear}
              </span>
              <span className="text-outline">/</span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-data-mono font-semibold text-on-surface">
                Dept: {department}
              </span>
              <span className="text-outline">/</span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-data-mono font-semibold text-on-surface">
                Status: {status}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-data-mono text-on-surface">
                Matching Students: <strong className="text-primary font-bold">{matchingCount}</strong> of {totalCount}
              </span>
              <button
                type="button"
                onClick={onClearSession}
                className="text-[11px] text-outline hover:text-error underline transition-colors cursor-pointer"
                title="Erase saved session preferences from browser storage"
              >
                Clear Session Memory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
