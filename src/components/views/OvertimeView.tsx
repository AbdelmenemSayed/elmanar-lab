import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock4, TrendingUp, DollarSign, CheckCircle2, AlertCircle, ArrowRight, Download } from 'lucide-react';

export const OvertimeView: React.FC = () => {
  const { overtimeRecords, openEmployeeProfile, showToast, activeScenarioHighlight } = useApp();

  const handleExport = () => {
    showToast({
      type: 'success',
      title: 'تم تصدير كشف الساعات الإضافية',
      message: 'تم تجهيز ملف Overtime_September_2026.xlsx'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
            <Clock4 className="w-6 h-6 text-purple-600" />
            <span>إدارة الساعات الإضافية (Overtime Management)</span>
          </h1>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            احتساب العمل الإضافي آلياً بمعامل 1.5x بعد نهاية ساعات العمل الرسمية (بعد الساعة 05:00 م)
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl text-xs font-bold font-cairo transition shadow-2xs flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-purple-600" />
          <span>تصدير كشف الإضافي (Excel)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-purple-200 bg-purple-50/20 shadow-2xs">
          <span className="text-xs font-bold text-purple-900 font-cairo">إجمالي الساعات الإضافية (سبتمبر)</span>
          <div className="text-2xl font-black text-purple-900 font-mono mt-1">
            126 س 40 د
          </div>
          <span className="text-[11px] text-purple-700 font-cairo">مسجلة من جهاز البصمة</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
          <span className="text-xs font-bold text-emerald-900 font-cairo">إجمالي مقابل العمل الإضافي</span>
          <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
            22,500 ج
          </div>
          <span className="text-[11px] text-emerald-700 font-cairo">تُضاف لمسير رواتب سبتمبر</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-600 font-cairo">معدل الاحتساب المعتمد</span>
          <div className="text-2xl font-black text-slate-800 font-mono mt-1">
            1.5x
          </div>
          <span className="text-[11px] text-slate-500 font-cairo">وفقاً للائحة معمل المنار للتحاليل</span>
        </div>
      </div>

      {/* Overtime Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-cairo text-slate-800">
              سجل ساعات العمل الإضافي المعتمدة
            </h3>
            <p className="text-xs text-slate-500 font-cairo mt-0.5">
              مقارنة ساعات الدوام الفعلي بالدوام المعتمد واحتساب المقابل المالي
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right font-cairo">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">كود الموظف</th>
                <th className="p-4">الموظف</th>
                <th className="p-4">القسم</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">الدوام الرسمي</th>
                <th className="p-4">الدوام الفعلي</th>
                <th className="p-4">الساعات الإضافية</th>
                <th className="p-4">معامل الاحتساب</th>
                <th className="p-4">المبلغ المستحق (EGP)</th>
                <th className="p-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {overtimeRecords.map((ot) => {
                const isHighlighted = activeScenarioHighlight === ot.employeeId;

                return (
                  <tr
                    key={ot.id}
                    className={`transition ${
                      isHighlighted ? 'bg-purple-50 ring-2 ring-purple-400 font-bold' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="p-4 font-bold text-blue-700">{ot.employeeId}</td>

                    <td className="p-4 font-cairo">
                      <button
                        onClick={() => openEmployeeProfile(ot.employeeId)}
                        className="font-bold text-slate-900 hover:text-blue-600 transition"
                      >
                        {ot.employeeName}
                      </button>
                    </td>

                    <td className="p-4 font-cairo text-slate-600">{ot.department}</td>

                    <td className="p-4 font-bold text-slate-800">{ot.date}</td>

                    <td className="p-4 text-slate-600">{ot.regularHours}</td>

                    <td className="p-4 font-bold text-blue-700">{ot.actualHours}</td>

                    <td className="p-4">
                      <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        +{ot.overtimeHoursFormatted}
                      </span>
                    </td>

                    <td className="p-4 font-bold text-slate-700">{ot.multiplier}x</td>

                    <td className="p-4 font-black text-emerald-600 text-sm">
                      +{ot.calculatedAmount.toLocaleString()} ج
                    </td>

                    <td className="p-4 font-cairo">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>معتمد في الرواتب</span>
                      </span>
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
