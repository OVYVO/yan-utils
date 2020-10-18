/*
 * @Author: your name
 * @Date: 2020-09-23 20:41:16
 * @LastEditTime: 2020-10-18 09:41:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \yan-utils\src\object.js
 */
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