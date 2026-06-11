const fs = require('fs');

const steps = [62, 154, 204, 205, 206];
steps.forEach(step => {
    const file = `step_${step}_full.json`;
    if (fs.existsSync(file)) {
        console.log(`\n=== Searching in ${file} ===`);
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('initSketchCanvas')) {
            console.log(`Found initSketchCanvas in ${file}!`);
            const data = JSON.parse(content);
            if (data.tool_calls) {
                data.tool_calls.forEach(tc => {
                    if (JSON.stringify(tc.args).includes('initSketchCanvas')) {
                        console.log(`Found in tool call: ${tc.name}`);
                        fs.writeFileSync(`extracted_step_${step}_code.txt`, JSON.stringify(tc.args, null, 2), 'utf8');
                        console.log(`Saved to extracted_step_${step}_code.txt`);
                    }
                });
            }
        } else {
            console.log(`initSketchCanvas NOT found in ${file}`);
        }
    }
});
