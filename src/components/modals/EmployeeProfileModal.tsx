import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  User, 
  Clock, 
  CalendarDays, 
  Clock4, 
  BadgePercent, 
  History, 
  FileText, 
  Fingerprint, 
  Phone, 
  Mail, 
  Briefcase, 
  Building2, 
  CreditCard, 
  CheckCircle2, 
  Printer, 
  Download,
  AlertCircle
} from 'lucide-react';

export const EmployeeProfileModal: React.FC = () => {
  const { 
    selectedEmployeeId, 
    openEmployeeProfile, 
    employees, 
    attendanceRecords, 
    leaves, 
    overtimeRecords, 
    payroll, 
    openPayslip 
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'attendance' | 'leaves' | 'overtime' | 'salary' | 'history' | 'documents'
  >('overview');

  if (!selectedEmployeeId) return null;

  const employee = employees.find((e) => e.id === selectedEmployeeId);
  if (!employee) return null;

  // Filter employee data
  const empAttendance = attendanceRecords.filter((a) => a.employeeId === employee.id);
  const empLeaves = leaves.filter((l) => l.employeeId === employee.id);
  const empOvertime = overtimeRecords.filter((o) => o.employeeId === employee.id);
  const empPayrollItem = payroll.items.find((p) => p.employeeId === employee.id);

  const totalAllowances = 
    employee.allowances.transport + 
    employee.allowances.hazard + 
    employee.allowances.meal + 
    (employee.allowances.housing || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl my-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#2563EB] text-white p-6 relative shrink-0">
          <button
            onClick={() => openEmployeeProfile(null)}
            className="absolute top-5 left-5 p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-white/20 text-white font-black text-2xl flex items-center justify-center shadow-lg backdrop-blur-md">
                {employee.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black font-cairo tracking-wide">{employee.name}</h2>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-cairo">
                    موظف نشط
                  </span>
                </div>
                <div className="text-xs text-blue-100/90 mt-1 flex flex-wrap items-center gap-3 font-cairo">
                  <span>{employee.position}</span>
                  <span>•</span>
                  <span>{employee.department}</span>
                  <span>•</span>
                  <span className="font-mono bg-white/15 px-2 py-0.5 rounded text-[11px]">
                    {employee.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Biometric Link badge */}
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/30 text-cyan-300 flex items-center justify-center">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="text-[10px] text-cyan-200 font-cairo">معرف جهاز البصمة</div>
                <div className="text-sm font-black font-mono text-white">ID #{employee.biometricId}</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 mt-6 border-b border-white/15 -mb-6 overflow-x-auto text-xs font-bold font-cairo">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: <User className="w-3.5 h-3.5" /> },
              { id: 'attendance', label: 'سجل الحضور', icon: <Clock className="w-3.5 h-3.5" /> },
              { id: 'leaves', label: 'الإجازات', icon: <CalendarDays className="w-3.5 h-3.5" /> },
              { id: 'overtime', label: 'الساعات الإضافية', icon: <Clock4 className="w-3.5 h-3.5" /> },
              { id: 'salary', label: 'تفاصيل الراتب', icon: <BadgePercent className="w-3.5 h-3.5" /> },
              { id: 'history', label: 'أرشيف الرواتب', icon: <History className="w-3.5 h-3.5" /> },
              { id: 'documents', label: 'المستندات والعقود', icon: <FileText className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-900 shadow-md font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body Tabs Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-400 font-bold block mb-1 font-cairo">الراتب الأساسي</span>
                  <span className="text-xl font-black text-slate-800 font-mono">
                    {employee.basicSalary.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-cairo mr-1">جنيه / شهرياً</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-400 font-bold block mb-1 font-cairo">إجمالي البدلات</span>
                  <span className="text-xl font-black text-emerald-600 font-mono">
                    {totalAllowances.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-cairo mr-1">جنيه / شهرياً</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[11px] text-slate-400 font-bold block mb-1 font-cairo">تاريخ بدء العمل</span>
                  <span className="text-base font-bold text-slate-800 font-mono">
                    {employee.hireDate}
                  </span>
                  <span className="text-[11px] text-blue-600 font-cairo block mt-0.5">معتمد لدى معمل المنار</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-800 font-cairo border-b pb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>البيانات الشخصية والتعاقدية</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-cairo">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">الرقم القومي:</span>
                    <span className="font-mono font-bold text-slate-800">{employee.nationalId}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">رقم الهاتف:</span>
                    <span className="font-mono font-bold text-slate-800">{employee.phone}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">البريد الإلكتروني:</span>
                    <span className="font-mono text-slate-800">{employee.email}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">الوردية المعتمدة:</span>
                    <span className="font-bold text-blue-700">
                      {employee.shift === 'morning' ? 'صباحية (09:00 ص - 05:00 م)' : 'مسائية'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">رقم الحساب البنكي / الآيبان:</span>
                    <span className="font-mono text-slate-800 text-[11px]">{employee.bankAccount || 'تحويل عبر إنستاباي'}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">مقر العمل الفعلي:</span>
                    <span className="font-bold text-slate-800">معمل المنار - فرع دمنهور الرئيسي</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800 font-cairo">
                  سجل الحضور والانصراف المرصود من جهاز البصمة
                </h4>
                <span className="text-xs text-slate-500 font-mono">شهر سبتمبر 2026</span>
              </div>

              <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-right font-cairo">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                    <tr>
                      <th className="p-3">التاريخ</th>
                      <th className="p-3">وقت الحضور</th>
                      <th className="p-3">وقت الانصراف</th>
                      <th className="p-3">ساعات العمل</th>
                      <th className="p-3">تأخير</th>
                      <th className="p-3">إضافي</th>
                      <th className="p-3">الحالة المعتمدة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {empAttendance.length > 0 ? (
                      empAttendance.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-50 transition">
                          <td className="p-3 font-bold text-slate-800">{rec.date}</td>
                          <td className="p-3 text-emerald-600 font-bold">{rec.checkIn || '—'}</td>
                          <td className="p-3 text-blue-600 font-bold">{rec.checkOut || '—'}</td>
                          <td className="p-3">{rec.workingHoursFormatted}</td>
                          <td className="p-3">
                            {rec.lateMinutes > 0 ? (
                              <span className="text-amber-600 font-bold">{rec.lateMinutes} د</span>
                            ) : (
                              '0'
                            )}
                          </td>
                          <td className="p-3">
                            {rec.overtimeMinutes > 0 ? (
                              <span className="text-purple-600 font-bold">{rec.overtimeFormatted}</span>
                            ) : (
                              '0'
                            )}
                          </td>
                          <td className="p-3 font-cairo">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {rec.status === 'present' && 'حاضر'}
                              {rec.status === 'late' && 'حاضر + إضافي'}
                              {rec.status === 'absent' && 'غائب'}
                              {rec.status === 'leave' && 'إجازة'}
                              {rec.status === 'early_departure' && 'مغادرة مبكرة'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-slate-400 font-cairo">
                          لا توجد سجلات حضور مسجلة لهذا الموظف
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LEAVES */}
          {activeTab === 'leaves' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center font-cairo">
                  <div className="text-[11px] text-slate-400">رصيد الإجازات السنوية</div>
                  <div className="text-lg font-bold text-blue-600 font-mono">21 يوم</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center font-cairo">
                  <div className="text-[11px] text-slate-400">الإجازات المستهلكة</div>
                  <div className="text-lg font-bold text-amber-600 font-mono">3 أيام</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center font-cairo">
                  <div className="text-[11px] text-slate-400">الرصيد المتبقي</div>
                  <div className="text-lg font-bold text-emerald-600 font-mono">18 يوم</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <h5 className="text-xs font-bold text-slate-800 mb-3 font-cairo">طلبات الإجازات السابقة والحالية</h5>
                {empLeaves.length > 0 ? (
                  empLeaves.map((lv) => (
                    <div key={lv.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between mb-2">
                      <div>
                        <div className="text-xs font-bold text-slate-800 font-cairo">
                          {lv.leaveType === 'annual' && 'إجازة اعتيادية سنوية'}
                          {lv.leaveType === 'sick' && 'إجازة مرضية'}
                          {lv.leaveType === 'emergency' && 'إجازة طارئة (عارضة)'}
                          {lv.leaveType === 'unpaid' && 'إجازة بدون مرتب'}
                          <span className="mr-2 text-slate-500 font-normal">({lv.daysCount} أيام)</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          من {lv.startDate} إلى {lv.endDate} — السبب: {lv.reason}
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-cairo ${
                        lv.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {lv.status === 'approved' ? 'معتمدة' : 'قيد المراجعة'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-cairo text-center py-4">لم تسجل أي طلبات إجازة خلال هذا الشهر</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: OVERTIME */}
          {activeTab === 'overtime' && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-purple-900 font-cairo">إجمالي الساعات الإضافية المعتمدة</h5>
                  <p className="text-[11px] text-purple-700 font-cairo">معدل الاحتساب: 1.5x من أجر ساعة العمل الأساسية</p>
                </div>
                <div className="text-left font-mono">
                  <div className="text-xl font-black text-purple-900">3 س 30 د</div>
                  <div className="text-xs font-bold text-purple-700">1,600 جنيه</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
                {empOvertime.map((ot) => (
                  <div key={ot.id} className="p-3.5 flex items-center justify-between text-xs font-cairo">
                    <div>
                      <div className="font-bold text-slate-800">{ot.date}</div>
                      <div className="text-slate-500 font-mono text-[11px]">
                        ساعات العمل: {ot.actualHours} (إضافي {ot.overtimeHoursFormatted})
                      </div>
                    </div>
                    <div className="text-left font-mono">
                      <span className="text-sm font-bold text-purple-700">+{ot.calculatedAmount} ج</span>
                      <span className="block text-[10px] text-emerald-600 font-bold">معتمد</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SALARY */}
          {activeTab === 'salary' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-slate-800 font-cairo border-b pb-2">
                  مكونات الراتب التفصيلي (معمل المنار)
                </h4>

                <div className="grid grid-cols-2 gap-4 text-xs font-cairo">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">الراتب الأساسي:</span>
                    <span className="text-lg font-black text-slate-800 font-mono">{employee.basicSalary.toLocaleString()} ج</span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="text-blue-700 block mb-1">بدل عدوى ومخاطر مهنية:</span>
                    <span className="text-lg font-black text-blue-900 font-mono">{employee.allowances.hazard} ج</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">بدل انتقال ومواصلات:</span>
                    <span className="text-lg font-black text-slate-800 font-mono">{employee.allowances.transport} ج</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block mb-1">بدل وجبة:</span>
                    <span className="text-lg font-black text-slate-800 font-mono">{employee.allowances.meal} ج</span>
                  </div>
                </div>

                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 font-cairo">إجمالي الراتب التعاقدي الثابت:</span>
                  <span className="text-lg font-black text-emerald-600 font-mono">
                    {(employee.basicSalary + totalAllowances).toLocaleString()} جنيه مصري
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 font-cairo mb-2">مسيرات الرواتب السابقة</h4>
              {[
                { month: 'سبتمبر 2026', net: empPayrollItem?.netSalary || 9450, status: 'قيد المراجعة' },
                { month: 'أغسطس 2026', net: 8850, status: 'تم الصرف' },
                { month: 'يوليو 2026', net: 8500, status: 'تم الصرف' }
              ].map((h, i) => (
                <div key={i} className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800 font-cairo">{h.month}</div>
                    <div className="text-[11px] text-slate-500 font-mono">صافي الأجر: {h.net.toLocaleString()} ج</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openPayslip(employee.id)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold font-cairo transition flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>قسيمة الراتب (Payslip)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 font-cairo mb-2">المستندات الرسمية والتعاقدية</h4>
              {[
                { title: 'عقد العمل المعتمد (معمل المنار)', date: employee.hireDate, type: 'PDF' },
                { title: 'بطاقة الرقم القومي (سارية)', date: '2025-01-10', type: 'IMG' },
                { title: 'شهادة ترخيص مزاولة المهنة (وزارة الصحة)', date: '2024-05-18', type: 'PDF' },
                { title: 'كارنيه نقابة المهن العلمية والطبية', date: '2026-01-01', type: 'PDF' }
              ].map((doc, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-mono font-bold text-xs">
                      {doc.type}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 font-cairo">{doc.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">تاريخ الأرشفة: {doc.date}</div>
                    </div>
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-cairo font-bold flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل النسخة</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={() => openPayslip(employee.id)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-cairo transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>عرض قسيمة الراتب لشهر سبتمبر</span>
          </button>

          <button
            onClick={() => openEmployeeProfile(null)}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold font-cairo transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
