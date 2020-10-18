/*
 * @Author: your name
 * @Date: 2020-10-18 09:36:13
 * @LastEditTime: 2020-10-18 09:50:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yan-utils\src\index.js
 * @Sync ID:bf50a5c4f82e7ee98816bcff88e4e385
 */
import array from './array';
import deepclone from './deepclone';
import object from './object';
import copy from './copy';
import rem from './rem';
import validate from './validate';
import smoothScroll from './smoothScroll';
import numTransform from './numTransform'
import downLoad from './downLoad'

export default {
    ...array,
    ...deepclone,
    ...object,
    ...copy,
    ...rem,
    ...validate,
    ...smoothScroll,
    ...numTransform,
    ...downLoad
};