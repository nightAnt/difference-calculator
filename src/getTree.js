import _ from 'lodash';

function isObject(key, obj) {
  return (typeof (obj[key]) === 'object');
}

function getTree(obj1, obj2) {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();

  const result = keys.map((key) => {
    if (isObject(key, obj1) && isObject(key, obj2)) {
      return {
        key,
        value: getTree(obj1[key], obj2[key]),
        status: 'nested',
      };
    }

    if (isObject(key, obj1) && !isObject(key, obj2)) {
      return {
        key,
        value: getTree(obj1[key], {}),
        status: 'nested',
      };
    }

    if (!isObject(key, obj1) && isObject(key, obj2)) {
      return {
        key,
        value: getTree({}, obj2[key]),
        status: 'nested',
      };
    }

    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return {
          key,
          value: obj1[key],
          status: 'unchanged',
        };
      }
      return {
        key,
        valueBefore: obj1[key],
        valueAfter: obj2[key],
        status: 'changed',
      };
    }

    if (!Object.hasOwn(obj1, key)) {
      return {
        key,
        value: obj2[key],
        status: 'added',
      };
    }
    return {
      key,
      value: obj1[key],
      status: 'deleted',
    };
  });

  return result;
}

export default getTree;
