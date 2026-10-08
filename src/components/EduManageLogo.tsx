import React from 'react';

interface EduManageLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textColor?: string;
}

export const EduManageLogo: React.FC<EduManageLogoProps> = ({
  className = 'h-7 w-7',
  showText = false,
  textColor = 'text-white',
}) => {
  return (
    <div className="inline-flex items-center gap-2 select-none">
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 transition-transform duration-200 hover:scale-105`}
      >
        <defs>
          <linearGradient id="em-grad-primary-comp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="em-grad-accent-comp" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="em-grad-cap-comp" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E0E7FF" />
          </linearGradient>
          <filter id="em-shadow-comp" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1E1B4B" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer Rounded Squircle */}
        <rect x="8" y="8" width="104" height="104" rx="26" fill="url(#em-grad-primary-comp)" filter="url(#em-shadow-comp)" />
        <rect x="8" y="8" width="104" height="104" rx="26" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />

        {/* Inner Soft Glow Aura */}
        <circle cx="60" cy="48" r="32" fill="#FFFFFF" fillOpacity="0.12" />

        {/* Graduation Mortarboard Cap */}
        <path d="M60 28 L94 44 L60 60 L26 44 Z" fill="url(#em-grad-cap-comp)" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Cap Base Arch */}
        <path d="M38 51.5 L38 64 C38 72 82 72 82 64 L82 51.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Golden Tassel & Cord */}
        <path d="M78 49 L88 56 L88 68" stroke="url(#em-grad-accent-comp)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="88" cy="70" r="2.5" fill="url(#em-grad-accent-comp)" />

        {/* Open Book Pages */}
        <path d="M32 75 C42 72 52 74 60 78 L60 93 C52 89 42 87 32 90 Z" fill="#FFFFFF" fillOpacity="0.95" />
        <path d="M88 75 C78 72 68 74 60 78 L60 93 C68 89 78 87 88 90 Z" fill="#FFFFFF" fillOpacity="0.88" />
        <line x1="60" y1="78" x2="60" y2="94" stroke="#4338CA" strokeWidth="2" strokeLinecap="round" />

        {/* Spark of Innovation */}
        <path d="M92 24 Q92 28 96 28 Q92 28 92 32 Q92 28 88 28 Q92 28 92 24 Z" fill="url(#em-grad-accent-comp)" />
      </svg>

      {showText && (
        <span className={`font-bold tracking-tight text-sm sm:text-base ${textColor} flex items-center`}>
          <span>Edu</span>
          <span className="text-blue-400 font-black">Manage</span>
        </span>
      )}
    </div>
  );
};

export default EduManageLogo;
