const fs = require('fs');

const file = 'step_206_full.json';
if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    console.log(`Step 206 Type: ${data.type}`);
    
    // Check if tool_calls has the replace_file_content or multi_replace_file_content
    if (data.tool_calls) {
        data.tool_calls.forEach((tc, idx) => {
            console.log(`Tool call ${idx}: name=${tc.name}`);
            if (tc.args) {
                console.log('Args keys:', Object.keys(tc.args));
                
                // Let's write the TargetContent or ReplacementChunks to a file so we can read it
                if (tc.args.TargetContent) {
                    fs.writeFileSync('deleted_target_content.txt', tc.args.TargetContent, 'utf8');
                    console.log('Saved TargetContent to deleted_target_content.txt');
                }
                
                if (tc.args.ReplacementChunks) {
                    fs.writeFileSync('deleted_replacement_chunks.txt', JSON.stringify(tc.args.ReplacementChunks, null, 2), 'utf8');
                    console.log('Saved ReplacementChunks to deleted_replacement_chunks.txt');
                }
            }
        });
    }
} else {
    console.log(`${file} not found`);
}
