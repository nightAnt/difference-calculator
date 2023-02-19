import _ from 'lodash';

function getTree(obj1, obj2) {
    let keys = _.union(Object.keys(obj1), Object.keys(obj2));
  
    const result = keys.map(key => {
      
      if (typeof(obj1[key]) === 'object' && typeof(obj2[key]) === 'object' ) {
        return {
          key,
          value: getTree(obj1[key], obj2[key]),
          status: 'nested'
        };
      };
      
      if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
          if (obj1[key] === obj2[key]) {
            return {
              key,
              value: obj1[key],
              status: 'unchanged'
            };
          } else {
              return {
                key,
                valueBefore: obj1[key],
                valueAfter: obj2[key],
                status: 'changed'
              };
          };
      };  
  
      if (!Object.hasOwn(obj1, key)) {
        return {
          key,
          value: obj2[key],
          status: 'added',
        };
      } else {
        return {
          key,
          value: obj1[key],
          status: 'deleted',
        };
      };
  
    });
  
    return result;
  }
  export default getTree;