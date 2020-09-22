/*
 * @Author: yangang
 * @Date: 2020-09-19 18:15:00
 * @LastEditTime: 2020-09-22 22:08:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yan-utils\src\array.js
 */

/**
 * @description: 数组取交集
 * @param {array}
 * @return {array}
 */
const arrayIntersect = function (arr_a, arr_b) {
  const IntersectValues = [...new Set(arr_a)].filter((item) =>
    arr_b.includes(item)
  );
  return IntersectValues;
};

/**
 * @description: 数组取差集
 * @param {array}
 * @return {array}
 */
const arrayDiffer = function (arr_a, arr_b) {
  const differValues = [...new Set([...arr_a, ...arr_b])].filter(item => !arr_b.includes(item) || !arr_a.includes(item))
  return differValues;
}

/**
 * @description: 数组去重
 * @param {array} 
 * @return {array} 
 */
const arrayUnique = function (arr) {
  const uniqueArr = [...new Set(arr)]
  return uniqueArr
}

/**
 * @description: 快速打平数组
 * @param {array} 
 * @return {array} 
 */
const arrayFlat = function (arr) {
  const flatArr = arr.reduce((pre, value) => {
    return Array.isArray(value) ? [...pre, ...flat(value)] : [...pre, value]
  }, [])
  return flatArr
}

/**
 * @description: 随机获取数组项
 * @param {array} 
 * @return {array} 
 */
const arrayRandom = function (arr) {
  const randomArr = arr[(Math.floor(Math.random() * (arr.length)))]
  return randomArr
}

export default {
  arrayIntersect,
  arrayDiffer,
  arrayUnique,
  arrayFlat,
  arrayRandom
};