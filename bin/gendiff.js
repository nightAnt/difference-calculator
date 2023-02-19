#!/usr/bin/env node
import { resolve } from 'path';
import { Command }  from 'commander';
import { readFile, readFileSync } from 'fs';
import _ from 'lodash';
import { getTree } from '../src/getTree.js';
import { genDiff } from '../src/getDiff.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action( (filePath1, filePath2) => {  
    let obj1 = JSON.parse(readFileSync(resolve(filePath1)));
    let obj2 = JSON.parse(readFileSync(resolve(filePath2))); 
    const tree = getTree(obj1, obj2);

    console.log(genDiff(tree));

  });

program.parse();
