export interface QueryContext {
   user: string,
   team: string,
   branch: string,
   date: number,
   start: number,
   length: number,
   sort: string,
   order: string,
   includeTestRecords: boolean,
   startTime: number,
   endTime: number,
}