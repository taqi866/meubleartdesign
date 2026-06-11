const fs = require('fs');

const steps = [62, 154, 204, 205, 206];
steps.forEach(step => {
    const file = `step_${step}_full.json`;
    if (fs.existsSync(file)) {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        console.log(`Step ${step}: type=${data.type}, source=${data.source}`);
        if (data.tool_calls) {
            data.tool_calls.forEach(tc => {
                console.log(`  Tool call: ${tc.name}, Args:`, JSON.stringify(tc.args));
            });
        }
        if (data.content && data.content.length < 500) {
            console.log(`  Content snippet:`, data.content.trim());
        } else if (data.content) {
            console.log(`  Content length:`, data.content.length);
        }
    }
});
