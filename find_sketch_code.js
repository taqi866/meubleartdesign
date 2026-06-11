const fs = require('fs');

if (fs.existsSync('script_reconstructed.js')) {
    const content = fs.readFileSync('script_reconstructed.js', 'utf8');
    
    // We want to find where initSketchCanvas or drawSketch is defined in the transcript steps
    // Since it's a JSON Lines file, we can parse line by line
    const lines = content.split('\n');
    let foundCount = 0;
    
    lines.forEach((line, idx) => {
        if (line.includes('initSketchCanvas') && line.includes('function')) {
            console.log(`Found initSketchCanvas at line ${idx + 1}`);
            // Print a snippet around this line
            const start = Math.max(0, idx - 2);
            const end = Math.min(lines.length, idx + 10);
            for (let i = start; i < end; i++) {
                console.log(`${i+1}: ${lines[i].substring(0, 150)}`);
            }
            foundCount++;
        }
    });
    
    console.log(`Found ${foundCount} matches for initSketchCanvas definition.`);
} else {
    console.log('script_reconstructed.js not found');
}
