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
                console.log(`Line ${count}: Found step with downloadSketchPDF (length ${str.length})`);
                if (data.content) {
                    fs.writeFileSync(`step_${data.step_index}_download.txt`, data.content, 'utf8');
                    console.log(`Saved content of step ${data.step_index}`);
                }
            }
        } catch (e) {}
    }
}

main();
