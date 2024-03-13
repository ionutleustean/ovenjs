const fs = require('fs');
const path = require('path');

const directoryPath = '../'; // specify your directory path here
const pathsToSkip = ['../scripts',]; // specify the paths to skip

function deleteFilesRecursively(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const fullPath = path.join(dirPath, item);

        if (fs.statSync(fullPath).isDirectory()) {
            deleteFilesRecursively(fullPath);
        } else {
            if (path.basename(fullPath).startsWith('_$_')) {
                fs.unlinkSync(fullPath);
                console.log(`Deleted file: ${fullPath}`);
            }
        }
    });
}

deleteFilesRecursively(directoryPath);

function readFilesRecursively(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const fullPath = path.join(dirPath, item);

        if (pathsToSkip.includes(fullPath)) {
            return;
        }


        if (fs.statSync(fullPath).isDirectory()) {
            readFilesRecursively(fullPath);
        } else {
            if (fullPath.includes('_$_')) {
                return;
            }
            if (path.extname(fullPath) === '.js') {
                const data = fs.readFileSync(fullPath, 'utf8');
                let outputData = data + '\n';

                const regex = /selector: '([^']*)'/;
                const match = outputData.match(regex);
                const selectorValue = match ? match[1] : null;

                if (selectorValue) {
                    const renderMethodRegex = /\(\(([^)]+)\)\)/g;
                    outputData = outputData.replace(renderMethodRegex, `componentMap.get('${selectorValue}').instance.$1`);
                }

                const outputFilePath = path.join(path.dirname(fullPath), `_$_${path.basename(fullPath)}`);
                fs.writeFileSync(outputFilePath, outputData);
            }
        }
    });
}

readFilesRecursively(directoryPath);

