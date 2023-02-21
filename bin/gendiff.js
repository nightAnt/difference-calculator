#!/usr/bin/env node

import { Command } from 'commander';

import _ from 'lodash';
import { getTree } from '../src/getTree.js';
import { genDiff } from '../src/getDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    
    console.log(genDiff(filePath1, filePath2));
  });

  
program.parse();
