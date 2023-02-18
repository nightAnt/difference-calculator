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
    let ob1 = readFileSync(resolve(filePath1));
    let ob2 = readFileSync(resolve(filePath2)); 
    let ress = [];
    console.log(typeof(ob1));
    Object.entries(ob1).forEach(([key, value]) => {
      console.log(key, value);
    });
    for (let [key, value] of Object.entries(ob1)) {
      if (key in ob2) {
        if (value === ob2[key]) {
          ress.push([' ', key, value]);
        } else {
          ress.push(['-', key, value]); 
          ress.push(['+', key, ob2[key]]);
        };
      } else ress.push(['-', key, value]); 
    };
    for (let [key, value] of Object.entries(ob2)) {
      if (!(key in ob1)) {
        ress.push(['+', key, value]);
      };
    };
    let srt = _.sortBy(ress, (el) => el[1] );
    let result = [];

    srt.forEach(element => {
      result.push(`${element[0]} ${element[1]}: ${element[2]}`);
    });
    const out = ['{', ...result, '}'].join('\n');
    console.log(out);

  });

program.parse();
/*
let [file1, file2] = program.args;
let filePath1 = resolve(file1);
let ob1 = readFileSync(filePath1);
let ob2 = readFileSync('file2');

console.log(JSON.parse(ob1));


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


let ress = [];
for (let [key, value] in Object.entries(ob1)) {
  if (key in ob2) {
    if (value === ob2[key]) {
      ress.push(['', key, value]);
    } else {
      ress.push(['-', key, value]); 
      ress.push(['+', key, value]);
    };
  };
};



*/
