const fs = require('fs');
const path = require('path');
const readline = require('readline');

const brainDir = 'C:\\Users\\hp\\.gemini\\antigravity\\brain';

async function scanFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let count = 0;
    for await (const line of rl) {
        count++;
        try {
            const data = JSON.parse(line);
            if (data.type === 'VIEW_FILE' && data.content && data.content.includes('// ميزات قسم تصميم كروكي') && data.content.length > 50000) {
                console.log(`Found VIEW_FILE in ${filePath} at line ${count}, size: ${data.content.length}`);
                return data.content;
            }
            if (data.tool_calls) {
                for (const tc of data.tool_calls) {
                    if (tc.name === 'write_to_file' && tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('script.js') && tc.args.CodeContent.length > 50000) {
                        console.log(`Found write_to_file in ${filePath} at line ${count}, size: ${tc.args.CodeContent.length}`);
                        return tc.args.CodeContent;
                    }
                }
            }
        } catch (e) {}
    }
    return null;
}

async function main() {
    if (!fs.existsSync(brainDir)) {
        console.log('Brain directory does not exist');
        return;
    }

    const items = fs.readdirSync(brainDir);
    for (const item of items) {
        const itemPath = path.join(brainDir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            const logDir = path.join(itemPath, '.system_generated', 'logs');
            const logFile = path.join(logDir, 'transcript.jsonl');
            if (fs.existsSync(logFile)) {
                console.log('Scanning log file:', logFile);
                const content = await scanFile(logFile);
                if (content) {
                    console.log('Found matching script.js contents!');
                    fs.writeFileSync('script.js.recovered_all', content, 'utf8');
                    console.log('Saved to script.js.recovered_all');
                    return;
                }
            }
        }
    }
    console.log('Finished scanning all logs. No large script.js found.');
}

main();
