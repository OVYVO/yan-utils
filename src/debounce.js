/**
 * @desc 防抖函数 （等待时间以内多次触发重新计时）
 * @params 等待时间
 * @return function
 */

export function debounce(fn, wait) {
  if (typeof fn !== "function") {
    throw new Error("必须传入一个函数作为参数");
  }
  let timer = null
  return function () {
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}