import _ from 'lodash';

export function genDiff(data) { 
    let [replacer, spacesCount] =  [' ', 2];
  
    const iter = (innerData, depth) => { 
      
      if (!_.isObject(innerData)) { 
        return `${innerData}`; 
      };

      const values = Object.values(innerData); 

      const result = values.map( value => { 
        const startIndent = replacer.repeat(depth * spacesCount); 
        
        if (value.status === 'changed') {
          return `${startIndent}- ${value.key}: ${iter(value.valueBefore, depth + 2)}\n${startIndent}+ ${value.key}: ${iter(value.valueAfter, depth + 1)}`;
        } else if (value.status === 'added') {
          return `${startIndent}+ ${value.key}: ${iter(value.value, depth + 2)}`; 
        } else if (value.status === 'deleted') {
          return `${startIndent}- ${value.key}: ${iter(value.value, depth + 2)}`; 
        };
        return `${startIndent}  ${value.key}: ${iter(value.value, depth + 2)}`; 
      }); 
  
      const endIndent = replacer.repeat((depth - 1) * spacesCount); 
      const out = ['{', ...result, `${endIndent}}`].join('\n'); 
      return out; 
    }; 
    return iter(data, 1); 
  }; 
