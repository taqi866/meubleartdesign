const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\hp\\AppData\\Roaming\\Code\\User\\History';
if (fs.existsSync(dir)) {
    const subdirs = fs.readdirSync(dir);
    console.log(`History has ${subdirs.length} subdirectories.`);
    const resources = [];
    for (const subdir of subdirs) {
        const subdirPath = path.join(dir, subdir);
        try {
            if (fs.statSync(subdirPath).isDirectory()) {
                const entriesPath = path.join(subdirPath, 'entries.json');
                if (fs.existsSync(entriesPath)) {
                    const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                    resources.push({ subdir, resource: entries.resource });
                }
            }
        } catch (e) {}
    }
    resources.forEach(r => {
        console.log(`- Subdir: ${r.subdir}, Resource: ${r.resource}`);
    });
} else {
    console.log('Code History does not exist');
}
