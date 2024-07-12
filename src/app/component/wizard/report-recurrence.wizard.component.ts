import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators,
         AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import cron from 'cron-validate'
import { ReportConfiguration } from '../../model/report.model';
import { FormatDate } from '../../service/utils'

@Component({
   selector: 'app-wizard-recurrence-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-recurrence.wizard.component.html'
})

export class ReportRecurrenceWizardComponent {
   @Input() reportSpec: ReportConfiguration;
   @Input() minutesOfHour = '0';
   @Input() dayOfMonth = '1';
   weekChecked = [false, false, false, false, false, false, false];

   userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
   todayDate = FormatDate(new Date());

   repeatTimeValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         if (!control) {
            return null;
         }
         const value = control.value;
         if (value === '' || value == null) {
            return null;
         }
         const TIME_REGEX = new RegExp('^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$');
         return TIME_REGEX.test(value) ? null : { invalid_time: true };
      };
   }

   minuteOfHourValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
         if (!control) {
            return null;
         }
         const value = control.value;
         if (value === '' || value == null) {
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
         if (!control) {
            return null;
         }
         const value = control.value;
         if (value === '' || value == null) {
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
         if (!control || !control.parent) {
            return null;
         }
         const startDateStr = control.parent.value.startDate || '';
         const endDateStr = control.value;
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
         if (!control || control.value == null || control.value === '') {
            return null;
         }
         try {
            const cron_result = cron(control.value);
            return cron_result.isValid() ? null : { invalid_cron: true };
         } catch (err) {
            return { invalid_cron: true };
         }
      };
   }

   configForm = new FormGroup({
      repeatTime: new FormControl('', [Validators.required, this.repeatTimeValidator()]),
      minutesOfHour: new FormControl('', [Validators.required, this.minuteOfHourValidator()]),
      dayOfMonth: new FormControl('', [Validators.required, this.dayOfMonthValidator()]),
      dayOfWeek: new FormControl('', [Validators.required]),
      cronExpression: new FormControl('', [Validators.required, this.cronValidator()]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [this.endDateValidator()]),
   });

   changeRepeatType(event: any) {
      this.reportSpec.repeatConfig.repeatType = event.target.value;
      console.log(this.reportSpec.repeatConfig.repeatType);
   }

   changeMinutesOfPerHour(event: any) {
      const value = event.target.value;
      if (value === '') {
         return;
      }
      console.log('hourly - change minsOfHour:', value);
      this.reportSpec.repeatConfig.minsOfHour = Number(value);
   }

   changeDayOfWeek(index: number) {
      this.reportSpec.repeatConfig.dayOfWeek = [];
      this.weekChecked.forEach((checked, index) => {
         if (checked) {
            this.reportSpec.repeatConfig.dayOfWeek.push(index);
         }
      });
      console.log('weekly - change dayOfWeek:', this.reportSpec.repeatConfig.dayOfWeek);
   }

   changeDayOfPerMonth(event: any) {
      const value = event.target.value;
      if (value === '') {
         return;
      }
      console.log('monthly - change dayOfMonth:', value);
      this.reportSpec.repeatConfig.dayOfMonth = Number(value);
   }
}
