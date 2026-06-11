const fs = require('fs');
const path = require('path');

function findHistoryFolders(baseDir) {
    if (!fs.existsSync(baseDir)) return;
    
    try {
        const items = fs.readdirSync(baseDir);
        for (const item of items) {
            const fullPath = path.join(baseDir, item);
            try {
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    if (item.toLowerCase() === 'history') {
                        console.log('Found History folder:', fullPath);
                        checkHistoryFolder(fullPath);
                    } else if (item !== 'node_modules' && !item.startsWith('.')) {
                        // Recurse up to depth 4
                        const depth = fullPath.split(path.sep).length;
                        if (depth < 8) {
                            findHistoryFolders(fullPath);
                        }
                    }
                }
            } catch (e) {}
        }
    } catch (e) {}
}

function checkHistoryFolder(dir) {
    try {
        const subdirs = fs.readdirSync(dir);
        for (const subdir of subdirs) {
            const subdirPath = path.join(dir, subdir);
            if (fs.statSync(subdirPath).isDirectory()) {
                const entriesPath = path.join(subdirPath, 'entries.json');
                if (fs.existsSync(entriesPath)) {
                    const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                    if (entries.resource && entries.resource.includes('script.js')) {
                        console.log(`Found script.js in: ${entries.resource}`);
                        const files = fs.readdirSync(subdirPath);
                        for (const file of files) {
                            if (file !== 'entries.json') {
                                const filePath = path.join(subdirPath, file);
                                const stat = fs.statSync(filePath);
                                console.log(`  -> Version: ${filePath}, Date: ${new Date(stat.mtimeMs).toISOString()}, Size: ${stat.size}`);
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {}
}

console.log('Scanning Roaming AppData...');
findHistoryFolders('C:\\Users\\hp\\AppData\\Roaming');

console.log('Scanning Local AppData...');
findHistoryFolders('C:\\Users\\hp\\AppData\\Local');
