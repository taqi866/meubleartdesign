const fs = require('fs');
const path = require('path');

const base64Path = path.join(__dirname, 'logo_base64.txt');
const indexPath = path.join(__dirname, 'index.html');

if (!fs.existsSync(base64Path) || !fs.existsSync(indexPath)) {
    console.error("Error: logo_base64.txt or index.html not found");
    process.exit(1);
}

const base64Data = fs.readFileSync(base64Path, 'utf8').trim();
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace src="logo.png" with the base64 data url
// We use a regex to replace all instances of src="logo.png" or src="./logo.png"
const updatedContent = indexContent.replace(/src=["']\.\/logo\.png["']/g, `src="${base64Data}"`)
                                     .replace(/src=["']logo\.png["']/g, `src="${base64Data}"`);

fs.writeFileSync(indexPath, updatedContent, 'utf8');
console.log("Success! index.html updated with base64 logo.");
