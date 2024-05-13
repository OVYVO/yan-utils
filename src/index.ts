/*
 * @Author: your name
 * @Date: 2020-10-18 09:36:13
 * @LastEditTime: 2020-10-19 09:42:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yan-utils\src\index.js
 * @Sync ID:55cc23ad57f0dcfd7381f4c56b7588a5
 */
import array from "./array";
import object from "./object";
import rem from "./rem";
import validate from "./validate";
import smoothScroll from "./smoothscroll";
import num from "./num";
import downLoad from "./downLoad";
import localStorage from "./localStorage";
import browser from "./browser";
import time from "./time";

export default {
  ...array,
  ...num,
  ...time,
  ...object,
  ...rem,
  ...validate,
  ...smoothScroll,
  ...downLoad,
  ...localStorage,
  ...browser,
};
