import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { ToastContainer } from '../components/common/Toast';
import { ProblemStatementBanner } from '../components/common/ProblemStatementBanner';
import { CreateCaseModal } from '../components/cases/CreateCaseModal';

export const MainLayout = ({
  children,
  currentTab,
  setCurrentTab,
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  isProblemBannerOpen,
  setIsProblemBannerOpen,
  isNewCaseModalOpen,
  setIsNewCaseModalOpen,
  onCaseCreated
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        onOpenProblemBanner={() => setIsProblemBannerOpen(true)}
      />

      {/* Main Content Viewport */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isMobileSidebarOpen={isMobileSidebarOpen}
          toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenNewCase={() => setIsNewCaseModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <ProblemStatementBanner
        isOpen={isProblemBannerOpen}
        onClose={() => setIsProblemBannerOpen(false)}
      />

      <CreateCaseModal
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
        onCaseCreated={onCaseCreated}
      />

      <ToastContainer />
    </div>
  );
};
