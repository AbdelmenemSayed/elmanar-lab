import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department, AttendanceStatus } from '../../types/hrm';
import { 
  Clock, 
  Calendar, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  UserX, 
  Sparkles, 
  ArrowRight, 
  Fingerprint, 
  Info,
  CalendarDays
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { 
    attendanceRecords, 
    employees, 
    openEmployeeProfile, 
    activeScenarioHighlight,
    triggerDemoScenario,
    showToast 
  } = useApp();

  const [filterDept, setFilterDept] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('2026-09-30');

  const departments: Department[] = [
    'التحاليل الطبية والباثولوجيا',
    'سحب العينات والاستقبال',
    'الميكروبيولوجي والمناعة',
    'الكيمياء الإكلينيكية',
    'الإدارة والموارد البشرية',
    'الحسابات والمالية',
    'الجودة ومكافحة العدوى',
    'تقنية المعلومات والدعم الفني'
  ];

  const filteredRecords = attendanceRecords.filter((rec) => {
    const emp = employees.find((e) => e.id === rec.employeeId);
    if (!emp) return false;

    const matchesDept = filterDept === 'all' || emp.department === filterDept;
    const matchesStatus = filterStatus === 'all' || rec.status === filterStatus;
    const matchesDate = !filterDate || rec.date === filterDate;

    return matchesDept && matchesStatus && matchesDate;
  });

  const handleExport = () => {
    showToast({
      type: 'success',
      title: 'تم تصدير سجل الحضور اليومي',
      message: 'تم تجهيز ملف Attendance_Report_30_09_2026.xlsx للتحميل'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-blue-600" />
            <span>نظام تسجيل ومتابعة الحضور والانصراف الذكي</span>
          </h1>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            ربط مباشر مع جهاز البصمة البيومتري الخارجي واحتساب تلقائي للدوام والتأخير والإضافي
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl text-xs font-bold font-cairo transition shadow-2xs flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-emerald-600" />
          <span>تصدير كشف الحضور (Excel)</span>
        </button>
      </div>

      {/* AUTOMATIC CALCULATION DEMO CALLOUT - Highlighting the Client's exact logic requirement */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white border border-blue-800 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <span className="p-1 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30">
            <Sparkles className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-bold font-cairo text-cyan-300">
            محرك الاحتساب الآلي لقواعد العمل (Automated Attendance Engine)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-cairo">
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-cyan-200 font-bold mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>مواعيد الدوام وفترة السماح</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              الدوام الرسمي: <span className="font-mono font-bold text-white">09:00 ص → 05:00 م</span>
              <br />
              فترة السماح الصباحية: <span className="font-bold text-emerald-400">15 دقيقة</span> (حتى 09:15 ص دون احتساب تأخير).
            </p>
          </div>

          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-amber-200 font-bold mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>حالة التأخير والعمل الإضافي</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              إذا سجل الموظف <span className="font-mono text-amber-300 font-bold">09:08 ص</span> وانصرف <span className="font-mono text-purple-300 font-bold">06:30 م</span>
              <br />
              يحتسب النظام: <span className="font-bold text-amber-300">تأخير 8 د</span> + <span className="font-bold text-purple-300">إضافي 1 س 30 د</span> تلقائياً.
            </p>
          </div>

          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-rose-200 font-bold mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>الغياب التلقائي بدون إذن</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              إذا لم توجد حركة بصمة ولم توجد إجازة معتمدة، يُسجل تلقائياً <span className="font-bold text-rose-300">"غائب"</span> ويُحال لخصم الراتب في مسير الشهر.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Picker */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-700">
            <Calendar className="w-4 h-4 text-blue-600" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-transparent focus:outline-hidden text-right"
            />
          </div>

          {/* Department Select */}
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-cairo font-bold text-slate-700 focus:outline-hidden"
          >
            <option value="all">كافة الأقسام</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Status Select */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-cairo font-bold text-slate-700 focus:outline-hidden"
          >
            <option value="all">كافة الحالات</option>
            <option value="present">حاضر (Present)</option>
            <option value="late">تأخير / إضافي</option>
            <option value="absent">غائب (Absent)</option>
            <option value="leave">إجازة معتمدة</option>
            <option value="early_departure">مغادرة مبكرة</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-cairo">
          عرض <span className="font-bold text-slate-800">{filteredRecords.length}</span> سجل حضور ليوم{' '}
          <span className="font-mono font-bold text-blue-700">{filterDate}</span>
        </div>
      </div>

      {/* Main Attendance Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right font-cairo">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">كود الموظف</th>
                <th className="p-4">اسم الموظف</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">تسجيل الدخول (Check-in)</th>
                <th className="p-4">تسجيل الخروج (Check-out)</th>
                <th className="p-4">ساعات العمل الفعلية</th>
                <th className="p-4">التأخير (Late)</th>
                <th className="p-4">مغادرة مبكرة</th>
                <th className="p-4">إضافي (Overtime)</th>
                <th className="p-4">الحالة المعتمدة</th>
                <th className="p-4 text-center">الملف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((rec) => {
                const emp = employees.find((e) => e.id === rec.employeeId);
                if (!emp) return null;

                const isHighlighted = activeScenarioHighlight === emp.id;

                return (
                  <tr
                    key={rec.id}
                    className={`transition ${
                      isHighlighted
                        ? 'bg-amber-50 ring-2 ring-amber-400 font-bold'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="p-4 font-mono font-bold">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                        {emp.id}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => openEmployeeProfile(emp.id)}
                        className="font-bold text-slate-900 hover:text-blue-600 transition text-right"
                      >
                        {emp.name}
                      </button>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {emp.department} • {emp.position}
                      </div>
                    </td>

                    <td className="p-4 font-mono font-bold text-slate-700">
                      {rec.date}
                    </td>

                    <td className="p-4 font-mono font-bold">
                      {rec.checkIn ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {rec.checkIn} ص
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="p-4 font-mono font-bold">
                      {rec.checkOut ? (
                        <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                          {rec.checkOut} م
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="p-4 font-mono font-bold text-slate-800">
                      {rec.workingHoursFormatted}
                    </td>

                    <td className="p-4 font-mono">
                      {rec.lateMinutes > 0 ? (
                        <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                          {rec.lateMinutes} د
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4 font-mono">
                      {rec.earlyLeaveMinutes > 0 ? (
                        <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                          {rec.earlyLeaveMinutes} د
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4 font-mono">
                      {rec.overtimeMinutes > 0 ? (
                        <span className="text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                          +{rec.overtimeFormatted}
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4">
                      {rec.status === 'present' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          حاضر
                        </span>
                      )}
                      {rec.status === 'late' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                          حاضر + Overtime
                        </span>
                      )}
                      {rec.status === 'absent' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          غياب بدون إذن
                        </span>
                      )}
                      {rec.status === 'leave' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          إجازة معتمدة
                        </span>
                      )}
                      {rec.status === 'early_departure' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          مغادرة مبكرة
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => openEmployeeProfile(emp.id)}
                        className="px-3 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition font-cairo"
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
    </div>
  );
};
