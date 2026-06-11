const fs = require('fs');
const path = require('path');

function listDirRecursive(dir) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            try {
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    console.log(`[DIR] ${fullPath}`);
                    listDirRecursive(fullPath);
                } else {
                    console.log(`[FILE] ${fullPath}, Size: ${stat.size}`);
                }
            } catch (e) {}
        }
    } catch (e) {}
}

const target = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\3bb60668-213a-4a77-89b3-918a94870829\\.system_generated';
console.log('Listing recursively:', target);
listDirRecursive(target);
