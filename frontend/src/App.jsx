import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CaseProvider } from './context/CaseContext';
import { NotificationProvider } from './context/NotificationContext';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Modular Page Imports
import {
  LoginPage,
  DashboardPage,
  CasesPage,
  DeviceIdentificationPage,
  EvidenceAcquisitionPage,
  EvidenceAnalysisPage,
  VideoRecoveryPage,
  AiAnalysisPage,
  TimelineAnalysisPage,
  ChainOfCustodyPage,
  ForensicReportPage,
  CaseDetailsPage,
  SettingsPage
} from './pages';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProblemBannerOpen, setIsProblemBannerOpen] = useState(false);
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <AuthLayout
        isProblemBannerOpen={isProblemBannerOpen}
        setIsProblemBannerOpen={setIsProblemBannerOpen}
      >
        <LoginPage
          onLoginSuccess={() => setCurrentTab('dashboard')}
          onOpenProblemBanner={() => setIsProblemBannerOpen(true)}
        />
      </AuthLayout>
    );
  }

  const renderActivePage = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardPage
            setCurrentTab={setCurrentTab}
            onOpenNewCase={() => setIsNewCaseModalOpen(true)}
            onOpenProblemBanner={() => setIsProblemBannerOpen(true)}
          />
        );
      case 'cases':
        return (
          <CasesPage
            setCurrentTab={setCurrentTab}
            onOpenNewCase={() => setIsNewCaseModalOpen(true)}
          />
        );
      case 'case-details':
        return <CaseDetailsPage setCurrentTab={setCurrentTab} />;
      case 'device-id':
        return <DeviceIdentificationPage setCurrentTab={setCurrentTab} />;
      case 'acquisition':
        return <EvidenceAcquisitionPage setCurrentTab={setCurrentTab} />;
      case 'analysis':
        return <EvidenceAnalysisPage setCurrentTab={setCurrentTab} />;
      case 'recovery':
        return <VideoRecoveryPage setCurrentTab={setCurrentTab} />;
      case 'ai-analysis':
        return <AiAnalysisPage setCurrentTab={setCurrentTab} />;
      case 'timeline':
        return <TimelineAnalysisPage setCurrentTab={setCurrentTab} />;
      case 'custody':
        return <ChainOfCustodyPage setCurrentTab={setCurrentTab} />;
      case 'reports':
        return <ForensicReportPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardPage
            setCurrentTab={setCurrentTab}
            onOpenNewCase={() => setIsNewCaseModalOpen(true)}
            onOpenProblemBanner={() => setIsProblemBannerOpen(true)}
          />
        );
    }
  };

  return (
    <MainLayout
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      isMobileSidebarOpen={isMobileSidebarOpen}
      setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      isProblemBannerOpen={isProblemBannerOpen}
      setIsProblemBannerOpen={setIsProblemBannerOpen}
      isNewCaseModalOpen={isNewCaseModalOpen}
      setIsNewCaseModalOpen={setIsNewCaseModalOpen}
      onCaseCreated={() => setCurrentTab('case-details')}
    >
      {renderActivePage()}
    </MainLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CaseProvider>
          <AppContent />
        </CaseProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
