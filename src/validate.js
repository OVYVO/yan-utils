/*
 * @Author: yangang
 * @Date: 2020-09-22 21:47:35
 * @LastEditTime: 2020-09-22 22:07:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yan-utils\src\validate.js
 */

/**
 * @description: 
 * @param {type} 
 * @return {type} 
 */
const isPhone = function (str) {
    const regResult = /^(0|86|17951)?1[3456789]\d{9}$/.test(str)
    return regResult
}

export default {
    isPhone
}