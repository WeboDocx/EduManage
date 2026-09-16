import React, { useState, useMemo } from 'react';
import { ScreenType, RegistrationFormData } from '../types';
import { BRAND_HOTLINKS } from '../data/mockData';

interface RegistrationStep1Props {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
  onSaveData: (data: Partial<RegistrationFormData>) => void;
  initialData: RegistrationFormData;
}

export const RegistrationStep1: React.FC<RegistrationStep1Props> = ({
  onNavigate,
  onShowToast,
  onSaveData,
  initialData,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const pw = formData.password;
    if (!pw) return { score: 0, label: 'Too short', color: 'bg-outline-variant', width: '0%' };
    let score = 0;
    if (pw.length >= 8) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-error', width: '25%' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500', width: '50%' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500', width: '75%' };
    return { score: 4, label: 'Strong', color: 'bg-secondary', width: '100%' };
  }, [formData.password]);

  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsMismatch = formData.confirmPassword && formData.password !== formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      setErrorMsg('Please agree to the Terms of Service & Privacy Policy to continue.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your master password.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setErrorMsg('');
    onSaveData(formData);
    onShowToast(`Workspace reserved for ${formData.institutionName || 'Apex International Academy'}! Proceeding to campus setup.`);
    onNavigate('onboarding');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container-lowest grid grid-cols-1 lg:grid-cols-12 min-h-[750px]">
        {/* LEFT COLUMN: ENTERPRISE TRUST & SOCIAL PROOF (5 cols) */}
        <div className="lg:col-span-5 bg-[#0f172a] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-8">
            {/* Header Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-primary-fixed border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                Enterprise Onboarding
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mt-4 leading-snug">
                Start Managing Your Institution Smarter
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Join 1,200+ academic networks optimizing their operations, fees, and admissions in one unified cloud system.
              </p>
            </div>

            {/* 4 Feature Checklist Items */}
            <div className="space-y-4 text-xs md:text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary/20 text-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div>
                  <span className="font-semibold text-white">Multi-branch administration</span> from one single master dashboard with autonomous branch views.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary/20 text-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div>
                  <span className="font-semibold text-white">Automated biometric & RFID</span> attendance integration with immediate parent SMS alerts.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary/20 text-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div>
                  <span className="font-semibold text-white">Online fee collection</span> with zero-touch automated bank reconciliation and GST receipts.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary/20 text-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div>
                  <span className="font-semibold text-white">Instant cryptographic QR-verified</span> certificate and marksheet issuance.
                </div>
              </div>
            </div>

            {/* Testimonial Quote Card */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                <span className="material-symbols-outlined text-sm fill">star</span>
                <span className="material-symbols-outlined text-sm fill">star</span>
                <span className="material-symbols-outlined text-sm fill">star</span>
                <span className="material-symbols-outlined text-sm fill">star</span>
                <span className="material-symbols-outlined text-sm fill">star</span>
              </div>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                "EduManage replaced four fragmented software tools for our 8 campuses. Our fee collection rate increased by 22% in the very first term, and audit reports take seconds instead of days."
              </p>
              <div className="flex items-center gap-3 pt-1">
                <img
                  alt="Dr. Rajesh Menon"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                  src={BRAND_HOTLINKS.drRajesh}
                />
                <div>
                  <div className="text-xs font-bold text-white">Dr. Rajesh Menon</div>
                  <div className="text-[11px] text-slate-400">Director, Apex Education Network</div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Security Badge Footer */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary-fixed text-sm">lock</span>
              <span>Bank-Grade 256-bit AES</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary-fixed text-sm">verified_user</span>
              <span>ISO 27001 Certified</span>
            </div>
            <span>•</span>
            <span>FERPA / GDPR</span>
          </div>
        </div>

        {/* RIGHT COLUMN: REGISTRATION FORM (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
          <div>
            {/* Step Indicator Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant mb-2">
                <span className="text-primary font-bold">Step 1 of 3: Institution Identity</span>
                <span className="text-outline font-data-mono">33% Completed</span>
              </div>
              {/* Progress Bar Segments */}
              <div className="grid grid-cols-3 gap-2">
                <div className="h-1.5 rounded-full bg-primary"></div>
                <div className="h-1.5 rounded-full bg-surface-container-high"></div>
                <div className="h-1.5 rounded-full bg-surface-container-high"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-outline mt-1 font-medium">
                <span className="text-primary font-bold">1. Institution</span>
                <span>2. Main Branch</span>
                <span>3. Live Launch</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
                Create Your Institution
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Set up your organization workspace in less than 2 minutes. Free 14-day full trial included.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Institution Type */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Institution Type <span className="text-error">*</span>
                </label>
                <select
                  required
                  value={formData.institutionType}
                  onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="School (K-12)">School (K-12 Primary & Senior Secondary)</option>
                  <option value="Coaching Institute">Competitive Exam Coaching Institute (IIT/NEET/Civil Services)</option>
                  <option value="Training & Vocational Center">Training & Vocational Skills Center (IT / Certifications)</option>
                  <option value="Tuition Center Network">Tuition & Tutorial Center Network</option>
                  <option value="Higher Education College">Higher Education College / Autonomous Campus</option>
                </select>
              </div>

              {/* Row 2: Institution Legal Name */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Institution Legal / Display Name <span className="text-error">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  placeholder="e.g. Apex International Academy"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Row 3: Admin Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Administrator Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.adminName}
                    onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                    placeholder="e.g. Dr. Sarah Jenkins"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Official Work Email <span className="text-error">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="sarah@apexacademy.edu"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Row 4: Phone with Country Code */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Direct Contact Number <span className="text-error">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    className="w-28 text-sm px-2.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shrink-0"
                  >
                    <option value="+91">🇮🇳 +91 (IN)</option>
                    <option value="+1">🇺🇸 +1 (US)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+971">🇦🇪 +971 (UAE)</option>
                    <option value="+65">🇸🇬 +65 (SG)</option>
                    <option value="+61">🇦🇺 +61 (AU)</option>
                  </select>
                  <input
                    required
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="text-[11px] text-outline mt-1">
                  Used exclusively for multi-factor authentication (MFA) and urgent critical branch system alerts.
                </p>
              </div>

              {/* Row 5: Create Master Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-on-surface">
                      Create Master Password <span className="text-error">*</span>
                    </label>
                    {formData.password && (
                      <span className="text-[10px] font-bold text-on-surface-variant">
                        {passwordStrength.label}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full text-sm px-3.5 py-2.5 pr-10 rounded-xl border border-outline-variant bg-surface text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-outline hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {/* Password Strength Progress Bar */}
                  {formData.password && (
                    <div className="h-1 w-full bg-surface-container-high rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: passwordStrength.width }}
                      ></div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-on-surface">
                      Confirm Password <span className="text-error">*</span>
                    </label>
                    {passwordsMatch && (
                      <span className="text-[10px] font-bold text-secondary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">check</span> Matches
                      </span>
                    )}
                    {passwordsMismatch && (
                      <span className="text-[10px] font-bold text-error">
                        Passwords differ
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      required
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className={`w-full text-sm px-3.5 py-2.5 pr-10 rounded-xl border bg-surface text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 ${
                        passwordsMismatch
                          ? 'border-error focus:ring-error'
                          : 'border-outline-variant focus:ring-primary'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-2.5 text-outline hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary shrink-0"
                  />
                  <span>
                    I confirm I am an authorized institutional representative and agree to the{' '}
                    <span className="text-primary hover:underline font-semibold">Terms of Service</span>,{' '}
                    <span className="text-primary hover:underline font-semibold">Data Processing Addendum</span>, and{' '}
                    <span className="text-primary hover:underline font-semibold">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary text-white font-label-lg text-base font-bold shadow-md hover:bg-primary-container hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>Continue to Branch Setup</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footnote */}
          <div className="pt-6 mt-6 border-t border-outline-variant/30 text-center text-xs text-on-surface-variant">
            <span>Already possess an administrative account? </span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-primary font-bold hover:underline"
            >
              Log In to Platform Console →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
