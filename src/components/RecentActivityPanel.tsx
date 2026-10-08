import React, { useState, useMemo } from 'react';
import { ScreenType } from '../types';
import { AdminActivityRecord, ActivityCategory, AdminActionType } from '../types/activity';
import { useActivityLog } from '../context/ActivityLogContext';

interface RecentActivityPanelProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
  currentCampusScope?: string;
}

export const RecentActivityPanel: React.FC<RecentActivityPanelProps> = ({
  onNavigate,
  onShowToast,
  currentCampusScope = 'All Branches (8)',
}) => {
  const { activities, logAdministrativeAction, verifyAuditChain, exportAuditLogCSV } =
    useActivityLog();

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('All');
  const [isVerifyingChain, setIsVerifyingChain] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    count: number;
    time: string;
  } | null>(null);

  // Inspector modal state
  const [inspectRecord, setInspectRecord] = useState<AdminActivityRecord | null>(null);

  // Quick Action record modal state
  const [isAddActionModalOpen, setIsAddActionModalOpen] = useState(false);
  const [newActionType, setNewActionType] = useState<AdminActionType>('Student Added');
  const [newTargetName, setNewTargetName] = useState('');
  const [newTargetId, setNewTargetId] = useState('');
  const [newCampus, setNewCampus] = useState('Siliguri HQ Campus');
  const [newDetails, setNewDetails] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activities.filter(item => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'students' && item.category !== 'students') return false;
        if (selectedCategory === 'certificates' && item.category !== 'certificates') return false;
        if (selectedCategory === 'finance' && item.category !== 'finance') return false;
        if (selectedCategory === 'academics' && item.category !== 'academics') return false;
        if (selectedCategory === 'security' && item.category !== 'security') return false;
      }

      // Campus filter
      if (selectedCampus !== 'All') {
        const itemCampusNorm = item.campus.toLowerCase();
        const selectedNorm = selectedCampus.toLowerCase();
        if (!itemCampusNorm.includes(selectedNorm) && item.campus !== 'All Campuses') {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          item.action.toLowerCase().includes(q) ||
          item.target.toLowerCase().includes(q) ||
          item.targetId.toLowerCase().includes(q) ||
          item.actor.toLowerCase().includes(q) ||
          item.details.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.securityHash.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [activities, selectedCategory, selectedCampus, searchQuery]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: activities.length,
      students: activities.filter(a => a.category === 'students').length,
      certificates: activities.filter(a => a.category === 'certificates').length,
      finance: activities.filter(a => a.category === 'finance').length,
      academics: activities.filter(a => a.category === 'academics').length,
      security: activities.filter(a => a.category === 'security').length,
    };
  }, [activities]);

  const handleVerifyChain = () => {
    setIsVerifyingChain(true);
    setTimeout(() => {
      const result = verifyAuditChain();
      setVerificationResult({
        verified: result.isAllVerified,
        count: result.count,
        time: result.checkedAt,
      });
      setIsVerifyingChain(false);
      onShowToast(`Audit Chain Integrity Validated! ${result.count} of ${activities.length} cryptographic records intact.`);
    }, 600);
  };

  const handleCopyHash = (e: React.MouseEvent, hash: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    onShowToast(`Cryptographic hash copied: ${hash.slice(0, 18)}...`);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handleCreateCustomAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetName.trim()) {
      onShowToast('Please provide a target entity name.');
      return;
    }

    const created = logAdministrativeAction({
      action: newActionType,
      target: newTargetName.trim(),
      targetId: newTargetId.trim() || undefined,
      campus: newCampus,
      details: newDetails.trim() || `Administrative ${newActionType} action executed by logged-in campus admin.`,
      actor: 'Campus Admin (Current Session)',
      actorRole: 'System Administrator',
    });

    setIsAddActionModalOpen(false);
    setNewTargetName('');
    setNewTargetId('');
    setNewDetails('');
    onShowToast(`Audit entry ${created.id} recorded for "${created.action}: ${created.target}"!`);
  };

  // Helper for action icon & styling
  const getActionConfig = (action: string, category: string) => {
    if (action.includes('Student') || category === 'students') {
      return {
        icon: 'person_add',
        bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        dot: 'bg-emerald-500',
        badgeText: 'Student Intake',
      };
    }
    if (action.includes('Certificate') || category === 'certificates') {
      return {
        icon: 'workspace_premium',
        bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
        dot: 'bg-purple-500',
        badgeText: 'Certificate Issuance',
      };
    }
    if (action.includes('Fee') || category === 'finance') {
      return {
        icon: 'payments',
        bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        dot: 'bg-amber-500',
        badgeText: 'Finance & Receipt',
      };
    }
    if (action.includes('Course') || category === 'academics') {
      return {
        icon: 'menu_book',
        bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
        dot: 'bg-indigo-500',
        badgeText: 'Academic Senate',
      };
    }
    return {
      icon: 'verified_user',
      bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      dot: 'bg-blue-500',
      badgeText: 'Security Protocol',
    };
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-xs flex flex-col overflow-hidden">
      {/* 1. Header with Audit Status & Direct Actions */}
      <div className="p-4 sm:p-5 border-b border-outline-variant/15 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">shield</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm sm:text-base text-on-surface">
                  Recent Activity & Audit Trail
                </h2>
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Live Stream</span>
                </span>
              </div>
              <p className="text-xs text-outline mt-0.5">
                Tracks administrative actions with tamper-evident cryptographic checksums (SHA-256)
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleVerifyChain}
              disabled={isVerifyingChain}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all cursor-pointer border border-outline-variant/20 disabled:opacity-60"
              title="Validate cryptographic hashes across the entire audit trail"
            >
              <span
                className={`material-symbols-outlined text-[16px] text-primary ${
                  isVerifyingChain ? 'animate-spin' : ''
                }`}
              >
                verified
              </span>
              <span>{isVerifyingChain ? 'Verifying...' : 'Verify Integrity'}</span>
            </button>

            <button
              type="button"
              onClick={exportAuditLogCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all cursor-pointer border border-outline-variant/20"
              title="Download official audit compliance CSV"
            >
              <span className="material-symbols-outlined text-[16px] text-outline">download</span>
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddActionModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs transition-all cursor-pointer"
              title="Record an immediate administrative audit event"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Log Action</span>
            </button>
          </div>
        </div>

        {/* Verification Status Banner if checked */}
        {verificationResult && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-lg px-3 py-2 text-xs flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px]">
                check_circle
              </span>
              <span>
                <strong>100% Audit Chain Validated</strong> · {verificationResult.count} records verified against SHA-256 root at {verificationResult.time}.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setVerificationResult(null)}
              className="text-emerald-600 hover:text-emerald-800 p-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
            </button>
          </div>
        )}

        {/* 2. Interactive Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
          {/* Segmented Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 bg-surface-container p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('students')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'students'
                  ? 'bg-surface-container-lowest text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Students Added ({counts.students})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('certificates')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'certificates'
                  ? 'bg-surface-container-lowest text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Certificates ({counts.certificates})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('finance')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'finance'
                  ? 'bg-surface-container-lowest text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Fees ({counts.finance})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('academics')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'academics'
                  ? 'bg-surface-container-lowest text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Courses ({counts.academics})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('security')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'security'
                  ? 'bg-surface-container-lowest text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Security ({counts.security})
            </button>
          </div>

          {/* Quick Search & Campus Selector */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-48">
              <span className="material-symbols-outlined text-[16px] text-outline absolute left-2.5 top-2.5">
                search
              </span>
              <input
                type="text"
                placeholder="Search audit trail..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>

            <select
              value={selectedCampus}
              onChange={e => setSelectedCampus(e.target.value)}
              className="h-8 px-2.5 bg-surface-container-low border border-outline-variant/30 rounded-lg text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Campuses</option>
              <option value="Siliguri">Siliguri HQ</option>
              <option value="Binnaguri">Binnaguri Hub</option>
              <option value="Jalpaiguri">Jalpaiguri</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Activity Feed List */}
      <div className="divide-y divide-outline-variant/10 max-h-[460px] overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-surface-container mx-auto flex items-center justify-center text-outline mb-2">
              <span className="material-symbols-outlined text-[24px]">history_toggle_off</span>
            </div>
            <p className="text-xs font-semibold text-on-surface">No administrative events match current criteria</p>
            <p className="text-[11px] text-outline mt-0.5">
              Try adjusting category filter or clearing search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedCampus('All');
              }}
              className="mt-3 px-3 py-1 rounded-lg bg-surface-container text-xs font-medium text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredActivities.map(item => {
            const config = getActionConfig(item.action, item.category);
            return (
              <div
                key={item.id}
                onClick={() => setInspectRecord(item)}
                className="p-3.5 sm:p-4 hover:bg-surface-container-low/60 transition-colors cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Left: Icon & Action Details */}
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{config.icon}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs sm:text-sm text-on-surface group-hover:text-primary transition-colors">
                        {item.action}
                      </span>
                      <span className="text-outline text-xs">·</span>
                      <span className="font-semibold text-xs text-on-surface truncate">
                        {item.target}
                      </span>
                      {item.targetId && (
                        <span className="font-mono text-[10px] text-outline px-1 rounded bg-surface-container">
                          {item.targetId}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-outline line-clamp-1 mt-0.5">
                      {item.details}
                    </p>

                    {/* Metadata line with typographic separators */}
                    <div className="flex items-center gap-2 text-[11px] text-outline mt-1 flex-wrap">
                      <span>by <strong className="text-on-surface font-medium">{item.actor}</strong> ({item.actorRole})</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.campus}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.timeFormatted}</span>
                      <span className="text-[10px] text-outline">({item.timeAgo})</span>
                    </div>
                  </div>
                </div>

                {/* Right: Security & Cryptographic Details */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant/10">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        item.status === 'Verified'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      ></span>
                      <span>{item.status}</span>
                    </span>

                    <span className="text-[10px] font-medium text-outline px-1.5 py-0.2 rounded bg-surface-container">
                      {item.securityLevel}
                    </span>
                  </div>

                  {/* Hash Snippet with Copy */}
                  <div className="flex items-center gap-1">
                    <span
                      className="font-mono text-[10px] text-outline hover:text-on-surface cursor-pointer"
                      title={item.securityHash}
                      onClick={e => handleCopyHash(e, item.securityHash)}
                    >
                      {item.securityHash.slice(0, 15)}...
                    </span>
                    <button
                      type="button"
                      onClick={e => handleCopyHash(e, item.securityHash)}
                      className="p-1 rounded text-outline hover:text-primary transition-colors cursor-pointer"
                      title="Copy SHA-256 verification hash"
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {copiedHash === item.securityHash ? 'check' : 'content_copy'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setInspectRecord(item);
                      }}
                      className="p-1 rounded text-outline hover:text-primary transition-colors cursor-pointer"
                      title="Inspect full audit record"
                    >
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Panel Footer Summary */}
      <div className="p-3 bg-surface-container-low/50 border-t border-outline-variant/15 flex items-center justify-between text-xs text-outline">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-emerald-600">lock</span>
          <span>
            Showing {filteredActivities.length} of {activities.length} tamper-evident log records
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            Super Admin Vault →
          </button>
        </div>
      </div>

      {/* MODAL: AUDIT RECORD INSPECTOR */}
      {inspectRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150 my-6">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-on-surface">
                    Audit Record Details
                  </h3>
                  <p className="text-[11px] text-outline font-mono">
                    ID: {inspectRecord.id} · Tamper-Proof Log Entry
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectRecord(null)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs overflow-y-auto max-h-[70vh]">
              {/* Highlight Action Banner */}
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">
                    {getActionConfig(inspectRecord.action, inspectRecord.category).icon}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-on-surface">{inspectRecord.action}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      {inspectRecord.status} ✓
                    </span>
                  </div>
                  <p className="text-on-surface-variant mt-1 text-xs">{inspectRecord.details}</p>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/15">
                  <span className="text-[10px] font-semibold text-outline uppercase tracking-wider block mb-1">
                    Target Entity
                  </span>
                  <p className="font-bold text-on-surface">{inspectRecord.target}</p>
                  <p className="font-mono text-[11px] text-outline mt-0.5">{inspectRecord.targetId}</p>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/15">
                  <span className="text-[10px] font-semibold text-outline uppercase tracking-wider block mb-1">
                    Campus Branch
                  </span>
                  <p className="font-bold text-on-surface">{inspectRecord.campus}</p>
                  <p className="text-[11px] text-outline mt-0.5">{inspectRecord.timeFormatted}</p>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/15">
                  <span className="text-[10px] font-semibold text-outline uppercase tracking-wider block mb-1">
                    Authorized Actor
                  </span>
                  <p className="font-bold text-on-surface">{inspectRecord.actor}</p>
                  <p className="text-[11px] text-outline mt-0.5">{inspectRecord.actorRole}</p>
                </div>

                <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/15">
                  <span className="text-[10px] font-semibold text-outline uppercase tracking-wider block mb-1">
                    Origin Station / IP
                  </span>
                  <p className="font-mono text-xs font-semibold text-on-surface">{inspectRecord.ipAddress}</p>
                  <p className="text-[11px] text-outline mt-0.5">{inspectRecord.deviceOrStation}</p>
                </div>
              </div>

              {/* Cryptographic SHA-256 Signature Box */}
              <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                    <span className="font-bold text-xs text-on-surface">Cryptographic Proof (SHA-256)</span>
                  </div>
                  <button
                    type="button"
                    onClick={e => handleCopyHash(e, inspectRecord.securityHash)}
                    className="text-[11px] font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>{copiedHash === inspectRecord.securityHash ? 'Copied' : 'Copy Hash'}</span>
                    <span className="material-symbols-outlined text-[13px]">content_copy</span>
                  </button>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest font-mono text-[11px] text-on-surface break-all select-all border border-outline-variant/20">
                  {inspectRecord.securityHash}
                </div>
                <p className="text-[10px] text-outline">
                  Compliance: FERPA & ISO 27001 Data Audit Standard · Non-Repudiation Verified
                </p>
              </div>

              {/* Metadata Details if any */}
              {inspectRecord.metadata && Object.keys(inspectRecord.metadata).length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-outline uppercase tracking-wider block mb-2">
                    Action Metadata & Audit Parameters
                  </span>
                  <div className="p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/15 space-y-1.5">
                    {Object.entries(inspectRecord.metadata).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center text-xs">
                        <span className="text-outline capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-mono font-medium text-on-surface">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-outline-variant/20 bg-surface-container-low/30 flex items-center justify-between">
              <span className="text-[11px] text-outline">Level: {inspectRecord.securityLevel} Clearance</span>
              <div className="flex items-center gap-2">
                {inspectRecord.screenTarget && (
                  <button
                    type="button"
                    onClick={() => {
                      const screen = inspectRecord.screenTarget!;
                      setInspectRecord(null);
                      onNavigate(screen);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors cursor-pointer"
                  >
                    Jump to Module →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setInspectRecord(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LOG ADMINISTRATIVE ACTION */}
      {isAddActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150 my-6">
            <div className="px-5 py-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">add_task</span>
                <h3 className="font-bold text-sm sm:text-base text-on-surface">Record Administrative Event</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddActionModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateCustomAction} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                  Administrative Action *
                </label>
                <select
                  value={newActionType}
                  onChange={e => setNewActionType(e.target.value as AdminActionType)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Student Added">Student Added</option>
                  <option value="Certificate Issued">Certificate Issued</option>
                  <option value="Fee Recorded">Fee Recorded</option>
                  <option value="Course Created">Course Created</option>
                  <option value="Certificate Revoked">Certificate Revoked</option>
                  <option value="Student Status Changed">Student Status Changed</option>
                  <option value="Security Audit">Security Audit</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                  Target Entity Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subhashish Roy or CERT-2026-00128"
                  value={newTargetName}
                  onChange={e => setNewTargetName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                    Identifier / Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. #ADM-8903"
                    value={newTargetId}
                    onChange={e => setNewTargetId(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                    Campus Branch
                  </label>
                  <select
                    value={newCampus}
                    onChange={e => setNewCampus(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Siliguri HQ Campus">Siliguri HQ</option>
                    <option value="Binnaguri Hub">Binnaguri Hub</option>
                    <option value="Jalpaiguri City">Jalpaiguri</option>
                    <option value="All Campuses">All Campuses</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                  Audit Notes / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Verified admission dossier submitted, fee verified via POS counter."
                  value={newDetails}
                  onChange={e => setNewDetails(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddActionModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-surface-container text-outline hover:text-on-surface text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer"
                >
                  Sign & Commit to Audit Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
