import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ScreenType } from '../types';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'students' | 'courses' | 'pages';
  screen: ScreenType;
  icon: string;
  badge?: string;
  badgeColorClass?: string;
  keywords: string[];
  meta?: {
    admissionNo?: string;
    enrollmentNo?: string;
    branch?: string;
    faculty?: string;
    code?: string;
    status?: string;
    feeStatus?: string;
  };
  anchorId?: string;
}

export const GLOBAL_SEARCH_ITEMS: SearchResultItem[] = [
  // 1. SPECIFIC STUDENTS (From Institutional Records)
  {
    id: 'std-1',
    title: 'Rahul Kumar',
    subtitle: 'ADM-2026-00125 • Web Development • Siliguri HQ (Grade 11 Science)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['rahul', 'kumar', 'adm-2026-00125', 'abc-sil-26-00125', 'web development', 'siliguri', '9876543210', 'science'],
    meta: {
      admissionNo: 'ADM-2026-00125',
      enrollmentNo: 'ABC-SIL-26-00125',
      branch: 'Siliguri HQ',
      status: 'Active',
      feeStatus: 'Due ₹7,000',
    },
  },
  {
    id: 'std-2',
    title: 'Priya Sengupta',
    subtitle: 'ADM-2026-00341 • Digital Marketing Pro • Binnaguri Campus (Grade 12 Commerce)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['priya', 'sengupta', 'adm-2026-00341', 'abc-bin-26-00341', 'digital marketing', 'binnaguri', '9832165490', 'commerce'],
    meta: {
      admissionNo: 'ADM-2026-00341',
      enrollmentNo: 'ABC-BIN-26-00341',
      branch: 'Binnaguri Campus',
      status: 'Active',
      feeStatus: 'Paid Full',
    },
  },
  {
    id: 'std-3',
    title: 'Amitav Roy',
    subtitle: 'ADM-2026-00892 • Tally Prime & GST • Jalpaiguri Centre (Grade 10-A)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['amitav', 'roy', 'adm-2026-00892', 'abc-jal-26-00892', 'tally prime', 'gst', 'jalpaiguri', '9434012876'],
    meta: {
      admissionNo: 'ADM-2026-00892',
      enrollmentNo: 'ABC-JAL-26-00892',
      branch: 'Jalpaiguri Centre',
      status: 'Active',
      feeStatus: 'Paid Full',
    },
  },
  {
    id: 'std-4',
    title: 'Ananya Bose',
    subtitle: 'ADM-2026-00194 • Graphic & UI Design • Siliguri HQ (Grade 12 Arts)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Fee Overdue',
    badgeColorClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    keywords: ['ananya', 'bose', 'adm-2026-00194', 'abc-sil-26-00194', 'graphic', 'ui design', 'siliguri', '9733144521', 'overdue'],
    meta: {
      admissionNo: 'ADM-2026-00194',
      enrollmentNo: 'ABC-SIL-26-00194',
      branch: 'Siliguri HQ',
      status: 'Inactive',
      feeStatus: 'Due ₹12,000 (32 Days Overdue)',
    },
  },
  {
    id: 'std-5',
    title: 'Mohammad Zeeshan',
    subtitle: 'ADM-2026-00210 • Computer Fundamentals • Siliguri HQ (Cert #ED-7821 Issued)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Completed',
    badgeColorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    keywords: ['mohammad', 'zeeshan', 'adm-2026-00210', 'abc-sil-26-00210', 'computer fundamentals', 'siliguri', '9811233455', 'graduated'],
    meta: {
      admissionNo: 'ADM-2026-00210',
      enrollmentNo: 'ABC-SIL-26-00210',
      branch: 'Siliguri HQ',
      status: 'Completed',
      feeStatus: 'Paid Full',
    },
  },
  {
    id: 'std-6',
    title: 'Tanusree Paul',
    subtitle: 'ADM-2026-00415 • Spoken English & Comm. • Binnaguri Campus (Grade 9-A)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['tanusree', 'paul', 'adm-2026-00415', 'abc-bin-26-00415', 'spoken english', 'binnaguri', '9474189012'],
    meta: {
      admissionNo: 'ADM-2026-00415',
      enrollmentNo: 'ABC-BIN-26-00415',
      branch: 'Binnaguri Campus',
      status: 'Active',
      feeStatus: 'Due ₹2,500',
    },
  },
  {
    id: 'std-7',
    title: 'Devansh Mukherjee',
    subtitle: 'ADM-2026-00512 • Python & AI Data • Siliguri HQ (Grade 12 Science)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['devansh', 'mukherjee', 'adm-2026-00512', 'abc-sil-26-00512', 'python', 'ai data', 'machine learning', 'siliguri', '9830299881'],
    meta: {
      admissionNo: 'ADM-2026-00512',
      enrollmentNo: 'ABC-SIL-26-00512',
      branch: 'Siliguri HQ',
      status: 'Active',
      feeStatus: 'Paid Full ₹32,000',
    },
  },
  {
    id: 'std-8',
    title: 'Sneha Chakraborty',
    subtitle: 'ADM-2026-00633 • Tally Prime & GST • Jalpaiguri Centre (Grade 11 Commerce)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['sneha', 'chakraborty', 'adm-2026-00633', 'abc-jal-26-00633', 'tally', 'gst', 'jalpaiguri', '9433177665'],
    meta: {
      admissionNo: 'ADM-2026-00633',
      enrollmentNo: 'ABC-JAL-26-00633',
      branch: 'Jalpaiguri Centre',
      status: 'Active',
      feeStatus: 'Due ₹4,000',
    },
  },
  {
    id: 'std-9',
    title: 'Rohan Das',
    subtitle: 'ADM-2026-00741 • Computer Fundamentals • Siliguri HQ (Grade 10-B)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['rohan', 'das', 'adm-2026-00741', 'abc-sil-26-00741', 'computer fundamentals', 'siliguri', '9748211447'],
    meta: {
      admissionNo: 'ADM-2026-00741',
      enrollmentNo: 'ABC-SIL-26-00741',
      branch: 'Siliguri HQ',
      status: 'Active',
      feeStatus: 'Paid Full',
    },
  },
  {
    id: 'std-10',
    title: 'Meera Iyer',
    subtitle: 'ADM-2026-00820 • Spoken English & Comm. • Binnaguri Campus (Grade 9-B)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['meera', 'iyer', 'adm-2026-00820', 'abc-bin-26-00820', 'spoken english', 'binnaguri', '9821055667'],
    meta: {
      admissionNo: 'ADM-2026-00820',
      enrollmentNo: 'ABC-BIN-26-00820',
      branch: 'Binnaguri Campus',
      status: 'Active',
      feeStatus: 'Paid Full',
    },
  },
  {
    id: 'std-11',
    title: 'Karan Verma',
    subtitle: 'ADM-2026-00910 • Web Development Weekend • Siliguri HQ (Higher Ed Sem 4)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Active',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['karan', 'verma', 'adm-2026-00910', 'abc-sil-26-00910', 'web development', 'siliguri', '9801433221'],
    meta: {
      admissionNo: 'ADM-2026-00910',
      enrollmentNo: 'ABC-SIL-26-00910',
      branch: 'Siliguri HQ',
      status: 'Active',
      feeStatus: 'Due ₹6,500',
    },
  },
  {
    id: 'std-12',
    title: 'Pooja Sharma',
    subtitle: 'ADM-2026-00995 • Graphic & UI Design • Cooch Behar Campus (Grade 12 Arts)',
    category: 'students',
    screen: 'students-directory',
    icon: 'person',
    badge: 'Completed',
    badgeColorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    keywords: ['pooja', 'sharma', 'adm-2026-00995', 'abc-coo-26-00995', 'graphic design', 'cooch behar', '9732188990'],
    meta: {
      admissionNo: 'ADM-2026-00995',
      enrollmentNo: 'ABC-COO-26-00995',
      branch: 'Cooch Behar',
      status: 'Completed',
      feeStatus: 'Paid Full',
    },
  },

  // 2. SPECIFIC COURSES & BATCHES
  {
    id: 'crs-1',
    title: 'Full Stack Web Development',
    subtitle: 'Code: WD-EVE-04 • Faculty: Amit Sharma • Evening Cohort 4 (MERN + Cloud Stack) • Siliguri HQ',
    category: 'courses',
    screen: 'courses-batches',
    icon: 'code',
    badge: 'Flagship (95% full)',
    badgeColorClass: 'bg-primary/10 text-primary border border-primary/20',
    keywords: ['full stack', 'web development', 'wd-eve-04', 'wd-01', 'react', 'node', 'amit sharma', 'siliguri', 'mern', 'cloud', 'javascript'],
    meta: {
      code: 'WD-EVE-04',
      faculty: 'Amit Sharma',
      branch: 'Siliguri HQ',
      status: 'Active',
    },
  },
  {
    id: 'crs-2',
    title: 'Advanced Digital Marketing',
    subtitle: 'Code: DM-MOR-02 • Faculty: Sunita Paul • Morning Cohort 2 (Performance Marketing) • Binnaguri',
    category: 'courses',
    screen: 'courses-batches',
    icon: 'campaign',
    badge: 'Batch Full (4 Waitlist)',
    badgeColorClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
    keywords: ['advanced digital marketing', 'dm-mor-02', 'dm-02', 'performance marketing', 'sunita paul', 'binnaguri', 'seo', 'sem', 'social media'],
    meta: {
      code: 'DM-MOR-02',
      faculty: 'Sunita Paul',
      branch: 'Binnaguri',
      status: 'Full',
    },
  },
  {
    id: 'crs-3',
    title: 'Tally Prime with GST & TDS',
    subtitle: 'Code: TP-WKD-01 • Faculty: Manoj Verma • Weekend Fast-Track (Accounts Lab B) • Jalpaiguri',
    category: 'courses',
    screen: 'courses-batches',
    icon: 'account_balance_wallet',
    badge: 'Weekend Cohort',
    badgeColorClass: 'bg-secondary/10 text-secondary border border-secondary/20',
    keywords: ['tally prime', 'gst', 'tds', 'tp-wkd-01', 'tp-03', 'accounting', 'manoj verma', 'jalpaiguri', 'finance', 'ledger'],
    meta: {
      code: 'TP-WKD-01',
      faculty: 'Manoj Verma',
      branch: 'Jalpaiguri',
      status: 'Active',
    },
  },
  {
    id: 'crs-4',
    title: 'Graphic Design & UI/UX',
    subtitle: 'Code: GD-AFT-03 • Faculty: Rakesh Sen • Afternoon Studio 3 (Figma & Creative Suite) • Siliguri HQ',
    category: 'courses',
    screen: 'courses-batches',
    icon: 'palette',
    badge: 'Studio Batch',
    badgeColorClass: 'bg-tertiary/10 text-tertiary border border-tertiary/20',
    keywords: ['graphic design', 'ui ux', 'figma', 'gd-aft-03', 'gd-04', 'adobe', 'rakesh sen', 'siliguri', 'wireframes', 'prototype'],
    meta: {
      code: 'GD-AFT-03',
      faculty: 'Rakesh Sen',
      branch: 'Siliguri HQ',
      status: 'Active',
    },
  },
  {
    id: 'crs-5',
    title: 'Spoken English & Personality',
    subtitle: 'Code: SE-EVE-01 • Faculty: Debolina Mitra • Evening Daily (Business Communication) • Cooch Behar',
    category: 'courses',
    screen: 'courses-batches',
    icon: 'record_voice_over',
    badge: 'Daily (93% cap)',
    badgeColorClass: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
    keywords: ['spoken english', 'personality development', 'se-eve-01', 'se-05', 'business communication', 'debolina mitra', 'cooch behar', 'grammar'],
    meta: {
      code: 'SE-EVE-01',
      faculty: 'Debolina Mitra',
      branch: 'Cooch Behar',
      status: 'Active',
    },
  },
  {
    id: 'crs-6',
    title: 'Python & AI Data Science',
    subtitle: 'Code: PY-AFT-03 • Machine Learning, Pandas, Scikit-Learn & Predictive Analytics • Siliguri HQ',
    category: 'courses',
    screen: 'courses-batches',
    icon: 'smart_toy',
    badge: 'AI Flagship',
    badgeColorClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20',
    keywords: ['python', 'ai data science', 'py-aft-03', 'py-06', 'machine learning', 'artificial intelligence', 'pandas', 'siliguri'],
    meta: {
      code: 'PY-AFT-03',
      faculty: 'Dr. Arvind Patel',
      branch: 'Siliguri HQ',
      status: 'Active',
    },
  },
  {
    id: 'crs-7',
    title: 'Cloud Architecture & AWS SysOps',
    subtitle: 'Code: AWS-MOR-01 • Docker Containers, Kubernetes Orchestration & CI/CD Pipelines • Jalpaiguri',
    category: 'courses',
    screen: 'courses-batches',
    icon: 'cloud',
    badge: 'Enterprise Tech',
    badgeColorClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    keywords: ['cloud architecture', 'aws sysops', 'aws-mor-01', 'aws-07', 'devops', 'docker', 'kubernetes', 'jalpaiguri', 'infra'],
    meta: {
      code: 'AWS-MOR-01',
      faculty: 'Rajesh Kumar',
      branch: 'Jalpaiguri',
      status: 'Active',
    },
  },
  {
    id: 'crs-8',
    title: 'Cyber Security & Ethical Hacking',
    subtitle: 'Code: SEC-WKD-02 • Network Defense, Penetration Testing & SOC Lab Simulations • Siliguri HQ',
    category: 'courses',
    screen: 'courses-batches',
    icon: 'security',
    badge: 'Security Lab',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['cyber security', 'ethical hacking', 'sec-wkd-02', 'sec-08', 'infosec', 'penetration testing', 'soc', 'siliguri'],
    meta: {
      code: 'SEC-WKD-02',
      faculty: 'Neha Kapoor',
      branch: 'Siliguri HQ',
      status: 'Active',
    },
  },

  // 3. ADMINISTRATIVE & ACADEMIC PAGES
  {
    id: 'page-dashboard',
    title: 'Admin Dashboard',
    subtitle: 'Institutional KPI overview, multi-campus student statistics, live fee ledger & system alerts',
    category: 'pages',
    screen: 'dashboard',
    icon: 'grid_view',
    badge: 'Admin Core',
    badgeColorClass: 'bg-primary/10 text-primary border border-primary/20',
    keywords: ['admin dashboard', 'dashboard', 'overview', 'kpi', 'revenue', 'analytics', 'statistics', 'attendance rate', 'alerts'],
  },
  {
    id: 'page-students-directory',
    title: 'Students Directory',
    subtitle: 'Roster registry, search by enrollment/admission no, batch filters, fee dues & CSV export',
    category: 'pages',
    screen: 'students-directory',
    icon: 'group',
    badge: 'Students Roster',
    badgeColorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    keywords: ['students directory', 'directory', 'students list', 'roster', 'csv export', 'export', 'admission no', 'fee filter', 'roll number'],
  },
  {
    id: 'page-student-profile',
    title: 'Student 360° Profile',
    subtitle: 'Deep-dive academic dossier, biometric attendance history, parent details & financial invoice logs',
    category: 'pages',
    screen: 'student-profile',
    icon: 'badge',
    badge: 'Profile 360°',
    badgeColorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
    keywords: ['student profile', 'student 360', 'dossier', 'biometric attendance', 'parent contacts', 'invoices', 'rahul kumar profile'],
  },
  {
    id: 'page-courses-batches',
    title: 'Courses & Batches Management',
    subtitle: 'Academic program catalog, classroom allocation matrix, faculty assignments & cohort planner',
    category: 'pages',
    screen: 'courses-batches',
    icon: 'menu_book',
    badge: 'Curriculum',
    badgeColorClass: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20',
    keywords: ['courses', 'batches', 'cohorts', 'curriculum', 'classroom schedule', 'faculty', 'fast batch creator', 'subjects'],
  },
  {
    id: 'page-admissions',
    title: 'Admissions & CRM Leads',
    subtitle: 'Prospective student enquiry pipeline, walk-in leads, counsellor call logs & admission conversions',
    category: 'pages',
    screen: 'admissions',
    icon: 'contact_support',
    badge: 'Admissions CRM',
    badgeColorClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    keywords: ['admissions', 'crm', 'leads', 'enquiries', 'counsellor notes', 'walk-in', 'conversions', 'applicant pipeline'],
  },
  {
    id: 'page-certificates',
    title: 'Certificates Console',
    subtitle: 'Cryptographic credentials registry, batch QR verification, digital credential issuance & audit log',
    category: 'pages',
    screen: 'certificates',
    icon: 'workspace_premium',
    badge: 'Credentials',
    badgeColorClass: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20',
    keywords: ['certificates console', 'certificates', 'credentials', 'qr verification', 'diploma', 'issuance', 'blockchain hash'],
  },
  {
    id: 'page-certificate-studio',
    title: 'Certificate Template Studio',
    subtitle: 'Drag-and-drop certificate layout builder, guilloche border styling, dynamic merge tags & watermark',
    category: 'pages',
    screen: 'certificate-studio',
    icon: 'draw',
    badge: 'Design Studio',
    badgeColorClass: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20',
    keywords: ['certificate template studio', 'template designer', 'certificate studio', 'guilloche', 'watermark', 'signature seal'],
  },
  {
    id: 'page-admin',
    title: 'Super Admin Console',
    subtitle: 'Multi-campus tenant governance, institution licensing, Stripe payouts & cryptographic root CA',
    category: 'pages',
    screen: 'admin',
    icon: 'admin_panel_settings',
    badge: 'Super Admin PRO',
    badgeColorClass: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
    keywords: ['super admin console', 'super admin', 'tenants', 'institutions list', 'stripe payout', 'compliance', 'system security'],
  },
  {
    id: 'page-onboarding',
    title: 'Campus Setup (Step 2 Wizard)',
    subtitle: 'Satellite branch provisioning, campus geolocation, seating capacity & department configuration',
    category: 'pages',
    screen: 'onboarding',
    icon: 'domain_add',
    badge: 'Setup Wizard',
    badgeColorClass: 'bg-secondary/10 text-secondary border border-secondary/20',
    keywords: ['campus setup', 'step 2', 'onboarding', 'branch campuses', 'satellite', 'geolocation', 'multi-branch wizard'],
  },
  {
    id: 'page-register',
    title: 'Create Institution (Step 1)',
    subtitle: 'Institution primary registration, administrator credentials, school domain & account setup',
    category: 'pages',
    screen: 'register',
    icon: 'add_business',
    badge: 'Registration',
    badgeColorClass: 'bg-primary/10 text-primary border border-primary/20',
    keywords: ['create institution', 'register institution', 'step 1', 'signup', 'institution registration', 'admin account'],
  },
  {
    id: 'page-timetable',
    title: 'Timetable & Schedule',
    subtitle: 'Weekly master timetable, periods allocation, lab clash resolution & faculty workload monitor',
    category: 'pages',
    screen: 'timetable-schedule',
    icon: 'calendar_month',
    badge: 'Academic',
    badgeColorClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
    keywords: ['timetable', 'schedule', 'weekly timetable', 'periods', 'room allocation', 'lecture schedule', 'routine'],
  },
  {
    id: 'page-academics',
    title: 'Exams & Assessments',
    subtitle: 'Term examination schedules, hall ticket generation, invigilation duty rosters & grading rubrics',
    category: 'pages',
    screen: 'academics',
    icon: 'assignment',
    badge: 'Academic',
    badgeColorClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
    keywords: ['exams and assessments', 'exams', 'assessments', 'hall tickets', 'invigilator duty', 'exam slots', 'mid-terms'],
  },
  {
    id: 'page-marks-entry',
    title: 'Marks Entry Console',
    subtitle: 'Faculty term score entry sheets, moderation workflow, internal assessments & GPA calculation',
    category: 'pages',
    screen: 'marks-entry',
    icon: 'grade',
    badge: 'Academic',
    badgeColorClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
    keywords: ['marks entry console', 'marks entry', 'grades entry', 'scoresheet', 'gpa calculator', 'internal marks', 'moderation'],
  },
  {
    id: 'page-results-transcripts',
    title: 'Results & Transcripts',
    subtitle: 'Automated report card compilation, transcript generation, grade point averages & class ranks',
    category: 'pages',
    screen: 'results-transcripts',
    icon: 'verified',
    badge: 'Academic',
    badgeColorClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
    keywords: ['results and transcripts', 'results', 'transcripts', 'report card', 'class rankings', 'semester grade sheet'],
  },
  {
    id: 'page-assignments',
    title: 'Assignments & Coursework',
    subtitle: 'Homework submission portals, plagiarism check, grading rubrics, attachments & due dates',
    category: 'pages',
    screen: 'assignments-coursework',
    icon: 'task',
    badge: 'Academic',
    badgeColorClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
    keywords: ['assignments and coursework', 'assignments', 'homework', 'coursework', 'submissions', 'rubric', 'due date'],
  },
  {
    id: 'page-teacher-portal',
    title: 'Teacher Portal',
    subtitle: 'Faculty daily attendance register, syllabus coverage tracker, class diaries & student notes',
    category: 'pages',
    screen: 'teacher-portal',
    icon: 'school',
    badge: 'Portal',
    badgeColorClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20',
    keywords: ['teacher portal', 'faculty portal', 'attendance register', 'syllabus progress', 'teacher dashboard'],
  },
  {
    id: 'page-student-portal',
    title: 'Student Portal',
    subtitle: 'Learner LMS workspace, video lectures, homework submissions, timetable & digital report card',
    category: 'pages',
    screen: 'student-portal',
    icon: 'person',
    badge: 'Portal',
    badgeColorClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20',
    keywords: ['student portal', 'learner lms', 'student dashboard', 'my courses', 'study materials', 'video lectures'],
  },
  {
    id: 'page-parent-portal',
    title: 'Parent Portal',
    subtitle: 'Guardian monitoring dashboard, online tuition fee payments, GPS school bus tracking & report cards',
    category: 'pages',
    screen: 'parent-portal',
    icon: 'family_restroom',
    badge: 'Portal',
    badgeColorClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20',
    keywords: ['parent portal', 'guardian dashboard', 'fee payment receipt', 'school bus tracking', 'ward progress'],
  },
  {
    id: 'page-landing',
    title: 'Landing Page Showcase',
    subtitle: 'Platform overview, 12 modules breakdown, multi-branch topology, campus map & instant demo',
    category: 'pages',
    screen: 'landing',
    icon: 'home',
    badge: 'Homepage',
    badgeColorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    keywords: ['landing page', 'homepage', 'home', 'overview', 'features', 'modules', 'demo', 'platform showcase'],
  },
];

interface GlobalSearchBarProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast?: (message: string) => void;
}

export const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ onNavigate, onShowToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'students' | 'courses' | 'pages'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K / '/' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle dialog with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Press '/' to search if not currently focusing an input or textarea
      else if (
        e.key === '/' &&
        !isOpen &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
      // Close with Escape
      else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Filtered Results
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return GLOBAL_SEARCH_ITEMS.filter((item) => {
      // Filter by category tab
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // If empty query, show all items for this category (or top suggestions)
      if (!q) {
        return true;
      }

      // Check title, subtitle, keywords, meta
      const inTitle = item.title.toLowerCase().includes(q);
      const inSubtitle = item.subtitle.toLowerCase().includes(q);
      const inKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      const inMeta = item.meta
        ? Object.values(item.meta).some((v) => v?.toLowerCase().includes(q))
        : false;

      return inTitle || inSubtitle || inKeywords || inMeta;
    });
  }, [query, activeCategory]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Counts by category for quick badges
  const categoryCounts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const countCategory = (cat: 'students' | 'courses' | 'pages') => {
      return GLOBAL_SEARCH_ITEMS.filter((item) => {
        if (item.category !== cat) return false;
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q)) ||
          (item.meta && Object.values(item.meta).some((v) => v?.toLowerCase().includes(q)))
        );
      }).length;
    };

    return {
      all: GLOBAL_SEARCH_ITEMS.filter((item) => {
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q)) ||
          (item.meta && Object.values(item.meta).some((v) => v?.toLowerCase().includes(q)))
        );
      }).length,
      students: countCategory('students'),
      courses: countCategory('courses'),
      pages: countCategory('pages'),
    };
  }, [query]);

  // Handle Selection & Jump
  const handleSelectItem = (item: SearchResultItem) => {
    setIsOpen(false);
    onNavigate(item.screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (item.category === 'students') {
      onShowToast?.(`Jumped to student: ${item.title} (${item.meta?.admissionNo || item.screen})`);
    } else if (item.category === 'courses') {
      onShowToast?.(`Jumped to course: ${item.title} (${item.meta?.code || ''})`);
    } else {
      onShowToast?.(`Opened ${item.title}`);
    }
  };

  // Keyboard navigation inside list
  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
    }
  };

  // Text highlighter helper
  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark
              key={i}
              className="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary font-bold px-0.5 rounded"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <>
      {/* 1. NAVBAR TRIGGER SEARCH BAR (Desktop & Mobile) */}
      <div className="relative flex items-center">
        {/* Desktop / Laptop Input Trigger (Visible only above 1501px with icon + text) */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="hidden min-[1501px]:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface-container-highest/40 hover:bg-surface-container-highest/75 text-on-surface-variant hover:text-white border border-white/10 hover:border-white/25 text-xs transition-all w-44 xl:w-56 text-left cursor-pointer group shadow-inner"
          title="Global Search (Ctrl+K or /)"
          aria-label="Search students, courses, or admin pages"
        >
          <span className="material-symbols-outlined text-[16px] text-primary group-hover:text-primary transition-colors flex-shrink-0">
            search
          </span>
          <span className="flex-1 truncate text-outline-variant group-hover:text-white/80 select-none">
            Search...
          </span>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container-highest/70 text-[10px] font-mono text-outline-variant border border-white/10 group-hover:border-white/20 select-none">
            <span className="text-[9px]">⌘</span>K
          </kbd>
        </button>

        {/* Compact Search Icon Button (Visible on all screens below 1501px) */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="min-[1501px]:hidden p-1.5 rounded-lg bg-surface-container-highest/40 hover:bg-surface-container-highest/70 text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors"
          title="Search students, courses, or pages"
          aria-label="Open Global Search"
        >
          <span className="material-symbols-outlined text-[17px]">search</span>
        </button>
      </div>

      {/* 2. GLOBAL SEARCH MODAL COMMAND PALETTE */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Global Search Command Palette"
          className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm flex items-start justify-center pt-8 sm:pt-16 px-3 sm:px-4 animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className="w-full max-w-2xl bg-surface-container-lowest text-on-surface rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header Bar */}
            <div className="p-3 sm:p-4 border-b border-surface-container flex items-center gap-2.5 sm:gap-3 bg-surface-container-low/40">
              <span className="material-symbols-outlined text-[22px] text-primary flex-shrink-0">
                search
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDownInInput}
                placeholder="Search students (e.g. Rahul, ADM-2026), courses (e.g. Web Dev), or pages..."
                className="flex-1 bg-transparent text-sm sm:text-base text-on-surface placeholder:text-outline focus:outline-none font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-md hover:bg-surface-container text-outline hover:text-on-surface transition-colors cursor-pointer"
                  title="Clear query"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1"
                title="Press Escape to close"
              >
                <span>ESC</span>
              </button>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="px-3 sm:px-4 py-2 border-b border-surface-container-low bg-surface-container-lowest flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-outline mr-1 hidden sm:inline">
                Scope:
              </span>
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-2.5 py-1 rounded-full font-semibold transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span>All Results</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
                  {categoryCounts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('students')}
                className={`px-2.5 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'students'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">school</span>
                <span>Students</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
                  {categoryCounts.students}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('courses')}
                className={`px-2.5 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'courses'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                <span>Courses</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
                  {categoryCounts.courses}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('pages')}
                className={`px-2.5 py-1 rounded-full font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeCategory === 'pages'
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">settings</span>
                <span>Admin Pages</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
                  {categoryCounts.pages}
                </span>
              </button>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-2 sm:p-3 divide-y divide-surface-container-low max-h-[55vh]"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-surface-container mx-auto flex items-center justify-center text-outline mb-3">
                    <span className="material-symbols-outlined text-[24px]">search_off</span>
                  </div>
                  <h4 className="font-semibold text-sm text-on-surface">No results found for &ldquo;{query}&rdquo;</h4>
                  <p className="text-xs text-outline mt-1 max-w-sm mx-auto">
                    Try checking the spelling, or search for student names, admission numbers (e.g. ADM-2026), courses (e.g. Web Dev), or administrative screens.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                    <span className="text-[11px] text-outline">Suggestions:</span>
                    {['Rahul', 'Full Stack', 'Super Admin', 'Directory', 'Certificates'].map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => {
                          setQuery(sug);
                          inputRef.current?.focus();
                        }}
                        className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high text-[11px] text-primary font-medium cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {/* Quick Category Header if query is empty */}
                  {!query && activeCategory === 'all' && (
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-outline flex items-center justify-between">
                      <span>Frequently Visited &amp; Quick Shortcuts</span>
                      <span className="font-mono text-[9px]">Use ↑ ↓ to navigate</span>
                    </div>
                  )}

                  {filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        data-index={index}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer flex items-start sm:items-center gap-3 group border ${
                          isSelected
                            ? 'bg-primary/10 border-primary/30 shadow-xs'
                            : 'border-transparent hover:bg-surface-container/60'
                        }`}
                      >
                        {/* Icon badge */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            item.category === 'students'
                              ? isSelected
                                ? 'bg-primary text-white'
                                : 'bg-primary/15 text-primary'
                              : item.category === 'courses'
                              ? isSelected
                                ? 'bg-secondary text-white'
                                : 'bg-secondary/15 text-secondary'
                              : isSelected
                              ? 'bg-tertiary text-white'
                              : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        </div>

                        {/* Title and details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                              {highlightMatch(item.title, query)}
                            </span>

                            {/* Badge */}
                            {item.badge && (
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold font-data-mono uppercase ${
                                  item.badgeColorClass || 'bg-surface-container text-on-surface-variant'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}

                            {/* Category Indicator Tag */}
                            <span className="text-[10px] uppercase font-bold text-outline opacity-70 ml-auto hidden sm:inline">
                              {item.category === 'students'
                                ? 'Student'
                                : item.category === 'courses'
                                ? 'Course'
                                : 'Page'}
                            </span>
                          </div>

                          <p className="text-[11px] sm:text-xs text-outline line-clamp-1 mt-0.5 leading-snug">
                            {highlightMatch(item.subtitle, query)}
                          </p>
                        </div>

                        {/* Action hint icon */}
                        <div className="flex-shrink-0 self-center">
                          <span
                            className={`material-symbols-outlined text-[18px] transition-transform ${
                              isSelected
                                ? 'text-primary translate-x-0.5'
                                : 'text-outline opacity-40 group-hover:opacity-100'
                            }`}
                          >
                            arrow_forward
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer with keyboard shortcuts */}
            <div className="p-2.5 sm:p-3 border-t border-surface-container bg-surface-container-low/50 flex items-center justify-between text-[11px] text-outline">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] border border-surface-container-high">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] border border-surface-container-high">
                    ↓
                  </kbd>
                  <span className="hidden sm:inline">Navigate</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] border border-surface-container-high">
                    ↵
                  </kbd>
                  <span>Select &amp; Jump</span>
                </span>
                <span className="inline-flex items-center gap-1 hidden sm:inline">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] border border-surface-container-high">
                    ESC
                  </kbd>
                  <span>Close</span>
                </span>
              </div>

              <div className="font-medium text-primary flex items-center gap-1 text-[11px]">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span>Instant Jump</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
