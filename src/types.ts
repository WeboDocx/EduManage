export type ScreenType = 'timetable-schedule' | 'teacher-portal' | 'student-portal' | 'parent-portal' | 'assignments-coursework' | 'results-transcripts' | 'marks-entry' | 'academics' | 'certificates' | 'certificate-studio' | 'students-directory' | 'student-profile' | 'dashboard' | 'courses-batches' | 'admissions' | 'landing' | 'register' | 'onboarding' | 'admin';

export interface BatchItem {
  id: string;
  code: string;
  cohort: string;
  courseName: string;
  courseSpecialization: string;
  shortCode: string;
  badgeBg: string;
  badgeTextColor: string;
  campus: string;
  campusDotColor: string;
  facultyName: string;
  facultyInitials: string;
  room: string;
  days: string;
  timeSlot: string;
  enrolled: number;
  capacity: number;
  fillPercentage: number;
  status: 'Active' | 'Full' | 'Upcoming';
  waitlistCount?: number;
  isNearFull?: boolean;
}

export interface CounsellorNote {
  id: string;
  author: string;
  role?: string;
  time: string;
  text: string;
  audioLogged?: string;
}

export interface LeadApplicant {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  phone: string;
  email?: string;
  course: string;
  courseDetail: string;
  branch: string;
  source: 'Website Form' | 'Walk-in' | 'Facebook Ad' | 'JustDial' | 'Reference' | 'Google Search';
  sourceIcon: string;
  sourceColor: string;
  counsellor: string;
  counsellorInitials: string;
  counsellorRole: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Demo Scheduled' | 'Application' | 'Admitted';
  statusBadgeBg: string;
  statusBadgeText: string;
  statusDotColor: string;
  lastActive: string;
  enquiryId: string;
  priority: 'HIGH PRIORITY' | 'MEDIUM PRIORITY' | 'LOW PRIORITY' | 'URGENT';
  highIntent: boolean;
  budget: string;
  nextFollowUp: string;
  conversionStep: number; // 1 to 5
  conversionStepName: string;
  notes: CounsellorNote[];
  directAdmissionReady: boolean;
  enrollmentPreview: string;
  suggestedBatch: string;
  isLabDemoToday?: boolean;
  isOverdue?: boolean;
  isPendingFeeVerification?: boolean;
}

export interface Institution {
  id: string;
  code: string;
  name: string;
  domain: string;
  type: 'School (K-12)' | 'Coaching Chain' | 'Training Center' | 'Tuition Center' | 'Higher Education';
  branches: number;
  enrolled: number;
  capacityRate: string;
  plan: 'Enterprise' | 'Professional' | 'Starter (Trial)';
  status: 'Active' | 'Pending Review' | '14d Trial' | 'Suspended';
  registeredDate: string;
  avatarLetter: string;
  avatarBg: string;
  avatarTextColor: string;
  warningNote?: string;
}

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  seatsRemaining?: number;
  status: 'Admissions Open 2025' | 'Waitlist Only' | 'Open Soon';
  badgeColor: string;
  termNote?: string;
  actionText: string;
}

export interface AuditEvent {
  id: string;
  type: 'branch_add' | 'tier_upgrade' | 'new_registration' | 'cert_validation' | 'payment_payout';
  title: string;
  highlightText?: string;
  description: string;
  timeAgo: string;
  uuidOrImpact: string;
  tag: string;
  tagColorClass: string;
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  actionButton?: string;
}

export interface RegistrationFormData {
  institutionType: string;
  institutionName: string;
  adminName: string;
  workEmail: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface CampusSetupData {
  legalName: string;
  entityClassification: string;
  supportPhone: string;
  adminEmail: string;
  websiteUrl: string;
  affiliationCode: string;
  hqAddress: string;
  branchDisplayName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  primaryColor: string;
  secondaryColor: string;
  logoFileName: string;
  faviconFileName: string;
}
