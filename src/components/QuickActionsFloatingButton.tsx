import React, { useState, useEffect, useRef } from 'react';
import { ScreenType } from '../types';

interface QuickActionsFloatingButtonProps {
  onAddStudent: () => void;
  onCreateCourse: () => void;
  onViewReports: () => void;
  onCollectFee: () => void;
  onExportRosterCSV?: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const QuickActionsFloatingButton: React.FC<QuickActionsFloatingButtonProps> = ({
  onAddStudent,
  onCreateCourse,
  onViewReports,
  onCollectFee,
  onExportRosterCSV,
  onNavigate,
  onShowToast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape, or toggle with Alt+Q
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      if (e.altKey && (e.key === 'q' || e.key === 'Q')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (actionFn: () => void) => {
    setIsOpen(false);
    actionFn();
  };

  const handleDefaultCSVExport = () => {
    if (onExportRosterCSV) {
      onExportRosterCSV();
    } else {
      // Generate instant sample roster CSV
      const csvHeader = 'Admission No,Student Name,Course,Campus,Status,Enrollment Date,Fee Status\n';
      const csvRows = [
        'ADM-8902,Rahul Kumar,Web Development,Siliguri HQ,Confirmed,Today,Due ₹7000',
        'ADM-8901,Priya Sharma,Tally Prime & GST,Binnaguri Hub,Confirmed,Today,Paid Full',
        'ADM-8898,Aniket Roy,Graphic & UI Design,Jalpaiguri,Pending Docs,Yesterday,Due ₹4500',
        'ADM-8895,Sneha Das,Digital Marketing,Siliguri HQ,Confirmed,Yesterday,Paid Full',
        'ADM-8890,Vikramaditya Sen,Python AI & Data,Siliguri HQ,Confirmed,05 Oct 2026,Paid Full',
      ].join('\n');

      const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `edumanage_students_roster_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onShowToast('Student roster CSV exported successfully!');
    }
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end">
      {/* Dimmed backdrop when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-30 transition-opacity animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Action Menu Card */}
      {isOpen && (
        <div
          className="relative z-40 mb-3 w-[310px] sm:w-[350px] bg-surface-container-lowest text-on-surface rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          role="menu"
          aria-label="Quick Actions Menu"
        >
          {/* Card Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-primary/10 via-primary-container/20 to-transparent border-b border-outline-variant/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              <div>
                <h3 className="text-xs font-bold text-on-surface">Quick Actions</h3>
                <p className="text-[10px] text-outline">Common admin tasks & shortcuts</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container-high text-outline-variant border border-outline-variant/30 hidden sm:inline-block">
              Alt+Q
            </span>
          </div>

          {/* Action List */}
          <div className="p-2 space-y-1">
            {/* Action 1: Add Student */}
            <button
              onClick={() => handleAction(onAddStudent)}
              className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container flex items-center gap-3 transition-colors group cursor-pointer"
              role="menuitem"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors">
                    Add Student
                  </span>
                  <span className="text-[10px] font-semibold text-primary/80 bg-primary/10 px-1.5 py-0.2 rounded">
                    Popular
                  </span>
                </div>
                <p className="text-[11px] text-outline truncate">
                  Instant admission intake & branch assignment
                </p>
              </div>
            </button>

            {/* Action 2: Create Course */}
            <button
              onClick={() => handleAction(onCreateCourse)}
              className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container flex items-center gap-3 transition-colors group cursor-pointer"
              role="menuitem"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[20px]">library_add</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Create Course
                  </span>
                  <span className="text-[10px] font-mono text-outline">New</span>
                </div>
                <p className="text-[11px] text-outline truncate">
                  Setup curriculum, duration, fee & batch seats
                </p>
              </div>
            </button>

            {/* Action 3: View Reports */}
            <button
              onClick={() => handleAction(onViewReports)}
              className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container flex items-center gap-3 transition-colors group cursor-pointer"
              role="menuitem"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    View Reports
                  </span>
                  <span className="text-[10px] font-mono text-outline">Live</span>
                </div>
                <p className="text-[11px] text-outline truncate">
                  Collection ledger, attendance & pipeline audits
                </p>
              </div>
            </button>

            {/* Action 4: Collect Counter Fee */}
            <button
              onClick={() => handleAction(onCollectFee)}
              className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container flex items-center gap-3 transition-colors group cursor-pointer"
              role="menuitem"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-xs text-on-surface group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors block">
                  Collect Fee
                </span>
                <p className="text-[11px] text-outline truncate">
                  Record counter payment, UPI receipt & sync
                </p>
              </div>
            </button>

            {/* Action 5: Export Roster CSV */}
            <button
              onClick={handleDefaultCSVExport}
              className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container flex items-center gap-3 transition-colors group cursor-pointer"
              role="menuitem"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[20px]">download</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-xs text-on-surface group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors block">
                  Export Student Roster (CSV)
                </span>
                <p className="text-[11px] text-outline truncate">
                  Direct offline CSV file of current enrollments
                </p>
              </div>
            </button>

            {/* Action 6: Issue Certificate / Jump to Console */}
            <button
              onClick={() => handleAction(() => onNavigate('certificates'))}
              className="w-full text-left p-2.5 rounded-xl hover:bg-surface-container flex items-center gap-3 transition-colors group cursor-pointer"
              role="menuitem"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-xs text-on-surface group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors block">
                  Issue Certificates
                </span>
                <p className="text-[11px] text-outline truncate">
                  Generate verified credentials & QR diplomas
                </p>
              </div>
            </button>
          </div>

          {/* Quick Footer Navigation */}
          <div className="px-3 py-2 bg-surface-container-low/70 border-t border-outline-variant/15 flex items-center justify-between text-[11px] text-outline">
            <span>Browse Directories:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAction(() => onNavigate('students-directory'))}
                className="hover:text-primary font-medium cursor-pointer"
              >
                Students →
              </button>
              <button
                onClick={() => handleAction(() => onNavigate('courses-batches'))}
                className="hover:text-primary font-medium cursor-pointer"
              >
                Courses →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Action Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle Quick Actions menu"
        className={`relative z-40 flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-xl transition-all duration-200 cursor-pointer select-none active:scale-95 border ${
          isOpen
            ? 'bg-neutral-900 text-white border-neutral-700 shadow-2xl rotate-0'
            : 'bg-gradient-to-r from-primary via-indigo-600 to-blue-600 text-white border-white/20 shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.03]'
        }`}
      >
        {/* Pulsing halo ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-primary/25 animate-ping pointer-events-none opacity-60" />
        )}

        {/* Animated icon (Bolt / Close) */}
        <span
          className={`material-symbols-outlined text-[20px] sm:text-[22px] transition-transform duration-200 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        >
          {isOpen ? 'close' : 'bolt'}
        </span>

        {/* Button Label */}
        <span className="text-xs sm:text-sm font-bold tracking-tight">
          {isOpen ? 'Close' : 'Quick Actions'}
        </span>

        {/* Action Counter Badge */}
        {!isOpen && (
          <span className="hidden sm:inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-[10px] font-bold">
            6
          </span>
        )}
      </button>
    </div>
  );
};

export default QuickActionsFloatingButton;
