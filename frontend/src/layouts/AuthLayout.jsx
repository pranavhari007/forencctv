import React from 'react';
import { ToastContainer } from '../components/common/Toast';
import { ProblemStatementBanner } from '../components/common/ProblemStatementBanner';

export const AuthLayout = ({ children, isProblemBannerOpen, setIsProblemBannerOpen }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      {children}
      <ProblemStatementBanner
        isOpen={isProblemBannerOpen}
        onClose={() => setIsProblemBannerOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};
