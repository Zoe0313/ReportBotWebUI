import { Component } from '@angular/core';
import { PointData, ErrorFilter } from '../component/chart-container.component';
import { FilterSpec } from '../component/filter-spec';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
   filterSpec: FilterSpec = {} as FilterSpec;

   gridTabActive: boolean = true;

   acceptFilter(filterSpec: FilterSpec) {
      this.filterSpec = filterSpec;
   }

   showDetailedPointData = (point: PointData | ErrorFilter) => {
      this.gridTabActive = true;
      if ((point as PointData).team) {
         this.filterSpec = {
            team: (point as PointData).team,
            date: (point as PointData).date,
         } as FilterSpec;
      }
   }
}
