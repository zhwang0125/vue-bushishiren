import moment from 'moment'

export function fromNow (date) {
  date = new Date(date)
  const between = (Date.now() - (date.getTime())) / 1000
  if (between < 3600) {
    return (~~(between / 60) || 1) + ' 分钟前'
  } else if (between < 86400) {
    return ~~(between / 3600) + ' 小时前'
  } else if (between < 2592000) {
    return ~~(between / 86400) + ' 天前'
  } else {
    return moment(date).format('YYYY-MM-DD hh:mm')
  }
}

export function idToFromNow (id) {
  const date = parseInt(id.substring(0, 8), 16) * 1000
  return fromNow(date)
}

export function idToDay (id) {
  const date = new Date(parseInt(id.substring(0, 8), 16) * 1000)
  return moment(date).format('YYYY-MM-DD')
}