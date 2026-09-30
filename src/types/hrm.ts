export type Role = 'super_admin' | 'management' | 'hr' | 'accountant';

export type AttendanceStatus = 
  | 'present'           // حاضر
  | 'late'              // متأخر
  | 'absent'            // غائب
  | 'leave'             // إجازة
  | 'sick_leave'        // إجازة مرضية
  | 'early_departure'   // مغادرة مبكرة
  | 'outside_lab';      // خارج المعمل (مهمة عمل)

export type Department = 
  | 'التحاليل الطبية والباثولوجيا'
  | 'سحب العينات والاستقبال'
  | 'الميكروبيولوجي والمناعة'
  | 'الكيمياء الإكلينيكية'
  | 'الإدارة والموارد البشرية'
  | 'الحسابات والمالية'
  | 'الجودة ومكافحة العدوى'
  | 'تقنية المعلومات والدعم الفني';

export interface Employee {
  id: string;               // e.g. "MN-001"
  biometricId: string;      // e.g. "101" - Important external device ID
  name: string;             // Full Arabic name
  avatar?: string;
  department: Department;
  position: string;
  phone: string;
  email: string;
  nationalId: string;
  hireDate: string;
  basicSalary: number;      // In EGP (جنيه مصري)
  allowances: {
    transport: number;
    hazard: number;         // بدل عدوى / مخاطر معملية
    meal: number;
    housing?: number;
  };
  status: 'active' | 'suspended' | 'terminated';
  bankAccount?: string;
  shift: 'morning' | 'evening' | 'night';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;              // e.g. "2026-09-30"
  checkIn: string | null;    // e.g. "08:55"
  checkOut: string | null;   // e.g. "18:20"
  workingHoursFormatted: string; // e.g. "9 س 25 د"
  workingHoursMinutes: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  overtimeMinutes: number;
  overtimeFormatted: string; // e.g. "1 س 25 د"
  status: AttendanceStatus;
  note?: string;
  rawLogId?: string;
}

export interface BiometricLog {
  id: string;
  timestamp: string;         // e.g. "2026-09-30 08:55:12"
  biometricId: string;
  employeeId: string | null;
  employeeName: string | null;
  type: 'check_in' | 'check_out';
  deviceSn: string;
  verifyMode: 'fingerprint' | 'face' | 'card' | 'password';
  processStatus: 'processed' | 'matched' | 'unmatched' | 'received';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  leaveType: 'annual' | 'sick' | 'emergency' | 'unpaid';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  createdAt: string;
}

export interface OvertimeRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  date: string;
  regularHours: string;      // e.g. "8 س"
  actualHours: string;       // e.g. "9 س 30 د"
  overtimeHoursFormatted: string; // e.g. "1 س 30 د"
  overtimeHoursDecimal: number;  // 1.5
  multiplier: number;        // e.g. 1.5x
  calculatedAmount: number;  // EGP
  status: 'approved' | 'pending';
}

export type PayrollStatus = 
  | 'attendance_closed'
  | 'calculated'
  | 'hr_reviewed'
  | 'accountant_reviewed'
  | 'management_approved'
  | 'ready_for_payment'
  | 'paid';

export interface EmployeePayrollItem {
  employeeId: string;
  employeeName: string;
  department: Department;
  position: string;
  basicSalary: number;
  totalAllowances: number;
  overtimeAmount: number;
  bonuses: number;
  lateDeductions: number;
  absenceDeductions: number;
  otherDeductions: number;
  totalDeductions: number;
  grossSalary: number;
  netSalary: number;
  paymentStatus: 'pending_review' | 'ready' | 'paid';
  paidAt?: string;
  paymentMethod?: 'bank_transfer' | 'cash' | 'instapay';
}

export interface PayrollSummary {
  month: string;             // e.g. "سبتمبر 2026"
  year: number;
  monthIndex: number;        // 9
  status: PayrollStatus;
  totalEmployees: number;
  totalGrossPayroll: number;
  totalBasicSalaries: number;
  totalAllowances: number;
  totalOvertimeAmount: number;
  totalBonuses: number;
  totalDeductions: number;
  deductionBreakdown: {
    late: number;
    absence: number;
    earlyLeave: number;
    other: number;
  };
  totalNetPayroll: number;
  paidAmount: number;
  pendingAmount: number;
  items: EmployeePayrollItem[];
}

export interface LaboratoryPolicies {
  officialWorkStart: string;    // "09:00"
  officialWorkEnd: string;      // "17:00"
  gracePeriodMinutes: number;   // 15
  autoOvertimeEnabled: boolean;
  overtimeMultiplier: number;   // 1.5
  autoAbsenceEnabled: boolean;  // Mark absent if no log & no approved leave
  lateDeductionType: 'grace_then_exact' | 'tiered' | 'half_day';
  lateDeductionRules: {
    firstOffense: string;
    secondOffense: string;
    thirdOffense: string;
  };
  absenceDeductionDays: number; // 1 day absence = 1.5 or 2 days deduction
  earlyDepartureGraceMinutes: number;
  shiftDurationHours: number;   // 8
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'late' | 'absence' | 'leave' | 'overtime' | 'payroll' | 'biometric_alert' | 'info';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface BiometricDeviceState {
  name: string;
  model: string;
  ipAddress: string;
  port: number;
  serialNumber: string;
  location: string;
  status: 'online' | 'syncing' | 'offline' | 'warning';
  lastSyncTime: string;
  syncedEmployeesCount: number;
  todayRecordsCount: number;
  unmatchedRecordsCount: number;
  firmware: string;
  cloudSyncEnabled: boolean;
}
