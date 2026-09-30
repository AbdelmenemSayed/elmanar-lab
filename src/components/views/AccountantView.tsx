import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calculator, 
  DollarSign, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Download, 
  PieChart, 
  FileText,
  Landmark,
  ArrowUpRight,
  SendHorizontal,
  CheckCheck
} from 'lucide-react';

export const AccountantView: React.FC = () => {
  const { 
    payroll, 
    openPayslip, 
    markEmployeeAsPaid, 
    markAllAsPaid, 
    showToast, 
    openEmployeeProfile 
  } = useApp();

  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending' | 'paid'>('all');

  const filteredItems = payroll.items.filter((item) => {
    if (paymentFilter === 'paid') return item.paymentStatus === 'paid';
    if (paymentFilter === 'pending') return item.paymentStatus !== 'paid';
    return true;
  });

  const handleExportBankFile = () => {
    showToast({
      type: 'success',
      title: 'تم تصدير ملف التحويل البنكي (ACH/InstaPay)',
      message: 'تم تجهيز ملف Bank_Transfer_Manar_Sep2026.csv المتوافق مع بنك مصر والبنك الأهلي المصري'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
              <Calculator className="w-6 h-6 text-emerald-600" />
              <span>بوابة الإدارة المالية والمحاسب (Accountant Portal)</span>
            </h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-cairo font-bold">
              مراجعة وصرف الأجور
            </span>
          </div>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            تدقيق الاستقطاعات، متابعة أوامر الدفع الإلكتروني، وتأكيد التحويلات البنكية لكافة موظفي معمل المنار
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportBankFile}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl text-xs font-bold font-cairo transition shadow-2xs flex items-center gap-2"
          >
            <Landmark className="w-4 h-4 text-blue-600" />
            <span>تصدير ملف التحويل البنكي (CSV)</span>
          </button>

          {payroll.status !== 'paid' && (
            <button
              onClick={markAllAsPaid}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold font-cairo transition shadow-md shadow-emerald-500/20 flex items-center gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              <span>تأكيد صرف جميع المرتبات دفعة واحدة</span>
            </button>
          )}
        </div>
      </div>

      {/* 5 MAIN ACCOUNTANT FINANCIAL KPIS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 font-cairo block mb-1">الموظفون المشمولون</span>
          <div className="text-2xl font-black text-slate-800 font-mono">87</div>
          <span className="text-[10px] text-slate-400 font-cairo">طاقم المعمل بالكامل</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 font-cairo block mb-1">إجمالي الاستحقاقات (Gross)</span>
          <div className="text-xl font-black text-blue-700 font-mono">720,400 ج</div>
          <span className="text-[10px] text-slate-400 font-cairo">رواتب وبدلات وإضافي</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-rose-100 bg-rose-50/20 shadow-2xs">
          <span className="text-[11px] font-bold text-rose-800 font-cairo block mb-1">إجمالي الاستقطاعات</span>
          <div className="text-xl font-black text-rose-600 font-mono">-35,000 ج</div>
          <span className="text-[10px] text-rose-600 font-cairo">خصومات الدوام والغياب</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-100 bg-purple-50/20 shadow-2xs">
          <span className="text-[11px] font-bold text-purple-800 font-cairo block mb-1">مقابل العمل الإضافي</span>
          <div className="text-xl font-black text-purple-700 font-mono">+22,500 ج</div>
          <span className="text-[10px] text-purple-600 font-cairo">126 س إضافي معتمد</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-emerald-900 font-cairo block mb-1">صافي مسير الرواتب</span>
          <div className="text-xl font-black text-emerald-700 font-mono">685,400 ج</div>
          <span className="text-[10px] text-emerald-700 font-cairo">Net Payroll Payable</span>
        </div>
      </div>

      {/* DEDUCTIONS BREAKDOWN MATRIX */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold font-cairo text-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-rose-500" />
            <span>تفصيل وبنود الاستقطاعات والخصومات لشهر سبتمبر (Deductions Breakdown)</span>
          </div>
          <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            الإجمالي: 35,000 جنيه مصري
          </span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
            <span className="text-xs font-bold text-amber-900 font-cairo block mb-1">تأخيرات البصمة (Late)</span>
            <div className="text-xl font-black font-mono text-amber-800">8,400 ج</div>
            <p className="text-[10px] text-amber-700 font-cairo mt-1">تطبيق لائحة ربع ونصف يوم</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
            <span className="text-xs font-bold text-rose-900 font-cairo block mb-1">غياب بدون إذن (Absence)</span>
            <div className="text-xl font-black font-mono text-rose-800">18,200 ج</div>
            <p className="text-[10px] text-rose-700 font-cairo mt-1">خصم 1.5 يوم لكل يوم غياب</p>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200">
            <span className="text-xs font-bold text-orange-900 font-cairo block mb-1">مغادرة مبكرة (Early Leave)</span>
            <div className="text-xl font-black font-mono text-orange-800">4,200 ج</div>
            <p className="text-[10px] text-orange-700 font-cairo mt-1">انصراف قبل 05:00 م بدون إذن</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-700 font-cairo block mb-1">استقطاعات أخرى وتأمينات</span>
            <div className="text-xl font-black font-mono text-slate-800">4,200 ج</div>
            <p className="text-[10px] text-slate-500 font-cairo mt-1">حصص التأمين الاجتماعي</p>
          </div>
        </div>
      </div>

      {/* ACCOUNTANT PAYROLL TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold font-cairo text-slate-800">
              جدول التدقيق المالي وصرف مرتبات الموظفين
            </h3>
            <p className="text-xs text-slate-500 font-cairo mt-0.5">
              إمكانية تأكيد الصرف الفردي أو التحويل المجمع مع طباعة قسيمة الراتب
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaymentFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-cairo transition ${
                paymentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              الكل ({payroll.items.length})
            </button>
            <button
              onClick={() => setPaymentFilter('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-cairo transition ${
                paymentFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              بانتظار الصرف ({payroll.items.filter((i) => i.paymentStatus !== 'paid').length})
            </button>
            <button
              onClick={() => setPaymentFilter('paid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-cairo transition ${
                paymentFilter === 'paid' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              تم الصرف ({payroll.items.filter((i) => i.paymentStatus === 'paid').length})
            </button>
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
                <th className="p-4">إضافي</th>
                <th className="p-4">مكافآت</th>
                <th className="p-4">إجمالي الخصم</th>
                <th className="p-4">صافي الراتب المستحق</th>
                <th className="p-4">حالة الصرف</th>
                <th className="p-4 text-center">الإجراءات المالية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredItems.map((item) => (
                <tr key={item.employeeId} className="hover:bg-slate-50/80 transition">
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

                  <td className="p-4 font-bold text-slate-800">{item.basicSalary.toLocaleString()} ج</td>
                  <td className="p-4 text-slate-700">+{item.totalAllowances.toLocaleString()} ج</td>
                  <td className="p-4 text-purple-700 font-bold">
                    {item.overtimeAmount > 0 ? `+${item.overtimeAmount.toLocaleString()} ج` : '0'}
                  </td>
                  <td className="p-4 text-emerald-700">
                    {item.bonuses > 0 ? `+${item.bonuses.toLocaleString()} ج` : '0'}
                  </td>
                  <td className="p-4 font-bold text-rose-600">
                    {item.totalDeductions > 0 ? `-${item.totalDeductions.toLocaleString()} ج` : '0'}
                  </td>
                  <td className="p-4 text-sm font-black text-emerald-700">
                    {item.netSalary.toLocaleString()} ج
                  </td>

                  <td className="p-4 font-cairo">
                    {item.paymentStatus === 'paid' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>تم الصرف</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        جاهز للصرف
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center font-cairo">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => openPayslip(item.employeeId)}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        title="معاينة وطباعة قسيمة الراتب"
                      >
                        <Printer className="w-3 h-3" />
                        <span>قسيمة</span>
                      </button>

                      {item.paymentStatus !== 'paid' && (
                        <button
                          onClick={() => markEmployeeAsPaid(item.employeeId)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-2xs"
                          title="تسجيل كـ تم الصرف"
                        >
                          <SendHorizontal className="w-3 h-3" />
                          <span>صرف</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
