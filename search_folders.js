const fs = require('fs');
const path = require('path');

function searchForProjectFolder(dir) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            try {
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    const lower = file.toLowerCase();
                    if (lower.includes('meuble') && lower.includes('design') && fullPath !== 'C:\\Users\\hp\\Desktop\\Meuble Art Design') {
                        console.log(`Found matching folder: ${fullPath}`);
                        // check if script.js exists in it and list its size
                        const scriptPath = path.join(fullPath, 'script.js');
                        if (fs.existsSync(scriptPath)) {
                            console.log(`  -> Contains script.js, Size: ${fs.statSync(scriptPath).size}`);
                        }
                    }
                    
                    const depth = fullPath.split(path.sep).length;
                    if (depth < 6 && !file.startsWith('.') && file !== 'node_modules' && file !== 'AppData') {
                        searchForProjectFolder(fullPath);
                    }
                }
            } catch (e) {}
        }
    } catch (e) {}
}

console.log('Searching C:\\Users\\hp for other project folders...');
searchForProjectFolder('C:\\Users\\hp');

console.log('Searching D:\\ for other project folders...');
searchForProjectFolder('D:\\');
