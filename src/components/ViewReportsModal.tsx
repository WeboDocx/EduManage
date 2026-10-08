import React, { useState } from 'react';
import { ScreenType } from '../types';

interface ViewReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const ViewReportsModal: React.FC<ViewReportsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'financial' | 'attendance' | 'admissions'>('financial');

  if (!isOpen) return null;

  const downloadCSV = (filename: string, headers: string[], rows: string[][]) => {
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast(`Report downloaded: ${filename}.csv`);
  };

  const handleDownloadFinancialReport = () => {
    downloadCSV(
      'financial_collection_report',
      ['Transaction ID', 'Student Name', 'Course', 'Campus', 'Mode', 'Amount (INR)', 'Time', 'Status'],
      [
        ['RCP-2025-8812', 'Priya Sharma', 'Tally Prime & GST', 'Siliguri HQ', 'UPI / QR', '10000', '10:45 AM', 'Settled'],
        ['RCP-2025-8811', 'Rahul Kumar', 'Web Development', 'Siliguri HQ', 'Cash', '12500', '10:15 AM', 'Counter Verified'],
        ['RCP-2025-8810', 'Amitav Roy', 'Tally Prime', 'Jalpaiguri', 'UPI / QR', '10000', '09:30 AM', 'Settled'],
        ['RCP-2025-8809', 'Sneha Das', 'Digital Marketing', 'Binnaguri', 'Card / POS', '15000', 'Yesterday', 'Settled'],
        ['RCP-2025-8808', 'Vikram Sen', 'Python AI Data', 'Siliguri HQ', 'NetBanking', '18000', 'Yesterday', 'Settled'],
      ]
    );
  };

  const handleDownloadAttendanceReport = () => {
    downloadCSV(
      'campus_attendance_report',
      ['Batch Code', 'Course Title', 'Campus', 'Total Students', 'Present Today', 'Attendance Rate', 'Faculty'],
      [
        ['WD-EV-02', 'Web Development Evening', 'Siliguri HQ', '32', '31', '96.8%', 'Dr. Rajesh K.'],
        ['DM-MR-01', 'Digital Marketing Morning', 'Binnaguri Hub', '28', '26', '92.8%', 'Priya Sen'],
        ['TP-WK-01', 'Tally Prime & GST Weekend', 'Jalpaiguri', '30', '28', '93.3%', 'Animesh Ghosh'],
        ['GD-EV-01', 'Graphic & UI Design', 'Siliguri HQ', '25', '24', '96.0%', 'Subhadip Roy'],
        ['PY-MR-01', 'Python & AI Data Science', 'Cooch Behar', '24', '22', '91.6%', 'Moumita Paul'],
      ]
    );
  };

  const handleDownloadAdmissionsReport = () => {
    downloadCSV(
      'admissions_pipeline_report',
      ['Lead ID', 'Candidate Name', 'Program Interest', 'Preferred Campus', 'Lead Source', 'Stage', 'Counselor'],
      [
        ['LD-9901', 'Tanmay Sen', 'Web Development', 'Siliguri HQ', 'Google Ads', 'Enrolled', 'Sarah Jenkins'],
        ['LD-9902', 'Rituja Barman', 'Graphic Design', 'Jalpaiguri', 'Walk-in', 'Enrolled', 'Sarah Jenkins'],
        ['LD-9903', 'Deepak Verma', 'Tally Prime', 'Binnaguri Hub', 'Referral', 'Demo Scheduled', 'Arun Paul'],
        ['LD-9904', 'Kavita Das', 'Digital Marketing', 'Siliguri HQ', 'Instagram', 'Counseling Pending', 'Pooja Bose'],
        ['LD-9905', 'Samir Roy', 'Python & AI', 'Siliguri HQ', 'Website Direct', 'Enrolled', 'Sarah Jenkins'],
      ]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-150 my-6">
        {/* Header */}
        <div className="px-5 py-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Institution Reports & Analytics</h3>
              <p className="text-[11px] text-outline">Real-time financial, cohort & admission metrics</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-outline-variant/15 flex items-center gap-2 bg-surface-container-low/20">
          <button
            onClick={() => setActiveTab('financial')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'financial'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-surface-container-lowest'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">payments</span>
            <span>Fee Collections</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'attendance'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-surface-container-lowest'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
            <span>Cohort Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'admissions'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-surface-container-lowest'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">contact_support</span>
            <span>Admissions Pipeline</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          {/* TAB 1: FINANCIAL */}
          {activeTab === 'financial' && (
            <div className="space-y-4">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Today Realized</span>
                  <p className="text-base font-bold text-on-surface font-mono mt-0.5">₹84,500</p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">trending_up</span> +14.2% vs yesterday
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">MTD Collections</span>
                  <p className="text-base font-bold text-on-surface font-mono mt-0.5">₹18,42,000</p>
                  <span className="text-[10px] text-primary">82% of monthly target</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Pending Receivables</span>
                  <p className="text-base font-bold text-amber-600 dark:text-amber-400 font-mono mt-0.5">₹2,15,000</p>
                  <span className="text-[10px] text-outline">Across 22 students</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Cashier Audit</span>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Verified</p>
                  <span className="text-[10px] text-outline">Day shift closed</span>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="border border-outline-variant/25 rounded-xl overflow-hidden">
                <div className="px-3.5 py-2.5 bg-surface-container-low/70 border-b border-outline-variant/20 flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface">Payment Mode Distribution</span>
                  <span className="text-[10px] font-mono text-outline">Real-time sync</span>
                </div>
                <div className="divide-y divide-outline-variant/15 text-xs">
                  <div className="px-3.5 py-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">qr_code_2</span>
                      <span>UPI & QR Direct (PhonePe / GPay)</span>
                    </span>
                    <span className="font-mono font-semibold">₹54,080 (64.0%)</span>
                  </div>
                  <div className="px-3.5 py-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-amber-600">payments</span>
                      <span>Cash Counter Receipts</span>
                    </span>
                    <span className="font-mono font-semibold">₹18,590 (22.0%)</span>
                  </div>
                  <div className="px-3.5 py-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-indigo-600">credit_card</span>
                      <span>Debit/Credit POS Terminal</span>
                    </span>
                    <span className="font-mono font-semibold">₹11,830 (14.0%)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('dashboard');
                  }}
                  className="text-xs text-outline hover:text-on-surface"
                >
                  View Cashier Ledger in Dashboard
                </button>
                <button
                  onClick={handleDownloadFinancialReport}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Export Collection CSV</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Overall Attendance</span>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">94.2%</p>
                  <span className="text-[10px] text-outline">Across 8 Campuses</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Active Batches</span>
                  <p className="text-xl font-bold text-on-surface font-mono mt-0.5">18</p>
                  <span className="text-[10px] text-outline">480 Students seated</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Faculty Attendance</span>
                  <p className="text-xl font-bold text-primary font-mono mt-0.5">100%</p>
                  <span className="text-[10px] text-outline">14/14 Lecturers active</span>
                </div>
              </div>

              {/* Campus Attendance Breakdown */}
              <div className="border border-outline-variant/25 rounded-xl overflow-hidden">
                <div className="px-3.5 py-2 bg-surface-container-low/70 border-b border-outline-variant/20 font-bold text-xs">
                  Campus Health Breakdown
                </div>
                <div className="p-3.5 space-y-2.5">
                  {[
                    { campus: 'Siliguri HQ Campus', rate: 96, present: '142 / 148', color: 'bg-emerald-500' },
                    { campus: 'Binnaguri Satellite Hub', rate: 94, present: '88 / 94', color: 'bg-emerald-500' },
                    { campus: 'Jalpaiguri City Centre', rate: 91, present: '110 / 121', color: 'bg-emerald-500' },
                    { campus: 'Cooch Behar Branch', rate: 88, present: '74 / 84', color: 'bg-amber-500' },
                  ].map(item => (
                    <div key={item.campus} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-on-surface">{item.campus}</span>
                        <span className="font-mono text-outline">{item.present} ({item.rate}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleDownloadAttendanceReport}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Export Attendance CSV</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ADMISSIONS PIPELINE */}
          {activeTab === 'admissions' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Active Inquiries</span>
                  <p className="text-xl font-bold text-on-surface font-mono mt-0.5">142</p>
                  <span className="text-[10px] text-outline">This month</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Confirmed Intakes</span>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">48</p>
                  <span className="text-[10px] text-emerald-600 font-medium">33.8% Conversion</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-[10px] text-outline uppercase font-semibold">Top Program</span>
                  <p className="text-sm font-bold text-on-surface truncate mt-1">Full Stack Web</p>
                  <span className="text-[10px] text-outline">42% of all seats</span>
                </div>
              </div>

              <div className="border border-outline-variant/25 rounded-xl p-3.5 space-y-2 bg-surface-container-low/40">
                <span className="font-bold text-xs text-on-surface block">Admission Lead Funnel</span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-surface-container">
                    <span className="text-[10px] text-outline block">1. Leads</span>
                    <span className="font-bold font-mono text-sm">142</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container">
                    <span className="text-[10px] text-outline block">2. Demo Attended</span>
                    <span className="font-bold font-mono text-sm">88</span>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container">
                    <span className="text-[10px] text-outline block">3. Offers Sent</span>
                    <span className="font-bold font-mono text-sm">62</span>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-[10px] text-primary block font-bold">4. Enrolled</span>
                    <span className="font-bold font-mono text-sm text-primary">48</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('admissions');
                  }}
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Admissions CRM</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </button>
                <button
                  onClick={handleDownloadAdmissionsReport}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Export Admissions CSV</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReportsModal;
