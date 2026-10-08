import React, { useState } from 'react';
import { ScreenType } from '../types';
import { useSidebar } from '../context/SidebarContext';

interface CertificatesConsoleScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

interface CertificateLedgerItem {
  id: string;
  certId: string;
  studentName: string;
  studentPhone: string;
  avatarUrl?: string;
  avatarInitials?: string;
  course: string;
  batch: string;
  branch: string;
  issueDate: string;
  template: string;
  status: 'Verified & Active' | 'Pending Review' | 'Revoked (Malpractice)';
  statusType: 'verified' | 'pending' | 'revoked';
  grade: string;
  percentage: string;
  signatory: string;
  hash: string;
}

const INITIAL_CERTIFICATES: CertificateLedgerItem[] = [
  {
    id: 'cert-1',
    certId: 'CERT-APX-2026-00125',
    studentName: 'Rahul Kumar',
    studentPhone: '+91 98765 43210',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOBqe-wRLawyIzuOM3fZKsby9SuSrwjsWVRryVuFqHbHjLWRKmJK8te9JoSWK-Z57Ip3bhxJualjBJoYi5PRt2L_AHoYJYFKooEGBKHjgQtsvfsKjUT1KX4KfpyLG36td6WoeKQOAKCoByBVqw4f6QIuBJjIuIZlBcqlrY5yMRojqtHaa9Rm6epscEPNxNX9uEF2ZP02UDXwKaspX7HrYaxuaRRq1upNPvtP3vDNCcuhAlIWUXXOKF',
    course: 'Web Development',
    batch: 'WD Evening (Batch 02)',
    branch: 'Siliguri HQ Campus',
    issueDate: '15 Sep 2026',
    template: 'Flagship Multi-Campus Diploma',
    status: 'Verified & Active',
    statusType: 'verified',
    grade: 'Grade A with Distinction',
    percentage: '94.8% Aggregate Score',
    signatory: 'Rajesh Sharma (Director & Head of Institutions)',
    hash: 'SHA-256: 8f4a9bc01824ef78c942ad3108ff49e390c21bca908234ea7c2e',
  },
  {
    id: 'cert-2',
    certId: 'CERT-APX-2026-00126',
    studentName: 'Ananya Sen',
    studentPhone: '+91 98311 82910',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCqOVOB-kO3hKrnEbcgQVdYJieaGK-sUIhAl_5I38no3VmPvZM0JCvlWBLCR3TPHYZzOEuhxruiiyawPmvLgcBjpCxNDd2GJx13iI97gQMyuO1YUKtq8lsnmt47ixbF_uKXYnK-p20-So5vj2gEL6jXc299UN7hXndHk9XqyRXCoI0TtY4ri3TT1KvlAt_o4B8ra_rNauN9OwHB1PQ1cpOSxV2tEZkIAicmex70iSj91WWJeU-nVTa',
    course: 'Web Development',
    batch: 'WD Evening (Batch 02)',
    branch: 'Siliguri HQ Campus',
    issueDate: '15 Sep 2026',
    template: 'Flagship Multi-Campus Diploma',
    status: 'Verified & Active',
    statusType: 'verified',
    grade: 'Grade A',
    percentage: '91.2% Aggregate Score',
    signatory: 'Rajesh Sharma (Director & Head of Institutions)',
    hash: 'SHA-256: 4e72a8190bcfa12de88a91c3d4e0817cba551029487cbf0912ad',
  },
  {
    id: 'cert-3',
    certId: 'CERT-APX-2026-00127',
    studentName: 'Priyansh Roy',
    studentPhone: '+91 97482 11945',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4o1iuaXN6-BiMRUHyheVn3h8cESupp8yVb4Y208t3epAVcQnCUUVy6FYEkVKnx-uev-IvRQ4PnvRawg48AttYa2m1135t-m7dPZtmkygonk8O0SSpUVfFtAg2fluWY8a2-F6rcciA408dhLGBqtpl1vsSR3A_YLBbp7OOmnO89bnB1t2PE8d8DRzxzAYj7ccrDVReGb2k605vZgPz80isH0gTp7hgXi9PbIkFhvoWguqGRCFxZuQR',
    course: 'Web Development',
    batch: 'WD Evening (Batch 02)',
    branch: 'Siliguri HQ Campus',
    issueDate: 'Scheduled (Today)',
    template: 'Flagship Multi-Campus Diploma',
    status: 'Pending Review',
    statusType: 'pending',
    grade: 'Grade B+ Pending Sign-off',
    percentage: '86.4% Aggregate Score',
    signatory: 'Pending Director Approval',
    hash: 'SHA-256: 28bfa17c09341258d4a7bb32014ef90a88c2134590bb2144ef18',
  },
  {
    id: 'cert-4',
    certId: 'CERT-APX-2026-00089',
    studentName: 'Deepak Karmakar',
    studentPhone: '+91 94340 55122',
    avatarInitials: 'DK',
    course: 'Web Development',
    batch: 'WD Morning (Batch 01)',
    branch: 'Siliguri HQ Campus',
    issueDate: '12 Jul 2026',
    template: 'Flagship Multi-Campus Diploma',
    status: 'Revoked (Malpractice)',
    statusType: 'revoked',
    grade: 'Null & Void',
    percentage: 'Invalidated by Committee',
    signatory: 'Revocation Order #RO-9811',
    hash: 'SHA-256: 0000000000000000000000000000000000000000000000000000',
  },
];

export const CertificatesConsoleScreen: React.FC<CertificatesConsoleScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [certificates, setCertificates] = useState<CertificateLedgerItem[]>(INITIAL_CERTIFICATES);
  const [activeTab, setActiveTab] = useState<
    'registry' | 'wizard' | 'simulator' | 'audit'
  >('registry');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Siliguri HQ Campus');
  const [selectedCourse, setSelectedCourse] = useState('Web Development');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // Simulator state
  const [simCertQuery, setSimCertQuery] = useState('CERT-APX-2026-00125');
  const [verifiedCert, setVerifiedCert] = useState<CertificateLedgerItem>(INITIAL_CERTIFICATES[0]);
  const [simScanLoading, setSimScanLoading] = useState(false);

  // Revocation Modal state
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [targetCertToRevoke, setTargetCertToRevoke] = useState<CertificateLedgerItem | null>(null);
  const [revokeReason, setRevokeReason] = useState('Academic Malpractice / Examination Breach');
  const [revokeNotes, setRevokeNotes] = useState('');

  // Generation Modal state
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [genCourse, setGenCourse] = useState('Web Development');
  const [genBatch, setGenBatch] = useState('WD Evening (Batch 02)');
  const [genCandidateCount, setGenCandidateCount] = useState(42);

  // Batch Signing progress state
  const [signingProgress, setSigningProgress] = useState(38);
  const totalCandidates = 42;

  // Filter logic
  const filteredCertificates = certificates.filter(c => {
    const matchesSearch =
      c.certId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studentPhone.includes(searchQuery) ||
      c.course.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBranch = selectedBranch === 'All' || c.branch.includes(selectedBranch);
    const matchesCourse = selectedCourse === 'All' || c.course.includes(selectedCourse);
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Verified' && c.statusType === 'verified') ||
      (selectedStatus === 'Pending' && c.statusType === 'pending') ||
      (selectedStatus === 'Revoked' && c.statusType === 'revoked');

    return matchesSearch && matchesBranch && matchesCourse && matchesStatus;
  });

  const handleSimulateScan = () => {
    setSimScanLoading(true);
    setTimeout(() => {
      const found = certificates.find(
        c => c.certId.trim().toLowerCase() === simCertQuery.trim().toLowerCase()
      );
      if (found) {
        setVerifiedCert(found);
        onShowToast(`Verified cryptographic signature for ${found.certId}`);
      } else {
        onShowToast(`No central registry match found for "${simCertQuery}".`);
      }
      setSimScanLoading(false);
    }, 450);
  };

  const handleOpenRevokeModal = (cert: CertificateLedgerItem) => {
    setTargetCertToRevoke(cert);
    setIsRevokeModalOpen(true);
  };

  const handleConfirmRevoke = () => {
    if (!targetCertToRevoke) return;

    setCertificates(prev =>
      prev.map(c =>
        c.id === targetCertToRevoke.id
          ? {
              ...c,
              status: 'Revoked (Malpractice)',
              statusType: 'revoked',
              grade: 'Null & Void',
              percentage: 'Invalidated by Committee',
            }
          : c
      )
    );

    if (verifiedCert.id === targetCertToRevoke.id) {
      setVerifiedCert(prev => ({
        ...prev,
        status: 'Revoked (Malpractice)',
        statusType: 'revoked',
        grade: 'Null & Void',
        percentage: 'Invalidated by Committee',
      }));
    }

    setIsRevokeModalOpen(false);
    onShowToast(`Certificate ${targetCertToRevoke.certId} has been formally revoked.`);
  };

  const handleSignOff = (cert: CertificateLedgerItem) => {
    setCertificates(prev =>
      prev.map(c =>
        c.id === cert.id
          ? {
              ...c,
              status: 'Verified & Active',
              statusType: 'verified',
              issueDate: '15 Sep 2026',
              signatory: 'Rajesh Sharma (Director & Head of Institutions)',
            }
          : c
      )
    );
    onShowToast(`Director cryptographic sign-off applied to ${cert.certId}.`);
  };

  const handleExportCSV = () => {
    const headers = 'CertID,StudentName,Phone,Course,Batch,Branch,IssueDate,Status,Hash\n';
    const rows = filteredCertificates
      .map(
        c =>
          `"${c.certId}","${c.studentName}","${c.studentPhone}","${c.course}","${c.batch}","${c.branch}","${c.issueDate}","${c.status}","${c.hash}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate_Issuance_Register_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast(`Exported ${filteredCertificates.length} credentials to CSV.`);
  };

  const handleBatchZipDownload = () => {
    onShowToast('Preparing Batch PDF ZIP archive (48 MB, 42 signed diplomas)...');
  };

  const handleDispatchWhatsApp = () => {
    onShowToast('Dispatched encrypted credential download links to 42 student WhatsApp numbers!');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    onShowToast(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased flex">
      {/* 1. FIXED LEFT SIDEBAR (256px / w-64) */}
      {/* Mobile backdrop overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out border-r border-outline-variant/30 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Header Branding */}
          <div className="h-16 px-space-md flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/30">
            <div
              className="flex items-center gap-space-sm cursor-pointer"
              onClick={() => {
                onNavigate('dashboard');
                setIsSidebarOpen(false);
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm font-bold shadow-xs">
                A
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate max-w-[140px]">
                  Apex Institute
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-mono">
                  #INS-7429
                </span>
              </div>
            </div>
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

          <div className="px-space-md py-space-xs">
            <span className="font-label-sm text-label-sm text-outline uppercase font-semibold px-space-sm tracking-wider">
              Navigation
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-space-sm py-space-xs">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span className="font-body-md text-body-md">Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate('admissions')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
              <span className="font-body-md text-body-md">Admissions</span>
            </button>

            <button
              onClick={() => onNavigate('students-directory')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">school</span>
              <span className="font-body-md text-body-md">Students</span>
            </button>

            <button
              onClick={() => onNavigate('academics')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
              <span className="font-body-md text-body-md">Academics</span>
            </button>

            <button
              onClick={() => onShowToast('Attendance registers active')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span className="font-body-md text-body-md">Attendance</span>
            </button>

            <button
              onClick={() => onShowToast('Fees & Finance ledger active')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span className="font-body-md text-body-md">Fees &amp; Finance</span>
            </button>

            {/* ACTIVE: Certificates */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => onNavigate('certificates')}
                className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg transition-all bg-primary-container text-on-primary font-semibold shadow-[0_1px_3px_rgba(37,99,235,0.2)] text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                <span className="font-body-md text-body-md">Certificates</span>
              </button>
              <div className="pl-7 pr-2 py-1 flex flex-col gap-1 border-l-2 border-primary ml-4 mt-0.5">
                <button
                  onClick={() => onNavigate('certificates')}
                  className="text-xs text-primary font-semibold py-0.5 text-left flex items-center justify-between"
                >
                  <span>Issuance &amp; Verification</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                </button>
                <button
                  onClick={() => onNavigate('certificate-studio')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium cursor-pointer"
                >
                  Template Studio
                </button>
              </div>
            </div>

            <button
              onClick={() => onShowToast('Campus communication gateway')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">forum</span>
              <span className="font-body-md text-body-md">Communication</span>
            </button>

            <button
              onClick={() => onNavigate('onboarding')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
              <span className="font-body-md text-body-md">Branches &amp; Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer Tenant Switcher */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/30">
          <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-space-sm flex flex-col gap-1 border border-outline-variant/30">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                Apex Tech Institute
              </span>
            </div>
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm">Branch HQ Network</span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded font-mono">
                8 Active
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-space-xs">
            <button
              onClick={() => onNavigate('landing')}
              className="font-label-md text-label-md text-error hover:text-on-error-container flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Sign Out</span>
            </button>
            <span className="font-label-sm text-label-sm text-outline font-mono">v2.4.8</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTENT */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pl-0 lg:pl-64' : 'pl-0'
      }`}>
        {/* Top Fixed Header */}
        <header className={`fixed top-0 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-4 sm:px-gutter-desktop flex items-center justify-between gap-space-md border-b border-outline-variant/30 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'left-0 lg:left-64' : 'left-0'
        }`}>
          <div className="flex items-center gap-space-md flex-1 max-w-2xl">
            {/* Sidebar Toggle Button (Desktop & Mobile) */}
            <button
              type="button"
              onClick={() => setIsSidebarOpen(prev => !prev)}
              className="p-2 -ml-1 mr-1 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer border border-outline-variant/30 shadow-xs flex items-center justify-center"
              aria-label="Toggle Sidebar Menu"
              title={isSidebarOpen ? "Hide Sidebar (Maximize workspace)" : "Show Sidebar"}
            >
              <span className="material-symbols-outlined text-[22px]">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>

            <img
              alt="Brand logo"
              className="h-8 w-auto object-contain cursor-pointer"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U-QhXESZEr_12u3oOW5wW6fVviAeAnkqC1YVMGXeEyDfiGfPHbkLv6gWOnkG7NCoQAvoMRvaD0VROU-wSN3jk9aE8NgN293_R6RLzmwi8pqgkH1wOL9xza5gs9BYtbTZgBkeAsNR4X76D1FOVvi4MLsvpeFcoX9epNVK5yx47Riyg60tGb6b9IPb-XWADgLIvIiAefmbdsx0P-4DOQL-MvN6hAVyB5f3uk0YcVmbGkecLG3pgNgtWkBqM"
              onClick={() => onNavigate('dashboard')}
            />
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface hidden lg:inline">
              EduManage
            </span>

            <div
              onClick={() => onShowToast('Multi-Branch Hierarchy: 8 Active Node Campuses connected.')}
              className="relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-outline text-[18px] mr-1">domain</span>
              <span className="font-label-md text-label-md text-on-surface font-medium">
                All Branches (8 Active)
              </span>
              <span className="material-symbols-outlined text-outline text-[16px] ml-1">expand_more</span>
            </div>

            <div className="bg-secondary-fixed-dim/40 text-on-secondary-fixed-variant px-2.5 py-1 rounded-full flex items-center gap-1 border border-secondary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm font-semibold tracking-wide">AY 2025-26</span>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="relative hidden md:flex items-center bg-surface-container-low rounded-lg px-space-md py-1.5 w-64 border border-outline-variant/30">
              <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
              <input
                className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-full"
                placeholder="Search students, modules..."
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded font-mono shadow-sm">
                ⌘K
              </span>
            </div>

            <button
              onClick={() => onShowToast('Notifications: 3 cryptographically signed diplomas ready')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold ring-1 ring-surface-container-lowest">
                3
              </span>
            </button>

            <button
              onClick={() => onShowToast('EduManage Certificate Authority User Manual')}
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
            </button>

            <div
              className="flex items-center gap-space-sm pl-space-xs cursor-pointer"
              onClick={() => onNavigate('admin')}
            >
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="font-label-lg text-label-lg font-semibold text-on-surface leading-tight">
                  Rajesh Sharma
                </span>
                <span className="font-label-sm text-label-sm text-outline">Institution Admin / HQ</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. MAIN CONTENT VIEWPORT */}
        <main className="w-full pt-16 bg-background min-h-screen">
          <div className="flex flex-col w-full">
            <div className="relative w-full px-gutter-desktop py-space-lg flex flex-col gap-space-lg max-w-[1600px] mx-auto">
              {/* Top Context & Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div className="flex flex-col">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 mb-1 font-body-sm text-body-sm">
                    <span className="text-outline">Certificates</span>
                    <span className="text-outline-variant">/</span>
                    <span className="font-label-md text-label-md text-primary font-semibold">
                      Issuance &amp; Verification
                    </span>
                  </div>
                  {/* Title & Subtitle */}
                  <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                    Certificate Issuance &amp; Verification Console
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-0.5">
                    Issue cryptographically signed diplomas, manage credential lifecycle, and simulate live public QR
                    verifications across multi-campus nodes.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-space-sm flex-wrap">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high shadow-sm transition-all font-label-md text-label-md cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">description</span>
                    <span>Export Issuance Register (CSV)</span>
                  </button>
                  <button
                    onClick={handleBatchZipDownload}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high shadow-sm transition-all font-label-md text-label-md cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">folder_zip</span>
                    <span>Batch PDF Download (ZIP)</span>
                  </button>
                  <button
                    onClick={() => onNavigate('certificate-studio')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container-high shadow-sm transition-all font-label-md text-label-md cursor-pointer border border-primary/30 font-semibold"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">draw</span>
                    <span>Template Studio</span>
                  </button>
                  <button
                    onClick={() => setIsGenerateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all shadow-[0_2px_8px_rgba(37,99,235,0.25)] active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>+ Generate New Certificates</span>
                  </button>
                </div>
              </div>

              {/* Summary KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {/* KPI 1 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                      Certificates Issued
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display font-bold text-on-surface tracking-tight">4,820</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold bg-secondary-fixed-dim/30 px-1.5 py-0.5 rounded">
                        All Time
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Across 8 active campus locations
                    </p>
                  </div>
                </div>

                {/* KPI 2 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                      Generated This Month
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-secondary-fixed/40 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[18px]">trending_up</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display font-bold text-on-surface tracking-tight">384</span>
                      <span className="font-label-sm text-label-sm text-secondary font-semibold bg-secondary-container/50 px-1.5 py-0.5 rounded">
                        +14.2% MoM
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Highest rate: Siliguri &amp; Kolkata Nodes
                    </p>
                  </div>
                </div>

                {/* KPI 3 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                      Pending Issue Approval
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-error">
                      <span className="material-symbols-outlined text-[18px]">draw</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display font-bold text-on-surface tracking-tight">24</span>
                      <span className="font-label-sm text-label-sm text-error font-semibold bg-error-container/60 px-1.5 py-0.5 rounded">
                        Action Req
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Awaiting Director cryptographic sign-off
                    </p>
                  </div>
                </div>

                {/* KPI 4 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                      Verified Online via QR
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-tertiary-fixed/60 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display font-bold text-on-surface tracking-tight">3,920</span>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold bg-tertiary-fixed/50 px-1.5 py-0.5 rounded">
                        81.3%
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Public employer &amp; university queries
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b-0 bg-surface-container-lowest p-1.5 rounded-xl shadow-sm overflow-x-auto border border-outline-variant/30">
                <button
                  onClick={() => setActiveTab('registry')}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'registry'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                  <span>Issued Certificates Registry</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                      activeTab === 'registry'
                        ? 'bg-on-primary/20 text-on-primary'
                        : 'bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    4,820
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('wizard')}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'wizard'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">dynamic_form</span>
                  <span>4-Step Batch Generation Wizard</span>
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                </button>

                <button
                  onClick={() => setActiveTab('simulator')}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'simulator'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                  <span>Public Verification Simulator</span>
                  <span className="bg-secondary-fixed-dim/40 text-on-secondary-fixed-variant px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase">
                    Live Link
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-4 py-2 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'audit'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">gavel</span>
                  <span>Revocation &amp; Audit Vault</span>
                </button>
              </div>

              {/* Top Half / Main Table (Issued Credentials Ledger) */}
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-outline-variant/30">
                {/* Filter Bar */}
                <div className="p-space-md bg-surface-container-lowest flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border-b border-outline-variant/20">
                  <div className="flex items-center gap-2 flex-wrap flex-1">
                    {/* Search Input */}
                    <div className="relative min-w-[280px] flex-1 max-w-md bg-surface-container-low rounded-lg px-3 py-1.5 flex items-center border border-outline-variant/20">
                      <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
                      <input
                        className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-full"
                        placeholder="Search by Cert ID, student name, UID..."
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                      <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded font-mono shadow-xs">
                        ⌘K
                      </span>
                    </div>

                    {/* Branch Filter */}
                    <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-2 cursor-pointer hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-outline text-[16px] mr-1.5">apartment</span>
                      <span className="font-label-sm text-label-sm text-outline mr-1">Branch:</span>
                      <select
                        aria-label="Filter by Branch"
                        value={selectedBranch}
                        onChange={e => setSelectedBranch(e.target.value)}
                        className="bg-transparent font-label-md text-label-md text-on-surface font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="Siliguri HQ Campus">Siliguri HQ Campus</option>
                        <option value="Binnaguri Campus">Binnaguri Campus</option>
                        <option value="Jalpaiguri Centre">Jalpaiguri Centre</option>
                        <option value="All">All Branches</option>
                      </select>
                    </div>

                    {/* Course Filter */}
                    <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-2 cursor-pointer hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-outline text-[16px] mr-1.5">code</span>
                      <span className="font-label-sm text-label-sm text-outline mr-1">Course:</span>
                      <select
                        aria-label="Filter by Course"
                        value={selectedCourse}
                        onChange={e => setSelectedCourse(e.target.value)}
                        className="bg-transparent font-label-md text-label-md text-on-surface font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Tally Prime & GST">Tally Prime &amp; GST</option>
                        <option value="All">All Courses</option>
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-2 cursor-pointer hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-outline text-[16px] mr-1.5">filter_alt</span>
                      <span className="font-label-sm text-label-sm text-outline mr-1">Status:</span>
                      <select
                        aria-label="Filter by Status"
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                        className="bg-transparent font-label-md text-label-md text-on-surface font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="All">All (Issued, Revoked, Draft)</option>
                        <option value="Verified">Verified &amp; Active</option>
                        <option value="Pending">Pending Review</option>
                        <option value="Revoked">Revoked</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm text-outline">
                      Showing {filteredCertificates.length} of 42 filtered
                    </span>
                    <button
                      onClick={() => onShowToast('Refreshed central cryptographic ledger cache.')}
                      className="p-2 rounded-lg text-outline hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
                      title="Reload Ledger"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">sync</span>
                    </button>
                  </div>
                </div>

                {/* High-Density Ledger Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/30">
                        <th className="py-3 px-space-md font-semibold">Certificate ID</th>
                        <th className="py-3 px-space-md font-semibold">Student Profile</th>
                        <th className="py-3 px-space-md font-semibold">Course &amp; Batch</th>
                        <th className="py-3 px-space-md font-semibold">Branch Node</th>
                        <th className="py-3 px-space-md font-semibold">Issue Date</th>
                        <th className="py-3 px-space-md font-semibold">Template Used</th>
                        <th className="py-3 px-space-md font-semibold">Cryptographic Status</th>
                        <th className="py-3 px-space-md font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-low font-body-sm text-body-sm text-on-surface">
                      {filteredCertificates.map(c => {
                        const isRevoked = c.statusType === 'revoked';
                        const isPending = c.statusType === 'pending';

                        return (
                          <tr
                            key={c.id}
                            className={`hover:bg-surface-container-low/70 transition-colors group ${
                              c.certId === 'CERT-APX-2026-00125' ? 'bg-surface-container-low/20' : ''
                            } ${isRevoked ? 'opacity-85' : ''}`}
                          >
                            {/* Certificate ID */}
                            <td className="py-3 px-space-md font-data-mono text-data-mono font-medium text-primary">
                              <div className="flex items-center gap-1.5">
                                <span className={isRevoked ? 'line-through text-error' : ''}>
                                  {c.certId}
                                </span>
                                <button
                                  onClick={() => copyToClipboard(c.certId, 'Certificate ID')}
                                  className="opacity-0 group-hover:opacity-100 text-outline hover:text-primary transition-opacity cursor-pointer"
                                  title="Copy Certificate ID"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                                </button>
                              </div>
                            </td>

                            {/* Student Profile */}
                            <td className="py-3 px-space-md">
                              <div className="flex items-center gap-2.5">
                                {c.avatarUrl ? (
                                  <img
                                    className="w-8 h-8 rounded-full object-cover shadow-xs"
                                    alt={c.studentName}
                                    src={c.avatarUrl}
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-surface-container-highest text-outline flex items-center justify-center font-label-sm text-label-sm font-bold">
                                    {c.avatarInitials}
                                  </div>
                                )}
                                <div className="flex flex-col">
                                  <span
                                    onClick={() => onNavigate('student-profile')}
                                    className="font-label-md text-label-md font-semibold text-on-surface cursor-pointer hover:text-primary transition-colors hover:underline"
                                  >
                                    {c.studentName}
                                  </span>
                                  <span className="font-body-sm text-body-sm text-outline">{c.studentPhone}</span>
                                </div>
                              </div>
                            </td>

                            {/* Course & Batch */}
                            <td className="py-3 px-space-md">
                              <div className="flex flex-col">
                                <span className="font-medium text-on-surface">{c.course}</span>
                                <span className="font-label-sm text-label-sm text-outline">{c.batch}</span>
                              </div>
                            </td>

                            {/* Branch Node */}
                            <td className="py-3 px-space-md">
                              <span className="font-label-md text-label-md text-on-surface-variant">
                                {c.branch}
                              </span>
                            </td>

                            {/* Issue Date */}
                            <td className="py-3 px-space-md">
                              <span
                                className={`font-data-mono text-data-mono ${
                                  isPending ? 'text-outline' : 'text-on-surface'
                                }`}
                              >
                                {c.issueDate}
                              </span>
                            </td>

                            {/* Template Used */}
                            <td className="py-3 px-space-md">
                              <span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant font-medium">
                                {c.template}
                              </span>
                            </td>

                            {/* Cryptographic Status */}
                            <td className="py-3 px-space-md">
                              {c.statusType === 'verified' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed-dim/40 text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
                                  <span className="material-symbols-outlined text-[13px] text-secondary">
                                    lock
                                  </span>
                                  <span>Verified &amp; Active</span>
                                </span>
                              )}
                              {c.statusType === 'pending' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                                  <span className="material-symbols-outlined text-[13px] text-outline">
                                    hourglass_top
                                  </span>
                                  <span>Pending Review</span>
                                </span>
                              )}
                              {c.statusType === 'revoked' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                                  <span className="material-symbols-outlined text-[13px]">gavel</span>
                                  <span>Revoked (Malpractice)</span>
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-space-md text-right">
                              <div className="flex items-center justify-end gap-1">
                                {isPending ? (
                                  <>
                                    <button
                                      onClick={() => {
                                        setSimCertQuery(c.certId);
                                        setVerifiedCert(c);
                                        onShowToast(`Loaded draft preview for ${c.studentName}`);
                                      }}
                                      className="p-1.5 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                                      title="Review Draft"
                                      type="button"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                    </button>
                                    <button
                                      onClick={() => handleSignOff(c)}
                                      className="p-1.5 rounded text-primary hover:bg-primary/10 transition-colors font-label-sm text-label-sm font-semibold px-2 cursor-pointer"
                                      type="button"
                                    >
                                      Sign Off
                                    </button>
                                  </>
                                ) : isRevoked ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        onShowToast(
                                          `Audit trail loaded: Certificate revoked on 12 Jul 2026 under committee resolution.`
                                        )
                                      }
                                      className="p-1.5 rounded text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                                      title="Audit Trail"
                                      type="button"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">history</span>
                                    </button>
                                    <span className="font-label-sm text-label-sm text-error bg-error-container/50 px-2 py-0.5 rounded font-mono">
                                      Invalidated
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        setSimCertQuery(c.certId);
                                        setVerifiedCert(c);
                                        onShowToast(`Previewing verified credential for ${c.studentName}`);
                                      }}
                                      className="p-1.5 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                                      title="View Credential"
                                      type="button"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                                    </button>
                                    <button
                                      onClick={() =>
                                        onShowToast(`Downloaded cryptographically sealed PDF for ${c.certId}`)
                                      }
                                      className="p-1.5 rounded text-outline hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                                      title="Download PDF"
                                      type="button"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">download</span>
                                    </button>
                                    <button
                                      onClick={() =>
                                        onShowToast(`Sent official verification QR link to ${c.studentPhone}`)
                                      }
                                      className="p-1.5 rounded text-outline hover:text-secondary hover:bg-secondary-fixed-dim/30 transition-colors cursor-pointer"
                                      title="Send WhatsApp Link"
                                      type="button"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">chat</span>
                                    </button>
                                    <button
                                      onClick={() => handleOpenRevokeModal(c)}
                                      className="p-1.5 rounded text-outline hover:text-error hover:bg-error-container/40 transition-colors cursor-pointer"
                                      title="Revoke Certificate"
                                      type="button"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">block</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination Controls */}
                <div className="px-space-md py-3 bg-surface-container-lowest flex items-center justify-between border-t border-outline-variant/30">
                  <span className="font-body-sm text-body-sm text-outline">
                    Displaying page 1 of 106 pages
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      className="px-2.5 py-1 rounded bg-surface-container-low text-outline font-label-sm text-label-sm hover:bg-surface-container-high disabled:opacity-40 cursor-not-allowed"
                      disabled
                      type="button"
                    >
                      Previous
                    </button>
                    <span className="font-label-sm text-label-sm px-2 py-1 font-semibold text-primary bg-primary-fixed/40 rounded">
                      1
                    </span>
                    <button
                      onClick={() => onShowToast('Viewing page 2')}
                      className="px-2.5 py-1 rounded hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm cursor-pointer"
                      type="button"
                    >
                      2
                    </button>
                    <button
                      onClick={() => onShowToast('Viewing page 3')}
                      className="px-2.5 py-1 rounded hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm cursor-pointer"
                      type="button"
                    >
                      3
                    </button>
                    <span className="text-outline text-label-sm px-1 font-mono">...</span>
                    <button
                      onClick={() => onShowToast('Viewing page 106')}
                      className="px-2.5 py-1 rounded hover:bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm cursor-pointer"
                      type="button"
                    >
                      106
                    </button>
                    <button
                      onClick={() => onShowToast('Viewing page 2')}
                      className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high cursor-pointer"
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Half Split (Two bespoke Cards side-by-side) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                {/* Card 1 (Left - 50% / 6 cols): Active 4-Step Batch Issuance Flow in Progress */}
                <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between relative overflow-hidden border border-outline-variant/30">
                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-space-md">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">layers</span>
                        </div>
                        <div>
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Batch Issuance Engine
                          </h3>
                          <span className="font-body-sm text-body-sm text-outline">
                            Cohort Execution: WD Evening — 42 Students
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed-dim/40 text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                        Live Pipeline
                      </span>
                    </div>

                    {/* Step Progress Indicator */}
                    <div className="bg-surface-container-low p-space-md rounded-xl mb-space-lg border border-outline-variant/20">
                      <div className="grid grid-cols-4 gap-2 text-center relative">
                        {/* Step 1 (Complete) */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </div>
                          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                            1. Template
                          </span>
                          <span className="font-body-sm text-[11px] text-outline truncate max-w-[80px]">
                            Flagship Dip.
                          </span>
                        </div>

                        {/* Step 2 (Complete) */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </div>
                          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                            2. Eligibility
                          </span>
                          <span className="font-body-sm text-[11px] text-outline truncate max-w-[80px]">
                            42 Passed
                          </span>
                        </div>

                        {/* Step 3 (Complete) */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </div>
                          <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                            3. Merged
                          </span>
                          <span className="font-body-sm text-[11px] text-outline truncate max-w-[80px]">
                            Variables OK
                          </span>
                        </div>

                        {/* Step 4 (Active / Processing) */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-md shadow-primary/30 ring-2 ring-primary-container ring-offset-2">
                            <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                          </div>
                          <span className="font-label-sm text-label-sm font-semibold text-primary">
                            4. Sign &amp; Issue
                          </span>
                          <span className="font-body-sm text-[11px] text-primary font-medium">
                            {((signingProgress / totalCandidates) * 100).toFixed(1)}% Done
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Live Progress Tracker Box */}
                    <div className="bg-surface-container-high/40 p-space-md rounded-xl mb-space-md border border-outline-variant/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">terminal</span>
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            Cryptographic Batch Signing in Progress
                          </span>
                        </div>
                        <span className="font-data-mono text-data-mono font-bold text-primary">
                          {signingProgress} / {totalCandidates} (
                          {((signingProgress / totalCandidates) * 100).toFixed(1)}%)
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
                        <div
                          className="bg-secondary h-full rounded-full transition-all duration-500 relative"
                          style={{ width: `${(signingProgress / totalCandidates) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-[pulse_1.5s_infinite]"></div>
                        </div>
                      </div>

                      {/* Terminal status line */}
                      <div className="flex items-center justify-between mt-2.5 font-data-mono text-body-sm text-outline">
                        <span className="truncate">
                          Signing CERT-APX-2026-00162 (RSA-2048 + SHA256)...
                        </span>
                        <span className="font-bold text-secondary flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Live Stream
                        </span>
                      </div>
                    </div>

                    {/* Deliverables Checklist Preview */}
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[20px] text-secondary">
                            verified_user
                          </span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">
                              Tamper-Proof Ledger Records
                            </span>
                            <span className="font-body-sm text-body-sm text-outline">
                              Immutable ledger hashes calculated for 42 candidates
                            </span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm font-semibold text-secondary">
                          Verified
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-[20px] text-primary">
                            mark_chat_read
                          </span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md font-semibold text-on-surface">
                              Instant WhatsApp Delivery Pipeline
                            </span>
                            <span className="font-body-sm text-body-sm text-outline">
                              Queued to send encrypted direct download links
                            </span>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm font-semibold text-primary">Armed</span>
                      </div>
                    </div>
                  </div>

                  {/* Output Deliverable Actions CTA */}
                  <div className="flex flex-col sm:flex-row items-center gap-space-sm mt-space-lg pt-space-md bg-surface-container-low/40 p-space-sm rounded-xl">
                    <button
                      onClick={handleBatchZipDownload}
                      className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-md text-label-md font-semibold shadow-xs transition-colors cursor-pointer border border-outline-variant/30"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">folder_zip</span>
                      <span>Download 42 PDFs (ZIP - 48MB)</span>
                    </button>
                    <button
                      onClick={handleDispatchWhatsApp}
                      className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Dispatch to 42 WhatsApps</span>
                    </button>
                  </div>
                </div>

                {/* Card 2 (Right - 50% / 6 cols): Public Certificate Verification Portal Preview */}
                <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col justify-between relative overflow-hidden border border-outline-variant/30">
                  <div>
                    {/* Portal Header */}
                    <div className="flex items-center justify-between mb-space-md">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">public</span>
                        </div>
                        <div>
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                            Public Verification Simulator
                          </h3>
                          <span className="font-body-sm text-body-sm text-outline">
                            EduManage Trust Network — Live View for Employers
                          </span>
                        </div>
                      </div>
                      <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded font-mono">
                        /verify/{verifiedCert.certId}
                      </span>
                    </div>

                    {/* Simulation Quick Search Bar */}
                    <div className="relative flex items-center bg-surface-container-low rounded-lg px-3 py-2 mb-space-md border border-outline-variant/20">
                      <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
                      <input
                        className="bg-transparent font-data-mono text-data-mono font-medium text-on-surface focus:outline-none w-full"
                        placeholder="Enter 16-character Certificate UID..."
                        type="text"
                        value={simCertQuery}
                        onChange={e => setSimCertQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSimulateScan()}
                      />
                      <button
                        onClick={handleSimulateScan}
                        className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-container-high cursor-pointer"
                      >
                        {simScanLoading ? 'Scanning...' : 'Simulate Scan'}
                      </button>
                    </div>

                    {/* Verified Credential Badge banner */}
                    {verifiedCert.statusType === 'verified' && (
                      <div className="p-space-md rounded-xl bg-secondary-fixed-dim/30 flex items-start gap-3 mb-space-md border border-secondary/20">
                        <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">verified</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-bold text-on-secondary-fixed-variant tracking-wide uppercase">
                            Official Valid Credential — Apex Institute
                          </span>
                          <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant/90 mt-0.5">
                            This academic qualification was verified directly against the Apex Central Cryptographic
                            Registry.
                          </p>
                        </div>
                      </div>
                    )}

                    {verifiedCert.statusType === 'revoked' && (
                      <div className="p-space-md rounded-xl bg-error-container/40 flex items-start gap-3 mb-space-md border border-error/20">
                        <div className="w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">gavel</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-bold text-error tracking-wide uppercase">
                            REVOKED CREDENTIAL — DO NOT ACCEPT
                          </span>
                          <p className="font-body-sm text-body-sm text-error/90 mt-0.5">
                            This certificate was formally invalidated due to academic irregularity / examination
                            breach.
                          </p>
                        </div>
                      </div>
                    )}

                    {verifiedCert.statusType === 'pending' && (
                      <div className="p-space-md rounded-xl bg-surface-container-high/60 flex items-start gap-3 mb-space-md border border-outline-variant/30">
                        <div className="w-8 h-8 rounded-full bg-outline text-white flex items-center justify-center shrink-0 shadow-xs">
                          <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-bold text-on-surface tracking-wide uppercase">
                            Provisional Draft — Sign-off In Progress
                          </span>
                          <p className="font-body-sm text-body-sm text-outline mt-0.5">
                            This credential has completed examination moderation and is awaiting Director digital
                            signature.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Verified Data Grid (Publicly safe, privacy conscious) */}
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/20">
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                        {/* Item 1 */}
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                            Graduate Name
                          </span>
                          <span className="font-label-md text-label-md font-bold text-on-surface">
                            {verifiedCert.studentName}
                          </span>
                          <span className="font-data-mono text-[11px] text-outline">
                            UID: ABC-SIL-26-00125
                          </span>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                            Certificate ID
                          </span>
                          <span
                            className={`font-data-mono text-data-mono font-semibold ${
                              verifiedCert.statusType === 'revoked'
                                ? 'text-error line-through'
                                : 'text-primary'
                            }`}
                          >
                            {verifiedCert.certId}
                          </span>
                          <span className="font-body-sm text-[11px] text-outline">
                            Issued: {verifiedCert.issueDate}, 11:42 AM IST
                          </span>
                        </div>

                        {/* Item 3 */}
                        <div className="flex flex-col col-span-2 sm:col-span-1">
                          <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                            Academic Program
                          </span>
                          <span className="font-label-md text-label-md font-semibold text-on-surface">
                            {verifiedCert.course}
                          </span>
                          <span className="font-body-sm text-[11px] text-outline">
                            6 Months / 360 Contact Hours
                          </span>
                        </div>

                        {/* Item 4 */}
                        <div className="flex flex-col col-span-2 sm:col-span-1">
                          <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                            Final Grade Awarded
                          </span>
                          <span className="font-label-md text-label-md font-bold text-secondary flex items-center gap-1">
                            <span>{verifiedCert.grade}</span>
                            {verifiedCert.statusType === 'verified' && (
                              <span className="material-symbols-outlined text-[16px]">stars</span>
                            )}
                          </span>
                          <span className="font-body-sm text-[11px] text-outline">
                            {verifiedCert.percentage}
                          </span>
                        </div>

                        {/* Item 5 */}
                        <div className="flex flex-col col-span-2">
                          <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                            Issuing Campus &amp; Node
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface font-medium">
                            Apex Institute of Technology &amp; Skills — {verifiedCert.branch}
                          </span>
                        </div>

                        {/* Item 6 */}
                        <div className="flex flex-col col-span-2">
                          <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                            Signatory Authority
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                              {verifiedCert.signatory}
                            </span>
                            <span
                              className={`font-label-sm text-label-sm px-2 py-0.5 rounded font-mono ${
                                verifiedCert.statusType === 'verified'
                                  ? 'text-secondary bg-secondary-fixed/50'
                                  : verifiedCert.statusType === 'revoked'
                                  ? 'text-error bg-error-container'
                                  : 'text-outline bg-surface-container-high'
                              }`}
                            >
                              {verifiedCert.statusType === 'verified'
                                ? 'e-Sign Valid'
                                : verifiedCert.statusType === 'revoked'
                                ? 'Revoked'
                                : 'Pending'}
                            </span>
                          </div>
                        </div>

                        {/* Item 7 */}
                        <div className="flex flex-col col-span-2 bg-surface-container-lowest p-2 rounded-lg border border-outline-variant/30">
                          <span className="font-label-sm text-label-sm text-outline uppercase font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] text-primary">
                              fingerprint
                            </span>
                            <span>Cryptographic Ledger Fingerprint</span>
                          </span>
                          <span className="font-data-mono text-[11px] text-on-surface-variant font-bold truncate">
                            {verifiedCert.hash}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simulator Bottom Actions */}
                  <div className="flex items-center gap-space-sm mt-space-lg pt-space-md border-t border-outline-variant/20">
                    <button
                      onClick={() =>
                        onShowToast(`Downloading official Academic Transcript for ${verifiedCert.studentName}`)
                      }
                      className="w-1/2 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-md text-label-md font-semibold transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                      <span>Download Official Transcript</span>
                    </button>
                    <button
                      onClick={() =>
                        onShowToast(
                          `Ledger hash verified on Apex Blockchain Node: Block #99142 confirmed valid.`
                        )
                      }
                      className="w-1/2 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface-container text-primary hover:bg-surface-variant font-label-md text-label-md font-semibold transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">hub</span>
                      <span>Verify Ledger Signature</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL 1: Certificate Revocation Modal */}
      {isRevokeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-lg relative border border-outline-variant/30 animate-in zoom-in-95">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-outline hover:text-on-surface transition-colors cursor-pointer"
              onClick={() => setIsRevokeModalOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
            <div className="flex items-center gap-3 mb-space-md">
              <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[22px]">warning</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Revoke Certificate Authority
                </h3>
                <span className="font-body-sm text-body-sm text-outline font-mono">
                  Target ID: {targetCertToRevoke?.certId} ({targetCertToRevoke?.studentName})
                </span>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
              Revoking this credential will immediately invalidate the public QR verification gateway, mark
              the digital credential as fraudulent in public audits, and notify the graduate.
            </p>

            <div className="space-y-3 mb-space-lg">
              <label className="block font-label-md text-label-md font-semibold text-on-surface">
                Select Primary Justification Reason
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high cursor-pointer transition-colors">
                  <input
                    checked={revokeReason === 'Academic Malpractice / Examination Breach'}
                    onChange={() => setRevokeReason('Academic Malpractice / Examination Breach')}
                    className="accent-error"
                    name="revoke_reason"
                    type="radio"
                  />
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Academic Malpractice / Examination Breach
                  </span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high cursor-pointer transition-colors">
                  <input
                    checked={revokeReason === 'Fee Non-Clearance / Financial Irregularity'}
                    onChange={() => setRevokeReason('Fee Non-Clearance / Financial Irregularity')}
                    className="accent-error"
                    name="revoke_reason"
                    type="radio"
                  />
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Fee Non-Clearance / Financial Irregularity
                  </span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high cursor-pointer transition-colors">
                  <input
                    checked={revokeReason === 'Administrative Data Typo / Re-issuance Required'}
                    onChange={() => setRevokeReason('Administrative Data Typo / Re-issuance Required')}
                    className="accent-error"
                    name="revoke_reason"
                    type="radio"
                  />
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Administrative Data Typo / Re-issuance Required
                  </span>
                </label>
              </div>

              <div className="mt-2">
                <label className="block font-label-sm text-label-sm text-outline font-semibold mb-1">
                  Detailed Audit Justification (Compulsory for ISO-9001 Compliance)
                </label>
                <textarea
                  className="w-full bg-surface-container-low rounded-lg p-2.5 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none border border-outline-variant/30"
                  placeholder="Provide case file reference and committee decision notes..."
                  rows={2}
                  value={revokeNotes}
                  onChange={e => setRevokeNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/30">
              <button
                className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors cursor-pointer"
                onClick={() => setIsRevokeModalOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-error text-on-error hover:bg-error/90 font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer"
                onClick={handleConfirmRevoke}
                type="button"
              >
                Confirm Invalidation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Batch Generation Modal */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-space-lg relative border border-outline-variant/30 animate-in zoom-in-95">
            <button
              className="absolute top-4 right-4 text-outline hover:text-on-surface transition-colors cursor-pointer"
              onClick={() => setIsGenerateModalOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
            <div className="flex items-center gap-3 mb-space-md">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[22px]">add_circle</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Generate New Batch Certificates
                </h3>
                <span className="font-body-sm text-body-sm text-outline">
                  Initialize cryptographic diploma signing run
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-space-lg">
              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Target Course
                </label>
                <select
                  value={genCourse}
                  onChange={e => setGenCourse(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none cursor-pointer"
                >
                  <option value="Web Development">Full Stack Web Development</option>
                  <option value="Digital Marketing Pro">Digital Marketing Pro</option>
                  <option value="Tally Prime & GST">Tally Prime &amp; GST Professional</option>
                  <option value="Graphic & UI Design">Graphic &amp; UI/UX Design</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Batch Cohort
                  </label>
                  <select
                    value={genBatch}
                    onChange={e => setGenBatch(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-sm focus:border-primary focus:outline-none cursor-pointer"
                  >
                    <option value="WD Evening (Batch 02)">WD Evening (Batch 02)</option>
                    <option value="DM Morning (Batch 01)">DM Morning (Batch 01)</option>
                    <option value="Weekend Fast-Track">Weekend Fast-Track</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                    Eligible Students
                  </label>
                  <input
                    type="number"
                    value={genCandidateCount}
                    onChange={e => setGenCandidateCount(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 font-body-md focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                  Security Certificate Template
                </label>
                <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">workspace_premium</span>
                    <span className="font-label-md text-on-surface">Flagship Multi-Campus Diploma (v3.2)</span>
                  </div>
                  <span className="text-secondary font-semibold font-mono text-xs">RSA-2048 + QR</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/30">
              <button
                className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors cursor-pointer"
                onClick={() => setIsGenerateModalOpen(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                onClick={() => {
                  setIsGenerateModalOpen(false);
                  setSigningProgress(42);
                  onShowToast(
                    `Batch issuance job created for ${genCandidateCount} students in ${genCourse}!`
                  );
                }}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                <span>Launch Signing Engine</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
