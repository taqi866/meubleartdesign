const fs = require('fs');
const readline = require('readline');

async function main() {
    const logPath = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\3bb60668-213a-4a77-89b3-918a94870829\\.system_generated\\logs\\transcript.jsonl';
    const fileStream = fs.createReadStream(logPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let count = 0;
    for await (const line of rl) {
        count++;
        try {
            const data = JSON.parse(line);
            if (data.type === 'CODE_ACTION' && data.content && data.content.includes('@@ -2821,597')) {
                console.log(`Found CODE_ACTION at step ${data.step_index}, line ${count}`);
                console.log('Content length:', data.content.length);
                fs.writeFileSync('extracted_diff.txt', data.content, 'utf8');
                console.log('Saved diff content to extracted_diff.txt');
            }
        } catch (e) {}
    }
}

main();
