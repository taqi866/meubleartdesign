const fs = require('fs');
const path = require('path');
const readline = require('readline');

async function main() {
    const logPath = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\3bb60668-213a-4a77-89b3-918a94870829\\.system_generated\\logs\\transcript.jsonl';
    if (!fs.existsSync(logPath)) {
        console.log('Log file not found');
        return;
    }
    
    const fileStream = fs.createReadStream(logPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let bestCode = null;
    let maxLen = 0;

    for await (const line of rl) {
        try {
            const data = JSON.parse(line);
            // We search for any string or content that represents a large chunk of script.js
            // Either in the tool call inputs or outputs.
            const str = JSON.stringify(data);
            if (data.type === 'VIEW_FILE' && data.content && data.content.includes('// ميزات قسم تصميم كروكي')) {
                // This is a view file tool output that contains code!
                console.log('Found VIEW_FILE step with script content, len:', data.content.length);
                if (data.content.length > maxLen) {
                    maxLen = data.content.length;
                    bestCode = data.content;
                }
            }
            if (data.tool_calls) {
                for (const tc of data.tool_calls) {
                    if (tc.name === 'write_to_file' && tc.args && tc.args.TargetFile && tc.args.TargetFile.includes('script.js')) {
                        console.log('Found write_to_file call on script.js, len:', tc.args.CodeContent.length);
                        if (tc.args.CodeContent.length > maxLen) {
                            maxLen = tc.args.CodeContent.length;
                            bestCode = tc.args.CodeContent;
                        }
                    }
                }
            }
        } catch(e) {
            // ignore
        }
    }

    if (bestCode) {
        // Clean up line numbers if it's from view_file output
        let cleanCode = bestCode;
        if (cleanCode.includes('Showing lines') || cleanCode.includes('modified to include a line number')) {
            console.log('Cleaning up view_file line numbers...');
            const lines = cleanCode.split('\n');
            const codeLines = [];
            for (let line of lines) {
                const match = line.match(/^\d+:\s?(.*)$/);
                if (match) {
                    codeLines.push(match[1]);
                } else if (!line.startsWith('Showing lines') && !line.startsWith('The following code') && !line.startsWith('File Path:') && !line.startsWith('Total Lines:') && !line.startsWith('Total Bytes:')) {
                    codeLines.push(line);
                }
            }
            cleanCode = codeLines.join('\n');
        }
        
        fs.writeFileSync('recovered_script.js', cleanCode, 'utf8');
        console.log('Successfully wrote recovered_script.js, length:', cleanCode.length);
    } else {
        console.log('Could not find script.js content in logs');
    }
}

main();
