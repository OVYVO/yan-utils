/**
 * 数组取交集
 * @param arr_a：数组a
 * @param arr_b： 数组b
 */
const arrayIntersection = function (arr_a, arr_b)
{
  if (!Array.isArray(arr_a) || !Array.isArray(arr_b))
  {
    return console.error("请确保输入参数为数组类型");
  }
  const IntersectValues = [...new Set(arr_a)].filter((item) =>
    arr_b.includes(item)
  );
  return IntersectValues;
};

export default { arrayIntersection };