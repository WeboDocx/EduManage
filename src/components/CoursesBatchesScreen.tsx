import React, { useState, useMemo } from 'react';
import { ScreenType, BatchItem } from '../types';
import { BRAND_HOTLINKS } from '../data/mockData';
import { useSidebar } from '../context/SidebarContext';
import { CreateCourseModal, DRAFT_CREATE_COURSE_OPEN_KEY } from './CreateCourseModal';

interface CoursesBatchesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

const INITIAL_BATCHES: BatchItem[] = [
  {
    id: 'batch-1',
    code: 'WD-EVE-04',
    cohort: 'Evening Cohort 4',
    courseName: 'Full Stack Web Development',
    courseSpecialization: 'MERN + Cloud Stack',
    shortCode: 'WD',
    badgeBg: 'bg-primary/10',
    badgeTextColor: 'text-primary',
    campus: 'Siliguri HQ',
    campusDotColor: 'bg-primary',
    facultyName: 'Amit Sharma',
    facultyInitials: 'AS',
    room: 'Lab 204 (Mac Pods)',
    days: 'Mon, Wed, Fri',
    timeSlot: '06:00 PM – 08:00 PM',
    enrolled: 38,
    capacity: 40,
    fillPercentage: 95,
    status: 'Active',
    isNearFull: true,
  },
  {
    id: 'batch-2',
    code: 'DM-MOR-02',
    cohort: 'Morning Cohort 2',
    courseName: 'Advanced Digital Marketing',
    courseSpecialization: 'Performance Marketing',
    shortCode: 'DM',
    badgeBg: 'bg-error-container/60',
    badgeTextColor: 'text-error',
    campus: 'Binnaguri',
    campusDotColor: 'bg-tertiary',
    facultyName: 'Sunita Paul',
    facultyInitials: 'SP',
    room: 'Room 102',
    days: 'Tue, Thu, Sat',
    timeSlot: '10:00 AM – 12:00 PM',
    enrolled: 30,
    capacity: 30,
    fillPercentage: 100,
    status: 'Full',
    waitlistCount: 4,
  },
  {
    id: 'batch-3',
    code: 'TP-WKD-01',
    cohort: 'Weekend Fast-Track',
    courseName: 'Tally Prime with GST & TDS',
    courseSpecialization: 'Enterprise Accounting',
    shortCode: 'TP',
    badgeBg: 'bg-secondary-container/50',
    badgeTextColor: 'text-secondary',
    campus: 'Jalpaiguri',
    campusDotColor: 'bg-secondary',
    facultyName: 'Manoj Verma',
    facultyInitials: 'MV',
    room: 'Accounts Lab B',
    days: 'Sat, Sun',
    timeSlot: '02:00 PM – 05:00 PM',
    enrolled: 22,
    capacity: 35,
    fillPercentage: 62.8,
    status: 'Active',
  },
  {
    id: 'batch-4',
    code: 'GD-AFT-03',
    cohort: 'Afternoon Studio 3',
    courseName: 'Graphic Design & UI/UX',
    courseSpecialization: 'Figma + Adobe Creative',
    shortCode: 'GD',
    badgeBg: 'bg-tertiary-container/20',
    badgeTextColor: 'text-tertiary',
    campus: 'Siliguri HQ',
    campusDotColor: 'bg-primary',
    facultyName: 'Rakesh Sen',
    facultyInitials: 'RS',
    room: 'Design Studio B',
    days: 'Mon to Thu',
    timeSlot: '03:00 PM – 05:00 PM',
    enrolled: 18,
    capacity: 25,
    fillPercentage: 72,
    status: 'Active',
  },
  {
    id: 'batch-5',
    code: 'SE-EVE-01',
    cohort: 'Evening Daily',
    courseName: 'Spoken English & Personality',
    courseSpecialization: 'Business Communication',
    shortCode: 'SE',
    badgeBg: 'bg-primary-fixed',
    badgeTextColor: 'text-primary',
    campus: 'Cooch Behar',
    campusDotColor: 'bg-primary-container',
    facultyName: 'Debolina Mitra',
    facultyInitials: 'DM',
    room: 'Lecture Hall 1',
    days: 'Daily (Mon-Sat)',
    timeSlot: '05:00 PM – 06:30 PM',
    enrolled: 28,
    capacity: 30,
    fillPercentage: 93.3,
    status: 'Active',
    isNearFull: true,
  },
];

export const CoursesBatchesScreen: React.FC<CoursesBatchesScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [batches, setBatches] = useState<BatchItem[]>(INITIAL_BATCHES);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState('');
  const [timeSlotFilter, setTimeSlotFilter] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'courses' | 'batches' | 'subjects' | 'classrooms'>('batches');
  const [selectedCampusScope, setSelectedCampusScope] = useState('All Branches (8 Active)');
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = useState(() => {
    try {
      return localStorage.getItem(DRAFT_CREATE_COURSE_OPEN_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // Quick Batch form state
  const [batchIdentifier, setBatchIdentifier] = useState('WD Weekend Fast-Track');
  const [assignedCourse, setAssignedCourse] = useState('Full Stack Web Development (WD-01)');
  const [batchCampus, setBatchCampus] = useState('Siliguri HQ');
  const [facultyLead, setFacultyLead] = useState('Amit Sharma');
  const [roomLab, setRoomLab] = useState('Lab 204 (Mac Pods)');
  const [activeDays, setActiveDays] = useState<string[]>(['S', 'S']);
  const [cohortSeats, setCohortSeats] = useState(40);
  const [startTime, setStartTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('01:00 PM');
  const [commencementDate, setCommencementDate] = useState('2025-07-01');
  const [autoWaitlist, setAutoWaitlist] = useState(true);

  // Quick modal states for interactive management
  const [managingBatch, setManagingBatch] = useState<BatchItem | null>(null);
  const [isExportMatrixOpen, setIsExportMatrixOpen] = useState(false);
  const [isTimetablePlannerOpen, setIsTimetablePlannerOpen] = useState(false);

  // Filtered Batches
  const filteredBatches = useMemo(() => {
    return batches.filter(b => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          b.code.toLowerCase().includes(q) ||
          b.cohort.toLowerCase().includes(q) ||
          b.courseName.toLowerCase().includes(q) ||
          b.facultyName.toLowerCase().includes(q) ||
          b.room.toLowerCase().includes(q) ||
          b.campus.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Branch filter
      if (branchFilter !== 'all') {
        if (branchFilter === 'siliguri' && !b.campus.toLowerCase().includes('siliguri')) return false;
        if (branchFilter === 'binnaguri' && !b.campus.toLowerCase().includes('binnaguri')) return false;
        if (branchFilter === 'jalpaiguri' && !b.campus.toLowerCase().includes('jalpaiguri')) return false;
        if (branchFilter === 'coochbehar' && !b.campus.toLowerCase().includes('cooch')) return false;
      }

      // Course category filter
      if (courseCategoryFilter) {
        if (courseCategoryFilter === 'tech' && !b.courseName.toLowerCase().includes('web')) return false;
        if (courseCategoryFilter === 'marketing' && !b.courseName.toLowerCase().includes('marketing')) return false;
        if (courseCategoryFilter === 'finance' && !b.courseName.toLowerCase().includes('tally')) return false;
        if (courseCategoryFilter === 'design' && !b.courseName.toLowerCase().includes('graphic')) return false;
        if (courseCategoryFilter === 'vocational' && !b.courseName.toLowerCase().includes('english')) return false;
      }

      // Time slot filter
      if (timeSlotFilter) {
        if (timeSlotFilter === 'morning' && !b.timeSlot.includes('AM')) return false;
        if (timeSlotFilter === 'afternoon' && (!b.timeSlot.includes('02:') && !b.timeSlot.includes('03:'))) return false;
        if (timeSlotFilter === 'evening' && (!b.timeSlot.includes('05:') && !b.timeSlot.includes('06:'))) return false;
        if (timeSlotFilter === 'weekend' && (!b.days.includes('Sat') && !b.days.includes('Sun'))) return false;
      }

      // Capacity filter
      if (capacityFilter) {
        if (capacityFilter === 'seats' && b.fillPercentage >= 80) return false;
        if (capacityFilter === 'near-full' && (b.fillPercentage < 80 || b.fillPercentage >= 100)) return false;
        if (capacityFilter === 'waitlist' && b.status !== 'Full') return false;
      }

      return true;
    });
  }, [batches, searchQuery, branchFilter, courseCategoryFilter, timeSlotFilter, capacityFilter]);

  const toggleDay = (dayChar: string, index: number) => {
    const key = `${dayChar}-${index}`;
    setActiveDays(prev =>
      prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]
    );
  };

  const focusQuickBatch = () => {
    const el = document.getElementById('quickBatchPanel');
    const input = document.getElementById('newBatchName');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-primary');
      setTimeout(() => el.classList.remove('ring-2', 'ring-primary'), 1600);
    }
    if (input) {
      input.focus();
    }
  };

  const handleCreateBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchIdentifier.trim()) {
      onShowToast('Please specify a batch identifier.');
      return;
    }

    const shortCode = assignedCourse.split(' ')[0].slice(0, 2).toUpperCase();
    const newBatch: BatchItem = {
      id: `batch-${Date.now()}`,
      code: `${shortCode}-WKD-${Math.floor(10 + Math.random() * 90)}`,
      cohort: batchIdentifier,
      courseName: assignedCourse.split(' (')[0],
      courseSpecialization: 'Core Modules + Practical Labs',
      shortCode,
      badgeBg: 'bg-primary/10',
      badgeTextColor: 'text-primary',
      campus: batchCampus,
      campusDotColor: 'bg-primary',
      facultyName: facultyLead,
      facultyInitials: facultyLead.split(' ').map(p => p[0]).join('').slice(0, 2),
      room: roomLab,
      days: activeDays.length > 0 ? 'Sat, Sun' : 'Custom Schedule',
      timeSlot: `${startTime} – ${endTime}`,
      enrolled: 1,
      capacity: cohortSeats,
      fillPercentage: Math.round((1 / cohortSeats) * 100),
      status: 'Active',
    };

    setBatches([newBatch, ...batches]);
    onShowToast(`Cohort "${batchIdentifier}" created successfully across branch timetable!`);
    setBatchIdentifier('');
  };

  const handleExportSyllabus = () => {
    const csvHeader = 'BatchCode,Cohort,Course,Campus,Faculty,Room,Schedule,Enrolled,Capacity,Status\n';
    const csvRows = filteredBatches
      .map(
        b =>
          `"${b.code}","${b.cohort}","${b.courseName}","${b.campus}","${b.facultyName}","${b.room}","${b.days} ${b.timeSlot}","${b.enrolled}","${b.capacity}","${b.status}"`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `edumanage_batches_matrix_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported syllabus matrix for ${filteredBatches.length} active batches.`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased flex">
      {/* 1. FIXED LEFT SIDEBAR (260px) */}
      {/* Mobile backdrop overlay with smooth fade in/out */}
      <div
        className={`fixed inset-0 top-12 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-all duration-300 ease-out ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-12 bottom-0 w-[260px] max-w-[85vw] bg-surface-container-lowest border-r border-outline-variant/40 z-50 flex flex-col justify-between shadow-2xl lg:shadow-[0_1px_8px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform will-change-transform ${
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
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md">
            {/* Dashboard Link */}
            <nav className="space-y-0.5">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full flex items-center justify-between px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-primary transition-colors">
                    grid_view
                  </span>
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
                  className="w-full flex items-center justify-between px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                  className="w-full flex items-center justify-between px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                  onClick={() => onShowToast('Add Student fast intake modal.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">person_add</span>
                  <span className="font-body-md text-body-md">Add Student</span>
                </button>
                <button
                  onClick={() => onShowToast('Student Documents repository: 100% digital KYC records.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">folder_shared</span>
                  <span className="font-body-md text-body-md">Documents</span>
                </button>
                <button
                  onClick={() => onShowToast('RFID / Barcode Student ID Cards generator.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                  <span className="font-body-md text-body-md">ID Cards</span>
                </button>
              </nav>
            </div>

            {/* Academics (ACTIVE) */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Academics
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('courses-batches')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 transition-all bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-sm text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-white">menu_book</span>
                  <span className="font-body-md text-body-md">Courses &amp; Batches</span>
                </button>
                <button
                  onClick={() => onShowToast('Academic Subjects curriculum loaded with credit allocation.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">auto_stories</span>
                  <span className="font-body-md text-body-md">Subjects</span>
                </button>
                <button
                  onClick={() => setIsTimetablePlannerOpen(true)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">calendar_month</span>
                  <span className="font-body-md text-body-md">Timetable</span>
                </button>
                <button
                  onClick={() => onShowToast('Student Assignments: 42 submissions reviewed this week.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">task</span>
                  <span className="font-body-md text-body-md">Assignments</span>
                </button>
                <button
                  onClick={() => onShowToast('Exams & Grading system with term report generation.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                  onClick={() => onShowToast('Biometric & RFID synchronization: 98.4% daily student presence.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">fingerprint</span>
                  <span className="font-body-md text-body-md">Biometric &amp; RFID</span>
                </button>
                <button
                  onClick={() => onShowToast('Manual Marking opened for classroom mentors.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">checklist</span>
                  <span className="font-body-md text-body-md">Manual Marking</span>
                </button>
                <button
                  onClick={() => onShowToast('Leave Requests: 3 student medical leaves awaiting approval.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                  onClick={() => onShowToast('Fee Structure: 2025 installment matrices configured.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">account_balance_wallet</span>
                  <span className="font-body-md text-body-md">Fee Structure</span>
                </button>
                <button
                  onClick={() => onShowToast('Collect Fee POS terminal opened.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">point_of_sale</span>
                  <span className="font-body-md text-body-md">Collect Fee</span>
                </button>
                <button
                  onClick={() => onShowToast('Payments gateway settlements: ₹4.8L cleared this week.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">payments</span>
                  <span className="font-body-md text-body-md">Payments</span>
                </button>
                <button
                  onClick={() => onShowToast('Due Fees: 14 students flagged with overdue reminders.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">pending_actions</span>
                  <span className="font-body-md text-body-md">Due Fees</span>
                </button>
                <button
                  onClick={() => onShowToast('Invoices & Receipts ledger up to date.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">receipt_long</span>
                  <span className="font-body-md text-body-md">Invoices &amp; Receipts</span>
                </button>
                <button
                  onClick={() => onShowToast('Campus expense register up to date.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                  onClick={() => onShowToast('Faculty Directory: 142 teaching mentors onboarded.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">co_present</span>
                  <span className="font-body-md text-body-md">Faculty Directory</span>
                </button>
                <button
                  onClick={() => onShowToast('Staff Management: Support staff and lab technicians.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                  <span className="font-body-md text-body-md">Staff</span>
                </button>
                <button
                  onClick={() => onShowToast('Staff payroll processed for current cycle.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">price_check</span>
                  <span className="font-body-md text-body-md">Payroll</span>
                </button>
                <button
                  onClick={() => onShowToast('Duty Rosters: Lab oversight and weekend shifts.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                  onClick={() => onShowToast('Bulk Communication SMS / WhatsApp module.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">campaign</span>
                  <span className="font-body-md text-body-md">Communication</span>
                </button>
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="w-full flex items-center justify-between px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                  onClick={() => onShowToast('Reports & Analytics export ready.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">analytics</span>
                  <span className="font-body-md text-body-md">Reports &amp; Ledger</span>
                </button>
                <button
                  onClick={() => onNavigate('admin')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
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
                className="text-outline hover:text-primary p-1 rounded transition-colors"
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
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors text-left"
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
        {/* RESPONSIVE TOP HEADER (Sticky below global navigation) */}
        <header className="sticky top-12 z-30 h-14 sm:h-16 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/40 flex items-center justify-between px-4 sm:px-space-lg shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-space-md min-w-0">
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
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 rounded-lg text-left transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-label-sm text-[10px] text-outline leading-none uppercase">
                    Campus View
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                    {selectedCampusScope}{' '}
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </span>
                </div>
                <span className="sm:hidden text-xs font-semibold text-on-surface">
                  {selectedCampusScope.includes('All') ? '8 Campuses' : selectedCampusScope.split(' ')[0]}
                </span>
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
                        setBranchFilter(
                          b.includes('All')
                            ? 'all'
                            : b.includes('Siliguri')
                            ? 'siliguri'
                            : b.includes('Binnaguri')
                            ? 'binnaguri'
                            : b.includes('Jalpaiguri')
                            ? 'jalpaiguri'
                            : 'coochbehar'
                        );
                        setIsCampusDropdownOpen(false);
                        onShowToast(`Campus view changed to: ${b}`);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between ${
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
            <div className="relative w-72 lg:w-96 hidden sm:block">
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
            <button
              onClick={focusQuickBatch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm font-label-md text-label-md font-semibold active:scale-[0.98]"
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
              onClick={() => onShowToast('You have 3 operational alerts: 1 waitlist expansion needed, 2 batch rooms allocated.')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error text-on-error font-data-mono text-[10px] font-bold flex items-center justify-center leading-none ring-2 ring-surface-container-lowest">
                3
              </span>
            </button>

            <button
              aria-label="Help and documentation"
              onClick={() => onShowToast('Documentation: Academic Course & Timetable architecture')}
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors hidden sm:flex"
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
              <button aria-label="User menu" className="text-outline hover:text-on-surface" type="button">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>
          </div>
        </header>

        {/* 3. MAIN COURSES & BATCHES WORKSPACE */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-screen">
          <div className="p-margin-desktop space-y-space-lg max-w-[1600px] mx-auto w-full">
            {/* Breadcrumb & Top Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate('admin')}>
                    Academics
                  </span>
                  <span className="text-outline">/</span>
                  <span className="font-semibold text-on-surface">Courses &amp; Batches</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider">
                    Academic Term 2025-26
                  </span>
                </div>
                <h1 className="font-headline-lg sm:font-display text-2xl sm:text-display text-on-surface tracking-tight font-bold">Courses &amp; Batches</h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                  Manage your institution's academic programs, departmental curriculum, physical laboratory allocations, and multi-campus batch occupancies.
                </p>
              </div>

              {/* Action Cluster */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportSyllabus}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm font-label-md text-label-md cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">file_download</span>
                  <span>Export Syllabus Matrix</span>
                </button>

                <button
                  onClick={() => setIsTimetablePlannerOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm font-label-md text-label-md cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">calendar_view_week</span>
                  <span>Timetable Planner</span>
                </button>

                <button
                  onClick={focusQuickBatch}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors shadow-sm font-label-md text-label-md font-semibold cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">group_add</span>
                  <span>+ Create Batch</span>
                </button>

                <button
                  onClick={() => setIsCreateCourseModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-md font-label-md text-label-md font-semibold active:scale-[0.98] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">add_box</span>
                  <span>+ Create Course</span>
                </button>
              </div>
            </div>

            {/* KPI Metric Cards Grid with Ambient Visual Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
              {/* KPI 1: Active Courses */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all hover:shadow-md group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary/5 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Active Courses
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display text-on-surface">24</span>
                      <span className="font-label-sm text-label-sm text-primary font-semibold">6 Disciplines</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">auto_stories</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1 text-secondary font-medium">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span> +3 this quarter
                  </span>
                  <span className="text-outline">100% Affiliated</span>
                </div>
              </div>

              {/* KPI 2: Total Enrolled Students */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all hover:shadow-md group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-secondary/5 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Total Enrolled Students
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display text-on-surface">8,420</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold">Across Branches</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">school</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
                  {/* Mini SVG Sparkline */}
                  <svg className="w-24 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 100 24">
                    <path d="M0 18 Q 20 22, 35 12 T 70 8 T 100 2"></path>
                  </svg>
                  <span className="font-data-mono text-data-mono text-on-surface font-medium">98.4% Retention</span>
                </div>
              </div>

              {/* KPI 3: Active Batches */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all hover:shadow-md group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-tertiary/5 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Active Batches
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display text-on-surface">{batches.length}</span>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">Avg 85% Fill</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">groups</span>
                  </div>
                </div>
                <div className="mt-3 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* KPI 4: Batches Near Full / Waitlist */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all hover:shadow-md group">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-error/5 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Batches Near Full / Waitlist
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display text-error">9</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Require expansion</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-error-container/40 text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">error_outline</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-error font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span> 42 In Waitlist queue
                  </span>
                  <button
                    onClick={() => {
                      setCapacityFilter('waitlist');
                      onShowToast('Filtered view to waitlisted cohorts.');
                    }}
                    className="text-primary hover:underline font-label-sm text-label-sm cursor-pointer"
                  >
                    View Bottlenecks
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Module Navigation Tabs */}
            <div className="flex items-center justify-between bg-surface-container-low rounded-xl p-1 shadow-sm">
              <div className="flex items-center gap-1 overflow-x-auto">
                <button
                  onClick={() => {
                    setActiveTab('courses');
                    onShowToast('Loaded Disciplines & Programs curriculum tab.');
                  }}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold transition-all ${
                    activeTab === 'courses'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                  type="button"
                >
                  Courses{' '}
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-surface-container-highest text-on-surface-variant">
                    24
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('batches')}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold transition-all flex items-center gap-2 ${
                    activeTab === 'batches'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                  type="button"
                >
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Batches{' '}
                  <span className="px-1.5 py-0.5 rounded-full text-[11px] bg-primary-fixed text-on-primary-fixed font-bold">
                    {batches.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('subjects');
                    onShowToast('Loaded Subjects & Curriculum Modules.');
                  }}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold transition-all ${
                    activeTab === 'subjects'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                  type="button"
                >
                  Subjects &amp; Modules{' '}
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-surface-container-highest text-on-surface-variant">
                    112
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('classrooms');
                    onShowToast('Room & Laboratory physical allocations across 8 campuses.');
                  }}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold transition-all ${
                    activeTab === 'classrooms'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                  type="button"
                >
                  Classroom Allocation{' '}
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[11px] bg-secondary-container/40 text-secondary">
                    32 Rooms
                  </span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 pr-2">
                <span className="font-body-sm text-body-sm text-outline">Layout:</span>
                <button
                  className="p-1.5 rounded-md bg-surface-container-lowest text-primary shadow-xs"
                  title="High-Density Table"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">table_rows</span>
                </button>
                <button
                  className="p-1.5 rounded-md text-outline hover:text-on-surface transition-colors"
                  title="Timetable Grid"
                  type="button"
                  onClick={() => setIsTimetablePlannerOpen(true)}
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_view_month</span>
                </button>
              </div>
            </div>

            {/* Main Batches Management Interactive Workspace */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
              {/* Filter Bar Header */}
              <div className="p-space-md bg-surface-container-lowest flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
                {/* Live Instant Search */}
                <div className="relative flex-1 max-w-xl">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-outline">
                    search
                  </span>
                  <input
                    className="w-full h-10 pl-10 pr-10 bg-surface-container-low rounded-lg text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all"
                    id="batchSearchInput"
                    placeholder="Search batch code, program name, assigned faculty or room..."
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                      onClick={() => setSearchQuery('')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>

                {/* Filter Selectors */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Campus / Branch Filter */}
                  <div className="relative">
                    <select
                      className="appearance-none h-10 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                      id="branchFilter"
                      value={branchFilter}
                      onChange={e => setBranchFilter(e.target.value)}
                    >
                      <option value="all">Branch: All Campuses</option>
                      <option value="siliguri">Siliguri HQ (Main)</option>
                      <option value="binnaguri">Binnaguri Hub</option>
                      <option value="jalpaiguri">Jalpaiguri City</option>
                      <option value="coochbehar">Cooch Behar</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>

                  {/* Course Category Filter */}
                  <div className="relative">
                    <select
                      className="appearance-none h-10 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                      value={courseCategoryFilter}
                      onChange={e => setCourseCategoryFilter(e.target.value)}
                    >
                      <option value="">Course: All Disciplines</option>
                      <option value="tech">Software &amp; Web Dev</option>
                      <option value="marketing">Digital Marketing</option>
                      <option value="finance">Finance &amp; Tally</option>
                      <option value="design">Graphic &amp; UI/UX Design</option>
                      <option value="vocational">Languages &amp; Soft Skills</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>

                  {/* Shift / Timing Filter */}
                  <div className="relative">
                    <select
                      className="appearance-none h-10 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                      value={timeSlotFilter}
                      onChange={e => setTimeSlotFilter(e.target.value)}
                    >
                      <option value="">Slot: All Timings</option>
                      <option value="morning">Morning (08:00 - 12:00)</option>
                      <option value="afternoon">Afternoon (12:00 - 16:00)</option>
                      <option value="evening">Evening (16:00 - 20:00)</option>
                      <option value="weekend">Weekend Exclusive</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>

                  {/* Capacity State Filter */}
                  <div className="relative">
                    <select
                      className="appearance-none h-10 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                      value={capacityFilter}
                      onChange={e => setCapacityFilter(e.target.value)}
                    >
                      <option value="">Capacity: All States</option>
                      <option value="seats">Available (&lt;80%)</option>
                      <option value="near-full">Near Full (&gt;80%)</option>
                      <option value="waitlist">Full / Waitlisted</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setBranchFilter('all');
                      setCourseCategoryFilter('');
                      setTimeSlotFilter('');
                      setCapacityFilter('');
                      setSearchQuery('');
                      onShowToast('Filters reset to default view.');
                    }}
                    className="h-10 px-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant flex items-center gap-1.5 transition-colors font-label-md text-label-md cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">tune</span>
                    <span className="hidden md:inline">Reset</span>
                  </button>
                </div>
              </div>

              {/* High-Density Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold">Batch Code &amp; Name</th>
                      <th className="py-3 px-4 font-semibold">Course Discipline</th>
                      <th className="py-3 px-4 font-semibold">Campus</th>
                      <th className="py-3 px-4 font-semibold">Faculty In-Charge</th>
                      <th className="py-3 px-4 font-semibold">Room / Lab</th>
                      <th className="py-3 px-4 font-semibold">Schedule Routine</th>
                      <th className="py-3 px-4 font-semibold min-w-[200px]">Capacity Fill</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-transparent font-body-md text-body-md text-on-surface" id="batchTableBody">
                    {filteredBatches.map(batch => (
                      <tr
                        key={batch.id}
                        className={`hover:bg-surface-container-low/60 transition-colors group ${
                          batch.status === 'Full' ? 'bg-error-container/10' : ''
                        }`}
                      >
                        {/* Batch Code & Name */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-lg ${batch.badgeBg} ${batch.badgeTextColor} flex items-center justify-center font-data-mono text-[11px] font-bold`}
                            >
                              {batch.shortCode}
                            </div>
                            <div>
                              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                                {batch.code}
                              </span>
                              <p className="font-body-sm text-body-sm text-outline">{batch.cohort}</p>
                            </div>
                          </div>
                        </td>

                        {/* Course Discipline */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-on-surface">{batch.courseName}</span>
                            <span className="font-body-sm text-[11px] text-outline">
                              {batch.courseSpecialization}
                            </span>
                          </div>
                        </td>

                        {/* Campus */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px] font-medium">
                            <span className={`w-1.5 h-1.5 rounded-full ${batch.campusDotColor}`}></span>
                            {batch.campus}
                          </span>
                        </td>

                        {/* Faculty In-Charge */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-primary text-[11px] font-bold">
                              {batch.facultyInitials}
                            </div>
                            <span className="font-medium">{batch.facultyName}</span>
                          </div>
                        </td>

                        {/* Room / Lab */}
                        <td className="py-3.5 px-4">
                          <span className="font-data-mono text-data-mono px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                            {batch.room}
                          </span>
                        </td>

                        {/* Schedule Routine */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-on-surface">{batch.days}</span>
                            <span className="font-body-sm text-[11px] text-outline font-data-mono">
                              {batch.timeSlot}
                            </span>
                          </div>
                        </td>

                        {/* Capacity Fill */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-body-sm">
                              <span className={`font-semibold ${batch.status === 'Full' ? 'text-error' : 'text-on-surface'}`}>
                                {batch.enrolled}{' '}
                                <span className="text-outline font-normal">/ {batch.capacity}</span>
                              </span>
                              {batch.status === 'Full' ? (
                                <span className="font-label-sm text-label-sm text-error font-bold flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[13px]">lock</span> 100% (+{batch.waitlistCount || 4} WL)
                                </span>
                              ) : batch.isNearFull ? (
                                <span className="font-label-sm text-label-sm text-error font-semibold">
                                  {batch.fillPercentage}% (Near Full)
                                </span>
                              ) : (
                                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                                  {Math.round(batch.fillPercentage)}% ({batch.capacity - batch.enrolled} Seats Left)
                                </span>
                              )}
                            </div>
                            <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-2 rounded-full ${
                                  batch.status === 'Full'
                                    ? 'bg-error'
                                    : batch.isNearFull
                                    ? 'bg-gradient-to-r from-secondary to-primary'
                                    : 'bg-secondary'
                                }`}
                                style={{ width: `${Math.min(100, batch.fillPercentage)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          {batch.status === 'Full' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                              Full
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              Active
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {batch.status === 'Full' ? (
                              <button
                                className="px-2.5 py-1 rounded-lg bg-error-container/80 text-on-error-container hover:bg-error hover:text-on-error font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
                                onClick={() => {
                                  setManagingBatch(batch);
                                  onShowToast(`Reviewing waitlist roster for ${batch.code}`);
                                }}
                                type="button"
                              >
                                Waitlist ({batch.waitlistCount || 4})
                              </button>
                            ) : (
                              <button
                                className="px-2.5 py-1 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm font-semibold transition-colors cursor-pointer"
                                onClick={() => {
                                  setManagingBatch(batch);
                                  onShowToast(`Opened configuration modal for ${batch.code}`);
                                }}
                                type="button"
                              >
                                Manage
                              </button>
                            )}
                            <button
                              className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
                              type="button"
                              onClick={() => onShowToast(`Batch ${batch.code} roster options.`)}
                            >
                              <span className="material-symbols-outlined text-[18px]">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination & Data Ledger Footer */}
              <div className="p-space-md bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span>
                    Showing <strong className="text-on-surface">1–{filteredBatches.length}</strong> of{' '}
                    <strong className="text-on-surface">68</strong> active institutional batches
                  </span>
                  <span className="text-outline">|</span>
                  <button
                    className="text-primary hover:underline font-medium cursor-pointer"
                    type="button"
                    onClick={() => onShowToast('Full academic term master audit roster downloaded.')}
                  >
                    Batch Roster Log
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded bg-surface-container-lowest text-outline opacity-50 cursor-not-allowed"
                    disabled
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>
                  <button
                    className="w-7 h-7 rounded bg-primary text-on-primary font-semibold text-xs flex items-center justify-center"
                    type="button"
                  >
                    1
                  </button>
                  <button
                    className="w-7 h-7 rounded hover:bg-surface-container text-on-surface font-medium text-xs flex items-center justify-center cursor-pointer"
                    type="button"
                    onClick={() => onShowToast('Page 2 loaded.')}
                  >
                    2
                  </button>
                  <button
                    className="w-7 h-7 rounded hover:bg-surface-container text-on-surface font-medium text-xs flex items-center justify-center cursor-pointer"
                    type="button"
                    onClick={() => onShowToast('Page 3 loaded.')}
                  >
                    3
                  </button>
                  <span className="px-1 text-outline">...</span>
                  <button
                    className="w-7 h-7 rounded hover:bg-surface-container text-on-surface font-medium text-xs flex items-center justify-center cursor-pointer"
                    type="button"
                    onClick={() => onShowToast('Page 14 loaded.')}
                  >
                    14
                  </button>
                  <button
                    className="p-1.5 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container cursor-pointer"
                    type="button"
                    onClick={() => onShowToast('Next page.')}
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Split Section: 50% Course Spotlight & 50% Fast Batch Scheduler */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
              {/* Left Card: Course Spotlight & Multi-Branch Matrix */}
              <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between space-y-space-md">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                        Flagship Program
                      </span>
                      <span className="font-data-mono text-data-mono text-outline font-semibold">WD-01</span>
                    </div>
                    <span className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-[16px]">verified</span> Multi-Branch Standard
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                    Full Stack Web Development
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Comprehensive full-stack architecture curriculum comprising React 19, Node.js, PostgreSQL, Docker containerization, and cloud deployment pipelines.
                  </p>

                  {/* Key Curriculum Metrics Pill Bar */}
                  <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-lg bg-surface-container-low">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                        Duration
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">6 Months</span>
                      <span className="font-body-sm text-[11px] text-outline block">360 Contact Hrs</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                        Standard Fee
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">₹30,000</span>
                      <span className="font-body-sm text-[11px] text-secondary block">EMI Enabled</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                        Eligibility
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">10+2 / Grad</span>
                      <span className="font-body-sm text-[11px] text-outline block">Basic Math/Logic</span>
                    </div>
                  </div>

                  {/* Multi-Branch Deployment Badges */}
                  <div className="mt-4 space-y-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                      Allocated Campus Nodes
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold">
                        <span className="material-symbols-outlined text-[16px]">domain</span> Siliguri HQ ✓
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold">
                        <span className="material-symbols-outlined text-[16px]">location_city</span> Binnaguri ✓
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold">
                        <span className="material-symbols-outlined text-[16px]">apartment</span> Jalpaiguri ✓
                      </span>
                      <button
                        onClick={() => onShowToast('Branch allocation modal opened for WD-01.')}
                        className="text-primary hover:text-primary-container text-xs font-semibold px-2 py-1 rounded hover:bg-surface-container transition-colors cursor-pointer"
                        type="button"
                      >
                        + Add Campus
                      </button>
                    </div>
                  </div>
                </div>

                {/* Course Performance Statistics Mosaic */}
                <div className="pt-4 border-t border-surface-container-high grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2 rounded-lg bg-surface-container-low">
                    <span className="font-headline-md text-headline-md text-primary font-bold block">6</span>
                    <span className="font-label-sm text-label-sm text-outline">Active Batches</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-low">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold block">184</span>
                    <span className="font-label-sm text-label-sm text-outline">Enrolled Students</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-low">
                    <span className="font-headline-md text-headline-md text-secondary font-bold block">₹48.2L</span>
                    <span className="font-label-sm text-label-sm text-outline">Fee Invoiced</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container-low">
                    <span className="font-headline-md text-headline-md text-tertiary font-bold block">142</span>
                    <span className="font-label-sm text-label-sm text-outline">Certified Alums</span>
                  </div>
                </div>
              </div>

              {/* Right Card: Fast Batch Creator / Scheduler Drawer Preview */}
              <div
                className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between transition-all space-y-space-md"
                id="quickBatchPanel"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                        Quick Create Batch
                      </h2>
                    </div>
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                      Terminal Mode
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                    Initialize an operational student cohort with automated classroom conflict detection and timetable propagation.
                  </p>

                  {/* Form Fields Grid */}
                  <form className="space-y-3" id="quickBatchForm" onSubmit={handleCreateBatchSubmit}>
                    {/* Row 1: Batch Name & Course */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Batch Identifier
                        </label>
                        <input
                          className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                          id="newBatchName"
                          type="text"
                          value={batchIdentifier}
                          onChange={e => setBatchIdentifier(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Assigned Course
                        </label>
                        <select
                          className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                          value={assignedCourse}
                          onChange={e => setAssignedCourse(e.target.value)}
                        >
                          <option>Full Stack Web Development (WD-01)</option>
                          <option>Advanced Digital Marketing (DM-02)</option>
                          <option>Tally Prime with GST &amp; TDS (TP-03)</option>
                          <option>Graphic Design &amp; UI/UX (GD-04)</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 2: Branch, Teacher & Classroom */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Campus
                        </label>
                        <select
                          className="w-full h-9 px-2 rounded-lg bg-surface-container-low text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                          value={batchCampus}
                          onChange={e => setBatchCampus(e.target.value)}
                        >
                          <option>Siliguri HQ</option>
                          <option>Binnaguri</option>
                          <option>Jalpaiguri</option>
                          <option>Cooch Behar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Faculty Lead
                        </label>
                        <select
                          className="w-full h-9 px-2 rounded-lg bg-surface-container-low text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                          value={facultyLead}
                          onChange={e => setFacultyLead(e.target.value)}
                        >
                          <option>Amit Sharma</option>
                          <option>Sunita Paul</option>
                          <option>Manoj Verma</option>
                          <option>Rakesh Sen</option>
                          <option>Debolina Mitra</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Room / Lab
                        </label>
                        <select
                          className="w-full h-9 px-2 rounded-lg bg-surface-container-low text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                          value={roomLab}
                          onChange={e => setRoomLab(e.target.value)}
                        >
                          <option>Lab 204 (Mac Pods)</option>
                          <option>Room 102</option>
                          <option>Accounts Lab B</option>
                          <option>Design Studio B</option>
                          <option>Lecture Hall 1</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Schedule Days & Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Routine Days
                        </label>
                        <div className="flex items-center gap-1.5" id="dayPicker">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                            const isSelected = (idx === 5 || idx === 6) || activeDays.includes(`${day}-${idx}`);
                            return (
                              <button
                                key={`${day}-${idx}`}
                                type="button"
                                onClick={() => toggleDay(day, idx)}
                                className={`w-7 h-7 rounded font-label-sm text-label-sm font-semibold transition-colors cursor-pointer ${
                                  isSelected ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Max Cohort Seats
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            className="w-24 h-9 px-3 rounded-lg bg-surface-container-low text-body-md font-data-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                            max="100"
                            min="5"
                            type="number"
                            value={cohortSeats}
                            onChange={e => setCohortSeats(Number(e.target.value))}
                          />
                          <span className="font-body-sm text-body-sm text-outline">Students</span>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Timing & Commencement Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Time Window
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            className="w-full h-9 px-2 rounded-lg bg-surface-container-low text-body-sm font-data-mono text-on-surface text-center"
                            type="text"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                          />
                          <span className="text-outline">to</span>
                          <input
                            className="w-full h-9 px-2 rounded-lg bg-surface-container-low text-body-sm font-data-mono text-on-surface text-center"
                            type="text"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold mb-1">
                          Commencement Date
                        </label>
                        <input
                          className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-body-sm text-on-surface focus:outline-none"
                          type="date"
                          value={commencementDate}
                          onChange={e => setCommencementDate(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Automated Waitlist Toggle Pill */}
                    <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between gap-3 mt-1">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-secondary text-[20px]">swap_calls</span>
                        <div>
                          <span className="font-label-md text-label-md font-semibold text-on-surface block">
                            Auto-enable Waitlist at 100% Fill
                          </span>
                          <span className="font-body-sm text-[11px] text-outline">
                            Directs extra registrations into priority approval queue
                          </span>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={autoWaitlist}
                          onChange={e => setAutoWaitlist(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                      </label>
                    </div>

                    {/* Submit Button Trigger */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors font-label-md text-label-md cursor-pointer"
                        type="button"
                        onClick={() => {
                          setBatchIdentifier('WD Weekend Fast-Track');
                          onShowToast('Form fields reset.');
                        }}
                      >
                        Reset
                      </button>
                      <button
                        className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold shadow-md flex items-center gap-1.5 active:scale-[0.98] cursor-pointer"
                        type="submit"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_task</span>
                        <span>Confirm &amp; Publish Batch</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL: Manage Batch Configuration */}
      {managingBatch && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg ${managingBatch.badgeBg} ${managingBatch.badgeTextColor} flex items-center justify-center font-bold text-xs`}>
                  {managingBatch.shortCode}
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-on-surface leading-tight">
                    {managingBatch.code} ({managingBatch.cohort})
                  </h3>
                  <p className="text-xs text-outline">{managingBatch.courseName}</p>
                </div>
              </div>
              <button
                onClick={() => setManagingBatch(null)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-low">
                <div>
                  <span className="text-xs text-outline block">Campus Location</span>
                  <span className="font-semibold text-on-surface">{managingBatch.campus}</span>
                </div>
                <div>
                  <span className="text-xs text-outline block">Classroom / Lab</span>
                  <span className="font-semibold text-on-surface">{managingBatch.room}</span>
                </div>
                <div>
                  <span className="text-xs text-outline block">Assigned Faculty</span>
                  <span className="font-semibold text-on-surface">{managingBatch.facultyName}</span>
                </div>
                <div>
                  <span className="text-xs text-outline block">Routine Slot</span>
                  <span className="font-semibold text-on-surface">{managingBatch.days}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Occupancy Fill Rate</span>
                  <span className="text-primary font-bold">
                    {managingBatch.enrolled} / {managingBatch.capacity} ({Math.round(managingBatch.fillPercentage)}%)
                  </span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, managingBatch.fillPercentage)}%` }}
                  ></div>
                </div>
              </div>

              {managingBatch.status === 'Full' && (
                <div className="p-3 rounded-xl bg-error-container/40 border border-error/20 flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-error text-[20px] flex-shrink-0">warning</span>
                  <div>
                    <p className="font-semibold text-on-error-container text-xs">
                      Cohort waitlist limit reached: 4 pending applicants
                    </p>
                    <p className="text-[11px] text-on-error-container/80 mt-0.5">
                      You can increase cohort capacity by +5 seats or split into an additional weekend morning slot.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setBatches(prev =>
                      prev.map(b =>
                        b.id === managingBatch.id
                          ? { ...b, capacity: b.capacity + 5, fillPercentage: (b.enrolled / (b.capacity + 5)) * 100, status: 'Active' }
                          : b
                      )
                    );
                    onShowToast(`Capacity for ${managingBatch.code} extended by +5 seats!`);
                    setManagingBatch(null);
                  }}
                  className="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-semibold text-xs transition-colors"
                >
                  + Expand Capacity (+5)
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setManagingBatch(null)}
                    className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onShowToast(`Timetable changes committed for ${managingBatch.code}.`);
                      setManagingBatch(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Timetable Planner Preview */}
      {isTimetablePlannerOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">calendar_view_week</span>
                <div>
                  <h3 className="font-headline-sm font-bold text-on-surface leading-tight">
                    Multi-Campus Timetable Planner
                  </h3>
                  <p className="text-xs text-outline">Synchronized Academic Term 2025-26 Routine</p>
                </div>
              </div>
              <button
                onClick={() => setIsTimetablePlannerOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-3 rounded-lg bg-surface-container-low">
                  <span className="font-bold text-primary block">Mon - Fri</span>
                  <span className="text-outline">Morning 08:00 - 12:00</span>
                  <span className="mt-1 text-[11px] font-semibold text-on-surface block">14 Lab Batches</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low">
                  <span className="font-bold text-primary block">Mon - Fri</span>
                  <span className="text-outline">Afternoon 12:00 - 16:00</span>
                  <span className="mt-1 text-[11px] font-semibold text-on-surface block">18 Lab Batches</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low">
                  <span className="font-bold text-primary block">Mon - Fri</span>
                  <span className="text-outline">Evening 16:00 - 20:00</span>
                  <span className="mt-1 text-[11px] font-semibold text-on-surface block">22 Cohorts (Peak)</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-low">
                  <span className="font-bold text-secondary block">Sat - Sun</span>
                  <span className="text-outline">Weekend Fast-Track</span>
                  <span className="mt-1 text-[11px] font-semibold text-on-surface block">14 Cohorts</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-secondary/30 bg-secondary-container/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
                  <div>
                    <h4 className="font-bold text-xs text-on-surface">Zero Room Collisions Detected</h4>
                    <p className="text-[11px] text-outline">
                      All 32 physical laboratories across Siliguri, Binnaguri, and Jalpaiguri are conflict-free.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onShowToast('Timetable schedule printed to institutional PDF.');
                    setIsTimetablePlannerOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container"
                >
                  Print PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL: CREATE COURSE (With Full Auto-Save) */}
      <CreateCourseModal
        isOpen={isCreateCourseModalOpen}
        onClose={() => setIsCreateCourseModalOpen(false)}
        onSuccess={newCourse => {
          onShowToast(`Course "${newCourse.title}" created successfully!`);
          setIsCreateCourseModalOpen(false);
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
};
