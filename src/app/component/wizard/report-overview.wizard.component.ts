import { Component, Input } from '@angular/core';
import { ReportConfiguration } from '../../model/report.model';
import { ReportsService } from '../../service/reports.service';

@Component({
   selector: 'app-wizard-overview-page',
   styleUrls: ['report-spec.wizard.component.scss'],
   templateUrl: 'report-overview.wizard.component.html'
})

export class ReportOverviewWizardComponent {
   @Input() reportSpec: ReportConfiguration;
   @Input() nannyRoster: string[] = [];
   @Input() isValid: boolean;

   constructor(
      private service: ReportsService,
   ) {
   }

   checkSkipEmptyReport() {
      return this.reportSpec.reportType === 'bugzilla' ||
             this.reportSpec.reportType === 'perforce_checkin' ||
             this.reportSpec.reportType === 'bugzilla_by_assignee' ||
             this.reportSpec.reportType === 'jira_list';
   }
}
