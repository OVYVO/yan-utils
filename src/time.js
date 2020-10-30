/**
 * @desc 获取当前日期在本年的天数
 * @params new Date()
 * @return Number
 */
const dayOfYear = function (date = new Date()) {
  return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}

/**
 * @desc 获取当前时间的24小时制字符串
 * @params new Date()
 * @return Number
 */
const getTimeNow = function (date = new Date()) {
  return date.toTimeString().slice(0, 8)
};

/**
 * @desc 获取时间区间的天数
 * @params Array
 * @return Number
 */
const getBetweenDate = function (dateOne, dateTwo) {
  if (!dateOne || !dateTwo) return console.log('请输入正确时间')
  let dateOneTime = new Date(dataOne)
  let dateTwoTime = new Date(dateTwo)
  return Math.floor(
    (Math.max(dateOneTime, dateTwoTime) - Math.min(dateOneTime, dateTwoTime)) / (1000 * 3600 * 24)
  );
};

/**
 * @desc 检查某日期是否在某日期之后
 * @params String,String
 * @return Boolean
 */
const isAfterDate = function (dateOne, dateTwo) {
  if (!dateOne || !dateTwo) return console.log('请输入正确时间')
  return new Date(dateOne) > new Date(dateTwo)
};

/**
 * @desc 检查某日期是否在某日期之前
 * @params String,String
 * @return Boolean
 */
const isBeforeDate = function (dateOne, dateTwo) {
  if (!dateOne || !dateTwo) return console.log('请输入正确时间')
  return new Date(dateOne) < new Date(dateTwo)
};

/**
 * @desc 获取明天的字符串格式时间
 * @params 
 * @return {String}
 */

const getTimeTomorrow = function () {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split('T')[0];
};

export default {
  dayOfYear,
  getTimeNow,
  getTimeTomorrow,
  getBetweenDate,
  isAfterDate,
  isBeforeDate
}