const fs = require('fs');
const path = require('path');

function searchDir(dir) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            try {
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    if (!file.startsWith('.') && file !== 'node_modules') {
                        searchDir(fullPath);
                    }
                } else {
                    const lower = file.toLowerCase();
                    if (lower.includes('script') && lower.endsWith('.js') || lower.endsWith('.bak') || lower.includes('recovered')) {
                        console.log(`Found file: ${fullPath}, Size: ${stat.size}`);
                    }
                }
            } catch (e) {}
        }
    } catch (e) {}
}

console.log('Searching in project directory...');
searchDir('.');

console.log('Searching in Desktop...');
searchDir('C:\\Users\\hp\\Desktop');
