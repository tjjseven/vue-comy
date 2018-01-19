/* eslint-disable */
import util from './util'
var tjjPlugin = {}
tjjPlugin.install = function (vue, options) {
  /**
   * @param dateStr YY-mm-dd HH:mm:ss
   */
  vue.filter('timeFormat', function (dateStr) {
    const timeFormatArr = [0, 60, 3600, 86400, 2592000, 946080000, Number.MAX_VALUE]
    const timeUnit = ['刚刚', '分钟前', '小时前', '天前', '月前', '年前']
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
  })

  /**
   *
   */
  vue.prototype.orderBy = function orderBy (arr) {
    var comparator = null
    var sortKeys
    arr = util.convertArray(arr)
    // determine order (last argument)
    var args = util.toArray(arguments, 1)
    var order = args[args.length - 1]
    if (typeof order === 'number') {
      order = order < 0 ? -1 : 1
      args = args.length > 1 ? args.slice(0, -1) : args
    } else {
      order = 1
    }
    // determine sortKeys & comparator
    var firstArg = args[0]
    if (!firstArg) {
      return arr
    } else if (typeof firstArg === 'function') {
      // custom comparator
      comparator = function (a, b) {
        return firstArg(a, b) * order
      }
    } else {
      // string keys. flatten first
      sortKeys = Array.prototype.concat.apply([], args)
      comparator = function (a, b, i) {
        i = i || 0
        return i >= sortKeys.length - 1
          ? baseCompare(a, b, i)
          : baseCompare(a, b, i) || comparator(a, b, i + 1)
      }
    }
    function baseCompare (a, b, sortKeyIndex) {
      var sortKey = sortKeys[sortKeyIndex]
      if (sortKey) {
        if (sortKey !== '$key') {
          if (util.isObject(a) && '$value' in a) a = a.$value
          if (util.isObject(b) && '$value' in b) b = b.$value
        }
        a = util.isObject(a) ? util.getPath(a, sortKey) : a
        b = util.isObject(b) ? util.getPath(b, sortKey) : b
      }
      return a === b ? 0 : a > b ? order : -order
    }
    // sort on a copy to avoid mutating original array
    return arr.slice().sort(comparator)
  }

  /**
   * new Date('2017-12-27T07:38:45.647Z').Format("yyyy年MM月dd日 hh:mm:ss 星期w")
   * @param formatTime
   * @returns {*}
   */
  vue.prototype.format = function (formatTime) {
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
    return new Date(formatTime).Format("yyyy年MM月dd日 hh:mm:ss 星期w")
  }

  /**
   *
   * @type {{telNumberCheck: vue.$service.telNumberCheck}}
   */
  vue.prototype.$service = {
    //电话号码合法性检查
    telNumberCheck: function (tel) {
      var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
      return pattern.test(tel)
    }
  }

  vue.mixin({
    created: function () {
      // console.log("组件开始加载")
    }
  })

}
export default tjjPlugin
