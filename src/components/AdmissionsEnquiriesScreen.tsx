import React, { useState, useMemo } from 'react';
import { ScreenType, LeadApplicant, CounsellorNote } from '../types';
import { INITIAL_LEADS } from '../data/mockLeads';
import { BRAND_HOTLINKS } from '../data/mockData';
import { useSidebar } from '../context/SidebarContext';

interface AdmissionsEnquiriesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const AdmissionsEnquiriesScreen: React.FC<AdmissionsEnquiriesScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [leads, setLeads] = useState<LeadApplicant[]>(INITIAL_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState<string>(INITIAL_LEADS[0]?.id || '');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1280;
    }
    return false;
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('All Branches (8)');
  const [courseFilter, setCourseFilter] = useState('All Courses');
  const [counsellorFilter, setCounsellorFilter] = useState('All Counsellors');
  const [sourceFilter, setSourceFilter] = useState('All Sources');
  const [activeStageFilter, setActiveStageFilter] = useState<string>('Interested');
  const [quickFilter, setQuickFilter] = useState<string | null>(null);
  const [isCompactDensity, setIsCompactDensity] = useState(false);

  // Modals state
  const [isNewEnquiryOpen, setIsNewEnquiryOpen] = useState(false);
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [isBulkWhatsAppOpen, setIsBulkWhatsAppOpen] = useState(false);
  const [isChallanPreviewOpen, setIsChallanPreviewOpen] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  // Campus dropdown
  const [isCampusDropdownOpen, setIsCampusDropdownOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('All Branches (8 Active)');

  // New enquiry form state
  const [newEnquiryData, setNewEnquiryData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'Digital Marketing',
    branch: 'Binnaguri Branch',
    source: 'Website Form' as LeadApplicant['source'],
    counsellor: 'Rahul Deb',
    budget: '₹25,000',
    notes: '',
    priority: 'HIGH PRIORITY' as LeadApplicant['priority'],
  });

  // Selected lead object
  const selectedLead = useMemo(() => {
    return leads.find(l => l.id === selectedLeadId) || leads[0];
  }, [leads, selectedLeadId]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          lead.name.toLowerCase().includes(q) ||
          lead.phone.toLowerCase().includes(q) ||
          lead.enquiryId.toLowerCase().includes(q) ||
          lead.course.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Branch
      if (branchFilter !== 'All Branches (8)' && lead.branch !== branchFilter) {
        return false;
      }

      // Course
      if (courseFilter !== 'All Courses' && !lead.course.toLowerCase().includes(courseFilter.toLowerCase().split(' ')[0])) {
        return false;
      }

      // Counsellor
      if (counsellorFilter !== 'All Counsellors' && lead.counsellor !== counsellorFilter) {
        return false;
      }

      // Source
      if (sourceFilter !== 'All Sources' && lead.source !== sourceFilter) {
        return false;
      }

      // Pipeline stage filter
      if (activeStageFilter) {
        if (activeStageFilter === 'New Enquiries' && lead.status !== 'New') return false;
        if (activeStageFilter === 'Contacted' && lead.status !== 'Contacted') return false;
        if (activeStageFilter === 'Interested' && lead.status !== 'Interested') return false;
        if (activeStageFilter === 'Demo / Lab' && lead.status !== 'Demo Scheduled') return false;
        if (activeStageFilter === 'Application' && lead.status !== 'Application') return false;
        if (activeStageFilter === 'Admitted' && lead.status !== 'Admitted') return false;
      }

      // Quick filter pills
      if (quickFilter === 'highPriority' && lead.priority !== 'HIGH PRIORITY' && lead.priority !== 'URGENT') return false;
      if (quickFilter === 'labDemo' && !lead.isLabDemoToday) return false;
      if (quickFilter === 'overdue' && !lead.isOverdue) return false;
      if (quickFilter === 'pendingFee' && !lead.isPendingFeeVerification) return false;

      return true;
    });
  }, [leads, searchQuery, branchFilter, courseFilter, counsellorFilter, sourceFilter, activeStageFilter, quickFilter]);

  // Handlers
  const handleSelectLead = (id: string, name: string) => {
    setSelectedLeadId(id);
    setIsDrawerOpen(true);
    onShowToast(`Loaded record for: ${name.toUpperCase()}`);
  };

  const handleExportCSV = () => {
    const csvHeader = 'EnquiryID,ApplicantName,Phone,Course,Branch,Source,Counsellor,Status,Priority,Budget,LastActive\n';
    const csvRows = filteredLeads.map(l =>
      `"${l.enquiryId}","${l.name}","${l.phone}","${l.course}","${l.branch}","${l.source}","${l.counsellor}","${l.status}","${l.priority}","${l.budget}","${l.lastActive}"`
    ).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `edumanage_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(`Exported ${filteredLeads.length} prospective applicant records to CSV.`);
  };

  const handleCreateNewEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnquiryData.name.trim() || !newEnquiryData.phone.trim()) {
      onShowToast('Please provide at least student name and phone number.');
      return;
    }

    const initials = newEnquiryData.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'ST';

    const newLead: LeadApplicant = {
      id: `lead-${Date.now()}`,
      name: newEnquiryData.name,
      initials,
      avatarBg: 'bg-primary-fixed',
      avatarText: 'text-primary',
      phone: newEnquiryData.phone,
      email: newEnquiryData.email || `${newEnquiryData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      course: newEnquiryData.course,
      courseDetail: `${newEnquiryData.course} (Standard Batch)`,
      branch: newEnquiryData.branch,
      source: newEnquiryData.source,
      sourceIcon: newEnquiryData.source === 'Walk-in' ? 'storefront' : newEnquiryData.source === 'JustDial' ? 'call' : 'public',
      sourceColor: 'text-primary',
      counsellor: newEnquiryData.counsellor,
      counsellorInitials: newEnquiryData.counsellor.split(' ').map(p => p[0]).join('').slice(0, 2),
      counsellorRole: 'Academic Counsellor',
      status: 'New',
      statusBadgeBg: 'bg-surface-container-high',
      statusBadgeText: 'text-on-surface-variant',
      statusDotColor: 'bg-primary',
      lastActive: 'Just now',
      enquiryId: `#ENQ-2025-${Math.floor(4000 + Math.random() * 900)}`,
      priority: newEnquiryData.priority,
      highIntent: newEnquiryData.priority === 'HIGH PRIORITY',
      budget: newEnquiryData.budget,
      nextFollowUp: 'Today, 5:00 PM',
      conversionStep: 1,
      conversionStepName: 'Enquiry Captured',
      notes: newEnquiryData.notes
        ? [
            {
              id: `note-${Date.now()}`,
              author: 'System Intake',
              time: 'Just now',
              text: newEnquiryData.notes,
            },
          ]
        : [],
      directAdmissionReady: false,
      enrollmentPreview: `#ABC-${newEnquiryData.branch.slice(0, 3).toUpperCase()}-26-${Math.floor(10000 + Math.random() * 90000)}`,
      suggestedBatch: `${newEnquiryData.course.slice(0, 3).toUpperCase()}-MORNING-A1`,
    };

    setLeads([newLead, ...leads]);
    setSelectedLeadId(newLead.id);
    setIsNewEnquiryOpen(false);
    onShowToast(`New enquiry created successfully for ${newLead.name} (${newLead.enquiryId})!`);
    setNewEnquiryData({
      name: '',
      phone: '',
      email: '',
      course: 'Digital Marketing',
      branch: 'Binnaguri Branch',
      source: 'Website Form',
      counsellor: 'Rahul Deb',
      budget: '₹25,000',
      notes: '',
      priority: 'HIGH PRIORITY',
    });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    const newNote: CounsellorNote = {
      id: `note-${Date.now()}`,
      author: 'Rajesh Sharma (Institution Admin)',
      time: 'Just now',
      text: newNoteText,
    };

    setLeads(prev =>
      prev.map(l =>
        l.id === selectedLead.id
          ? {
              ...l,
              notes: [newNote, ...l.notes],
              lastActive: 'Just now',
            }
          : l
      )
    );

    setNewNoteText('');
    setIsAddingNote(false);
    onShowToast(`Note added to ${selectedLead.name}'s tele-log dossier.`);
  };

  const handleCompleteConversion = () => {
    if (!selectedLead) return;

    setLeads(prev =>
      prev.map(l =>
        l.id === selectedLead.id
          ? {
              ...l,
              status: 'Admitted',
              conversionStep: 5,
              conversionStepName: 'Enrolled & Fees Paid',
              statusBadgeBg: 'bg-secondary-container',
              statusBadgeText: 'text-on-secondary-container',
              statusDotColor: 'bg-secondary',
            }
          : l
      )
    );
    setIsConversionModalOpen(false);
    setIsChallanPreviewOpen(true);
    onShowToast(`Applicant ${selectedLead.name} converted to Direct Admission! Challan ready.`);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased flex">
      {/* Mobile backdrop overlay for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. FIXED LEFT SIDEBAR (260px) */}
      <aside
        className={`fixed left-0 top-12 bottom-0 bg-surface-container-lowest border-r border-outline-variant/40 z-50 flex flex-col justify-between shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-in-out ${
          !isSidebarOpen
            ? 'w-[260px] -translate-x-full'
            : isSidebarCollapsed
            ? 'w-[260px] lg:w-[72px] translate-x-0'
            : 'w-[260px] translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header Brand */}
          <div className="h-16 px-space-md flex items-center justify-between border-b border-outline-variant/30 flex-shrink-0">
            <div className="flex items-center gap-space-xs min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-headline-sm text-on-surface leading-tight truncate font-bold">
                    EduManage
                  </span>
                  <span className="font-label-sm text-[10px] text-primary tracking-wider uppercase font-semibold">
                    Enterprise HQ
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                aria-label="Collapse navigation"
                className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container transition-colors"
                type="button"
                title={isSidebarCollapsed ? 'Expand navigation' : 'Compact navigation'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer flex items-center justify-center"
                aria-label="Hide sidebar"
                title="Hide sidebar"
              >
                <span className="material-symbols-outlined text-[18px]">menu_open</span>
              </button>
            </div>
          </div>

          {/* Nav Items */}
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
                  {!isSidebarCollapsed && <span className="font-label-lg text-label-lg">Dashboard</span>}
                </div>
                {!isSidebarCollapsed && <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>}
              </button>
            </nav>

            {/* Admissions Section */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Admissions
                </div>
              )}
              <nav className="space-y-0.5">
                <button
                  onClick={() => {
                    setActiveStageFilter('');
                    setQuickFilter(null);
                  }}
                  className="w-full flex items-center justify-between px-space-sm py-1.5 transition-all bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-sm text-left"
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-white">contact_support</span>
                    {!isSidebarCollapsed && <span className="font-body-md text-body-md truncate">Enquiries</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container-high text-primary">
                      128
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setActiveStageFilter('Application');
                    onShowToast('Filtered to Applications pipeline view (24 leads).');
                  }}
                  className="w-full flex items-center justify-between px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-outline">assignment</span>
                    {!isSidebarCollapsed && <span className="font-body-md text-body-md truncate">Applications</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="px-1.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-container-high text-primary">
                      24
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setActiveStageFilter('Admitted');
                    onShowToast('Filtered to Admitted students cohort (18 enrolled).');
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">how_to_reg</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Admissions</span>}
                </button>
              </nav>
            </div>

            {/* Students Section */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Students
                </div>
              )}
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('students-directory')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">group</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">All Students</span>}
                </button>
                <button
                  onClick={() => setIsNewEnquiryOpen(true)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">person_add</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Add Student</span>}
                </button>
                <button
                  onClick={() => onShowToast('Student Documents repository: 100% digital KYC records securely vaulted.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">folder_shared</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Documents</span>}
                </button>
                <button
                  onClick={() => onShowToast('ID Cards Generator: RFID cards with encrypted QR verification ready.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">ID Cards</span>}
                </button>
              </nav>
            </div>

            {/* Academics Section */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Academics
                </div>
              )}
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('courses-batches')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">menu_book</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Courses & Batches</span>}
                </button>
                <button
                  onClick={() => onShowToast('Academic Subjects curriculum loaded with credit system.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">auto_stories</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Subjects</span>}
                </button>
                <button
                  onClick={() => onShowToast('Timetable: Multi-campus lab room allocations synchronized.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">calendar_month</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Timetable</span>}
                </button>
                <button
                  onClick={() => onShowToast('Assignments module: 42 submissions reviewed this week.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">task</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Assignments</span>}
                </button>
                <button
                  onClick={() => onShowToast('Exams & Results grading system with CGPA computation.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">grade</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Exams & Results</span>}
                </button>
              </nav>
            </div>

            {/* Attendance Section */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Attendance
                </div>
              )}
              <nav className="space-y-0.5">
                <button
                  onClick={() => onShowToast('Biometric & RFID synchronization: 98.4% daily student presence.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">fingerprint</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Biometric & RFID</span>}
                </button>
                <button
                  onClick={() => onShowToast('Manual attendance entry opened for classroom mentors.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">checklist</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Manual Marking</span>}
                </button>
                <button
                  onClick={() => onShowToast('Leave Requests: 3 student medical leaves awaiting approval.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">event_busy</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Leave Requests</span>}
                </button>
              </nav>
            </div>

            {/* Fees & Finance */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Fees & Finance
                </div>
              )}
              <nav className="space-y-0.5">
                <button
                  onClick={() => onShowToast('Fee Structure: 2025 installment matrices configured.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">account_balance_wallet</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Fee Structure</span>}
                </button>
                <button
                  onClick={() => onShowToast('Fee Collection POS terminal opened.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">point_of_sale</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Collect Fee</span>}
                </button>
                <button
                  onClick={() => onShowToast('Payment gateway settlements: ₹4.8L cleared this week.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">payments</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Payments</span>}
                </button>
                <button
                  onClick={() => {
                    setQuickFilter('pendingFee');
                    onShowToast('Filtered to leads with due fee verification.');
                  }}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">pending_actions</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Due Fees</span>}
                </button>
                <button
                  onClick={() => setIsChallanPreviewOpen(true)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">receipt_long</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Invoices & Receipts</span>}
                </button>
                <button
                  onClick={() => onShowToast('Campus expense register up to date.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">request_quote</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Expenses</span>}
                </button>
              </nav>
            </div>

            {/* Teachers & Staff */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Teachers & Staff
                </div>
              )}
              <nav className="space-y-0.5">
                <button
                  onClick={() => onShowToast('Faculty Directory: 142 teaching mentors onboarded.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">co_present</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Faculty Directory</span>}
                </button>
                <button
                  onClick={() => onShowToast('Staff Management: Support staff and lab technicians.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">badge</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Staff</span>}
                </button>
                <button
                  onClick={() => onShowToast('Payroll processed for current pay cycle.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">price_check</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Payroll</span>}
                </button>
                <button
                  onClick={() => onShowToast('Duty Rosters: Lab oversight and weekend shifts.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">schedule</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Duty Rosters</span>}
                </button>
              </nav>
            </div>

            {/* Operations & Network */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Operations & Network
                </div>
              )}
              <nav className="space-y-0.5">
                <button
                  onClick={() => onNavigate('certificates')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">workspace_premium</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Certificates & QR</span>}
                </button>
                <button
                  onClick={() => setIsBulkWhatsAppOpen(true)}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">campaign</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Communication</span>}
                </button>
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="w-full flex items-center justify-between px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="material-symbols-outlined text-[18px] text-outline">hub</span>
                    {!isSidebarCollapsed && <span className="font-body-md text-body-md truncate">Campuses Topology</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-container text-on-secondary-container">
                      8 Active
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onShowToast('Financial and enrollment audit reports exported.')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">analytics</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Reports & Ledger</span>}
                </button>
                <button
                  onClick={() => onNavigate('admin')}
                  className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">settings</span>
                  {!isSidebarCollapsed && <span className="font-body-md text-body-md">Settings</span>}
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Profile / Account */}
          <div className="p-space-sm border-t border-outline-variant/30 bg-surface-container-low/50 flex-shrink-0">
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-primary font-semibold text-xs flex-shrink-0">
                  AP
                </div>
                {!isSidebarCollapsed && (
                  <div className="min-w-0">
                    <p className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                      Apex Tech Institute
                    </p>
                    <p className="font-body-sm text-[11px] text-outline truncate">
                      Branch HQ Network
                    </p>
                  </div>
                )}
              </div>
              {!isSidebarCollapsed && (
                <button
                  onClick={() => onShowToast('Switching tenant institute session...')}
                  aria-label="Switch institute"
                  className="text-outline hover:text-primary p-1 rounded transition-colors"
                  type="button"
                  title="Switch Institute"
                >
                  <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                </button>
              )}
            </div>

            <button
              onClick={() => {
                onShowToast('Logged out of Institution Admin session.');
                onNavigate('landing');
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              {!isSidebarCollapsed && <span className="font-label-md text-label-md font-medium">Log out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          !isSidebarOpen
            ? 'pl-0'
            : isSidebarCollapsed
            ? 'pl-0 lg:pl-[72px]'
            : 'pl-0 lg:pl-[260px]'
        }`}
      >
        {/* TOP RESPONSIVE HEADER (Sticky below global navigation) */}
        <header
          className="sticky top-12 z-30 h-14 sm:h-16 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/40 flex items-center justify-between px-3 sm:px-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-all duration-300 ease-in-out"
        >
          {/* Left Brand / Campus View / Search */}
          <div className="flex items-center gap-1.5 sm:gap-space-md min-w-0">
            {/* Show/Hide Sidebar Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (!isSidebarOpen) {
                  setIsSidebarOpen(true);
                  setIsSidebarCollapsed(false);
                } else {
                  setIsSidebarOpen(false);
                }
              }}
              className="p-1.5 sm:p-2 -ml-1 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center border border-outline-variant/30 shadow-xs"
              aria-label="Toggle Navigation Menu"
              title={isSidebarOpen ? "Hide Sidebar (Maximize workspace)" : "Show Sidebar"}
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>

            <div className="flex items-center gap-2 flex-shrink-0">
              <img
                alt="Brand logo"
                className="h-7 sm:h-8 w-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                src={BRAND_HOTLINKS.logo}
                onClick={() => onNavigate('landing')}
              />
              <div className="hidden xl:flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm font-semibold text-on-surface tracking-tight truncate max-w-[220px]">
                    Apex Institute of Technology & Skills
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
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 rounded-lg text-left transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-primary">location_on</span>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[9px] sm:text-[10px] text-outline leading-none uppercase hidden sm:inline">
                    Campus View
                  </span>
                  <span className="font-label-md text-xs sm:text-label-md text-on-surface font-semibold flex items-center gap-0.5 sm:gap-1 max-w-[90px] sm:max-w-none truncate">
                    {selectedCampus} <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-outline">expand_more</span>
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
                    'Binnaguri Branch',
                    'Siliguri HQ',
                    'Jalpaiguri Campus',
                    'Cooch Behar',
                    'Malda Branch (Opening Soon)',
                  ].map(b => (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedCampus(b);
                        setBranchFilter(b.includes('All') ? 'All Branches (8)' : b);
                        setIsCampusDropdownOpen(false);
                        onShowToast(`Campus scope switched to: ${b}`);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-surface-container-low flex items-center justify-between ${
                        selectedCampus === b ? 'text-primary font-bold bg-primary-fixed/20' : 'text-on-surface'
                      }`}
                    >
                      <span>{b}</span>
                      {selectedCampus === b && (
                        <span className="material-symbols-outlined text-sm text-primary">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input (⌘K) */}
            <div className="relative w-64 lg:w-96 hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search students, admissions, courses, fees (⌘K)..."
                className="w-full h-9 pl-9 pr-8 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-outline-variant/60 text-[10px] font-data-mono text-outline">
                ⌘K
              </span>
            </div>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-1 sm:gap-space-sm flex-shrink-0">
            <button
              onClick={() => setIsNewEnquiryOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm font-label-md text-xs sm:text-label-md font-semibold active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[17px] sm:text-[18px]">add</span>
              <span className="hidden sm:inline">Quick Action</span>
            </button>

            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/40 border border-secondary/20 text-on-secondary-container">
              <span className="material-symbols-outlined text-[15px] text-secondary">event_repeat</span>
              <span className="font-label-sm text-label-sm font-semibold">AY 2025-26</span>
            </div>

            <button
              onClick={() => onShowToast('You have 3 notifications: 2 demo confirmations & 1 fee pending.')}
              aria-label="Notifications"
              className="relative p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error text-on-error font-data-mono text-[10px] font-bold flex items-center justify-center leading-none ring-2 ring-surface-container-lowest">
                3
              </span>
            </button>

            <button
              onClick={() => onShowToast('Documentation & Help Desk: edumanage.io/docs')}
              aria-label="Help and documentation"
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors hidden sm:flex"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>

            <div className="h-6 w-[1px] bg-outline-variant/40 mx-1"></div>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-2 pl-1 cursor-pointer group" onClick={() => onNavigate('admin')}>
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-outline-variant/50 flex-shrink-0 group-hover:ring-2 ring-primary/30 transition-all"
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
              <span className="material-symbols-outlined text-[18px] text-outline hover:text-on-surface">
                expand_more
              </span>
            </div>
          </div>
        </header>

        {/* 3. MAIN PAGE CONTENT */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-screen min-w-0">
          <div className="p-3 sm:p-5 lg:p-margin-desktop space-y-4 sm:space-y-6 max-w-[1600px] mx-auto w-full min-w-0">
            {/* Breadcrumb & Top Bar Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-space-md">
              <div className="space-y-1 sm:space-y-space-xs">
                <nav className="flex items-center gap-2 font-body-sm text-xs sm:text-body-sm text-on-surface-variant">
                  <button
                    onClick={() => {
                      setActiveStageFilter('');
                      setQuickFilter(null);
                    }}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Admissions
                  </button>
                  <span>/</span>
                  <span className="text-on-surface font-semibold">Enquiries & Leads</span>
                </nav>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h1 className="font-headline-md sm:font-headline-lg text-xl sm:text-headline-lg text-on-surface font-bold tracking-tight">
                    Admissions & Enquiries
                  </h1>
                  <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-data-mono text-[10px] sm:text-label-sm font-semibold">
                    337 Active Leads
                  </span>
                </div>
                <p className="font-body-sm sm:font-body-md text-xs sm:text-body-md text-on-surface-variant max-w-2xl">
                  Track admissions pipeline, orchestrate tele-counseling, schedule offline lab demos, and fast-track student enrollments across 8 active campuses.
                </p>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsBulkWhatsAppOpen(true)}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-surface-container-lowest text-on-surface font-label-md text-xs sm:text-label-md rounded-lg shadow-sm hover:bg-surface-container flex items-center gap-1.5 transition-all cursor-pointer border border-outline-variant/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[17px] sm:text-[18px] text-secondary">chat</span>
                  <span>WhatsApp Bulk<span className="hidden sm:inline"> Follow-up</span></span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-surface-container-lowest text-on-surface font-label-md text-xs sm:text-label-md rounded-lg shadow-sm hover:bg-surface-container flex items-center gap-1.5 transition-all cursor-pointer border border-outline-variant/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[17px] sm:text-[18px] text-outline">file_download</span>
                  <span>Export<span className="hidden sm:inline"> Leads</span></span>
                </button>

                <button
                  onClick={() => setIsConversionModalOpen(true)}
                  className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-surface-container-high text-primary font-label-md text-xs sm:text-label-md font-semibold rounded-lg hover:bg-surface-container-highest flex items-center gap-1.5 transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[17px] sm:text-[18px]">how_to_reg</span>
                  <span>+ Direct Admission</span>
                </button>

                <button
                  onClick={() => setIsNewEnquiryOpen(true)}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-primary text-on-primary font-label-md text-xs sm:text-label-md font-semibold rounded-lg shadow-sm hover:bg-primary-container active:scale-[0.98] flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[17px] sm:text-[18px]">person_add</span>
                  <span>+ New Enquiry</span>
                </button>
              </div>
            </div>

            {/* INTERACTIVE PIPELINE METRICS (Chevron CRM Stages) */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
              {/* Stage 1: New Enquiries */}
              <div
                onClick={() => {
                  setActiveStageFilter(activeStageFilter === 'New Enquiries' ? '' : 'New Enquiries');
                  onShowToast('Filtered to 1. New Enquiries stage.');
                }}
                className={`rounded-xl p-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all cursor-pointer ${
                  activeStageFilter === 'New Enquiries'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-lowest'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-outline-variant"></div>
                <div className="flex items-center justify-between text-on-surface-variant mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    1. New Enquiries
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-primary">inbox</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">128</span>
                  <span className="font-data-mono text-[11px] text-secondary font-semibold">+14 today</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-[11px]">
                  <span>Uncontacted</span>
                  <span className="font-data-mono text-outline">100% Top</span>
                </div>
              </div>

              {/* Stage 2: Contacted */}
              <div
                onClick={() => {
                  setActiveStageFilter(activeStageFilter === 'Contacted' ? '' : 'Contacted');
                  onShowToast('Filtered to 2. Contacted stage.');
                }}
                className={`rounded-xl p-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all cursor-pointer ${
                  activeStageFilter === 'Contacted'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-lowest'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-fixed"></div>
                <div className="flex items-center justify-between text-on-surface-variant mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    2. Contacted
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-primary">ring_volume</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">84</span>
                  <span className="font-data-mono text-[11px] text-primary font-semibold">65.6% Conv</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-[11px]">
                  <span>In Discussion</span>
                  <span className="font-data-mono text-outline">Avg 4.2h</span>
                </div>
              </div>

              {/* Stage 3: Interested (Active Highlighted) */}
              <div
                onClick={() => {
                  setActiveStageFilter(activeStageFilter === 'Interested' ? '' : 'Interested');
                  onShowToast('Filtered to 3. Interested stage (High Intent).');
                }}
                className={`rounded-xl p-space-md shadow-sm relative overflow-hidden cursor-pointer transition-all ${
                  activeStageFilter === 'Interested'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-lowest hover:shadow-md'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
                <div className="flex items-center justify-between text-primary mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    3. Interested
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-primary">star</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">52</span>
                  <span className="font-data-mono text-[11px] text-secondary font-semibold">61.9% Conv</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-[11px]">
                  <span>High Intent</span>
                  {activeStageFilter === 'Interested' ? (
                    <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary text-[10px] font-bold">
                      Selected
                    </span>
                  ) : (
                    <span className="font-data-mono text-outline">Stage Active</span>
                  )}
                </div>
              </div>

              {/* Stage 4: Demo / Lab */}
              <div
                onClick={() => {
                  setActiveStageFilter(activeStageFilter === 'Demo / Lab' ? '' : 'Demo / Lab');
                  onShowToast('Filtered to 4. Demo / Lab evaluation stage.');
                }}
                className={`rounded-xl p-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all cursor-pointer ${
                  activeStageFilter === 'Demo / Lab'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-lowest'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed-dim"></div>
                <div className="flex items-center justify-between text-on-surface-variant mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    4. Demo / Lab
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-secondary">co_present</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">31</span>
                  <span className="font-data-mono text-[11px] text-secondary font-semibold">59.6% Conv</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-[11px]">
                  <span>Labs Scheduled</span>
                  <span className="font-data-mono text-outline">8 booked</span>
                </div>
              </div>

              {/* Stage 5: Application */}
              <div
                onClick={() => {
                  setActiveStageFilter(activeStageFilter === 'Application' ? '' : 'Application');
                  onShowToast('Filtered to 5. Application stage.');
                }}
                className={`rounded-xl p-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all cursor-pointer ${
                  activeStageFilter === 'Application'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-lowest'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary-fixed-dim"></div>
                <div className="flex items-center justify-between text-on-surface-variant mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    5. Application
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    assignment_turned_in
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">24</span>
                  <span className="font-data-mono text-[11px] text-tertiary font-semibold">77.4% Conv</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-[11px]">
                  <span>Docs Pending</span>
                  <span className="font-data-mono text-outline">KYC Check</span>
                </div>
              </div>

              {/* Stage 6: Admitted */}
              <div
                onClick={() => {
                  setActiveStageFilter(activeStageFilter === 'Admitted' ? '' : 'Admitted');
                  onShowToast('Filtered to 6. Admitted enrollments cohort.');
                }}
                className={`rounded-xl p-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all cursor-pointer ${
                  activeStageFilter === 'Admitted'
                    ? 'bg-surface-container-high ring-2 ring-primary'
                    : 'bg-surface-container-lowest'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
                <div className="flex items-center justify-between text-secondary mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    6. Admitted
                  </span>
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">18</span>
                  <span className="font-data-mono text-[11px] text-secondary font-semibold">₹4.8L Recv</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 text-on-surface-variant font-body-sm text-[11px]">
                  <span>Enrolled this week</span>
                  <span className="font-data-mono text-secondary font-bold">14.0% Net</span>
                </div>
              </div>
            </div>

            {/* FILTER CONSOLE */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search Input */}
                <div className="md:col-span-4 relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-outline">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search applicant name, phone number, enquiry ID..."
                    className="w-full h-10 pl-10 pr-4 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  )}
                </div>

                {/* Filter Selects */}
                <div className="md:col-span-8 flex flex-wrap items-center gap-2">
                  {/* Branch */}
                  <div className="flex-1 min-w-[130px]">
                    <select
                      value={branchFilter}
                      onChange={e => setBranchFilter(e.target.value)}
                      className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface focus:outline-none focus:bg-surface-container cursor-pointer border-none"
                    >
                      <option value="All Branches (8)">All Branches (8)</option>
                      <option value="Binnaguri Branch">Binnaguri Branch</option>
                      <option value="Siliguri HQ">Siliguri HQ</option>
                      <option value="Jalpaiguri Campus">Jalpaiguri Campus</option>
                      <option value="Cooch Behar">Cooch Behar</option>
                    </select>
                  </div>

                  {/* Course */}
                  <div className="flex-1 min-w-[140px]">
                    <select
                      value={courseFilter}
                      onChange={e => setCourseFilter(e.target.value)}
                      className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface focus:outline-none focus:bg-surface-container cursor-pointer border-none"
                    >
                      <option value="All Courses">All Courses</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Tally Prime & GST">Tally Prime & GST</option>
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Computer Fundamentals">Computer Fundamentals</option>
                    </select>
                  </div>

                  {/* Counsellor */}
                  <div className="flex-1 min-w-[130px]">
                    <select
                      value={counsellorFilter}
                      onChange={e => setCounsellorFilter(e.target.value)}
                      className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface focus:outline-none focus:bg-surface-container cursor-pointer border-none"
                    >
                      <option value="All Counsellors">All Counsellors</option>
                      <option value="Rahul Deb">Rahul Deb</option>
                      <option value="Ananya Sen">Ananya Sen</option>
                      <option value="Vikram Verma">Vikram Verma</option>
                    </select>
                  </div>

                  {/* Source */}
                  <div className="flex-1 min-w-[120px]">
                    <select
                      value={sourceFilter}
                      onChange={e => setSourceFilter(e.target.value)}
                      className="w-full h-10 px-3 bg-surface-container-low rounded-lg font-label-md text-label-md text-on-surface focus:outline-none focus:bg-surface-container cursor-pointer border-none"
                    >
                      <option value="All Sources">All Sources</option>
                      <option value="Website Form">Website Form</option>
                      <option value="Walk-in">Walk-in</option>
                      <option value="Facebook Ad">Facebook Ad</option>
                      <option value="JustDial">JustDial</option>
                      <option value="Reference">Reference</option>
                    </select>
                  </div>

                  {/* Date Filter Button */}
                  <button
                    onClick={() => onShowToast('Showing leads from Last 30 Days window.')}
                    className="h-10 px-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">calendar_today</span>
                    <span>Last 30 Days</span>
                  </button>
                </div>
              </div>

              {/* Quick Filter Pill Badges */}
              <div className="flex items-center gap-2 pt-2 overflow-x-auto text-body-sm text-on-surface-variant">
                <span className="font-label-sm text-label-sm uppercase font-semibold text-outline whitespace-nowrap">
                  Quick Filters:
                </span>
                <button
                  onClick={() => setQuickFilter(quickFilter === 'highPriority' ? null : 'highPriority')}
                  className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all cursor-pointer ${
                    quickFilter === 'highPriority'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  High Priority (19)
                </button>
                <button
                  onClick={() => setQuickFilter(quickFilter === 'labDemo' ? null : 'labDemo')}
                  className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all cursor-pointer ${
                    quickFilter === 'labDemo'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  Today's Lab Demos (6)
                </button>
                <button
                  onClick={() => setQuickFilter(quickFilter === 'overdue' ? null : 'overdue')}
                  className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all cursor-pointer ${
                    quickFilter === 'overdue'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  Follow-up Overdue (12)
                </button>
                <button
                  onClick={() => setQuickFilter(quickFilter === 'pendingFee' ? null : 'pendingFee')}
                  className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all cursor-pointer ${
                    quickFilter === 'pendingFee'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  Pending Fee Verification (4)
                </button>

                {(quickFilter || activeStageFilter || searchQuery || branchFilter !== 'All Branches (8)' || courseFilter !== 'All Courses') && (
                  <button
                    onClick={() => {
                      setQuickFilter(null);
                      setActiveStageFilter('');
                      setSearchQuery('');
                      setBranchFilter('All Branches (8)');
                      setCourseFilter('All Courses');
                      setCounsellorFilter('All Counsellors');
                      setSourceFilter('All Sources');
                      onShowToast('Cleared all active lead filters.');
                    }}
                    className="ml-auto text-primary text-xs font-semibold hover:underline whitespace-nowrap"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* MASTER-DETAIL GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
              {/* Left Table: 70% (8 cols in 12-col grid, or full if drawer closed) */}
              <div
                className={`${
                  isDrawerOpen ? 'xl:col-span-8' : 'xl:col-span-12'
                } bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col`}
              >
                {/* Table Header Controls */}
                <div className="p-space-md bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                      Prospective Applicants
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-data-mono text-[11px] font-bold">
                      {filteredLeads.length} Shown
                    </span>
                    {activeStageFilter && (
                      <span className="text-xs text-outline">
                        (Filtered by: <strong>{activeStageFilter}</strong>)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!isDrawerOpen && (
                      <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="px-2 py-1 text-xs text-primary font-semibold rounded bg-surface-container-lowest hover:bg-surface-container flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">dock_to_right</span>
                        <span>Show Drawer</span>
                      </button>
                    )}
                    <button
                      onClick={() => onShowToast('Table refreshed with real-time leads queue.')}
                      className="p-1.5 text-outline hover:text-on-surface rounded bg-surface-container-lowest transition-colors"
                      title="Refresh Table"
                    >
                      <span className="material-symbols-outlined text-[18px]">refresh</span>
                    </button>
                    <button
                      onClick={() => setIsCompactDensity(!isCompactDensity)}
                      className="p-1.5 text-outline hover:text-on-surface rounded bg-surface-container-lowest transition-colors"
                      title={isCompactDensity ? 'Comfortable view' : 'Compact density'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isCompactDensity ? 'view_agenda' : 'density_medium'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Mobile Cards View (Visible on screens < md) */}
                <div className="block md:hidden divide-y divide-surface-container-low p-2 sm:p-3 space-y-2.5">
                  {filteredLeads.length === 0 ? (
                    <div className="py-10 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl text-outline mb-2">
                        person_search
                      </span>
                      <p className="font-semibold text-xs">No prospective applicants match your filters.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setBranchFilter('All Branches (8)');
                          setCourseFilter('All Courses');
                          setCounsellorFilter('All Counsellors');
                          setSourceFilter('All Sources');
                          setActiveStageFilter('');
                          setQuickFilter(null);
                        }}
                        className="mt-3 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    filteredLeads.map(lead => {
                      const isSelected = selectedLead?.id === lead.id;
                      return (
                        <div
                          key={`mobile-${lead.id}`}
                          onClick={() => handleSelectLead(lead.id, lead.name)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-surface-container-high/70 border-primary/40 shadow-xs ring-1 ring-primary/20'
                              : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant/60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-9 h-9 rounded-full ${lead.avatarBg} ${lead.avatarText} flex items-center justify-center font-bold text-xs flex-shrink-0`}
                              >
                                {lead.initials}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-sm text-on-surface flex items-center gap-1.5 truncate">
                                  {lead.name}
                                  {lead.highIntent && (
                                    <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" title="High Intent Lead" />
                                  )}
                                </div>
                                <div className="text-xs text-on-surface-variant font-mono">{lead.phone}</div>
                              </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono flex-shrink-0 ${lead.statusBg} ${lead.statusText}`}>
                              {lead.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant my-2 py-2 border-y border-outline-variant/20 bg-surface-container-low/40 -mx-3.5 px-3.5">
                            <div>
                              <span className="text-[10px] text-outline block uppercase font-semibold">Course</span>
                              <span className="font-medium text-on-surface truncate block">{lead.course}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-outline block uppercase font-semibold">Campus</span>
                              <span className="font-medium text-on-surface truncate block">{lead.branch}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-outline block uppercase font-semibold">Counsellor</span>
                              <span className="font-medium text-on-surface truncate block">{lead.counsellor}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-outline block uppercase font-semibold">Source</span>
                              <span className="font-medium text-on-surface truncate block">{lead.source}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                            <div className="flex items-center gap-1">
                              <a
                                href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center"
                                title="Call"
                              >
                                <span className="material-symbols-outlined text-[17px]">call</span>
                              </a>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onShowToast(`Opening WhatsApp chat with ${lead.name}`);
                                }}
                                className="p-1.5 rounded-lg bg-secondary-container/60 hover:bg-secondary-container text-secondary flex items-center justify-center"
                                title="WhatsApp"
                              >
                                <span className="material-symbols-outlined text-[17px]">chat</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5 ml-auto">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedLeadId(lead.id);
                                  setIsConversionModalOpen(true);
                                }}
                                className="px-2.5 py-1 text-xs rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary-container"
                              >
                                Convert
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectLead(lead.id, lead.name);
                                }}
                                className="px-2.5 py-1 text-xs rounded-lg bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* High-density Data Table (Desktop / Tablet) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 px-space-md font-semibold">Applicant</th>
                        <th className="py-3 px-space-sm font-semibold">Course & Campus</th>
                        <th className="py-3 px-space-sm font-semibold">Source</th>
                        <th className="py-3 px-space-sm font-semibold">Counsellor</th>
                        <th className="py-3 px-space-sm font-semibold">Status</th>
                        <th className="py-3 px-space-sm font-semibold">Last Active</th>
                        <th className="py-3 px-space-md text-right font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-md text-body-md divide-y divide-surface-container-low">
                      {filteredLeads.map(lead => {
                        const isSelected = selectedLead?.id === lead.id;
                        return (
                          <tr
                            key={lead.id}
                            onClick={() => handleSelectLead(lead.id, lead.name)}
                            className={`transition-colors cursor-pointer group ${
                              isSelected
                                ? 'bg-surface-container-high/60 hover:bg-surface-container-high ring-1 ring-primary/20'
                                : 'hover:bg-surface-container-low'
                            }`}
                          >
                            {/* Applicant */}
                            <td className={`${isCompactDensity ? 'py-2' : 'py-3.5'} px-space-md`}>
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-9 h-9 rounded-full ${lead.avatarBg} flex items-center justify-center ${lead.avatarText} font-bold text-body-sm flex-shrink-0`}
                                >
                                  {lead.initials}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-label-lg text-label-lg font-bold text-on-surface flex items-center gap-1.5 truncate">
                                    {lead.name}
                                    {lead.highIntent && (
                                      <span
                                        className="w-2 h-2 rounded-full bg-secondary flex-shrink-0"
                                        title="High Intent Lead"
                                      ></span>
                                    )}
                                  </div>
                                  <div className="font-data-mono text-body-sm text-on-surface-variant">
                                    {lead.phone}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Course & Campus */}
                            <td className={`${isCompactDensity ? 'py-2' : 'py-3.5'} px-space-sm`}>
                              <div className="font-label-md text-label-md font-semibold text-on-surface truncate">
                                {lead.course}
                              </div>
                              <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 truncate">
                                <span className="material-symbols-outlined text-[14px] text-outline flex-shrink-0">
                                  location_on
                                </span>
                                <span>{lead.branch}</span>
                              </div>
                            </td>

                            {/* Source */}
                            <td className={`${isCompactDensity ? 'py-2' : 'py-3.5'} px-space-sm`}>
                              <span className="inline-flex items-center gap-1 font-body-sm text-body-sm text-on-surface whitespace-nowrap">
                                <span
                                  className={`material-symbols-outlined text-[16px] ${lead.sourceColor}`}
                                >
                                  {lead.sourceIcon}
                                </span>
                                <span>{lead.source}</span>
                              </span>
                            </td>

                            {/* Counsellor */}
                            <td className={`${isCompactDensity ? 'py-2' : 'py-3.5'} px-space-sm`}>
                              <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <span className="w-5 h-5 rounded-full bg-surface-container-highest text-[10px] font-bold flex items-center justify-center text-on-surface-variant">
                                  {lead.counsellorInitials}
                                </span>
                                <span className="font-body-sm text-body-sm text-on-surface">
                                  {lead.counsellor}
                                </span>
                              </div>
                            </td>

                            {/* Status */}
                            <td className={`${isCompactDensity ? 'py-2' : 'py-3.5'} px-space-sm`}>
                              <span
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${lead.statusBadgeBg} ${lead.statusBadgeText} font-label-sm text-label-sm font-bold whitespace-nowrap`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${lead.statusDotColor}`}
                                ></span>
                                <span>{lead.status}</span>
                              </span>
                            </td>

                            {/* Last Active */}
                            <td className={`${isCompactDensity ? 'py-2' : 'py-3.5'} px-space-sm`}>
                              <span
                                className={`font-data-mono text-body-sm whitespace-nowrap ${
                                  lead.lastActive.includes('mins')
                                    ? 'text-primary font-bold'
                                    : 'text-on-surface-variant'
                                }`}
                              >
                                {lead.lastActive}
                              </span>
                            </td>

                            {/* Action */}
                            <td className={`${isCompactDensity ? 'py-2' : 'py-3.5'} px-space-md text-right`}>
                              <div
                                className="flex items-center justify-end gap-1.5"
                                onClick={e => e.stopPropagation()}
                              >
                                {lead.status === 'Interested' && (
                                  <>
                                    <button
                                      onClick={() => {
                                        onShowToast(`Opening WhatsApp chat with ${lead.name} (+91 ${lead.phone.replace(/\D/g, '')})`);
                                      }}
                                      className="p-1.5 rounded-md hover:bg-surface-container-highest text-secondary transition-colors"
                                      title="WhatsApp Follow-up"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">chat</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedLeadId(lead.id);
                                        setIsConversionModalOpen(true);
                                      }}
                                      className="px-2.5 py-1 rounded-md bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-all"
                                    >
                                      Convert
                                    </button>
                                  </>
                                )}

                                {lead.status === 'Demo Scheduled' && (
                                  <>
                                    <button
                                      onClick={() => onShowToast(`Initiating tele-call to ${lead.name}...`)}
                                      className="p-1.5 rounded-md hover:bg-surface-container-high text-primary"
                                      title="Call"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">call</span>
                                    </button>
                                    <button
                                      onClick={() => handleSelectLead(lead.id, lead.name)}
                                      className="px-2.5 py-1 rounded-md bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-highest"
                                    >
                                      View
                                    </button>
                                  </>
                                )}

                                {lead.status === 'Contacted' && (
                                  <>
                                    <button
                                      onClick={() => onShowToast(`Scheduling demo session for ${lead.name}...`)}
                                      className="p-1.5 rounded-md hover:bg-surface-container-high text-primary"
                                      title="Schedule"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                                    </button>
                                    <button
                                      onClick={() => handleSelectLead(lead.id, lead.name)}
                                      className="px-2.5 py-1 rounded-md bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-highest"
                                    >
                                      View
                                    </button>
                                  </>
                                )}

                                {lead.status === 'Application' && (
                                  <button
                                    onClick={() => {
                                      setSelectedLeadId(lead.id);
                                      setIsConversionModalOpen(true);
                                    }}
                                    className="px-2.5 py-1 rounded-md bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container"
                                  >
                                    Review Docs
                                  </button>
                                )}

                                {lead.status === 'New' && (
                                  <button
                                    onClick={() => onShowToast(`Placing call to new enquiry ${lead.name}...`)}
                                    className="px-2.5 py-1 rounded-md bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold hover:bg-on-secondary-container"
                                  >
                                    Call Now
                                  </button>
                                )}

                                {lead.status === 'Admitted' && (
                                  <button
                                    onClick={() => {
                                      setSelectedLeadId(lead.id);
                                      setIsChallanPreviewOpen(true);
                                    }}
                                    className="px-2.5 py-1 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold hover:bg-secondary-fixed"
                                  >
                                    Receipt
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredLeads.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-4xl text-outline mb-2">
                              person_search
                            </span>
                            <p className="font-semibold">No prospective applicants match your filter criteria.</p>
                            <button
                              onClick={() => {
                                setSearchQuery('');
                                setBranchFilter('All Branches (8)');
                                setCourseFilter('All Courses');
                                setCounsellorFilter('All Counsellors');
                                setSourceFilter('All Sources');
                                setActiveStageFilter('');
                                setQuickFilter(null);
                              }}
                              className="mt-3 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container"
                            >
                              Reset All Filters
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-outline-variant/30">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Showing <strong className="text-on-surface font-semibold">1 to {filteredLeads.length}</strong> of{' '}
                    <strong className="text-on-surface font-semibold">337</strong> leads
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      className="px-3 py-1 rounded bg-surface-container-lowest text-outline hover:text-on-surface font-label-sm text-label-sm disabled:opacity-50"
                      disabled
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold">
                      1
                    </button>
                    <button className="px-3 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">
                      2
                    </button>
                    <button className="px-3 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">
                      3
                    </button>
                    <span className="px-2 text-outline">...</span>
                    <button className="px-3 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">
                      68
                    </button>
                    <button className="px-3 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Detail Drawer: 30% on desktop, floating sheet on mobile */}
              {isDrawerOpen && selectedLead && (
                <>
                  {/* Mobile Backdrop Overlay for Detail Drawer */}
                  <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 xl:hidden"
                    onClick={() => setIsDrawerOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="fixed inset-x-2 sm:inset-x-4 bottom-2 sm:bottom-4 z-50 max-h-[85vh] overflow-y-auto xl:static xl:inset-auto xl:z-auto xl:max-h-none xl:col-span-4 bg-surface-container-lowest rounded-2xl xl:rounded-xl shadow-2xl xl:shadow-md p-space-md space-y-space-md xl:sticky xl:top-20 border border-outline-variant/30 xl:border-outline-variant/20 animate-in slide-in-from-bottom-5 duration-200">
                  {/* Mobile Pull Handle */}
                  <div className="w-10 h-1 bg-outline-variant/60 rounded-full mx-auto mb-2 xl:hidden" />
                  {/* Drawer Top Head */}
                  <div className="flex items-start justify-between pb-space-sm bg-surface-container-low -m-space-md p-space-md mb-2 rounded-t-xl">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full ${selectedLead.avatarBg} ${selectedLead.avatarText} font-headline-sm text-headline-sm flex items-center justify-center font-bold shadow-sm flex-shrink-0`}
                      >
                        {selectedLead.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate">
                            {selectedLead.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold font-data-mono flex-shrink-0">
                            {selectedLead.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-body-sm text-on-surface-variant font-data-mono truncate">
                          <span>{selectedLead.enquiryId}</span>
                          <span>•</span>
                          <span className="text-secondary font-semibold">
                            {selectedLead.source === 'Website Form' ? 'Website Organic' : selectedLead.source}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                      type="button"
                      title="Hide Drawer"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  {/* Quick Tele-Action Bar */}
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => onShowToast(`Dialing ${selectedLead.name} (${selectedLead.phone})...`)}
                      className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest flex flex-col items-center justify-center text-primary transition-all group"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                        call
                      </span>
                      <span className="font-label-sm text-[10px] font-semibold mt-1">Call</span>
                    </button>

                    <button
                      onClick={() => onShowToast(`Opening WhatsApp template for ${selectedLead.name}...`)}
                      className="p-2 rounded-lg bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container flex flex-col items-center justify-center transition-all group"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] text-secondary group-hover:scale-110 transition-transform">
                        chat
                      </span>
                      <span className="font-label-sm text-[10px] font-semibold mt-1">WhatsApp</span>
                    </button>

                    <button
                      onClick={() => onShowToast(`Composing email to ${selectedLead.email}...`)}
                      className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest flex flex-col items-center justify-center text-primary transition-all group"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                        mail
                      </span>
                      <span className="font-label-sm text-[10px] font-semibold mt-1">Email</span>
                    </button>

                    <button
                      onClick={() => onShowToast(`Booking lab demonstration slot for ${selectedLead.name}...`)}
                      className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest flex flex-col items-center justify-center text-primary transition-all group"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                        event
                      </span>
                      <span className="font-label-sm text-[10px] font-semibold mt-1">Demo</span>
                    </button>
                  </div>

                  {/* Conversion Pipeline Tracker */}
                  <div className="bg-surface-container-low rounded-xl p-space-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-outline">
                        Direct Conversion Path
                      </span>
                      <span className="font-data-mono text-[11px] text-primary font-bold">
                        Step {selectedLead.conversionStep} of 5
                      </span>
                    </div>

                    {/* Step Progression Indicator */}
                    <div className="grid grid-cols-5 gap-1 pt-1">
                      {[1, 2, 3, 4, 5].map(step => {
                        let barBg = 'bg-outline-variant';
                        if (step < selectedLead.conversionStep) {
                          barBg = 'bg-secondary';
                        } else if (step === selectedLead.conversionStep) {
                          barBg = 'bg-primary';
                        }
                        return (
                          <div
                            key={step}
                            className={`h-1.5 rounded-full ${barBg} transition-colors`}
                            title={`Step ${step}`}
                          ></div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-label-sm text-on-surface-variant">
                      <span>Enquiry</span>
                      <span className="font-bold text-primary truncate max-w-[120px]">
                        {selectedLead.conversionStepName || 'Batch Alloc.'}
                      </span>
                      <span>Enrolled</span>
                    </div>
                  </div>

                  {/* Key Lead Attributes */}
                  <div className="space-y-space-xs text-body-sm">
                    <div className="flex items-center justify-between py-1.5 border-b border-surface-container">
                      <span className="text-on-surface-variant font-medium">Interested Course</span>
                      <span className="font-semibold text-on-surface text-right">
                        {selectedLead.courseDetail}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-surface-container">
                      <span className="text-on-surface-variant font-medium">Preferred Branch</span>
                      <span className="font-semibold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">location_on</span>
                        {selectedLead.branch}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-surface-container">
                      <span className="text-on-surface-variant font-medium">Course Fee / Budget</span>
                      <span className="font-data-mono font-bold text-secondary text-[13px]">
                        {selectedLead.budget}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-surface-container">
                      <span className="text-on-surface-variant font-medium">Assigned To</span>
                      <span className="font-semibold text-on-surface">
                        {selectedLead.counsellor} ({selectedLead.counsellorRole})
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-on-surface-variant font-medium">Next Follow-up</span>
                      <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                        {selectedLead.nextFollowUp}
                      </span>
                    </div>
                  </div>

                  {/* Communication & Telephony Log */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-label-sm text-label-sm uppercase font-semibold text-outline tracking-wider">
                        Counsellor Notes & History
                      </h4>
                      <button
                        onClick={() => setIsAddingNote(!isAddingNote)}
                        className="text-primary font-label-sm text-label-sm font-semibold hover:underline cursor-pointer"
                      >
                        {isAddingNote ? 'Cancel' : '+ Add Note'}
                      </button>
                    </div>

                    {isAddingNote && (
                      <form onSubmit={handleAddNote} className="space-y-2 p-2 bg-surface-container-low rounded-lg border border-primary/20">
                        <textarea
                          rows={2}
                          value={newNoteText}
                          onChange={e => setNewNoteText(e.target.value)}
                          placeholder="Type tele-counselling note, scholarship offer, or callback instruction..."
                          className="w-full text-xs p-2 rounded bg-surface-container-lowest border border-outline-variant/40 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <div className="flex justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setIsAddingNote(false)}
                            className="px-2 py-1 text-xs text-outline hover:text-on-surface"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-2.5 py-1 rounded bg-primary text-white text-xs font-semibold hover:bg-primary-container"
                          >
                            Save Note
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedLead.notes.map(note => (
                        <div
                          key={note.id}
                          className="bg-surface-container-low rounded-lg p-3 space-y-2 text-body-sm border border-outline-variant/30"
                        >
                          <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                            <span className="font-semibold text-on-surface">{note.author}</span>
                            <span className="font-data-mono">{note.time}</span>
                          </div>
                          <p className="text-on-surface text-body-sm leading-relaxed">{note.text}</p>
                          {note.audioLogged && (
                            <div className="flex items-center gap-2 pt-1 font-label-sm text-[11px] text-secondary font-semibold">
                              <span className="material-symbols-outlined text-[15px]">mic</span>
                              <span>{note.audioLogged}</span>
                            </div>
                          )}
                        </div>
                      ))}

                      {selectedLead.notes.length === 0 && (
                        <p className="text-xs text-outline italic py-2">No notes recorded yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Fast Admission Conversion Action Box */}
                  <div className="pt-2">
                    <button
                      onClick={() => setIsConversionModalOpen(true)}
                      className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                      <span>Convert to Direct Admission</span>
                    </button>
                  </div>

                  {/* Admission Success Confirmation Card (Live State Simulation) */}
                  <div className="bg-secondary-container/50 rounded-xl p-space-md space-y-2 border border-secondary/20">
                    <div className="flex items-center gap-2 text-on-secondary-container">
                      <span className="material-symbols-outlined text-[22px] text-secondary">verified</span>
                      <span className="font-label-lg text-label-lg font-bold">Direct Admission Ready</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-secondary-container leading-normal">
                      Enrollment preview ready for generation:{' '}
                      <strong>{selectedLead.enrollmentPreview}</strong>. Batch{' '}
                      <span className="font-semibold">{selectedLead.suggestedBatch}</span>. SMS & WhatsApp fee notification will trigger automatically.
                    </p>
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={handleCompleteConversion}
                        className="px-3 py-1.5 bg-secondary text-on-secondary rounded-lg font-label-sm text-label-sm font-bold shadow-sm hover:bg-on-secondary-container transition-all cursor-pointer"
                      >
                        Complete Onboarding
                      </button>
                      <button
                        onClick={() => setIsChallanPreviewOpen(true)}
                        className="px-3 py-1.5 bg-surface-container-lowest text-on-surface rounded-lg font-label-sm text-label-sm hover:bg-surface-container transition-all cursor-pointer"
                      >
                        Preview Fee Challan
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL 1: NEW ENQUIRY DIALOG */}
      {isNewEnquiryOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
            <div className="p-4 sm:p-5 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">person_add</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    New Prospective Student Enquiry
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Capture walk-in, inbound call, or web enquiry
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNewEnquiryOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateNewEnquiry} className="p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-on-surface">Applicant Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={newEnquiryData.name}
                    onChange={e => setNewEnquiryData({ ...newEnquiryData, name: e.target.value })}
                    className="w-full h-9 px-3 text-xs bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-on-surface">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={newEnquiryData.phone}
                    onChange={e => setNewEnquiryData({ ...newEnquiryData, phone: e.target.value })}
                    className="w-full h-9 px-3 text-xs bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-on-surface">Course Interested</label>
                  <select
                    value={newEnquiryData.course}
                    onChange={e => setNewEnquiryData({ ...newEnquiryData, course: e.target.value })}
                    className="w-full h-9 px-3 text-xs bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option>Digital Marketing</option>
                    <option>Web Development (MERN)</option>
                    <option>Tally Prime & GST</option>
                    <option>Graphic Design & UI</option>
                    <option>Computer Fundamentals</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-on-surface">Preferred Campus</label>
                  <select
                    value={newEnquiryData.branch}
                    onChange={e => setNewEnquiryData({ ...newEnquiryData, branch: e.target.value })}
                    className="w-full h-9 px-3 text-xs bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option>Binnaguri Branch</option>
                    <option>Siliguri HQ</option>
                    <option>Jalpaiguri Campus</option>
                    <option>Cooch Behar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-on-surface">Enquiry Lead Source</label>
                  <select
                    value={newEnquiryData.source}
                    onChange={e => setNewEnquiryData({ ...newEnquiryData, source: e.target.value as any })}
                    className="w-full h-9 px-3 text-xs bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option>Website Form</option>
                    <option>Walk-in</option>
                    <option>Facebook Ad</option>
                    <option>JustDial</option>
                    <option>Reference</option>
                    <option>Google Search</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-on-surface">Assign Counsellor</label>
                  <select
                    value={newEnquiryData.counsellor}
                    onChange={e => setNewEnquiryData({ ...newEnquiryData, counsellor: e.target.value })}
                    className="w-full h-9 px-3 text-xs bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option>Rahul Deb</option>
                    <option>Ananya Sen</option>
                    <option>Vikram Verma</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-on-surface">Initial Counsellor Remarks</label>
                <textarea
                  rows={2}
                  placeholder="Candidate educational background, batch preference, budget note..."
                  value={newEnquiryData.notes}
                  onChange={e => setNewEnquiryData({ ...newEnquiryData, notes: e.target.value })}
                  className="w-full p-2.5 text-xs bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="p-3 bg-secondary-container/30 rounded-xl border border-secondary/20 flex items-center justify-between text-xs">
                <span className="text-secondary font-medium">Priority Flag:</span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      checked={newEnquiryData.priority === 'HIGH PRIORITY'}
                      onChange={() => setNewEnquiryData({ ...newEnquiryData, priority: 'HIGH PRIORITY' })}
                    />
                    <span className="font-semibold text-secondary">High Priority</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      checked={newEnquiryData.priority === 'MEDIUM PRIORITY'}
                      onChange={() => setNewEnquiryData({ ...newEnquiryData, priority: 'MEDIUM PRIORITY' })}
                    />
                    <span>Standard</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsNewEnquiryOpen(false)}
                  className="px-4 py-2 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-xs"
                >
                  Save & Assign Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CONVERT TO DIRECT ADMISSION */}
      {isConversionModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-lg">rocket_launch</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    Fast-Track Direct Admission
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Generate registration number and fee challan for {selectedLead.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsConversionModalOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {/* Applicant Snapshot */}
              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-on-surface">{selectedLead.name}</div>
                  <div className="text-outline font-data-mono">{selectedLead.phone} • {selectedLead.email}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary text-white font-data-mono font-bold text-[10px]">
                  {selectedLead.enrollmentPreview}
                </span>
              </div>

              {/* Batch Allocation */}
              <div className="space-y-1.5">
                <label className="block font-bold text-on-surface">Confirm Batch & Lab Allocation</label>
                <select className="w-full h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary font-medium">
                  <option>{selectedLead.suggestedBatch} (Morning Sat-Sun 10:00 AM - 1:00 PM)</option>
                  <option>DM-WKDAY-E1 (Evening Mon-Fri 6:00 PM - 8:00 PM)</option>
                  <option>FAST-TRACK-FAST (Intensive Boot Camp)</option>
                </select>
              </div>

              {/* Course Fee Breakdown */}
              <div className="p-3.5 bg-surface-container-low rounded-xl space-y-2 border border-outline-variant/30">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Standard Program Fee</span>
                  <span className="font-data-mono font-bold text-on-surface">₹25,000</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Early Bird Scholarship (10%)</span>
                  <span className="font-data-mono font-bold">- ₹2,500</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>GST (18% Component Included)</span>
                  <span className="font-data-mono font-bold">Inclusive</span>
                </div>
                <div className="border-t border-outline-variant/30 pt-2 flex justify-between font-bold text-sm text-on-surface">
                  <span>Net Payable Amount</span>
                  <span className="text-secondary font-data-mono">₹22,500</span>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg border border-secondary bg-secondary-container/20 flex flex-col justify-between">
                  <span className="font-bold text-secondary text-[11px]">Option A: Down Payment</span>
                  <span className="font-data-mono text-sm font-bold text-on-surface mt-1">₹10,000 Now</span>
                  <span className="text-[10px] text-outline">Balance in 2 installments</span>
                </div>
                <div className="p-2.5 rounded-lg border border-outline-variant/40 bg-surface-container-low flex flex-col justify-between">
                  <span className="font-bold text-on-surface text-[11px]">Option B: Full Advance</span>
                  <span className="font-data-mono text-sm font-bold text-on-surface mt-1">₹22,500</span>
                  <span className="text-[10px] text-outline">+ Free Course Certification</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsConversionModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-outline-variant font-semibold text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCompleteConversion}
                  className="px-4 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-container shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Confirm & Issue Admission Slip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: BULK WHATSAPP FOLLOW-UP */}
      {isBulkWhatsAppOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-secondary-container text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">chat</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">
                    WhatsApp Automated Campaign
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Bulk broadcast to {filteredLeads.length} filtered candidate leads
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBulkWhatsAppOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-on-surface">Approved Message Template</label>
                <select className="w-full h-9 px-3 bg-surface-container-low rounded-lg border border-outline-variant/50 focus:outline-none focus:ring-1 focus:ring-primary font-medium">
                  <option>Weekend Lab Demo Invitation (Complimentary Pass)</option>
                  <option>10% Early Bird Scholarship Deadline Reminder</option>
                  <option>KYC Document Verification Status</option>
                  <option>New Batch Commencement Alert</option>
                </select>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl space-y-2 border border-outline-variant/30">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Live Message Preview
                </span>
                <p className="font-mono text-xs bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30 text-on-surface whitespace-pre-wrap leading-relaxed">
                  {`Hello {{Applicant_Name}}! 👋\n\nYour complimentary lab workstation at EduManage Apex Institute ({{Branch_Name}}) has been reserved for Saturday 11:00 AM.\n\nReply 'YES' to confirm your seat or call +91 98765 43210.`}
                </p>
              </div>

              <div className="p-2.5 bg-secondary-fixed/30 rounded-lg text-secondary font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-base">verified_user</span>
                <span>Meta WhatsApp Business API verified sender: Apex Institute</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsBulkWhatsAppOpen(false)}
                  className="px-4 py-2 rounded-lg border border-outline-variant font-semibold text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsBulkWhatsAppOpen(false);
                    onShowToast(`Dispatched WhatsApp follow-ups to ${filteredLeads.length} applicants.`);
                  }}
                  className="px-4 py-2 rounded-lg bg-secondary text-white font-bold hover:bg-secondary-container hover:text-on-secondary-container shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  <span>Broadcast Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: OFFICIAL FEE CHALLAN / ADMISSION SLIP PREVIEW */}
      {isChallanPreviewOpen && selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">receipt_long</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  Official Admission Challan & Fee Receipt
                </h3>
              </div>
              <button
                onClick={() => setIsChallanPreviewOpen(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-sans">
              {/* Slip Header */}
              <div className="flex items-center justify-between border-b pb-4 border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <img alt="Logo" src={BRAND_HOTLINKS.logo} className="h-8 w-auto object-contain" />
                  <div>
                    <div className="font-bold text-sm text-on-surface">Apex Institute of Technology & Skills</div>
                    <div className="text-[11px] text-outline">Affiliation Code: #INS-7429 • {selectedLead.branch}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary font-data-mono">{selectedLead.enrollmentPreview}</div>
                  <div className="text-[10px] text-outline">Date: Sept 15, 2025</div>
                </div>
              </div>

              {/* Student Details Grid */}
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-3 rounded-xl">
                <div>
                  <span className="text-outline text-[10px] uppercase block">Candidate</span>
                  <span className="font-bold text-on-surface">{selectedLead.name}</span>
                  <div className="text-[11px] text-outline">{selectedLead.phone}</div>
                </div>
                <div>
                  <span className="text-outline text-[10px] uppercase block">Program Enrolled</span>
                  <span className="font-bold text-on-surface">{selectedLead.course}</span>
                  <div className="text-[11px] text-secondary font-semibold">Batch: {selectedLead.suggestedBatch}</div>
                </div>
              </div>

              {/* Accounting Table */}
              <div className="border border-outline-variant/30 rounded-xl overflow-hidden">
                <div className="bg-surface-container-low px-3 py-1.5 font-bold flex justify-between text-on-surface">
                  <span>Particulars</span>
                  <span>Amount (INR)</span>
                </div>
                <div className="p-3 space-y-1.5 divide-y divide-outline-variant/20">
                  <div className="flex justify-between pt-1">
                    <span>Tuition & Laboratory Access Fee</span>
                    <span className="font-data-mono font-medium">₹22,000</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Course Courseware & Learning Kit</span>
                    <span className="font-data-mono font-medium">₹3,000</span>
                  </div>
                  <div className="flex justify-between pt-1 text-secondary">
                    <span>Merit Scholarship Deduction</span>
                    <span className="font-data-mono font-medium">- ₹2,500</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold text-sm text-on-surface">
                    <span>Total Settled (Tax Invoice)</span>
                    <span className="text-primary font-data-mono">₹22,500</span>
                  </div>
                </div>
              </div>

              {/* QR Verification & Stamp */}
              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl text-secondary">qr_code_2</span>
                  <div className="text-[10px] text-outline leading-tight">
                    <div>Cryptographic SHA-256 Validated</div>
                    <div className="font-data-mono">Hash: 8b4f...a91c</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-outline">Authorized Registrar</div>
                  <div className="font-bold text-xs text-on-surface mt-1">Registrar Office HQ</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  onClick={() => setIsChallanPreviewOpen(false)}
                  className="px-4 py-2 rounded-lg border border-outline-variant font-semibold text-on-surface hover:bg-surface-container"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onShowToast(`Printing official admission slip for ${selectedLead.name}...`);
                    window.print();
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-container shadow-xs flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">print</span>
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
