import { readFileSync } from 'fs';
import { resolve } from 'path';

function getParsedObjects(filePath1, filePath2) {
  const currentPath = process.cwd();
  let obj1 = {};
  let obj2 = {};

  if (filePath1.indexOf(currentPath)) {
    obj1 = JSON.parse(readFileSync(resolve(filePath1)));
  } else {
    obj1 = JSON.parse(readFileSync(resolve(currentPath, filePath1)));
  }

  if (filePath2.indexOf(currentPath)) {
    obj2 = JSON.parse(readFileSync(resolve(filePath2)));
  } else {
    obj2 = JSON.parse(readFileSync(resolve(currentPath, filePath2)));
  }
  /*
    obj1 = JSON.parse(readFileSync(resolve(filePath1)));
    obj2 = JSON.parse(readFileSync(resolve(filePath2)));
    */
  return [obj1, obj2];
}
export default getParsedObjects;
