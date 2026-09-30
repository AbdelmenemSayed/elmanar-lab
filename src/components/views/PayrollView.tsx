import React from 'react';
import { useApp } from '../../context/AppContext';
import { PayrollStatus } from '../../types/hrm';
import { 
  BadgePercent, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Download, 
  Printer, 
  AlertCircle, 
  FileSpreadsheet, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';

export const PayrollView: React.FC = () => {
  const { 
    payroll, 
    openPayslip, 
    advancePayrollStatus, 
    showToast, 
    openEmployeeProfile, 
    activeScenarioHighlight 
  } = useApp();

  // Workflow steps definition
  const workflowSteps: { status: PayrollStatus; label: string; desc: string }[] = [
    { status: 'attendance_closed', label: 'إغلاق الدوام', desc: 'اكتمال سجلات البصمة' },
    { status: 'calculated', label: 'الاحتساب الآلي', desc: 'إضافي وتأخير وغياب' },
    { status: 'hr_reviewed', label: 'مراجعة الموارد البشرية', desc: 'تدقيق شؤون الموظفين' },
    { status: 'accountant_reviewed', label: 'مراجعة المحاسب', desc: 'التدقيق المالي والخصومات' },
    { status: 'management_approved', label: 'اعتماد الإدارة', desc: 'موافقة رئيس مجلس الإدارة' },
    { status: 'ready_for_payment', label: 'جاهز للتحويل', desc: 'إصدار أوامر الدفع' },
    { status: 'paid', label: 'تم الصرف البنكي', desc: 'تحويل الحسابات وإنستاباي' },
  ];

  const statusOrder: PayrollStatus[] = [
    'attendance_closed',
    'calculated',
    'hr_reviewed',
    'accountant_reviewed',
    'management_approved',
    'ready_for_payment',
    'paid'
  ];

  const currentStepIndex = statusOrder.indexOf(payroll.status);

  const handleExport = () => {
    showToast({
      type: 'success',
      title: 'تم تصدير مسير الرواتب الكامل',
      message: 'تم تجهيز ملف Manar_Lab_Payroll_September_2026.xlsx'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
              <BadgePercent className="w-6 h-6 text-blue-600" />
              <span>نظام إدارة مسير الرواتب والأجور (Payroll Management)</span>
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-cairo font-bold">
              شهر سبتمبر 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            احتساب مالي دقيق يربط بين بصمات الحضور والانصراف، لوائح الخصم، ومكافآت الساعات الإضافية
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl text-xs font-bold font-cairo transition shadow-2xs flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>تصدير مسير الرواتب (Excel)</span>
          </button>
        </div>
      </div>

      {/* VISUAL PAYROLL FORMULA BANNER */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#2563EB] text-white p-6 rounded-3xl border border-blue-900 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold font-cairo text-cyan-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>معادلة احتساب صافي الراتب المعتمدة (Salary Calculation Formula)</span>
          </h3>
          <span className="text-xs text-blue-200 font-mono">Manar HRM Engine</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <span className="text-[10px] text-blue-200 font-cairo block mb-1">الراتب الأساسي</span>
            <div className="text-lg font-black font-mono text-white">635,000 ج</div>
            <span className="text-[10px] text-slate-300 font-cairo">Basic Salary</span>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <span className="text-[10px] text-emerald-300 font-cairo block mb-1">+ إجمالي البدلات</span>
            <div className="text-lg font-black font-mono text-emerald-300">42,000 ج</div>
            <span className="text-[10px] text-slate-300 font-cairo">عدوى وانتقال ووجبة</span>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <span className="text-[10px] text-purple-300 font-cairo block mb-1">+ العمل الإضافي</span>
            <div className="text-lg font-black font-mono text-purple-300">22,500 ج</div>
            <span className="text-[10px] text-slate-300 font-cairo">126 س إضافي معتمد</span>
          </div>

          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <span className="text-[10px] text-cyan-300 font-cairo block mb-1">+ مكافآت وحوافز</span>
            <div className="text-lg font-black font-mono text-cyan-300">20,900 ج</div>
            <span className="text-[10px] text-slate-300 font-cairo">أداء متميز وجودة</span>
          </div>

          <div className="p-3 bg-rose-500/20 backdrop-blur-md rounded-2xl border border-rose-400/30">
            <span className="text-[10px] text-rose-300 font-cairo block mb-1">− إجمالي الاستقطاعات</span>
            <div className="text-lg font-black font-mono text-rose-300">-35,000 ج</div>
            <span className="text-[10px] text-rose-200 font-cairo">تأخير وغياب وتأمينات</span>
          </div>

          <div className="p-3 bg-emerald-500/20 backdrop-blur-md rounded-2xl border border-emerald-400/40">
            <span className="text-[10px] text-emerald-200 font-cairo block mb-1">= صافي المسير الإجمالي</span>
            <div className="text-lg font-black font-mono text-white">685,400 ج</div>
            <span className="text-[10px] text-emerald-300 font-cairo">Net Payable Amount</span>
          </div>
        </div>
      </div>

      {/* MULTI-STAGE PAYROLL APPROVAL WORKFLOW BAR */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold font-cairo text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>مسار المراجعة والاعتماد المالي (Monthly Payroll Approval Workflow)</span>
            </h3>
            <p className="text-xs text-slate-500 font-cairo mt-0.5">
              خطوات تدقيق واعتماد مسير الأجور الشهري وفقاً لدورة الحوكمة بمعمل المنار
            </p>
          </div>

          {/* Interactive Advance Button for demo presentation */}
          <div className="flex items-center gap-2">
            {payroll.status === 'accountant_reviewed' && (
              <button
                onClick={() => advancePayrollStatus('management_approved')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-cairo transition shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>اعتماد الإدارة العليا (Approve Payroll)</span>
              </button>
            )}

            {payroll.status === 'management_approved' && (
              <button
                onClick={() => advancePayrollStatus('ready_for_payment')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold font-cairo transition shadow-sm flex items-center gap-1.5"
              >
                <span>تجهيز ملف الصرف البنكي (Ready for Payment)</span>
              </button>
            )}

            {payroll.status === 'ready_for_payment' && (
              <button
                onClick={() => advancePayrollStatus('paid')}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-cairo transition shadow-sm flex items-center gap-1.5"
              >
                <CheckCheck className="w-4 h-4" />
                <span>تسجيل الصرف لكافة الموظفين (Mark as Paid)</span>
              </button>
            )}

            {payroll.status === 'paid' && (
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold font-cairo border border-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تم إتمام الصرف المالي لكافة الموظفين بنجاح</span>
              </span>
            )}
          </div>
        </div>

        {/* Stepper visual */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
          {workflowSteps.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.status}
                className={`p-3 rounded-2xl border text-center transition ${
                  isCurrent
                    ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200'
                    : isCompleted
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <div className="text-xs font-bold font-cairo text-slate-800 truncate">
                  {step.label}
                </div>
                <div className="text-[10px] text-slate-500 font-cairo truncate mt-0.5">
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EMPLOYEE PAYROLL TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-cairo text-slate-800">
              كشف تفصيلي بمسير رواتب موظفي معمل المنار
            </h3>
            <p className="text-xs text-slate-500 font-cairo mt-0.5">
              مفردات مرتبات شهر سبتمبر 2026 مع كافة البدلات والاستقطاعات
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right font-cairo">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">كود</th>
                <th className="p-4">الموظف والوظيفة</th>
                <th className="p-4">الأساسي</th>
                <th className="p-4">البدلات</th>
                <th className="p-4">إضافي (OT)</th>
                <th className="p-4">مكافآت</th>
                <th className="p-4">خصم تأخير</th>
                <th className="p-4">خصم غياب</th>
                <th className="p-4">صافي الراتب (Net)</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">قسيمة الراتب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {payroll.items.map((item) => {
                const isHighlighted = activeScenarioHighlight === item.employeeId;

                return (
                  <tr
                    key={item.employeeId}
                    className={`transition ${
                      isHighlighted ? 'bg-amber-50 ring-2 ring-amber-400 font-bold' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="p-4 font-bold text-blue-700">{item.employeeId}</td>

                    <td className="p-4 font-cairo">
                      <button
                        onClick={() => openEmployeeProfile(item.employeeId)}
                        className="font-bold text-slate-900 hover:text-blue-600 transition block text-right"
                      >
                        {item.employeeName}
                      </button>
                      <span className="text-[11px] text-slate-500">{item.position}</span>
                    </td>

                    <td className="p-4 font-bold text-slate-800">
                      {item.basicSalary.toLocaleString()} ج
                    </td>

                    <td className="p-4 font-bold text-slate-700">
                      +{item.totalAllowances.toLocaleString()} ج
                    </td>

                    <td className="p-4">
                      {item.overtimeAmount > 0 ? (
                        <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          +{item.overtimeAmount.toLocaleString()} ج
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4">
                      {item.bonuses > 0 ? (
                        <span className="text-emerald-700 font-bold">+{item.bonuses.toLocaleString()} ج</span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4">
                      {item.lateDeductions > 0 ? (
                        <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          -{item.lateDeductions.toLocaleString()} ج
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4">
                      {item.absenceDeductions > 0 ? (
                        <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          -{item.absenceDeductions.toLocaleString()} ج
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="p-4 text-sm font-black text-emerald-700">
                      {item.netSalary.toLocaleString()} ج
                    </td>

                    <td className="p-4 font-cairo">
                      {item.paymentStatus === 'paid' ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          تم الصرف
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          قيد المراجعة
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center font-cairo">
                      <button
                        onClick={() => openPayslip(item.employeeId)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 mx-auto border border-blue-200 shadow-2xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>معاينة Payslip</span>
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
