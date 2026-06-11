const fs = require('fs');
const content = fs.readFileSync('script.js', 'utf8');
const lines = content.split('\n');

let output = '';
function search(query) {
    output += `\n=== Search results for: ${query} ===\n`;
    lines.forEach((line, idx) => {
        if (line.includes(query)) {
            output += `${idx + 1}: ${line.trim()}\n`;
        }
    });
}

search('sketch-element-controls');
search('sketch-element-text-input');
search('sketch-text-edit-container');
search('saveSketchDesign');
search('downloadSketchPDF');
search('closeSketchEditor');

fs.writeFileSync('results.txt', output, 'utf8');
console.log('Done');
