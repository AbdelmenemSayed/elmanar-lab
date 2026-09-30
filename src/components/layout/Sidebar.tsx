import React, { useState } from 'react';
import { useApp, NavigationItem } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Fingerprint, 
  CalendarDays, 
  Clock4, 
  BadgePercent, 
  Calculator, 
  FileSpreadsheet, 
  BookOpenCheck, 
  Settings, 
  Activity, 
  ShieldCheck, 
  Radio,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    biometricDevice, 
    payroll, 
    leaves, 
    currentRole 
  } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Navigation Items
  const navItems: {
    id: NavigationItem;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    badgeColor?: string;
    roles?: string[];
  }[] = [
    {
      id: 'dashboard',
      label: 'الرئيسية',
      icon: <LayoutDashboard className="w-4 h-4" />,
      roles: ['super_admin', 'management', 'hr', 'accountant']
    },
    {
      id: 'employees',
      label: 'الموظفين',
      icon: <Users className="w-4 h-4" />,
      badge: '87',
      badgeColor: 'bg-blue-500/20 text-blue-300',
      roles: ['super_admin', 'management', 'hr']
    },
    {
      id: 'attendance',
      label: 'الحضور والانصراف',
      icon: <Clock className="w-4 h-4" />,
      badge: '74 حاضر',
      badgeColor: 'bg-emerald-500/20 text-emerald-300',
      roles: ['super_admin', 'management', 'hr']
    },
    {
      id: 'biometric',
      label: 'جهاز البصمة',
      icon: <Fingerprint className="w-4 h-4 text-cyan-400" />,
      badge: 'Online',
      badgeColor: 'bg-cyan-500/20 text-cyan-300',
      roles: ['super_admin', 'management', 'hr']
    },
    {
      id: 'leaves',
      label: 'الإجازات',
      icon: <CalendarDays className="w-4 h-4" />,
      badge: `${leaves.filter(l => l.status === 'pending').length}`,
      badgeColor: 'bg-amber-500/20 text-amber-300',
      roles: ['super_admin', 'management', 'hr']
    },
    {
      id: 'overtime',
      label: 'الساعات الإضافية',
      icon: <Clock4 className="w-4 h-4" />,
      badge: '126س',
      badgeColor: 'bg-purple-500/20 text-purple-300',
      roles: ['super_admin', 'management', 'hr', 'accountant']
    },
    {
      id: 'payroll',
      label: 'المرتبات والأجور',
      icon: <BadgePercent className="w-4 h-4" />,
      badge: payroll.status === 'paid' ? 'تم الصرف' : 'مراجعة',
      badgeColor: payroll.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300',
      roles: ['super_admin', 'management', 'hr', 'accountant']
    },
    {
      id: 'accountant',
      label: 'بوابة المحاسب',
      icon: <Calculator className="w-4 h-4 text-emerald-400" />,
      roles: ['super_admin', 'management', 'accountant']
    },
    {
      id: 'reports',
      label: 'التقارير',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      roles: ['super_admin', 'management', 'hr', 'accountant']
    },
    {
      id: 'policies',
      label: 'اللوائح والسياسات',
      icon: <BookOpenCheck className="w-4 h-4" />,
      roles: ['super_admin', 'management', 'hr']
    },
    {
      id: 'settings',
      label: 'الإعدادات',
      icon: <Settings className="w-4 h-4" />,
      roles: ['super_admin', 'management']
    }
  ];

  const visibleNavItems = navItems.filter(item => 
    !item.roles || item.roles.includes(currentRole)
  );

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-56'
      } bg-[#0B192C] text-slate-200 flex flex-col border-l border-slate-800/80 shrink-0 select-none h-full transition-all duration-200 z-20`}
    >
      {/* Brand Header */}
      <div className="p-3 border-b border-slate-800/80 bg-[#081220] flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Activity className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="truncate">
              <h1 className="text-sm font-black text-white font-cairo truncate">معمل المنار</h1>
              <p className="text-[10px] text-slate-400 font-medium font-cairo truncate">دمنهور، البحيرة</p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
            <Activity className="w-4 h-4 stroke-[2.5]" />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition text-xs shrink-0"
          title={isCollapsed ? 'توسيع القائمة' : 'تصغير القائمة'}
        >
          {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center px-2 py-2' : 'justify-between px-2.5 py-1.5'
              } rounded-lg text-right transition-all group font-cairo ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400 transition'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-xs truncate font-medium">{item.label}</span>
                )}
              </div>

              {!isCollapsed && item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full font-cairo shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Compact Biometric Hardware Card */}
      {!isCollapsed ? (
        <div className="p-2.5 m-2 rounded-xl bg-gradient-to-b from-slate-900/90 to-[#0F2035] border border-cyan-900/40">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold text-white font-cairo">جهاز البصمة</span>
            </div>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30 font-mono">
              Online
            </span>
          </div>

          <div className="text-[10px] text-slate-300 space-y-0.5 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400 font-cairo">سجلات اليوم:</span>
              <span className="text-emerald-400 font-bold">{biometricDevice.todayRecordsCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-cairo">العنوان:</span>
              <span className="text-slate-300 text-[9px]">{biometricDevice.ipAddress}</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('biometric')}
            className="mt-2 w-full py-1 px-2 bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 rounded-md text-[10px] font-bold font-cairo transition text-center border border-cyan-500/30 flex items-center justify-center gap-1"
          >
            <Fingerprint className="w-3 h-3" />
            <span>مزامنة الجهاز</span>
          </button>
        </div>
      ) : (
        <div className="p-2 text-center border-t border-slate-800">
          <button
            onClick={() => setCurrentView('biometric')}
            className="p-1.5 bg-cyan-600/20 text-cyan-300 rounded-lg mx-auto hover:bg-cyan-600/40 transition"
            title="جهاز البصمة (Online)"
          >
            <Fingerprint className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Slim Footer */}
      {!isCollapsed && (
        <div className="px-3 py-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between font-cairo">
          <span className="flex items-center gap-1 truncate">
            <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">
              {currentRole === 'super_admin' ? 'مدير النظام' : currentRole === 'management' ? 'الإدارة' : currentRole === 'hr' ? 'HR' : 'المحاسب'}
            </span>
          </span>
          <span className="font-mono text-slate-500">v2.6</span>
        </div>
      )}
    </aside>
  );
};
