import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../../model/report.model';
import { ReportsService } from '../../service/reports.service';

@Component({
   selector: 'app-wizard-bugzilla-assignee-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'bugzilla-assignee-report.wizard.component.html'
})

export class BugzillaAssigneeReportWizardComponent {
   constructor(
      private service: ReportsService,
   ) {
   }

   @Input() bugzillaAssignees: string;
   @Input() reportSpec: ReportConfiguration;

   invalidUser: string;

   configForm = new FormGroup({
      bugzillaAssignees: new FormControl('', Validators.required),
   });

   changeBugzillaAssignees(event: any) {
      this.reportSpec.bugzillaAssignee.bugzillaAssignees = [];
      if (event.target.value === '') {
         return;
      }
      event.target.value.split(',').map(user => {
         const account = user.trim();
         this.service.validateADaccount(account).then(
            res => {
               console.log('res:', res);
               const ldapName = res['_source']['username'];
               this.reportSpec.bugzillaAssignee.bugzillaAssignees.push(ldapName);
            },
            err => {
               console.log('err:', err);
               this.invalidUser = account;
            }
         );
      });
      console.log(this.reportSpec.bugzillaAssignee.bugzillaAssignees);
   }
}
