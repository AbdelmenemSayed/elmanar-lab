import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { InteractiveDemoBanner } from './components/layout/InteractiveDemoBanner';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { ToastContainer } from './components/layout/Toast';

// Modals
import { EmployeeProfileModal } from './components/modals/EmployeeProfileModal';
import { PayslipModal } from './components/modals/PayslipModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { EmployeesView } from './components/views/EmployeesView';
import { AttendanceView } from './components/views/AttendanceView';
import { BiometricView } from './components/views/BiometricView';
import { LeavesView } from './components/views/LeavesView';
import { OvertimeView } from './components/views/OvertimeView';
import { PayrollView } from './components/views/PayrollView';
import { AccountantView } from './components/views/AccountantView';
import { ReportsView } from './components/views/ReportsView';
import { PoliciesView } from './components/views/PoliciesView';
import { SettingsView } from './components/views/SettingsView';

const MainLayout: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-cairo overflow-hidden">
      {/* 1. Presentation Interactive Scenario Banner */}
      <InteractiveDemoBanner />

      {/* 2. Main Shell with RTL Sidebar and Content */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* RTL Sidebar (Right in RTL) */}
        <Sidebar />

        {/* Content Column with Fixed Topbar and Scrollable Main */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Topbar: Permanently held at the top */}
          <Topbar />

          {/* Dynamic View Content: Scrolls cleanly underneath the topbar */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'employees' && <EmployeesView />}
            {currentView === 'attendance' && <AttendanceView />}
            {currentView === 'biometric' && <BiometricView />}
            {currentView === 'leaves' && <LeavesView />}
            {currentView === 'overtime' && <OvertimeView />}
            {currentView === 'payroll' && <PayrollView />}
            {currentView === 'accountant' && <AccountantView />}
            {currentView === 'reports' && <ReportsView />}
            {currentView === 'policies' && <PoliciesView />}
            {currentView === 'settings' && <SettingsView />}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <EmployeeProfileModal />
      <PayslipModal />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
