import * as cronParser from 'cron-parser';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReportConfiguration, RepeatConfig } from '../../model/report.model';
import { FormatDate } from '../../service/utils';

@Component({
   selector: 'app-wizard-recurrence-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-recurrence.wizard.component.html'
})

export class ReportRecurrenceWizardComponent implements OnChanges {
   @Input() reportSpec: ReportConfiguration;

   weekChecked: boolean[];

   recurrenceForm = new FormGroup({
      repeatTime: new FormControl('', []),
      minutesOfHour: new FormControl('', []),
      dayOfMonth: new FormControl('', []),
      cronExpression: new FormControl('', []),

      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', []),
   });

   ngOnChanges(changes: SimpleChanges) {
      const currentValue = changes.reportSpec.currentValue;
      const previousValue = changes.reportSpec.previousValue;
      if (typeof previousValue === 'undefined') {
         return;
      }
      // basic input
      this.recurrenceForm.get('startDate').setValue(currentValue.repeatConfig.startDate);
      if (currentValue.repeatConfig.endDate.length > 0) {
         this.recurrenceForm.get('endDate').setValue(currentValue.repeatConfig.endDate);
         this.recurrenceForm.get('endDate').setValidators([this.endDateValidator()]);
      } else {
         this.recurrenceForm.get('endDate').clearValidators();
      }
      this.recurrenceForm.get('endDate').updateValueAndValidity();
      // others
      this.updateValidator(currentValue.repeatConfig);
      // weekly
      this.weekChecked = [];
      for (let i=0; i<=6; i++) {
         this.weekChecked[i] = this.reportSpec.repeatConfig.dayOfWeek.includes(i);
      }
      console.log('weekChecked:', this.weekChecked);
   }

   updateValidator(repeatConfig: RepeatConfig) {
      const repeatType = repeatConfig.repeatType;
      // repeat time: required in not_repeat/daily/weekly/monthly
      if (['not_repeat', 'daily', 'weekly', 'monthly'].includes(repeatType)) {
         this.recurrenceForm.get('repeatTime').setValue(repeatConfig.time);
         this.recurrenceForm.get('repeatTime').setValidators([Validators.required, this.repeatTimeValidator()]);
      } else {
         this.recurrenceForm.get('repeatTime').clearValidators();
      }
      this.recurrenceForm.get('repeatTime').updateValueAndValidity();
      // hourly
      if (repeatType === 'hourly') {
         this.recurrenceForm.get('minutesOfHour').setValue(repeatConfig.minsOfHour);
         this.recurrenceForm.get('minutesOfHour').setValidators([Validators.required, this.minuteOfHourValidator()]);
      } else {
         this.recurrenceForm.get('minutesOfHour').clearValidators();
      }
      this.recurrenceForm.get('minutesOfHour').updateValueAndValidity();
      // monthly
      if (repeatType === 'monthly') {
         this.recurrenceForm.get('dayOfMonth').setValue(repeatConfig.dayOfMonth);
         this.recurrenceForm.get('dayOfMonth').setValidators([Validators.required, this.dayOfMonthValidator()]);
      } else {
         this.recurrenceForm.get('dayOfMonth').clearValidators();
      }
      this.recurrenceForm.get('dayOfMonth').updateValueAndValidity();
      // cron expression
      if (repeatType === 'cron_expression') {
         this.recurrenceForm.get('cronExpression').setValue(repeatConfig.cronExpression);
         this.recurrenceForm.get('cronExpression').setValidators([Validators.required, this.cronValidator()]);
      } else {
         this.recurrenceForm.get('cronExpression').clearValidators();
      }
      this.recurrenceForm.get('cronExpression').updateValueAndValidity();
   }

   needInputTime() {
      return ['not_repeat', 'daily', 'weekly', 'monthly'].includes(this.reportSpec.repeatConfig.repeatType);
   }

   changeRepeatType(event: Event) {
      this.updateValidator(this.reportSpec.repeatConfig);
   }

   changeRepeatTime(event: Event) { // required in not_repeat/daily/weekly/monthly
      const input = event.target as HTMLInputElement;
      this.reportSpec.repeatConfig.time = input.value || '';
      console.log('change repeatTime:', this.reportSpec.repeatConfig.time);
   }

   changeMinutesOfPerHour(event: Event) { // required in hourly
      const input = event.target as HTMLInputElement;
      if (input.value.length > 0) {
         this.reportSpec.repeatConfig.minsOfHour = Number(input.value);
      }
      console.log('change minsOfHour:', this.reportSpec.repeatConfig.minsOfHour);
   }

   changeDayOfPerMonth(event: Event) { // required in monthly
      const input = event.target as HTMLInputElement;
      if (input.value.length > 0) {
         this.reportSpec.repeatConfig.dayOfMonth = Number(input.value);
      }
      console.log('change dayOfMonth:', this.reportSpec.repeatConfig.dayOfMonth);
   }

   changeCronExpression(event: Event) { // required in cron_expression
      const input = event.target as HTMLInputElement;
      this.reportSpec.repeatConfig.cronExpression = input.value || '';
      console.log('change cronExpression:', this.reportSpec.repeatConfig.cronExpression);
   }

   changeStartDate(event: Event) { // required
      const input = event.target as HTMLInputElement;
      this.reportSpec.repeatConfig.startDate = input.value || '';
      console.log('change start date:', this.reportSpec.repeatConfig.startDate);
   }

   changeEndDate(event: Event) { // validate
      const input = event.target as HTMLInputElement;
      this.reportSpec.repeatConfig.endDate = input.value || '';
      console.log('change end date:', this.reportSpec.repeatConfig.endDate);

      if (this.reportSpec.repeatConfig.endDate.length > 0) {
         this.recurrenceForm.get('endDate').setValidators([this.endDateValidator()]);
      } else {
         this.recurrenceForm.get('endDate').clearValidators();
      }
      this.recurrenceForm.get('endDate').updateValueAndValidity();
   }

   changeDayOfWeek(index: number) {
      this.reportSpec.repeatConfig.dayOfWeek = [];
      this.weekChecked.forEach((checked, index) => {
         if (checked) {
            this.reportSpec.repeatConfig.dayOfWeek.push(index);
         }
      });
      console.log('change dayOfWeek:', this.reportSpec.repeatConfig.dayOfWeek);
   }

   repeatTimeValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (!value) {
            return null;
         }
         const TIME_REGEX = new RegExp('^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$');
         return TIME_REGEX.test(value) ? null : { invalid_time: true };
      };
   }

   minuteOfHourValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (!value) {
            return null;
         }
         try {
            const minute = Number(value);
            return (minute>=0 && minute<=59) ? null : { invalid_minute: true };
         } catch (err) {
            return { invalid_minute: true };
         }
      };
   }

   dayOfMonthValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (!value) {
            return null;
         }
         try {
            const minute = Number(value);
            return (minute>=1 && minute<=31) ? null : { invalid_day: true };
         } catch (err) {
            return { invalid_day: true };
         }
      };
   }

   endDateValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (!value) {
            return null;
         }
         const startDateStr = control.parent.value.startDate || '';
         const endDateStr = value;
         if (startDateStr === '' || endDateStr === '') {
            return null;
         }
         const startDate = new Date(startDateStr);
         const endDate = new Date(endDateStr);
         return startDate <= endDate ? null : { invalid_end_day: true };
      };
   }

   cronValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         const value = control.value;
         if (!value) {
            return null;
         }
         try {
            const interval = cronParser.parseExpression(value);
            const date = interval.next().toDate();
            return null;
         } catch (err) {
            return { invalid_cron: true };
         }
         return { invalid_cron: true };
      };
   }
}
