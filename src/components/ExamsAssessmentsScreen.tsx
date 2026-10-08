import React, { useState, useMemo } from 'react';
import { ScreenType } from '../types';
import { useSidebar } from '../context/SidebarContext';

interface ExamsAssessmentsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

interface ExamPaper {
  id: string;
  code: string;
  title: string;
  marks: number;
  durationMinutes: number;
  faculty: string;
  room: string;
}

interface ExamRecord {
  id: string;
  code: string;
  name: string;
  type: string;
  course: string;
  batch: string;
  branches: string;
  window: string;
  windowSub: string;
  enrolled: number;
  status: 'Upcoming' | 'Ongoing' | 'Draft' | 'Completed';
  passingMarks: string;
  durationMatrix: string;
  papers: ExamPaper[];
  negativeMarking: string;
  graceMarks: string;
  resultPublishDate: string;
  hallTicketStatus: string;
  hallTicketsReady: number;
  hallTicketsTotal: number;
}

const INITIAL_EXAMS: ExamRecord[] = [
  {
    id: 'exam-1',
    code: '#EXAM-2026-0042',
    name: 'Mid Term Assessment',
    type: 'Written & Practical',
    course: 'Web Development MERN',
    batch: 'Batches WD-M1 & WD-E1',
    branches: 'Siliguri HQ +1',
    window: '18 Sep – 20 Sep 2026',
    windowSub: '3 Days Window',
    enrolled: 184,
    status: 'Upcoming',
    passingMarks: '40 / 100 Marks (40%)',
    durationMatrix: '2.0 Hrs per Subject',
    negativeMarking: 'None (0.0)',
    graceMarks: 'Up to 5 marks',
    resultPublishDate: '28 Sep 2026',
    hallTicketStatus: 'Active Auto-Issuance',
    hallTicketsReady: 184,
    hallTicketsTotal: 184,
    papers: [
      {
        id: 'p1',
        code: 'P1',
        title: 'HTML5, Modern CSS & Tailwind',
        marks: 100,
        durationMinutes: 120,
        faculty: 'Amit Sharma',
        room: 'Lab 204',
      },
      {
        id: 'p2',
        code: 'P2',
        title: 'JavaScript ES6+ & DOM Architecture',
        marks: 100,
        durationMinutes: 120,
        faculty: 'Rahul Das',
        room: 'Lab 204',
      },
      {
        id: 'p3',
        code: 'P3',
        title: 'Practical Full Stack Build',
        marks: 50,
        durationMinutes: 90,
        faculty: 'Amit Sharma',
        room: 'Mac Pods',
      },
    ],
  },
  {
    id: 'exam-2',
    code: '#EXAM-2026-0038',
    name: 'Monthly Code Sprint',
    type: 'Lab Assessment',
    course: 'Full Stack Dev Bootcamp',
    batch: 'All Batch Sections',
    branches: 'All Branches (8)',
    window: 'Today, 10:00 – 16:00',
    windowSub: 'Session Live',
    enrolled: 312,
    status: 'Ongoing',
    passingMarks: '50 / 100 Marks (50%)',
    durationMatrix: '3.0 Hrs Sprint',
    negativeMarking: 'None (0.0)',
    graceMarks: 'Up to 3 marks',
    resultPublishDate: 'Today, 18:00',
    hallTicketStatus: 'Live Checked-in',
    hallTicketsReady: 312,
    hallTicketsTotal: 312,
    papers: [
      {
        id: 'p2-1',
        code: 'P1',
        title: 'Real-time API Architecture & Express',
        marks: 100,
        durationMinutes: 180,
        faculty: 'Amit Sharma',
        room: 'Labs 101-108',
      },
    ],
  },
  {
    id: 'exam-3',
    code: '#EXAM-2026-0031',
    name: 'Tally ERP & GST Practical',
    type: 'Practical & Viva',
    course: 'Accounting & Tally Prime',
    batch: 'Batch ACC-Weekend',
    branches: 'Jalpaiguri Campus',
    window: '22 Sep 2026',
    windowSub: '10:00 – 13:00',
    enrolled: 94,
    status: 'Upcoming',
    passingMarks: '35 / 100 Marks (35%)',
    durationMatrix: '3.0 Hrs Practical',
    negativeMarking: 'None (0.0)',
    graceMarks: 'Up to 5 marks',
    resultPublishDate: '30 Sep 2026',
    hallTicketStatus: 'Generated & Dispatched',
    hallTicketsReady: 94,
    hallTicketsTotal: 94,
    papers: [
      {
        id: 'p3-1',
        code: 'P1',
        title: 'Tally Prime Vouchers & Invoicing',
        marks: 70,
        durationMinutes: 120,
        faculty: 'Priya Sen',
        room: 'Commerce Lab 1',
      },
      {
        id: 'p3-2',
        code: 'P2',
        title: 'GST E-filing Viva Voce',
        marks: 30,
        durationMinutes: 60,
        faculty: 'Priya Sen',
        room: 'Seminar Hall B',
      },
    ],
  },
  {
    id: 'exam-4',
    code: '#EXAM-2026-0029',
    name: 'Digital Marketing Mock Exam',
    type: 'MCQ Speed Test',
    course: 'Digital Marketing Pro',
    batch: 'Batch DM-2026-A',
    branches: 'Siliguri HQ',
    window: '25 Sep 2026',
    windowSub: '14:00 – 15:30',
    enrolled: 68,
    status: 'Draft',
    passingMarks: '40 / 100 Marks (40%)',
    durationMatrix: '1.5 Hrs MCQ',
    negativeMarking: '0.25 per wrong',
    graceMarks: 'None',
    resultPublishDate: '26 Sep 2026',
    hallTicketStatus: 'Pending Verification',
    hallTicketsReady: 0,
    hallTicketsTotal: 68,
    papers: [
      {
        id: 'p4-1',
        code: 'P1',
        title: 'SEO, SEM & Meta Ads Algorithmic Exam',
        marks: 100,
        durationMinutes: 90,
        faculty: 'Rohit Verma',
        room: 'Online Portal 2',
      },
    ],
  },
  {
    id: 'exam-5',
    code: '#EXAM-2026-0022',
    name: 'UI/UX Design Capstone',
    type: 'Portfolio Defense',
    course: 'UI/UX Product Design',
    batch: 'Batch UX-Elite-Q2',
    branches: 'All Branches (8)',
    window: '10 Sep 2026',
    windowSub: 'Evaluation Concluded',
    enrolled: 112,
    status: 'Completed',
    passingMarks: '60 / 100 Marks (60%)',
    durationMatrix: 'Defense Session',
    negativeMarking: 'None',
    graceMarks: 'None',
    resultPublishDate: '12 Sep 2026 (Published)',
    hallTicketStatus: 'Archived',
    hallTicketsReady: 112,
    hallTicketsTotal: 112,
    papers: [
      {
        id: 'p5-1',
        code: 'P1',
        title: 'Figma Design System & Usability Defense',
        marks: 100,
        durationMinutes: 45,
        faculty: 'Ananya Bose',
        room: 'Auditorium 1',
      },
    ],
  },
];

export const ExamsAssessmentsScreen: React.FC<ExamsAssessmentsScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  // Navigation sub-tab
  const [activeTab, setActiveTab] = useState<'exams' | 'subjects' | 'schedules' | 'question_bank'>('exams');

  // Filters
  const [selectedBranch, setSelectedBranch] = useState<string>('All Branches');
  const [selectedCourse, setSelectedCourse] = useState<string>('All Courses');
  const [selectedBatch, setSelectedBatch] = useState<string>('All Batches');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // Selected Exam for Right Drawer
  const [exams, setExams] = useState<ExamRecord[]>(INITIAL_EXAMS);
  const [selectedExamId, setSelectedExamId] = useState<string>('exam-1');
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState<boolean>(true);

  // Modals state
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState<boolean>(false);
  const [isAddPaperModalOpen, setIsAddPaperModalOpen] = useState<boolean>(false);
  const [isLiveMonitorModalOpen, setIsLiveMonitorModalOpen] = useState<boolean>(false);
  const [isHallTicketModalOpen, setIsHallTicketModalOpen] = useState<boolean>(false);

  // New Exam Form State
  const [newExamName, setNewExamName] = useState('');
  const [newExamCourse, setNewExamCourse] = useState('Web Development MERN');
  const [newExamType, setNewExamType] = useState('Written & Practical');
  const [newExamWindow, setNewExamWindow] = useState('28 Sep – 30 Sep 2026');
  const [newExamBranches, setNewExamBranches] = useState('Siliguri HQ & Kolkata');
  const [newExamEnrolled, setNewExamEnrolled] = useState(48);

  // New Paper Form State
  const [newPaperTitle, setNewPaperTitle] = useState('');
  const [newPaperMarks, setNewPaperMarks] = useState(100);
  const [newPaperDuration, setNewPaperDuration] = useState(120);
  const [newPaperFaculty, setNewPaperFaculty] = useState('Amit Sharma');
  const [newPaperRoom, setNewPaperRoom] = useState('Lab 204');

  const selectedExam = useMemo(() => {
    return exams.find((e) => e.id === selectedExamId) || exams[0];
  }, [exams, selectedExamId]);

  // Filtered list
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchSearch =
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.batch.toLowerCase().includes(searchQuery.toLowerCase());

      const matchBranch =
        selectedBranch === 'All Branches' || exam.branches.includes(selectedBranch);

      const matchCourse =
        selectedCourse === 'All Courses' || exam.course.includes(selectedCourse);

      const matchStatus =
        selectedStatus === 'All Statuses' || exam.status === selectedStatus;

      return matchSearch && matchBranch && matchCourse && matchStatus;
    });
  }, [exams, searchQuery, selectedBranch, selectedCourse, selectedStatus]);

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamName.trim()) {
      onShowToast('Please specify an examination title.');
      return;
    }

    const created: ExamRecord = {
      id: `exam-${Date.now()}`,
      code: `#EXAM-2026-00${Math.floor(Math.random() * 80 + 50)}`,
      name: newExamName,
      type: newExamType,
      course: newExamCourse,
      batch: 'Batch Alpha-AY26',
      branches: newExamBranches,
      window: newExamWindow,
      windowSub: 'Scheduled Window',
      enrolled: Number(newExamEnrolled) || 30,
      status: 'Upcoming',
      passingMarks: '40 / 100 Marks (40%)',
      durationMatrix: '2.0 Hrs per Subject',
      negativeMarking: 'None (0.0)',
      graceMarks: 'Up to 5 marks',
      resultPublishDate: '05 Oct 2026',
      hallTicketStatus: 'Queued for Generation',
      hallTicketsReady: Number(newExamEnrolled) || 30,
      hallTicketsTotal: Number(newExamEnrolled) || 30,
      papers: [
        {
          id: `p-${Date.now()}`,
          code: 'P1',
          title: `${newExamName} Theory & Architecture`,
          marks: 100,
          durationMinutes: 120,
          faculty: 'Amit Sharma',
          room: 'Main Academic Block',
        },
      ],
    };

    setExams([created, ...exams]);
    setSelectedExamId(created.id);
    setIsCreateExamModalOpen(false);
    setNewExamName('');
    onShowToast(`Created exam "${created.name}" (${created.code}) successfully!`);
  };

  const handleAddPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaperTitle.trim()) {
      onShowToast('Paper title cannot be blank.');
      return;
    }

    const paper: ExamPaper = {
      id: `p-${Date.now()}`,
      code: `P${selectedExam.papers.length + 1}`,
      title: newPaperTitle,
      marks: Number(newPaperMarks) || 100,
      durationMinutes: Number(newPaperDuration) || 120,
      faculty: newPaperFaculty,
      room: newPaperRoom,
    };

    setExams((prev) =>
      prev.map((ex) =>
        ex.id === selectedExam.id
          ? { ...ex, papers: [...ex.papers, paper] }
          : ex
      )
    );

    setIsAddPaperModalOpen(false);
    setNewPaperTitle('');
    onShowToast(`Added Paper ${paper.code}: "${paper.title}" to ${selectedExam.code}`);
  };

  const handlePublishExam = () => {
    onShowToast(`Published "${selectedExam.name}" and sent WhatsApp/SMS hall ticket notifications to ${selectedExam.enrolled} candidates!`);
  };

  const handleExportSchedule = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Code,Exam Name,Course,Branches,Window,Enrolled,Status\n' +
      exams
        .map(
          (e) =>
            `"${e.code}","${e.name}","${e.course}","${e.branches}","${e.window}",${e.enrolled},"${e.status}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Master_Exam_Schedule_AY2025-26.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Exported Master Examination Schedule (CSV)!');
  };

  const handleDownloadBulkHallTickets = () => {
    onShowToast(`Downloaded ${selectedExam.hallTicketsReady} Hall Tickets PDF Package with cryptographically secured QR codes!`);
  };

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex">
      {/* ========================================================================= */}
      {/* 1. FIXED LEFT NAVIGATION SIDEBAR (w-64) */}
      {/* ========================================================================= */}
      {/* Mobile backdrop overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-12 bottom-0 w-64 bg-surface-container-lowest shadow-lg lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out border-r border-outline-variant/30 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Institution Header */}
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

            {/* ACADEMICS (ACTIVE TAB AS SHOWN IN SCREENSHOT) */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => setActiveTab('exams')}
                className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg transition-all bg-primary-container text-on-primary font-semibold shadow-[0_1px_3px_rgba(37,99,235,0.2)] text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                <span className="font-body-md text-body-md">Academics</span>
              </button>

              {/* Sub-links for Academics */}
              <div className="pl-7 pr-2 py-1 flex flex-col gap-1 border-l-2 border-primary ml-4 mt-0.5">
                <button
                  onClick={() => setActiveTab('exams')}
                  className="text-xs text-primary font-semibold py-0.5 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Exams &amp; Assessments</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                </button>
                <button
                  onClick={() => onNavigate('marks-entry')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium cursor-pointer"
                >
                  Marks Entry Console
                </button>
                <button
                  onClick={() => onNavigate('results-transcripts')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium cursor-pointer"
                >
                  Results &amp; Report Cards
                </button>
                <button
                  onClick={() => onNavigate('courses-batches')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium cursor-pointer"
                >
                  Courses &amp; Batches
                </button>
              </div>
            </div>

            <button
              onClick={() => onShowToast('Attendance ledger active across 8 campus branches.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span className="font-body-md text-body-md">Attendance</span>
            </button>

            <button
              onClick={() => onShowToast('Finance, Fee invoicing & Reconciliation console active.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span className="font-body-md text-body-md">Fees &amp; Finance</span>
            </button>

            <button
              onClick={() => onNavigate('certificates')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
              <span className="font-body-md text-body-md">Certificates</span>
            </button>

            <button
              onClick={() => onShowToast('Broadcast SMS & Parent WhatsApp gateway')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">forum</span>
              <span className="font-body-md text-body-md">Communication</span>
            </button>

            <button
              onClick={() => onShowToast('Campus network and center configuration')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">hub</span>
              <span className="font-body-md text-body-md">Branches &amp; Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-space-md bg-surface-container-low border-t border-outline-variant/30">
          <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_1px_4px_rgba(0,0,0,0.04)] mb-space-sm flex flex-col gap-1">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">
                Apex Tech Institute
              </span>
            </div>
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm">Branch HQ Network</span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded font-medium">
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
            <span className="font-label-sm text-label-sm text-outline">v2.4.8</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE CONTAINER (pl-0 lg:pl-64) */}
      {/* ========================================================================= */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'pl-0 lg:pl-64' : 'pl-0'
      }`}>
        {/* Top Responsive App Bar (Sticky below global navigation) */}
        <header className="sticky top-12 z-30 h-14 sm:h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-4 sm:px-gutter-desktop flex items-center justify-between gap-space-md border-b border-outline-variant/20 transition-all duration-300 ease-in-out">
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
              alt="EduManage Logo"
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida/AEtjO1U-QhXESZEr_12u3oOW5wW6fVviAeAnkqC1YVMGXeEyDfiGfPHbkLv6gWOnkG7NCoQAvoMRvaD0VROU-wSN3jk9aE8NgN293_R6RLzmwi8pqgkH1wOL9xza5gs9BYtbTZgBkeAsNR4X76D1FOVvi4MLsvpeFcoX9epNVK5yx47Riyg60tGb6b9IPb-XWADgLIvIiAefmbdsx0P-4DOQL-MvN6hAVyB5f3uk0YcVmbGkecLG3pgNgtWkBqM"
            />
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface hidden lg:inline">
              EduManage
            </span>

            {/* Branch Selector */}
            <div
              onClick={() => onShowToast('All 8 Branch Nodes active for assessments.')}
              className="relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-outline text-[18px] mr-1">domain</span>
              <span className="font-label-md text-label-md text-on-surface font-medium">
                All Branches (8 Active)
              </span>
              <span className="material-symbols-outlined text-outline text-[16px] ml-1">expand_more</span>
            </div>

            {/* Academic Year Badge */}
            <div className="bg-secondary-fixed-dim/40 text-on-secondary-fixed-variant px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm font-semibold tracking-wide">AY 2025-26</span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-space-md">
            <div className="relative hidden md:flex items-center bg-surface-container-low rounded-lg px-space-md py-1.5 w-64 border border-outline-variant/20">
              <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
              <input
                className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-full"
                placeholder="Search students, modules..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded font-mono shadow-xs">
                ⌘K
              </span>
            </div>

            <button
              onClick={() => onShowToast('3 Examination reports ready for administrative sign-off.')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold">
                3
              </span>
            </button>

            <button
              onClick={() => onShowToast('Exams & Assessments Guide & Regulatory Syllabus Rules')}
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">help</span>
            </button>

            <div className="flex items-center gap-space-sm pl-space-xs">
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

        {/* ========================================================================= */}
        {/* 3. MAIN ACADEMICS EXAMS PAGE CONTENT */}
        {/* ========================================================================= */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-screen">
          <div className="flex flex-col w-full">
            {/* Ambient decorative glow */}
            <div className="relative w-full">
              <div className="absolute -top-10 left-1/3 w-96 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
              <div className="absolute top-24 right-10 w-72 h-40 bg-secondary/5 rounded-full blur-2xl pointer-events-none -z-10"></div>

              {/* Header & Action Ribbon */}
              <div className="px-margin-desktop py-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div>
                  <nav className="flex items-center gap-space-xs text-on-surface-variant font-body-sm mb-1">
                    <span
                      onClick={() => onNavigate('courses-batches')}
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Academics
                    </span>
                    <span className="text-outline/40">/</span>
                    <span className="font-semibold text-on-surface">Exams &amp; Assessments</span>
                  </nav>
                  <div className="flex items-baseline gap-space-sm">
                    <h1 className="font-display text-display text-on-surface tracking-tight font-bold">
                      Exams &amp; Assessments
                    </h1>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                      AY 2025–26
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                    Create examinations, manage subjects and organize assessment schedules across 8 campuses.
                  </p>
                </div>

                {/* Action Group */}
                <div className="flex items-center flex-wrap gap-space-sm self-start md:self-auto">
                  <button
                    onClick={() => setActiveTab('question_bank')}
                    className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-lg text-label-lg shadow-xs cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-tertiary">quiz</span>
                    <span>Question Bank</span>
                  </button>

                  <button
                    onClick={handleExportSchedule}
                    className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors font-label-lg text-label-lg shadow-xs cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">calendar_month</span>
                    <span>Export Master Schedule</span>
                  </button>

                  <button
                    onClick={() => setIsCreateExamModalOpen(true)}
                    className="flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-all active:scale-[0.98] shadow-[0_2px_8px_rgba(37,99,235,0.25)] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>Create Exam</span>
                  </button>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* Summary KPI Row (4 Cards) */}
              {/* ========================================================================= */}
              <div className="px-margin-desktop grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop mb-space-lg">
                {/* KPI 1: Upcoming Exams */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                      Upcoming Exams
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed/60 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">event_upcoming</span>
                    </div>
                  </div>
                  <div className="mt-space-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display font-bold text-on-surface">8</span>
                      <span className="font-label-sm text-label-sm font-semibold text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span> +2 scheduled
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Active in next 14 calendar days
                    </p>
                  </div>
                  <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
                  </div>
                </div>

                {/* KPI 2: Active / Ongoing */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                      Active / Ongoing
                    </span>
                    <div className="relative w-8 h-8 rounded-lg bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[20px]">sensors</span>
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                    </div>
                  </div>
                  <div className="mt-space-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display font-bold text-on-surface">3</span>
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                        Live
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Session monitoring across 12 labs
                    </p>
                  </div>
                  <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '38%' }}></div>
                  </div>
                </div>

                {/* KPI 3: Completed */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                      Completed
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">task_alt</span>
                    </div>
                  </div>
                  <div className="mt-space-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display font-bold text-on-surface">42</span>
                      <span className="font-label-sm text-label-sm text-outline">Assessments</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Session 2025–26 verified archive
                    </p>
                  </div>
                  <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-outline h-full rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* KPI 4: Students Registered */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                      Students Registered
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-tertiary-fixed/60 flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-[20px]">badge</span>
                    </div>
                  </div>
                  <div className="mt-space-sm">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-display font-bold text-on-surface">8,420</span>
                      <span className="font-label-sm text-label-sm font-semibold text-tertiary">98.4%</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Institutional examination enrollment
                    </p>
                  </div>
                  <div className="w-full bg-surface-container-low h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full transition-all duration-500" style={{ width: '98.4%' }}></div>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* Navigation Tabs */}
              {/* ========================================================================= */}
              <div className="px-margin-desktop mb-space-md">
                <div className="flex items-center gap-space-sm overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveTab('exams')}
                    className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
                      activeTab === 'exams'
                        ? 'bg-primary-container text-on-primary shadow-xs font-semibold'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">assignment</span>
                    <span>Exams</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-label-sm font-bold ${
                        activeTab === 'exams'
                          ? 'bg-on-primary text-primary'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {exams.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('subjects')}
                    className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
                      activeTab === 'subjects'
                        ? 'bg-primary-container text-on-primary shadow-xs font-semibold'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">library_books</span>
                    <span>Subjects &amp; Papers</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm font-semibold">
                      34
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('schedules')}
                    className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
                      activeTab === 'schedules'
                        ? 'bg-primary-container text-on-primary shadow-xs font-semibold'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
                    <span>Exam Schedule &amp; Hall Tickets</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('question_bank')}
                    className={`flex items-center gap-2 px-space-md py-2.5 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
                      activeTab === 'question_bank'
                        ? 'bg-primary-container text-on-primary shadow-xs font-semibold'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                    <span>Question Bank Matrix</span>
                  </button>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* Filter Control Bar */}
              {/* ========================================================================= */}
              <div className="px-margin-desktop mb-space-lg">
                <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-space-sm border border-outline-variant/20">
                  <div className="flex flex-wrap items-center gap-space-xs">
                    {/* Branch Selector */}
                    <div className="relative">
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        aria-label="Filter by Branch"
                        className="appearance-none bg-surface-container-low rounded-lg pl-8 pr-7 py-1.5 text-on-surface font-label-md text-label-md font-medium cursor-pointer hover:bg-surface-container transition-colors focus:outline-none border border-outline-variant/10"
                      >
                        <option value="All Branches">All Branches (8)</option>
                        <option value="Siliguri">Siliguri HQ</option>
                        <option value="Kolkata">Kolkata Campus</option>
                        <option value="Jalpaiguri">Jalpaiguri Campus</option>
                        <option value="Binnaguri">Binnaguri Campus</option>
                      </select>
                      <span className="material-symbols-outlined text-[18px] text-outline absolute left-2 top-1.5 pointer-events-none">
                        storefront
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-outline absolute right-1.5 top-2 pointer-events-none">
                        arrow_drop_down
                      </span>
                    </div>

                    {/* Course Selector */}
                    <div className="relative">
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        aria-label="Filter by Course"
                        className="appearance-none bg-surface-container-low rounded-lg pl-8 pr-7 py-1.5 text-on-surface font-label-md text-label-md font-medium cursor-pointer hover:bg-surface-container transition-colors focus:outline-none border border-outline-variant/10"
                      >
                        <option value="All Courses">All Courses</option>
                        <option value="Web Development">Full Stack Web Dev</option>
                        <option value="Accounting">Accounting &amp; Tally</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="UI/UX">UI/UX Design</option>
                      </select>
                      <span className="material-symbols-outlined text-[18px] text-outline absolute left-2 top-1.5 pointer-events-none">
                        school
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-outline absolute right-1.5 top-2 pointer-events-none">
                        arrow_drop_down
                      </span>
                    </div>

                    {/* Batch Selector */}
                    <div className="relative">
                      <select
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        aria-label="Filter by Batch"
                        className="appearance-none bg-surface-container-low rounded-lg pl-8 pr-7 py-1.5 text-on-surface font-label-md text-label-md font-medium cursor-pointer hover:bg-surface-container transition-colors focus:outline-none border border-outline-variant/10"
                      >
                        <option value="All Batches">All Batches</option>
                        <option value="Morning">Morning Batches</option>
                        <option value="Evening">Evening Batches</option>
                        <option value="Weekend">Weekend Batches</option>
                      </select>
                      <span className="material-symbols-outlined text-[18px] text-outline absolute left-2 top-1.5 pointer-events-none">
                        groups
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-outline absolute right-1.5 top-2 pointer-events-none">
                        arrow_drop_down
                      </span>
                    </div>

                    {/* Status Selector */}
                    <div className="relative">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        aria-label="Filter by Status"
                        className="appearance-none bg-surface-container-low rounded-lg pl-8 pr-7 py-1.5 text-on-surface font-label-md text-label-md font-medium cursor-pointer hover:bg-surface-container transition-colors focus:outline-none border border-outline-variant/10"
                      >
                        <option value="All Statuses">All Statuses</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ongoing">Ongoing (Live)</option>
                        <option value="Draft">Draft</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <span className="material-symbols-outlined text-[18px] text-outline absolute left-2 top-1.5 pointer-events-none">
                        tune
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-outline absolute right-1.5 top-2 pointer-events-none">
                        arrow_drop_down
                      </span>
                    </div>

                    <div className="h-6 w-px bg-surface-container-high hidden md:block mx-1"></div>

                    {/* Academic Session Badge */}
                    <div className="flex items-center gap-1.5 px-space-sm py-1 rounded bg-secondary-fixed-dim/30 text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      <span>AY 2025–26</span>
                    </div>
                  </div>

                  {/* Search Input with Keyboard Indicator */}
                  <div className="relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-1.5 w-full sm:w-72 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-[18px] text-outline mr-2">search</span>
                    <input
                      className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-full"
                      placeholder="Search exam name, code or course..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded shadow-xs font-mono">
                      /
                    </span>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* Main Asymmetric Workspace Layout (8 cols + 4 cols) */}
              {/* ========================================================================= */}
              <div className="px-margin-desktop grid grid-cols-1 xl:grid-cols-12 gap-gutter-desktop items-start pb-margin-desktop">
                {/* LEFT COLUMN: Master Exams Table (8 cols / ~66%) */}
                <div className={`${isDetailDrawerOpen ? 'xl:col-span-8' : 'xl:col-span-12'} flex flex-col gap-space-md transition-all duration-300`}>
                  <div className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden border border-outline-variant/20">
                    <div className="p-space-md flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/20">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                          Registered Examinations
                        </span>
                        <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-medium">
                          Showing {filteredExams.length} of {exams.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onShowToast('Table columns customized to standard AICTE/CBSE format.')}
                          className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant cursor-pointer transition-colors"
                          title="Filter columns"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">view_column</span>
                        </button>
                        <button
                          onClick={() => onShowToast('Refreshed exam timetable records.')}
                          className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant cursor-pointer transition-colors"
                          title="Refresh records"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">refresh</span>
                        </button>
                      </div>
                    </div>

                    {/* Master Table Container */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/20">
                            <th className="py-3 px-space-md font-semibold">Exam Name &amp; Code</th>
                            <th className="py-3 px-space-sm font-semibold">Type</th>
                            <th className="py-3 px-space-sm font-semibold">Course &amp; Class</th>
                            <th className="py-3 px-space-sm font-semibold">Branches</th>
                            <th className="py-3 px-space-sm font-semibold">Window</th>
                            <th className="py-3 px-space-sm font-semibold text-center">Enrolled</th>
                            <th className="py-3 px-space-sm font-semibold">Status</th>
                            <th className="py-3 px-space-md font-semibold text-right">Actions</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-surface-container text-body-md font-body-md">
                          {filteredExams.map((exam) => {
                            const isSelected = selectedExamId === exam.id;

                            return (
                              <tr
                                key={exam.id}
                                onClick={() => {
                                  setSelectedExamId(exam.id);
                                  setIsDetailDrawerOpen(true);
                                }}
                                className={`transition-colors cursor-pointer group ${
                                  isSelected
                                    ? 'bg-primary/5 hover:bg-primary/10'
                                    : 'hover:bg-surface-container-low/70'
                                }`}
                              >
                                {/* Exam Name & Code */}
                                <td className="py-3.5 px-space-md">
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        exam.status === 'Ongoing'
                                          ? 'bg-secondary animate-pulse ring-2 ring-secondary/30'
                                          : exam.status === 'Upcoming'
                                          ? 'bg-primary ring-2 ring-primary/20'
                                          : exam.status === 'Completed'
                                          ? 'bg-outline/30'
                                          : 'bg-outline/40'
                                      }`}
                                    ></div>
                                    <div>
                                      <div
                                        className={`font-headline-sm text-headline-sm font-semibold ${
                                          isSelected ? 'text-primary' : 'text-on-surface'
                                        } group-hover:text-primary transition-colors`}
                                      >
                                        {exam.name}
                                      </div>
                                      <div className="font-data-mono text-data-mono text-outline">
                                        {exam.code}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                {/* Type */}
                                <td className="py-3.5 px-space-sm">
                                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant whitespace-nowrap font-medium">
                                    {exam.type}
                                  </span>
                                </td>

                                {/* Course & Class */}
                                <td className="py-3.5 px-space-sm">
                                  <div className="text-on-surface font-medium whitespace-nowrap">
                                    {exam.course}
                                  </div>
                                  <div className="font-body-sm text-body-sm text-outline">
                                    {exam.batch}
                                  </div>
                                </td>

                                {/* Branches */}
                                <td className="py-3.5 px-space-sm whitespace-nowrap">
                                  <div className="flex items-center gap-1 text-on-surface">
                                    <span className="material-symbols-outlined text-[16px] text-outline">
                                      {exam.branches.includes('All') ? 'domain' : 'location_on'}
                                    </span>
                                    <span>{exam.branches}</span>
                                  </div>
                                </td>

                                {/* Window */}
                                <td className="py-3.5 px-space-sm whitespace-nowrap">
                                  <div className="font-body-sm text-body-sm text-on-surface font-medium">
                                    {exam.window}
                                  </div>
                                  <div
                                    className={`font-data-mono text-data-mono ${
                                      exam.status === 'Ongoing'
                                        ? 'text-secondary font-semibold'
                                        : 'text-outline'
                                    }`}
                                  >
                                    {exam.windowSub}
                                  </div>
                                </td>

                                {/* Enrolled */}
                                <td className="py-3.5 px-space-sm text-center">
                                  <span className="font-data-mono text-data-mono font-semibold text-on-surface bg-surface-container px-2 py-0.5 rounded">
                                    {exam.enrolled}
                                  </span>
                                </td>

                                {/* Status */}
                                <td className="py-3.5 px-space-sm whitespace-nowrap">
                                  {exam.status === 'Upcoming' && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Upcoming
                                    </span>
                                  )}
                                  {exam.status === 'Ongoing' && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span> Ongoing
                                    </span>
                                  )}
                                  {exam.status === 'Draft' && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Draft
                                    </span>
                                  )}
                                  {exam.status === 'Completed' && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-outline font-label-sm text-label-sm font-semibold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Completed
                                    </span>
                                  )}
                                </td>

                                {/* Actions */}
                                <td className="py-3.5 px-space-md text-right whitespace-nowrap">
                                  <div
                                    className="flex items-center justify-end gap-1"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {exam.status === 'Ongoing' ? (
                                      <button
                                        onClick={() => setIsLiveMonitorModalOpen(true)}
                                        className="px-2 py-1 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold hover:bg-secondary/20 transition-colors cursor-pointer"
                                        type="button"
                                      >
                                        Live Monitor
                                      </button>
                                    ) : exam.status === 'Completed' ? (
                                      <button
                                        onClick={() => onShowToast(`Displaying grade distribution for ${exam.name}`)}
                                        className="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                                        title="View Grades"
                                        type="button"
                                      >
                                        <span className="material-symbols-outlined text-[18px]">insights</span>
                                      </button>
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => onNavigate('marks-entry')}
                                          className="p-1 rounded text-secondary hover:bg-secondary-fixed/40 transition-colors cursor-pointer"
                                          title="Enter &amp; Verify Marks"
                                          type="button"
                                        >
                                          <span className="material-symbols-outlined text-[18px]">grade</span>
                                        </button>
                                        <button
                                          onClick={() => {
                                            setSelectedExamId(exam.id);
                                            setIsAddPaperModalOpen(true);
                                          }}
                                          className="p-1 rounded text-primary hover:bg-primary-fixed/40 transition-colors cursor-pointer"
                                          title="Manage Subjects"
                                          type="button"
                                        >
                                          <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                        </button>
                                        <button
                                          onClick={() => {
                                            setSelectedExamId(exam.id);
                                            setIsHallTicketModalOpen(true);
                                          }}
                                          className="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                                          title="Print Hall Tickets"
                                          type="button"
                                        >
                                          <span className="material-symbols-outlined text-[18px]">print</span>
                                        </button>
                                      </>
                                    )}

                                    <button
                                      onClick={() => onShowToast(`Options menu for ${exam.code}`)}
                                      className="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                                      title="Exam Options"
                                      type="button"
                                    >
                                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Footer Pagination & Summary */}
                    <div className="p-space-md bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm text-body-sm border-t border-outline-variant/20">
                      <div className="text-on-surface-variant">
                        Showing <span className="font-semibold text-on-surface">1</span> to{' '}
                        <span className="font-semibold text-on-surface">{filteredExams.length}</span> of{' '}
                        <span className="font-semibold text-on-surface">{exams.length}</span> total examinations
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          className="px-2.5 py-1 rounded bg-surface-container-lowest text-outline hover:bg-surface-container transition-colors disabled:opacity-50 cursor-pointer border border-outline-variant/20"
                          disabled
                          type="button"
                        >
                          Previous
                        </button>
                        <button
                          className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-semibold shadow-xs"
                          type="button"
                        >
                          1
                        </button>
                        <button
                          onClick={() => onShowToast('Viewing examination ledger page 2')}
                          className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
                          type="button"
                        >
                          2
                        </button>
                        <button
                          onClick={() => onShowToast('Viewing examination ledger page 3')}
                          className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
                          type="button"
                        >
                          3
                        </button>
                        <button
                          onClick={() => onShowToast('Viewing next page')}
                          className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
                          type="button"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Inline Visual: Assessment Timetable Heatmap Bar */}
                  <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-outline-variant/20">
                    <div className="flex items-center justify-between mb-space-sm">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">calendar_view_week</span>
                        <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Lab Allocation Load Matrix
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline">18 Sep – 24 Sep Week Window</span>
                    </div>

                    <div className="grid grid-cols-7 gap-2 pt-2">
                      <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
                        <span className="font-label-sm text-label-sm text-outline">FRI 18</span>
                        <div className="w-full bg-surface-container-high h-12 rounded mt-1 relative flex items-end overflow-hidden">
                          <div className="w-full bg-primary rounded-b h-[75%]"></div>
                        </div>
                        <span className="font-data-mono text-label-sm text-on-surface mt-1 font-semibold">6 Labs</span>
                      </div>

                      <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
                        <span className="font-label-sm text-label-sm text-outline">SAT 19</span>
                        <div className="w-full bg-surface-container-high h-12 rounded mt-1 relative flex items-end overflow-hidden">
                          <div className="w-full bg-primary rounded-b h-[90%]"></div>
                        </div>
                        <span className="font-data-mono text-label-sm text-on-surface mt-1 font-semibold">10 Labs</span>
                      </div>

                      <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
                        <span className="font-label-sm text-label-sm text-outline">SUN 20</span>
                        <div className="w-full bg-surface-container-high h-12 rounded mt-1 relative flex items-end overflow-hidden">
                          <div className="w-full bg-primary rounded-b h-[40%]"></div>
                        </div>
                        <span className="font-data-mono text-label-sm text-on-surface mt-1 font-semibold">3 Labs</span>
                      </div>

                      <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
                        <span className="font-label-sm text-label-sm text-outline">MON 21</span>
                        <div className="w-full bg-surface-container-high h-12 rounded mt-1 relative flex items-end overflow-hidden">
                          <div className="w-full bg-secondary rounded-b h-[25%]"></div>
                        </div>
                        <span className="font-data-mono text-label-sm text-on-surface mt-1 font-semibold">2 Labs</span>
                      </div>

                      <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
                        <span className="font-label-sm text-label-sm text-outline">TUE 22</span>
                        <div className="w-full bg-surface-container-high h-12 rounded mt-1 relative flex items-end overflow-hidden">
                          <div className="w-full bg-primary rounded-b h-[60%]"></div>
                        </div>
                        <span className="font-data-mono text-label-sm text-on-surface mt-1 font-semibold">5 Labs</span>
                      </div>

                      <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
                        <span className="font-label-sm text-label-sm text-outline">WED 23</span>
                        <div className="w-full bg-surface-container-high h-12 rounded mt-1 relative flex items-end overflow-hidden">
                          <div className="w-full bg-surface-variant rounded-b h-[15%]"></div>
                        </div>
                        <span className="font-data-mono text-label-sm text-on-surface mt-1 font-semibold">1 Lab</span>
                      </div>

                      <div className="flex flex-col items-center bg-surface-container-low p-2 rounded-lg border border-outline-variant/10">
                        <span className="font-label-sm text-label-sm text-outline">THU 24</span>
                        <div className="w-full bg-surface-container-high h-12 rounded mt-1 relative flex items-end overflow-hidden">
                          <div className="w-full bg-surface-variant rounded-b h-[15%]"></div>
                        </div>
                        <span className="font-data-mono text-label-sm text-on-surface mt-1 font-semibold">1 Lab</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* RIGHT COLUMN: Selected Exam Detail & Subject Breakdown Drawer (4 cols) */}
                {/* ========================================================================= */}
                {isDetailDrawerOpen && (
                  <div className="xl:col-span-4 flex flex-col gap-space-md">
                    {/* Detail Card Container */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md relative overflow-hidden border border-outline-variant/30">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-container"></div>

                      {/* Header of Panel */}
                      <div className="flex items-start justify-between pb-space-sm pt-1">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                              Selected Assessment
                            </span>
                            <span className="font-data-mono text-data-mono text-outline">
                              {selectedExam.code}
                            </span>
                          </div>
                          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-1">
                            {selectedExam.name}
                          </h2>
                        </div>

                        <button
                          onClick={() => setIsDetailDrawerOpen(false)}
                          className="text-outline hover:text-on-surface p-1 rounded transition-colors cursor-pointer hover:bg-surface-container"
                          title="Close Panel"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      </div>

                      {/* Metadata Specs Bento Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-space-sm rounded-lg mb-space-md border border-outline-variant/20">
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Course Class</span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate block">
                            {selectedExam.course}
                          </span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Academic Session</span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                            AY 2025–26
                          </span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Branches</span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate block">
                            {selectedExam.branches}
                          </span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Target Batches</span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate block">
                            {selectedExam.batch}
                          </span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Total Passing</span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                            {selectedExam.passingMarks}
                          </span>
                        </div>
                        <div>
                          <span className="font-label-sm text-label-sm text-outline block">Duration Matrix</span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                            {selectedExam.durationMatrix}
                          </span>
                        </div>
                      </div>

                      {/* Subjects & Paper Breakdown */}
                      <div className="mb-space-md">
                        <div className="flex items-center justify-between mb-space-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                              Subjects &amp; Papers
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface font-data-mono text-label-sm font-semibold">
                              {selectedExam.papers.length}
                            </span>
                          </div>

                          <button
                            onClick={() => setIsAddPaperModalOpen(true)}
                            className="text-primary hover:text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span> Add Paper
                          </button>
                        </div>

                        {/* Subject Cards List */}
                        <div className="flex flex-col gap-2.5">
                          {selectedExam.papers.map((paper, idx) => (
                            <div
                              key={paper.id}
                              className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/20"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-label-sm ${
                                      idx === 2
                                        ? 'bg-secondary-container text-on-secondary-container'
                                        : 'bg-primary/15 text-primary'
                                    }`}
                                  >
                                    {paper.code}
                                  </span>
                                  <span className="font-body-md text-body-md font-semibold text-on-surface">
                                    {paper.title}
                                  </span>
                                </div>
                                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono">
                                  {paper.marks} Marks
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-on-surface-variant font-body-sm mt-2 text-[12px]">
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px] text-outline">timer</span>
                                  {paper.durationMinutes}m
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px] text-outline">person</span>
                                  {paper.faculty}
                                </span>
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px] text-outline">
                                    {paper.room.includes('Mac') ? 'desktop_windows' : 'meeting_room'}
                                  </span>
                                  {paper.room}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Assessment Policy Configuration List */}
                      <div className="mb-space-md bg-surface-container-low p-space-sm rounded-lg border border-outline-variant/20">
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold block mb-2">
                          Rules &amp; Policies
                        </span>
                        <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface">
                          <li className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Negative Marking:</span>
                            <span className="font-semibold text-outline">{selectedExam.negativeMarking}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Grace Marks Limit:</span>
                            <span className="font-semibold text-on-surface">{selectedExam.graceMarks}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Result Publishing:</span>
                            <span className="font-semibold text-tertiary">{selectedExam.resultPublishDate}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Hall Ticket Gen:</span>
                            <span className="inline-flex items-center gap-1 font-semibold text-secondary">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              {selectedExam.hallTicketStatus}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Bottom Drawer CTAs */}
                      <div className="flex flex-col gap-2 pt-space-xs">
                        <button
                          onClick={handlePublishExam}
                          className="w-full py-2.5 px-space-md rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">send</span>
                          <span>Publish Exam &amp; Notify Students</span>
                        </button>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onShowToast(`Scheduling Timetable matrix for ${selectedExam.code}`)}
                            className="py-2 px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer border border-outline-variant/20"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                            <span>Schedule Timetable</span>
                          </button>

                          <button
                            onClick={() => onShowToast(`Draft changes saved for ${selectedExam.name}`)}
                            className="py-2 px-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer border border-outline-variant/20"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">save</span>
                            <span>Save Draft</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Hall Ticket Dispatch Status Card */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-outline-variant/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                          Hall Ticket Dispatch
                        </span>
                        <span className="font-data-mono text-label-sm text-secondary font-bold">
                          {selectedExam.hallTicketsReady} / {selectedExam.hallTicketsTotal} Ready
                        </span>
                      </div>

                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
                        <div
                          className="bg-secondary h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(selectedExam.hallTicketsReady / (selectedExam.hallTicketsTotal || 1)) * 100}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                          QR Codes Verified
                        </span>
                        <button
                          onClick={handleDownloadBulkHallTickets}
                          className="text-primary font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                          type="button"
                        >
                          <span>Bulk PDF</span>
                          <span className="material-symbols-outlined text-[14px]">download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODALS & DIALOGS */}
      {/* ========================================================================= */}

      {/* CREATE EXAM MODAL */}
      {isCreateExamModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md max-h-[90vh] overflow-y-auto border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">add_task</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Create Examination Assessment
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Define session, evaluation rules &amp; campus allocations
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateExamModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="flex flex-col gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                  Examination Title *
                </label>
                <input
                  required
                  placeholder="e.g. End Semester Practical Examination"
                  value={newExamName}
                  onChange={(e) => setNewExamName(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Associated Course
                  </label>
                  <select
                    value={newExamCourse}
                    onChange={(e) => setNewExamCourse(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                  >
                    <option value="Web Development MERN">Web Development MERN</option>
                    <option value="Full Stack Dev Bootcamp">Full Stack Dev Bootcamp</option>
                    <option value="Accounting & Tally Prime">Accounting &amp; Tally Prime</option>
                    <option value="Digital Marketing Pro">Digital Marketing Pro</option>
                    <option value="UI/UX Product Design">UI/UX Product Design</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Assessment Type
                  </label>
                  <select
                    value={newExamType}
                    onChange={(e) => setNewExamType(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                  >
                    <option value="Written & Practical">Written &amp; Practical</option>
                    <option value="Lab Assessment">Lab Assessment</option>
                    <option value="MCQ Speed Test">MCQ Speed Test</option>
                    <option value="Portfolio Defense">Portfolio Defense</option>
                    <option value="Viva Voce">Viva Voce</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Exam Window Dates
                  </label>
                  <input
                    value={newExamWindow}
                    onChange={(e) => setNewExamWindow(e.target.value)}
                    placeholder="e.g. 28 Sep – 30 Sep 2026"
                    className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Allocated Branches
                  </label>
                  <input
                    value={newExamBranches}
                    onChange={(e) => setNewExamBranches(e.target.value)}
                    placeholder="e.g. Siliguri HQ &amp; Kolkata"
                    className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                  Estimated Enrolled Students
                </label>
                <input
                  type="number"
                  value={newExamEnrolled}
                  onChange={(e) => setNewExamEnrolled(Number(e.target.value))}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-space-sm border-t border-outline-variant/20 mt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateExamModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all cursor-pointer shadow-sm"
                >
                  Create &amp; Configure Papers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PAPER MODAL */}
      {isAddPaperModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Add Subject Paper to {selectedExam.code}
                </h3>
                <p className="font-body-sm text-body-sm text-outline">
                  Configure marks, duration and lab room allocation
                </p>
              </div>
              <button
                onClick={() => setIsAddPaperModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddPaper} className="flex flex-col gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                  Subject / Paper Title *
                </label>
                <input
                  required
                  placeholder="e.g. Database Systems & MongoDB Sharding"
                  value={newPaperTitle}
                  onChange={(e) => setNewPaperTitle(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Max Marks
                  </label>
                  <input
                    type="number"
                    value={newPaperMarks}
                    onChange={(e) => setNewPaperMarks(Number(e.target.value))}
                    className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={newPaperDuration}
                    onChange={(e) => setNewPaperDuration(Number(e.target.value))}
                    className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Chief Examiner
                  </label>
                  <input
                    value={newPaperFaculty}
                    onChange={(e) => setNewPaperFaculty(e.target.value)}
                    placeholder="e.g. Amit Sharma"
                    className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                    Assigned Room / Lab
                  </label>
                  <input
                    value={newPaperRoom}
                    onChange={(e) => setNewPaperRoom(e.target.value)}
                    placeholder="e.g. Lab 204"
                    className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-space-sm border-t border-outline-variant/20 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPaperModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all cursor-pointer shadow-sm"
                >
                  Add Paper
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIVE SESSION MONITOR MODAL */}
      {isLiveMonitorModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-3xl rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md max-h-[90vh] overflow-y-auto border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[24px]">sensors</span>
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Live Telemetry &amp; Lab Monitor
                    </h3>
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
                      312 Active Candidates
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-outline">
                    Monthly Code Sprint (#EXAM-2026-0038) • Streaming from 12 Labs
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLiveMonitorModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-[11px] text-outline uppercase font-semibold">Checked-In Ratio</span>
                <div className="text-xl font-bold text-on-surface mt-0.5">312 / 312 (100%)</div>
                <span className="text-[11px] text-secondary font-medium">No unauthorized absences</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-[11px] text-outline uppercase font-semibold">Test Submissions</span>
                <div className="text-xl font-bold text-primary mt-0.5">148 Completed</div>
                <span className="text-[11px] text-outline">164 Active Code Terminals</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-[11px] text-outline uppercase font-semibold">Proctor Alerts</span>
                <div className="text-xl font-bold text-secondary mt-0.5">0 Irregularities</div>
                <span className="text-[11px] text-secondary font-medium">Safe browser sandbox</span>
              </div>
            </div>

            <div className="border border-outline-variant/20 rounded-xl overflow-hidden">
              <div className="bg-surface-container-low px-3 py-2 font-label-sm text-label-sm font-semibold text-outline uppercase tracking-wider">
                Lab Cluster Status
              </div>
              <div className="p-3 grid grid-cols-4 gap-2">
                {[
                  { lab: 'Siliguri Lab 101', status: 'Active (28)', ping: '12ms' },
                  { lab: 'Siliguri Lab 102', status: 'Active (30)', ping: '15ms' },
                  { lab: 'Siliguri Mac Pods', status: 'Active (25)', ping: '9ms' },
                  { lab: 'Kolkata Node 1', status: 'Active (40)', ping: '18ms' },
                  { lab: 'Kolkata Node 2', status: 'Active (40)', ping: '19ms' },
                  { lab: 'Jalpaiguri Lab A', status: 'Active (35)', ping: '22ms' },
                  { lab: 'Jalpaiguri Lab B', status: 'Active (30)', ping: '20ms' },
                  { lab: 'Binnaguri Lab 1', status: 'Active (24)', ping: '28ms' },
                ].map((item) => (
                  <div key={item.lab} className="p-2 rounded bg-surface-container-lowest border border-outline-variant/20">
                    <div className="flex items-center justify-between text-xs font-semibold text-on-surface">
                      <span className="truncate">{item.lab}</span>
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </div>
                    <div className="text-[11px] text-outline mt-1">{item.status}</div>
                    <div className="text-[10px] text-primary font-mono">{item.ping}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onShowToast('Broadcasting time warning: 15 minutes remaining.')}
                className="px-3 py-1.5 rounded-lg bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold cursor-pointer"
              >
                Broadcast 15-Min Warning
              </button>
              <button
                onClick={() => setIsLiveMonitorModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold cursor-pointer"
              >
                Close Monitor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HALL TICKET PREVIEW MODAL */}
      {isHallTicketModalOpen && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md max-h-[90vh] overflow-y-auto border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">confirmation_number</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Candidate Hall Ticket / Admit Card
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Cryptographic QR &amp; biometric seating pass for {selectedExam.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsHallTicketModalOpen(false)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Hall Ticket Card Paper Spec */}
            <div className="bg-[#FAF9F5] border-2 border-[#0F172A] rounded-xl p-5 shadow-inner">
              <div className="flex items-center justify-between border-b pb-3 border-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white font-bold flex items-center justify-center text-sm">
                    A
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#0F172A] uppercase">
                      Apex Institute of Technology
                    </h4>
                    <span className="text-[10px] text-outline font-mono">OFFICIAL ADMIT CARD • AY 2025-26</span>
                  </div>
                </div>
                <div className="text-right font-mono text-[10px] text-outline">
                  Roll: <strong className="text-primary font-bold">ABC-SIL-26-00125</strong>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 my-4 items-center">
                <div className="col-span-1 flex flex-col items-center">
                  <div className="w-20 h-24 rounded bg-surface-container flex items-center justify-center border text-outline font-mono text-xs">
                    [PHOTO]
                  </div>
                  <span className="text-[10px] font-semibold text-[#0F172A] mt-1">Rahul Kumar</span>
                </div>

                <div className="col-span-2 space-y-1 text-xs">
                  <div>
                    <span className="text-outline">Exam:</span>{' '}
                    <strong className="text-[#0F172A]">{selectedExam.name}</strong>
                  </div>
                  <div>
                    <span className="text-outline">Course:</span>{' '}
                    <strong className="text-[#0F172A]">{selectedExam.course}</strong>
                  </div>
                  <div>
                    <span className="text-outline">Center:</span>{' '}
                    <strong className="text-[#0F172A]">Siliguri HQ Campus, Lab 204</strong>
                  </div>
                  <div>
                    <span className="text-outline">Date Window:</span>{' '}
                    <strong className="text-[#0F172A]">{selectedExam.window}</strong>
                  </div>
                </div>

                <div className="col-span-1 flex flex-col items-center justify-center border-l pl-3">
                  {/* Mock QR code */}
                  <div className="w-16 h-16 bg-white p-1 rounded border shadow-xs flex items-center justify-center">
                    <svg className="w-full h-full text-[#0F172A]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm-3 2h2v2h-2v-2zm2 2h2v2h-2v-2zm3-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-5 0h2v2h-2v-2zm-2-4h2v2h-2v-2z" />
                    </svg>
                  </div>
                  <span className="text-[8px] font-mono text-outline mt-1">Scan for Entry</span>
                </div>
              </div>

              {/* Papers Schedule inside admit card */}
              <div className="border-t border-[#CBD5E1] pt-2">
                <span className="text-[10px] font-bold uppercase text-outline block mb-1">
                  Scheduled Papers &amp; Shifts
                </span>
                <table className="w-full text-[11px] text-left">
                  <thead>
                    <tr className="text-outline border-b">
                      <th className="py-1">Paper</th>
                      <th className="py-1">Subject</th>
                      <th className="py-1">Max</th>
                      <th className="py-1">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedExam.papers.map((p) => (
                      <tr key={p.id} className="border-b border-[#CBD5E1]/40">
                        <td className="py-1 font-mono font-bold text-primary">{p.code}</td>
                        <td className="py-1 font-medium text-[#0F172A]">{p.title}</td>
                        <td className="py-1">{p.marks} M</td>
                        <td className="py-1">{p.durationMinutes} mins</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                onClick={() => {
                  window.print();
                  onShowToast('Printed candidate admit card.');
                }}
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Single Pass</span>
              </button>

              <button
                onClick={handleDownloadBulkHallTickets}
                className="px-5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download All {selectedExam.hallTicketsReady} Passes (ZIP)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
