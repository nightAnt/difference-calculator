import { readFileSync } from 'fs';
import { resolve } from 'path';
import { load } from 'js-yaml';

function getParsedObjects(filePath1, filePath2) {
  let obj1 = {};
  let obj2 = {};

  if (filePath1.match(/.json$/) && filePath2.match(/.json$/)) {
    obj1 = JSON.parse(readFileSync(resolve(filePath1)));
    obj2 = JSON.parse(readFileSync(resolve(filePath2)));
  }

  if ((filePath1.match(/.yml$|.yaml$/) && filePath2.match(/.yml$|.yaml$/))) {
    obj1 = load(readFileSync(resolve(filePath1)));
    obj2 = load(readFileSync(resolve(filePath2)));
  }

  return [obj1, obj2];
}
export default getParsedObjects;
