/* eslint-disable */
const timeFormatArr = [0, 60, 3600, 86400, 2592000, 946080000, Number.MAX_VALUE]
const timeUnit = ['刚刚', '分钟前', '小时前', '天前', '月前', '年前']
/**
 *
 * @param dateStr YY-mm-dd HH:mm:ss
 * @returns {*}
 */
export default function timeFormat (dateStr) {
  let dateTime = new Date(dateStr).getTime()
  let now = new Date().getTime()
  let time = (now - dateTime) / 1000

  let index = timeFormatArr.findIndex((item, index) => {
    return item <= time && timeFormatArr[index + 1] > time
  })

  if (index <= 0) {
    return timeUnit[0]
  }

  time = time / timeFormatArr[index] | 0
  return time + timeUnit[index]
}


/**
 * new Date('2017-12-27T07:38:45.647Z').Format("yyyy年MM月dd日 hh:mm:ss 星期w")
 * @param formatStr
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (formatStr) {
  var str = formatStr;
  var Week = ['日', '一', '二', '三', '四', '五', '六'];
  var timerArr = ['凌晨', '上午', '中午', '下午', '晚上'];
  var hour = this.getHours()
  var fomatHour = ''
  switch(true){
    case hour>=0 && hour<=5:
      fomatHour = timerArr[0]
      break
    case hour>5 && hour<=11:
      fomatHour = timerArr[1]
      break
    case hour>11 && hour<=13:
      fomatHour = timerArr[2]
      break
    case hour>13 && hour<18:
      fomatHour = timerArr[3]
      break
    case hour>=18 && hour<=24:
      fomatHour = timerArr[4]
      break
  }

  str = str.replace(/yyyy|YYYY/, this.getFullYear());

  str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

  var month = this.getMonth() + 1;

  str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);

  str = str.replace(/M/g, month);

  str = str.replace(/w|W/g, Week[this.getDay()]);

  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());

  str = str.replace(/d|D/g, this.getDate());

  str = str.replace(/hh|HH/, this.getHours() > 9 ? fomatHour+this.getHours().toString() : fomatHour+'0' + this.getHours());

  str = str.replace(/h|H/g, fomatHour+this.getHours());

  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());

  str = str.replace(/m/g, this.getMinutes());

  str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());

  str = str.replace(/s|S/g, this.getSeconds());

  return str;
}
