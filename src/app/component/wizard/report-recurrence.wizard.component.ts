import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';

@Component({
   selector: 'app-wizard-recurrence-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-recurrence.wizard.component.html'
})

export class ReportRecurrenceWizardComponent {
   @Input() repeatType: string;
   @Input() reportSpec: ReportConfiguration;

   userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

   configForm = new FormGroup({
      repeatType: new FormControl('', Validators.required),
      tz: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      cronExpression: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),
      dayOfMonth: new FormControl(''),
      dayOfWeek: new FormControl(''),
      minsOfHour: new FormControl(''),
//       cronExpression: new FormControl('', this.repeatType == 'cron_expression'),
//       date: new FormControl('', this.repeatType == 'not_repeat'),
//       time: new FormControl('', this.repeatType != 'cron_expression'),
//       dayOfMonth: new FormControl('', this.repeatType == 'monthly'),
//       dayOfWeek: new FormControl('', this.repeatType == 'weekly'),
//       minsOfHour: new FormControl('', this.repeatType == 'hourly'),
      nextInvocation: new FormControl('')
   });




}
