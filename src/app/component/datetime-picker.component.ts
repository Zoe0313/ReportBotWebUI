/* Copyright 2017-2019 VMware, Inc. All rights reserved. -- VMware Confidential */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {DateTimeAdapter} from "ng-pick-datetime";

@Component({
   selector: 'vsan-datetime-picker',
   styleUrls: ['datetime-picker.scss'],
   templateUrl: 'datetime-picker.html',
})
export class DatetimePickerComponent implements OnInit {

   @Input()
   selectMode = DateTimeSelectMode.SINGLE;

   /**
    * Optional label to display in front of the datetime picker input field
    */
   @Input()
   label: string;

   @Input()
   disabled: boolean;

   @Input()
   placeholder: string;

   @Input()
   errorMessage: string;

   private datetimeValue: Date | Date[];

   @Input()
   set datetime(val: Date | Date[] | DateRangeData) {
      // validate input value
      if (this.selectMode === DateTimeSelectMode.SINGLE && val && !(val instanceof Date)) {
         return;
      }
      if (this.selectMode === DateTimeSelectMode.RANGE && val && !(val instanceof DateRangeData) &&
            !(val instanceof Array)) {
         return;
      }

      if (val == this.datetimeValue) {
         return;
      }
      if (!val) {
         this.datetimeValue = null;
      }
      if (val instanceof DateRangeData) {
         val = [new Date(val.from), new Date(val.to)];
      }

      this.datetimeValue = val;
      if (val instanceof Array) {
         this.datetimeChange.emit(this.createDateRangeData(val));
      } else {
         this.datetimeChange.emit(val);
      }
   }

   get datetime(): Date | Date[] | DateRangeData {
      return this.datetimeValue;
   }

   /**
    * Triggered when new datetime is picked by the user
    */
   @Output()
   datetimeChange: EventEmitter<Date | DateRangeData> = new EventEmitter<Date | DateRangeData>();

   constructor(dateTimeAdapter: DateTimeAdapter<any>) {
      // Set time picker language.
      dateTimeAdapter.setLocale("en");
   }

   ngOnInit(): void {
      if (!this.placeholder) {
         this.placeholder = "MM/DD/YYYY, h:mm A ~ MM/DD/YYYY, h:mm A";
      }
   }

   private createDateRangeData(dates: Date[]): DateRangeData {
      const from: number = (dates && dates.length > 0 && dates[0]) ? dates[0].getTime() : null;
      const to: number = (dates && dates.length > 1 && dates[1]) ? dates[1].getTime() : null;
      return new DateRangeData(from, to);
   }
}

/**
 * Available date time picker modes
 */
export enum DateTimeSelectMode {
   // ref https://daniel-projects.firebaseapp.com/owlng/date-time-picker
   SINGLE = "single",
   RANGE = "range",
}

export class DateRangeData {
   constructor(public from: number, public to: number) {
      this.from = from;
      this.to = to;
   }
}