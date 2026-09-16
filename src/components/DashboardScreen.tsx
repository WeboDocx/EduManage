import React, { useState } from 'react';
import { ScreenType } from '../types';
import { BRAND_HOTLINKS } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';

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
  iconBg: string;
  iconColor: string;
}

interface StreamEvent {
  id: string;
  dotColor: string;
  primaryText: React.ReactNode;
  campusOrSource: string;
  time: string;
}

const INITIAL_ADMISSIONS: RecentAdmission[] = [
  {
    id: 'adm-1',
    code: '#ADM-8902',
    name: 'Rahul Kumar',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ4j1BX2Ij7RwECzpc9QwkSKLvY9P7nuntuO_WhymwFgnrB6GukRKpI07wHx4t0AotZF7ZJ_LG_rTRSB-jSM96AGjDtVovbAFovDMOE9UXD6XFEBB1809_YxnC6bBJ7NkKm9ue8TWp82fS_qwgizrhoqr_Z1gRRPw8rDb5RsAwXTXdudzJzhw_Y9J4TCBonHBfBtjZScOVqoz9qx9Hr-yTic0773zGcmA2ZfYObLrdvcbGgIsAc9Sj',
    course: 'Web Development',
    campus: 'Siliguri',
    date: 'Today, 10:42 AM',
    status: 'Confirmed',
    statusBg: 'bg-[#ECFDF5]',
    statusText: 'text-[#065F46]',
    statusDot: 'bg-[#10B981]',
  },
  {
    id: 'adm-2',
    code: '#ADM-8901',
    name: 'Priya Sharma',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSwJcXMJqmxie-Otn6DJ-zKClChKizPGfMdEADhvg4T6T053Ykud3rVtfTyZuQReciDUOe78rb1ZLtJ0TqyJ6s4nGbnYeawmg0L82SusEbpBB-DP7kmPT0f9QrmaawEC3ukTIOOcozUjEVdnX8gBQ_Clc12853w32EpyK-ZK6i6bChss4GabWiLyrqdYkZTLIoeOGOMjb-CySJhxruL2mj1FPLVv1unYrDnKL615tJcvMU9csmCNhm',
    course: 'Tally Prime',
    campus: 'Binnaguri',
    date: 'Today, 09:15 AM',
    status: 'Provisional',
    statusBg: 'bg-[#FFFBEB]',
    statusText: 'text-[#92400E]',
    statusDot: 'bg-[#F59E0B]',
  },
  {
    id: 'adm-3',
    code: '#ADM-8898',
    name: 'Aniket Roy',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANWmWy-8lWSOqsa3Ckp0KgsgCfLlWoE4ZAZt3ArlbOGJA2ALgycgmNEfd1ZYvJbY8sFaTLCCd3vnKHajuPTCRH39sp1TtE7J6cyC7RohuLTtG7pqbmCEdoK8gWqu2LOtrRlHu6oJhmw84tByG5Y0E3MbAdm5NCUYRYQ0iwXoPGFQ1d1HLw7DQA2kT5n1jJcSTneRXfXZzLgWZJPU8mv_JyVY_QDuzix7K3AwS2rywMN0xpu0fJz2Bz',
    course: 'Graphic Design',
    campus: 'Jalpaiguri',
    date: 'Yesterday',
    status: 'Docs Pending',
    statusBg: 'bg-[#FEF2F2]',
    statusText: 'text-[#991B1B]',
    statusDot: 'bg-[#EF4444]',
  },
  {
    id: 'adm-4',
    code: '#ADM-8895',
    name: 'Sneha Das',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-GWdKLRtC84WZEWrDyt7fh6W6PYCstcM4HDXupUIKM7cVRUJVwodfuW5Dt1XysaLDM1TqYHAsBdIxkPoBygZ_OHGFcOszcRjDu_A36jDOCOY6FM676k16XpcP5CJkiW4WdUFkwK4RB9H4M640IscJruAftveTzde3SlXG3aHdAcvggzoKqrpbYuicwuY-8bp-M3fA-bzqxXmQ6uiYDcKa0LLEYQG7V0JyYaXVG8UWwgJocZzBMYWI',
    course: 'Digital Marketing',
    campus: 'Siliguri',
    date: 'Yesterday',
    status: 'Confirmed',
    statusBg: 'bg-[#ECFDF5]',
    statusText: 'text-[#065F46]',
    statusDot: 'bg-[#10B981]',
  },
];

const INITIAL_FEES: FeePayment[] = [
  {
    id: 'fee-1',
    code: 'RCP-2025-8812',
    studentName: 'Sneha Das',
    mode: 'UPI / QR',
    modeBadgeBg: 'bg-surface-container-lowest',
    modeBadgeText: 'text-secondary',
    amount: '₹12,500',
    icon: 'qr_code_2',
    iconBg: 'bg-secondary-container/70',
    iconColor: 'text-secondary',
  },
  {
    id: 'fee-2',
    code: 'RCP-2025-8811',
    studentName: 'Priya Sharma',
    mode: 'NetBanking',
    modeBadgeBg: 'bg-surface-container-lowest',
    modeBadgeText: 'text-primary',
    amount: '₹8,000',
    icon: 'account_balance',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
  },
  {
    id: 'fee-3',
    code: 'RCP-2025-8810',
    studentName: 'Rahul Kumar',
    mode: 'Card / POS',
    modeBadgeBg: 'bg-surface-container-lowest',
    modeBadgeText: 'text-on-surface-variant',
    amount: '₹15,000',
    icon: 'credit_card',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface',
  },
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate, onShowToast }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [distributionTab, setDistributionTab] = useState<'branch' | 'course'>('branch');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampusScope, setSelectedCampusScope] = useState('All Branches (8 Active)');
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<RecentAdmission | null>(null);
  const [isQuickActionModalOpen, setIsQuickActionModalOpen] = useState(false);

  // New Student intake modal form
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('Web Development');
  const [newStudentBranch, setNewStudentBranch] = useState('Siliguri');
  const [newStudentFee, setNewStudentFee] = useState('12500');

  // Interactive state lists
  const [recentAdmissions, setRecentAdmissions] = useState<RecentAdmission[]>(INITIAL_ADMISSIONS);
  const [recentFees, setRecentFees] = useState<FeePayment[]>(INITIAL_FEES);
  const [todayAdmissionsCount, setTodayAdmissionsCount] = useState(38);
  const [todayCollectionTotal, setTodayCollectionTotal] = useState(84500);

  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([
    {
      id: 'st-1',
      dotColor: 'bg-primary',
      primaryText: (
        <>
          <strong className="font-semibold">Rahul Kumar</strong> admitted to{' '}
          <span className="text-primary font-medium">Web Dev Batch 04</span>
        </>
      ),
      campusOrSource: 'Siliguri Campus',
      time: '10:42 AM',
    },
    {
      id: 'st-2',
      dotColor: 'bg-secondary',
      primaryText: (
        <>
          Fee payment of <strong className="text-secondary font-semibold font-data-mono">₹12,500</strong> verified for{' '}
          <strong className="font-semibold">Sneha Das</strong>
        </>
      ),
      campusOrSource: 'HDFC Gateway Auto-Clear',
      time: '09:55 AM',
    },
    {
      id: 'st-3',
      dotColor: 'bg-tertiary',
      primaryText: (
        <>
          New faculty <strong className="font-semibold">Sunita Paul</strong> assigned to{' '}
          <span className="text-on-surface-variant font-medium">Jalpaiguri Branch</span>
        </>
      ),
      campusOrSource: 'HR & Faculty Roster',
      time: '09:10 AM',
    },
    {
      id: 'st-4',
      dotColor: 'bg-surface-tint',
      primaryText: (
        <>
          <span className="font-semibold text-primary">QR Certificate</span> batch generated for{' '}
          <span className="font-data-mono font-medium">Batch 2024-B</span> (118 Issued)
        </>
      ),
      campusOrSource: 'Academic Registry',
      time: '08:30 AM',
    },
  ]);

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
      name: newStudentName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      course: newStudentCourse,
      campus: newStudentBranch,
      date: 'Just now',
      status: 'Confirmed',
      statusBg: 'bg-[#ECFDF5]',
      statusText: 'text-[#065F46]',
      statusDot: 'bg-[#10B981]',
    };

    setRecentAdmissions([newAdm, ...recentAdmissions]);
    setTodayAdmissionsCount(prev => prev + 1);

    const feeAmountNum = Number(newStudentFee) || 12500;
    setTodayCollectionTotal(prev => prev + feeAmountNum);

    const newFee: FeePayment = {
      id: `fee-${Date.now()}`,
      code: `RCP-2025-${Math.floor(8813 + Math.random() * 80)}`,
      studentName: newStudentName,
      mode: 'UPI / QR',
      modeBadgeBg: 'bg-surface-container-lowest',
      modeBadgeText: 'text-secondary',
      amount: `₹${feeAmountNum.toLocaleString('en-IN')}`,
      icon: 'qr_code_2',
      iconBg: 'bg-secondary-container/70',
      iconColor: 'text-secondary',
    };
    setRecentFees([newFee, ...recentFees.slice(0, 3)]);

    const newEvent: StreamEvent = {
      id: `st-${Date.now()}`,
      dotColor: 'bg-primary',
      primaryText: (
        <>
          <strong className="font-semibold">{newStudentName}</strong> admitted to{' '}
          <span className="text-primary font-medium">{newStudentCourse}</span>
        </>
      ),
      campusOrSource: `${newStudentBranch} Campus`,
      time: 'Just now',
    };
    setStreamEvents([newEvent, ...streamEvents]);

    setIsQuickActionModalOpen(false);
    onShowToast(`Admission confirmed for ${newStudentName} (${admCode})!`);
    setNewStudentName('');
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
    link.setAttribute('download', `edumanage_executive_data_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Exported executive analytics data to CSV.');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased flex">
      {/* 1. FIXED LEFT SIDEBAR (260px) */}
      {/* Mobile backdrop overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-[260px] bg-surface-container-lowest border-r border-outline-variant/40 z-50 flex flex-col justify-between shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header Brand */}
          <div className="h-16 px-space-md flex items-center justify-between border-b border-outline-variant/30 flex-shrink-0">
            <div
              className="flex items-center gap-space-xs cursor-pointer"
              onClick={() => {
                onNavigate('dashboard');
                setIsSidebarOpen(false);
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-bold">
                  EduManage
                </span>
                <span className="font-label-sm text-[10px] text-primary tracking-wider uppercase font-semibold">
                  Enterprise HQ
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer flex items-center justify-center"
                aria-label="Hide sidebar"
                title="Hide sidebar"
              >
                <span className="material-symbols-outlined text-[20px]">menu_open</span>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md">
            {/* Dashboard Link (ACTIVE) */}
            <nav className="space-y-0.5">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full flex items-center justify-between px-space-sm py-2 rounded-lg bg-primary-container text-on-primary-container font-semibold shadow-sm transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px] text-white">grid_view</span>
                  <span className="font-label-lg text-label-lg">Dashboard</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              </button>
            </nav>

            {/* Admissions */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Admissions
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="w-full flex items-center justify-between px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-outline">contact_support</span>
                    <span className="font-body-md text-body-md">Enquiries</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container-high text-primary">
                    128
                  </span>
                </button>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="w-full flex items-center justify-between px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-outline">assignment</span>
                    <span className="font-body-md text-body-md">Applications</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container-high text-primary">
                    24
                  </span>
                </button>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">how_to_reg</span>
                  <span className="font-body-md text-body-md">Admissions</span>
                </button>
              </nav>
            </div>

            {/* Students */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Students
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('students-directory')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">group</span>
                  <span className="font-body-md text-body-md">All Students</span>
                </button>
                <button
                  onClick={() => setIsQuickActionModalOpen(true)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">person_add</span>
                  <span className="font-body-md text-body-md">Add Student</span>
                </button>
                <button
                  onClick={() => onShowToast('Student Documents: 100% digital KYC records securely archived.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">folder_shared</span>
                  <span className="font-body-md text-body-md">Documents</span>
                </button>
                <button
                  onClick={() => onShowToast('Student ID Cards: Smart RFID / barcode badges ready for print.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                  <span className="font-body-md text-body-md">ID Cards</span>
                </button>
              </nav>
            </div>

            {/* Academics */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Academics
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('courses-batches')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">menu_book</span>
                  <span className="font-body-md text-body-md">Courses &amp; Batches</span>
                </button>
                <button
                  onClick={() => onShowToast('Subjects & Curriculum modules.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">auto_stories</span>
                  <span className="font-body-md text-body-md">Subjects</span>
                </button>
                <button
                  onClick={() => onNavigate('courses-batches')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">calendar_month</span>
                  <span className="font-body-md text-body-md">Timetable</span>
                </button>
                <button
                  onClick={() => onShowToast('Assignments module loaded.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">task</span>
                  <span className="font-body-md text-body-md">Assignments</span>
                </button>
                <button
                  onClick={() => onShowToast('Exams & Grading system active.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">grade</span>
                  <span className="font-body-md text-body-md">Exams &amp; Results</span>
                </button>
              </nav>
            </div>

            {/* Attendance */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Attendance
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onShowToast('Biometric & RFID status: 91% attendance today (11,329 present).')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">fingerprint</span>
                  <span className="font-body-md text-body-md">Biometric &amp; RFID</span>
                </button>
                <button
                  onClick={() => onShowToast('Manual marking roster opened.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">checklist</span>
                  <span className="font-body-md text-body-md">Manual Marking</span>
                </button>
                <button
                  onClick={() => onShowToast('Leave requests queue: 2 faculty on approved leave.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">event_busy</span>
                  <span className="font-body-md text-body-md">Leave Requests</span>
                </button>
              </nav>
            </div>

            {/* Fees & Finance */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Fees &amp; Finance
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onShowToast('Fee Structure matrix.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">account_balance_wallet</span>
                  <span className="font-body-md text-body-md">Fee Structure</span>
                </button>
                <button
                  onClick={() => {
                    setIsQuickActionModalOpen(true);
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">point_of_sale</span>
                  <span className="font-body-md text-body-md">Collect Fee</span>
                </button>
                <button
                  onClick={() => onShowToast('Payments ledger: ₹42.8L collected this month.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">payments</span>
                  <span className="font-body-md text-body-md">Payments</span>
                </button>
                <button
                  onClick={() => onShowToast('Outstanding Fees: ₹4,82,000 flagged across 142 students.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">pending_actions</span>
                  <span className="font-body-md text-body-md">Due Fees</span>
                </button>
                <button
                  onClick={() => onShowToast('Invoices & Receipts repository.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">receipt_long</span>
                  <span className="font-body-md text-body-md">Invoices &amp; Receipts</span>
                </button>
                <button
                  onClick={() => onShowToast('Operational expenses log.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">request_quote</span>
                  <span className="font-body-md text-body-md">Expenses</span>
                </button>
              </nav>
            </div>

            {/* Teachers & Staff */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Teachers &amp; Staff
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onShowToast('Faculty Directory: 86 active faculty members.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">co_present</span>
                  <span className="font-body-md text-body-md">Faculty Directory</span>
                </button>
                <button
                  onClick={() => onShowToast('Staff members directory.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                  <span className="font-body-md text-body-md">Staff</span>
                </button>
                <button
                  onClick={() => onShowToast('Payroll management.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">price_check</span>
                  <span className="font-body-md text-body-md">Payroll</span>
                </button>
                <button
                  onClick={() => onShowToast('Duty rosters schedule.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">schedule</span>
                  <span className="font-body-md text-body-md">Duty Rosters</span>
                </button>
              </nav>
            </div>

            {/* Operations & Network */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Operations &amp; Network
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('certificates')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">workspace_premium</span>
                  <span className="font-body-md text-body-md">Certificates &amp; QR</span>
                </button>
                <button
                  onClick={() => onShowToast('Communication alerts and SMS broadcaster.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">campaign</span>
                  <span className="font-body-md text-body-md">Communication</span>
                </button>
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="w-full flex items-center justify-between px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-outline">hub</span>
                    <span className="font-body-md text-body-md">Campuses Topology</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-container">
                    8 Active
                  </span>
                </button>
                <button
                  onClick={() => onShowToast('Reports and ledger export.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">analytics</span>
                  <span className="font-body-md text-body-md">Reports &amp; Ledger</span>
                </button>
                <button
                  onClick={() => onNavigate('admin')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">settings</span>
                  <span className="font-body-md text-body-md">Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Institute Switcher */}
          <div className="p-space-sm border-t border-outline-variant/30 bg-surface-container-low/50 flex-shrink-0">
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary font-semibold text-xs flex-shrink-0">
                  AP
                </div>
                <div className="min-w-0">
                  <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                    Apex Tech Institute
                  </p>
                  <p className="font-body-sm text-[11px] text-outline truncate">Branch HQ Network</p>
                </div>
              </div>
              <button
                aria-label="Switch institute"
                className="text-outline hover:text-primary p-1 rounded transition-colors cursor-pointer"
                type="button"
                onClick={() => onShowToast('Multi-institution switch panel.')}
              >
                <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              </button>
            </div>
            <button
              onClick={() => {
                onShowToast('Logged out of Institution Admin session.');
                onNavigate('landing');
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="font-label-md text-label-md font-medium">Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pl-0 lg:pl-[260px]' : 'pl-0'
      }`}>
        {/* FIXED TOP HEADER */}
        <header className={`fixed top-0 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/40 z-30 flex items-center justify-between px-3 sm:px-space-lg shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'left-0 lg:left-[260px]' : 'left-0'
        }`}>
          <div className="flex items-center gap-2 sm:gap-space-md min-w-0">
            {/* Show/Hide Sidebar Toggle Button (Visible on all screens) */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-2 -ml-1 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center border border-outline-variant/30 shadow-xs"
              aria-label="Toggle Navigation Menu"
              title={isSidebarOpen ? "Hide Sidebar (Maximize workspace)" : "Show Sidebar"}
            >
              <span className="material-symbols-outlined text-[22px]">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>

            {/* Logo & Institute Name */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <img
                alt="Brand logo"
                className="h-8 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                src={BRAND_HOTLINKS.logo}
                onClick={() => onNavigate('landing')}
              />
              <div className="hidden xl:flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm font-semibold text-on-surface tracking-tight truncate max-w-[220px]">
                    Apex Institute of Technology &amp; Skills
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-data-mono font-medium bg-surface-container text-on-surface-variant">
                    #INS-7429
                  </span>
                </div>
              </div>
            </div>

            {/* Campus Selector Dropdown */}
            <div className="relative flex items-center">
              <button
                onClick={() => setIsCampusDropdownOpen(!isCampusDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 rounded-lg text-left transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[10px] text-outline leading-none uppercase">
                    Campus View
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                    {selectedCampusScope}{' '}
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </span>
                </div>
              </button>

              {isCampusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-xl z-50 py-1 text-xs">
                  <div className="px-3 py-1.5 font-bold text-outline text-[10px] uppercase">
                    Select Branch Scope
                  </div>
                  {[
                    'All Branches (8 Active)',
                    'Siliguri HQ (Main)',
                    'Binnaguri Hub',
                    'Jalpaiguri City',
                    'Cooch Behar',
                  ].map(b => (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedCampusScope(b);
                        setIsCampusDropdownOpen(false);
                        onShowToast(`Campus view changed to: ${b}`);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between cursor-pointer ${
                        selectedCampusScope === b ? 'text-primary font-bold bg-primary-fixed/20' : 'text-on-surface'
                      }`}
                    >
                      <span>{b}</span>
                      {selectedCampusScope === b && (
                        <span className="material-symbols-outlined text-sm text-primary">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search */}
            <div className="relative w-72 lg:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                search
              </span>
              <input
                className="w-full h-9 pl-9 pr-8 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="Search students, admissions, courses, fees (⌘K)..."
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-outline-variant/60 text-[10px] font-data-mono text-outline">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Header Buttons & Profile */}
          <div className="flex items-center gap-space-sm flex-shrink-0">
            <ThemeToggle
              variant="pill"
              onToggleCallback={(mode) => onShowToast(`Switched to ${mode === 'dark' ? 'Dark' : 'Light'} Mode`)}
            />
            <button
              onClick={() => setIsQuickActionModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm font-label-md text-label-md font-semibold active:scale-[0.98] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="hidden sm:inline">Quick Action</span>
            </button>

            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/40 border border-secondary/20 text-on-secondary-container">
              <span className="material-symbols-outlined text-[15px] text-secondary">event_repeat</span>
              <span className="font-label-sm text-label-sm font-semibold">AY 2025-26</span>
            </div>

            <button
              aria-label="Notifications"
              onClick={() => onShowToast('You have 3 operational alerts: 1 waitlist expansion, 2 fee receipts pending verification.')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error text-on-error font-data-mono text-[10px] font-bold flex items-center justify-center leading-none ring-2 ring-surface-container-lowest">
                3
              </span>
            </button>

            <button
              aria-label="Help and documentation"
              onClick={() => onShowToast('EduManage Executive Knowledge Base & Help Manual')}
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors hidden sm:flex cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>

            <div className="h-6 w-[1px] bg-outline-variant/40 mx-1"></div>

            <div className="flex items-center gap-2 pl-1 cursor-pointer" onClick={() => onNavigate('admin')}>
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-outline-variant/50 flex-shrink-0"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WGopkRi0e7RACbAeh9HarEQpgzwV4gII2BBnN0fImO0_ivQuf3D8fWWXjnDa8i7tNyimgkcDUKUpCQ0SbimmA8304zNb8-OtViMqR7RWTsqbRK69ytaSQUrdsT77u80IH5L7DiWTGCwRGcXNmevxS6bfF83aQaWrI7pGS91Kgb52wdoxaqDG5GJfP-jdFHhXzJ-uH663fwJU19MjIi3ZIknbHOIbpbDy0SCYfb9-a95DfMmTqAAIK0TQ"
              />
              <div className="hidden xl:flex flex-col text-left">
                <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight">
                  Rajesh Sharma
                </span>
                <span className="font-body-sm text-[11px] text-outline leading-tight">
                  Institution Admin / HQ
                </span>
              </div>
              <button aria-label="User menu" className="text-outline hover:text-on-surface cursor-pointer" type="button">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>
          </div>
        </header>

        {/* 3. MAIN DASHBOARD CONTENT */}
        <main className="w-full pt-16 bg-background min-h-screen">
          <div className="p-space-lg lg:p-margin-desktop flex flex-col gap-space-lg w-full max-w-[1600px] mx-auto">
            {/* Top Sub-Header & Breadcrumb Bar */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate('dashboard')}>
                    Dashboard
                  </span>
                  <span className="text-outline">/</span>
                  <span className="font-semibold text-on-surface">Overview</span>
                </div>
                <div className="h-4 w-px bg-surface-container-highest"></div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">
                    Multi-Branch Sync Active
                  </span>
                  <span className="font-data-mono text-[11px] text-outline font-medium">8 / 8 Nodes Online</span>
                </div>
              </div>

              {/* Secondary Action Tools */}
              <div className="flex items-center gap-space-xs">
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all font-label-md text-label-md font-medium cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-outline">file_download</span>
                  <span>Export Data</span>
                </button>
                <button
                  onClick={() => onShowToast('Generated institutional certificates registry.')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all font-label-md text-label-md font-medium cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary">workspace_premium</span>
                  <span>Generate Certificate</span>
                </button>
              </div>
            </div>

            {/* Architectural Welcome & Primary CTA Banner */}
            <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
              <div className="absolute right-64 -bottom-16 w-64 h-64 rounded-full bg-secondary-fixed/20 blur-2xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-space-lg">
                <div className="flex flex-col gap-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Central Executive Console
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface-variant font-data-mono">
                      AY 2025-26
                    </span>
                  </div>
                  <h1 className="font-display text-display text-on-surface font-bold tracking-tight">
                    Good morning, Rajesh
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Here is an overview of <span className="font-semibold text-on-surface">Apex Institute of Technology &amp; Skills</span> across all 8 branches. All campus ledger records and RFID terminal streams are reconciled.
                  </p>
                </div>

                {/* Quick Primary Action Group */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsQuickActionModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container shadow-sm transition-all font-label-lg text-label-lg font-semibold active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">person_add</span>
                    <span>Add Student</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsQuickActionModalOpen(true);
                      setNewStudentName('Direct Counter Receipt');
                      onShowToast('Opened fast fee collection terminal.');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim shadow-sm transition-all font-label-lg text-label-lg font-semibold active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">point_of_sale</span>
                    <span>Collect Fee</span>
                  </button>

                  <button
                    onClick={() => onNavigate('admissions')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container shadow-sm transition-all font-label-lg text-label-lg font-semibold active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    <span>New Admission</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 8 High-Density Key Metric KPI Cards (4x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {/* KPI 1: Total Students */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Total Students
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                      12,450
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">groups</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[15px]">trending_up</span>
                    <span>+8.4%</span>
                    <span className="text-outline font-normal">MoM growth</span>
                  </div>
                  <span className="font-data-mono text-[11px] text-outline font-medium">8 Campuses</span>
                </div>
              </div>

              {/* KPI 2: Active Courses */}
              <div
                onClick={() => onNavigate('courses-batches')}
                className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Active Courses
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                      24
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                    Across <strong className="text-on-surface">68 Batches</strong>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-surface-container-low text-primary">
                    12 Voc / 12 Pro
                  </span>
                </div>
              </div>

              {/* KPI 3: Teachers & Staff */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Teachers &amp; Staff
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                      86
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">co_present</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                      98% Active Today
                    </span>
                  </div>
                  <span className="font-data-mono text-[11px] text-outline">2 on Approved Leave</span>
                </div>
              </div>

              {/* KPI 4: Campuses */}
              <div
                onClick={() => onNavigate('onboarding')}
                className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Campuses
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                      8 / 8
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">hub</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">chevron_forward</span>
                    All Realtime Synced
                  </span>
                  <span className="font-data-mono text-[11px] text-outline">0 Errors</span>
                </div>
              </div>

              {/* KPI 5: Today's Admissions */}
              <div
                onClick={() => onNavigate('admissions')}
                className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Today's Admissions
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                      {todayAdmissionsCount}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between font-label-sm text-label-sm">
                    <span className="text-outline font-medium">Target: 45 Enrolls</span>
                    <span className="font-semibold text-primary">84% Met</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>

              {/* KPI 6: Today's Collection */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Today's Collection
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1 group-hover:text-secondary transition-colors">
                      ₹{todayCollectionTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-secondary-container/60 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    <strong className="font-semibold text-on-surface">{recentFees.length + 11}</strong> Transactions
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-surface-container-low text-secondary font-data-mono">
                    UPI: 78%
                  </span>
                </div>
              </div>

              {/* KPI 7: Outstanding Fees */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Outstanding Fees
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-error mt-1">₹4,82,000</span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-error-container/40 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-1 font-label-sm text-label-sm text-error font-semibold">
                    <span className="material-symbols-outlined text-[15px]">warning</span>
                    <span>142 Flagged</span>
                  </div>
                  <button
                    onClick={() => onShowToast('Automated fee reminders dispatched to 142 students via WhatsApp & SMS!')}
                    className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                    type="button"
                  >
                    Send Reminders
                  </button>
                </div>
              </div>

              {/* KPI 8: Attendance Today */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                      Attendance Today
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1 group-hover:text-primary transition-colors">
                      91%
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-secondary">verified</span>
                    Biometric &amp; RFID
                  </span>
                  <span className="font-data-mono text-[11px] text-outline font-medium">11,329 Present</span>
                </div>
              </div>
            </div>

            {/* Section: Analytics & Visual Intelligence (3 Asymmetric Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              {/* Card 1: Admissions Overview (6 Columns) */}
              <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
                <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                        Admissions Overview
                      </h2>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-fixed text-on-primary-fixed font-data-mono">
                        +32% vs Last Term
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline mt-0.5">
                      Monthly trajectory across Jan - May with top branch cohorts
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface-variant font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Siliguri
                    </div>
                    <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface-variant font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Binnaguri
                    </div>
                    <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-on-surface-variant font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Jalpaiguri
                    </div>
                  </div>
                </div>

                {/* Custom Inline Architectural SVG Chart for Admissions */}
                <div className="w-full pt-4 pb-2">
                  <svg aria-label="Admissions trajectory chart" className="w-full h-44 overflow-visible" viewBox="0 0 540 180">
                    <defs>
                      <linearGradient id="dashPrimaryArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#004ac6" stopOpacity="0.22"></stop>
                        <stop offset="100%" stopColor="#004ac6" stopOpacity="0.0"></stop>
                      </linearGradient>
                    </defs>
                    {/* Horizontal Grid lines */}
                    <line stroke="#eaedff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="540" y1="30" y2="30"></line>
                    <line stroke="#eaedff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="540" y1="80" y2="80"></line>
                    <line stroke="#eaedff" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="540" y1="130" y2="130"></line>
                    {/* Siliguri Primary Trend Area & Curve */}
                    <path
                      d="M 30 140 C 90 125, 140 100, 200 85 C 260 70, 320 75, 380 45 C 440 20, 480 30, 520 18 L 520 160 L 30 160 Z"
                      fill="url(#dashPrimaryArea)"
                    ></path>
                    <path
                      d="M 30 140 C 90 125, 140 100, 200 85 C 260 70, 320 75, 380 45 C 440 20, 480 30, 520 18"
                      fill="none"
                      stroke="#004ac6"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                    {/* Binnaguri Trend */}
                    <path
                      d="M 30 150 C 90 140, 150 120, 210 115 C 280 110, 340 90, 400 80 C 460 70, 490 62, 520 54"
                      fill="none"
                      stroke="#006a61"
                      strokeDasharray="2 1"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    ></path>
                    {/* Jalpaiguri Trend */}
                    <path
                      d="M 30 155 C 100 150, 160 140, 220 135 C 300 130, 360 120, 420 105 C 470 95, 500 88, 520 82"
                      fill="none"
                      stroke="#4338d9"
                      strokeLinecap="round"
                      strokeWidth="2"
                    ></path>
                    {/* Interactive Marker Node at Peak */}
                    <circle cx="520" cy="18" fill="#004ac6" r="5" stroke="#ffffff" strokeWidth="2"></circle>
                    <circle cx="520" cy="54" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="1.5"></circle>
                    <circle cx="520" cy="82" fill="#4338d9" r="4" stroke="#ffffff" strokeWidth="1.5"></circle>
                    {/* Axis Labels */}
                    <text fill="#737686" fontFamily="Inter" fontSize="11" textAnchor="middle" x="30" y="175">
                      Jan
                    </text>
                    <text fill="#737686" fontFamily="Inter" fontSize="11" textAnchor="middle" x="150" y="175">
                      Feb
                    </text>
                    <text fill="#737686" fontFamily="Inter" fontSize="11" textAnchor="middle" x="270" y="175">
                      Mar
                    </text>
                    <text fill="#737686" fontFamily="Inter" fontSize="11" textAnchor="middle" x="390" y="175">
                      Apr
                    </text>
                    <text fill="#737686" fontFamily="Inter" fontSize="11" textAnchor="middle" x="510" y="175">
                      May
                    </text>
                  </svg>
                </div>

                <div className="mt-3 pt-3 flex items-center justify-between bg-surface-container-low p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">insights</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">
                      May Peak Enrollment: <strong className="font-semibold">Siliguri leads with 482 admissions</strong> this cycle.
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('admissions')}
                    className="font-label-sm text-label-sm font-semibold text-primary hover:underline cursor-pointer"
                    type="button"
                  >
                    Cohort Details
                  </button>
                </div>
              </div>

              {/* Card 2: Fee Collection & Cashflow vs Target (3 Columns) */}
              <div className="lg:col-span-3 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Cashflow Matrix
                    </span>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                      Collection vs Target
                    </h2>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary-container text-on-secondary-container font-data-mono">
                    INR (₹)
                  </span>
                </div>

                <div className="my-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface">₹42.8 L</span>
                    <span className="font-label-sm text-label-sm text-outline">Target ₹45.0 L</span>
                  </div>
                  <div className="mt-2 w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex">
                    <div className="h-full bg-secondary rounded-l-full" style={{ width: '82%' }}></div>
                    <div className="h-full bg-primary" style={{ width: '13%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 font-label-sm text-label-sm">
                    <span className="text-secondary font-semibold">95.1% Realized</span>
                    <span className="text-error font-medium">₹2.2L Gap</span>
                  </div>
                </div>

                {/* Mini Bar Graph Representation (Monthly ₹ Collection) */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between font-label-sm text-[11px]">
                    <span className="text-outline w-8">Mar</span>
                    <div className="flex-1 mx-2 h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="font-data-mono font-medium text-on-surface">₹36.2L</span>
                  </div>
                  <div className="flex items-center justify-between font-label-sm text-[11px]">
                    <span className="text-outline w-8">Apr</span>
                    <div className="flex-1 mx-2 h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <span className="font-data-mono font-medium text-on-surface">₹39.8L</span>
                  </div>
                  <div className="flex items-center justify-between font-label-sm text-[11px]">
                    <span className="text-outline w-8">May</span>
                    <div className="flex-1 mx-2 h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="font-data-mono font-bold text-secondary">₹42.8L</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-outline">Reconciliation: Daily Auto-Settled</span>
                  <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                </div>
              </div>

              {/* Card 3: Student Distribution (3 Columns with Dynamic Toggle) */}
              <div className="lg:col-span-3 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between" id="distribution-card">
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Demographics
                    </span>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                      Student Share
                    </h2>
                  </div>
                  {/* Pill Toggle Switch */}
                  <div className="flex p-0.5 bg-surface-container rounded-lg">
                    <button
                      onClick={() => setDistributionTab('branch')}
                      className={`px-2 py-1 rounded-md text-[11px] font-label-sm font-semibold transition-all cursor-pointer ${
                        distributionTab === 'branch'
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'text-outline hover:text-on-surface'
                      }`}
                      type="button"
                    >
                      Branch
                    </button>
                    <button
                      onClick={() => setDistributionTab('course')}
                      className={`px-2 py-1 rounded-md text-[11px] font-label-sm font-semibold transition-all cursor-pointer ${
                        distributionTab === 'course'
                          ? 'bg-surface-container-lowest text-primary shadow-sm'
                          : 'text-outline hover:text-on-surface'
                      }`}
                      type="button"
                    >
                      Course
                    </button>
                  </div>
                </div>

                {/* Branch View Panel (Default) */}
                {distributionTab === 'branch' ? (
                  <div className="flex flex-col gap-3 py-2">
                    <div className="flex items-center justify-center py-1">
                      {/* Inline SVG Donut Chart for Branch Breakdown */}
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        {/* Background Ring */}
                        <circle cx="18" cy="18" fill="none" r="15.915" stroke="#eaedff" strokeWidth="3.8"></circle>
                        {/* Siliguri (38%) */}
                        <circle
                          cx="18"
                          cy="18"
                          fill="none"
                          r="15.915"
                          stroke="#004ac6"
                          strokeDasharray="38 62"
                          strokeDashoffset="25"
                          strokeWidth="3.8"
                        ></circle>
                        {/* Binnaguri (24%) */}
                        <circle
                          cx="18"
                          cy="18"
                          fill="none"
                          r="15.915"
                          stroke="#006a61"
                          strokeDasharray="24 76"
                          strokeDashoffset="87"
                          strokeWidth="3.8"
                        ></circle>
                        {/* Jalpaiguri (18%) */}
                        <circle
                          cx="18"
                          cy="18"
                          fill="none"
                          r="15.915"
                          stroke="#4338d9"
                          strokeDasharray="18 82"
                          strokeDashoffset="63"
                          strokeWidth="3.8"
                        ></circle>
                        {/* Others (20%) */}
                        <circle
                          cx="18"
                          cy="18"
                          fill="none"
                          r="15.915"
                          stroke="#c3c6d7"
                          strokeDasharray="20 80"
                          strokeDashoffset="45"
                          strokeWidth="3.8"
                        ></circle>
                      </svg>
                    </div>
                    <div className="space-y-1.5 font-label-sm text-[12px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-primary"></span>
                          <span>Siliguri Campus</span>
                        </div>
                        <span className="font-data-mono font-bold text-on-surface">38% (4,731)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-secondary"></span>
                          <span>Binnaguri Campus</span>
                        </div>
                        <span className="font-data-mono font-bold text-on-surface">24% (2,988)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                          <span>Jalpaiguri Campus</span>
                        </div>
                        <span className="font-data-mono font-bold text-on-surface">18% (2,241)</span>
                      </div>
                      <div className="flex items-center justify-between text-outline">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                          <span>Other 5 Branches</span>
                        </div>
                        <span className="font-data-mono font-medium">20% (2,490)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Course View Panel */
                  <div className="flex flex-col gap-3 py-2">
                    <div className="space-y-2.5 pt-1 font-label-sm text-[12px]">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-on-surface">Web Full-Stack Dev</span>
                          <span className="font-data-mono font-bold text-primary">34% (4,233)</span>
                        </div>
                        <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '34%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-on-surface">Tally Prime &amp; Taxation</span>
                          <span className="font-data-mono font-bold text-secondary">28% (3,486)</span>
                        </div>
                        <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-on-surface">Digital Marketing &amp; SEO</span>
                          <span className="font-data-mono font-bold text-tertiary">22% (2,739)</span>
                        </div>
                        <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-tertiary rounded-full" style={{ width: '22%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-on-surface">Graphic &amp; Motion Design</span>
                          <span className="font-data-mono font-bold text-outline">16% (1,992)</span>
                        </div>
                        <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-outline-variant rounded-full" style={{ width: '16%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="font-label-sm text-[11px] text-outline">68 Batches Active Across Domains</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 text-right">
                  <button
                    onClick={() => {
                      onNavigate('courses-batches');
                      onShowToast('Opened multi-campus discipline distribution matrix.');
                    }}
                    className="font-label-sm text-label-sm font-semibold text-primary hover:underline cursor-pointer"
                    type="button"
                  >
                    View Matrix Map
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Data Grid: 2 Column Asymmetric Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              {/* Left Column: Recent Admissions High-Density Table (7 Columns) */}
              <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                          Recent Admissions
                        </h2>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-primary font-data-mono">
                          Live Stream
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5">
                        Latest enrollments across branches with verification stages
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('admissions')}
                      className="flex items-center gap-1 font-label-md text-label-md font-semibold text-primary hover:underline cursor-pointer"
                    >
                      <span>View All</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* Table Container */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm">
                          <th className="py-2.5 px-3 rounded-l-lg font-semibold">Student</th>
                          <th className="py-2.5 px-3 font-semibold">Course</th>
                          <th className="py-2.5 px-3 font-semibold">Campus</th>
                          <th className="py-2.5 px-3 font-semibold">Date</th>
                          <th className="py-2.5 px-3 font-semibold">Status</th>
                          <th className="py-2.5 px-3 rounded-r-lg text-right font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-0">
                        {recentAdmissions.map(adm => (
                          <tr key={adm.id} className="hover:bg-surface-container-low/60 transition-colors group">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2.5">
                                <img
                                  className="w-8 h-8 rounded-full object-cover"
                                  alt={adm.name}
                                  src={adm.avatar}
                                />
                                <div className="flex flex-col min-w-0">
                                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                                    {adm.name}
                                  </span>
                                  <span className="font-data-mono text-[10px] text-outline">{adm.code}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface font-medium">
                              {adm.course}
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface-variant">
                              {adm.campus}
                            </td>
                            <td className="py-3 px-3 font-data-mono text-[11px] text-outline">
                              {adm.date}
                            </td>
                            <td className="py-3 px-3">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${adm.statusBg} ${adm.statusText}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${adm.statusDot}`}></span> {adm.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  aria-label={`Open Profile for ${adm.name}`}
                                  title="View Full Student Profile"
                                  onClick={() => onNavigate('student-profile')}
                                  className="p-1 rounded hover:bg-primary-fixed/20 text-primary transition-colors cursor-pointer"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[18px]">badge</span>
                                </button>
                                <button
                                  aria-label={`Review ${adm.name}`}
                                  title="Quick Review Modal"
                                  onClick={() => {
                                    setSelectedStudent(adm);
                                    setIsReviewModalOpen(true);
                                  }}
                                  className="p-1 rounded hover:bg-surface-container text-outline hover:text-primary transition-colors cursor-pointer"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="pt-3 mt-2 flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-outline">
                    Showing {recentAdmissions.length} of {todayAdmissionsCount} today's enrollments
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      aria-label="Previous Page"
                      className="p-1 rounded hover:bg-surface-container text-outline disabled:opacity-40"
                      disabled
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button
                      aria-label="Next Page"
                      onClick={() => onShowToast('Showing page 2 of verified enrollments.')}
                      className="p-1 rounded hover:bg-surface-container text-on-surface cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Recent Collections & Live Institution Feed (5 Columns) */}
              <div className="lg:col-span-5 flex flex-col gap-space-lg">
                {/* Right Top: Recent Fee Payments List */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-sm">
                    <div>
                      <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Recent Fee Payments
                      </h2>
                      <p className="font-body-sm text-body-sm text-outline">
                        Reconciled gateway &amp; branch counter receipts
                      </p>
                    </div>
                    <button
                      onClick={() => onShowToast('Full finance payments ledger opened.')}
                      className="font-label-md text-label-md font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Ledger
                    </button>
                  </div>

                  <div className="space-y-2 pt-2">
                    {recentFees.map(fee => (
                      <div
                        key={fee.id}
                        className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-lg ${fee.iconBg} flex items-center justify-center ${fee.iconColor} flex-shrink-0`}>
                            <span className="material-symbols-outlined text-[18px]">{fee.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                                {fee.studentName}
                              </span>
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${fee.modeBadgeBg} ${fee.modeBadgeText}`}>
                                {fee.mode}
                              </span>
                            </div>
                            <span className="font-data-mono text-[11px] text-outline truncate block">
                              {fee.code}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                          <span className="font-data-mono font-bold text-on-surface text-label-lg">
                            {fee.amount}
                          </span>
                          <button
                            aria-label={`Download Receipt ${fee.code}`}
                            onClick={() => onShowToast(`Receipt ${fee.code} for ${fee.studentName} downloaded (PDF).`)}
                            className="p-1 rounded hover:bg-surface-container-lowest text-outline hover:text-primary transition-colors cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">receipt</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Bottom: Live Institution Activity Feed */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
                  <div className="flex items-center justify-between pb-space-sm">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        Institution Stream
                      </h2>
                    </div>
                    <span className="font-data-mono text-[11px] text-outline">Live Broadcast</span>
                  </div>

                  <div className="relative pl-6 space-y-4 pt-2 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-high">
                    {streamEvents.map(evt => (
                      <div key={evt.id} className="relative flex flex-col gap-0.5">
                        <span className={`absolute -left-6 top-1 w-3 h-3 rounded-full ${evt.dotColor} ring-4 ring-surface-container-lowest`}></span>
                        <p className="font-body-md text-body-md text-on-surface">{evt.primaryText}</p>
                        <div className="flex items-center gap-2 font-data-mono text-[11px] text-outline">
                          <span>{evt.campusOrSource}</span>
                          <span>•</span>
                          <span>{evt.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL: Review Student Admission Dossier */}
      {isReviewModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                />
                <div>
                  <h3 className="font-headline-sm font-bold text-on-surface leading-tight">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-xs text-outline">{selectedStudent.code} • {selectedStudent.campus} Branch</p>
                </div>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-low">
                <div>
                  <span className="text-xs text-outline block">Enrolled Program</span>
                  <span className="font-semibold text-on-surface">{selectedStudent.course}</span>
                </div>
                <div>
                  <span className="text-xs text-outline block">Campus Location</span>
                  <span className="font-semibold text-on-surface">{selectedStudent.campus} Campus</span>
                </div>
                <div>
                  <span className="text-xs text-outline block">Enrollment Timestamp</span>
                  <span className="font-semibold text-on-surface">{selectedStudent.date}</span>
                </div>
                <div>
                  <span className="text-xs text-outline block">Registration Status</span>
                  <span className="font-semibold text-primary">{selectedStudent.status}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-outline-variant/60 space-y-2">
                <span className="text-xs font-semibold text-on-surface uppercase tracking-wider block">
                  Mandatory Verification Checklist
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-secondary font-medium">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Aadhaar / National Identity Document Vaulted
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-medium">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    10th &amp; 12th Academic Marks Ledger Verified
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    Biometric RFID Card Provisioned (#RFID-9812)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    onShowToast(`Official fee challan downloaded for ${selectedStudent.name}.`);
                    setIsReviewModalOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors cursor-pointer"
                >
                  Print Challan
                </button>
                <button
                  onClick={() => {
                    onShowToast(`Student dossier for ${selectedStudent.name} verified and locked.`);
                    setIsReviewModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container cursor-pointer"
                >
                  Confirm Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Quick Student Admission & Fee Counter */}
      {isQuickActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">person_add</span>
                <h3 className="font-headline-sm font-bold text-on-surface">Quick Admission &amp; Intake</h3>
              </div>
              <button
                onClick={() => setIsQuickActionModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateNewStudent} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold uppercase text-outline mb-1">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subhashish Roy"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Course Program
                  </label>
                  <select
                    value={newStudentCourse}
                    onChange={e => setNewStudentCourse(e.target.value)}
                    className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-xs focus:outline-none cursor-pointer"
                  >
                    <option>Web Development</option>
                    <option>Tally Prime</option>
                    <option>Graphic Design</option>
                    <option>Digital Marketing</option>
                    <option>Spoken English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Campus Branch
                  </label>
                  <select
                    value={newStudentBranch}
                    onChange={e => setNewStudentBranch(e.target.value)}
                    className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-xs focus:outline-none cursor-pointer"
                  >
                    <option>Siliguri</option>
                    <option>Binnaguri</option>
                    <option>Jalpaiguri</option>
                    <option>Cooch Behar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-outline mb-1">
                  Immediate Collection Amount (₹)
                </label>
                <input
                  type="number"
                  value={newStudentFee}
                  onChange={e => setNewStudentFee(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface font-data-mono focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuickActionModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                  <span>Confirm Enrollment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
