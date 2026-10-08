import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ScreenType } from '../types';

export type NotificationCategory = 'all' | 'alerts' | 'deadlines' | 'announcements';

export interface AdminNotification {
  id: string;
  type: 'alert' | 'deadline' | 'announcement';
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  isRead: boolean;
  priority: 'critical' | 'high' | 'medium' | 'info';
  icon: string;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeClass: string;
  screen?: ScreenType;
  actionLabel?: string;
  impactOrDue?: string;
  meta?: {
    studentOrCourse?: string;
    department?: string;
    targetAudience?: string;
  };
}

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  // 1. SYSTEM ALERTS
  {
    id: 'notif-1',
    type: 'alert',
    title: 'High Attendance Discrepancy Flagged',
    description: 'Binnaguri Morning Batch (Digital Marketing Pro) recorded sudden 18% absentee spike.',
    timestamp: '2026-10-07T10:15:00Z',
    timeAgo: '12m ago',
    isRead: false,
    priority: 'high',
    icon: 'warning',
    iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badge: 'System Alert',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50',
    screen: 'student-profile',
    actionLabel: 'Audit Attendance',
    impactOrDue: 'Batch DM-BIN-04 • 9 Absentees',
    meta: {
      studentOrCourse: 'Digital Marketing Pro',
      department: 'Academics & Attendance',
    },
  },
  {
    id: 'notif-2',
    type: 'alert',
    title: 'Payment Gateway Auto-Reconciliation Alert',
    description: '3 offline UPI fee collections (₹42,500 total) require physical bank voucher reconciliation.',
    timestamp: '2026-10-07T09:40:00Z',
    timeAgo: '45m ago',
    isRead: false,
    priority: 'critical',
    icon: 'credit_card_off',
    iconBg: 'bg-rose-500/10 dark:bg-rose-500/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
    badge: 'Finance Alert',
    badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-700/50',
    screen: 'dashboard',
    actionLabel: 'Verify Vouchers',
    impactOrDue: '₹42,500 pending verification',
    meta: {
      department: 'Finance & Accounts',
    },
  },
  {
    id: 'notif-3',
    type: 'alert',
    title: 'Storage & Daily Cloud Backup Completed',
    description: 'Automated encrypted snapshot generated successfully for all 2,450 student records.',
    timestamp: '2026-10-07T08:00:00Z',
    timeAgo: '2h ago',
    isRead: true,
    priority: 'info',
    icon: 'cloud_done',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badge: 'System Backup',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-700/50',
    screen: 'admin',
    actionLabel: 'Inspect Logs',
    impactOrDue: 'SHA-256 Validated • 412 MB',
    meta: {
      department: 'IT Infrastructure',
    },
  },

  // 2. TASK DEADLINES
  {
    id: 'notif-4',
    type: 'deadline',
    title: 'Mid-Term Progress Report Submission Due',
    description: 'Faculty gradebook sign-off for Term 1 examinations locks today at 05:00 PM IST.',
    timestamp: '2026-10-07T11:00:00Z',
    timeAgo: 'Due in 3 hrs',
    isRead: false,
    priority: 'high',
    icon: 'timer',
    iconBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badge: 'Task Deadline',
    badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-700/50',
    screen: 'marks-entry',
    actionLabel: 'Review Submissions',
    impactOrDue: 'Deadline: Today, 5:00 PM',
    meta: {
      studentOrCourse: 'All Active Departments',
      department: 'Examination Cell',
    },
  },
  {
    id: 'notif-5',
    type: 'deadline',
    title: 'Cohort B Fee Clearance Grace Period Ends',
    description: '14 enrolled students have outstanding semester instalments before final portal lock.',
    timestamp: '2026-10-07T07:30:00Z',
    timeAgo: 'Due Tomorrow',
    isRead: false,
    priority: 'high',
    icon: 'hourglass_top',
    iconBg: 'bg-orange-500/10 dark:bg-orange-500/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
    badge: 'Fee Deadline',
    badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-300 dark:border-orange-700/50',
    screen: 'students-directory',
    actionLabel: 'Send Reminders',
    impactOrDue: 'Due Oct 09 • ₹84,000 Total',
    meta: {
      department: 'Finance & Accounts',
    },
  },
  {
    id: 'notif-6',
    type: 'deadline',
    title: 'AICTE Compliance Quarterly Audit Filing',
    description: 'Verify faculty-to-student ratios & laboratory equipment logbooks for central submission.',
    timestamp: '2026-10-06T15:00:00Z',
    timeAgo: 'Due in 2 days',
    isRead: true,
    priority: 'medium',
    icon: 'assignment_late',
    iconBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    badge: 'Compliance Deadline',
    badgeClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/50',
    screen: 'admin',
    actionLabel: 'Open Compliance Hub',
    impactOrDue: 'Due Oct 10 • Mandatory',
    meta: {
      department: 'Accreditation Office',
    },
  },

  // 3. ACADEMIC ANNOUNCEMENTS
  {
    id: 'notif-7',
    type: 'announcement',
    title: 'Annual TechFest & Hackathon 2026 Dates Announced',
    description: 'Inter-institute innovation summit scheduled for Nov 14-16 across Siliguri & Binnaguri campuses.',
    timestamp: '2026-10-07T06:00:00Z',
    timeAgo: '4h ago',
    isRead: false,
    priority: 'info',
    icon: 'campaign',
    iconBg: 'bg-teal-500/10 dark:bg-teal-500/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
    badge: 'Announcement',
    badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-300 dark:border-teal-700/50',
    screen: 'academics',
    actionLabel: 'Broadcast Details',
    impactOrDue: 'All Students & Faculty',
    meta: {
      department: 'Student Affairs',
      targetAudience: 'Campus-wide',
    },
  },
  {
    id: 'notif-8',
    type: 'announcement',
    title: 'Guest Lecture: AI & Industry 4.0 by Dr. Rajesh Sharma',
    description: 'Special virtual keynote session for Engineering & Computer Applications batches this Friday.',
    timestamp: '2026-10-06T11:00:00Z',
    timeAgo: '1d ago',
    isRead: true,
    priority: 'info',
    icon: 'school',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badge: 'Academic Notice',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50',
    screen: 'courses-batches',
    actionLabel: 'View Schedule',
    impactOrDue: 'Friday 3:00 PM • Aud. A',
    meta: {
      department: 'Academic Council',
      targetAudience: 'B.Tech & BCA Cohorts',
    },
  },
];

interface NotificationCenterProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast?: (message: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    try {
      const saved = localStorage.getItem('edumanage_admin_notifications');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_NOTIFICATIONS;
  });
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');
  const [filterUnreadOnly, setFilterUnreadOnly] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('edumanage_admin_notifications', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Derived counts
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const alertCount = useMemo(() => {
    return notifications.filter((n) => n.type === 'alert' && !n.isRead).length;
  }, [notifications]);

  const deadlineCount = useMemo(() => {
    return notifications.filter((n) => n.type === 'deadline' && !n.isRead).length;
  }, [notifications]);

  const announcementCount = useMemo(() => {
    return notifications.filter((n) => n.type === 'announcement' && !n.isRead).length;
  }, [notifications]);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      if (activeTab === 'alerts' && item.type !== 'alert') return false;
      if (activeTab === 'deadlines' && item.type !== 'deadline') return false;
      if (activeTab === 'announcements' && item.type !== 'announcement') return false;
      if (filterUnreadOnly && item.isRead) return false;
      return true;
    });
  }, [notifications, activeTab, filterUnreadOnly]);

  const handleMarkAsRead = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    onShowToast?.('All notifications marked as read');
  };

  const handleClearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.isRead));
    onShowToast?.('Cleared read notifications');
  };

  const handleItemClick = (notification: AdminNotification) => {
    // Mark as read
    handleMarkAsRead(notification.id);
    if (notification.screen) {
      setIsOpen(false);
      onNavigate(notification.screen);
      onShowToast?.(`Navigated to ${notification.screen.replace('-', ' ')}`);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Notification Center"
        title="Admin Notifications & Alerts"
        className={`relative p-2 rounded-lg text-outline-variant hover:text-white hover:bg-surface-container-highest/30 transition-all flex items-center justify-center cursor-pointer ${
          isOpen ? 'bg-surface-container-highest/40 text-white ring-1 ring-primary/40' : ''
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">
          {unreadCount > 0 ? 'notifications_active' : 'notifications'}
        </span>

        {/* Unread Ping Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-md ring-2 ring-inverse-surface animate-in zoom-in-75">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Center Dropdown Panel */}
      {isOpen && (
        <>
          {/* Mobile Dimmed Backdrop for clean tap outside on mobile */}
          <div
            className="fixed inset-0 bg-black/45 z-[65] sm:hidden backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed left-2 right-2 top-13 mt-1 sm:fixed sm:left-auto sm:right-4 sm:top-14 sm:mt-0 sm:w-[420px] md:w-[450px] max-w-[calc(100vw-1rem)] rounded-2xl bg-surface-container-lowest text-on-surface border border-outline-variant/30 shadow-2xl z-[70] animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl overflow-hidden flex flex-col"
            style={{ maxHeight: '82vh' }}
          >
          {/* Header */}
          <div className="p-3.5 sm:p-4 border-b border-surface-container bg-surface-container-low/50">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">notifications</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                    Notification Center
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                        {unreadCount} unread
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-outline">
                    Administrative alerts, deadlines & notices
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    title="Mark all as read"
                    className="text-[11px] font-medium text-primary hover:text-primary-container hover:underline px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                  aria-label="Close notifications"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-surface-container/60 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span>All</span>
                <span className={`text-[10px] px-1 rounded-full ${activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-surface-container-highest text-outline'}`}>
                  {notifications.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('alerts')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'alerts'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">warning</span>
                <span>System Alerts</span>
                {alertCount > 0 && (
                  <span className={`text-[10px] px-1 rounded-full font-bold ${activeTab === 'alerts' ? 'bg-white/25 text-white' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'}`}>
                    {alertCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('deadlines')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'deadlines'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">timer</span>
                <span>Deadlines</span>
                {deadlineCount > 0 && (
                  <span className={`text-[10px] px-1 rounded-full font-bold ${activeTab === 'deadlines' ? 'bg-white/25 text-white' : 'bg-purple-500/20 text-purple-600 dark:text-purple-400'}`}>
                    {deadlineCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('announcements')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'announcements'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">campaign</span>
                <span>Notices</span>
                {announcementCount > 0 && (
                  <span className={`text-[10px] px-1 rounded-full font-bold ${activeTab === 'announcements' ? 'bg-white/25 text-white' : 'bg-teal-500/20 text-teal-600 dark:text-teal-400'}`}>
                    {announcementCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Subheader: Filter unread toggle & quick summary */}
          <div className="px-4 py-2 bg-surface-container/40 border-b border-surface-container/60 flex items-center justify-between text-[11px] text-outline">
            <span>
              Showing {filteredNotifications.length} {activeTab === 'all' ? 'total' : activeTab} updates
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer select-none hover:text-on-surface transition-colors">
              <input
                type="checkbox"
                checked={filterUnreadOnly}
                onChange={(e) => setFilterUnreadOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-primary border-outline-variant focus:ring-primary cursor-pointer"
              />
              <span className="font-medium">Unread only</span>
            </label>
          </div>

          {/* Notifications Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-surface-container/50 max-h-[380px] sm:max-h-[420px]">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 px-6 text-center">
                <div className="w-12 h-12 rounded-full bg-surface-container mx-auto flex items-center justify-center text-outline mb-3">
                  <span className="material-symbols-outlined text-[24px]">notifications_paused</span>
                </div>
                <h4 className="text-sm font-semibold text-on-surface mb-1">No notifications found</h4>
                <p className="text-xs text-outline max-w-[240px] mx-auto">
                  {filterUnreadOnly
                    ? 'You have read all updates in this category.'
                    : 'There are no active alerts or announcements at this time.'}
                </p>
                {filterUnreadOnly && (
                  <button
                    type="button"
                    onClick={() => setFilterUnreadOnly(false)}
                    className="mt-3 text-xs font-semibold text-primary hover:underline"
                  >
                    Show all updates
                  </button>
                )}
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-3.5 sm:p-4 transition-all cursor-pointer group flex items-start gap-3 relative ${
                    item.isRead
                      ? 'bg-transparent hover:bg-surface-container/60 opacity-90'
                      : 'bg-primary/5 hover:bg-primary/10 border-l-4 border-primary'
                  }`}
                >
                  {/* Icon */}
                  <div className={`p-2 rounded-xl flex-shrink-0 flex items-center justify-center ${item.iconBg} ${item.iconColor} shadow-sm`}>
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.badgeClass}`}>
                          {item.badge}
                        </span>
                        {item.priority === 'critical' && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1 py-0.5 rounded bg-rose-500 text-white">
                            Urgent
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[11px]">schedule</span>
                        {item.timeAgo}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold leading-snug mb-1 group-hover:text-primary transition-colors ${
                      item.isRead ? 'text-on-surface' : 'text-on-surface font-extrabold'
                    }`}>
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-2 mb-2">
                      {item.description}
                    </p>

                    {/* Metadata & Actions row */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-surface-container/40">
                      {item.impactOrDue && (
                        <div className="flex items-center gap-1 text-[10px] text-outline font-medium truncate">
                          <span className="material-symbols-outlined text-[12px]">info</span>
                          <span className="truncate">{item.impactOrDue}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                        {!item.isRead && (
                          <button
                            type="button"
                            onClick={(e) => handleMarkAsRead(item.id, e)}
                            title="Mark as read"
                            className="p-1 text-outline hover:text-primary rounded hover:bg-surface-container transition-colors"
                          >
                            <span className="material-symbols-outlined text-[14px]">done</span>
                          </button>
                        )}

                        {item.screen && (
                          <span className="text-[11px] font-semibold text-primary flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                            <span>{item.actionLabel || 'View'}</span>
                            <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-surface-container-low border-t border-surface-container flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleClearRead}
              className="text-[11px] text-outline hover:text-on-surface transition-colors cursor-pointer"
            >
              Clear read items
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onNavigate('dashboard');
                onShowToast?.('Opening Administrative Dashboard Alerts');
              }}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Admin Dashboard</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </button>
          </div>
        </div>
      </>
      )}
    </div>
  );
};
