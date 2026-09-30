import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department } from '../../types/hrm';
import { X, CalendarPlus, Calendar, User, FileText } from 'lucide-react';

interface AddLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeaveModal: React.FC<AddLeaveModalProps> = ({ isOpen, onClose }) => {
  const { employees, addLeave } = useApp();

  const [employeeId, setEmployeeId] = useState(employees[0]?.id || 'MN-001');
  const [leaveType, setLeaveType] = useState<'annual' | 'sick' | 'emergency' | 'unpaid'>('annual');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-03');
  const [daysCount, setDaysCount] = useState(3);
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return;

    addLeave({
      employeeId: emp.id,
      employeeName: emp.name,
      department: emp.department,
      leaveType,
      startDate,
      endDate,
      daysCount: Number(daysCount),
      reason: reason || 'طلب إجازة اعتيادية'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-[#0B192C] to-[#1E3E62] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-cairo">تقديم طلب إجازة موظف</h3>
              <p className="text-xs text-slate-300 font-cairo">إجازات اعتيادية، مرضية، طارئة أو بدون راتب</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-cairo">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">الموظف المعني</label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.id}) — {emp.position}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">نوع الإجازة</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
            >
              <option value="annual">إجازة اعتيادية سنوية (خصم من الرصيد)</option>
              <option value="sick">إجازة مرضية (بتقرير طبي)</option>
              <option value="emergency">إجازة طارئة (عارضة)</option>
              <option value="unpaid">إجازة بدون مرتب</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">تاريخ البداية</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">تاريخ الانتهاء</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">عدد الأيام المحسوبة</label>
            <input
              type="number"
              min="1"
              max="30"
              value={daysCount}
              onChange={(e) => setDaysCount(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">السبب / الملاحظات</label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="اكتب سبب طلب الإجازة أو الملاحظات..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-cairo"
            />
          </div>

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
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              إرسال الطلب للاعتماد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
