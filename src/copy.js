/*
 * @Author: yangang
 * @Date: 2020-09-22 21:39:09
 * @LastEditTime: 2020-09-22 22:09:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yan-utils\src\copy.js
 */

/**
 * @description: 复制至粘贴板
 * @param {String} 
 * @return {}} 
 */
const copy = (input) => {
  const el = document.createElement('textarea')
  el.value = input
  el.setAttribute('readonly', '')
  el.style.contain = 'strict'
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.fontSize = '12pt'
  const selection = document.getSelection()
  let originalRange = false
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }
  document.body.appendChild(el)
  el.select()
  el.selectionStart = 0
  el.selectionEnd = input.length
  let success = false
  try {
    success = document.execCommand('copy')
  } catch (err) {}
  document.body.removeChild(el)
  if (originalRange) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }
  return success
}
export default {
  copy
}