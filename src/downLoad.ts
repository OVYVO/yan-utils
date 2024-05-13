/**
 * url形式下载文件
 * @param url 地址。
 * @param fileName 文件名。
 */
export const downloadFileFromUrl = (url: string, fileName: string): void => {
  if (
    !url ||
    typeof url !== "string" ||
    !fileName ||
    typeof fileName !== "string"
  ) {
    console.error("Invalid URL or file name.");
    return;
  }
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => downFileFromBlob(blob, fileName))
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};

/**
 * 下载Blob数据为文件。
 * @param blob Blob数据。
 * @param fileName 文件名。
 */
export const downFileFromBlob = (blob: Blob, fileName: string): void => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a") as HTMLAnchorElement;
  a.style.display = "none";
  document.body.appendChild(a);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url); // 释放URL
  document.body.removeChild(a); // 清理DOM
};

// export default {
//   downloadFileFromUrl,
//   downFileFromBlob,
// };
