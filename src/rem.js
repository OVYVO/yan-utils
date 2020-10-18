/**
 * @description: rem适配，以设计稿750px、字体大小100px为标准
 * @param {Number}
 */
const rem = (size = 750) => {
  if (typeof window === 'undefined') return;

  function adjustScreen() {
    document.documentElement.style.fontSize = Math.min(100, 100 * (document.documentElement.clientWidth / size)) + 'px';
  }
  adjustScreen();
  window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', adjustScreen, false);
};
export default {
  rem,
};