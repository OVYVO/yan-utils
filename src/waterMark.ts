interface WaterMarkParams {
  text: string[];
  total?: number;
  marginTop?: number;
  rotate?: number;
  fontSize?: string;
  color?: string;
  opacity?: number;
}

let observer: MutationObserver | null = null;

export const createWaterMark = (params: WaterMarkParams): void => {
  if (!params.text.length) return;
  if (!params.total) return;
  if (document.querySelector("#waterMark")) return;
  const waterMarkDiv = document.createElement("div");
  waterMarkDiv.id = "waterMark";
  document.body.appendChild(waterMarkDiv);
  const wrapNum = 15;
  let top = -90;
  const text = params.text.join("\n");
  const wrapFn = (index: number, type: "left" | "top"): string => {
    const multiple = Math.floor(index / wrapNum);
    if (type === "left") {
      return `${(index - multiple * wrapNum) * 200 - 100}px`;
    }
    if (type === "top") {
      return `${top + (params.marginTop || 150) * multiple}px`;
    }
    return "";
  };
  for (let i = 0; i < params.total ?? 50; i++) {
    const span = document.createElement("span");
    span.style.position = "fixed";
    span.style.zIndex = "999999";
    span.style.lineHeight = "28px";
    span.style.textAlign = "center";
    span.style.whiteSpace = "nowrap";
    span.style.padding = "100px";
    span.style.transform = `rotate(${params.rotate ?? -30}deg)`;
    span.style.fontSize = params.fontSize ?? "14px";
    span.style.pointerEvents = "none";
    span.style.color = params.color ?? "#0f0";
    span.style.left = wrapFn(i, "left");
    span.style.top = wrapFn(i, "top");
    span.style.opacity = String(params.opacity) ?? 0.5;
    span.innerText = text;
    waterMarkDiv.appendChild(span);
  }
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation: any) => {
      if (
        mutation.type === "attributes" &&
        mutation.target.id === "waterMark"
      ) {
        clearWaterMark();
        createWaterMark({ ...params });
      }
      if (
        mutation.type === "childList" &&
        mutation.removedNodes.some((node: any) => node.id === "waterMark")
      ) {
        clearWaterMark();
        createWaterMark({ ...params });
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true,
    attributeOldValue: false,
    characterData: false,
    characterDataOldValue: false,
  });
};
export const clearWaterMark = (): void => {
  if (observer) {
    observer.disconnect();
  }
  const waterMarkDom: any = document.querySelector("#waterMark");
  if (waterMarkDom) {
    waterMarkDom.parentNode.removeChild(waterMarkDom);
  }
};
