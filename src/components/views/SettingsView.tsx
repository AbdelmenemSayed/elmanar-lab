import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Building2, 
  Fingerprint, 
  Users, 
  ShieldCheck, 
  Bell, 
  Database, 
  Save, 
  Check, 
  Server,
  Layers,
  Lock
} from 'lucide-react';
import { BiometricSettingsModal } from '../modals/BiometricSettingsModal';

export const SettingsView: React.FC = () => {
  const { biometricDevice, showToast } = useApp();
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  const [companyInfo, setCompanyInfo] = useState({
    name: 'معمل المنار للتحاليل الطبية والباثولوجيا الإكلينيكية',
    city: 'دمنهور',
    governorate: 'البحيرة',
    address: 'شارع الجمهورية — برج الأطباء — الدور الثاني',
    phone: '045-3312000 / 01012345678',
    email: 'info@manarlab.com',
    licenseNumber: 'ترخيص وزارة الصحة رقم: 8841/2021',
  });

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'تم حفظ بيانات المنشأة الطبية',
      message: 'تم تحديث الترويسة الرسمية وعناوين التقارير'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-blue-600" />
          <span>إعدادات النظام والمنشأة الطبية (System Settings)</span>
        </h1>
        <p className="text-xs text-slate-500 font-cairo mt-1">
          تهيئة بيانات معمل المنار، صلاحيات المستخدمين، وإعدادات الربط الشبكي للأجهزة البيومترية
        </p>
      </div>

      {/* Section 1: Laboratory Information */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-cairo text-slate-800">بيانات معمل المنار (المقر الرئيسي)</h3>
              <p className="text-[11px] text-slate-500 font-cairo">تظهر هذه البيانات في ترويسة قسائم الرواتب والتقارير</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveCompany} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-cairo">
          <div>
            <label className="block font-bold text-slate-700 mb-1">الاسم التجاري للمعمل</label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">المقر والمدينة</label>
            <input
              type="text"
              value={`${companyInfo.city} — ${companyInfo.governorate}`}
              readOnly
              className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">العنوان التفصيلي</label>
            <input
              type="text"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">ترخيص وزارة الصحة</label>
            <input
              type="text"
              value={companyInfo.licenseNumber}
              onChange={(e) => setCompanyInfo({ ...companyInfo, licenseNumber: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>حفظ البيانات</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Biometric Device Quick Configuration */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Fingerprint className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-cairo text-slate-800">جهاز البصمة الفعلي (MANAR-ATTENDANCE-01)</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              IP: {biometricDevice.ipAddress} • Port: {biometricDevice.port} • Status: ONLINE
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsBioModalOpen(true)}
          className="px-4 py-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 rounded-xl text-xs font-bold font-cairo transition"
        >
          تعديل إعدادات الربط
        </button>
      </div>

      {/* Section 3: Roles and Permissions Architecture */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="border-b pb-3">
          <h3 className="text-sm font-bold font-cairo text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>مصفوفة الأدوار والصلاحيات (Role-Based Access Control)</span>
          </h3>
          <p className="text-[11px] text-slate-500 font-cairo">تحديد النطاقات المصرح بها لكل مستخدم في النظام</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-cairo">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>الإدارة العليا (Management)</span>
            </div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>✓ لوحة التحكم والمؤشرات التنفيذية</li>
              <li>✓ اعتماد مسير الرواتب الشهري</li>
              <li>✓ التقارير الاستراتيجية والمالية</li>
              <li>✗ لا تشغلها العمليات الروتينية لـ HR</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>الموارد البشرية (HR)</span>
            </div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>✓ إضافة وتعديل ملفات الموظفين</li>
              <li>✓ متابعة الحضور والغياب اليومي</li>
              <li>✓ مراجعة طلبات الإجازات والأذونات</li>
              <li>✓ تجهيز مسودات مسير الرواتب</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>المحاسب المالي (Accountant)</span>
            </div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>✓ تدقيق الاستقطاعات والبدلات</li>
              <li>✓ تأكيد الصرف والتحويل البنكي</li>
              <li>✓ تصدير قسائم الرواتب (Payslips)</li>
              <li>✓ تقارير تكاليف الأجور التفصيلية</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              <span>مدير النظام (Super Admin)</span>
            </div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>✓ صلاحيات مطلقة على كامل النظام</li>
              <li>✓ ضبط إعدادات جهاز البصمة</li>
              <li>✓ تعديل لوائح وسياسات العمل</li>
              <li>✓ إدارة المستخدمين وقواعد البيانات</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 4: Production Architecture Readiness */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0B192C] text-white p-6 rounded-3xl border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-cairo text-white">
                جاهزية البنية التحتية وقواعد البيانات (Future Data Architecture)
              </h3>
              <p className="text-[11px] text-slate-300 font-cairo">
                النظام مهيأ هيكلياً للربط الفوري مع PostgreSQL / Supabase ومحرك ZKTeco SDK
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-mono">
            Architecture Ready
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs font-mono">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-cyan-300 font-bold block mb-1 font-cairo">قاعدة البيانات:</span>
            <span>PostgreSQL / Supabase</span>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-cyan-300 font-bold block mb-1 font-cairo">بروتوكول البصمة:</span>
            <span>ZKTeco Standalone SDK</span>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-cyan-300 font-bold block mb-1 font-cairo">تصدير التقارير:</span>
            <span>Excel / PDF Engine</span>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-cyan-300 font-bold block mb-1 font-cairo">أمان الصلاحيات:</span>
            <span>Row Level Security (RLS)</span>
          </div>
        </div>
      </div>

      <BiometricSettingsModal isOpen={isBioModalOpen} onClose={() => setIsBioModalOpen(false)} />
    </div>
  );
};
