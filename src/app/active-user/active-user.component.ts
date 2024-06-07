import {Component, OnInit} from '@angular/core';
import {DateRangeData} from "../component/date-range-picker.component";
import {FastSvsRecordsService} from '../service/fastsvs-records.service';

@Component({
   "selector": "active-user",
   "templateUrl": "./active-user.html",
   "styleUrls": ["active-user.scss"]
})
export class ActiveUserComponent implements OnInit {
   loading: boolean;
   results: any[];

   constructor(private service: FastSvsRecordsService) {}

   async ngOnInit() {
      let startTime = new Date();
      startTime.setHours(0);
      startTime.setMinutes(0);
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);
      startTime.setDate(startTime.getDate() - 30);

      const millisecondsOfMonth: number = 30 * 24 * 60 * 60 * 1000;
      const endTime: number = startTime.getTime() + millisecondsOfMonth;

      this.loading = true;
      this.results = await this.service.getActiveUser({
         start: startTime.getTime(),
         end: endTime
      });
      this.loading = false;
   }
}