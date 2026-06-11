const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\hp\\AppData\\Roaming\\Code\\User\\History';

function searchHistory(dir) {
    if (!fs.existsSync(dir)) {
        console.log('VS Code History directory does not exist at:', dir);
        return;
    }
    
    console.log('Searching VS Code history...');
    let found = [];
    
    const subdirs = fs.readdirSync(dir);
    for (const subdir of subdirs) {
        const subdirPath = path.join(dir, subdir);
        try {
            if (fs.statSync(subdirPath).isDirectory()) {
                const files = fs.readdirSync(subdirPath);
                // In VS Code history, there is entries.json and file versions
                const entriesPath = path.join(subdirPath, 'entries.json');
                if (fs.existsSync(entriesPath)) {
                    const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                    if (entries.resource && entries.resource.includes('script.js')) {
                        console.log(`Found resource in subdir ${subdir}: ${entries.resource}`);
                        // Let's list all files in this subdir and find their sizes and dates
                        for (const file of files) {
                            if (file !== 'entries.json') {
                                const filePath = path.join(subdirPath, file);
                                const stat = fs.statSync(filePath);
                                found.push({
                                    path: filePath,
                                    time: stat.mtimeMs,
                                    size: stat.size,
                                    resource: entries.resource
                                });
                            }
                        }
                    }
                }
            }
        } catch (e) {}
    }
    
    // Sort by modification time descending
    found.sort((a, b) => b.time - a.time);
    
    found.forEach(item => {
        console.log(`Version: ${item.path}, Date: ${new Date(item.time).toISOString()}, Size: ${item.size}`);
    });

    if (found.length > 0) {
        console.log(`Copying newest backup (${found[0].path}) to script.js.recovered`);
        fs.copyFileSync(found[0].path, 'script.js.recovered');
        console.log('Restored backup successfully to script.js.recovered!');
    } else {
        console.log('No VS Code history found for script.js');
    }
}

searchHistory(historyDir);
