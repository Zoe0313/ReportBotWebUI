import * as cronParser from 'cron-parser';
import moment from 'moment-timezone';
import schedule from 'node-schedule';

export function FormatDate(date, formatStr='MM/DD/YYYY') {
   if (date == null || date === '') {
      return '';
   }
   if (typeof date === "string") {
      date = new Date(date);
   }
   try {
      return moment(date).format(formatStr);
   } catch (e) {
      console.error(e);
      return '';
   }
}

export function FormatDateTime(date, tz) {
   if (date == null || date === '') {
      return '';
   }
   try {
      // 2021-01-01 08:00 Asia/Shanghai => 2021-01-01 00:00 UTC => 2021-01-01 00:00
      return moment(date).tz(tz || 'Asia/Shanghai').format('YYYY-MM-DD HH:mm')
   } catch (e) {
      console.error(e);
      return '';
   }
}

export function FormatDateWithTz(date, tz) {
   if (date == null || date === '') {
      return '';
   }
   try {
      return moment(date).tz(tz || 'Asia/Shanghai').format('YYYY-MM-DD')
   } catch (e) {
      console.error(e);
      return '';
   }
}

function ParseDateWithTz(dateStr, tz) {
   if (dateStr == null) {
      return null;
   }
   try {
      // 2021-01-01 08:00 => 2021-01-01 08:00 Asia/Shanghai
      return moment.tz(dateStr, tz || 'Asia/Shanghai').toDate()
   } catch (e) {
      console.error(e);
      return null;
   }
}

function GetDayOfThisWeek(date, dayOfWeek) {
   const oneDayTime = 24 * 60 * 60 * 1000
   const nowTime = date.getTime()
   const day = date.getDay()
   const dayOfWeekTime = nowTime - (day - dayOfWeek) * oneDayTime
   return new Date(dayOfWeekTime)
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

export function DeepCopy(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = DeepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = DeepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export function GetNannyRoster(repeatConfig, assignees) {
   const tz = repeatConfig.tz;
   const result = [];
   if (repeatConfig.repeatType === 'not_repeat') {
      if (repeatConfig.date == null || repeatConfig.time == null) {
         return;
      }
      const date = ParseDateWithTz(`${repeatConfig.date} ${repeatConfig.time}`, tz);
      result.push({ nanny: assignees[0], start: FormatDateTime(date, tz), end: '??' });
   } else if (repeatConfig.repeatType === 'hourly') {
      const startDate = new Date();
      startDate.setMinutes(0);
      const endDate = new Date();
      endDate.setMinutes(59);
      for (const assignee of assignees) {
         result.push({
            nanny: assignee,
            start: FormatDateTime(startDate, tz),
            end: FormatDateTime(endDate, tz)
         });
         startDate.setHours(startDate.getHours() + 1);
         endDate.setHours(endDate.getHours() + 1);
      }
   } else if (repeatConfig.repeatType === 'daily') {
      const startDate = new Date();
      for (const assignee of assignees) {
         result.push({
            nanny: assignee,
            start: FormatDateWithTz(startDate, tz),
            end: ''
         });
         startDate.setDate(startDate.getDate() + 1);
      }
   } else if (repeatConfig.repeatType === 'weekly') {
      const now = new Date()
      const startDate = GetDayOfThisWeek(now, 1);
      const endDate = GetDayOfThisWeek(now, 7);
      for (const assignee of assignees) {
         result.push({
            nanny: assignee,
            start: FormatDateWithTz(startDate, tz),
            end: FormatDateWithTz(endDate, tz)
         });
         startDate.setDate(startDate.getDate() + 7);
         endDate.setDate(endDate.getDate() + 7);
      }
   } else if (repeatConfig.repeatType === 'monthly') {
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      let endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      for (const assignee of assignees) {
         result.push({
            nanny: assignee,
            start: FormatDateWithTz(startDate, tz),
            end: FormatDateWithTz(endDate, tz)
         });
         startDate.setMonth(startDate.getMonth() + 1);
         endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      }
   } else if (repeatConfig.repeatType === 'cron_expression') {
      if (repeatConfig.cronExpression == null) {
         return;
      }
      const interval = cronParser.parseExpression(repeatConfig.cronExpression);
      let startDate = new Date(interval.prev().toString());
      let endDate = interval.hasNext() ? new Date(interval.next().toString()) : '';
      let i = 0;
      while (interval.hasNext()) {
         result.push({
            nanny: assignees[i],
            start: FormatDateTime(startDate, tz),
            end: FormatDateTime(endDate, tz)
         });
         i += 1;
         if (i >= assignees.length) {
            break;
         }
         const next = interval.next();
         startDate = new Date(endDate);
         endDate = new Date(next.toString());
      }
      if (result.length === 0) {
         result.push({ nanny: assignees[0], start: FormatDateTime(startDate, tz), end: '??' });
      }
   }
   return result;
}
