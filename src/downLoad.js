/**
 * @description: 文件下载
 * @param {String} href
 * @param {String} name
 */
const download = function (href, name) {
  const a = document.createElement("a");
  a.download = name;
  a.style.display = "none";
  a.href = href;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * @description: 下载blob对象
 * @param {Blob} blob
 * @param {String} name
 */
const downloadBlob = function (blob, name) {
  const href = URL.createObjectURL(blob);
  download(href, name);
}

/**
 * @description: 下载文字
 * @param {String} str
 * @param {String} name
 */
const downloadStr = function (str, name = `${Date.now()}.txt`) {
  const blob = new Blob([str]);
  downloadBlob(blob, name);
}

/**
 * @description: 下载图片
 * @param {String} src
 * @param {String} name
 */
const downloadImage = function (src, name = `${Date.now()}.png`) {
  const image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = src;
  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(image, 0, 0, image.width, image.height);
      const href = canvas.toDataURL("image/png");
      download(href, name);
    }
  };
}

export default {
  download,
  downloadBlob,
  downloadStr,
  downloadImage
};