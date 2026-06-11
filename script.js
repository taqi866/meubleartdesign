        const BACKEND_URL = "https://script.google.com/macros/s/AKfycbyWP7SIO76FG66IB6P3M7B8CBln8VgMAShpsQlYg64VsCG7TTHBAp-weah6bhB85TjK/exec";

let currentView = 'dashboard';
let allInvoices = [];
let allWorkers = [];
let allPayments = []; // مخزن شامل لكل الدفعات المسجلة
let allUsers = [];
let allShops = [];
let allTransportPayments = [];
let allElectricityBills = [];
let allExternalWorkers = [];
let operationInProgress = false;
let currentUserRole = 'admin';
let dashboardStats = null;

// --- LOCAL STORAGE HELPERS ---
const StorageKeys = {
    INVOICES: 'meubel_invoices',
    WORKERS: 'meubel_workers',
    SHOPS: 'meubel_shops',
    TRANSPORT: 'meubel_transport',
    ELECTRICITY: 'meubel_electricity',
    EXTERNAL: 'meubel_external',
    STATS: 'meubel_stats',
    USERS: 'meubel_users',
    ALL_PAYMENTS: 'meubel_payments',
    USER: 'meubel_user_session' // مفتاح تخزين بيانات المستخدم الحالي
};

function saveToLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocal(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

async function syncAllDataFromServer() {
    return new Promise((resolve) => {
        let syncCount = 0;
        const totalSyncs = 9; // أضفنا جلب كل الدفعات والمستخدمين
        const checkDone = () => {
            syncCount++;
            if (syncCount === totalSyncs) resolve();
        };

        scriptRunHelper('getInvoices', [{allData: true}], (data) => { allInvoices = data; saveToLocal(StorageKeys.INVOICES, data); checkDone(); });
        scriptRunHelper('getWorkers', [{ showInactive: true }], (data) => { allWorkers = data; saveToLocal(StorageKeys.WORKERS, data); checkDone(); });
        scriptRunHelper('getShops', [{}], (data) => { allShops = data; saveToLocal(StorageKeys.SHOPS, data); checkDone(); });
        scriptRunHelper('getTransportPayments', [{allData: true}], (data) => { 
            allTransportPayments = data.payments || []; 
            saveToLocal(StorageKeys.TRANSPORT, allTransportPayments); 
            checkDone(); 
        });
        scriptRunHelper('getElectricityBills', [""], (data) => { allElectricityBills = data; saveToLocal(StorageKeys.ELECTRICITY, data); checkDone(); });
        scriptRunHelper('getExternalWorkers', [{}], (data) => { allExternalWorkers = data; saveToLocal(StorageKeys.EXTERNAL, data); checkDone(); });
        scriptRunHelper('getDashboardData', [], (data) => { dashboardStats = data; saveToLocal(StorageKeys.STATS, data); checkDone(); });
        scriptRunHelper('getAllPayments', [], (data) => { allPayments = data; saveToLocal(StorageKeys.ALL_PAYMENTS, data); checkDone(); });
        scriptRunHelper('getUsers', [], (data) => { allUsers = data; saveToLocal(StorageKeys.USERS, data); checkDone(); });
    });
}

function loadFromLocal() {
    allInvoices = getFromLocal(StorageKeys.INVOICES) || [];
    allWorkers = getFromLocal(StorageKeys.WORKERS) || [];
    allPayments = getFromLocal(StorageKeys.ALL_PAYMENTS) || [];
    allShops = getFromLocal(StorageKeys.SHOPS) || [];
    allTransportPayments = getFromLocal(StorageKeys.TRANSPORT) || [];
    allElectricityBills = getFromLocal(StorageKeys.ELECTRICITY) || [];
    allExternalWorkers = getFromLocal(StorageKeys.EXTERNAL) || [];
    allUsers = getFromLocal(StorageKeys.USERS) || [];
    dashboardStats = getFromLocal(StorageKeys.STATS) || null;
}

// --- LOCAL SYNC HELPERS ---
function updateLocalDataAndSync(key, localArray, newItem, idField) {
    const index = localArray.findIndex(item => item[idField] == newItem[idField]);
    if (index !== -1) {
        localArray[index] = newItem;
    } else {
        localArray.unshift(newItem);
    }
    saveToLocal(key, localArray);
}

function removeFromLocalAndSync(key, localArray, idValue, idField) {
    const index = localArray.findIndex(item => item[idField] == idValue);
    if (index !== -1) {
        localArray.splice(index, 1);
        saveToLocal(key, localArray);
    }
}

function restoreLoginButtonState() {
    const btn = document.getElementById('login-submit-btn');
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>تسجيل الدخول</span>`;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
}

const scriptRunHelper = function(functionName, args, successHandler, successMessage) {
     const customSuccessHandler = function(result) {
         if (result && result.error && functionName !== 'doLogin' && functionName !== 'sendPasswordResetEmail') {
             operationInProgress = false;
             showAlert(result.error, 'error');
         } else {
             if (successMessage) showAlert(successMessage, 'success');
             operationInProgress = false;
             if (successHandler) successHandler(result);
         }
     };

     const customFailureHandler = function(error) {
         operationInProgress = false;
         if (functionName === 'doLogin') {
             restoreLoginButtonState();
         }
         showAlert(`حدث خطأ في العملية: ${error.message}.`, 'error');
         console.error(`Error in ${functionName}:`, error);
     };
     
     // 1. إذا كان يعمل داخل بيئة Google Apps Script
     if (typeof google !== 'undefined' && google.script && google.script.run) {
         const runner = google.script.run
             .withSuccessHandler(customSuccessHandler)
             .withFailureHandler(customFailureHandler);
         runner[functionName].apply(runner, args);
     } 
     // 2. إذا كان يعمل كاستضافة مستقلة على GitHub Pages
     else if (BACKEND_URL && BACKEND_URL !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL') {
         fetch(BACKEND_URL, {
             method: 'POST',
             mode: 'cors',
             // نستخدم text/plain لتفادي إرسال طلب OPTIONS (CORS preflight) من المتصفح
             headers: {
                 'Content-Type': 'text/plain;charset=utf-8'
             },
             body: JSON.stringify({
                 functionName: functionName,
                 args: args
             })
         })
         .then(response => {
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             }
             return response.json();
         })
         .then(result => {
             customSuccessHandler(result);
         })
         .catch(error => {
             customFailureHandler(error);
         });
     } else {
         operationInProgress = false;
         showAlert('يرجى ضبط رابط الخلفية BACKEND_URL في ملف script.js للتشغيل الخارجي.', 'error');
         console.error('BACKEND_URL is not configured for external hosting.');
     }
};

        const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        
        function formatNumber(number) {
            if (typeof number === 'string') {
                number = parseFloat(number);
            }
            if (isNaN(number)) return '0';
            
            const roundedNumber = Math.round(number);
            const formatted = roundedNumber.toLocaleString('en-US').replace(/,/g, ' ');
            
            return `<span class="financial-number">${formatted}</span>`;
        }
        
        function formatNumberWithDecimals(number) {
            if (typeof number === 'string') {
                number = parseFloat(number);
            }
            if (isNaN(number)) return '0.00';
            
            const formatted = number.toFixed(2).toLocaleString('en-US').replace(/,/g, ' ');
            return `<span class="financial-number">${formatted}</span>`;
        }

        function formatDateDMY(dateString) {
            if (!dateString) return '';
            const parts = dateString.split('-');
            if (parts.length === 3) {
                 const [year, month, day] = parts;
                 return `${day}/${month}/${year}`;
            }
            
            const date = new Date(dateString); 
            
            if (isNaN(date.getTime())) {
                return dateString;
            }

            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        function applyPermissions() {
            const isAdmin = currentUserRole === 'admin';
            const adminOnlyNavIds = [
                'nav-dashboard',
                'nav-workers',
                'nav-external-workers',
                'nav-transport',
                'nav-shops',
                'nav-electricity',
                'nav-profit-loss',
                'nav-users',
                // شريط الجوال السفلي
                'mobile-nav-dashboard',
                'mobile-nav-workers',
                'mobile-nav-profit-loss'
            ];

            adminOnlyNavIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    if (isAdmin) el.classList.remove('hidden');
                    else el.classList.add('hidden');
                }
            });
        }

        function wrapCellContent(content) {
            return `<td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${content}</td>`;
        }
        
        // ====================================================================
        // NEW: دالة عرض نافذة التأكيد العصرية
        // ====================================================================
        let confirmCallback = null;

        function showCustomConfirm(title, message, onConfirm, type = 'warning') {
            const modal = document.getElementById('custom-confirm-modal');
            const titleEl = document.getElementById('confirm-title');
            const messageEl = document.getElementById('confirm-message');
            const iconContainer = document.getElementById('confirm-icon-container');
            const yesBtn = document.getElementById('confirm-btn-yes');

            titleEl.textContent = title;
            messageEl.innerHTML = message.replace(/\n/g, '<br>');
            
            // إعداد الأيقونة واللون بناءً على النوع
            if (type === 'verify' || type === 'success') {
                iconContainer.className = 'confirmation-icon verify';
                iconContainer.innerHTML = '<i class="fas fa-check"></i>';
                yesBtn.className = 'confirm-btn yes bg-green-500 hover:bg-green-600';
            } else {
                // warning or delete
                iconContainer.className = 'confirmation-icon unverify';
                iconContainer.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                yesBtn.className = 'confirm-btn yes bg-red-500 hover:bg-red-600';
            }

            confirmCallback = onConfirm;
            yesBtn.onclick = function() {
                if (confirmCallback) confirmCallback();
                closeModal('custom-confirm-modal');
            };

            openModal('custom-confirm-modal');
        }

        function manualSync(event) {
            const btn = event.currentTarget;
            const icon = btn.querySelector('i');
            icon.classList.add('fa-spin');
            showAlert('جاري تحديث ومزامنة كافة البيانات...', 'info');
            syncAllDataFromServer().then(() => {
                icon.classList.remove('fa-spin');
                renderAllLocalViews();
                showAlert('تم تحديث البيانات بنجاح.', 'success');
            });
        }

        // ====================================================================
        // NEW: وظيفة مصادقة الفاتورة
        // ====================================================================

        async function verifyInvoice(invoiceNo) {
            showCustomConfirm(
                'تأكيد المصادقة',
                `هل تريد تأكيد مصادقة الفاتورة رقم ${invoiceNo}؟\nيمكن التعديل على الفاتورة حتى بعد المصادقة.`,
                () => {
                    // تحديث محلي فوري (سرعة 100%)
                    const inv = allInvoices.find(i => i.InvoiceNo === invoiceNo);
                    if (inv) {
                        inv.IsVerified = 'TRUE';
                        saveToLocal(StorageKeys.INVOICES, allInvoices);
                        renderInvoicesTable(allInvoices);
                        showAlert(`جاري معالجة المصادقة...`, 'info');
                    }

                    scriptRunHelper('verifyInvoice', [invoiceNo], (result) => {
                        if (result.success) {
                            showAlert(`تمت مصادقة الفاتورة رقم ${invoiceNo} بنجاح.`, 'success');
                        }
                    });
                },
                'verify'
            );
        }

async function unverifyInvoice(invoiceNo) {
    showCustomConfirm(
        'إلغاء المصادقة',
        `هل تريد تأكيد إلغاء مصادقة الفاتورة رقم ${invoiceNo}؟`,
        () => {
            // تحديث محلي فوري (سرعة 100%)
            const inv = allInvoices.find(i => i.InvoiceNo === invoiceNo);
            if (inv) {
                inv.IsVerified = 'FALSE';
                saveToLocal(StorageKeys.INVOICES, allInvoices);
                renderInvoicesTable(allInvoices);
                showAlert(`جاري إلغاء المصادقة...`, 'info');
            }

            scriptRunHelper('unverifyInvoice', [invoiceNo], (result) => {
                if (result.success) {
                    showAlert(`تم إلغاء مصادقة الفاتورة رقم ${invoiceNo} بنجاح.`, 'success');
                }
            });
        },
        'warning'
    );
}

        // ====================================================================
        // NEW: تعديل دالة عرض الفواتير
        // ====================================================================

        function renderInvoicesTable(invoices) {
    const tbody = document.getElementById('invoices-table-body');
    if (invoices.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-gray-500 border border-gray-300">لا توجد فواتير مسجلة.</td></tr>';
        return;
    }

    const rows = invoices.map(inv => {
        const statusClass = inv.Status === 'Paid' ? 'bg-green-100 text-green-800' :
                          inv.Status === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800';
        
        // NEW: فئة حالة المصادقة
        const verifyClass = inv.IsVerified === 'TRUE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
        const verifyText = inv.IsVerified === 'TRUE' ? '✓ مصادق' : 'لم يتم';
        
        // NEW: زر المصادقة/إلغاء المصادقة
        const verifyButton = inv.IsVerified === 'TRUE' ? 
            `<button onclick="unverifyInvoice('${inv.InvoiceNo}')" 
                    class="text-red-600 hover:text-red-900 transition duration-150" 
                    title="إلغاء المصادقة">
                إلغاء المصادقة
            </button>` :
            `<button onclick="verifyInvoice('${inv.InvoiceNo}')" 
                    class="text-indigo-600 hover:text-indigo-900 transition duration-150">
                مصادقة
            </button>`;
        
        return `
            <tr class="hover:bg-gray-50">
                ${wrapCellContent(`<span class="font-medium text-gray-900">${inv.InvoiceNo}</span>`)}
                ${wrapCellContent(inv.CustomerName)}
                ${wrapCellContent(formatDateDMY(inv.Date))}
                ${wrapCellContent(formatNumber(inv.TotalAmount))}
                <td class="px-4 py-2 whitespace-nowrap text-sm font-bold border border-gray-300 ${inv.RemainingAmount > 0 ? 'text-red-600' : 'text-green-600'}">
                    ${formatNumber(inv.RemainingAmount)} DH
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm border border-gray-300">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                        ${inv.Status === 'Paid' ? 'مدفوعة' : inv.Status === 'Partial' ? 'جزئياً' : 'غير مدفوعة'}
                    </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm border border-gray-300">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${verifyClass}">
                        ${verifyText}
                    </span>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse border border-gray-300">
    ${parseFloat(inv.RemainingAmount) > 0 ? 
        `<button onclick="openPaymentModal('invoice', '${inv.InvoiceNo}', '${inv.CustomerName}', ${inv.RemainingAmount})" 
                class="text-amber-600 hover:text-amber-800 transition duration-150">
            سداد
        </button>` : 
        `<button disabled class="text-gray-400">مدفوعة</button>`
    }
    
    <button onclick="viewInvoicePayments('${inv.InvoiceNo}')" 
            class="text-purple-600 hover:text-purple-900 transition duration-150">
        دفعات
    </button>
    
    <!-- NEW: زر المصادقة/إلغاء المصادقة -->
    ${inv.IsVerified === 'TRUE' ? 
        `<button onclick="unverifyInvoice('${inv.InvoiceNo}')" 
                class="text-red-600 hover:text-red-900 transition duration-150" 
                title="إلغاء المصادقة">
            إلغاء المصادقة
        </button>` :
        `<button onclick="verifyInvoice('${inv.InvoiceNo}')" 
                class="text-indigo-600 hover:text-indigo-900 transition duration-150">
            مصادقة
        </button>`
    }
    
    ${parseFloat(inv.RemainingAmount) > 0 ? 
        `<button onclick="sendWhatsAppReminder('${inv.InvoiceNo}', '${inv.CustomerName}', '${inv.CustomerPhone}', ${inv.RemainingAmount})" 
                class="text-green-600 hover:text-green-900 transition duration-150">
            واتساب
        </button>` : 
        ''
    }
    
    <!-- NEW: التعديل متاح دائماً -->
    <button onclick="editInvoiceForm('${inv.InvoiceNo}')" 
            class="text-blue-600 hover:text-blue-800 transition duration-150">
        تعديل
    </button>

    <button onclick="generatePrintableInvoice('${inv.InvoiceNo}')" 
            class="text-gray-600 hover:text-gray-900 transition duration-150" title="طباعة الفاتورة">
        <i class="fas fa-print"></i>
    </button>
    
    <button onclick="deleteInvoice('${inv.InvoiceNo}')" class="text-red-600 hover:text-red-900 transition duration-150" title="حذف الفاتورة">
        <i class="fas fa-trash"></i>
    </button>
</td>
            </tr>
        `;
    }).join('');
    tbody.innerHTML = rows;
}

        // ====================================================================
        // NEW: تعديل دالة عرض قائمة الدخل
        // ====================================================================

        function renderProfitLossData(data) {
            const statsContainer = document.getElementById('profit-loss-stats');
            const tableBody = document.getElementById('pl-table-body');
            
            if (!data) {
                statsContainer.innerHTML = '<p class="text-center text-red-500 col-span-3">حدث خطأ أثناء تحميل بيانات قائمة الدخل.</p>';
                tableBody.innerHTML = '<tr><td colspan="3" class="text-center py-4 text-gray-500 border border-gray-300">حدث خطأ أثناء تحميل البيانات.</td></tr>';
                return;
            }

            const netProfit = parseFloat(data.netProfit);
            const netProfitClass = netProfit >= 0 ? 'text-green-700' : 'text-red-700';
            const netProfitCardColor = netProfit >= 0 ? 'green' : 'red';
            
            // 1. Render Stats Cards
            statsContainer.innerHTML = `
                ${renderStatCard('إجمالي المداخيل (إجمالي المبيعات)', formatNumber(data.totalRevenue), 'amber')}
                ${renderStatCard('إجمالي المصاريف التشغيلية (المدفوعة)', formatNumber(data.totalOperatingExpenses), 'purple')}
                <div class="bg-white p-5 rounded-xl shadow-lg flex items-center justify-between border-r-4 border-${netProfitCardColor}-500">
                    <div>
                        <p class="text-sm font-medium text-gray-500">صافي الربح/الخسارة</p>
                        <p class="text-2xl font-bold ${netProfitClass} mt-1">${formatNumber(netProfit)} DH</p>
                    </div>
                    <div class="p-3 bg-${netProfitCardColor}-50 rounded-full">
                        <i class="fas fa-sack-dollar h-6 w-6 text-${netProfitCardColor}-500"></i>
                    </div>
                </div>
                
                <!-- NEW: بطاقات المستحقات والديون -->
                ${renderStatCard('إجمالي المستحقات المتبقية (الزبائن)', formatNumber(data.totalCustomerRemaining), 'red')}
                ${renderStatCard('إجمالي الديون المستحقة (عمال ومحلات)', formatNumber(data.totalExpensesDebt), 'orange')}
            `;

            // 2. Render Details Table
            let rowsHtml = '';
            
            const detailRow = (label, amount, color = 'text-gray-700', isTotal = false) => {
                const amountValue = parseFloat(amount) || 0;
                const amountClass = amountValue < 0 ? 'text-red-600' : (color.includes('green') ? 'text-green-600' : (color.includes('red') ? 'text-red-600' : 'text-gray-900'));
                const borderClass = isTotal ? 'border-t-4 border-b-4 border-gray-300 font-bold' : '';
                
                return `
                    <tr class="hover:bg-gray-50 ${borderClass}">
                        <td class="px-4 py-3 whitespace-nowrap text-sm ${color} border border-gray-300">${label}</td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm ${amountClass} border border-gray-300 text-left" style="direction: ltr;">${formatNumberWithDecimals(amountValue)} DH</td>
                        <td class="px-4 py-3 whitespace-nowrap text-sm ${isTotal ? netProfitClass : 'text-gray-500'} border border-gray-300">${isTotal ? 'النتيجة النهائية' : ''}</td>
                    </tr>
                `;
            };

            // الإيرادات
            rowsHtml += detailRow('إجمالي المبيعات (المداخيل)', data.totalRevenue, 'text-amber-700', false);
            rowsHtml += detailRow('خصم: تكلفة البضاعة المباعة (COGS)', parseFloat(data.totalCogs) * -1, 'text-red-600', false);
            rowsHtml += detailRow('صافي الربح الإجمالي (Gross Profit)', data.grossProfit, 'text-green-700', true);

            // المصاريف التشغيلية
            rowsHtml += `<tr><td colspan="3" class="px-4 py-2 bg-gray-100 text-base font-semibold border border-gray-300">المصاريف التشغيلية المدفوعة:</td></tr>`;
            rowsHtml += detailRow('أجور العمال المدفوعة', parseFloat(data.workersPaid) * -1, 'text-red-600');
            rowsHtml += detailRow('إيجارات المحلات المدفوعة', parseFloat(data.shopsPaid) * -1, 'text-red-600');
            rowsHtml += detailRow('مصاريف النقل المدفوعة', parseFloat(data.transportPaid) * -1, 'text-red-600');
            rowsHtml += detailRow('فواتير الكهرباء المدفوعة', parseFloat(data.electricityPaid) * -1, 'text-red-600');
            rowsHtml += detailRow('مصاريف عمال خارجيين', parseFloat(data.externalWorkersPaid) * -1, 'text-red-600');
            rowsHtml += detailRow('إجمالي المصاريف التشغيلية', parseFloat(data.totalOperatingExpenses) * -1, 'text-red-800', true);
            
            // NEW: إضافة المستحقات والديون
            rowsHtml += `<tr><td colspan="3" class="px-4 py-2 bg-gray-100 text-base font-semibold border border-gray-300">الديون والمستحقات:</td></tr>`;
            rowsHtml += detailRow('المستحقات المتبقية من الزبائن', data.totalCustomerRemaining, 'text-red-700');
            rowsHtml += detailRow('الديون المستحقة للعمال والمحلات', data.totalExpensesDebt, 'text-orange-700');
            
            // صافي الربح
            rowsHtml += detailRow('صافي الربح / الخسارة', data.netProfit, netProfitClass, true);

            tableBody.innerHTML = rowsHtml;
        }

        // ====================================================================
        // باقي الدوال المطلوبة (مثل renderStatCard وغيرها)
        // ====================================================================

        function renderStatCard(title, value, color) {
            let bgColor, textColor, iconColor, borderColor;

            if (color === 'amber') {
                bgColor = 'bg-amber-50';
                textColor = 'text-amber-700';
                iconColor = 'text-amber-500';
                borderColor = 'border-amber-500';
            } else if (color === 'red') {
                bgColor = 'bg-red-50';
                textColor = 'text-red-700';
                iconColor = 'text-red-500';
                borderColor = 'border-red-500';
            } else if (color === 'green') {
                bgColor = 'bg-green-50';
                textColor = 'text-green-700';
                iconColor = 'text-green-500';
                borderColor = 'border-green-500';
            } else if (color === 'orange') {
                bgColor = 'bg-orange-50';
                textColor = 'text-orange-700';
                iconColor = 'text-orange-500';
                borderColor = 'border-orange-500';
            } else if (color === 'purple') {
                bgColor = 'bg-purple-50';
                textColor = 'text-purple-700';
                iconColor = 'text-purple-500';
                borderColor = 'border-purple-500';
            } else {
                bgColor = 'bg-blue-50';
                textColor = 'text-blue-700';
                iconColor = 'text-blue-500';
                borderColor = 'border-blue-500';
            }

            return `
                <div class="bg-white p-5 rounded-xl shadow-lg flex items-center justify-between border-r-4 ${borderColor}">
                    <div>
                        <p class="text-sm font-medium text-gray-500">${title}</p>
                        <p class="text-2xl font-bold ${textColor} mt-1">${value} DH</p>
                    </div>
                    <div class="p-3 ${bgColor} rounded-full">
                         <svg class="h-6 w-6 ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v-2m0 12v-2m-6 2h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                </div>
            `;
        }

        // ====================================================================
        // الدوال الأساسية
        // ====================================================================

        document.addEventListener('DOMContentLoaded', () => {
            const today = new Date().toISOString().split('T')[0];
            
            const dateFields = ['Date', 'TransportDate', 'StartDate', 'PaymentDate', 'ElectricityDate', 'ExternalWorkerDate'];
            dateFields.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = today;
            });
            
            initializeDateFilters('invoice');
            initializeDateFilters('worker');
            initializeDateFilters('shop');
            initializeDateFilters('transport');
            initializeDateFilters('electricity');
            initializeDateFilters('external-worker');
            initializeDateFilters('pl');

            // التحقق من وجود جلسة نشطة عند تحميل الصفحة
            const savedUser = getFromLocal(StorageKeys.USER);
            if (savedUser && savedUser.role) {
                currentUserRole = savedUser.role;
                loadFromLocal();
                applyPermissions();
                document.getElementById('login-view').classList.add('hidden');
                document.getElementById('main-app').classList.remove('hidden');
                showView(currentUserRole === 'admin' ? 'dashboard' : 'invoices');
                renderAllLocalViews();
            } else {
                document.getElementById('login-view').classList.remove('hidden');
            }

            // تسجيل Service Worker لتمكين ميزات PWA والتثبيت كتطبيق
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js')
                    .then((reg) => console.log('Service Worker registered with scope:', reg.scope))
                    .catch((err) => console.error('Service Worker registration failed:', err));
            }
        });
        
        function initializeDateFilters(prefix) {
             const yearFilter = document.getElementById(`${prefix}-filter-year`);
             if (!yearFilter) return;

             const startYear = 2024;
             const endYear = 2030;
             const currentYear = new Date().getFullYear(); 

             yearFilter.innerHTML = '<option value="">كل السنوات</option>';
             
             for (let y = endYear; y >= startYear; y--) {
                 const option = document.createElement('option');
                 option.value = y;
                 option.textContent = y;
                 yearFilter.appendChild(option);
             }
             
             if (currentYear >= startYear && currentYear <= endYear) {
                 yearFilter.value = currentYear;
             }
        }
        
        function checkInitialAuth() {
             document.getElementById('login-view').classList.remove('hidden');
        }

        function handleLogin(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('login-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin ml-2"></i> جاري تسجيل الدخول...`;
                submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
            }

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            scriptRunHelper('doLogin', [username, password], (result) => {
                if (result && result.success) {
                    try { // NEW: Add try-catch for post-login UI updates
                        currentUserRole = result.role || 'admin';
                        saveToLocal(StorageKeys.USER, { username: username, role: currentUserRole });
                        
                        loadFromLocal();
                        applyPermissions();
                        console.log('Login successful, applying permissions and rendering UI.'); // NEW: Debug log

                        document.getElementById('login-view').classList.add('hidden');
                        document.getElementById('main-app').classList.remove('hidden');
                        showView(currentUserRole === 'admin' ? 'dashboard' : 'invoices');
                        renderAllLocalViews();
                        
                        showAlert('تم تسجيل الدخول. جاري تحديث البيانات...', 'info');
                        syncAllDataFromServer().then(() => {
                            console.log('Data synced from server, re-rendering views.'); // NEW: Debug log
                            renderAllLocalViews();
                        });
                    } catch (e) {
                        console.error('Error during post-login UI update:', e); // NEW: Log the error
                        showLoginAlert('حدث خطأ غير متوقع بعد تسجيل الدخول: ' + e.message, 'error');
                        // Ensure main-app is hidden if an error occurs after showing it
                        document.getElementById('main-app').classList.add('hidden');
                        document.getElementById('login-view').classList.remove('hidden');
                        restoreLoginButtonState();
                    }
                } else {
                    showLoginAlert(result ? (result.error || 'اسم المستخدم أو كلمة المرور غير صحيحة') : 'اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
                    restoreLoginButtonState();
                }
            });
        }



        function showLoginAlert(message, type = 'error') {
            const container = document.getElementById('alert-container-login');
            const box = document.getElementById('alert-box-login');

            box.textContent = message;
            box.classList.remove('bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
            
            if (type === 'success') {
                box.classList.add('bg-green-100', 'text-green-800');
            } else {
                box.classList.add('bg-red-100', 'text-red-800');
            }
            
            container.classList.remove('hidden');
            
            setTimeout(() => {
                container.classList.add('hidden');
            }, 5000);
        }

        function handleLogout() {
             localStorage.removeItem(StorageKeys.USER);
             document.getElementById('username').value = '';
             document.getElementById('password').value = ''; 
             const mainApp = document.getElementById('main-app');
             if (mainApp) mainApp.classList.add('hidden');
             document.getElementById('login-view').classList.remove('hidden');
             restoreLoginButtonState();
             showLoginAlert('تم تسجيل الخروج بنجاح.', 'success');
        }

        function handleForgotPassword(event) {
             event.preventDefault();
             
             const userEmail = document.getElementById('recovery-email').value;

             if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
                 showAlert('يرجى إدخال بريد إلكتروني صحيح.', 'error', 'confirmation-modal');
                 return;
             }

             closeModal('confirmation-modal');
             
             scriptRunHelper('sendPasswordResetEmail', [userEmail], (result) => {
                 if (result.success) {
                     showLoginAlert('تم إرسال كلمة المرور إلى بريد المسؤول المسجل. يرجى التحقق من صندوق الوارد.', 'success');
                 } else {
                      if (result.error && result.error.includes('غير مطابق')) {
                          showLoginAlert('البريد الإلكتروني المدخل غير صحيح. يرجى التحقق وإعادة المحاولة.', 'error');
                      } else {
                          showLoginAlert(result.error || 'فشل إرسال كلمة المرور. يرجى التحقق من الإعدادات.', 'error');
                      }
                 }
             }, null);
        }
        
        function showConfirmationModal(event) {
             event.preventDefault();
             openModal('confirmation-modal');
        }

        function togglePasswordVisibility() {
             const passwordInput = document.getElementById('password');
             const toggleIcon = document.getElementById('togglePassword');
             
             if (passwordInput.type === 'password') {
                 passwordInput.type = 'text';
                 toggleIcon.classList.remove('fa-eye');
                 toggleIcon.classList.add('fa-eye-slash');
             } else {
                 passwordInput.type = 'password';
                 toggleIcon.classList.remove('fa-eye-slash');
                 toggleIcon.classList.add('fa-eye');
             }
        }

        function fetchAndRenderData() {
            loadFromLocal();
            renderAllLocalViews();
        }

        function renderAllLocalViews() {
            renderDashboardUI();
            fetchInvoices(); // Les fonctions de fetch vont maintenant filtrer localement
            fetchWorkers();
        }
        
        function openModal(modalId) {
             document.getElementById(modalId).classList.remove('hidden');
             document.getElementById(modalId).classList.add('flex');
        }
        
        function closeModal(modalId) {
             document.getElementById(modalId).classList.add('hidden');
        }

        function showView(viewId) {
             if (currentUserRole !== 'admin' && viewId !== 'invoices') {
                 viewId = 'invoices';
             }
             
             document.querySelectorAll('.view').forEach(view => {
                 view.classList.add('hidden');
             });
             document.getElementById(`${viewId}-view`).classList.remove('hidden');
             currentView = viewId;
             if (currentView === 'invoices') fetchInvoices();
             if (currentView === 'workers') fetchWorkers();
             if (currentView === 'transport') fetchTransportPayments();
             if (currentView === 'shops') fetchShops();
             if (currentView === 'electricity') fetchElectricityBills();
             if (currentView === 'external-workers') fetchExternalWorkers();
             if (currentView === 'users') fetchUsers();
             if (currentView === 'profit-loss') fetchProfitLossData();

             // تحديث حالة التبويب النشط في القائمة الجانبية
             document.querySelectorAll('[id^="nav-"]').forEach(link => {
                 link.classList.remove('bg-amber-100', 'text-amber-700', 'font-semibold');
                 link.classList.add('text-gray-700');
             });
             const activeSidebarLink = document.getElementById(`nav-${viewId}`);
             if (activeSidebarLink) {
                 activeSidebarLink.classList.remove('text-gray-700');
                 activeSidebarLink.classList.add('bg-amber-100', 'text-amber-700', 'font-semibold');
             }
             
             // تحديث حالة التبويب النشط في شريط الجوال السفلي
             document.querySelectorAll('[id^="mobile-nav-"]').forEach(link => {
                 link.classList.remove('text-amber-500', 'scale-105');
                 link.classList.add('text-gray-500');
             });
             const activeMobileLink = document.getElementById(`mobile-nav-${viewId}`);
             if (activeMobileLink) {
                 activeMobileLink.classList.remove('text-gray-500');
                 activeMobileLink.classList.add('text-amber-500', 'scale-105');
             }

             closeSidebar();
        }

        function showForm(formType) {
            if (formType === 'invoice-form-new') {
                resetInvoiceFormForNew();
                document.getElementById('invoice-form').classList.remove('hidden');
            } else if (formType === 'worker-form-new') {
                resetWorkerFormForNew();
                document.getElementById('worker-form').classList.remove('hidden');
            } else if (formType === 'transport-form') {
                resetTransportFormForNew();
                document.getElementById('transport-form').classList.remove('hidden');
            } else if (formType === 'shop-form-new') {
                resetShopFormForNew();
                document.getElementById('shop-form').classList.remove('hidden');
            } else if (formType === 'electricity-form') {
                resetElectricityFormForNew();
                document.getElementById('electricity-form').classList.remove('hidden');
            } else if (formType === 'external-worker-form') {
                resetExternalWorkerFormForNew();
                document.getElementById('external-worker-form').classList.remove('hidden');
            } else if (formType === 'user-form') {
                resetUserFormForNew();
                document.getElementById('user-form').classList.remove('hidden');
            } else {
                 document.getElementById(formType).classList.remove('hidden');
            }
        }
        
        function hideForm(formId) {
            document.getElementById(formId).classList.add('hidden');
            const formElement = document.getElementById(`add-${formId}`);
            if (formElement) {
                formElement.reset();
                if (formId === 'invoice-form') {
                    document.getElementById('InitialPaidAmount').value = 0;
                }
            }
        }

        function showAlert(message, type = 'success', containerId = 'alert-container') {
            // توجيه التنبيه تلقائياً لشاشة تسجيل الدخول إذا كانت معروضة
            if (containerId === 'alert-container' && !document.getElementById('login-view').classList.contains('hidden')) {
                containerId = 'alert-container-login';
            }
            
            const container = document.getElementById(containerId);
            let box; 

            if (containerId === 'alert-container-login') {
                 box = document.getElementById('alert-box-login');
            } else {
                 box = document.getElementById('alert-box');
            }

            box.textContent = message;
            box.classList.remove('bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
            
            if (type === 'success') {
                box.classList.add('bg-green-100', 'text-green-800');
            } else {
                box.classList.add('bg-red-100', 'text-red-800');
            }
            
            container.classList.remove('hidden');
            
            setTimeout(() => {
                container.classList.add('hidden');
            }, 5000);
        }

        function renderDashboardUI() {
            if (dashboardStats && dashboardStats.stats) {
                renderDashboardStats(dashboardStats.stats);
                renderLatestInvoices(dashboardStats.latestInvoices);
                renderOverdueCustomers(dashboardStats.overdueCustomers);
                renderLatestPayments(dashboardStats.latestPayments || []);
            }
        }

        function renderDashboardStats(stats) {
            const container = document.getElementById('dashboard-stats');
            
            container.innerHTML = `
                 ${renderStatCard('إجمالي المبيعات (هذا الشهر)', formatNumber(stats.totalSales), 'amber')}
                 ${renderStatCard('إجمالي هامش الربح (هذا الشهر)', formatNumber(stats.totalProfit), 'green')}
                 ${renderStatCard('المستحقات المتبقية (فواتير هذا الشهر)', formatNumber(stats.totalRemaining), 'red')}
                 ${renderStatCard('إجمالي الديون المستحقة (عمال/محلات - هذا الشهر)', formatNumber(stats.totalDebts), 'orange')}
                 ${renderStatCard('إجمالي المصاريف (المدفوعة فعلياً هذا الشهر)', formatNumber(stats.totalExpensesThisMonth), 'purple')}
            `;
        }
        
        function renderLatestPayments(payments) {
            const container = document.getElementById('latest-payments-list');
            if (payments.length === 0) {
                 container.innerHTML = '<p class="text-gray-500">لا توجد دفعات حديثة مسجلة.</p>';
                 return;
            }
            container.innerHTML = payments.map(p => {
                const isExpense = ['راتب عامل', 'إيجار محل', 'نقل', 'كهرباء', 'عامل خارجي'].includes(p.Category);
                const amountClass = isExpense ? 'text-red-600' : 'text-green-600';
                
                return `
                    <div class="flex justify-between items-center p-3 border-b hover:bg-gray-50 rounded-lg">
                        <p class="font-medium">${p.Category} ${p.Category === 'فاتورة' ? `(#${p.InvoiceNo})` : ''}</p>
                        <p class="text-gray-600 text-sm">${formatDateDMY(p.Date)}</p>
                        <p class="font-bold ${amountClass}">${formatNumber(p.PaidAmount)} DH</p>
                    </div>
                `;
            }).join('');
        }

        function renderLatestInvoices(invoices) {
            const container = document.getElementById('latest-invoices-list');
            if (invoices.length === 0) {
                 container.innerHTML = '<p class="text-gray-500">لا توجد فواتير حديثة.</p>';
                 return;
            }
            container.innerHTML = invoices.map(inv => `
                <div class="flex justify-between items-center p-3 border-b hover:bg-gray-50 rounded-lg">
                    <p class="font-medium">${inv.CustomerName} - فاتورة #${inv.InvoiceNo}</p>
                    <p class="text-gray-600">${formatNumber(inv.TotalAmount)} DH</p>
                </div>
            `).join('');
        }

        function renderOverdueCustomers(invoices) {
            const container = document.getElementById('overdue-list');
            if (invoices.length === 0) {
                 container.innerHTML = '<p class="text-gray-500">لا توجد مبالغ متبقية حالياً. عمل ممتاز!</p>';
                 return;
            }
            container.innerHTML = invoices.map(inv => `
                <div class="flex justify-between items-center p-3 border-b hover:bg-red-50 rounded-lg">
                    <p class="font-medium">${inv.CustomerName} (${inv.CustomerPhone})</p>
                    <p class="text-red-600 font-bold">${formatNumber(inv.RemainingAmount)} DH متبقي</p>
                    <button onclick="openPaymentModal('invoice', '${inv.InvoiceNo}', '${inv.CustomerName}', ${inv.RemainingAmount})" class="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded-xl transition">سداد</button>
                </div>
            `).join('');
        }
        
        function clearProfitLossFilters() {
             const currentYear = new Date().getFullYear();
             document.getElementById('pl-filter-year').value = currentYear;
             document.getElementById('pl-filter-month').value = '';
             fetchProfitLossData();
        }
        
        function fetchProfitLossData() {
            const year = document.getElementById('pl-filter-year').value;
            const month = document.getElementById('pl-filter-month').value;
            
            // 1. عرض البيانات فوراً بناءً على المخزن المحلي (سرعة فائقة)
            const localData = calculateProfitLossLocally(year, month);
            renderProfitLossData(localData);
            
            // 2. تحديث صامت في الخلفية لضمان مطابقة البيانات مع السيرفر
            scriptRunHelper('getProfitLossData', [{year, month, allData: true}], (serverData) => {
                if (serverData && serverData.success) {
                    renderProfitLossData(serverData);
                }
            });
        }

        function calculateProfitLossLocally(year, month) {
            const isMatch = (dateStr) => {
                if (!dateStr) return false;
                const d = new Date(dateStr);
                return (!year || d.getFullYear().toString() === year) && 
                       (!month || (d.getMonth() + 1).toString() === month);
            };

            const invoices = allInvoices.filter(i => isMatch(i.Date));
            const rev = invoices.reduce((s, i) => s + parseFloat(i.TotalAmount || 0), 0);
            const cogs = invoices.reduce((s, i) => s + (parseFloat(i.Cost || 0)), 0);
            
            const payMatch = (p) => isMatch(p.Date || p.PaymentDate);
            const wp = allPayments.filter(p => p.Category === 'راتب عامل' && payMatch(p)).reduce((s, p) => s + parseFloat(p.PaidAmount || 0), 0);
            const sp = allPayments.filter(p => p.Category === 'إيجار محل' && payMatch(p)).reduce((s, p) => s + parseFloat(p.PaidAmount || 0), 0);
            const tp = allTransportPayments.filter(payMatch).reduce((s, p) => s + parseFloat(p.PaidAmount || 0), 0);
            const ep = allElectricityBills.filter(b => (!year || b.Year.toString() === year) && (!month || b.Month.toString() === month)).reduce((s, b) => s + parseFloat(b.Amount || 0), 0);
            const exp = allExternalWorkers.filter(payMatch).reduce((s, p) => s + parseFloat(p.Amount || 0), 0);

            const totalOp = wp + sp + tp + ep + exp;
            return {
                success: true,
                totalRevenue: rev,
                totalCogs: cogs,
                grossProfit: rev - cogs,
                workersPaid: wp, shopsPaid: sp, transportPaid: tp, electricityPaid: ep, externalWorkersPaid: exp,
                totalOperatingExpenses: totalOp,
                totalCustomerRemaining: allInvoices.reduce((s, i) => s + parseFloat(i.RemainingAmount || 0), 0),
                totalExpensesDebt: allWorkers.reduce((s, w) => s + parseFloat(w.RemainingDebt || 0), 0) + allShops.reduce((s, sh) => s + parseFloat(sh.RemainingDebt || 0), 0),
                netProfit: (rev - cogs) - totalOp
            };
        }

        function fetchInvoices() {
             const searchInput = document.getElementById('invoice-search');
             const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
             const year = document.getElementById('invoice-filter-year').value;
             const month = document.getElementById('invoice-filter-month').value;
             const status = document.getElementById('invoice-filter-status').value;
             
             // فلترة محلية فورية ودقيقة برقم الفاتورة أو اسم الزبون
             const filtered = allInvoices.filter(inv => {
                 const invNo = String(inv.InvoiceNo || '').toLowerCase();
                 const custName = String(inv.CustomerName || '').toLowerCase();
                 const matchesQuery = !query || invNo.includes(query) || custName.includes(query);

                 const d = new Date(inv.Date);
                 const matchesYear = !year || d.getFullYear().toString() === year;
                 const matchesMonth = !month || (d.getMonth() + 1).toString() === month;
                 const matchesStatus = !status || inv.Status === status;

                 return matchesQuery && matchesYear && matchesMonth && matchesStatus;
             });

             renderInvoicesTable(filtered);
             
             // حساب الإحصائيات محلياً لضمان السرعة
             const summary = {
                 totalSales: filtered.reduce((s, i) => s + (parseFloat(i.TotalAmount) || 0), 0),
                 totalPaid: filtered.reduce((s, i) => s + ((parseFloat(i.TotalAmount) || 0) - (parseFloat(i.RemainingAmount) || 0)), 0),
                 totalRemaining: filtered.reduce((s, i) => s + (parseFloat(i.RemainingAmount) || 0), 0),
                 totalProfit: filtered.reduce((s, i) => s + ((parseFloat(i.TotalAmount) || 0) - (parseFloat(i.Cost) || 0)), 0)
             };
             renderInvoiceSummaryStats(summary);

             // مزامنة صامتة في الخلفية إذا لزم الأمر، دون تعطيل المستخدم
             // scriptRunHelper('getInvoices', [filters], (data) => { ... });
             
             /*
             // Background sync
             const filters = { query, year, month, status };
             scriptRunHelper('getInvoices', [filters], (data) => {
                 allInvoices = data;
                 saveToLocal(StorageKeys.INVOICES, data);
                 // No need to re-render unless data changed significantly, but we can to be safe
                 renderInvoicesTable(data);
             });
             
             scriptRunHelper('getInvoiceSummaryByDate', [filters], (summary) => {
                 if (summary.success) {
                     renderInvoiceSummaryStats(summary);
                 }
             });
             */
        }
        
        function renderInvoiceSummaryStats(summary) {
             const container = document.getElementById('invoice-summary-stats');
             container.innerHTML = `
                 ${renderStatCard('إجمالي المبيعات (المفلترة)', formatNumber(summary.totalSales), 'amber')}
                 ${renderStatCard('إجمالي المدفوعات (المفلترة)', formatNumber(summary.totalPaid), 'green')}
                 ${renderStatCard('إجمالي هامش الربح (المفلتر)', formatNumber(summary.totalProfit), 'blue')}
                 ${renderStatCard('إجمالي المتبقي (المفلتر)', formatNumber(summary.totalRemaining), 'red')}
             `;
        }

        function resetInvoiceFormForNew() {
             document.getElementById('invoice-form-title').textContent = 'نموذج إضافة فاتورة';
             document.getElementById('invoice-submit-button').textContent = 'حفظ الفاتورة';
             document.getElementById('InvoiceID_Hidden').value = '';
             document.getElementById('add-invoice-form').reset();
             document.getElementById('InitialPaidAmount').value = 0;
             document.getElementById('InvoiceNo').removeAttribute('readonly'); 
             document.getElementById('initial-paid-container').classList.remove('hidden'); 
        }
        
        function fillInvoiceFormForEdit(invoiceData) {
             document.getElementById('invoice-form-title').textContent = `تعديل الفاتورة رقم ${invoiceData.InvoiceNo}`;
             document.getElementById('invoice-submit-button').textContent = 'تحديث الفاتورة';
             document.getElementById('InvoiceID_Hidden').value = invoiceData.InvoiceNo; 
             
             document.getElementById('InvoiceNo').value = invoiceData.InvoiceNo;
             document.getElementById('InvoiceNo').setAttribute('readonly', 'true'); 
             document.getElementById('CustomerName').value = invoiceData.CustomerName;
             document.getElementById('CustomerPhone').value = invoiceData.CustomerPhone;
             document.getElementById('Date').value = invoiceData.Date;
             document.getElementById('TotalAmount').value = parseFloat(invoiceData.TotalAmount);
             document.getElementById('Cost').value = parseFloat(invoiceData.Cost);
             document.getElementById('ItemDescription').value = invoiceData.ItemDescription;
             document.getElementById('Notes').value = invoiceData.Notes;

             document.getElementById('initial-paid-container').classList.add('hidden'); 
        }

        function editInvoiceForm(invoiceNo) {
            if (!invoiceNo || invoiceNo === 'undefined') {
                showAlert('خطأ: رقم الفاتورة غير صحيح أو غير موجود.', 'error');
                return;
            }
            const invoice = allInvoices.find(inv => inv.InvoiceNo == invoiceNo);
            if (!invoice) {
                showAlert('لم يتم العثور على الفاتورة للتعديل.', 'error');
                return;
            }
            
            
            fillInvoiceFormForEdit(invoice);
            document.getElementById('invoice-form').classList.remove('hidden');
        }

        function handleInvoiceSubmit(event) {
            event.preventDefault();

            if (operationInProgress) {
                showAlert('جاري معالجة العملية السابقة...', 'info');
                return;
            }

            const originalInvoiceNo = document.getElementById('InvoiceID_Hidden').value;
            const isEdit = originalInvoiceNo !== '';
            const submitButton = document.getElementById('invoice-submit-button');

            const data = {
                InvoiceNo: document.getElementById('InvoiceNo').value,
                CustomerName: document.getElementById('CustomerName').value,
                CustomerPhone: document.getElementById('CustomerPhone').value,
                Date: document.getElementById('Date').value,
                TotalAmount: parseFloat(document.getElementById('TotalAmount').value) || 0,
                Cost: parseFloat(document.getElementById('Cost').value) || 0,
                ItemDescription: document.getElementById('ItemDescription').value,
                Notes: document.getElementById('Notes').value,
            };

            // Préparation de l'objet optimiste pour un affichage immédiat
            let optimisticInvoice = { ...data };
            if (!isEdit) {
                const initialPaid = parseFloat(document.getElementById('InitialPaidAmount').value) || 0;
                if (data.TotalAmount < initialPaid) {
                    showAlert('خطأ: الدفعة المبدئية لا يمكن أن تتجاوز المجموع الكلي.', 'error');
                    return;
                }
                data.InitialPaidAmount = initialPaid;
                optimisticInvoice.InitialPaidAmount = initialPaid;
                optimisticInvoice.RemainingAmount = data.TotalAmount - initialPaid;
                optimisticInvoice.Status = optimisticInvoice.RemainingAmount <= 0 ? 'Paid' : (initialPaid > 0 ? 'Partial' : 'Unpaid');
                optimisticInvoice.IsVerified = 'FALSE';

                // تحيين سجل الدفعات محلياً للدفعة المبدئية لضمان ظهورها فوراً في سجل الدفعات والطباعة
                if (initialPaid > 0) {
                    const tempInitial = {
                        PaymentID: 'temp_init_' + Date.now(),
                        Category: 'فاتورة',
                        InvoiceNo: data.InvoiceNo,
                        PaidAmount: initialPaid,
                        PaymentDate: data.Date,
                        User: 'النظام',
                        Notes: 'الدفعة الأولى عند التسجيل'
                    };
                    allPayments.unshift(tempInitial);
                    saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
                }
            } else {
                // En mode édition, on essaie de conserver les calculs existants en attendant le serveur
                const existing = allInvoices.find(inv => inv.InvoiceNo == originalInvoiceNo);
                optimisticInvoice.RemainingAmount = existing ? (data.TotalAmount - (parseFloat(existing.TotalAmount) - parseFloat(existing.RemainingAmount))) : data.TotalAmount;
                optimisticInvoice.Status = existing ? existing.Status : 'Unpaid';
                optimisticInvoice.IsVerified = existing ? existing.IsVerified : 'FALSE';
            }

            // --- MISE À JOUR OPTIMISTE (100% RAPIDE) ---
            // 1. Mettre à jour les données locales immédiatement
            updateLocalDataAndSync(StorageKeys.INVOICES, allInvoices, optimisticInvoice, 'InvoiceNo');
            
            // 2. Rafraîchir l'UI immédiatement
            fetchInvoices();
            renderDashboardUI();
            fetchProfitLossData();
            hideForm('invoice-form');
            
            // 3. Notifier l'utilisateur que la synchro est en cours
            showAlert('جاري حفظ البيانات ومزامنتها...', 'info');

            // --- SYNCHRONISATION ARRIÈRE-PLAN ---
            const action = isEdit ? 'editInvoice' : 'addInvoice';
            const args = isEdit ? [originalInvoiceNo, data] : [data];

            scriptRunHelper(action, args, (result) => {
                if (result.success) {
                    // Mettre à jour avec les données réelles du serveur (calculs de solde exacts)
                    updateLocalDataAndSync(StorageKeys.INVOICES, allInvoices, result.invoice, 'InvoiceNo');
                    renderInvoicesTable(allInvoices);
                    
                    // تحديث قائمة الدفعات من السيرفر لمزامنة الدفعة المبدئية الحقيقية
                    if (!isEdit && data.InitialPaidAmount > 0) {
                        scriptRunHelper('getAllPayments', [], (pData) => {
                            allPayments = pData;
                            saveToLocal(StorageKeys.ALL_PAYMENTS, pData);
                            renderDashboardUI();
                        });
                    }
                    
                    // Mettre à jour les stats du dashboard en arrière-plan
                    scriptRunHelper('getDashboardData', [], (d) => { dashboardStats = d; saveToLocal(StorageKeys.STATS, d); renderDashboardUI(); });
                    fetchProfitLossData();
                    showAlert(isEdit ? 'تم تحديث البيانات على السيرفر.' : 'تم حفظ الفاتورة على السيرفر.', 'success');
                }
            });
        }
        
        async function addInvoicePaymentSubmit(data) {
            // 1. تحديث الفاتورة محلياً (Optimistic Update)
            const invIndex = allInvoices.findIndex(i => String(i.InvoiceNo).trim() === String(data.InvoiceNo).trim());
            if (invIndex !== -1) {
                const inv = allInvoices[invIndex];
                const paidAmt = parseFloat(data.PaidAmount) || 0;
                const currentRemaining = parseFloat(inv.RemainingAmount) || 0;
                
                // تحديث القيم في الذاكرة
                inv.RemainingAmount = Math.max(0, currentRemaining - paidAmt).toFixed(2);
                inv.Status = inv.RemainingAmount <= 0.01 ? 'Paid' : 'Partial';
                
                saveToLocal(StorageKeys.INVOICES, allInvoices);
            }

            // 2. إضافة الدفعة للسجل المحلي فوراً (لتظهر في الطباعة وسجل الدفعات)
            const tempPayment = {
                PaymentID: 'temp_' + Date.now(),
                Category: 'فاتورة',
                InvoiceNo: data.InvoiceNo,
                PaidAmount: data.PaidAmount,
                PaymentDate: data.PaymentDate,
                Date: data.PaymentDate, // للمطابقة مع فلاتر التاريخ
                User: currentUserRole || 'Admin', 
                Notes: data.PaymentNotes || 'دفعة سداد (قيد المزامنة)'
            };
            
            allPayments.unshift(tempPayment);
            saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
            
            // 3. تحديث الواجهة فوراً
            fetchInvoices();
            renderDashboardUI();
            fetchProfitLossData();
            closeModal('payment-modal');
            showAlert('تم تسجيل الدفعة محلياً. يمكنك طباعة الفاتورة الآن.', 'success');

            // 4. المزامنة مع السيرفر في الخلفية
            scriptRunHelper('addInvoicePayment', [data], (result) => {
                if (result.success) {
                    // استبدال البيانات المتفائلة بالبيانات النهائية المؤكدة من السيرفر
                    updateLocalDataAndSync(StorageKeys.INVOICES, allInvoices, result.invoice, 'InvoiceNo');
                    allPayments = allPayments.filter(p => p.PaymentID !== tempPayment.PaymentID);
                    const finalPayment = { ...result.payment, Category: 'فاتورة', Date: result.payment.PaymentDate };
                    allPayments.unshift(finalPayment);
                    saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
                    
                    renderInvoicesTable(allInvoices);
                    renderDashboardUI();
                    fetchProfitLossData();
                }
            });
        }
        
        async function sendWhatsAppReminder(invoiceNo, customerName, customerPhone, remainingAmount) {
             const data = {
                 InvoiceNo: invoiceNo,
                 CustomerName: customerName,
                 CustomerPhone: customerPhone,
                 RemainingAmount: remainingAmount,
             };
             scriptRunHelper('getWhatsAppLink', [data], (result) => {
                 if (result && result.waLink) {
                      window.open(result.waLink, '_blank');
                      showAlert('تم تجهيز رسالة الواتساب.', 'success');
                 }
             });
        }
        
        function viewInvoicePayments(invoiceNo) {
            const payments = getLocalInvoicePayments(invoiceNo);
            // ترتيب الأحدث أولاً للعرض في الجدول
            payments.sort((a, b) => new Date(b.PaymentDate || b.Date) - new Date(a.PaymentDate || a.Date));
            renderInvoicePaymentsModal(invoiceNo, payments);
        }

        function renderInvoicePaymentsModal(invoiceNo, payments) {
             document.getElementById('invoice-payments-modal-title').textContent = `دفوعات الفاتورة #${invoiceNo}`;
             const tbody = document.getElementById('invoice-payments-table-body');
             tbody.innerHTML = '';

             if (payments.length === 0) {
                  tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500 border border-gray-300">لم يتم تسجيل أي دفعات لهذه الفاتورة.</td></tr>';
             } else {
                 payments.forEach(p => {
                      const row = document.createElement('tr');
                      row.className = 'hover:bg-gray-50';
                      // معالجة كافة احتمالات أسماء الحقول للقيم
                      const pDate = p.PaymentDate || p.Date || p.Timestamp || p['التاريخ'] || '';
                      const pAmount = p.PaidAmount || p.Amount || p['المبلغ'] || 0;
                      const pUser = p.User || p['المستخدم'] || 'Admin';
                      const pNotes = p.Notes || p.PaymentNotes || p['ملاحظات'] || '-';
                      
                      row.innerHTML = `
                           <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${formatDateDMY(pDate)}</td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm font-bold text-green-600 border border-gray-300">${formatNumber(pAmount)} DH</td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${pUser}</td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${pNotes}</td>
                         `;
                       tbody.appendChild(row);
                 });
             }

             openModal('invoice-payments-modal');
        }

         // NEW: دالة لإنشاء وتحميل الفاتورة مباشرة بصيغة PDF A4 مع حماية التناسب للأجهزة المحمولة
        function downloadInvoicePDF(callback) {
            const element = document.getElementById('invoice-print-content');
            const invoiceNo = document.getElementById('print-invoice-no').textContent || 'invoice';
            
            // تخزين العرض الأصلي للمستند قبل التعديل المؤقت
            const originalWidth = element.style.width;
            const originalPadding = element.style.padding;
            
            // فرض العرض القياسي A4 المكتبي (800 بكسل) وحشوة مناسبة مؤقتاً للتصدير
            element.style.width = '800px';
            element.style.padding = '30px';
            
            const opt = {
                margin:       10, // مم
                filename:     `Meuble_Art_Design_Facture_${invoiceNo}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { 
                    scale: 2, 
                    useCORS: true, 
                    letterRendering: true, 
                    logging: false,
                    width: 800
                },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            html2pdf().set(opt).from(element).save().then(() => {
                // إرجاع التنسيق الأصلي للمستند بعد الحفظ
                element.style.width = originalWidth;
                element.style.padding = originalPadding;
                if (typeof callback === 'function') callback();
            }).catch((err) => {
                console.error('Error generating PDF:', err);
                element.style.width = originalWidth;
                element.style.padding = originalPadding;
                if (typeof callback === 'function') callback();
            });
        }

        // NEW: دالة لإنشاء وعرض الفاتورة القابلة للطباعة
        function generatePrintableInvoice(invoiceNo) {
            const invoice = allInvoices.find(inv => String(inv.InvoiceNo).trim() === String(invoiceNo).trim());
            if (!invoice) {
                showAlert('لم يتم العثور على الفاتورة للطباعة.', 'error');
                return;
            }

            const payments = getLocalInvoicePayments(invoiceNo);
            // ترتيب الأقدم أولاً للطباعة لترصيد الحساب بشكل منطقي
            payments.sort((a, b) => new Date(a.PaymentDate || a.Date) - new Date(b.PaymentDate || b.Date));

            // حساب إجمالي المدفوع
            const totalPaid = payments.reduce((sum, p) => sum + parseFloat(p.PaidAmount || 0), 0);

            // تحديث البيانات الأساسية
            document.getElementById('print-invoice-no').textContent = invoice.InvoiceNo;
            document.getElementById('print-invoice-date').textContent = formatDateDMY(invoice.Date);
            document.getElementById('print-update-date').textContent = formatDateDMY(new Date().toISOString().split('T')[0]);
            document.getElementById('print-customer-name').textContent = invoice.CustomerName;
            document.getElementById('print-customer-phone').textContent = invoice.CustomerPhone;
            document.getElementById('print-total-amount').textContent = parseFloat(invoice.TotalAmount).toFixed(2) + ' DH';
            document.getElementById('print-paid-amount').textContent = totalPaid.toFixed(2) + ' DH';
            document.getElementById('print-remaining-amount').textContent = (parseFloat(invoice.TotalAmount) - totalPaid).toFixed(2) + ' DH';

            // تعبئة جدول المنتجات (بناءً على الوصف المتاح)
            const itemsBody = document.getElementById('print-items-body');
            itemsBody.innerHTML = `
                <tr>
                    <td class="p-2 border border-black">${invoice.ItemDescription || 'تجهيزات أثاث'}</td>
                    <td class="p-2 border border-black text-center">1</td>
                    <td class="p-2 border border-black text-center">${parseFloat(invoice.TotalAmount).toFixed(2)}</td>
                    <td class="p-2 border border-black text-center">${parseFloat(invoice.TotalAmount).toFixed(2)}</td>
                </tr>`;

            // تعبئة سجل الدفعات
            const paymentsTbody = document.getElementById('print-payments-table-body');
            paymentsTbody.innerHTML = payments.map(p => `
                <tr>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${formatDateDMY(p.PaymentDate || p.Date)}</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm font-bold text-green-600 border border-gray-300" style="color: #16a34a;">${formatNumber(p.PaidAmount)} DH</td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${p.Notes || '-'}</td>
                </tr>
            `).join('');

            openModal('printable-invoice-modal');
            
            // التشغيل المباشر لطباعة الفاتورة عبر نافذة الطباعة الافتراضية للجهاز ثم إغلاق النافذة
            setTimeout(() => {
                window.print();
                closeModal('printable-invoice-modal');
            }, 300);
        }


        // وظيفة مساعدة لجلب دفعات فاتورة من البيانات المحلية (التحديث اللحظي)
        function getLocalInvoicePayments(invoiceNo) {
            const targetNo = String(invoiceNo).trim();
            const invoice = allInvoices.find(inv => {
                const invNo = String(inv.InvoiceNo || inv['رقم الفاتورة'] || '').trim();
                return invNo === targetNo || (parseFloat(invNo) === parseFloat(targetNo) && invNo !== '');
            });

            let payments = (allPayments || []).filter(p => {
                const pNo = String(p.InvoiceNo || p.InvoiceID || p['رقم الفاتورة'] || p['ID'] || '').trim();
                const isMatch = pNo === targetNo || (parseFloat(pNo) === parseFloat(targetNo) && pNo !== '');
                const cat = String(p.Category || p['الفئة'] || p['الصنف'] || '').trim();
                const isInvoiceCat = cat === 'فاتورة' || cat === 'Invoice' || cat === 'Income' || cat === 'مداخيل' || cat === '';
                return isMatch && isInvoiceCat;
            });

            if (invoice) {
                const initialAmt = parseFloat(invoice.InitialPaidAmount || invoice['المبلغ المدفوع مبدئياً'] || 0);
                if (initialAmt > 0) {
                    const hasInitial = payments.some(p => {
                        const notes = String(p.Notes || p.PaymentNotes || p['ملاحظات'] || '');
                        return notes.includes('مبدئي') || notes.includes('Initial') || notes.includes('الأولى');
                    });

                    if (!hasInitial) {
                        payments.unshift({
                            PaymentDate: invoice.Date || invoice['التاريخ'],
                            PaidAmount: initialAmt,
                            User: 'النظام',
                            Notes: 'الدفعة الأولى عند التسجيل'
                        });
                    }
                }
            }
            return payments;
        }
        function fetchWorkers() {
            const query = document.getElementById('worker-search').value.toLowerCase().trim();
            const year = document.getElementById('worker-filter-year').value;
            const month = document.getElementById('worker-filter-month').value;
            const showInactive = document.getElementById('show-inactive-workers').checked;
            
            let filtered = allWorkers.filter(w => {
                const matchesQuery = !query || String(w.Name || '').toLowerCase().includes(query);
                const isActiveMatch = showInactive || String(w.IsActive).toUpperCase() === 'TRUE';
                return matchesQuery && isActiveMatch;
            });

            renderWorkersTable(filtered);
            
            // Fetch all workers (active + inactive) in the background to preserve complete local cache
            scriptRunHelper('getWorkers', [{year, month, showInactive: true}], (data) => { 
                allWorkers = data; 
                saveToLocal(StorageKeys.WORKERS, data); 
                
                // Re-apply local filters (query & showInactive) on the fresh server data
                const currentQuery = document.getElementById('worker-search').value.toLowerCase().trim();
                const currentShowInactive = document.getElementById('show-inactive-workers').checked;
                const newFiltered = data.filter(w => {
                    const matchesQuery = !currentQuery || String(w.Name || '').toLowerCase().includes(currentQuery);
                    const isActiveMatch = currentShowInactive || String(w.IsActive).toUpperCase() === 'TRUE';
                    return matchesQuery && isActiveMatch;
                });
                renderWorkersTable(newFiltered); 
            });
        }

        function renderWorkersTable(workers) {
            const tbody = document.getElementById('workers-table-body');
            
            const filteredWorkersForDisplay = workers; 
            
            if (filteredWorkersForDisplay.length === 0) {
                 tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500 border border-gray-300">لا يوجد عمال مسجلون.</td></tr>';
                 return;
            }

            const rows = filteredWorkersForDisplay.map(worker => {
                const remainingDebt = parseFloat(worker.RemainingDebt);
                const currentBalance = parseFloat(worker.CurrentMonthBalance);
                const totalAccumulatedPaid = parseFloat(worker.TotalPaid);

                const isOverdue = remainingDebt > 0.01;
                const isAdvance = currentBalance < -0.01;
                
                let debtDisplay = '';
                if (isAdvance) {
                    debtDisplay = `<span class="text-blue-600 font-bold">تسبيق: ${formatNumber(Math.abs(currentBalance))} DH</span>`;
                } else {
                    debtDisplay = `<span class="${isOverdue ? 'text-red-600 font-bold' : 'text-green-600'}">${formatNumber(remainingDebt)} DH</span>`;
                }
                
                const isInactive = String(worker.IsActive).toUpperCase() === 'FALSE';
                const buttonDisabled = worker.IsPaidUpForCycle || isInactive; 
                const buttonText = isInactive ? 'غير نشط' : buttonDisabled ? 'مدفوع للشهر الحالي' : 'تسجيل راتب';
                const buttonClass = buttonDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'text-amber-600 hover:text-amber-800';
                const advanceButtonClass = isInactive ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800';

                const statusTag = isInactive ? `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-700 mr-2">غير نشط</span>` : '';


                return `
                    <tr class="hover:bg-gray-50 ${isInactive ? 'bg-gray-50 text-gray-400' : ''}">
                        ${wrapCellContent(`<span class="font-medium text-gray-900">${worker.Name}</span>${statusTag}`)}
                        ${wrapCellContent(formatNumber(worker.MonthlySalary) + ' DH')}
                        ${wrapCellContent(formatNumber(totalAccumulatedPaid) + ' DH')} 
                        <td class="px-4 py-2 whitespace-nowrap text-sm border border-gray-300">${debtDisplay}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse border border-gray-300">
                            <button ${buttonDisabled ? 'disabled' : ''} onclick="openPaymentModal('worker', '${worker.WorkerID}', '${worker.Name}', ${remainingDebt}, ${remainingDebt})" class="${buttonClass} transition duration-150">${buttonText}</button>
                            <button ${isInactive ? 'disabled' : ''} onclick="openPaymentModal('worker', '${worker.WorkerID}', '${worker.Name}', 0, 0, true)" class="${advanceButtonClass} transition duration-150">تسبيق</button>
                            <button onclick="viewWorkerPayments('${worker.WorkerID}')" class="text-indigo-600 hover:text-indigo-900 transition duration-150">دفعات</button>
                            <button onclick="editWorkerForm('${worker.WorkerID}')" class="text-blue-600 hover:text-blue-800 transition duration-150">تعديل</button>
                            <button onclick="deleteWorker('${worker.WorkerID}')" class="text-red-600 hover:text-red-800 transition duration-150"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            }).join('');
            tbody.innerHTML = rows;
        }
        
        function resetWorkerFormForNew() {
             document.getElementById('worker-form-title').textContent = 'نموذج إضافة عامل';
             document.getElementById('worker-submit-button').textContent = 'حفظ العامل';
             document.getElementById('WorkerID_Hidden').value = '';
             document.getElementById('add-worker-form').reset();
             document.getElementById('WorkerIsActive').value = 'TRUE';
        }
        
        function fillWorkerFormForEdit(workerData) {
             document.getElementById('worker-form-title').textContent = `تعديل بيانات العامل: ${workerData.Name}`;
             document.getElementById('worker-submit-button').textContent = 'تحديث البيانات';
             document.getElementById('WorkerID_Hidden').value = workerData.WorkerID;
             
             document.getElementById('WorkerName').value = workerData.Name;
             document.getElementById('WorkerPhone').value = workerData.Phone;
             document.getElementById('MonthlySalary').value = parseFloat(workerData.MonthlySalary);
             document.getElementById('StartDate').value = workerData.StartDate;
             document.getElementById('WorkerNotes').value = workerData.Notes;
             document.getElementById('WorkerIsActive').value = String(workerData.IsActive).toUpperCase();
        }

        function editWorkerForm(workerId) {
            const worker = allWorkers.find(w => String(w.WorkerID) === String(workerId));
            if (!worker) {
                showAlert('لم يتم العثور على العامل للتعديل.', 'error');
                return;
            }
            fillWorkerFormForEdit(worker);
            document.getElementById('worker-form').classList.remove('hidden');
        }

        function handleWorkerSubmit(event) {
            event.preventDefault();
            
            if (operationInProgress) {
                showAlert('جاري معالجة العملية السابقة...', 'info');
                return;
            }
            
            // Optimistic Update
            const submitButton = document.getElementById('worker-submit-button');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;

            const workerIdHidden = document.getElementById('WorkerID_Hidden').value;
            const isEdit = workerIdHidden !== '';
            
            const data = {
                Name: document.getElementById('WorkerName').value,
                Phone: document.getElementById('WorkerPhone').value,
                MonthlySalary: document.getElementById('MonthlySalary').value,
                StartDate: document.getElementById('StartDate').value,
                Notes: document.getElementById('WorkerNotes').value,
                IsActive: document.getElementById('WorkerIsActive').value,
            };

            const workerID = isEdit ? workerIdHidden : Date.now().toString();
            const existingWorker = isEdit ? allWorkers.find(w => String(w.WorkerID) === String(workerID)) : null;

            const optimisticWorker = {
                WorkerID: workerID,
                Name: data.Name,
                Phone: data.Phone,
                MonthlySalary: data.MonthlySalary,
                StartDate: data.StartDate,
                Notes: data.Notes,
                IsActive: data.IsActive,
                TotalPaid: existingWorker ? existingWorker.TotalPaid : "0.00",
                RemainingDebt: existingWorker ? existingWorker.RemainingDebt : "0.00",
                CurrentMonthBalance: existingWorker ? existingWorker.CurrentMonthBalance : "0.00",
                TotalAccumulatedDebt: existingWorker ? existingWorker.TotalAccumulatedDebt : "0.00"
            };

            updateLocalDataAndSync(StorageKeys.WORKERS, allWorkers, optimisticWorker, 'WorkerID');
            fetchWorkers();
            hideForm('worker-form');
            
            try {
                const originalInvoiceNo = workerID;

                if (isEdit) {
                    scriptRunHelper('editWorker', [workerID, data], (result) => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        
                        if (result.success) {
                            updateLocalDataAndSync(StorageKeys.WORKERS, allWorkers, result.worker, 'WorkerID');
                            hideForm('worker-form');
                            fetchWorkers();
                            fetchProfitLossData();
                        }
                    }, `تم تحديث بيانات العامل ${data.Name} بنجاح.`);
                } else {
                     scriptRunHelper('addWorker', [data], (result) => {
                         submitButton.textContent = originalText;
                         submitButton.disabled = false;
                         
                         if (result.success) {
                             updateLocalDataAndSync(StorageKeys.WORKERS, allWorkers, result.worker, 'WorkerID');
                             hideForm('worker-form');
                             fetchWorkers();
                             fetchProfitLossData();
                         }
                     }, `تم إضافة العامل ${data.Name} بنجاح.`);
                }
            } catch (error) {
                // Error handling...
            }
        }
        
        function viewWorkerMonthlySummary(workerId) {
             const yearFilter = document.getElementById('worker-filter-year').value;
             const monthFilter = document.getElementById('worker-filter-month').value;

             // 100% Local calculation for instant display
             const worker = allWorkers.find(w => w.WorkerID == workerId);
             if (!worker) return;

             const payments = allPayments.filter(p => p.Category === 'راتب عامل' && p.WorkerID == workerId);
             const startDate = new Date(worker.StartDate || '2024-01-01');
             const now = new Date();
             const summary = [];
             
             let tempDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
             let accumulatedDebt = 0;

             while (tempDate <= now) {
                 const year = tempDate.getFullYear();
                 const month = tempDate.getMonth() + 1;
                 
                 const monthlyPaid = payments
                     .filter(p => {
                         const d = new Date(p.PaymentDate || p.Date);
                         return d.getFullYear() === year && (d.getMonth() + 1) === month;
                     })
                     .reduce((sum, p) => sum + parseFloat(p.PaidAmount || 0), 0);

                 const due = parseFloat(worker.MonthlySalary || 0);
                 accumulatedDebt += (due - monthlyPaid);

                 summary.unshift({
                     MonthName: MONTHS[month - 1],
                     Year: year,
                     Due: due,
                     Paid: monthlyPaid,
                     RemainingDebt: accumulatedDebt,
                     IsCurrentMonth: year === now.getFullYear() && month === (now.getMonth() + 1)
                 });
                 
                 tempDate.setMonth(tempDate.getMonth() + 1);
             }

             // Filter the summary based on global worker filters
             let displaySummary = summary;
             if (yearFilter || monthFilter) {
                 displaySummary = summary.filter(item => {
                     const matchesYear = !yearFilter || item.Year.toString() === yearFilter;
                     const matchesMonth = !monthFilter || item.Month.toString() === monthFilter;
                     return matchesYear && matchesMonth;
                 });
             }

             renderWorkerMonthlySummary({
                 success: true,
                 name: worker.Name,
                 salary: worker.MonthlySalary,
                 summary: displaySummary
             });

             // Background sync just in case
             scriptRunHelper('getWorkerMonthlySummary', [workerId], (result) => {
                 if (result.success) {
                     let serverSummary = result.summary;
                     if (yearFilter || monthFilter) {
                         serverSummary = serverSummary.filter(item => {
                             const matchesYear = !yearFilter || item.Year.toString() === yearFilter;
                             const matchesMonth = !monthFilter || item.Month.toString() === monthFilter;
                             return matchesYear && matchesMonth;
                         });
                     }
                     renderWorkerMonthlySummary({ ...result, summary: serverSummary });
                 }
             });
        }
        
        function renderWorkerMonthlySummary(data) {
             document.getElementById('worker-summary-name').textContent = data.name;
             document.getElementById('worker-summary-salary').innerHTML = formatNumber(data.salary);
             const tbody = document.getElementById('worker-monthly-summary-body');
             tbody.innerHTML = '';
             
             if (data.summary.length === 0) {
                 tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500 border border-gray-300">لا يوجد سجل مدفوعات لهذا العامل.</td></tr>';
             } else {
                 data.summary.forEach(item => {
                      const debtValue = parseFloat(item.RemainingDebt);
                      const debtClass = debtValue > 0.01 ? 'text-red-600 font-bold' : (debtValue < -0.01 ? 'text-blue-600 font-bold' : 'text-green-600');
                      
                      const row = document.createElement('tr');
                      row.className = 'hover:bg-gray-50';
                      row.innerHTML = `
                           <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">${item.MonthName} ${item.Year}</td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${formatNumber(item.Due)} DH</td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm text-green-600 border border-gray-300">${formatNumber(item.Paid)} DH</td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm border border-gray-300 ${debtClass}">${formatNumber(item.RemainingDebt)} DH</td>
                         `;
                       tbody.appendChild(row);
                 });
             }
             openModal('worker-details-modal');
        }

        // ====================================================================
        // NEW: دوال عرض وحذف دفعات العمال
        // ====================================================================

        function viewWorkerPayments(workerId) {
            const worker = allWorkers.find(w => w.WorkerID === workerId);
            if (!worker) return;
            
            const yearFilter = document.getElementById('worker-filter-year').value;
            const monthFilter = document.getElementById('worker-filter-month').value;
            
            document.getElementById('worker-payments-modal-title').textContent = `سجل دفعات العامل: ${worker.Name}`;
            
            let payments = allPayments.filter(p => p.Category === 'راتب عامل' && p.WorkerID === workerId);
            
            if (yearFilter || monthFilter) {
                payments = payments.filter(p => {
                    const d = new Date(p.PaymentDate || p.Date);
                    const matchesYear = !yearFilter || d.getFullYear().toString() === yearFilter;
                    const matchesMonth = !monthFilter || (d.getMonth() + 1).toString() === monthFilter;
                    return matchesYear && matchesMonth;
                });
            }
            
            renderWorkerPaymentsModal(workerId, payments);
        }

        function renderWorkerPaymentsModal(workerId, payments) {
            const tbody = document.getElementById('worker-payments-table-body');
            tbody.innerHTML = '';

            if (!payments || payments.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500 border border-gray-300">لا توجد دفعات مسجلة.</td></tr>';
            } else {
                payments.forEach(p => {
                    const row = document.createElement('tr');
                    row.className = 'hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${formatDateDMY(p.PaymentDate)}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-bold text-green-600 border border-gray-300">${formatNumber(p.PaidAmount)} DH</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${p.Notes || '-'}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium border border-gray-300">
                            <button onclick="deleteWorkerPayment('${p.PaymentID}', '${workerId}')" class="text-red-600 hover:text-red-800 transition duration-150"><i class="fas fa-trash"></i> حذف</button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            }
            openModal('worker-payments-modal');
        }

        function deleteWorkerPayment(paymentId, workerId) {
            showCustomConfirm('حذف دفعة', 'هل أنت متأكد من حذف هذه الدفعة؟', () => {
                scriptRunHelper('deleteWorkerPayment', [paymentId], (result) => {
                    if (result.success) {
                        // Instant Local Update
                        allPayments = allPayments.filter(p => p.PaymentID != paymentId);
                        saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
                        
                        // Refresh views immediately
                        viewWorkerPayments(workerId);
                        fetchWorkers(); 
                        fetchProfitLossData();
                        
                        // Background refresh for debts consistency
                        scriptRunHelper('getWorkers', [{showInactive: true}], (data) => { allWorkers = data; saveToLocal(StorageKeys.WORKERS, data); fetchWorkers(); });
                    }
                });
            }, 'delete');
        }

        async function addWorkerPaymentSubmit(data) {
             const payload = {
                 WorkerID: data.targetId,
                 PaidAmount: data.PaidAmount,
                 PaymentDate: data.PaymentDate,
                 Notes: data.PaymentNotes,
             };
             
             // تحديث متفائل
             const tempPayment = { ...payload, PaymentID: 'temp_' + Date.now(), Category: 'راتب عامل', Date: data.PaymentDate };
             allPayments.unshift(tempPayment);
             saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
             
             // تحديث متفائل لدين العامل محلياً
             const worker = allWorkers.find(w => w.WorkerID == data.targetId);
             if (worker) {
                 const paidAmt = parseFloat(data.PaidAmount) || 0;
                 worker.RemainingDebt = Math.max(0, (parseFloat(worker.RemainingDebt) || 0) - paidAmt);
                 worker.TotalPaid = (parseFloat(worker.TotalPaid) || 0) + paidAmt;
                 saveToLocal(StorageKeys.WORKERS, allWorkers);
             }

             closeModal('payment-modal');
             fetchWorkers();
             fetchProfitLossData();
             renderDashboardUI();

             scriptRunHelper('addWorkerPayment', [payload], (result) => {
                 if (result.success) {
                      allPayments = allPayments.filter(p => p.PaymentID !== tempPayment.PaymentID);
                      allPayments.unshift({ ...result.payment, Date: result.payment.PaymentDate });
                      saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
                      // تحديث البيانات النهائية من السيرفر لضمان الدقة التراكمية
                      scriptRunHelper('getWorkers', [{showInactive: true}], (srvData) => { allWorkers = srvData; saveToLocal(StorageKeys.WORKERS, allWorkers); fetchWorkers(); });
                      scriptRunHelper('getDashboardData', [], (d) => { dashboardStats = d; saveToLocal(StorageKeys.STATS, d); renderDashboardUI(); });
                      fetchProfitLossData();
                 }
             }, `تم تسجيل دفعة أجر للعامل ${data.targetName}.`);
        }

        function fetchTransportPayments() {
            const year = document.getElementById('transport-filter-year').value;
            const month = document.getElementById('transport-filter-month').value;
            
            // تصفية محلية فورية من المصفوفة الشاملة المخزنة عند تسجيل الدخول
            let filtered = allTransportPayments.filter(p => {
                const d = new Date(p.Date || p.PaymentDate);
                const matchesYear = !year || d.getFullYear().toString() === year;
                const matchesMonth = !month || (d.getMonth() + 1).toString() === month;
                return matchesYear && matchesMonth;
            });
            
            const totalPaid = filtered.reduce((sum, p) => sum + parseFloat(p.PaidAmount || 0), 0);
            renderTransportSummaryStats({ totalPaid });
            renderTransportTable(filtered);
        }
        
        function renderTransportSummaryStats(summary) {
             const container = document.getElementById('transport-summary-stats');
             container.innerHTML = `
                  ${renderStatCard('إجمالي مصاريف النقل (المفلترة)', formatNumber(summary.totalPaid), 'purple')}
             `;
        }

        function renderTransportTable(payments) {
             const tbody = document.getElementById('transport-table-body');
             if (!payments || payments.length === 0) {
                  tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500 border border-gray-300">لا توجد دفعات نقل مسجلة في هذه الفترة.</td></tr>';
                  return;
             }
             
             const rows = payments.map(p => `
                 <tr class="hover:bg-gray-50">
                     ${wrapCellContent(formatDateDMY(p.Date))}
                     ${wrapCellContent(`<span class="font-medium text-gray-900">${p.DriverName}</span>`)}
                     ${wrapCellContent(`<span class="font-bold text-gray-600">${formatNumber(p.PaidAmount)} DH</span>`)}
                     ${wrapCellContent(p.Notes || '-')} 
                     <td class="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse border border-gray-300">
                        <button onclick="editTransportForm('${p.PaymentID}')" class="text-blue-600 hover:text-blue-800 transition duration-150">تعديل</button>
                        <button onclick="deleteTransportPayment('${p.PaymentID}')" class="text-red-600 hover:text-red-800 transition duration-150"><i class="fas fa-trash"></i> حذف</button>
                     </td>
                 </tr>
             `).join('');
             tbody.innerHTML = rows;
        }

        function resetTransportFormForNew() {
            document.getElementById('transport-form-title').textContent = 'نموذج تسجيل دفعة نقل';
            document.getElementById('transport-submit-button').textContent = 'حفظ الدفعة';
            document.getElementById('TransportID_Hidden').value = '';
            document.getElementById('add-transport-form').reset();
            document.getElementById('TransportDate').value = new Date().toISOString().split('T')[0];
        }

        function editTransportForm(paymentId) {
            const payment = allTransportPayments.find(p => p.PaymentID === paymentId);
            if (!payment) return;

            document.getElementById('transport-form-title').textContent = 'تعديل دفعة نقل';
            document.getElementById('transport-submit-button').textContent = 'تحديث';
            document.getElementById('TransportID_Hidden').value = paymentId;
            document.getElementById('TransportDate').value = payment.Date || payment.PaymentDate;
            document.getElementById('DriverName').value = payment.DriverName;
            document.getElementById('TransportPaidAmount').value = payment.PaidAmount;
            document.getElementById('TransportNotes').value = payment.Notes || '';

            document.getElementById('transport-form').classList.remove('hidden');
        }

        function handleTransportSubmit(event) {
            event.preventDefault();
            
            if (operationInProgress) {
                showAlert('جاري معالجة العملية السابقة...', 'info');
                return;
            }
            
            const paymentId = document.getElementById('TransportID_Hidden').value;
            const isEdit = paymentId !== '';
            
            const data = {
                DriverName: document.getElementById('DriverName').value,
                PaidAmount: document.getElementById('TransportPaidAmount').value,
                Notes: document.getElementById('TransportNotes').value,
                Date: document.getElementById('TransportDate').value
            };
            
            // تحديث محلي فوري (Optimistic Update)
            const tempId = isEdit ? paymentId : 'temp_' + Date.now();
            const optimisticPayment = { ...data, PaymentID: tempId };
            
            updateLocalDataAndSync(StorageKeys.TRANSPORT, allTransportPayments, optimisticPayment, 'PaymentID');
            
            hideForm('transport-form');
            fetchTransportPayments();
            renderDashboardUI();
            fetchProfitLossData();
            showAlert(isEdit ? 'جاري تحديث دفعة النقل...' : 'جاري حفظ دفعة النقل...', 'info');

            const action = isEdit ? 'editTransportPayment' : 'addTransportPayment';
            const args = isEdit ? [paymentId, data] : [data];

            scriptRunHelper(action, args, (result) => {
                if (result.success) {
                    if (!isEdit) {
                        allTransportPayments = allTransportPayments.filter(p => p.PaymentID !== tempId);
                    }
                    updateLocalDataAndSync(StorageKeys.TRANSPORT, allTransportPayments, result.payment, 'PaymentID');
                    fetchTransportPayments();
                    fetchProfitLossData();
                }
            }, isEdit ? 'تم تحديث دفعة النقل بنجاح.' : 'تم تسجيل دفعة النقل بنجاح.');
        }

        function viewShopMonthlySummary(shopId) {
             // 100% Local calculation for instant display
             const shop = allShops.find(s => s.ShopID == shopId);
             if (!shop) return;
            
             const payments = allPayments.filter(p => p.Category === 'إيجار محل' && p.ShopID == shopId);
             const now = new Date();
             const summary = [];
             
             // Show last 12 months for historical context
             for (let i = 0; i < 12; i++) {
                 const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                 const year = d.getFullYear();
                 const month = d.getMonth() + 1;
                 
                 const monthlyPaid = payments
                     .filter(p => {
                         const pd = new Date(p.PaymentDate || p.Date);
                         return pd.getFullYear() === year && (pd.getMonth() + 1) === month;
                     })
                     .reduce((sum, p) => sum + parseFloat(p.PaidAmount || 0), 0);

                 const due = parseFloat(shop.MonthlyRent || 0);
                 summary.push({
                     MonthName: MONTHS[month - 1],
                     Year: year,
                     Due: due,
                     Paid: monthlyPaid,
                     RemainingDebt: Math.max(0, due - monthlyPaid),
                     IsCurrentMonth: i === 0,
                     Status: monthlyPaid >= due ? 'Paid' : (monthlyPaid > 0 ? 'Partial' : 'Unpaid')
                 });
             }

             renderShopMonthlySummary({
                 success: true,
                 name: shop.ShopName,
                 rent: shop.MonthlyRent,
                 summary: summary
             });

             // Background sync
             scriptRunHelper('getShopMonthlySummary', [shopId, {}], (result) => {
                 if (result.success) renderShopMonthlySummary(result);
             });
        }

        function fetchShopPayments() { fetchShops(); }

        function fetchShops() { 
             const query = document.getElementById('shop-search').value.toLowerCase().trim();
             const year = document.getElementById('shop-filter-year').value;
             const month = document.getElementById('shop-filter-month').value;

             const filtered = allShops.filter(s => !query || s.ShopName.toLowerCase().includes(query));
             renderShopsTable(filtered);
             
             scriptRunHelper('getShops', [{year, month}], (data) => {
                 if (data && !data.error) {
                     allShops = data; 
                     saveToLocal(StorageKeys.SHOPS, data); 
                     renderShopsTable(data.filter(s => !query || s.ShopName.toLowerCase().includes(query)));
                 }
             });
        }
        
        function renderShopsTable(shops) {
            const tbody = document.getElementById('shops-table-body');
             if (shops.length === 0) {
                 tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500 border border-gray-300">لا يوجد محلات مسجلة.</td></tr>';
                 return;
             }
            
            const rows = shops.map(shop => {
                // التحقق مما إذا كان الإيجار مدفوعاً لهذا الشهر
                const isPaid = shop.IsPaidUpForCycle === true || shop.IsPaidUpForCycle === 'TRUE';
                // إظهار المبلغ المتبقي لهذا الشهر أو 0 إذا تم السداد
                const currentMonthDebt = isPaid ? 0 : parseFloat(shop.CurrentMonthDue || shop.MonthlyRent || 0);
                const debtClass = currentMonthDebt > 0.01 ? 'text-red-600 font-bold' : 'text-green-600';
                
                const buttonDisabled = isPaid; 
                const buttonText = buttonDisabled ? 'مدفوع' : 'تسجيل إيجار';
                const buttonClass = buttonDisabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'text-amber-600 hover:text-amber-800';

                return `
                    <tr class="hover:bg-gray-50">
                        ${wrapCellContent(`<span class="font-medium text-gray-900">${shop.ShopName}</span>`)}
                        ${wrapCellContent(formatNumber(shop.MonthlyRent) + ' DH')}
                        <td class="px-4 py-2 whitespace-nowrap text-sm border border-gray-300 ${debtClass}">${formatNumber(currentMonthDebt)} DH</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse border border-gray-300">
                            <button ${buttonDisabled ? 'disabled' : ''} onclick="openPaymentModal('shop', '${shop.ShopID}', '${shop.ShopName}', ${currentMonthDebt}, ${currentMonthDebt})" class="${buttonClass} transition duration-150">${buttonText}</button>
                            <button onclick="editShopForm('${shop.ShopID}')" class="text-blue-600 hover:text-blue-800 transition duration-150">تعديل</button>
                        </td>
                    </tr>
                `;
            }).join('');
            tbody.innerHTML = rows;
        }

        function fetchUsers() {
            // Affichage initial depuis le cache local pour la rapidité
            renderUsersTable(allUsers);
            
            // Synchronisation avec le serveur
            scriptRunHelper('getUsers', [], (data) => {
                if (Array.isArray(data)) {
                    allUsers = data;
                    saveToLocal(StorageKeys.USERS, allUsers);
                    renderUsersTable(allUsers);
                }
            });
        }

        function renderUsersTable(users) {
            const tbody = document.getElementById('users-table-body');
            if (!users || users.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500 border border-gray-300">لا يوجد مستخدمون مسجلون.</td></tr>';
                return;
            }

            tbody.innerHTML = users.map(user => `
                <tr class="hover:bg-gray-50">
                    ${wrapCellContent(user.username)}
                    ${wrapCellContent(user.email || '-')}
                    <td class="px-4 py-2 whitespace-nowrap text-sm border border-gray-300">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">
                            ${user.role === 'admin' ? 'مسؤول' : 'مستخدم'}
                        </span>
                    </td>
                    <td class="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse border border-gray-300">
                        <button onclick="editUserForm('${user.username}')" class="text-blue-600 hover:text-blue-800">تعديل</button>
                        <button onclick="deleteUser('${user.username}')" class="text-red-600 hover:text-red-800">حذف</button>
                    </td>
                </tr>
            `).join('');
        }

        function resetUserFormForNew() {
            document.getElementById('user-form-title').textContent = 'نموذج إضافة مستخدم';
            document.getElementById('EditUsername_Hidden').value = '';
            document.getElementById('add-user-form').reset();
            document.getElementById('User_Password').required = true;
        }

        function handleUserSubmit(event) {
            event.preventDefault();
            const originalUsername = document.getElementById('EditUsername_Hidden').value;
            const isEdit = originalUsername !== '';
            
            const data = {
                username: document.getElementById('User_Username').value,
                password: document.getElementById('User_Password').value,
                role: document.getElementById('User_Role').value,
                email: document.getElementById('User_Email').value
            };

            // --- Mise à jour optimiste ---
            const optimisticUser = { 
                username: data.username, 
                role: data.role, 
                email: data.email 
            };
            
            // Si on change le nom d'utilisateur, on supprime l'ancien record localement
            if (isEdit && originalUsername !== data.username) {
                allUsers = allUsers.filter(u => u.username !== originalUsername);
            }
            
            updateLocalDataAndSync(StorageKeys.USERS, allUsers, optimisticUser, 'username');
            renderUsersTable(allUsers);
            hideForm('user-form');
            showAlert('جاري حفظ بيانات المستخدم...', 'info');

            const action = isEdit ? 'editUser' : 'addUser';
            const args = isEdit ? [originalUsername, data] : [data];

            scriptRunHelper(action, args, (result) => {
                if (result.success) {
                    fetchUsers(); // Rafraîchir pour confirmer les données serveur
                }
            }, isEdit ? 'تم تحديث بيانات المستخدم.' : 'تم إضافة المستخدم الجديد بنجاح.');
        }

        function editUserForm(username) {
            const user = allUsers.find(u => u.username === username);
            if (!user) return;
            
            document.getElementById('user-form-title').textContent = 'تعديل مستخدم: ' + username;
            document.getElementById('EditUsername_Hidden').value = user.username;
            document.getElementById('User_Username').value = user.username;
            document.getElementById('User_Password').value = ''; 
            document.getElementById('User_Password').required = false;
            document.getElementById('User_Role').value = user.role;
            document.getElementById('User_Email').value = user.email || '';
            
            document.getElementById('user-form').classList.remove('hidden');
        }

        function deleteUser(username) {
            showCustomConfirm('حذف مستخدم', `هل أنت متأكد من حذف المستخدم "${username}"؟`, () => {
                // Suppression optimiste immédiate
                removeFromLocalAndSync(StorageKeys.USERS, allUsers, username, 'username');
                renderUsersTable(allUsers);
                showAlert('جاري حذف المستخدم...', 'info');

                scriptRunHelper('deleteUser', [username], (result) => {
                    if (!result.success) {
                        fetchUsers(); // Rollback en cas d'échec
                    }
                });
            }, 'delete');
        }

        function resetShopFormForNew() {
             document.getElementById('shop-form-title').textContent = 'نموذج إضافة محل';
             document.getElementById('shop-submit-button').textContent = 'حفظ المحل';
             document.getElementById('ShopID_Hidden').value = '';
             document.getElementById('add-shop-form').reset();
        }
        
        function fillShopFormForEdit(shopData) {
             document.getElementById('shop-form-title').textContent = `تعديل بيانات المحل: ${shopData.ShopName}`;
             document.getElementById('shop-submit-button').textContent = 'تحديث البيانات';
             document.getElementById('ShopID_Hidden').value = shopData.ShopID;
             
             document.getElementById('ShopName').value = shopData.ShopName;
             document.getElementById('MonthlyRent').value = parseFloat(shopData.MonthlyRent);
             document.getElementById('ShopContact').value = shopData.Contact;
        }

        function editShopForm(shopId) {
            const shop = allShops.find(s => s.ShopID === shopId);
            if (!shop) {
                showAlert('لم يتم العثور على المحل للتعديل.', 'error');
                return;
            }
            fillShopFormForEdit(shop);
            document.getElementById('shop-form').classList.remove('hidden');
        }

        function handleShopSubmit(event) {
            event.preventDefault();
            
            if (operationInProgress) {
                showAlert('جاري معالجة العملية السابقة...', 'info');
                return;
            }
            
            operationInProgress = true;
            const submitButton = document.getElementById('shop-submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'جاري الحفظ...';
            submitButton.disabled = true;
            
            const shopId = document.getElementById('ShopID_Hidden').value;
            const isEdit = shopId !== '';
            const data = {
                ShopName: document.getElementById('ShopName').value,
                MonthlyRent: document.getElementById('MonthlyRent').value,
                Contact: document.getElementById('ShopContact').value,
            };

            // تحديث محلي فوري (سرعة قصوى)
            const optimisticShop = { ...data, ShopID: isEdit ? shopId : 'temp_' + Date.now() };
            updateLocalDataAndSync(StorageKeys.SHOPS, allShops, optimisticShop, 'ShopID');
            hideForm('shop-form');
            fetchShops();
            showAlert('جاري حفظ بيانات المحل...', 'info');

            const action = isEdit ? 'editShop' : 'addShop';
            const args = isEdit ? [shopId, data] : [data];

            scriptRunHelper(action, args, (result) => {
                operationInProgress = false;
                if (result.success) {
                    updateLocalDataAndSync(StorageKeys.SHOPS, allShops, result.shop, 'ShopID');
                    fetchShops();
                    fetchProfitLossData();
                }
            }, isEdit ? `تم تحديث بيانات المحل ${data.ShopName} بنجاح.` : `تم إضافة المحل ${data.ShopName} بنجاح.`);
        }
        
        async function viewShopMonthlySummary(shopId) {
             document.getElementById('shop-details-modal').dataset.shopId = shopId;
             
             scriptRunHelper('getShopMonthlySummary', [shopId, {}], (result) => {
                 if (result.success) {
                      renderShopMonthlySummary(result);
                 }
             });
        }
        
        function renderShopMonthlySummary(data) {
             document.getElementById('shop-summary-name').textContent = data.name;
             document.getElementById('shop-summary-rent').innerHTML = formatNumber(data.rent);
             const tbody = document.getElementById('shop-monthly-summary-body');
             tbody.innerHTML = '';
             
             if (data.summary.length === 0) {
                 tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500 border border-gray-300">لا يوجد سجل إيجارات لهذا المحل.</td></tr>';
             } else {
                 data.summary.forEach(item => {
                      const rowStatus = parseFloat(item.RemainingDebt) <= 0.01 ? 'bg-green-100 text-green-800' :
                                             (item.Status === 'Partial' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800');
                      const debtClass = parseFloat(item.RemainingDebt) > 0.01 ? 'text-red-600 font-bold' : 'text-green-600';
                      const currentMonthStyle = item.IsCurrentMonth ? 'border-r-4 border-amber-500' : '';
                      
                      const row = document.createElement('tr');
                      row.className = `hover:bg-gray-50 ${currentMonthStyle}`;
                      row.innerHTML = `
                           <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">${item.MonthName} ${item.Year}</td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">${formatNumber(item.Due)} DH</td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm border border-gray-300">
                                 <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rowStatus}">${formatNumber(item.Paid)} DH</span>
                           </td>
                           <td class="px-4 py-2 whitespace-nowrap text-sm border border-gray-300 ${debtClass}">${formatNumber(item.RemainingDebt)} DH</td>
                         `;
                       tbody.appendChild(row);
                 });
             }
             openModal('shop-details-modal');
        }

        async function addShopPaymentSubmit(data) {
            const payload = {
                ShopID: data.targetId,
                PaidAmount: data.PaidAmount,
                PaymentDate: data.PaymentDate,
                Notes: data.PaymentNotes,
            };
            
            // تحديث متفائل
            const tempPayment = { ...payload, PaymentID: 'temp_' + Date.now(), Category: 'إيجار محل', Date: data.PaymentDate };
            allPayments.unshift(tempPayment);
            saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
            
            // تحديث متفائل للمحل ليظهر كمدفوع فوراً بمبلغ 0 (التزاماً بطلب المستخدم)
            const shop = allShops.find(s => s.ShopID == data.targetId);
            if (shop) {
                shop.IsPaidUpForCycle = 'TRUE';
                shop.CurrentMonthDue = 0;
                saveToLocal(StorageKeys.SHOPS, allShops);
            }

            closeModal('payment-modal');
            fetchShops();
            fetchProfitLossData();
            renderDashboardUI();

            scriptRunHelper('addShopPayment', [payload], (result) => {
                if (result.success) {
                      allPayments = allPayments.filter(p => p.PaymentID !== tempPayment.PaymentID);
                      allPayments.unshift({ ...result.payment, Date: result.payment.PaymentDate });
                      saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
                      scriptRunHelper('getShops', [{}], (data) => { allShops = data; saveToLocal(StorageKeys.SHOPS, data); fetchShops(); });
                      renderDashboardUI();
                  }
              }, `تم تسجيل دفعة إيجار للمحل ${data.targetName}.`);
        }
        
        function fetchElectricityBills() {
            const year = document.getElementById('electricity-filter-year').value;
            
            // 1. الفلترة المحلية الفورية (تظهر النتيجة في أقل من 10ms)
            let filtered = allElectricityBills.filter(b => !year || b.Year.toString() === year);
            renderElectricityTable(filtered);
            renderElectricitySummary(filtered);

            // 2. مزامنة البيانات في الخلفية لتحديث الكاش المحلي
            // نطلب "كل السنوات" لتحديث قاعدة البيانات المحلية بالكامل
            scriptRunHelper('getElectricityBills', [""], (data) => {
                if (Array.isArray(data)) {
                    allElectricityBills = data;
                    saveToLocal(StorageKeys.ELECTRICITY, allElectricityBills);
                    // إعادة عرض البيانات المفلترة فقط إذا لم يغير المستخدم الفلتر أثناء التحميل
                    const currentYear = document.getElementById('electricity-filter-year').value;
                    let refreshed = allElectricityBills.filter(b => !currentYear || b.Year.toString() === currentYear);
                    renderElectricityTable(refreshed);
                    renderElectricitySummary(refreshed);
                }
            }); 
        }

        function renderElectricityTable(bills) {
            const tbody = document.getElementById('electricity-table-body');
            
            if (bills.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500 border border-gray-300">لا توجد فواتير كهرباء مسجلة.</td></tr>';
                return;
            }

            const rows = bills.map(bill => {
                const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
                const monthName = monthNames[parseInt(bill.Month) - 1];
                
                return `
                    <tr class="hover:bg-gray-50 electricity-bill">
                        ${wrapCellContent(`${monthName} ${bill.Year}`)}
                        ${wrapCellContent(bill.Location || 'الرئيسي')}
                        ${wrapCellContent(`<span class="font-bold text-red-600">${formatNumber(bill.Amount)} DH</span>`)}
                        ${wrapCellContent(formatDateDMY(bill.PaymentDate))}
                        ${wrapCellContent(bill.BillNo || '-')}
                        ${wrapCellContent(bill.Notes || '-')}
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse border border-gray-300">
                            <button onclick="editElectricityBill('${bill.ElectricityID}')" class="text-blue-600 hover:text-blue-800 transition duration-150">تعديل</button>
                            <button onclick="deleteElectricityBill('${bill.ElectricityID}')" class="text-red-600 hover:text-red-800 transition duration-150">حذف</button>
                        </td>
                    </tr>
                `;
            }).join('');
            tbody.innerHTML = rows;
        }

        function renderElectricitySummary(bills) {
            const container = document.getElementById('electricity-summary-stats');
            
            const totalThisYear = bills.reduce((sum, bill) => sum + (parseFloat(bill.Amount) || 0), 0);
            const averageMonthly = bills.length > 0 ? totalThisYear / bills.length : 0;
            
            container.innerHTML = `
                ${renderStatCard('إجمالي مصاريف الكهرباء لهذه السنة', formatNumber(totalThisYear), 'red')}
                ${renderStatCard('متوسط المصاريف الشهرية', formatNumber(averageMonthly), 'orange')}
            `;
        }

        function resetElectricityFormForNew() {
            document.getElementById('ElectricityID_Hidden').value = '';
            document.getElementById('add-electricity-form').reset();
            document.getElementById('ElectricityYear').value = new Date().getFullYear();
        }

        function handleElectricitySubmit(event) {
            event.preventDefault();
            
            try {
                const isEdit = document.getElementById('ElectricityID_Hidden').value !== '';
                
                const data = {
                    Month: document.getElementById('ElectricityMonth').value,
                    Year: document.getElementById('ElectricityYear').value,
                    Amount: parseFloat(document.getElementById('ElectricityAmount').value) || 0,
                    PaymentDate: document.getElementById('ElectricityDate').value,
                    BillNo: document.getElementById('ElectricityBillNo').value,
                    Location: document.getElementById('ElectricityLocation').value,
                    Notes: document.getElementById('ElectricityNotes').value,
                };
                
                // تحديث متفائل فوري
                const tempBill = { ...data, ElectricityID: isEdit ? document.getElementById('ElectricityID_Hidden').value : 'temp_' + Date.now() };
                updateLocalDataAndSync(StorageKeys.ELECTRICITY, allElectricityBills, tempBill, 'ElectricityID');
                hideForm('electricity-form');
                fetchElectricityBills();
                renderDashboardUI();
                fetchProfitLossData();

                if (isEdit) {
                    const electricityId = document.getElementById('ElectricityID_Hidden').value;
                    scriptRunHelper('editElectricityBill', [electricityId, data], (result) => {
                        if (result.success) {
                            updateLocalDataAndSync(StorageKeys.ELECTRICITY, allElectricityBills, result.bill, 'ElectricityID');
                            fetchElectricityBills();
                        }
                    }, `تم تحديث فاتورة الكهرباء بنجاح.`);
                } else {
                    scriptRunHelper('addElectricityBill', [data], (result) => {
                        if (result.success) {
                            allElectricityBills = allElectricityBills.filter(b => b.ElectricityID !== tempBill.ElectricityID);
                            updateLocalDataAndSync(StorageKeys.ELECTRICITY, allElectricityBills, result.bill, 'ElectricityID');
                            fetchElectricityBills();
                        }
                    }, 'تم إضافة فاتورة الكهرباء بنجاح.');
                }
            } catch (error) {
                operationInProgress = false;
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showAlert('حدث خطأ أثناء المعالجة', 'error');
            }
        }

        function editElectricityBill(electricityId) {
            const bill = allElectricityBills.find(b => b.ElectricityID === electricityId);
            if (!bill) {
                showAlert('لم يتم العثور على فاتورة الكهرباء للتعديل.', 'error');
                return;
            }
            
            document.getElementById('ElectricityID_Hidden').value = bill.ElectricityID;
            document.getElementById('ElectricityMonth').value = bill.Month;
            document.getElementById('ElectricityYear').value = bill.Year;
            document.getElementById('ElectricityAmount').value = parseFloat(bill.Amount);
            document.getElementById('ElectricityDate').value = bill.PaymentDate;
            document.getElementById('ElectricityBillNo').value = bill.BillNo || '';
            document.getElementById('ElectricityLocation').value = bill.Location || '';
            document.getElementById('ElectricityNotes').value = bill.Notes || '';
            
            document.getElementById('electricity-form').classList.remove('hidden');
        }

        function deleteElectricityBill(electricityId) {
            showCustomConfirm(
                'حذف فاتورة الكهرباء',
                'هل أنت متأكد من حذف فاتورة الكهرباء هذه؟',
                () => {
                    // حذف متفائل فوري
                    allElectricityBills = allElectricityBills.filter(b => b.ElectricityID !== electricityId);
                    saveToLocal(StorageKeys.ELECTRICITY, allElectricityBills);
                    fetchElectricityBills();
                    fetchProfitLossData();

                    scriptRunHelper('deleteElectricityBill', [electricityId], (result) => {
                    });
                },
                'delete'
            );
        }

        // ====================================================================
        // External Workers Logic
        // ====================================================================

        function fetchExternalWorkers() {
            const year = document.getElementById('external-worker-filter-year').value;
            const month = document.getElementById('external-worker-filter-month').value;
            const query = document.getElementById('external-worker-search').value.toLowerCase();

            let filtered = allExternalWorkers.filter(item => {
                const d = new Date(item.Date);
                const matchesYear = !year || d.getFullYear().toString() === year;
                const matchesMonth = !month || (d.getMonth() + 1).toString() === month;
                const matchesName = !query || item.WorkerName.toLowerCase().includes(query);
                return matchesYear && matchesMonth && matchesName;
            });
            renderExternalWorkersTable(filtered);

            // Background
            scriptRunHelper('getExternalWorkers', [{year, month, query}], (data) => { allExternalWorkers = data; saveToLocal(StorageKeys.EXTERNAL, data); renderExternalWorkersTable(data); });
        }

        function renderExternalWorkersTable(data) {
            const tbody = document.getElementById('external-workers-table-body');
            if (!data || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500 border border-gray-300">لا توجد سجلات.</td></tr>';
                return;
            }

            const rows = data.map(item => `
                <tr class="hover:bg-gray-50">
                    ${wrapCellContent(formatDateDMY(item.Date))}
                    ${wrapCellContent(item.WorkerName)}
                    ${wrapCellContent(`<span class="font-bold text-red-600">${formatNumber(item.Amount)} DH</span>`)}
                    ${wrapCellContent(item.Notes || '-')}
                    <td class="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse border border-gray-300">
                        <button onclick="editExternalWorkerForm('${item.PaymentID}')" class="text-blue-600 hover:text-blue-800 transition duration-150">تعديل</button>
                        <button onclick="deleteExternalWorker('${item.PaymentID}')" class="text-red-600 hover:text-red-800 transition duration-150">حذف</button>
                    </td>
                </tr>
            `).join('');
            tbody.innerHTML = rows;
        }

        function resetExternalWorkerFormForNew() {
            document.getElementById('external-worker-form-title').textContent = 'تسجيل مصروف عامل خارجي';
            document.getElementById('external-worker-submit-button').textContent = 'حفظ';
            document.getElementById('ExternalWorkerID_Hidden').value = '';
            document.getElementById('add-external-worker-form').reset();
            document.getElementById('ExternalWorkerDate').value = new Date().toISOString().split('T')[0];
        }

        function editExternalWorkerForm(id) {
            const item = allExternalWorkers.find(x => x.PaymentID === id);
            if (!item) return;

            document.getElementById('external-worker-form-title').textContent = 'تعديل مصروف عامل خارجي';
            document.getElementById('external-worker-submit-button').textContent = 'تحديث';
            document.getElementById('ExternalWorkerID_Hidden').value = item.PaymentID;
            document.getElementById('ExternalWorkerDate').value = item.Date;
            document.getElementById('ExternalWorkerName').value = item.WorkerName;
            document.getElementById('ExternalWorkerAmount').value = item.Amount;
            document.getElementById('ExternalWorkerNotes').value = item.Notes;

            document.getElementById('external-worker-form').classList.remove('hidden');
        }

        function handleExternalWorkerSubmit(event) {
            event.preventDefault();

            const id = document.getElementById('ExternalWorkerID_Hidden').value;
            const data = {
                Date: document.getElementById('ExternalWorkerDate').value,
                WorkerName: document.getElementById('ExternalWorkerName').value,
                Amount: document.getElementById('ExternalWorkerAmount').value,
                Notes: document.getElementById('ExternalWorkerNotes').value
            };

            // تحديث متفائل فوري
            const tempID = id || 'temp_' + Date.now();
            const optimisticItem = { ...data, PaymentID: tempID };
            updateLocalDataAndSync(StorageKeys.EXTERNAL, allExternalWorkers, optimisticItem, 'PaymentID');
            hideForm('external-worker-form');
            fetchExternalWorkers();
            renderDashboardUI();
            fetchProfitLossData();

            const action = id ? 'editExternalWorkerPayment' : 'addExternalWorkerPayment';
            const args = id ? [id, data] : [data];

            scriptRunHelper(action, args, (result) => {
                if (result && result.success) {
                    allExternalWorkers = allExternalWorkers.filter(x => x.PaymentID !== tempID);
                    updateLocalDataAndSync(StorageKeys.EXTERNAL, allExternalWorkers, result.payment, 'PaymentID');
                    fetchExternalWorkers();
                    scriptRunHelper('getDashboardData', [], (d) => { dashboardStats = d; saveToLocal(StorageKeys.STATS, d); renderDashboardUI(); });
                }
            });
        }

        function deleteExternalWorker(id) {
            showCustomConfirm(
                'حذف سجل',
                'هل أنت متأكد من حذف هذا السجل؟',
                () => {
                    // حذف متفائل فوري
                    allExternalWorkers = allExternalWorkers.filter(x => x.PaymentID !== id);
                    saveToLocal(StorageKeys.EXTERNAL, allExternalWorkers);
                    fetchExternalWorkers();
                    fetchProfitLossData();

                    scriptRunHelper('deleteExternalWorkerPayment', [id], (result) => {
                    });
                }, 'delete'
            );
        }

        function openChangePasswordModal() {
            document.getElementById('change-password-form').reset();
            openModal('change-password-modal');
        }

        function handleChangePasswordSubmit(event) {
            event.preventDefault();

            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-new-password').value;

            if (newPassword.length < 8) {
                showAlert('خطأ: يجب أن لا تقل كلمة المرور الجديدة عن 8 أحرف.', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showAlert('خطأ: كلمة المرور الجديدة وتأكيدها غير متطابقتين.', 'error');
                return;
            }

            if (currentPassword === newPassword) {
                showAlert('خطأ: يجب أن تكون كلمة المرور الجديدة مختلفة عن الحالية.', 'error');
                return;
            }

            const savedUser = getFromLocal(StorageKeys.USER);
            const username = savedUser ? savedUser.username : 'admin';

            scriptRunHelper('changeUserPassword', [username, currentPassword, newPassword], (result) => {
                if (result.success) {
                    closeModal('change-password-modal');
                    showAlert(result.message || 'تم تغيير كلمة المرور بنجاح.', 'success');
                    handleLogout();
                }
            }, 'جاري تغيير كلمة المرور...');
        }
        
        function deleteInvoice(invoiceNo) {
            showCustomConfirm(
                'حذف الفاتورة',
                `هل أنت متأكد من حذف الفاتورة رقم ${invoiceNo}؟\n\nتحذير: سيتم حذف جميع الدفعات المسجلة لهذه الفاتورة تلقائياً.`,
                () => {
                // حذف محلي فوري (Optimistic Delete)
                removeFromLocalAndSync(StorageKeys.INVOICES, allInvoices, invoiceNo, 'InvoiceNo');
                fetchInvoices();
                fetchProfitLossData();
                showAlert('جاري حذف الفاتورة ومزامنة البيانات...', 'info');

                scriptRunHelper('deleteInvoice', [invoiceNo], (result) => {
                    if (result.success) {
                        scriptRunHelper('getDashboardData', [], (d) => { dashboardStats = d; saveToLocal(StorageKeys.STATS, d); renderDashboardUI(); });
                    }
                });
                },
                'delete'
            );
        }

        function deleteWorker(workerId) {
            showCustomConfirm(
                'حذف العامل',
                'هل أنت متأكد من حذف هذا العامل؟\n\nسيتم حذف سجل العامل وجميع مدفوعاته.',
                () => {
                    // حذف محلي فوري
                    removeFromLocalAndSync(StorageKeys.WORKERS, allWorkers, workerId, 'WorkerID');
                    allPayments = allPayments.filter(p => !(p.Category === 'راتب عامل' && p.WorkerID === workerId));
                    saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
                    fetchWorkers();
                    fetchProfitLossData();
                    showAlert('جاري حذف العامل وسجله المالي...', 'info');

                    scriptRunHelper('deleteWorker', [workerId], (result) => {
                        if (result.success) {
                            scriptRunHelper('getDashboardData', [], (d) => { dashboardStats = d; saveToLocal(StorageKeys.STATS, d); renderDashboardUI(); });
                        }
                    });
                },
                'delete'
            );
        }

        function deleteTransportPayment(paymentId) {
            showCustomConfirm(
                'حذف دفعة النقل',
                'هل أنت متأكد من حذف دفعة النقل هذه؟',
                () => {
                    // حذف محلي فوري
                    removeFromLocalAndSync(StorageKeys.TRANSPORT, allTransportPayments, paymentId, 'PaymentID');
                    allPayments = allPayments.filter(p => !(p.Category === 'نقل' && p.PaymentID === paymentId));
                    saveToLocal(StorageKeys.ALL_PAYMENTS, allPayments);
                    fetchTransportPayments();
                    fetchProfitLossData();
                    showAlert('جاري حذف السجل المالي...', 'info');

                    scriptRunHelper('deleteTransportPayment', [paymentId], (result) => {
                        if (result.success) {
                            scriptRunHelper('getDashboardData', [], (d) => { dashboardStats = d; saveToLocal(StorageKeys.STATS, d); renderDashboardUI(); });
                        }
                    });
                },
                'delete'
            );
        }

        function openPaymentModal(type, id, name, remainingAmount = null, currentMonthDue = null, isAdvance = false) {
            openModal('payment-modal');
            
            document.getElementById('payment-type').value = type;
            document.getElementById('target-id').value = id;
            document.getElementById('target-name').value = name;
            document.getElementById('PaymentDate').value = new Date().toISOString().split('T')[0];
            document.getElementById('PaymentNotes').value = '';
            
            if (type === 'shop' && currentMonthDue !== null && parseFloat(currentMonthDue) > 0) {
                 document.getElementById('PaidAmount').value = parseFloat(currentMonthDue).toFixed(2);
            } 
            else if (remainingAmount !== null && remainingAmount > 0 && !isAdvance) {
                 document.getElementById('PaidAmount').value = parseFloat(remainingAmount).toFixed(2);
            } else {
                 document.getElementById('PaidAmount').value = '';
            }
            
            let title = '';
            if (type === 'invoice') {
                 title = `تسجيل دفعة للفاتورة #${id} (${name})`;
            } else if (type === 'worker' && isAdvance) {
                 title = `تسجيل تسبيق للعامل: ${name}`;
                 document.getElementById('PaymentNotes').value = 'تسبيق على الراتب';
            }
            else if (type === 'worker') {
                 title = `تسجيل دفعة أجر للعامل: ${name}`;
            } else if (type === 'shop') {
                 title = `تسجيل دفعة إيجار للمحل: ${name} (المستحق حالياً: ${parseFloat(currentMonthDue) > 0 ? formatNumber(currentMonthDue) : 'مدفوع'})`;
            }
            document.getElementById('payment-modal-title').innerHTML = title;
        }

        function handlePaymentSubmit(event) {
            event.preventDefault();
            
            if (operationInProgress) {
                showAlert('جاري معالجة العملية السابقة...', 'info');
                return;
            }
            
            operationInProgress = true;
            const submitButton = event.target.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'جاري التسجيل...';
            submitButton.disabled = true;
            
            try {
                const type = document.getElementById('payment-type').value;
                const targetId = document.getElementById('target-id').value;
                const targetName = document.getElementById('target-name').value;
                const paidAmount = parseFloat(document.getElementById('PaidAmount').value);
                const paymentDate = document.getElementById('PaymentDate').value;
                const paymentNotes = document.getElementById('PaymentNotes').value;

                if (paidAmount <= 0) {
                    showAlert('يجب إدخال مبلغ دفع موجب.', 'error');
                    operationInProgress = false;
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    return;
                }

                const data = {
                    type,
                    targetId,
                    targetName,
                    PaidAmount: paidAmount,
                    PaymentDate: paymentDate,
                    PaymentNotes: paymentNotes,
                    InvoiceNo: targetId,
                    User: 'Admin'
                };

                if (type === 'invoice') {
                    addInvoicePaymentSubmit(data);
                } else if (type === 'worker') {
                    addWorkerPaymentSubmit(data);
                } else if (type === 'shop') {
                    addShopPaymentSubmit(data);
                }
                
                operationInProgress = false;
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
            } catch (error) {
                operationInProgress = false;
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showAlert('حدث خطأ أثناء المعالجة', 'error');
            }
        }
        
        let sidebar = document.getElementById('sidebar');
        let mainContent = document.getElementById('main-content');
        let toggleButton = document.getElementById('sidebar-toggle');

        function openSidebar() {
             sidebar.classList.remove('translate-x-full');
             sidebar.classList.add('translate-x-0');
        }

        function closeSidebar() {
             if (window.innerWidth < 768) {
                 sidebar.classList.remove('translate-x-0');
                 sidebar.classList.add('translate-x-full');
             }
        }

        toggleButton.addEventListener('click', () => {
             if (sidebar.classList.contains('translate-x-full')) {
                 openSidebar();
             } else {
                 closeSidebar();
             }
        });

        mainContent.addEventListener('click', (event) => {
             if (window.innerWidth < 768 && !sidebar.classList.contains('translate-x-full')) {
                 if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
                     closeSidebar();
                 }
             }
        });

        function toggleSidebar() {
             if (sidebar.classList.contains('translate-x-full')) {
                 openSidebar();
             } else {
                 closeSidebar();
             }
        }
        window.toggleSidebar = toggleSidebar;
