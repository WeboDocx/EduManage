import React, { useState } from 'react';
import { ScreenType, CampusSetupData, RegistrationFormData } from '../types';
import { BRAND_HOTLINKS } from '../data/mockData';

interface CampusOnboardingStep2Props {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
  regData: RegistrationFormData;
}

export const CampusOnboardingStep2: React.FC<CampusOnboardingStep2Props> = ({
  onNavigate,
  onShowToast,
  regData,
}) => {
  const [setupData, setSetupData] = useState<CampusSetupData>({
    legalName: regData.institutionName || 'Apex International Academy',
    entityClassification: 'Non-Profit Trust / Autonomous Society',
    supportPhone: regData.phoneNumber ? `${regData.countryCode} ${regData.phoneNumber}` : '+91 80 4122 9000',
    adminEmail: regData.workEmail || 'admissions@apexacademy.edu',
    websiteUrl: 'https://www.apexacademy.edu',
    affiliationCode: 'CBSE/AFF/2024-9102',
    hqAddress: 'Suite 400, Apex Knowledge Tower, Outer Ring Road, Bangalore',
    branchDisplayName: 'Main Campus (Apex Central)',
    streetAddress: 'Survey No. 44/2, Sarjapur Main Road',
    city: 'Bangalore',
    state: 'Karnataka',
    postalCode: '560102',
    primaryColor: '#2563EB',
    secondaryColor: '#006A61',
    logoFileName: 'apex-crest-official.png',
    faviconFileName: 'apex-favicon-32x32.png',
  });

  const [coords, setCoords] = useState('12.9716° N, 77.5946° E - Bangalore Central');
  const [isPinAdjusted, setIsPinAdjusted] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(false);

  const primarySwatches = [
    { label: 'Royal Blue', hex: '#2563EB' },
    { label: 'Deep Navy', hex: '#1E3A8A' },
    { label: 'Forest Teal', hex: '#006A61' },
    { label: 'Royal Indigo', hex: '#4338CA' },
    { label: 'Crimson Red', hex: '#B91C1C' },
  ];

  const secondarySwatches = [
    { label: 'Teal Green', hex: '#006A61' },
    { label: 'Sky Cyan', hex: '#0284C7' },
    { label: 'Amber Gold', hex: '#D97706' },
    { label: 'Rose Vibrant', hex: '#E11D48' },
  ];

  const handleAdjustPin = () => {
    setIsPinAdjusted(true);
    setCoords('12.9352° N, 77.6245° E - Sarjapur Road Verified');
    onShowToast('GPS Coordinates updated to exact campus front gate.');
  };

  const handleFinishSetup = () => {
    onShowToast(`Campus ${setupData.branchDisplayName} successfully provisioned! Launching Super Admin Console.`);
    onNavigate('admin');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Utility Bar */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/30 py-2.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">03</span>
            <span className="text-outline">•</span>
            <span className="font-semibold text-on-surface">Organization Onboarding & Provisioning</span>
            <span className="text-outline">•</span>
            <span className="text-secondary font-medium">Auto-Draft Saved 1m ago</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                onShowToast('Configuration saved to draft cloud storage.');
                onNavigate('landing');
              }}
              className="text-on-surface-variant hover:text-on-surface font-medium"
            >
              Exit to Draft
            </button>
            <a
              href="mailto:help@edumanage.io"
              className="text-primary hover:underline font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">help</span>
              Need Help?
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        {/* Wizard Step Indicator Card */}
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Step 1 Done */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-secondary-fixed/40">
              <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
                <span className="material-symbols-outlined text-base">check</span>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-secondary">Step 1 • Completed</div>
                <div className="text-xs font-bold text-on-surface">Institution Type</div>
              </div>
            </div>

            {/* Step 2 Active */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-primary-fixed/60 ring-2 ring-primary">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs">
                2
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-primary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  Step 2 • Active
                </div>
                <div className="text-xs font-bold text-on-surface">Main Branch & Identity</div>
              </div>
            </div>

            {/* Step 3 Next */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low opacity-60">
              <div className="w-8 h-8 rounded-full bg-outline-variant text-on-surface-variant flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-outline">Step 3</div>
                <div className="text-xs font-bold text-on-surface">Academic Schema</div>
              </div>
            </div>

            {/* Step 4 Final */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low opacity-60">
              <div className="w-8 h-8 rounded-full bg-outline-variant text-on-surface-variant flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-outline">Step 4</div>
                <div className="text-xs font-bold text-on-surface">Go Live & Staff Invites</div>
              </div>
            </div>
          </div>
        </div>

        {/* Header Title Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-fixed/50 px-2.5 py-0.5 rounded-full">
              Phase 2 Architecture
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-on-surface mt-2">
              Let's set up your institution & main campus
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant mt-1">
              Configure your primary campus, geographic coordinates, administrative contact points, and unified portal aesthetics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('register')}
              className="px-4 py-2 rounded-xl border border-outline-variant text-xs font-semibold text-on-surface hover:bg-surface-container-low"
            >
              ← Back to Step 1
            </button>
            <button
              onClick={handleFinishSetup}
              className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-xs"
            >
              Finish Setup & Launch Console →
            </button>
          </div>
        </div>

        {/* SECTION 1: INSTITUTION PROFILE */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
            <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">corporate_fare</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                1. Institutional Master Legal Profile
              </h2>
              <p className="text-xs text-on-surface-variant">
                Official accreditation parameters reflected across student graduation certificates and tax receipts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Legal Institution Name
              </label>
              <input
                type="text"
                value={setupData.legalName}
                onChange={(e) => setSetupData({ ...setupData, legalName: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Entity Legal Classification
              </label>
              <select
                value={setupData.entityClassification}
                onChange={(e) => setSetupData({ ...setupData, entityClassification: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
              >
                <option>Non-Profit Trust / Autonomous Society</option>
                <option>Private Educational Company (Pvt Ltd)</option>
                <option>Government Recognized Foundation</option>
                <option>Sole Proprietorship Academy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Affiliation Code / License No.
              </label>
              <input
                type="text"
                value={setupData.affiliationCode}
                onChange={(e) => setSetupData({ ...setupData, affiliationCode: e.target.value })}
                placeholder="CBSE/AFF/2024-9102"
                className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Official Support Phone
              </label>
              <input
                type="tel"
                value={setupData.supportPhone}
                onChange={(e) => setSetupData({ ...setupData, supportPhone: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Registered Admin Email
              </label>
              <input
                type="email"
                value={setupData.adminEmail}
                onChange={(e) => setSetupData({ ...setupData, adminEmail: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Public Web Domain / URL
              </label>
              <input
                type="url"
                value={setupData.websiteUrl}
                onChange={(e) => setSetupData({ ...setupData, websiteUrl: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Corporate Headquarters Registered Address
              </label>
              <input
                type="text"
                value={setupData.hqAddress}
                onChange={(e) => setSetupData({ ...setupData, hqAddress: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: MAIN BRANCH CONFIGURATION & GEO-FENCE */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
            <div className="w-9 h-9 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">domain</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                2. Main Campus (Headquarters Branch) & Geographic Anchor
              </h2>
              <p className="text-xs text-on-surface-variant">
                Defines physical campus borders, GPS fence for mobile staff attendance, and classroom capacity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Fields (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Branch Display Name
                </label>
                <input
                  type="text"
                  value={setupData.branchDisplayName}
                  onChange={(e) => setSetupData({ ...setupData, branchDisplayName: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Physical Street Address
                </label>
                <input
                  type="text"
                  value={setupData.streetAddress}
                  onChange={(e) => setSetupData({ ...setupData, streetAddress: e.target.value })}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={setupData.city}
                    onChange={(e) => setSetupData({ ...setupData, city: e.target.value })}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={setupData.state}
                    onChange={(e) => setSetupData({ ...setupData, state: e.target.value })}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={setupData.postalCode}
                    onChange={(e) => setSetupData({ ...setupData, postalCode: e.target.value })}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-outline-variant bg-surface text-on-surface focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="text-[10px] uppercase font-bold text-outline">Classroom Wings</div>
                  <div className="text-xs font-bold text-on-surface mt-0.5">4 Wings (Blocks A, B, C, D)</div>
                  <div className="text-[11px] text-on-surface-variant mt-0.5">64 Total Classrooms</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
                  <div className="text-[10px] uppercase font-bold text-outline">Capacity Cap</div>
                  <div className="text-xs font-bold text-secondary mt-0.5">2,400 Students Max</div>
                  <div className="text-[11px] text-on-surface-variant mt-0.5">Dynamic batch throttling</div>
                </div>
              </div>
            </div>

            {/* Interactive GPS Geofence Map (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-outline-variant/40 bg-surface-container relative min-h-[260px] flex flex-col justify-between">
              <img
                alt="Bangalore Map"
                className="absolute inset-0 w-full h-full object-cover"
                src={BRAND_HOTLINKS.bangaloreMap}
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>

              {/* Pin with animated ripple */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-surface-container-lowest/90 text-on-surface shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                  Geofence Active: 150m Radius
                </span>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-primary/30 animate-ping absolute -inset-0"></div>
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl relative z-10 border-2 border-white mx-auto">
                  <span className="material-symbols-outlined text-base">pin_drop</span>
                </div>
                <span className="text-[10px] font-bold bg-white text-on-surface px-2 py-0.5 rounded shadow-sm whitespace-nowrap mt-1 inline-block">
                  {setupData.branchDisplayName}
                </span>
              </div>

              {/* Map Footer Controls */}
              <div className="relative z-10 p-3 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant/30 flex items-center justify-between text-xs">
                <div className="text-[11px] text-on-surface-variant font-data-mono">
                  {coords}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleAdjustPin}
                    className="px-2 py-1 rounded-md bg-surface-container-high text-primary hover:bg-primary-fixed text-[11px] font-semibold"
                  >
                    {isPinAdjusted ? 'Pin Locked ✓' : 'Adjust Pin'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onShowToast('GPS Hardware sensor synchronized with container network.');
                    }}
                    className="p-1 rounded-md bg-surface-container-high text-on-surface hover:text-primary"
                    title="Sync Hardware"
                  >
                    <span className="material-symbols-outlined text-sm">my_location</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: INSTITUTIONAL BRANDING & LIVE DYNAMIC PREVIEW */}
        <div className="p-6 md:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/30">
            <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">palette</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                3. Institutional Branding & White-Label Experience
              </h2>
              <p className="text-xs text-on-surface-variant">
                Upload your emblem crest and customize the public parent & student portal styling.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Branding Controls (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Logo & Favicon Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Institution Crest (High-Res PNG/SVG)
                  </label>
                  <div
                    onClick={() => {
                      setLogoUploaded(true);
                      onShowToast('Official school emblem crest selected.');
                    }}
                    className="p-4 rounded-xl border-2 border-dashed border-outline-variant hover:border-primary cursor-pointer text-center bg-surface transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-fixed/60 text-primary flex items-center justify-center mx-auto mb-2">
                      <span className="material-symbols-outlined text-xl">upload_file</span>
                    </div>
                    <div className="text-xs font-bold text-on-surface">
                      {logoUploaded ? 'crest-official.png (Attached)' : 'Click to Upload Crest'}
                    </div>
                    <div className="text-[10px] text-outline mt-0.5">Transparent 512x512px PNG</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Browser Tab Favicon (ICO/PNG)
                  </label>
                  <div className="p-4 rounded-xl border-2 border-dashed border-outline-variant text-center bg-surface">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center mx-auto mb-2">
                      <span className="material-symbols-outlined text-xl">public</span>
                    </div>
                    <div className="text-xs font-bold text-on-surface">Auto-Generated Favicon</div>
                    <div className="text-[10px] text-outline mt-0.5">Synced from crest emblem</div>
                  </div>
                </div>
              </div>

              {/* Primary Accent Color Picker */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Primary Brand Accent (Buttons, Nav Headers, Active State)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {primarySwatches.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => setSetupData({ ...setupData, primaryColor: swatch.hex })}
                      className={`h-8 px-3 rounded-lg flex items-center gap-2 text-xs font-semibold transition-all ${
                        setupData.primaryColor.toLowerCase() === swatch.hex.toLowerCase()
                          ? 'ring-2 ring-offset-2 ring-primary shadow-sm text-white'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                      style={{
                        backgroundColor:
                          setupData.primaryColor.toLowerCase() === swatch.hex.toLowerCase()
                            ? swatch.hex
                            : undefined,
                      }}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: swatch.hex }}
                      ></span>
                      <span>{swatch.label}</span>
                    </button>
                  ))}
                  <input
                    type="text"
                    value={setupData.primaryColor}
                    onChange={(e) => setSetupData({ ...setupData, primaryColor: e.target.value })}
                    className="w-24 text-xs font-data-mono px-2 py-1.5 rounded-lg border border-outline-variant uppercase text-center"
                  />
                </div>
              </div>

              {/* Secondary Accent Color Picker */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Secondary Accent (Badges, Success Indicators, Charts)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {secondarySwatches.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => setSetupData({ ...setupData, secondaryColor: swatch.hex })}
                      className={`h-8 px-3 rounded-lg flex items-center gap-2 text-xs font-semibold transition-all ${
                        setupData.secondaryColor.toLowerCase() === swatch.hex.toLowerCase()
                          ? 'ring-2 ring-offset-2 ring-primary shadow-sm text-white'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                      style={{
                        backgroundColor:
                          setupData.secondaryColor.toLowerCase() === swatch.hex.toLowerCase()
                            ? swatch.hex
                            : undefined,
                      }}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: swatch.hex }}
                      ></span>
                      <span>{swatch.label}</span>
                    </button>
                  ))}
                  <input
                    type="text"
                    value={setupData.secondaryColor}
                    onChange={(e) => setSetupData({ ...setupData, secondaryColor: e.target.value })}
                    className="w-24 text-xs font-data-mono px-2 py-1.5 rounded-lg border border-outline-variant uppercase text-center"
                  />
                </div>
              </div>
            </div>

            {/* LIVE DYNAMIC PREVIEW WIDGET (6 cols) */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-lg overflow-hidden">
                {/* Mini Browser Bar */}
                <div className="bg-surface-container-low px-3 py-2 border-b border-outline-variant/30 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    <span className="text-[10px] font-data-mono text-outline ml-2">
                      portal.{setupData.legalName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'apex'}.edu
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-secondary bg-secondary-fixed/50 px-1.5 py-0.5 rounded">
                    LIVE SYNC PREVIEW
                  </span>
                </div>

                {/* Simulated Portal Canvas */}
                <div className="p-5 space-y-4 bg-slate-50/50">
                  {/* Header Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-xs"
                        style={{ backgroundColor: setupData.primaryColor }}
                      >
                        {setupData.legalName.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 leading-tight">
                          {setupData.legalName || 'Apex International Academy'}
                        </div>
                        <div className="text-[10px] text-slate-500">{setupData.branchDisplayName}</div>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: setupData.secondaryColor }}
                    >
                      Admissions Open 2025
                    </span>
                  </div>

                  {/* Portal Body Mockup */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-800">Welcome to Student & Parent Portal</h4>
                      <span className="text-[10px] text-slate-400 font-data-mono">CBSE Affiliated</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Access semester marksheets, biometric attendance logs, online fee receipts, and digital certificates directly.
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-xs transition-transform active:scale-95"
                        style={{ backgroundColor: setupData.primaryColor }}
                      >
                        Parent Login →
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100"
                      >
                        Pay Fees Online
                      </button>
                    </div>
                  </div>

                  {/* WCAG Compliance Badge */}
                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <span className="material-symbols-outlined text-xs">verified</span>
                      WCAG AAA Contrast: 7.4:1 (Passed)
                    </span>
                    <span className="font-data-mono text-[10px]">Render latency: 12ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Previous: Institution Type</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onShowToast('Branch draft specifications cached locally.');
              }}
              className="px-4 py-2 rounded-xl border border-outline-variant text-xs font-semibold text-on-surface hover:bg-surface-container-low"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleFinishSetup}
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-md flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>Save & Launch Super Admin Console</span>
              <span className="material-symbols-outlined text-base">rocket_launch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
