/**
 * @desc 防抖函数 （等待时间以内再次触发重新计时）
 * @params 等待时间
 * @return function
 */

export function debounce(fn, wait) {
  let timer = null
  return function () {
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}