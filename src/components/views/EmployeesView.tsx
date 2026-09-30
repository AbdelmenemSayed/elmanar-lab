import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department, Employee } from '../../types/hrm';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Fingerprint, 
  Phone, 
  Mail, 
  Building2, 
  MoreVertical,
  Printer
} from 'lucide-react';
import { AddEmployeeModal } from '../modals/AddEmployeeModal';

export const EmployeesView: React.FC = () => {
  const { 
    employees, 
    openEmployeeProfile, 
    deleteEmployee, 
    openPayslip, 
    showToast,
    globalSearch,
    setGlobalSearch 
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

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

  // Filtering
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
      emp.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
      emp.biometricId.includes(globalSearch) ||
      emp.phone.includes(globalSearch);

    const matchesDept = selectedDept === 'all' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleExportExcel = () => {
    showToast({
      type: 'success',
      title: 'تم تصدير كشف الموظفين',
      message: 'تم تنزيل ملف Employees_Manar_Lab_2026.xlsx بنجاح'
    });
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-blue-600" />
            <span>إدارة شؤون العاملين والموظفين</span>
          </h1>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            سجلات الموظفين، بيانات العقود، والربط الدائم مع أجهزة البصمة البيومترية
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl text-xs font-bold font-cairo transition shadow-2xs flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>تصدير Excel</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold font-cairo transition shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة موظف جديد</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Department Select */}
          <div className="min-w-[200px]">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-cairo font-bold text-slate-700 focus:outline-hidden focus:bg-white"
            >
              <option value="all">كافة الأقسام والمختبرات ({employees.length})</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Select */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-cairo font-bold text-slate-700 focus:outline-hidden focus:bg-white"
            >
              <option value="all">كافة الحالات</option>
              <option value="active">على رأس العمل (Active)</option>
              <option value="suspended">موقوف مؤقتاً</option>
              <option value="terminated">منتهية خدمته</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-cairo">
          عرض <span className="font-bold text-slate-800">{filteredEmployees.length}</span> من أصل{' '}
          <span className="font-bold text-slate-800">87</span> موظف
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right font-cairo">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="p-4">الموظف والتعريف</th>
                <th className="p-4">رقم البصمة</th>
                <th className="p-4">القسم التابع له</th>
                <th className="p-4">الوظيفة</th>
                <th className="p-4">الهاتف</th>
                <th className="p-4">تاريخ التعيين</th>
                <th className="p-4">الراتب الأساسي</th>
                <th className="p-4">الحالة</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-xs border border-blue-100">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <button
                          onClick={() => openEmployeeProfile(emp.id)}
                          className="font-bold text-slate-900 hover:text-blue-600 transition text-right block"
                        >
                          {emp.name}
                        </button>
                        <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                          {emp.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-mono font-bold">
                    <span className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-800 px-2.5 py-1 rounded-lg border border-cyan-200">
                      <Fingerprint className="w-3.5 h-3.5 text-cyan-600" />
                      <span>#{emp.biometricId}</span>
                    </span>
                  </td>

                  <td className="p-4 text-slate-700 font-medium">
                    {emp.department}
                  </td>

                  <td className="p-4 text-slate-700 font-medium">
                    {emp.position}
                  </td>

                  <td className="p-4 font-mono text-slate-600">
                    {emp.phone}
                  </td>

                  <td className="p-4 font-mono text-slate-500">
                    {emp.hireDate}
                  </td>

                  <td className="p-4 font-mono font-bold text-slate-800">
                    {emp.basicSalary.toLocaleString()} ج
                  </td>

                  <td className="p-4">
                    {emp.status === 'active' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>على رأس العمل</span>
                      </span>
                    ) : emp.status === 'suspended' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        موقوف مؤقتاً
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                        منتهية الخدمة
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEmployeeProfile(emp.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="عرض الملف الشامل"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openPayslip(emp.id)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        title="قسيمة الراتب"
                      >
                        <Printer className="w-4 h-4" />
                      </button>

                      {emp.status === 'active' && (
                        <button
                          onClick={() => deleteEmployee(emp.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="إنهاء الخدمة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
