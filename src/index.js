/*
 * @Author: your name
 * @Date: 2020-10-18 09:36:13
 * @LastEditTime: 2020-10-19 09:42:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yan-utils\src\index.js
 * @Sync ID:55cc23ad57f0dcfd7381f4c56b7588a5
 */
import array from './array';
import deepclone from './deepclone';
import object from './object';
import copy from './copy';
import rem from './rem';
import validate from './validate';
import smoothScroll from './smoothscroll';
import numTransform from './numTransform'
import downLoad from './downLoad'
import localStorage from './localStorage'
import url from './url'

export default {
  ...array,
  ...deepclone,
  ...object,
  ...copy,
  ...rem,
  ...validate,
  ...smoothScroll,
  ...numTransform,
  ...downLoad,
  ...localStorage,
  ...url
};