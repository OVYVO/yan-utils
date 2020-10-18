/*
 * @Author: your name
 * @Date: 2020-09-23 20:41:16
 * @LastEditTime: 2020-10-18 09:41:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \yan-utils\src\deepclone.js
 */
/**
 * @description: 深拷贝
 * @param {array || object}
 * @return {array || object}
 */

const cloneDeep = (target, hash = new WeakMap()) => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  if (hash.has(target)) return hash.get(target);
  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);
  const symKeys = Object.getOwnPropertySymbols(target);
  if (symKeys.length) {
    symKeys.forEach(symKey => {
      if (typeof target[symKey] === 'object' && target[symKey] !== null) {
        cloneTarget[symKey] = cloneDeep(target[symKey]);
      } else {
        cloneTarget[symKey] = target[symKey];
      }
    });
  }
  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      cloneTarget[i] = typeof target[i] === 'object' && target[i] !== null ? cloneDeep(target[i], hash) : target[i];
    }
  }
  return cloneTarget;
};

export default {
  cloneDeep
};