import {Component, EventEmitter, Input, Output} from "@angular/core";
import { FilterSpec } from "./filter-spec";

@Component({
   selector: "user-filter",
   templateUrl: "./user-filter.html",
   styleUrls: ["user-filter.scss"]
})
export class UserFilter {
   username: string;
   includeTestRecords: boolean = false;
   team: string;
   branch: string;

   @Output()
   userFilterChange: EventEmitter<FilterSpec> = new EventEmitter<FilterSpec>();

   _userFilter: string;

   @Input()
   set userFilter(val: string) {
      this._userFilter = val;
   }

   get userFilter() {
      return this._userFilter;
   }

   private _dateFilter: Date;
   @Input()
   set dateFilter(val: Date) {
      this._dateFilter = val;
   }

   get dateFilter() {
      return this._dateFilter;
   }

   _teamFilter: string;
   @Input()
   set teamFilter(val: string) {
      this._teamFilter = val;
   }

   get teamFilter(): string {
      return this._teamFilter;
   }

   _branchFilter: string;
   @Input()
   set branchFilter(val: string) {
      this._branchFilter = val;
   }

   get branchFilter(): string {
      return this._branchFilter;
   }

   filterChange = () => {
      const filterSpec: FilterSpec = {
         user: this.username,
         team: this.team,
         branch: this.branch,
         date: this.dateFilter,
         includeTestRecords: this.includeTestRecords,
      } as FilterSpec;
      this.userFilterChange.emit(filterSpec);
   }

   dropFilter = (user: string, team: string, branch: string, date: Date) => {
      const filterSpec: FilterSpec = {
         user: user,
         team: team,
         branch: branch,
         date: date,
         includeTestRecords: this.includeTestRecords,
      } as FilterSpec;
      this.userFilterChange.emit(filterSpec);
   }
}