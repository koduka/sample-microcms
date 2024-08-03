import dayjs from 'dayjs'

export function formatDate(date?: Date) {
  if (date) {
    return dayjs(date).format('YYYY年MM月DD日 HH：mm')
  }
}
