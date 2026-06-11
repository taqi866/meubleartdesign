const fs = require('fs');

const files = ['script.js'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    console.log(`\n=== Matches in ${file} ===`);
    lines.forEach((line, idx) => {
        if (line.includes('window.open')) {
            console.log(`${idx + 1}: ${line.trim()}`);
        }
    });
});
