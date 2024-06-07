import { Component } from '@angular/core';
import { PointData, ErrorFilter } from './component/chart-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   userFilter: string;
   teamFilter: string;
   errorFilter: string;
   timeRange: any;
   dateFilter: Date;
   includeTestRecords: boolean = false;

   gridTabActive: boolean = true;

   acceptFilter(filters: string[]) {
      this.userFilter = filters[0];
      this.teamFilter = filters[1];
      if (filters[2]) {
         this.dateFilter = new Date(parseInt(filters[2]));
      } else {
         this.dateFilter = null;
      }
      this.includeTestRecords = (filters[3] === "true");
   }

   showDetailedPointData = (point: PointData | ErrorFilter) => {
      this.gridTabActive = true;
      if ((point as PointData).team) {
         this.teamFilter = (point as PointData).team;
         this.dateFilter = (point as PointData).date;
         this.errorFilter = null,
         this.timeRange = null;
      } else {
         let errorFilter: ErrorFilter = point as ErrorFilter;
         let error: string = errorFilter.error;
         // let definedErrors: string[] = ["E_INVALID_CLN", "E_SVS_FAIL", "E_INVALID_PARAM"];
         this.errorFilter = error;
         this.timeRange = {
            start: errorFilter.start,
            end: errorFilter.end
         };
         this.teamFilter = null;
         this.dateFilter = null;
      }

   }
}
