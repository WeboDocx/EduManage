import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'compact' | 'pill' | 'icon';
  className?: string;
  onToggleCallback?: (newTheme: string) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'compact',
  className = '',
  onToggleCallback,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    if (onToggleCallback) {
      onToggleCallback(theme === 'dark' ? 'light' : 'dark');
    }
  };

  if (variant === 'icon') {
    return (
      <button
        id="theme-toggle-btn-icon"
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode (stored in localStorage)`}
        onClick={handleToggle}
        className={`relative inline-flex items-center justify-center w-8 h-8 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-slate-600 transition-transform hover:-rotate-12" />
        )}
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        id="theme-toggle-btn-pill"
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Current mode: ${isDark ? 'Dark' : 'Light'}. Click to toggle.`}
        onClick={handleToggle}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer select-none ${
          isDark
            ? 'bg-surface-container-high/80 border-outline-variant/40 text-on-surface hover:bg-surface-container-highest'
            : 'bg-surface-container-low border-outline-variant/50 text-on-surface hover:bg-surface-container'
        } ${className}`}
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-lowest shadow-xs">
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-blue-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          )}
        </span>
        <span className="font-semibold tracking-wide">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      </button>
    );
  }

  // Default 'compact' segment switch variant - fits seamlessly into toolbars and headers
  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-lg bg-surface-container-highest/20 border border-outline-variant/30 backdrop-blur-xs select-none ${className}`}
      role="group"
      aria-label="Theme selection"
    >
      <button
        id="theme-btn-light"
        type="button"
        onClick={() => {
          if (isDark) handleToggle();
        }}
        aria-pressed={!isDark}
        title="Light theme"
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
          !isDark
            ? 'bg-surface-container-lowest text-on-surface shadow-xs ring-1 ring-black/5'
            : 'text-outline-variant hover:text-on-surface'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500/20' : ''}`} />
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        id="theme-btn-dark"
        type="button"
        onClick={() => {
          if (!isDark) handleToggle();
        }}
        aria-pressed={isDark}
        title="Dark theme"
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
          isDark
            ? 'bg-surface-container-highest text-white shadow-xs ring-1 ring-white/10'
            : 'text-outline-variant hover:text-on-surface'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400 fill-blue-400/20' : ''}`} />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
};
