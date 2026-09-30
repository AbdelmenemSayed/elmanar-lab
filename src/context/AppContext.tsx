import React, { createContext, useContext, useState, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  Role, 
  Employee, 
  AttendanceRecord, 
  BiometricLog, 
  LeaveRequest, 
  OvertimeRecord, 
  PayrollSummary, 
  LaboratoryPolicies, 
  NotificationItem, 
  BiometricDeviceState,
  PayrollStatus
} from '../types/hrm';
import { 
  MOCK_EMPLOYEES, 
  MOCK_ATTENDANCE_TODAY, 
  MOCK_BIOMETRIC_LOGS, 
  MOCK_LEAVES, 
  MOCK_OVERTIME_RECORDS, 
  MOCK_PAYROLL_SEPTEMBER, 
  INITIAL_POLICIES, 
  INITIAL_BIOMETRIC_DEVICE, 
  MOCK_NOTIFICATIONS 
} from '../data/mockData';

export type NavigationItem = 
  | 'dashboard'
  | 'employees'
  | 'attendance'
  | 'biometric'
  | 'leaves'
  | 'overtime'
  | 'payroll'
  | 'accountant'
  | 'reports'
  | 'policies'
  | 'settings';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  // Navigation & Role
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentView: NavigationItem;
  setCurrentView: (view: NavigationItem) => void;

  // Search & Global state
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  selectedEmployeeId: string | null;
  openEmployeeProfile: (id: string | null) => void;

  // Attendance
  attendanceRecords: AttendanceRecord[];
  
  // Biometric
  biometricDevice: BiometricDeviceState;
  biometricLogs: BiometricLog[];
  isSyncingBiometric: boolean;
  syncBiometricDevice: () => Promise<void>;
  updateBiometricSettings: (settings: Partial<BiometricDeviceState>) => void;

  // Leaves
  leaves: LeaveRequest[];
  addLeave: (leave: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateLeaveStatus: (id: string, status: 'approved' | 'rejected', approver?: string) => void;

  // Overtime
  overtimeRecords: OvertimeRecord[];

  // Payroll
  payroll: PayrollSummary;
  selectedPayslipId: string | null;
  openPayslip: (employeeId: string | null) => void;
  advancePayrollStatus: (newStatus: PayrollStatus) => void;
  markEmployeeAsPaid: (employeeId: string) => void;
  markAllAsPaid: () => void;

  // Policies
  policies: LaboratoryPolicies;
  updatePolicies: (newPolicies: Partial<LaboratoryPolicies>) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;

  // Interactive Scenario triggers
  activeScenarioHighlight: string | null;
  setActiveScenarioHighlight: (id: string | null) => void;
  triggerDemoScenario: (scenario: 'overtime' | 'absence' | 'normal' | 'payroll' | 'biometric') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('management');
  const [currentView, setCurrentView] = useState<NavigationItem>('dashboard');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE_TODAY);
  const [biometricDevice, setBiometricDevice] = useState<BiometricDeviceState>(INITIAL_BIOMETRIC_DEVICE);
  const [biometricLogs, setBiometricLogs] = useState<BiometricLog[]>(MOCK_BIOMETRIC_LOGS);
  const [isSyncingBiometric, setIsSyncingBiometric] = useState<boolean>(false);

  const [leaves, setLeaves] = useState<LeaveRequest[]>(MOCK_LEAVES);
  const [overtimeRecords] = useState<OvertimeRecord[]>(MOCK_OVERTIME_RECORDS);
  const [payroll, setPayroll] = useState<PayrollSummary>(MOCK_PAYROLL_SEPTEMBER);
  const [policies, setPolicies] = useState<LaboratoryPolicies>(INITIAL_POLICIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Modals state
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [selectedPayslipId, setSelectedPayslipId] = useState<string | null>(null);
  const [activeScenarioHighlight, setActiveScenarioHighlight] = useState<string | null>(null);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Employees CRUD
  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const nextNum = employees.length + 1;
    const newId = `MN-${String(nextNum).padStart(3, '0')}`;
    const newEmp: Employee = {
      ...employeeData,
      id: newId
    };
    setEmployees((prev) => [newEmp, ...prev]);
    showToast({
      type: 'success',
      title: 'تمت إضافة الموظف بنجاح',
      message: `تم ربط الموظف ${newEmp.name} برقم البصمة #${newEmp.biometricId}`
    });
  };

  const updateEmployee = (id: string, updatedFields: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedFields } : emp))
    );
    showToast({
      type: 'success',
      title: 'تم تحديث بيانات الموظف',
      message: 'تم حفظ كافة التعديلات في ملف الموظف'
    });
  };

  const deleteEmployee = (id: string) => {
    const emp = employees.find((e) => e.id === id);
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'terminated' } : e))
    );
    showToast({
      type: 'warning',
      title: 'تم إنهاء خدمة الموظف',
      message: `تم تحديث حالة ${emp?.name || id} إلى منتهية خدمته`
    });
  };

  const openEmployeeProfile = (id: string | null) => {
    setSelectedEmployeeId(id);
  };

  const openPayslip = (employeeId: string | null) => {
    setSelectedPayslipId(employeeId);
  };

  // Biometric device synchronization simulation
  const syncBiometricDevice = async () => {
    setIsSyncingBiometric(true);
    showToast({
      type: 'info',
      title: 'بدء الاتصال بجهاز البصمة الخارجي...',
      message: `الاتصال بالعنوان ${biometricDevice.ipAddress}:${biometricDevice.port} عبر بروتوكول TCP/IP`
    });

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSyncingBiometric(false);
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const newSyncTime = `30 سبتمبر 2026 — ${timeStr} ص`;

        setBiometricDevice((prev) => ({
          ...prev,
          lastSyncTime: newSyncTime,
          todayRecordsCount: prev.todayRecordsCount + 4,
          status: 'online'
        }));

        // Add simulated fresh logs
        const freshLog: BiometricLog = {
          id: `LOG-SYNC-${Date.now()}`,
          timestamp: `2026-09-30 ${timeStr}:15`,
          biometricId: '101',
          employeeId: 'MN-001',
          employeeName: 'أحمد محمد علي',
          type: 'check_out',
          deviceSn: biometricDevice.serialNumber,
          verifyMode: 'fingerprint',
          processStatus: 'matched'
        };

        setBiometricLogs((prev) => [freshLog, ...prev]);

        showToast({
          type: 'success',
          title: 'اكتملت المزامنة بنجاح!',
          message: 'تم سحب السجلات الحيوية الجديدة وتطبيق لوائح الحضور والانصراف تلقائياً'
        });

        // Trigger light confetti for presentation flair
        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.8, x: 0.2 }
          });
        } catch {
          // ignore in case window lacks canvas
        }

        resolve();
      }, 1600);
    });
  };

  const updateBiometricSettings = (settings: Partial<BiometricDeviceState>) => {
    setBiometricDevice((prev) => ({ ...prev, ...settings }));
    showToast({
      type: 'success',
      title: 'تم تحديث إعدادات جهاز البصمة',
      message: 'تم حفظ معلمات الاتصال بالشبكة المحلية'
    });
  };

  // Leaves
  const addLeave = (leaveData: Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>) => {
    const newLeave: LeaveRequest = {
      ...leaveData,
      id: `LV-2026-${String(leaves.length + 45).padStart(3, '0')}`,
      createdAt: '2026-09-30',
      status: 'pending'
    };
    setLeaves((prev) => [newLeave, ...prev]);
    showToast({
      type: 'info',
      title: 'تم تقديم طلب الإجازة',
      message: `طلب إجازة للموظف ${newLeave.employeeName} بانتظار المراجعة والاعتماد`
    });
  };

  const updateLeaveStatus = (id: string, status: 'approved' | 'rejected', approver: string = 'الإدارة العامة') => {
    setLeaves((prev) =>
      prev.map((lv) => (lv.id === id ? { ...lv, status, approvedBy: approver } : lv))
    );
    showToast({
      type: status === 'approved' ? 'success' : 'warning',
      title: status === 'approved' ? 'تمت الموافقة على الإجازة' : 'تم رفض طلب الإجازة',
      message: `تم تحديث حالة الطلب #${id}`
    });
  };

  // Payroll workflow progression
  const advancePayrollStatus = (newStatus: PayrollStatus) => {
    setPayroll((prev) => {
      let paidAmt = prev.paidAmount;
      let pendingAmt = prev.pendingAmount;

      if (newStatus === 'paid') {
        paidAmt = prev.totalNetPayroll;
        pendingAmt = 0;
      }

      return {
        ...prev,
        status: newStatus,
        paidAmount: paidAmt,
        pendingAmount: pendingAmt,
        items: prev.items.map((it) => ({
          ...it,
          paymentStatus: newStatus === 'paid' ? 'paid' : newStatus === 'ready_for_payment' ? 'ready' : it.paymentStatus
        }))
      };
    });

    const statusLabels: Record<PayrollStatus, string> = {
      attendance_closed: 'إغلاق فترة الحضور والانصراف',
      calculated: 'اكتمل الاحتساب الآلي',
      hr_reviewed: 'مراجعة الموارد البشرية (HR Reviewed)',
      accountant_reviewed: 'مراجعة المحاسب (Accountant Reviewed)',
      management_approved: 'اعتماد الإدارة العليا (Management Approved)',
      ready_for_payment: 'جاهز للصرف المالي (Ready for Payment)',
      paid: 'تم الصرف لكافة الموظفين (Paid)'
    };

    if (newStatus === 'paid' || newStatus === 'management_approved') {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }

    showToast({
      type: 'success',
      title: 'تحديث مرحلة الرواتب والأجور',
      message: `تم نقل مسير رواتب سبتمبر 2026 إلى: ${statusLabels[newStatus]}`
    });
  };

  const markEmployeeAsPaid = (employeeId: string) => {
    setPayroll((prev) => {
      const emp = prev.items.find((i) => i.employeeId === employeeId);
      if (!emp || emp.paymentStatus === 'paid') return prev;

      const newItems = prev.items.map((it) =>
        it.employeeId === employeeId ? { ...it, paymentStatus: 'paid' as const, paidAt: '2026-09-30 14:00' } : it
      );
      const newPaid = prev.paidAmount + emp.netSalary;
      const newPending = Math.max(0, prev.pendingAmount - emp.netSalary);

      return {
        ...prev,
        paidAmount: newPaid,
        pendingAmount: newPending,
        items: newItems
      };
    });

    showToast({
      type: 'success',
      title: 'تم تسجيل الصرف بنجاح',
      message: `تم تحويل صافي الراتب للموظف #${employeeId}`
    });
  };

  const markAllAsPaid = () => {
    advancePayrollStatus('paid');
  };

  // Policies
  const updatePolicies = (newPol: Partial<LaboratoryPolicies>) => {
    setPolicies((prev) => ({ ...prev, ...newPol }));
    showToast({
      type: 'success',
      title: 'تم حفظ لوائح وسياسات العمل',
      message: 'تم تطبيق القواعد الجديدة على خوارزمية الاحتساب الآلي بنجاح'
    });
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast({
      type: 'info',
      title: 'تم تحديد كل الإشعارات كمقروءة'
    });
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Interactive Scenario Helper for presentations
  const triggerDemoScenario = (scenario: 'overtime' | 'absence' | 'normal' | 'payroll' | 'biometric') => {
    switch (scenario) {
      case 'overtime':
        setCurrentView('attendance');
        setActiveScenarioHighlight('MN-001');
        showToast({
          type: 'info',
          title: 'سيناريو توضيحي: تأخير + عمل إضافي (أحمد محمد)',
          message: 'حضور 09:08 ص ومغادرة 06:30 م → احتساب تلقائي لـ 8 د تأخير و 1 س و 30 د إضافي!'
        });
        break;
      case 'absence':
        setCurrentView('attendance');
        setActiveScenarioHighlight('MN-003');
        showToast({
          type: 'warning',
          title: 'سيناريو توضيحي: غياب تلقائي بدون بصمة (محمد أحمد)',
          message: 'لم يتم رصد بصمة ولا يوجد طلب إجازة → تحويل آلي لـ "غائب" وتطبيق خصم 1.5 يوم في المرتبات'
        });
        break;
      case 'normal':
        setCurrentView('attendance');
        setActiveScenarioHighlight('MN-002');
        showToast({
          type: 'success',
          title: 'سيناريو توضيحي: حضور منضبط (سارة محمود)',
          message: 'حضور 09:05 ص ضمن فترة السماح (15 دقيقة) → حاضر بدون أي خصومات أو إضافي'
        });
        break;
      case 'payroll':
        setCurrentView('payroll');
        setActiveScenarioHighlight('payroll-workflow');
        showToast({
          type: 'info',
          title: 'سيناريو دورة الرواتب الشهرية',
          message: 'استعراض معادلة صافي الراتب، ومسار المراجعة والاعتماد حتى الصرف'
        });
        break;
      case 'biometric':
        setCurrentView('biometric');
        setActiveScenarioHighlight('device-sync');
        showToast({
          type: 'info',
          title: 'جهاز البصمة الخارجي (MANAR-ATTENDANCE-01)',
          message: 'استعراض الربط الشبكي الحقيقي وسحب سجلات الموظفين عبر الـ TCP/IP'
        });
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentView,
        setCurrentView,
        globalSearch,
        setGlobalSearch,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        selectedEmployeeId,
        openEmployeeProfile,
        attendanceRecords,
        biometricDevice,
        biometricLogs,
        isSyncingBiometric,
        syncBiometricDevice,
        updateBiometricSettings,
        leaves,
        addLeave,
        updateLeaveStatus,
        overtimeRecords,
        payroll,
        selectedPayslipId,
        openPayslip,
        advancePayrollStatus,
        markEmployeeAsPaid,
        markAllAsPaid,
        policies,
        updatePolicies,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        showToast,
        dismissToast,
        activeScenarioHighlight,
        setActiveScenarioHighlight,
        triggerDemoScenario
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
