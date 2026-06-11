const fs = require('fs');

if (fs.existsSync('style.css')) {
    const content = fs.readFileSync('style.css', 'utf8');
    const lines = content.split('\n');
    console.log('=== Matches for "sidebar" in style.css ===');
    lines.forEach((line, idx) => {
        if (line.toLowerCase().includes('sidebar')) {
            console.log(`${idx + 1}: ${line.trim()}`);
        }
    });
}
