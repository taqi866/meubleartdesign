const fs = require('fs');

if (fs.existsSync('script.js')) {
    const content = fs.readFileSync('script.js', 'utf8');
    const lines = content.split('\n');
    const queries = ['addInvoicePayment', 'addWorkerPayment', 'addShopPayment', 'PaymentSubmit', 'handlePaymentSubmit'];
    
    console.log('Searching script.js...');
    queries.forEach(query => {
        console.log(`=== Matches for "${query}" ===`);
        lines.forEach((line, idx) => {
            if (line.includes(query)) {
                console.log(`${idx + 1}: ${line.trim()}`);
            }
        });
    });
} else {
    console.log('script.js not found');
}
