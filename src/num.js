let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];

const SectionToChinese = function (section) {
  let strIns = '',
    chnStr = '';
  let unitPos = 0;
  let zero = true;
  let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let chnUnitChar = ["", "十", "百", "千"];
  while (section > 0) {
    let v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}
/**
 * @desc 阿拉伯数字转中文
 * @params 
 * @return Number
 */
const NumberToChinese = function (num) {
  let unitPos = 0;
  let strIns = '',
    chnStr = '';
  let needZero = false;

  if (num === 0) {
    return chnNumChar[0];
  }

  while (num > 0) {
    let section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = SectionToChinese(section);
    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = (section < 1000) && (section > 0);
    num = Math.floor(num / 10000);
    unitPos++;
  }
  return chnStr;
}

/**
 * @desc 中文数字转阿拉伯
 * @params 
 * @return Number
 */
const ChineseToNumber = function (chnStr) {
  let chnNumChar = {
    '零': 0,
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6,
    '七': 7,
    '八': 8,
    '九': 9
  };
  let chnNameValue = {
    '十': {
      value: 10,
      secUnit: false
    },
    '百': {
      value: 100,
      secUnit: false
    },
    '千': {
      value: 1000,
      secUnit: false
    },
    '万': {
      value: 10000,
      secUnit: true
    },
    '亿': {
      value: 100000000,
      secUnit: true
    }
  }
  let rtn = 0;
  let section = 0;
  let number = 0;
  let secUnit = false;
  let str = chnStr.split('');

  for (let i = 0; i < str.length; i++) {
    let num = chnNumChar[str[i]];
    if (typeof num !== 'undefined') {
      number = num;
      if (i === str.length - 1) {
        section += number;
      }
    } else {
      let unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if (secUnit) {
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      } else {
        section += (number * unit);
      }
      number = 0;
    }
  }
  return rtn + section;
}

/**
 * @desc 四舍五入到指定位数
 * @params 
 * @return Number
 */
const roundToDigit = function (num, digit) {
  return Number(`${Math.round(`${num}e${digit}`)}e-${digit}`);
}

/**
 * @desc 生成指定范围内的随机整数
 * @params 
 * @return Number
 */
const randomIntegerInRange = function (numOne, numTwo) {
  return Math.floor(Math.random() * (Math.max(numOne, numTwo) - Math.min(numOne, numTwo) + 1)) + Math.min(numOne, numTwo);
}

/**
 * @desc 生成指定范围的随机小数
 * @params 
 * @return Number
 */
const randomFloatInRange = function (numOne, numTwo) {
  return Math.random() * (Math.max(numOne, numTwo) - Math.min(numOne, numTwo)) + Math.min(numOne, numTwo);
}

export default ({
  NumberToChinese,
  ChineseToNumber,
  roundToDigit,
  randomIntegerInRange,
  randomFloatInRange
})