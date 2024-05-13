interface CacheItem {
  value: any;
  expiredTime: number | null;
}
interface Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}
const localStorageWrapper: Storage = {
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item to localStorage:", error);
    }
  },
  getItem(key) {
    try {
      const itemString = localStorage.getItem(key);
      if (!itemString) {
        return null;
      }
      return itemString;
    } catch (error) {
      console.error("Error getting item from localStorage:", error);
      return null;
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  },
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};
const storageUtils = {
  // 存储数据
  set: (key: string, value: any, expiredTime?: number) => {
    const item: CacheItem = {
      value: value,
      expiredTime: expiredTime ? new Date().getTime() + expiredTime : null,
    };
    const itemString = JSON.stringify(item);
    localStorageWrapper.setItem(key, itemString);
  },
  // 获取数据
  get: (key: string) => {
    const itemString = localStorageWrapper.getItem(key);
    if (!itemString) {
      return null;
    }
    const item: CacheItem = JSON.parse(itemString);
    if (item.expiredTime && new Date().getTime() > item.expiredTime) {
      localStorageWrapper.removeItem(key);
      return null;
    }
    return item.value;
  },
  // 删除数据
  remove: (key: string) => {
    localStorageWrapper.removeItem(key);
  },
  // 清空数据
  clear: () => {
    localStorageWrapper.clear();
  },
};

export const ls = {
  get: storageUtils.get,
  set: storageUtils.set,
  remove: storageUtils.remove,
  clear: storageUtils.clear,
};

// export default {
//   ls,
// };
