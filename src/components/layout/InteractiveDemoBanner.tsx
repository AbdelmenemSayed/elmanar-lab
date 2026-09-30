import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Clock, AlertOctagon, CheckCircle, RefreshCw, DollarSign, ChevronUp, ChevronDown } from 'lucide-react';

export const InteractiveDemoBanner: React.FC = () => {
  const { triggerDemoScenario, isSyncingBiometric } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="bg-slate-900 text-white px-4 py-1 border-b border-slate-800 flex items-center justify-between z-50 shrink-0 text-xs font-cairo">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] text-cyan-300 font-bold">شريط سيناريوهات العرض التجريبي</span>
        </div>
        <button
          onClick={() => setIsCollapsed(false)}
          className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-cairo px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition"
        >
          <span>إظهار السيناريوهات</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-950 via-[#0B192C] to-[#162E4A] text-white px-4 py-1.5 border-b border-blue-900/60 z-50 shadow-xs shrink-0">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Title */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-500/20 text-cyan-300 rounded-md border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-cyan-300 font-cairo">سيناريوهات العرض (Live Demo):</span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded-full border border-emerald-500/30 font-medium hidden sm:inline">
              معمل المنار — دمنهور
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => triggerDemoScenario('overtime')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-blue-600 text-slate-200 hover:text-white rounded-lg text-[11px] font-semibold transition border border-white/10"
            title="أحمد محمد: 09:08 ص إلى 06:30 م (تأخير 8 د + إضافي 1.5 س)"
          >
            <Clock className="w-3 h-3 text-amber-400" />
            <span>1. تأخير + إضافي (أحمد)</span>
          </button>

          <button
            onClick={() => triggerDemoScenario('absence')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-rose-600 text-slate-200 hover:text-white rounded-lg text-[11px] font-semibold transition border border-white/10"
            title="محمد حسن: غياب تلقائي بدون بصمة وخصم 1.5 يوم"
          >
            <AlertOctagon className="w-3 h-3 text-rose-400" />
            <span>2. غياب تلقائي (محمد)</span>
          </button>

          <button
            onClick={() => triggerDemoScenario('normal')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-[11px] font-semibold transition border border-white/10"
            title="سارة محمود: حضور منضبط 09:05 ص بدون خصم"
          >
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>3. حضور منضبط (سارة)</span>
          </button>

          <button
            onClick={() => triggerDemoScenario('biometric')}
            disabled={isSyncingBiometric}
            className="flex items-center gap-1 px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-[11px] font-bold transition shadow-xs border border-cyan-400"
            title="مزامنة حركات جهاز ZKTeco الخارجي"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncingBiometric ? 'animate-spin' : ''}`} />
            <span>4. مزامنة البصمة</span>
          </button>

          <button
            onClick={() => triggerDemoScenario('payroll')}
            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-bold transition shadow-xs border border-indigo-400"
            title="اعتماد وصرف مسير رواتب سبتمبر"
          >
            <DollarSign className="w-3 h-3 text-amber-300" />
            <span>5. اعتماد الرواتب</span>
          </button>

          {/* Collapse button */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded transition mr-1"
            title="تصغير شريط السيناريوهات"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
