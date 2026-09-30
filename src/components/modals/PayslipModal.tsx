import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

export const PayslipModal: React.FC = () => {
  const { selectedPayslipId, openPayslip, employees, payroll, showToast } = useApp();

  if (!selectedPayslipId) return null;

  const employee = employees.find((e) => e.id === selectedPayslipId);
  const payrollItem = payroll.items.find((p) => p.employeeId === selectedPayslipId);

  if (!employee || !payrollItem) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast({
      type: 'success',
      title: 'تم تصدير قسيمة الراتب بتنسيق PDF',
      message: `تم تجهيز ملف Payslip-${employee.id}-09-2026.pdf للطباعة والأرشفة الرسمية`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl my-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Top Controls Bar (Hidden during print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold font-cairo">
              معاينة قسيمة الراتب الإلكترونية (Electronic Payslip)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-cairo transition flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة المستند</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold font-cairo transition flex items-center gap-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل PDF</span>
            </button>
            <button
              onClick={() => openPayslip(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE PAYSLIP CONTAINER */}
        <div className="p-8 bg-white space-y-6 text-slate-800 printable-content">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center shadow-md">
                <Activity className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-lg font-black font-cairo text-slate-900">معمل المنار للتحاليل الطبية</h2>
                <p className="text-xs text-slate-500 font-cairo">MANAR CLINICAL LABORATORY</p>
                <p className="text-[11px] text-slate-400 font-cairo">دمنهور، محافظة البحيرة — هاتف: 045-3312000</p>
              </div>
            </div>

            <div className="text-left font-mono">
              <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 inline-block font-cairo mb-1">
                قسيمة راتب شهر: سبتمبر 2026
              </div>
              <div className="text-[11px] text-slate-400 font-mono">تاريخ الإصدار: 30/09/2026</div>
              <div className="text-[11px] text-slate-400 font-mono">كود المسير: PAY-2026-09</div>
            </div>
          </div>

          {/* Employee Info Grid */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-cairo">
            <div>
              <span className="text-slate-400 block text-[11px]">اسم الموظف:</span>
              <span className="font-bold text-slate-900">{employee.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">الرقم الوظيفي:</span>
              <span className="font-mono font-bold text-blue-700">{employee.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">رقم البصمة:</span>
              <span className="font-mono font-bold text-slate-800">#{employee.biometricId}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">القسم:</span>
              <span className="font-medium text-slate-800">{employee.department}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">المسمى الوظيفي:</span>
              <span className="font-medium text-slate-800">{employee.position}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">تاريخ التعيين:</span>
              <span className="font-mono text-slate-700">{employee.hireDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">طريقة الصرف:</span>
              <span className="font-bold text-emerald-700">تحويل بنكي / إنستاباي</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">حالة الصرف:</span>
              <span className="font-bold text-amber-700">
                {payrollItem.paymentStatus === 'paid' ? 'تم التحويل' : 'جاهز للصرف المالي'}
              </span>
            </div>
          </div>

          {/* Detailed Financial Calculation Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Column 1: Earnings */}
            <div className="rounded-2xl border border-emerald-200 overflow-hidden bg-emerald-50/20">
              <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold font-cairo flex justify-between items-center">
                <span>الاستحقاقات والمكتسبات (Earnings)</span>
                <span>المبلغ (جنيه)</span>
              </div>
              <div className="p-3 text-xs font-cairo space-y-2">
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-slate-600">الراتب الأساسي</span>
                  <span className="font-mono font-bold text-slate-800">{payrollItem.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-slate-600">إجمالي البدلات المعتمدة</span>
                  <span className="font-mono font-bold text-slate-800">+{payrollItem.totalAllowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-slate-600">الساعات الإضافية (Overtime)</span>
                  <span className="font-mono font-bold text-emerald-700">+{payrollItem.overtimeAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-100">
                  <span className="text-slate-600">المكافآت والحوافز</span>
                  <span className="font-mono font-bold text-emerald-700">+{payrollItem.bonuses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-emerald-900 border-t border-emerald-200">
                  <span>إجمالي الاستحقاقات:</span>
                  <span className="font-mono">{payrollItem.grossSalary.toLocaleString()} ج</span>
                </div>
              </div>
            </div>

            {/* Column 2: Deductions */}
            <div className="rounded-2xl border border-rose-200 overflow-hidden bg-rose-50/20">
              <div className="bg-rose-600 text-white px-4 py-2 text-xs font-bold font-cairo flex justify-between items-center">
                <span>الاستقطاعات والخصومات (Deductions)</span>
                <span>المبلغ (جنيه)</span>
              </div>
              <div className="p-3 text-xs font-cairo space-y-2">
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-slate-600">خصم تأخيرات البصمة</span>
                  <span className="font-mono font-bold text-rose-600">
                    {payrollItem.lateDeductions > 0 ? `-${payrollItem.lateDeductions.toLocaleString()}` : '0'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-slate-600">خصم غياب بدون إذن</span>
                  <span className="font-mono font-bold text-rose-600">
                    {payrollItem.absenceDeductions > 0 ? `-${payrollItem.absenceDeductions.toLocaleString()}` : '0'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-slate-600">خصم مغادرة مبكرة</span>
                  <span className="font-mono font-bold text-slate-500">0</span>
                </div>
                <div className="flex justify-between py-1 border-b border-rose-100">
                  <span className="text-slate-600">استقطاعات أخرى / تأمينات</span>
                  <span className="font-mono font-bold text-slate-500">
                    {payrollItem.otherDeductions > 0 ? `-${payrollItem.otherDeductions.toLocaleString()}` : '0'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-rose-900 border-t border-rose-200">
                  <span>إجمالي الاستقطاعات:</span>
                  <span className="font-mono">-{payrollItem.totalDeductions.toLocaleString()} ج</span>
                </div>
              </div>
            </div>
          </div>

          {/* NET SALARY HIGHLIGHT CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-[#0B192C] text-white flex items-center justify-between shadow-lg">
            <div>
              <span className="text-xs text-cyan-300 font-bold block mb-1 font-cairo">
                صافي الراتب المستحق للصرف (Net Payable Salary):
              </span>
              <p className="text-[11px] text-slate-300 font-cairo">
                محسوب آلياً وفقاً لسجلات بصمة الدوام ولوائح معمل المنار
              </p>
            </div>
            <div className="text-left font-mono">
              <span className="text-3xl font-black text-white tracking-tight">
                {payrollItem.netSalary.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-cyan-300 mr-2 font-cairo">جنيه مصري</span>
            </div>
          </div>

          {/* Signatures Footer */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center text-xs font-cairo text-slate-600">
            <div>
              <div className="font-bold mb-8">إعداد الموارد البشرية</div>
              <div className="border-t border-dashed border-slate-300 pt-1 text-[11px] text-slate-400">
                أ / مسؤول شؤون العاملين
              </div>
            </div>
            <div>
              <div className="font-bold mb-8">مراجعة الحسابات والمالية</div>
              <div className="border-t border-dashed border-slate-300 pt-1 text-[11px] text-slate-400">
                أ / طارق القاضي — المحاسب
              </div>
            </div>
            <div>
              <div className="font-bold mb-8">اعتماد الإدارة العامة</div>
              <div className="border-t border-dashed border-slate-300 pt-1 text-[11px] text-slate-400">
                د / عادل المنار — رئيس مجلس الإدارة
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3 font-cairo">
            هذا المستند تم استخراجه آلياً من نظام إدارة الموارد البشرية (Manar HRM & Payroll System) — دمنهور
          </div>
        </div>

        {/* Modal Footer (No-print) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end no-print">
          <button
            onClick={() => openPayslip(null)}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold font-cairo transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
