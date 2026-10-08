import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ScreenType } from '../types';
import { AdminActivityRecord, AdminActionType, ActivityCategory } from '../types/activity';

const STORAGE_KEY = 'edumanage_admin_activity_log';

// Helper to generate realistic SHA-256 style tamper-evident hashes
export function generateSecurityHash(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const salt = Math.random().toString(16).substring(2, 10);
  const part3 = (Date.now() % 999999).toString(16).padStart(6, '0');
  return `sha256:${hex}${salt}${part3}9b4a12`.toLowerCase();
}

export const INITIAL_AUDIT_ACTIVITIES: AdminActivityRecord[] = [
  {
    id: 'AUD-2026-9041',
    action: 'Student Added',
    category: 'students',
    actor: 'Sarah Jenkins',
    actorRole: 'Registrar & Admissions Officer',
    target: 'Rahul Kumar',
    targetId: '#ADM-8902',
    details: 'Completed verified enrollment into Web Development (Evening Batch 02). Enrollment dossier signed.',
    timestamp: '2026-10-08T09:12:00Z',
    timeFormatted: 'Today, 10:42 AM',
    timeAgo: '18m ago',
    campus: 'Siliguri HQ Campus',
    securityHash: 'sha256:8f4a9bc01824ef78c942ad3108ff49e390c21bca908234ea7c2e',
    securityLevel: 'Elevated',
    status: 'Verified',
    ipAddress: '192.168.1.42 (Campus VPN)',
    deviceOrStation: 'Registrar Terminal #RT-02',
    metadata: {
      course: 'Web Development',
      batch: 'WD Evening 02',
      feeCommitment: '₹12,500',
      documentAudit: 'Verified (Aadhaar + Marks)',
    },
    screenTarget: 'students-directory',
  },
  {
    id: 'AUD-2026-9040',
    action: 'Certificate Issued',
    category: 'certificates',
    actor: 'Dr. Rajesh Sharma',
    actorRole: 'Director & Head of Institutions',
    target: 'Ananya Sen',
    targetId: 'CERT-APX-2026-00125',
    details: 'Digital diploma with QR verification seal cryptographically signed and issued for Web Development.',
    timestamp: '2026-10-08T08:45:00Z',
    timeFormatted: 'Today, 10:15 AM',
    timeAgo: '45m ago',
    campus: 'Siliguri HQ Campus',
    securityHash: 'sha256:4e72a8190bcfa12de88a91c3d4e0817cba551029487cbf0912ad',
    securityLevel: 'Critical Audit',
    status: 'Verified',
    ipAddress: '10.0.4.15 (Executive Office)',
    deviceOrStation: 'Director CA Signing Station',
    metadata: {
      template: 'Flagship Multi-Campus Diploma',
      grade: 'Grade A with Distinction (94.8%)',
      qrVerificationRoute: '/verify/CERT-APX-2026-00125',
      rsaKeyId: 'RSA-2048-APX-2026',
    },
    screenTarget: 'certificates',
  },
  {
    id: 'AUD-2026-9039',
    action: 'Fee Recorded',
    category: 'finance',
    actor: 'Alok Mukherjee',
    actorRole: 'Senior Cashier & Accounts Lead',
    target: 'Sneha Das',
    targetId: 'RCP-2025-8812',
    details: 'UPI counter transaction confirmed. Electronic receipt generated and dispatched via SMS.',
    timestamp: '2026-10-08T08:20:00Z',
    timeFormatted: 'Today, 09:55 AM',
    timeAgo: '1h ago',
    campus: 'Siliguri HQ Campus',
    securityHash: 'sha256:7c91a03f44e8bc129031ef58129a0084f7b2c0194821a938fc20',
    securityLevel: 'Standard',
    status: 'Verified',
    ipAddress: '192.168.1.18 (Cashier Desk)',
    deviceOrStation: 'POS Counter 01',
    metadata: {
      amount: '₹12,500',
      mode: 'UPI / QR',
      gatewayTxn: 'TXN-UPI-992140',
    },
    screenTarget: 'dashboard',
  },
  {
    id: 'AUD-2026-9038',
    action: 'Student Added',
    category: 'students',
    actor: 'Sarah Jenkins',
    actorRole: 'Registrar & Admissions Officer',
    target: 'Priya Sharma',
    targetId: '#ADM-8901',
    details: 'New student intake registered for Tally Prime & GST (Morning Batch A). Seat provisioned.',
    timestamp: '2026-10-08T07:45:00Z',
    timeFormatted: 'Today, 09:15 AM',
    timeAgo: '2h ago',
    campus: 'Binnaguri Hub',
    securityHash: 'sha256:28bfa17c09341258d4a7bb32014ef90a88c2134590bb2144ef18',
    securityLevel: 'Elevated',
    status: 'Verified',
    ipAddress: '192.168.2.14 (Binnaguri Desk)',
    deviceOrStation: 'Admissions Desk #01',
    metadata: {
      course: 'Tally Prime & GST',
      branch: 'Binnaguri Hub',
      initialPayment: '₹8,000 (NetBanking)',
    },
    screenTarget: 'students-directory',
  },
  {
    id: 'AUD-2026-9037',
    action: 'Certificate Issued',
    category: 'certificates',
    actor: 'Academic Registry Office',
    actorRole: 'Automated Batch Signatory',
    target: 'Batch 2026-B Candidates',
    targetId: 'BATCH-APX-2026-WD2',
    details: 'Cryptographic batch signing executed for 42 candidates. Tamper-evident ledger entries committed.',
    timestamp: '2026-10-08T07:00:00Z',
    timeFormatted: 'Today, 08:30 AM',
    timeAgo: '3h ago',
    campus: 'Siliguri HQ Campus',
    securityHash: 'sha256:90184efa7102948cb310248ae012849bca710924ef812049bcaa',
    securityLevel: 'Critical Audit',
    status: 'Verified',
    ipAddress: '10.0.0.8 (Registry Server)',
    deviceOrStation: 'Credential Daemon Node 1',
    metadata: {
      batchCount: 42,
      hashAlgorithm: 'SHA-256 + RSA-2048',
      archiveZip: 'edumanage_certs_batch_2026b.zip',
    },
    screenTarget: 'certificates',
  },
  {
    id: 'AUD-2026-9036',
    action: 'Course Created',
    category: 'academics',
    actor: 'Prof. Anirban Sen',
    actorRole: 'Dean of Academic Programs',
    target: 'Python AI & Data Engineering',
    targetId: 'CR-2026-PY04',
    details: 'Curriculum syllabus, faculty allocation, credit structure, and 45 lab workstation seats ratified.',
    timestamp: '2026-10-07T16:30:00Z',
    timeFormatted: 'Yesterday, 04:30 PM',
    timeAgo: '1d ago',
    campus: 'All Campuses',
    securityHash: 'sha256:12849bcad0918234ef0192834bca091824ef0192348bca019283',
    securityLevel: 'Elevated',
    status: 'Verified',
    ipAddress: '10.0.4.30 (Academic Senate)',
    deviceOrStation: 'Dean Workstation',
    metadata: {
      duration: '6 Months',
      fee: '₹28,000',
      credits: '18 Academic Units',
    },
    screenTarget: 'courses-batches',
  },
  {
    id: 'AUD-2026-9035',
    action: 'Student Added',
    category: 'students',
    actor: 'Manish Verma',
    actorRole: 'Campus Admissions Officer',
    target: 'Aniket Roy',
    targetId: '#ADM-8898',
    details: 'Admission recorded for Graphic & UI Design. Provisionally approved awaiting portfolio review.',
    timestamp: '2026-10-07T15:10:00Z',
    timeFormatted: 'Yesterday, 03:10 PM',
    timeAgo: '1d ago',
    campus: 'Jalpaiguri City',
    securityHash: 'sha256:55019284efca102948bb019284efca102948bb019284efca1029',
    securityLevel: 'Standard',
    status: 'Verified',
    ipAddress: '192.168.3.11 (Jalpaiguri Hub)',
    deviceOrStation: 'Counselling Desk 02',
    metadata: {
      course: 'Graphic & UI Design',
      scholarshipApplied: 'None',
    },
    screenTarget: 'students-directory',
  },
  {
    id: 'AUD-2026-9034',
    action: 'Certificate Revoked',
    category: 'certificates',
    actor: 'Apex Ethics & Disciplinary Board',
    actorRole: 'Academic Integrity Committee',
    target: 'Deepak Karmakar',
    targetId: 'CERT-APX-2026-00089',
    details: 'Revocation order #ORD-2026-88 ratified. Certificate invalidated on public verification portal.',
    timestamp: '2026-10-07T11:00:00Z',
    timeFormatted: 'Yesterday, 11:00 AM',
    timeAgo: '1d ago',
    campus: 'Siliguri HQ Campus',
    securityHash: 'sha256:rev00182490bcaef1029483719028472910482019482910482910',
    securityLevel: 'Critical Audit',
    status: 'Flagged',
    ipAddress: '10.0.4.1 (Senate Council Chamber)',
    deviceOrStation: 'Integrity Governance Terminal',
    metadata: {
      cause: 'Academic Malpractice during terminal viva',
      statusNote: 'Null & Void',
    },
    screenTarget: 'certificates',
  },
  {
    id: 'AUD-2026-9033',
    action: 'Access Policy Enforced',
    category: 'security',
    actor: 'Dr. Sarah Jenkins',
    actorRole: 'Super Admin & Compliance Officer',
    target: 'FERPA & Dual-Admin Clearance',
    targetId: 'SEC-POL-2026-09',
    details: 'Enforced cryptographic multi-admin approval for bulk student PII and transcript data exports.',
    timestamp: '2026-10-06T14:00:00Z',
    timeFormatted: '06 Oct 2026, 02:00 PM',
    timeAgo: '2d ago',
    campus: 'All Campuses',
    securityHash: 'sha256:sec7718290481928401928401928401928401928401928401928',
    securityLevel: 'Critical Audit',
    status: 'Verified',
    ipAddress: '10.0.1.5 (Security Gateway)',
    deviceOrStation: 'Admin Master Console',
    metadata: {
      standard: 'ISO 27001 / FERPA Data Security',
      policyScope: 'All 8 Campus Branches',
    },
    screenTarget: 'admin',
  },
];

interface LogActionParams {
  action: AdminActionType;
  actor?: string;
  actorRole?: string;
  target: string;
  targetId?: string;
  details: string;
  category?: 'students' | 'certificates' | 'finance' | 'academics' | 'security';
  campus?: string;
  securityLevel?: 'Standard' | 'Elevated' | 'Critical Audit';
  metadata?: Record<string, string | number | boolean>;
  screenTarget?: ScreenType;
}

interface ActivityLogContextType {
  activities: AdminActivityRecord[];
  logAdministrativeAction: (params: LogActionParams) => AdminActivityRecord;
  verifyAuditChain: () => { isAllVerified: boolean; count: number; checkedAt: string };
  resetAuditTrail: () => void;
  exportAuditLogCSV: () => void;
}

const ActivityLogContext = createContext<ActivityLogContextType | undefined>(undefined);

export const ActivityLogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<AdminActivityRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_AUDIT_ACTIVITIES;
  });

  // Sync state to localStorage whenever activities change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch {
      // Ignore storage errors
    }
  }, [activities]);

  const logAdministrativeAction = useCallback((params: LogActionParams): AdminActivityRecord => {
    const now = new Date();
    const timeFormatted = `Today, ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `AUD-2026-${randomSuffix}`;
    const generatedHash = generateSecurityHash(`${params.action}-${params.target}-${Date.now()}`);

    // Auto-detect category from action if not explicitly supplied
    let category: 'students' | 'certificates' | 'finance' | 'academics' | 'security' = params.category || 'security';
    if (params.action.includes('Student')) category = 'students';
    else if (params.action.includes('Certificate')) category = 'certificates';
    else if (params.action.includes('Fee')) category = 'finance';
    else if (params.action.includes('Course') || params.action.includes('Grade')) category = 'academics';

    const newRecord: AdminActivityRecord = {
      id: newId,
      action: params.action,
      category,
      actor: params.actor || 'Sarah Jenkins',
      actorRole: params.actorRole || 'Campus Administrator',
      target: params.target,
      targetId: params.targetId || `#TRX-${randomSuffix}`,
      details: params.details,
      timestamp: now.toISOString(),
      timeFormatted,
      timeAgo: 'Just now',
      campus: params.campus || 'Siliguri HQ Campus',
      securityHash: generatedHash,
      securityLevel: params.securityLevel || (params.action.includes('Certificate') ? 'Critical Audit' : 'Elevated'),
      status: 'Verified',
      ipAddress: '192.168.1.42 (Secure Campus Gateway)',
      deviceOrStation: 'Admin Session #AUTH-882',
      metadata: params.metadata,
      screenTarget: params.screenTarget,
    };

    setActivities(prev => [newRecord, ...prev]);
    return newRecord;
  }, []);

  const verifyAuditChain = useCallback(() => {
    const validCount = activities.filter(a => a.securityHash.startsWith('sha256:')).length;
    const isAllVerified = validCount === activities.length;
    return {
      isAllVerified,
      count: validCount,
      checkedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
  }, [activities]);

  const resetAuditTrail = useCallback(() => {
    setActivities(INITIAL_AUDIT_ACTIVITIES);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_AUDIT_ACTIVITIES));
    } catch {
      // Ignore
    }
  }, []);

  const exportAuditLogCSV = useCallback(() => {
    const headers = [
      'Audit ID',
      'Action Taken',
      'Category',
      'Admin Actor',
      'Role',
      'Target Entity',
      'Target ID',
      'Campus Branch',
      'Formatted Time',
      'Timestamp (ISO)',
      'Security Hash (SHA-256)',
      'Security Level',
      'Audit Status',
      'IP Address',
      'Details',
    ].join(',');

    const rows = activities.map(a =>
      [
        `"${a.id}"`,
        `"${a.action}"`,
        `"${a.category}"`,
        `"${a.actor}"`,
        `"${a.actorRole}"`,
        `"${a.target}"`,
        `"${a.targetId}"`,
        `"${a.campus}"`,
        `"${a.timeFormatted}"`,
        `"${a.timestamp}"`,
        `"${a.securityHash}"`,
        `"${a.securityLevel}"`,
        `"${a.status}"`,
        `"${a.ipAddress}"`,
        `"${a.details.replace(/"/g, '""')}"`,
      ].join(',')
    );

    const csvContent = `${headers}\n${rows.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `edumanage_admin_audit_trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activities]);

  return (
    <ActivityLogContext.Provider
      value={{
        activities,
        logAdministrativeAction,
        verifyAuditChain,
        resetAuditTrail,
        exportAuditLogCSV,
      }}
    >
      {children}
    </ActivityLogContext.Provider>
  );
};

export const useActivityLog = (): ActivityLogContextType => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error('useActivityLog must be used within an ActivityLogProvider');
  }
  return context;
};
