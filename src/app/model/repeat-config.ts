export interface RepeatConfig {
   repeatType: string;
   tz: string;
   startDate: string;
   endDate: string;
   cronExpression: string;
   time: string;
   dayOfMonth: number;
   dayOfWeek: number[];
   minsOfHour: number;
}