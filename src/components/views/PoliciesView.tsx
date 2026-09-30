import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LaboratoryPolicies } from '../../types/hrm';
import { 
  BookOpenCheck, 
  Clock, 
  Save, 
  ShieldAlert, 
  CheckCircle2, 
  Sliders, 
  AlertTriangle, 
  DollarSign, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const PoliciesView: React.FC = () => {
  const { policies, updatePolicies, showToast } = useApp();

  const [formState, setFormState] = useState<LaboratoryPolicies>({ ...policies });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePolicies(formState);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
              <BookOpenCheck className="w-6 h-6 text-blue-600" />
              <span>لوائح وسياسات العمل المعتمدة (Laboratory Policies & Rules)</span>
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-cairo font-bold">
              قابلة للتخصيص الكامل
            </span>
          </div>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            تهيئة خوارزميات الاحتساب الآلي لمواعيد الحضور، فترات السماح، الساعات الإضافية، وجزاءات الغياب
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold font-cairo transition shadow-lg shadow-blue-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>حفظ وتطبيق اللائحة فوراً</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Working Hours & Grace Period */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-cairo text-slate-800">مواعيد الدوام الرسمي وفترة السماح</h3>
                <p className="text-[11px] text-slate-500 font-cairo">تحديد أوقات بدء ونهاية العمل للوردية الأساسية</p>
              </div>
            </div>
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-mono">
              8 Hours Standard Shift
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                موعد بدء الدوام الرسمي (Check-in Start)
              </label>
              <input
                type="time"
                value={formState.officialWorkStart}
                onChange={(e) => setFormState({ ...formState, officialWorkStart: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-left focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                موعد نهاية الدوام الرسمي (Check-out End)
              </label>
              <input
                type="time"
                value={formState.officialWorkEnd}
                onChange={(e) => setFormState({ ...formState, officialWorkEnd: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-left focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                فترة السماح الصباحية (Grace Period)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={formState.gracePeriodMinutes}
                  onChange={(e) => setFormState({ ...formState, gracePeriodMinutes: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-center focus:bg-white focus:outline-hidden"
                />
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-cairo">دقيقة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Overtime Calculation Rules */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-cairo text-slate-800">قواعد الساعات الإضافية (Overtime Rules)</h3>
                <p className="text-[11px] text-slate-500 font-cairo">سياسات احتساب ومضاعفة أجر ساعات العمل الإضافية</p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.autoOvertimeEnabled}
                onChange={(e) => setFormState({ ...formState, autoOvertimeEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
              <span className="text-xs font-bold font-cairo text-purple-900">تفعيل الاحتساب التلقائي للإضافي</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                معامل مضاعفة ساعة العمل الإضافية (Overtime Multiplier)
              </label>
              <select
                value={formState.overtimeMultiplier}
                onChange={(e) => setFormState({ ...formState, overtimeMultiplier: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-mono focus:bg-white focus:outline-hidden"
              >
                <option value={1.25}>1.25x (ساعة وربع من الأجر الأساسي)</option>
                <option value={1.5}>1.50x (ساعة ونصف — اللائحة المعتمدة لمعمل المنار)</option>
                <option value={1.75}>1.75x (ساعة وثلاثة أرباع)</option>
                <option value={2.0}>2.00x (ضعف أجر الساعة للورديات الليلية والعطلات)</option>
              </select>
            </div>

            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
              <p className="text-xs text-purple-900 font-cairo leading-relaxed">
                أي تسجيل بصمة خروج بعد الساعة <span className="font-mono font-bold">05:00 م</span> يتم تحويله آلياً إلى ساعات إضافية وتضاف إلى مسير الرواتب.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Absence & Late Deductions */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-cairo text-slate-800">جزاءات الغياب والتأخير والانصراف المبكر</h3>
                <p className="text-[11px] text-slate-500 font-cairo">معادلات الاستقطاع المالي عند عدم التزام الموظف بساعات العمل</p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.autoAbsenceEnabled}
                onChange={(e) => setFormState({ ...formState, autoAbsenceEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="text-xs font-bold font-cairo text-rose-900">تسجيل الغياب التلقائي عند عدم وجود بصمة</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                جزاء يوم الغياب بدون إذن معتمد (Absence Penalty)
              </label>
              <select
                value={formState.absenceDeductionDays}
                onChange={(e) => setFormState({ ...formState, absenceDeductionDays: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold font-cairo focus:bg-white focus:outline-hidden"
              >
                <option value={1.0}>خصم أجر يوم واحد (1.0x)</option>
                <option value={1.5}>خصم أجر يوم ونصف (1.5x — اللائحة المعتمدة بمعمل المنار)</option>
                <option value={2.0}>خصم أجر يومين (2.0x)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                سياسة استقطاع التأخير المتكرر
              </label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-cairo text-slate-700 space-y-1">
                <div>• المرة الأولى: {formState.lateDeductionRules.firstOffense}</div>
                <div>• المرة الثانية: {formState.lateDeductionRules.secondOffense}</div>
                <div>• المرة الثالثة: {formState.lateDeductionRules.thirdOffense}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-cairo">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>كافة التغييرات يتم تطبيقها لحظياً على شاشات الحضور ومسير الرواتب</span>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-cairo transition shadow-sm"
          >
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
};
