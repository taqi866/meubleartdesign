const fs = require('fs');
const readline = require('readline');

async function scan() {
    const fileStream = fs.createReadStream('C:\\Users\\hp\\.gemini\\antigravity\\brain\\3bb60668-213a-4a77-89b3-918a94870829\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let count = 0;
    for await (const line of rl) {
        count++;
        try {
            const data = JSON.parse(line);
            // check if this step has tool calls or content referencing script.js
            const str = JSON.stringify(data);
            if (str.includes('script.js') && str.length > 5000) {
                console.log(`Line ${count}: Found large match with script.js (length ${str.length})`);
            }
        } catch (e) {
            // ignore
        }
    }
}
scan();
