import moment from 'moment-timezone'
import schedule from 'node-schedule'

export function FormatDate(date, formatStr='MM/DD/YYYY') {
   if (date == null || date === '') {
      return ''
   }
   try {
      return moment(date).format(formatStr)
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

function ParseDateWithTz(dateStr, tz) {
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

function ConvertTimeWithTz(timeStr, oldTz, curTz) {
   if (timeStr == null) {
      return { time: null, dayOffset: 0 };
   }
   try {
      const todayWithConfigTime = FormatDate(new Date(), 'YYYY-MM-DD') + ' ' + timeStr;
      const dateWithOldTZ = ParseDateWithTz(todayWithConfigTime, oldTz);
      const dateWithNewTZ = FormatDateTime(dateWithOldTZ, curTz);
      const timeWithNewTZ = dateWithNewTZ.split(' ')[1];
      return {
         time: timeWithNewTZ,
         dayOffset: new Date(dateWithNewTZ).getDate() - new Date(todayWithConfigTime).getDate()
      };
   } catch (e) {
      console.error(e);
      return { time: timeStr, dayOffset: 0 };
   }
}

export function DisplayTimeSetting(repeatConfig, tz) {
   console.log('display time setting:', repeatConfig, tz);
   const { time, dayOffset } = ConvertTimeWithTz(repeatConfig.time, repeatConfig.tz, tz);
   switch (repeatConfig.repeatType) {
      case 'not_repeat': {
         const dateStr = FormatDate(repeatConfig.date, 'YYYY-MM-DD');
         const date = ParseDateWithTz(`${dateStr} ${repeatConfig.time}`, repeatConfig.tz);
         return `Not Repeat - ${FormatDateTime(date, tz)}`;
      }
      case 'hourly': {
         return `Hourly - ${repeatConfig.minsOfHour} mins of every hour`;
      }
      case 'daily': {
         return `Daily - ${time} of every day`;
      }
      case 'weekly': {
         const WEEK = {1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 0: 'Sunday'};
         const dayOfWeekStr = repeatConfig.dayOfWeek.map(day => {
            return (day + dayOffset) > 6 ? 0 : ((day + dayOffset) < 0 ? 6 : (day + dayOffset))
         }).map(day => WEEK[day]).join(', ') || 'Empty';
         return `Weekly - ${dayOfWeekStr} - ${time}`;
      }
      case 'monthly': {
         const dayOfMonth = (repeatConfig.dayOfMonth + dayOffset) > 31 ? 1 : ((repeatConfig.dayOfMonth + dayOffset) < 1 ? 31 : (repeatConfig.dayOfMonth + dayOffset));
         return `Monthly - ${dayOfMonth}th of every month - ${time}`;
      }
      case 'cron_expression': {
         return `Cron Expression - ${repeatConfig.cronExpression}`;
      }
      default: {
         return 'Unknown';
      }
   }
}

function ScheduleOption(repeatConfig) {
   let scheduleOption = null;
   let rule = new schedule.RecurrenceRule();

   switch (repeatConfig.repeatType) {
      case 'not_repeat':
         const dateStr = `${repeatConfig.date} ${repeatConfig.time}`;
         const date = ParseDateWithTz(dateStr, repeatConfig.tz);
         scheduleOption = { start: repeatConfig.startDate, end: repeatConfig.endDate, date: date };
         break;
      case 'hourly':
         rule.minute = repeatConfig.minsOfHour;
         scheduleOption = { start: repeatConfig.startDate, end: repeatConfig.endDate, rule: rule };
         break;
      case 'daily':
         rule.hour = repeatConfig.time.split(':')[0];
         rule.minute = repeatConfig.time.split(':')[1];
         scheduleOption = { start: repeatConfig.startDate, end: repeatConfig.endDate, tz: repeatConfig.tz, rule: rule };
         break;
      case 'weekly':
         rule.dayOfWeek = repeatConfig.dayOfWeek;
         rule.hour = repeatConfig.time.split(':')[0];
         rule.minute = repeatConfig.time.split(':')[1];
         scheduleOption = { start: repeatConfig.startDate, end: repeatConfig.endDate, tz: repeatConfig.tz, rule: rule };
         break;
      case 'monthly':
         rule.date = repeatConfig.dayOfMonth;
         rule.hour = repeatConfig.time.split(':')[0];
         rule.minute = repeatConfig.time.split(':')[1];
         scheduleOption = { start: repeatConfig.startDate, end: repeatConfig.endDate, tz: repeatConfig.tz, rule: rule };
         break;
      case 'cron_expression':
         rule = repeatConfig.cronExpression;
         scheduleOption = { start: repeatConfig.startDate, end: repeatConfig.endDate, tz: repeatConfig.tz, rule: rule };
         break;
      default:
         break;
   }
   return scheduleOption
}

export function NextInvocation(repeatConfig) {
   const scheduleOption = ScheduleOption(repeatConfig);
   var job = schedule.scheduleJob(scheduleOption, ()=>{
      console.log('Running job');
   });
   let nextInvocationTime = null;
   if (job != null) {
      nextInvocationTime = job.nextInvocation();
   }
   const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
   return nextInvocationTime ? FormatDateTime(new Date(nextInvocationTime), tz) : 'No longer executed';
}
