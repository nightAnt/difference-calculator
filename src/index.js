import getTree from 'getTree.js';

const stringify = (data) => { 
    let [replacer, spacesCount] =  [' ', 2];
  
    const iter = (innerData, depth) => { 
      const values = Object.values(innerData); 
  
      if (!_.isObject(innerData)) { 
        return `${innerData}`; 
      };
      
      const result = values.map( value => { 
        const startIndent = replacer.repeat(depth * spacesCount); 
        
        if (value.status === 'changed') {
          return `${startIndent}- ${value.key}: ${iter(value.valueBefore, depth + 1)}\n${startIndent}+ ${value.key}: ${iter(value.valueAfter, depth + 1)}`;
        } else if (value.status === 'added') {
          return `${startIndent}+ ${value.key}: ${iter(value.value, depth + 1)}`; 
        } else if (value.status === 'deleted') {
          return `${startIndent}- ${value.key}: ${iter(value.value, depth + 1)}`; 
        };
        return `${startIndent}  ${value.key}: ${iter(value.value, depth + 1)}`; 
      }); 
  
      const endIndent = replacer.repeat((depth - 1) * spacesCount); 
      const out = ['{', ...result, `${endIndent}}`].join('\n'); 
      return out; 
    }; 
    return iter(data, 1); 
  }; 

  export default stringify;
  