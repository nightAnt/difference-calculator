#!/usr/bin/env node
import { resolve } from 'path';
import { Command }  from 'commander';
import { readFile, readFileSync } from 'fs';
import _ from 'lodash';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action( (filePath1, filePath2) => {  
    let obj1 = JSON.parse(readFileSync(resolve(filePath1)));
    let obj2 = JSON.parse(readFileSync(resolve(filePath2))); 

    let allEntires = [];

    for (let [key, value] of Object.entries(obj1)) {
      if (key in obj2) {
        if (value === obj2[key]) {
          allEntires.push([' ', key, value]);
        } else {
          allEntires.push(['-', key, value]); 
          allEntires.push(['+', key, obj2[key]]);
        };
      } else allEntires.push(['-', key, value]); 
    };

    for (let [key, value] of Object.entries(obj2)) {
      if (!(key in obj1)) {
        allEntires.push(['+', key, value]);
      };
    };

    let sortEntires = _.sortBy(allEntires, (el) => el[1] );
    let result = [];

    sortEntires.forEach(element => {
      result.push(`  ${element[0]} ${element[1]}: ${element[2]}`);
    });
    
    const out = ['{', ...result, '}'].join('\n');
    console.log(out);

  });

program.parse();
/*
let [file1, file2] = program.args;
let filePath1 = resolve(file1);
let obj1 = readFileSync(filePath1);
let obj2 = readFileSync('file2');

console.log(JSON.parse(obj1));


const stringify = (data, replacer = ' ', spacesCount = 1) => { 
  const iter = (innerData, depth) => { 
    if (!_.isObject(innerData)) { 
      return `${innerData}`; 
    } 
    const entries = Object.entries(innerData); 
    const result = entries.map(([key, value]) => { 
      const startIndent = replacer.repeat(depth * spacesCount); 
      return `${startIndent}${key}: ${iter(value, depth + 1)}`; 
    }); 
    const endIndent = replacer.repeat((depth - 1) * spacesCount); 
    const out = ['{', ...result, `${endIndent}}`].join('\n'); 
    return out; 
  }; 
  return iter(data, 1); 
}; 


let allEntires = [];
for (let [key, value] in Object.entries(obj1)) {
  if (key in obj2) {
    if (value === obj2[key]) {
      allEntires.push(['', key, value]);
    } else {
      allEntires.push(['-', key, value]); 
      allEntires.push(['+', key, value]);
    };
  };
};



*/
