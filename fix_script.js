const fs = require('fs');

if (fs.existsSync('script.js')) {
    let content = fs.readFileSync('script.js', 'utf8');
    
    // 1. Fix fillInvoiceFormForEdit redundant return; }
    const beforeFill = content.length;
    content = content.replace(
        /document\.getElementById\('Date'\)\.value = invoiceData\.Date;\s*return;\s*\}\s*document\.getElementById\('TotalAmount'\)/,
        "document.getElementById('Date').value = invoiceData.Date;\r\n              document.getElementById('TotalAmount')"
    );
    console.log(`Step 1 (fillInvoiceForm): ${beforeFill !== content.length ? 'Modified' : 'No change'}`);

    // 2. Fix fetchInvoices trailing */
    const beforeSync = content.length;
    content = content.replace(
        /scriptRunHelper\('getInvoiceSummaryByDate',\s*\[filters\],\s*\(summary\)\s*=>\s*\{\s*if\s*\(summary\.success\)\s*\{\s*renderInvoiceSummaryStats\(summary\);\s*\}\s*\}\);\s*\*\//,
        "scriptRunHelper('getInvoiceSummaryByDate', [filters], (summary) => {\r\n                  if (summary.success) {\r\n                      renderInvoiceSummaryStats(summary);\r\n                  }\r\n              });"
    );
    console.log(`Step 2 (fetchInvoices trailing comment): ${beforeSync !== content.length ? 'Modified' : 'No change'}`);

    fs.writeFileSync('script.js', content, 'utf8');
    console.log('script.js fixed successfully!');
} else {
    console.log('script.js not found');
}
