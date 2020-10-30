/**
 * @description: 判断对象是否为空
 * @param {object}
 * @return {object}
 */

const isEmptyObject = function (obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  } else {
    return !Object.keys(obj).length;
  }
};

export default {
  isEmptyObject,
};