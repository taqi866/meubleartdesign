const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');

if (!fs.existsSync(indexPath)) {
    console.error("Error: index.html not found");
    process.exit(1);
}

let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace the giant base64 image data URL with "logo.png"
// The base64 data URL starts with data:image/png;base64, and is very long.
const updatedContent = indexContent.replace(/src="data:image\/png;base64,[^"]+"/g, 'src="logo.png"');

fs.writeFileSync(indexPath, updatedContent, 'utf8');
console.log("Success! index.html shrunken by replacing base64 logo with logo.png reference.");
