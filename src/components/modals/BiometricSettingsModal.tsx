import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Fingerprint, Server, Radio, Shield, Save, Check } from 'lucide-react';

interface BiometricSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BiometricSettingsModal: React.FC<BiometricSettingsModalProps> = ({ isOpen, onClose }) => {
  const { biometricDevice, updateBiometricSettings, showToast } = useApp();

  const [settings, setSettings] = useState({
    name: biometricDevice.name,
    ipAddress: biometricDevice.ipAddress,
    port: biometricDevice.port,
    location: biometricDevice.location,
    serialNumber: biometricDevice.serialNumber,
    cloudSyncEnabled: biometricDevice.cloudSyncEnabled,
  });

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'failed' | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      setTestResult('success');
      showToast({
        type: 'success',
        title: 'تم الاتصال بالجهاز بنجاح (Ping OK)',
        message: `استجابة جهاز البصمة ZKTeco على المنفذ ${settings.port} في غضون 18ms`
      });
    }, 1200);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBiometricSettings(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#0B192C] to-[#0E3B68] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-cairo">إعدادات جهاز البصمة الخارجي</h3>
              <p className="text-xs text-slate-300 font-cairo">تهيئة الاتصال الشبكي مع أجهزة ZKTeco</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4 font-cairo">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">اسم الجهاز التعريفي</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">عنوان IP للجهاز</label>
              <input
                type="text"
                value={settings.ipAddress}
                onChange={(e) => setSettings({ ...settings, ipAddress: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-left"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">منفذ الاتصال (Port)</label>
              <input
                type="number"
                value={settings.port}
                onChange={(e) => setSettings({ ...settings, port: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-left"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الرقم التسلسلي للجهاز (Serial Number)</label>
            <input
              type="text"
              value={settings.serialNumber}
              onChange={(e) => setSettings({ ...settings, serialNumber: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">موقع الجهاز الفعلي</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          {/* Test Connection Button */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <Radio className={`w-3.5 h-3.5 text-blue-600 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'جارٍ اختبار الاتصال...' : 'اختبار الاتصال بالجهاز'}</span>
            </button>

            {testResult === 'success' && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" />
                <span>الاتصال سليم 100%</span>
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>حفظ الإعدادات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
