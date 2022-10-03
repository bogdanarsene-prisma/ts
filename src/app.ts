console.log('hi.');

const seedrandom = require('seedrandom');
const crypto = require('crypto');

const rng = seedrandom('hello.');
console.log(rng()); // Always 0.9282578795792454

function random(min: number, max: number): number {
  return rng() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.round(random(min, max));
}

function hash(string: string) {
  const hex = crypto.createHash('sha256').update(string).digest('hex');
  const int = parseInt(hex, 16);
  const base = 2 ** 256;
  const float = int / base;
  return float;
}

console.log(hash('bogdan'));
