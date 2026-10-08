import React, { useState, useMemo, useEffect } from 'react';
import { ScreenType } from '../types';
import { BRAND_HOTLINKS } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';
import { useSidebar } from '../context/SidebarContext';
import { QuickActionsFloatingButton } from './QuickActionsFloatingButton';
import { CreateCourseModal, DRAFT_CREATE_COURSE_OPEN_KEY } from './CreateCourseModal';
import { ViewReportsModal } from './ViewReportsModal';
import { RecentActivityPanel } from './RecentActivityPanel';
import { useActivityLog } from '../context/ActivityLogContext';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

interface RecentAdmission {
  id: string;
  code: string;
  name: string;
  avatar: string;
  course: string;
  campus: string;
  date: string;
  status: 'Confirmed' | 'Provisional' | 'Docs Pending';
  statusBg: string;
  statusText: string;
  statusDot: string;
}

interface FeePayment {
  id: string;
  code: string;
  studentName: string;
  mode: string;
  modeBadgeBg: string;
  modeBadgeText: string;
  amount: string;
  icon: string;
}

interface StreamEvent {
  id: string;
  dotColor: string;
  title: string;
  detail: string;
  time: string;
}

const INITIAL_ADMISSIONS: RecentAdmission[] = [
  {
    id: 'adm-1',
    code: '#ADM-8902',
    name: 'Rahul Kumar',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    course: 'Web Development',
    campus: 'Siliguri',
    date: 'Today, 10:42 AM',
    status: 'Confirmed',
    statusBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    statusText: 'text-emerald-700 dark:text-emerald-400',
    statusDot: 'bg-emerald-500',
  },
  {
    id: 'adm-2',
    code: '#ADM-8901',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    course: 'Tally Prime & GST',
    campus: 'Binnaguri',
    date: 'Today, 09:15 AM',
    status: 'Provisional',
    statusBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    statusText: 'text-amber-700 dark:text-amber-400',
    statusDot: 'bg-amber-500',
  },
  {
    id: 'adm-3',
    code: '#ADM-8898',
    name: 'Aniket Roy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    course: 'Graphic & UI Design',
    campus: 'Jalpaiguri',
    date: 'Yesterday, 04:30 PM',
    status: 'Docs Pending',
    statusBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
    statusText: 'text-rose-700 dark:text-rose-400',
    statusDot: 'bg-rose-500',
  },
  {
    id: 'adm-4',
    code: '#ADM-8895',
    name: 'Sneha Das',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    course: 'Digital Marketing',
    campus: 'Siliguri',
    date: 'Yesterday, 02:10 PM',
    status: 'Confirmed',
    statusBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    statusText: 'text-emerald-700 dark:text-emerald-400',
    statusDot: 'bg-emerald-500',
  },
];

const INITIAL_FEES: FeePayment[] = [
  {
    id: 'fee-1',
    code: 'RCP-2025-8812',
    studentName: 'Sneha Das',
    mode: 'UPI / QR',
    modeBadgeBg: 'bg-emerald-500/10',
    modeBadgeText: 'text-emerald-700 dark:text-emerald-400',
    amount: '₹12,500',
    icon: 'qr_code_2',
  },
  {
    id: 'fee-2',
    code: 'RCP-2025-8811',
    studentName: 'Priya Sharma',
    mode: 'NetBanking',
    modeBadgeBg: 'bg-blue-500/10',
    modeBadgeText: 'text-blue-700 dark:text-blue-400',
    amount: '₹8,000',
    icon: 'account_balance',
  },
  {
    id: 'fee-3',
    code: 'RCP-2025-8810',
    studentName: 'Rahul Kumar',
    mode: 'Card / POS',
    modeBadgeBg: 'bg-purple-500/10',
    modeBadgeText: 'text-purple-700 dark:text-purple-400',
    amount: '₹15,000',
    icon: 'credit_card',
  },
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate, onShowToast }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { activities, logAdministrativeAction } = useActivityLog();

  // Core interactive states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampusScope, setSelectedCampusScope] = useState('All Branches (8)');
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [analyticsTab, setAnalyticsTab] = useState<'admissions' | 'revenue'>('admissions');
  const [distributionTab, setDistributionTab] = useState<'branch' | 'course'>('branch');

  // Interactive metrics & lists
  const [todayAdmissionsCount, setTodayAdmissionsCount] = useState(38);
  const [todayCollectionTotal, setTodayCollectionTotal] = useState(84500);
  const [recentAdmissions, setRecentAdmissions] = useState<RecentAdmission[]>(INITIAL_ADMISSIONS);
  const [recentFees, setRecentFees] = useState<FeePayment[]>(INITIAL_FEES);

  // Modals
  const [isQuickActionModalOpen, setIsQuickActionModalOpen] = useState(() => {
    try {
      return localStorage.getItem('edumanage_draft_quick_student_open') === 'true';
    } catch {
      return false;
    }
  });
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(() => {
    try {
      return localStorage.getItem(DRAFT_CREATE_COURSE_OPEN_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<RecentAdmission | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [createdCoursesList, setCreatedCoursesList] = useState<Array<{ title: string; code: string }>>([]);

  // Form states for Quick Intake with Auto-Save
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('Web Development');
  const [newStudentBranch, setNewStudentBranch] = useState('Siliguri');
  const [newStudentFee, setNewStudentFee] = useState('12500');
  const [isQuickStudentDraftRestored, setIsQuickStudentDraftRestored] = useState(false);
  const [quickStudentLastSavedTime, setQuickStudentLastSavedTime] = useState<string | null>(null);

  // Restore quick student intake draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('edumanage_draft_quick_student');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name || (parsed.fee && parsed.fee !== '12500')) {
          if (parsed.name !== undefined) setNewStudentName(parsed.name);
          if (parsed.course !== undefined) setNewStudentCourse(parsed.course);
          if (parsed.branch !== undefined) setNewStudentBranch(parsed.branch);
          if (parsed.fee !== undefined) setNewStudentFee(parsed.fee);
          setIsQuickStudentDraftRestored(true);
          if (parsed.lastSaved) setQuickStudentLastSavedTime(parsed.lastSaved);
        }
      }
    } catch (err) {
      console.warn('Failed to restore quick student draft:', err);
    }
  }, []);

  // Track modal open state in localStorage
  useEffect(() => {
    try {
      if (isQuickActionModalOpen) {
        localStorage.setItem('edumanage_draft_quick_student_open', 'true');
      } else {
        localStorage.removeItem('edumanage_draft_quick_student_open');
      }
    } catch {}
  }, [isQuickActionModalOpen]);

  // Immediate save on beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        if (newStudentName.trim() !== '') {
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const draftData = {
            name: newStudentName,
            course: newStudentCourse,
            branch: newStudentBranch,
            fee: newStudentFee,
            lastSaved: timeStr,
          };
          localStorage.setItem('edumanage_draft_quick_student', JSON.stringify(draftData));
        }
      } catch {}
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [newStudentName, newStudentCourse, newStudentBranch, newStudentFee]);

  // Debounced auto-save effect
  useEffect(() => {
    if (!newStudentName.trim() && newStudentFee === '12500') return;

    const timer = setTimeout(() => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const draftData = {
          name: newStudentName,
          course: newStudentCourse,
          branch: newStudentBranch,
          fee: newStudentFee,
          lastSaved: timeStr,
        };
        localStorage.setItem('edumanage_draft_quick_student', JSON.stringify(draftData));
        setQuickStudentLastSavedTime(timeStr);
      } catch {}
    }, 200);

    return () => clearTimeout(timer);
  }, [newStudentName, newStudentCourse, newStudentBranch, newStudentFee]);

  const handleDiscardQuickStudentDraft = () => {
    try {
      localStorage.removeItem('edumanage_draft_quick_student');
      localStorage.removeItem('edumanage_draft_quick_student_open');
    } catch {}
    setNewStudentName('');
    setNewStudentCourse('Web Development');
    setNewStudentBranch('Siliguri');
    setNewStudentFee('12500');
    setIsQuickStudentDraftRestored(false);
    setQuickStudentLastSavedTime(null);
    onShowToast('Intake draft discarded.');
  };

  // Form states for Collect Fee
  const [feeStudentName, setFeeStudentName] = useState('');
  const [feeAmount, setFeeAmount] = useState('10000');
  const [feeMode, setFeeMode] = useState('UPI / QR');

  // Filter admissions based on search & branch
  const filteredAdmissions = useMemo(() => {
    return recentAdmissions.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.campus.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCampus =
        selectedCampusScope === 'All Branches (8)' ||
        item.campus.toLowerCase().includes(selectedCampusScope.toLowerCase().replace(' campus', ''));
      return matchSearch && matchCampus;
    });
  }, [recentAdmissions, searchQuery, selectedCampusScope]);

  const handleCreateNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) {
      onShowToast('Please enter the student full name.');
      return;
    }

    const admCode = `#ADM-${Math.floor(8903 + Math.random() * 90)}`;
    const newAdm: RecentAdmission = {
      id: `adm-${Date.now()}`,
      code: admCode,
      name: newStudentName.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      course: newStudentCourse,
      campus: newStudentBranch,
      date: 'Just now',
      status: 'Confirmed',
      statusBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
      statusText: 'text-emerald-700 dark:text-emerald-400',
      statusDot: 'bg-emerald-500',
    };

    setRecentAdmissions(prev => [newAdm, ...prev]);
    setTodayAdmissionsCount(prev => prev + 1);

    const feeNum = Number(newStudentFee) || 12500;
    setTodayCollectionTotal(prev => prev + feeNum);

    const newFeeItem: FeePayment = {
      id: `fee-${Date.now()}`,
      code: `RCP-2025-${Math.floor(8813 + Math.random() * 80)}`,
      studentName: newStudentName.trim(),
      mode: 'UPI / QR',
      modeBadgeBg: 'bg-emerald-500/10',
      modeBadgeText: 'text-emerald-700 dark:text-emerald-400',
      amount: `₹${feeNum.toLocaleString('en-IN')}`,
      icon: 'qr_code_2',
    };
    setRecentFees(prev => [newFeeItem, ...prev.slice(0, 3)]);

    // Commit to Secure Activity Audit Ledger
    logAdministrativeAction({
      action: 'Student Added',
      target: newStudentName.trim(),
      targetId: admCode,
      category: 'students',
      campus: `${newStudentBranch} Campus`,
      details: `New student intake confirmed for ${newStudentCourse}. Registered with receipt ₹${feeNum.toLocaleString('en-IN')}.`,
      actor: 'Sarah Jenkins',
      actorRole: 'Registrar & Admissions Lead',
      metadata: {
        admissionCode: admCode,
        course: newStudentCourse,
        branch: newStudentBranch,
        feeAmount: `₹${feeNum}`,
      },
      screenTarget: 'students-directory',
    });

    // Clear saved draft from localStorage
    try {
      localStorage.removeItem('edumanage_draft_quick_student');
      localStorage.removeItem('edumanage_draft_quick_student_open');
    } catch {}
    setIsQuickStudentDraftRestored(false);
    setQuickStudentLastSavedTime(null);

    setIsQuickActionModalOpen(false);
    setNewStudentName('');
    setNewStudentFee('12500');
    onShowToast(`Admission confirmed for ${newAdm.name} (${admCode}) and logged to audit trail!`);
  };

  const handleQuickCollectFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeStudentName.trim()) {
      onShowToast('Please enter student name.');
      return;
    }
    const amountNum = Number(feeAmount) || 10000;
    const rcpCode = `RCP-2025-${Math.floor(8820 + Math.random() * 90)}`;
    const newFeeItem: FeePayment = {
      id: `fee-${Date.now()}`,
      code: rcpCode,
      studentName: feeStudentName.trim(),
      mode: feeMode,
      modeBadgeBg: 'bg-emerald-500/10',
      modeBadgeText: 'text-emerald-700 dark:text-emerald-400',
      amount: `₹${amountNum.toLocaleString('en-IN')}`,
      icon: feeMode === 'UPI / QR' ? 'qr_code_2' : feeMode === 'NetBanking' ? 'account_balance' : 'credit_card',
    };

    setRecentFees(prev => [newFeeItem, ...prev.slice(0, 3)]);
    setTodayCollectionTotal(prev => prev + amountNum);

    // Commit to Secure Activity Audit Ledger
    logAdministrativeAction({
      action: 'Fee Recorded',
      target: feeStudentName.trim(),
      targetId: rcpCode,
      category: 'finance',
      campus: selectedCampusScope.includes('All') ? 'Siliguri HQ Campus' : selectedCampusScope,
      details: `Counter payment ₹${amountNum.toLocaleString('en-IN')} verified via ${feeMode}. Voucher signed.`,
      actor: 'Alok Mukherjee',
      actorRole: 'Accounts Officer',
      metadata: {
        receiptNumber: rcpCode,
        amount: `₹${amountNum}`,
        paymentMode: feeMode,
      },
      screenTarget: 'dashboard',
    });

    setIsFeeModalOpen(false);
    setFeeStudentName('');
    onShowToast(`Payment of ₹${amountNum.toLocaleString('en-IN')} recorded for ${feeStudentName}! (${rcpCode})`);
  };

  const handleExportData = () => {
    const csvHeader = 'StudentCode,Name,Course,Campus,Date,Status\n';
    const csvRows = recentAdmissions
      .map(a => `"${a.code}","${a.name}","${a.course}","${a.campus}","${a.date}","${a.status}"`)
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `edumanage_summary_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Exported summary report to CSV.');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans antialiased flex flex-col lg:flex-row relative selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* 1. MINIMAL FOCUSED SIDEBAR (Mobile Drawer + Desktop Fixed) */}
      {/* Mobile backdrop with smooth fade in/out */}
      <div
        className={`fixed inset-0 top-12 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-all duration-300 ease-out ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-12 bottom-0 w-[260px] max-w-[85vw] bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex flex-col justify-between shadow-2xl lg:shadow-[0_1px_6px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-outline-variant/20 flex-shrink-0">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => {
                onNavigate('dashboard');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-on-surface leading-tight tracking-tight">
                  EduManage
                </span>
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                  Apex Institute
                </span>
              </div>
            </div>
          </div>

          {/* Core Essential Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <div className="px-2 pb-1.5 text-[10px] uppercase font-bold tracking-wider text-outline">
              Core Modules
            </div>

            {/* 1. Dashboard (Active) */}
            <button
              onClick={() => {
                onNavigate('dashboard');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-primary text-on-primary font-semibold shadow-xs transition-colors cursor-pointer text-left text-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px]">dashboard</span>
                <span>Dashboard</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </button>

            {/* 2. Students */}
            <button
              onClick={() => {
                onNavigate('students-directory');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer text-left text-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px] text-outline">group</span>
                <span>Students</span>
              </div>
              <span className="text-[11px] font-semibold text-outline px-1.5 py-0.2 rounded bg-surface-container">
                12.4k
              </span>
            </button>

            {/* 3. Admissions */}
            <button
              onClick={() => {
                onNavigate('admissions');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer text-left text-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[19px] text-outline">how_to_reg</span>
                <span>Admissions</span>
              </div>
              <span className="text-[11px] font-bold text-primary px-1.5 py-0.2 rounded bg-primary/10">
                +{todayAdmissionsCount}
              </span>
            </button>

            {/* 4. Courses & Batches */}
            <button
              onClick={() => {
                onNavigate('courses-batches');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer text-left text-sm"
            >
              <span className="material-symbols-outlined text-[19px] text-outline">menu_book</span>
              <span>Courses & Batches</span>
            </button>

            {/* 5. Timetable */}
            <button
              onClick={() => {
                onNavigate('timetable-schedule');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer text-left text-sm"
            >
              <span className="material-symbols-outlined text-[19px] text-outline">calendar_month</span>
              <span>Timetable</span>
            </button>

            {/* 6. Certificates & QR */}
            <button
              onClick={() => {
                onNavigate('certificates');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer text-left text-sm"
            >
              <span className="material-symbols-outlined text-[19px] text-outline">workspace_premium</span>
              <span>Certificates (QR)</span>
            </button>

            {/* 7. Settings / Admin */}
            <button
              onClick={() => {
                onNavigate('admin');
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer text-left text-sm"
            >
              <span className="material-symbols-outlined text-[19px] text-outline">settings</span>
              <span>Institute Admin</span>
            </button>
          </div>

          {/* Minimal Institute Profile & Logout */}
          <div className="p-3 border-t border-outline-variant/20 bg-surface-container-low/40 flex-shrink-0">
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                  AP
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-on-surface truncate">Apex Institute</p>
                  <p className="text-[10px] text-outline truncate">8 Branches Active</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online & Synced"></span>
            </div>

            <button
              onClick={() => {
                onShowToast('Logged out of Admin session.');
                onNavigate('landing');
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-outline hover:text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">logout</span>
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'pl-0 lg:pl-[260px]' : 'pl-0'
        }`}
      >
        {/* RESPONSIVE TOP HEADER (Sticky below global navigation) */}
        <header
          className="sticky top-12 z-30 h-14 sm:h-16 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30 flex items-center justify-between px-3 sm:px-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out"
        >
          {/* Left: Brand / Branch */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Logo & Institute Name (Hidden on extra small mobile since top navbar has EduManage brand) */}
            <button
              type="button"
              onClick={() => onNavigate('landing')}
              className="hidden sm:flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity text-left group"
              title="EduManage Home"
            >
              <img
                alt="EduManage Logo"
                className="h-7 w-7 object-contain rounded-lg shadow-xs group-hover:scale-105 transition-transform"
                src={BRAND_HOTLINKS.logo}
              />
              <div className="flex flex-col">
                <span className="font-bold text-xs sm:text-sm text-on-surface tracking-tight leading-tight truncate">
                  Apex Institute
                </span>
                <span className="text-[10px] text-outline leading-none font-medium hidden md:block">
                  EduManage Academic OS
                </span>
              </div>
            </button>

            {/* Branch Scope Dropdown (Compact) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCampusDropdownOpen(prev => !prev)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 bg-surface-container-low hover:bg-surface-container border border-outline-variant/40 rounded-lg text-xs font-medium text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px] text-primary hidden sm:inline">location_on</span>
                <span className="truncate max-w-[100px] sm:max-w-none">{selectedCampusScope}</span>
                <span className="material-symbols-outlined text-[15px] text-outline">expand_more</span>
              </button>

              {isCampusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl z-50 py-1 text-xs">
                  <div className="px-3 py-1 font-bold text-outline text-[10px] uppercase">
                    Select Branch
                  </div>
                  {['All Branches (8)', 'Siliguri HQ', 'Binnaguri Hub', 'Jalpaiguri City', 'Cooch Behar'].map(
                    b => (
                      <button
                        key={b}
                        onClick={() => {
                          setSelectedCampusScope(b);
                          setIsCampusDropdownOpen(false);
                          onShowToast(`Filtered by ${b}`);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-surface-container flex items-center justify-between cursor-pointer ${
                          selectedCampusScope === b ? 'text-primary font-bold bg-primary/10' : 'text-on-surface'
                        }`}
                      >
                        <span>{b}</span>
                        {selectedCampusScope === b && (
                          <span className="material-symbols-outlined text-sm text-primary">check</span>
                        )}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Search, Theme Toggle, Primary Action, Profile */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Clean Search Input (Hidden on extra small screens or collapsed) */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[17px] text-outline">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search students..."
                className="w-full h-8 pl-8 pr-3 bg-surface-container-low border border-outline-variant/40 rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[15px]">close</span>
                </button>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle
              variant="pill"
              onToggleCallback={mode =>
                onShowToast(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode`)
              }
            />

            {/* Primary Action Button: Add Student */}
            <button
              onClick={() => setIsQuickActionModalOpen(true)}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-xs text-xs font-semibold active:scale-[0.98] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px]">add</span>
              <span className="hidden sm:inline">Add Student</span>
            </button>

            {/* Collect Fee Button */}
            <button
              onClick={() => setIsFeeModalOpen(true)}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/30 transition-all text-xs font-medium cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px] text-emerald-600">point_of_sale</span>
              <span>Collect Fee</span>
            </button>

            {/* Admin Avatar */}
            <div
              className="flex items-center gap-1.5 cursor-pointer pl-1"
              onClick={() => onNavigate('admin')}
              title="Institution Admin Settings"
            >
              <img
                alt="Profile"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-outline-variant/40"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80"
              />
            </div>
          </div>
        </header>

        {/* 3. DASHBOARD MAIN CONTENT */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-[calc(100vh-4rem)]">
          <div className="p-3 sm:p-5 lg:p-6 flex flex-col gap-5 w-full max-w-[1400px] mx-auto">
            {/* Top Minimal Greeting & Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                  Welcome back, Rajesh
                </h1>
                <p className="text-xs sm:text-sm text-outline mt-0.5">
                  Apex Institute • {selectedCampusScope} • All campus registers synchronized
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface shadow-xs hover:bg-surface-container transition-all text-xs font-medium cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-outline">file_download</span>
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setIsFeeModalOpen(true)}
                  className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-semibold cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">point_of_sale</span>
                  <span>Collect Fee</span>
                </button>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-on-primary shadow-xs hover:bg-primary-container transition-all text-xs font-semibold cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                  <span>All Admissions</span>
                </button>
              </div>
            </div>

            {/* 4 CORE ESSENTIAL KPI METRICS (Clean 4-Card Responsive Grid) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Metric 1: Total Students */}
              <div
                onClick={() => onNavigate('students-directory')}
                className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl border border-outline-variant/20 shadow-xs hover:border-primary/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">
                    Total Students
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">groups</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-on-surface">12,450</span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    <span>+8.4% this month</span>
                  </div>
                </div>
              </div>

              {/* Metric 2: Today's Admissions */}
              <div
                onClick={() => onNavigate('admissions')}
                className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl border border-outline-variant/20 shadow-xs hover:border-primary/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">
                    Today's Admissions
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-on-surface">{todayAdmissionsCount}</span>
                  <div className="text-[11px] text-outline mt-1">
                    Target: 45 daily enrolls (84% reached)
                  </div>
                </div>
              </div>

              {/* Metric 3: Today's Collection */}
              <div
                onClick={() => setIsFeeModalOpen(true)}
                className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl border border-outline-variant/20 shadow-xs hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">
                    Today's Collection
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{todayCollectionTotal.toLocaleString('en-IN')}
                  </span>
                  <div className="text-[11px] text-outline mt-1 font-mono">
                    {recentFees.length + 11} Receipts Reconciled
                  </div>
                </div>
              </div>

              {/* Metric 4: Attendance Today */}
              <div className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">
                    Attendance Today
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xl sm:text-2xl font-bold text-on-surface">91.4%</span>
                  <div className="text-[11px] text-outline mt-1">
                    11,329 Present across 8 branches
                  </div>
                </div>
              </div>
            </div>

            {/* 5. MINIMAL ANALYTICS & DISTRIBUTION (2 Clean Balanced Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Card 1: Trajectory Trend (7 Cols) */}
              <div className="lg:col-span-7 bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                  <div>
                    <h2 className="font-bold text-sm sm:text-base text-on-surface">
                      Performance Trajectory
                    </h2>
                    <p className="text-xs text-outline">Monthly progression across Jan - May</p>
                  </div>
                  {/* Clean Tab Switcher */}
                  <div className="flex bg-surface-container p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setAnalyticsTab('admissions')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        analyticsTab === 'admissions'
                          ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                          : 'text-outline hover:text-on-surface'
                      }`}
                    >
                      Admissions
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnalyticsTab('revenue')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        analyticsTab === 'revenue'
                          ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                          : 'text-outline hover:text-on-surface'
                      }`}
                    >
                      Revenue (₹)
                    </button>
                  </div>
                </div>

                {/* Clean SVG Trend Chart */}
                <div className="w-full pt-3 pb-1">
                  <svg
                    aria-label="Trajectory chart"
                    className="w-full h-36 sm:h-40 overflow-visible"
                    viewBox="0 0 500 140"
                  >
                    <defs>
                      <linearGradient id="minimalAreaGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#004ac6" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="#004ac6" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    {/* Subtle horizontal grid lines */}
                    <line stroke="#80808020" strokeDasharray="3 3" x1="0" x2="500" y1="20" y2="20"></line>
                    <line stroke="#80808020" strokeDasharray="3 3" x1="0" x2="500" y1="65" y2="65"></line>
                    <line stroke="#80808020" strokeDasharray="3 3" x1="0" x2="500" y1="110" y2="110"></line>

                    {analyticsTab === 'admissions' ? (
                      <>
                        <path
                          d="M 30 100 C 90 90, 150 75, 230 60 C 310 45, 390 35, 470 15 L 470 120 L 30 120 Z"
                          fill="url(#minimalAreaGrad)"
                        />
                        <path
                          d="M 30 100 C 90 90, 150 75, 230 60 C 310 45, 390 35, 470 15"
                          fill="none"
                          stroke="#004ac6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="470" cy="15" r="4.5" fill="#004ac6" stroke="#ffffff" strokeWidth="2" />
                      </>
                    ) : (
                      <>
                        <path
                          d="M 30 105 C 90 95, 160 80, 240 65 C 320 50, 400 30, 470 20 L 470 120 L 30 120 Z"
                          fill="url(#minimalAreaGrad)"
                        />
                        <path
                          d="M 30 105 C 90 95, 160 80, 240 65 C 320 50, 400 30, 470 20"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="470" cy="20" r="4.5" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
                      </>
                    )}

                    {/* Month labels */}
                    <text fill="#888888" fontSize="10" textAnchor="middle" x="30" y="132">Jan</text>
                    <text fill="#888888" fontSize="10" textAnchor="middle" x="140" y="132">Feb</text>
                    <text fill="#888888" fontSize="10" textAnchor="middle" x="250" y="132">Mar</text>
                    <text fill="#888888" fontSize="10" textAnchor="middle" x="360" y="132">Apr</text>
                    <text fill="#888888" fontSize="10" textAnchor="middle" x="470" y="132">May</text>
                  </svg>
                </div>

                <div className="pt-2 text-xs text-outline flex items-center justify-between border-t border-outline-variant/10 mt-1">
                  <span>
                    {analyticsTab === 'admissions'
                      ? 'Peak intake in May: +32% growth compared to Q1'
                      : 'Fee Collections: ₹42.8 Lakhs realized in May (95% target met)'}
                  </span>
                  <span className="text-primary font-semibold cursor-pointer" onClick={() => onNavigate('admissions')}>
                    Details →
                  </span>
                </div>
              </div>

              {/* Card 2: Distribution Overview (5 Cols) */}
              <div className="lg:col-span-5 bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <h2 className="font-bold text-sm sm:text-base text-on-surface">
                      Distribution
                    </h2>
                    <p className="text-xs text-outline">Enrollment share</p>
                  </div>
                  <div className="flex bg-surface-container p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setDistributionTab('branch')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        distributionTab === 'branch'
                          ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                          : 'text-outline hover:text-on-surface'
                      }`}
                    >
                      Branch
                    </button>
                    <button
                      type="button"
                      onClick={() => setDistributionTab('course')}
                      className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        distributionTab === 'course'
                          ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                          : 'text-outline hover:text-on-surface'
                      }`}
                    >
                      Course
                    </button>
                  </div>
                </div>

                {/* Progress breakdown */}
                {distributionTab === 'branch' ? (
                  <div className="space-y-2.5 py-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-on-surface">Siliguri HQ</span>
                        <span className="font-bold text-on-surface">38% (4,731)</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-on-surface">Binnaguri Hub</span>
                        <span className="font-bold text-on-surface">24% (2,988)</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-on-surface">Jalpaiguri City</span>
                        <span className="font-bold text-on-surface">18% (2,241)</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-outline">Other 5 Branches</span>
                        <span className="font-medium text-outline">20% (2,490)</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-outline-variant rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 py-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-on-surface">Web Full-Stack</span>
                        <span className="font-bold text-primary">34% (4,233)</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '34%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-on-surface">Tally Prime & Tax</span>
                        <span className="font-bold text-emerald-600">28% (3,486)</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-on-surface">Digital Marketing</span>
                        <span className="font-bold text-purple-600">22% (2,739)</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-outline">Design & Others</span>
                        <span className="font-medium text-outline">16% (1,992)</span>
                      </div>
                      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-outline-variant rounded-full" style={{ width: '16%' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 text-xs text-right border-t border-outline-variant/10">
                  <span
                    className="text-primary font-semibold cursor-pointer"
                    onClick={() => onNavigate('courses-batches')}
                  >
                    View All 24 Courses →
                  </span>
                </div>
              </div>
            </div>

            {/* 6. ESSENTIAL DATA: RECENT ADMISSIONS & RECENT COLLECTIONS (100% RESPONSIVE) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left: Recent Admissions (7 cols on lg, fully responsive on mobile) */}
              <div className="lg:col-span-7 bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/20 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3">
                    <div>
                      <h2 className="font-bold text-sm sm:text-base text-on-surface">
                        Recent Admissions
                      </h2>
                      <p className="text-xs text-outline">Verified enrollments stream</p>
                    </div>
                    <button
                      onClick={() => onNavigate('admissions')}
                      className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>View All</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* Desktop Table View (hidden on sm/mobile) */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant/20 text-outline">
                          <th className="py-2.5 font-semibold">Student</th>
                          <th className="py-2.5 font-semibold">Course</th>
                          <th className="py-2.5 font-semibold">Campus</th>
                          <th className="py-2.5 font-semibold">Status</th>
                          <th className="py-2.5 text-right font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/10">
                        {filteredAdmissions.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-6 text-center text-outline">
                              No student matching "{searchQuery}"
                            </td>
                          </tr>
                        ) : (
                          filteredAdmissions.map(adm => (
                            <tr key={adm.id} className="hover:bg-surface-container-low/50 transition-colors">
                              <td className="py-2.5">
                                <div className="flex items-center gap-2">
                                  <img
                                    className="w-7 h-7 rounded-full object-cover"
                                    alt={adm.name}
                                    src={adm.avatar}
                                  />
                                  <div>
                                    <div className="font-semibold text-on-surface">{adm.name}</div>
                                    <div className="font-mono text-[10px] text-outline">{adm.code}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2.5 text-on-surface">{adm.course}</td>
                              <td className="py-2.5 text-outline">{adm.campus}</td>
                              <td className="py-2.5">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${adm.statusBg}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${adm.statusDot}`}></span>
                                  <span>{adm.status}</span>
                                </span>
                              </td>
                              <td className="py-2.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedStudent(adm);
                                    setIsReviewModalOpen(true);
                                  }}
                                  className="px-2 py-1 rounded bg-surface-container hover:bg-primary hover:text-white transition-colors text-[11px] font-medium cursor-pointer"
                                >
                                  Review
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Touch Cards View (visible on < sm so no horizontal scroll cut) */}
                  <div className="sm:hidden space-y-2.5">
                    {filteredAdmissions.length === 0 ? (
                      <p className="text-center py-4 text-xs text-outline">No student matching "{searchQuery}"</p>
                    ) : (
                      filteredAdmissions.map(adm => (
                        <div
                          key={adm.id}
                          className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              className="w-8 h-8 rounded-full object-cover"
                              alt={adm.name}
                              src={adm.avatar}
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-xs text-on-surface truncate">{adm.name}</p>
                              <p className="text-[11px] text-outline truncate">{adm.course}</p>
                              <p className="text-[10px] text-outline font-mono">{adm.campus} • {adm.date}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${adm.statusBg}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${adm.statusDot}`}></span>
                              <span>{adm.status}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedStudent(adm);
                                setIsReviewModalOpen(true);
                              }}
                              className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] font-semibold text-primary cursor-pointer"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-3 text-[11px] text-outline flex items-center justify-between border-t border-outline-variant/10 mt-2">
                  <span>Showing {filteredAdmissions.length} of {todayAdmissionsCount} enrollments today</span>
                  <span className="text-primary font-medium cursor-pointer" onClick={() => onNavigate('admissions')}>
                    Manage all records →
                  </span>
                </div>
              </div>

              {/* Right: Recent Collections & Live Alerts (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Recent Collections */}
                <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/20 shadow-xs">
                  <div className="flex items-center justify-between pb-3">
                    <div>
                      <h2 className="font-bold text-sm sm:text-base text-on-surface">
                        Recent Collections
                      </h2>
                      <p className="text-xs text-outline">Counter & UPI receipts</p>
                    </div>
                    <button
                      onClick={() => setIsFeeModalOpen(true)}
                      className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
                    >
                      + Collect Fee
                    </button>
                  </div>

                  <div className="space-y-2">
                    {recentFees.map(fee => (
                      <div
                        key={fee.id}
                        className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0">
                            <span className="material-symbols-outlined text-[17px]">{fee.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-xs text-on-surface truncate">
                              {fee.studentName}
                            </p>
                            <p className="text-[10px] text-outline font-mono">
                              {fee.code} • {fee.mode}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-bold text-xs sm:text-sm text-on-surface font-mono">
                            {fee.amount}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onShowToast(`Receipt ${fee.code} for ${fee.studentName} downloaded.`)
                            }
                            className="p-1 rounded text-outline hover:text-primary transition-colors cursor-pointer"
                            title="Download Receipt"
                          >
                            <span className="material-symbols-outlined text-[17px]">receipt</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Admin Stream Card connected to Activity Log */}
                <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/20 shadow-xs">
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <h2 className="font-bold text-xs uppercase tracking-wider text-outline">
                        Live Stream
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('recent-activity-panel');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Audit Trail ({activities.length}) ↓
                    </button>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    {activities.slice(0, 3).map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          const el = document.getElementById('recent-activity-panel');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-start gap-2 cursor-pointer hover:bg-surface-container-low/50 p-1 rounded-lg transition-colors"
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            item.action.includes('Student')
                              ? 'bg-emerald-500'
                              : item.action.includes('Certificate')
                              ? 'bg-purple-500'
                              : item.action.includes('Fee')
                              ? 'bg-amber-500'
                              : 'bg-primary'
                          }`}
                        ></span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-semibold text-on-surface truncate">
                              {item.action}: {item.target}
                            </span>
                            <span className="text-[10px] font-mono text-outline flex-shrink-0">
                              {item.timeAgo}
                            </span>
                          </div>
                          <span className="text-[10px] text-outline block truncate">
                            {item.details}
                          </span>
                          <span className="text-[10px] font-mono text-outline/80 block">
                            {item.campus} • {item.securityHash.slice(0, 14)}...
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 7. SECURE RECENT ACTIVITY & AUDIT TRAIL PANEL */}
            <div id="recent-activity-panel" className="mt-4">
              <RecentActivityPanel
                onNavigate={onNavigate}
                onShowToast={onShowToast}
                currentCampusScope={selectedCampusScope}
              />
            </div>
          </div>
        </main>
      </div>

      {/* MODAL 1: QUICK ADMISSION INTAKE */}
      {isQuickActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-3.5 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">person_add</span>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-on-surface">Quick Student Admission</h3>
                  {quickStudentLastSavedTime && (
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono flex items-center gap-1 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Auto-saved
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickActionModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Restored Draft Alert Banner */}
            {isQuickStudentDraftRestored && (
              <div className="px-5 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600 dark:text-emerald-400">history_toggle_off</span>
                  <span>Restored unsaved draft {quickStudentLastSavedTime ? `(${quickStudentLastSavedTime})` : ''}</span>
                </div>
                <button
                  type="button"
                  onClick={handleDiscardQuickStudentDraft}
                  className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
                >
                  Discard Draft
                </button>
              </div>
            )}

            <form onSubmit={handleCreateNewStudent} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subhashish Roy"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                    Course Program
                  </label>
                  <select
                    value={newStudentCourse}
                    onChange={e => setNewStudentCourse(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none cursor-pointer"
                  >
                    <option>Web Development</option>
                    <option>Tally Prime & GST</option>
                    <option>Graphic & UI Design</option>
                    <option>Digital Marketing</option>
                    <option>Spoken English</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                    Branch Campus
                  </label>
                  <select
                    value={newStudentBranch}
                    onChange={e => setNewStudentBranch(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none cursor-pointer"
                  >
                    <option>Siliguri</option>
                    <option>Binnaguri</option>
                    <option>Jalpaiguri</option>
                    <option>Cooch Behar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                  Initial Fee Collection (₹)
                </label>
                <input
                  type="number"
                  value={newStudentFee}
                  onChange={e => setNewStudentFee(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface font-mono text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-outline-variant/10">
                <div>
                  {(newStudentName || quickStudentLastSavedTime) && (
                    <button
                      type="button"
                      onClick={handleDiscardQuickStudentDraft}
                      className="text-xs text-error hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">delete</span>
                      Discard
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuickActionModalOpen(false)}
                    className="px-3.5 py-1.5 rounded-lg text-outline hover:text-on-surface text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-xs hover:bg-primary-container transition-all cursor-pointer"
                  >
                    Confirm Admission
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: QUICK COLLECT FEE */}
      {isFeeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-3.5 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">point_of_sale</span>
                <h3 className="font-bold text-sm sm:text-base text-on-surface">Collect Counter Fee</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFeeModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleQuickCollectFee} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                  Student Name or ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma / #ADM-8901"
                  value={feeStudentName}
                  onChange={e => setFeeStudentName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={feeAmount}
                    onChange={e => setFeeAmount(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface font-mono text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-[10px] text-outline mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={feeMode}
                    onChange={e => setFeeMode(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface text-xs focus:outline-none cursor-pointer"
                  >
                    <option>UPI / QR</option>
                    <option>Cash / Counter</option>
                    <option>Card / POS</option>
                    <option>NetBanking</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/10">
                <button
                  type="button"
                  onClick={() => setIsFeeModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg text-outline hover:text-on-surface text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs shadow-xs hover:bg-emerald-700 transition-all cursor-pointer"
                >
                  Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: REVIEW STUDENT DOSSIER */}
      {isReviewModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/40">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-9 h-9 rounded-full object-cover border border-outline-variant"
                />
                <div>
                  <h3 className="font-bold text-sm text-on-surface">{selectedStudent.name}</h3>
                  <p className="text-[11px] text-outline font-mono">
                    {selectedStudent.code} • {selectedStudent.campus} Campus
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-lg bg-surface-container-low">
                <div>
                  <span className="text-[10px] text-outline uppercase block">Program</span>
                  <span className="font-semibold text-on-surface">{selectedStudent.course}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline uppercase block">Campus</span>
                  <span className="font-semibold text-on-surface">{selectedStudent.campus} HQ</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline uppercase block">Enrolled</span>
                  <span className="font-semibold text-on-surface">{selectedStudent.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline uppercase block">Status</span>
                  <span className="font-bold text-primary">{selectedStudent.status}</span>
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg border border-outline-variant/30 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Identity Documents Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  <span>Fee Clearance Registered</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-outline-variant/10">
                <button
                  type="button"
                  onClick={() => {
                    onShowToast(`Downloaded challan for ${selectedStudent.name}`);
                    setIsReviewModalOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold cursor-pointer"
                >
                  Download Challan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsReviewModalOpen(false);
                    onNavigate('student-profile');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container cursor-pointer"
                >
                  Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CREATE COURSE (Quick Action) */}
      <CreateCourseModal
        isOpen={isCreateCourseModalOpen}
        onClose={() => setIsCreateCourseModalOpen(false)}
        onSuccess={(courseData) => {
          setCreatedCoursesList(prev => [{ title: courseData.title, code: courseData.code }, ...prev]);
          logAdministrativeAction({
            action: 'Course Created',
            target: courseData.title,
            targetId: courseData.code,
            category: 'academics',
            campus: courseData.campus || 'Siliguri HQ Campus',
            details: `Curriculum approved for ${courseData.duration} (${courseData.category}). Capacity: ${courseData.seats} seats, Fee: ₹${courseData.fee}.`,
            actor: 'Prof. Anirban Sen',
            actorRole: 'Dean of Academic Programs',
            metadata: {
              code: courseData.code,
              duration: courseData.duration,
              category: courseData.category,
              seats: courseData.seats,
              fee: `₹${courseData.fee}`,
            },
            screenTarget: 'courses-batches',
          });
          onShowToast(`Course "${courseData.title}" (${courseData.code}) created and logged to audit trail!`);
        }}
        onNavigate={onNavigate}
      />

      {/* MODAL 5: INSTITUTION REPORTS & ANALYTICS (Quick Action) */}
      <ViewReportsModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
        onNavigate={onNavigate}
        onShowToast={onShowToast}
      />

      {/* FLOATING QUICK ACTIONS BUTTON */}
      <QuickActionsFloatingButton
        onAddStudent={() => setIsQuickActionModalOpen(true)}
        onCreateCourse={() => setIsCreateCourseModalOpen(true)}
        onViewReports={() => setIsReportsModalOpen(true)}
        onCollectFee={() => setIsFeeModalOpen(true)}
        onNavigate={onNavigate}
        onShowToast={onShowToast}
      />
    </div>
  );
};
