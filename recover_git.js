const fs = require('fs');
const { execSync } = require('child_process');

console.log('.git folder exists:', fs.existsSync('.git'));

const possibleGitPaths = [
    'git',
    'C:\\Program Files\\Git\\cmd\\git.exe',
    'C:\\Program Files\\Git\\bin\\git.exe',
    'C:\\Program Files (x86)\\Git\\cmd\\git.exe',
    'C:\\Users\\hp\\AppData\\Local\\Programs\\Git\\cmd\\git.exe',
    'C:\\Users\\hp\\AppData\\Local\\Programs\\Git\\bin\\git.exe'
];

let restored = false;
for (const gitPath of possibleGitPaths) {
    try {
        console.log(`Trying git at: ${gitPath}`);
        const status = execSync(`"${gitPath}" status`, { encoding: 'utf8' });
        console.log('Success! Git output:\n', status.substring(0, 200));
        
        // Restore script.js
        console.log('Restoring script.js...');
        execSync(`"${gitPath}" checkout -- script.js`);
        console.log('Restored successfully!');
        restored = true;
        break;
    } catch (e) {
        console.log(`Failed for ${gitPath}:`, e.message.substring(0, 100));
    }
}

if (!restored) {
    console.log('Could not restore script.js using git.');
}
