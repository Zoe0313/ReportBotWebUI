import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../model/report.model';

@Component({
   selector: 'app-wizard-spec-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-spec.wizard.component.html'
})

export class ReportSpecWizardComponent {
   @Input() reportType: string;
   @Input() mentionUsers: string;
   @Input() skipEmptyReport: boolean;
   @Input() reportSpec: ReportConfiguration;

   configForm = new FormGroup({
      bugzillaLink: new FormControl(''),
      bugzillaAssignees: new FormControl(''),
   });

   changeMentionUsers(event: any) {
      this.reportSpec.mentionUsers = [];
      if (event.target.value === '') {
         return;
      }
      event.target.value.split(',').map(user => {
         this.reportSpec.mentionUsers.push(user.trim());
      });
      console.log(this.reportSpec.mentionUsers);
   }

   changeSkipEmptyReport(event: any) {
      this.skipEmptyReport = (event.target.value == 'Yes');
      console.log(this.skipEmptyReport);
   }

}
