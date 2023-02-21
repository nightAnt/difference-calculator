import { readFileSync } from 'fs';
import { resolve } from 'path';

export function getParsedObjects(filePath1, filePath2) {
    let currentPath = process.cwd();
    let obj1 = {};
    let obj2 = {};

    if (filePath1.indexOf(currentPath)) {
        obj1 = JSON.parse(readFileSync(resolve(filePath1)));
        obj2 = JSON.parse(readFileSync(resolve(filePath2)));
    } else {
        obj1 = JSON.parse(readFileSync(resolve(currentPath, filePath1)));
        obj2 = JSON.parse(readFileSync(resolve(currentPath, filePath2)));
    };

    return [obj1, obj2];
}
