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

    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (data.type === 'VIEW_FILE' && data.content && data.content.includes('script.js')) {
                console.log(`Found VIEW_FILE in ${filePath}, content length: ${data.content.length}`);
            }
            if (data.tool_calls) {
                for (const tc of data.tool_calls) {
                    if (tc.name === 'view_file' && tc.args && tc.args.AbsolutePath && tc.args.AbsolutePath.includes('script.js')) {
                        console.log(`Found view_file call in ${filePath}, StartLine: ${tc.args.StartLine}, EndLine: ${tc.args.EndLine}`);
                    }
                    if (tc.name === 'write_to_file' && tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('script.js')) {
                        console.log(`Found write_to_file in ${filePath}, size: ${tc.args.CodeContent.length}`);
                    }
                }
            }
        } catch (e) {}
    }
}

async function main() {
    const items = fs.readdirSync(brainDir);
    for (const item of items) {
        const itemPath = path.join(brainDir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            const logFile = path.join(itemPath, '.system_generated', 'logs', 'transcript.jsonl');
            if (fs.existsSync(logFile)) {
                await scanFile(logFile);
            }
        }
    }
}

main();
