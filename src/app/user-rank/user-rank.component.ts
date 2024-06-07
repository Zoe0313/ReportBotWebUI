import {Component, OnInit} from '@angular/core';
import {DateRangeData} from "../component/date-range-picker.component";
import {FastSvsRecordsService} from '../service/fastsvs-records.service';

@Component({
   "selector": "user-rank",
   "templateUrl": "./user-rank.html",
   "styleUrls": ["user-rank.scss"]
})
export class UserRankComponent implements OnInit {
   private earlyWeekData: any[];
   private recentWeekData: any[];

   rankData: any[];
   loading: boolean;

   constructor(private service: FastSvsRecordsService) {}

   async ngOnInit() {
      let startTime = new Date();
      startTime.setHours(0);
      startTime.setMinutes(0);
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);
      startTime.setDate(startTime.getDate() - 14);

      const millisecondsOfWeek: number = 7 * 24 * 60 * 60 * 1000;
      const middleTime: number = startTime.getTime() + millisecondsOfWeek;

      this.loading = true;
      let promises: Promise<any>[] = [];
      promises.push(this.service.getUserRecordCount({
         start: startTime.getTime(),
         end: middleTime
      }));
      promises.push(this.service.getUserRecordCount({
         start: middleTime,
         end: middleTime + millisecondsOfWeek
      }));

      [this.earlyWeekData, this.recentWeekData] = await Promise.all(promises);

      let earlyWeekJson: any = this.toFlat(this.earlyWeekData);
      let recentWeekJson: any = this.toFlat(this.recentWeekData);

      this.rankData = this.calculateRank(recentWeekJson, earlyWeekJson, true);
      this.loading = false;
   }

   private toFlat = (data: any[]): any => {
      let result = {};
      data.forEach(record => {
         result[record._id] = record.count;
      });
      return result;
   };

   private calculateRank = (data1: any, data2: any, reverse: boolean): any[] => {
      console.log(data1)
      console.log(data2)
      let result = [];
      Object.keys(data1).forEach(key =>{
         result.push({
            user: key,
            change: data1[key] - (data2[key] || 0)
         });
      });

      result.sort((a, b) => a.change - b.change);
      if (reverse) {
         result.reverse();
      }
      return result;
   };

   getRankLabel = (data: any): string => {
      return `${data.user} (${data.change})`;
   };

   getShape = (change: number): string => {
      if (change >= 0) {
         return "check-circle";
      }
      return "error";
   };
}