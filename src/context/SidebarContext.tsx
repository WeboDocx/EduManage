import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 1024) {
        return false; // Always closed by default on mobile/tablet viewports
      }
      const stored = localStorage.getItem('edumanage_sidebar_open');
      if (stored !== null) {
        return stored === 'true';
      }
      return true;
    }
    return false;
  });

  // Automatically close sidebar if window resizes to mobile width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save preference to localStorage (only save preference for desktop)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        localStorage.setItem('edumanage_sidebar_open', String(isSidebarOpen));
      }
    } catch {
      // ignore storage errors
    }
  }, [isSidebarOpen]);

  // Global keyboard shortcut: Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        const activeTag = (document.activeElement?.tagName || '').toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable) {
          return;
        }
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const contextValue = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      setIsSidebarOpen,
    }),
    [isSidebarOpen]
  );

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
};

export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (!context) {
    return {
      isSidebarOpen: true,
      toggleSidebar: () => {},
      setIsSidebarOpen: () => {},
    };
  }
  return context;
}
