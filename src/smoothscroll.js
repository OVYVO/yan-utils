let requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
// 获取当前滚动的高度
const getScrollTop = function () {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
};
// 设置滚动条
const setScrollTop = function (value) {
  window.scrollTo(0, value);
  return value;
};
// 滚动
const smoothScroll = function (to, duration) {
  if (duration < 0) {
    setScrollTop(to);
    return;
  }
  var diff = to - getScrollTop();
  if (diff === 0) return;
  var step = (diff / duration) * 10;
  requestAnimationFrame(function () {
    if (Math.abs(step) > Math.abs(diff)) {
      setScrollTop(getScrollTop() + diff);
      return;
    }
    setScrollTop(getScrollTop() + step);
    if ((diff > 0 && getScrollTop() >= to) || (diff < 0 && getScrollTop() <= to)) {
      return;
    }
    scrollTo(to, duration - 16);
  });
};
export default {
  getScrollTop,
  setScrollTop,
  smoothScroll,
};