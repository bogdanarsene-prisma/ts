console.log('hi.');

function isObject(item: any): boolean {
  return typeof item === 'object' && item !== null;
}

export function itemsAreEqual(
  obj1: any,
  obj2: any,
  ignoredFields: string[] = [],
): boolean {
  if (!isObject(obj1)) {
    return obj1 === obj2;
  }
  if (obj1 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }
  for (const [key, value] of Object.entries(obj1)) {
    if (ignoredFields.includes(key)) continue;
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
    if (!itemsAreEqual(value, obj2[key])) {
      return false;
    }
  }
  for (const [key, value] of Object.entries(obj2)) {
    if (ignoredFields.includes(key)) continue;
    if (!obj1.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

console.log(isObject(1));
console.log(isObject('asd'));
console.log(isObject([1, 2]));
console.log(isObject({a: 1}));
console.log(isObject({a: {a: 1}}));
console.log(isObject(new Date('2022-06-15')));

console.log(itemsAreEqual(1, 12));
console.log(itemsAreEqual('asd', 'asd2'));
console.log(itemsAreEqual([1, 2], [1, 3]));
console.log(itemsAreEqual({a: 1}, {a: 2}));
console.log(itemsAreEqual({a: {a: 1}}, {a: {a: 1, b: 2}}));

console.log(itemsAreEqual(new Date('2022-06-15'), new Date('2022-06-14')));
