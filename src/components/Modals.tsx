import React, { useState } from 'react';
import { BranchLocation } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [branches, setBranches] = useState('1-3');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess(`Demo booked for ${name} (${institution})! Check ${email} for calendar invite.`);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-container-high relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-outline hover:text-on-surface p-1 rounded-lg"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">calendar_month</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">
              Book a 15-min Architecture Demo
            </h3>
            <p className="text-xs text-on-surface-variant">
              See multi-branch central sync & automated workflows live
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Your Full Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Rajesh Sharma"
              className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Official Work Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@academy.edu"
              className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Institution Name
            </label>
            <input
              required
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g. Apex Global School Network"
              className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Number of Campuses / Branches
            </label>
            <select
              value={branches}
              onChange={(e) => setBranches(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="1">1 Single Campus</option>
              <option value="2-5">2 - 5 Branches</option>
              <option value="6-15">6 - 15 Branches (Enterprise)</option>
              <option value="15+">15+ Nationwide Multi-Campus</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {loading ? 'Confirming...' : 'Schedule Live Walkthrough'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ApplyModalProps {
  branch: BranchLocation | null;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ branch, onClose, onSubmitSuccess }) => {
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('Grade 11 - STEM');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [loading, setLoading] = useState(false);

  if (!branch) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess(`Application #APP-${Math.floor(1000 + Math.random() * 9000)} submitted for ${studentName} at ${branch.name}!`);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-surface-container-high relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-outline hover:text-on-surface p-1 rounded-lg"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="mb-4">
          <span className="text-xs px-2 py-0.5 rounded bg-secondary-fixed text-secondary font-semibold">
            {branch.status}
          </span>
          <h3 className="font-headline-sm text-lg font-bold text-on-surface mt-2">
            Online Admission Application
          </h3>
          <p className="text-xs text-on-surface-variant">{branch.name}</p>
          <p className="text-[11px] text-outline mt-0.5">{branch.address}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Applicant / Student Name
            </label>
            <input
              required
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Target Program / Grade
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Grade 9 - Foundation</option>
              <option>Grade 10 - Secondary Prep</option>
              <option>Grade 11 - STEM & IIT Advanced</option>
              <option>Grade 12 - Senior Higher Secondary</option>
              <option>Undergraduate Diploma in AI/Tech</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Parent Phone
              </label>
              <input
                required
                type="tel"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Parent Email
              </label>
              <input
                required
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="parent@gmail.com"
                className="w-full text-sm px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface-variant flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">verified_user</span>
            <span>
              Real-time campus slot allocation. Verified SMS confirmation sent immediately.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-on-surface-variant hover:text-on-surface"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-primary-container text-white text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Admission Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
