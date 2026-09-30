import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  UserCheck, 
  Clock, 
  UserX, 
  CalendarDays, 
  Clock4, 
  BadgePercent, 
  CheckCircle2, 
  ArrowUpRight, 
  Activity, 
  Fingerprint, 
  TrendingUp, 
  Building2, 
  ChevronLeft,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    attendanceRecords, 
    employees, 
    payroll, 
    setCurrentView, 
    openEmployeeProfile, 
    activeScenarioHighlight,
    triggerDemoScenario 
  } = useApp();

  // Calculations
  const totalEmployees = 87; // Real laboratory count represented
  const presentCount = 74;
  const lateCount = 6;
  const absentCount = 5;
  const onLeaveCount = 2;
  const overtimeFormatted = '126 ساعة و 40 دقيقة';
  const totalPayrollNet = '685,400 جنيه';

  return (
    <div className="space-y-6">
      {/* Executive Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0E3B68] text-white p-7 shadow-xl border border-blue-900/60 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5 font-cairo">
                <Activity className="w-3.5 h-3.5" />
                <span>لوحة التحكم التنفيذية لإدارة المعمل (Executive Dashboard)</span>
              </span>
              <span className="text-xs text-blue-200/80 font-mono">30 سبتمبر 2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-cairo tracking-wide text-white">
              مرحباً بك في نظام الموارد البشرية والأجور
            </h1>
            <p className="text-sm text-blue-100/90 mt-1 font-cairo font-medium">
              معمل المنار للتحاليل الطبية — دمنهور، محافظة البحيرة
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('biometric')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold font-cairo transition backdrop-blur-md border border-white/15 flex items-center gap-2"
            >
              <Fingerprint className="w-4 h-4 text-cyan-300" />
              <span>فحص جهاز البصمة</span>
            </button>

            <button
              onClick={() => setCurrentView('payroll')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold font-cairo transition shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <BadgePercent className="w-4 h-4" />
              <span>مراجعة مسير الرواتب</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8 KPI CARDS - High Precision Executive Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 font-cairo">إجمالي الموظفين</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-800 font-mono">{totalEmployees}</div>
          <span className="text-[10px] text-slate-400 font-cairo">طاقم المعمل بالكامل</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 bg-emerald-50/20 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-800 font-cairo">الحاضرون اليوم</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">{presentCount}</div>
          <span className="text-[10px] text-emerald-600 font-bold font-mono">85.0% نسبة الحضور</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-2xl border border-amber-100 bg-amber-50/20 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-amber-800 font-cairo">المتأخرون</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700 font-mono">{lateCount}</div>
          <span className="text-[10px] text-amber-600 font-cairo">تجاوز فترة السماح</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-2xl border border-rose-100 bg-rose-50/20 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-rose-800 font-cairo">الغائبون</span>
            <UserX className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700 font-mono">{absentCount}</div>
          <span className="text-[10px] text-rose-600 font-cairo">غياب بدون إذن</span>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-4 rounded-2xl border border-blue-100 bg-blue-50/20 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-blue-800 font-cairo">في إجازة</span>
            <CalendarDays className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-700 font-mono">{onLeaveCount}</div>
          <span className="text-[10px] text-blue-600 font-cairo">إجازات معتمدة</span>
        </div>

        {/* Card 6 */}
        <div className="bg-white p-4 rounded-2xl border border-purple-100 bg-purple-50/20 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-purple-800 font-cairo">العمل الإضافي</span>
            <Clock4 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-lg font-black text-purple-800 font-mono leading-tight">126 س 40 د</div>
          <span className="text-[10px] text-purple-600 font-cairo">إجمالي شهر سبتمبر</span>
        </div>

        {/* Card 7 */}
        <div className="bg-white p-4 rounded-2xl border border-indigo-100 bg-indigo-50/20 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-indigo-800 font-cairo">إجمالي الرواتب</span>
            <BadgePercent className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-lg font-black text-indigo-900 font-mono leading-tight">685,400 ج</div>
          <span className="text-[10px] text-indigo-600 font-cairo">صافي أجور سبتمبر</span>
        </div>

        {/* Card 8 */}
        <div className="bg-white p-4 rounded-2xl border border-cyan-100 bg-cyan-50/20 shadow-2xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-cyan-900 font-cairo">حالة Payroll</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-sm font-black text-cyan-900 font-cairo mt-1">
            {payroll.status === 'paid' ? 'تم الصرف' : 'قيد المراجعة'}
          </div>
          <span className="text-[10px] text-cyan-600 font-cairo">بانتظار الاعتماد المالي</span>
        </div>
      </div>

      {/* TODAY'S ATTENDANCE TABLE SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-800 font-cairo">
                جدول حضور وانصراف اليوم (Today's Live Attendance)
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold font-cairo">
                تحديث لحظي من البصمة
              </span>
            </div>
            <p className="text-xs text-slate-500 font-cairo mt-1">
              يتم رصد الحضور ومقارنته آلياً بمواعيد العمل الرسمية (09:00 ص - 05:00 م) وفترة السماح (15 دقيقة)
            </p>
          </div>

          <button
            onClick={() => setCurrentView('attendance')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold font-cairo transition flex items-center gap-1.5"
          >
            <span>عرض سجل الحضور الكامل</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right font-cairo">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">الموظف</th>
                <th className="p-4">القسم</th>
                <th className="p-4">حضور (Check-in)</th>
                <th className="p-4">انصراف (Check-out)</th>
                <th className="p-4">ساعات العمل</th>
                <th className="p-4">التأخير</th>
                <th className="p-4">الإضافي</th>
                <th className="p-4">الحالة المعتمدة</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceRecords.map((record) => {
                const emp = employees.find((e) => e.id === record.employeeId);
                if (!emp) return null;

                const isHighlighted = activeScenarioHighlight === emp.id;

                return (
                  <tr
                    key={record.id}
                    className={`transition ${
                      isHighlighted
                        ? 'bg-amber-50 ring-2 ring-amber-400 font-bold'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{emp.name}</span>
                            {emp.id === 'MN-001' && (
                              <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded font-mono">
                                ديمو إضافي
                              </span>
                            )}
                            {emp.id === 'MN-003' && (
                              <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-mono">
                                ديمو غياب
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {emp.id} • بصمة #{emp.biometricId}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-slate-600 font-medium">
                      {emp.department}
                    </td>

                    <td className="p-4 font-mono font-bold text-slate-800">
                      {record.checkIn ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {record.checkIn} ص
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="p-4 font-mono font-bold text-slate-800">
                      {record.checkOut ? (
                        <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {record.checkOut} م
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="p-4 font-mono font-semibold text-slate-700">
                      {record.workingHoursFormatted}
                    </td>

                    <td className="p-4 font-mono">
                      {record.lateMinutes > 0 ? (
                        <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {record.lateMinutes} دقيقة
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4 font-mono">
                      {record.overtimeMinutes > 0 ? (
                        <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          +{record.overtimeFormatted}
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4">
                      {record.status === 'present' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>حاضر</span>
                        </span>
                      )}
                      {record.status === 'late' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                          <span>حاضر + Overtime</span>
                        </span>
                      )}
                      {record.status === 'absent' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          <span>غائب</span>
                        </span>
                      )}
                      {record.status === 'leave' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          <span>إجازة</span>
                        </span>
                      )}
                      {record.status === 'early_departure' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span>مغادرة مبكرة</span>
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => openEmployeeProfile(emp.id)}
                        className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-xs font-bold transition font-cairo"
                      >
                        الملف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics & Pipeline Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hardware to Payroll Pipeline Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-[#0B192C] to-[#1E3E62] text-white p-6 rounded-3xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h4 className="text-base font-bold font-cairo flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>دورة النظام المتكاملة (End-to-End System Pipeline)</span>
              </h4>
              <p className="text-xs text-slate-300 font-cairo mt-0.5">
                من لحظة ملامسة إصبع الموظف لجهاز البصمة الخارجي وحتى تحويل الراتب الصافي
              </p>
            </div>
            <span className="text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-full font-mono">
              Automated Flow
            </span>
          </div>

          {/* Stepper Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 mx-auto mb-2 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div className="text-xs font-bold font-cairo text-white">جهاز البصمة</div>
              <div className="text-[10px] text-slate-400 mt-1 font-cairo">سحب الحركات عبر TCP/IP</div>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 mx-auto mb-2 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div className="text-xs font-bold font-cairo text-white">تطبيق اللائحة</div>
              <div className="text-[10px] text-slate-400 mt-1 font-cairo">فترة السماح والتأخيرات</div>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 mx-auto mb-2 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div className="text-xs font-bold font-cairo text-white">احتساب الإضافي</div>
              <div className="text-[10px] text-slate-400 mt-1 font-cairo">معامل 1.5x تلقائياً</div>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 mx-auto mb-2 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div className="text-xs font-bold font-cairo text-white">إعداد المرتبات</div>
              <div className="text-[10px] text-slate-400 mt-1 font-cairo">تجهيز مسير رواتب سبتمبر</div>
            </div>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 mx-auto mb-2 flex items-center justify-center font-bold text-xs">
                5
              </div>
              <div className="text-xs font-bold font-cairo text-white">الاعتماد والصرف</div>
              <div className="text-[10px] text-slate-400 mt-1 font-cairo">تحويل بنكي / إنستاباي</div>
            </div>
          </div>
        </div>

        {/* Monthly Payroll Quick Approval Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 font-cairo">مسير رواتب شهر سبتمبر 2026</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-cairo">
                قيد مراجعة المحاسب
              </span>
            </div>

            <div className="space-y-2 py-3 border-y border-slate-100 font-cairo text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">إجمالي الاستحقاقات:</span>
                <span className="font-mono font-bold text-slate-800">720,400 ج</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">إجمالي الاستقطاعات:</span>
                <span className="font-mono font-bold text-rose-600">-35,000 ج</span>
              </div>
              <div className="flex justify-between pt-2 border-t text-sm font-bold">
                <span className="text-slate-800">صافي المستحق للصرف:</span>
                <span className="font-mono text-emerald-600">685,400 ج</span>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <button
              onClick={() => setCurrentView('accountant')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-cairo transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>فتح بوابة المحاسب واعتماد الصرف</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('reports')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold font-cairo transition text-center"
            >
              تصدير تقرير تكاليف الأجور (Excel)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
