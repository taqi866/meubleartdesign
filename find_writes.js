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

    let bestContent = null;
    let maxLen = 0;

    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            if (data.tool_calls) {
                for (const tc of data.tool_calls) {
                    if (tc.name === 'write_to_file' && tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('script.js')) {
                        const len = tc.args.CodeContent.length;
                        console.log(`Found write_to_file in ${filePath}, size: ${len}`);
                        if (len > maxLen) {
                            maxLen = len;
                            bestContent = tc.args.CodeContent;
                        }
                    }
                }
            }
        } catch (e) {}
    }
    return { bestContent, maxLen };
}

async function main() {
    const items = fs.readdirSync(brainDir);
    let absoluteBest = null;
    let absoluteMax = 0;
    
    for (const item of items) {
        const itemPath = path.join(brainDir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            const logFile = path.join(itemPath, '.system_generated', 'logs', 'transcript.jsonl');
            if (fs.existsSync(logFile)) {
                const { bestContent, maxLen } = await scanFile(logFile);
                if (maxLen > absoluteMax) {
                    absoluteMax = maxLen;
                    absoluteBest = bestContent;
                }
            }
        }
    }
    
    if (absoluteBest) {
        console.log(`\nFound absolute best file content of size: ${absoluteMax}`);
        fs.writeFileSync('script.js.recovered_absolute', absoluteBest, 'utf8');
        console.log('Saved to script.js.recovered_absolute');
    } else {
        console.log('\nNo write_to_file on script.js found in any logs.');
    }
}

main();
