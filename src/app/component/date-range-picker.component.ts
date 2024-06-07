/* Copyright 2018 VMware, Inc. All rights reserved. -- VMware Confidential */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

@Component({
   selector: "vsan-date-range-picker",
   templateUrl: "date-range-picker.html",
   styleUrls: ["date-range-picker.scss"],
})
export class DateRangePickerComponent implements OnInit {
   DateRangePickerState = DateRangePickerState;
   private static readonly DAY_IN_MILLISECONDS: number = 1000 * 60 * 60 * 24;

   private static readonly SAVED_RANGE_KEY: string = "saved-date-range";

   @Input()
   private enabled: boolean = true;

   @Output()
   changeRange: EventEmitter<DateRangeData> = new EventEmitter<DateRangeData>(true);

   currentStateLabel: string;
   currentDateRange: DateRangeData;

   invalidInterval: boolean;

   private _dayInterval: number = 7;

   get dayInterval(): number {
      return this._dayInterval;
   }

   set dayInterval(value: number) {
      this._dayInterval = value;
      this.validateDate();
   }

   fromDateError: string;
   private _fromDate: Date;

   get fromDate(): Date {
      return this._fromDate;
   }

   set fromDate(value: Date) {
      this._fromDate = value;
      this.validateDate();
   }

   toDateError: string;
   private _toDate: Date;

   get toDate(): Date {
      return this._toDate;
   }

   set toDate(value: Date) {
      this._toDate = value;
      this.validateDate();
   }

   private _currentPickerState: DateRangePickerState;

   get currentPickerState(): DateRangePickerState {
      return this._currentPickerState;
   }

   set currentPickerState(value: DateRangePickerState) {
      if (this._currentPickerState === value) {
         return;
      }

      this._currentPickerState = value;
      switch (value) {
         case DateRangePickerState.LAST_X_HOURS:
            this.currentStateLabel = "Last";
            break;
         case DateRangePickerState.CUSTOM_RANGE:
            this.currentStateLabel = "Custom";
            break;
      }

      this.validateDate();
   }

   constructor(private cookie: CookieService) {}

   ngOnInit() {
      const savedRange: string = this.cookie.get(DateRangePickerComponent.SAVED_RANGE_KEY);
      if (savedRange) {
         this.currentDateRange = JSON.parse(savedRange);
         this.currentPickerState = this.currentDateRange.state;
         if (this.currentPickerState === DateRangePickerState.LAST_X_HOURS) {
            this.dayInterval = Math.round((this.currentDateRange.to - this.currentDateRange.from) / DateRangePickerComponent.DAY_IN_MILLISECONDS);
         }
         this.fromDate = new Date(this.currentDateRange.from);
         this.toDate = new Date(this.currentDateRange.to);
      } else {
         if (!this.currentPickerState) {
            this.currentPickerState = DateRangePickerState.LAST_X_HOURS;
         }
         this.fromDate = this.createStartDate();
         this.toDate = this.createEndDate();
         this.updateCurrentDateRange();
      }
      this.changeRange.emit(this.currentDateRange);
   }

   updateCurrentDateRange = (rangeData?: DateRangeData) => {
      if (rangeData) {
         this.currentDateRange = rangeData;
      } else {
         this.currentDateRange = this.createDateRange(this.fromDate);
      }
      this.cookie.set(DateRangePickerComponent.SAVED_RANGE_KEY,
         JSON.stringify(this.currentDateRange));
   };

   private createStartDate = (): Date => {
      const startTime: Date = new Date();
      startTime.setHours(0 - (this.dayInterval - 1) * 24);
      startTime.setMinutes(0);
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);
      return startTime;
   };

   private createEndDate = (): Date => {
      return this.createNoTimeDate();
   };

   private createDateRange = (startTime: Date, endTime?:Date): DateRangeData => {
      let endDate: number;
      if (this.currentPickerState === DateRangePickerState.LAST_X_HOURS || !endTime) {
         endDate = startTime.getTime() + DateRangePickerComponent.DAY_IN_MILLISECONDS * this.dayInterval;
      } else {
         endDate = endTime.getTime();
      }
      // -1 to prevent the date number increasing
      endDate -= 1;
      return new DateRangeData(startTime.getTime(), endDate, this.currentPickerState);
   };

   private validateDate = () => {
      this.fromDateError = "";
      this.toDateError = "";
      this.invalidInterval = false;

      if (this.currentPickerState === DateRangePickerState.LAST_X_HOURS) {
         if (this.dayInterval <= 0) {
            this.invalidInterval = true;
            return;
         }
      } else {
         if (!this.fromDate) {
            this.fromDateError = "Start time is required";
            return;
         }

         if (!this.toDate) {
            this.toDateError = "End time is required";
            return;
         }

         const currentTime: number = this.createNoTimeDate().getTime();
         const startTime: number = this.fromDate.getTime();
         const endTime:number = this.toDate.getTime();
         if (endTime - currentTime > 0) {
            // The end time can not be greater than the current time.
            this.toDateError = "End time should not be greater than current time";
         } else if (endTime - startTime <= 0) {
            // The end time should be greater than the start time.
            this.fromDateError = "End time should be greater than start time";
         }
      }
   };

   private createNoTimeDate = (): Date => {
      const date: Date = new Date();
      date.setHours(24);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
   };

   onRangeLastXDaysClick = () => {
      this.currentPickerState = DateRangePickerState.LAST_X_HOURS;
   };

   onRangeCustomClick = () => {
      this.currentPickerState = DateRangePickerState.CUSTOM_RANGE;
      // this.dayInterval = 7;
   };

   get disableRefresh(): boolean {
      return !this.enabled || !!this.fromDateError || !!this.toDateError || this.invalidInterval;
   }

   onRefreshBtnClick = () => {
      if (this.currentPickerState === DateRangePickerState.CUSTOM_RANGE) {
         const startTime: Date = new Date(this.fromDate);
         const endTime: Date = new Date(this.toDate);
         // increase one day so it won't miss today
         endTime.setHours(24);
         this.updateCurrentDateRange(this.createDateRange(startTime, endTime));
      } else if (this.currentPickerState === DateRangePickerState.LAST_X_HOURS) {
         /**
          * have to reset the current time range because the time range is not correct
          * if user clicks the query button 30 minutes later after the page opened.
          */
         this.fromDate = this.createStartDate();
         this.updateCurrentDateRange();
      }
      this.changeRange.emit(this.currentDateRange);
   };
}

/**
 * date range picker states enum to indicate what option is selected
 */
export enum DateRangePickerState {
   LAST_X_HOURS,
   CUSTOM_RANGE,
}

export class DateRangeData {
   constructor(public from: number, public to: number, public state: DateRangePickerState) {
   }
}