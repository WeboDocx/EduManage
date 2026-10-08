import { ScreenType } from '../types';

export type AdminActionType =
  | 'Student Added'
  | 'Certificate Issued'
  | 'Certificate Revoked'
  | 'Fee Recorded'
  | 'Course Created'
  | 'Student Status Changed'
  | 'Grade Published'
  | 'Security Audit'
  | 'Access Policy Enforced';

export type ActivityCategory =
  | 'all'
  | 'students'
  | 'certificates'
  | 'finance'
  | 'academics'
  | 'security';

export interface AdminActivityRecord {
  id: string;
  action: AdminActionType;
  category: 'students' | 'certificates' | 'finance' | 'academics' | 'security';
  actor: string;
  actorRole: string;
  actorAvatar?: string;
  target: string;
  targetId: string;
  details: string;
  timestamp: string; // ISO 8601
  timeFormatted: string;
  timeAgo: string;
  campus: string;
  securityHash: string; // SHA-256 tamper-evident hash
  securityLevel: 'Standard' | 'Elevated' | 'Critical Audit';
  status: 'Verified' | 'Pending Audit' | 'Flagged';
  ipAddress: string;
  deviceOrStation: string;
  metadata?: Record<string, string | number | boolean>;
  screenTarget?: ScreenType;
}

export interface ActivityFilterOptions {
  searchQuery: string;
  category: ActivityCategory;
  campus: string;
}
