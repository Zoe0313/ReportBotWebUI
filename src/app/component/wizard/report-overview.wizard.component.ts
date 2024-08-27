import { Component, Input } from '@angular/core';
import { ReportConfiguration } from '../../model/report.model';

@Component({
   selector: 'app-wizard-overview-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-overview.wizard.component.html'
})

export class ReportOverviewWizardComponent {
   @Input() reportSpec: ReportConfiguration;
   @Input() isValid: boolean;

   checkSkipEmptyReport() {
      return this.reportSpec.reportType === 'bugzilla' ||
             this.reportSpec.reportType === 'perforce_checkin' ||
             this.reportSpec.reportType === 'bugzilla_by_assignee' ||
             this.reportSpec.reportType === 'jira_list';
   }
}
