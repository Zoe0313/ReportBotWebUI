import {Component, Input, OnInit} from '@angular/core';
import {FastSvsRecordsService} from '../service/fastsvs-records.service';
import {FastSvsRecord} from "../model/record";
import {ClrDatagridStateInterface} from "@clr/angular";
import {QueryContext} from "../model/query-context";
import {Subject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { FilterSpec } from './filter-spec';

@Component({
   selector: "fastsvs-records-grid",
   templateUrl: "./records.html",
   styleUrls: ["records.scss"]
})
export class FastSvsRecordsGrid implements OnInit {
   private _filterSubject: Subject<void> = new Subject();

   private _filterSpec: FilterSpec = {} as FilterSpec;
   @Input()
   set filterSpec(val: FilterSpec) {
      this._filterSpec = val;
      this.startIndex = 0;
      this.currentPageIndex = 1;
      this.loadData();
   }

   get filterSpec(): FilterSpec {
      return this._filterSpec;
   }

   private _timeRange: any;

   @Input()
   set selectedRange(val: any) {
      this._timeRange = val;
      this.startIndex = 0;
      this.currentPageIndex = 1;
      this.loadData();
   }

   records: FastSvsRecord[];
   total: number;
   loading: boolean = true;
   currentPageIndex: number = 1;
   startIndex: number = 0;
   sort: string = "timestamp";
   order: string = "desc";

   constructor(private service: FastSvsRecordsService) {
   }

   ngOnInit(): void {
      this._filterSubject
            .pipe(switchMap(() => this.service.query(this.getQueryParams())))
            .subscribe((records) => {
               this.records = records.record;
               this.total = records.total;
               this.loading = false;
            });
   }

   private getQueryParams() {
      const params: QueryContext = {
         user: this.filterSpec.user || "",
         team: this.filterSpec.team || "",
         branch: this.filterSpec.branch || "",
         start: this.startIndex,
         date: this.filterSpec.date ? this.filterSpec.date.getTime() : null,
         length: 100,
         sort: this.sort,
         order: this.order,
         includeTestRecords: this.filterSpec.includeTestRecords,
         startTime: this._timeRange ? this._timeRange.start : null,
         endTime: this._timeRange ? this._timeRange.end : null,
      }
      return params;
   }

   loadData = () => {
      this._filterSubject.next();
   }

   refresh(state: ClrDatagridStateInterface) {
      this.loading = true;
      // We convert the filters from an array to a map,
      // because that's what our backend-calling service is expecting
      let filters:{[prop:string]: any[]} = {};
      if (state.filters) {
          for (let filter of state.filters) {
              let {property, value} = <{property: string, value: string}>filter;
              filters[property] = [value];
          }
      }

      if (state.page) {
         this.startIndex = state.page.from;
      }
      if (state.sort) {
         this.order = state.sort.reverse ? "desc" : "asc";
         this.sort = state.sort.by as string;
      }

      this.loadData();
   }

   isErrorRecord(errCode: string) {
      const err: string = errCode && errCode.trim();
      return err && ["0", "null"].indexOf(err) === -1;
   }

   getColorIndicator(errCode: string) {
      if (this.isErrorRecord(errCode)) {
         return "#F52F22";
      }
      return "#48960C";
   }

   isClnValid(cln: string) {
      return cln && cln !== "0";
   }

   getCommandText(cmd: string): string {
      if (cmd) {
         return this.decodeCommand(cmd);
      }
      return "No Command Avaiable";
   }

   private decodeCommand(str): string {
   // Going backwards: from bytestream, to percent-encoding, to original string.
   return decodeURIComponent(atob(str).split('').map(function (c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
   }
}