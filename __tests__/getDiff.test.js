import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/getDiff.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

test('read JSON file', () => {
  const expected = readFile('result-json.txt').trim();
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expected);
});
test('read YML file', () => {
  const expected = readFile('result-json.txt').trim();
  expect(genDiff(getFixturePath('filepath1.yml'), getFixturePath('filepath2.yaml'))).toBe(expected);
});
