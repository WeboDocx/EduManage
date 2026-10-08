import React, { useState, useEffect, useMemo } from 'react';
import { ScreenType } from '../types';
import { useSidebar } from '../context/SidebarContext';
import { useActivityLog } from '../context/ActivityLogContext';
import {
  StudentsQuickFilterPanel,
  SESSION_QUICK_FILTER_KEY,
  QuickFilterPreferences,
} from './StudentsQuickFilterPanel';

export const DRAFT_ADD_STUDENT_KEY = 'edumanage_draft_add_student';
export const DRAFT_ADD_STUDENT_OPEN_KEY = 'edumanage_draft_add_student_open';

interface StudentsDirectoryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

interface StudentItem {
  id: string;
  name: string;
  phone: string;
  avatarBg: string;
  avatarText: string;
  avatarColor: string;
  enrollmentNo: string;
  admissionNo: string;
  grade: string;
  enrollmentDate: string; // YYYY-MM-DD format
  academicYear?: string;
  department?: string;
  course: string;
  batch: string;
  branch: string;
  status: 'Active' | 'Inactive' | 'Completed' | 'Dropped Out';
  statusBg: string;
  statusText: string;
  statusDot: string;
  feeType: 'due' | 'paid';
  feeBadgeBg: string;
  feeBadgeText: string;
  feeDotBg: string;
  feeLabel: string;
  feeSub: string;
  overdue?: boolean;
}

export const getStudentDepartment = (course?: string, department?: string): string => {
  if (department) return department;
  const c = (course || '').toLowerCase();
  if (c.includes('web') || c.includes('python') || c.includes('computer') || c.includes('code') || c.includes('ai')) {
    return 'Computer Science & IT';
  }
  if (c.includes('tally') || c.includes('gst') || c.includes('commerce') || c.includes('account')) {
    return 'Commerce & Accounting';
  }
  if (c.includes('marketing') || c.includes('digital') || c.includes('seo') || c.includes('media')) {
    return 'Digital Marketing & Media';
  }
  if (c.includes('design') || c.includes('graphic') || c.includes('ui') || c.includes('ux') || c.includes('art')) {
    return 'Design & Arts';
  }
  if (c.includes('english') || c.includes('spoken') || c.includes('language') || c.includes('comm')) {
    return 'Languages & Communication';
  }
  return 'General Academics';
};

export const getStudentAcademicYear = (enrollmentDate?: string, academicYear?: string): string => {
  if (academicYear) return academicYear;
  if (!enrollmentDate) return '2025-2026';
  const year = parseInt(enrollmentDate.slice(0, 4), 10);
  const month = parseInt(enrollmentDate.slice(5, 7), 10);
  if (year >= 2026) {
    return month >= 4 ? '2026-2027' : '2025-2026';
  }
  if (year === 2025) {
    return month >= 4 ? '2025-2026' : '2024-2025';
  }
  if (year === 2024) {
    return month >= 4 ? '2024-2025' : '2023-2024';
  }
  return `${year}-${year + 1}`;
};

export const formatEnrollmentDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

export const getGradeBadgeStyle = (grade: string) => {
  if (grade.includes('12')) {
    return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800/60';
  }
  if (grade.includes('11')) {
    return 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800/60';
  }
  if (grade.includes('10')) {
    return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60';
  }
  if (grade.includes('9')) {
    return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800/60';
  }
  return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/60';
};

const INITIAL_STUDENTS: StudentItem[] = [
  {
    id: 'std-1',
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    avatarBg: 'bg-primary-fixed',
    avatarText: 'text-primary',
    avatarColor: 'RK',
    enrollmentNo: 'ABC-SIL-26-00125',
    admissionNo: 'ADM-2026-00125',
    grade: 'Grade 11 (Science)',
    enrollmentDate: '2025-08-15',
    academicYear: '2025-2026',
    department: 'Computer Science & IT',
    course: 'Web Development',
    batch: 'WD Evening (Batch 02)',
    branch: 'Siliguri HQ',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'due',
    feeBadgeBg: 'bg-amber-100',
    feeBadgeText: 'text-amber-900',
    feeDotBg: 'bg-amber-500',
    feeLabel: 'Due ₹7,000',
    feeSub: 'Inv #9420',
  },
  {
    id: 'std-2',
    name: 'Priya Sengupta',
    phone: '+91 98321 65490',
    avatarBg: 'bg-secondary-container',
    avatarText: 'text-on-secondary-container',
    avatarColor: 'PS',
    enrollmentNo: 'ABC-BIN-26-00341',
    admissionNo: 'ADM-2026-00341',
    grade: 'Grade 12 (Commerce)',
    enrollmentDate: '2025-06-20',
    academicYear: '2025-2026',
    department: 'Digital Marketing & Media',
    course: 'Digital Marketing Pro',
    batch: 'DM Morning (Batch 01)',
    branch: 'Binnaguri Campus',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'paid',
    feeBadgeBg: 'bg-emerald-50',
    feeBadgeText: 'text-emerald-800',
    feeDotBg: 'bg-emerald-500',
    feeLabel: 'Paid Full',
    feeSub: '₹24,000 Settled',
  },
  {
    id: 'std-3',
    name: 'Amitav Roy',
    phone: '+91 94340 12876',
    avatarBg: 'bg-tertiary-fixed',
    avatarText: 'text-on-tertiary-fixed-variant',
    avatarColor: 'AR',
    enrollmentNo: 'ABC-JAL-26-00892',
    admissionNo: 'ADM-2026-00892',
    grade: 'Grade 10-A',
    enrollmentDate: '2025-09-01',
    academicYear: '2025-2026',
    department: 'Commerce & Accounting',
    course: 'Tally Prime & GST',
    batch: 'Tally Weekend (W1)',
    branch: 'Jalpaiguri Centre',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'paid',
    feeBadgeBg: 'bg-emerald-50',
    feeBadgeText: 'text-emerald-800',
    feeDotBg: 'bg-emerald-500',
    feeLabel: 'Paid Full',
    feeSub: '₹14,500 Settled',
  },
  {
    id: 'std-4',
    name: 'Ananya Bose',
    phone: '+91 97331 44521',
    avatarBg: 'bg-surface-container-highest',
    avatarText: 'text-on-surface',
    avatarColor: 'AB',
    enrollmentNo: 'ABC-SIL-26-00194',
    admissionNo: 'ADM-2026-00194',
    grade: 'Grade 12 (Arts)',
    enrollmentDate: '2025-07-08',
    academicYear: '2025-2026',
    department: 'Design & Arts',
    course: 'Graphic & UI Design',
    batch: 'GD Afternoon (Batch 03)',
    branch: 'Siliguri HQ',
    status: 'Inactive',
    statusBg: 'bg-surface-container',
    statusText: 'text-outline',
    statusDot: 'bg-outline',
    feeType: 'due',
    feeBadgeBg: 'bg-error-container/60',
    feeBadgeText: 'text-error',
    feeDotBg: 'bg-error',
    feeLabel: 'Due ₹12,000',
    feeSub: '32 Days Overdue',
    overdue: true,
  },
  {
    id: 'std-5',
    name: 'Mohammad Zeeshan',
    phone: '+91 98112 33455',
    avatarBg: 'bg-primary-fixed-dim',
    avatarText: 'text-primary',
    avatarColor: 'MZ',
    enrollmentNo: 'ABC-SIL-26-00210',
    admissionNo: 'ADM-2026-00210',
    grade: 'Higher Ed (Sem 6)',
    enrollmentDate: '2025-04-02',
    academicYear: '2025-2026',
    department: 'Computer Science & IT',
    course: 'Computer Fundamentals',
    batch: 'CF Morning (Batch 01)',
    branch: 'Siliguri HQ',
    status: 'Completed',
    statusBg: 'bg-surface-container-high',
    statusText: 'text-primary',
    statusDot: 'bg-primary',
    feeType: 'paid',
    feeBadgeBg: 'bg-emerald-50',
    feeBadgeText: 'text-emerald-800',
    feeDotBg: 'bg-emerald-500',
    feeLabel: 'Paid Full',
    feeSub: 'Cert #ED-7821',
  },
  {
    id: 'std-6',
    name: 'Tanusree Paul',
    phone: '+91 94741 89012',
    avatarBg: 'bg-surface-container',
    avatarText: 'text-secondary',
    avatarColor: 'TP',
    enrollmentNo: 'ABC-BIN-26-00415',
    admissionNo: 'ADM-2026-00415',
    grade: 'Grade 9-A',
    enrollmentDate: '2026-01-25',
    academicYear: '2025-2026',
    department: 'Languages & Communication',
    course: 'Spoken English & Comm.',
    batch: 'SE Evening (Batch 04)',
    branch: 'Binnaguri Campus',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'due',
    feeBadgeBg: 'bg-amber-100',
    feeBadgeText: 'text-amber-900',
    feeDotBg: 'bg-amber-500',
    feeLabel: 'Due ₹2,500',
    feeSub: 'Inv #9488',
  },
  {
    id: 'std-7',
    name: 'Devansh Mukherjee',
    phone: '+91 98302 99881',
    avatarBg: 'bg-primary-fixed',
    avatarText: 'text-primary',
    avatarColor: 'DM',
    enrollmentNo: 'ABC-SIL-26-00512',
    admissionNo: 'ADM-2026-00512',
    grade: 'Grade 12 (Science)',
    enrollmentDate: '2025-07-14',
    academicYear: '2025-2026',
    department: 'Computer Science & IT',
    course: 'Python & AI Data',
    batch: 'Morning (08:00 AM)',
    branch: 'Siliguri HQ',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'paid',
    feeBadgeBg: 'bg-emerald-50',
    feeBadgeText: 'text-emerald-800',
    feeDotBg: 'bg-emerald-500',
    feeLabel: 'Paid Full',
    feeSub: '₹32,000 Settled',
  },
  {
    id: 'std-8',
    name: 'Sneha Chakraborty',
    phone: '+91 94331 77665',
    avatarBg: 'bg-secondary-container',
    avatarText: 'text-on-secondary-container',
    avatarColor: 'SC',
    enrollmentNo: 'ABC-JAL-26-00633',
    admissionNo: 'ADM-2026-00633',
    grade: 'Grade 11 (Commerce)',
    enrollmentDate: '2025-08-22',
    academicYear: '2025-2026',
    department: 'Commerce & Accounting',
    course: 'Tally Prime & GST',
    batch: 'Evening (05:00 PM)',
    branch: 'Jalpaiguri Centre',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'due',
    feeBadgeBg: 'bg-amber-100',
    feeBadgeText: 'text-amber-900',
    feeDotBg: 'bg-amber-500',
    feeLabel: 'Due ₹4,000',
    feeSub: 'Inv #9512',
  },
  {
    id: 'std-9',
    name: 'Rohan Das',
    phone: '+91 97482 11447',
    avatarBg: 'bg-tertiary-fixed',
    avatarText: 'text-on-tertiary-fixed-variant',
    avatarColor: 'RD',
    enrollmentNo: 'ABC-SIL-26-00741',
    admissionNo: 'ADM-2026-00741',
    grade: 'Grade 10-B',
    enrollmentDate: '2026-01-10',
    academicYear: '2025-2026',
    department: 'Computer Science & IT',
    course: 'Computer Fundamentals',
    batch: 'Afternoon (01:00 PM)',
    branch: 'Siliguri HQ',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'paid',
    feeBadgeBg: 'bg-emerald-50',
    feeBadgeText: 'text-emerald-800',
    feeDotBg: 'bg-emerald-500',
    feeLabel: 'Paid Full',
    feeSub: '₹12,000 Settled',
  },
  {
    id: 'std-10',
    name: 'Meera Iyer',
    phone: '+91 98210 55667',
    avatarBg: 'bg-surface-container-highest',
    avatarText: 'text-on-surface',
    avatarColor: 'MI',
    enrollmentNo: 'ABC-BIN-26-00820',
    admissionNo: 'ADM-2026-00820',
    grade: 'Grade 9-B',
    enrollmentDate: '2026-02-05',
    academicYear: '2025-2026',
    department: 'Languages & Communication',
    course: 'Spoken English & Comm.',
    batch: 'Morning (08:00 AM)',
    branch: 'Binnaguri Campus',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'paid',
    feeBadgeBg: 'bg-emerald-50',
    feeBadgeText: 'text-emerald-800',
    feeDotBg: 'bg-emerald-500',
    feeLabel: 'Paid Full',
    feeSub: '₹18,500 Settled',
  },
  {
    id: 'std-11',
    name: 'Karan Verma',
    phone: '+91 98014 33221',
    avatarBg: 'bg-primary-fixed-dim',
    avatarText: 'text-primary',
    avatarColor: 'KV',
    enrollmentNo: 'ABC-SIL-26-00910',
    admissionNo: 'ADM-2026-00910',
    grade: 'Higher Ed (Sem 4)',
    enrollmentDate: '2025-04-18',
    academicYear: '2024-2025',
    department: 'Computer Science & IT',
    course: 'Web Development',
    batch: 'Weekend Intensive',
    branch: 'Siliguri HQ',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'due',
    feeBadgeBg: 'bg-amber-100',
    feeBadgeText: 'text-amber-900',
    feeDotBg: 'bg-amber-500',
    feeLabel: 'Due ₹6,500',
    feeSub: 'Inv #9530',
  },
  {
    id: 'std-12',
    name: 'Pooja Sharma',
    phone: '+91 97321 88990',
    avatarBg: 'bg-surface-container',
    avatarText: 'text-secondary',
    avatarColor: 'PS',
    enrollmentNo: 'ABC-COO-26-00995',
    admissionNo: 'ADM-2026-00995',
    grade: 'Grade 12 (Arts)',
    enrollmentDate: '2024-11-12',
    academicYear: '2024-2025',
    department: 'Design & Arts',
    course: 'Graphic & UI Design',
    batch: 'Afternoon (01:00 PM)',
    branch: 'Cooch Behar',
    status: 'Completed',
    statusBg: 'bg-surface-container-high',
    statusText: 'text-primary',
    statusDot: 'bg-primary',
    feeType: 'paid',
    feeBadgeBg: 'bg-emerald-50',
    feeBadgeText: 'text-emerald-800',
    feeDotBg: 'bg-emerald-500',
    feeLabel: 'Paid Full',
    feeSub: 'Cert #ED-7904',
  },
  {
    id: 'std-13',
    name: 'Arjun Singhania',
    phone: '+91 98110 55432',
    avatarBg: 'bg-surface-container-highest',
    avatarText: 'text-error',
    avatarColor: 'AS',
    enrollmentNo: 'ABC-MAL-26-01042',
    admissionNo: 'ADM-2025-01042',
    grade: 'Grade 11 (Commerce)',
    enrollmentDate: '2024-09-15',
    academicYear: '2024-2025',
    department: 'Computer Science & IT',
    course: 'Web Development',
    batch: 'WD Weekend (Batch 01)',
    branch: 'Malbazar Hub',
    status: 'Dropped Out',
    statusBg: 'bg-error-container/40',
    statusText: 'text-error',
    statusDot: 'bg-error',
    feeType: 'due',
    feeBadgeBg: 'bg-error-container/60',
    feeBadgeText: 'text-error',
    feeDotBg: 'bg-error',
    feeLabel: 'Unsettled ₹5,000',
    feeSub: 'Discontinued',
    overdue: true,
  },
  {
    id: 'std-14',
    name: 'Ishita Majumder',
    phone: '+91 97490 22314',
    avatarBg: 'bg-primary-fixed',
    avatarText: 'text-primary',
    avatarColor: 'IM',
    enrollmentNo: 'ABC-SIL-27-01180',
    admissionNo: 'ADM-2026-01180',
    grade: 'Grade 12 (Arts)',
    enrollmentDate: '2026-04-10',
    academicYear: '2026-2027',
    department: 'Digital Marketing & Media',
    course: 'Digital Marketing Pro',
    batch: 'DM Morning (Batch 02)',
    branch: 'Siliguri HQ',
    status: 'Active',
    statusBg: 'bg-secondary-container/40',
    statusText: 'text-on-secondary-container',
    statusDot: 'bg-secondary',
    feeType: 'paid',
    feeBadgeBg: 'bg-emerald-50',
    feeBadgeText: 'text-emerald-800',
    feeDotBg: 'bg-emerald-500',
    feeLabel: 'Paid Full',
    feeSub: '₹22,000 Early Bird',
  },
  {
    id: 'std-15',
    name: 'Deepak Ghosh',
    phone: '+91 94320 88712',
    avatarBg: 'bg-secondary-fixed',
    avatarText: 'text-secondary',
    avatarColor: 'DG',
    enrollmentNo: 'ABC-JAL-26-01205',
    admissionNo: 'ADM-2026-01205',
    grade: 'Grade 10-A',
    enrollmentDate: '2025-10-05',
    academicYear: '2025-2026',
    department: 'Commerce & Accounting',
    course: 'Tally Prime & GST',
    batch: 'Evening (05:00 PM)',
    branch: 'Jalpaiguri Centre',
    status: 'Inactive',
    statusBg: 'bg-surface-container',
    statusText: 'text-outline',
    statusDot: 'bg-outline',
    feeType: 'due',
    feeBadgeBg: 'bg-amber-100',
    feeBadgeText: 'text-amber-900',
    feeDotBg: 'bg-amber-500',
    feeLabel: 'Due ₹3,500',
    feeSub: 'Inv #9562',
  },
];

export const StudentsDirectoryScreen: React.FC<StudentsDirectoryScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { logAdministrativeAction } = useActivityLog();
  const [students, setStudents] = useState<StudentItem[]>(INITIAL_STUDENTS);
  const [selectedIds, setSelectedIds] = useState<string[]>(['std-1', 'std-2', 'std-3']);
  
  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'name' | 'id' | 'grade' | 'date'>('all');
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All Dates');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [selectedBatch, setSelectedBatch] = useState('All Batches');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSession, setSelectedSession] = useState('2025-2026');
  const [activeFacetStatus, setActiveFacetStatus] = useState<string | null>(null);
  const [activeFacetSession, setActiveFacetSession] = useState<string | null>('2025-26');

  // Quick Filter State (with local session persistence)
  const [quickAcademicYear, setQuickAcademicYear] = useState<string>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_QUICK_FILTER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.academicYear) return parsed.academicYear;
      }
    } catch {}
    return 'All Academic Years';
  });

  const [quickDepartment, setQuickDepartment] = useState<string>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_QUICK_FILTER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.department) return parsed.department;
      }
    } catch {}
    return 'All Departments';
  });

  const [quickStatus, setQuickStatus] = useState<string>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_QUICK_FILTER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.status) return parsed.status;
      }
    } catch {}
    return 'All Statuses';
  });

  const [isQuickFilterExpanded, setIsQuickFilterExpanded] = useState<boolean>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_QUICK_FILTER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.isPanelExpanded === 'boolean') return parsed.isPanelExpanded;
      }
    } catch {}
    return true;
  });

  const [lastSavedSessionTime, setLastSavedSessionTime] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(SESSION_QUICK_FILTER_KEY)
        ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : null;
    } catch {
      return null;
    }
  });

  // Automatically save preferences to sessionStorage whenever any quick filter or panel state changes
  useEffect(() => {
    try {
      const payload: QuickFilterPreferences = {
        academicYear: quickAcademicYear,
        department: quickDepartment,
        status: quickStatus,
        isPanelExpanded: isQuickFilterExpanded,
      };
      sessionStorage.setItem(SESSION_QUICK_FILTER_KEY, JSON.stringify(payload));
      setLastSavedSessionTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.warn('Could not save quick filter preferences to session storage', err);
    }
  }, [quickAcademicYear, quickDepartment, quickStatus, isQuickFilterExpanded]);

  // Dynamic distribution counts for Quick Filter chips
  const academicYearCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Academic Years': students.length,
      '2026-2027': 0,
      '2025-2026': 0,
      '2024-2025': 0,
      '2023-2024': 0,
    };
    students.forEach(s => {
      const ay = s.academicYear || getStudentAcademicYear(s.enrollmentDate);
      if (counts[ay] !== undefined) {
        counts[ay]++;
      } else if (ay.includes('2025') || s.enrollmentDate.startsWith('2025')) {
        counts['2025-2026']++;
      } else if (ay.includes('2024') || s.enrollmentDate.startsWith('2024')) {
        counts['2024-2025']++;
      } else if (ay.includes('2026') || s.enrollmentDate.startsWith('2026')) {
        counts['2026-2027']++;
      }
    });
    return counts;
  }, [students]);

  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Departments': students.length,
      'Computer Science & IT': 0,
      'Commerce & Accounting': 0,
      'Digital Marketing & Media': 0,
      'Design & Arts': 0,
      'Languages & Communication': 0,
    };
    students.forEach(s => {
      const dept = s.department || getStudentDepartment(s.course);
      if (counts[dept] !== undefined) {
        counts[dept]++;
      }
    });
    return counts;
  }, [students]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Statuses': students.length,
      'Active': 0,
      'Inactive': 0,
      'Completed': 0,
      'Dropped Out': 0,
    };
    students.forEach(s => {
      if (counts[s.status] !== undefined) {
        counts[s.status]++;
      }
    });
    return counts;
  }, [students]);

  const handleResetQuickFilters = () => {
    setQuickAcademicYear('All Academic Years');
    setQuickDepartment('All Departments');
    setQuickStatus('All Statuses');
    try {
      sessionStorage.setItem(
        SESSION_QUICK_FILTER_KEY,
        JSON.stringify({
          academicYear: 'All Academic Years',
          department: 'All Departments',
          status: 'All Statuses',
          isPanelExpanded: isQuickFilterExpanded,
        })
      );
      setLastSavedSessionTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {}
    onShowToast('Quick filters reset to show all students.');
  };

  const handleClearSessionPreferences = () => {
    try {
      sessionStorage.removeItem(SESSION_QUICK_FILTER_KEY);
      setLastSavedSessionTime(null);
    } catch {}
    setQuickAcademicYear('All Academic Years');
    setQuickDepartment('All Departments');
    setQuickStatus('All Statuses');
    onShowToast('Session filter preferences cleared from local memory.');
  };

  // Modals state
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(() => {
    try {
      return localStorage.getItem(DRAFT_ADD_STUDENT_OPEN_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isAddStudentDraftRestored, setIsAddStudentDraftRestored] = useState(false);
  const [addStudentLastSavedTime, setAddStudentLastSavedTime] = useState<string | null>(null);

  const [isBulkIdModalOpen, setIsBulkIdModalOpen] = useState(false);
  const [isBulkMessageModalOpen, setIsBulkMessageModalOpen] = useState(false);
  const [isChangeBatchModalOpen, setIsChangeBatchModalOpen] = useState(false);
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null);

  // CSV Export Modal & Settings State
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportScope, setExportScope] = useState<'filtered' | 'full' | 'selected'>('filtered');
  const [exportReportFormat, setExportReportFormat] = useState<'comprehensive' | 'academic' | 'financial'>('comprehensive');
  const [includeMetadataHeader, setIncludeMetadataHeader] = useState(true);
  const [exportDropdownLocation, setExportDropdownLocation] = useState<'header' | 'page' | 'filter' | null>(null);

  // Add student form state
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('Grade 11 (Science)');
  const [newStudentEnrollmentDate, setNewStudentEnrollmentDate] = useState('2026-02-15');
  const [newStudentCourse, setNewStudentCourse] = useState('Web Development');
  const [newStudentBranch, setNewStudentBranch] = useState('Siliguri HQ');
  const [newStudentBatch, setNewStudentBatch] = useState('WD Evening (Batch 02)');
  const [newStudentFeeStatus, setNewStudentFeeStatus] = useState<'due' | 'paid'>('paid');
  const [newStudentFeeAmount, setNewStudentFeeAmount] = useState('18000');

  // Restore student draft on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_ADD_STUDENT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasData =
          (parsed.name && parsed.name.trim() !== '') ||
          (parsed.phone && parsed.phone.trim() !== '') ||
          (parsed.feeAmount && parsed.feeAmount !== '18000') ||
          (parsed.course && parsed.course !== 'Web Development') ||
          (parsed.branch && parsed.branch !== 'Siliguri HQ');

        if (hasData) {
          if (parsed.name !== undefined) setNewStudentName(parsed.name);
          if (parsed.phone !== undefined) setNewStudentPhone(parsed.phone);
          if (parsed.grade !== undefined) setNewStudentGrade(parsed.grade);
          if (parsed.enrollmentDate !== undefined) setNewStudentEnrollmentDate(parsed.enrollmentDate);
          if (parsed.course !== undefined) setNewStudentCourse(parsed.course);
          if (parsed.branch !== undefined) setNewStudentBranch(parsed.branch);
          if (parsed.batch !== undefined) setNewStudentBatch(parsed.batch);
          if (parsed.feeStatus !== undefined) setNewStudentFeeStatus(parsed.feeStatus);
          if (parsed.feeAmount !== undefined) setNewStudentFeeAmount(parsed.feeAmount);
          setIsAddStudentDraftRestored(true);
          if (parsed.lastSaved) setAddStudentLastSavedTime(parsed.lastSaved);
        }
      }
    } catch (err) {
      console.warn('Failed to restore student draft:', err);
    }
  }, []);

  // Track modal open state in localStorage
  useEffect(() => {
    try {
      if (isAddStudentModalOpen) {
        localStorage.setItem(DRAFT_ADD_STUDENT_OPEN_KEY, 'true');
      } else {
        localStorage.removeItem(DRAFT_ADD_STUDENT_OPEN_KEY);
      }
    } catch {}
  }, [isAddStudentModalOpen]);

  // Immediate save on browser beforeunload (refresh, tab close)
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const hasContent =
          newStudentName.trim() !== '' ||
          newStudentPhone.trim() !== '' ||
          newStudentFeeAmount !== '18000' ||
          newStudentBranch !== 'Siliguri HQ' ||
          newStudentCourse !== 'Web Development';

        if (hasContent) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const draftData = {
            name: newStudentName,
            phone: newStudentPhone,
            grade: newStudentGrade,
            enrollmentDate: newStudentEnrollmentDate,
            course: newStudentCourse,
            branch: newStudentBranch,
            batch: newStudentBatch,
            feeStatus: newStudentFeeStatus,
            feeAmount: newStudentFeeAmount,
            lastSaved: timeStr,
          };
          localStorage.setItem(DRAFT_ADD_STUDENT_KEY, JSON.stringify(draftData));
          if (isAddStudentModalOpen) {
            localStorage.setItem(DRAFT_ADD_STUDENT_OPEN_KEY, 'true');
          }
        }
      } catch (err) {
        console.warn('Failed to save student draft on beforeunload:', err);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [
    newStudentName,
    newStudentPhone,
    newStudentGrade,
    newStudentEnrollmentDate,
    newStudentCourse,
    newStudentBranch,
    newStudentBatch,
    newStudentFeeStatus,
    newStudentFeeAmount,
    isAddStudentModalOpen,
  ]);

  // Debounced auto-save effect
  useEffect(() => {
    const hasContent =
      newStudentName.trim() !== '' ||
      newStudentPhone.trim() !== '' ||
      newStudentFeeAmount !== '18000' ||
      newStudentBranch !== 'Siliguri HQ' ||
      newStudentCourse !== 'Web Development';

    if (!hasContent) return;

    const timer = setTimeout(() => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const draftData = {
          name: newStudentName,
          phone: newStudentPhone,
          grade: newStudentGrade,
          enrollmentDate: newStudentEnrollmentDate,
          course: newStudentCourse,
          branch: newStudentBranch,
          batch: newStudentBatch,
          feeStatus: newStudentFeeStatus,
          feeAmount: newStudentFeeAmount,
          lastSaved: timeStr,
        };
        localStorage.setItem(DRAFT_ADD_STUDENT_KEY, JSON.stringify(draftData));
        setAddStudentLastSavedTime(timeStr);
      } catch (err) {
        console.warn('Failed to auto-save student draft:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [
    newStudentName,
    newStudentPhone,
    newStudentGrade,
    newStudentEnrollmentDate,
    newStudentCourse,
    newStudentBranch,
    newStudentBatch,
    newStudentFeeStatus,
    newStudentFeeAmount,
  ]);

  const handleDiscardStudentDraft = () => {
    try {
      localStorage.removeItem(DRAFT_ADD_STUDENT_KEY);
      localStorage.removeItem(DRAFT_ADD_STUDENT_OPEN_KEY);
    } catch {}
    setNewStudentName('');
    setNewStudentPhone('');
    setNewStudentGrade('Grade 11 (Science)');
    setNewStudentEnrollmentDate('2026-02-15');
    setNewStudentCourse('Web Development');
    setNewStudentBranch('Siliguri HQ');
    setNewStudentBatch('WD Evening (Batch 02)');
    setNewStudentFeeStatus('paid');
    setNewStudentFeeAmount('18000');
    setIsAddStudentDraftRestored(false);
    setAddStudentLastSavedTime(null);
    onShowToast('Student draft discarded.');
  };

  // Bulk message text
  const [bulkMessageText, setBulkMessageText] = useState('Dear Student, this is an official announcement from Apex Tech Institute.');

  // Robust Multi-Factor Real-time Filtering Logic (Name, ID, Grade Level, Date, etc.)
  const filteredStudents = students.filter(s => {
    // 1. Real-time Search Query with Name, ID, Grade, Date support
    const query = searchQuery.trim().toLowerCase();
    let matchesSearch = true;
    if (query) {
      const nameMatch = s.name.toLowerCase().includes(query);
      const gradeMatch = s.grade.toLowerCase().includes(query);
      const idMatch =
        s.id.toLowerCase().includes(query) ||
        s.enrollmentNo.toLowerCase().includes(query) ||
        s.admissionNo.toLowerCase().includes(query);
      const formattedDate = formatEnrollmentDate(s.enrollmentDate).toLowerCase();
      const rawDateMatch = s.enrollmentDate.toLowerCase().includes(query);
      const dateMatch = rawDateMatch || formattedDate.includes(query);

      if (searchScope === 'name') {
        matchesSearch = nameMatch;
      } else if (searchScope === 'id') {
        matchesSearch = idMatch;
      } else if (searchScope === 'grade') {
        matchesSearch = gradeMatch;
      } else if (searchScope === 'date') {
        matchesSearch = dateMatch;
      } else {
        const otherMatch =
          s.phone.includes(query) ||
          s.course.toLowerCase().includes(query) ||
          s.batch.toLowerCase().includes(query) ||
          s.branch.toLowerCase().includes(query);
        matchesSearch = nameMatch || idMatch || gradeMatch || dateMatch || otherMatch;
      }
    }

    // 2. Grade Filter
    const matchesGrade =
      selectedGrade === 'All Grades' ||
      s.grade.toLowerCase().includes(selectedGrade.toLowerCase());

    // 3. Enrollment Date Filter
    let matchesDate = true;
    if (selectedDateFilter === '2026') {
      matchesDate = s.enrollmentDate.startsWith('2026');
    } else if (selectedDateFilter === '2025') {
      matchesDate = s.enrollmentDate.startsWith('2025');
    } else if (selectedDateFilter === 'Last 30 Days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesDate = new Date(s.enrollmentDate) >= thirtyDaysAgo;
    } else if (selectedDateFilter === 'Last 90 Days') {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      matchesDate = new Date(s.enrollmentDate) >= ninetyDaysAgo;
    } else if (selectedDateFilter === 'Custom Range') {
      if (customStartDate && s.enrollmentDate < customStartDate) matchesDate = false;
      if (customEndDate && s.enrollmentDate > customEndDate) matchesDate = false;
    }

    // 4. Branch, Course, Status
    const matchesBranch = selectedBranch === 'All Branches' || s.branch === selectedBranch;
    const matchesCourse = selectedCourse === 'All Courses' || s.course.toLowerCase().includes(selectedCourse.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All Status'
        ? activeFacetStatus
          ? s.status === activeFacetStatus
          : true
        : s.status.toLowerCase().includes(selectedStatus.toLowerCase());

    // 5. Quick Filter: Academic Year
    const studentAY = s.academicYear || getStudentAcademicYear(s.enrollmentDate);
    let matchesAcademicYear = true;
    if (quickAcademicYear !== 'All Academic Years') {
      matchesAcademicYear =
        studentAY === quickAcademicYear ||
        (quickAcademicYear === '2025-2026' && (studentAY.includes('2025') || s.enrollmentDate.startsWith('2025') || s.enrollmentDate.startsWith('2026-01') || s.enrollmentDate.startsWith('2026-02'))) ||
        (quickAcademicYear === '2024-2025' && (studentAY.includes('2024') || s.enrollmentDate.startsWith('2024'))) ||
        (quickAcademicYear === '2026-2027' && (studentAY.includes('2026-2027') || s.enrollmentDate >= '2026-04-01')) ||
        (quickAcademicYear === '2023-2024' && (studentAY.includes('2023') || s.enrollmentDate.startsWith('2023')));
    }

    // 6. Quick Filter: Department
    const studentDept = s.department || getStudentDepartment(s.course);
    const matchesDepartment =
      quickDepartment === 'All Departments' ||
      studentDept === quickDepartment;

    // 7. Quick Filter: Status
    const matchesQuickStatus =
      quickStatus === 'All Statuses' ||
      s.status.toLowerCase() === quickStatus.toLowerCase();

    return (
      matchesSearch &&
      matchesGrade &&
      matchesDate &&
      matchesBranch &&
      matchesCourse &&
      matchesStatus &&
      matchesAcademicYear &&
      matchesDepartment &&
      matchesQuickStatus
    );
  });

  const isAllSelected =
    filteredStudents.length > 0 &&
    filteredStudents.every(s => selectedIds.includes(s.id));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      // Unselect all
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map(s => s.id));
    }
  };

  const handleToggleStudent = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
    onShowToast('Cleared student selection.');
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const initials = newStudentName
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'ST';

    const count = students.length + 125;
    const newStd: StudentItem = {
      id: `std-${Date.now()}`,
      name: newStudentName,
      phone: newStudentPhone || '+91 98000 11223',
      avatarBg: 'bg-primary-fixed',
      avatarText: 'text-primary',
      avatarColor: initials,
      enrollmentNo: `ABC-${newStudentBranch.slice(0, 3).toUpperCase()}-26-00${count}`,
      admissionNo: `ADM-2026-00${count}`,
      grade: newStudentGrade,
      enrollmentDate: newStudentEnrollmentDate || new Date().toISOString().split('T')[0],
      academicYear: getStudentAcademicYear(newStudentEnrollmentDate),
      department: getStudentDepartment(newStudentCourse),
      course: newStudentCourse,
      batch: newStudentBatch,
      branch: newStudentBranch,
      status: 'Active',
      statusBg: 'bg-secondary-container/40',
      statusText: 'text-on-secondary-container',
      statusDot: 'bg-secondary',
      feeType: newStudentFeeStatus,
      feeBadgeBg: newStudentFeeStatus === 'paid' ? 'bg-emerald-50' : 'bg-amber-100',
      feeBadgeText: newStudentFeeStatus === 'paid' ? 'text-emerald-800' : 'text-amber-900',
      feeDotBg: newStudentFeeStatus === 'paid' ? 'bg-emerald-500' : 'bg-amber-500',
      feeLabel: newStudentFeeStatus === 'paid' ? 'Paid Full' : `Due ₹${Number(newStudentFeeAmount).toLocaleString('en-IN')}`,
      feeSub: newStudentFeeStatus === 'paid' ? '₹' + Number(newStudentFeeAmount).toLocaleString('en-IN') + ' Settled' : 'Inv #' + Math.floor(9500 + Math.random() * 200),
    };

    setStudents([newStd, ...students]);
    setSelectedIds(prev => [newStd.id, ...prev]);

    // Commit action to audit trail
    logAdministrativeAction({
      action: 'Student Added',
      target: newStudentName.trim(),
      targetId: newStd.admissionNo,
      category: 'students',
      campus: `${newStudentBranch} Campus`,
      details: `Registered into ${newStudentCourse} (${newStudentBatch}). Initial status: Active. Fee status: ${newStudentFeeStatus}.`,
      actor: 'Sarah Jenkins',
      actorRole: 'Registrar',
      metadata: {
        admissionNo: newStd.admissionNo,
        enrollmentNo: newStd.enrollmentNo,
        department: newStd.department,
        academicYear: newStd.academicYear,
        course: newStudentCourse,
      },
      screenTarget: 'students-directory',
    });

    // Clear saved draft from localStorage
    try {
      localStorage.removeItem(DRAFT_ADD_STUDENT_KEY);
      localStorage.removeItem(DRAFT_ADD_STUDENT_OPEN_KEY);
    } catch {}
    setIsAddStudentDraftRestored(false);
    setAddStudentLastSavedTime(null);

    setIsAddStudentModalOpen(false);
    setNewStudentName('');
    setNewStudentPhone('');
    setNewStudentGrade('Grade 11 (Science)');
    setNewStudentEnrollmentDate('2026-02-15');
    setNewStudentCourse('Web Development');
    setNewStudentBranch('Siliguri HQ');
    setNewStudentBatch('WD Evening (Batch 02)');
    setNewStudentFeeStatus('paid');
    setNewStudentFeeAmount('18000');
    onShowToast(`Student ${newStudentName} registered successfully and logged to audit trail!`);
  };

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    setStudents(prev =>
      prev.map(s => (s.id === editingStudent.id ? editingStudent : s))
    );

    logAdministrativeAction({
      action: 'Student Status Changed',
      target: editingStudent.name,
      targetId: editingStudent.admissionNo,
      category: 'students',
      campus: editingStudent.branch,
      details: `Student profile updated. Current status: ${editingStudent.status}. Course: ${editingStudent.course}.`,
      actor: 'Academic Registrar',
      actorRole: 'Administrative Officer',
      metadata: {
        studentId: editingStudent.id,
        status: editingStudent.status,
      },
      screenTarget: 'students-directory',
    });

    setIsEditStudentModalOpen(false);
    onShowToast(`Updated student profile for ${editingStudent.name} and logged to audit trail.`);
  };

  const handleExportCSV = (
    scope: 'filtered' | 'full' | 'selected' = exportScope,
    format: 'comprehensive' | 'academic' | 'financial' = exportReportFormat,
    withMeta: boolean = includeMetadataHeader
  ) => {
    let targetList: StudentItem[] = [];
    let scopeSlug = 'Current_Filtered_View';
    let scopeHuman = 'Current Filtered View';

    if (scope === 'selected') {
      targetList = students.filter(s => selectedIds.includes(s.id));
      scopeSlug = 'Selected_Students';
      scopeHuman = `Selected Students (${targetList.length})`;
      if (targetList.length === 0) {
        onShowToast('No students currently selected in the table to export.');
        return;
      }
    } else if (scope === 'full') {
      targetList = students;
      scopeSlug = 'Full_Directory';
      scopeHuman = `Full Directory (All ${students.length} Students)`;
      if (targetList.length === 0) {
        onShowToast('Students directory has no records to export.');
        return;
      }
    } else {
      targetList = filteredStudents;
      scopeSlug = 'Filtered_View';
      scopeHuman = `Current Filtered View (${filteredStudents.length} Students)`;
      if (targetList.length === 0) {
        onShowToast('No student records match the current filters to export.');
        return;
      }
    }

    let headers: string[] = [];
    let rowExtractor: (s: StudentItem) => (string | number)[];

    if (format === 'academic') {
      headers = [
        'Student ID',
        'Enrollment Number',
        'Admission Number',
        'Student Full Name',
        'Contact Phone',
        'Campus Branch',
        'Course Name',
        'Batch Schedule',
        'Grade / Class',
        'Enrollment Date',
        'Academic Status'
      ];
      rowExtractor = s => [
        s.id,
        s.enrollmentNo || '',
        s.admissionNo || '',
        s.name,
        s.phone || '',
        s.branch,
        s.course,
        s.batch,
        s.grade,
        s.enrollmentDate,
        s.status
      ];
    } else if (format === 'financial') {
      headers = [
        'Student ID',
        'Admission Number',
        'Student Full Name',
        'Contact Phone',
        'Campus Branch',
        'Course Name',
        'Fee Status',
        'Fee Details / Amount',
        'Invoice / Voucher Reference',
        'Overdue Alert'
      ];
      rowExtractor = s => [
        s.id,
        s.admissionNo || '',
        s.name,
        s.phone || '',
        s.branch,
        s.course,
        s.feeType.toUpperCase(),
        s.feeLabel,
        s.feeSub,
        s.overdue ? 'YES' : 'NO'
      ];
    } else {
      // Comprehensive default
      headers = [
        'Student ID',
        'Admission Number',
        'Enrollment Number',
        'Student Full Name',
        'Contact Phone',
        'Academic Year',
        'Department',
        'Grade / Class',
        'Enrollment Date',
        'Campus Branch',
        'Course Name',
        'Batch Schedule',
        'Academic Status',
        'Fee Status',
        'Fee Balance / Details',
        'Invoice / Reference Number'
      ];
      rowExtractor = s => [
        s.id,
        s.admissionNo || '',
        s.enrollmentNo || '',
        s.name,
        s.phone || '',
        s.academicYear || getStudentAcademicYear(s.enrollmentDate),
        s.department || getStudentDepartment(s.course),
        s.grade,
        s.enrollmentDate,
        s.branch,
        s.course,
        s.batch,
        s.status,
        s.feeType === 'paid' ? 'PAID FULL' : 'DUE',
        s.feeLabel,
        s.feeSub
      ];
    }

    const headerLine = headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n';
    const rows = targetList
      .map(s => {
        const fields = rowExtractor(s);
        return fields.map(val => `"${String(val ?? '').replace(/"/g, '""')}"`).join(',');
      })
      .join('\n');

    let metaPrefix = '';
    if (withMeta) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const activeFilterList = [
        selectedBranch !== 'All Branches' ? `Branch: ${selectedBranch}` : null,
        selectedGrade !== 'All Grades' ? `Grade: ${selectedGrade}` : null,
        selectedCourse !== 'All Courses' ? `Course: ${selectedCourse}` : null,
        selectedStatus !== 'All Status' ? `Status: ${selectedStatus}` : null,
        quickAcademicYear !== 'All Academic Years' ? `Quick AY: ${quickAcademicYear}` : null,
        quickDepartment !== 'All Departments' ? `Quick Dept: ${quickDepartment}` : null,
        quickStatus !== 'All Statuses' ? `Quick Status: ${quickStatus}` : null,
        selectedDateFilter !== 'All Dates' ? `Date: ${selectedDateFilter}` : null,
        searchQuery ? `Search: "${searchQuery}"` : null
      ].filter(Boolean);

      metaPrefix = [
        `# =========================================================================`,
        `# EDUMANAGE ENTERPRISE — OFFICIAL STUDENTS DIRECTORY OFFLINE REPORT`,
        `# Scope: ${scopeHuman}`,
        `# Generated On: ${dateStr} at ${timeStr}`,
        `# Total Records in Export: ${targetList.length} of ${students.length} total students`,
        `# Filters Applied: ${activeFilterList.length > 0 ? activeFilterList.join(' | ') : 'None (Full List)'}`,
        `# Report Profile: ${format.toUpperCase()}`,
        `# Compatibility: UTF-8 BOM encoded for Microsoft Excel, Google Sheets, LibreOffice`,
        `# =========================================================================`,
        ''
      ].join('\n');
    }

    const csvContent = '\uFEFF' + metaPrefix + headerLine + rows; // UTF-8 BOM for Excel compatibility
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const nowStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `EduManage_Students_${scopeSlug}_${nowStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast(`Exported ${targetList.length} student record${targetList.length === 1 ? '' : 's'} (${scope === 'full' ? 'Full Directory' : 'Filtered View'}) to CSV!`);
    setIsExportModalOpen(false);
    setExportDropdownLocation(null);
  };

  const handlePrintDirectory = () => {
    onShowToast(`Preparing printer-friendly directory (${filteredStudents.length} students)...`);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSearchScope('all');
    setSelectedGrade('All Grades');
    setSelectedDateFilter('All Dates');
    setCustomStartDate('');
    setCustomEndDate('');
    setSelectedBranch('All Branches');
    setSelectedCourse('All Courses');
    setSelectedBatch('All Batches');
    setSelectedStatus('All Status');
    setSelectedSession('2025-2026');
    setActiveFacetStatus(null);
    setActiveFacetSession(null);
    setQuickAcademicYear('All Academic Years');
    setQuickDepartment('All Departments');
    setQuickStatus('All Statuses');
    try {
      sessionStorage.setItem(
        SESSION_QUICK_FILTER_KEY,
        JSON.stringify({
          academicYear: 'All Academic Years',
          department: 'All Departments',
          status: 'All Statuses',
          isPanelExpanded: isQuickFilterExpanded,
        })
      );
      setLastSavedSessionTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch {}
    onShowToast('Filters reset to show all students.');
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
        className={`fixed left-0 top-12 bottom-0 w-[260px] bg-surface-container-lowest border-r border-outline-variant/40 z-50 flex flex-col justify-between shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out ${
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
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
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

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md">
            {/* Dashboard */}
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

            {/* Students (CURRENT ACTIVE CATEGORY) */}
            <div className="space-y-1">
              <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                Students
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('students-directory')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 transition-all bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-sm text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-white">group</span>
                  <span className="font-body-md text-body-md">All Students</span>
                </button>
                <button
                  onClick={() => setIsAddStudentModalOpen(true)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">person_add</span>
                  <span className="font-body-md text-body-md">Add Student</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('student-profile');
                    onShowToast('Showing Student KYC documents archive.');
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">folder_shared</span>
                  <span className="font-body-md text-body-md">Documents</span>
                </button>
                <button
                  onClick={() => {
                    setIsBulkIdModalOpen(true);
                  }}
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
                  onClick={() => onNavigate('courses-batches')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">auto_stories</span>
                  <span className="font-body-md text-body-md">Subjects</span>
                </button>
                <button
                  onClick={() => onShowToast('Academic Timetable: Live schedules across 8 branches.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">calendar_month</span>
                  <span className="font-body-md text-body-md">Timetable</span>
                </button>
                <button
                  onClick={() => onShowToast('Assignments module')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">task</span>
                  <span className="font-body-md text-body-md">Assignments</span>
                </button>
                <button
                  onClick={() => onShowToast('Exams & Results ledger')}
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
                  onClick={() => onShowToast('Biometric RFID Turnstiles active')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">fingerprint</span>
                  <span className="font-body-md text-body-md">Biometric &amp; RFID</span>
                </button>
                <button
                  onClick={() => onShowToast('Manual attendance sheet')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">checklist</span>
                  <span className="font-body-md text-body-md">Manual Marking</span>
                </button>
                <button
                  onClick={() => onShowToast('Leave requests portal')}
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
                  onClick={() => onShowToast('Fee Structure matrix')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">account_balance_wallet</span>
                  <span className="font-body-md text-body-md">Fee Structure</span>
                </button>
                <button
                  onClick={() => onShowToast('Quick Fee Collection POS')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">point_of_sale</span>
                  <span className="font-body-md text-body-md">Collect Fee</span>
                </button>
                <button
                  onClick={() => onShowToast('Payments ledger')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">payments</span>
                  <span className="font-body-md text-body-md">Payments</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus('Active');
                    setActiveFacetStatus('Active');
                    onShowToast('Filtered students with pending dues.');
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">pending_actions</span>
                  <span className="font-body-md text-body-md">Due Fees</span>
                </button>
                <button
                  onClick={() => onShowToast('Invoices & Receipts')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">receipt_long</span>
                  <span className="font-body-md text-body-md">Invoices &amp; Receipts</span>
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
                  onClick={() => setIsBulkMessageModalOpen(true)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">campaign</span>
                  <span className="font-body-md text-body-md">Communication</span>
                </button>
                <button
                  onClick={() => onShowToast('8 Campuses Topology active')}
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
                onClick={() => onShowToast('Institute switcher active')}
              >
                <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              </button>
            </div>
            <button
              onClick={() => onNavigate('landing')}
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
        {/* RESPONSIVE TOP HEADER (Sticky below global navigation) */}
        <header className="sticky top-12 z-30 h-14 sm:h-16 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/40 flex items-center justify-between px-3 sm:px-space-lg shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out">
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

            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <img
                alt="Brand logo"
                className="h-8 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                src="https://lh3.googleusercontent.com/aida/AEtjO1U-QhXESZEr_12u3oOW5wW6fVviAeAnkqC1YVMGXeEyDfiGfPHbkLv6gWOnkG7NCoQAvoMRvaD0VROU-wSN3jk9aE8NgN293_R6RLzmwi8pqgkH1wOL9xza5gs9BYtbTZgBkeAsNR4X76D1FOVvi4MLsvpeFcoX9epNVK5yx47Riyg60tGb6b9IPb-XWADgLIvIiAefmbdsx0P-4DOQL-MvN6hAVyB5f3uk0YcVmbGkecLG3pgNgtWkBqM"
                onClick={() => onNavigate('dashboard')}
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
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 rounded-lg text-left transition-colors cursor-pointer"
                type="button"
                onClick={() => {
                  setSelectedBranch('All Branches');
                  onShowToast('Viewing aggregated view of all 8 branches.');
                }}
              >
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-label-sm text-[10px] text-outline leading-none uppercase">Campus View</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                    {selectedBranch === 'All Branches' ? 'All Branches (8 Active)' : selectedBranch}
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </span>
                </div>
                <span className="sm:hidden text-xs font-semibold text-on-surface">
                  {selectedBranch === 'All Branches' ? '8 Campuses' : selectedBranch.split(' ')[0]}
                </span>
              </button>
            </div>

            {/* Global Search Bar */}
            <div className="relative w-72 lg:w-96 hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                search
              </span>
              <input
                className="w-full h-9 pl-9 pr-14 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="Search name, student ID, grade level..."
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-0.5 text-outline hover:text-on-surface cursor-pointer rounded"
                    title="Clear search"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                  </button>
                )}
                <span className="hidden sm:inline-block px-1 py-0.2 rounded border border-outline-variant/60 text-[9px] font-data-mono text-outline">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Action Items */}
          <div className="flex items-center gap-1.5 sm:gap-space-sm flex-shrink-0">
            {/* Top Header Export to CSV Dropdown & Modal Trigger (Hidden on mobile < md to prevent header clutter) */}
            <div className="relative hidden md:block">
              <div className="inline-flex rounded-lg shadow-xs border border-outline-variant/40 bg-surface-container-low overflow-hidden">
                <button
                  id="topHeaderExportCsvBtn"
                  onClick={() => {
                    setExportScope('filtered');
                    setIsExportModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-on-surface hover:bg-surface-container hover:text-primary transition-all font-label-md text-label-md font-semibold cursor-pointer active:scale-[0.98]"
                  type="button"
                  title="Export students to CSV for offline reporting"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">download</span>
                  <span className="hidden lg:inline">Export to CSV</span>
                  <span className="font-data-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                    {filteredStudents.length}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportDropdownLocation(prev => prev === 'header' ? null : 'header')}
                  className="px-1.5 hover:bg-surface-container border-l border-outline-variant/30 text-on-surface hover:text-primary cursor-pointer flex items-center justify-center transition-colors"
                  title="Quick CSV Export options"
                  aria-label="Export options dropdown"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
                </button>
              </div>

              {exportDropdownLocation === 'header' && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setExportDropdownLocation(null)} />
                  <div className="absolute right-0 mt-1 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-1.5 z-40 text-left text-on-surface animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 border-b border-outline-variant/20">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-outline">Offline CSV Export</p>
                    </div>
                    <button
                      onClick={() => handleExportCSV('filtered', 'comprehensive', true)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                      type="button"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-primary">filter_alt</span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface group-hover:text-primary">Current View (Filtered)</span>
                          <span className="text-[10px] text-outline">Active search & filters</span>
                        </div>
                      </div>
                      <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-primary">
                        {filteredStudents.length}
                      </span>
                    </button>
                    <button
                      onClick={() => handleExportCSV('full', 'comprehensive', true)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                      type="button"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary">public</span>
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface group-hover:text-primary">Full Directory (All)</span>
                          <span className="text-[10px] text-outline">Complete roster</span>
                        </div>
                      </div>
                      <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-secondary">
                        {students.length}
                      </span>
                    </button>
                    {selectedIds.length > 0 && (
                      <button
                        onClick={() => handleExportCSV('selected', 'comprehensive', true)}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                        type="button"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-amber-600">checklist</span>
                          <div className="flex flex-col">
                            <span className="font-semibold text-on-surface group-hover:text-primary">Selected Students</span>
                            <span className="text-[10px] text-outline">Checked rows in table</span>
                          </div>
                        </div>
                        <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                          {selectedIds.length}
                        </span>
                      </button>
                    )}
                    <div className="my-1 border-t border-outline-variant/20"></div>
                    <button
                      onClick={() => {
                        setExportDropdownLocation(null);
                        setIsExportModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-primary/10 transition-colors font-medium cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">tune</span>
                      <span>Custom Report & Columns...</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              id="topHeaderPrintBtn"
              onClick={handlePrintDirectory}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container hover:text-primary transition-all border border-outline-variant/40 shadow-xs font-label-md text-label-md font-semibold active:scale-[0.98] cursor-pointer"
              type="button"
              title={`Print clean directory (${filteredStudents.length} students)`}
            >
              <span className="material-symbols-outlined text-[18px] text-outline">print</span>
              <span className="hidden xl:inline">Print Directory</span>
            </button>

            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm font-label-md text-label-md font-semibold active:scale-[0.98] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Quick Action</span>
            </button>

            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/40 border border-secondary/20 text-on-secondary-container">
              <span className="material-symbols-outlined text-[15px] text-secondary">event_repeat</span>
              <span className="font-label-sm text-label-sm font-semibold">AY 2025-26</span>
            </div>

            <button
              aria-label="Notifications"
              onClick={() => onShowToast('3 new student alerts: 2 ID cards ready, 1 fee milestone.')}
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
              onClick={() => onShowToast('EduManage Students Directory Manual')}
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

        {/* 3. MAIN CONTENT VIEWPORT */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-screen">
          <div className="flex flex-col w-full">
            <div className="px-3 sm:px-gutter-desktop py-space-md sm:py-space-lg flex flex-col gap-space-md sm:gap-space-lg max-w-[1600px] mx-auto w-full">
              {/* Top Hierarchy & Breadcrumb */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md print:hidden">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 font-body-sm text-body-sm text-outline flex-wrap">
                    <button
                      onClick={() => onNavigate('dashboard')}
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Students
                    </button>
                    <span>/</span>
                    <span className="text-on-surface font-semibold">All Students</span>
                    <span className="mx-1 text-outline-variant">|</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container font-data-mono text-label-sm text-primary">
                      AY 2025-26
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <h1 className="text-2xl sm:text-headline-lg font-bold text-on-surface tracking-tight">
                      Students Directory
                    </h1>
                    <span className="font-body-sm sm:font-body-md text-outline">
                      Managing 12,450 students enrolled across 8 branches
                    </span>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onShowToast('Upload CSV or Excel for bulk student registration.')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-sm font-label-md text-label-md transition-all cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">upload_file</span>
                    <span>Import</span>
                  </button>
                  {/* Action Toolbar Export to CSV Dropdown & Modal */}
                  <div className="relative">
                    <div className="inline-flex rounded-lg shadow-sm border border-outline-variant/30 bg-surface-container-lowest overflow-hidden hover:border-primary/40">
                      <button
                        id="pageExportToCsvBtn"
                        onClick={() => {
                          setExportScope('filtered');
                          setIsExportModalOpen(true);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-on-surface hover:bg-surface-container hover:text-primary font-label-md text-label-md font-semibold transition-all cursor-pointer active:scale-[0.98]"
                        type="button"
                        title="Export students to CSV for offline reporting"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">file_download</span>
                        <span>Export to CSV</span>
                        <span className="font-data-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-container text-primary font-bold">
                          {filteredStudents.length}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setExportDropdownLocation(prev => prev === 'page' ? null : 'page')}
                        className="px-1.5 hover:bg-surface-container border-l border-outline-variant/30 text-on-surface hover:text-primary cursor-pointer flex items-center justify-center transition-colors"
                        title="Quick CSV Export options"
                        aria-label="Export options dropdown"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
                      </button>
                    </div>

                    {exportDropdownLocation === 'page' && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setExportDropdownLocation(null)} />
                        <div className="absolute left-0 sm:right-0 sm:left-auto mt-1 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-1.5 z-40 text-left text-on-surface animate-in fade-in zoom-in-95">
                          <div className="px-3 py-1.5 border-b border-outline-variant/20">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-outline">Offline CSV Export</p>
                          </div>
                          <button
                            onClick={() => handleExportCSV('filtered', 'comprehensive', true)}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                            type="button"
                          >
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px] text-primary">filter_alt</span>
                              <div className="flex flex-col">
                                <span className="font-semibold text-on-surface group-hover:text-primary">Current View (Filtered)</span>
                                <span className="text-[10px] text-outline">Active search & filters</span>
                              </div>
                            </div>
                            <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-primary">
                              {filteredStudents.length}
                            </span>
                          </button>
                          <button
                            onClick={() => handleExportCSV('full', 'comprehensive', true)}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                            type="button"
                          >
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px] text-secondary">public</span>
                              <div className="flex flex-col">
                                <span className="font-semibold text-on-surface group-hover:text-primary">Full Directory (All)</span>
                                <span className="text-[10px] text-outline">Complete roster</span>
                              </div>
                            </div>
                            <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-secondary">
                              {students.length}
                            </span>
                          </button>
                          {selectedIds.length > 0 && (
                            <button
                              onClick={() => handleExportCSV('selected', 'comprehensive', true)}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                              type="button"
                            >
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-amber-600">checklist</span>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-on-surface group-hover:text-primary">Selected Students</span>
                                  <span className="text-[10px] text-outline">Checked rows in table</span>
                                </div>
                              </div>
                              <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                                {selectedIds.length}
                              </span>
                            </button>
                          )}
                          <div className="my-1 border-t border-outline-variant/20"></div>
                          <button
                            onClick={() => {
                              setExportDropdownLocation(null);
                              setIsExportModalOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-primary/10 transition-colors font-medium cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">tune</span>
                            <span>Custom Report & Columns...</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    id="pagePrintDirectoryBtn"
                    onClick={handlePrintDirectory}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container hover:text-primary shadow-sm font-label-md text-label-md font-semibold transition-all cursor-pointer border border-outline-variant/30 hover:border-primary/40 active:scale-[0.98]"
                    type="button"
                    title={`Print clean directory format (${filteredStudents.length} students)`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">print</span>
                    <span>Print Directory</span>
                  </button>
                  <button
                    onClick={() => setIsBulkIdModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container shadow-sm font-label-md text-label-md transition-all cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                    <span>Print Batch IDs</span>
                  </button>
                  <button
                    onClick={() => setIsAddStudentModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container shadow-sm font-label-md text-label-md font-semibold transition-all active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                    <span>Add Student</span>
                  </button>
                </div>
              </div>

              {/* Summary KPI Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter-desktop print:hidden">
                {/* Card 1: Total */}
                <div className="relative overflow-hidden p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group border border-outline-variant/20">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      Total Students
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">groups</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-display text-on-surface font-bold tracking-tight">12,450</span>
                    <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[14px]">hub</span>
                      <span>8 Branches</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md px-space-md py-1.5 flex items-center justify-between text-body-sm font-body-sm text-outline">
                    <span>Capacity utilization</span>
                    <span className="font-data-mono font-semibold text-on-surface">88.4%</span>
                  </div>
                </div>

                {/* Card 2: Active Students */}
                <div className="relative overflow-hidden p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group border border-outline-variant/20">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      Active Learners
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-secondary-container/60 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-display text-on-surface font-bold tracking-tight">11,820</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container/50 font-label-sm text-label-sm text-on-secondary-container font-semibold">
                      94.9%
                    </span>
                  </div>
                  <div className="mt-3 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md px-space-md py-1.5 flex items-center justify-between text-body-sm font-body-sm text-outline">
                    <span>Attendance Avg.</span>
                    <span className="font-data-mono font-semibold text-secondary">91.2% Daily</span>
                  </div>
                </div>

                {/* Card 3: New Intake */}
                <div className="relative overflow-hidden p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group border border-outline-variant/20">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-tertiary/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      New This Month
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-[18px]">trending_up</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-display text-on-surface font-bold tracking-tight">384</span>
                    <div className="flex items-center gap-0.5 text-secondary font-label-sm text-label-sm font-semibold">
                      <span className="material-symbols-outlined text-[16px]">north_east</span>
                      <span>+12.4%</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md px-space-md py-1.5 flex items-center justify-between text-body-sm font-body-sm text-outline">
                    <span>Target: 350 / mo</span>
                    <span className="font-data-mono font-semibold text-on-surface">+34 Exceeded</span>
                  </div>
                </div>

                {/* Card 4: Graduated / Completed */}
                <div className="relative overflow-hidden p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between group border border-outline-variant/20">
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-surface-container-high rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                      Course Completed
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">school</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl sm:text-display text-on-surface font-bold tracking-tight">246</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-primary font-semibold">
                      Ready
                    </span>
                  </div>
                  <div className="mt-3 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md px-space-md py-1.5 flex items-center justify-between text-body-sm font-body-sm text-outline">
                    <span>QR Certificates Issued</span>
                    <span className="font-data-mono font-semibold text-primary">189 Dispatched</span>
                  </div>
                </div>
              </div>

              {/* Quick Filter Panel with Local Session Persistence */}
              <StudentsQuickFilterPanel
                academicYear={quickAcademicYear}
                department={quickDepartment}
                status={quickStatus}
                isExpanded={isQuickFilterExpanded}
                onAcademicYearChange={ay => {
                  setQuickAcademicYear(ay);
                  onShowToast(`Filtered by Academic Year: ${ay}`);
                }}
                onDepartmentChange={dept => {
                  setQuickDepartment(dept);
                  onShowToast(`Filtered by Department: ${dept}`);
                }}
                onStatusChange={st => {
                  setQuickStatus(st);
                  onShowToast(`Filtered by Status: ${st}`);
                }}
                onToggleExpand={() => setIsQuickFilterExpanded(prev => !prev)}
                onResetFilters={handleResetQuickFilters}
                onClearSession={handleClearSessionPreferences}
                matchingCount={filteredStudents.length}
                totalCount={students.length}
                academicYearCounts={academicYearCounts}
                departmentCounts={departmentCounts}
                statusCounts={statusCounts}
                lastSavedAt={lastSavedSessionTime}
              />

              {/* Robust Search & Filtering Console */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-outline-variant/40 transition-all print:hidden">
                {/* Top Section: Search Input + Scope Switcher */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                  {/* Search Box with icon and clear */}
                  <div className="relative flex-1 flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-primary pointer-events-none">
                      search
                    </span>
                    <input
                      className="w-full h-11 pl-10 pr-24 bg-surface-container-low rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 focus:border-primary transition-all shadow-xs"
                      id="studentsFilterSearch"
                      placeholder="Search by Student Name, ID / Enrollment No (e.g. 00341, ADM), or Grade Level..."
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-2.5 flex items-center gap-1.5">
                      {searchQuery && (
                        <button
                          aria-label="Clear search input"
                          className="text-outline hover:text-on-surface p-1 rounded-md hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-center"
                          type="button"
                          onClick={() => setSearchQuery('')}
                          title="Clear search"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      )}
                      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-outline-variant/60 text-[10px] font-data-mono text-outline">
                        ⌘K
                      </span>
                    </div>
                  </div>

                  {/* Search Scope Filter Buttons */}
                  <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-xl border border-outline-variant/30 self-start lg:self-auto overflow-x-auto max-w-full">
                    <span className="text-[11px] font-medium text-outline uppercase tracking-wider px-2 hidden sm:inline">
                      Filter by:
                    </span>
                    <button
                      type="button"
                      onClick={() => setSearchScope('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        searchScope === 'all'
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      All Fields
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchScope('name')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                        searchScope === 'name'
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">person</span>
                      Student Name
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchScope('id')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                        searchScope === 'id'
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">badge</span>
                      Student ID
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchScope('grade')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                        searchScope === 'grade'
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">school</span>
                      Grade Level
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchScope('date')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                        searchScope === 'date'
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      Date
                    </button>
                  </div>
                </div>

                {/* Quick Grade Level Chips Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-0.5 scrollbar-none text-xs">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-primary">filter_list</span>
                    Quick Grade:
                  </span>
                  {[
                    { label: 'All Grades', val: 'All Grades' },
                    { label: 'Grade 12', val: 'Grade 12' },
                    { label: 'Grade 11', val: 'Grade 11' },
                    { label: 'Grade 10', val: 'Grade 10' },
                    { label: 'Grade 9', val: 'Grade 9' },
                    { label: 'Commerce', val: 'Commerce' },
                    { label: 'Science', val: 'Science' },
                    { label: 'Arts', val: 'Arts' },
                  ].map(gradeChip => (
                    <button
                      key={gradeChip.val}
                      type="button"
                      onClick={() => setSelectedGrade(gradeChip.val)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap border ${
                        selectedGrade === gradeChip.val
                          ? 'bg-primary/15 text-primary border-primary/40 font-semibold shadow-2xs'
                          : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-on-surface'
                      }`}
                    >
                      {gradeChip.label}
                    </button>
                  ))}
                </div>

                {/* Second Row: Specific Filter Selectors (Grade, Date, Branch, Course, Status, Reset) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 pt-1">
                  {/* 1. Grade Filter */}
                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-primary">school</span>
                      Grade / Class
                    </label>
                    <div className="relative">
                      <select
                        value={selectedGrade}
                        onChange={e => setSelectedGrade(e.target.value)}
                        className="w-full h-10 pl-3 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 appearance-none cursor-pointer"
                      >
                        <option value="All Grades">All Grades</option>
                        <option value="Grade 12">Grade 12</option>
                        <option value="Grade 11">Grade 11</option>
                        <option value="Grade 10">Grade 10</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Higher Ed">Higher Ed / Degree</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-outline pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* 2. Enrollment Date Filter */}
                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-primary">calendar_month</span>
                      Enrollment Date
                    </label>
                    <div className="relative">
                      <select
                        value={selectedDateFilter}
                        onChange={e => setSelectedDateFilter(e.target.value)}
                        className="w-full h-10 pl-3 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 appearance-none cursor-pointer"
                      >
                        <option value="All Dates">All Enrollment Dates</option>
                        <option value="2026">Enrolled in 2026</option>
                        <option value="2025">Enrolled in 2025</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="Last 90 Days">Last 90 Days</option>
                        <option value="Custom Range">Custom Date Range...</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-outline pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* 3. Branch Campus Filter */}
                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-outline">location_on</span>
                      Branch Campus
                    </label>
                    <div className="relative">
                      <select
                        value={selectedBranch}
                        onChange={e => setSelectedBranch(e.target.value)}
                        className="w-full h-10 pl-3 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 appearance-none cursor-pointer"
                      >
                        <option value="All Branches">All Branches</option>
                        <option value="Siliguri HQ">Siliguri HQ</option>
                        <option value="Binnaguri Campus">Binnaguri Campus</option>
                        <option value="Jalpaiguri Centre">Jalpaiguri Centre</option>
                        <option value="Cooch Behar">Cooch Behar</option>
                        <option value="Malbazar Hub">Malbazar Hub</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-outline pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* 4. Course Filter */}
                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-outline">auto_stories</span>
                      Course Program
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                        className="w-full h-10 pl-3 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 appearance-none cursor-pointer"
                      >
                        <option value="All Courses">All Courses</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Tally Prime & GST">Tally Prime &amp; GST</option>
                        <option value="Graphic & UI Design">Graphic Design</option>
                        <option value="Spoken English">Spoken English</option>
                        <option value="Computer Fundamentals">Computer Fundamentals</option>
                        <option value="Python & AI Data">Python &amp; AI</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-outline pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* 5. Status Filter */}
                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-outline uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-outline">verified_user</span>
                      Intake Status
                    </label>
                    <div className="relative">
                      <select
                        value={selectedStatus}
                        onChange={e => {
                          setSelectedStatus(e.target.value);
                          if (e.target.value !== 'All Status') {
                            setActiveFacetStatus(e.target.value);
                          } else {
                            setActiveFacetStatus(null);
                          }
                        }}
                        className="w-full h-10 pl-3 pr-8 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 border border-outline-variant/30 appearance-none cursor-pointer"
                      >
                        <option value="All Status">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive / On-Hold</option>
                        <option value="Completed">Completed</option>
                        <option value="Dropped Out">Dropped Out</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-outline pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* 6. Reset Filters */}
                  <div className="relative flex flex-col justify-end">
                    <button
                      onClick={handleResetFilters}
                      className="h-10 w-full flex items-center justify-center gap-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-outline hover:text-on-surface border border-outline-variant/30 transition-all font-label-md text-xs font-semibold cursor-pointer active:scale-[0.98]"
                      title="Reset all search queries and filters"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                      <span>Reset Filters</span>
                    </button>
                  </div>
                </div>

                {/* Optional Custom Date Range Inputs (visible when "Custom Range" is chosen) */}
                {selectedDateFilter === 'Custom Range' && (
                  <div className="p-3 bg-surface-container-low/70 rounded-xl border border-primary/20 flex flex-wrap items-center gap-3 animate-in fade-in">
                    <span className="text-xs font-semibold text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">date_range</span>
                      Custom Enrollment Date Range:
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={e => setCustomStartDate(e.target.value)}
                        className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-xs font-data-mono text-on-surface focus:outline-none focus:border-primary"
                        title="Enrollment Start Date"
                      />
                      <span className="text-xs text-outline">to</span>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={e => setCustomEndDate(e.target.value)}
                        className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-xs font-data-mono text-on-surface focus:outline-none focus:border-primary"
                        title="Enrollment End Date"
                      />
                    </div>
                    {(customStartDate || customEndDate) && (
                      <button
                        type="button"
                        onClick={() => {
                          setCustomStartDate('');
                          setCustomEndDate('');
                        }}
                        className="text-xs text-primary hover:underline cursor-pointer"
                      >
                        Clear Range
                      </button>
                    )}
                  </div>
                )}

                {/* Third Row: Active Filter Pills / Badges & Live Results Counter */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-2.5 border-t border-outline-variant/20 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider mr-1">
                      Active Filters:
                    </span>

                    {/* Search Query Chip */}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        <span>Search: &ldquo;{searchQuery}&rdquo; {searchScope !== 'all' && `(${searchScope})`}</span>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="hover:text-primary-container p-0.5 cursor-pointer"
                          type="button"
                          aria-label="Clear search query"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* Grade Chip */}
                    {selectedGrade !== 'All Grades' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-medium">
                        <span>Grade: {selectedGrade}</span>
                        <button
                          onClick={() => setSelectedGrade('All Grades')}
                          className="p-0.5 hover:opacity-80 cursor-pointer"
                          type="button"
                          aria-label="Clear grade filter"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* Date Chip */}
                    {selectedDateFilter !== 'All Dates' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-medium">
                        <span>
                          Enrolled: {selectedDateFilter === 'Custom Range' ? `${customStartDate || '...'} to ${customEndDate || '...'}` : selectedDateFilter}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedDateFilter('All Dates');
                            setCustomStartDate('');
                            setCustomEndDate('');
                          }}
                          className="p-0.5 hover:opacity-80 cursor-pointer"
                          type="button"
                          aria-label="Clear date filter"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* Branch Chip */}
                    {selectedBranch !== 'All Branches' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-medium">
                        <span>Campus: {selectedBranch}</span>
                        <button
                          onClick={() => setSelectedBranch('All Branches')}
                          className="p-0.5 text-outline hover:text-on-surface cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* Course Chip */}
                    {selectedCourse !== 'All Courses' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-medium">
                        <span>Course: {selectedCourse}</span>
                        <button
                          onClick={() => setSelectedCourse('All Courses')}
                          className="p-0.5 text-outline hover:text-on-surface cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* Status Chip */}
                    {selectedStatus !== 'All Status' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-medium">
                        <span>Status: {selectedStatus}</span>
                        <button
                          onClick={() => {
                            setSelectedStatus('All Status');
                            setActiveFacetStatus(null);
                          }}
                          className="p-0.5 text-outline hover:text-on-surface cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* Quick Filter: Academic Year Chip */}
                    {quickAcademicYear !== 'All Academic Years' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300 font-medium">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        <span>AY: {quickAcademicYear}</span>
                        <button
                          onClick={() => setQuickAcademicYear('All Academic Years')}
                          className="p-0.5 hover:opacity-80 cursor-pointer"
                          type="button"
                          aria-label="Clear Academic Year quick filter"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* Quick Filter: Department Chip */}
                    {quickDepartment !== 'All Departments' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 font-medium">
                        <span className="material-symbols-outlined text-[14px]">domain</span>
                        <span>Dept: {quickDepartment}</span>
                        <button
                          onClick={() => setQuickDepartment('All Departments')}
                          className="p-0.5 hover:opacity-80 cursor-pointer"
                          type="button"
                          aria-label="Clear Department quick filter"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* Quick Filter: Status Chip */}
                    {quickStatus !== 'All Statuses' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 font-medium">
                        <span className="material-symbols-outlined text-[14px]">verified_user</span>
                        <span>Quick Status: {quickStatus}</span>
                        <button
                          onClick={() => setQuickStatus('All Statuses')}
                          className="p-0.5 hover:opacity-80 cursor-pointer"
                          type="button"
                          aria-label="Clear Status quick filter"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    )}

                    {/* If no filters active */}
                    {!searchQuery &&
                      selectedGrade === 'All Grades' &&
                      selectedDateFilter === 'All Dates' &&
                      selectedBranch === 'All Branches' &&
                      selectedCourse === 'All Courses' &&
                      selectedStatus === 'All Status' &&
                      quickAcademicYear === 'All Academic Years' &&
                      quickDepartment === 'All Departments' &&
                      quickStatus === 'All Statuses' && (
                        <span className="text-outline text-xs italic">No active filters applied (showing all students)</span>
                    )}

                    {/* Clear all link */}
                    {(searchQuery ||
                      selectedGrade !== 'All Grades' ||
                      selectedDateFilter !== 'All Dates' ||
                      selectedBranch !== 'All Branches' ||
                      selectedCourse !== 'All Courses' ||
                      selectedStatus !== 'All Status' ||
                      quickAcademicYear !== 'All Academic Years' ||
                      quickDepartment !== 'All Departments' ||
                      quickStatus !== 'All Statuses') && (
                      <button
                        onClick={handleResetFilters}
                        className="text-primary hover:underline font-semibold ml-2 cursor-pointer"
                        type="button"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Results Count Badge & Quick Export */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-data-mono text-xs px-2.5 py-1 rounded-md bg-surface-container text-on-surface font-medium">
                      Showing <strong className="text-primary">{filteredStudents.length}</strong> of {students.length} students
                    </span>

                    {/* Filter bar Export Dropdown & Modal Trigger */}
                    <div className="relative">
                      <div className="inline-flex rounded-md bg-primary/10 overflow-hidden border border-primary/20">
                        <button
                          id="filterBarExportCsvBtn"
                          onClick={() => {
                            setExportScope('filtered');
                            setIsExportModalOpen(true);
                          }}
                          className="flex items-center gap-1 text-xs text-primary hover:bg-primary/20 px-2.5 py-1 font-semibold cursor-pointer transition-colors"
                          type="button"
                          title="Export this filtered view to CSV"
                        >
                          <span className="material-symbols-outlined text-[15px]">download</span>
                          <span>Export to CSV</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setExportDropdownLocation(prev => prev === 'filter' ? null : 'filter')}
                          className="px-1 text-primary hover:bg-primary/20 border-l border-primary/20 cursor-pointer flex items-center justify-center transition-colors"
                          title="Quick CSV Export options"
                        >
                          <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
                        </button>
                      </div>

                      {exportDropdownLocation === 'filter' && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setExportDropdownLocation(null)} />
                          <div className="absolute right-0 mt-1 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 py-1.5 z-40 text-left text-on-surface animate-in fade-in zoom-in-95">
                            <div className="px-3 py-1.5 border-b border-outline-variant/20">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-outline">Offline CSV Export</p>
                            </div>
                            <button
                              onClick={() => handleExportCSV('filtered', 'comprehensive', true)}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                              type="button"
                            >
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-primary">filter_alt</span>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-on-surface group-hover:text-primary">Current View (Filtered)</span>
                                  <span className="text-[10px] text-outline">Active search & filters</span>
                                </div>
                              </div>
                              <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-primary">
                                {filteredStudents.length}
                              </span>
                            </button>
                            <button
                              onClick={() => handleExportCSV('full', 'comprehensive', true)}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                              type="button"
                            >
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-secondary">public</span>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-on-surface group-hover:text-primary">Full Directory (All)</span>
                                  <span className="text-[10px] text-outline">Complete roster</span>
                                </div>
                              </div>
                              <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-secondary">
                                {students.length}
                              </span>
                            </button>
                            {selectedIds.length > 0 && (
                              <button
                                onClick={() => handleExportCSV('selected', 'comprehensive', true)}
                                className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface-container text-left transition-colors cursor-pointer group"
                                type="button"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-[16px] text-amber-600">checklist</span>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-on-surface group-hover:text-primary">Selected Students</span>
                                    <span className="text-[10px] text-outline">Checked rows in table</span>
                                  </div>
                                </div>
                                <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                                  {selectedIds.length}
                                </span>
                              </button>
                            )}
                            <div className="my-1 border-t border-outline-variant/20"></div>
                            <button
                              onClick={() => {
                                setExportDropdownLocation(null);
                                setIsExportModalOpen(true);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-primary hover:bg-primary/10 transition-colors font-medium cursor-pointer"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[16px]">tune</span>
                              <span>Custom Report & Columns...</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    <button
                      id="filterBarPrintBtn"
                      onClick={handlePrintDirectory}
                      className="flex items-center gap-1 text-xs text-on-surface hover:bg-surface-container-high px-2.5 py-1 rounded-md bg-surface-container font-semibold cursor-pointer transition-colors"
                      type="button"
                      title="Print clean directory format"
                    >
                      <span className="material-symbols-outlined text-[15px]">print</span>
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Selection Floating Bar */}
              {selectedIds.length > 0 && (
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-space-md py-2.5 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-md transition-all animate-in fade-in slide-in-from-top-2 print:hidden"
                  id="bulkBar"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-inverse-on-surface">
                      <strong className="font-bold text-white" id="selectedCount">
                        {selectedIds.length}
                      </strong>{' '}
                      students selected
                    </span>
                    <span className="hidden md:inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
                    <button
                      className="text-inverse-primary hover:underline font-label-md text-label-md cursor-pointer"
                      onClick={handleDeselectAll}
                      type="button"
                    >
                      Deselect all
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => setIsBulkIdModalOpen(true)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-label-md text-label-md transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">badge</span>
                      <span>Generate ID</span>
                    </button>
                    <button
                      onClick={() => setIsBulkMessageModalOpen(true)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-label-md text-label-md transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      <span>Send SMS/WA</span>
                    </button>
                    <button
                      onClick={() => setIsChangeBatchModalOpen(true)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-label-md text-label-md transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                      <span>Change Batch</span>
                    </button>
                    <button
                      onClick={() => {
                        setExportScope('selected');
                        setIsExportModalOpen(true);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-label-md text-label-md transition-colors cursor-pointer"
                      type="button"
                      title="Export selected students to CSV"
                    >
                      <span className="material-symbols-outlined text-[16px]">file_download</span>
                      <span>Export ({selectedIds.length})</span>
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => onShowToast('More bulk options: Archive records, Assign Mentor')}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="More bulk actions"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Print-Only Official Document Header */}
              <div className="hidden print:block mb-4 pb-3 border-b-2 border-black">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-bold text-black tracking-tight">
                      EduManage Enterprise — Students Directory
                    </h1>
                    <p className="text-xs text-gray-700 mt-0.5 font-medium">
                      Official Enrolled Student Records &bull; Academic Year 2025–2026 &bull; {selectedBranch}
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-gray-800">
                    <div><strong>Date Printed:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    <div><strong>Total Students:</strong> {filteredStudents.length} record{filteredStudents.length === 1 ? '' : 's'}</div>
                  </div>
                </div>
                {(searchQuery || selectedGrade !== 'All Grades' || selectedCourse !== 'All Courses' || selectedStatus !== 'All Status' || selectedDateFilter !== 'All Dates' || selectedBranch !== 'All Branches') && (
                  <div className="mt-2 pt-1.5 border-t border-gray-300 text-[10px] text-gray-700">
                    <span className="font-bold uppercase tracking-wider">Active Filters:</span>{' '}
                    {searchQuery && <span className="mr-2">Search: "{searchQuery}"</span>}
                    {selectedGrade !== 'All Grades' && <span className="mr-2">Grade: {selectedGrade}</span>}
                    {selectedCourse !== 'All Courses' && <span className="mr-2">Course: {selectedCourse}</span>}
                    {selectedBranch !== 'All Branches' && <span className="mr-2">Branch: {selectedBranch}</span>}
                    {selectedStatus !== 'All Status' && <span className="mr-2">Status: {selectedStatus}</span>}
                    {selectedDateFilter !== 'All Dates' && <span className="mr-2">Date: {selectedDateFilter}</span>}
                  </div>
                )}
              </div>

              {/* Main High-Density Students Data Grid */}
              <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col border border-outline-variant/30 print:border-none print:shadow-none">
                {/* Mobile Cards View (Visible on mobile & tablet < lg) */}
                <div className="block lg:hidden divide-y divide-outline-variant/20 p-2 sm:p-3 space-y-2.5 print:hidden">
                  {filteredStudents.length === 0 ? (
                    <div className="py-10 text-center text-outline">
                      <span className="material-symbols-outlined text-4xl block mb-2 text-outline-variant">
                        search_off
                      </span>
                      <p className="font-semibold text-on-surface">No students matched your search criteria</p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-3 text-primary hover:underline font-label-md text-label-md cursor-pointer"
                      >
                        Reset all filters
                      </button>
                    </div>
                  ) : (
                    filteredStudents.map(student => {
                      const isSelected = selectedIds.includes(student.id);
                      return (
                        <div
                          key={`mobile-${student.id}`}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-primary/5 border-primary/40 shadow-xs ring-1 ring-primary/20'
                              : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant/60'
                          }`}
                        >
                          {/* Card Header: Checkbox + Avatar + Name + Status */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <input
                                checked={isSelected}
                                onChange={() => handleToggleStudent(student.id)}
                                className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer flex-shrink-0"
                                type="checkbox"
                              />
                              <div
                                className={`w-9 h-9 rounded-full ${student.avatarBg} flex items-center justify-center ${student.avatarText} font-semibold text-xs flex-shrink-0`}
                              >
                                {student.avatarColor}
                              </div>
                              <div className="min-w-0">
                                <span
                                  onClick={() => onNavigate('student-profile')}
                                  className="font-label-lg text-label-lg font-semibold text-on-surface truncate block cursor-pointer hover:text-primary transition-colors hover:underline"
                                >
                                  {student.name}
                                </span>
                                <span className="font-data-mono text-xs text-outline block">
                                  {student.phone}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${student.statusBg} ${student.statusText} font-label-sm text-[10px] font-semibold flex-shrink-0`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${student.statusDot}`}></span>
                              {student.status}
                            </span>
                          </div>

                          {/* Details Grid: Grade, Roll/ID, Course, Branch */}
                          <div className="grid grid-cols-2 gap-2 text-xs py-2 my-2 border-y border-outline-variant/20 bg-surface-container-low/40 -mx-3.5 px-3.5">
                            <div>
                              <span className="text-[10px] text-outline block uppercase font-semibold">Grade / Level</span>
                              <span className="font-medium text-on-surface truncate block">{student.grade}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-outline block uppercase font-semibold">Enrollment No.</span>
                              <span className="font-data-mono font-medium text-on-surface-variant truncate block">{student.enrollmentNo}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-outline block uppercase font-semibold">Course & Batch</span>
                              <span className="font-medium text-on-surface truncate block">{student.course}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-outline block uppercase font-semibold">Campus</span>
                              <span className="font-medium text-on-surface truncate block">{student.branch}</span>
                            </div>
                          </div>

                          {/* Fee Status & Action Buttons */}
                          <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${student.feeBadgeBg} ${student.feeBadgeText} text-[11px] font-semibold`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${student.feeDotBg}`}></span>
                                {student.feeLabel}
                              </span>
                              {student.feeSub && (
                                <span className="text-[10px] text-outline font-data-mono">
                                  {student.feeSub}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1 ml-auto">
                              <a
                                href={`tel:${student.phone.replace(/[^0-9+]/g, '')}`}
                                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-colors flex items-center justify-center"
                                title="Call student"
                              >
                                <span className="material-symbols-outlined text-[16px]">call</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => onShowToast(`Opening WhatsApp chat with ${student.name}`)}
                                className="p-1.5 rounded-lg bg-secondary-container/60 hover:bg-secondary-container text-secondary transition-colors flex items-center justify-center"
                                title="WhatsApp student"
                              >
                                <span className="material-symbols-outlined text-[16px]">chat</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingStudent(student);
                                  setIsEditStudentModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors flex items-center justify-center"
                                title="Edit record"
                              >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onNavigate('student-profile')}
                                className="px-2.5 py-1 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-[14px]">visibility</span>
                                <span>360° Profile</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Desktop High-Density Table View (Hidden on mobile < lg) */}
                <div className="hidden lg:block overflow-x-auto print:block print:overflow-visible">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider h-11 select-none border-b border-outline-variant/30 print:border-b-2 print:border-black">
                        <th className="w-12 px-4 py-2 text-center print:hidden">
                          <input
                            checked={isAllSelected}
                            onChange={handleToggleSelectAll}
                            className="w-4 h-4 rounded text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                            id="selectAllCheckbox"
                            type="checkbox"
                          />
                        </th>
                        <th className="px-4 py-2 font-semibold">Student Profile</th>
                        <th className="px-4 py-2 font-semibold">Grade / Level</th>
                        <th className="px-4 py-2 font-semibold">Enrollment Date</th>
                        <th className="px-4 py-2 font-semibold">Enrollment No.</th>
                        <th className="px-4 py-2 font-semibold">Admission No.</th>
                        <th className="px-4 py-2 font-semibold">Course &amp; Batch</th>
                        <th className="px-4 py-2 font-semibold">Branch Campus</th>
                        <th className="px-4 py-2 text-center font-semibold">Status</th>
                        <th className="px-4 py-2 text-right font-semibold">Fee Ledger</th>
                        <th className="px-4 py-2 text-center w-24 font-semibold print:hidden">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 text-on-surface font-body-md text-body-md">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="py-12 text-center text-outline">
                            <span className="material-symbols-outlined text-4xl block mb-2 text-outline-variant">
                              search_off
                            </span>
                            <p className="font-semibold text-on-surface">No students matched your search criteria</p>
                            <button
                              onClick={handleResetFilters}
                              className="mt-3 text-primary hover:underline font-label-md text-label-md cursor-pointer"
                            >
                              Reset all filters
                            </button>
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map(student => {
                          const isSelected = selectedIds.includes(student.id);
                          return (
                            <tr
                              key={student.id}
                              className={`transition-colors group ${
                                isSelected ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-surface-container-low/60'
                              }`}
                            >
                              {/* Checkbox */}
                              <td className="px-4 py-3 text-center print:hidden">
                                <input
                                  checked={isSelected}
                                  onChange={() => handleToggleStudent(student.id)}
                                  className="student-checkbox w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                                  type="checkbox"
                                />
                              </td>

                              {/* Profile */}
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-9 h-9 rounded-full ${student.avatarBg} flex items-center justify-center ${student.avatarText} font-semibold text-xs flex-shrink-0`}
                                  >
                                    {student.avatarColor}
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span
                                      onClick={() => onNavigate('student-profile')}
                                      className="font-label-lg text-label-lg font-semibold text-on-surface truncate group-hover:text-primary transition-colors cursor-pointer hover:underline"
                                    >
                                      {student.name}
                                    </span>
                                    <span className="font-data-mono text-body-sm text-outline">
                                      {student.phone}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Grade */}
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getGradeBadgeStyle(
                                    student.grade
                                  )}`}
                                >
                                  {student.grade}
                                </span>
                              </td>

                              {/* Enrollment Date */}
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1.5 text-on-surface">
                                    <span className="material-symbols-outlined text-[15px] text-primary">
                                      calendar_today
                                    </span>
                                    <span className="font-data-mono text-xs text-on-surface font-medium">
                                      {formatEnrollmentDate(student.enrollmentDate)}
                                    </span>
                                  </div>
                                  <span className="font-data-mono text-[10px] text-primary bg-primary/10 px-1.5 py-0.2 rounded font-semibold w-fit mt-1">
                                    AY {student.academicYear || getStudentAcademicYear(student.enrollmentDate)}
                                  </span>
                                </div>
                              </td>

                              {/* Enrollment No */}
                              <td className="px-4 py-3">
                                <span className="font-data-mono text-data-mono font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                                  {student.enrollmentNo}
                                </span>
                              </td>

                              {/* Admission No */}
                              <td className="px-4 py-3">
                                <span className="font-data-mono text-data-mono text-outline">
                                  {student.admissionNo}
                                </span>
                              </td>

                              {/* Course & Batch */}
                              <td className="px-4 py-3">
                                <div className="flex flex-col">
                                  <span className="font-medium text-on-surface truncate max-w-[190px]">
                                    {student.course}
                                  </span>
                                  <span className="font-body-sm text-body-sm text-outline truncate max-w-[190px]">
                                    {student.batch}
                                  </span>
                                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant w-fit mt-1">
                                    <span className="material-symbols-outlined text-[12px] text-primary">domain</span>
                                    {student.department || getStudentDepartment(student.course)}
                                  </span>
                                </div>
                              </td>

                              {/* Branch Campus */}
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-1 text-on-surface-variant">
                                  <span className="material-symbols-outlined text-[16px] text-outline">
                                    location_on
                                  </span>
                                  <span className="font-medium">{student.branch}</span>
                                </div>
                              </td>

                              {/* Status */}
                              <td className="px-4 py-3 text-center">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${student.statusBg} ${student.statusText} font-label-sm text-label-sm font-semibold`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${student.statusDot}`}></span>
                                  {student.status}
                                </span>
                              </td>

                              {/* Fee Ledger */}
                              <td className="px-4 py-3 text-right">
                                <div className="flex flex-col items-end">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${student.feeBadgeBg} ${student.feeBadgeText} font-label-sm text-label-sm font-semibold`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full ${student.feeDotBg}`}></span>
                                    {student.feeLabel}
                                  </span>
                                  <span
                                    className={`font-data-mono text-[11px] mt-0.5 ${
                                      student.overdue ? 'text-error font-medium' : 'text-outline'
                                    }`}
                                  >
                                    {student.feeSub}
                                  </span>
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="px-4 py-3 text-center print:hidden">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => onNavigate('student-profile')}
                                    className="p-1.5 rounded hover:bg-surface-container-high text-primary transition-colors cursor-pointer"
                                    title="View Full Profile"
                                    type="button"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingStudent(student);
                                      setIsEditStudentModalOpen(true);
                                    }}
                                    className="p-1.5 rounded hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors cursor-pointer"
                                    title="Edit Student"
                                    type="button"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                  </button>
                                  <button
                                    onClick={() => onShowToast(`Action menu for ${student.name}`)}
                                    className="p-1.5 rounded hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors cursor-pointer"
                                    title="More Options"
                                    type="button"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination & Per Page Console */}
                <div className="px-3 sm:px-space-md py-3 bg-surface-container-low/50 flex flex-col md:flex-row items-center justify-between gap-3 select-none border-t border-outline-variant/30 print:hidden">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-center sm:text-left">
                    <span className="font-body-sm text-body-sm text-outline">
                      Showing <strong className="font-semibold text-on-surface">1</strong> to{' '}
                      <strong className="font-semibold text-on-surface">{filteredStudents.length}</strong> of{' '}
                      <strong className="font-semibold text-on-surface">12,450</strong> students
                    </span>
                    <div className="h-4 w-[1px] bg-outline-variant hidden sm:block"></div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-body-sm text-body-sm text-outline">Per page:</span>
                      <select
                        aria-label="Records per page"
                        className="h-7 px-2 bg-surface-container-lowest rounded text-body-sm font-data-mono text-on-surface focus:outline-none cursor-pointer border border-outline-variant/30"
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>

                  {/* Numeric Navigation */}
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 rounded text-outline/50 hover:bg-surface-container cursor-not-allowed"
                      disabled
                      type="button"
                      aria-label="First page"
                    >
                      <span className="material-symbols-outlined text-[18px]">first_page</span>
                    </button>
                    <button
                      className="p-1.5 rounded text-outline/50 hover:bg-surface-container cursor-not-allowed"
                      disabled
                      type="button"
                      aria-label="Previous page"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <div className="flex items-center gap-1 px-1">
                      <button
                        className="w-7 h-7 rounded bg-primary text-on-primary font-data-mono text-body-sm font-semibold flex items-center justify-center shadow-xs cursor-pointer"
                        type="button"
                      >
                        1
                      </button>
                      <button
                        onClick={() => onShowToast('Showing Page 2 of directory')}
                        className="w-7 h-7 rounded hover:bg-surface-container text-on-surface font-data-mono text-body-sm flex items-center justify-center transition-colors cursor-pointer"
                        type="button"
                      >
                        2
                      </button>
                      <button
                        onClick={() => onShowToast('Showing Page 3 of directory')}
                        className="w-7 h-7 rounded hover:bg-surface-container text-on-surface font-data-mono text-body-sm flex items-center justify-center transition-colors cursor-pointer"
                        type="button"
                      >
                        3
                      </button>
                      <span className="px-1 text-outline font-data-mono text-xs">...</span>
                      <button
                        onClick={() => onShowToast('Showing Page 1245')}
                        className="w-7 h-7 rounded hover:bg-surface-container text-on-surface font-data-mono text-body-sm flex items-center justify-center transition-colors cursor-pointer"
                        type="button"
                      >
                        1,245
                      </button>
                    </div>
                    <button
                      onClick={() => onShowToast('Navigating to next student cohort page')}
                      className="p-1.5 rounded text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      type="button"
                      aria-label="Next page"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                    <button
                      onClick={() => onShowToast('Navigating to last page')}
                      className="p-1.5 rounded text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                      type="button"
                      aria-label="Last page"
                    >
                      <span className="material-symbols-outlined text-[18px]">last_page</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Insights & Batch Overview Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-4 border border-outline-variant/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">document_scanner</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      KYC &amp; Verification
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      98.2% of active students have verified Aadhaar / Photo IDs
                    </span>
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-4 border border-outline-variant/20">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      WhatsApp Notifications
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      Automated attendance &amp; fee alert gateway is operational
                    </span>
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-4 border border-outline-variant/20">
                  <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Instalment Due Tracker
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      ₹2.48 Lakhs pending across 42 students for current cycle
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL 1: Add Student Dialog */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40 animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Add New Student</h3>
                    {addStudentLastSavedTime && (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono flex items-center gap-1 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Auto-saved
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-outline">Direct enrollment into active campus batches</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddStudentModalOpen(false)}
                className="p-1 rounded-md text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Restored Draft Alert Banner */}
            {isAddStudentDraftRestored && (
              <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-emerald-600 dark:text-emerald-400">history_toggle_off</span>
                  <span>
                    Restored draft from previous session {addStudentLastSavedTime ? `(Saved at ${addStudentLastSavedTime})` : ''}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDiscardStudentDraft}
                  className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer ml-3 flex-shrink-0"
                  title="Discard draft and reset form"
                >
                  Discard Draft
                </button>
              </div>
            )}

            <form onSubmit={handleCreateStudent} className="space-y-4 pt-4">
              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Full Student Name *
                </label>
                <input
                  required
                  type="text"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  placeholder="e.g. Suman Roy"
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-md focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    WhatsApp Phone *
                  </label>
                  <input
                    type="text"
                    value={newStudentPhone}
                    onChange={e => setNewStudentPhone(e.target.value)}
                    placeholder="+91 98000 12345"
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Branch Campus
                  </label>
                  <select
                    value={newStudentBranch}
                    onChange={e => setNewStudentBranch(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Siliguri HQ">Siliguri HQ</option>
                    <option value="Binnaguri Campus">Binnaguri Campus</option>
                    <option value="Jalpaiguri Centre">Jalpaiguri Centre</option>
                    <option value="Cooch Behar">Cooch Behar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Grade / Class
                  </label>
                  <select
                    value={newStudentGrade}
                    onChange={e => setNewStudentGrade(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Grade 12 (Science)">Grade 12 (Science)</option>
                    <option value="Grade 12 (Commerce)">Grade 12 (Commerce)</option>
                    <option value="Grade 12 (Arts)">Grade 12 (Arts)</option>
                    <option value="Grade 11 (Science)">Grade 11 (Science)</option>
                    <option value="Grade 11 (Commerce)">Grade 11 (Commerce)</option>
                    <option value="Grade 10-A">Grade 10-A</option>
                    <option value="Grade 10-B">Grade 10-B</option>
                    <option value="Grade 9-A">Grade 9-A</option>
                    <option value="Grade 9-B">Grade 9-B</option>
                    <option value="Higher Ed (Sem 4)">Higher Ed (Sem 4)</option>
                    <option value="Higher Ed (Sem 6)">Higher Ed (Sem 6)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Enrollment Date
                  </label>
                  <input
                    type="date"
                    value={newStudentEnrollmentDate}
                    onChange={e => setNewStudentEnrollmentDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Course
                  </label>
                  <select
                    value={newStudentCourse}
                    onChange={e => setNewStudentCourse(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Marketing Pro">Digital Marketing Pro</option>
                    <option value="Tally Prime & GST">Tally Prime &amp; GST</option>
                    <option value="Graphic & UI Design">Graphic &amp; UI Design</option>
                    <option value="Python & AI Data">Python &amp; AI</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Batch Time Slot
                  </label>
                  <select
                    value={newStudentBatch}
                    onChange={e => setNewStudentBatch(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="WD Evening (Batch 02)">Evening (Batch 02)</option>
                    <option value="DM Morning (Batch 01)">Morning (Batch 01)</option>
                    <option value="GD Afternoon (Batch 03)">Afternoon (Batch 03)</option>
                    <option value="Weekend Intensive">Weekend Intensive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Fee Intake Status
                  </label>
                  <select
                    value={newStudentFeeStatus}
                    onChange={e => setNewStudentFeeStatus(e.target.value as 'due' | 'paid')}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="paid">Paid Full (Settled)</option>
                    <option value="due">Partial / Due Balance</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={newStudentFeeAmount}
                    onChange={e => setNewStudentFeeAmount(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-4 border-t border-outline-variant/30">
                <div>
                  {(newStudentName || newStudentPhone || addStudentLastSavedTime) && (
                    <button
                      type="button"
                      onClick={handleDiscardStudentDraft}
                      className="px-3 py-1.5 text-xs text-error hover:bg-error-container/20 rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-medium"
                      title="Discard current draft"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                      <span>Discard Draft</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddStudentModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-outline hover:bg-surface-container transition-colors cursor-pointer font-label-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    Register Student
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Bulk ID Cards Generator */}
      {isBulkIdModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/40 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Batch ID Print</h3>
                  <p className="font-body-sm text-outline">
                    {selectedIds.length} cards selected for print
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBulkIdModalOpen(false)}
                className="p-1 rounded-md text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-body-sm">
                <div className="flex items-center justify-between font-semibold text-on-surface mb-1">
                  <span>RFID Smart Cards Standard</span>
                  <span className="text-primary font-data-mono">CR80 300 DPI</span>
                </div>
                <p className="text-outline text-xs">
                  Includes encrypted QR code, turnstile barcode, emergency contacts, and validity up to June 2026.
                </p>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container">
                <span className="font-label-md text-on-surface">High-resolution PDF spool</span>
                <span className="material-symbols-outlined text-secondary">check_circle</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
              <button
                onClick={() => setIsBulkIdModalOpen(false)}
                className="px-4 py-2 rounded-lg text-outline hover:bg-surface-container transition-colors cursor-pointer font-label-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBulkIdModalOpen(false);
                  onShowToast(`Dispatched print job for ${selectedIds.length} student ID cards!`);
                }}
                className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                <span>Send to Print Spooler</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Send SMS/WA Broadcast */}
      {isBulkMessageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/40 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">WhatsApp / SMS</h3>
                  <p className="font-body-sm text-outline">
                    Broadcasting to {selectedIds.length} students
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBulkMessageModalOpen(false)}
                className="p-1 rounded-md text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  value={bulkMessageText}
                  onChange={e => setBulkMessageText(e.target.value)}
                  className="w-full p-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                ></textarea>
              </div>
              <div className="flex items-center justify-between text-xs text-outline">
                <span>Variables: &#123;&#123;StudentName&#125;&#125;, &#123;&#123;Batch&#125;&#125;</span>
                <span>Gateway: Meta Verified API</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
              <button
                onClick={() => setIsBulkMessageModalOpen(false)}
                className="px-4 py-2 rounded-lg text-outline hover:bg-surface-container transition-colors cursor-pointer font-label-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBulkMessageModalOpen(false);
                  onShowToast(`Queued WhatsApp messages to ${selectedIds.length} student phones!`);
                }}
                className="px-5 py-2 rounded-lg bg-secondary text-on-secondary hover:opacity-90 font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Send Broadcast</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Change Batch Modal */}
      {isChangeBatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/40 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Change Batch</h3>
                  <p className="font-body-sm text-outline">
                    Migrate {selectedIds.length} students to new schedule
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChangeBatchModalOpen(false)}
                className="p-1 rounded-md text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Target Batch &amp; Time Slot
                </label>
                <select className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none">
                  <option>Morning (08:00 AM - 10:00 AM)</option>
                  <option>Afternoon (01:00 PM - 03:00 PM)</option>
                  <option>Evening (05:00 PM - 07:00 PM)</option>
                  <option>Weekend Fast-Track Cohort</option>
                </select>
              </div>
              <p className="text-outline text-xs">
                Attendance logs and LMS assignments will automatically map over to the newly assigned batch mentor.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/30">
              <button
                onClick={() => setIsChangeBatchModalOpen(false)}
                className="px-4 py-2 rounded-lg text-outline hover:bg-surface-container transition-colors cursor-pointer font-label-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsChangeBatchModalOpen(false);
                  onShowToast(`Transferred ${selectedIds.length} students to the updated batch schedule!`);
                }}
                className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold transition-all shadow-sm cursor-pointer"
              >
                Apply Batch Migration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Edit Student Quick Modal */}
      {isEditStudentModalOpen && editingStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/40 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Edit Student</h3>
                  <p className="font-body-sm text-outline">{editingStudent.enrollmentNo}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditStudentModalOpen(false)}
                className="p-1 rounded-md text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-3 pt-4">
              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-md focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={editingStudent.phone}
                  onChange={e => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-md focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Status
                  </label>
                  <select
                    value={editingStudent.status}
                    onChange={e =>
                      setEditingStudent({
                        ...editingStudent,
                        status: e.target.value as any,
                        statusBg:
                          e.target.value === 'Active'
                            ? 'bg-secondary-container/40'
                            : e.target.value === 'Completed'
                            ? 'bg-surface-container-high'
                            : 'bg-surface-container',
                        statusText:
                          e.target.value === 'Active'
                            ? 'text-on-secondary-container'
                            : e.target.value === 'Completed'
                            ? 'text-primary'
                            : 'text-outline',
                        statusDot:
                          e.target.value === 'Active'
                            ? 'bg-secondary'
                            : e.target.value === 'Completed'
                            ? 'bg-primary'
                            : 'bg-outline',
                      })
                    }
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Completed">Completed</option>
                    <option value="Dropped Out">Dropped Out</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Branch
                  </label>
                  <select
                    value={editingStudent.branch}
                    onChange={e => setEditingStudent({ ...editingStudent, branch: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Siliguri HQ">Siliguri HQ</option>
                    <option value="Binnaguri Campus">Binnaguri Campus</option>
                    <option value="Jalpaiguri Centre">Jalpaiguri Centre</option>
                    <option value="Cooch Behar">Cooch Behar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Grade / Class
                  </label>
                  <select
                    value={editingStudent.grade || 'Grade 11 (Science)'}
                    onChange={e => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Grade 12 (Science)">Grade 12 (Science)</option>
                    <option value="Grade 12 (Commerce)">Grade 12 (Commerce)</option>
                    <option value="Grade 12 (Arts)">Grade 12 (Arts)</option>
                    <option value="Grade 11 (Science)">Grade 11 (Science)</option>
                    <option value="Grade 11 (Commerce)">Grade 11 (Commerce)</option>
                    <option value="Grade 10-A">Grade 10-A</option>
                    <option value="Grade 10-B">Grade 10-B</option>
                    <option value="Grade 9-A">Grade 9-A</option>
                    <option value="Grade 9-B">Grade 9-B</option>
                    <option value="Higher Ed (Sem 4)">Higher Ed (Sem 4)</option>
                    <option value="Higher Ed (Sem 6)">Higher Ed (Sem 6)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Enrollment Date
                  </label>
                  <input
                    type="date"
                    value={editingStudent.enrollmentDate || '2025-08-15'}
                    onChange={e => setEditingStudent({ ...editingStudent, enrollmentDate: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsEditStudentModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-outline hover:bg-surface-container transition-colors cursor-pointer font-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: Export Students Directory to CSV Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-outline-variant/40 animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">table_chart</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Export Students Directory (CSV)
                  </h3>
                  <p className="font-body-sm text-outline">
                    Offline reporting spreadsheet for Excel, Google Sheets, or school compliance.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
                aria-label="Close export modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="space-y-5 pt-4">
              {/* 1. Choose Scope */}
              <div>
                <label className="block font-label-md text-label-md font-bold text-on-surface mb-2">
                  1. Choose Export Scope
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Current Filtered View */}
                  <label
                    className={`relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      exportScope === 'filtered'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportScope"
                      checked={exportScope === 'filtered'}
                      onChange={() => setExportScope('filtered')}
                      className="mt-0.5 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-on-surface">Current View (Filtered)</span>
                        <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                          {filteredStudents.length} records
                        </span>
                      </div>
                      <p className="text-[11px] text-outline mt-1 leading-normal">
                        Exports the current view based on active search, grade, date, and campus branch filters.
                      </p>
                      {/* Active filter summary tag */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-medium">
                          {selectedBranch}
                        </span>
                        {selectedGrade !== 'All Grades' && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-medium">
                            {selectedGrade}
                          </span>
                        )}
                        {searchQuery && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface font-medium">
                            &quot;{searchQuery}&quot;
                          </span>
                        )}
                      </div>
                    </div>
                  </label>

                  {/* Full Directory */}
                  <label
                    className={`relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      exportScope === 'full'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container-low'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportScope"
                      checked={exportScope === 'full'}
                      onChange={() => setExportScope('full')}
                      className="mt-0.5 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-on-surface">Full Directory (All)</span>
                        <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-secondary-container/60 text-secondary">
                          {students.length} records
                        </span>
                      </div>
                      <p className="text-[11px] text-outline mt-1 leading-normal">
                        Exports complete roster across all branches, courses, and batches without filter restrictions.
                      </p>
                      <div className="mt-2">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-secondary-container/40 text-on-secondary-container font-medium">
                          All Batches & Campus HQ
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Selected Only (if available) */}
                  {selectedIds.length > 0 && (
                    <label
                      className={`relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all sm:col-span-2 ${
                        exportScope === 'selected'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container-low'
                      }`}
                    >
                      <input
                        type="radio"
                        name="exportScope"
                        checked={exportScope === 'selected'}
                        onChange={() => setExportScope('selected')}
                        className="mt-0.5 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-on-surface">Selected Students in Table</span>
                          <span className="font-data-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                            {selectedIds.length} records
                          </span>
                        </div>
                        <p className="text-[11px] text-outline mt-1 leading-normal">
                          Exports only the students currently check-marked in the directory table.
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* 2. Choose Report Format Profile */}
              <div>
                <label className="block font-label-md text-label-md font-bold text-on-surface mb-2">
                  2. Choose Report Format Profile
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setExportReportFormat('comprehensive')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      exportReportFormat === 'comprehensive'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                      <span className="font-bold text-xs text-on-surface">Comprehensive</span>
                    </div>
                    <p className="text-[11px] text-outline">14 Columns: IDs, Academics, Batch, Contacts, & Fee ledger.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportReportFormat('academic')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      exportReportFormat === 'academic'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[18px] text-secondary">school</span>
                      <span className="font-bold text-xs text-on-surface">Academic Roster</span>
                    </div>
                    <p className="text-[11px] text-outline">11 Columns: Student, Grade, Course, Batch, Enrolled Date & Status.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportReportFormat('financial')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      exportReportFormat === 'financial'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-outline-variant/40 bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[18px] text-amber-600">payments</span>
                      <span className="font-bold text-xs text-on-surface">Fee & Ledger</span>
                    </div>
                    <p className="text-[11px] text-outline">10 Columns: Fee status, Amounts due, Invoice references, Overdue.</p>
                  </button>
                </div>
              </div>

              {/* 3. Offline Options */}
              <div className="rounded-xl p-3 bg-surface-container-low border border-outline-variant/30 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-on-surface">
                  <input
                    type="checkbox"
                    checked={includeMetadataHeader}
                    onChange={e => setIncludeMetadataHeader(e.target.checked)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Include Official Report Metadata Header</span>
                </label>
                <p className="text-[11px] text-outline pl-6">
                  Adds institutional audit header lines with generation timestamp, active filters, record counts, and school branch header.
                </p>

                <div className="flex items-center gap-2 text-[11px] text-outline pl-6 pt-1">
                  <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
                  <span>UTF-8 BOM enabled: fully compatible with Microsoft Excel (Windows/Mac), Numbers, and Google Sheets without encoding errors.</span>
                </div>
              </div>

              {/* Summary of Action */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary">download_done</span>
                  <span>
                    Ready to export{' '}
                    <strong className="text-primary font-bold">
                      {exportScope === 'full'
                        ? students.length
                        : exportScope === 'selected'
                        ? selectedIds.length
                        : filteredStudents.length}
                    </strong>{' '}
                    records ({exportReportFormat} format)
                  </span>
                </div>
                <span className="font-data-mono text-[11px] text-outline">.CSV Spreadsheet</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5 pt-5 border-t border-outline-variant/30 mt-5">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg text-outline hover:bg-surface-container transition-colors cursor-pointer font-label-md text-xs font-semibold"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleExportCSV(exportScope, exportReportFormat, includeMetadataHeader)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-semibold transition-all shadow-sm cursor-pointer text-xs active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>
                    Download {exportScope === 'full' ? 'Full Directory' : exportScope === 'selected' ? 'Selected' : 'Filtered View'} CSV
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
