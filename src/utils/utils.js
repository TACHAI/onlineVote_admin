import moment from 'moment'

export function datetimeFormat(value) {
  if (!value) return moment().format('YYYY年MM月DD HH:mm:ss')
  return moment(value).format('YYYY年MM月DD HH:mm:ss')
}

export function datetimeFormat2(value) {
  if (!value) return moment().format('YYYY-MM-DD HH:mm:ss')
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
}
