const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\hp\\AppData\\Roaming\\Antigravity\\User\\History';

if (!fs.existsSync(historyDir)) {
    console.log('Antigravity History directory not found at:', historyDir);
    return;
}

const subdirs = fs.readdirSync(historyDir);
console.log(`Scanning ${subdirs.length} subdirectories in Antigravity history...`);

let foundVersions = [];

for (const subdir of subdirs) {
    const subdirPath = path.join(historyDir, subdir);
    try {
        if (fs.statSync(subdirPath).isDirectory()) {
            const entriesPath = path.join(subdirPath, 'entries.json');
            if (fs.existsSync(entriesPath)) {
                const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                if (entries.resource && entries.resource.includes('script.js')) {
                    const files = fs.readdirSync(subdirPath);
                    for (const file of files) {
                        if (file !== 'entries.json') {
                            const filePath = path.join(subdirPath, file);
                            const stat = fs.statSync(filePath);
                            const content = fs.readFileSync(filePath, 'utf8');
                            
                            const hasInit = content.includes('function initSketchCanvas');
                            const hasDraw = content.includes('function drawSketch');
                            
                            foundVersions.push({
                                path: filePath,
                                time: stat.mtimeMs,
                                date: new Date(stat.mtimeMs).toISOString(),
                                size: stat.size,
                                hasInit,
                                hasDraw
                            });
                        }
                    }
                }
            }
        }
    } catch (e) {}
}

// Sort by time descending (newest first)
foundVersions.sort((a, b) => b.time - a.time);

console.log(`Found ${foundVersions.length} versions of script.js in history:`);
foundVersions.forEach(v => {
    console.log(`- Path: ${v.path}, Date: ${v.date}, Size: ${v.size}, hasInit: ${v.hasInit}, hasDraw: ${v.hasDraw}`);
});

// Find the newest version that has both init and draw
const bestVersion = foundVersions.find(v => v.hasInit && v.hasDraw);
if (bestVersion) {
    console.log(`\nFound best version at: ${bestVersion.path} (Size: ${bestVersion.size}, Date: ${bestVersion.date})`);
    fs.copyFileSync(bestVersion.path, 'script.js.recovered_good');
    console.log('Successfully copied to script.js.recovered_good');
} else {
    console.log('\nCould not find a version in history that has both initSketchCanvas and drawSketch.');
}
