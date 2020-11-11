/**
 * @desc 节流函数 （等待时间以内触发多次只执行一次）
 * @params 
 * @return function
 */
export function throttle(fn, wait) {
  if (typeof fn !== "function") {
    throw new Error("必须传入一个函数作为参数");
  }
  let time = 0
  let timer = null
  return function () {
    let now = Date.now()
    let args = arguments
    if (now - time > wait) {
      fn.apply(this, args)
      time = now
    } else {
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        time = now
      }, wait)
    }
  }
}