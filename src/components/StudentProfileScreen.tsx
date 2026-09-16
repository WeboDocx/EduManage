import React, { useState } from 'react';
import { ScreenType } from '../types';
import { BRAND_HOTLINKS } from '../data/mockData';

interface StudentProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

type TabType =
  | 'overview'
  | 'academic'
  | 'attendance'
  | 'fees'
  | 'exams'
  | 'documents'
  | 'certificates'
  | 'audit';

export const StudentProfileScreen: React.FC<StudentProfileScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Student dynamic state
  const [student, setStudent] = useState({
    name: 'Rahul Kumar',
    status: 'Active Student',
    genderAge: 'Male, 19 Yrs',
    uid: 'ABC-SIL-26-00125',
    admNo: 'ADM-2026-00125',
    branch: 'Siliguri Branch (Main HQ)',
    course: 'Full Stack Web Development',
    batch: 'WD Evening (Batch 04)',
    enrolledDate: '12 June 2025',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBz96omm1nB0w5gzsYytho_YNCc5w1JtuNO9OkWLCPoc0QmhpNnX0yUREL6FCnV1dTfXcBdu-VltTHuzW4zk6_q5CqJllnxHI5NO2Uei7f91zMH7GZLYZ0ANNJ4OndSaRD4sG4rdf-CFZJaaD4rGAoVsMgpHY848anvkMQmfU3WmMYx-p28RZ6BNIDEGPTFhNK8rJUIBoAgWh5srD1AAdhyWIBktc42PrbvTc8F4g7jHbQxmjeHxzcJ',
    dob: '12 March 2006',
    bloodGroup: 'O Positive (O+)',
    mobile: '+91 98765 43210',
    email: 'rahul.kumar2006@gmail.com',
    altPhone: '+91 94340 88219',
    address:
      '14/B, Hill Cart Road, Pradhan Nagar, Siliguri, District Darjeeling, West Bengal - 734001',
    fatherName: 'Suresh Kumar',
    fatherOccupation: 'Independent Businessman',
    fatherPhone: '+91 98320 11984',
    motherName: 'Sunita Kumar',
    motherOccupation: 'Homemaker',
    motherPhone: '+91 94340 88219',
    leadMentor: 'Amit Sharma',
    leadMentorRole: 'Senior Full Stack Architect',
    leadMentorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEGFDLjBfnz8HmOb5rHAFE6Dq4qPN6xAK18njKx9gpZbhZfFWFqmO7SrDwA3NFp6XmZRAos2EY8QSRzCvDVkdMWsEFtZ6N79gnFg8x9HyufZ0esX-vvbYjg6Fotz3CEmOWyDV_ciYTp_v9yNYjljn7eXgvHtoVXSdR4OaR0Q6KWNQWGT96UpO0ipirblcPq_V-OtnWjzVfqlIcb5EDwZ5-hn65sqUKmhzyUpQkD2U2VVdUGAYtx4Tj',
    totalFee: 30000,
    paidFee: 23000,
    dueFee: 7000,
    attendanceRate: 92.4,
    presentDays: 110,
    absentDays: 10,
    lateDays: 4,
  });

  // Modal states
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isFeePaymentModalOpen, setIsFeePaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('7000');
  const [paymentMode, setPaymentMode] = useState('UPI / Razorpay');
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');

  // Editable profile state
  const [editFormData, setEditFormData] = useState({
    name: student.name,
    mobile: student.mobile,
    email: student.email,
    address: student.address,
    dob: student.dob,
    bloodGroup: student.bloodGroup,
    fatherName: student.fatherName,
    fatherPhone: student.fatherPhone,
  });

  // Documents list
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      title: 'Student Passport Photo',
      ext: 'JPG',
      size: '1.4 MB',
      status: 'Verified',
      icon: 'image',
      iconColor: 'text-primary',
      iconBg: 'bg-surface-container-lowest',
    },
    {
      id: 'doc-2',
      title: 'Aadhaar Card (UIDAI)',
      ext: '•••• •••• 4892',
      size: 'eKYC Auth',
      status: 'Verified',
      icon: 'fingerprint',
      iconColor: 'text-secondary',
      iconBg: 'bg-surface-container-lowest',
    },
    {
      id: 'doc-3',
      title: 'Class 12 Marks Sheet',
      ext: 'CBSE Board',
      size: '84.6% Grade A',
      status: 'Verified',
      icon: 'history_edu',
      iconColor: 'text-tertiary',
      iconBg: 'bg-surface-container-lowest',
    },
    {
      id: 'doc-4',
      title: 'Income Certificate',
      ext: 'State Revenue Dept',
      size: 'Valid',
      status: 'Verified',
      icon: 'verified_user',
      iconColor: 'text-outline',
      iconBg: 'bg-surface-container-lowest',
    },
  ]);

  // Audit timeline entries
  const [timelineEvents, setTimelineEvents] = useState([
    {
      id: 'tl-1',
      dotColor: 'bg-secondary',
      title: 'Fee Payment Recorded',
      desc: '₹8,000 received via Razorpay UPI (Receipt #RCP-9921)',
      meta: 'Today, 11:24 AM • Finance Desk',
    },
    {
      id: 'tl-2',
      dotColor: 'bg-primary',
      title: 'RFID Gate Entry Logged',
      desc: 'Checked in at 05:58 PM via Siliguri Campus Turnstile Gate A',
      meta: 'Yesterday, 5:58 PM • Biometric System',
    },
    {
      id: 'tl-3',
      dotColor: 'bg-tertiary',
      title: 'Assignment Graded',
      desc: 'Assignment 4 (React Redux Store) evaluated & awarded Grade A-',
      meta: '11 Sep 2025 • Amit Sharma (Mentor)',
    },
    {
      id: 'tl-4',
      dotColor: 'bg-outline-variant',
      title: 'Batch Enrolled',
      desc: 'Enrolled into WD Evening (Batch 04) by Branch Administrator',
      meta: '12 Jun 2025 • Admin HQ',
    },
  ]);

  // Installments list
  const [installments, setInstallments] = useState([
    {
      id: 'inst-1',
      name: 'Instalment #1 (Admission)',
      amount: '₹15,000',
      status: 'Paid',
      paidDate: '12 Jun 2025',
    },
    {
      id: 'inst-2',
      name: 'Instalment #2 (Mid-term)',
      amount: '₹8,000',
      status: 'Paid',
      paidDate: '15 Aug 2025',
    },
    {
      id: 'inst-3',
      name: 'Instalment #3 (Final Due)',
      amount: '₹7,000',
      status: 'Pending',
      paidDate: 'Due: 20 Sep 2025',
    },
  ]);

  // Handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setStudent(prev => ({
      ...prev,
      name: editFormData.name,
      mobile: editFormData.mobile,
      email: editFormData.email,
      address: editFormData.address,
      dob: editFormData.dob,
      bloodGroup: editFormData.bloodGroup,
      fatherName: editFormData.fatherName,
      fatherPhone: editFormData.fatherPhone,
    }));
    setIsEditProfileModalOpen(false);
    onShowToast(`Student profile updated for ${editFormData.name}.`);
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amtNum = parseInt(paymentAmount, 10) || 0;
    if (amtNum <= 0) {
      onShowToast('Please specify a valid payment amount.');
      return;
    }

    const newPaid = student.paidFee + amtNum;
    const newDue = Math.max(0, student.totalFee - newPaid);

    setStudent(prev => ({
      ...prev,
      paidFee: newPaid,
      dueFee: newDue,
    }));

    // Update instalment 3
    setInstallments(prev =>
      prev.map(item =>
        item.id === 'inst-3'
          ? {
              ...item,
              status: newDue === 0 ? 'Paid' : 'Partially Paid',
              paidDate: `Paid ₹${amtNum.toLocaleString('en-IN')} on ${new Date().toLocaleDateString()}`,
            }
          : item
      )
    );

    // Add to timeline
    setTimelineEvents([
      {
        id: `tl-${Date.now()}`,
        dotColor: 'bg-secondary',
        title: 'Fee Payment Recorded',
        desc: `₹${amtNum.toLocaleString('en-IN')} received via ${paymentMode} (Receipt #RCP-${Math.floor(1000 + Math.random() * 9000)})`,
        meta: `Just now • Finance Desk`,
      },
      ...timelineEvents,
    ]);

    setIsFeePaymentModalOpen(false);
    onShowToast(`Payment of ₹${amtNum.toLocaleString('en-IN')} successfully recorded!`);
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    setDocuments([
      ...documents,
      {
        id: `doc-${Date.now()}`,
        title: newDocTitle,
        ext: 'PDF',
        size: '1.2 MB',
        status: 'Verified',
        icon: 'description',
        iconColor: 'text-primary',
        iconBg: 'bg-surface-container-lowest',
      },
    ]);
    setNewDocTitle('');
    setIsUploadDocModalOpen(false);
    onShowToast(`Uploaded "${newDocTitle}" to secure student vault.`);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    onShowToast(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased flex">
      {/* 1. FIXED LEFT SIDEBAR (260px) */}
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
            <button
              aria-label="Hide sidebar"
              className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-center"
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              title="Hide sidebar"
            >
              <span className="material-symbols-outlined text-[20px]">menu_open</span>
            </button>
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
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">group</span>
                  <span className="font-body-md text-body-md">All Students</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditProfileModalOpen(true);
                    onShowToast('Opened quick student profile updater.');
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">person_add</span>
                  <span className="font-body-md text-body-md">Add Student</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('documents');
                    onShowToast('Showing verified documents & KYC vault.');
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">folder_shared</span>
                  <span className="font-body-md text-body-md">Documents</span>
                </button>
                <button
                  onClick={() => setIsIdCardModalOpen(true)}
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
                  onClick={() => onShowToast('Subjects curriculum modules.')}
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
                  onClick={() => onShowToast('Student Assignments evaluated.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">task</span>
                  <span className="font-body-md text-body-md">Assignments</span>
                </button>
                <button
                  onClick={() => onShowToast('Exams & Results ledger.')}
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
                  onClick={() => {
                    setActiveTab('attendance');
                    onShowToast('Biometric attendance records active for Rahul Kumar.');
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">fingerprint</span>
                  <span className="font-body-md text-body-md">Biometric &amp; RFID</span>
                </button>
                <button
                  onClick={() => onShowToast('Manual attendance roster.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">checklist</span>
                  <span className="font-body-md text-body-md">Manual Marking</span>
                </button>
                <button
                  onClick={() => onShowToast('Leave requests queue.')}
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
                  onClick={() => {
                    setActiveTab('fees');
                    onShowToast('Fee structure & installment history.');
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">account_balance_wallet</span>
                  <span className="font-body-md text-body-md">Fee Structure</span>
                </button>
                <button
                  onClick={() => setIsFeePaymentModalOpen(true)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">point_of_sale</span>
                  <span className="font-body-md text-body-md">Collect Fee</span>
                </button>
                <button
                  onClick={() => onShowToast('Payment receipts repository.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">payments</span>
                  <span className="font-body-md text-body-md">Payments</span>
                </button>
                <button
                  onClick={() => onShowToast(`Due fee pending for Rahul Kumar: ₹${student.dueFee.toLocaleString('en-IN')}`)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">pending_actions</span>
                  <span className="font-body-md text-body-md">Due Fees</span>
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
                  onClick={() => onShowToast('Faculty Directory: 86 active professors & lab leads.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">co_present</span>
                  <span className="font-body-md text-body-md">Faculty Directory</span>
                </button>
                <button
                  onClick={() => onShowToast('Staff Members directory.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                  <span className="font-body-md text-body-md">Staff</span>
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

            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <img
                alt="Brand logo"
                className="h-8 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                src={BRAND_HOTLINKS.logo}
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

            {/* Campus Selector */}
            <div className="relative flex items-center">
              <button
                onClick={() => onShowToast('Current Campus Scope: Siliguri Campus (Main HQ)')}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 rounded-lg text-left transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[10px] text-outline leading-none uppercase">
                    Campus View
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                    All Branches (8 Active){' '}
                    <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                  </span>
                </div>
              </button>
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
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-outline-variant/60 text-[10px] font-data-mono text-outline">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Header Buttons & Profile */}
          <div className="flex items-center gap-space-sm flex-shrink-0">
            <button
              onClick={() => setIsEditProfileModalOpen(true)}
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
              onClick={() => onShowToast('You have 3 operational alerts pending.')}
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
              onClick={() => onShowToast('EduManage Student Records User Manual')}
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

        {/* 3. MAIN STUDENT PROFILE VIEWPORT */}
        <main className="w-full pt-16 bg-background min-h-screen">
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Top Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav className="flex items-center gap-2 font-body-sm text-body-sm text-outline">
                <button
                  onClick={() => onNavigate('students-directory')}
                  className="flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Back to Students Directory</span>
                </button>
                <span className="text-outline-variant font-normal">/</span>
                <button
                  onClick={() => onNavigate('students-directory')}
                  className="text-outline hover:text-primary transition-colors cursor-pointer"
                >
                  Students Directory
                </button>
                <span className="text-outline-variant font-normal">/</span>
                <span className="text-outline">Student Profile</span>
                <span className="text-outline-variant font-normal">/</span>
                <span className="font-semibold text-on-surface">{student.name}</span>
              </nav>
              <div className="flex items-center gap-2 text-outline">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-data-mono text-[11px] font-medium text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  SYS-SYNC: REALTIME
                </span>
                <span className="font-data-mono text-[11px] text-outline">Last activity: 14 mins ago</span>
              </div>
            </div>

            {/* Profile Hero Header Card with Tabs */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="relative flex-shrink-0">
                    <img
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-sm bg-surface-container"
                      alt={student.name}
                      src={student.avatar}
                    />
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                      <span className="w-3.5 h-3.5 rounded-full bg-secondary"></span>
                    </span>
                  </div>

                  <div className="flex flex-col space-y-2.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="font-display text-2xl sm:text-display font-bold text-on-surface tracking-tight">
                        {student.name}
                      </h1>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-secondary-container/60 text-on-secondary-container">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        {student.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-surface-container font-label-md text-label-md text-on-surface-variant font-medium">
                        {student.genderAge}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-data-mono text-data-mono">
                        <span className="text-outline font-normal">UID:</span>
                        <span className="font-semibold text-primary">{student.uid}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-data-mono text-data-mono">
                        <span className="text-outline font-normal">Adm:</span>
                        <span className="font-medium text-on-surface">{student.admNo}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-[15px] text-primary">hub</span>
                        <span>{student.branch}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-fixed/50 text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                        <span className="material-symbols-outlined text-[15px] text-primary">terminal</span>
                        <span>{student.course}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-[15px] text-outline">schedule</span>
                        <span>{student.batch}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm">
                        <span className="material-symbols-outlined text-[15px] text-outline">calendar_today</span>
                        <span>Enrolled {student.enrolledDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 xl:justify-end flex-shrink-0 pt-2 xl:pt-0">
                  <button
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg transition-colors shadow-sm active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">edit</span>
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => setIsFeePaymentModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                    <span>Collect Fee (Due: ₹{student.dueFee.toLocaleString('en-IN')})</span>
                  </button>
                  <button
                    onClick={() => setIsIdCardModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">badge</span>
                    <span>Generate ID Card</span>
                  </button>
                  <button
                    onClick={() => setIsCertificateModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-tertiary">workspace_premium</span>
                    <span>Issue Certificate</span>
                  </button>
                  <button
                    aria-label="More options"
                    onClick={() => onShowToast(`Action options: Export Dossier, Print Fee Challan, Transfer Batch.`)}
                    className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors shadow-sm cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Tab Navigation */}
              <div className="mt-6 pt-2 overflow-x-auto scrollbar-none border-t border-outline-variant/30">
                <div className="flex items-center gap-1 min-w-max pt-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-2 rounded-lg font-label-lg text-label-lg font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'overview'
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    <span>Overview</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('academic')}
                    className={`px-4 py-2 rounded-lg font-label-lg text-label-lg font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'academic'
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">school</span>
                    <span>Academic</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('attendance')}
                    className={`px-4 py-2 rounded-lg font-label-lg text-label-lg font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'attendance'
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">fact_check</span>
                    <span>Attendance</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-secondary-container/60 text-on-secondary-container font-semibold">
                      92%
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('fees')}
                    className={`px-4 py-2 rounded-lg font-label-lg text-label-lg font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'fees'
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    <span>Fees &amp; Receipts</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-error-container text-on-error font-semibold">
                      ₹7k Due
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('exams')}
                    className={`px-4 py-2 rounded-lg font-label-lg text-label-lg font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'exams'
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                    <span>Exams &amp; Results</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-4 py-2 rounded-lg font-label-lg text-label-lg font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'documents'
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">folder_shared</span>
                    <span>Documents &amp; KYC</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('certificates')}
                    className={`px-4 py-2 rounded-lg font-label-lg text-label-lg font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'certificates'
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Certificates</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('audit')}
                    className={`px-4 py-2 rounded-lg font-label-lg text-label-lg font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'audit'
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">history</span>
                    <span>Audit Activity</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Main Body (Asymmetric 8:4 Grid) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* LEFT COLUMN (8 cols): Personal, Guardian, Academic & Documents */}
              <div className="xl:col-span-8 space-y-6">
                {/* 1. Personal & Contact Information Card */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <div>
                        <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">
                          Personal &amp; Contact Information
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">
                          Verified demographic and official contact records
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsEditProfileModalOpen(true)}
                      className="text-primary hover:text-primary-container p-1 rounded-lg hover:bg-surface-container font-label-md text-label-md font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>Update</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-3.5 rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline uppercase block">
                        Full Legal Name
                      </span>
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface mt-0.5 block">
                        {student.name}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline uppercase block">
                        Date of Birth
                      </span>
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface mt-0.5 block">
                        {student.dob}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline uppercase block">
                        Blood Group &amp; Rh
                      </span>
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface mt-0.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-error"></span>
                        <span>{student.bloodGroup}</span>
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline uppercase block">
                        Primary Mobile
                      </span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="font-data-mono text-data-mono font-semibold text-on-surface">
                          {student.mobile}
                        </span>
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-container/70 text-on-secondary-container">
                          <span className="material-symbols-outlined text-[12px]">verified</span>
                          <span>OTP</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-surface-container-low sm:col-span-2">
                      <span className="font-label-sm text-label-sm text-outline uppercase block">
                        Registered Email
                      </span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="font-data-mono text-data-mono font-semibold text-on-surface truncate">
                          {student.email}
                        </span>
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-container/70 text-on-secondary-container">
                          <span className="material-symbols-outlined text-[12px]">verified</span>
                          <span>Confirmed</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-surface-container-low sm:col-span-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-label-sm text-label-sm text-outline uppercase block">
                            Residential Permanent Address
                          </span>
                          <p className="font-body-md text-body-md text-on-surface mt-1 leading-snug">
                            {student.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="font-data-mono text-body-sm text-outline">
                            Alt Phone: {student.altPhone}
                          </span>
                          <button
                            aria-label="Copy address"
                            onClick={() => copyToClipboard(student.address, 'Address')}
                            className="p-1 text-outline hover:text-primary rounded hover:bg-surface-container transition-colors cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Guardian & Emergency Details Card */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[20px]">family_restroom</span>
                      </div>
                      <div>
                        <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">
                          Guardian &amp; Emergency Details
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">
                          Authorized primary contact persons &amp; relation proofs
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      Kith &amp; Kin Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Father */}
                    <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">person</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-label-sm text-label-sm text-outline uppercase block">
                          Father &amp; Primary Guardian
                        </span>
                        <span className="font-headline-sm text-headline-sm font-semibold text-on-surface block mt-0.5">
                          {student.fatherName}
                        </span>
                        <span className="font-body-sm text-body-sm text-outline">
                          Occupation: {student.fatherOccupation}
                        </span>
                        <div className="mt-2.5 flex items-center gap-2 text-primary font-data-mono text-data-mono font-medium">
                          <span className="material-symbols-outlined text-[16px]">call</span>
                          <span>{student.fatherPhone}</span>
                          <span className="text-outline text-[11px] font-normal">(Primary Contact)</span>
                        </div>
                      </div>
                    </div>

                    {/* Mother */}
                    <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-tertiary flex-shrink-0">
                        <span className="material-symbols-outlined text-[22px]">person_outline</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-label-sm text-label-sm text-outline uppercase block">
                          Mother's Details
                        </span>
                        <span className="font-headline-sm text-headline-sm font-semibold text-on-surface block mt-0.5">
                          {student.motherName}
                        </span>
                        <span className="font-body-sm text-body-sm text-outline">
                          Occupation: {student.motherOccupation}
                        </span>
                        <div className="mt-2.5 flex items-center gap-2 text-on-surface-variant font-data-mono text-data-mono font-medium">
                          <span className="material-symbols-outlined text-[16px] text-outline">contact_phone</span>
                          <span>{student.motherPhone}</span>
                          <span className="text-outline text-[11px] font-normal">(Alternate)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Academic Summary & Syllabus Progress */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[20px]">code</span>
                      </div>
                      <div>
                        <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">
                          Academic Summary &amp; Syllabus Progress
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">
                          Active curriculum pacing, assigned mentors &amp; timetable
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-tertiary-fixed/60 font-data-mono text-body-sm font-semibold text-on-tertiary-fixed-variant">
                        68% Completed
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-3.5 rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline uppercase block">
                        Current Course
                      </span>
                      <span className="font-label-lg text-label-lg font-semibold text-on-surface mt-0.5 block">
                        {student.course}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        Certificate Program (8 Months)
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline uppercase block">
                        Lead Mentor / Instructor
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <img
                          className="w-6 h-6 rounded-full object-cover"
                          alt={student.leadMentor}
                          src={student.leadMentorAvatar}
                        />
                        <span className="font-label-lg text-label-lg font-semibold text-on-surface">
                          {student.leadMentor}
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-outline mt-0.5 block">
                        {student.leadMentorRole}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg bg-surface-container-low">
                      <span className="font-label-sm text-label-sm text-outline uppercase block">
                        Next Live Session
                      </span>
                      <span className="font-label-lg text-label-lg font-semibold text-primary mt-0.5 block">
                        Tomorrow, 6:00 PM
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">
                        Lab 302, Siliguri Campus
                      </span>
                    </div>
                  </div>

                  {/* Progress bar & Milestones */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-body-sm">
                      <span className="font-label-md text-label-md font-semibold text-on-surface">
                        Curriculum Milestones
                      </span>
                      <span className="font-data-mono text-data-mono text-outline">
                        4 of 6 Modules Finished
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden flex">
                      <div className="h-full bg-secondary" style={{ width: '35%' }} title="HTML, CSS & Modern Layouts"></div>
                      <div className="h-full bg-primary" style={{ width: '33%' }} title="JavaScript ESNext & React 19"></div>
                      <div className="h-full bg-tertiary-container animate-pulse" style={{ width: '15%' }} title="Node.js & Express API In Progress"></div>
                      <div className="h-full bg-surface-container-high" style={{ width: '17%' }} title="MongoDB & Cloud Pending"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                            Module 01
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface mt-1">
                          HTML5 / CSS3 / Tailwind
                        </span>
                        <span className="font-data-mono text-[10px] text-secondary font-semibold mt-1.5">
                          Score: 94% (Mastered)
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                            Module 02
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface mt-1">
                          JavaScript &amp; React.js
                        </span>
                        <span className="font-data-mono text-[10px] text-secondary font-semibold mt-1.5">
                          Score: 89% (Mastered)
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-surface-container-high/60 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-semibold text-primary">
                            Module 03
                          </span>
                          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping"></span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface mt-1">
                          Node.js &amp; Express APIs
                        </span>
                        <span className="font-data-mono text-[10px] text-primary font-semibold mt-1.5">
                          In Progress (Week 3)
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-surface-container-low opacity-75 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-semibold text-outline">
                            Module 04
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-outline">radio_button_unchecked</span>
                        </div>
                        <span className="font-body-sm text-body-sm text-outline mt-1">
                          MongoDB &amp; Cloud DevOps
                        </span>
                        <span className="font-data-mono text-[10px] text-outline font-medium mt-1.5">
                          Upcoming (Oct 2025)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Verified Documents & Digital Vault */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">folder_special</span>
                      </div>
                      <div>
                        <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">
                          Verified Documents &amp; Digital Vault
                        </h2>
                        <p className="font-body-sm text-body-sm text-outline">
                          Encrypted KYC, identity proofs, and academic credentials
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsUploadDocModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md font-semibold transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">upload_file</span>
                      <span>Upload New</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {documents.map(doc => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-lg ${doc.iconBg} flex items-center justify-center ${doc.iconColor} flex-shrink-0 shadow-sm`}>
                            <span className="material-symbols-outlined text-[22px]">{doc.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-label-lg text-label-lg font-semibold text-on-surface truncate">
                                {doc.title}
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            </div>
                            <span className="font-data-mono text-[11px] text-outline block">
                              {doc.ext} • {doc.size} • {doc.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            aria-label={`Preview ${doc.title}`}
                            onClick={() => onShowToast(`Secure preview opened for: ${doc.title}`)}
                            className="p-1.5 text-outline hover:text-primary rounded-lg transition-colors cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button
                            aria-label={`Download ${doc.title}`}
                            onClick={() => onShowToast(`Downloaded certified copy of ${doc.title}`)}
                            className="p-1.5 text-outline hover:text-primary rounded-lg transition-colors cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (4 cols): Biometric Attendance, Fees & Installments, Audit Timeline */}
              <div className="xl:col-span-4 space-y-6">
                {/* 1. Biometric Attendance Widget */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-secondary">fingerprint</span>
                      <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                        Biometric Attendance
                      </h2>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-on-secondary-container bg-secondary-container/60 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {student.attendanceRate}% Avg
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative flex items-center justify-center w-14 h-14">
                        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-surface-container-high"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                          ></path>
                          <path
                            className="text-secondary"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="92, 100"
                            strokeLinecap="round"
                            strokeWidth="3.5"
                          ></path>
                        </svg>
                        <span className="absolute font-display text-[15px] font-bold text-on-surface">92%</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block">
                          RFID Turnstile
                        </span>
                        <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          High Reliability
                        </span>
                        <span className="font-body-sm text-body-sm text-outline block">
                          Device: Siliguri Gate-A
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-5">
                    <div className="p-2.5 rounded-lg bg-surface-container-low">
                      <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                        {student.presentDays}
                      </span>
                      <span className="font-label-sm text-[11px] text-outline block uppercase mt-0.5">
                        Present
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-low">
                      <span className="font-headline-sm text-headline-sm font-bold text-error">
                        {student.absentDays}
                      </span>
                      <span className="font-label-sm text-[11px] text-outline block uppercase mt-0.5">
                        Absent
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-low">
                      <span className="font-headline-sm text-headline-sm font-bold text-outline">
                        {student.lateDays}
                      </span>
                      <span className="font-label-sm text-[11px] text-outline block uppercase mt-0.5">
                        Late Log
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-body-sm">
                      <span className="font-label-sm text-label-sm uppercase text-outline">
                        Current Month Activity (Sept 2025)
                      </span>
                      <span className="font-data-mono text-[11px] text-outline">22/24 Sessions</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 pt-1">
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 1: Present">
                        01
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 2: Present">
                        02
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 3: Present">
                        03
                      </div>
                      <div className="h-6 rounded bg-surface-container text-[10px] font-data-mono text-outline" title="Sunday: Off">
                        04
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 5: Present">
                        05
                      </div>
                      <div className="h-6 rounded bg-error flex items-center justify-center text-[10px] font-data-mono text-on-error font-bold" title="Day 6: Absent (Sick)">
                        06
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 7: Present">
                        07
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 8: Present">
                        08
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 9: Present">
                        09
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 10: Present">
                        10
                      </div>
                      <div className="h-6 rounded bg-surface-container text-[10px] font-data-mono text-outline" title="Sunday: Off">
                        11
                      </div>
                      <div className="h-6 rounded bg-surface-container-high text-primary flex items-center justify-center text-[10px] font-data-mono font-bold" title="Day 12: Late (06:14 PM)">
                        12
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 13: Present">
                        13
                      </div>
                      <div className="h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-data-mono text-on-secondary font-bold" title="Day 14: Present">
                        14
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-outline pt-2">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded bg-secondary"></span> Present
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded bg-surface-container-high"></span> Late
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded bg-error"></span> Absent
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded bg-surface-container"></span> Off
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Fee & Installments Widget */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-primary">payments</span>
                      <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                        Fee &amp; Installments
                      </h2>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${student.dueFee > 0 ? 'bg-error-container text-on-error' : 'bg-secondary-container text-on-secondary-container'}`}>
                      {student.dueFee > 0 ? 'Due Pending' : 'Fully Settled'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-body-sm text-body-sm text-outline">Total Course Fee:</span>
                      <span className="font-data-mono text-body-md font-bold text-on-surface">
                        ₹{student.totalFee.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body-sm text-body-sm text-secondary font-medium">
                        Total Paid to Date:
                      </span>
                      <span className="font-data-mono text-body-md font-bold text-secondary">
                        ₹{student.paidFee.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-label-lg text-label-lg font-bold text-error">
                        Balance Due:
                      </span>
                      <span className="font-data-mono text-headline-sm font-bold text-error">
                        ₹{student.dueFee.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(student.paidFee / student.totalFee) * 100}%` }}
                        title={`${Math.round((student.paidFee / student.totalFee) * 100)}% fee collected`}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-data-mono text-outline">
                      <span>Installment 3 of 4</span>
                      <span>Due: 20 Sep 2025</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {installments.map(inst => (
                      <div
                        key={inst.id}
                        className={`flex items-center justify-between text-body-sm p-2 rounded-lg ${
                          inst.status === 'Paid'
                            ? 'bg-surface-container-low'
                            : 'bg-error-container/30 text-on-error'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              inst.status === 'Paid' ? 'text-secondary' : 'text-error'
                            }`}
                          >
                            {inst.status === 'Paid' ? 'check_circle' : 'pending'}
                          </span>
                          <span className="font-body-sm text-on-surface">{inst.name}</span>
                        </div>
                        <span className={`font-data-mono text-data-mono font-semibold ${inst.status === 'Paid' ? 'text-on-surface' : 'text-error font-bold'}`}>
                          {inst.amount}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-3 flex items-center gap-2">
                    <button
                      onClick={() => setIsFeePaymentModalOpen(true)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">receipt</span>
                      <span>Record Payment</span>
                    </button>
                    <button
                      aria-label="Download ledger invoice"
                      onClick={() => onShowToast('Downloaded full fee ledger statement for Rahul Kumar.')}
                      className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer"
                      title="Download Complete Ledger"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                  </div>
                </div>

                {/* 3. Audit & Timeline Widget */}
                <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-outline">history</span>
                      <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                        Audit &amp; Timeline
                      </h2>
                    </div>
                    <button
                      onClick={() => onShowToast('Showing full audit logs for Rahul Kumar.')}
                      className="font-label-sm text-label-sm text-primary hover:underline cursor-pointer"
                      type="button"
                    >
                      View All
                    </button>
                  </div>

                  <div className="relative pl-6 space-y-5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container">
                    {timelineEvents.map(evt => (
                      <div key={evt.id} className="relative">
                        <span className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ${evt.dotColor} ring-4 ring-surface-container-lowest`}></span>
                        <div className="text-body-sm">
                          <span className="font-label-md text-label-md font-semibold text-on-surface block">
                            {evt.title}
                          </span>
                          <p className="text-outline text-[12px] leading-snug mt-0.5">{evt.desc}</p>
                          <span className="font-data-mono text-[10px] text-outline block mt-1">
                            {evt.meta}
                          </span>
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

      {/* MODAL 1: Edit Profile */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">edit</span>
                <h3 className="font-headline-sm font-bold text-on-surface">Edit Student Profile</h3>
              </div>
              <button
                onClick={() => setIsEditProfileModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 text-sm max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Primary Mobile
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.mobile}
                    onChange={e => setEditFormData({ ...editFormData, mobile: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface font-data-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={editFormData.email}
                    onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    value={editFormData.dob}
                    onChange={e => setEditFormData({ ...editFormData, dob: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    value={editFormData.bloodGroup}
                    onChange={e => setEditFormData({ ...editFormData, bloodGroup: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Permanent Address
                  </label>
                  <textarea
                    rows={2}
                    value={editFormData.address}
                    onChange={e => setEditFormData({ ...editFormData, address: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.fatherName}
                    onChange={e => setEditFormData({ ...editFormData, fatherName: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-outline mb-1">
                    Father's Phone
                  </label>
                  <input
                    type="text"
                    value={editFormData.fatherPhone}
                    onChange={e => setEditFormData({ ...editFormData, fatherPhone: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface font-data-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsEditProfileModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Fee Payment & Receipt Collection */}
      {isFeePaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
                <h3 className="font-headline-sm font-bold text-on-surface">Record Fee Payment</h3>
              </div>
              <button
                onClick={() => setIsFeePaymentModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="p-6 space-y-4 text-sm">
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="text-xs text-outline block">Student</span>
                  <span className="font-semibold text-on-surface">{student.name}</span>
                  <span className="text-[11px] font-data-mono text-outline block">{student.uid}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-outline block">Total Due</span>
                  <span className="font-data-mono text-headline-sm font-bold text-error">
                    ₹{student.dueFee.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-outline mb-1">
                  Collection Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface font-data-mono text-lg font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-outline mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentMode}
                  onChange={e => setPaymentMode(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-xs focus:outline-none cursor-pointer"
                >
                  <option>UPI / Razorpay QR</option>
                  <option>Cash Counter Receipt</option>
                  <option>Bank Transfer / NEFT</option>
                  <option>Card POS Terminal</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFeePaymentModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">receipt</span>
                  <span>Confirm &amp; Generate Receipt</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ID Card Generator & RFID Badge */}
      {isIdCardModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">badge</span>
                <h3 className="font-headline-sm font-bold text-on-surface">Digital Student ID Card</h3>
              </div>
              <button
                onClick={() => setIsIdCardModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* ID Badge Card Preview */}
              <div className="w-full bg-gradient-to-br from-primary via-primary-container to-blue-900 text-white rounded-2xl p-5 shadow-xl relative overflow-hidden border border-white/10">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-white text-primary flex items-center justify-center font-bold text-xs">
                      AP
                    </div>
                    <div>
                      <span className="font-bold text-xs uppercase tracking-wider block leading-none">
                        Apex Tech Institute
                      </span>
                      <span className="text-[9px] text-white/80">Siliguri HQ Campus</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-secondary text-white uppercase tracking-wider">
                    Student ID
                  </span>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-base leading-tight text-white">{student.name}</h4>
                    <p className="text-xs text-white/80">{student.course}</p>
                    <p className="font-data-mono text-[10px] text-white/70 mt-1">UID: {student.uid}</p>
                    <p className="font-data-mono text-[10px] text-white/70">Batch: {student.batch}</p>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-3 flex items-center justify-between text-[10px]">
                  <div>
                    <span className="text-white/60 block uppercase text-[8px]">Blood Group</span>
                    <span className="font-bold text-white">{student.bloodGroup}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block uppercase text-[8px]">Valid Thru</span>
                    <span className="font-bold text-white">MAY 2026</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                    <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                    <span className="font-data-mono text-[9px]">RFID-SYNC</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsIdCardModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onShowToast(`Print command sent for ${student.name}'s PVC ID badge.`);
                    setIsIdCardModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>Print PVC Badge</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Issue Certificate */}
      {isCertificateModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[22px]">workspace_premium</span>
                <h3 className="font-headline-sm font-bold text-on-surface">Issue Academic Certificate</h3>
              </div>
              <button
                onClick={() => setIsCertificateModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="p-3.5 rounded-xl bg-surface-container-low space-y-1">
                <span className="text-xs text-outline block">Candidate Name</span>
                <span className="font-bold text-on-surface text-base block">{student.name}</span>
                <span className="text-xs text-outline">{student.course} • Batch 04</span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-outline mb-1">
                  Certificate Category
                </label>
                <select className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-xs focus:outline-none cursor-pointer">
                  <option>Provisional Module Completion Certificate</option>
                  <option>Bonafide Student Certificate</option>
                  <option>Internship / Practical Lab Clearance</option>
                  <option>Full Graduation Diploma</option>
                </select>
              </div>

              <div className="p-3 rounded-xl border border-outline-variant/50 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-secondary font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Cryptographic QR Validation Embedded</span>
                </div>
                <p className="text-outline">
                  The issued certificate will carry a tamper-proof verification URL permanently hosted on EduManage Registry.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCertificateModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onShowToast(`Issued verifiable certificate for ${student.name}!`);
                    setIsCertificateModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Issue &amp; Sign</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Upload Document */}
      {isUploadDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">upload_file</span>
                <h3 className="font-headline-sm font-bold text-on-surface">Upload Student Document</h3>
              </div>
              <button
                onClick={() => setIsUploadDocModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleUploadDocument} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold uppercase text-outline mb-1">
                  Document Title / Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caste Certificate / Transfer Certificate"
                  value={newDocTitle}
                  onChange={e => setNewDocTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface focus:outline-none"
                />
              </div>

              <div className="border-2 border-dashed border-outline-variant/70 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer bg-surface-container-low/30">
                <span className="material-symbols-outlined text-3xl text-outline mb-2">cloud_upload</span>
                <p className="text-xs text-on-surface font-semibold">
                  Drag &amp; drop PDF, JPG or PNG here
                </p>
                <p className="text-[11px] text-outline mt-0.5">Maximum file size: 10 MB</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadDocModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container cursor-pointer"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
