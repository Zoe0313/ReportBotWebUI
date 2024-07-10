import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { FormatDate } from '../../service/utils'

@Component({
   selector: 'app-wizard-recurrence-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-recurrence.wizard.component.html'
})

export class ReportRecurrenceWizardComponent {
   @Input() reportSpec: ReportConfiguration;

   userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
   todayDate = FormatDate(new Date());

   notRepeatTime = '08:00';
// //       cronExpression: new FormControl('', this.repeatType == 'cron_expression'),
// //       date: new FormControl('', this.repeatType == 'not_repeat'),
// //       time: new FormControl('', this.repeatType != 'cron_expression'),
// //       dayOfMonth: new FormControl('', this.repeatType == 'monthly'),
// //       dayOfWeek: new FormControl('', this.repeatType == 'weekly'),
// //       minsOfHour: new FormControl('', this.repeatType == 'hourly'),

   changeRepeatType(event: any) {
      this.reportSpec.repeatConfig.repeatType = event.target.value;
      console.log(this.reportSpec.repeatConfig.repeatType);
   }

   changeNotRepeatTime(event: any) {
      const value = event.target.value;
      if (value === '') {
         return;
      }
      console.log('change not repeat time:', value);
      this.reportSpec.repeatConfig.time = value;
   }



}
