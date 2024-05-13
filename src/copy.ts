/**
 * 复制文本到剪贴板，兼容性写法。
 * @param text 要复制的文本。
 * @returns 若复制成功则返回`true`，否则返回`false`。
 */
export const copyToClipboardCompatible = async (
  text: string
): Promise<boolean> => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // 尝试使用 Clipboard API
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("使用 Clipboard API 复制文本时出错:", err);
    }
  } else {
    // 回退到使用 document.execCommand('copy')
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px"; // 隐藏textarea
    document.body.appendChild(textArea);
    textArea.select();
    try {
      const isSuccess = document.execCommand("copy");
      document.body.removeChild(textArea);
      return isSuccess;
    } catch (err) {
      console.error("使用 document.execCommand('copy') 复制文本时出错:", err);
      document.body.removeChild(textArea);
    }
  }
  return false; // 如果以上方法都失败
};

// export default {
//   copyToClipboardCompatible,
// };
