const fs = require('fs');
const path = require('path');

// 1. Search for script backups
console.log('Searching for script.js backups in workspace...');
const files = fs.readdirSync('.');
files.forEach(file => {
    if (file.includes('script') && file !== 'script.js' && file !== 'search_runner.js' && file !== 'search.js') {
        console.log('Found file:', file);
    }
});

// 2. Look in the appData directory logs
const logDir = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\3bb60668-213a-4a77-89b3-918a94870829\\.system_generated\\logs';
if (fs.existsSync(logDir)) {
    console.log('Log directory exists. Reading transcript.jsonl...');
    const logPath = path.join(logDir, 'transcript.jsonl');
    if (fs.existsSync(logPath)) {
        console.log('transcript.jsonl exists. Size:', fs.statSync(logPath).size);
    }
}
