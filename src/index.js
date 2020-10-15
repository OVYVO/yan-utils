import array from './array';
import deepclone from './deepclone';
import object from './object';
import copy from './copy';
import rem from './rem';
import validate from './validate';
import smoothscroll from './smoothscroll';
import numTransform from './numTransform'

export default { ...array, ...deepclone, ...object, ...copy, ...rem, ...validate, ...smoothscroll, ...numTransform };
