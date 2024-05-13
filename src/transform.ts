/**
 * 将一个对象转换成 FormData 格式。
 * @param object 需要转换的对象，该对象的属性可以是简单类型或数组。
 * @returns 返回一个填充好的 FormData 实例。
 * @throws 如果传入的参数不是对象或者为 null，则抛出错误。
 */
function getFormData<T extends { [key: string]: any }>(object: T) {
  if (typeof object !== "object" || object === null) {
    throw new Error("Expected an object as parameter");
  }
  const formData = new FormData();
  Object.entries(object).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => {
        if (subValue !== undefined && subValue !== null) {
          formData.append(key + `[${i}]`, subValue);
        }
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
}

/**
 * 将Blob对象转换为File对象。
 * @param blob Blob对象，表示要转换的数据。
 * @param name 文件名。
 * @param type 可选，文件类型（MIME类型）。如果未提供，则默认为空字符串。
 * @returns 返回创建的File对象，如果输入参数不合法，则返回undefined。
 */
function blobToFile(
  blob: Blob,
  name: string,
  type: string = ""
): File | undefined {
  // 参数校验
  if (!(blob instanceof Blob)) {
    console.error("blob参数必须是Blob类型");
    return undefined;
  }
  if (typeof name !== "string") {
    console.error("name参数必须是字符串");
    return undefined;
  }
  if (typeof type !== "string") {
    console.error("type参数必须是字符串");
    return undefined;
  }
  // 创建File对象
  try {
    return new File([blob], name, { type, lastModified: Date.now() });
  } catch (error) {
    // 捕获并处理可能的错误
    console.error("创建File对象时发生错误:", error);
    return undefined;
  }
}

/**
 * 将阿拉伯数字转为中文数字。
 * @param num 阿拉伯数字。
 * @returns 返回中文数字字符串。
 */
function arabicToChineseNumber(num: number): string {
  if (num < 0) throw new Error("仅支持非负整数");
  const chineseNums = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  const chineseUnits = ["", "十", "百", "千", "万", "亿"];

  function convertPart(numPart: number, unitIndex: number): string {
    let chineseStr = "";
    const digits = numPart.toString().split("").reverse();
    for (let i = 0; i < digits.length; i++) {
      const digit = parseInt(digits[i]);
      if (digit !== 0) {
        // 添加数字，处理连续零的情况
        if (i > 0 && digit === 1 && digits[i - 1] === "0") {
          // 如果当前数字为1且前一位是0（即十、百、千位的1），则跳过“一”的输出
          continue;
        }
        chineseStr =
          chineseNums[digit] +
          (unitIndex > 0 ? chineseUnits[unitIndex] : "") +
          chineseStr;
      } else if (chineseStr && !chineseStr.startsWith("零")) {
        // 避免在结果开头添加多余的“零”
        chineseStr = "零" + chineseStr;
      }
    }
    return chineseStr;
  }

  if (num === 0) return chineseNums[0];

  let result = "";
  const parts = num
    .toString()
    .split(/(?=(?:...)*$)/)
    .reverse(); // 分割数字为“万”、“亿”等单位的部分
  for (let i = 0; i < parts.length; i++) {
    const part = parseInt(parts[i]);
    if (part !== 0 || result) {
      // 避免在结果末尾添加多余的单位
      result =
        convertPart(part, i * 4) + (i > 0 ? chineseUnits[i * 4] : "") + result;
    }
  }

  // 移除结果中不必要的“零”字符
  result = result
    .replace(/^零+/g, "")
    .replace(/零{2,}/g, "零")
    .replace(/零+$/, "");

  return result;
}

export default {
  getFormData,
  blobToFile,
  arabicToChineseNumber,
};
