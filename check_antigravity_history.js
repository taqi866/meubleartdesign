const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\hp\\AppData\\Roaming\\Antigravity\\User\\History';
if (fs.existsSync(dir)) {
    const subdirs = fs.readdirSync(dir);
    console.log(`History has ${subdirs.length} subdirectories.`);
    for (const subdir of subdirs) {
        const subdirPath = path.join(dir, subdir);
        try {
            if (fs.statSync(subdirPath).isDirectory()) {
                const entriesPath = path.join(subdirPath, 'entries.json');
                if (fs.existsSync(entriesPath)) {
                    const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                    console.log(`Subdir: ${subdir}, Resource: ${entries.resource}`);
                    const files = fs.readdirSync(subdirPath);
                    files.forEach(f => {
                        if (f !== 'entries.json') {
                            const stat = fs.statSync(path.join(subdirPath, f));
                            console.log(`  File: ${f}, Size: ${stat.size}, Date: ${new Date(stat.mtimeMs).toISOString()}`);
                        }
                    });
                }
            }
        } catch (e) {}
    }
} else {
    console.log('Antigravity History does not exist');
}
