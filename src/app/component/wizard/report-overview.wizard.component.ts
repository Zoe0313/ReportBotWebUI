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
}
