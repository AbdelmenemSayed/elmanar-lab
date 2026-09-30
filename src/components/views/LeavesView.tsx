import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CalendarDays, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  AlertCircle,
  FileCheck2,
  CalendarCheck
} from 'lucide-react';
import { AddLeaveModal } from '../modals/AddLeaveModal';

export const LeavesView: React.FC = () => {
  const { leaves, updateLeaveStatus, openEmployeeProfile } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLeaves = leaves.filter((lv) => {
    if (statusFilter === 'all') return true;
    return lv.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
            <CalendarDays className="w-6 h-6 text-blue-600" />
            <span>إدارة الإجازات والأذونات الرسمية</span>
          </h1>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            متابعة طلبات الإجازات السنوية، المرضية، والطارئة ومواءمتها مع سجلات الحضور الشهرية
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold font-cairo transition shadow-md shadow-blue-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>تقديم طلب إجازة جديد</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 font-cairo">طلبات بانتظار الاعتماد</span>
            <div className="text-2xl font-black text-amber-600 font-mono mt-1">
              {leaves.filter((l) => l.status === 'pending').length}
            </div>
            <span className="text-[11px] text-amber-700 font-cairo">تحتاج لموافقة الإدارة</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 font-cairo">إجازات معتمدة هذا الشهر</span>
            <div className="text-2xl font-black text-emerald-600 font-mono mt-1">
              {leaves.filter((l) => l.status === 'approved').length}
            </div>
            <span className="text-[11px] text-emerald-700 font-cairo">مخصومة من الأرصدة الرسمية</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 font-cairo">موظفون في إجازة اليوم</span>
            <div className="text-2xl font-black text-blue-600 font-mono mt-1">
              2
            </div>
            <span className="text-[11px] text-blue-700 font-cairo">30 سبتمبر 2026</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo transition ${
            statusFilter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          كافة الطلبات ({leaves.length})
        </button>
        <button
          onClick={() => setStatusFilter('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo transition ${
            statusFilter === 'pending' ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          قيد المراجعة ({leaves.filter((l) => l.status === 'pending').length})
        </button>
        <button
          onClick={() => setStatusFilter('approved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-cairo transition ${
            statusFilter === 'approved' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          المعتمدة ({leaves.filter((l) => l.status === 'approved').length})
        </button>
      </div>

      {/* Leaves Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right font-cairo">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">رقم الطلب</th>
                <th className="p-4">الموظف</th>
                <th className="p-4">القسم</th>
                <th className="p-4">نوع الإجازة</th>
                <th className="p-4">الفترة والمدة</th>
                <th className="p-4">السبب والملاحظات</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">الاعتماد</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeaves.map((leave) => (
                <tr key={leave.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-mono font-bold text-slate-500">{leave.id}</td>

                  <td className="p-4">
                    <button
                      onClick={() => openEmployeeProfile(leave.employeeId)}
                      className="font-bold text-slate-900 hover:text-blue-600 transition"
                    >
                      {leave.employeeName}
                    </button>
                    <span className="block text-[11px] font-mono text-slate-400">{leave.employeeId}</span>
                  </td>

                  <td className="p-4 text-slate-600 font-medium">{leave.department}</td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {leave.leaveType === 'annual' && 'إجازة اعتيادية سنوية'}
                      {leave.leaveType === 'sick' && 'إجازة مرضية'}
                      {leave.leaveType === 'emergency' && 'إجازة طارئة (عارضة)'}
                      {leave.leaveType === 'unpaid' && 'إجازة بدون مرتب'}
                    </span>
                  </td>

                  <td className="p-4 font-mono">
                    <div className="font-bold text-slate-800">
                      {leave.daysCount} {leave.daysCount === 1 ? 'يوم' : 'أيام'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {leave.startDate} ← {leave.endDate}
                    </div>
                  </td>

                  <td className="p-4 text-slate-600 max-w-xs">{leave.reason}</td>

                  <td className="p-4">
                    {leave.status === 'approved' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        معتمدة
                      </span>
                    )}
                    {leave.status === 'pending' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        قيد المراجعة
                      </span>
                    )}
                    {leave.status === 'rejected' && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        مرفوضة
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-slate-500 font-medium text-[11px]">
                    {leave.approvedBy || 'بانتظار الاعتماد'}
                  </td>

                  <td className="p-4 text-center">
                    {leave.status === 'pending' ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => updateLeaveStatus(leave.id, 'approved', 'د. عادل المنار')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition flex items-center gap-1"
                          title="موافقة على الإجازة"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>موافقة</span>
                        </button>
                        <button
                          onClick={() => updateLeaveStatus(leave.id, 'rejected', 'د. عادل المنار')}
                          className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-bold text-xs transition"
                          title="رفض الإجازة"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>رفض</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddLeaveModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
};
