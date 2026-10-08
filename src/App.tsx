import React, { useState } from 'react';
import { ScreenType, RegistrationFormData } from './types';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { RegistrationStep1 } from './components/RegistrationStep1';
import { CampusOnboardingStep2 } from './components/CampusOnboardingStep2';
import { SuperAdminConsole } from './components/SuperAdminConsole';
import { AdmissionsEnquiriesScreen } from './components/AdmissionsEnquiriesScreen';
import { CoursesBatchesScreen } from './components/CoursesBatchesScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { StudentProfileScreen } from './components/StudentProfileScreen';
import { StudentsDirectoryScreen } from './components/StudentsDirectoryScreen';
import { CertificatesConsoleScreen } from './components/CertificatesConsoleScreen';
import { CertificateTemplateStudioScreen } from './components/CertificateTemplateStudioScreen';
import { ExamsAssessmentsScreen } from './components/ExamsAssessmentsScreen';
import { MarksEntryConsoleScreen } from './components/MarksEntryConsoleScreen';
import { ResultsReportCardsScreen } from './components/ResultsReportCardsScreen';
import { AssignmentsCourseworkScreen } from './components/AssignmentsCourseworkScreen';
import { ParentPortalScreen } from './components/ParentPortalScreen';
import { StudentPortalScreen } from './components/StudentPortalScreen';
import { TeacherPortalScreen } from './components/TeacherPortalScreen';
import { TimetableScheduleScreen } from './components/TimetableScheduleScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    try {
      const saved = localStorage.getItem('edumanage_current_screen');
      if (saved) return saved as ScreenType;
    } catch {}
    return 'landing';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleNavigate = (screen: ScreenType) => {
    try {
      localStorage.setItem('edumanage_current_screen', screen);
    } catch {}
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [registrationData, setRegistrationData] = useState<RegistrationFormData>({
    institutionType: 'School (K-12)',
    institutionName: 'Apex International Academy',
    adminName: 'Dr. Sarah Jenkins',
    workEmail: 'sarah@apexacademy.edu',
    countryCode: '+91',
    phoneNumber: '98765 43210',
    password: '',
    confirmPassword: '',
    agreeToTerms: true,
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => (prev === message ? null : prev));
    }, 4000);
  };

  const handleUpdateRegistration = (data: Partial<RegistrationFormData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans antialiased selection:bg-primary-fixed selection:text-on-primary-fixed transition-colors duration-200 pb-16 md:pb-0">
        {/* Global Navigation & Screen Switcher */}
        <Navigation
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />

      {/* Screen Views */}
      {currentScreen === 'timetable-schedule' && (
        <TimetableScheduleScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'teacher-portal' && (
        <TeacherPortalScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'student-portal' && (
        <StudentPortalScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'parent-portal' && (
        <ParentPortalScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'assignments-coursework' && (
        <AssignmentsCourseworkScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'results-transcripts' && (
        <ResultsReportCardsScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'marks-entry' && (
        <MarksEntryConsoleScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'academics' && (
        <ExamsAssessmentsScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'certificates' && (
        <CertificatesConsoleScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'certificate-studio' && (
        <CertificateTemplateStudioScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'students-directory' && (
        <StudentsDirectoryScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'student-profile' && (
        <StudentProfileScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'courses-batches' && (
        <CoursesBatchesScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'admissions' && (
        <AdmissionsEnquiriesScreen
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'landing' && (
        <LandingPage
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {currentScreen === 'register' && (
        <RegistrationStep1
          onNavigate={handleNavigate}
          onShowToast={showToast}
          onSaveData={handleUpdateRegistration}
          initialData={registrationData}
        />
      )}

      {currentScreen === 'onboarding' && (
        <CampusOnboardingStep2
          onNavigate={handleNavigate}
          onShowToast={showToast}
          regData={registrationData}
        />
      )}

      {currentScreen === 'admin' && (
        <SuperAdminConsole
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-3 md:right-6 left-3 sm:left-auto z-[100] max-w-md bg-on-surface text-surface-container-lowest px-4 py-3 rounded-xl shadow-2xl border border-outline-variant/30 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-7 h-7 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-sm">check_circle</span>
          </div>
          <p className="text-xs font-medium leading-normal flex-1">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
