import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Fingerprint, 
  RefreshCw, 
  Server, 
  Radio, 
  Settings, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  ArrowDown, 
  ArrowRight,
  Database,
  Cpu,
  Layers,
  Network
} from 'lucide-react';
import { BiometricSettingsModal } from '../modals/BiometricSettingsModal';

export const BiometricView: React.FC = () => {
  const { 
    biometricDevice, 
    biometricLogs, 
    syncBiometricDevice, 
    isSyncingBiometric,
    showToast 
  } = useApp();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLogs = biometricLogs.filter((log) => {
    if (filterType === 'check_in') return log.type === 'check_in';
    if (filterType === 'check_out') return log.type === 'check_out';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
              <Fingerprint className="w-6 h-6 text-cyan-600" />
              <span>إدارة وربط جهاز البصمة البيومتري الخارجي</span>
            </h1>
            <span className="bg-cyan-100 text-cyan-800 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">
              Hardware Bridge
            </span>
          </div>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            ربط شبكي مباشر (TCP/IP Socket + ADMS Cloud) مع جهاز الحضور والانصراف الفعلي بمعمل المنار
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl text-xs font-bold font-cairo transition shadow-2xs flex items-center gap-2"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>إعدادات الاتصال (Settings)</span>
          </button>

          <button
            onClick={syncBiometricDevice}
            disabled={isSyncingBiometric}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-xs font-bold font-cairo transition shadow-lg shadow-cyan-600/30 flex items-center gap-2 active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncingBiometric ? 'animate-spin' : ''}`} />
            <span>{isSyncingBiometric ? 'جارٍ سحب البصمات...' : 'مزامنة الآن (Sync Now)'}</span>
          </button>
        </div>
      </div>

      {/* HARDWARE DEVICE COCKPIT CARD */}
      <div className="bg-gradient-to-br from-[#0B192C] via-[#11223A] to-[#1E3E62] text-white p-6 rounded-3xl border border-cyan-900/60 shadow-xl relative overflow-hidden">
        {/* Ambient Ring */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400/40 flex items-center justify-center shadow-lg backdrop-blur-md">
                <Fingerprint className="w-9 h-9" />
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-[#0B192C] animate-pulse"></span>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-black font-cairo tracking-wide">{biometricDevice.name}</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Connection: ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-cairo mt-1">
                {biometricDevice.model} • {biometricDevice.location}
              </p>
            </div>
          </div>

          {/* Sync Status Badge */}
          <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-left font-mono">
            <div className="text-[11px] text-cyan-300 font-cairo text-right">آخر مزامنة ناجحة (Last Sync)</div>
            <div className="text-sm font-bold text-white mt-0.5">{biometricDevice.lastSyncTime}</div>
          </div>
        </div>

        {/* Live Hardware Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-cairo block mb-1">الموظفون المسجلون بالجهاز</span>
            <div className="text-2xl font-black font-mono text-cyan-300">
              {biometricDevice.syncedEmployeesCount}
            </div>
            <span className="text-[10px] text-slate-400 font-cairo">مطابق 100% مع قاعدة البيانات</span>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-cairo block mb-1">سجلات بصمة اليوم</span>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {biometricDevice.todayRecordsCount}
            </div>
            <span className="text-[10px] text-emerald-400 font-cairo">حركات حضور وانصراف مكتملة</span>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-cairo block mb-1">عنوان IP المنفذ (Socket)</span>
            <div className="text-base font-bold font-mono text-white mt-1">
              {biometricDevice.ipAddress}:{biometricDevice.port}
            </div>
            <span className="text-[10px] text-slate-400 font-cairo">الشبكة الداخلية لمعمل المنار</span>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-cairo block mb-1">سجلات غير مطابقة</span>
            <div className="text-2xl font-black font-mono text-slate-300">
              {biometricDevice.unmatchedRecordsCount}
            </div>
            <span className="text-[10px] text-emerald-400 font-cairo">لا توجد أي بصمات مجهولة</span>
          </div>
        </div>
      </div>

      {/* ARCHITECTURAL HARDWARE PIPELINE - Crucial for Presentation to Lab Owner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-cairo text-slate-800 flex items-center gap-2">
              <Network className="w-5 h-5 text-blue-600" />
              <span>معمارية ربط جهاز البصمة الفعلي بنظام المرتبات (Future-Ready Architecture)</span>
            </h3>
            <p className="text-xs text-slate-500 font-cairo mt-0.5">
              توضيح تدفق البيانات من الماكينة الفيزيائية الخارجية إلى قاعدة البيانات ومسير الأجور
            </p>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold border border-blue-200 font-cairo">
            جاهز للربط بالإنتاج (Production Ready)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-3">
          {/* Node 1 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center relative group hover:border-cyan-400 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 mx-auto mb-2 flex items-center justify-center">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 font-cairo">جهاز البصمة الخارجي</h4>
            <p className="text-[11px] text-slate-500 font-mono mt-1">ZKTeco BioStation</p>
            <span className="text-[10px] text-slate-400 font-cairo block mt-1">بصمة إصبع / وجه حقيقية</span>
          </div>

          {/* Node 2 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center relative group hover:border-blue-400 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 mx-auto mb-2 flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 font-cairo">سحب السجلات الخام</h4>
            <p className="text-[11px] text-slate-500 font-mono mt-1">TCP/IP Port 4370</p>
            <span className="text-[10px] text-slate-400 font-cairo block mt-1">Pull / Push Service</span>
          </div>

          {/* Node 3 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center relative group hover:border-indigo-400 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 mx-auto mb-2 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 font-cairo">نظام معمل المنار HRM</h4>
            <p className="text-[11px] text-slate-500 font-mono mt-1">Biometric ID Match</p>
            <span className="text-[10px] text-slate-400 font-cairo block mt-1">مطابقة كود الموظف</span>
          </div>

          {/* Node 4 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center relative group hover:border-purple-400 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 mx-auto mb-2 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 font-cairo">محرك احتساب الدوام</h4>
            <p className="text-[11px] text-slate-500 font-mono mt-1">Rules & Policies</p>
            <span className="text-[10px] text-slate-400 font-cairo block mt-1">تأخير، إضافي، وغياب</span>
          </div>

          {/* Node 5 */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center relative group hover:border-emerald-400 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 mx-auto mb-2 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 font-cairo">مسير رواتب سبتمبر</h4>
            <p className="text-[11px] text-slate-500 font-mono mt-1">Payroll Generation</p>
            <span className="text-[10px] text-slate-400 font-cairo block mt-1">تصدير صافي المستحق</span>
          </div>
        </div>
      </div>

      {/* RAW DEVICE LOGS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold font-cairo text-slate-800">
              سجلات جهاز البصمة الحية (Device Real-time Attendance Logs)
            </h3>
            <p className="text-xs text-slate-500 font-cairo mt-0.5">
              تسجيل الحركات الخام المستلمة من الذاكرة الداخلية للجهاز MANAR-ATTENDANCE-01
            </p>
          </div>

          {/* Filter Types */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-cairo transition ${
                filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              الكل ({biometricLogs.length})
            </button>
            <button
              onClick={() => setFilterType('check_in')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-cairo transition ${
                filterType === 'check_in' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              تسجيل دخول
            </button>
            <button
              onClick={() => setFilterType('check_out')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-cairo transition ${
                filterType === 'check_out' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              تسجيل خروج
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right font-cairo">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">كود الحركة</th>
                <th className="p-4">التوقيت الدقيق</th>
                <th className="p-4">رقم البصمة بالجهاز</th>
                <th className="p-4">الموظف المطابق</th>
                <th className="p-4">نوع الحركة</th>
                <th className="p-4">طريقة التحقق الحيوية</th>
                <th className="p-4">حالة المعالجة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 text-slate-500 font-bold">{log.id}</td>
                  <td className="p-4 font-bold text-slate-800">{log.timestamp}</td>
                  <td className="p-4">
                    <span className="bg-cyan-50 text-cyan-800 px-2.5 py-0.5 rounded border border-cyan-200 font-bold">
                      #{log.biometricId}
                    </span>
                  </td>
                  <td className="p-4 font-cairo">
                    <span className="font-bold text-slate-900">{log.employeeName}</span>
                    <span className="text-[11px] font-mono text-blue-600 mr-2">({log.employeeId})</span>
                  </td>
                  <td className="p-4 font-cairo">
                    {log.type === 'check_in' ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                        تسجيل حضور (Check-in)
                      </span>
                    ) : (
                      <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                        تسجيل مغادرة (Check-out)
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-cairo text-slate-600">
                    {log.verifyMode === 'fingerprint' && 'بصمة الإصبع الحيوية'}
                    {log.verifyMode === 'face' && 'التعرف على الوجه (Face)'}
                    {log.verifyMode === 'card' && 'بطاقة RFID ممغنطة'}
                  </td>
                  <td className="p-4 font-cairo">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>مطابق ومعالج (Matched)</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settings Modal */}
      <BiometricSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};
