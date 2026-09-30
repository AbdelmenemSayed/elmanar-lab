import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types/hrm';
import { 
  Search, 
  Bell, 
  Calendar, 
  UserCheck, 
  ChevronDown, 
  CheckCheck, 
  ShieldAlert, 
  RefreshCw, 
  Sparkles,
  SlidersHorizontal,
  Building2,
  X
} from 'lucide-react';

export const Topbar: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    globalSearch, 
    setGlobalSearch,
    notifications, 
    unreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    syncBiometricDevice,
    isSyncingBiometric,
    setCurrentView,
    openEmployeeProfile,
    employees
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof employees>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setGlobalSearch(q);
    if (q.trim().length > 0) {
      const filtered = employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(q.toLowerCase()) ||
          emp.id.toLowerCase().includes(q.toLowerCase()) ||
          emp.biometricId.includes(q) ||
          emp.department.toLowerCase().includes(q.toLowerCase()) ||
          emp.position.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const rolesList: { id: Role; label: string; desc: string }[] = [
    { id: 'management', label: 'بوابة الإدارة (Management)', desc: 'مؤشرات الأداء، القرارات، المتابعة الشاملة' },
    { id: 'hr', label: 'بوابة الموارد البشرية (HR)', desc: 'إدارة الموظفين، الحضور، الإجازات، إعداد الرواتب' },
    { id: 'accountant', label: 'بوابة المحاسب (Accountant)', desc: 'مراجعة مسير الرواتب، الخصومات، الصرف البنكي' },
    { id: 'super_admin', label: 'مدير النظام (Super Admin)', desc: 'كافة الصلاحيات والإعدادات ولوائح العمل' },
  ];

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-5 flex items-center justify-between sticky top-0 z-30 shadow-xs shrink-0">
      {/* Search Input & Breadcrumb */}
      <div className="flex items-center gap-5 flex-1 max-w-xl">
        <div className="relative w-full" ref={searchRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
            <input
              type="text"
              value={globalSearch}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="بحث سريع برقم الموظف، الاسم، أو رقم البصمة (مثال: أحمد، MN-001)..."
              className="w-full pl-9 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all font-cairo outline-hidden"
            />
            {globalSearch && (
              <button
                onClick={() => {
                  setGlobalSearch('');
                  setSearchResults([]);
                }}
                className="absolute left-3 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Search Results Popover */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-80 overflow-y-auto">
              <div className="px-4 py-1.5 text-xs font-bold text-slate-400 font-cairo">
                نتائج البحث السريع ({searchResults.length})
              </div>
              {searchResults.map((emp) => (
                <div
                  key={emp.id}
                  onClick={() => {
                    openEmployeeProfile(emp.id);
                    setIsSearchFocused(false);
                  }}
                  className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition font-cairo">
                        {emp.name}
                      </div>
                      <div className="text-xs text-slate-500 font-cairo">
                        {emp.position} • {emp.department}
                      </div>
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {emp.id}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      بصمة #{emp.biometricId}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center/Right Badges & Controls */}
      <div className="flex items-center gap-3">
        {/* Date Display */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 font-cairo">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>الأربعاء، 30 سبتمبر 2026</span>
        </div>

        {/* Quick Biometric Sync Button */}
        <button
          onClick={syncBiometricDevice}
          disabled={isSyncingBiometric}
          className="flex items-center gap-2 px-3.5 py-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 rounded-xl border border-cyan-200 text-xs font-bold font-cairo transition active:scale-95"
          title="مزامنة فورية مع جهاز البصمة MANAR-ATTENDANCE-01"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 ${isSyncingBiometric ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">مزامنة البصمة</span>
        </button>

        {/* Portal & Role Switcher */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-900 rounded-xl border border-blue-200 text-xs font-bold font-cairo transition shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden md:inline text-slate-500 font-normal">عرض كـ:</span>
            <span>
              {currentRole === 'management' && 'بوابة الإدارة'}
              {currentRole === 'hr' && 'بوابة الموارد البشرية'}
              {currentRole === 'accountant' && 'بوابة المحاسب'}
              {currentRole === 'super_admin' && 'مدير النظام'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800 font-cairo">تبديل بوابة العرض للعميل</p>
                <p className="text-[11px] text-slate-500 font-cairo">استعراض التجربة من منظور كل قسم</p>
              </div>

              {rolesList.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setCurrentRole(r.id);
                    setIsRoleDropdownOpen(false);
                  }}
                  className={`w-full text-right px-4 py-2.5 transition flex items-start gap-2.5 ${
                    currentRole === r.id ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${currentRole === r.id ? 'bg-blue-600' : 'bg-slate-300'}`} />
                  <div>
                    <div className="text-xs font-bold font-cairo">{r.label}</div>
                    <div className="text-[11px] text-slate-500 font-normal font-cairo">{r.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2.5 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition"
            title="الإشعارات والتنبيهات"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute left-0 mt-2 w-88 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50">
              <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 font-cairo">مركز الإشعارات والتنبيهات</h4>
                  <p className="text-[11px] text-slate-500 font-cairo">تنبيهات الحضور، الغياب، والمرتبات</p>
                </div>
                {unreadNotificationsCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-cairo"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>تحديد كـ مقروء</span>
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => markNotificationAsRead(item.id)}
                    className={`p-3.5 hover:bg-slate-50 cursor-pointer transition ${
                      !item.isRead ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-bold text-slate-800 font-cairo flex items-center gap-1.5">
                        {!item.isRead && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />}
                        <span>{item.title}</span>
                      </h5>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap font-cairo">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed font-cairo">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="flex items-center gap-3 pr-2 border-r border-slate-200 mr-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E3E62] to-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-500/10 ring-2 ring-blue-100">
            م
          </div>
          <div className="hidden xl:block text-right">
            <div className="text-xs font-bold text-slate-800 font-cairo">د. عادل المنار</div>
            <div className="text-[10px] text-slate-500 font-medium font-cairo">رئيس مجلس الإدارة والمدير الطبي</div>
          </div>
        </div>
      </div>
    </header>
  );
};
