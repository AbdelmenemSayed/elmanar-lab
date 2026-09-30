import { 
  Employee, 
  AttendanceRecord, 
  BiometricLog, 
  LeaveRequest, 
  OvertimeRecord, 
  PayrollSummary, 
  LaboratoryPolicies, 
  NotificationItem, 
  BiometricDeviceState 
} from '../types/hrm';

export const INITIAL_POLICIES: LaboratoryPolicies = {
  officialWorkStart: '09:00',
  officialWorkEnd: '17:00',
  gracePeriodMinutes: 15,
  autoOvertimeEnabled: true,
  overtimeMultiplier: 1.5,
  autoAbsenceEnabled: true,
  lateDeductionType: 'grace_then_exact',
  lateDeductionRules: {
    firstOffense: 'إنذار شفهي (حتى 3 مرات خلال الشهر)',
    secondOffense: 'خصم ربع يوم بعد استنفاد فترة السماح',
    thirdOffense: 'خصم نصف يوم عمل + لفت نظر إداري'
  },
  absenceDeductionDays: 1.5, // يوم غياب بدون إذن = خصم أجر يوم ونصف
  earlyDepartureGraceMinutes: 10,
  shiftDurationHours: 8
};

export const INITIAL_BIOMETRIC_DEVICE: BiometricDeviceState = {
  name: 'MANAR-ATTENDANCE-01',
  model: 'ZKTeco BioStation Pro (TCP/IP + Cloud Sync)',
  ipAddress: '192.168.1.240',
  port: 4370,
  serialNumber: 'ZKT-MNR-EG-2026-8841',
  location: 'معمل المنار — المقر الرئيسي (دمنهور، شارع الجمهورية)',
  status: 'online',
  lastSyncTime: '30 سبتمبر 2026 — 08:42 ص',
  syncedEmployeesCount: 87,
  todayRecordsCount: 164,
  unmatchedRecordsCount: 0,
  firmware: 'v3.8.2-Enterprise-AR',
  cloudSyncEnabled: true
};

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'MN-001',
    biometricId: '101',
    name: 'أحمد محمد علي',
    department: 'التحاليل الطبية والباثولوجيا',
    position: 'أخصائي تحاليل طبية أول',
    phone: '01012345678',
    email: 'ahmed.ali@manarlab.com',
    nationalId: '29204151800123',
    hireDate: '2025-03-01',
    basicSalary: 8000,
    allowances: {
      transport: 300,
      hazard: 200, // بدل عدوى ومخاطر
      meal: 0
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678901',
    shift: 'morning'
  },
  {
    id: 'MN-002',
    biometricId: '102',
    name: 'سارة محمود حسن',
    department: 'الكيمياء الإكلينيكية',
    position: 'كيميائية تحاليل طبية',
    phone: '01123456789',
    email: 'sara.hassan@manarlab.com',
    nationalId: '29508101800456',
    hireDate: '2024-06-15',
    basicSalary: 7500,
    allowances: {
      transport: 300,
      hazard: 200,
      meal: 0
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678902',
    shift: 'morning'
  },
  {
    id: 'MN-003',
    biometricId: '103',
    name: 'محمد أحمد السيد',
    department: 'الإدارة والموارد البشرية',
    position: 'منسق شؤون إدارية ومشتريات',
    phone: '01234567890',
    email: 'm.elsayed@manarlab.com',
    nationalId: '28911201800789',
    hireDate: '2023-01-10',
    basicSalary: 6000,
    allowances: {
      transport: 250,
      hazard: 0,
      meal: 150
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678903',
    shift: 'morning'
  },
  {
    id: 'MN-004',
    biometricId: '104',
    name: 'نورهان خالد مصطفى',
    department: 'سحب العينات والاستقبال',
    position: 'أخصائية سحب عينات واستقبال',
    phone: '01098765432',
    email: 'nourhan.khaled@manarlab.com',
    nationalId: '29703221800999',
    hireDate: '2025-01-01',
    basicSalary: 6800,
    allowances: {
      transport: 250,
      hazard: 250,
      meal: 0
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678904',
    shift: 'morning'
  },
  {
    id: 'MN-005',
    biometricId: '105',
    name: 'د. محمود عبدالرحمن غانم',
    department: 'الميكروبيولوجي والمناعة',
    position: 'استشاري ميكروبيولوجيا ومدير فني',
    phone: '01005544332',
    email: 'dr.mahmoud@manarlab.com',
    nationalId: '27805121800555',
    hireDate: '2021-08-01',
    basicSalary: 18500,
    allowances: {
      transport: 1000,
      hazard: 1500,
      meal: 500
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678905',
    shift: 'morning'
  },
  {
    id: 'MN-006',
    biometricId: '106',
    name: 'مريم أشرف النجار',
    department: 'الجودة ومكافحة العدوى',
    position: 'مسؤولة تأكيد الجودة والاعتماد',
    phone: '01144556677',
    email: 'mariam.naggar@manarlab.com',
    nationalId: '29609141800333',
    hireDate: '2024-02-15',
    basicSalary: 8200,
    allowances: {
      transport: 300,
      hazard: 300,
      meal: 200
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678906',
    shift: 'morning'
  },
  {
    id: 'MN-007',
    biometricId: '107',
    name: 'يوسف حسن إبراهيم',
    department: 'تقنية المعلومات والدعم الفني',
    position: 'مهندس نظم وربط أجهزة مخبرية',
    phone: '01223344556',
    email: 'youssef.hassan@manarlab.com',
    nationalId: '29412051800222',
    hireDate: '2023-11-01',
    basicSalary: 7200,
    allowances: {
      transport: 400,
      hazard: 0,
      meal: 200
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678907',
    shift: 'morning'
  },
  {
    id: 'MN-008',
    biometricId: '108',
    name: 'منة أحمد رضوان',
    department: 'سحب العينات والاستقبال',
    position: 'مشرفة استقبال وخدمة مراجعين',
    phone: '01066778899',
    email: 'menna.radwan@manarlab.com',
    nationalId: '29807181800888',
    hireDate: '2024-09-01',
    basicSalary: 5800,
    allowances: {
      transport: 250,
      hazard: 150,
      meal: 0
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678908',
    shift: 'morning'
  },
  {
    id: 'MN-009',
    biometricId: '109',
    name: 'طارق زياد القاضي',
    department: 'الحسابات والمالية',
    position: 'محاسب أول أجور ومصروفات',
    phone: '01199887766',
    email: 'tarek.kadi@manarlab.com',
    nationalId: '29101011800111',
    hireDate: '2022-04-10',
    basicSalary: 8500,
    allowances: {
      transport: 300,
      hazard: 0,
      meal: 200
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678909',
    shift: 'morning'
  },
  {
    id: 'MN-010',
    biometricId: '110',
    name: 'هدير كمال الشاذلي',
    department: 'التحاليل الطبية والباثولوجيا',
    position: 'فنية تحاليل دم ومصليات',
    phone: '01277665544',
    email: 'hadeer.kamal@manarlab.com',
    nationalId: '29711041800666',
    hireDate: '2025-05-15',
    basicSalary: 6400,
    allowances: {
      transport: 250,
      hazard: 250,
      meal: 0
    },
    status: 'active',
    bankAccount: 'EG380002000100000012345678910',
    shift: 'morning'
  }
];

export const MOCK_ATTENDANCE_TODAY: AttendanceRecord[] = [
  {
    id: 'ATT-20260930-01',
    employeeId: 'MN-001',
    date: '2026-09-30',
    checkIn: '09:08',
    checkOut: '18:30',
    workingHoursFormatted: '9 س 22 د',
    workingHoursMinutes: 562,
    lateMinutes: 8, // دخل 09:08 (أكثر من 09:00 ولكن ضمن فترة السماح أو محسوب حسب السياسة)
    earlyLeaveMinutes: 0,
    overtimeMinutes: 90, // بعد 17:00 حتى 18:30 = 1 ساعة 30 دقيقة
    overtimeFormatted: '1 س 30 د',
    status: 'late', // أو حاضر + Overtime
    note: 'تسجيل بصمة حقيقي من جهاز ZKTeco'
  },
  {
    id: 'ATT-20260930-02',
    employeeId: 'MN-002',
    date: '2026-09-30',
    checkIn: '09:05',
    checkOut: '17:00',
    workingHoursFormatted: '7 س 55 د',
    workingHoursMinutes: 475,
    lateMinutes: 0, // داخل فترة السماح (15 دقيقة)
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    overtimeFormatted: '0 د',
    status: 'present',
    note: 'حضور منضبط'
  },
  {
    id: 'ATT-20260930-03',
    employeeId: 'MN-003',
    date: '2026-09-30',
    checkIn: null,
    checkOut: null,
    workingHoursFormatted: '0 س',
    workingHoursMinutes: 0,
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    overtimeFormatted: '0 د',
    status: 'absent',
    note: 'غياب تلقائي بدون تسجيل بصمة وبدون إجازة معتمدة'
  },
  {
    id: 'ATT-20260930-04',
    employeeId: 'MN-004',
    date: '2026-09-30',
    checkIn: '08:52',
    checkOut: '17:02',
    workingHoursFormatted: '8 س 10 د',
    workingHoursMinutes: 490,
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 2,
    overtimeFormatted: '0 د',
    status: 'present'
  },
  {
    id: 'ATT-20260930-05',
    employeeId: 'MN-005',
    date: '2026-09-30',
    checkIn: '08:45',
    checkOut: '18:15',
    workingHoursFormatted: '9 س 30 د',
    workingHoursMinutes: 570,
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 75,
    overtimeFormatted: '1 س 15 د',
    status: 'present'
  },
  {
    id: 'ATT-20260930-06',
    employeeId: 'MN-006',
    date: '2026-09-30',
    checkIn: '09:22',
    checkOut: '17:00',
    workingHoursFormatted: '7 س 38 د',
    workingHoursMinutes: 458,
    lateMinutes: 22,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    overtimeFormatted: '0 د',
    status: 'late',
    note: 'تأخير 22 دقيقة عن الموعد الرسمي'
  },
  {
    id: 'ATT-20260930-07',
    employeeId: 'MN-007',
    date: '2026-09-30',
    checkIn: '08:58',
    checkOut: '17:45',
    workingHoursFormatted: '8 س 47 د',
    workingHoursMinutes: 527,
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 45,
    overtimeFormatted: '45 د',
    status: 'present'
  },
  {
    id: 'ATT-20260930-08',
    employeeId: 'MN-008',
    date: '2026-09-30',
    checkIn: null,
    checkOut: null,
    workingHoursFormatted: '0 س',
    workingHoursMinutes: 0,
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    overtimeFormatted: '0 د',
    status: 'leave',
    note: 'إجازة اعتيادية معتمدة مسبقاً'
  },
  {
    id: 'ATT-20260930-09',
    employeeId: 'MN-009',
    date: '2026-09-30',
    checkIn: '08:50',
    checkOut: '17:05',
    workingHoursFormatted: '8 س 15 د',
    workingHoursMinutes: 495,
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 5,
    overtimeFormatted: '0 د',
    status: 'present'
  },
  {
    id: 'ATT-20260930-10',
    employeeId: 'MN-010',
    date: '2026-09-30',
    checkIn: '09:00',
    checkOut: '15:30',
    workingHoursFormatted: '6 س 30 د',
    workingHoursMinutes: 390,
    lateMinutes: 0,
    earlyLeaveMinutes: 90,
    overtimeMinutes: 0,
    overtimeFormatted: '0 د',
    status: 'early_departure',
    note: 'مغادرة مبكرة بإذن طارئ'
  }
];

export const MOCK_BIOMETRIC_LOGS: BiometricLog[] = [
  {
    id: 'LOG-8841-01',
    timestamp: '2026-09-30 08:45:10',
    biometricId: '105',
    employeeId: 'MN-005',
    employeeName: 'د. محمود عبدالرحمن غانم',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-02',
    timestamp: '2026-09-30 08:50:32',
    biometricId: '109',
    employeeId: 'MN-009',
    employeeName: 'طارق زياد القاضي',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'face',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-03',
    timestamp: '2026-09-30 08:52:19',
    biometricId: '104',
    employeeId: 'MN-004',
    employeeName: 'نورهان خالد مصطفى',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-04',
    timestamp: '2026-09-30 08:55:04',
    biometricId: '101',
    employeeId: 'MN-001',
    employeeName: 'أحمد محمد علي',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-05',
    timestamp: '2026-09-30 08:58:20',
    biometricId: '107',
    employeeId: 'MN-007',
    employeeName: 'يوسف حسن إبراهيم',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-06',
    timestamp: '2026-09-30 09:05:40',
    biometricId: '102',
    employeeId: 'MN-002',
    employeeName: 'سارة محمود حسن',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-07',
    timestamp: '2026-09-30 09:08:14',
    biometricId: '101',
    employeeId: 'MN-001',
    employeeName: 'أحمد محمد علي',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-08',
    timestamp: '2026-09-30 09:18:22',
    biometricId: '123',
    employeeId: 'MN-023',
    employeeName: 'كريم عادل الديب',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-09',
    timestamp: '2026-09-30 09:22:50',
    biometricId: '106',
    employeeId: 'MN-006',
    employeeName: 'مريم أشرف النجار',
    type: 'check_in',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'face',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-10',
    timestamp: '2026-09-30 15:30:15',
    biometricId: '110',
    employeeId: 'MN-010',
    employeeName: 'هدير كمال الشاذلي',
    type: 'check_out',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-11',
    timestamp: '2026-09-30 17:00:10',
    biometricId: '102',
    employeeId: 'MN-002',
    employeeName: 'سارة محمود حسن',
    type: 'check_out',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-12',
    timestamp: '2026-09-30 17:05:08',
    biometricId: '109',
    employeeId: 'MN-009',
    employeeName: 'طارق زياد القاضي',
    type: 'check_out',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  },
  {
    id: 'LOG-8841-13',
    timestamp: '2026-09-30 18:30:45',
    biometricId: '101',
    employeeId: 'MN-001',
    employeeName: 'أحمد محمد علي',
    type: 'check_out',
    deviceSn: 'ZKT-MNR-EG-2026-8841',
    verifyMode: 'fingerprint',
    processStatus: 'matched'
  }
];

export const MOCK_LEAVES: LeaveRequest[] = [
  {
    id: 'LV-2026-041',
    employeeId: 'MN-008',
    employeeName: 'منة أحمد رضوان',
    department: 'سحب العينات والاستقبال',
    leaveType: 'annual',
    startDate: '2026-09-30',
    endDate: '2026-10-02',
    daysCount: 3,
    reason: 'إجازة اعتيادية سنوية مجدولة',
    status: 'approved',
    approvedBy: 'مدير الموارد البشرية',
    createdAt: '2026-09-27'
  },
  {
    id: 'LV-2026-042',
    employeeId: 'MN-006',
    employeeName: 'مريم أشرف النجار',
    department: 'الجودة ومكافحة العدوى',
    leaveType: 'sick',
    startDate: '2026-10-05',
    endDate: '2026-10-06',
    daysCount: 2,
    reason: 'عذر صحي مع تقرير طبي مرفق',
    status: 'pending',
    createdAt: '2026-09-29'
  },
  {
    id: 'LV-2026-040',
    employeeId: 'MN-002',
    employeeName: 'سارة محمود حسن',
    department: 'الكيمياء الإكلينيكية',
    leaveType: 'emergency',
    startDate: '2026-09-15',
    endDate: '2026-09-15',
    daysCount: 1,
    reason: 'ظرف عائلي طارئ',
    status: 'approved',
    approvedBy: 'مدير الفرع',
    createdAt: '2026-09-14'
  }
];

export const MOCK_OVERTIME_RECORDS: OvertimeRecord[] = [
  {
    id: 'OT-2026-09-01',
    employeeId: 'MN-001',
    employeeName: 'أحمد محمد علي',
    department: 'التحاليل الطبية والباثولوجيا',
    date: '30 سبتمبر 2026',
    regularHours: '8 س',
    actualHours: '9 س 30 د',
    overtimeHoursFormatted: '1 س 30 د',
    overtimeHoursDecimal: 1.5,
    multiplier: 1.5,
    calculatedAmount: 750, // حسب الحسبة التجريبية
    status: 'approved'
  },
  {
    id: 'OT-2026-09-02',
    employeeId: 'MN-005',
    employeeName: 'د. محمود عبدالرحمن غانم',
    department: 'الميكروبيولوجي والمناعة',
    date: '30 سبتمبر 2026',
    regularHours: '8 س',
    actualHours: '9 س 15 د',
    overtimeHoursFormatted: '1 س 15 د',
    overtimeHoursDecimal: 1.25,
    multiplier: 1.5,
    calculatedAmount: 1100,
    status: 'approved'
  },
  {
    id: 'OT-2026-09-03',
    employeeId: 'MN-007',
    employeeName: 'يوسف حسن إبراهيم',
    department: 'تقنية المعلومات والدعم الفني',
    date: '30 سبتمبر 2026',
    regularHours: '8 س',
    actualHours: '8 س 45 د',
    overtimeHoursFormatted: '45 د',
    overtimeHoursDecimal: 0.75,
    multiplier: 1.5,
    calculatedAmount: 420,
    status: 'approved'
  },
  {
    id: 'OT-2026-09-04',
    employeeId: 'MN-001',
    employeeName: 'أحمد محمد علي',
    department: 'التحاليل الطبية والباثولوجيا',
    date: '28 سبتمبر 2026',
    regularHours: '8 س',
    actualHours: '10 س 00 د',
    overtimeHoursFormatted: '2 س 00 د',
    overtimeHoursDecimal: 2.0,
    multiplier: 1.5,
    calculatedAmount: 850,
    status: 'approved'
  }
];

export const MOCK_PAYROLL_SEPTEMBER: PayrollSummary = {
  month: 'سبتمبر 2026',
  year: 2026,
  monthIndex: 9,
  status: 'accountant_reviewed', // قيد المراجعة / مراجعة المحاسب
  totalEmployees: 87,
  totalGrossPayroll: 720400,
  totalBasicSalaries: 635000,
  totalAllowances: 42000,
  totalOvertimeAmount: 22500,
  totalBonuses: 20900,
  totalDeductions: 35000,
  deductionBreakdown: {
    late: 8400,
    absence: 18200,
    earlyLeave: 4200,
    other: 4200
  },
  totalNetPayroll: 685400,
  paidAmount: 0,
  pendingAmount: 685400,
  items: [
    {
      employeeId: 'MN-001',
      employeeName: 'أحمد محمد علي',
      department: 'التحاليل الطبية والباثولوجيا',
      position: 'أخصائي تحاليل طبية أول',
      basicSalary: 8000,
      totalAllowances: 500,
      overtimeAmount: 750,
      bonuses: 300,
      lateDeductions: 100,
      absenceDeductions: 0,
      otherDeductions: 0,
      totalDeductions: 100,
      grossSalary: 9550,
      netSalary: 9450, // 8000 + 500 + 750 + 300 - 100 = 9450
      paymentStatus: 'pending_review'
    },
    {
      employeeId: 'MN-002',
      employeeName: 'سارة محمود حسن',
      department: 'الكيمياء الإكلينيكية',
      position: 'كيميائية تحاليل طبية',
      basicSalary: 7500,
      totalAllowances: 500,
      overtimeAmount: 0,
      bonuses: 250,
      lateDeductions: 0,
      absenceDeductions: 0,
      otherDeductions: 0,
      totalDeductions: 0,
      grossSalary: 8250,
      netSalary: 8250,
      paymentStatus: 'pending_review'
    },
    {
      employeeId: 'MN-003',
      employeeName: 'محمد أحمد السيد',
      department: 'الإدارة والموارد البشرية',
      position: 'منسق شؤون إدارية ومشتريات',
      basicSalary: 6000,
      totalAllowances: 400,
      overtimeAmount: 0,
      bonuses: 0,
      lateDeductions: 0,
      absenceDeductions: 300, // خصم يوم ونصف غياب بدون إذن
      otherDeductions: 0,
      totalDeductions: 300,
      grossSalary: 6400,
      netSalary: 6100, // 6000 + 400 - 300 = 6100
      paymentStatus: 'pending_review'
    },
    {
      employeeId: 'MN-004',
      employeeName: 'نورهان خالد مصطفى',
      department: 'سحب العينات والاستقبال',
      position: 'أخصائية سحب عينات واستقبال',
      basicSalary: 6800,
      totalAllowances: 500,
      overtimeAmount: 180,
      bonuses: 200,
      lateDeductions: 0,
      absenceDeductions: 0,
      otherDeductions: 0,
      totalDeductions: 0,
      grossSalary: 7680,
      netSalary: 7680,
      paymentStatus: 'pending_review'
    },
    {
      employeeId: 'MN-005',
      employeeName: 'د. محمود عبدالرحمن غانم',
      department: 'الميكروبيولوجي والمناعة',
      position: 'استشاري ميكروبيولوجيا ومدير فني',
      basicSalary: 18500,
      totalAllowances: 3000,
      overtimeAmount: 1600,
      bonuses: 1200,
      lateDeductions: 0,
      absenceDeductions: 0,
      otherDeductions: 0,
      totalDeductions: 0,
      grossSalary: 24300,
      netSalary: 24300,
      paymentStatus: 'pending_review'
    },
    {
      employeeId: 'MN-006',
      employeeName: 'مريم أشرف النجار',
      department: 'الجودة ومكافحة العدوى',
      position: 'مسؤولة تأكيد الجودة والاعتماد',
      basicSalary: 8200,
      totalAllowances: 800,
      overtimeAmount: 0,
      bonuses: 400,
      lateDeductions: 120,
      absenceDeductions: 0,
      otherDeductions: 0,
      totalDeductions: 120,
      grossSalary: 9400,
      netSalary: 9280,
      paymentStatus: 'pending_review'
    },
    {
      employeeId: 'MN-007',
      employeeName: 'يوسف حسن إبراهيم',
      department: 'تقنية المعلومات والدعم الفني',
      position: 'مهندس نظم وربط أجهزة مخبرية',
      basicSalary: 7200,
      totalAllowances: 600,
      overtimeAmount: 420,
      bonuses: 300,
      lateDeductions: 0,
      absenceDeductions: 0,
      otherDeductions: 0,
      totalDeductions: 0,
      grossSalary: 8520,
      netSalary: 8520,
      paymentStatus: 'pending_review'
    },
    {
      employeeId: 'MN-008',
      employeeName: 'منة أحمد رضوان',
      department: 'سحب العينات والاستقبال',
      position: 'مشرفة استقبال وخدمة مراجعين',
      basicSalary: 5800,
      totalAllowances: 400,
      overtimeAmount: 0,
      bonuses: 200,
      lateDeductions: 0,
      absenceDeductions: 0,
      otherDeductions: 0,
      totalDeductions: 0,
      grossSalary: 6400,
      netSalary: 6400,
      paymentStatus: 'pending_review'
    }
  ]
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NT-01',
    title: 'تأخير حضور موظف',
    message: 'سجل الموظف أحمد محمد علي (MN-001) حضوراً الساعة 09:08 ص بتأخير 8 دقائق عن الموعد.',
    type: 'late',
    timestamp: 'اليوم — 09:09 ص',
    isRead: false
  },
  {
    id: 'NT-02',
    title: 'غياب غير مسجل',
    message: 'تم اكتشاف غياب للموظف محمد حسن السيد (MN-003) بتاريخ 30/09/2026 لعدم وجود بصمة أو إجازة معتمدة.',
    type: 'absence',
    timestamp: 'اليوم — 10:15 ص',
    isRead: false
  },
  {
    id: 'NT-03',
    title: 'ساعات إضافية مسجلة',
    message: 'سجل جهاز البصمة مغادرة متأخرة للأخصائي أحمد محمد علي الساعة 06:30 م (إضافي 1 س و30 د).',
    type: 'overtime',
    timestamp: 'اليوم — 06:31 م',
    isRead: false
  },
  {
    id: 'NT-04',
    title: 'رواتب سبتمبر جاهزة للمراجعة',
    message: 'اكتمل احتساب مسير رواتب شهر سبتمبر 2026 بإجمالي 685,400 جنيه بانتظار اعتماد الإدارة والمحاسب.',
    type: 'payroll',
    timestamp: 'أمس — 04:30 م',
    isRead: false
  },
  {
    id: 'NT-05',
    title: 'مزامنة ناجحة لجهاز البصمة',
    message: 'تم سحب 164 حركة حضور وانصراف بنجاح من جهاز MANAR-ATTENDANCE-01 بدون أي سجلات مجهولة.',
    type: 'biometric_alert',
    timestamp: 'اليوم — 08:42 ص',
    isRead: true
  },
  {
    id: 'NT-06',
    title: 'طلب إجازة جديد',
    message: 'قدمت مريم أشرف طلب إجازة مرضية لمدة يومين تبدأ من 05/10/2026.',
    type: 'leave',
    timestamp: 'منذ يومين',
    isRead: true
  }
];
