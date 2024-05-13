/**
 * 计算两个数组的交集。
 * @param arr1 第一个数组。
 * @param arr2 第二个数组。
 * @returns 返回两个数组的交集，不包含重复元素。
 */
function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set1 = new Set(arr1);
  return arr2.filter((item) => set1.has(item));
}
/**
 * 计算两个数组的差集（第一个数组中独有的元素）。
 * @param arr1 第一个数组。
 * @param arr2 第二个数组。
 * @returns 返回`arr1`中存在但`arr2`中不存在的元素组成的数组，不包含重复元素。
 */
function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

/**
 * 移除数组中的重复元素。
 * @param arr 要去重的数组。
 * @returns 返回一个新的数组，包含原数组的所有非重复元素。
 */
function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * 平铺嵌套数组为一维数组。
 * @param nestedArray 嵌套的数组。
 * @returns 返回一个一维数组，其中嵌套数组的所有元素都被展平。
 */
function flatten<T>(nestedArray: T[]): T[] {
  return nestedArray.reduce(
    (acc: T[], item) =>
      Array.isArray(item) ? acc.concat(flatten(item)) : acc.concat(item),
    []
  );
}

export default {
  intersection,
  difference,
  unique,
  flatten,
};
