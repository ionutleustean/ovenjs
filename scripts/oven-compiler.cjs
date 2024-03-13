const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../', 'dist'      ) ; // specify your directory path here

function readFilesRecursively(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const fullPath = path.join(dirPath, item);

        if (fs.statSync(fullPath).isDirectory()) {
            readFilesRecursively(fullPath);
        } else {
            if (path.extname(fullPath) === '.js') {
                const data = fs.readFileSync(fullPath, 'utf8');
                let outputData = data + '\n';

                const regex = /selector: '([^']*)'/;
                const match = outputData.match(regex);
                const selectorValue = match ? match[1] : null;

                if (selectorValue) {
                    const renderMethodRegex = /\(\(([^)]+)\)\)/g;
                    outputData = outputData.replace(renderMethodRegex, `window.componentMap.get('${selectorValue}').instance.$1`).replaceAll('.this.', '.');
                }

                outputData = outputData.replace(/import { ([^}]+) } from "([^"]+)";/g, 'import { $1 } from "$2.js";');

                const outputFilePath = path.join(path.dirname(fullPath), `${path.basename(fullPath)}`);
                fs.writeFileSync(outputFilePath, outputData);
            }
        }
    });
}

readFilesRecursively(directoryPath);

