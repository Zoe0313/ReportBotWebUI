import moment from 'moment-timezone'

export function FormatDate(date, formatStr) {
   if (date == null || date === '') {
      return ''
   }
   try {
      return moment(date).format(formatStr || 'YYYY-MM-DD')
   } catch (e) {
      console.error(e)
      return ''
   }
}

export function FormatDateTime(date, tz) {
   if (date == null || date === '') {
      return ''
   }
   try {
      // 2021-01-01 08:00 Asia/Shanghai => 2021-01-01 00:00 UTC => 2021-01-01 00:00
      return moment(date).tz(tz || 'Asia/Shanghai').format('YYYY-MM-DD HH:mm')
   } catch (e) {
      console.error(e)
      return ''
   }
}

export function ParseDateWithTz(dateStr, tz) {
   if (dateStr == null) {
      return null
   }
   try {
      // 2021-01-01 08:00 => 2021-01-01 08:00 Asia/Shanghai
      return moment.tz(dateStr, tz || 'Asia/Shanghai').toDate()
   } catch (e) {
      console.error(e)
      return null
   }
}

export function ConvertTimeWithTz(timeStr, oldTz, curTz) {
   if (timeStr == null) {
      return { time: null, dayOffset: 0 }
   }
   try {
      const todayWithConfigTime = FormatDate(new Date(), null) + ' ' + timeStr
      const dateWithOldTZ = ParseDateWithTz(todayWithConfigTime, oldTz)
      const dateWithNewTZ = FormatDateTime(dateWithOldTZ, curTz)
      const timeWithNewTZ = dateWithNewTZ.split(' ')[1]
      return {
         time: timeWithNewTZ,
         dayOffset: new Date(dateWithNewTZ).getDate() - new Date(todayWithConfigTime).getDate()
      }
   } catch (e) {
      console.error(e)
      return { time: timeStr, dayOffset: 0 }
   }
}

export function DisplayTimeSetting(repeatConfig, tz) {
   const { time, dayOffset } = ConvertTimeWithTz(repeatConfig['time'], repeatConfig['tz'], tz)
   switch (repeatConfig['repeatType']) {
      case 'not_repeat': {
         const repeatDate = repeatConfig['date']
         const repeatTime = repeatConfig['time']
         const date = ParseDateWithTz(`${repeatDate} ${repeatTime}`, repeatConfig['tz'])
         return `Not Repeat - ${FormatDateTime(date, tz)}`
      }
      case 'hourly': {
         const minsOfHour = repeatConfig['minsOfHour']
         return `Hourly - ${minsOfHour} mins of every hour`
      }
      case 'daily': {
         return `Daily - ${time} of every day`
      }
      case 'weekly': {
         const WEEK = {
            1: 'Monday', 2: 'Tuesday', 3: 'Wednesday',
            4: 'Thursday', 5: 'Friday', 6: 'Saturday', 0: 'Sunday'
         }
         const dayOfWeekStr = repeatConfig['dayOfWeek'].map(day => {
            return (day + dayOffset) > 6 ? 0 : ((day + dayOffset) < 0 ? 6 : (day + dayOffset))
         }).map(day => WEEK[day]).join(', ')
         return `Weekly - ${dayOfWeekStr} - ${time}`
      }
      case 'monthly': {
         const dayOfMonth = (repeatConfig['dayOfMonth'] + dayOffset) > 31
            ? 1 : ((repeatConfig['dayOfMonth'] + dayOffset) < 1 ? 31 : (repeatConfig.dayOfMonth + dayOffset))
         return `Monthly - ${dayOfMonth}th of every month - ${time}`
      }
      case 'cron_expression': {
         const cronExpression = repeatConfig['cronExpression']
         return `Cron Expression - ${cronExpression}`
      }
      default:
         return 'Unknown'
   }
}
