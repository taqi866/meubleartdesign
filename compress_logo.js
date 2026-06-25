const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, 'logo.png');
if (!fs.existsSync(logoPath)) {
    console.error("Error: logo.png not found");
    process.exit(1);
}

const fileBuffer = fs.readFileSync(logoPath);
const base64Data = fileBuffer.toString('base64');
const dataUrl = `data:image/png;base64,${base64Data}`;

fs.writeFileSync(path.join(__dirname, 'logo_base64.txt'), dataUrl);
console.log("Success! Base64 logo size:", dataUrl.length, "bytes");
