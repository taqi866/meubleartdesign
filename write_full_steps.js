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
            const str = JSON.stringify(data);
            if (str.includes('downloadSketchPDF') && str.length > 3000) {
                console.log(`Step ${data.step_index}: Writing full JSON...`);
                fs.writeFileSync(`step_${data.step_index}_full.json`, JSON.stringify(data, null, 2), 'utf8');
            }
        } catch (e) {}
    }
}

main();
