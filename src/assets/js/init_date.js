// 格式化代码
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

  if (index === 0) {
    return timeUnit[0]
  }

  time = time / timeFormatArr[index] | 0
  return time + timeUnit[index]
}
