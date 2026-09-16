// Precision Academic Operating System - Theme System
// Manages light/dark mode, persists user choice in localStorage,
// and dynamically updates all CSS custom properties on the root element.

export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'edumanage_theme';

export const LIGHT_THEME_PROPERTIES: Record<string, string> = {
  '--color-secondary': '#006a61',
  '--color-surface-container-lowest': '#ffffff',
  '--color-on-primary': '#ffffff',
  '--color-primary-fixed': '#dbe1ff',
  '--color-primary-container': '#2563eb',
  '--color-tertiary-container': '#5d55f3',
  '--color-on-primary-fixed': '#00174b',
  '--color-inverse-on-surface': '#eef0ff',
  '--color-inverse-primary': '#b4c5ff',
  '--color-on-surface': '#131b2e',
  '--color-outline-variant': '#c3c6d7',
  '--color-error': '#ba1a1a',
  '--color-tertiary': '#4338d9',
  '--color-secondary-container': '#86f2e4',
  '--color-on-error-container': '#93000a',
  '--color-on-primary-fixed-variant': '#003ea8',
  '--color-background': '#faf8ff',
  '--color-error-container': '#ffdad6',
  '--color-on-secondary': '#ffffff',
  '--color-surface-container-high': '#e2e7ff',
  '--color-on-secondary-fixed-variant': '#005049',
  '--color-on-tertiary-container': '#f2eeff',
  '--color-on-tertiary-fixed-variant': '#3323cc',
  '--color-primary': '#004ac6',
  '--color-on-primary-container': '#eeefff',
  '--color-primary-fixed-dim': '#b4c5ff',
  '--color-surface-bright': '#faf8ff',
  '--color-surface-tint': '#0053db',
  '--color-tertiary-fixed-dim': '#c3c0ff',
  '--color-tertiary-fixed': '#e2dfff',
  '--color-inverse-surface': '#283044',
  '--color-surface-variant': '#dae2fd',
  '--color-surface-container-low': '#f2f3ff',
  '--color-on-secondary-fixed': '#00201d',
  '--color-on-error': '#ffffff',
  '--color-surface-dim': '#d2d9f4',
  '--color-surface': '#faf8ff',
  '--color-on-tertiary': '#ffffff',
  '--color-outline': '#737686',
  '--color-secondary-fixed': '#89f5e7',
  '--color-surface-container-highest': '#dae2fd',
  '--color-on-background': '#131b2e',
  '--color-surface-container': '#eaedff',
  '--color-on-tertiary-fixed': '#0f0069',
  '--color-on-secondary-container': '#006f66',
  '--color-secondary-fixed-dim': '#6bd8cb',
  '--color-on-surface-variant': '#434655',
};

export const DARK_THEME_PROPERTIES: Record<string, string> = {
  '--color-secondary': '#2dd4bf',
  '--color-surface-container-lowest': '#0f1422',
  '--color-on-primary': '#002766',
  '--color-primary-fixed': '#1d2b4f',
  '--color-primary-container': '#2563eb',
  '--color-tertiary-container': '#4338ca',
  '--color-on-primary-fixed': '#dbe5ff',
  '--color-inverse-on-surface': '#101420',
  '--color-inverse-primary': '#004ac6',
  '--color-on-surface': '#f0f3ff',
  '--color-outline-variant': '#28334e',
  '--color-error': '#f87171',
  '--color-tertiary': '#a5b4fc',
  '--color-secondary-container': '#0d4742',
  '--color-on-error-container': '#fecaca',
  '--color-on-primary-fixed-variant': '#90b4ff',
  '--color-background': '#0b0f19',
  '--color-error-container': '#7f1d1d',
  '--color-on-secondary': '#003732',
  '--color-surface-container-high': '#202a45',
  '--color-on-secondary-fixed-variant': '#4eead9',
  '--color-on-tertiary-container': '#eef1ff',
  '--color-on-tertiary-fixed-variant': '#c7d2fe',
  '--color-primary': '#60a5fa',
  '--color-on-primary-container': '#eff4ff',
  '--color-primary-fixed-dim': '#152140',
  '--color-surface-bright': '#1d2740',
  '--color-surface-tint': '#8bb2ff',
  '--color-tertiary-fixed-dim': '#1c1945',
  '--color-tertiary-fixed': '#26235b',
  '--color-inverse-surface': '#e5e9f8',
  '--color-surface-variant': '#242f4c',
  '--color-surface-container-low': '#141a2c',
  '--color-on-secondary-fixed': '#8bf6ea',
  '--color-on-error': '#450a0a',
  '--color-surface-dim': '#070a12',
  '--color-surface': '#0b0f19',
  '--color-on-tertiary': '#1e1b4b',
  '--color-outline': '#687596',
  '--color-secondary-fixed': '#113a36',
  '--color-surface-container-highest': '#283455',
  '--color-on-background': '#f0f3ff',
  '--color-surface-container': '#192137',
  '--color-on-tertiary-fixed': '#e4e1ff',
  '--color-on-secondary-container': '#7efbf0',
  '--color-secondary-fixed-dim': '#0c2b28',
  '--color-on-surface-variant': '#a2accb',
};

/**
 * Retrieve current stored theme, falling back to system preference or 'light'.
 */
export function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (err) {
    console.warn('Unable to access localStorage for theme preference:', err);
  }
  return 'light';
}

/**
 * Applies the theme by updating CSS custom properties on document.documentElement,
 * updating classes, data attributes, and persisting to localStorage.
 */
export function applyTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const properties = mode === 'dark' ? DARK_THEME_PROPERTIES : LIGHT_THEME_PROPERTIES;

  // 1. Update CSS Custom Properties accordingly
  Object.entries(properties).forEach(([propName, propValue]) => {
    root.style.setProperty(propName, propValue);
  });

  // 2. Set colorScheme property for browser form controls & scrollbars
  root.style.colorScheme = mode;

  // 3. Update DOM classes and data attribute
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.setAttribute('data-theme', mode);

  // 4. Persist to localStorage
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (err) {
    console.warn('Failed to save theme to localStorage:', err);
  }

  // 5. Notify listeners across components
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: mode } }));
}

/**
 * Toggles current theme between light and dark.
 */
export function toggleThemeMode(): ThemeMode {
  const current = getStoredTheme();
  const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
