// import { Units } from 'models/types';

export function enumKeys <E>(enumeration: E): string[] {
  return Object.keys(enumeration).filter(key => typeof enumeration[key] === 'number');
}

export function enumValues <E>(enumeration: E): string[] {
  return Object.keys(enumeration).filter(key => typeof enumeration[key] === 'string');
}

// export function enumValues(u: Units): string[] {
//   const keys = enumKeys(u);
//   return keys.map(u => Units[u as any]);
// }


// export const enumToRecordWithKeys = <E>(enumeration: E): E => (
//   Object.keys(enumeration)
//     .filter(key => typeof enumeration[key] === 'number')
//     .reduce((record, key) => ({...record, [key]: key }), {}) as E
// );
