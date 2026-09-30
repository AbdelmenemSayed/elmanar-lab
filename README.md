# نظام إدارة الموارد البشرية والرواتب — معمل المنار للتحاليل الطبية
### دمنهور، محافظة البحيرة، جمهورية مصر العربية
**MANAR LABORATORY — ENTERPRISE HRM & PAYROLL SYSTEM**

[![Live Demo on Vercel](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://elmanar-lab.vercel.app)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 🌟 نبذة عن النظام (Project Overview)
نموذج تفاعلي متقدم ومتكامل وجاهز للعرض التقديمي المباشر لإدارة **معمل المنار للتحاليل الطبية والباثولوجيا الإكلينيكية** في دمنهور.
يقوم النظام بإدارة دورة حياة الموظف الكاملة:
$$\text{شؤون الموظفين} \rightarrow \text{جهاز البصمة الخارجي} \rightarrow \text{احتساب الحضور} \rightarrow \text{التأخير والإضافي} \rightarrow \text{الإجازات} \rightarrow \text{مسير الرواتب} \rightarrow \text{مراجعة المحاسب} \rightarrow \text{اعتماد الإدارة} \rightarrow \text{الصرف}$$

---

## 🚀 المعاينة المباشرة (Live Links)
* **الموقع المنشور مباشرة على Vercel:**  
  👉 **[https://elmanar-lab.vercel.app](https://elmanar-lab.vercel.app)**
* **مستودع الكود على GitHub:**  
  👉 **[https://github.com/AbdelmenemSayed/elmanar-lab](https://github.com/AbdelmenemSayed/elmanar-lab)**

---

## 🔑 أهم مميزات النظام (Key Features)

### 1. الربط الحقيقي مع جهاز البصمة الخارجي (External Biometric Device)
* ربط ومحاكاة لماكينة البصمة الفعلية **MANAR-ATTENDANCE-01** (موديل ZKTeco عبر بروتوكول `TCP/IP Socket: 192.168.1.240:4370`).
* زر مزامنة تفاعلي **(Sync Now)** يسحب الحركات الحيوية اللحظية بدون أي برامج بصمة وهمية في المتصفح.
* سجلات حية بالثانية تُحدد نوع الحركة (دخول / خروج) وطريقة التحقق (بصمة إصبع، بصمة وجه، بطاقة RFID).

### 2. محرك الاحتساب الآلي لقواعد العمل (Automated Attendance Engine)
* مواعيد الدوام الرسمي: `09:00 ص → 05:00 م` وفترة السماح: `15 دقيقة`.
* احتساب التأخير التلقائي عند تجاوز فترة السماح.
* احتساب الساعات الإضافية آلياً بعد نهاية الدوام بمعامل `1.5x`.
* تسجيل الغياب التلقائي في حال عدم وجود بصمة وعدم وجود إجازة معتمدة، وتطبيق لائحة خصم يوم ونصف في المرتبات.

### 3. بوابات النظام الثلاث حسب الصلاحيات (Three Portals)
* **بوابة الإدارة (Management):** كونسول تنفيذي للقرارات، نسب الحضور، تكاليف الأجور، واعتماد الرواتب.
* **بوابة الموارد البشرية (HR):** إدارة 87 موظف، الحضور اليومي، الإجازات، ومسودات الرواتب.
* **بوابة المحاسب (Accountant):** تدقيق الخصومات (35,000 ج)، تجهيز ملف التحويلات البنكية، والصرف.
* **مدير النظام (Super Admin):** ضبط لوائح العمل والشبكة وصلاحيات المستخدمين.

### 4. قسيمة الراتب الإلكترونية الرسمية (Official Printable Payslip)
* قسيمة معتمدة بترويسة معمل المنار بدمنهور، تفنيد دقيق للاستحقاقات والبدلات والاستقطاعات، مع دعم الطباعة الفورية (`window.print()`) المحمية وتصدير PDF.

### 5. شريط السيناريوهات التوضيحية (Interactive Demo Banner)
* سيناريو 1: أحمد محمد (تأخير 8 د + عمل إضافي 1.5 س)
* سيناريو 2: محمد حسن (غياب تلقائي بدون إذن وخصم في الراتب)
* سيناريو 3: سارة محمود (حضور منضبط ضمن فترة السماح)
* سيناريو 4: مزامنة حركات جهاز البصمة
* سيناريو 5: دورة اعتماد وصرف المرتبات بالكامل

---

## 🛠️ التقنيات المستخدمة (Tech Stack)
* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS v4 (Modern RTL Layout + Glassmorphism)
* **Typography:** Google Fonts (Cairo & Plus Jakarta Sans)
* **Icons:** Lucide React
* **Effects:** Canvas Confetti
* **Deployment:** Vercel Production

---

## 💻 التشغيل محلياً (Run Locally)

```bash
# 1. استنساخ المستودع
git clone https://github.com/AbdelmenemSayed/elmanar-lab.git

# 2. الانتقال للمجلد
cd elmanar-lab

# 3. تثبيت الاعتماديات
npm install

# 4. تشغيل خادم التطوير
npm run dev
```

---
معمل المنار للتحاليل الطبية — دمنهور، محافظة البحيرة © 2026
