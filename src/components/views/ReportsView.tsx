import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department } from '../../types/hrm';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Clock, 
  UserX, 
  BadgePercent, 
  Users, 
  Building2, 
  FileText 
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { employees, attendanceRecords, payroll, showToast } = useApp();

  const [activeReport, setActiveReport] = useState<string>('attendance');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-09');

  const reportTabs = [
    { id: 'attendance', label: 'تقرير الحضور', icon: <Clock className="w-4 h-4" /> },
    { id: 'absence', label: 'تقرير الغياب', icon: <UserX className="w-4 h-4" /> },
    { id: 'late', label: 'تقرير التأخيرات', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'overtime', label: 'تقرير الإضافي', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'payroll', label: 'تقرير الرواتب', icon: <BadgePercent className="w-4 h-4" /> },
    { id: 'employee', label: 'تقرير الموظفين', icon: <Users className="w-4 h-4" /> },
    { id: 'department', label: 'تقرير الأقسام', icon: <Building2 className="w-4 h-4" /> },
    { id: 'cost', label: 'تقرير التكاليف', icon: <PieChart className="w-4 h-4" /> },
  ];

  const handleExportExcel = () => {
    showToast({
      type: 'success',
      title: 'تم تصدير التقرير بتنسيق Excel',
      message: `تم تجهيز ملف Report_${activeReport}_ManarLab_2026.xlsx`
    });
  };

  const handleExportPDF = () => {
    showToast({
      type: 'info',
      title: 'تم تصدير التقرير بتنسيق PDF',
      message: `تم تجهيز التقرير الرسمي للطباعة والأرشفة الإدارية`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-cairo text-slate-800 flex items-center gap-2.5">
            <FileSpreadsheet className="w-6 h-6 text-blue-600" />
            <span>مركز التقارير والتحليلات الإدارية والمالية</span>
          </h1>
          <p className="text-xs text-slate-500 font-cairo mt-1">
            تقارير تفصيلية شاملة عن الحضور، الغياب، الساعات الإضافية، وتكاليف الأجور بمعمل المنار
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold font-cairo transition shadow-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>تصدير Excel</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-2xl text-xs font-bold font-cairo transition shadow-sm flex items-center gap-2 border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>تصدير PDF للطباعة</span>
          </button>
        </div>
      </div>

      {/* Reports Selection Bar */}
      <div className="bg-white p-2.5 rounded-3xl border border-slate-200 shadow-2xs flex items-center gap-1.5 overflow-x-auto">
        {reportTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveReport(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold font-cairo transition whitespace-nowrap ${
              activeReport === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Report Filter & Meta Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-700">
            <Calendar className="w-4 h-4 text-blue-600" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent focus:outline-hidden"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-cairo font-bold text-slate-700 focus:outline-hidden"
          >
            <option value="all">كافة الأقسام والمختبرات</option>
            <option value="lab">التحاليل الطبية والباثولوجيا</option>
            <option value="reception">سحب العينات والاستقبال</option>
            <option value="chem">الكيمياء الإكلينيكية</option>
            <option value="admin">الإدارة والموارد البشرية</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-cairo">
          الفترة: <span className="font-bold text-slate-800">شهر سبتمبر 2026</span> • معمل المنار (دمنهور)
        </div>
      </div>

      {/* REPORT CONTENT PANELS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
        {/* Visual Chart Bars (Clean SVG representation) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-cairo text-slate-800">
              المؤشرات الإحصائية العامة للتقرير (Analytics Overview)
            </h3>
            <span className="text-xs text-blue-600 font-bold font-cairo">معدل الانضباط: 92.4%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-cairo block mb-1">نسبة الحضور بالدوام</span>
              <div className="text-2xl font-black text-emerald-600 font-mono">85.0%</div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-cairo block mb-1">نسبة التأخير الصباحي</span>
              <div className="text-2xl font-black text-amber-600 font-mono">6.8%</div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '6.8%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-cairo block mb-1">نسبة الغياب بدون إذن</span>
              <div className="text-2xl font-black text-rose-600 font-mono">5.7%</div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '5.7%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-cairo block mb-1">معدل العمل الإضافي</span>
              <div className="text-2xl font-black text-purple-600 font-mono">1.45 س/موظف</div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Sample Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 font-cairo">
              جدول البيانات التحليلية التفصيلية
            </span>
            <span className="text-xs font-mono text-slate-400">87 Record Analyzed</span>
          </div>

          <table className="w-full text-xs text-right font-cairo">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-3">القسم / المختبر</th>
                <th className="p-3">عدد الموظفين</th>
                <th className="p-3">أيام الحضور</th>
                <th className="p-3">ساعات التأخير</th>
                <th className="p-3">ساعات الإضافي</th>
                <th className="p-3">إجمالي الأجور</th>
                <th className="p-3">مؤشر الكفاءة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-cairo font-bold text-slate-900">التحاليل الطبية والباثولوجيا</td>
                <td className="p-3">28</td>
                <td className="p-3 text-emerald-600 font-bold">672 يوم</td>
                <td className="p-3 text-amber-600">14 س 20 د</td>
                <td className="p-3 text-purple-600 font-bold">48 س 30 د</td>
                <td className="p-3 font-bold text-slate-800">224,000 ج</td>
                <td className="p-3 font-cairo text-emerald-600 font-bold">ممتاز (94%)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-cairo font-bold text-slate-900">الكيمياء الإكلينيكية</td>
                <td className="p-3">18</td>
                <td className="p-3 text-emerald-600 font-bold">432 يوم</td>
                <td className="p-3 text-amber-600">6 س 10 د</td>
                <td className="p-3 text-purple-600 font-bold">32 س 00 د</td>
                <td className="p-3 font-bold text-slate-800">148,000 ج</td>
                <td className="p-3 font-cairo text-emerald-600 font-bold">ممتاز (96%)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-cairo font-bold text-slate-900">سحب العينات والاستقبال</td>
                <td className="p-3">16</td>
                <td className="p-3 text-emerald-600 font-bold">384 يوم</td>
                <td className="p-3 text-amber-600">8 س 45 د</td>
                <td className="p-3 text-purple-600 font-bold">18 س 10 د</td>
                <td className="p-3 font-bold text-slate-800">110,400 ج</td>
                <td className="p-3 font-cairo text-blue-600 font-bold">جيد جداً (91%)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-cairo font-bold text-slate-900">الميكروبيولوجي والمناعة</td>
                <td className="p-3">12</td>
                <td className="p-3 text-emerald-600 font-bold">288 يوم</td>
                <td className="p-3 text-amber-600">4 س 30 د</td>
                <td className="p-3 text-purple-600 font-bold">20 س 00 د</td>
                <td className="p-3 font-bold text-slate-800">128,000 ج</td>
                <td className="p-3 font-cairo text-emerald-600 font-bold">ممتاز (95%)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-cairo font-bold text-slate-900">الإدارة والحسابات والدعم</td>
                <td className="p-3">13</td>
                <td className="p-3 text-emerald-600 font-bold">312 يوم</td>
                <td className="p-3 text-amber-600">7 س 15 د</td>
                <td className="p-3 text-purple-600 font-bold">8 س 00 د</td>
                <td className="p-3 font-bold text-slate-800">75,000 ج</td>
                <td className="p-3 font-cairo text-blue-600 font-bold">جيد جداً (90%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
