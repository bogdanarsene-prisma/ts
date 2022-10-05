console.log('hi.');

const seedrandom = require('seedrandom');
const crypto = require('crypto');

import crc from 'crc';

function random(string: string): number {
  const rng = seedrandom(string);
  const float = rng();
  return float;
}

function hash_sha(string: string) {
  const hex = crypto.createHash('sha256').update(string).digest('hex');
  const int = parseInt(hex, 16);
  const base = 2 ** 256;
  const float = int / base;
  return float;
}

function hash_crc(string: string) {
  const int = crc.crc32(string);
  const base = 2 ** 32;
  const float = int / base;
  return float;
}

function getInt(
  string: string,
  min: number,
  max: number,
  callback: Function
): number {
  const hash = callback(string);
  return Math.round(hash * (max - min) + min);
}

function getSeries(
  string: string,
  length: number,
  min: number,
  max: number,
  callback: Function
): number[] {
  const series: number[] = [];

  while (length > 0) {
    const hash = callback(string);
    const value = Math.round(hash * (max - min) + min);
    series.push(value);
  }

  return series;
}

console.log('==================');
console.log(random('bogdan'));
console.log(random('bogdan1'));
console.log(random('bogdan2'));
console.log('==================');
console.log(hash_sha('bogdan'));
console.log(hash_sha('bogdan1'));
console.log(hash_sha('bogdan2'));
console.log('==================');
console.log(hash_crc('bogdan'));
console.log(hash_crc('bogdan1'));
console.log(hash_crc('bogdan2'));
console.log('==================');
