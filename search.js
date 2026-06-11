const fs = require('fs');
const content = fs.readFileSync('script.js', 'utf8');
const lines = content.split('\n');

function search(query) {
    console.log(`\n=== Search results for: ${query} ===`);
    lines.forEach((line, idx) => {
        if (line.includes(query)) {
            console.log(`${idx + 1}: ${line.trim()}`);
        }
    });
}

console.log(JSON.stringify(lines.slice(868, 903), null, 2));
