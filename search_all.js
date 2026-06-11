const fs = require('fs');
const path = require('path');

function searchDir(dir, fileName) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            try {
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    // limit recursion depth
                    if (!file.startsWith('.') && file !== 'node_modules') {
                        searchDir(fullPath, fileName);
                    }
                } else if (file === fileName) {
                    console.log(`Found ${fileName} at: ${fullPath}, Size: ${stat.size}`);
                }
            } catch (e) {}
        }
    } catch (e) {}
}

console.log('Searching in Desktop...');
searchDir('C:\\Users\\hp\\Desktop', 'script.js');

console.log('Searching in AppData Temp...');
searchDir('C:\\Users\\hp\\AppData\\Local\\Temp', 'script.js');

console.log('Searching in Antigravity brain directory...');
searchDir('C:\\Users\\hp\\.gemini\\antigravity\\brain', 'script.js');
