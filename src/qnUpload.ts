/**
 * 七牛上传
 * @param file 文件。
 * @param type 文件类型。
 * @param domain 源地址
 * @param uploadtoken 七牛上传token
 */
import * as qiniu from "qiniu-js";
export const qnUpload = (
  file: any,
  type = "image",
  domain: string,
  uploadtoken: string
) => {
  return new Promise((resolve, reject) => {
    const options = { quality: 0.92, noCompressIfLarger: true };
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z0,
      chunkSize: 100,
      forceDirect: true,
    };
    const putExtra = {
      fname: file.name,
      mimeType: undefined,
    };
    let key = new Date().getTime() + Math.random() * 1000 + file.name;
    const upload = (f: any) => {
      let token = uploadtoken || "";
      let observable = qiniu.upload(f, key, token, putExtra, config);
      observable.subscribe({
        next: () => {},
        error: (err: any) => {
          reject(
            err.message === "invalid token segments."
              ? "上传凭证失败，请重试"
              : "上传失败"
          );
        },
        complete: (res: any) => {
          const resFileObj = {
            file_suffix: f.name.replace(/.+\./, ""),
            real_url: `${domain}/${res.key}`,
            cover_url:
              type == "video" ? `${domain}/${res.key}?vframe/jpg/offset/1` : "",
          };
          resolve(resFileObj);
        },
      });
    };
    if (
      type == "image" &&
      ["jpeg", "jpg", "png"].includes(file.name.replace(/.+\./, ""))
    ) {
      qiniu
        .compressImage(file, options)
        .then((data: any) => {
          const blobToFile = (data: any) =>
            new File([data], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
          upload(data.dist instanceof File ? data.dist : blobToFile(data.dist));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      upload(file);
    }
  });
};
