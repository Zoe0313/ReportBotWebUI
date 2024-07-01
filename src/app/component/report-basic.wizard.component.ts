import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportConfiguration } from '../model/report.model';

@Component({
   selector: 'app-wizard-basic-page',
   styleUrls: ['report-basic.wizard.component.scss'],
   templateUrl: 'report-basic.wizard.component.html'
})

export class ReportBasicWizardComponent {
   @Input() reportSpec: ReportConfiguration;

   configForm = new FormGroup({
      reportType: new FormControl('', Validators.required),
      reportTitle: new FormControl('', Validators.required),
      webhooks: new FormControl('', Validators.required),
   });

   reportType = 'bugzilla';
   reportTitle = '';
   webhooks = '';

   getReportTypeName(reportType: string) {
      switch (reportType) {
         case 'bugzilla':
            return 'Bugzilla report'
         case 'bugzilla_by_assignee':
            return 'Bugzilla report by assignee'
         case 'perforce_checkin':
            return 'Perforce branch checkin report';
         case 'perforce_review_check':
            return 'Perforce review check report';
         case 'jira_list':
            return 'JIRA list report';
         case 'nanny_reminder':
            return 'Nanny reminder';
         case 'text':
            return 'Plain text';
         default:
            return 'Unknown'
      }
   }

   changeReportTitle(event) {
      console.log(event)
   }
   changeWebhook(event) {
      console.log(event)
   }
}
