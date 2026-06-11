const fs = require('fs');

if (fs.existsSync('script.js')) {
    let content = fs.readFileSync('script.js', 'utf8');

    // 1. Restore external worker functions
    const targetString = `        function resetExternalWorkerFormForNew() {
            document.getElementById('external-worker-form-title').textContent = 'تسجيل مصروف عامل خارجي';
            document.getElementById('external-worker-submit-button').textContent = 'حفظ';
            document.getElementById('ExternalWorkerID_Hidden').value = '';
            document.getElementById('add-external-worker-form').reset();
            document.getElementById('ExternalWorkerDate').value = new Date().toISOString().split('T')[0];
        }

            scriptRunHelper(action, args, (result) => {
                if (result && result.success) {
                    allExternalWorkers = allExternalWorkers.filter(x => x.PaymentID !== tempID);
                    updateLocalDataAndSync(StorageKeys.EXTERNAL, allExternalWorkers, result.payment, 'PaymentID');
                    fetchExternalWorkers();
                    scriptRunHelper('getDashboardData', [], (d) => { dashboardStats = d; saveToLocal(StorageKeys.STATS, d); renderDashboardUI(); });
                }
            });
        }`;

    const replacementString = `        function resetExternalWorkerFormForNew() {
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
        }`;

    const hasString = content.includes(targetString);
    console.log(`Has target string: ${hasString}`);
    if (hasString) {
        content = content.replace(targetString, replacementString);
        console.log('Replaced external worker functions');
    } else {
        // Try with CRLF normalization just in case
        const normalizedTarget = targetString.replace(/\r?\n/g, '\r\n');
        const normalizedReplacement = replacementString.replace(/\r?\n/g, '\r\n');
        const normalizedContent = content.replace(/\r?\n/g, '\r\n');
        if (normalizedContent.includes(normalizedTarget)) {
            content = normalizedContent.replace(normalizedTarget, normalizedReplacement);
            console.log('Replaced external worker functions (normalized CRLF)');
        }
    }

    // 2. Remove openPaymentModal_OLD
    const oldModalString = `        function openPaymentModal_OLD(type, id, name, remainingAmount = null, currentMonthDue = null, isAdvance = false) {
            openModal('payment-modal');
            
            document.getElementById('payment-type').value = type;
            document.getElementById('target-id').value = id;
            document.getElementById('target-name').value = name;
            document.getElementById('PaymentDate').value = new Date().toISOString().split('T')[0];
            document.getElementById('PaymentNotes').value = '';
            
    ctx.closePath();
}`;

    if (content.includes(oldModalString)) {
        content = content.replace(oldModalString, '');
        console.log('Removed openPaymentModal_OLD');
    } else {
        const normalizedOldModal = oldModalString.replace(/\r?\n/g, '\r\n');
        const normalizedContent = content.replace(/\r?\n/g, '\r\n');
        if (normalizedContent.includes(normalizedOldModal)) {
            content = normalizedContent.replace(normalizedOldModal, '');
            console.log('Removed openPaymentModal_OLD (normalized CRLF)');
        }
    }

    fs.writeFileSync('script.js', content, 'utf8');
} else {
    console.log('script.js not found');
}
