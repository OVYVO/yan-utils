/**
 * 设置localStorage过期时间
 * @param key{string}
 * @param value{string}
 * @param maxAge{number} 分钟 (默认7天)
 */
const setLocalData = function (key, value, maxAge = 60 * 24 * 7) {
  const data = {
    value,
    maxAge: maxAge * 60000,
    timestamp: Date.now(),
  }
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 获取本地localData
 * @param key{string}
 */
const getLocalData = function (key) {
  try {
    const dataStr = localStorage.getItem(key)
    if (!dataStr) return null
    const { value, maxAge, timestamp } = JSON.parse(dataStr)
    const data = maxAge + timestamp > Date.now() ? value : null
    if (!data) localStorage.removeItem(key) // 超时删除缓存
    return data
  } catch (e) {
    console.error(e)
    localStorage.removeItem(key)
    return null
  }
}
/**
 * 删除本地localData
 * @param key{string}
 */
const clearLocalData = function (key) {
  localStorage.removeItem(key)
}

/**
 * 创建localStorage缓存
 * @param key{string}
 * @param maxAge{number} 分钟 (默认1天)
 */
const createCache = function (key, maxAge = 60 * 24) {
  return {
    get() {
      return getLocalData(key)
    },
    set(data) {
      console.log(`localData存入${key}有效时间：${maxAge}分钟`)
      setLocalData(key, data, maxAge)
    },
    clear() {
      localStorage.removeItem(key)
    },
  }
}

export default {
  get: getLocalData,
  set: setLocalData,
  clear: clearLocalData,
  create: createCache,
}