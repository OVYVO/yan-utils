/**
 * @desc url参数转对象
 * @params {String}url  default: window.location.href
 * @return {Object} 
 */
const parseQueryString = function (url) {
  url = url == null ? window.location.href : url
  let search = url.substring(url.lastIndexOf('?') + 1)
  if (!search) { return {} }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}
/**
 * @desc 对象转url
 * @params {Object}
 * @return {String} url 
 */
const stringifyQueryString = function (obj) {
  if (!obj) return '';
  let pairs = [];
  for (var key in obj) {
    var value = obj[key];
    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
      }
      continue;
    }
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return pairs.join('&');
}

export default { parseQueryString, stringifyQueryString }