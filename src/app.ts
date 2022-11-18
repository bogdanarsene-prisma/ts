console.log('hi.');

function isObject(item: any): boolean {
  return typeof item === 'object' && item !== null;
}

export function itemsAreEqual(
  item1: any,
  item2: any,
  ignoredFields: string[] = [],
): boolean {
  if (!isObject(item1)) {
    return item1 == item2;
  }
  if (item1 instanceof Date) {
    return item1.getTime() === item2.getTime();
  }
  for (const [key, value] of Object.entries(item1)) {
    if (ignoredFields.includes(key)) continue;
    if (!item2.hasOwnProperty(key)) {
      return false;
    }
    if (!itemsAreEqual(value, item2[key])) {
      return false;
    }
  }
  for (const [key, value] of Object.entries(item2)) {
    if (ignoredFields.includes(key)) continue;
    if (!item1.hasOwnProperty(key)) {
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
