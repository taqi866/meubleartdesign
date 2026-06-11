const fs = require('fs');
const path = require('path');
const readline = require('readline');

const brainDir = 'C:\\Users\\hp\\.gemini\\antigravity\\brain';
const recoveredLines = []; // 1-indexed array of lines

function addLine(lineNum, content) {
    if (!recoveredLines[lineNum] || (recoveredLines[lineNum].length < content.length)) {
        recoveredLines[lineNum] = content;
    }
}

async function processLogFile(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            
            // Check for VIEW_FILE step
            if (data.type === 'VIEW_FILE' && data.content && (data.content.includes('script.js') || data.content.includes('// ميزات قسم تصميم كروكي') || data.content.includes('function showSketchElementControls'))) {
                parseViewFileContent(data.content);
            }
            
            // Check for code edits or tool outputs
            if (data.tool_calls) {
                for (const tc of data.tool_calls) {
                    if (tc.name === 'view_file' && tc.args && tc.args.AbsolutePath && tc.args.AbsolutePath.includes('script.js')) {
                        // This tool call was made, check if we can find its output in a subsequent step
                    }
                }
            }
        } catch (e) {}
    }
}

function parseViewFileContent(content) {
    const lines = content.split('\n');
    for (let line of lines) {
        // Match line number format: "2965: // ميزات قسم تصميم كروكي التفاعلي"
        const match = line.match(/^(\d+):\s?(.*)$/);
        if (match) {
            const lineNum = parseInt(match[1]);
            const code = match[2];
            addLine(lineNum, code);
        }
    }
}

async function main() {
    const items = fs.readdirSync(brainDir);
    for (const item of items) {
        const itemPath = path.join(brainDir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            const logFile = path.join(itemPath, '.system_generated', 'logs', 'transcript.jsonl');
            if (fs.existsSync(logFile)) {
                await processLogFile(logFile);
            }
        }
    }

    // Now check which lines are recovered
    let totalLines = 4500;
    let recoveredCount = 0;
    let missingRanges = [];
    let inMissingRange = false;
    let rangeStart = 1;

    for (let i = 1; i <= totalLines; i++) {
        if (recoveredLines[i] !== undefined) {
            recoveredCount++;
            if (inMissingRange) {
                missingRanges.push([rangeStart, i - 1]);
                inMissingRange = false;
            }
        } else {
            if (!inMissingRange) {
                rangeStart = i;
                inMissingRange = true;
            }
        }
    }
    if (inMissingRange) {
        missingRanges.push([rangeStart, totalLines]);
    }

    console.log(`Reconstruction stats:`);
    console.log(`- Total lines target: ${totalLines}`);
    console.log(`- Recovered lines: ${recoveredCount}`);
    console.log(`- Missing ranges:`, JSON.stringify(missingRanges));

    // Save recovered lines to file
    const outputCode = [];
    for (let i = 1; i <= totalLines; i++) {
        outputCode.push(recoveredLines[i] || `// MISSING LINE ${i}`);
    }
    fs.writeFileSync('script_reconstructed.js', outputCode.join('\n'), 'utf8');
    console.log('Saved partial reconstruction to script_reconstructed.js');
}

main();
