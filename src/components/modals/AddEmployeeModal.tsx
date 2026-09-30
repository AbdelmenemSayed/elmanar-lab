import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department, Employee } from '../../types/hrm';
import { X, UserPlus, Fingerprint, Shield, DollarSign, Briefcase, Mail, Phone, Calendar, CreditCard } from 'lucide-react';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose }) => {
  const { addEmployee, employees } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    biometricId: String(employees.length + 101),
    department: 'التحاليل الطبية والباثولوجيا' as Department,
    position: '',
    phone: '',
    email: '',
    nationalId: '',
    hireDate: '2026-09-01',
    basicSalary: 7000,
    transportAllowance: 300,
    hazardAllowance: 300,
    mealAllowance: 150,
    shift: 'morning' as 'morning' | 'evening' | 'night',
    bankAccount: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position) {
      alert('يرجى إدخال اسم الموظف والوظيفة');
      return;
    }

    addEmployee({
      name: formData.name,
      biometricId: formData.biometricId,
      department: formData.department,
      position: formData.position,
      phone: formData.phone || '010XXXXXXXX',
      email: formData.email || 'employee@manarlab.com',
      nationalId: formData.nationalId || '29501011800000',
      hireDate: formData.hireDate,
      basicSalary: Number(formData.basicSalary),
      allowances: {
        transport: Number(formData.transportAllowance),
        hazard: Number(formData.hazardAllowance),
        meal: Number(formData.mealAllowance)
      },
      status: 'active',
      bankAccount: formData.bankAccount || 'EG380002000100000012345678999',
      shift: formData.shift
    });

    onClose();
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B192C] to-[#1E3E62] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center shadow-inner">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-cairo">إضافة موظف جديد إلى معمل المنار</h3>
              <p className="text-xs text-slate-300 font-cairo">
                تسجيل البيانات الوظيفية والربط الفوري مع جهاز البصمة الخارجي
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Important Biometric Matcher Callout */}
          <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center shrink-0">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-cyan-900 font-cairo">
                  رقم الموظف في جهاز البصمة الخارجي (Biometric Employee ID)
                </h4>
                <p className="text-[11px] text-cyan-700 font-cairo">
                  هذا الرقم هو المعرف المطابق لجهاز ZKTeco لسحب بصمات الحضور والانصراف تلقائياً
                </p>
              </div>
            </div>
            <div className="w-32">
              <input
                type="text"
                required
                value={formData.biometricId}
                onChange={(e) => setFormData({ ...formData, biometricId: e.target.value })}
                className="w-full text-center py-2 px-3 bg-white border-2 border-cyan-400 text-cyan-900 font-mono font-bold rounded-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-500 text-sm shadow-xs"
                placeholder="101"
              />
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                الاسم الكامل للموظف <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: يوسف حسام السيد"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-cairo focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                القسم التابع له <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-cairo focus:bg-white focus:border-blue-500 focus:outline-hidden"
              >
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                المسمى الوظيفي <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="مثال: أخصائي تحاليل كيمياء دم"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-cairo focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                تاريخ التعيين
              </label>
              <input
                type="date"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:border-blue-500 focus:outline-hidden text-right"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                رقم الهاتف (المحمول)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010XXXXXXXX"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:border-blue-500 focus:outline-hidden text-right"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 font-cairo">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="user@manarlab.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:border-blue-500 focus:outline-hidden text-left"
              />
            </div>
          </div>

          {/* Section 2: Salary & Compensation */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5 font-cairo">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>الراتب والبدلات الشهرية (الجنيه المصري EGP)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-cairo">
                  الراتب الأساسي
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={formData.basicSalary}
                  onChange={(e) => setFormData({ ...formData, basicSalary: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-emerald-700 focus:bg-white focus:border-emerald-500 focus:outline-hidden text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-cairo">
                  بدل مخاطر وعدوى
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.hazardAllowance}
                  onChange={(e) => setFormData({ ...formData, hazardAllowance: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:border-blue-500 focus:outline-hidden text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-cairo">
                  بدل انتقال
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.transportAllowance}
                  onChange={(e) => setFormData({ ...formData, transportAllowance: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:border-blue-500 focus:outline-hidden text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-cairo">
                  بدل وجبة
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.mealAllowance}
                  onChange={(e) => setFormData({ ...formData, mealAllowance: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:border-blue-500 focus:outline-hidden text-center"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold font-cairo transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-cairo transition shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>إضافة الموظف واعتماد البصمة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
