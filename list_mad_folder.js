const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\hp\\Desktop\\MAD\\meuble-art-design';
if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    console.log(`Files in ${dir}:`);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        console.log(`  - ${file}, Size: ${stat.size}, isDir: ${stat.isDirectory()}`);
    });
} else {
    console.log('Folder does not exist');
}
