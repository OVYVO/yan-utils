/**
 * 解析URL查询字符串。
 * @param url 需要解析的URL字符串。
 * @returns 返回一个对象，对象的键是查询字符串中的键，值是对应的值，如果一个键有多个值，则值是一个数组。
 */
export const parseQueryString = (url: string): Record<string, any> => {
  const query = url.split("?")[1];
  if (!query) return {};
  return query.split("&").reduce((result: Record<string, any>, param) => {
    const [key, value] = param.split("=");
    if (!key) return result;
    if (result.hasOwnProperty(key)) {
      if (Array.isArray(result[key])) {
        result[key].push(decodeURIComponent(value));
      } else {
        result[key] = [result[key], decodeURIComponent(value)];
      }
    } else {
      result[key] = decodeURIComponent(value);
    }
    return result;
  }, {});
};

/**
 * 将对象转换为查询字符串格式。
 * @param obj 要转换的对象，键值对形式。
 * @param prefix 参数前缀，可选，用于为所有参数添加前缀。
 * @returns 转换后的查询字符串。
 */
export const stringifyQueryString = (
  obj: Record<string, unknown>,
  prefix?: string
): string => {
  const result: string[] = [];
  function encodeParam(key: string, value: unknown) {
    if (value === null || value === undefined) return;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      for (const subKey in value) {
        encodeParam(`${key}[${encodeURIComponent(subKey)}]`, value[subKey]);
      }
    } else {
      result.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      );
    }
  }
  for (const key in obj) {
    encodeParam(
      prefix
        ? `${prefix}[${encodeURIComponent(key)}]`
        : encodeURIComponent(key),
      obj[key]
    );
  }
  return result.join("&");
};
