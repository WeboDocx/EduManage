import React, { useState } from 'react';
import { ScreenType } from '../types';
import { useSidebar } from '../context/SidebarContext';

interface CertificateTemplateStudioScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string) => void;
}

type StudioTab = 'canvas' | 'gallery' | 'published' | 'drafts' | 'archived';
type BorderMotif = 'classic-guilloche' | 'double-gold' | 'corporate-navy';

interface TemplateItem {
  id: string;
  title: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  version: string;
  campuses: string;
  previewColor: string;
}

const TEMPLATE_GALLERY: TemplateItem[] = [
  {
    id: 'tpl-1',
    title: 'Flagship Multi-Campus Diploma',
    category: 'Degree & Diploma',
    status: 'published',
    lastModified: 'Today, 02:15 PM',
    version: 'v3.2',
    campuses: 'All 8 Campuses',
    previewColor: '#B48C36',
  },
  {
    id: 'tpl-2',
    title: 'Postgraduate Advanced Fellowship',
    category: 'Higher Studies',
    status: 'published',
    lastModified: '12 Sep 2026',
    version: 'v2.8',
    campuses: 'Siliguri & Kolkata',
    previewColor: '#004ac6',
  },
  {
    id: 'tpl-3',
    title: 'Vocational Technical Masterclass',
    category: 'Short Courses',
    status: 'published',
    lastModified: '08 Sep 2026',
    version: 'v2.1',
    campuses: 'All Campuses',
    previewColor: '#006a61',
  },
  {
    id: 'tpl-4',
    title: 'Honors Academic Citation of Merit',
    category: 'Merit Award',
    status: 'published',
    lastModified: '01 Sep 2026',
    version: 'v1.9',
    campuses: 'All Campuses',
    previewColor: '#B48C36',
  },
  {
    id: 'tpl-5',
    title: 'STEM Innovation & Robotics Distinction',
    category: 'Technical',
    status: 'published',
    lastModified: '25 Aug 2026',
    version: 'v1.4',
    campuses: 'Siliguri & Durgapur',
    previewColor: '#4338d9',
  },
  {
    id: 'tpl-6',
    title: 'Corporate Leadership & Soft Skills',
    category: 'Executive Edu',
    status: 'draft',
    lastModified: 'Yesterday',
    version: 'v0.9-draft',
    campuses: 'All Campuses',
    previewColor: '#434655',
  },
  {
    id: 'tpl-7',
    title: 'Cybersecurity Ethical Defense Cert',
    category: 'IT Specialist',
    status: 'draft',
    lastModified: '3 days ago',
    version: 'v0.8-draft',
    campuses: 'Kolkata HQ',
    previewColor: '#004ac6',
  },
  {
    id: 'tpl-8',
    title: 'Summer Immersion Program 2025',
    category: 'Workshop',
    status: 'archived',
    lastModified: '15 Jul 2025',
    version: 'v1.0-legacy',
    campuses: 'Archived',
    previewColor: '#737686',
  },
];

const MERGE_TAGS = [
  { tag: '{{student_name}}', desc: 'e.g. Rahul Kumar', sample: 'Rahul Kumar' },
  { tag: '{{course_name}}', desc: 'e.g. Full Stack Web Development', sample: 'Full Stack Web Development' },
  { tag: '{{institution_name}}', desc: 'Apex Institute of Technology', sample: 'Apex Institute of Technology & Skills' },
  { tag: '{{enrollment_number}}', desc: 'ABC-SIL-26-00125', sample: 'ABC-SIL-26-00125' },
  { tag: '{{certificate_id}}', desc: 'CERT-APX-2026-00125', sample: 'CERT-APX-2026-00125' },
  { tag: '{{grade}}', desc: 'Grade A - Distinction', sample: 'Distinction (Grade A)' },
  { tag: '{{director_name}}', desc: 'Rajesh Sharma', sample: 'Rajesh Sharma' },
  { tag: '{{issue_date}}', desc: '15 September 2026', sample: '15 September 2026' },
];

export const CertificateTemplateStudioScreen: React.FC<CertificateTemplateStudioScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<StudioTab>('canvas');

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // Selected Canvas Element for Properties Inspector
  const [selectedElement, setSelectedElement] = useState<'student_name' | 'course_title' | 'institution' | 'seal' | 'signatures' | 'qr'>('student_name');

  // Typography & Styling State
  const [fontFamily, setFontFamily] = useState<string>('Cinzel / Playfair Display');
  const [fontSize, setFontSize] = useState<number>(32);
  const [fontWeight, setFontWeight] = useState<string>('Bold (700)');
  const [letterSpacing, setLetterSpacing] = useState<string>('1.5px');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [selectedColor, setSelectedColor] = useState<string>('#0F172A');
  const [studentTextValue, setStudentTextValue] = useState<string>('Rahul Kumar');

  // Border Motif
  const [borderMotif, setBorderMotif] = useState<BorderMotif>('classic-guilloche');

  // Canvas Viewport settings
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isGridOn, setIsGridOn] = useState<boolean>(true);
  const [isRulersOn, setIsRulersOn] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Position
  const [posX, setPosX] = useState<number>(148.5);
  const [posY, setPosY] = useState<number>(92.0);

  // Template Specs
  const [templateTitle, setTemplateTitle] = useState<string>('Flagship Multi-Campus Diploma v3.2');
  const [isCryptographicLedgerEnabled, setIsCryptographicLedgerEnabled] = useState<boolean>(true);
  const [uidPattern, setUidPattern] = useState<string>('CERT-APX-YYYY-######');

  // Preview Modal
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [sampleStudent, setSampleStudent] = useState<{ name: string; roll: string; batch: string; course: string; grade: string }>({
    name: 'Rahul Kumar',
    roll: 'ABC-SIL-26-00125',
    batch: 'AY 2025-26',
    course: 'Full Stack Web Development',
    grade: 'Grade A with Distinction',
  });

  const handleInsertTag = (tag: string) => {
    navigator.clipboard?.writeText(tag);
    onShowToast(`Inserted & copied token: ${tag}`);
  };

  const handleSaveDraft = () => {
    onShowToast(`Saved draft for "${templateTitle}" (Version: 3.2.1)`);
  };

  const handlePublishTemplate = () => {
    onShowToast(`Published "${templateTitle}" to live certificate issuance register!`);
  };

  const handleUndo = () => {
    onShowToast('Action undone.');
  };

  const handleRedo = () => {
    onShowToast('Action redone.');
  };

  const handlePrintSample = () => {
    onShowToast('Generating high-resolution print PDF buffer...');
    window.print();
  };

  const handleExportVector = () => {
    onShowToast('Exported print-ready SVG Vector with CMYK calibration.');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased flex">
      {/* 1. FIXED LEFT SIDEBAR (w-64) */}
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
              onClick={() => onShowToast('Attendance ledger active across all 8 branches.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span className="font-body-md text-body-md">Attendance</span>
            </button>

            <button
              onClick={() => onShowToast('Fee ledger & reconciliation active.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span className="font-body-md text-body-md">Fees &amp; Finance</span>
            </button>

            {/* Active Certificates Menu */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => onNavigate('certificates')}
                className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg bg-primary-container text-on-primary font-semibold shadow-[0_1px_3px_rgba(37,99,235,0.2)] text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                <span className="font-body-md text-body-md">Certificates</span>
              </button>
              {/* Nested link for Template Studio */}
              <div className="pl-7 pr-2 py-1 flex flex-col gap-1 border-l-2 border-primary ml-4 mt-0.5">
                <button
                  onClick={() => onNavigate('certificates')}
                  className="text-xs text-on-surface-variant hover:text-primary py-0.5 text-left font-medium"
                >
                  Issuance &amp; Verification
                </button>
                <button
                  onClick={() => setActiveTab('canvas')}
                  className="text-xs text-primary font-semibold py-0.5 text-left flex items-center justify-between"
                >
                  <span>Template Studio</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                </button>
              </div>
            </div>

            <button
              onClick={() => onShowToast('Multi-channel announcements & SMS gateway active.')}
              className="flex items-center gap-space-sm px-space-sm py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">forum</span>
              <span className="font-body-md text-body-md">Communication</span>
            </button>

            <button
              onClick={() => onShowToast('Branch settings & campus configurations.')}
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

      {/* 2. MAIN WORKSPACE CONTENT (pl-0 lg:pl-64) */}
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

            {/* Branch Selector Dropdown */}
            <div
              onClick={() => onShowToast('All 8 Branch Nodes verified for digital issuance.')}
              className="relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-outline text-[18px] mr-1">domain</span>
              <span className="font-label-md text-label-md text-on-surface font-medium">
                All Branches (8 Active)
              </span>
              <span className="material-symbols-outlined text-outline text-[16px] ml-1">expand_more</span>
            </div>

            {/* Academic Year Tag */}
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
                placeholder="Search templates, tokens..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="font-label-sm text-label-sm bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 rounded font-mono shadow-xs">
                ⌘K
              </span>
            </div>

            <button
              onClick={() => onShowToast('Notifications: 3 pending template approval reviews.')}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-on-error rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold">
                3
              </span>
            </button>

            <button
              onClick={() => onShowToast('EduManage Certificate Studio Documentation & Token Reference')}
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

        {/* 3. MAIN STUDIO VIEWPORT */}
        <main className="w-full pt-3 sm:pt-4 bg-background min-h-screen">
          <div className="flex flex-col w-full">
            {/* Sub-Header & Studio Control Strip */}
            <div className="bg-surface-container-lowest shadow-xs px-margin-desktop py-space-md border-b border-outline-variant/30">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
                {/* Title & Breadcrumbs */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <button
                      onClick={() => onNavigate('certificates')}
                      className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1 font-medium"
                    >
                      <span>Certificates</span>
                    </button>
                    <span className="text-outline-variant">/</span>
                    <span className="font-semibold text-on-surface">Template Studio</span>
                    <span className="ml-2 bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                      Editor v3.2
                    </span>
                  </div>

                  <div className="flex items-baseline gap-space-sm">
                    <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                      Certificate Template Studio
                    </h1>
                    <span className="hidden md:inline-block font-body-sm text-body-sm text-on-surface-variant">
                      Visual drag-and-drop designer with live cryptographic merge tokens
                    </span>
                  </div>
                </div>

                {/* Studio Primary Actions */}
                <div className="flex items-center gap-space-sm self-start lg:self-auto flex-wrap">
                  <button
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="flex items-center gap-1.5 bg-surface-container-low text-on-surface hover:bg-surface-container-high px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all shadow-xs cursor-pointer border border-outline-variant/30"
                    id="previewModalBtn"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">visibility</span>
                    <span>Preview with Sample Data</span>
                  </button>

                  <button
                    onClick={handleSaveDraft}
                    className="flex items-center gap-1.5 bg-surface-container text-on-surface hover:bg-surface-container-high px-space-md py-2 rounded-lg font-label-lg text-label-lg transition-all shadow-xs cursor-pointer border border-outline-variant/30"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-outline">save</span>
                    <span>Save Draft</span>
                  </button>

                  <button
                    onClick={handlePublishTemplate}
                    className="flex items-center gap-1.5 bg-primary-container text-on-primary hover:bg-primary px-space-lg py-2 rounded-lg font-label-lg text-label-lg transition-all shadow-md shadow-primary/20 active:scale-[0.98] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    <span>Publish Template</span>
                  </button>
                </div>
              </div>

              {/* Navigation Sub-Tabs */}
              <div className="flex items-center justify-between mt-space-md pt-space-xs overflow-x-auto">
                <div className="flex items-center gap-space-sm">
                  <button
                    onClick={() => setActiveTab('canvas')}
                    className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md font-semibold transition-all cursor-pointer ${
                      activeTab === 'canvas'
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">draw</span>
                    <span>Visual Canvas Editor</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                      activeTab === 'gallery'
                        ? 'bg-primary text-on-primary font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">collections_bookmark</span>
                    <span>Template Gallery</span>
                    <span className="bg-surface-container-highest text-on-surface px-1.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
                      8
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('published')}
                    className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                      activeTab === 'published'
                        ? 'bg-primary text-on-primary font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Published</span>
                    <span className="bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
                      5
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('drafts')}
                    className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                      activeTab === 'drafts'
                        ? 'bg-primary text-on-primary font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">edit_document</span>
                    <span>Drafts</span>
                    <span className="bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold">
                      3
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('archived')}
                    className={`flex items-center gap-2 px-space-md py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                      activeTab === 'archived'
                        ? 'bg-primary text-on-primary font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">archive</span>
                    <span>Archived</span>
                  </button>
                </div>

                <div className="hidden xl:flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1 font-medium text-secondary">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> Auto-save active
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="font-mono text-outline">Version: 3.2.1-prod</span>
                </div>
              </div>
            </div>

            {/* TAB VIEW 1: VISUAL CANVAS EDITOR (3 COLUMNS) */}
            {activeTab === 'canvas' && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-md p-space-md min-h-[calc(100vh-140px)]">
                {/* COLUMN 1: Asset Library & Dynamic Merge Variables (3 cols) */}
                <div className="xl:col-span-3 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-outline-variant/30 flex flex-col gap-space-md">
                    {/* Search Variables */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                          Asset Library
                        </span>
                        <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                          Variables
                        </span>
                      </div>
                      <div className="relative flex items-center bg-surface-container-low rounded-lg px-space-sm py-1.5 border border-outline-variant/20">
                        <span className="material-symbols-outlined text-outline text-[18px] mr-1.5">search</span>
                        <input
                          className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none w-full"
                          placeholder="Search merge tags & blocks..."
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Dynamic Merge Tags */}
                    <div className="flex flex-col gap-space-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">data_object</span>
                          Dynamic Merge Tags
                        </span>
                        <span className="text-outline font-label-sm text-label-sm">Click to insert</span>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
                        {MERGE_TAGS.filter(
                          (m) =>
                            m.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            m.desc.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((item) => (
                          <div
                            key={item.tag}
                            onClick={() => handleInsertTag(item.tag)}
                            className="group flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/10"
                            title="Click to copy and bind to active element"
                          >
                            <div className="flex flex-col min-w-0">
                              <span className="font-data-mono text-data-mono text-primary font-semibold truncate">
                                {item.tag}
                              </span>
                              <span className="font-body-sm text-[11px] text-outline truncate">{item.desc}</span>
                            </div>
                            <span className="material-symbols-outlined text-outline group-hover:text-primary text-[16px] transition-colors">
                              add_circle
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section B: Visual Elements & Security */}
                    <div className="flex flex-col gap-space-sm pt-space-xs border-t border-outline-variant/20">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wide flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">shapes</span>
                        Visual Elements &amp; Security
                      </span>

                      {/* Element tiles */}
                      <div className="grid grid-cols-2 gap-2">
                        <div
                          onClick={() => {
                            setSelectedElement('institution');
                            onShowToast('Focused: Crest & Logo Element');
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all text-center border ${
                            selectedElement === 'institution'
                              ? 'bg-surface-container-high border-primary ring-1 ring-primary'
                              : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/10'
                          }`}
                        >
                          <span className="material-symbols-outlined text-primary text-[24px]">shield</span>
                          <span className="font-label-sm text-label-sm text-on-surface font-medium mt-1">
                            Crest &amp; Logo
                          </span>
                          <span className="font-body-sm text-[10px] text-outline">Gold Foil SVG</span>
                        </div>

                        <div
                          onClick={() => {
                            setSelectedElement('qr');
                            onShowToast('Focused: Verify QR Cryptographic Element');
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all text-center border ${
                            selectedElement === 'qr'
                              ? 'bg-surface-container-high border-primary ring-1 ring-primary'
                              : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/10'
                          }`}
                        >
                          <span className="material-symbols-outlined text-secondary text-[24px]">
                            qr_code_scanner
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface font-medium mt-1">
                            Verify QR
                          </span>
                          <span className="font-body-sm text-[10px] text-outline">Public SHA-256</span>
                        </div>

                        <div
                          onClick={() => {
                            setSelectedElement('signatures');
                            onShowToast('Focused: Dual Authority Signatures');
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all text-center border ${
                            selectedElement === 'signatures'
                              ? 'bg-surface-container-high border-primary ring-1 ring-primary'
                              : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/10'
                          }`}
                        >
                          <span className="material-symbols-outlined text-tertiary text-[24px]">draw</span>
                          <span className="font-label-sm text-label-sm text-on-surface font-medium mt-1">
                            Signatures
                          </span>
                          <span className="font-body-sm text-[10px] text-outline">Dual Authority</span>
                        </div>

                        <div
                          onClick={() => {
                            setSelectedElement('seal');
                            onShowToast('Focused: Hologram Official Seal');
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all text-center border ${
                            selectedElement === 'seal'
                              ? 'bg-surface-container-high border-primary ring-1 ring-primary'
                              : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/10'
                          }`}
                        >
                          <span className="material-symbols-outlined text-outline text-[24px]">military_tech</span>
                          <span className="font-label-sm text-label-sm text-on-surface font-medium mt-1">
                            Hologram Seal
                          </span>
                          <span className="font-body-sm text-[10px] text-outline">Embossed Stamp</span>
                        </div>
                      </div>

                      {/* Border Style Selector */}
                      <div className="flex flex-col gap-1.5 mt-space-xs">
                        <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Academic Border Motif
                        </label>
                        <div className="flex flex-col gap-1.5">
                          <div
                            onClick={() => {
                              setBorderMotif('classic-guilloche');
                              onShowToast('Applied Classic Guilloche Gold & Navy Motif');
                            }}
                            className={`flex items-center justify-between p-2 rounded-lg text-label-sm font-semibold cursor-pointer transition-colors border ${
                              borderMotif === 'classic-guilloche'
                                ? 'bg-surface-container-high text-on-surface border-primary'
                                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant border-outline-variant/20'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full bg-secondary"></span>
                              Classic Guilloche Gold &amp; Navy
                            </span>
                            {borderMotif === 'classic-guilloche' && (
                              <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                            )}
                          </div>

                          <div
                            onClick={() => {
                              setBorderMotif('double-gold');
                              onShowToast('Applied Double Gold Hairline Minimalist Motif');
                            }}
                            className={`flex items-center justify-between p-2 rounded-lg text-label-sm font-medium cursor-pointer transition-colors border ${
                              borderMotif === 'double-gold'
                                ? 'bg-surface-container-high text-on-surface border-primary font-semibold'
                                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant border-outline-variant/20'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full bg-outline-variant"></span>
                              Double Gold Hairline Minimalist
                            </span>
                            {borderMotif === 'double-gold' && (
                              <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                            )}
                          </div>

                          <div
                            onClick={() => {
                              setBorderMotif('corporate-navy');
                              onShowToast('Applied Corporate Navy Filigree Motif');
                            }}
                            className={`flex items-center justify-between p-2 rounded-lg text-label-sm font-medium cursor-pointer transition-colors border ${
                              borderMotif === 'corporate-navy'
                                ? 'bg-surface-container-high text-on-surface border-primary font-semibold'
                                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant border-outline-variant/20'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                              Corporate Navy Filigree
                            </span>
                            {borderMotif === 'corporate-navy' && (
                              <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: High-Fidelity A4 Landscape Canvas Editor (6 cols) */}
                <div className="xl:col-span-6 flex flex-col gap-space-sm">
                  {/* Canvas Top Toolbar */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-xs border border-outline-variant/30 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant/20">
                        <button
                          onClick={handleUndo}
                          className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
                          title="Undo (⌘Z)"
                        >
                          <span className="material-symbols-outlined text-[18px]">undo</span>
                        </button>
                        <button
                          onClick={handleRedo}
                          className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
                          title="Redo (⌘Y)"
                        >
                          <span className="material-symbols-outlined text-[18px]">redo</span>
                        </button>
                      </div>

                      <div className="h-5 w-px bg-outline-variant"></div>

                      {/* Zoom Selector */}
                      <div className="flex items-center bg-surface-container-low rounded-lg px-2 py-1 gap-1 border border-outline-variant/20">
                        <span className="material-symbols-outlined text-[16px] text-outline">zoom_in</span>
                        <select
                          value={zoomLevel}
                          onChange={(e) => setZoomLevel(Number(e.target.value))}
                          className="bg-transparent font-data-mono text-data-mono font-medium text-on-surface focus:outline-none cursor-pointer"
                        >
                          <option value={75}>75%</option>
                          <option value={100}>100%</option>
                          <option value={125}>125%</option>
                          <option value={150}>150%</option>
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          setIsGridOn(!isGridOn);
                          onShowToast(`Canvas Grid: ${!isGridOn ? 'ON' : 'OFF'}`);
                        }}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg font-label-sm text-label-sm font-medium transition-colors cursor-pointer ${
                          isGridOn
                            ? 'bg-primary-fixed text-on-primary-fixed'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">grid_on</span>
                        <span>Grid: {isGridOn ? 'ON' : 'OFF'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsRulersOn(!isRulersOn);
                          onShowToast(`Rulers & Millimeter Guides: ${!isRulersOn ? 'ON' : 'OFF'}`);
                        }}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg font-label-sm text-label-sm font-medium transition-colors cursor-pointer ${
                          isRulersOn
                            ? 'bg-primary-fixed text-on-primary-fixed'
                            : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">straighten</span>
                        <span>Rulers</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-label-sm text-label-sm text-outline flex items-center gap-1 font-mono">
                        <span className="material-symbols-outlined text-[16px]">crop_landscape</span>
                        A4 Landscape (297 × 210 mm)
                      </span>
                      <button
                        onClick={() => {
                          setIsFullscreen(!isFullscreen);
                          onShowToast(isFullscreen ? 'Exited Fullscreen Canvas' : 'Expanded Canvas to Fit');
                        }}
                        className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
                        title="Full Screen Canvas"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Certificate Visual Canvas Container */}
                  <div
                    className={`relative bg-surface-container rounded-2xl p-space-md shadow-inner flex items-center justify-center overflow-x-auto min-h-[620px] transition-all ${
                      isGridOn ? 'bg-[radial-gradient(#c3c6d7_1px,transparent_1px)] [background-size:16px_16px]' : ''
                    }`}
                  >
                    {/* Watermark Background Decorative Glow */}
                    <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-primary-fixed/20 to-transparent blur-2xl pointer-events-none"></div>

                    {/* The A4 Certificate Document (Landscape ratio 1.414 / 297x210) */}
                    <div
                      id="certificateSheet"
                      style={{
                        transform: `scale(${zoomLevel / 100})`,
                        transformOrigin: 'center center',
                      }}
                      className="relative w-full max-w-[780px] aspect-[1.414/1] bg-[#FCFBF7] rounded-lg shadow-xl p-8 flex flex-col justify-between select-none transition-all duration-200 overflow-hidden border border-amber-900/10"
                    >
                      {/* BORDER MOTIFS */}
                      {borderMotif === 'classic-guilloche' && (
                        <>
                          <div className="absolute inset-3 border-4 border-[#0F172A] rounded-xs pointer-events-none"></div>
                          <div className="absolute inset-4 border border-[#B48C36] rounded-xs pointer-events-none"></div>
                          <div className="absolute inset-5 border-2 border-dashed border-[#B48C36]/60 rounded-xs pointer-events-none"></div>
                        </>
                      )}

                      {borderMotif === 'double-gold' && (
                        <>
                          <div className="absolute inset-3 border-2 border-[#B48C36] rounded-xs pointer-events-none"></div>
                          <div className="absolute inset-5 border border-[#B48C36]/80 rounded-xs pointer-events-none"></div>
                        </>
                      )}

                      {borderMotif === 'corporate-navy' && (
                        <>
                          <div className="absolute inset-3 border-4 border-[#004ac6] rounded-xs pointer-events-none"></div>
                          <div className="absolute inset-4 border-2 border-[#1E3A8A] rounded-xs pointer-events-none"></div>
                        </>
                      )}

                      {/* Corner Flourish Ornaments */}
                      <div className="absolute top-4 left-4 w-7 h-7 text-[#B48C36]">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2 2h8v2H4v6H2V2zm2 20h6v-2H4v-6H2v8h2zm18-20h-8v2h6v6h2V2zm-2 20h-6v-2h6v-6h2v8h-2z"></path>
                        </svg>
                      </div>
                      <div className="absolute top-4 right-4 w-7 h-7 text-[#B48C36]">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 2h-8v2h6v6h2V2zM2 4v6h2V4h6V2H2v2zm20 16h-6v2h8v-8h-2v6zM4 20h6v2H2v-8h2v6z"></path>
                        </svg>
                      </div>
                      <div className="absolute bottom-4 left-4 w-7 h-7 text-[#B48C36]">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2 22h8v-2H4v-6H2v8zm2-20h6V0H2v8h2V2zm18 20h-8v-2h6v-6h2v8zm0-18h-6V0h8v8h-2V4z"></path>
                        </svg>
                      </div>
                      <div className="absolute bottom-4 right-4 w-7 h-7 text-[#B48C36]">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 22h-8v-2h6v-6h2v8zm-20-2h6v2H0v-8h2v6zm18-18h-6V0h8v8h-2V2zM2 2h6V0H0v8h2V2z"></path>
                        </svg>
                      </div>

                      {/* Subtle Background Watermark Crest */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <svg className="w-80 h-80 text-[#0F172A]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13l-7-3.18V17l7 4 7-4v-5.18L12 15z"></path>
                        </svg>
                      </div>

                      {/* Certificate Header Block */}
                      <div
                        onClick={() => setSelectedElement('institution')}
                        className={`relative z-10 flex flex-col items-center text-center mt-2 cursor-pointer transition-all rounded p-1 ${
                          selectedElement === 'institution' ? 'ring-2 ring-primary/40' : ''
                        }`}
                      >
                        {/* Crest with Gold Badge */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#B48C36] to-[#E5C158] flex items-center justify-center shadow-md text-white font-serif font-bold text-xl">
                            A
                          </div>
                          <div className="text-left leading-tight">
                            <span className="block font-serif text-[15px] font-bold tracking-widest text-[#0F172A] uppercase">
                              Apex Institute of Technology &amp; Skills
                            </span>
                            <span className="block text-[9px] uppercase tracking-wider text-[#B48C36] font-semibold">
                              An Autonomous Multi-Campus Center of Academic Excellence
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <div className="my-2">
                          <h2 className="font-serif text-[21px] font-extrabold text-[#0F172A] tracking-wider uppercase border-b border-[#B48C36] pb-1 inline-block">
                            Certificate of Merit &amp; Completion
                          </h2>
                        </div>
                        <p className="font-serif italic text-[12px] text-[#434655] mt-0.5">
                          This is to officially certify that
                        </p>
                      </div>

                      {/* Certificate Student Centerpiece (Selected Interactive Element) */}
                      <div className="relative z-10 flex flex-col items-center text-center -mt-1">
                        {/* Focused / Active Text Box with Control Bounding Handles */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElement('student_name');
                          }}
                          className="relative inline-block px-6 py-1 cursor-move group"
                        >
                          {/* Bounding Box Selection Highlight */}
                          {selectedElement === 'student_name' && (
                            <>
                              <div className="absolute -inset-1 border-2 border-primary border-dashed rounded pointer-events-none animate-pulse"></div>
                              {/* Transform Handles */}
                              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-primary rounded-full shadow-xs"></div>
                              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-primary rounded-full shadow-xs"></div>
                              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-primary rounded-full shadow-xs"></div>
                              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-primary rounded-full shadow-xs"></div>
                            </>
                          )}

                          <h3
                            style={{
                              fontFamily: fontFamily.includes('Cinzel') ? 'Cinzel, Playfair Display, serif' : 'serif',
                              fontSize: `${fontSize}px`,
                              letterSpacing: letterSpacing,
                              color: selectedColor,
                              textAlign: alignment,
                            }}
                            className="font-serif font-bold tracking-wide underline decoration-[#B48C36] decoration-1 underline-offset-8 transition-all"
                          >
                            {studentTextValue}
                          </h3>
                        </div>

                        {/* Course & Distinction Paragraph */}
                        <div
                          onClick={() => setSelectedElement('course_title')}
                          className={`cursor-pointer rounded p-1 transition-all ${
                            selectedElement === 'course_title' ? 'ring-2 ring-primary/40' : ''
                          }`}
                        >
                          <p className="font-serif text-[11px] text-[#334155] max-w-[560px] leading-relaxed mt-2 text-center px-4">
                            has successfully completed the comprehensive professional curriculum in{' '}
                            <span className="font-semibold text-[#0F172A] font-mono">
                              &#123;&#123;course_name&#125;&#125;
                            </span>{' '}
                            with <span className="font-semibold text-[#0F172A]">Distinction (Grade A)</span>, having
                            demonstrated rigorous mastery of software engineering disciplines at the Siliguri Campus
                            during Academic Year 2025–26.
                          </p>
                        </div>

                        {/* Metadata Ribbon Details Grid */}
                        <div className="flex items-center justify-center gap-6 mt-3 text-[10px] text-[#475569] font-mono border-t border-b border-[#E2E8F0] py-1 px-4 w-4/5">
                          <div>
                            <span className="text-outline">Enrollment:</span>{' '}
                            <strong className="text-[#0F172A]">ABC-SIL-26-00125</strong>
                          </div>
                          <div>•</div>
                          <div>
                            <span className="text-outline">Duration:</span>{' '}
                            <strong className="text-[#0F172A]">6 Months (360 Contact Hrs)</strong>
                          </div>
                          <div>•</div>
                          <div>
                            <span className="text-outline">Issue Date:</span>{' '}
                            <strong className="text-[#0F172A]">15 Sep 2026</strong>
                          </div>
                        </div>
                      </div>

                      {/* Certificate Footer Section (QR, Embossed Seal, Signatures) */}
                      <div className="relative z-10 flex items-end justify-between px-6 pb-2">
                        {/* Left: QR Code Verification */}
                        <div
                          onClick={() => setSelectedElement('qr')}
                          className={`flex items-center gap-2 max-w-[170px] cursor-pointer rounded p-1 transition-all ${
                            selectedElement === 'qr' ? 'ring-2 ring-primary/40' : ''
                          }`}
                        >
                          <div className="w-14 h-14 bg-white p-1 rounded border border-[#CBD5E1] shadow-xs flex items-center justify-center">
                            {/* High Contrast SVG QR Code Mock */}
                            <svg className="w-full h-full text-[#0F172A]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm-3 2h2v2h-2v-2zm2 2h2v2h-2v-2zm3-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-5 0h2v2h-2v-2zm-2-4h2v2h-2v-2z"></path>
                            </svg>
                          </div>
                          <div className="flex flex-col text-[8.5px] leading-tight text-[#475569]">
                            <span className="font-bold text-[#0F172A]">Scan to Verify</span>
                            <span>Authentic verification on ledger:</span>
                            <span className="text-primary font-mono truncate">edumanage.io/verify</span>
                          </div>
                        </div>

                        {/* Center: Gold Foil Embossed Seal */}
                        <div
                          onClick={() => setSelectedElement('seal')}
                          className={`flex flex-col items-center justify-center -mb-1 cursor-pointer rounded p-1 transition-all ${
                            selectedElement === 'seal' ? 'ring-2 ring-primary/40' : ''
                          }`}
                        >
                          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#B48C36] via-[#F4E19C] to-[#8C6D23] shadow-md flex items-center justify-center border-2 border-white">
                            <div className="w-12 h-12 rounded-full border border-dashed border-[#8C6D23] flex flex-col items-center justify-center text-center p-0.5">
                              <span className="material-symbols-outlined text-[#5C4511] text-[16px]">verified</span>
                              <span className="font-serif font-black text-[6.5px] tracking-tight uppercase text-[#423107] leading-none mt-0.5">
                                APEX TECH
                              </span>
                              <span className="font-mono text-[5.5px] text-[#423107] font-semibold">VERIFIED</span>
                            </div>
                          </div>
                          <span className="font-serif text-[7.5px] text-[#B48C36] tracking-widest uppercase font-bold mt-1">
                            OFFICIAL SEAL
                          </span>
                        </div>

                        {/* Right: Signatures Block */}
                        <div
                          onClick={() => setSelectedElement('signatures')}
                          className={`flex items-center gap-6 cursor-pointer rounded p-1 transition-all ${
                            selectedElement === 'signatures' ? 'ring-2 ring-primary/40' : ''
                          }`}
                        >
                          {/* Signature 1 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="h-8 flex items-center">
                              <svg
                                className="w-24 h-6 text-[#1E3A8A]"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="1.8"
                                viewBox="0 0 100 30"
                              >
                                <path d="M5 22 C 20 8, 25 25, 40 12 C 55 0, 48 28, 70 15 C 80 10, 85 24, 95 18"></path>
                              </svg>
                            </div>
                            <div className="w-28 border-t border-[#0F172A] pt-1">
                              <span className="block font-serif text-[9.5px] font-bold text-[#0F172A]">
                                Rajesh Sharma
                              </span>
                              <span className="block text-[8px] text-[#64748B]">Director of Institutions</span>
                            </div>
                          </div>

                          {/* Signature 2 */}
                          <div className="flex flex-col items-center text-center">
                            <div className="h-8 flex items-center">
                              <svg
                                className="w-24 h-6 text-[#1E3A8A]"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="1.8"
                                viewBox="0 0 100 30"
                              >
                                <path d="M10 18 C 18 5, 30 25, 45 10 C 60 -5, 52 28, 75 14 C 82 8, 88 20, 92 12"></path>
                              </svg>
                            </div>
                            <div className="w-28 border-t border-[#0F172A] pt-1">
                              <span className="block font-serif text-[9.5px] font-bold text-[#0F172A]">
                                Amit Sharma
                              </span>
                              <span className="block text-[8px] text-[#64748B]">Academic Dean</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Cryptographic Ledger Hash */}
                      <div className="relative z-10 flex items-center justify-between text-[7px] text-[#94A3B8] font-mono pt-1 border-t border-[#CBD5E1]/40 px-2">
                        <span>Certificate UID: CERT-APX-2026-00125</span>
                        <span>
                          Tamper-evident cryptographic signature SHA-256:
                          e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                        </span>
                        <span>Apex Academic Vault</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMN 3: Properties & Typography Inspector (3 cols) */}
                <div className="xl:col-span-3 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-outline-variant/30 flex flex-col gap-space-md">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b pb-space-xs border-surface-container">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                        <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                          Properties Inspector
                        </span>
                      </div>
                      <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold">
                        Active Layer
                      </span>
                    </div>

                    {/* Selected Element Name */}
                    <div className="bg-surface-container-low p-2.5 rounded-lg flex items-center justify-between border border-outline-variant/20">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
                          Selected Element
                        </span>
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">
                          {selectedElement === 'student_name' && 'Student Name (Dynamic)'}
                          {selectedElement === 'course_title' && 'Course & Specialization (Dynamic)'}
                          {selectedElement === 'institution' && 'Institution Crest & Header'}
                          {selectedElement === 'seal' && 'Embossed Official Stamp'}
                          {selectedElement === 'signatures' && 'Dual Authority Signatures'}
                          {selectedElement === 'qr' && 'Verification QR (SHA-256)'}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-primary text-[18px]">lock_open</span>
                    </div>

                    {/* Dynamic Text Editor if text element selected */}
                    {selectedElement === 'student_name' && (
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                          Preview Text / Binding
                        </label>
                        <input
                          type="text"
                          value={studentTextValue}
                          onChange={(e) => setStudentTextValue(e.target.value)}
                          className="bg-surface-container-low border border-outline-variant/30 rounded-lg px-2.5 py-1.5 font-serif text-body-md text-on-surface focus:outline-none focus:border-primary"
                        />
                      </div>
                    )}

                    {/* Typography Controls */}
                    <div className="flex flex-col gap-space-sm">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
                        Typography
                      </span>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">Font Family</label>
                        <div className="relative">
                          <select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className="w-full bg-surface-container-low rounded-lg px-space-sm py-2 font-serif font-semibold text-on-surface text-body-sm appearance-none cursor-pointer border border-outline-variant/20 focus:outline-none"
                          >
                            <option value="Cinzel / Playfair Display">Cinzel / Playfair Display</option>
                            <option value="Great Vibes / Signature">Great Vibes / Calligraphy</option>
                            <option value="Inter / Sans-Serif">Inter / Clean Modern</option>
                            <option value="Merriweather / Formal Serif">Merriweather / Formal Serif</option>
                          </select>
                          <span className="material-symbols-outlined text-outline text-[18px] absolute right-2.5 top-2.5 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface-variant">Font Size</label>
                          <div className="flex items-center bg-surface-container-low rounded-lg px-2 py-1.5 border border-outline-variant/20">
                            <input
                              className="bg-transparent font-data-mono text-data-mono text-on-surface w-full focus:outline-none"
                              type="number"
                              value={fontSize}
                              onChange={(e) => setFontSize(Number(e.target.value))}
                            />
                            <span className="font-label-sm text-label-sm text-outline">px</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface-variant">Weight</label>
                          <div className="relative">
                            <select
                              value={fontWeight}
                              onChange={(e) => setFontWeight(e.target.value)}
                              className="w-full bg-surface-container-low rounded-lg px-2 py-1.5 font-label-sm text-label-sm font-bold text-on-surface appearance-none cursor-pointer border border-outline-variant/20 focus:outline-none"
                            >
                              <option value="Bold (700)">Bold (700)</option>
                              <option value="SemiBold (600)">SemiBold (600)</option>
                              <option value="Medium (500)">Medium (500)</option>
                              <option value="Regular (400)">Regular (400)</option>
                            </select>
                            <span className="material-symbols-outlined text-outline text-[16px] absolute right-1.5 top-2 pointer-events-none">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface-variant">Letter Spacing</label>
                          <div className="flex items-center bg-surface-container-low rounded-lg px-2 py-1.5 border border-outline-variant/20">
                            <input
                              className="bg-transparent font-data-mono text-data-mono text-on-surface w-full focus:outline-none"
                              type="text"
                              value={letterSpacing}
                              onChange={(e) => setLetterSpacing(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface-variant">Alignment</label>
                          <div className="flex items-center justify-around bg-surface-container-low rounded-lg p-1 border border-outline-variant/20">
                            <button
                              onClick={() => setAlignment('left')}
                              className={`p-1 rounded cursor-pointer ${
                                alignment === 'left'
                                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                                  : 'text-outline hover:text-on-surface'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[16px]">format_align_left</span>
                            </button>
                            <button
                              onClick={() => setAlignment('center')}
                              className={`p-1 rounded cursor-pointer ${
                                alignment === 'center'
                                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                                  : 'text-outline hover:text-on-surface'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[16px]">format_align_center</span>
                            </button>
                            <button
                              onClick={() => setAlignment('right')}
                              className={`p-1 rounded cursor-pointer ${
                                alignment === 'right'
                                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                                  : 'text-outline hover:text-on-surface'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[16px]">format_align_right</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Color Palette Picker for Text */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">Color Palette</label>
                        <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-lg border border-outline-variant/20">
                          <div
                            onClick={() => setSelectedColor('#0F172A')}
                            className={`w-6 h-6 rounded-md bg-[#0F172A] shadow-inner cursor-pointer ${
                              selectedColor === '#0F172A' ? 'ring-2 ring-primary' : ''
                            }`}
                          ></div>
                          <div
                            onClick={() => setSelectedColor('#B48C36')}
                            className={`w-6 h-6 rounded-md bg-[#B48C36] shadow-inner cursor-pointer ${
                              selectedColor === '#B48C36' ? 'ring-2 ring-primary' : ''
                            }`}
                          ></div>
                          <div
                            onClick={() => setSelectedColor('#004ac6')}
                            className={`w-6 h-6 rounded-md bg-[#004ac6] shadow-inner cursor-pointer ${
                              selectedColor === '#004ac6' ? 'ring-2 ring-primary' : ''
                            }`}
                          ></div>
                          <div
                            onClick={() => setSelectedColor('#334155')}
                            className={`w-6 h-6 rounded-md bg-[#334155] shadow-inner cursor-pointer ${
                              selectedColor === '#334155' ? 'ring-2 ring-primary' : ''
                            }`}
                          ></div>
                          <span className="font-mono text-data-mono text-on-surface font-semibold ml-auto">
                            {selectedColor}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Position & Layering */}
                    <div className="flex flex-col gap-space-sm pt-space-xs border-t border-outline-variant/20">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
                        Canvas Positioning
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-surface-container-low p-2 rounded-lg flex items-center justify-between border border-outline-variant/20">
                          <span className="font-label-sm text-label-sm text-outline">X Axis</span>
                          <span className="font-data-mono text-data-mono text-on-surface font-semibold">
                            {posX} mm
                          </span>
                        </div>
                        <div className="bg-surface-container-low p-2 rounded-lg flex items-center justify-between border border-outline-variant/20">
                          <span className="font-label-sm text-label-sm text-outline">Y Axis</span>
                          <span className="font-data-mono text-data-mono text-on-surface font-semibold">
                            {posY} mm
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onShowToast('Moved layer one level forward')}
                          className="flex-1 py-1.5 bg-surface-container-low hover:bg-surface-container-high rounded text-on-surface font-label-sm text-label-sm flex items-center justify-center gap-1 cursor-pointer border border-outline-variant/20"
                        >
                          <span className="material-symbols-outlined text-[16px]">flip_to_front</span>
                          <span>Bring Forward</span>
                        </button>
                        <button
                          onClick={() => onShowToast('Moved layer one level backward')}
                          className="flex-1 py-1.5 bg-surface-container-low hover:bg-surface-container-high rounded text-on-surface font-label-sm text-label-sm flex items-center justify-center gap-1 cursor-pointer border border-outline-variant/20"
                        >
                          <span className="material-symbols-outlined text-[16px]">flip_to_back</span>
                          <span>Send Backward</span>
                        </button>
                      </div>
                    </div>

                    {/* Document Global Settings Accordion */}
                    <div className="flex flex-col gap-space-sm pt-space-xs border-t border-outline-variant/20">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold uppercase tracking-wider">
                        Global Certificate Spec
                      </span>
                      <div className="space-y-2">
                        <div className="flex flex-col">
                          <span className="text-[11px] text-outline">Template Title</span>
                          <input
                            type="text"
                            value={templateTitle}
                            onChange={(e) => setTemplateTitle(e.target.value)}
                            className="font-body-md text-body-md text-on-surface font-medium bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center justify-between py-1">
                          <span className="text-[11px] text-outline">Cryptographic Public Ledger</span>
                          <button
                            onClick={() => {
                              setIsCryptographicLedgerEnabled(!isCryptographicLedgerEnabled);
                              onShowToast(`Public Ledger Signature: ${!isCryptographicLedgerEnabled ? 'Enabled' : 'Disabled'}`);
                            }}
                            className={`flex items-center gap-1 font-label-sm text-label-sm font-bold cursor-pointer ${
                              isCryptographicLedgerEnabled ? 'text-secondary' : 'text-outline'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {isCryptographicLedgerEnabled ? 'lock' : 'lock_open'}
                            </span>
                            <span>{isCryptographicLedgerEnabled ? 'Enabled' : 'Disabled'}</span>
                          </button>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[11px] text-outline">UID Mask Pattern</span>
                          <span className="font-mono text-[11px] text-primary bg-surface-container-high px-2 py-1 rounded">
                            {uidPattern}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-1">
                          <span className="text-[11px] text-outline">Authorized Issuance</span>
                          <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                            All 8 Campuses
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB VIEW 2: TEMPLATE GALLERY */}
            {activeTab === 'gallery' && (
              <div className="p-gutter-desktop max-w-[1400px] mx-auto w-full flex flex-col gap-space-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30">
                  <div>
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Template Gallery ({TEMPLATE_GALLERY.length})
                    </h2>
                    <p className="font-body-sm text-body-sm text-outline mt-0.5">
                      Production-ready multi-campus academic designs with anti-counterfeit QR codes and signatures.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('canvas');
                      onShowToast('Created new blank canvas from preset.');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span>+ New Custom Template</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
                  {TEMPLATE_GALLERY.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                    >
                      {/* Mini Certificate Card Header */}
                      <div className="h-36 bg-[#FCFBF7] p-3 flex flex-col justify-between relative border-b border-outline-variant/20 overflow-hidden">
                        <div
                          className="absolute inset-2 border-2 border-dashed pointer-events-none opacity-40"
                          style={{ borderColor: tpl.previewColor }}
                        ></div>
                        <div className="flex items-center justify-between z-10">
                          <span
                            className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: `${tpl.previewColor}15`,
                              color: tpl.previewColor,
                            }}
                          >
                            {tpl.version}
                          </span>
                          <span className="font-label-sm text-[10px] uppercase font-semibold text-outline">
                            {tpl.category}
                          </span>
                        </div>
                        <div className="text-center z-10">
                          <span className="font-serif text-xs font-bold text-[#0F172A] block line-clamp-1">
                            {tpl.title}
                          </span>
                          <span className="text-[9px] text-[#B48C36] font-serif italic block">
                            Apex Institute of Technology
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[8px] font-mono text-outline z-10">
                          <span>Verified QR Code</span>
                          <span>Dual E-Sign</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-space-sm flex flex-col gap-2">
                        <div>
                          <h3 className="font-headline-sm text-[14px] font-bold text-on-surface line-clamp-1">
                            {tpl.title}
                          </h3>
                          <span className="font-body-sm text-[11px] text-outline flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">domain</span>
                            {tpl.campuses}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-outline pt-1 border-t border-outline-variant/20">
                          <span>Mod: {tpl.lastModified}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              tpl.status === 'published'
                                ? 'bg-secondary-fixed text-on-secondary-fixed'
                                : tpl.status === 'draft'
                                ? 'bg-surface-container text-on-surface-variant'
                                : 'bg-outline-variant text-on-surface'
                            }`}
                          >
                            {tpl.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => {
                              setTemplateTitle(tpl.title);
                              setActiveTab('canvas');
                              onShowToast(`Loaded "${tpl.title}" into Visual Canvas Editor`);
                            }}
                            className="flex-1 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary rounded text-label-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                            <span>Open in Editor</span>
                          </button>
                          <button
                            onClick={() => {
                              setIsPreviewModalOpen(true);
                              setTemplateTitle(tpl.title);
                            }}
                            className="p-1.5 bg-surface-container-low hover:bg-surface-container-high text-on-surface rounded transition-colors cursor-pointer"
                            title="Preview Template"
                          >
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB VIEW 3: PUBLISHED TEMPLATES */}
            {activeTab === 'published' && (
              <div className="p-gutter-desktop max-w-[1400px] mx-auto w-full flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Published Templates (5)
                    </h2>
                    <p className="font-body-sm text-body-sm text-outline mt-0.5">
                      Active templates deployed to registrars across all 8 branches for instant batch issuance.
                    </p>
                  </div>
                  <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    5 Live on Ledger
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {TEMPLATE_GALLERY.filter((t) => t.status === 'published').map((tpl) => (
                    <div
                      key={tpl.id}
                      className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-space-md shadow-xs flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[11px] font-mono text-secondary font-bold uppercase">
                            {tpl.version} • Published
                          </span>
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-1">
                            {tpl.title}
                          </h3>
                          <span className="font-body-sm text-[12px] text-outline">{tpl.campuses}</span>
                        </div>
                        <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-outline border-t border-outline-variant/20 pt-2">
                        <span>Last issued: Today, 11:30 AM</span>
                        <span className="font-medium text-on-surface">1,240 Issued</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setTemplateTitle(tpl.title);
                            setActiveTab('canvas');
                            onShowToast(`Loaded ${tpl.title} for editing.`);
                          }}
                          className="flex-1 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold text-center hover:bg-primary/90 transition-all cursor-pointer"
                        >
                          Modify Layout
                        </button>
                        <button
                          onClick={() => onNavigate('certificates')}
                          className="px-3 py-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface rounded-lg text-label-md font-medium transition-colors cursor-pointer"
                        >
                          Issue Batch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB VIEW 4: DRAFTS */}
            {activeTab === 'drafts' && (
              <div className="p-gutter-desktop max-w-[1400px] mx-auto w-full flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Draft Templates (3)
                    </h2>
                    <p className="font-body-sm text-body-sm text-outline mt-0.5">
                      Work-in-progress layouts pending academic committee sign-off.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {TEMPLATE_GALLERY.filter((t) => t.status === 'draft').map((tpl) => (
                    <div
                      key={tpl.id}
                      className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-space-md shadow-xs flex flex-col justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] font-mono text-outline font-semibold uppercase">
                          {tpl.version} • Draft
                        </span>
                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-1">
                          {tpl.title}
                        </h3>
                        <span className="font-body-sm text-[12px] text-outline">{tpl.campuses}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setTemplateTitle(tpl.title);
                            setActiveTab('canvas');
                            onShowToast(`Resumed draft for ${tpl.title}`);
                          }}
                          className="flex-1 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold text-center hover:bg-primary/90 transition-all cursor-pointer"
                        >
                          Resume Editing
                        </button>
                        <button
                          onClick={handlePublishTemplate}
                          className="px-3 py-2 bg-secondary-fixed text-on-secondary-fixed rounded-lg text-label-md font-semibold hover:bg-secondary-fixed-dim transition-colors cursor-pointer"
                        >
                          Publish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB VIEW 5: ARCHIVED */}
            {activeTab === 'archived' && (
              <div className="p-gutter-desktop max-w-[1400px] mx-auto w-full flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest p-space-md rounded-xl border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Archived Templates (1)
                    </h2>
                    <p className="font-body-sm text-body-sm text-outline mt-0.5">
                      Legacy layouts retained for retrospective credential audits.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {TEMPLATE_GALLERY.filter((t) => t.status === 'archived').map((tpl) => (
                    <div
                      key={tpl.id}
                      className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-space-md shadow-xs opacity-80"
                    >
                      <span className="text-[11px] font-mono text-outline uppercase">{tpl.version} • Retired</span>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-1">
                        {tpl.title}
                      </h3>
                      <p className="text-xs text-outline mt-1">
                        Archived on 15 Jul 2025. Not available for new issuances.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 4. LIVE SAMPLE PREVIEW MODAL */}
      {isPreviewModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <div
            className="bg-surface-container-lowest w-full max-w-4xl rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md max-h-[92vh] overflow-y-auto border border-outline-variant/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    Sample Certificate Render
                  </h3>
                  <p className="font-body-sm text-body-sm text-outline">
                    Live dynamic merge tag resolution simulation with cryptographic ledger preview
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-2 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Candidate Selector Ribbon */}
            <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between flex-wrap gap-3 border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                  {sampleStudent.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">
                      Sample Candidate: {sampleStudent.name}
                    </span>
                    {/* Switch Candidate Dropdown */}
                    <select
                      value={sampleStudent.name}
                      onChange={(e) => {
                        const targetName = e.target.value;
                        if (targetName === 'Rahul Kumar') {
                          setSampleStudent({
                            name: 'Rahul Kumar',
                            roll: 'ABC-SIL-26-00125',
                            batch: 'AY 2025-26',
                            course: 'Full Stack Web Development',
                            grade: 'Grade A with Distinction',
                          });
                        } else if (targetName === 'Ananya Sen') {
                          setSampleStudent({
                            name: 'Ananya Sen',
                            roll: 'ABC-SIL-26-00126',
                            batch: 'AY 2025-26',
                            course: 'UI/UX & Design Systems',
                            grade: 'Grade A',
                          });
                        } else {
                          setSampleStudent({
                            name: 'Priyansh Roy',
                            roll: 'ABC-SIL-26-00127',
                            batch: 'AY 2025-26',
                            course: 'Data Science & AI',
                            grade: 'Grade A+',
                          });
                        }
                      }}
                      className="bg-surface-container-lowest border border-outline-variant/30 rounded px-2 py-0.5 text-xs text-on-surface font-medium cursor-pointer"
                    >
                      <option value="Rahul Kumar">Rahul Kumar</option>
                      <option value="Ananya Sen">Ananya Sen</option>
                      <option value="Priyansh Roy">Priyansh Roy</option>
                    </select>
                  </div>
                  <span className="block font-mono text-[11px] text-outline">
                    Roll: {sampleStudent.roll} • Batch: {sampleStudent.batch} • Course: {sampleStudent.course}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintSample}
                  className="px-3 py-1.5 bg-surface-container text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-1 cursor-pointer border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>Print Test PDF</span>
                </button>
                <button
                  onClick={handleExportVector}
                  className="px-3 py-1.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-xs flex items-center gap-1 hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">file_download</span>
                  <span>Export Vector</span>
                </button>
              </div>
            </div>

            {/* Rendered Certificate Sheet */}
            <div className="border border-outline-variant/30 rounded-xl p-6 bg-[#FCFBF7] shadow-inner relative flex flex-col justify-between aspect-[1.414/1] max-w-[720px] mx-auto text-center">
              {/* Inner guilloche border */}
              <div className="absolute inset-2 border-2 border-[#0F172A] rounded-xs pointer-events-none"></div>
              <div className="absolute inset-3 border border-[#B48C36] rounded-xs pointer-events-none"></div>

              {/* Header */}
              <div className="relative z-10 flex flex-col items-center mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B48C36] to-[#E5C158] flex items-center justify-center text-white font-serif font-bold text-sm">
                    A
                  </div>
                  <span className="font-serif text-[13px] font-bold tracking-widest text-[#0F172A] uppercase">
                    Apex Institute of Technology &amp; Skills
                  </span>
                </div>
                <h4 className="font-serif text-[17px] font-bold text-[#0F172A] uppercase tracking-wider border-b border-[#B48C36] pb-0.5">
                  Certificate of Merit &amp; Completion
                </h4>
                <p className="font-serif italic text-[11px] text-[#434655] mt-0.5">
                  This is to officially certify that
                </p>
              </div>

              {/* Center */}
              <div className="relative z-10 my-2">
                <h2 className="font-serif text-[26px] font-bold text-[#0F172A] underline decoration-[#B48C36] decoration-1 underline-offset-6">
                  {sampleStudent.name}
                </h2>
                <p className="font-serif text-[10px] text-[#334155] max-w-[480px] mx-auto leading-relaxed mt-1.5">
                  has successfully completed the comprehensive professional curriculum in{' '}
                  <span className="font-semibold text-[#0F172A]">{sampleStudent.course}</span> with{' '}
                  <span className="font-semibold text-[#0F172A]">{sampleStudent.grade}</span> at the Siliguri Campus
                  during Academic Year 2025–26.
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 flex items-end justify-between px-4 pb-1 text-left">
                <div className="flex items-center gap-1.5">
                  <div className="w-10 h-10 bg-white p-0.5 rounded border border-[#CBD5E1] shadow-xs flex items-center justify-center">
                    <svg className="w-full h-full text-[#0F172A]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm-3 2h2v2h-2v-2zm2 2h2v2h-2v-2zm3-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-5 0h2v2h-2v-2zm-2-4h2v2h-2v-2z"></path>
                    </svg>
                  </div>
                  <span className="text-[7.5px] font-mono text-[#475569] leading-tight">
                    UID: {sampleStudent.roll}
                    <br />
                    edumanage.io/verify
                  </span>
                </div>

                {/* Gold Seal */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B48C36] to-[#8C6D23] flex items-center justify-center text-white text-[8px] font-serif font-bold shadow-xs">
                    OFFICIAL
                  </div>
                </div>

                {/* Signatures */}
                <div className="text-right">
                  <span className="block font-serif text-[8.5px] font-bold text-[#0F172A]">Rajesh Sharma</span>
                  <span className="block text-[7px] text-[#64748B]">Director of Institutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
